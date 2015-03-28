///<reference path="AbstractLexer.ts"/>
///<reference path="../Syntax/Internal/SyntaxListBuilder.ts"/>
///<reference path="../Syntax/Internal/SyntaxList.ts"/>


module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export enum LexerMode {
        Syntax = 0x0001,
        DebuggerSyntax = 0x0002,
        Directive = 0x0004,
        XmlDocComment = 0x0008,
        XmlElementTag = 0x0010,
        XmlAttributeTextQuote = 0x0020,
        XmlAttributeTextDoubleQuote = 0x0040,
        XmlCrefQuote = 0x0080,
        XmlCrefDoubleQuote = 0x0100,
        XmlNameQuote = 0x0200,
        XmlNameDoubleQuote = 0x0400,
        XmlCDataSectionText = 0x0800,
        XmlCommentText = 0x1000,
        XmlProcessingInstructionText = 0x2000,
        XmlCharacter = 0x4000,
        MaskLexMode = 0xFFFF,
        XmlDocCommentLocationStart = 0x00000,
        XmlDocCommentLocationInterior = 0x10000,
        XmlDocCommentLocationExterior = 0x20000,
        XmlDocCommentLocationEnd = 0x40000,
        MaskXmlDocCommentLocation = 0xF0000,
        XmlDocCommentStyleSingleLine = 0x000000,
        XmlDocCommentStyleDelimited = 0x100000,
        MaskXmlDocCommentStyle = 0x300000,
        None = 0
    }
    export enum XmlDocCommentLocation {
        Start = 0,
        Interior = 1,
        Exterior = 2,
        End = 4
    }
    export enum XmlDocCommentStyle {
        SingleLine = 0,
        Delimited = 1
    }
    export class Lexer extends AbstractLexer {
        private static TriviaListInitialCapacity: number = 8;
        private options: CSharpParseOptions;
        private mode: LexerMode = 0;
        private builder: System.Text.StringBuilder;
        private identBuffer: string[];
        private identLen: number = 0;
        private directives: DirectiveStack = structDefault(DirectiveStack);
        private cache: LexerCache;
        private allowPreprocessorDirectives: boolean = false;
        ctor_1061(text: Text.SourceText, options: CSharpParseOptions, allowPreprocessorDirectives: boolean = true): Lexer {
            super.ctor_1225(text);
            System.Diagnostics.Debug.Assert(options != null);
            this.options = options;
            this.builder = new System.Text.StringBuilder();
            this.identBuffer = new Array<string>(32);
            this.cache = new LexerCache();
            this.createQuickTokenFunction = this.CreateQuickToken.bind(this);
            this.allowPreprocessorDirectives = allowPreprocessorDirectives;
            return this;
        }
        public Dispose(): void {
            this.cache.Free();
            if (this.xmlParser != null) {
                this.xmlParser.Dispose();
            }
            super.Dispose();
        }
        public get SuppressDocumentationCommentParse(): boolean {
            return this.options.DocumentationMode < DocumentationMode.Parse;
        }
        public get Options(): CSharpParseOptions {
            return this.options;
        }
        public get Directives(): DirectiveStack {
            return this.directives;
        }
        public Reset(position: number, directives: DirectiveStack): void {
            this.TextWindow.Reset(position);
            this.directives = directives;
        }
        private static ModeOf(mode: LexerMode): LexerMode {
            return mode & LexerMode.MaskLexMode;
        }
        private ModeIs(mode: LexerMode): boolean {
            return Lexer.ModeOf(this.mode) == mode;
        }
        private static LocationOf(mode: LexerMode): XmlDocCommentLocation {
            return <XmlDocCommentLocation>(<number>(mode & LexerMode.MaskXmlDocCommentLocation) >> 16);
        }
        private LocationIs(location: XmlDocCommentLocation): boolean {
            return Lexer.LocationOf(this.mode) == location;
        }
        private MutateLocation(location: XmlDocCommentLocation): void {
            this.mode &= ~LexerMode.MaskXmlDocCommentLocation;
            this.mode |= <LexerMode>(<number>location << 16);
        }
        private static StyleOf(mode: LexerMode): XmlDocCommentStyle {
            return <XmlDocCommentStyle>(<number>(mode & LexerMode.MaskXmlDocCommentStyle) >> 20);
        }
        private StyleIs(style: XmlDocCommentStyle): boolean {
            return Lexer.StyleOf(this.mode) == style;
        }
        private get InDocumentationComment(): boolean {
            switch (Lexer.ModeOf(this.mode)) {
                case LexerMode.XmlDocComment:
                case LexerMode.XmlElementTag:
                case LexerMode.XmlAttributeTextQuote:
                case LexerMode.XmlAttributeTextDoubleQuote:
                case LexerMode.XmlCrefQuote:
                case LexerMode.XmlCrefDoubleQuote:
                case LexerMode.XmlNameQuote:
                case LexerMode.XmlNameDoubleQuote:
                case LexerMode.XmlCDataSectionText:
                case LexerMode.XmlCommentText:
                case LexerMode.XmlProcessingInstructionText:
                case LexerMode.XmlCharacter:
                    return true;
                default:
                    return false;
            }
        }
        public Lex_5670_R(mode: { refObj: LexerMode }): SyntaxToken {
            var result = this.Lex_5670(mode.refObj);
            mode.refObj = this.mode;
            return result;
        }
        public static TokensLexed: number = 0;
        public Lex_5670(mode: LexerMode): SyntaxToken {
            Lexer.TokensLexed++;
            this.mode = mode;
            switch (this.mode) {
                case LexerMode.Syntax:
                case LexerMode.DebuggerSyntax:
                    var temp = this.QuickScanSyntaxToken();
                    return temp != null ? temp : this.LexSyntaxToken();
                case LexerMode.Directive:
                    return this.LexDirectiveToken();
            }
            switch (Lexer.ModeOf(this.mode)) {
                case LexerMode.XmlDocComment:
                    return this.LexXmlToken();
                case LexerMode.XmlElementTag:
                    return this.LexXmlElementTagToken();
                case LexerMode.XmlAttributeTextQuote:
                case LexerMode.XmlAttributeTextDoubleQuote:
                    return this.LexXmlAttributeTextToken();
                case LexerMode.XmlCDataSectionText:
                    return this.LexXmlCDataSectionTextToken();
                case LexerMode.XmlCommentText:
                    return this.LexXmlCommentTextToken();
                case LexerMode.XmlProcessingInstructionText:
                    return this.LexXmlProcessingInstructionTextToken();
                case LexerMode.XmlCrefQuote:
                case LexerMode.XmlCrefDoubleQuote:
                    return this.LexXmlCrefOrNameToken();
                case LexerMode.XmlNameQuote:
                case LexerMode.XmlNameDoubleQuote:
                    return this.LexXmlCrefOrNameToken();
                case LexerMode.XmlCharacter:
                    return this.LexXmlCharacter();
            }
            System.Diagnostics.Debug.Assert(false, "Unknown LexMode passed to Lexer.Lex");
            return this.LexSyntaxToken();
        }
        private leadingTriviaCache: SyntaxListBaseBuilder = new SyntaxListBaseBuilder().ctor_1860(10);
        private trailingTriviaCache: SyntaxListBaseBuilder = new SyntaxListBaseBuilder().ctor_1860(10);
        private static GetFullWidth(builder: SyntaxListBaseBuilder): number {
            var width: number = 0;
            if (builder != null) {
                for (var i: number = 0; i < builder.Count; i++) {
                    width += builder.$get$(i).FullWidth;
                }
            }
            return width;
        }
        private LexSyntaxToken(): SyntaxToken {
            this.leadingTriviaCache.Clear();
            var leadingTriviaCache_ref0 = { refObj: this.leadingTriviaCache };
            this.LexSyntaxTrivia(/*afterFirstToken:*/this.TextWindow.Position > 0,/*isTrailing:*/false,/*triviaList:*/leadingTriviaCache_ref0);

            this.leadingTriviaCache = leadingTriviaCache_ref0.refObj;;
            var leading = this.leadingTriviaCache;
            var tokenInfo = structDefault(Lexer.TokenInfo);
            this.Start();
            var tokenInfo_ref0 = { refObj: tokenInfo };
            this.ScanSyntaxToken(tokenInfo_ref0);

            tokenInfo = tokenInfo_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            this.trailingTriviaCache.Clear();
            var trailingTriviaCache_ref0 = { refObj: this.trailingTriviaCache };
            this.LexSyntaxTrivia(/*afterFirstToken:*/true,/*isTrailing:*/true,/*triviaList:*/trailingTriviaCache_ref0);

            this.trailingTriviaCache = trailingTriviaCache_ref0.refObj;;
            var trailing = this.trailingTriviaCache;
            var tokenInfo_ref0 = { refObj: tokenInfo };
            var ret_val__556 = this.Create(tokenInfo_ref0, leading, trailing, errors);

            tokenInfo = tokenInfo_ref0.refObj;
            return ret_val__556;
        }
        public LexSyntaxLeadingTrivia(): SyntaxTriviaList {
            this.leadingTriviaCache.Clear();
            var leadingTriviaCache_ref0 = { refObj: this.leadingTriviaCache };
            this.LexSyntaxTrivia(/*afterFirstToken:*/this.TextWindow.Position > 0,/*isTrailing:*/false,/*triviaList:*/leadingTriviaCache_ref0);

            this.leadingTriviaCache = leadingTriviaCache_ref0.refObj;;
            return new SyntaxTriviaList().ctor_5254(structDefault(Microsoft.CodeAnalysis.SyntaxToken), SyntaxListBase.List_1405(this.leadingTriviaCache), 0, 0);
        }
        public LexSyntaxTrailingTrivia(): SyntaxTriviaList {
            this.trailingTriviaCache.Clear();
            var trailingTriviaCache_ref0 = { refObj: this.trailingTriviaCache };
            this.LexSyntaxTrivia(/*afterFirstToken:*/true,/*isTrailing:*/true,/*triviaList:*/trailingTriviaCache_ref0);

            this.trailingTriviaCache = trailingTriviaCache_ref0.refObj;;
            return new SyntaxTriviaList().ctor_5254(structDefault(Microsoft.CodeAnalysis.SyntaxToken), SyntaxListBase.List_1405(this.trailingTriviaCache), 0, 0);
        }
        private Create(info: { refObj: Lexer.TokenInfo }, leading: SyntaxListBaseBuilder, trailing: SyntaxListBaseBuilder, errors: SyntaxDiagnosticInfo[]): SyntaxToken {
            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.IdentifierToken || info.refObj.StringValue != null);
            var leadingNode = SyntaxListBase.List_1405(leading);
            var trailingNode = SyntaxListBase.List_1405(trailing);
            var token: SyntaxToken;
            if (info.refObj.RequiresTextForXmlEntity) {
                token = SyntaxFactory.Token_6067(leadingNode, info.refObj.Kind, info.refObj.Text, info.refObj.StringValue, trailingNode);
            }
            else {
                switch (info.refObj.Kind) {
                    case SyntaxKind.IdentifierToken:
                        token = SyntaxFactory.Identifier_1121(info.refObj.ContextualKind, leadingNode, info.refObj.Text, info.refObj.StringValue, trailingNode);
                        break;
                    case SyntaxKind.NumericLiteralToken:
                        switch (info.refObj.ValueKind) {
                            case SpecialType.System_Int32:
                                token = SyntaxFactory.Literal_2107(leadingNode, info.refObj.Text, info.refObj.IntValue, trailingNode);
                                break;
                            case SpecialType.System_UInt32:
                                token = SyntaxFactory.Literal_3278(leadingNode, info.refObj.Text, info.refObj.UintValue, trailingNode);
                                break;
                            case SpecialType.System_Int64:
                                token = SyntaxFactory.Literal_1844(leadingNode, info.refObj.Text, info.refObj.LongValue, trailingNode);
                                break;
                            case SpecialType.System_UInt64:
                                token = SyntaxFactory.Literal_7516(leadingNode, info.refObj.Text, info.refObj.UlongValue, trailingNode);
                                break;
                            case SpecialType.System_Single:
                                token = SyntaxFactory.Literal_1315(leadingNode, info.refObj.Text, info.refObj.FloatValue, trailingNode);
                                break;
                            case SpecialType.System_Double:
                                token = SyntaxFactory.Literal_1908(leadingNode, info.refObj.Text, info.refObj.DoubleValue, trailingNode);
                                break;
                            case SpecialType.System_Decimal:
                                token = SyntaxFactory.Literal_2002(leadingNode, info.refObj.Text, info.refObj.DecimalValue, trailingNode);
                                break;
                            default:
                                throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(info.refObj.ValueKind);
                        }
                        break;
                    case SyntaxKind.InterpolatedStringToken:
                        token = SyntaxFactory.Literal_1924(leadingNode, info.refObj.Text, info.refObj.Kind, info.refObj.Text, trailingNode);
                        break;
                    case SyntaxKind.StringLiteralToken:
                        token = SyntaxFactory.Literal_1924(leadingNode, info.refObj.Text, info.refObj.Kind, info.refObj.StringValue, trailingNode);
                        break;
                    case SyntaxKind.CharacterLiteralToken:
                        token = SyntaxFactory.Literal_7402(leadingNode, info.refObj.Text, info.refObj.CharValue, trailingNode);
                        break;
                    case SyntaxKind.XmlTextLiteralNewLineToken:
                        token = SyntaxFactory.XmlTextNewLine_1815(leadingNode, info.refObj.Text, info.refObj.StringValue, trailingNode);
                        break;
                    case SyntaxKind.XmlTextLiteralToken:
                        token = SyntaxFactory.XmlTextLiteral(leadingNode, info.refObj.Text, info.refObj.StringValue, trailingNode);
                        break;
                    case SyntaxKind.XmlEntityLiteralToken:
                        token = SyntaxFactory.XmlEntity(leadingNode, info.refObj.Text, info.refObj.StringValue, trailingNode);
                        break;
                    case SyntaxKind.EndOfDocumentationCommentToken:
                    case SyntaxKind.EndOfFileToken:
                        token = SyntaxFactory.Token_1937(leadingNode, info.refObj.Kind, trailingNode);
                        break;
                    case SyntaxKind.None:
                        token = SyntaxFactory.BadToken(leadingNode, info.refObj.Text, trailingNode);
                        break;
                    default:
                        System.Diagnostics.Debug.Assert(SyntaxFacts.IsPunctuationOrKeyword(info.refObj.Kind));
                        token = SyntaxFactory.Token_1937(leadingNode, info.refObj.Kind, trailingNode);
                        break;
                }
            }
            if (errors != null && (this.options.DocumentationMode >= DocumentationMode.Diagnose || !this.InDocumentationComment)) {
                token = CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(token,
                    errors);
            }
            return token;
        }
        private ScanSyntaxToken(info: { refObj: Lexer.TokenInfo }): void {
            info.refObj.Kind = SyntaxKind.None;
            info.refObj.ContextualKind = SyntaxKind.None;
            info.refObj.Text = null;
            var character: string = '';
            var surrogateCharacter: string = SlidingTextWindow.InvalidCharacter;
            var isEscaped: boolean = false;
            character = this.TextWindow.PeekChar_2423();
            var __tSwitch43 = character;
            while (true) {
                var __tDefault18 = false;
                switch (__tSwitch43) {
                    case '\"':
                    case '\'':
                        this.ScanStringLiteral(info);
                        break;
                    case '/':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.SlashEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.SlashToken;
                        }
                        break;
                    case '.':
                        if (!this.ScanNumericLiteral(info)) {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.DotToken;
                        }
                        break;
                    case ',':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CommaToken;
                        break;
                    case ':':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == ':') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.ColonColonToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.ColonToken;
                        }
                        break;
                    case ';':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.SemicolonToken;
                        break;
                    case '~':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.TildeToken;
                        break;
                    case '!':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.ExclamationEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.ExclamationToken;
                        }
                        break;
                    case '=':
                        this.TextWindow.AdvanceChar_1426();
                        if ((character = this.TextWindow.PeekChar_2423()) == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.EqualsEqualsToken;
                        }
                        else if (character == '>') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.EqualsGreaterThanToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.EqualsToken;
                        }
                        break;
                    case '*':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.AsteriskEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.AsteriskToken;
                        }
                        break;
                    case '(':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.OpenParenToken;
                        break;
                    case ')':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CloseParenToken;
                        break;
                    case '{':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.OpenBraceToken;
                        break;
                    case '}':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CloseBraceToken;
                        break;
                    case '[':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.OpenBracketToken;
                        break;
                    case ']':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CloseBracketToken;
                        break;
                    case '?':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '?') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.QuestionQuestionToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.QuestionToken;
                        }
                        break;
                    case '+':
                        this.TextWindow.AdvanceChar_1426();
                        if ((character = this.TextWindow.PeekChar_2423()) == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.PlusEqualsToken;
                        }
                        else if (character == '+') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.PlusPlusToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.PlusToken;
                        }
                        break;
                    case '-':
                        this.TextWindow.AdvanceChar_1426();
                        if ((character = this.TextWindow.PeekChar_2423()) == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.MinusEqualsToken;
                        }
                        else if (character == '-') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.MinusMinusToken;
                        }
                        else if (character == '>') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.MinusGreaterThanToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.MinusToken;
                        }
                        break;
                    case '%':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.PercentEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.PercentToken;
                        }
                        break;
                    case '&':
                        this.TextWindow.AdvanceChar_1426();
                        if ((character = this.TextWindow.PeekChar_2423()) == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.AmpersandEqualsToken;
                        }
                        else if (this.TextWindow.PeekChar_2423() == '&') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.AmpersandAmpersandToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.AmpersandToken;
                        }
                        break;
                    case '^':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.CaretEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.CaretToken;
                        }
                        break;
                    case '|':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.BarEqualsToken;
                        }
                        else if (this.TextWindow.PeekChar_2423() == '|') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.BarBarToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.BarToken;
                        }
                        break;
                    case '<':
                        if (this.ModeIs(LexerMode.DebuggerSyntax) && this.TextWindow.PeekChar_4867(1) == '>') {
                            __tSwitch43 = 'a'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.LessThanEqualsToken;
                        }
                        else if (this.TextWindow.PeekChar_2423() == '<') {
                            if (this.ModeIs(LexerMode.DebuggerSyntax) && this.TextWindow.PeekChar_4867(1) == '>') {
                                info.refObj.Kind = SyntaxKind.LessThanToken;
                                break;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            if (this.TextWindow.PeekChar_2423() == '=') {
                                this.TextWindow.AdvanceChar_1426();
                                info.refObj.Kind = SyntaxKind.LessThanLessThanEqualsToken;
                            }
                            else {
                                info.refObj.Kind = SyntaxKind.LessThanLessThanToken;
                            }
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.LessThanToken;
                        }
                        break;
                    case '>':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.GreaterThanEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.GreaterThanToken;
                        }
                        break;
                    case '@':
                        if (this.TextWindow.PeekChar_4867(1) == '"') {
                            this.ScanVerbatimStringLiteral(info);
                        }
                        else if (!this.ScanIdentifierOrKeyword(info)) {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/true);
                            this.AddError_1261(ErrorCode.ERR_ExpectedVerbatimLiteral);
                        }
                        break;
                    case '$':
                        if (this.TextWindow.PeekChar_4867(1) == '"') {
                            this.ScanInterpolatedStringLiteral(false, info);
                            this.CheckFeatureAvailability(MessageID.IDS_FeatureInterpolatedStrings);
                            break;
                        }
                        else if (this.TextWindow.PeekChar_4867(1) == '@' && this.TextWindow.PeekChar_4867(2) == '"') {
                            this.ScanInterpolatedStringLiteral(true, info);
                            this.CheckFeatureAvailability(MessageID.IDS_FeatureInterpolatedStrings);
                            break;
                        }
                        else if (this.ModeIs(LexerMode.DebuggerSyntax)) {
                            __tSwitch43 = 'a'; continue;
                        }
                        __tDefault18 = true; break;
                    case 'a':
                    case 'b':
                    case 'c':
                    case 'd':
                    case 'e':
                    case 'f':
                    case 'g':
                    case 'h':
                    case 'i':
                    case 'j':
                    case 'k':
                    case 'l':
                    case 'm':
                    case 'n':
                    case 'o':
                    case 'p':
                    case 'q':
                    case 'r':
                    case 's':
                    case 't':
                    case 'u':
                    case 'v':
                    case 'w':
                    case 'x':
                    case 'y':
                    case 'z':
                    case 'A':
                    case 'B':
                    case 'C':
                    case 'D':
                    case 'E':
                    case 'F':
                    case 'G':
                    case 'H':
                    case 'I':
                    case 'J':
                    case 'K':
                    case 'L':
                    case 'M':
                    case 'N':
                    case 'O':
                    case 'P':
                    case 'Q':
                    case 'R':
                    case 'S':
                    case 'T':
                    case 'U':
                    case 'V':
                    case 'W':
                    case 'X':
                    case 'Y':
                    case 'Z':
                    case '_':
                        this.ScanIdentifierOrKeyword(info);
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.ScanNumericLiteral(info);
                        break;
                    case '\\':
                        {
                            var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                            var ret_val__199 = this.TextWindow.PeekCharOrUnicodeEscape(surrogateCharacter_ref0);

                            surrogateCharacter = surrogateCharacter_ref0.refObj;
                            character = ret_val__199;
                            isEscaped = true;
                            if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                                __tSwitch43 = 'a'; continue;
                            }
                            __tDefault18 = true; break;
                        }
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault18 = true; break;
                        }
                        if (this.directives.HasUnfinishedIf()) {
                            this.AddError_1261(ErrorCode.ERR_EndifDirectiveExpected);
                        }
                        if (this.directives.HasUnfinishedRegion()) {
                            this.AddError_1261(ErrorCode.ERR_EndRegionDirectiveExpected);
                        }
                        info.refObj.Kind = SyntaxKind.EndOfFileToken;
                        break;
                    default:
                        if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                            __tSwitch43 = 'a'; continue;
                        }
                        if (isEscaped) {
                            var error: SyntaxDiagnosticInfo;
                            var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                            var error_ref1 = { refObj: error };
                            this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                            surrogateCharacter = surrogateCharacter_ref0.refObj;

                            error = error_ref1.refObj;;
                            this.AddError_9129(error);
                        }
                        else {
                            this.TextWindow.AdvanceChar_1426();
                        }
                        info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/true);
                        this.AddError_1515(ErrorCode.ERR_UnexpectedCharacter, info.refObj.Text);
                        break;
                }


                if (__tDefault18) {
                    if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                        __tSwitch43 = 'a'; continue;
                    }
                    if (isEscaped) {
                        var error: SyntaxDiagnosticInfo;
                        var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                        var error_ref1 = { refObj: error };
                        this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                        surrogateCharacter = surrogateCharacter_ref0.refObj;

                        error = error_ref1.refObj;;
                        this.AddError_9129(error);
                    }
                    else {
                        this.TextWindow.AdvanceChar_1426();
                    }
                    info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/true);
                    this.AddError_1515(ErrorCode.ERR_UnexpectedCharacter, info.refObj.Text);
                    break;
                }

                break;
            }

        }
        private CheckFeatureAvailability(feature: MessageID): void {
            var availableVersion: LanguageVersion = this.Options.LanguageVersion;
            var requiredVersion = MessageIDExtensions.RequiredVersion(feature);
            if (availableVersion >= requiredVersion)
                return
            var featureName = MessageIDExtensions.Localize(feature);
            this.AddError_1515(LanguageVersionExtensions.GetErrorCode(availableVersion), featureName, LanguageVersionExtensions.Localize(requiredVersion));
        }
        private ScanInteger(): boolean {
            var start: number = this.TextWindow.Position;
            var ch: string = '';
            while ((ch = this.TextWindow.PeekChar_2423()) >= '0' && ch <= '9') {
                this.TextWindow.AdvanceChar_1426();
            }
            return start < this.TextWindow.Position;
        }
        private ScanNumericLiteral(info: { refObj: Lexer.TokenInfo }): boolean {
            var start: number = this.TextWindow.Position;
            var ch: string = '';
            var isHex: boolean = false;
            var hasDecimal: boolean = false;
            var hasExponent: boolean = false;
            info.refObj.Text = null;
            info.refObj.ValueKind = SpecialType.None;
            this.builder.Clear();
            var hasUSuffix: boolean = false;
            var hasLSuffix: boolean = false;
            ch = this.TextWindow.PeekChar_2423();
            if (ch == '0' && ((ch = this.TextWindow.PeekChar_4867(1)) == 'x' || ch == 'X')) {
                this.TextWindow.AdvanceChar_5713(2);
                isHex = true;
            }
            if (isHex) {
                while (SyntaxFacts.IsHexDigit(ch = this.TextWindow.PeekChar_2423())) {
                    this.builder.Append(ch);
                    this.TextWindow.AdvanceChar_1426();
                }
                if ((ch = this.TextWindow.PeekChar_2423()) == 'L' || ch == 'l') {
                    if (ch == 'l') {
                        this.AddError_1749(this.TextWindow.Position, 1, ErrorCode.WRN_LowercaseEllSuffix);
                    }
                    this.TextWindow.AdvanceChar_1426();
                    hasLSuffix = true;
                    if ((ch = this.TextWindow.PeekChar_2423()) == 'u' || ch == 'U') {
                        this.TextWindow.AdvanceChar_1426();
                        hasUSuffix = true;
                    }
                }
                else if ((ch = this.TextWindow.PeekChar_2423()) == 'u' || ch == 'U') {
                    this.TextWindow.AdvanceChar_1426();
                    hasUSuffix = true;
                    if ((ch = this.TextWindow.PeekChar_2423()) == 'L' || ch == 'l') {
                        this.TextWindow.AdvanceChar_1426();
                        hasLSuffix = true;
                    }
                }
            }
            else {
                while ((ch = this.TextWindow.PeekChar_2423()) >= '0' && ch <= '9') {
                    this.builder.Append(ch);
                    this.TextWindow.AdvanceChar_1426();
                }
                if (this.ModeIs(LexerMode.DebuggerSyntax) && this.TextWindow.PeekChar_2423() == '#') {
                    this.TextWindow.AdvanceChar_1426();
                    info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/true);
                    info.refObj.Kind = SyntaxKind.IdentifierToken;
                    this.AddError_9129(Lexer.MakeError_4977(ErrorCode.ERR_LegacyObjectIdSyntax));
                    return true;
                }
                if ((ch = this.TextWindow.PeekChar_2423()) == '.') {
                    var ch2 = this.TextWindow.PeekChar_4867(1);
                    if (ch2 >= '0' && ch2 <= '9') {
                        hasDecimal = true;
                        this.builder.Append(ch);
                        this.TextWindow.AdvanceChar_1426();
                        while ((ch = this.TextWindow.PeekChar_2423()) >= '0' && ch <= '9') {
                            this.builder.Append(ch);
                            this.TextWindow.AdvanceChar_1426();
                        }
                    }
                    else if (this.builder.Length == 0) {
                        info.refObj.Kind = SyntaxKind.DotToken;
                        this.TextWindow.Reset(start);
                        return false;
                    }
                }
                if ((ch = this.TextWindow.PeekChar_2423()) == 'E' || ch == 'e') {
                    this.builder.Append(ch);
                    this.TextWindow.AdvanceChar_1426();
                    hasExponent = true;
                    if ((ch = this.TextWindow.PeekChar_2423()) == '-' || ch == '+') {
                        this.builder.Append(ch);
                        this.TextWindow.AdvanceChar_1426();
                    }
                    while ((ch = this.TextWindow.PeekChar_2423()) >= '0' && ch <= '9') {
                        this.builder.Append(ch);
                        this.TextWindow.AdvanceChar_1426();
                    }
                }
                if (hasExponent || hasDecimal) {
                    if ((ch = this.TextWindow.PeekChar_2423()) == 'f' || ch == 'F') {
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.ValueKind = SpecialType.System_Single;
                    }
                    else if (ch == 'D' || ch == 'd') {
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.ValueKind = SpecialType.System_Double;
                    }
                    else if (ch == 'm' || ch == 'M') {
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.ValueKind = SpecialType.System_Decimal;
                    }
                    else {
                        info.refObj.ValueKind = SpecialType.System_Double;
                    }
                }
                else if ((ch = this.TextWindow.PeekChar_2423()) == 'f' || ch == 'F') {
                    this.TextWindow.AdvanceChar_1426();
                    info.refObj.ValueKind = SpecialType.System_Single;
                }
                else if (ch == 'D' || ch == 'd') {
                    this.TextWindow.AdvanceChar_1426();
                    info.refObj.ValueKind = SpecialType.System_Double;
                }
                else if (ch == 'm' || ch == 'M') {
                    this.TextWindow.AdvanceChar_1426();
                    info.refObj.ValueKind = SpecialType.System_Decimal;
                }
                else if (ch == 'L' || ch == 'l') {
                    if (ch == 'l') {
                        this.AddError_1749(this.TextWindow.Position, 1, ErrorCode.WRN_LowercaseEllSuffix);
                    }
                    this.TextWindow.AdvanceChar_1426();
                    hasLSuffix = true;
                    if ((ch = this.TextWindow.PeekChar_2423()) == 'u' || ch == 'U') {
                        this.TextWindow.AdvanceChar_1426();
                        hasUSuffix = true;
                    }
                }
                else if (ch == 'u' || ch == 'U') {
                    hasUSuffix = true;
                    this.TextWindow.AdvanceChar_1426();
                    if ((ch = this.TextWindow.PeekChar_2423()) == 'L' || ch == 'l') {
                        this.TextWindow.AdvanceChar_1426();
                        hasLSuffix = true;
                    }
                }
            }
            info.refObj.Kind = SyntaxKind.NumericLiteralToken;
            info.refObj.Text = this.TextWindow.GetText_5693(true);
            System.Diagnostics.Debug.Assert(info.refObj.Text != null);
            var valueText = this.TextWindow.Intern_1886(this.builder);
            var val: number = 0;
            switch (info.refObj.ValueKind) {
                case SpecialType.System_Single:
                    info.refObj.FloatValue = this.GetValueSingle(valueText);
                    break;
                case SpecialType.System_Double:
                    info.refObj.DoubleValue = this.GetValueDouble(valueText);
                    break;
                case SpecialType.System_Decimal:
                    info.refObj.DecimalValue = this.GetValueDecimal(valueText, start, this.TextWindow.Position);
                    break;
                default:
                    if (System.String.IsNullOrEmpty(valueText)) {
                        this.AddError_9129(Lexer.MakeError_4977(ErrorCode.ERR_InvalidNumber));
                        val = 0;
                    }
                    else {
                        val = this.GetValueUInt64(valueText, isHex);
                    }
                    if (!hasUSuffix && !hasLSuffix) {
                        if (val <= System.Int32.MaxValue) {
                            info.refObj.ValueKind = SpecialType.System_Int32;
                            info.refObj.IntValue = <number>val;
                        }
                        else if (val <= System.UInt32.MaxValue) {
                            info.refObj.ValueKind = SpecialType.System_UInt32;
                            info.refObj.UintValue = <number>val;
                        }
                        else if (val <= System.Int64.MaxValue) {
                            info.refObj.ValueKind = SpecialType.System_Int64;
                            info.refObj.LongValue = <number>val;
                        }
                        else {
                            info.refObj.ValueKind = SpecialType.System_UInt64;
                            info.refObj.UlongValue = val;
                        }
                    }
                    else if (hasUSuffix && !hasLSuffix) {
                        if (val <= System.UInt32.MaxValue) {
                            info.refObj.ValueKind = SpecialType.System_UInt32;
                            info.refObj.UintValue = <number>val;
                        }
                        else {
                            info.refObj.ValueKind = SpecialType.System_UInt64;
                            info.refObj.UlongValue = val;
                        }
                    }
                    else if (!hasUSuffix && hasLSuffix) {
                        if (val <= System.Int64.MaxValue) {
                            info.refObj.ValueKind = SpecialType.System_Int64;
                            info.refObj.LongValue = <number>val;
                        }
                        else {
                            info.refObj.ValueKind = SpecialType.System_UInt64;
                            info.refObj.UlongValue = val;
                        }
                    }
                    else {
                        System.Diagnostics.Debug.Assert(hasUSuffix && hasLSuffix);
                        info.refObj.ValueKind = SpecialType.System_UInt64;
                        info.refObj.UlongValue = val;
                    }
                    break;
            }
            return true;
        }
        private GetValueInt32(text: string, isHex: boolean): number {
            var result: number = 0;
            var result_ref0 = { refObj: result };
            var ret_val__931 = System.Int32.TryParse(text, isHex ? System.Globalization.NumberStyles.AllowHexSpecifier : System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, result_ref0);

            result = result_ref0.refObj;
            if (!ret_val__931) {
                this.AddError_9129(Lexer.MakeError_4977(ErrorCode.ERR_IntOverflow));
            }
            return result;
        }
        private GetValueUInt64(text: string, isHex: boolean): number {
            var result: number = 0;
            var result_ref0 = { refObj: result };
            var ret_val__239 = System.UInt64.TryParse(text, isHex ? System.Globalization.NumberStyles.AllowHexSpecifier : System.Globalization.NumberStyles.None, System.Globalization.CultureInfo.InvariantCulture, result_ref0);

            result = result_ref0.refObj;
            if (!ret_val__239) {
                this.AddError_9129(Lexer.MakeError_4977(ErrorCode.ERR_IntOverflow));
            }
            return result;
        }
        private GetValueDouble(text: string): number {
            var result: number = 0;
            var result_ref0 = { refObj: result };
            var ret_val__854 = System.Double.TryParse(text, System.Globalization.NumberStyles.AllowDecimalPoint | System.Globalization.NumberStyles.AllowExponent, System.Globalization.CultureInfo.InvariantCulture, result_ref0);

            result = result_ref0.refObj;
            if (!ret_val__854) {
                this.AddError_9129(Lexer.MakeError_2338(ErrorCode.ERR_FloatOverflow, "double"));
            }
            return result;
        }
        private GetValueSingle(text: string): number {
            var result: number = 0;
            var result_ref0 = { refObj: result };
            var ret_val__271 = System.Single.TryParse(text, System.Globalization.NumberStyles.AllowDecimalPoint | System.Globalization.NumberStyles.AllowExponent, System.Globalization.CultureInfo.InvariantCulture, result_ref0);

            result = result_ref0.refObj;
            if (!ret_val__271) {
                this.AddError_9129(Lexer.MakeError_2338(ErrorCode.ERR_FloatOverflow, "float"));
            }
            return result;
        }
        private GetValueDecimal(text: string, start: number, end: number): number {
            var result: number = 0;
            var result_ref0 = { refObj: result };
            var ret_val__894 = System.Decimal.TryParse(text, System.Globalization.NumberStyles.AllowDecimalPoint | System.Globalization.NumberStyles.AllowExponent, System.Globalization.CultureInfo.InvariantCulture, result_ref0);

            result = result_ref0.refObj;
            if (!ret_val__894) {
                this.AddError_9129(this.MakeError_1930(start, end - start, ErrorCode.ERR_FloatOverflow, "decimal"));
            }
            return result;
        }
        private ResetIdentBuffer(): void {
            this.identLen = 0;
        }
        private AddIdentChar(ch: string): void {
            if (this.identLen >= this.identBuffer.length) {
                this.GrowIdentBuffer();
            }
            this.identBuffer[this.identLen++] = ch;
        }
        private GrowIdentBuffer(): void {
            var tmp = new Array<string>(this.identBuffer.length * 2);
            TSArray.Copy(this.identBuffer, tmp, this.identBuffer.length);
            this.identBuffer = tmp;
        }
        private ScanIdentifier(info: { refObj: Lexer.TokenInfo }): boolean {
            return this.ScanIdentifier_FastPath(info) || (this.InXmlCrefOrNameAttributeValue ? this.ScanIdentifier_CrefSlowPath(info) : this.ScanIdentifier_SlowPath(info));
        }
        private ScanIdentifier_FastPath(info: { refObj: Lexer.TokenInfo }): boolean {
            if ((this.mode & LexerMode.MaskLexMode) == LexerMode.DebuggerSyntax) {
                return false;
            }
            var currentOffset = this.TextWindow.Offset;
            var characterWindow = this.TextWindow.CharacterWindow;
            var characterWindowCount = this.TextWindow.CharacterWindowCount;
            var startOffset = currentOffset;
            __Outer83: while (true) {
                if (currentOffset == characterWindowCount) {
                    return false;
                }
                var __tSwitch31 = characterWindow[currentOffset];
                while (true) {

                    switch (__tSwitch31) {
                        case '&':
                            if (this.InXmlCrefOrNameAttributeValue) {
                                return false;
                            }
                            __tSwitch31 = '\0'; continue;
                        case '\0':
                        case ' ':
                        case '\r':
                        case '\n':
                        case '\t':
                        case '!':
                        case '%':
                        case '(':
                        case ')':
                        case '*':
                        case '+':
                        case ',':
                        case '-':
                        case '.':
                        case '/':
                        case ':':
                        case ';':
                        case '<':
                        case '=':
                        case '>':
                        case '?':
                        case '[':
                        case ']':
                        case '^':
                        case '{':
                        case '|':
                        case '}':
                        case '~':
                        case '"':
                        case '\'':
                            var length = currentOffset - startOffset;
                            this.TextWindow.AdvanceChar_5713(length);
                            info.refObj.Text = info.refObj.StringValue = this.TextWindow.Intern_1831(characterWindow, startOffset, length);
                            info.refObj.IsVerbatim = false;
                            return true;
                        case '0':
                        case '1':
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                            if (currentOffset == startOffset) {
                                return false;
                            }
                            else {
                                __tSwitch31 = 'A'; continue;
                            }
                        case 'A':
                        case 'B':
                        case 'C':
                        case 'D':
                        case 'E':
                        case 'F':
                        case 'G':
                        case 'H':
                        case 'I':
                        case 'J':
                        case 'K':
                        case 'L':
                        case 'M':
                        case 'N':
                        case 'O':
                        case 'P':
                        case 'Q':
                        case 'R':
                        case 'S':
                        case 'T':
                        case 'U':
                        case 'V':
                        case 'W':
                        case 'X':
                        case 'Y':
                        case 'Z':
                        case '_':
                        case 'a':
                        case 'b':
                        case 'c':
                        case 'd':
                        case 'e':
                        case 'f':
                        case 'g':
                        case 'h':
                        case 'i':
                        case 'j':
                        case 'k':
                        case 'l':
                        case 'm':
                        case 'n':
                        case 'o':
                        case 'p':
                        case 'q':
                        case 'r':
                        case 's':
                        case 't':
                        case 'u':
                        case 'v':
                        case 'w':
                        case 'x':
                        case 'y':
                        case 'z':
                            currentOffset++;
                            continue __Outer83;
                        default:
                            return false;
                    }


                    break;
                }

            }
        }
        private ScanIdentifier_SlowPath(info: { refObj: Lexer.TokenInfo }): boolean {
            var start: number = this.TextWindow.Position;
            this.ResetIdentBuffer();
            info.refObj.IsVerbatim = this.TextWindow.PeekChar_2423() == '@';
            if (info.refObj.IsVerbatim) {
                this.TextWindow.AdvanceChar_1426();
            }
            var isObjectAddress: boolean = false;
            LoopExit:
            __Outer89: while (true) {
                var surrogateCharacter: string = SlidingTextWindow.InvalidCharacter;
                var isEscaped: boolean = false;
                var ch: string = this.TextWindow.PeekChar_2423();
                top:
                while (true) {

                    var __tSwitch85 = ch;
                    while (true) {
                        var __tDefault87 = false;
                        switch (__tSwitch85) {
                            case '\\':
                                if (!isEscaped && this.TextWindow.IsUnicodeEscape()) {
                                    info.refObj.HasIdentifierEscapeSequence = true;
                                    isEscaped = true;
                                    var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                                    var ret_val__750 = this.TextWindow.PeekUnicodeEscape(surrogateCharacter_ref0);

                                    surrogateCharacter = surrogateCharacter_ref0.refObj;
                                    ch = ret_val__750;
                                    continue top;
                                }
                                __tDefault87 = true; break;
                            case '$':
                                if (!this.ModeIs(LexerMode.DebuggerSyntax) || this.identLen > 0) {
                                    break LoopExit;
                                }
                                break;
                            case SlidingTextWindow.InvalidCharacter:
                                if (!this.TextWindow.IsReallyAtEnd()) {
                                    __tDefault87 = true; break;
                                }
                                break LoopExit;
                            case '_':
                            case 'A':
                            case 'B':
                            case 'C':
                            case 'D':
                            case 'E':
                            case 'F':
                            case 'G':
                            case 'H':
                            case 'I':
                            case 'J':
                            case 'K':
                            case 'L':
                            case 'M':
                            case 'N':
                            case 'O':
                            case 'P':
                            case 'Q':
                            case 'R':
                            case 'S':
                            case 'T':
                            case 'U':
                            case 'V':
                            case 'W':
                            case 'X':
                            case 'Y':
                            case 'Z':
                            case 'a':
                            case 'b':
                            case 'c':
                            case 'd':
                            case 'e':
                            case 'f':
                            case 'g':
                            case 'h':
                            case 'i':
                            case 'j':
                            case 'k':
                            case 'l':
                            case 'm':
                            case 'n':
                            case 'o':
                            case 'p':
                            case 'q':
                            case 'r':
                            case 's':
                            case 't':
                            case 'u':
                            case 'v':
                            case 'w':
                            case 'x':
                            case 'y':
                            case 'z':
                                {
                                    break;
                                }
                            case '0':
                                {
                                    if (this.identLen == 0) {
                                        if (info.refObj.IsVerbatim && this.ModeIs(LexerMode.DebuggerSyntax) && (System.String.ToLower(this.TextWindow.PeekChar_4867(1)) == 'x')) {
                                            isObjectAddress = true;
                                        }
                                        else {
                                            break LoopExit;
                                        }
                                    }
                                    break;
                                }
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                {
                                    if (this.identLen == 0) {
                                        break LoopExit;
                                    }
                                    break;
                                }
                            case ' ':
                            case '\t':
                            case '.':
                            case ';':
                            case '(':
                            case ')':
                            case ',':
                                break LoopExit;
                            case '<':
                                if (this.identLen == 0 && this.ModeIs(LexerMode.DebuggerSyntax) && this.TextWindow.PeekChar_4867(1) == '>') {
                                    this.TextWindow.AdvanceChar_5713(2);
                                    this.AddIdentChar('<');
                                    this.AddIdentChar('>');
                                    continue __Outer89;
                                }
                                break LoopExit;
                            default:
                                {
                                    if (this.identLen == 0 && ch.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierStartCharacter(ch)) {
                                        break;
                                    }
                                    else if (this.identLen > 0 && ch.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierPartCharacter(ch)) {
                                        if (SyntaxFacts.IsFormattingChar_1141(ch)) {
                                            if (isEscaped) {
                                                var error: SyntaxDiagnosticInfo;
                                                var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                                                var error_ref1 = { refObj: error };
                                                this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                                                surrogateCharacter = surrogateCharacter_ref0.refObj;

                                                error = error_ref1.refObj;;
                                                this.AddError_9129(error);
                                            }
                                            else {
                                                this.TextWindow.AdvanceChar_1426();
                                            }
                                            continue __Outer89;
                                        }
                                        break;
                                    }
                                    else {
                                        break LoopExit;
                                    }
                                }
                        }


                        if (__tDefault87) {
                            {
                                if (this.identLen == 0 && ch.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierStartCharacter(ch)) {
                                    break;
                                }
                                else if (this.identLen > 0 && ch.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierPartCharacter(ch)) {
                                    if (SyntaxFacts.IsFormattingChar_1141(ch)) {
                                        if (isEscaped) {
                                            var error: SyntaxDiagnosticInfo;
                                            var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                                            var error_ref1 = { refObj: error };
                                            this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                                            surrogateCharacter = surrogateCharacter_ref0.refObj;

                                            error = error_ref1.refObj;;
                                            this.AddError_9129(error);
                                        }
                                        else {
                                            this.TextWindow.AdvanceChar_1426();
                                        }
                                        continue __Outer89;
                                    }
                                    break;
                                }
                                else {
                                    break LoopExit;
                                }
                            }
                        }

                        break;
                    }
                    break;
                }
                if (isEscaped) {
                    var error: SyntaxDiagnosticInfo;
                    var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                    var error_ref1 = { refObj: error };
                    this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                    surrogateCharacter = surrogateCharacter_ref0.refObj;

                    error = error_ref1.refObj;;
                    this.AddError_9129(error);
                }
                else {
                    this.TextWindow.AdvanceChar_1426();
                }
                this.AddIdentChar(ch);
                if (surrogateCharacter != SlidingTextWindow.InvalidCharacter) {
                    this.AddIdentChar(surrogateCharacter);
                }
            }
            var width = this.TextWindow.Width;
            Fail:
            while (true) {
                if (this.identLen > 0) {
                    info.refObj.Text = this.TextWindow.GetInternedText();
                    if (this.identLen == width) {
                        info.refObj.StringValue = info.refObj.Text;
                    }
                    else {
                        info.refObj.StringValue = this.TextWindow.Intern_1831(this.identBuffer, 0, this.identLen);
                    }
                    if (isObjectAddress) {
                        var objectAddressOffset: number = 2;
                        System.Diagnostics.Debug.Assert(System.String.Equals(info.refObj.Text.substr(0, objectAddressOffset + 1), "@0x", System.StringComparison.OrdinalIgnoreCase));
                        var valueText = this.TextWindow.Intern_1831(this.identBuffer, objectAddressOffset, this.identLen - objectAddressOffset);
                        if ((valueText.length == 0) || !Roslyn.Utilities.StringExtensions.All(valueText,
                            Lexer.IsValidHexDigit)) {
                            break Fail;
                        }
                        this.GetValueUInt64(valueText,/*isHex:*/true);
                    }
                    return true;
                } break;
            }
            info.refObj.Text = null;
            info.refObj.StringValue = null;
            this.TextWindow.Reset(start);
            return false;
        }
        private static IsValidHexDigit(c: string): boolean {
            if ((c >= '0') && (c <= '9')) {
                return true;
            }
            c = System.String.ToLower(c);
            return (c >= 'a') && (c <= 'f');
        }
        private ScanIdentifier_CrefSlowPath(info: { refObj: Lexer.TokenInfo }): boolean {
            System.Diagnostics.Debug.Assert(this.InXmlCrefOrNameAttributeValue);
            var start: number = this.TextWindow.Position;
            this.ResetIdentBuffer();
            if (this.AdvanceIfMatches('@')) {
                if (this.InXmlNameAttributeValue) {
                    this.AddIdentChar('@');
                }
                else {
                    info.refObj.IsVerbatim = true;
                }
            }
            LoopExit:
            __Outer57: while (true) {
                var beforeConsumed: number = this.TextWindow.Position;
                var consumedChar: string = '';
                var consumedSurrogate: string = '';
                if (this.TextWindow.PeekChar_2423() == '&') {
                    var consumedChar_ref0 = { refObj: consumedChar };
                    var consumedSurrogate_ref1 = { refObj: consumedSurrogate };
                    var ret_val__978 = this.TextWindow.TryScanXmlEntity(consumedChar_ref0, consumedSurrogate_ref1);

                    consumedChar = consumedChar_ref0.refObj;

                    consumedSurrogate = consumedSurrogate_ref1.refObj;
                    if (!ret_val__978) {
                        this.TextWindow.Reset(beforeConsumed);
                        break LoopExit;
                    }
                }
                else {
                    consumedChar = this.TextWindow.NextChar();
                    consumedSurrogate = SlidingTextWindow.InvalidCharacter;
                }
                var isEscaped: boolean = false;
                top:
                while (true) {

                    var __tSwitch53 = consumedChar;
                    while (true) {
                        var __tDefault38 = false;
                        switch (__tSwitch53) {
                            case '\\':
                                if (!isEscaped && (this.TextWindow.Position == beforeConsumed + 1) && (this.TextWindow.PeekChar_2423() == 'u' || this.TextWindow.PeekChar_2423() == 'U')) {
                                    System.Diagnostics.Debug.Assert(consumedSurrogate == SlidingTextWindow.InvalidCharacter, "Since consumedChar == '\\'");
                                    info.refObj.HasIdentifierEscapeSequence = true;
                                    this.TextWindow.Reset(beforeConsumed);
                                    isEscaped = true;
                                    var error: SyntaxDiagnosticInfo;
                                    var consumedSurrogate_ref0 = { refObj: consumedSurrogate };
                                    var error_ref1 = { refObj: error };
                                    var ret_val__759 = this.TextWindow.NextUnicodeEscape(consumedSurrogate_ref0, error_ref1);

                                    consumedSurrogate = consumedSurrogate_ref0.refObj;

                                    error = error_ref1.refObj;
                                    consumedChar = ret_val__759;
                                    this.AddCrefError_2347(error);
                                    continue top;
                                }
                                __tDefault38 = true; break;
                            case '_':
                            case 'A':
                            case 'B':
                            case 'C':
                            case 'D':
                            case 'E':
                            case 'F':
                            case 'G':
                            case 'H':
                            case 'I':
                            case 'J':
                            case 'K':
                            case 'L':
                            case 'M':
                            case 'N':
                            case 'O':
                            case 'P':
                            case 'Q':
                            case 'R':
                            case 'S':
                            case 'T':
                            case 'U':
                            case 'V':
                            case 'W':
                            case 'X':
                            case 'Y':
                            case 'Z':
                            case 'a':
                            case 'b':
                            case 'c':
                            case 'd':
                            case 'e':
                            case 'f':
                            case 'g':
                            case 'h':
                            case 'i':
                            case 'j':
                            case 'k':
                            case 'l':
                            case 'm':
                            case 'n':
                            case 'o':
                            case 'p':
                            case 'q':
                            case 'r':
                            case 's':
                            case 't':
                            case 'u':
                            case 'v':
                            case 'w':
                            case 'x':
                            case 'y':
                            case 'z':
                                {
                                    break;
                                }
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                {
                                    if (this.identLen == 0) {
                                        this.TextWindow.Reset(beforeConsumed);
                                        break LoopExit;
                                    }
                                    break;
                                }
                            case ' ':
                            case '$':
                            case '\t':
                            case '.':
                            case ';':
                            case '(':
                            case ')':
                            case ',':
                            case '<':
                                this.TextWindow.Reset(beforeConsumed);
                                break LoopExit;
                            case SlidingTextWindow.InvalidCharacter:
                                if (!this.TextWindow.IsReallyAtEnd()) {
                                    __tDefault38 = true; break;
                                }
                                this.TextWindow.Reset(beforeConsumed);
                                break LoopExit;
                            default:
                                {
                                    if (this.identLen == 0 && consumedChar.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierStartCharacter(consumedChar)) {
                                        break;
                                    }
                                    else if (this.identLen > 0 && consumedChar.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierPartCharacter(consumedChar)) {
                                        if (SyntaxFacts.IsFormattingChar_1141(consumedChar)) {
                                            continue __Outer57;
                                        }
                                        break;
                                    }
                                    else {
                                        this.TextWindow.Reset(beforeConsumed);
                                        break LoopExit;
                                    }
                                }
                        }


                        if (__tDefault38) {
                            {
                                if (this.identLen == 0 && consumedChar.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierStartCharacter(consumedChar)) {
                                    break;
                                }
                                else if (this.identLen > 0 && consumedChar.charCodeAt(0) > 127 && SyntaxFacts.IsIdentifierPartCharacter(consumedChar)) {
                                    if (SyntaxFacts.IsFormattingChar_1141(consumedChar)) {
                                        continue __Outer57;
                                    }
                                    break;
                                }
                                else {
                                    this.TextWindow.Reset(beforeConsumed);
                                    break LoopExit;
                                }
                            }
                        }

                        break;
                    }
                    break;
                }
                this.AddIdentChar(consumedChar);
                if (consumedSurrogate != SlidingTextWindow.InvalidCharacter) {
                    this.AddIdentChar(consumedSurrogate);
                }
            }
            if (this.identLen > 0) {
                var width = this.TextWindow.Width;
                if (this.identLen == width) {
                    info.refObj.StringValue = this.TextWindow.GetInternedText();
                    info.refObj.Text = info.refObj.StringValue;
                }
                else {
                    info.refObj.StringValue = this.TextWindow.Intern_1831(this.identBuffer, 0, this.identLen);
                    info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/false);
                }
                return true;
            }
            else {
                info.refObj.Text = null;
                info.refObj.StringValue = null;
                this.TextWindow.Reset(start);
                return false;
            }
        }
        private ScanIdentifierOrKeyword(info: { refObj: Lexer.TokenInfo }): boolean {
            info.refObj.ContextualKind = SyntaxKind.None;
            if (this.ScanIdentifier(info)) {
                if (!info.refObj.IsVerbatim && !info.refObj.HasIdentifierEscapeSequence) {
                    if (this.ModeIs(LexerMode.Directive)) {
                        var keywordKind: SyntaxKind = SyntaxFacts.GetPreprocessorKeywordKind(info.refObj.Text);
                        if (SyntaxFacts.IsPreprocessorContextualKeyword(keywordKind)) {
                            info.refObj.Kind = SyntaxKind.IdentifierToken;
                            info.refObj.ContextualKind = keywordKind;
                        }
                        else {
                            info.refObj.Kind = keywordKind;
                        }
                    }
                    else {
                        var Kind_ref0 = { refObj: info.refObj.Kind };
                        var ret_val__141 = this.cache.TryGetKeywordKind(info.refObj.Text, Kind_ref0);

                        info.refObj.Kind = Kind_ref0.refObj;
                        if (!ret_val__141) {
                            info.refObj.ContextualKind = info.refObj.Kind = SyntaxKind.IdentifierToken;
                        }
                        else if (SyntaxFacts.IsContextualKeyword(info.refObj.Kind)) {
                            info.refObj.ContextualKind = info.refObj.Kind;
                            info.refObj.Kind = SyntaxKind.IdentifierToken;
                        }
                    }
                    if (info.refObj.Kind == SyntaxKind.None) {
                        info.refObj.Kind = SyntaxKind.IdentifierToken;
                    }
                }
                else {
                    info.refObj.ContextualKind = info.refObj.Kind = SyntaxKind.IdentifierToken;
                }
                return true;
            }
            else {
                info.refObj.Kind = SyntaxKind.None;
                return false;
            }
        }
        private LexSyntaxTrivia(afterFirstToken: boolean, isTrailing: boolean, triviaList: { refObj: SyntaxListBaseBuilder }): void {
            var onlyWhitespaceOnLine: boolean = !isTrailing;
            while (true) {
                this.Start();
                var ch: string = this.TextWindow.PeekChar_2423();
                if (ch == ' ') {
                    this.AddTrivia(this.ScanWhitespace(), triviaList);
                    continue;
                }
                else if (ch.charCodeAt(0) > 127) {
                    if (SyntaxFacts.IsWhitespace(ch)) {
                        ch = ' ';
                    }
                    else if (SyntaxFacts.IsNewLine(ch)) {
                        ch = '\n';
                    }
                }
                switch (ch) {
                    case ' ':
                    case '\t':
                    case '\v':
                    case '\f':
                    case '\u001A':
                        this.AddTrivia(this.ScanWhitespace(), triviaList);
                        break;
                    case '/':
                        if ((ch = this.TextWindow.PeekChar_4867(1)) == '/') {
                            if (!this.SuppressDocumentationCommentParse && this.TextWindow.PeekChar_4867(2) == '/' && this.TextWindow.PeekChar_4867(3) != '/') {
                                if (isTrailing) {
                                    return
                                }
                                this.AddTrivia(this.LexXmlDocComment(XmlDocCommentStyle.SingleLine), triviaList);
                                break;
                            }
                            this.ScanToEndOfLine();
                            var text = this.TextWindow.GetText_5693(false);
                            this.AddTrivia(SyntaxFactory.Comment(text), triviaList);
                            onlyWhitespaceOnLine = false;
                            break;
                        }
                        else if (ch == '*') {
                            if (!this.SuppressDocumentationCommentParse && this.TextWindow.PeekChar_4867(2) == '*' && this.TextWindow.PeekChar_4867(3) != '*' && this.TextWindow.PeekChar_4867(3) != '/') {
                                if (isTrailing) {
                                    return
                                }
                                this.AddTrivia(this.LexXmlDocComment(XmlDocCommentStyle.Delimited), triviaList);
                                break;
                            }
                            var isTerminated: boolean = false;
                            var isTerminated_ref0 = { refObj: isTerminated };
                            this.ScanMultiLineComment(isTerminated_ref0);

                            isTerminated = isTerminated_ref0.refObj;;
                            if (!isTerminated) {
                                this.AddError_1261(ErrorCode.ERR_OpenEndedComment);
                            }
                            var text = this.TextWindow.GetText_5693(false);
                            this.AddTrivia(SyntaxFactory.Comment(text), triviaList);
                            onlyWhitespaceOnLine = false;
                            break;
                        }
                        return
                    case '\r':
                    case '\n':
                        this.AddTrivia(this.ScanEndOfLine(), triviaList);
                        if (isTrailing) {
                            return
                        }
                        onlyWhitespaceOnLine = true;
                        break;
                    case '#':
                        if (this.allowPreprocessorDirectives) {
                            this.LexDirectiveAndExcludedTrivia(afterFirstToken, isTrailing || !onlyWhitespaceOnLine, triviaList);
                            break;
                        }
                        else {
                            return
                        }
                    default:
                        return
                }
            }
        }
        private AddTrivia(trivia: CSharpSyntaxNode, list: { refObj: SyntaxListBaseBuilder }): void {
            if (this.HasErrors) {
                trivia = CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(trivia,
                    this.GetErrors(/*leadingTriviaWidth:*/0));
            }
            if (list.refObj == null) {
                list.refObj = new SyntaxListBaseBuilder().ctor_1860(Lexer.TriviaListInitialCapacity);
            }
            list.refObj.Add(trivia);
        }
        private ScanMultiLineComment(isTerminated: { refObj: boolean }): boolean {
            if (this.TextWindow.PeekChar_2423() == '/' && this.TextWindow.PeekChar_4867(1) == '*') {
                this.TextWindow.AdvanceChar_5713(2);
                var ch: string = '';
                while (true) {
                    if ((ch = this.TextWindow.PeekChar_2423()) == SlidingTextWindow.InvalidCharacter && this.TextWindow.IsReallyAtEnd()) {
                        isTerminated.refObj = false;
                        break;
                    }
                    else if (ch == '*' && this.TextWindow.PeekChar_4867(1) == '/') {
                        this.TextWindow.AdvanceChar_5713(2);
                        isTerminated.refObj = true;
                        break;
                    }
                    else {
                        this.TextWindow.AdvanceChar_1426();
                    }
                }
                return true;
            }
            else {
                isTerminated.refObj = false;
                return false;
            }
        }
        private ScanToEndOfLine(): void {
            var ch: string = '';
            while (!SyntaxFacts.IsNewLine(ch = this.TextWindow.PeekChar_2423()) && (ch != SlidingTextWindow.InvalidCharacter || !this.TextWindow.IsReallyAtEnd())) {
                this.TextWindow.AdvanceChar_1426();
            }
        }
        private ScanEndOfLine(): CSharpSyntaxNode {
            var ch: string = '';
            switch (ch = this.TextWindow.PeekChar_2423()) {
                case '\r':
                    this.TextWindow.AdvanceChar_1426();
                    if (this.TextWindow.PeekChar_2423() == '\n') {
                        this.TextWindow.AdvanceChar_1426();
                        return SyntaxFactory.CarriageReturnLineFeed;
                    }
                    return SyntaxFactory.CarriageReturn;
                case '\n':
                    this.TextWindow.AdvanceChar_1426();
                    return SyntaxFactory.LineFeed;
                default:
                    if (SyntaxFacts.IsNewLine(ch)) {
                        this.TextWindow.AdvanceChar_1426();
                        return SyntaxFactory.EndOfLine(ch.ToString());
                    }
                    return null;
            }
        }
        private ScanWhitespace(): SyntaxTrivia {
            if (this.createWhitespaceTriviaFunction == null) {
                this.createWhitespaceTriviaFunction = this.CreateWhitespaceTrivia.bind(this);
            }
            var hashCode: number = Roslyn.Utilities.Hash.FnvOffsetBias;
            var onlySpaces: boolean = true;
            top:
            while (true) {

                var ch: string = this.TextWindow.PeekChar_2423();
                var __tSwitch90 = ch;
                while (true) {

                    switch (__tSwitch90) {
                        case '\t':
                        case '\v':
                        case '\f':
                        case '\u001A':
                            onlySpaces = false;
                            __tSwitch90 = ' '; continue;
                        case ' ':
                            this.TextWindow.AdvanceChar_1426();
                            hashCode = Roslyn.Utilities.Hash.CombineFNVHash_8743(hashCode, ch);
                            continue top;
                        case '\r':
                        case '\n':
                            break;
                        default:
                            if (ch.charCodeAt(0) > 127 && SyntaxFacts.IsWhitespace(ch)) {
                                __tSwitch90 = '\t'; continue;
                            }
                            break;
                    } break;
                }


                break;
            }

            if (this.TextWindow.Width == 1 && onlySpaces) {
                return SyntaxFactory.Space;
            }
            else {
                var width = this.TextWindow.Width;
                if (width < Lexer.MaxCachedTokenSize) {
                    return this.cache.LookupTrivia(this.TextWindow.CharacterWindow, this.TextWindow.LexemeRelativeStart, width, hashCode, this.createWhitespaceTriviaFunction);
                }
                else {
                    return this.createWhitespaceTriviaFunction();
                }
            }
        }
        private createWhitespaceTriviaFunction: () => SyntaxTrivia;
        private CreateWhitespaceTrivia(): SyntaxTrivia {
            return SyntaxFactory.Whitespace(this.TextWindow.GetText_5693(/*intern:*/true));
        }
        private LexDirectiveAndExcludedTrivia(afterFirstToken: boolean, afterNonWhitespaceOnLine: boolean, triviaList: { refObj: SyntaxListBaseBuilder }): void {
            var directive = this.LexSingleDirective(true, true, afterFirstToken, afterNonWhitespaceOnLine, triviaList);
            var branching = __as__<BranchingDirectiveTriviaSyntax>(directive, BranchingDirectiveTriviaSyntax);
            if (branching != null && !branching.BranchTaken) {
                this.LexExcludedDirectivesAndTrivia(true, triviaList);
            }
        }
        private LexExcludedDirectivesAndTrivia(endIsActive: boolean, triviaList: { refObj: SyntaxListBaseBuilder }): void {
            while (true) {
                var hasFollowingDirective: boolean = false;
                var hasFollowingDirective_ref0 = { refObj: hasFollowingDirective };
                var ret_val__435 = this.LexDisabledText(hasFollowingDirective_ref0);

                hasFollowingDirective = hasFollowingDirective_ref0.refObj;
                var text = ret_val__435;
                if (text != null) {
                    this.AddTrivia(text, triviaList);
                }
                if (!hasFollowingDirective) {
                    break;
                }
                var directive = this.LexSingleDirective(false, endIsActive, false, false, triviaList);
                var branching = __as__<BranchingDirectiveTriviaSyntax>(directive, BranchingDirectiveTriviaSyntax);
                if (directive.Kind == SyntaxKind.EndIfDirectiveTrivia || (branching != null && branching.BranchTaken)) {
                    break;
                }
                else if (directive.Kind == SyntaxKind.IfDirectiveTrivia) {
                    this.LexExcludedDirectivesAndTrivia(false, triviaList);
                }
            }
        }
        private LexSingleDirective(isActive: boolean, endIsActive: boolean, afterFirstToken: boolean, afterNonWhitespaceOnLine: boolean, triviaList: { refObj: SyntaxListBaseBuilder }): CSharpSyntaxNode {
            if (SyntaxFacts.IsWhitespace(this.TextWindow.PeekChar_2423())) {
                this.Start();
                this.AddTrivia(this.ScanWhitespace(), triviaList);
            }
            var directive: CSharpSyntaxNode;
            var saveMode = this.mode;
            var dp = new DirectiveParser().ctor_9013(this, this.directives)
            try
            {
                directive = dp.ParseDirective(isActive, endIsActive, afterFirstToken, afterNonWhitespaceOnLine);
            }
            finally {
                if (dp != null) dp.Dispose();
            }
            this.AddTrivia(directive, triviaList);
            this.directives = directive.ApplyDirectives(this.directives);
            this.mode = saveMode;
            return directive;
        }
        private LexDisabledText(followedByDirective: { refObj: boolean }): CSharpSyntaxNode {
            this.Start();
            var lastLineStart: number = this.TextWindow.Position;
            var lines: number = 0;
            var allWhitespace: boolean = true;
            while (true) {
                var ch: string = this.TextWindow.PeekChar_2423();
                var __tSwitch83 = ch;
                while (true) {
                    var __tDefault39 = false;
                    switch (__tSwitch83) {
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault39 = true; break;
                            }
                            followedByDirective.refObj = false;
                            return this.TextWindow.Width > 0 ? SyntaxFactory.DisabledText(this.TextWindow.GetText_5693(false)) : null;
                        case '#':
                            if (!this.allowPreprocessorDirectives) {
                                __tDefault39 = true; break;
                            }
                            followedByDirective.refObj = true;
                            if (lastLineStart < this.TextWindow.Position && !allWhitespace) {
                                __tDefault39 = true; break;
                            }
                            this.TextWindow.Reset(lastLineStart);
                            return this.TextWindow.Width > 0 ? SyntaxFactory.DisabledText(this.TextWindow.GetText_5693(false)) : null;
                        case '\r':
                        case '\n':
                            this.ScanEndOfLine();
                            lastLineStart = this.TextWindow.Position;
                            allWhitespace = true;
                            lines++;
                            break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch83 = '\n'; continue;
                            }
                            allWhitespace = allWhitespace && SyntaxFacts.IsWhitespace(ch);
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault39) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch83 = '\n'; continue;
                        }
                        allWhitespace = allWhitespace && SyntaxFacts.IsWhitespace(ch);
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexDirectiveToken(): SyntaxToken {
            this.Start();
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var info_ref0 = { refObj: info };
            this.ScanDirectiveToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(/*leadingTriviaWidth:*/0);
            var trailing = this.LexDirectiveTrailingTrivia(info.Kind == SyntaxKind.EndOfDirectiveToken);
            var info_ref0 = { refObj: info };
            var ret_val__32 = this.Create(info_ref0, null, trailing, errors);

            info = info_ref0.refObj;
            return ret_val__32;
        }
        private ScanDirectiveToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var character: string = '';
            var surrogateCharacter: string = '';
            var isEscaped: boolean = false;
            var __tSwitch80 = character = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault56 = false;
                switch (__tSwitch80) {
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault56 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDirectiveToken;
                        break;
                    case '\r':
                    case '\n':
                        info.refObj.Kind = SyntaxKind.EndOfDirectiveToken;
                        break;
                    case '#':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.HashToken;
                        break;
                    case '(':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.OpenParenToken;
                        break;
                    case ')':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CloseParenToken;
                        break;
                    case ',':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.CommaToken;
                        break;
                    case '!':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.ExclamationEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.ExclamationToken;
                        }
                        break;
                    case '=':
                        this.TextWindow.AdvanceChar_1426();
                        if (this.TextWindow.PeekChar_2423() == '=') {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.EqualsEqualsToken;
                        }
                        else {
                            info.refObj.Kind = SyntaxKind.EqualsToken;
                        }
                        break;
                    case '&':
                        if (this.TextWindow.PeekChar_4867(1) == '&') {
                            this.TextWindow.AdvanceChar_5713(2);
                            info.refObj.Kind = SyntaxKind.AmpersandAmpersandToken;
                            break;
                        }
                        __tDefault56 = true; break;
                    case '|':
                        if (this.TextWindow.PeekChar_4867(1) == '|') {
                            this.TextWindow.AdvanceChar_5713(2);
                            info.refObj.Kind = SyntaxKind.BarBarToken;
                            break;
                        }
                        __tDefault56 = true; break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.ScanInteger();
                        info.refObj.Kind = SyntaxKind.NumericLiteralToken;
                        info.refObj.Text = this.TextWindow.GetText_5693(true);
                        info.refObj.ValueKind = SpecialType.System_Int32;
                        info.refObj.IntValue = this.GetValueInt32(info.refObj.Text, false);
                        break;
                    case '\"':
                        this.ScanStringLiteral(info, false);
                        break;
                    case '\\':
                        {
                            var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                            var ret_val__334 = this.TextWindow.PeekCharOrUnicodeEscape(surrogateCharacter_ref0);

                            surrogateCharacter = surrogateCharacter_ref0.refObj;
                            character = ret_val__334;
                            isEscaped = true;
                            if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                                this.ScanIdentifierOrKeyword(info);
                                break;
                            }
                            __tDefault56 = true; break;
                        }
                    default:
                        if (!isEscaped && SyntaxFacts.IsNewLine(character)) {
                            __tSwitch80 = '\n'; continue;
                        }
                        if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                            this.ScanIdentifierOrKeyword(info);
                        }
                        else {
                            if (isEscaped) {
                                var error: SyntaxDiagnosticInfo;
                                var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                                var error_ref1 = { refObj: error };
                                this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                                surrogateCharacter = surrogateCharacter_ref0.refObj;

                                error = error_ref1.refObj;;
                                this.AddError_9129(error);
                            }
                            else {
                                this.TextWindow.AdvanceChar_1426();
                            }
                            info.refObj.Kind = SyntaxKind.None;
                            info.refObj.Text = this.TextWindow.GetText_5693(true);
                        }
                        break;
                }


                if (__tDefault56) {
                    if (!isEscaped && SyntaxFacts.IsNewLine(character)) {
                        __tSwitch80 = '\n'; continue;
                    }
                    if (SyntaxFacts.IsIdentifierStartCharacter(character)) {
                        this.ScanIdentifierOrKeyword(info);
                    }
                    else {
                        if (isEscaped) {
                            var error: SyntaxDiagnosticInfo;
                            var surrogateCharacter_ref0 = { refObj: surrogateCharacter };
                            var error_ref1 = { refObj: error };
                            this.TextWindow.NextCharOrUnicodeEscape(surrogateCharacter_ref0, error_ref1);

                            surrogateCharacter = surrogateCharacter_ref0.refObj;

                            error = error_ref1.refObj;;
                            this.AddError_9129(error);
                        }
                        else {
                            this.TextWindow.AdvanceChar_1426();
                        }
                        info.refObj.Kind = SyntaxKind.None;
                        info.refObj.Text = this.TextWindow.GetText_5693(true);
                    }
                    break;
                }

                break;
            }

            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.None || info.refObj.Text != null);
            return info.refObj.Kind != SyntaxKind.None;
        }
        private LexDirectiveTrailingTrivia(includeEndOfLine: boolean): SyntaxListBaseBuilder {
            var trivia: SyntaxListBaseBuilder = null;
            var tr: CSharpSyntaxNode;
            while (true) {
                var pos = this.TextWindow.Position;
                tr = this.LexDirectiveTrivia();
                if (tr == null) {
                    break;
                }
                else if (tr.Kind == SyntaxKind.EndOfLineTrivia) {
                    if (includeEndOfLine) {
                        var trivia_ref0 = { refObj: trivia };
                        this.AddTrivia(tr, trivia_ref0);

                        trivia = trivia_ref0.refObj;;
                    }
                    else {
                        this.TextWindow.Reset(pos);
                    }
                    break;
                }
                else {
                    var trivia_ref0 = { refObj: trivia };
                    this.AddTrivia(tr, trivia_ref0);

                    trivia = trivia_ref0.refObj;;
                }
            }
            return trivia;
        }
        private LexDirectiveTrivia(): CSharpSyntaxNode {
            var trivia: CSharpSyntaxNode = null;
            this.Start();
            var ch: string = this.TextWindow.PeekChar_2423();
            var __tSwitch98 = ch;
            while (true) {

                switch (__tSwitch98) {
                    case '/':
                        if (this.TextWindow.PeekChar_4867(1) == '/') {
                            this.ScanToEndOfLine();
                            var text = this.TextWindow.GetText_5693(false);
                            trivia = SyntaxFactory.Comment(text);
                        }
                        break;
                    case '\r':
                    case '\n':
                        trivia = this.ScanEndOfLine();
                        break;
                    case ' ':
                    case '\t':
                    case '\v':
                    case '\f':
                        trivia = this.ScanWhitespace();
                        break;
                    default:
                        if (SyntaxFacts.IsWhitespace(ch)) {
                            __tSwitch98 = ' '; continue;
                        }
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch98 = '\n'; continue;
                        }
                        break;
                }


                break;
            }

            return trivia;
        }
        private xmlParser: DocumentationCommentParser;
        private LexXmlDocComment(style: XmlDocCommentStyle): CSharpSyntaxNode {
            var saveMode = this.mode;
            var isTerminated: boolean = false;
            var mode = style == XmlDocCommentStyle.SingleLine ? LexerMode.XmlDocCommentStyleSingleLine : LexerMode.XmlDocCommentStyleDelimited;
            if (this.xmlParser == null) {
                this.xmlParser = new DocumentationCommentParser().ctor_5488(this, mode);
            }
            else {
                this.xmlParser.ReInitialize_Overload(mode);
            }
            var isTerminated_ref0 = { refObj: isTerminated };
            var ret_val__108 = this.xmlParser.ParseDocumentationComment(isTerminated_ref0);

            isTerminated = isTerminated_ref0.refObj;
            var docComment = ret_val__108;
            System.Diagnostics.Debug.Assert(this.LocationIs(XmlDocCommentLocation.End) || this.TextWindow.PeekChar_2423() == SlidingTextWindow.InvalidCharacter);
            this.mode = saveMode;
            if (!isTerminated) {
                this.AddError_1749(this.TextWindow.LexemeStartPosition, this.TextWindow.Width, ErrorCode.ERR_OpenEndedComment);
            }
            return docComment;
        }
        private LexXmlToken(): SyntaxToken {
            var xmlTokenInfo: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTrivia(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var xmlTokenInfo_ref0 = { refObj: xmlTokenInfo };
            this.ScanXmlToken(xmlTokenInfo_ref0);

            xmlTokenInfo = xmlTokenInfo_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var xmlTokenInfo_ref0 = { refObj: xmlTokenInfo };
            var ret_val__777 = this.Create(xmlTokenInfo_ref0, leading, null, errors);

            xmlTokenInfo = xmlTokenInfo_ref0.refObj;
            return ret_val__777;
        }
        private ScanXmlToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var ch: string = '';
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch77 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault72 = false;
                switch (__tSwitch77) {
                    case '&':
                        this.ScanXmlEntity(info);
                        info.refObj.Kind = SyntaxKind.XmlEntityLiteralToken;
                        break;
                    case '<':
                        this.ScanXmlTagStart(info);
                        break;
                    case '\r':
                    case '\n':
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault72 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch77 = '\n'; continue;
                        }
                        this.ScanXmlText(info);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        break;
                }


                if (__tDefault72) {
                    if (SyntaxFacts.IsNewLine(ch)) {
                        __tSwitch77 = '\n'; continue;
                    }
                    this.ScanXmlText(info);
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    break;
                }

                break;
            }

            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.None || info.refObj.Text != null);
            return info.refObj.Kind != SyntaxKind.None;
        }
        private ScanXmlTagStart(info: { refObj: Lexer.TokenInfo }): void {
            System.Diagnostics.Debug.Assert(this.TextWindow.PeekChar_2423() == '<');
            if (this.TextWindow.PeekChar_4867(1) == '!') {
                if (this.TextWindow.PeekChar_4867(2) == '-' && this.TextWindow.PeekChar_4867(3) == '-') {
                    this.TextWindow.AdvanceChar_5713(4);
                    info.refObj.Kind = SyntaxKind.XmlCommentStartToken;
                }
                else if (this.TextWindow.PeekChar_4867(2) == '[' && this.TextWindow.PeekChar_4867(3) == 'C' && this.TextWindow.PeekChar_4867(4) == 'D' && this.TextWindow.PeekChar_4867(5) == 'A' && this.TextWindow.PeekChar_4867(6) == 'T' && this.TextWindow.PeekChar_4867(7) == 'A' && this.TextWindow.PeekChar_4867(8) == '[') {
                    this.TextWindow.AdvanceChar_5713(9);
                    info.refObj.Kind = SyntaxKind.XmlCDataStartToken;
                }
                else {
                    this.TextWindow.AdvanceChar_1426();
                    info.refObj.Kind = SyntaxKind.LessThanToken;
                }
            }
            else if (this.TextWindow.PeekChar_4867(1) == '/') {
                this.TextWindow.AdvanceChar_5713(2);
                info.refObj.Kind = SyntaxKind.LessThanSlashToken;
            }
            else if (this.TextWindow.PeekChar_4867(1) == '?') {
                this.TextWindow.AdvanceChar_5713(2);
                info.refObj.Kind = SyntaxKind.XmlProcessingInstructionStartToken;
            }
            else {
                this.TextWindow.AdvanceChar_1426();
                info.refObj.Kind = SyntaxKind.LessThanToken;
            }
        }
        private ScanXmlEntity(info: { refObj: Lexer.TokenInfo }): void {
            info.refObj.StringValue = null;
            System.Diagnostics.Debug.Assert(this.TextWindow.PeekChar_2423() == '&');
            this.TextWindow.AdvanceChar_1426();
            this.builder.Clear();
            var error: XmlParseErrorCode = null;
            var errorArgs: Object[] = null;
            var ch: string = '';
            if (Lexer.IsXmlNameStartChar(ch = this.TextWindow.PeekChar_2423())) {
                while (Lexer.IsXmlNameChar(ch = this.TextWindow.PeekChar_2423())) {
                    this.TextWindow.AdvanceChar_1426();
                    this.builder.Append(ch);
                }
                switch (this.builder.ToString()) {
                    case "lt":
                        info.refObj.StringValue = "<";
                        break;
                    case "gt":
                        info.refObj.StringValue = ">";
                        break;
                    case "amp":
                        info.refObj.StringValue = "&";
                        break;
                    case "apos":
                        info.refObj.StringValue = "'";
                        break;
                    case "quot":
                        info.refObj.StringValue = "\"";
                        break;
                    default:
                        error = XmlParseErrorCode.XML_RefUndefinedEntity_1;
                        errorArgs = new Array(this.builder.ToString());
                        break;
                }
            }
            else if (ch == '#') {
                this.TextWindow.AdvanceChar_1426();
                var isHex: boolean = this.TextWindow.PeekChar_2423() == 'x';
                var charValue: number = 0;
                if (isHex) {
                    this.TextWindow.AdvanceChar_1426();
                    while (SyntaxFacts.IsHexDigit(ch = this.TextWindow.PeekChar_2423())) {
                        this.TextWindow.AdvanceChar_1426();
                        if (charValue <= 0x7FFFFFF) {
                            charValue = (charValue << 4) + <number>SyntaxFacts.HexValue(ch);
                        }
                    }
                }
                else {
                    while (SyntaxFacts.IsDecDigit(ch = this.TextWindow.PeekChar_2423())) {
                        this.TextWindow.AdvanceChar_1426();
                        if (charValue <= 0x7FFFFFF) {
                            charValue = (charValue << 3) + (charValue << 1) + <number>SyntaxFacts.DecValue(ch);
                        }
                    }
                }
                if (this.TextWindow.PeekChar_2423() != ';') {
                    error = XmlParseErrorCode.XML_InvalidCharEntity;
                }
                if (Lexer.MatchesProductionForXmlChar(charValue)) {
                    var lowSurrogate: string = '';
                    var lowSurrogate_ref0 = { refObj: lowSurrogate };
                    var ret_val__363 = SlidingTextWindow.GetCharsFromUtf32(charValue, lowSurrogate_ref0);

                    lowSurrogate = lowSurrogate_ref0.refObj;
                    var highSurrogate: string = ret_val__363;
                    this.builder.Append(highSurrogate);
                    if (lowSurrogate != SlidingTextWindow.InvalidCharacter) {
                        this.builder.Append(lowSurrogate);
                    }
                    info.refObj.StringValue = this.builder.ToString();
                }
                else {
                    if (error == null) {
                        error = XmlParseErrorCode.XML_InvalidUnicodeChar;
                    }
                }
            }
            else {
                if (SyntaxFacts.IsWhitespace(ch) || SyntaxFacts.IsNewLine(ch)) {
                    if (error == null) {
                        error = XmlParseErrorCode.XML_InvalidWhitespace;
                    }
                }
                else {
                    if (error == null) {
                        error = XmlParseErrorCode.XML_InvalidToken;
                        errorArgs = new Array(ch.ToString());
                    }
                }
            }
            ch = this.TextWindow.PeekChar_2423();
            if (ch == ';') {
                this.TextWindow.AdvanceChar_1426();
            }
            else {
                if (error == null) {
                    error = XmlParseErrorCode.XML_InvalidToken;
                    errorArgs = new Array(ch.ToString());
                }
            }
            info.refObj.Text = this.TextWindow.GetText_5693(true);
            if (info.refObj.StringValue == null) {
                info.refObj.StringValue = info.refObj.Text;
            }
            if (error != null) {
                this.AddError_2611(error, errorArgs != null ? errorArgs : Roslyn.Utilities.SpecializedCollections.EmptyArray<Object>());
            }
        }
        private static MatchesProductionForXmlChar(charValue: number): boolean {
            return charValue == 0x9 || charValue == 0xA || charValue == 0xD || (charValue >= 0x20 && charValue <= 0xD7FF) || (charValue >= 0xE000 && charValue <= 0xFFFD) || (charValue >= 0x10000 && charValue <= 0x10FFFF);
        }
        private ScanXmlText(info: { refObj: Lexer.TokenInfo }): void {
            if (this.TextWindow.PeekChar_2423() == ']' && this.TextWindow.PeekChar_4867(1) == ']' && this.TextWindow.PeekChar_4867(2) == '>') {
                this.TextWindow.AdvanceChar_5713(3);
                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                this.AddError_2006(XmlParseErrorCode.XML_CDataEndTagNotAllowed);
                return
            }
            while (true) {
                var ch = this.TextWindow.PeekChar_2423();
                var __tSwitch33 = ch;
                while (true) {
                    var __tDefault51 = false;
                    switch (__tSwitch33) {
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault51 = true; break;
                            }
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '&':
                        case '<':
                        case '\r':
                        case '\n':
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault51 = true; break;
                        case ']':
                            if (this.TextWindow.PeekChar_4867(1) == ']' && this.TextWindow.PeekChar_4867(2) == '>') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault51 = true; break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch33 = '\n'; continue;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault51) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch33 = '\n'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexXmlElementTagToken(): SyntaxToken {
            var tagInfo: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTriviaWithWhitespace(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var tagInfo_ref0 = { refObj: tagInfo };
            this.ScanXmlElementTagToken(tagInfo_ref0);

            tagInfo = tagInfo_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            if (errors == null && tagInfo.ContextualKind == SyntaxKind.None && tagInfo.Kind == SyntaxKind.IdentifierToken) {
                var token: SyntaxToken = DocumentationCommentXmlTokens.LookupToken(tagInfo.Text, leading);
                if (token != null) {
                    return token;
                }
            }
            var tagInfo_ref0 = { refObj: tagInfo };
            var ret_val__701 = this.Create(tagInfo_ref0, leading, null, errors);

            tagInfo = tagInfo_ref0.refObj;
            return ret_val__701;
        }
        private ScanXmlElementTagToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var ch: string = '';
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch21 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault50 = false;
                switch (__tSwitch21) {
                    case '<':
                        this.ScanXmlTagStart(info);
                        break;
                    case '>':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.GreaterThanToken;
                        break;
                    case '/':
                        if (this.TextWindow.PeekChar_4867(1) == '>') {
                            this.TextWindow.AdvanceChar_5713(2);
                            info.refObj.Kind = SyntaxKind.SlashGreaterThanToken;
                            break;
                        }
                        __tDefault50 = true; break;
                    case '"':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.DoubleQuoteToken;
                        break;
                    case '\'':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.SingleQuoteToken;
                        break;
                    case '=':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.EqualsToken;
                        break;
                    case ':':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.ColonToken;
                        break;
                    case '\r':
                    case '\n':
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault50 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    case '*':
                        if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                            System.Diagnostics.Debug.Assert(false, "Should have picked up leading indentationTrivia, but didn't.");
                            break;
                        }
                        __tDefault50 = true; break;
                    default:
                        if (Lexer.IsXmlNameStartChar(ch)) {
                            this.ScanXmlName(info);
                            info.refObj.StringValue = info.refObj.Text;
                            info.refObj.Kind = SyntaxKind.IdentifierToken;
                        }
                        else if (SyntaxFacts.IsWhitespace(ch) || SyntaxFacts.IsNewLine(ch)) {
                            System.Diagnostics.Debug.Assert(false, "Should have picked up leading indentationTrivia, but didn't.");
                        }
                        else {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.None;
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        }
                        break;
                }


                if (__tDefault50) {
                    if (Lexer.IsXmlNameStartChar(ch)) {
                        this.ScanXmlName(info);
                        info.refObj.StringValue = info.refObj.Text;
                        info.refObj.Kind = SyntaxKind.IdentifierToken;
                    }
                    else if (SyntaxFacts.IsWhitespace(ch) || SyntaxFacts.IsNewLine(ch)) {
                        System.Diagnostics.Debug.Assert(false, "Should have picked up leading indentationTrivia, but didn't.");
                    }
                    else {
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.None;
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                    }
                    break;
                }

                break;
            }

            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.None || info.refObj.Text != null);
            return info.refObj.Kind != SyntaxKind.None;
        }
        private ScanXmlName(info: { refObj: Lexer.TokenInfo }): void {
            var start: number = this.TextWindow.Position;
            while (true) {
                var ch: string = this.TextWindow.PeekChar_2423();
                if (ch != ':' && Lexer.IsXmlNameChar(ch)) {
                    this.TextWindow.AdvanceChar_1426();
                }
                else {
                    break;
                }
            }
            info.refObj.Text = this.TextWindow.GetText_2126(start, this.TextWindow.Position - start,/*intern:*/true);
        }
        private static IsXmlNameStartChar(ch: string): boolean {
            return XmlCharType.IsStartNCNameCharXml4e(ch);
        }
        private static IsXmlNameChar(ch: string): boolean {
            return XmlCharType.IsNCNameCharXml4e(ch);
        }
        private LexXmlAttributeTextToken(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTrivia(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlAttributeTextToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__518 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__518;
        }
        private ScanXmlAttributeTextToken(info: { refObj: Lexer.TokenInfo }): boolean {
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var ch: string = '';
            var __tSwitch65 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault36 = false;
                switch (__tSwitch65) {
                    case '"':
                        if (this.ModeIs(LexerMode.XmlAttributeTextDoubleQuote)) {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.DoubleQuoteToken;
                            break;
                        }
                        __tDefault36 = true; break;
                    case '\'':
                        if (this.ModeIs(LexerMode.XmlAttributeTextQuote)) {
                            this.TextWindow.AdvanceChar_1426();
                            info.refObj.Kind = SyntaxKind.SingleQuoteToken;
                            break;
                        }
                        __tDefault36 = true; break;
                    case '&':
                        this.ScanXmlEntity(info);
                        info.refObj.Kind = SyntaxKind.XmlEntityLiteralToken;
                        break;
                    case '<':
                        this.TextWindow.AdvanceChar_1426();
                        info.refObj.Kind = SyntaxKind.LessThanToken;
                        break;
                    case '\r':
                    case '\n':
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault36 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch65 = '\n'; continue;
                        }
                        this.ScanXmlAttributeText(info);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        break;
                }


                if (__tDefault36) {
                    if (SyntaxFacts.IsNewLine(ch)) {
                        __tSwitch65 = '\n'; continue;
                    }
                    this.ScanXmlAttributeText(info);
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    break;
                }

                break;
            }

            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.None || info.refObj.Text != null);
            return info.refObj.Kind != SyntaxKind.None;
        }
        private ScanXmlAttributeText(info: { refObj: Lexer.TokenInfo }): void {
            while (true) {
                var ch = this.TextWindow.PeekChar_2423();
                var __tSwitch88 = ch;
                while (true) {
                    var __tDefault30 = false;
                    switch (__tSwitch88) {
                        case '"':
                            if (this.ModeIs(LexerMode.XmlAttributeTextDoubleQuote)) {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault30 = true; break;
                        case '\'':
                            if (this.ModeIs(LexerMode.XmlAttributeTextQuote)) {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault30 = true; break;
                        case '&':
                        case '<':
                        case '\r':
                        case '\n':
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault30 = true; break;
                            }
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault30 = true; break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch88 = '\n'; continue;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault30) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch88 = '\n'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexXmlCharacter(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTriviaWithWhitespace(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlCharacter(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__959 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__959;
        }
        private ScanXmlCharacter(info: { refObj: Lexer.TokenInfo }): boolean {
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch6 = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault65 = false;
                switch (__tSwitch6) {
                    case '&':
                        this.ScanXmlEntity(info);
                        info.refObj.Kind = SyntaxKind.XmlEntityLiteralToken;
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault65 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfFileToken;
                        break;
                    default:
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        info.refObj.Text = info.refObj.StringValue = this.TextWindow.NextChar().ToString();
                        break;
                }


                if (__tDefault65) {
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    info.refObj.Text = info.refObj.StringValue = this.TextWindow.NextChar().ToString();
                    break;
                }

                break;
            }

            return true;
        }
        private LexXmlCrefOrNameToken(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTriviaWithWhitespace(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlCrefToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__319 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__319;
        }
        private ScanXmlCrefToken(info: { refObj: Lexer.TokenInfo }): boolean {
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var beforeConsumed: number = this.TextWindow.Position;
            var consumedChar: string = this.TextWindow.NextChar();
            var consumedSurrogate: string = SlidingTextWindow.InvalidCharacter;
            var __tSwitch30 = consumedChar;
            while (true) {
                var __tDefault33 = false;
                switch (__tSwitch30) {
                    case '"':
                        if (this.ModeIs(LexerMode.XmlCrefDoubleQuote) || this.ModeIs(LexerMode.XmlNameDoubleQuote)) {
                            info.refObj.Kind = SyntaxKind.DoubleQuoteToken;
                            return true;
                        }
                        break;
                    case '\'':
                        if (this.ModeIs(LexerMode.XmlCrefQuote) || this.ModeIs(LexerMode.XmlNameQuote)) {
                            info.refObj.Kind = SyntaxKind.SingleQuoteToken;
                            return true;
                        }
                        break;
                    case '<':
                        info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/false);
                        this.AddError_2611(XmlParseErrorCode.XML_LessThanInAttributeValue, info.refObj.Text);
                        return true;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault33 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        return true;
                    case '\r':
                    case '\n':
                        this.TextWindow.Reset(beforeConsumed);
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case '&':
                        this.TextWindow.Reset(beforeConsumed);
                        var consumedChar_ref0 = { refObj: consumedChar };
                        var consumedSurrogate_ref1 = { refObj: consumedSurrogate };
                        var ret_val__693 = this.TextWindow.TryScanXmlEntity(consumedChar_ref0, consumedSurrogate_ref1);

                        consumedChar = consumedChar_ref0.refObj;

                        consumedSurrogate = consumedSurrogate_ref1.refObj;
                        if (!ret_val__693) {
                            this.TextWindow.Reset(beforeConsumed);
                            this.ScanXmlEntity(info);
                            info.refObj.Kind = SyntaxKind.XmlEntityLiteralToken;
                            return true;
                        }
                        break;
                    case '{':
                        consumedChar = '<';
                        break;
                    case '}':
                        consumedChar = '>';
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(consumedChar)) {
                            __tSwitch30 = '\n'; continue;
                        }
                        break;
                }


                if (__tDefault33) {
                    if (SyntaxFacts.IsNewLine(consumedChar)) {
                        __tSwitch30 = '\n'; continue;
                    }
                    break;
                }

                break;
            }

            System.Diagnostics.Debug.Assert(this.TextWindow.Position > beforeConsumed, "First character or entity has been consumed.");
            switch (consumedChar) {
                case '(':
                    info.refObj.Kind = SyntaxKind.OpenParenToken;
                    break;
                case ')':
                    info.refObj.Kind = SyntaxKind.CloseParenToken;
                    break;
                case '[':
                    info.refObj.Kind = SyntaxKind.OpenBracketToken;
                    break;
                case ']':
                    info.refObj.Kind = SyntaxKind.CloseBracketToken;
                    break;
                case ',':
                    info.refObj.Kind = SyntaxKind.CommaToken;
                    break;
                case '.':
                    info.refObj.Kind = SyntaxKind.DotToken;
                    break;
                case '?':
                    info.refObj.Kind = SyntaxKind.QuestionToken;
                    break;
                case '&':
                    info.refObj.Kind = SyntaxKind.AmpersandToken;
                    break;
                case '*':
                    info.refObj.Kind = SyntaxKind.AsteriskToken;
                    break;
                case '|':
                    info.refObj.Kind = SyntaxKind.BarToken;
                    break;
                case '^':
                    info.refObj.Kind = SyntaxKind.CaretToken;
                    break;
                case '%':
                    info.refObj.Kind = SyntaxKind.PercentToken;
                    break;
                case '/':
                    info.refObj.Kind = SyntaxKind.SlashToken;
                    break;
                case '~':
                    info.refObj.Kind = SyntaxKind.TildeToken;
                    break;
                case '{':
                    info.refObj.Kind = SyntaxKind.LessThanToken;
                    break;
                case '}':
                    info.refObj.Kind = SyntaxKind.GreaterThanToken;
                    break;
                case ':':
                    if (this.AdvanceIfMatches(':'))
                        info.refObj.Kind = SyntaxKind.ColonColonToken;
                    else info.refObj.Kind = SyntaxKind.ColonToken;
                    break;
                case '=':
                    if (this.AdvanceIfMatches('='))
                        info.refObj.Kind = SyntaxKind.EqualsEqualsToken;
                    else info.refObj.Kind = SyntaxKind.EqualsToken;
                    break;
                case '!':
                    if (this.AdvanceIfMatches('='))
                        info.refObj.Kind = SyntaxKind.ExclamationEqualsToken;
                    else info.refObj.Kind = SyntaxKind.ExclamationToken;
                    break;
                case '>':
                    if (this.AdvanceIfMatches('='))
                        info.refObj.Kind = SyntaxKind.GreaterThanEqualsToken;
                    else info.refObj.Kind = SyntaxKind.GreaterThanToken;
                    break;
                case '<':
                    if (this.AdvanceIfMatches('='))
                        info.refObj.Kind = SyntaxKind.LessThanEqualsToken;
                    else if (this.AdvanceIfMatches('<'))
                        info.refObj.Kind = SyntaxKind.LessThanLessThanToken;
                    else info.refObj.Kind = SyntaxKind.LessThanToken;
                    break;
                case '+':
                    if (this.AdvanceIfMatches('+'))
                        info.refObj.Kind = SyntaxKind.PlusPlusToken;
                    else info.refObj.Kind = SyntaxKind.PlusToken;
                    break;
                case '-':
                    if (this.AdvanceIfMatches('-'))
                        info.refObj.Kind = SyntaxKind.MinusMinusToken;
                    else info.refObj.Kind = SyntaxKind.MinusToken;
                    break;
            }
            if (info.refObj.Kind != SyntaxKind.None) {
                System.Diagnostics.Debug.Assert(info.refObj.Text == null, "Haven't tried to set it yet.");
                System.Diagnostics.Debug.Assert(info.refObj.StringValue == null, "Haven't tried to set it yet.");
                var valueText: string = SyntaxFacts.GetText_3915(info.refObj.Kind);
                var actualText: string = this.TextWindow.GetText_5693(/*intern:*/false);
                if (!System.String.IsNullOrEmpty(valueText) && actualText != valueText) {
                    info.refObj.RequiresTextForXmlEntity = true;
                    info.refObj.Text = actualText;
                    info.refObj.StringValue = valueText;
                }
            }
            else {
                this.TextWindow.Reset(beforeConsumed);
                if (this.ScanIdentifier(info) && info.refObj.Text.length > 0) {
                    var keywordKind: SyntaxKind = 0;
                    if (!this.InXmlNameAttributeValue && !info.refObj.IsVerbatim && !info.refObj.HasIdentifierEscapeSequence && (() => {
                        var keywordKind_ref0 = { refObj: keywordKind };
                        var ret_val__259 = this.cache.TryGetKeywordKind(info.refObj.StringValue, keywordKind_ref0);

                        keywordKind = keywordKind_ref0.refObj;
                        return ret_val__259;
                    })()) {
                        if (SyntaxFacts.IsContextualKeyword(keywordKind)) {
                            info.refObj.Kind = SyntaxKind.IdentifierToken;
                            info.refObj.ContextualKind = keywordKind;
                        }
                        else {
                            info.refObj.Kind = keywordKind;
                            info.refObj.RequiresTextForXmlEntity = info.refObj.Text != info.refObj.StringValue;
                        }
                    }
                    else {
                        info.refObj.ContextualKind = info.refObj.Kind = SyntaxKind.IdentifierToken;
                    }
                }
                else {
                    if (consumedChar == '@') {
                        if (this.TextWindow.PeekChar_2423() == '@') {
                            this.TextWindow.NextChar();
                            info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/true);
                            info.refObj.StringValue = "";
                        }
                        else {
                            this.ScanXmlEntity(info);
                        }
                        info.refObj.Kind = SyntaxKind.IdentifierToken;
                        this.AddError_1261(ErrorCode.ERR_ExpectedVerbatimLiteral);
                    }
                    else if (this.TextWindow.PeekChar_2423() == '&') {
                        this.ScanXmlEntity(info);
                        info.refObj.Kind = SyntaxKind.XmlEntityLiteralToken;
                        this.AddCrefError_6981(ErrorCode.ERR_UnexpectedCharacter, info.refObj.Text);
                    }
                    else {
                        var bad: string = this.TextWindow.NextChar();
                        info.refObj.Text = this.TextWindow.GetText_5693(/*intern:*/false);
                        if (Lexer.MatchesProductionForXmlChar(bad.charCodeAt(0))) {
                            this.AddCrefError_6981(ErrorCode.ERR_UnexpectedCharacter, info.refObj.Text);
                        }
                        else {
                            this.AddError_2006(XmlParseErrorCode.XML_InvalidUnicodeChar);
                        }
                    }
                }
            }
            System.Diagnostics.Debug.Assert(info.refObj.Kind != SyntaxKind.None || info.refObj.Text != null);
            return info.refObj.Kind != SyntaxKind.None;
        }
        private AdvanceIfMatches(ch: string): boolean {
            var peekCh: string = this.TextWindow.PeekChar_2423();
            if ((peekCh == ch) || (peekCh == '{' && ch == '<') || (peekCh == '}' && ch == '>')) {
                this.TextWindow.AdvanceChar_1426();
                return true;
            }
            if (peekCh == '&') {
                var pos: number = this.TextWindow.Position;
                var nextChar: string = '';
                var nextSurrogate: string = '';
                if ((() => {
                    var nextChar_ref0 = { refObj: nextChar };
                    var nextSurrogate_ref1 = { refObj: nextSurrogate };
                    var ret_val__467 = this.TextWindow.TryScanXmlEntity(nextChar_ref0, nextSurrogate_ref1);

                    nextChar = nextChar_ref0.refObj;

                    nextSurrogate = nextSurrogate_ref1.refObj;
                    return ret_val__467;
                })() && nextChar == ch && nextSurrogate == SlidingTextWindow.InvalidCharacter) {
                    return true;
                }
                this.TextWindow.Reset(pos);
            }
            return false;
        }
        private get InXmlCrefOrNameAttributeValue(): boolean {
            switch (this.mode & LexerMode.MaskLexMode) {
                case LexerMode.XmlCrefQuote:
                case LexerMode.XmlCrefDoubleQuote:
                case LexerMode.XmlNameQuote:
                case LexerMode.XmlNameDoubleQuote:
                    return true;
                default:
                    return false;
            }
        }
        private get InXmlNameAttributeValue(): boolean {
            switch (this.mode & LexerMode.MaskLexMode) {
                case LexerMode.XmlNameQuote:
                case LexerMode.XmlNameDoubleQuote:
                    return true;
                default:
                    return false;
            }
        }
        private AddCrefError_6981(code: ErrorCode, ...args: Object[]): void {
            this.AddCrefError_2347(Lexer.MakeError_2338(code, args));
        }
        private AddCrefError_2347(info: DiagnosticInfo): void {
            if (info != null) {
                this.AddError_1515(ErrorCode.WRN_ErrorOverride, info, info.Code);
            }
        }
        private LexXmlCDataSectionTextToken(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTrivia(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlCDataSectionTextToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__222 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__222;
        }
        private ScanXmlCDataSectionTextToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var ch: string = '';
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch61 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault44 = false;
                switch (__tSwitch61) {
                    case ']':
                        if (this.TextWindow.PeekChar_4867(1) == ']' && this.TextWindow.PeekChar_4867(2) == '>') {
                            this.TextWindow.AdvanceChar_5713(3);
                            info.refObj.Kind = SyntaxKind.XmlCDataEndToken;
                            break;
                        }
                        __tDefault44 = true; break;
                    case '\r':
                    case '\n':
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault44 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch61 = '\n'; continue;
                        }
                        this.ScanXmlCDataSectionText(info);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        break;
                }


                if (__tDefault44) {
                    if (SyntaxFacts.IsNewLine(ch)) {
                        __tSwitch61 = '\n'; continue;
                    }
                    this.ScanXmlCDataSectionText(info);
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    break;
                }

                break;
            }

            return true;
        }
        private ScanXmlCDataSectionText(info: { refObj: Lexer.TokenInfo }): void {
            while (true) {
                var ch = this.TextWindow.PeekChar_2423();
                var __tSwitch31 = ch;
                while (true) {
                    var __tDefault8 = false;
                    switch (__tSwitch31) {
                        case ']':
                            if (this.TextWindow.PeekChar_4867(1) == ']' && this.TextWindow.PeekChar_4867(2) == '>') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault8 = true; break;
                        case '\r':
                        case '\n':
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault8 = true; break;
                            }
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault8 = true; break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch31 = '\n'; continue;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault8) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch31 = '\n'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexXmlCommentTextToken(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTrivia(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlCommentTextToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__336 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__336;
        }
        private ScanXmlCommentTextToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var ch: string = '';
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch58 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault60 = false;
                switch (__tSwitch58) {
                    case '-':
                        if (this.TextWindow.PeekChar_4867(1) == '-') {
                            if (this.TextWindow.PeekChar_4867(2) == '>') {
                                this.TextWindow.AdvanceChar_5713(3);
                                info.refObj.Kind = SyntaxKind.XmlCommentEndToken;
                                break;
                            }
                            else {
                                this.TextWindow.AdvanceChar_5713(2);
                                info.refObj.Kind = SyntaxKind.MinusMinusToken;
                                break;
                            }
                        }
                        __tDefault60 = true; break;
                    case '\r':
                    case '\n':
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault60 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch58 = '\n'; continue;
                        }
                        this.ScanXmlCommentText(info);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        break;
                }


                if (__tDefault60) {
                    if (SyntaxFacts.IsNewLine(ch)) {
                        __tSwitch58 = '\n'; continue;
                    }
                    this.ScanXmlCommentText(info);
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    break;
                }

                break;
            }

            return true;
        }
        private ScanXmlCommentText(info: { refObj: Lexer.TokenInfo }): void {
            while (true) {
                var ch = this.TextWindow.PeekChar_2423();
                var __tSwitch76 = ch;
                while (true) {
                    var __tDefault95 = false;
                    switch (__tSwitch76) {
                        case '-':
                            if (this.TextWindow.PeekChar_4867(1) == '-') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault95 = true; break;
                        case '\r':
                        case '\n':
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault95 = true; break;
                            }
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault95 = true; break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch76 = '\n'; continue;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault95) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch76 = '\n'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexXmlProcessingInstructionTextToken(): SyntaxToken {
            var info: Lexer.TokenInfo = structDefault(Lexer.TokenInfo);
            var leading: SyntaxListBaseBuilder = null;
            var leading_ref0 = { refObj: leading };
            this.LexXmlDocCommentLeadingTrivia(leading_ref0);

            leading = leading_ref0.refObj;;
            this.Start();
            var info_ref0 = { refObj: info };
            this.ScanXmlProcessingInstructionTextToken(info_ref0);

            info = info_ref0.refObj;;
            var errors = this.GetErrors(Lexer.GetFullWidth(leading));
            var info_ref0 = { refObj: info };
            var ret_val__65 = this.Create(info_ref0, leading, null, errors);

            info = info_ref0.refObj;
            return ret_val__65;
        }
        private ScanXmlProcessingInstructionTextToken(info: { refObj: Lexer.TokenInfo }): boolean {
            var ch: string = '';
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Start));
            System.Diagnostics.Debug.Assert(!this.LocationIs(XmlDocCommentLocation.Exterior));
            if (this.LocationIs(XmlDocCommentLocation.End)) {
                info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                return true;
            }
            var __tSwitch99 = ch = this.TextWindow.PeekChar_2423();
            while (true) {
                var __tDefault88 = false;
                switch (__tSwitch99) {
                    case '?':
                        if (this.TextWindow.PeekChar_4867(1) == '>') {
                            this.TextWindow.AdvanceChar_5713(2);
                            info.refObj.Kind = SyntaxKind.XmlProcessingInstructionEndToken;
                            break;
                        }
                        __tDefault88 = true; break;
                    case '\r':
                    case '\n':
                        this.ScanEndOfLine();
                        info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralNewLineToken;
                        this.MutateLocation(XmlDocCommentLocation.Exterior);
                        break;
                    case SlidingTextWindow.InvalidCharacter:
                        if (!this.TextWindow.IsReallyAtEnd()) {
                            __tDefault88 = true; break;
                        }
                        info.refObj.Kind = SyntaxKind.EndOfDocumentationCommentToken;
                        break;
                    default:
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch99 = '\n'; continue;
                        }
                        this.ScanXmlProcessingInstructionText(info);
                        info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                        break;
                }


                if (__tDefault88) {
                    if (SyntaxFacts.IsNewLine(ch)) {
                        __tSwitch99 = '\n'; continue;
                    }
                    this.ScanXmlProcessingInstructionText(info);
                    info.refObj.Kind = SyntaxKind.XmlTextLiteralToken;
                    break;
                }

                break;
            }

            return true;
        }
        private ScanXmlProcessingInstructionText(info: { refObj: Lexer.TokenInfo }): void {
            while (true) {
                var ch = this.TextWindow.PeekChar_2423();
                var __tSwitch69 = ch;
                while (true) {
                    var __tDefault52 = false;
                    switch (__tSwitch69) {
                        case '?':
                            if (this.TextWindow.PeekChar_4867(1) == '>') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault52 = true; break;
                        case '\r':
                        case '\n':
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case SlidingTextWindow.InvalidCharacter:
                            if (!this.TextWindow.IsReallyAtEnd()) {
                                __tDefault52 = true; break;
                            }
                            info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                info.refObj.StringValue = info.refObj.Text = this.TextWindow.GetText_5693(false);
                                return
                            }
                            __tDefault52 = true; break;
                        default:
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch69 = '\n'; continue;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            break;
                    }


                    if (__tDefault52) {
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch69 = '\n'; continue;
                        }
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }

                    break;
                }

            }
        }
        private LexXmlDocCommentLeadingTrivia(trivia: { refObj: SyntaxListBaseBuilder }): void {
            var start = this.TextWindow.Position;
            this.Start();
            if (this.LocationIs(XmlDocCommentLocation.Start) && this.StyleIs(XmlDocCommentStyle.Delimited)) {
                if (this.TextWindow.PeekChar_2423() == '/' && this.TextWindow.PeekChar_4867(1) == '*' && this.TextWindow.PeekChar_4867(2) == '*' && this.TextWindow.PeekChar_4867(3) != '*') {
                    this.TextWindow.AdvanceChar_5713(3);
                    var text = this.TextWindow.GetText_5693(true);
                    this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                    this.MutateLocation(XmlDocCommentLocation.Interior);
                    return
                }
            }
            else if (this.LocationIs(XmlDocCommentLocation.Start) || this.LocationIs(XmlDocCommentLocation.Exterior)) {
                while (true) {
                    var ch: string = this.TextWindow.PeekChar_2423();
                    var __tSwitch63 = ch;
                    while (true) {
                        var __tDefault84 = false;
                        switch (__tSwitch63) {
                            case ' ':
                            case '\t':
                            case '\v':
                            case '\f':
                                this.TextWindow.AdvanceChar_1426();
                                break;
                            case '/':
                                if (this.StyleIs(XmlDocCommentStyle.SingleLine) && this.TextWindow.PeekChar_4867(1) == '/' && this.TextWindow.PeekChar_4867(2) == '/' && this.TextWindow.PeekChar_4867(3) != '/') {
                                    this.TextWindow.AdvanceChar_5713(3);
                                    var text = this.TextWindow.GetText_5693(true);
                                    this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                                    this.MutateLocation(XmlDocCommentLocation.Interior);
                                    return
                                }
                                __tDefault84 = true; break;
                            case '*':
                                if (this.StyleIs(XmlDocCommentStyle.Delimited)) {
                                    while (this.TextWindow.PeekChar_2423() == '*' && this.TextWindow.PeekChar_4867(1) != '/') {
                                        this.TextWindow.AdvanceChar_1426();
                                    }
                                    var text = this.TextWindow.GetText_5693(true);
                                    if (!System.String.IsNullOrEmpty(text)) {
                                        this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                                    }
                                    if (this.TextWindow.PeekChar_2423() == '*' && this.TextWindow.PeekChar_4867(1) == '/') {
                                        this.TextWindow.AdvanceChar_5713(2);
                                        this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia("*/"), trivia);
                                        this.MutateLocation(XmlDocCommentLocation.End);
                                    }
                                    else {
                                        this.MutateLocation(XmlDocCommentLocation.Interior);
                                    }
                                    return
                                }
                                __tDefault84 = true; break;
                            default:
                                if (SyntaxFacts.IsWhitespace(ch)) {
                                    __tSwitch63 = ' '; continue;
                                }
                                if (this.StyleIs(XmlDocCommentStyle.SingleLine)) {
                                    this.TextWindow.Reset(start);
                                    this.MutateLocation(XmlDocCommentLocation.End);
                                }
                                else {
                                    System.Diagnostics.Debug.Assert(this.StyleIs(XmlDocCommentStyle.Delimited));
                                    var text = this.TextWindow.GetText_5693(true);
                                    if (!System.String.IsNullOrEmpty(text))
                                        this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                                    this.MutateLocation(XmlDocCommentLocation.Interior);
                                }
                                return
                        }


                        if (__tDefault84) {
                            if (SyntaxFacts.IsWhitespace(ch)) {
                                __tSwitch63 = ' '; continue;
                            }
                            if (this.StyleIs(XmlDocCommentStyle.SingleLine)) {
                                this.TextWindow.Reset(start);
                                this.MutateLocation(XmlDocCommentLocation.End);
                            }
                            else {
                                System.Diagnostics.Debug.Assert(this.StyleIs(XmlDocCommentStyle.Delimited));
                                var text = this.TextWindow.GetText_5693(true);
                                if (!System.String.IsNullOrEmpty(text))
                                    this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                                this.MutateLocation(XmlDocCommentLocation.Interior);
                            }
                            return
                        }

                        break;
                    }

                }
            }
            else if (!this.LocationIs(XmlDocCommentLocation.End) && this.StyleIs(XmlDocCommentStyle.Delimited)) {
                if (this.TextWindow.PeekChar_2423() == '*' && this.TextWindow.PeekChar_4867(1) == '/') {
                    this.TextWindow.AdvanceChar_5713(2);
                    var text = this.TextWindow.GetText_5693(true);
                    this.AddTrivia(SyntaxFactory.DocumentationCommentExteriorTrivia(text), trivia);
                    this.MutateLocation(XmlDocCommentLocation.End);
                }
            }
        }
        private LexXmlDocCommentLeadingTriviaWithWhitespace(trivia: { refObj: SyntaxListBaseBuilder }): void {
            while (true) {
                this.LexXmlDocCommentLeadingTrivia(trivia);
                var ch: string = this.TextWindow.PeekChar_2423();
                if (this.LocationIs(XmlDocCommentLocation.Interior) && (SyntaxFacts.IsWhitespace(ch) || SyntaxFacts.IsNewLine(ch))) {
                    this.LexXmlWhitespaceAndNewLineTrivia(trivia);
                }
                else {
                    break;
                }
            }
        }
        private LexXmlWhitespaceAndNewLineTrivia(trivia: { refObj: SyntaxListBaseBuilder }): void {
            this.Start();
            if (this.LocationIs(XmlDocCommentLocation.Interior)) {
                var ch: string = this.TextWindow.PeekChar_2423();
                var __tSwitch51 = ch;
                while (true) {
                    var __tDefault83 = false;
                    switch (__tSwitch51) {
                        case ' ':
                        case '\t':
                        case '\v':
                        case '\f':
                            this.AddTrivia(this.ScanWhitespace(), trivia);
                            break;
                        case '\r':
                        case '\n':
                            this.AddTrivia(this.ScanEndOfLine(), trivia);
                            this.MutateLocation(XmlDocCommentLocation.Exterior);
                            return
                        case '*':
                            if (this.StyleIs(XmlDocCommentStyle.Delimited) && this.TextWindow.PeekChar_4867(1) == '/') {
                                return
                            }
                            __tDefault83 = true; break;
                        default:
                            if (SyntaxFacts.IsWhitespace(ch)) {
                                __tSwitch51 = ' '; continue;
                            }
                            if (SyntaxFacts.IsNewLine(ch)) {
                                __tSwitch51 = '\n'; continue;
                            }
                            return
                    }


                    if (__tDefault83) {
                        if (SyntaxFacts.IsWhitespace(ch)) {
                            __tSwitch51 = ' '; continue;
                        }
                        if (SyntaxFacts.IsNewLine(ch)) {
                            __tSwitch51 = '\n'; continue;
                        }
                        return
                    }

                    break;
                }

            }
        }
        constructor() { super(); }

        // partial
        public ScanStringLiteral(info: { refObj: Lexer.TokenInfo }, allowEscapes: boolean = true): void {
            var quoteCharacter = this.TextWindow.PeekChar_2423();
            if (quoteCharacter == '\'' || quoteCharacter == '"') {
                this.TextWindow.AdvanceChar_1426();
                this.builder.Length = 0;
                while (true) {
                    var ch: string = this.TextWindow.PeekChar_2423();
                    if (ch == '\\' && allowEscapes) {
                        var c2: string = '';
                        var c2_ref0 = { refObj: c2 };
                        var ret_val__805 = this.ScanEscapeSequence(c2_ref0);

                        c2 = c2_ref0.refObj;
                        ch = ret_val__805;
                        this.builder.Append(ch);
                        if (c2 != SlidingTextWindow.InvalidCharacter) {
                            this.builder.Append(c2);
                        }
                    }
                    else if (ch == quoteCharacter) {
                        this.TextWindow.AdvanceChar_1426();
                        break;
                    }
                    else if (SyntaxFacts.IsNewLine(ch) || (ch == SlidingTextWindow.InvalidCharacter && this.TextWindow.IsReallyAtEnd())) {
                        System.Diagnostics.Debug.Assert(this.TextWindow.Width > 0);
                        this.AddError_1261(ErrorCode.ERR_NewlineInConst);
                        break;
                    }
                    else {
                        this.TextWindow.AdvanceChar_1426();
                        this.builder.Append(ch);
                    }
                }
                info.refObj.Text = this.TextWindow.GetText_5693(true);
                if (quoteCharacter == '\'') {
                    info.refObj.Kind = SyntaxKind.CharacterLiteralToken;
                    if (this.builder.Length != 1) {
                        this.AddError_1261((this.builder.Length != 0) ? ErrorCode.ERR_TooManyCharsInConst : ErrorCode.ERR_EmptyCharConst);
                    }
                    if (this.builder.Length > 0) {
                        info.refObj.StringValue = this.TextWindow.Intern_1886(this.builder);
                        info.refObj.CharValue = info.refObj.StringValue[0];
                    }
                    else {
                        info.refObj.StringValue = System.String.Empty;
                        info.refObj.CharValue = SlidingTextWindow.InvalidCharacter;
                    }
                }
                else {
                    info.refObj.Kind = SyntaxKind.StringLiteralToken;
                    if (this.builder.Length > 0) {
                        info.refObj.StringValue = this.TextWindow.Intern_1886(this.builder);
                    }
                    else {
                        info.refObj.StringValue = System.String.Empty;
                    }
                }
            }
            else {
                info.refObj.Kind = SyntaxKind.None;
                info.refObj.Text = null;
            }
        }
        public ScanEscapeSequence(surrogateCharacter: { refObj: string }): string {
            var start = this.TextWindow.Position;
            surrogateCharacter.refObj = SlidingTextWindow.InvalidCharacter;
            var ch: string = this.TextWindow.NextChar();
            System.Diagnostics.Debug.Assert(ch == '\\');
            ch = this.TextWindow.NextChar();
            switch (ch) {
                case '\'':
                case '\"':
                case '\\':
                    break;
                case '0':
                    ch = '\u0000';
                    break;
                case 'a':
                    ch = '\u0007';
                    break;
                case 'b':
                    ch = '\u0008';
                    break;
                case 'f':
                    ch = '\u000c';
                    break;
                case 'n':
                    ch = '\u000a';
                    break;
                case 'r':
                    ch = '\u000d';
                    break;
                case 't':
                    ch = '\u0009';
                    break;
                case 'v':
                    ch = '\u000b';
                    break;
                case 'x':
                case 'u':
                case 'U':
                    this.TextWindow.Reset(start);
                    var error: SyntaxDiagnosticInfo;
                    var error_ref0 = { refObj: error };
                    var ret_val__869 = this.TextWindow.NextUnicodeEscape(/*surrogateCharacter:*/surrogateCharacter,/*info:*/error_ref0);

                    error = error_ref0.refObj;
                    ch = ret_val__869;
                    this.AddError_9129(error);
                    break;
                default:
                    this.AddError_1749(start, this.TextWindow.Position - start, ErrorCode.ERR_IllegalEscape);
                    break;
            }
            return ch;
        }
        public ScanVerbatimStringLiteral(info: { refObj: Lexer.TokenInfo }, allowNewlines: boolean = true): void {
            this.builder.Length = 0;
            if (this.TextWindow.PeekChar_2423() == '@' && this.TextWindow.PeekChar_4867(1) == '"') {
                this.TextWindow.AdvanceChar_5713(2);
                var done: boolean = false;
                var ch: string = '';
                this.builder.Length = 0;
                while (!done) {
                    var __tSwitch53 = ch = this.TextWindow.PeekChar_2423();
                    while (true) {
                        var __tDefault69 = false;
                        switch (__tSwitch53) {
                            case '\"':
                                this.TextWindow.AdvanceChar_1426();
                                if (this.TextWindow.PeekChar_2423() == '\"') {
                                    this.TextWindow.AdvanceChar_1426();
                                    this.builder.Append(ch);
                                }
                                else {
                                    done = true;
                                }
                                break;
                            case SlidingTextWindow.InvalidCharacter:
                                if (!this.TextWindow.IsReallyAtEnd()) {
                                    __tDefault69 = true; break;
                                }
                                this.AddError_1261(ErrorCode.ERR_UnterminatedStringLit);
                                done = true;
                                break;
                            default:
                                if (!allowNewlines && SyntaxFacts.IsNewLine(ch)) {
                                    this.AddError_1261(ErrorCode.ERR_UnterminatedStringLit);
                                    done = true;
                                    break;
                                }
                                this.TextWindow.AdvanceChar_1426();
                                this.builder.Append(ch);
                                break;
                        }


                        if (__tDefault69) {
                            if (!allowNewlines && SyntaxFacts.IsNewLine(ch)) {
                                this.AddError_1261(ErrorCode.ERR_UnterminatedStringLit);
                                done = true;
                                break;
                            }
                            this.TextWindow.AdvanceChar_1426();
                            this.builder.Append(ch);
                            break;
                        }

                        break;
                    }

                }
                info.refObj.Kind = SyntaxKind.StringLiteralToken;
                info.refObj.Text = this.TextWindow.GetText_5693(false);
                info.refObj.StringValue = this.builder.ToString();
            }
            else {
                info.refObj.Kind = SyntaxKind.None;
                info.refObj.Text = null;
                info.refObj.StringValue = null;
            }
        }
        private ScanInterpolatedStringLiteral(isVerbatim: boolean, info: { refObj: Lexer.TokenInfo }): void {
            var error: SyntaxDiagnosticInfo = null;
            var error_ref0 = { refObj: error };
            this.ScanInterpolatedStringLiteralTop(null, isVerbatim, info, error_ref0);

            error = error_ref0.refObj;;
            this.AddError_9129(error);
        }
        public ScanInterpolatedStringLiteralTop(interpolations: ArrayBuilder<Lexer.Interpolation>, isVerbatim: boolean, info: { refObj: Lexer.TokenInfo }, error: { refObj: SyntaxDiagnosticInfo }): void {
            var subScanner = new Lexer.InterpolatedStringScanner().ctor_1728(this, isVerbatim);
            subScanner.ScanInterpolatedStringLiteralTop(interpolations, info);
            error.refObj = subScanner.error;
            info.refObj.Text = this.TextWindow.GetText_5693(false);
        }
        public static RescanInterpolatedString(interpolatedString: InterpolatedStringSyntax): SyntaxToken {
            var text = interpolatedString.ToString();
            var kind = SyntaxKind.InterpolatedStringToken;
            return SyntaxFactory.Literal_1924(interpolatedString.GetFirstToken().GetLeadingTrivia(), text, kind, text, interpolatedString.GetLastToken().GetTrailingTrivia());
        }

        // partial
        private static MaxCachedTokenSize: number = 42;
        private static stateTransitions = new Array<Array<number>>(
            new Array<number>(
                Lexer.QuickScanState.Initial,             // White
                Lexer.QuickScanState.Initial,             // CR
                Lexer.QuickScanState.Initial,             // LF
                Lexer.QuickScanState.Ident,               // Letter
                Lexer.QuickScanState.Number,              // Digit
                Lexer.QuickScanState.Punctuation,         // Punct
                Lexer.QuickScanState.Dot,                 // Dot
                Lexer.QuickScanState.CompoundPunctStart,  // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Bad                 // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Done,                // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.Done,                // White
                Lexer.QuickScanState.Done,                // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Done,                // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Done,                // Slash
                Lexer.QuickScanState.Done,                // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Ident,               // Letter
                Lexer.QuickScanState.Ident,               // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Bad,                 // Letter (might be 'e' or 'x' or suffix)
                Lexer.QuickScanState.Number,              // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Bad,                 // Dot (Number is followed by a dot - too complex for us to handle here).
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Done,                // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Number,              // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done               // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.FollowingWhite,      // White
                Lexer.QuickScanState.FollowingCR,         // CR
                Lexer.QuickScanState.DoneAfterNext,       // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Done,                // Digit
                Lexer.QuickScanState.Bad,                 // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Bad,                 // Compound
                Lexer.QuickScanState.Bad,                 // Slash
                Lexer.QuickScanState.Bad,                 // Complex
                Lexer.QuickScanState.Done              // EndOfFile
                ),
            new Array<number>(
                Lexer.QuickScanState.Done,                // White
                Lexer.QuickScanState.Done,                // CR
                Lexer.QuickScanState.Done,                // LF
                Lexer.QuickScanState.Done,                // Letter
                Lexer.QuickScanState.Done,                // Digit
                Lexer.QuickScanState.Done,                // Punct
                Lexer.QuickScanState.Done,                // Dot
                Lexer.QuickScanState.Done,                // Compound
                Lexer.QuickScanState.Done,                // Slash
                Lexer.QuickScanState.Done,                // Complex
                Lexer.QuickScanState.Done                // EndOfFile
                ));
        private QuickScanSyntaxToken(): SyntaxToken {
            this.Start();
            var state = Lexer.QuickScanState.Initial;
            var i: number = this.TextWindow.Offset;
            var n: number = this.TextWindow.CharacterWindowCount;
            n = System.Math.Min(n, i + Lexer.MaxCachedTokenSize);
            var hashCode: number = Roslyn.Utilities.Hash.FnvOffsetBias;
            var charWindow = this.TextWindow.CharacterWindow;
            var charPropLength = Lexer.charProperties.length;
            exitWhile:
            while (true) {
                for (; i < n; i++) {
                    var c: string = charWindow[i];
                    var uc: number = (c.charCodeAt(0));
                    var flags = uc < charPropLength ? <Lexer.CharFlags>Lexer.charProperties[uc] : Lexer.CharFlags.Complex;
                    state = <Lexer.QuickScanState>Lexer.stateTransitions[<number>state][<number>flags];
                    if (state == Lexer.QuickScanState.Done || state == Lexer.QuickScanState.Bad) {
                        break exitWhile;
                    }
                    hashCode = ((hashCode ^ uc) * Roslyn.Utilities.Hash.FnvPrime);
                }
                state = Lexer.QuickScanState.Bad; break;
            }
            this.TextWindow.AdvanceChar_5713(i - this.TextWindow.Offset);
            System.Diagnostics.Debug.Assert(state == Lexer.QuickScanState.Bad || state == Lexer.QuickScanState.Done);
            if (state == Lexer.QuickScanState.Done) {
                var token = this.cache.LookupToken(this.TextWindow.CharacterWindow,
                    this.TextWindow.LexemeRelativeStart,
                    i - this.TextWindow.LexemeRelativeStart,
                    hashCode,
                    this.createQuickTokenFunction);
                return token;
            }
            else {
                this.TextWindow.Reset(this.TextWindow.LexemeStartPosition);
                return null;
            }
        }
        private createQuickTokenFunction: () => SyntaxToken = null;

        private CreateQuickToken(): SyntaxToken {
            var quickWidth = this.TextWindow.Width;
            this.TextWindow.Reset(this.TextWindow.LexemeStartPosition);
            var token = this.LexSyntaxToken();
            System.Diagnostics.Debug.Assert(quickWidth == token.FullWidth);
            return token;
        }
        private static charProperties: number[] = new Array(<number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.White,
            <number>Lexer.CharFlags.LF,
            <number>Lexer.CharFlags.White,
            <number>Lexer.CharFlags.White,
            <number>Lexer.CharFlags.CR,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.White,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Dot,
            <number>Lexer.CharFlags.Slash,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.Digit,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Punct,
            <number>Lexer.CharFlags.CompoundPunctStart,
            <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Complex,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter,
            <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter, <number>Lexer.CharFlags.Letter);
    }


    export module Lexer {
        export class TokenInfo implements IStruct {
            public Kind: SyntaxKind = 0;
            public ContextualKind: SyntaxKind = 0;
            public Text: string;
            public ValueKind: SpecialType = 0;
            public RequiresTextForXmlEntity: boolean = false;
            public HasIdentifierEscapeSequence: boolean = false;
            public StringValue: string;
            public CharValue: string = '';
            public IntValue: number = 0;
            public UintValue: number = 0;
            public LongValue: number = 0;
            public UlongValue: number = 0;
            public FloatValue: number = 0;
            public DoubleValue: number = 0;
            public DecimalValue: number = 0;
            public IsVerbatim: boolean = false;
            constructor() { }
        }

        // partial

        export class Interpolation implements IStruct {
            public Start: number = 0;
            public Colon: number = 0;
            public End: number = 0;
            ctor_1605(start: number, colon: number, end: number): Interpolation {
                this.Start = start;
                this.Colon = colon;
                this.End = end;
                return this;
            }
            constructor() { }
        }
    }
    export module Lexer {
        export class InterpolatedStringScanner {
            public lexer: Lexer;
            public isVerbatim: boolean = false;
            public allowNewlines: boolean = false;
            public error: SyntaxDiagnosticInfo;
            ctor_1728(lexer: Lexer, isVerbatim: boolean): InterpolatedStringScanner {
                this.lexer = lexer;
                this.isVerbatim = isVerbatim;
                this.allowNewlines = isVerbatim;
                return this;
            }
            IsAtEnd_5911(): boolean {
                return this.IsAtEnd_1079(this.isVerbatim && this.allowNewlines);
            }
            private IsAtEnd_1079(allowNewline: boolean): boolean {
                var ch: string = this.lexer.TextWindow.PeekChar_2423();
                return !allowNewline && SyntaxFacts.IsNewLine(ch) || (ch == SlidingTextWindow.InvalidCharacter && this.lexer.TextWindow.IsReallyAtEnd());
            }
            public ScanInterpolatedStringLiteralTop(interpolations: ArrayBuilder<Interpolation>, info: { refObj: TokenInfo }): void {
                System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == '$');
                this.lexer.TextWindow.AdvanceChar_1426();
                if (this.isVerbatim) {
                    System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == '@');
                    this.lexer.TextWindow.AdvanceChar_1426();
                }
                System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == '\"');
                this.lexer.TextWindow.AdvanceChar_1426();
                this.ScanInterpolatedStringLiteralContents(interpolations);
                if (this.lexer.TextWindow.PeekChar_2423() != '\"') {
                    System.Diagnostics.Debug.Assert(this.IsAtEnd_5911());
                    if (this.error == null) {
                        this.error = this.lexer.MakeError_1764(this.lexer.TextWindow.Position, 1, this.isVerbatim ? ErrorCode.ERR_UnterminatedStringLit : ErrorCode.ERR_NewlineInConst);
                    }
                }
                else {
                    this.lexer.TextWindow.AdvanceChar_1426();
                }
                info.refObj.Kind = SyntaxKind.InterpolatedStringToken;
            }
            private ScanInterpolatedStringLiteralContents(interpolations: ArrayBuilder<Interpolation>): void {
                __Outer7: while (true) {
                    if (this.IsAtEnd_5911()) {
                        return
                    }
                    var __tSwitch3 = this.lexer.TextWindow.PeekChar_2423();
                    while (true) {
                        var __tDefault15 = false;
                        switch (__tSwitch3) {
                            case '\"':
                                if (this.isVerbatim && this.lexer.TextWindow.PeekChar_4867(1) == '"') {
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                    continue __Outer7;
                                }
                                return
                            case '}':
                                var pos = this.lexer.TextWindow.Position;
                                this.lexer.TextWindow.AdvanceChar_1426();
                                if (this.lexer.TextWindow.PeekChar_2423() == '}') {
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                }
                                else {
                                    if (this.error == null)
                                        this.error = this.lexer.MakeError_1930(pos, 1, ErrorCode.ERR_UnescapedCurly, "}");
                                }
                                continue __Outer7;
                            case '{':
                                if (this.lexer.TextWindow.PeekChar_4867(1) == '{') {
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                }
                                else {
                                    var interpolationStart: number = this.lexer.TextWindow.Position;
                                    this.lexer.TextWindow.AdvanceChar_1426();
                                    var colonPosition: number = 0;
                                    var colonPosition_ref0 = { refObj: colonPosition };
                                    this.ScanInterpolatedStringLiteralHoleBalancedText('}', true, colonPosition_ref0);

                                    colonPosition = colonPosition_ref0.refObj;;
                                    var end: number = this.lexer.TextWindow.Position;
                                    if (this.lexer.TextWindow.PeekChar_2423() == '}') {
                                        this.lexer.TextWindow.AdvanceChar_1426();
                                    }
                                    else {
                                        if (this.error == null)
                                            this.error = this.lexer.MakeError_1764(interpolationStart - 1, 2, ErrorCode.ERR_UnclosedExpressionHole);
                                    }
                                    if (interpolations != null)
                                        interpolations.Add(new Interpolation().ctor_1605(interpolationStart, colonPosition, end));
                                }
                                continue __Outer7;
                            case '\\':
                                if (this.isVerbatim)
                                    __tDefault15 = true; break;
                                var escapeStart = this.lexer.TextWindow.Position;
                                var c2: string = '';
                                var c2_ref0 = { refObj: c2 };
                                var ret_val__765 = this.lexer.ScanEscapeSequence(c2_ref0);

                                c2 = c2_ref0.refObj;
                                var ch: string = ret_val__765;
                                if (ch == '{' || ch == '}') {
                                    if (this.error == null)
                                        this.error = this.lexer.MakeError_1930(escapeStart, this.lexer.TextWindow.Position - escapeStart, ErrorCode.ERR_EscapedCurly, ch);
                                }
                                continue __Outer7;
                            default:
                                this.lexer.TextWindow.AdvanceChar_1426();
                                continue __Outer7;
                        }


                        if (__tDefault15) {
                            this.lexer.TextWindow.AdvanceChar_1426();
                            continue __Outer7;
                        }

                        break;
                    }

                }
            }
            private ScanFormatSpecifier(): void {
                System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == ':');
                this.lexer.TextWindow.AdvanceChar_1426();
                while (true) {
                    var ch: string = this.lexer.TextWindow.PeekChar_2423();
                    if (ch == '\\' && !this.isVerbatim) {
                        var pos = this.lexer.TextWindow.Position;
                        var c2: string = '';
                        var c2_ref0 = { refObj: c2 };
                        var ret_val__835 = this.lexer.ScanEscapeSequence(c2_ref0);

                        c2 = c2_ref0.refObj;
                        ch = ret_val__835;
                        if (ch == '{' || ch == '}') {
                            if (this.error == null)
                                this.error = this.lexer.MakeError_1930(pos, 1, ErrorCode.ERR_EscapedCurly, ch);
                        }
                    }
                    else if (ch == '"') {
                        if (this.isVerbatim && this.lexer.TextWindow.PeekChar_4867(1) == '"') {
                            this.lexer.TextWindow.AdvanceChar_1426();
                            this.lexer.TextWindow.AdvanceChar_1426();
                        }
                        else {
                            return
                        }
                    }
                    else if (ch == '{') {
                        var pos = this.lexer.TextWindow.Position;
                        this.lexer.TextWindow.AdvanceChar_1426();
                        if (this.lexer.TextWindow.PeekChar_2423() == '{') {
                            this.lexer.TextWindow.AdvanceChar_1426();
                        }
                        else {
                            if (this.error == null)
                                this.error = this.lexer.MakeError_1930(pos, 1, ErrorCode.ERR_UnescapedCurly, "{");
                        }
                    }
                    else if (ch == '}') {
                        if (this.lexer.TextWindow.PeekChar_4867(1) == '}') {
                            this.lexer.TextWindow.AdvanceChar_1426();
                            this.lexer.TextWindow.AdvanceChar_1426();
                        }
                        else {
                            return
                        }
                    }
                    else if (this.IsAtEnd_5911()) {
                        return
                    }
                    else {
                        this.lexer.TextWindow.AdvanceChar_1426();
                    }
                }
            }
            private ScanInterpolatedStringLiteralHoleBalancedText(endingChar: string, isHole: boolean, colonPosition: { refObj: number }): void {
                __Outer61: while (true) {
                    if (this.IsAtEnd_5911()) {
                        return
                    }
                    var ch: string = this.lexer.TextWindow.PeekChar_2423();
                    var __tSwitch9 = ch;
                    while (true) {
                        var __tDefault48 = false;
                        switch (__tSwitch9) {
                            case '#':
                                if (this.error == null)
                                    this.error = this.lexer.MakeError_1930(this.lexer.TextWindow.Position, 1, ErrorCode.ERR_SyntaxError, endingChar.ToString());
                                this.lexer.TextWindow.AdvanceChar_1426();
                                continue __Outer61;
                            case '$':
                                if (this.lexer.TextWindow.PeekChar_4867(1) == '"' || this.lexer.TextWindow.PeekChar_4867(1) == '@' && this.lexer.TextWindow.PeekChar_4867(2) == '"') {
                                    var isVerbatimSubstring: boolean = this.lexer.TextWindow.PeekChar_4867(1) == '@';
                                    var interpolations = null;
                                    var info = structDefault(TokenInfo);
                                    var wasVerbatim: boolean = this.isVerbatim;
                                    var wasAllowNewlines: boolean = this.allowNewlines;
                                    try
                                    {
                                        this.isVerbatim = isVerbatimSubstring;
                                        this.allowNewlines = this.allowNewlines && this.isVerbatim;
                                        var info_ref0 = { refObj: info };
                                        this.ScanInterpolatedStringLiteralTop(interpolations, info_ref0);

                                        info = info_ref0.refObj;;
                                    }

                                    finally {
                                        this.isVerbatim = wasVerbatim;
                                        this.allowNewlines = wasAllowNewlines;
                                    }
                                    continue __Outer61;
                                }
                                else {
                                    __tDefault48 = true; break;
                                }
                            case ':':
                                if (isHole) {
                                    System.Diagnostics.Debug.Assert(colonPosition.refObj == 0);
                                    colonPosition.refObj = this.lexer.TextWindow.Position;
                                    this.ScanFormatSpecifier();
                                    return
                                }
                                __tDefault48 = true; break;
                            case '}':
                            case ')':
                            case ']':
                                if (ch == endingChar)
                                    return
                                if (this.error == null)
                                    this.error = this.lexer.MakeError_1930(this.lexer.TextWindow.Position, 1, ErrorCode.ERR_SyntaxError, endingChar.ToString());
                                __tDefault48 = true; break;
                            case '\"':
                            case '\'':
                                this.ScanInterpolatedStringLiteralNestedString(ch);
                                continue __Outer61;
                            case '@':
                                if (this.lexer.TextWindow.PeekChar_4867(1) == '\"') {
                                    this.ScanInterpolatedStringLiteralNestedVerbatimString();
                                    continue __Outer61;
                                }
                                __tDefault48 = true; break;
                            case '/':
                                switch (this.lexer.TextWindow.PeekChar_4867(1)) {
                                    case '/':
                                        if (this.isVerbatim && this.allowNewlines) {
                                            this.lexer.TextWindow.AdvanceChar_1426();
                                            this.lexer.TextWindow.AdvanceChar_1426();
                                            while (!this.IsAtEnd_1079(false)) {
                                                this.lexer.TextWindow.AdvanceChar_1426();
                                            }
                                        }
                                        else {
                                            if (this.error == null)
                                                this.error = this.lexer.MakeError_1764(this.lexer.TextWindow.Position, 2, ErrorCode.ERR_SingleLineCommentInExpressionHole);
                                            this.lexer.TextWindow.AdvanceChar_1426();
                                            this.lexer.TextWindow.AdvanceChar_1426();
                                        }
                                        continue __Outer61;
                                    case '*':
                                        this.ScanInterpolatedStringLiteralNestedComment();
                                        continue __Outer61;
                                    default:
                                        this.lexer.TextWindow.AdvanceChar_1426();
                                        continue __Outer61;
                                }
                            case '{':
                                this.ScanInterpolatedStringLiteralHoleBracketed('{', '}');
                                continue __Outer61;
                            case '(':
                                this.ScanInterpolatedStringLiteralHoleBracketed('(', ')');
                                continue __Outer61;
                            case '[':
                                this.ScanInterpolatedStringLiteralHoleBracketed('[', ']');
                                continue __Outer61;
                            default:
                                this.lexer.TextWindow.AdvanceChar_1426();
                                continue __Outer61;
                        }


                        if (__tDefault48) {
                            this.lexer.TextWindow.AdvanceChar_1426();
                            continue __Outer61;
                        }

                        break;
                    }

                }
            }
            private ScanInterpolatedStringLiteralNestedComment(): void {
                System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == '/');
                this.lexer.TextWindow.AdvanceChar_1426();
                System.Diagnostics.Debug.Assert(this.lexer.TextWindow.PeekChar_2423() == '*');
                this.lexer.TextWindow.AdvanceChar_1426();
                while (true) {
                    if (this.IsAtEnd_5911()) {
                        return
                    }
                    var ch = this.lexer.TextWindow.PeekChar_2423();
                    this.lexer.TextWindow.AdvanceChar_1426();
                    if (ch == '*' && this.lexer.TextWindow.PeekChar_2423() == '/') {
                        this.lexer.TextWindow.AdvanceChar_1426();
                        return
                    }
                }
            }
            private ScanInterpolatedStringLiteralNestedString(quote: string): void {
                var discarded = structDefault(TokenInfo);
                var discarded_ref0 = { refObj: discarded };
                this.lexer.ScanStringLiteral(discarded_ref0, true);

                discarded = discarded_ref0.refObj;;
            }
            private ScanInterpolatedStringLiteralNestedVerbatimString(): void {
                var discarded = structDefault(TokenInfo);
                var discarded_ref0 = { refObj: discarded };
                this.lexer.ScanVerbatimStringLiteral(discarded_ref0,/*allowNewlines:*/this.allowNewlines);

                discarded = discarded_ref0.refObj;;
            }
            private ScanInterpolatedStringLiteralHoleBracketed(start: string, end: string): void {
                System.Diagnostics.Debug.Assert(start == this.lexer.TextWindow.PeekChar_2423());
                this.lexer.TextWindow.AdvanceChar_1426();
                var colon: number = 0;
                var colon_ref0 = { refObj: colon };
                this.ScanInterpolatedStringLiteralHoleBalancedText(end, false, colon_ref0);

                colon = colon_ref0.refObj;;
                if (this.lexer.TextWindow.PeekChar_2423() == end) {
                    this.lexer.TextWindow.AdvanceChar_1426();
                }
                else {

                }
            }
            constructor() { }
        }

        export enum CharFlags {
            White,
            CR,
            LF,
            Letter,
            Digit,
            Punct,
            Dot,
            CompoundPunctStart,
            Slash,
            Complex,
            EndOfFile
        }

        export enum QuickScanState {
            Initial,
            FollowingWhite,
            FollowingCR,
            Ident,
            Number,
            Punctuation,
            Dot,
            CompoundPunctStart,
            DoneAfterNext,
            Done,
            Bad
        }
    }
}
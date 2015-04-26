module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxParser implements System.IDisposable {
        protected  lexer: Lexer;
        private isIncremental: boolean = false;
        private allowModeReset: boolean = false;
        protected  cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken);
        private mode: LexerMode = 0;
        private firstBlender: Blender = structDefault(Blender);
        private currentNode: BlendedNode = structDefault(BlendedNode);
        private currentToken: SyntaxToken;
        private lexedTokens: SyntaxToken[];
        private prevTokenTrailingTrivia: CSharpSyntaxNode;
        private firstToken: number = 0;
        private tokenOffset: number = 0;
        private tokenCount: number = 0;
        private resetCount: number = 0;
        private resetStart: number = 0;
        private static blendedNodesPool: Roslyn.Utilities.ObjectPool<BlendedNode[]> = new Roslyn.Utilities.ObjectPool<BlendedNode[]>().ctor_5203(() => StructArray(BlendedNode, 32), 2);
        private blendedTokens: BlendedNode[];
        ctor_2025(lexer: Lexer, mode: LexerMode, oldTree: CSharp.CSharpSyntaxNode, changes: System.Collections.Generic.IEnumerable<Text.TextChangeRange>, allowModeReset: boolean, preLexIfNotIncremental: boolean = false, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxParser {

            this.lexer = lexer;
            this.mode = mode;
            this.allowModeReset = allowModeReset;
            this.cancellationToken = cancellationToken;
            this.currentNode = structDefault(BlendedNode);
            this.isIncremental = oldTree != null;
            if (this.IsIncremental || allowModeReset) {
                this.firstBlender = new Blender().ctor_1633(lexer, oldTree, changes);
                this.blendedTokens = SyntaxParser.blendedNodesPool.Allocate();
            }
            else {
                this.firstBlender = structDefault(Blender);
                this.lexedTokens = new Array<SyntaxToken>(32);
            }
            if (preLexIfNotIncremental && !this.IsIncremental && !cancellationToken.CanBeCanceled) {
                this.PreLex();
            }
            return this;
        }
        public Dispose(): void {
            var blendedTokens = this.blendedTokens;
            if (blendedTokens != null) {
                TSArray.Clear(this.blendedTokens, 0, this.blendedTokens.length);
                SyntaxParser.blendedNodesPool.Free(this.blendedTokens);
                this.blendedTokens = null;
            }
        }
        protected ReInitialize(): void {
            this.firstToken = 0;
            this.tokenOffset = 0;
            this.tokenCount = 0;
            this.resetCount = 0;
            this.resetStart = 0;
            this.currentToken = null;
            this.prevTokenTrailingTrivia = null;
            if (this.IsIncremental || this.allowModeReset) {
                this.firstBlender = new Blender().ctor_1633(this.lexer, null, null);
            }
        }
        protected get IsIncremental(): boolean {
            return this.isIncremental;
        }

        protected GetIsIncremental(): boolean {
            return this.isIncremental;
        }
        private PreLex(): void {
            var size = System.Math.Min(4096, System.Math.Max(32,(this.lexer.TextWindow.Text.Length / 2 | 0)));
            this.lexedTokens = new Array<SyntaxToken>(size);
            var lexer = this.lexer;
            var mode = this.mode;
            for (var i: number = 0; i < size; i++) {
                var token = lexer.Lex_5670(mode);
                this.AddLexedToken(token);
                if (token.Kind == SyntaxKind.EndOfFileToken) {
                    break;
                }
            }
        }
        protected GetResetPoint(): SyntaxParser.ResetPoint {
            var pos = this.firstToken + this.tokenOffset;
            if (this.resetCount == 0) {
                this.resetStart = pos;
            }
            this.resetCount++;
            return new SyntaxParser.ResetPoint().ctor_2078(this.resetCount, this.mode, pos, this.prevTokenTrailingTrivia);
        }
        protected Reset(point: { refObj: SyntaxParser.ResetPoint }): void {
            this.mode = point.refObj.Mode;
            var offset = point.refObj.Position - this.firstToken;
            System.Diagnostics.Debug.Assert(offset >= 0 && offset < this.tokenCount);
            this.tokenOffset = offset;
            this.currentToken = null;
            this.currentNode = structDefault(BlendedNode);
            this.prevTokenTrailingTrivia = point.refObj.PrevTokenTrailingTrivia;
            if (this.blendedTokens != null) {
                for (var i: number = this.tokenOffset; i < this.tokenCount; i++) {
                    if (this.blendedTokens[i].Token == null) {
                        this.tokenCount = i;
                        break;
                    }
                }
            }
        }
        protected Release(point: { refObj: SyntaxParser.ResetPoint }): void {
            System.Diagnostics.Debug.Assert(this.resetCount == point.refObj.ResetCount);
            this.resetCount--;
            if (this.resetCount == 0) {
                this.resetStart = -1;
            }
        }
        public get Options(): CSharpParseOptions {
            return this.lexer.Options;
        }
        public get IsInteractive(): boolean {
            return this.Options.Kind == SourceCodeKind.Interactive;
        }
        public get IsScript(): boolean {
            return this.Options.Kind != SourceCodeKind.Regular;
        }
        protected get Mode(): LexerMode {
            return this.mode;
        }
        protected set Mode(value: LexerMode) {
            if (this.mode != value) {
                System.Diagnostics.Debug.Assert(this.allowModeReset);
                this.mode = value;
                this.currentToken = null;
                this.currentNode = structDefault(BlendedNode);
                this.tokenCount = this.tokenOffset;
            }
        }
        protected get CurrentNode(): CSharp.CSharpSyntaxNode {
            System.Diagnostics.Debug.Assert(this.blendedTokens != null);
            var node = this.currentNode.Node;
            if (node != null) {
                return node;
            }
            this.ReadCurrentNode();
            return this.currentNode.Node;
        }
        protected get CurrentNodeKind(): SyntaxKind {
            var cn = this.CurrentNode;
            return cn != null ? cn.Kind : SyntaxKind.None;
        }
        private ReadCurrentNode(): void {
            if (this.tokenOffset == 0) {
                this.currentNode = this.firstBlender.ReadNode(this.mode);
            }
            else {
                this.currentNode = this.blendedTokens[this.tokenOffset - 1].Blender.ReadNode(this.mode);
            }
        }
        protected EatNode(): GreenNode {
            System.Diagnostics.Debug.Assert(this.blendedTokens != null);
            var result = this.CurrentNode.Green;
            if (this.tokenOffset >= this.blendedTokens.length) {
                this.AddTokenSlot();
            }
            this.blendedTokens[this.tokenOffset++] = this.currentNode;
            this.tokenCount = this.tokenOffset;
            this.currentNode = structDefault(BlendedNode);
            this.currentToken = null;
            return result;
        }
        protected get CurrentToken(): SyntaxToken {
            return this.currentToken != null ? this.currentToken : (this.currentToken = this.FetchCurrentToken());
        }
        private FetchCurrentToken(): SyntaxToken {
            if (this.tokenOffset >= this.tokenCount) {
                this.AddNewToken();
            }
            if (this.blendedTokens != null) {
                return this.blendedTokens[this.tokenOffset].Token;
            }
            else {
                return this.lexedTokens[this.tokenOffset];
            }
        }
        private AddNewToken(): void {
            if (this.blendedTokens != null) {
                if (this.tokenCount > 0) {
                    this.AddToken(this.blendedTokens[this.tokenCount - 1].Blender.ReadToken(this.mode));
                }
                else {
                    if (this.currentNode.Token != null) {
                        this.AddToken(this.currentNode);
                    }
                    else {
                        this.AddToken(this.firstBlender.ReadToken(this.mode));
                    }
                }
            }
            else {
                this.AddLexedToken(this.lexer.Lex_5670(this.mode));
            }
        }
        private AddToken(tokenResult: BlendedNode): void {
            System.Diagnostics.Debug.Assert(tokenResult.Token != null);
            if (this.tokenCount >= this.blendedTokens.length) {
                this.AddTokenSlot();
            }
            this.blendedTokens[this.tokenCount] = tokenResult;
            this.tokenCount++;
        }
        private AddLexedToken(token: SyntaxToken): void {
            System.Diagnostics.Debug.Assert(token != null);
            if (this.tokenCount >= this.lexedTokens.length) {
                this.AddLexedTokenSlot();
            }
            this.lexedTokens[this.tokenCount] = token;
            this.tokenCount++;
        }
        private AddTokenSlot(): void {
            if (this.tokenOffset > (this.blendedTokens.length >> 1) && (this.resetStart == -1 || this.resetStart > this.firstToken)) {
                var shiftOffset: number = (this.resetStart == -1) ? this.tokenOffset : this.resetStart - this.firstToken;
                var shiftCount: number = this.tokenCount - shiftOffset;
                System.Diagnostics.Debug.Assert(shiftOffset > 0);
                this.firstBlender = this.blendedTokens[shiftOffset - 1].Blender;
                if (shiftCount > 0) {
                    TSArray.Copy(this.blendedTokens, shiftOffset, this.blendedTokens, 0, shiftCount);
                }
                this.firstToken += shiftOffset;
                this.tokenCount -= shiftOffset;
                this.tokenOffset -= shiftOffset;
            }
            else {
                var old = this.blendedTokens;
                var blendedTokens_ref0 = { refObj: this.blendedTokens };
                TSArray.ResizeWithDefault(blendedTokens_ref0, this.blendedTokens.length * 2, BlendedNode);

                this.blendedTokens = blendedTokens_ref0.refObj;;
                SyntaxParser.blendedNodesPool.ForgetTrackedObject(old,/*replacement:*/this.blendedTokens);
            }
        }
        private AddLexedTokenSlot(): void {
            if (this.tokenOffset > (this.lexedTokens.length >> 1) && (this.resetStart == -1 || this.resetStart > this.firstToken)) {
                var shiftOffset: number = (this.resetStart == -1) ? this.tokenOffset : this.resetStart - this.firstToken;
                var shiftCount: number = this.tokenCount - shiftOffset;
                System.Diagnostics.Debug.Assert(shiftOffset > 0);
                if (shiftCount > 0) {
                    TSArray.Copy(this.lexedTokens, shiftOffset, this.lexedTokens, 0, shiftCount);
                }
                this.firstToken += shiftOffset;
                this.tokenCount -= shiftOffset;
                this.tokenOffset -= shiftOffset;
            }
            else {
                var tmp = new Array<SyntaxToken>(this.lexedTokens.length * 2);
                TSArray.Copy(this.lexedTokens, tmp, this.lexedTokens.length);
                this.lexedTokens = tmp;
            }
        }
        protected PeekToken(n: number): SyntaxToken {
            System.Diagnostics.Debug.Assert(n >= 0);
            while (this.tokenOffset + n >= this.tokenCount) {
                this.AddNewToken();
            }
            if (this.blendedTokens != null) {
                return this.blendedTokens[this.tokenOffset + n].Token;
            }
            else {
                return this.lexedTokens[this.tokenOffset + n];
            }
        }
        protected EatToken_2098(): SyntaxToken {
            var ct = this.CurrentToken;
            this.MoveToNextToken();
            return ct;
        }
        private MoveToNextToken(): void {
            this.prevTokenTrailingTrivia = this.currentToken.GetTrailingTrivia();
            this.currentToken = null;
            if (this.blendedTokens != null) {
                this.currentNode = structDefault(BlendedNode);
            }
            this.tokenOffset++;
        }
        protected EatToken_1865(kind: SyntaxKind): SyntaxToken {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            var ct = this.CurrentToken;
            if (ct.Kind == kind) {
                this.MoveToNextToken();
                return ct;
            }
            return this.CreateMissingToken_3851(kind, this.CurrentToken.Kind,/*reportError:*/true);
        }
        private CreateMissingToken_3851(expected: SyntaxKind, actual: SyntaxKind, reportError: boolean): SyntaxToken {
            var token = SyntaxFactory.MissingToken_7070(expected);
            if (reportError) {
                token = this.WithAdditionalDiagnostics(token, this.GetExpectedTokenError_2124(expected, actual));
            }
            return token;
        }
        private CreateMissingToken_1324(expected: SyntaxKind, code: ErrorCode, reportError: boolean): SyntaxToken {
            var token = SyntaxFactory.MissingToken_7070(expected);
            if (reportError) {
                token = this.AddError_1357(token, code);
            }
            return token;
        }
        protected EatToken_1610(kind: SyntaxKind, reportError: boolean): SyntaxToken {
            if (reportError) {
                return this.EatToken_1865(kind);
            }
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            if (this.CurrentToken.Kind != kind) {
                return SyntaxFactory.MissingToken_7070(kind);
            }
            else {
                return this.EatToken_2098();
            }
        }
        protected EatToken_4938(kind: SyntaxKind, code: ErrorCode, reportError: boolean = true): SyntaxToken {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            if (this.CurrentToken.Kind != kind) {
                return this.CreateMissingToken_1324(kind, code, reportError);
            }
            else {
                return this.EatToken_2098();
            }
        }
        protected EatTokenWithPrejudice_1765(kind: SyntaxKind): SyntaxToken {
            var token = this.CurrentToken;
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            if (token.Kind != kind) {
                token = this.WithAdditionalDiagnostics(token, this.GetExpectedTokenError_2124(kind, token.Kind));
            }
            this.MoveToNextToken();
            return token;
        }
        protected EatTokenWithPrejudice_1392(errorCode: ErrorCode, ...args: Object[]): SyntaxToken {
            var token = this.EatToken_2098();
            token = this.WithAdditionalDiagnostics(token, SyntaxParser.MakeError_1930(token.GetLeadingTriviaWidth(), token.Width, errorCode, args));
            return token;
        }
        protected EatContextualToken_1786(kind: SyntaxKind, code: ErrorCode, reportError: boolean = true): SyntaxToken {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            if (this.CurrentToken.ContextualKind != kind) {
                return this.CreateMissingToken_1324(kind, code, reportError);
            }
            else {
                return SyntaxParser.ConvertToKeyword(this.EatToken_2098());
            }
        }
        protected EatContextualToken_1181(kind: SyntaxKind, reportError: boolean = true): SyntaxToken {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            var contextualKind = this.CurrentToken.ContextualKind;
            if (contextualKind != kind) {
                return this.CreateMissingToken_3851(kind, contextualKind, reportError);
            }
            else {
                return SyntaxParser.ConvertToKeyword(this.EatToken_2098());
            }
        }
        protected  GetExpectedTokenError_1077(expected: SyntaxKind, actual: SyntaxKind, offset: number, width: number): SyntaxDiagnosticInfo {
            var code = SyntaxParser.GetExpectedTokenErrorCode(expected, actual);
            if (code == ErrorCode.ERR_SyntaxError || code == ErrorCode.ERR_IdentifierExpectedKW) {
                return new SyntaxDiagnosticInfo().ctor_7359(offset, width, code, SyntaxFacts.GetText_3915(expected), SyntaxFacts.GetText_3915(actual));
            }
            else {
                return new SyntaxDiagnosticInfo().ctor_1813(offset, width, code);
            }
        }
        protected  GetExpectedTokenError_2124(expected: SyntaxKind, actual: SyntaxKind): SyntaxDiagnosticInfo {
            var offset: number = 0, width = 0;
            var offset_ref0 = { refObj: offset };
            var width_ref1 = { refObj: width };
            this.GetDiagnosticSpanForMissingToken(offset_ref0, width_ref1);

            offset = offset_ref0.refObj;

            width = width_ref1.refObj;;
            return this.GetExpectedTokenError_1077(expected, actual, offset, width);
        }
        private static GetExpectedTokenErrorCode(expected: SyntaxKind, actual: SyntaxKind): ErrorCode {
            switch (expected) {
                case SyntaxKind.IdentifierToken:
                    if (SyntaxFacts.IsReservedKeyword(actual)) {
                        return ErrorCode.ERR_IdentifierExpectedKW;
                    }
                    else {
                        return ErrorCode.ERR_IdentifierExpected;
                    }
                case SyntaxKind.SemicolonToken:
                    return ErrorCode.ERR_SemicolonExpected;
                case SyntaxKind.CloseParenToken:
                    return ErrorCode.ERR_CloseParenExpected;
                case SyntaxKind.OpenBraceToken:
                    return ErrorCode.ERR_LbraceExpected;
                case SyntaxKind.CloseBraceToken:
                    return ErrorCode.ERR_RbraceExpected;
                default:
                    return ErrorCode.ERR_SyntaxError;
            }
        }
        protected GetDiagnosticSpanForMissingToken(offset: { refObj: number }, width: { refObj: number }): void {
            var trivia = this.prevTokenTrailingTrivia;
            if (trivia != null) {
                var triviaList: SyntaxList<CSharpSyntaxNode> = new SyntaxList<CSharpSyntaxNode>().ctor_1319(trivia);
                var prevTokenHasEndOfLineTrivia: boolean = triviaList.Any_1043(SyntaxKind.EndOfLineTrivia);
                if (prevTokenHasEndOfLineTrivia) {
                    offset.refObj = -trivia.FullWidth;
                    width.refObj = 0;
                    return
                }
            }
            var ct: SyntaxToken = this.CurrentToken;
            offset.refObj = ct.GetLeadingTriviaWidth();
            width.refObj = ct.Width;
        }
        protected  WithAdditionalDiagnostics<TNode extends CSharpSyntaxNode>(node: TNode, ...diagnostics: DiagnosticInfo[]): TNode {
            return this.WithAdditionalDiagnostics_Arr(node, diagnostics);
        }

        protected  WithAdditionalDiagnostics_Arr<TNode extends CSharpSyntaxNode>(node: TNode, diagnostics: DiagnosticInfo[]): TNode {
            var existingDiags: DiagnosticInfo[] = node.GetDiagnostics();
            var existingLength: number = existingDiags.length;
            if (existingLength == 0)
                return CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(node,
                    diagnostics);
            else {
                var result: DiagnosticInfo[] = new Array(existingDiags.length + diagnostics.length);
                existingDiags.CopyTo(result, 0);
                diagnostics.CopyTo(result, existingLength);
                return CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(node,
                    result);
            }
        }
        protected AddError_1357<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode): TNode {
            return this.AddError_7870(node, code, Roslyn.Utilities.SpecializedCollections.EmptyObjects);
        }
        protected AddError_7870<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode, ...args: Object[]): TNode {
            if (!node.IsMissing) {
                return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_6690(node, code, args));
            }
            var offset: number = 0, width = 0;
            var token: SyntaxToken = __as__<SyntaxToken>(node, SyntaxToken);
            if (token != null && token.ContainsSkippedText) {
                offset = token.GetLeadingTriviaWidth();
                System.Diagnostics.Debug.Assert(offset == 0, "Why are we producing a missing token that has both skipped text and leading trivia?");
                width = 0;
                var seenSkipped: boolean = false;
                // for each
                var triviaEnumerator = token.TrailingTrivia.GetEnumerator();

                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (trivia.Kind == SyntaxKind.SkippedTokensTrivia) {
                        seenSkipped = true;
                        width += trivia.Width;
                    }
                    else if (seenSkipped) {
                        break;
                    }
                    else {
                        offset += trivia.Width;
                    }
                }    
                // end foreach
            }
            else {
                var offset_ref0 = { refObj: offset };
                var width_ref1 = { refObj: width };
                this.GetDiagnosticSpanForMissingToken(offset_ref0, width_ref1);

                offset = offset_ref0.refObj;

                width = width_ref1.refObj;;
            }
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1930(offset, width, code, args));
        }
        protected AddError_1911<TNode extends CSharpSyntaxNode>(node: TNode, offset: number, length: number, code: ErrorCode, ...args: Object[]): TNode {
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1930(offset, length, code, args));
        }
        protected AddError_7816<TNode extends CSharpSyntaxNode>(node: TNode, location: CSharpSyntaxNode, code: ErrorCode, ...args: Object[]): TNode {
            var offset: number = 0;
            var offset_ref0 = { refObj: offset };
            this.FindOffset(node, location, offset_ref0);

            offset = offset_ref0.refObj;;
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1930(offset, location.Width, code, args));
        }
        protected AddErrorToFirstToken_3098<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode): TNode {
            var firstToken = node.GetFirstToken();
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1764(firstToken.GetLeadingTriviaWidth(), firstToken.Width, code));
        }
        protected AddErrorToFirstToken_6118<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode, ...args: Object[]): TNode {
            var firstToken = node.GetFirstToken();
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1930(firstToken.GetLeadingTriviaWidth(), firstToken.Width, code, args));
        }
        protected AddErrorToLastToken_1417<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode): TNode {
            var offset: number = 0;
            var width: number = 0;
            var offset_ref0 = { refObj: offset };
            var width_ref1 = { refObj: width };
            SyntaxParser.GetOffsetAndWidthForLastToken(node, offset_ref0, width_ref1);

            offset = offset_ref0.refObj;

            width = width_ref1.refObj;;
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1764(offset, width, code));
        }
        protected AddErrorToLastToken_2523<TNode extends CSharpSyntaxNode>(node: TNode, code: ErrorCode, ...args: Object[]): TNode {
            var offset: number = 0;
            var width: number = 0;
            var offset_ref0 = { refObj: offset };
            var width_ref1 = { refObj: width };
            SyntaxParser.GetOffsetAndWidthForLastToken(node, offset_ref0, width_ref1);

            offset = offset_ref0.refObj;

            width = width_ref1.refObj;;
            return this.WithAdditionalDiagnostics(node, SyntaxParser.MakeError_1930(offset, width, code, args));
        }
        private static GetOffsetAndWidthForLastToken<TNode extends CSharpSyntaxNode>(node: TNode, offset: { refObj: number }, width: { refObj: number }): void {
            var lastToken = node.GetLastNonmissingToken();
            offset.refObj = node.FullWidth;
            width.refObj = 0;
            if (lastToken != null) {
                offset.refObj -= lastToken.FullWidth;
                offset.refObj += lastToken.GetLeadingTriviaWidth();
                width.refObj += lastToken.Width;
            }
        }
        protected static MakeError_1764(offset: number, width: number, code: ErrorCode): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_1813(offset, width, code);
        }
        protected static MakeError_1930(offset: number, width: number, code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_7359(offset, width, code, args);
        }
        protected static MakeError_6690(node: CSharpSyntaxNode, code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_7359(node.GetLeadingTriviaWidth(), node.Width, code, args);
        }
        protected static MakeError_2338(code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_1447(code, args);
        }
        protected AddLeadingSkippedSyntax<TNode extends CSharpSyntaxNode>(node: TNode, skippedSyntax: CSharpSyntaxNode): TNode {
            var temp = __as__<SyntaxToken>(node, SyntaxToken);
            var oldToken = temp != null ? temp : node.GetFirstToken();
            var newToken = this.AddSkippedSyntax(oldToken, skippedSyntax,/*trailing:*/false);
            return SyntaxFirstTokenReplacer.Replace(node, oldToken, newToken, skippedSyntax.FullWidth);
        }
        protected AddTrailingSkippedSyntax<TNode extends CSharpSyntaxNode>(node: TNode, skippedSyntax: CSharpSyntaxNode): TNode {
            var token = __as__<SyntaxToken>(node, SyntaxToken);
            if (token != null) {
                return <TNode><Object>this.AddSkippedSyntax(token, skippedSyntax,/*trailing:*/true);
            }
            else {
                var lastToken = node.GetLastToken();
                var newToken = this.AddSkippedSyntax(lastToken, skippedSyntax,/*trailing:*/true);
                return SyntaxLastTokenReplacer.Replace(node, newToken);
            }
        }
        public AddSkippedSyntax(target: SyntaxToken, skippedSyntax: CSharpSyntaxNode, trailing: boolean): SyntaxToken {
            var builder = new SyntaxListBaseBuilder().ctor_1860(4);
            var diagnostic: SyntaxDiagnosticInfo = null;
            var diagnosticOffset: number = 0;
            var currentOffset: number = 0;
            // for each
            var nodeEnumerator = skippedSyntax.EnumerateNodes().GetEnumerator();
            try {
                while (nodeEnumerator.MoveNext()) {
                    var node = nodeEnumerator.Current;
                    // foreach block
                    var token: SyntaxToken = __as__<SyntaxToken>(node, SyntaxToken);
                    if (token != null) {
                        builder.Add(token.GetLeadingTrivia());
                        if (token.Width > 0) {
                            var tk: SyntaxToken = token.WithLeadingTrivia_9638(null).WithTrailingTrivia_9295(null);
                            var leadingWidth: number = token.GetLeadingTriviaWidth();
                            if (leadingWidth > 0) {
                                var tokenDiagnostics = tk.GetDiagnostics();
                                for (var i: number = 0; i < tokenDiagnostics.length; i++) {
                                    var d = <SyntaxDiagnosticInfo>tokenDiagnostics[i];
                                    tokenDiagnostics[i] = new SyntaxDiagnosticInfo().ctor_7359(d.Offset - leadingWidth, d.Width, <ErrorCode>d.Code, d.Arguments);
                                }
                            }
                            builder.Add(SyntaxFactory.SkippedTokensTrivia(SyntaxList.op_Implicit_5999<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(tk)));
                        }
                        else {
                            var existing = <SyntaxDiagnosticInfo>System.Linq.Enumerable.FirstOrDefault(token.GetDiagnostics());
                            if (existing != null) {
                                diagnostic = existing;
                                diagnosticOffset = currentOffset;
                            }
                        }
                        builder.Add(token.GetTrailingTrivia());
                        currentOffset += token.FullWidth;
                    }
                    else if (node.ContainsDiagnostics && diagnostic == null) {
                        var existing = <SyntaxDiagnosticInfo>System.Linq.Enumerable.FirstOrDefault(node.GetDiagnostics());
                        if (existing != null) {
                            diagnostic = existing;
                            diagnosticOffset = currentOffset;
                        }
                    }
                }
            } finally {
                if (nodeEnumerator !== null) nodeEnumerator.Dispose();

            }    
            // end foreach
            var triviaWidth: number = currentOffset;
            var trivia = builder.ToListNode();
            var triviaOffset: number = 0;
            if (trailing) {
                var trailingTrivia = target.GetTrailingTrivia();
                triviaOffset = target.FullWidth;
                target = target.WithTrailingTrivia_9295(SyntaxListBase.Concat(trailingTrivia, trivia));
            }
            else {
                if (triviaWidth > 0) {
                    var targetDiagnostics = target.GetDiagnostics();
                    for (var i: number = 0; i < targetDiagnostics.length; i++) {
                        var d = <SyntaxDiagnosticInfo>targetDiagnostics[i];
                        targetDiagnostics[i] = new SyntaxDiagnosticInfo().ctor_7359(d.Offset + triviaWidth, d.Width, <ErrorCode>d.Code, d.Arguments);
                    }
                }
                var leadingTrivia = target.GetLeadingTrivia();
                target = target.WithLeadingTrivia_9638(SyntaxListBase.Concat(trivia, leadingTrivia));
                triviaOffset = 0;
            }
            if (diagnostic != null) {
                var newOffset: number = triviaOffset + diagnosticOffset + diagnostic.Offset;
                target = this.WithAdditionalDiagnostics(target, new SyntaxDiagnosticInfo().ctor_7359(newOffset, diagnostic.Width, <ErrorCode>diagnostic.Code, diagnostic.Arguments));
            }
            return target;
        }
        private FindOffset(root: GreenNode, location: CSharpSyntaxNode, offset: { refObj: number }): boolean {
            var currentOffset: number = 0;
            offset.refObj = 0;
            if (root != null) {
                for (var i: number = 0, n = root.SlotCount; i < n; i++) {
                    var child = root.GetSlot(i);
                    if (child == null) {
                        continue;
                    }
                    if (child == location) {
                        offset.refObj = currentOffset;
                        return true;
                    }
                    if (this.FindOffset(child, location, offset)) {
                        offset.refObj += child.GetLeadingTriviaWidth() + currentOffset;
                        return true;
                    }
                    currentOffset += child.FullWidth;
                }
            }
            return false;
        }
        protected static ConvertToKeyword(token: SyntaxToken): SyntaxToken {
            if (token.Kind != token.ContextualKind) {
                var kw = token.IsMissing ? SyntaxFactory.MissingToken_1287(token.LeadingTrivia.Node, token.ContextualKind, token.TrailingTrivia.Node) : SyntaxFactory.Token_1937(token.LeadingTrivia.Node, token.ContextualKind, token.TrailingTrivia.Node);
                var d = token.GetDiagnostics();
                if (d != null && d.length > 0) {
                    kw = CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(kw,
                        d);
                }
                return kw;
            }
            return token;
        }
        public get Directives(): DirectiveStack {
            return this.lexer.Directives;
        }
        protected CheckFeatureAvailability<TNode extends CSharpSyntaxNode>(node: TNode, feature: MessageID, forceWarning: boolean = false): TNode {
            var availableVersion: LanguageVersion = this.Options.LanguageVersion;
            if (feature == MessageID.IDS_FeatureModuleAttrLoc) {
                return availableVersion >= LanguageVersion.CSharp2 ? node : this.AddError_7870(node, ErrorCode.WRN_NonECMAFeature, MessageIDExtensions.Localize(feature));
            }
            if (this.IsFeatureEnabled(feature)) {
                return node;
            }
            var featureName = MessageIDExtensions.Localize(feature);
            var requiredVersion = MessageIDExtensions.RequiredVersion(feature);
            if (forceWarning) {
                var rawInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_1447(LanguageVersionExtensions.GetErrorCode(availableVersion), featureName, LanguageVersionExtensions.Localize(requiredVersion));
                return this.AddError_7870(node, ErrorCode.WRN_ErrorOverride, rawInfo, rawInfo.Code);
            }
            return this.AddError_7870(node, LanguageVersionExtensions.GetErrorCode(availableVersion), featureName, LanguageVersionExtensions.Localize(requiredVersion));
        }
        protected IsFeatureEnabled(feature: MessageID): boolean {
            var availableVersion: LanguageVersion = this.Options.LanguageVersion;
            var requiredVersion: LanguageVersion = MessageIDExtensions.RequiredVersion(feature);
            return availableVersion >= requiredVersion;
        }
        constructor() { }
    }


    // partial

    export module SyntaxParser {
        export class ResetPoint implements IStruct {
            public ResetCount: number = 0;
            public Mode: LexerMode = 0;
            public Position: number = 0;
            public PrevTokenTrailingTrivia: CSharpSyntaxNode;
            ctor_2078(resetCount: number, mode: LexerMode, position: number, prevTokenTrailingTrivia: CSharpSyntaxNode): ResetPoint {
                this.ResetCount = resetCount;
                this.Mode = mode;
                this.Position = position;
                this.PrevTokenTrailingTrivia = prevTokenTrailingTrivia;
                return this;
            }
            constructor() { }
        }
    }
}
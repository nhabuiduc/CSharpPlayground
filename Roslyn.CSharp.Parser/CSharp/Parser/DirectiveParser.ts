///<reference path="SyntaxParser.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class DirectiveParser extends SyntaxParser {
        private static MAX_DIRECTIVE_IDENTIFIER_WIDTH: number = 128;
        private context: DirectiveStack = structDefault(DirectiveStack);
        ctor_9013(lexer: Lexer, context: DirectiveStack): DirectiveParser {
            super.ctor_2025(lexer, LexerMode.Directive, null, null, false);
            this.context = context;
            return this;
        }
        public ParseDirective(isActive: boolean, endIsActive: boolean, isAfterFirstTokenInFile: boolean, isAfterNonWhitespaceOnLine: boolean): CSharpSyntaxNode {
            var result: CSharpSyntaxNode;
            var hash = this.EatToken_1610(SyntaxKind.HashToken, false);
            if (isAfterNonWhitespaceOnLine) {
                hash = this.AddError_1357(hash, ErrorCode.ERR_BadDirectivePlacement);
            }
            var contextualKind: SyntaxKind = this.CurrentToken.ContextualKind;
            switch (contextualKind) {
                case SyntaxKind.IfKeyword:
                    result = this.ParseIfDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.ElifKeyword:
                    result = this.ParseElifDirective(hash, this.EatContextualToken_1181(contextualKind), isActive, endIsActive);
                    break;
                case SyntaxKind.ElseKeyword:
                    result = this.ParseElseDirective(hash, this.EatContextualToken_1181(contextualKind), isActive, endIsActive);
                    break;
                case SyntaxKind.EndIfKeyword:
                    result = this.ParseEndIfDirective(hash, this.EatContextualToken_1181(contextualKind), isActive, endIsActive);
                    break;
                case SyntaxKind.RegionKeyword:
                    result = this.ParseRegionDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.EndRegionKeyword:
                    result = this.ParseEndRegionDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.DefineKeyword:
                case SyntaxKind.UndefKeyword:
                    result = this.ParseDefineOrUndefDirective(hash, this.EatContextualToken_1181(contextualKind), isActive, isAfterFirstTokenInFile && !isAfterNonWhitespaceOnLine);
                    break;
                case SyntaxKind.ErrorKeyword:
                case SyntaxKind.WarningKeyword:
                    result = this.ParseErrorOrWarningDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.LineKeyword:
                    result = this.ParseLineDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.PragmaKeyword:
                    result = this.ParsePragmaDirective(hash, this.EatContextualToken_1181(contextualKind), isActive);
                    break;
                case SyntaxKind.ReferenceKeyword:
                    result = this.ParseReferenceDirective(hash, this.EatContextualToken_1181(contextualKind), isActive, isAfterFirstTokenInFile && !isAfterNonWhitespaceOnLine);
                    break;
                default:
                    var id = this.EatToken_1610(SyntaxKind.IdentifierToken, false);
                    var end = this.ParseEndOfDirective(/*ignoreErrors:*/true, false, false, false);
                    if (!isAfterNonWhitespaceOnLine) {
                        if (!id.IsMissing) {
                            id = this.AddError_1357(id, ErrorCode.ERR_PPDirectiveExpected);
                        }
                        else {
                            hash = this.AddError_1357(hash, ErrorCode.ERR_PPDirectiveExpected);
                        }
                    }
                    result = SyntaxFactory.BadDirectiveTrivia(hash, id, end, isActive);
                    break;
            }
            return result;
        }
        private ParseIfDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            var expr = this.ParseExpression();
            var eod = this.ParseEndOfDirective(/*ignoreErrors:*/false, false, false, false);
            var isTrue = this.EvaluateBool(expr);
            var branchTaken = isActive && isTrue;
            return SyntaxFactory.IfDirectiveTrivia(hash, keyword, expr, eod, isActive, branchTaken, isTrue);
        }
        private ParseElifDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean, endIsActive: boolean): DirectiveTriviaSyntax {
            var expr = this.ParseExpression();
            var eod = this.ParseEndOfDirective(/*ignoreErrors:*/false, false, false, false);
            if (this.context.HasPreviousIfOrElif()) {
                var isTrue = this.EvaluateBool(expr);
                var branchTaken = endIsActive && isTrue && !this.context.PreviousBranchTaken();
                return SyntaxFactory.ElifDirectiveTrivia(hash, keyword, expr, eod, endIsActive, branchTaken, isTrue);
            }
            else {
                eod = eod.WithLeadingTrivia_9638(SyntaxListBase.Concat(SyntaxFactory.DisabledText(expr.ToFullString()), eod.GetLeadingTrivia()));
                if (this.context.HasUnfinishedRegion()) {
                    return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndRegionDirectiveExpected);
                }
                else if (this.context.HasUnfinishedIf()) {
                    return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndifDirectiveExpected);
                }
                else {
                    return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_UnexpectedDirective);
                }
            }
        }
        private ParseElseDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean, endIsActive: boolean): DirectiveTriviaSyntax {
            var eod = this.ParseEndOfDirective(/*ignoreErrors:*/false, false, false, false);
            if (this.context.HasPreviousIfOrElif()) {
                var branchTaken = endIsActive && !this.context.PreviousBranchTaken();
                return SyntaxFactory.ElseDirectiveTrivia(hash, keyword, eod, endIsActive, branchTaken);
            }
            else if (this.context.HasUnfinishedRegion()) {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndRegionDirectiveExpected);
            }
            else if (this.context.HasUnfinishedIf()) {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndifDirectiveExpected);
            }
            else {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_UnexpectedDirective);
            }
        }
        private ParseEndIfDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean, endIsActive: boolean): DirectiveTriviaSyntax {
            var eod = this.ParseEndOfDirective(/*ignoreErrors:*/false, false, false, false);
            if (this.context.HasUnfinishedIf()) {
                return SyntaxFactory.EndIfDirectiveTrivia(hash, keyword, eod, endIsActive);
            }
            else if (this.context.HasUnfinishedRegion()) {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndRegionDirectiveExpected);
            }
            else {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_UnexpectedDirective);
            }
        }
        private ParseRegionDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            return SyntaxFactory.RegionDirectiveTrivia(hash, keyword, this.ParseEndOfDirectiveWithOptionalPreprocessingMessage(), isActive);
        }
        private ParseEndRegionDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            var eod = this.ParseEndOfDirectiveWithOptionalPreprocessingMessage();
            if (this.context.HasUnfinishedRegion()) {
                return SyntaxFactory.EndRegionDirectiveTrivia(hash, keyword, eod, isActive);
            }
            else if (this.context.HasUnfinishedIf()) {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_EndifDirectiveExpected);
            }
            else {
                return this.AddError_1357(SyntaxFactory.BadDirectiveTrivia(hash, keyword, eod, isActive), ErrorCode.ERR_UnexpectedDirective);
            }
        }
        private ParseDefineOrUndefDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean, isFollowingToken: boolean): DirectiveTriviaSyntax {
            if (isFollowingToken) {
                keyword = this.AddError_1357(keyword, ErrorCode.ERR_PPDefFollowsToken);
            }
            var name = this.EatToken_4938(SyntaxKind.IdentifierToken, ErrorCode.ERR_IdentifierExpected);
            name = DirectiveParser.TruncateIdentifier(name);
            var end = this.ParseEndOfDirective(/*ignoreErrors:*/name.IsMissing, false, false, false);
            if (keyword.Kind == SyntaxKind.DefineKeyword) {
                return SyntaxFactory.DefineDirectiveTrivia(hash, keyword, name, end, isActive);
            }
            else {
                return SyntaxFactory.UndefDirectiveTrivia(hash, keyword, name, end, isActive);
            }
        }
        private ParseErrorOrWarningDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            var eod = this.ParseEndOfDirectiveWithOptionalPreprocessingMessage();
            var isError: boolean = keyword.Kind == SyntaxKind.ErrorKeyword;
            if (isActive) {
                var triviaBuilder = new System.IO.StringWriter(System.Globalization.CultureInfo.InvariantCulture);
                var triviaWidth: number = 0;
                var skipping: boolean = true;
                // for each
                var tEnumerator = keyword.TrailingTrivia.GetEnumerator();

                while (tEnumerator.MoveNext()) {
                    var t = tEnumerator.Current;
                    // foreach block
                    if (skipping) {
                        if (t.Kind == SyntaxKind.WhitespaceTrivia) {
                            continue;
                        }
                        skipping = false;
                    }
                    t.WriteTo_1077(triviaBuilder,/*leading:*/true,/*trailing:*/true);
                    triviaWidth += t.FullWidth;
                }    
                // end foreach
                // for each
                var nodeEnumerator = eod.LeadingTrivia.GetEnumerator();

                while (nodeEnumerator.MoveNext()) {
                    var node = nodeEnumerator.Current;
                    // foreach block
                    node.WriteTo_1077(triviaBuilder,/*leading:*/true,/*trailing:*/true);
                    triviaWidth += node.FullWidth;
                }    
                // end foreach
                var triviaOffset: number = eod.GetLeadingTriviaWidth() - triviaWidth;
                eod = this.AddError_1911(eod, triviaOffset, triviaWidth, isError ? ErrorCode.ERR_ErrorDirective : ErrorCode.WRN_WarningDirective, triviaBuilder.ToString());
            }
            if (isError) {
                return SyntaxFactory.ErrorDirectiveTrivia(hash, keyword, eod, isActive);
            }
            else {
                return SyntaxFactory.WarningDirectiveTrivia(hash, keyword, eod, isActive);
            }
        }
        private ParseLineDirective(hash: SyntaxToken, id: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            var line: SyntaxToken;
            var file: SyntaxToken = null;
            var sawLineButNotFile: boolean = false;
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.DefaultKeyword:
                case SyntaxKind.HiddenKeyword:
                    line = this.EatToken_2098();
                    break;
                default:
                    line = this.EatToken_4938(SyntaxKind.NumericLiteralToken, ErrorCode.ERR_InvalidLineNumber,/*reportError:*/isActive);
                    sawLineButNotFile = true;
                    if (isActive && !line.IsMissing && line.Kind == SyntaxKind.NumericLiteralToken) {
                        if (<number>(<number>line.Value | 0) < 1) {
                            line = this.AddError_1357(line, ErrorCode.ERR_InvalidLineNumber);
                        }
                        else if (<number>(<number>line.Value | 0) > 0xfeefed) {
                            line = this.AddError_1357(line, ErrorCode.WRN_TooManyLinesForDebugger);
                        }
                    }
                    if (this.CurrentToken.Kind == SyntaxKind.StringLiteralToken && (line.IsMissing || line.GetTrailingTriviaWidth() > 0 || this.CurrentToken.GetLeadingTriviaWidth() > 0)) {
                        file = this.EatToken_2098();
                        sawLineButNotFile = false;
                    }
                    break;
            }
            var end = this.ParseEndOfDirective(/*ignoreErrors:*/line.IsMissing || !isActive, false,/*afterLineNumber:*/sawLineButNotFile, false);
            return SyntaxFactory.LineDirectiveTrivia(hash, id, line, file, end, isActive);
        }
        private ParseReferenceDirective(hash: SyntaxToken, keyword: SyntaxToken, isActive: boolean, isFollowingToken: boolean): DirectiveTriviaSyntax {
            if (isActive && isFollowingToken) {
                keyword = this.AddError_1357(keyword, ErrorCode.ERR_PPReferenceFollowsToken);
            }
            var file: SyntaxToken = this.EatToken_4938(SyntaxKind.StringLiteralToken, ErrorCode.ERR_ExpectedPPFile,/*reportError:*/isActive);
            var end = this.ParseEndOfDirective(/*ignoreErrors:*/file.IsMissing || !isActive,/*afterPragma:*/false,/*afterLineNumber:*/false,/*afterReference:*/true);
            return SyntaxFactory.ReferenceDirectiveTrivia(hash, keyword, file, end, isActive);
        }
        private ParsePragmaDirective(hash: SyntaxToken, pragma: SyntaxToken, isActive: boolean): DirectiveTriviaSyntax {
            pragma = this.CheckFeatureAvailability(pragma, MessageID.IDS_FeaturePragma);
            var hasError: boolean = false;
            if (this.CurrentToken.ContextualKind == SyntaxKind.WarningKeyword) {
                var warning = this.EatContextualToken_1181(SyntaxKind.WarningKeyword);
                var style: SyntaxToken;
                if (this.CurrentToken.Kind == SyntaxKind.DisableKeyword || this.CurrentToken.Kind == SyntaxKind.RestoreKeyword) {
                    style = this.EatToken_2098();
                    var ids = new SeparatedSyntaxListBuilder<ExpressionSyntax>().ctor_8478(10);
                    while (this.CurrentToken.Kind != SyntaxKind.EndOfDirectiveToken) {
                        var id: SyntaxToken;
                        var idExpression: ExpressionSyntax;
                        if (this.CurrentToken.Kind == SyntaxKind.NumericLiteralToken) {
                            id = this.EatToken_2098();
                            idExpression = SyntaxFactory.LiteralExpression(SyntaxKind.NumericLiteralExpression, id);
                        }
                        else if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                            id = this.EatToken_2098();
                            idExpression = SyntaxFactory.IdentifierName(id);
                        }
                        else {
                            id = this.EatToken_4938(SyntaxKind.NumericLiteralToken, ErrorCode.WRN_IdentifierOrNumericLiteralExpected,/*reportError:*/isActive);
                            idExpression = SyntaxFactory.LiteralExpression(SyntaxKind.NumericLiteralExpression, id);
                        }
                        hasError = hasError || id.ContainsDiagnostics;
                        ids.Add(idExpression);
                        if (this.CurrentToken.Kind != SyntaxKind.CommaToken) {
                            break;
                        }
                        ids.AddSeparator(this.EatToken_2098());
                    }
                    var end = this.ParseEndOfDirective(hasError || !isActive,/*afterPragma:*/true, false, false);
                    return SyntaxFactory.PragmaWarningDirectiveTrivia(hash, pragma, warning, style, ids.ToList(), end, isActive);
                }
                else {
                    style = this.EatToken_4938(SyntaxKind.DisableKeyword, ErrorCode.WRN_IllegalPPWarning,/*reportError:*/isActive);
                    var end = this.ParseEndOfDirective(/*ignoreErrors:*/true,/*afterPragma:*/true, false, false);
                    return SyntaxFactory.PragmaWarningDirectiveTrivia(hash, pragma, warning, style, <SeparatedSyntaxList<ExpressionSyntax>> structDefault(SeparatedSyntaxList), end, isActive);
                }
            }
            else if (this.CurrentToken.Kind == SyntaxKind.ChecksumKeyword) {
                var checksum = this.EatToken_2098();
                var file = this.EatToken_4938(SyntaxKind.StringLiteralToken, ErrorCode.WRN_IllegalPPChecksum,/*reportError:*/isActive);
                var guid = this.EatToken_4938(SyntaxKind.StringLiteralToken, ErrorCode.WRN_IllegalPPChecksum,/*reportError:*/isActive && !file.IsMissing);
                if (isActive && !guid.IsMissing) {
                    var tmp: System.Guid = structDefault(System.Guid);
                    var tmp_ref0 = { refObj: tmp };
                    var ret_val__103 = System.Guid.TryParse(guid.ValueText, tmp_ref0);

                    tmp = tmp_ref0.refObj;
                    if (!ret_val__103) {
                        guid = this.AddError_1357(guid, ErrorCode.WRN_IllegalPPChecksum);
                    }
                }
                var bytes = this.EatToken_4938(SyntaxKind.StringLiteralToken, ErrorCode.WRN_IllegalPPChecksum,/*reportError:*/isActive && !guid.IsMissing);
                if (isActive && !bytes.IsMissing) {
                    if (bytes.ValueText.length % 2 != 0) {
                        bytes = this.AddError_1357(bytes, ErrorCode.WRN_IllegalPPChecksum);
                    }
                    else {
                        // for each
                        var cEnumerator = bytes.ValueText.GetEnumerator();

                        while (cEnumerator.MoveNext()) {
                            var c = cEnumerator.Current;
                            // foreach block
                            if (!SyntaxFacts.IsHexDigit(c)) {
                                bytes = this.AddError_1357(bytes, ErrorCode.WRN_IllegalPPChecksum);
                                break;
                            }
                        }    
                        // end foreach
                    }
                }
                hasError = file.ContainsDiagnostics || guid.ContainsDiagnostics || bytes.ContainsDiagnostics;
                var eod = this.ParseEndOfDirective(/*ignoreErrors:*/hasError,/*afterPragma:*/true, false, false);
                return SyntaxFactory.PragmaChecksumDirectiveTrivia(hash, pragma, checksum, file, guid, bytes, eod, isActive);
            }
            else {
                var warning = this.EatToken_4938(SyntaxKind.WarningKeyword, ErrorCode.WRN_IllegalPragma,/*reportError:*/isActive);
                var style = this.EatToken_1610(SyntaxKind.DisableKeyword,/*reportError:*/false);
                var eod = this.ParseEndOfDirective(/*ignoreErrors:*/true,/*afterPragma:*/true, false, false);
                return SyntaxFactory.PragmaWarningDirectiveTrivia(hash, pragma, warning, style, <SeparatedSyntaxList<ExpressionSyntax>> structDefault(SeparatedSyntaxList), eod, isActive);
            }
        }
        private ParseEndOfDirectiveWithOptionalPreprocessingMessage(): SyntaxToken {
            var builder: System.Text.StringBuilder = null;
            if (this.CurrentToken.Kind != SyntaxKind.EndOfDirectiveToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                builder = new System.Text.StringBuilder(this.CurrentToken.FullWidth);
                while (this.CurrentToken.Kind != SyntaxKind.EndOfDirectiveToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                    var token = this.EatToken_2098();
                    builder.Append(token.ToFullString());
                }
            }
            var endOfDirective: SyntaxToken = this.CurrentToken.Kind == SyntaxKind.EndOfDirectiveToken ? this.EatToken_2098() : SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken);
            if (builder != null) {
                endOfDirective = endOfDirective.WithLeadingTrivia_9638(SyntaxFactory.PreprocessingMessage(builder.ToString()));
            }
            return endOfDirective;
        }
        private ParseEndOfDirective(ignoreErrors: boolean, afterPragma: boolean = false, afterLineNumber: boolean = false, afterReference: boolean = false): SyntaxToken {
            var skippedTokens = new SyntaxListBuilder<SyntaxToken>();
            if (this.CurrentToken.Kind != SyntaxKind.EndOfDirectiveToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                skippedTokens = new SyntaxListBuilder<SyntaxToken>().ctor_7707(10);
                if (!ignoreErrors) {
                    var errorCode: ErrorCode = ErrorCode.ERR_EndOfPPLineExpected;
                    if (afterPragma) {
                        errorCode = ErrorCode.WRN_EndOfPPLineExpected;
                    }
                    else if (afterLineNumber) {
                        errorCode = ErrorCode.ERR_MissingPPFile;
                    }
                    else if (afterReference) {
                        errorCode = ErrorCode.ERR_ExpectedPPFile;
                    }
                    skippedTokens.Add(this.AddError_1357(CodeAnalysis.GreenNodeExtensions.WithoutDiagnosticsGreen(this.EatToken_2098()), errorCode));
                }
                while (this.CurrentToken.Kind != SyntaxKind.EndOfDirectiveToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                    skippedTokens.Add(CodeAnalysis.GreenNodeExtensions.WithoutDiagnosticsGreen(this.EatToken_2098()));
                }
            }
            var endOfDirective: SyntaxToken = this.CurrentToken.Kind == SyntaxKind.EndOfDirectiveToken ? this.EatToken_2098() : SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken);
            if (!skippedTokens.IsNull) {
                endOfDirective = endOfDirective.WithLeadingTrivia_9638(SyntaxFactory.SkippedTokensTrivia(skippedTokens.ToList()));
            }
            return endOfDirective;
        }
        private ParseExpression(): ExpressionSyntax {
            return this.ParseLogicalOr();
        }
        private ParseLogicalOr(): ExpressionSyntax {
            var left = this.ParseLogicalAnd();
            while (this.CurrentToken.Kind == SyntaxKind.BarBarToken) {
                var op = this.EatToken_2098();
                var right = this.ParseLogicalAnd();
                left = SyntaxFactory.BinaryExpression(SyntaxKind.LogicalOrExpression, left, op, right);
            }
            return left;
        }
        private ParseLogicalAnd(): ExpressionSyntax {
            var left = this.ParseEquality();
            while (this.CurrentToken.Kind == SyntaxKind.AmpersandAmpersandToken) {
                var op = this.EatToken_2098();
                var right = this.ParseEquality();
                left = SyntaxFactory.BinaryExpression(SyntaxKind.LogicalAndExpression, left, op, right);
            }
            return left;
        }
        private ParseEquality(): ExpressionSyntax {
            var left = this.ParseLogicalNot();
            while (this.CurrentToken.Kind == SyntaxKind.EqualsEqualsToken || this.CurrentToken.Kind == SyntaxKind.ExclamationEqualsToken) {
                var op = this.EatToken_2098();
                var right = this.ParseEquality();
                left = SyntaxFactory.BinaryExpression(SyntaxFacts.GetBinaryExpression(op.Kind), left, op, right);
            }
            return left;
        }
        private ParseLogicalNot(): ExpressionSyntax {
            if (this.CurrentToken.Kind == SyntaxKind.ExclamationToken) {
                var op = this.EatToken_2098();
                return SyntaxFactory.PrefixUnaryExpression(SyntaxKind.LogicalNotExpression, op, this.ParseLogicalNot());
            }
            return this.ParsePrimary();
        }
        private ParsePrimary(): ExpressionSyntax {
            var k = this.CurrentToken.Kind;
            switch (k) {
                case SyntaxKind.OpenParenToken:
                    var open = this.EatToken_2098();
                    var expr = this.ParseExpression();
                    var close = this.EatToken_1865(SyntaxKind.CloseParenToken);
                    return SyntaxFactory.ParenthesizedExpression(open, expr, close);
                case SyntaxKind.IdentifierToken:
                    var identifier = DirectiveParser.TruncateIdentifier(this.EatToken_2098());
                    return SyntaxFactory.IdentifierName(identifier);
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return SyntaxFactory.LiteralExpression(SyntaxFacts.GetLiteralExpression(k), this.EatToken_2098());
                default:
                    return SyntaxFactory.IdentifierName(this.EatToken_4938(SyntaxKind.IdentifierToken, ErrorCode.ERR_InvalidPreprocExpr));
            }
        }
        private static TruncateIdentifier(identifier: SyntaxToken): SyntaxToken {
            if (identifier.Width > DirectiveParser.MAX_DIRECTIVE_IDENTIFIER_WIDTH) {
                var leading = identifier.GetLeadingTrivia();
                var trailing = identifier.GetTrailingTrivia();
                var text: string = identifier.ToString();
                var identifierPart: string = text.substr(0, DirectiveParser.MAX_DIRECTIVE_IDENTIFIER_WIDTH);
                identifier = SyntaxFactory.Identifier_1121(SyntaxKind.IdentifierToken, leading, text, identifierPart, trailing);
            }
            return identifier;
        }
        private EvaluateBool(expr: ExpressionSyntax): boolean {
            var result = this.Evaluate(expr);
            if (typeof result === "boolean") {
                return <boolean>result;
            }
            return false;
        }
        private Evaluate(expr: ExpressionSyntax): Object {
            switch (expr.Kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return this.Evaluate((<ParenthesizedExpressionSyntax>expr).Expression);
                case SyntaxKind.TrueLiteralExpression:
                case SyntaxKind.FalseLiteralExpression:
                    return (<LiteralExpressionSyntax>expr).Token.Value;
                case SyntaxKind.LogicalAndExpression:
                case SyntaxKind.BitwiseAndExpression:
                    return this.EvaluateBool((<BinaryExpressionSyntax>expr).Left) && this.EvaluateBool((<BinaryExpressionSyntax>expr).Right);
                case SyntaxKind.LogicalOrExpression:
                case SyntaxKind.BitwiseOrExpression:
                    return this.EvaluateBool((<BinaryExpressionSyntax>expr).Left) || this.EvaluateBool((<BinaryExpressionSyntax>expr).Right);
                case SyntaxKind.EqualsExpression:
                    return this.Evaluate((<BinaryExpressionSyntax>expr).Left) == this.Evaluate((<BinaryExpressionSyntax>expr).Right);
                case SyntaxKind.NotEqualsExpression:
                    return this.Evaluate((<BinaryExpressionSyntax>expr).Left)!= this.Evaluate((<BinaryExpressionSyntax>expr).Right);
                case SyntaxKind.LogicalNotExpression:
                    return !this.EvaluateBool((<PrefixUnaryExpressionSyntax>expr).Operand);
                case SyntaxKind.IdentifierName:
                    var id: string = (<IdentifierNameSyntax>expr).Identifier.ValueText;
                    var constantValue: boolean = false;
                    var constantValue_ref0 = { refObj: constantValue };
                    var ret_val__943 = System.Boolean.TryParse(id, constantValue_ref0);

                    constantValue = constantValue_ref0.refObj;
                    if (ret_val__943) {
                        return constantValue;
                    }
                    return this.IsDefined(id);
            }
            return false;
        }
        private IsDefined(id: string): boolean {
            var defState = this.context.IsDefined(id);
            switch (defState) {
                default:
                case DefineState.Unspecified:
                    return this.Options.PreprocessorSymbols.Contains(id);
                case DefineState.Defined:
                    return true;
                case DefineState.Undefined:
                    return false;
            }
        }
        constructor() { super(); }
    }
}
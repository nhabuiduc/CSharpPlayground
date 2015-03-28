module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxFormatter extends CSharpSyntaxRewriter {
        private indentWhitespace: string;
        private useElasticTrivia: boolean = false;
        private isInStructuredTrivia: boolean = false;
        private previousToken: SyntaxToken = structDefault(SyntaxToken);
        private indentNext: boolean = false;
        private afterLineBreak: boolean = false;
        private afterIndentation: boolean = false;
        private indentations: ArrayBuilder<SyntaxTrivia>;
        ctor_1134(indentWhitespace: string, useElasticTrivia: boolean): SyntaxFormatter {
            super.ctor_2068(/*visitIntoStructuredTrivia:*/true);
            this.indentWhitespace = indentWhitespace;
            this.useElasticTrivia = useElasticTrivia;
            this.afterLineBreak = true;
            return this;
        }
        public static Format_9806<TNode extends SyntaxNode>(node: TNode, indentWhitespace: string, useElasticTrivia: boolean = false): TNode {
            var formatter = new SyntaxFormatter().ctor_1134(indentWhitespace, useElasticTrivia);
            var result = <TNode>formatter.Visit(node);
            formatter.Free();
            return result;
        }
        public static Format_1909(token: SyntaxToken, indentWhitespace: string, useElasticTrivia: boolean = false): SyntaxToken {
            var formatter = new SyntaxFormatter().ctor_1134(indentWhitespace, useElasticTrivia);
            var result = formatter.VisitToken(token);
            formatter.Free();
            return result;
        }
        public static Format_1809(trivia: SyntaxTriviaList, indentWhitespace: string, useElasticTrivia: boolean = false): SyntaxTriviaList {
            var formatter = new SyntaxFormatter().ctor_1134(indentWhitespace, useElasticTrivia);
            var result = formatter.RewriteTrivia(trivia, SyntaxFormatter.GetDeclarationDepth_1080(<SyntaxToken>trivia.ElementAt(0).Token),/*isTrailing:*/false,/*mustBeIndented:*/false,/*mustHaveSeparator:*/false,/*lineBreaksAfter:*/0);
            formatter.Free();
            return result;
        }
        private Free(): void {
            if (this.indentations != null) {
                this.indentations.Free();
            }
        }
        public VisitToken(token: SyntaxToken): SyntaxToken {
            if (CSharpExtensions.CSharpKind_1238(token) == SyntaxKind.None || (token.IsMissing && token.FullWidth == 0)) {
                return token;
            }
            try
            {
                var tk = token;
                var depth = SyntaxFormatter.GetDeclarationDepth_1080(token);
                var needsIndentation = this.indentNext || (this.LineBreaksAfter_5286(this.previousToken, token) > 0);
                var lineBreaksAfter = SyntaxFormatter.LineBreaksAfter_3124(token);
                this.indentNext = false;
                tk = tk.WithLeadingTrivia_1905(this.RewriteTrivia(token.LeadingTrivia, depth,/*isTrailing:*/false,/*mustBeIndented:*/needsIndentation,/*mustHaveSeparator:*/false,/*lineBreaksAfter:*/lineBreaksAfter));
                var nextToken = token.GetNextToken_2254(t => SyntaxToken.NonZeroWidth(t) || CSharpExtensions.CSharpKind_1238(t) == SyntaxKind.EndOfDirectiveToken, t => CSharpExtensions.CSharpKind_4438(t) == SyntaxKind.SkippedTokensTrivia);
                this.afterLineBreak = SyntaxFormatter.EndsInLineBreak_3346(token);
                this.afterIndentation = false;
                lineBreaksAfter = this.LineBreaksAfter_5286(token, nextToken);
                var needsSeparatorAfter = this.NeedsSeparator(token, nextToken);
                tk = tk.WithTrailingTrivia_6264(this.RewriteTrivia(token.TrailingTrivia, depth,/*isTrailing:*/true,/*mustBeIndented:*/false,/*mustHaveSeparator:*/needsSeparatorAfter,/*lineBreaksAfter:*/lineBreaksAfter));
                if (lineBreaksAfter > 0) {
                    this.indentNext = true;
                }
                return tk;
            }

            finally {
                this.previousToken = token;
            }
        }
        private GetIndentation(count: number): SyntaxTrivia {
            var capacity: number = count + 1;
            if (this.indentations == null) {
                this.indentations = ArrayBuilder.GetInstance_9802<SyntaxTrivia>(capacity);
            }
            else {
                this.indentations.EnsureCapacity(capacity);
            }
            for (var i: number = this.indentations.Count; i <= count; i++) {
                var text: string = i == 0 ? "" : this.indentations.$get$(i - 1).ToString() + this.indentWhitespace;
                this.indentations.Add(SyntaxFactory.Whitespace(text, this.useElasticTrivia));
            }
            return this.indentations.$get$(count);
        }
        private static LineBreaksAfter_3124(token: SyntaxToken): number {
            return CSharpExtensions.CSharpKind_1238(token) == SyntaxKind.EndOfDirectiveToken ? 1 : 0;
        }
        private LineBreaksAfter_5286(currentToken: SyntaxToken, nextToken: SyntaxToken): number {
            if (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.None) {
                return 0;
            }
            if (this.isInStructuredTrivia) {
                return 0;
            }
            switch (CSharpExtensions.CSharpKind_1238(currentToken)) {
                case SyntaxKind.None:
                    return 0;
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.FinallyKeyword:
                    return 1;
                case SyntaxKind.CloseBraceToken:
                    return SyntaxFormatter.LineBreaksAfterCloseBrace(nextToken);
                case SyntaxKind.CloseParenToken:
                    return (((currentToken.Parent instanceof StatementSyntax) && nextToken.Parent != currentToken.Parent) || CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.OpenBraceToken) ? 1 : 0;
                case SyntaxKind.CloseBracketToken:
                    if (currentToken.Parent instanceof AttributeListSyntax) {
                        return 1;
                    }
                    break;
                case SyntaxKind.SemicolonToken:
                    return SyntaxFormatter.LineBreaksAfterSemicolon(currentToken, nextToken);
                case SyntaxKind.CommaToken:
                    return currentToken.Parent instanceof EnumDeclarationSyntax ? 1 : 0;
                case SyntaxKind.ElseKeyword:
                    return CSharpExtensions.CSharpKind_1238(nextToken) != SyntaxKind.IfKeyword ? 1 : 0;
                case SyntaxKind.ColonToken:
                    if (currentToken.Parent instanceof LabeledStatementSyntax || currentToken.Parent instanceof SwitchLabelSyntax) {
                        return 1;
                    }
                    break;
            }
            if ((CSharpExtensions.IsKind_2120(nextToken,
                SyntaxKind.FromKeyword) && CSharpExtensions.IsKind_1139(nextToken.Parent,
                    SyntaxKind.FromClause)) || (CSharpExtensions.IsKind_2120(nextToken,
                    SyntaxKind.LetKeyword) && CSharpExtensions.IsKind_1139(nextToken.Parent,
                        SyntaxKind.LetClause)) || (CSharpExtensions.IsKind_2120(nextToken,
                    SyntaxKind.WhereKeyword) && CSharpExtensions.IsKind_1139(nextToken.Parent,
                        SyntaxKind.WhereClause)) || (CSharpExtensions.IsKind_2120(nextToken,
                    SyntaxKind.JoinKeyword) && CSharpExtensions.IsKind_1139(nextToken.Parent,
                        SyntaxKind.JoinClause)) || (CSharpExtensions.IsKind_2120(nextToken,
                    SyntaxKind.JoinKeyword) && CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.JoinIntoClause) || (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.OrderByKeyword && CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.OrderByClause) || (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.SelectKeyword && CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.SelectClause) || (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.GroupKeyword && CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.GroupClause)) {
                return 1;
            }
            switch (CSharpExtensions.CSharpKind_1238(nextToken)) {
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.ElseKeyword:
                case SyntaxKind.FinallyKeyword:
                    return 1;
                case SyntaxKind.OpenBracketToken:
                    return nextToken.Parent instanceof AttributeListSyntax ? 1 : 0;
                case SyntaxKind.WhereKeyword:
                    return currentToken.Parent instanceof TypeParameterListSyntax ? 1 : 0;
            }
            return 0;
        }
        private static LineBreaksAfterCloseBrace(nextToken: SyntaxToken): number {
            if (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.CloseBraceToken) {
                return 1;
            }
            else if (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.CatchKeyword || CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.FinallyKeyword || CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.ElseKeyword) {
                return 1;
            }
            else if (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.WhileKeyword && CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.DoStatement) {
                return 1;
            }
            else {
                return 2;
            }
        }
        private static LineBreaksAfterSemicolon(currentToken: SyntaxToken, nextToken: SyntaxToken): number {
            if (CSharpExtensions.CSharpKind_1207(currentToken.Parent) == SyntaxKind.ForStatement) {
                return 0;
            }
            else if (CSharpExtensions.CSharpKind_1238(nextToken) == SyntaxKind.CloseBraceToken) {
                return 1;
            }
            else if (CSharpExtensions.CSharpKind_1207(currentToken.Parent) == SyntaxKind.UsingDirective) {
                return CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.UsingDirective ? 1 : 2;
            }
            else if (CSharpExtensions.CSharpKind_1207(currentToken.Parent) == SyntaxKind.ExternAliasDirective) {
                return CSharpExtensions.CSharpKind_1207(nextToken.Parent) == SyntaxKind.ExternAliasDirective ? 1 : 2;
            }
            else {
                return 1;
            }
        }
        private NeedsSeparator(token: SyntaxToken, next: SyntaxToken): boolean {
            if (token.Parent == null || next.Parent == null) {
                return false;
            }
            if (SyntaxFormatter.IsXmlTextToken(CSharpExtensions.CSharpKind_1238(token)) || SyntaxFormatter.IsXmlTextToken(CSharpExtensions.CSharpKind_1238(token))) {
                return false;
            }
            if (CSharpExtensions.CSharpKind_1238(next) == SyntaxKind.EndOfDirectiveToken) {
                return SyntaxFormatter.IsKeyword(CSharpExtensions.CSharpKind_1238(token)) && next.LeadingWidth > 0;
            }
            if ((token.Parent instanceof AssignmentExpressionSyntax && SyntaxFormatter.AssignmentTokenNeedsSeparator(CSharpExtensions.CSharpKind_1238(token))) || (next.Parent instanceof AssignmentExpressionSyntax && SyntaxFormatter.AssignmentTokenNeedsSeparator(CSharpExtensions.CSharpKind_1238(next))) || (token.Parent instanceof BinaryExpressionSyntax && SyntaxFormatter.BinaryTokenNeedsSeparator(CSharpExtensions.CSharpKind_1238(token))) || (next.Parent instanceof BinaryExpressionSyntax && SyntaxFormatter.BinaryTokenNeedsSeparator(CSharpExtensions.CSharpKind_1238(next)))) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.GreaterThanToken) && CSharpExtensions.IsKind_1139(token.Parent,
                    SyntaxKind.TypeArgumentList)) {
                if (!SyntaxFacts.IsPunctuation(CSharpExtensions.CSharpKind_1238(next))) {
                    return true;
                }
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.CommaToken) && !CSharpExtensions.IsKind_2120(next,
                    SyntaxKind.CommaToken) && !CSharpExtensions.IsKind_1139(token.Parent,
                    SyntaxKind.EnumDeclaration)) {
                return true;
            }
            if (CSharpExtensions.CSharpKind_1238(token) == SyntaxKind.SemicolonToken && !(CSharpExtensions.CSharpKind_1238(next) == SyntaxKind.SemicolonToken || CSharpExtensions.CSharpKind_1238(next) == SyntaxKind.CloseParenToken)) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.QuestionToken) && (CSharpExtensions.IsKind_1139(token.Parent,
                    SyntaxKind.ConditionalExpression) || token.Parent instanceof TypeSyntax)) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.ColonToken)) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(next,
                SyntaxKind.ColonToken)) {
                if (CSharpExtensions.IsKind_1139(next.Parent,
                    SyntaxKind.BaseList) || CSharpExtensions.IsKind_1139(next.Parent,
                        SyntaxKind.TypeParameterConstraintClause)) {
                    return true;
                }
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.CloseBracketToken) && SyntaxFormatter.IsWord(CSharpExtensions.CSharpKind_1238(next))) {
                return true;
            }
            if ((CSharpExtensions.IsKind_2120(next,
                SyntaxKind.QuestionToken) || CSharpExtensions.IsKind_2120(next,
                    SyntaxKind.ColonToken)) && (CSharpExtensions.IsKind_1139(next.Parent,
                    SyntaxKind.ConditionalExpression))) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.EqualsToken) || CSharpExtensions.IsKind_2120(next,
                    SyntaxKind.EqualsToken)) {
                return true;
            }
            if (CSharpExtensions.IsKind_2120(token,
                SyntaxKind.EqualsGreaterThanToken) || CSharpExtensions.IsKind_2120(next,
                    SyntaxKind.EqualsGreaterThanToken)) {
                return true;
            }
            if (SyntaxFacts.IsLiteral(CSharpExtensions.CSharpKind_1238(token)) && SyntaxFacts.IsLiteral(CSharpExtensions.CSharpKind_1238(next))) {
                return true;
            }
            if (SyntaxFormatter.IsKeyword(CSharpExtensions.CSharpKind_1238(token))) {
                if (!CSharpExtensions.IsKind_2120(next,
                    SyntaxKind.ColonToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.DotToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.SemicolonToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.OpenBracketToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.CloseParenToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.CloseBraceToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.ColonColonToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.GreaterThanToken) && !CSharpExtensions.IsKind_2120(next,
                        SyntaxKind.CommaToken)) {
                    return true;
                }
            }
            if (SyntaxFormatter.IsWord(CSharpExtensions.CSharpKind_1238(token)) && SyntaxFormatter.IsWord(CSharpExtensions.CSharpKind_1238(next))) {
                return true;
            }
            else if (token.Width > 1 && next.Width > 1) {
                var tokenLastChar = StringExtensions.Last(token.Text);
                var nextFirstChar = StringExtensions.First(next.Text);
                if (tokenLastChar == nextFirstChar && SyntaxFormatter.TokenCharacterCanBeDoubled(tokenLastChar)) {
                    return true;
                }
            }
            return false;
        }
        private static IsXmlTextToken(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.XmlTextLiteralNewLineToken:
                case SyntaxKind.XmlTextLiteralToken:
                    return true;
                default:
                    return false;
            }
        }
        private static BinaryTokenNeedsSeparator(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.DotToken:
                case SyntaxKind.MinusGreaterThanToken:
                    return false;
                default:
                    return SyntaxFacts.GetBinaryExpression(kind) != SyntaxKind.None;
            }
        }
        private static AssignmentTokenNeedsSeparator(kind: SyntaxKind): boolean {
            return SyntaxFacts.GetAssignmentExpression(kind) != SyntaxKind.None;
        }
        private RewriteTrivia(triviaList: SyntaxTriviaList, depth: number, isTrailing: boolean, mustBeIndented: boolean, mustHaveSeparator: boolean, lineBreaksAfter: number): SyntaxTriviaList {
            var currentTriviaList: ArrayBuilder<SyntaxTrivia> = ArrayBuilder.GetInstance_9802<SyntaxTrivia>(triviaList.Count);
            try
            {
                // for each
                var triviaEnumerator = triviaList.GetEnumerator();
                try {
                    while (triviaEnumerator.MoveNext()) {
                        var trivia = triviaEnumerator.Current;
                        // foreach block
                        if (CSharpExtensions.IsKind_9874(trivia,
                            SyntaxKind.WhitespaceTrivia) || CSharpExtensions.IsKind_9874(trivia,
                                SyntaxKind.EndOfLineTrivia) || trivia.FullWidth == 0) {
                            continue;
                        }
                        var needsSeparator = (currentTriviaList.Count > 0 && SyntaxFormatter.NeedsSeparatorBetween(currentTriviaList.Last())) || (currentTriviaList.Count == 0 && isTrailing);
                        var needsLineBreak = SyntaxFormatter.NeedsLineBreakBefore(trivia) || (currentTriviaList.Count > 0 && SyntaxFormatter.NeedsLineBreakBetween(currentTriviaList.Last(), trivia, isTrailing));
                        if (needsLineBreak && !this.afterLineBreak) {
                            currentTriviaList.Add(this.GetCarriageReturnLineFeed());
                            this.afterLineBreak = true;
                            this.afterIndentation = false;
                        }
                        if (this.afterLineBreak) {
                            if (!this.afterIndentation && SyntaxFormatter.NeedsIndentAfterLineBreak(trivia)) {
                                currentTriviaList.Add(this.GetIndentation(SyntaxFormatter.GetDeclarationDepth_1524(trivia)));
                                this.afterIndentation = true;
                            }
                        }
                        else if (needsSeparator) {
                            currentTriviaList.Add(this.GetSpace());
                            this.afterLineBreak = false;
                            this.afterIndentation = false;
                        }
                        if (trivia.HasStructure) {
                            var tr = this.VisitStructuredTrivia(trivia);
                            currentTriviaList.Add(tr);
                        }
                        else if (CSharpExtensions.IsKind_9874(trivia,
                            SyntaxKind.DocumentationCommentExteriorTrivia)) {
                            currentTriviaList.Add(SyntaxFormatter.trimmedDocCommentExtertior);
                        }
                        else {
                            currentTriviaList.Add(trivia);
                        }
                        if (SyntaxFormatter.NeedsLineBreakAfter(trivia, isTrailing)) {
                            currentTriviaList.Add(this.GetCarriageReturnLineFeed());
                            this.afterLineBreak = true;
                            this.afterIndentation = false;
                        }
                    }
                } finally {
                    if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                }    
                // end foreach
                if (lineBreaksAfter > 0) {
                    if (currentTriviaList.Count > 0 && SyntaxFormatter.EndsInLineBreak_1133(currentTriviaList.Last())) {
                        lineBreaksAfter--;
                    }
                    for (var i: number = 0; i < lineBreaksAfter; i++) {
                        currentTriviaList.Add(this.GetCarriageReturnLineFeed());
                        this.afterLineBreak = true;
                        this.afterIndentation = false;
                    }
                }
                else if (mustBeIndented) {
                    currentTriviaList.Add(this.GetIndentation(depth));
                    this.afterIndentation = true;
                }
                else if (mustHaveSeparator) {
                    currentTriviaList.Add(this.GetSpace());
                    this.afterLineBreak = false;
                    this.afterIndentation = false;
                }
                if (currentTriviaList.Count == 0) {
                    return structDefault(SyntaxTriviaList);
                }
                else if (currentTriviaList.Count == 1) {
                    return SyntaxFactory.TriviaList_7214(currentTriviaList.First());
                }
                else {
                    return SyntaxFactory.TriviaList_9316(currentTriviaList);
                }
            }

            finally {
                currentTriviaList.Free();
            }
        }
        private static trimmedDocCommentExtertior: SyntaxTrivia = SyntaxFactory.DocumentationCommentExterior("///");
        private GetSpace(): SyntaxTrivia {
            return this.useElasticTrivia ? SyntaxFactory.ElasticSpace : SyntaxFactory.Space;
        }
        private GetCarriageReturnLineFeed(): SyntaxTrivia {
            return this.useElasticTrivia ? SyntaxFactory.ElasticCarriageReturnLineFeed : SyntaxFactory.CarriageReturnLineFeed;
        }
        private VisitStructuredTrivia(trivia: SyntaxTrivia): SyntaxTrivia {
            var oldIsInStructuredTrivia: boolean = this.isInStructuredTrivia;
            this.isInStructuredTrivia = true;
            var oldPreviousToken: SyntaxToken = this.previousToken;
            this.previousToken = structDefault(SyntaxToken);
            var result: SyntaxTrivia = this.VisitTrivia(trivia);
            this.isInStructuredTrivia = oldIsInStructuredTrivia;
            this.previousToken = oldPreviousToken;
            return result;
        }
        private static NeedsSeparatorBetween(trivia: SyntaxTrivia): boolean {
            switch (CSharpExtensions.CSharpKind_4438(trivia)) {
                case SyntaxKind.None:
                case SyntaxKind.WhitespaceTrivia:
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                    return false;
                default:
                    return !SyntaxFacts.IsPreprocessorDirective(CSharpExtensions.CSharpKind_4438(trivia));
            }
        }
        private static NeedsLineBreakBetween(trivia: SyntaxTrivia, next: SyntaxTrivia, isTrailingTrivia: boolean): boolean {
            if (SyntaxFormatter.EndsInLineBreak_1133(trivia)) {
                return false;
            }
            switch (CSharpExtensions.CSharpKind_4438(next)) {
                case SyntaxKind.SingleLineCommentTrivia:
                case SyntaxKind.MultiLineCommentTrivia:
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                    return !isTrailingTrivia;
                default:
                    return false;
            }
        }
        private static NeedsLineBreakBefore(trivia: SyntaxTrivia): boolean {
            switch (CSharpExtensions.CSharpKind_4438(trivia)) {
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                    return true;
                default:
                    return false;
            }
        }
        private static NeedsLineBreakAfter(trivia: SyntaxTrivia, isTrailingTrivia: boolean): boolean {
            switch (CSharpExtensions.CSharpKind_4438(trivia)) {
                case SyntaxKind.SingleLineCommentTrivia:
                    return true;
                case SyntaxKind.MultiLineCommentTrivia:
                    return !isTrailingTrivia;
                default:
                    return false;
            }
        }
        private static NeedsIndentAfterLineBreak(trivia: SyntaxTrivia): boolean {
            switch (CSharpExtensions.CSharpKind_4438(trivia)) {
                case SyntaxKind.SingleLineCommentTrivia:
                case SyntaxKind.MultiLineCommentTrivia:
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                case SyntaxKind.SingleLineDocumentationCommentTrivia:
                case SyntaxKind.MultiLineDocumentationCommentTrivia:
                    return true;
                default:
                    return false;
            }
        }
        private static EndsInLineBreak_3346(token: SyntaxToken): boolean {
            return CSharpExtensions.CSharpKind_1238(token) == SyntaxKind.XmlTextLiteralNewLineToken;
        }
        private static EndsInLineBreak_1133(trivia: SyntaxTrivia): boolean {
            if (CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.EndOfLineTrivia) {
                return true;
            }
            if (CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.PreprocessingMessageTrivia || CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.DisabledTextTrivia) {
                var text = trivia.ToFullString();
                return text.length > 0 && SyntaxFacts.IsNewLine(StringExtensions.Last(text));
            }
            return false;
        }
        private static IsWord(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.IdentifierToken || SyntaxFormatter.IsKeyword(kind);
        }
        private static IsKeyword(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsKeywordKind(kind) || SyntaxFacts.IsPreprocessorKeyword(kind);
        }
        private static TokenCharacterCanBeDoubled(c: string): boolean {
            switch (c) {
                case '+':
                case '-':
                case '<':
                case ':':
                case '?':
                case '=':
                case '"':
                    return true;
                default:
                    return false;
            }
        }
        private static GetDeclarationDepth_1080(token: SyntaxToken): number {
            return SyntaxFormatter.GetDeclarationDepth_1129(token.Parent);
        }
        private static GetDeclarationDepth_1524(trivia: SyntaxTrivia): number {
            if (SyntaxFacts.IsPreprocessorDirective(CSharpExtensions.CSharpKind_4438(trivia))) {
                return 0;
            }
            return SyntaxFormatter.GetDeclarationDepth_1080(<SyntaxToken>trivia.Token);
        }
        private static GetDeclarationDepth_1129(node: SyntaxNode): number {
            if (node != null) {
                if (node.IsStructuredTrivia) {
                    var tr = (<StructuredTriviaSyntax>node).ParentTrivia;
                    return SyntaxFormatter.GetDeclarationDepth_1524(tr);
                }
                else if (node.Parent != null) {
                    if (CSharpExtensions.IsKind_1139(node.Parent,
                        SyntaxKind.CompilationUnit)) {
                        return 0;
                    }
                    var parentDepth: number = SyntaxFormatter.GetDeclarationDepth_1129(node.Parent);
                    if (CSharpExtensions.IsKind_1139(node.Parent,
                        SyntaxKind.GlobalStatement)) {
                        return parentDepth;
                    }
                    if (CSharpExtensions.IsKind_1139(node,
                        SyntaxKind.IfStatement) && CSharpExtensions.IsKind_1139(node.Parent,
                            SyntaxKind.ElseClause)) {
                        return parentDepth;
                    }
                    if (node.Parent instanceof BlockSyntax || (node instanceof StatementSyntax && !(node instanceof BlockSyntax))) {
                        return parentDepth + 1;
                    }
                    if (node instanceof MemberDeclarationSyntax || node instanceof AccessorDeclarationSyntax || node instanceof TypeParameterConstraintClauseSyntax || node instanceof SwitchSectionSyntax || node instanceof UsingDirectiveSyntax || node instanceof ExternAliasDirectiveSyntax || node instanceof QueryExpressionSyntax || node instanceof QueryContinuationSyntax) {
                        return parentDepth + 1;
                    }
                    return parentDepth;
                }
            }
            return 0;
        }
        constructor() { super(); }
    }
}
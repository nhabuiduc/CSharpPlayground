module Microsoft.CodeAnalysis {
    export class CSharpExtensions {
     
    }
}
module Microsoft.CodeAnalysis.CSharp {
    export class CSharpExtensions {
        public static IsKind_2120(token: SyntaxToken, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.CSharpKind_1238(token) == kind;
        }
        public static IsContextualKind(token: SyntaxToken, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.CSharpContextualKind(token) == kind;
        }
        public static IsKind_9874(trivia: SyntaxTrivia, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.CSharpKind_4438(trivia) == kind;
        }
        public static IsKind_1139(node: SyntaxNode, kind: CSharp.SyntaxKind): boolean {
            return node != null && CSharpExtensions.CSharpKind_1207(node) == kind;
        }
        public static IsKind_7914(nodeOrToken: SyntaxNodeOrToken, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.CSharpKind_1403(nodeOrToken) == kind;
        }
        public static CSharpKind_1238(token: SyntaxToken): CSharp.SyntaxKind {
            return <Object>token.Language == <Object>LanguageNames.CSharp ? <CSharp.SyntaxKind>token.RawKind : CSharp.SyntaxKind.None;
        }
        public static CSharpContextualKind(token: SyntaxToken): CSharp.SyntaxKind {
            return <Object>token.Language == <Object>LanguageNames.CSharp ? <CSharp.SyntaxKind>token.RawContextualKind : CSharp.SyntaxKind.None;
        }
        public static CSharpKind_4438(trivia: SyntaxTrivia): CSharp.SyntaxKind {
            return <Object>trivia.Language == <Object>LanguageNames.CSharp ? <CSharp.SyntaxKind>trivia.RawKind : CSharp.SyntaxKind.None;
        }
        public static CSharpKind_1207(node: SyntaxNode): CSharp.SyntaxKind {
            return <Object>node.Language == <Object>LanguageNames.CSharp ? <CSharp.SyntaxKind>node.RawKind : CSharp.SyntaxKind.None;
        }
        public static CSharpKind_1403(nodeOrToken: SyntaxNodeOrToken): CSharp.SyntaxKind {
            return <Object>nodeOrToken.Language == <Object>LanguageNames.CSharp ? <CSharp.SyntaxKind>nodeOrToken.RawKind : CSharp.SyntaxKind.None;
        }
        public static IndexOf_6246<TNode extends SyntaxNode>(list: SyntaxList<TNode>, kind: CSharp.SyntaxKind): number {
            return list.IndexOf_9119(<number>kind);
        }
        public static Any_9151<TNode extends SyntaxNode>(list: SyntaxList<TNode>, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.IndexOf_6246(list,
                kind) >= 0;
        }
        public static IndexOf_8583<TNode extends SyntaxNode>(list: SeparatedSyntaxList<TNode>, kind: CSharp.SyntaxKind): number {
            return list.IndexOf_9119(<number>kind);
        }
        public static Any_8065<TNode extends SyntaxNode>(list: SeparatedSyntaxList<TNode>, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.IndexOf_8583(list,
                kind) >= 0;
        }
        public static IndexOf_5113(list: SyntaxTriviaList, kind: CSharp.SyntaxKind): number {
            return list.IndexOf_9119(<number>kind);
        }
        public static Any_1488(list: SyntaxTriviaList, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.IndexOf_5113(list,
                kind) >= 0;
        }
        public static IndexOf_2988(list: SyntaxTokenList, kind: CSharp.SyntaxKind): number {
            return list.IndexOf_9119(<number>kind);
        }
        public static Any_2090(list: SyntaxTokenList, kind: CSharp.SyntaxKind): boolean {
            return CSharpExtensions.IndexOf_2988(list,
                kind) >= 0;
        }
        public static FirstOrDefault(list: SyntaxTokenList, kind: CSharp.SyntaxKind): SyntaxToken {
            var index: number = CSharpExtensions.IndexOf_2988(list,
                kind);
            return (index >= 0) ? list.$get$(index) : structDefault(SyntaxToken);
        }

        public static IsKeyword(token: SyntaxToken): boolean {
            return SyntaxFacts.IsKeywordKind(CSharpExtensions.CSharpKind_1238(token));
        }
        public static IsContextualKeyword(token: SyntaxToken): boolean {
            return SyntaxFacts.IsContextualKeyword(CSharpExtensions.CSharpKind_1238(token));
        }
        public static IsReservedKeyword(token: SyntaxToken): boolean {
            return SyntaxFacts.IsReservedKeyword(CSharpExtensions.CSharpKind_1238(token));
        }
        public static IsVerbatimStringLiteral(token: SyntaxToken): boolean {
            return CSharpExtensions.IsKind_2120(token,
                SyntaxKind.StringLiteralToken) && token.Text.length > 0 && token.Text[0] == '@';
        }
        public static IsVerbatimIdentifier(token: SyntaxToken): boolean {
            return CSharpExtensions.IsKind_2120(token,
                SyntaxKind.IdentifierToken) && token.Text.length > 0 && token.Text[0] == '@';
        }
        public static Insert(list: SyntaxTokenList, index: number, ...items: SyntaxToken[]): SyntaxTokenList {
            if (index < 0 || index > list.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            if (items == null) {
                throw new System.ArgumentNullException("items");
            }
            if (list.Count == 0) {
                return SyntaxFactory.TokenList_4662_Arr(items);
            }
            else {
                var builder = new Syntax.SyntaxTokenListBuilder().ctor_9494(list.Count + items.length);
                if (index > 0) {
                    builder.Add_1909(list, 0, index);
                }
                builder.Add_1573(items);
                if (index < list.Count) {
                    builder.Add_1909(list, index, list.Count - index);
                }
                return builder.ToList();
            }
        }
        public static ReplaceTrivia_1543(token: SyntaxToken, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): SyntaxToken {
            return Syntax.SyntaxReplacer.Replace_2079(token, null, null, null, null,/*trivia:*/trivia,/*computeReplacementTrivia:*/computeReplacementTrivia);
        }
        public static ReplaceTrivia_1458(token: SyntaxToken, oldTrivia: SyntaxTrivia, newTrivia: SyntaxTrivia): SyntaxToken {
            return Syntax.SyntaxReplacer.Replace_2079(token, null, null, null, null,/*trivia:*/new Array(oldTrivia),/*computeReplacementTrivia:*/(o, r) => newTrivia);
        }
        public static ApplyDirectives_1810(node: SyntaxNode, stack: Syntax.InternalSyntax.DirectiveStack): Syntax.InternalSyntax.DirectiveStack {
            return (<Syntax.InternalSyntax.CSharpSyntaxNode>node.Green).ApplyDirectives(stack);
        }
        public static ApplyDirectives_1105(token: SyntaxToken, stack: Syntax.InternalSyntax.DirectiveStack): Syntax.InternalSyntax.DirectiveStack {
            return (<Syntax.InternalSyntax.CSharpSyntaxNode>token.Node).ApplyDirectives(stack);
        }
        public static ApplyDirectives_1395(nodeOrToken: SyntaxNodeOrToken, stack: Syntax.InternalSyntax.DirectiveStack): Syntax.InternalSyntax.DirectiveStack {
            if (nodeOrToken.IsToken) {
                return CSharpExtensions.ApplyDirectives_1105(nodeOrToken.AsToken(),
                    stack);
            }
            if (nodeOrToken.IsNode) {
                return CSharpExtensions.ApplyDirectives_1810(nodeOrToken.AsNode(),
                    stack);
            }
            return stack;
        }
        public static AsSeparatedList<TOther extends SyntaxNode>(list: SyntaxNodeOrTokenList): SeparatedSyntaxList<TOther> {
            var builder = Syntax.SeparatedSyntaxListBuilder.Create<TOther>();
            // for each
            var iEnumerator = list.GetEnumerator();
            try {
                while (iEnumerator.MoveNext()) {
                    var i = iEnumerator.Current;
                    // foreach block
                    var node = i.AsNode();
                    if (node != null) {
                        builder.Add(<TOther>node);
                    }
                    else {
                        builder.AddSeparator(i.AsToken());
                    }
                }
            } finally {
                if (iEnumerator !== null) iEnumerator.Dispose();

            }    
            // end foreach
            return builder.ToList_1421();
        }
        public static GetDirectives(node: SyntaxNode, filter: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): System.Collections.Generic.IList<Syntax.DirectiveTriviaSyntax> {
            return (<CSharpSyntaxNode>node).GetDirectives(filter);
        }
        public static GetFirstDirective(node: SyntaxNode, predicate: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): Syntax.DirectiveTriviaSyntax {
            return (<CSharpSyntaxNode>node).GetFirstDirective(predicate);
        }
        public static GetLastDirective(node: SyntaxNode, predicate: (_: Syntax.DirectiveTriviaSyntax) => boolean = null): Syntax.DirectiveTriviaSyntax {
            return (<CSharpSyntaxNode>node).GetLastDirective(predicate);
        }
        public static GetCompilationUnitRoot(tree: SyntaxTree, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): Syntax.CompilationUnitSyntax {
            return <Syntax.CompilationUnitSyntax>tree.GetRoot(cancellationToken);
        }
        public static HasReferenceDirectives(tree: SyntaxTree): boolean {
            var csharpTree = __as__<CSharpSyntaxTree>(tree, CSharpSyntaxTree);
            return csharpTree != null && csharpTree.HasReferenceDirectives;
        }
        public static IsAnyPreprocessorSymbolDefined(tree: SyntaxTree, conditionalSymbols: System.Collections.Immutable.ImmutableArray<string>): boolean {
            var csharpTree = __as__<CSharpSyntaxTree>(tree, CSharpSyntaxTree);
            return csharpTree != null && csharpTree.IsAnyPreprocessorSymbolDefined(conditionalSymbols);
        }
        public static IsPreprocessorSymbolDefined(tree: SyntaxTree, symbolName: string, position: number): boolean {
            var csharpTree = __as__<CSharpSyntaxTree>(tree, CSharpSyntaxTree);
            return csharpTree != null && csharpTree.IsPreprocessorSymbolDefined_1267(symbolName, position);
        }
        public static GetPragmaDirectiveWarningState(tree: SyntaxTree, id: string, position: number): ReportDiagnostic {
            return (<CSharpSyntaxTree>tree).GetPragmaDirectiveWarningState(id, position);
        }
    }
}
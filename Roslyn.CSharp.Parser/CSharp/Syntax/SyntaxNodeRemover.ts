module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxNodeRemover {
        public static RemoveNodes<TRoot extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): TRoot {
            if (nodes == null) {
                return root;
            }
            var nodeArray = System.Linq.Enumerable.ToArray(nodes);
            if (nodeArray.length == 0) {
                return root;
            }
            var remover = new SyntaxNodeRemover.SyntaxRemover().ctor_5474(System.Linq.Enumerable.ToArray(nodes), options);
            var result = remover.Visit(root);
            var residualTrivia = remover.ResidualTrivia;
            if (residualTrivia.Count > 0) {
                result = CodeAnalysis.SyntaxNodeExtensions.WithTrailingTrivia_1964(result,
                    System.Linq.Enumerable.Concat(result.GetTrailingTrivia(),
                        residualTrivia));
            }
            return <TRoot>result;
        }
    }
    export module SyntaxNodeRemover {
        export class SyntaxRemover extends CSharpSyntaxRewriter {
            private nodesToRemove: System.Collections.Generic.HashSet<SyntaxNode>;
            private options: SyntaxRemoveOptions = 0;
            private searchSpan: Text.TextSpan = structDefault(Text.TextSpan);
            private residualTrivia: SyntaxTriviaListBuilder;
            private directivesToKeep: System.Collections.Generic.HashSet<SyntaxNode>;
            ctor_5474(nodesToRemove: SyntaxNode[], options: SyntaxRemoveOptions): SyntaxRemover {
                super.ctor_2068(System.Linq.Enumerable.Any(nodesToRemove,
                    n => n.IsPartOfStructuredTrivia()));
                this.nodesToRemove = new System.Collections.Generic.HashSet<SyntaxNode>(nodesToRemove);
                this.options = options;
                this.searchSpan = SyntaxRemover.ComputeTotalSpan(nodesToRemove);
                this.residualTrivia = SyntaxTriviaListBuilder.Create();
                return this;
            }
            private static ComputeTotalSpan(nodes: SyntaxNode[]): Text.TextSpan {
                var span0 = nodes[0].FullSpan;
                var start: number = span0.Start;
                var end: number = span0.End;
                for (var i: number = 1; i < nodes.length; i++) {
                    var span = nodes[i].FullSpan;
                    start = System.Math.Min(start, span.Start);
                    end = System.Math.Max(end, span.End);
                }
                return new Text.TextSpan().ctor_1506(start, end - start);
            }
            public get ResidualTrivia(): SyntaxTriviaList {
                if (this.residualTrivia != null) {
                    return this.residualTrivia.ToList();
                }
                else {
                    return structDefault(SyntaxTriviaList);
                }
            }
            private AddResidualTrivia(trivia: SyntaxTriviaList, requiresNewLine: boolean = false): void {
                if (requiresNewLine) {
                    this.AddEndOfLine();
                }
                this.residualTrivia.Add_1553(trivia);
            }
            private AddEndOfLine(): void {
                if (this.residualTrivia.Count == 0 || !SyntaxRemover.IsEndOfLine(this.residualTrivia.$get$(this.residualTrivia.Count - 1))) {
                    this.residualTrivia.Add_1150(SyntaxFactory.CarriageReturnLineFeed);
                }
            }
            private static IsEndOfLine(trivia: SyntaxTrivia): boolean {
                return CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.EndOfLineTrivia || CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.SingleLineCommentTrivia || trivia.IsDirective;
            }
            private static HasEndOfLine(list: SyntaxTriviaList): boolean {
                return System.Linq.Enumerable.Any(list,
                    t => SyntaxRemover.IsEndOfLine(t));
            }
            private IsForRemoval(node: SyntaxNode): boolean {
                return this.nodesToRemove.Contains(node);
            }
            private ShouldVisit(node: SyntaxNode): boolean {
                return node.FullSpan.IntersectsWith_1989(this.searchSpan) || (this.residualTrivia != null && this.residualTrivia.Count > 0);
            }
            public Visit(node: SyntaxNode): SyntaxNode {
                var result: SyntaxNode = node;
                if (node != null) {
                    if (this.IsForRemoval(node)) {
                        this.AddTrivia_4505(node);
                        result = null;
                    }
                    else if (this.ShouldVisit(node)) {
                        result = super.Visit(node);
                    }
                }
                return result;
            }
            public VisitToken(token: SyntaxToken): SyntaxToken {
                var result: SyntaxToken = token;
                if (this.VisitIntoStructuredTrivia) {
                    result = super.VisitToken(token);
                }
                if (CSharpExtensions.CSharpKind_1238(result) != SyntaxKind.None && this.residualTrivia != null && this.residualTrivia.Count > 0) {
                    this.residualTrivia.Add_1553(result.LeadingTrivia);
                    result = result.WithLeadingTrivia_1905(this.residualTrivia.ToList());
                    this.residualTrivia.Clear();
                }
                return result;
            }
            public VisitList_2124<TNode extends SyntaxNode>(list: SeparatedSyntaxList<TNode>): SeparatedSyntaxList<TNode> {
                var withSeps = list.GetWithSeparators();
                var removeNextSeparator: boolean = false;
                var alternate: SyntaxNodeOrTokenListBuilder = null;
                for (var i: number = 0, n = withSeps.Count; i < n; i++) {
                    var item = withSeps.$get$(i);
                    var visited: SyntaxNodeOrToken = structDefault(SyntaxNodeOrToken);
                    if (item.IsToken) {
                        if (removeNextSeparator) {
                            removeNextSeparator = false;
                            visited = structDefault(SyntaxNodeOrToken);
                        }
                        else {
                            visited = Microsoft.CodeAnalysis.SyntaxNodeOrToken.op_Implicit_7398(this.VisitListSeparator(item.AsToken()));
                        }
                    }
                    else {
                        var node = <TNode><SyntaxNode>item.AsNode();
                        if (this.IsForRemoval(node)) {
                            if (alternate == null) {
                                alternate = new SyntaxNodeOrTokenListBuilder().ctor_2261(n);
                                alternate.Add_1317(withSeps, 0, i);
                            }
                            if (alternate.Count > 0 && alternate.$get$(alternate.Count - 1).IsToken) {
                                var separator = alternate.$get$(alternate.Count - 1).AsToken();
                                this.AddTrivia_3495(separator, node);
                                alternate.RemoveLast();
                            }
                            else if (i + 1 < n && withSeps.$get$(i + 1).IsToken) {
                                var separator = withSeps.$get$(i + 1).AsToken();
                                this.AddTrivia_2265(node, separator);
                                removeNextSeparator = true;
                            }
                            else {
                                this.AddTrivia_4505(node);
                            }
                            visited = structDefault(SyntaxNodeOrToken);
                        }
                        else {
                            visited = Microsoft.CodeAnalysis.SyntaxNodeOrToken.op_Implicit_1792(this.VisitListElement_1414(<TNode><SyntaxNode>item.AsNode()));
                        }
                    }
                    if (item.op_Inequality(visited) && alternate == null) {
                        alternate = new SyntaxNodeOrTokenListBuilder().ctor_2261(n);
                        alternate.Add_1317(withSeps, 0, i);
                    }
                    if (alternate != null && CSharpExtensions.CSharpKind_1403(visited) != SyntaxKind.None) {
                        alternate.Add_1846(visited);
                    }
                }
                if (alternate != null) {
                    return CSharpExtensions.AsSeparatedList<TNode>(alternate.ToList());
                }
                return list;
            }
            private AddTrivia_4505(node: SyntaxNode): void {
                if ((this.options & SyntaxRemoveOptions.KeepLeadingTrivia) != 0) {
                    this.AddResidualTrivia(node.GetLeadingTrivia());
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && SyntaxRemover.HasEndOfLine(node.GetLeadingTrivia())) {
                    this.AddEndOfLine();
                }
                if ((this.options & (SyntaxRemoveOptions.KeepDirectives | SyntaxRemoveOptions.KeepUnbalancedDirectives)) != 0) {
                    this.AddDirectives(node, this.GetRemovedSpan(node.Span, node.FullSpan));
                }
                if ((this.options & SyntaxRemoveOptions.KeepTrailingTrivia) != 0) {
                    this.AddResidualTrivia(node.GetTrailingTrivia());
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && SyntaxRemover.HasEndOfLine(node.GetTrailingTrivia())) {
                    this.AddEndOfLine();
                }
                if ((this.options & SyntaxRemoveOptions.AddElasticMarker) != 0) {
                    this.AddResidualTrivia(SyntaxFactory.TriviaList_7214(SyntaxFactory.ElasticMarker));
                }
            }
            private AddTrivia_3495(token: SyntaxToken, node: SyntaxNode): void {
                if ((this.options & SyntaxRemoveOptions.KeepLeadingTrivia) != 0) {
                    this.AddResidualTrivia(token.LeadingTrivia);
                    this.AddResidualTrivia(token.TrailingTrivia);
                    this.AddResidualTrivia(node.GetLeadingTrivia());
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && (SyntaxRemover.HasEndOfLine(token.LeadingTrivia) || SyntaxRemover.HasEndOfLine(token.TrailingTrivia) || SyntaxRemover.HasEndOfLine(node.GetLeadingTrivia()))) {
                    this.AddEndOfLine();
                }
                if ((this.options & (SyntaxRemoveOptions.KeepDirectives | SyntaxRemoveOptions.KeepUnbalancedDirectives)) != 0) {
                    var span = Text.TextSpan.FromBounds(token.Span.Start, node.Span.End);
                    var fullSpan = Text.TextSpan.FromBounds(token.FullSpan.Start, node.FullSpan.End);
                    this.AddDirectives(node.Parent, this.GetRemovedSpan(span, fullSpan));
                }
                if ((this.options & SyntaxRemoveOptions.KeepTrailingTrivia) != 0) {
                    this.AddResidualTrivia(node.GetTrailingTrivia());
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && SyntaxRemover.HasEndOfLine(node.GetTrailingTrivia())) {
                    this.AddEndOfLine();
                }
                if ((this.options & SyntaxRemoveOptions.AddElasticMarker) != 0) {
                    this.AddResidualTrivia(SyntaxFactory.TriviaList_7214(SyntaxFactory.ElasticMarker));
                }
            }
            private AddTrivia_2265(node: SyntaxNode, token: SyntaxToken): void {
                if ((this.options & SyntaxRemoveOptions.KeepLeadingTrivia) != 0) {
                    this.AddResidualTrivia(node.GetLeadingTrivia());
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && SyntaxRemover.HasEndOfLine(node.GetLeadingTrivia())) {
                    this.AddEndOfLine();
                }
                if ((this.options & (SyntaxRemoveOptions.KeepDirectives | SyntaxRemoveOptions.KeepUnbalancedDirectives)) != 0) {
                    var span = Text.TextSpan.FromBounds(node.Span.Start, token.Span.End);
                    var fullSpan = Text.TextSpan.FromBounds(node.FullSpan.Start, token.FullSpan.End);
                    this.AddDirectives(node.Parent, this.GetRemovedSpan(span, fullSpan));
                }
                if ((this.options & SyntaxRemoveOptions.KeepTrailingTrivia) != 0) {
                    this.AddResidualTrivia(node.GetTrailingTrivia());
                    this.AddResidualTrivia(token.LeadingTrivia);
                    this.AddResidualTrivia(token.TrailingTrivia);
                }
                else if ((this.options & SyntaxRemoveOptions.KeepEndOfLine) != 0 && (SyntaxRemover.HasEndOfLine(node.GetTrailingTrivia()) || SyntaxRemover.HasEndOfLine(token.LeadingTrivia) || SyntaxRemover.HasEndOfLine(token.TrailingTrivia))) {
                    this.AddEndOfLine();
                }
                if ((this.options & SyntaxRemoveOptions.AddElasticMarker) != 0) {
                    this.AddResidualTrivia(SyntaxFactory.TriviaList_7214(SyntaxFactory.ElasticMarker));
                }
            }
            private GetRemovedSpan(span: Text.TextSpan, fullSpan: Text.TextSpan): Text.TextSpan {
                var removedSpan = fullSpan;
                if ((this.options & SyntaxRemoveOptions.KeepLeadingTrivia) != 0) {
                    removedSpan = Text.TextSpan.FromBounds(span.Start, removedSpan.End);
                }
                if ((this.options & SyntaxRemoveOptions.KeepTrailingTrivia) != 0) {
                    removedSpan = Text.TextSpan.FromBounds(removedSpan.Start, span.End);
                }
                return removedSpan;
            }
            private AddDirectives(node: SyntaxNode, span: Text.TextSpan): void {
                if (node.ContainsDirectives) {
                    if (this.directivesToKeep == null) {
                        this.directivesToKeep = new System.Collections.Generic.HashSet<SyntaxNode>();
                    }
                    else {
                        this.directivesToKeep.Clear();
                    }
                    var directivesInSpan = System.Linq.Enumerable.Select(System.Linq.Enumerable.Where(node.DescendantTrivia_9080(span, n => n.ContainsDirectives,/*descendIntoTrivia:*/true),
                        tr => tr.IsDirective),
                        tr => <DirectiveTriviaSyntax>tr.GetStructure());
                    // for each
                    var directiveEnumerator = directivesInSpan.GetEnumerator();
                    try {
                        while (directiveEnumerator.MoveNext()) {
                            var directive = directiveEnumerator.Current;
                            // foreach block
                            if ((this.options & SyntaxRemoveOptions.KeepDirectives) != 0) {
                                this.directivesToKeep.Add(directive);
                            }
                            else if (directive.Kind == SyntaxKind.DefineDirectiveTrivia || directive.Kind == SyntaxKind.UndefDirectiveTrivia) {
                                this.directivesToKeep.Add(directive);
                            }
                            else if (SyntaxRemover.HasRelatedDirectives(directive)) {
                                var relatedDirectives = directive.GetRelatedDirectives_6891();
                                var balanced = System.Linq.Enumerable.All(relatedDirectives,
                                    rd => rd.FullSpan.OverlapsWith(span));
                                if (!balanced) {
                                    // for each
                                    var unbalancedDirectiveEnumerator = System.Linq.Enumerable.Where(relatedDirectives,
                                        rd => rd.FullSpan.OverlapsWith(span)).GetEnumerator();
                                    try {
                                        while (unbalancedDirectiveEnumerator.MoveNext()) {
                                            var unbalancedDirective = unbalancedDirectiveEnumerator.Current;
                                            // foreach block
                                            this.directivesToKeep.Add(unbalancedDirective);
                                        }
                                    } finally {
                                        if (unbalancedDirectiveEnumerator !== null) unbalancedDirectiveEnumerator.Dispose();

                                    }    
                                    // end foreach
                                }
                            }
                            if (this.directivesToKeep.Contains(directive)) {
                                this.AddResidualTrivia(SyntaxFactory.TriviaList_7214(directive.ParentTrivia),/*requiresNewLine:*/true);
                            }
                        }
                    } finally {
                        if (directiveEnumerator !== null) directiveEnumerator.Dispose();

                    }    
                    // end foreach
                }
            }
            private static HasRelatedDirectives(directive: DirectiveTriviaSyntax): boolean {
                switch (directive.Kind) {
                    case SyntaxKind.IfDirectiveTrivia:
                    case SyntaxKind.ElseDirectiveTrivia:
                    case SyntaxKind.ElifDirectiveTrivia:
                    case SyntaxKind.EndIfDirectiveTrivia:
                    case SyntaxKind.RegionDirectiveTrivia:
                    case SyntaxKind.EndRegionDirectiveTrivia:
                        return true;
                    default:
                        return false;
                }
            }
            constructor() { super(); }
        }
    }
}
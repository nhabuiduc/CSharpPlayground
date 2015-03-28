module Microsoft.CodeAnalysis {
    export class SyntaxNodeExtensions {
        public static ReplaceSyntax<TRoot extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, computeReplacementNode: (_: SyntaxNode, __: SyntaxNode) => SyntaxNode, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): TRoot {
            return <TRoot>root.ReplaceCore(/*nodes:*/nodes,/*computeReplacementNode:*/computeReplacementNode,/*tokens:*/tokens,/*computeReplacementToken:*/computeReplacementToken,/*trivia:*/trivia,/*computeReplacementTrivia:*/computeReplacementTrivia);
        }
        public static ReplaceNodes<TRoot extends SyntaxNode, TNode extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<TNode>, computeReplacementNode: (_: TNode, __: TNode) => SyntaxNode): TRoot {
            return <TRoot>root.ReplaceCore(/*nodes:*/nodes,/*computeReplacementNode:*/computeReplacementNode, null, null, null, null);
        }
        public static ReplaceNode_3137<TRoot extends SyntaxNode>(root: TRoot, oldNode: SyntaxNode, newNode: SyntaxNode): TRoot {
            return <TRoot>root.ReplaceCore(/*nodes:*/new Array(oldNode),/*computeReplacementNode:*/(o, r) => newNode, null, null, null, null);
        }
        public static ReplaceNode_1914<TRoot extends SyntaxNode>(root: TRoot, oldNode: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot {
            return <TRoot>root.ReplaceNodeInListCore(oldNode, newNodes);
        }
        public static InsertNodesBefore<TRoot extends SyntaxNode>(root: TRoot, nodeInList: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot {
            return <TRoot>root.InsertNodesInListCore(nodeInList, newNodes,/*insertBefore:*/true);
        }
        public static InsertNodesAfter<TRoot extends SyntaxNode>(root: TRoot, nodeInList: SyntaxNode, newNodes: System.Collections.Generic.IEnumerable<SyntaxNode>): TRoot {
            return <TRoot>root.InsertNodesInListCore(nodeInList, newNodes,/*insertBefore:*/false);
        }
        public static ReplaceToken_1116<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot {
            return <TRoot>root.ReplaceTokenInListCore(tokenInList, newTokens);
        }
        public static InsertTokensBefore<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot {
            return <TRoot>root.InsertTokensInListCore(tokenInList, newTokens,/*insertBefore:*/true);
        }
        public static InsertTokensAfter<TRoot extends SyntaxNode>(root: TRoot, tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): TRoot {
            return <TRoot>root.InsertTokensInListCore(tokenInList, newTokens,/*insertBefore:*/false);
        }
        public static ReplaceTrivia_2582<TRoot extends SyntaxNode>(root: TRoot, oldTrivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot {
            return <TRoot>root.ReplaceTriviaInListCore(oldTrivia, newTrivia);
        }
        public static InsertTriviaBefore<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot {
            return <TRoot>root.InsertTriviaInListCore(trivia, newTrivia,/*insertBefore:*/true);
        }
        public static InsertTriviaAfter<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TRoot {
            return <TRoot>root.InsertTriviaInListCore(trivia, newTrivia,/*insertBefore:*/false);
        }
        public static ReplaceTokens<TRoot extends SyntaxNode>(root: TRoot, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>, computeReplacementToken: (_: SyntaxToken, __: SyntaxToken) => SyntaxToken): TRoot {
            return <TRoot>root.ReplaceCore<SyntaxNode>(null, null,/*tokens:*/tokens,/*computeReplacementToken:*/computeReplacementToken, null, null);
        }
        public static ReplaceToken_1612<TRoot extends SyntaxNode>(root: TRoot, oldToken: SyntaxToken, newToken: SyntaxToken): TRoot {
            return <TRoot>root.ReplaceCore<SyntaxNode>(null, null,/*tokens:*/new Array(oldToken),/*computeReplacementToken:*/(o, r) => newToken, null, null);
        }
        public static ReplaceTrivia_7706<TRoot extends SyntaxNode>(root: TRoot, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>, computeReplacementTrivia: (_: SyntaxTrivia, __: SyntaxTrivia) => SyntaxTrivia): TRoot {
            return <TRoot>root.ReplaceCore<SyntaxNode>(null, null, null, null,/*trivia:*/trivia,/*computeReplacementTrivia:*/computeReplacementTrivia);
        }
        public static ReplaceTrivia_1991<TRoot extends SyntaxNode>(root: TRoot, trivia: SyntaxTrivia, newTrivia: SyntaxTrivia): TRoot {
            return <TRoot>root.ReplaceCore<SyntaxNode>(null, null, null, null,/*trivia:*/new Array(trivia),/*computeReplacementTrivia:*/(o, r) => newTrivia);
        }
        public static RemoveNode<TRoot extends SyntaxNode>(root: TRoot, node: SyntaxNode, options: SyntaxRemoveOptions): TRoot {
            return <TRoot>root.RemoveNodesCore(new Array(node), options);
        }
        public static RemoveNodes<TRoot extends SyntaxNode>(root: TRoot, nodes: System.Collections.Generic.IEnumerable<SyntaxNode>, options: SyntaxRemoveOptions): TRoot {
            return <TRoot>root.RemoveNodesCore(nodes, options);
        }
        public static DefaultIndentation: string = "    ";
        public static NormalizeWhitespace<TNode extends SyntaxNode>(node: TNode, indentation: string = SyntaxNodeExtensions.DefaultIndentation, elasticTrivia: boolean = false): TNode {
            return <TNode>node.NormalizeWhitespaceCore(indentation, elasticTrivia);
        }
        public static WithLeadingTrivia_9576<TSyntax extends SyntaxNode>(node: TSyntax, trivia: SyntaxTriviaList): TSyntax {
            var first = node.GetFirstToken(/*includeZeroWidth:*/true, false, false, false);
            var newFirst = first.WithLeadingTrivia_1905(trivia);
            return SyntaxNodeExtensions.ReplaceToken_1612(node,
                first, newFirst);
        }
        public static WithLeadingTrivia_1499<TSyntax extends SyntaxNode>(node: TSyntax, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TSyntax {
            var first = node.GetFirstToken(/*includeZeroWidth:*/true, false, false, false);
            var newFirst = first.WithLeadingTrivia_1496(trivia);
            return SyntaxNodeExtensions.ReplaceToken_1612(node,
                first, newFirst);
        }
        public static WithoutLeadingTrivia<TSyntax extends SyntaxNode>(node: TSyntax): TSyntax {
            return SyntaxNodeExtensions.WithLeadingTrivia_1499(node,
                <System.Collections.Generic.IEnumerable<SyntaxTrivia>>null);
        }
        public static WithLeadingTrivia_2040<TSyntax extends SyntaxNode>(node: TSyntax, ...trivia: SyntaxTrivia[]): TSyntax {
            return SyntaxNodeExtensions.WithLeadingTrivia_1499(node,
                <System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
        public static WithTrailingTrivia_5344<TSyntax extends SyntaxNode>(node: TSyntax, trivia: SyntaxTriviaList): TSyntax {
            var last = node.GetLastToken(/*includeZeroWidth:*/true, false, false, false);
            var newLast = last.WithTrailingTrivia_6264(trivia);
            return SyntaxNodeExtensions.ReplaceToken_1612(node,
                last, newLast);
        }
        public static WithTrailingTrivia_1964<TSyntax extends SyntaxNode>(node: TSyntax, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): TSyntax {
            var last = node.GetLastToken(/*includeZeroWidth:*/true, false, false, false);
            var newLast = last.WithTrailingTrivia_1187(trivia);
            return SyntaxNodeExtensions.ReplaceToken_1612(node,
                last, newLast);
        }
        public static WithoutTrailingTrivia<TSyntax extends SyntaxNode>(node: TSyntax): TSyntax {
            return SyntaxNodeExtensions.WithTrailingTrivia_1964(node,
                <System.Collections.Generic.IEnumerable<SyntaxTrivia>>null);
        }
        public static WithTrailingTrivia_7421<TSyntax extends SyntaxNode>(node: TSyntax, ...trivia: SyntaxTrivia[]): TSyntax {
            return SyntaxNodeExtensions.WithTrailingTrivia_1964(node,
                <System.Collections.Generic.IEnumerable<SyntaxTrivia>>trivia);
        }
    }
}
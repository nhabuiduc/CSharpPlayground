class TreeItem {
    label: string;
    children: TreeItem[];
    syntaxNode: Core.SyntaxNode;
    syntaxToken: Core.SyntaxToken;
    syntaxTrivia: Core.SyntaxTrivia;
    fullSpan: Core.Text.TextSpan;
    cssClass: string;
    id: number;

    public static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static ToTreeItem(node: Core.SyntaxNodeOrToken): TreeItem {
        if (node.IsNode) {
            return TreeItem.ToTreeItem_Node(node.AsNode());
        }

        return TreeItem.ToTreeItem_Token(node.AsToken());
    }

    public static ToTreeItem_Node(node: Core.SyntaxNode): TreeItem {
        var kind = <string>CSharp.SyntaxKind[node.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = kind;
        treeItem.syntaxNode = node;
        treeItem.cssClass = "syntaxNode";
        treeItem.fullSpan = node.FullSpan;
        treeItem.id = TreeItem.getRandomInt(0, 10000000);
        if (node.ChildNodesAndTokens().Count > 0) {
            treeItem.children = [];
        }

        return treeItem;
    }

    public static ToTreeItem_Token(token: Core.SyntaxToken): TreeItem {
        var kind = <string>CSharp.SyntaxKind[token.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = kind;
        treeItem.cssClass = "syntaxToken";
        treeItem.syntaxToken = token;
        treeItem.fullSpan = token.FullSpan;
        treeItem.id = TreeItem.getRandomInt(0, 10000);
        if (token.HasLeadingTrivia || token.HasTrailingTrivia) {
            treeItem.children = [];
        } else {
            treeItem.children = undefined;
        }

        return treeItem;
    }

    public static ToTreeItem_Trivia(trivia: Core.SyntaxTrivia, leading: boolean): TreeItem {
        var kind = <string>CSharp.SyntaxKind[trivia.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = (leading ? "Lead:" : "Trail:") + kind;
        treeItem.cssClass = "syntaxTrivia";
        treeItem.syntaxTrivia = trivia;
        treeItem.id = TreeItem.getRandomInt(0, 10000);
        if (trivia.HasStructure) {
            treeItem.children = [];
        } else {
            treeItem.children = undefined;
        }
        treeItem.fullSpan = trivia.FullSpan;
        return treeItem;
    }

    public static ToTreeItemTriviaArr(nodes: Core.SyntaxTrivia[], leading: boolean): TreeItem[] {
        var virArr = [];
        for (var i = 0; i < nodes.length; i++) {
            virArr.push(TreeItem.ToTreeItem_Trivia(nodes[i], leading));
        }
        return virArr;
    }

    public static ToTreeItemArr(nodes: Core.SyntaxNodeOrToken[]): TreeItem[] {
        var virArr = [];
        for (var i = 0; i < nodes.length; i++) {
            virArr.push(TreeItem.ToTreeItem(nodes[i]));
        }
        return virArr;
    }
}
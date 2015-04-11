class TreeItem {
    label: string;
    children: TreeItem[];
    syntaxNode: Core.SyntaxNode;
    syntaxToken: Core.SyntaxToken;
    syntaxTrivia: Core.SyntaxTrivia;
    fullSpan: Core.Text.TextSpan;
    cssClass: string;
    id: number;
    collapsed: boolean = true;


    public get hasChildren(): boolean {
        return this.children != null;
    }

    public static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static AssignTreeItem(treeItem: TreeItem, node: Core.SyntaxNodeOrToken): void {
        if (node.IsNode) {
            return TreeItem.AssignTreeItem_Node(treeItem, node.AsNode());
        }

        return TreeItem.AssignTreeItem_Token(treeItem, node.AsToken());
    }

    public static ToTreeItem(node: Core.SyntaxNodeOrToken): TreeItem {
        if (node.IsNode) {
            return TreeItem.ToTreeItem_Node(node.AsNode());
        }

        return TreeItem.ToTreeItem_Token(node.AsToken());
    }

    public static ModifyArrayTrivia(arr: TreeItem[], leadingTrivias: Core.SyntaxTrivia[], tralingTrivias: Core.SyntaxTrivia[]): void {
        var count = 0;
        for (var i = 0; i < leadingTrivias.length; i++) {
            var node = leadingTrivias[i];
            if (arr.length <= count) {
                arr.push(TreeItem.ToTreeItem_Trivia(node, true));
            } else {
                TreeItem.AssignTreeItem_Trivia(arr[count], node, true);
            }
            count++;
        }

        for (var i = 0; i < tralingTrivias.length; i++) {
            var node = tralingTrivias[i];
            if (arr.length <= count) {
                arr.push(TreeItem.ToTreeItem_Trivia(node, false));
            } else {
                TreeItem.AssignTreeItem_Trivia(arr[count], node, false);
            }
            count++;
        }

        if (arr.length > count) {
            arr.splice(count);
        }
    }
    public static ModifyArray(arr: TreeItem[], nodes: Core.SyntaxNodeOrToken[]): void {
        var i = 0;
        for (i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (arr.length <= i) {
                arr.push(TreeItem.ToTreeItem(node));
            } else {
                TreeItem.AssignTreeItem(arr[i], node);
            }
        }

        if (arr.length > i) {
            arr.splice(i);
        }

    }

    public static ToTreeItem_Node(node: Core.SyntaxNode): TreeItem {
        var treeItem = new TreeItem();
        TreeItem.AssignTreeItem_Node(treeItem, node);
        return treeItem;
    }

    public static AssignTreeItem_Node(treeItem: TreeItem, node: Core.SyntaxNode): void {
        var kind = <string>CSharp.SyntaxKind[node.RawKind];
        treeItem.syntaxNode = node;
        treeItem.cssClass = "syntaxNode";
        treeItem.fullSpan = node.FullSpan;
        treeItem.label = kind;
        if (!treeItem.id) {
            treeItem.id = TreeItem.getRandomInt(0, 10000000);
        }

        var childNodes = node.ChildNodesAndTokens();

        if (childNodes.Count > 0) {
            if (!treeItem.children) {
                treeItem.children = [];
            }
            if (treeItem.collapsed) {
                treeItem.children = [];
            } else {
                TreeItem.ModifyArray(treeItem.children, Linq.Enumerable.ToArray(childNodes));
            }
        } else {
            treeItem.children = null;
        }
    }

    public static ToTreeItem_Token(token: Core.SyntaxToken): TreeItem {
        var treeItem = new TreeItem();
        TreeItem.AssignTreeItem_Token(treeItem, token);
        return treeItem;
    }

    public static AssignTreeItem_Token(treeItem: TreeItem, token: Core.SyntaxToken): void {
        var kind = <string>CSharp.SyntaxKind[token.RawKind];
        treeItem.label = kind;
        treeItem.cssClass = "syntaxToken";
        treeItem.syntaxToken = token;
        treeItem.fullSpan = token.FullSpan;

        if (!treeItem.id) {
            treeItem.id = TreeItem.getRandomInt(0, 10000);
        }

        if (token.HasLeadingTrivia || token.HasTrailingTrivia) {

            if (!treeItem.children) {
                treeItem.children = [];
            }
            if (treeItem.collapsed) {
                treeItem.children = [];
            } else {
                TreeItem.ModifyArrayTrivia(treeItem.children, Linq.Enumerable.ToArray(token.LeadingTrivia), Linq.Enumerable.ToArray(token.TrailingTrivia));
            }
        } else {
            treeItem.children = undefined;
        }
    }

    public static ToTreeItem_Trivia(trivia: Core.SyntaxTrivia, leading: boolean): TreeItem {
        var treeItem = new TreeItem();
        TreeItem.AssignTreeItem_Trivia(treeItem, trivia, leading);
        return treeItem;
    }

    public static AssignTreeItem_Trivia(treeItem: TreeItem, trivia: Core.SyntaxTrivia, leading: boolean): void {
        var kind = <string>CSharp.SyntaxKind[trivia.RawKind];
        treeItem.label = (leading ? "Lead:" : "Trail:") + kind;
        treeItem.cssClass = "syntaxTrivia";
        treeItem.syntaxTrivia = trivia;
        treeItem.fullSpan = trivia.FullSpan;
        if (!treeItem.id) {
            treeItem.id = TreeItem.getRandomInt(0, 10000);
        }

        if (trivia.HasStructure) {
            if (!treeItem.children) {
                treeItem.children = [];
            }
            if (treeItem.collapsed) {
                treeItem.children = [];
            } else {
                //var nodeTrivia = TreeItem.ToTreeItem_Node();
                var nodeTrivia = trivia.GetStructure();
                TreeItem.ModifyArray(treeItem.children, [Core.SyntaxNodeOrToken.op_Implicit_1792(nodeTrivia)]);
            }
        } else {
            treeItem.children = undefined;
        }
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
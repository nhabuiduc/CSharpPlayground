$.fn.selectRange = function (start, end) {
    if (!end) end = start;
    return this.each(function () {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

interface JQuery {
    selectRange(start: number, end: number);
}

class TreeItem {
    label: string;
    children: TreeItem[];
    syntaxNode: Core.SyntaxNode;
    syntaxToken: Core.SyntaxToken;
    syntaxTrivia: Core.SyntaxTrivia;
    fullSpan: Core.Text.TextSpan;
    cssClass: string;
    id: number;
}

interface VirtualTreeItem {
    $model: TreeItem;
    $children: VirtualTreeItem[];
    $parent: VirtualTreeItem;
    $hasChildren: boolean;
    collapsed: boolean;
}

interface TreeContext {
    nodify(treeItem: TreeItem): VirtualTreeItem;
    nodifyArray(treeItems: TreeItem[]): VirtualTreeItem[];
    collapse($event, node: VirtualTreeItem);
    expand($event, node: VirtualTreeItem);
    selectedNodes: VirtualTreeItem[];
}

import CSharp = Microsoft.CodeAnalysis.CSharp;
import Core = Microsoft.CodeAnalysis;
import Linq = System.Linq;
// Code goes here
app.controller('SyntaxTreeController', ['$scope', 'appService', '$timeout', function ($scope, appService: AppService, $timeout: angular.ITimeoutService) {
    $scope.context = {
        selectedNodes: [],
        syntaxTree: null,
    };

    function getRoot(): VirtualTreeItem {
        return $scope.context.rootNode;
    }

    function getContext(): TreeContext {
        return $scope.context;
    }

    var isNavigatingFromTreeToSource = false;

    appService.onCursorChange = function (position: number) {
        var match = NavigateToBestMatch(position);

        if (match == null) {
            return;
        }

        if (getRoot().collapsed == true) {
            getRoot().collapsed = false;
        }

        $scope.$apply();
        var $element = $("#" + match.$model.id);
        if ($element.length == 0) {
            return;
        }
        var $treeContainer = $('#tree-container');

        $treeContainer.scrollTop(
            $treeContainer.scrollTop()
            + $element.position().top
            - $treeContainer.position().top - $treeContainer.height() / 2);

    }
    appService.onAllLoaded = function () {
        $scope.showTree();
    }

    function NavigateToBestMatch(position: number): VirtualTreeItem {
        var match: VirtualTreeItem;
        if (!isNavigatingFromTreeToSource) {
            isNavigatingFromTreeToSource = true;
            try {
                getContext().selectedNodes = [];
                //for (var i = 0; i < current.$children.length; i++) {

                //}
                match = NavigateToBestMatch1(getRoot(), position);

            } finally {
                isNavigatingFromTreeToSource = false;
            }
        }

        return match;
    }

    function NavigateToBestMatch1(current: VirtualTreeItem, position: number): VirtualTreeItem {
        var match: VirtualTreeItem = null;
        if (current == null) {
            return null;
        }

        if (current.$model.fullSpan === void 0 || current.$model.fullSpan.Contains_2103(position)) {
            //current.collapsed = true;
            getContext().selectedNodes.push(current);
            if (current.$children) {
                getContext().expand(null, current);

                for (var i = 0; i < current.$children.length; i++) {
                    var tempMatch = null;
                    if (match == null) {
                        tempMatch = NavigateToBestMatch1(current.$children[i], position);
                    }

                    if (tempMatch != null) {
                        match = tempMatch;
                    } else {
                        getContext().collapse(null, current.$children[i]);
                    }
                }


            }

            if (match == null) {

                match = current;
                getContext().collapse(null, current);
            }
        } else {
            //getContext().collapse(null, current);
        }

        return match;
    }

    function CollapseEverythingBut(item: VirtualTreeItem): void {
        if (item != null) {
            DeepCollapse(getRoot());
            ExpandPathTo(item);
            //item.IsSelected = true;
            //item.BringIntoView();
            //item.collapsed = false;
        }
    }

    function ExpandPathTo(item: VirtualTreeItem): void {
        if (item != null) {
            //item.collapsed = false;
            getContext().expand(null, item);
            ExpandPathTo(item.$parent);
        }
    }

    function DeepCollapse(item: VirtualTreeItem): void {
        if (item != null) {
            //item.collapsed = false;
            getContext().collapse(null, item);
            if (!item.$children) {
                return;
            }

            for (var i = 0; i < item.$children.length; i++) {
                DeepCollapse(item.$children[i]);
            }
        }
    }

    function ToTreeItem(node: Core.SyntaxNodeOrToken): TreeItem {
        if (node.IsNode) {
            return ToTreeItem_Node(node.AsNode());
        }

        return ToTreeItem_Token(node.AsToken());

    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function ToTreeItem_Node(node: Core.SyntaxNode): TreeItem {
        var kind = <string>CSharp.SyntaxKind[node.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = kind;
        treeItem.syntaxNode = node;
        treeItem.cssClass = "syntaxNode";
        treeItem.fullSpan = node.FullSpan;
        treeItem.id = getRandomInt(0, 10000000);
        if (node.ChildNodesAndTokens().Count > 0) {
            treeItem.children = [];
        }

        return treeItem;
    }

    function ToTreeItem_Token(token: Core.SyntaxToken): TreeItem {
        var kind = <string>CSharp.SyntaxKind[token.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = kind;
        treeItem.cssClass = "syntaxToken";
        treeItem.syntaxToken = token;
        treeItem.fullSpan = token.FullSpan;
        treeItem.id = getRandomInt(0, 10000);
        if (token.HasLeadingTrivia || token.HasTrailingTrivia) {
            treeItem.children = [];
        } else {
            treeItem.children = undefined;
        }

        return treeItem;
    }

    function ToTreeItem_Trivia(trivia: Core.SyntaxTrivia, leading: boolean): TreeItem {
        var kind = <string>CSharp.SyntaxKind[trivia.RawKind];
        var treeItem = new TreeItem();
        treeItem.label = (leading ? "Lead:" : "Trail:") + kind;
        treeItem.cssClass = "syntaxTrivia";
        treeItem.syntaxTrivia = trivia;
        treeItem.id = getRandomInt(0, 10000);
        if (trivia.HasStructure) {
            treeItem.children = [];
        } else {
            treeItem.children = undefined;
        }
        treeItem.fullSpan = trivia.FullSpan;
        return treeItem;
    }

    function ToTreeItemTriviaArr(nodes: Core.SyntaxTrivia[], leading: boolean): TreeItem[] {
        var virArr = [];
        for (var i = 0; i < nodes.length; i++) {
            virArr.push(ToTreeItem_Trivia(nodes[i], leading));
        }
        return virArr;
    }

    function ToTreeItemArr(nodes: Core.SyntaxNodeOrToken[]): TreeItem[] {
        var virArr = [];
        for (var i = 0; i < nodes.length; i++) {
            virArr.push(ToTreeItem(nodes[i]));
        }
        return virArr;
    }

    function populateDiagnostic(tree: Core.SyntaxTree) {
        var diagnostics = tree.GetDiagnostics_4066();

        var list = System.Linq.Enumerable.ToArray(diagnostics);
        var errorStr = "";
        for (var i = 0; i < list.Count; i++) {
            var dia = list.$get$(i);
            errorStr += dia.GetMessage() + "\r\n";
            var span = dia.Location.SourceSpan;
        }

        appService.setErrorText(errorStr);
    }

    $scope.showTree = function () {

        var code = appService.getSource();
        var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText_7227(code);
        populateDiagnostic(tree);
        var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
        var virArr = ToTreeItemArr(nodes);
        var root = getRoot();
        root.$model = ToTreeItem_Node(tree.GetRoot());
        root.$children = $scope.context.nodifyArray(virArr);

    };


    //$scope.convertClick = function () {
    //    var $sourceCode = $("#sourceCode");
    //    var $treeSourceCode = $("#treeSourceCode");
    //    var $errorBox = $("#errorBox");
    //    var code = $sourceCode.val();
    //    var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText_7227(code);
    //    $treeSourceCode.val(tree.ToString());
    //    populateDiagnostic(tree);
    //    $scope.context.syntaxTree = tree;
    //}

    $scope.options = {
        onSelect: function ($event, node: VirtualTreeItem, context) {
            if ($event.ctrlKey) {
                var idx = context.selectedNodes.indexOf(node);
                if (context.selectedNodes.indexOf(node) === -1) {
                    context.selectedNodes.push(node);
                } else {
                    context.selectedNodes.splice(idx, 1);
                }
            } else {
                context.selectedNodes = [node];
            }

            //var $sourceCode = $("#sourceCode");
            var location: Core.Text.TextSpan;
            if (node.$model.syntaxNode != null) {
                location = node.$model.syntaxNode.Span;
            } else if (node.$model.syntaxToken != null) {
                location = node.$model.syntaxToken.Span;
            } else {
                location = node.$model.syntaxTrivia.Span;
            }
            try {
                isNavigatingFromTreeToSource = true;
                appService.SetSelection(location.Start, location.End);
            } finally {
                isNavigatingFromTreeToSource = false;
            }
            
            //$sourceCode.selectRange(location.Start, location.End);
        },
        onExpand: function ($event, virtualTreeItem: VirtualTreeItem, context: TreeContext) {
            if (virtualTreeItem.$children.length > 0) {
                return;
            }
            if (virtualTreeItem.$model.syntaxNode != null) {
                var nodes = Linq.Enumerable.ToArray(virtualTreeItem.$model.syntaxNode.ChildNodesAndTokens());
                var virArr = ToTreeItemArr(nodes);

                virtualTreeItem.$model.children = virArr;
                virtualTreeItem.$children = context.nodifyArray(virArr);
            }
            else if (virtualTreeItem.$model.syntaxToken != null) {
                var leadingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.$model.syntaxToken.LeadingTrivia);
                var trailingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.$model.syntaxToken.TrailingTrivia);
                var virLeading = ToTreeItemTriviaArr(leadingTrivias, true);
                var virTrailing = ToTreeItemTriviaArr(trailingTrivias, false);

                var arr = [];
                if (virtualTreeItem.$model.syntaxToken.HasLeadingTrivia) {
                    arr = arr.concat(virLeading);
                }
                if (virtualTreeItem.$model.syntaxToken.HasTrailingTrivia) {
                    arr = arr.concat(virTrailing);
                }

                // var arr = virLeading.concat(virTrailing);
                //var virArr = 
                virtualTreeItem.$model.children = arr;
                virtualTreeItem.$children = context.nodifyArray(arr);

            } else {
                var nodeTrivia = ToTreeItem_Node(virtualTreeItem.$model.syntaxTrivia.GetStructure());
                var virNode = context.nodify(nodeTrivia);
                virtualTreeItem.$model.children = [nodeTrivia];
                virtualTreeItem.$children = [virNode];
            }
        }
    };

    (function () {
        var tree = Microsoft.CodeAnalysis.CSharp.CSharpSyntaxTree.ParseText_7227($('#sourceCode').val());
        populateDiagnostic(tree);
        var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
        $scope.model = ToTreeItemArr(nodes);
    })();

    //$scope.model = [{
    //    label: 'parent1',
    //    children: [{
    //        label: 'child'
    //    }]
    //}];
}]);

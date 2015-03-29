

// Code goes here
app.controller('SyntaxTreeController', ['$scope', 'appService', 'csharpSyntaxService',
    function ($scope, appService: AppService, csharpSyntaxService: CSharpSyntaxService) {
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

    function NavigateToBestMatch(position: number): VirtualTreeItem {
        var match: VirtualTreeItem;
        if (!isNavigatingFromTreeToSource) {
            isNavigatingFromTreeToSource = true;
            try {
                getContext().selectedNodes = [];
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
        }

        return match;
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
        var tree = csharpSyntaxService.ParseTree(code);
        populateDiagnostic(tree);
        var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
        var virArr = TreeItem.ToTreeItemArr(nodes);
        var root = getRoot();
        root.$model = TreeItem.ToTreeItem_Node(tree.GetRoot());
        root.$children = $scope.context.nodifyArray(virArr);

    };

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
                var virArr = TreeItem.ToTreeItemArr(nodes);

                virtualTreeItem.$model.children = virArr;
                virtualTreeItem.$children = context.nodifyArray(virArr);
            }
            else if (virtualTreeItem.$model.syntaxToken != null) {
                var leadingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.$model.syntaxToken.LeadingTrivia);
                var trailingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.$model.syntaxToken.TrailingTrivia);
                var virLeading = TreeItem.ToTreeItemTriviaArr(leadingTrivias, true);
                var virTrailing = TreeItem.ToTreeItemTriviaArr(trailingTrivias, false);

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
                var nodeTrivia = TreeItem.ToTreeItem_Node(virtualTreeItem.$model.syntaxTrivia.GetStructure());
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
        $scope.model = TreeItem.ToTreeItemArr(nodes);
    })();
}]);

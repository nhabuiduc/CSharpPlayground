///<reference path="AppService.ts"/>
///<reference path="Tree-UI/TreeView.ts"/>
interface ISyntaxTreeScope extends ng.IScope{
    node: TreeItem;
    options: ITreeScopeOption;
    context: ITreeContext;
}

module Playground {
    export class SyntaxTreeController {

        private lastTree: Core.SyntaxTree;
        private lastPosition: number;
        private isNavigatingFromTreeToSource = false;
        private isCursorChanged = false;
        private get context(): ITreeContext {
            return this.$scope.context;
        }

        constructor(private $scope: ISyntaxTreeScope, private appService: AppService, private csharpSyntaxService: CSharpSyntaxService,
            private $interval: angular.IIntervalService, private $timeout: angular.ITimeoutService) {

            $scope.options = {
                onSelect: this.navigateToSource.bind(this),
                onExpand: this.handleNodeExpanded.bind(this)
            };

            setInterval(this.refreshTree.bind(this), 500);
            appService.onCursorChange = this.handleSourceCursorChanged.bind(this);
           
            this.initializeTree();
        }

        private initializeTree() {
            var tree = this.csharpSyntaxService.ParseTree($('#sourceCode').val());
            this.populateDiagnostic(tree);
            var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
            this.$scope.options.initializedNodes = TreeItem.ToTreeItemArr(nodes);
        }

        private handleSourceCursorChanged(position: number) {
            if (this.isNavigatingFromTreeToSource) {
                return;
            }
            this.lastPosition = position;
            this.isCursorChanged = true;

        }

        private handleNodeExpanded($event, virtualTreeItem: TreeItem, context: ITreeContext) {
            if (virtualTreeItem.children.length > 0) {
                return;
            }
            if (virtualTreeItem.syntaxNode != null) {
                var nodes = Linq.Enumerable.ToArray(virtualTreeItem.syntaxNode.ChildNodesAndTokens());
                var virArr = TreeItem.ToTreeItemArr(nodes);

                virtualTreeItem.children = virArr;
                //virtualTreeItem.children = context.nodifyArray(virArr);
            }
            else if (virtualTreeItem.syntaxToken != null) {
                var leadingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.syntaxToken.LeadingTrivia);
                var trailingTrivias = Linq.Enumerable.ToArray(virtualTreeItem.syntaxToken.TrailingTrivia);
                var virLeading = TreeItem.ToTreeItemTriviaArr(leadingTrivias, true);
                var virTrailing = TreeItem.ToTreeItemTriviaArr(trailingTrivias, false);

                var arr: TreeItem[] = [];
                if (virtualTreeItem.syntaxToken.HasLeadingTrivia) {
                    arr = arr.concat(virLeading);
                }
                if (virtualTreeItem.syntaxToken.HasTrailingTrivia) {
                    arr = arr.concat(virTrailing);
                }

                virtualTreeItem.children = arr;

            } else {
                var nodeTrivia = TreeItem.ToTreeItem_Node(virtualTreeItem.syntaxTrivia.GetStructure());
                virtualTreeItem.children = [nodeTrivia];
            }
        }

        private refreshTree() {
            var tree = this.csharpSyntaxService.getLastTree();
            if (this.lastTree != tree) {
                this.populateTree(tree);
                this.lastTree = tree;
                this.isCursorChanged = true;
            }
            if (this.isCursorChanged) {
                this.expandTreeToPosition(this.lastPosition);
            }
            this.isCursorChanged = false;
        }

        private expandTreeToPosition(position: number) {
            var match = this.navigateToBestMatch(position);

            if (match == null) {
                return;
            }

            if (this.context.root.collapsed == true) {
                this.context.root.collapsed = false;
            }

            this.$scope.$apply();
            var $element = $("#" + match.id);
            if ($element.length == 0) {
                return;
            }
            var $treeContainer = $('#tree-container');

            $treeContainer.scrollTop($treeContainer.scrollTop() + $element.position().top - $treeContainer.position().top - $treeContainer.height() / 2);
        }

        private navigateToBestMatch(position: number): TreeItem {
            var match: TreeItem;
            if (!this.isNavigatingFromTreeToSource) {
                this.isNavigatingFromTreeToSource = true;
                try {
                    this.context.selectedNodes = [];
                    match = this.navigateToTreeItem(this.context.root, position);

                } finally {
                    this.isNavigatingFromTreeToSource = false;
                }
            }

            return match;
        }

        private navigateToTreeItem(current: TreeItem, position: number): TreeItem {
            var match: TreeItem = null;
            if (current == null) {
                return null;
            }

            if (current.fullSpan === void 0 || current.fullSpan.Contains_2103(position)) {
                this.context.selectedNodes.push(current);
                if (current.children) {
                    this.context.expand(null, current);

                    for (var i = 0; i < current.children.length; i++) {
                        var tempMatch = null;
                        if (match == null) {
                            tempMatch = this.navigateToTreeItem(current.children[i], position);
                        }

                        if (tempMatch != null) {
                            match = tempMatch;
                        } else {
                            this.context.collapse(null, current.children[i]);
                        }
                    }
                }

                if (match == null) {

                    match = current;
                    this.context.collapse(null, current);
                }
            }

            return match;
        }

        private populateDiagnostic(tree: Core.SyntaxTree) {
            var diagnostics = tree.GetDiagnostics_4066();

            var list = System.Linq.Enumerable.ToArray(diagnostics);
            var errorStr = "";
            for (var i = 0; i < list.Count; i++) {
                var dia = list.$get$(i);
                errorStr += dia.GetMessage() + "\r\n";
                var span = dia.Location.SourceSpan;
            }

            this.appService.setErrorText(errorStr);
        }

        private populateTree(tree: Core.SyntaxTree) {
            var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
            TreeItem.ModifyArray(this.context.root.children, nodes);
        }

        private navigateToSource($event, node: TreeItem, context): void {
            context.selectedNodes = [node];
            var location: Core.Text.TextSpan;
            if (node.syntaxNode != null) {
                location = node.syntaxNode.Span;
            } else if (node.syntaxToken != null) {
                location = node.syntaxToken.Span;
            } else {
                location = node.syntaxTrivia.Span;
            }
            try {
                this.isNavigatingFromTreeToSource = true;
                this.appService.setSelection(location.Start, location.End);
            } finally {
                this.isNavigatingFromTreeToSource = false;
            }
        }
    }
}

app.controller('SyntaxTreeController',
    ['$scope', 'appService', 'csharpSyntaxService', '$interval', '$timeout', Playground.SyntaxTreeController]);

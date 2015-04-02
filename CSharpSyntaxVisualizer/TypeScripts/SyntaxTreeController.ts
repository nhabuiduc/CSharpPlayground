///<reference path="AppService.ts"/>
module Playground {
    export class SyntaxTreeController {

        private lastTree: Core.SyntaxTree;
        private lastPosition: number;
        private isNavigatingFromTreeToSource = false;
        private isCursorChanged = false;

        constructor(private $scope: any, private appService: AppService, private csharpSyntaxService: CSharpSyntaxService,
            private $interval: angular.IIntervalService, private $timeout: angular.ITimeoutService) {

            this.$scope.context = { selectedNodes: [] };
            $scope.options = {
                onSelect: this.navigateToSource.bind(this),
                onExpand: this.handleNodeExpanded.bind(this)
            };

            setInterval(this.refreshTree.bind(this), 600);
            appService.onCursorChange = this.handleSourceCursorChanged.bind(this);
            this.initializeTree();
        }

        private initializeTree() {
            var tree = this.csharpSyntaxService.ParseTree($('#sourceCode').val());
            this.populateDiagnostic(tree);
            var nodes = Linq.Enumerable.ToArray(tree.GetRoot().ChildNodesAndTokens());
            this.$scope.model = TreeItem.ToTreeItemArr(nodes);
        }

        private getRoot(): VirtualTreeItem {
            return this.$scope.context.rootNode;
        }

        private getContext(): TreeContext {
            return this.$scope.context;
        }

        private handleSourceCursorChanged(position: number) {
            if (this.isNavigatingFromTreeToSource) {
                return;
            }
            this.lastPosition = position;
            this.isCursorChanged = true;

            ////this.$timeout( () => {
            ////    this.expandTreeToPosition(position);
            ////    this.lastPosition = position;
            ////    this.isCursorChanged = false;
            ////});
        }

        private handleNodeExpanded($event, virtualTreeItem: VirtualTreeItem, context: TreeContext) {
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

                virtualTreeItem.$model.children = arr;
                virtualTreeItem.$children = context.nodifyArray(arr);

            } else {
                var nodeTrivia = TreeItem.ToTreeItem_Node(virtualTreeItem.$model.syntaxTrivia.GetStructure());
                var virNode = context.nodify(nodeTrivia);
                virtualTreeItem.$model.children = [nodeTrivia];
                virtualTreeItem.$children = [virNode];
            }
        }

        private refreshTree() {
            var tree = this.csharpSyntaxService.GetTree();
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

            if (this.getRoot().collapsed == true) {
                this.getRoot().collapsed = false;
            }

            this.$scope.$apply();
            var $element = $("#" + match.$model.id);
            if ($element.length == 0) {
                return;
            }
            var $treeContainer = $('#tree-container');

            $treeContainer.scrollTop($treeContainer.scrollTop() + $element.position().top - $treeContainer.position().top - $treeContainer.height() / 2);
        }

        private navigateToBestMatch(position: number): VirtualTreeItem {
            var match: VirtualTreeItem;
            if (!this.isNavigatingFromTreeToSource) {
                this.isNavigatingFromTreeToSource = true;
                try {
                    this.getContext().selectedNodes = [];
                    match = this.navigateToTreeItem(this.getRoot(), position);

                } finally {
                    this.isNavigatingFromTreeToSource = false;
                }
            }

            return match;
        }

        private navigateToTreeItem(current: VirtualTreeItem, position: number): VirtualTreeItem {
            var match: VirtualTreeItem = null;
            if (current == null) {
                return null;
            }

            if (current.$model.fullSpan === void 0 || current.$model.fullSpan.Contains_2103(position)) {                
                this.getContext().selectedNodes.push(current);
                if (current.$children) {
                    this.getContext().expand(null, current);

                    for (var i = 0; i < current.$children.length; i++) {
                        var tempMatch = null;
                        if (match == null) {
                            tempMatch = this.navigateToTreeItem(current.$children[i], position);
                        }

                        if (tempMatch != null) {
                            match = tempMatch;
                        } else {
                            this.getContext().collapse(null, current.$children[i]);
                        }
                    }
                }

                if (match == null) {

                    match = current;
                    this.getContext().collapse(null, current);
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
            var virArr = TreeItem.ToTreeItemArr(nodes);
            var root = this.getRoot();
            root.$model = TreeItem.ToTreeItem_Node(tree.GetRoot());
            root.$children = this.$scope.context.nodifyArray(virArr);
        }

        private navigateToSource($event, node: VirtualTreeItem, context): void {
            context.selectedNodes = [node];
            var location: Core.Text.TextSpan;
            if (node.$model.syntaxNode != null) {
                location = node.$model.syntaxNode.Span;
            } else if (node.$model.syntaxToken != null) {
                location = node.$model.syntaxToken.Span;
            } else {
                location = node.$model.syntaxTrivia.Span;
            }
            try {
                this.isNavigatingFromTreeToSource = true;
                this.appService.SetSelection(location.Start, location.End);
            } finally {
                this.isNavigatingFromTreeToSource = false;
            }
        }
    }
}

app.controller('SyntaxTreeController',
    ['$scope', 'appService', 'csharpSyntaxService', '$interval', '$timeout', Playground.SyntaxTreeController]);

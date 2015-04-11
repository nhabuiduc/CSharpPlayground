interface ITreeScopeOption {
    onExpand?: (event: ng.IAngularEvent, node: TreeItem, context?: ITreeContext) => void;
    onCollapse?: (event: ng.IAngularEvent, node: TreeItem, context?: ITreeContext) => void;
    //onToggle: (event: ng.IAngularEvent, node: TreeItem, context?: ITreeContext) => void;
    onSelect?: (event: ng.IAngularEvent, node: TreeItem, context?: ITreeContext) => void;
    initializedNodes?: TreeItem[];
}

interface ITreeScope extends angular.IScope {
    node: TreeItem;
    expand: (event: ng.IAngularEvent, node: TreeItem) => void;
    collapse: (event: ng.IAngularEvent, node: TreeItem) => void;
    toggle: (event: ng.IAngularEvent, node: TreeItem) => void;
    selectNode: (event: ng.IAngularEvent, node: TreeItem) => void;
    options: ITreeScopeOption;
    context: ITreeContext;
   
    
}

interface ITreeContext {
    selectedNodes: TreeItem[];
    root: TreeItem;
    expand: (event: ng.IAngularEvent, node: TreeItem) => void;
    collapse: (event: ng.IAngularEvent, node: TreeItem) => void;
    toggle: (event: ng.IAngularEvent, node: TreeItem) => void;
    selectNode: (event: ng.IAngularEvent, node: TreeItem) => void;
}

class YaTreeviewCtrl {
    private options: ITreeScopeOption;
    constructor(private $scope: ITreeScope,
        private $timeout: angular.ITimeoutService,
        public transcludeFn: angular.ITranscludeFunction) {

        $scope.node = new TreeItem();
        $scope.node.collapsed = false;
        $scope.node.children = $scope.options.initializedNodes != null ? $scope.options.initializedNodes : [];
        $scope.expand = this.expand.bind(this);
        $scope.collapse = this.collapse.bind(this);
        $scope.toggle = this.toggle.bind(this);
        $scope.selectNode = this.selectNode.bind(this);
        $scope.context = {
            selectedNodes: [],
            root: $scope.node,
            collapse: $scope.collapse,
            expand: $scope.expand,
            selectNode: $scope.selectNode,
            toggle: $scope.toggle
        };
        
        this.options = this.fillOption($scope.options);
    }

    private fillOption(clientOptions: ITreeScopeOption) {
        var options: ITreeScopeOption = {};
        clientOptions = clientOptions || {};
        options.onExpand = clientOptions.onExpand || angular.noop;
        options.onCollapse = clientOptions.onCollapse || angular.noop;
        options.onSelect = clientOptions.onSelect || angular.noop;
       // options.onDblClick = clientOptions.onDblClick || angular.noop;
        return options;
    }

    private expand(event: ng.IAngularEvent, node: TreeItem) {
        node.collapsed = false;
        this.options.onExpand(event, node, this.$scope.context);
    }

    private collapse(event: ng.IAngularEvent, node: TreeItem) {
        node.collapsed = true;
        angular.forEach(node.children, function (child: TreeItem) {
            child.collapsed = true;
        });
        this.options.onCollapse(event, node, this.$scope.context);
    }

    private selectNode(event: ng.IAngularEvent, node: TreeItem) {
        this.options.onSelect(event, node, this.$scope.context);
    }

    private toggle(event: ng.IAngularEvent, node: TreeItem) {
        if (node.collapsed) {
            this.$scope.expand(event, node);
        } else {
            this.$scope.collapse(event, node);
        }
    }
}


angular.module("ya.treeview", [])
    .controller("YaTreeviewCtrl", ["$scope", "$timeout", YaTreeviewCtrl])
    .directive("yaTreeview", function () {
    return {
        restrict: "AE",
        replace: true,
        transclude: true,
        controller: "YaTreeviewCtrl",
        scope: {
            id: "@yaId",
            options: "=yaOptions",
            context: "=yaContext",            
        },
        templateUrl: "templates/ya-treeview/treeview.tpl.html",
        compile: function (tElement: ng.IAugmentedJQuery, tAttrs: ng.IAttributes, tTranscludeFn: ng.ITranscludeFunction) {
            return function (scope: ITreeScope, iElement: ng.IAugmentedJQuery, iAttrs: ng.IAttributes, treeviewCtrl: YaTreeviewCtrl) {
                treeviewCtrl.transcludeFn = tTranscludeFn;
            };
        }
    };
}).directive("yaNode", ["$compile", function ($compile: angular.ICompileService) {
    return {
        restrict: "AE",
        replace: false,
        scope: false,
        templateUrl: "templates/ya-treeview/children.tpl.html",
        compile: function (tElement: ng.IAugmentedJQuery) {
            var template = tElement.clone();
            tElement.empty();
            return function (scope: ITreeScope, iElement: ng.IAugmentedJQuery) {
                if (scope.node.hasChildren) {
                    iElement.append($compile(template.html())(scope));
                }
            };
        }
    };
}]).directive("yaTransclude", function () {
    return {
        restrict: "AE",
        replace: false,
        require: "^yaTreeview",
        scope: false,
        template: "",
        link: function (scope: ITreeScope, iElement: ng.IAugmentedJQuery, iAttrs: ng.IAttributes, treeviewCtrl: YaTreeviewCtrl) {
            treeviewCtrl.transcludeFn(scope, function (clone) {
                if (scope.node) {
                    iElement.append(clone);
                }
            });
        }
    };
});
angular.module("ya.treeview.tpls", ["templates/ya-treeview/children.tpl.html", "templates/ya-treeview/treeview.tpl.html"]);
angular.module("templates/ya-treeview/children.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/ya-treeview/children.tpl.html", '<ul ng-hide=node.collapsed class=list-unstyled><li class=node ng-repeat="node in node.children"><div ng-show=node.hasChildren><a ng-show=node.collapsed class="btn btn-link pull-left" ng-click="expand($event, node)"><i class="glyphicon glyphicon-chevron-right"></i></a> <a ng-hide=node.collapsed class="btn btn-link pull-left" ng-click="collapse($event, node)"><i class="glyphicon glyphicon-chevron-down"></i></a></div><div class="node-content clearfix" ya-transclude ng-click="selectNode($event, node)" ng-dblclick="dblClick($event, node)"></div><div ya-node class=ya-node></div></li></ul>');
}]);
angular.module("templates/ya-treeview/treeview.tpl.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("templates/ya-treeview/treeview.tpl.html", "<div class=ya-treeview><div ya-node class=ya-node></div></div>");
}]);
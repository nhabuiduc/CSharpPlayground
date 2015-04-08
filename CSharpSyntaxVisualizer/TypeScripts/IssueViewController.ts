///<reference path="AppService.ts"/>
module Playground {
    export class IssueViewController {
        constructor(private $scope: any, private appService: AppService, private csharpSyntaxService: CSharpSyntaxService) {
            $scope.items = [];
            $scope.handleDbclick = this.handleDbclick.bind(this);
            //$scope.handleDbclick = function () { alert(''); };
            this.appService.onErrorChanged = this.HandleOnErrorChanged.bind(this);
        }

        private HandleOnErrorChanged(errors: Playground.Cm.DiagnosticMarkedText[]): void {
            this.$scope.items = errors;
            this.$scope.$apply();
        }

        private handleDbclick(item: Playground.Cm.DiagnosticMarkedText): void {
            if (this.appService.onNavigateToError) {
                this.appService.onNavigateToError(item);
            }
        }
    }
}

app.controller('IssueViewController',
    ['$scope', 'appService', 'csharpSyntaxService', Playground.IssueViewController]);
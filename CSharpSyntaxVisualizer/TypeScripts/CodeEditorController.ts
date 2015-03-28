
app.controller('CodeEditorController', ['$scope', 'appService', function ($scope, appService: AppService) {
 
     //The ui-codemirror option
    $scope.cmOption = {
        lineNumbers: true,
        indentWithTabs: true,
        onLoad: function (cm: CodeMirror.Editor) {
            appService.setCodeMirror(cm);

            var doc = cm.getDoc();
            cm.on("cursorActivity", function (instance: CodeMirror.Editor) {
                var position = doc.indexFromPos(doc.getCursor());
                appService.onCursorChange(position);
            });
        }
    };    
}]);
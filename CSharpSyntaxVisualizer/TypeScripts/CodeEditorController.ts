
app.controller('CodeEditorController',
    ['$scope', 'appService', 'csharpSyntaxService',
        function ($scope, appService: AppService, csharpSyntaxService: CSharpSyntaxService) {
            var editor: CodeMirror.Editor;
            var doc: CodeMirror.Doc;

            appService.onNodeSelectionChanged = function (start: number, end: number) {
                var posStart = doc.posFromIndex(start);
                var posEnd = doc.posFromIndex(end);
                doc.setSelection(posStart, posEnd);
            }
            
            //The ui-codemirror option
            $scope.cmOption = {
                lineNumbers: true,
                indentWithTabs: true,
                onLoad: function (cm: CodeMirror.Editor) {
                    appService.setCodeMirror(cm);
                    editor = cm;
                    doc = cm.getDoc();

                    cm.on("cursorActivity", function (instance: CodeMirror.Editor) {
                        var doc = instance.getDoc();
                        var position = doc.indexFromPos(doc.getCursor());
                        appService.onCursorChange(position);
                    });
                    cm.on("beforeChange", function (instance: CodeMirror.Editor,
                        change: CodeMirror.EditorChangeCancellable): void {
                        var doc = instance.getDoc();
                        var start = doc.indexFromPos(change.from);
                        var end = doc.indexFromPos(change.to);
                        var length = end - start;
                        var textChange = new Core.Text.TextChange()
                            .ctor_1791(new Core.Text.TextSpan().ctor_1506(start, length),
                            change.text.join('\n'));
                        csharpSyntaxService.WithChange([textChange]);
                    });
                    //cm.on("changes", function (instance: CodeMirror.Editor,                  
                    //    changes: CodeMirror.EditorChange[]): void {
                    //    //var doc = instance.getDoc();
                    //    //var textChanges = new Array<Core.Text.TextChange>(changes.length);
                    //    //for (var i = 0; i < changes.length; i++) {
                    //    //    var change = changes[i];
                    //    //    var start = doc.indexFromPos(change.from);
                    //    //    var end = doc.indexFromPos(change.to);
                    //    //    var length = end - start;
                    //    //    var textChange = new Core.Text.TextChange()
                    //    //        .ctor_1791(new Core.Text.TextSpan().ctor_1506(start, length),
                    //    //        change.text.join('\n'));
                    //    //    textChanges[i] = textChange;
                    //    //}

                    //    //csharpSyntaxService.WithChange(textChanges);
                    //});
                }
            };
        }]);
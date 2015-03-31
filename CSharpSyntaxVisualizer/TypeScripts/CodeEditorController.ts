module Playground {
    export class CodeEditorController {
        private editor: CodeMirror.Editor;
        private doc: CodeMirror.Doc;
        constructor(private $scope, private appService: AppService, private csharpSyntaxService: CSharpSyntaxService) {

            this.appService.onNodeSelectionChanged = this.handleNodeSelectionChanged.bind(this);
            $scope.cmOption = {
                lineNumbers: true,
                indentWithTabs: true,
                onLoad: this.handleEditorLoad.bind(this)
            };
        }

        private handleEditorLoad(editor: CodeMirror.Editor): void {
            this.appService.setCodeMirror(editor);
            this.editor = editor;
            this.doc = editor.getDoc();
            editor.on("cursorActivity", this.handleEditor_cursorActivity.bind(this));
            editor.on("beforeChange", this.handleEditor_beforeChange.bind(this));
        }

        private handleEditor_cursorActivity(instance: CodeMirror.Editor): void {
            var position = this.doc.indexFromPos(this.doc.getCursor());
            this.appService.onCursorChange(position);
        }

        private handleEditor_beforeChange(instance: CodeMirror.Editor,
            change: CodeMirror.EditorChangeCancellable): void {

            var start = this.doc.indexFromPos(change.from);
            var end = this.doc.indexFromPos(change.to);
            var length = end - start;
            var textChange = new Core.Text.TextChange()
                .ctor_1791(new Core.Text.TextSpan().ctor_1506(start, length),
                change.text.join('\n'));
            this.csharpSyntaxService.AddChange(textChange);
        }

        private handleNodeSelectionChanged(start: number, end: number): void {
            var posStart = this.doc.posFromIndex(start);
            var posEnd = this.doc.posFromIndex(end);
            this.doc.setSelection(posStart, posEnd);
        }
    }
}


app.controller('CodeEditorController',
    ['$scope', 'appService', 'csharpSyntaxService', Playground.CodeEditorController]);
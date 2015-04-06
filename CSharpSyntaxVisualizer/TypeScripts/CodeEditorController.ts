///<reference path="AppService.ts"/>
module Playground {
    export class CodeEditorController {
        private editor: CodeMirror.Editor;
        private doc: CodeMirror.Doc;
        private lastTree: Core.SyntaxTree;
        constructor(private $scope, private appService: AppService, private csharpSyntaxService: CSharpSyntaxService) {

            this.appService.onNodeSelectionChanged = this.handleNodeSelectionChanged.bind(this);
            $scope.cmOption = {
                lineNumbers: true,
                indentWithTabs: true,
                onLoad: this.handleEditorLoad.bind(this),                
            };

            //$scope.highlightClick = this.highlightSyntax.bind(this);
        }

        //private highlightSyntax(): void {
        //    var code = this.appService.getSource();

        //    var tokens = this.csharpSyntaxService.GetTokensFromSpan(0, code.length);
        //    for (var i = 0; i < tokens.length; i++) {
        //        var token = tokens[i];
        //        var css = Playground.Mapping.highlightCss[token.Kind];
        //        var start = this.doc.posFromIndex(token.Start);
        //        var end = this.doc.posFromIndex(token.Start + token.Length);
        //        this.doc.markText(start, end, { className: css });                
        //    }
        //}

        private handleEditorLoad(editor: CodeMirror.Editor): void {
            this.appService.setCodeMirror(editor);
            this.editor = editor;
            this.doc = editor.getDoc();
            editor.csharpSyntaxService = this.csharpSyntaxService;
            editor.runCSharpMode = CodeMirrorExtended.runCSharpMode;
            // define faked mode
            CodeMirror.defineMode('roslynCSharp',(config: CodeMirror.EditorConfiguration, modeOptions?: any) => {
                return {
                    token: function (stream) { stream.skipToEnd(); return null;},
                    startState: function () { return null; }
                };
            });
            this.editor.setOption('mode','roslynCSharp');
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
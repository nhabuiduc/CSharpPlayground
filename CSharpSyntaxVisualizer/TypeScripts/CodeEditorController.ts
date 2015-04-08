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

            this.appService.onNavigateToError = this.handleNavigateToError.bind(this);
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
                    token: function (stream) { stream.skipToEnd(); return null; },
                    startState: function () { return null; }
                };
            });
            this.editor.setOption('mode', 'roslynCSharp');
            editor.on("cursorActivity", this.handleEditor_cursorActivity.bind(this));
            editor.on("beforeChange", this.handleEditor_beforeChange.bind(this));
            setInterval(this.handleShowError.bind(this), 2000);

            
        }

        private cachedDiagnostics: Playground.Cm.DiagnosticMarkedText[] = [];
        private lastTreeForError: Core.SyntaxTree;
        // temporary solution is using mark text to show error
        // it should be replaced by run Mode
        // now we only support showing maximum 100 errors
        private handleShowError(): void {
            var tree = this.csharpSyntaxService.getLastTree();
            if (tree == this.lastTreeForError) return;
            this.lastTreeForError = tree;
            var diagontics = tree.GetDiagnostics_4066();
            var diagnosticMarks: Playground.Cm.DiagnosticMarkedText[] = [];
            _foreach(diagontics,(d) => {
                if (diagnosticMarks.length > 100) return;

                var c = this.findCachedDiagnostic(d);
                if (c == null) {

                    // convert using codemirror instead of GetLineSpan of Roslyn                    
                    var start = this.doc.posFromIndex(d.Location.SourceSpan.Start);
                    var end = this.doc.posFromIndex(d.Location.SourceSpan.End);
                    c = new Playground.Cm.DiagnosticMarkedText(
                        d, this.doc.markText(start, end, { className: "cm-trailingspace" }),
                        start, end);
                    this.cachedDiagnostics.push(c);
                }
                c.isProcessed = true;
            });

            var index = 0;
            while (index < this.cachedDiagnostics.length) {
                var d = this.cachedDiagnostics[index];
               
                if (!d.isProcessed) {
                    d.mark.clear();
                    this.cachedDiagnostics.splice(index, 1);
                    continue;
                }
                d.isProcessed = false;
                index++;
            }

            //this.cachedDiagnostics = diagnosticMarks;
            if (this.appService.onErrorChanged) {
                this.appService.onErrorChanged(this.cachedDiagnostics)
            }
        }

        private handleNavigateToError(d: Playground.Cm.DiagnosticMarkedText): void {
            this.doc.setSelection(d.start, d.end);
        }

        private findCachedDiagnostic(diagnostic: Core.Diagnostic): Playground.Cm.DiagnosticMarkedText {
            for (var i = 0; i < this.cachedDiagnostics.length; i++) {
                var c = this.cachedDiagnostics[i];
                if (c.diagnostic.Equals_8787(diagnostic)) {
                    return c;
                }
            }

            return null;
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
            this.csharpSyntaxService.addChange(textChange);
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
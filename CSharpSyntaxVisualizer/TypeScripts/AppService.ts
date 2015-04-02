///<reference path="Imports.ts"/>
///<reference path="CSharpSyntaxService.ts"/>
///<reference path="Tree-UI/TreeItem.ts"/>
class AppService {
    // fields
    private sourceCodeEditor = new SourceCodeEditor();

    // events
    public onCursorChange: (position: number) => void;
    public onNodeSelectionChanged: (start: number, end: number) => void;

    // public methods
    public setCodeMirror(codeMirror: CodeMirror.Editor) {
        this.sourceCodeEditor.setCodeMirror(codeMirror);
    }

    public getSource(): string {
        return this.sourceCodeEditor.getSource();
    }
    public SetSelection(start: number, end: number) {
        this.onNodeSelectionChanged(start, end);
    }
    public setErrorText(text: string) {
        var $errorBox = $("#errorBox");
        $errorBox.val(text);
    }
}

var app = angular.module('app', ['ya.treeview', 'ya.treeview.tpls', 'ui.codemirror']);
app.service('appService', AppService);
app.service('csharpSyntaxService', CSharpSyntaxService);

class SourceCodeEditor {
    private codeMirror: CodeMirror.Editor;
    private codeDoc: CodeMirror.Doc;
    public setCodeMirror(codeMirror: CodeMirror.Editor) {
        this.codeMirror = codeMirror;
        this.codeDoc = codeMirror.getDoc();
    }
    public getSource(): string {
        return this.codeDoc.getValue();
    }
}
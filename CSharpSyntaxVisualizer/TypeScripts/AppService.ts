class AppService {
    private sourceCodeEditor = new SourceCodeEditor();

    public setCodeMirror(codeMirror: CodeMirror.Editor) {
        this.sourceCodeEditor.setCodeMirror(codeMirror);
    }

    public onCursorChange: (position: number) => void;
    public onAllLoaded: () => void;

    public getSource(): string {
        return this.sourceCodeEditor.getSource();
    }
    public SetSelection(start: number, end: number) {
        this.sourceCodeEditor.SetSelection(start, end);
    }
     public setErrorText(text: string) {
         var $errorBox = $("#errorBox");
         $errorBox.val(text);
     }
}

var app = angular.module('app', ['ya.treeview', 'ya.treeview.tpls', 'ui.codemirror']);
app.service('appService', AppService);

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
    
    public SetSelection(start: number, end: number) {
        
        var posStart = this.codeDoc.posFromIndex(start);
        var posEnd = this.codeDoc.posFromIndex(end);
        this.codeDoc.setSelection(posStart, posEnd);        
    }
}
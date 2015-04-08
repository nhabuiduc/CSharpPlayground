module Playground.Cm {
    export class DiagnosticMarkedText {
        constructor(public diagnostic: Core.Diagnostic,
            public mark: CodeMirror.TextMarker,
            public start: CodeMirror.Position,
            public end: CodeMirror.Position,
            public isProcessed: boolean = false) {
        }
        public get line(): number{
            return this.start.line + 1;
        }
        public get column(): number {
            return this.start.ch + 1;
        }
        public get error(): string {
            return this.diagnostic.GetMessage();
        }
    }
}
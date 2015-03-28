module Microsoft.CodeAnalysis.CSharp {
    export class CSharpDiagnosticFormatter extends DiagnosticFormatter {
        ctor_1898(): CSharpDiagnosticFormatter {
            return this;
        }
        public static Instance: CSharpDiagnosticFormatter = new CSharpDiagnosticFormatter().ctor_1898();
        constructor() { super(); }
    }
}
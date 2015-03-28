module Microsoft.CodeAnalysis.CSharp {
    export class CSDiagnostic extends DiagnosticWithInfo {
        ctor_1858(info: DiagnosticInfo, location: Location): CSDiagnostic {
            super.ctor_3747(info, location);
            return this;
        }
        public ToString(): string {
            return CSharpDiagnosticFormatter.Instance.Format(this);
        }
        public WithLocation(location: Location): Diagnostic {
            if (location == null) {
                throw new System.ArgumentNullException("location");
            }
            if (location.op_Inequality(this.Location)) {
                return new CSDiagnostic().ctor_1858(this.Info, location);
            }
            return this;
        }
        public WithSeverity(severity: DiagnosticSeverity): Diagnostic {
            if (this.Severity != severity) {
                return new CSDiagnostic().ctor_1858(this.Info.GetInstanceWithSeverity(severity), this.Location);
            }
            return this;
        }
        constructor() { super(); }
    }
}
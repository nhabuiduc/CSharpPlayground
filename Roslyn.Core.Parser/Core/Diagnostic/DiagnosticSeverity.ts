module Microsoft.CodeAnalysis {
    export enum DiagnosticSeverity {
        Hidden = 0,
        Info = 1,
        Warning = 2,
        Error = 3
    }
    export class InternalErrorCode {
        public static Unknown: number = -1;
        public static Void: number = -2;
    }
    export class InternalDiagnosticSeverity {
        public static Unknown: DiagnosticSeverity = <DiagnosticSeverity>InternalErrorCode.Unknown;
        public static Void: DiagnosticSeverity = <DiagnosticSeverity>InternalErrorCode.Void;
    }
    
}
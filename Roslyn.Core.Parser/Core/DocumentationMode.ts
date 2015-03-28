module Microsoft.CodeAnalysis {
    export enum DocumentationMode {
        None = 0,
        Parse = 1,
        Diagnose = 2
    }
    export class DocumentationModeEnumBounds {
        public static IsValid(value: DocumentationMode): boolean {
            return value >= DocumentationMode.None && value <= DocumentationMode.Diagnose;
        }
    }
}
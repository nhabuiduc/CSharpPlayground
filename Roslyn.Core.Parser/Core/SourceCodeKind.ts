module Microsoft.CodeAnalysis {
    export enum SourceCodeKind {
        Regular = 0,
        Script = 1,
        Interactive = 2
    }
    export class SourceCodeKindExtensions {
        public static IsValid(value: SourceCodeKind): boolean {
            return value >= SourceCodeKind.Regular && value <= SourceCodeKind.Interactive;
        }
    }
}
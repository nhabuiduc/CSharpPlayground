module Microsoft.CodeAnalysis {
    export enum SyntaxRemoveOptions {
        KeepNoTrivia = 0x0,
        KeepLeadingTrivia = 0x1,
        KeepTrailingTrivia = 0x2,
        KeepExteriorTrivia = KeepLeadingTrivia | KeepTrailingTrivia,
        KeepUnbalancedDirectives = 0x4,
        KeepDirectives = 0x8,
        KeepEndOfLine = 0x10,
        AddElasticMarker = 0x20
    }
}
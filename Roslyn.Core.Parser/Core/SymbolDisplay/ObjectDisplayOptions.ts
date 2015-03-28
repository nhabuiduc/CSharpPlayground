module Microsoft.CodeAnalysis {
    export enum ObjectDisplayOptions {
        None = 0,
        IncludeCodePoints = 1 << 0,
        IncludeTypeSuffix = 1 << 1,
        UseHexadecimalNumbers = 1 << 2,
        UseQuotes = 1 << 3
    }
}
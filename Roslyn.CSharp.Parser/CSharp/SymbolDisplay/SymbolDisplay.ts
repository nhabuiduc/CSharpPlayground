module Microsoft.CodeAnalysis.CSharp {
    export class SymbolDisplay {
        public static FormatLiteral(value: string, quote: boolean): string {
            return ObjectDisplay.FormatLiteral_1258(value, quote ? ObjectDisplayOptions.UseQuotes : ObjectDisplayOptions.None);
        }
    }
}
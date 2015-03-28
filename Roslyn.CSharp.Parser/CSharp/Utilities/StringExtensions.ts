module Microsoft.CodeAnalysis.CSharp {
    export class StringExtensions {
        public static First(value: string): string {
            return value[0];
        }
        public static Last(value: string): string {
            return value[value.length - 1];
        }
    }
}
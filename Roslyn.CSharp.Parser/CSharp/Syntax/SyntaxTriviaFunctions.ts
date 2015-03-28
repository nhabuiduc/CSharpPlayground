module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxTriviaFunctions {
        public static Any: (_: SyntaxTrivia) => boolean = t => true;
        public static Skipped: (_: SyntaxTrivia) => boolean = t => CSharpExtensions.CSharpKind_4438(t) == SyntaxKind.SkippedTokensTrivia;
    }
}
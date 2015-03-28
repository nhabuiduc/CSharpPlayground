module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxNavigator extends AbstractSyntaxNavigator {
        public static Instance: AbstractSyntaxNavigator = new SyntaxNavigator();
        private static CommonSyntaxTriviaSkipped: (_: SyntaxTrivia) => boolean = t => t.RawKind == <number>SyntaxKind.SkippedTokensTrivia;
        private static StepIntoFunctions: ((_: SyntaxTrivia) => boolean)[]
        = new Array<(_: SyntaxTrivia) => boolean>(null,
            t => SyntaxFacts.IsDocumentationCommentTrivia(<SyntaxKind>t.RawKind),
            t => t.IsDirective,
            t => t.IsDirective || SyntaxFacts.IsDocumentationCommentTrivia(<SyntaxKind>t.RawKind),
            t => t.RawKind == <number>SyntaxKind.SkippedTokensTrivia,
            t => t.RawKind == <number>SyntaxKind.SkippedTokensTrivia || SyntaxFacts.IsDocumentationCommentTrivia(<SyntaxKind>t.RawKind),
            t => t.RawKind == <number>SyntaxKind.SkippedTokensTrivia || t.IsDirective,
            t => t.RawKind == <number>SyntaxKind.SkippedTokensTrivia || t.IsDirective || SyntaxFacts.IsDocumentationCommentTrivia(<SyntaxKind>t.RawKind));
        protected  GetStepIntoFunction(skipped: boolean, directives: boolean, docComments: boolean): (_: SyntaxTrivia) => boolean {
            var index = (skipped ? SyntaxNavigator.SyntaxKinds.SkippedTokens : 0) | (directives ? SyntaxNavigator.SyntaxKinds.Directives : 0) | (docComments ? SyntaxNavigator.SyntaxKinds.DocComments : 0);
            return SyntaxNavigator.StepIntoFunctions[<number>index];
        }
        public static ToCommon_1495(func: (_: SyntaxTrivia) => boolean): (_: SyntaxTrivia) => boolean {
            if (ReferenceEquals(func, SyntaxTriviaFunctions.Any)) {
                return SyntaxTrivia.Any;
            }
            if (ReferenceEquals(func, SyntaxTriviaFunctions.Skipped)) {
                return SyntaxNavigator.CommonSyntaxTriviaSkipped;
            }
            if (ReferenceEquals(func, null)) {
                return null;
            }
            return t => func(<SyntaxTrivia>t);
        }
        public static ToCommon_1089(func: (_: SyntaxToken) => boolean): (_: SyntaxToken) => boolean {
            if (ReferenceEquals(func, SyntaxToken.Any)) {
                return SyntaxToken.Any;
            }
            if (ReferenceEquals(func, SyntaxToken.NonZeroWidth)) {
                return SyntaxToken.NonZeroWidth;
            }
            if (ReferenceEquals(func, null)) {
                return null;
            }
            return t => func(<SyntaxToken>t);
        }
        constructor() { super(); }
    }
    export module SyntaxNavigator {
        export enum SyntaxKinds {
            DocComments = 1,
            Directives = 2,
            SkippedTokens = 4
        }
    }
}
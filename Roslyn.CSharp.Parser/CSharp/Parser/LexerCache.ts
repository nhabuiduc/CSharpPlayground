module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class LexerCache {
        private static keywordKindPool: Roslyn.Utilities.ObjectPool<CachingIdentityFactory<string, SyntaxKind>> = CachingIdentityFactory.CreatePool<string, SyntaxKind>(512,(key) => {
            var kind = SyntaxFacts.GetKeywordKind(key);
            if (kind == SyntaxKind.None) {
                kind = SyntaxFacts.GetContextualKeywordKind(key);
            }
            return kind;
        });
        private triviaMap: Roslyn.Utilities.TextKeyedCache<SyntaxTrivia> = null;
        private tokenMap: Roslyn.Utilities.TextKeyedCache<SyntaxToken> = null;
        private keywordKindMap: CachingIdentityFactory<string, SyntaxKind> = null;
        public static MaxKeywordLength: number = 10;
        constructor() {
            this.triviaMap = Roslyn.Utilities.TextKeyedCache.GetInstance<SyntaxTrivia>(SyntaxTrivia);
            this.tokenMap = Roslyn.Utilities.TextKeyedCache.GetInstance<SyntaxToken>(SyntaxToken);
            this.keywordKindMap = LexerCache.keywordKindPool.Allocate();
        }
        public Free(): void { 
            this.keywordKindMap.Free();
            this.triviaMap.Free();
            this.tokenMap.Free();
        }
        public TryGetKeywordKind(key: string, kind: { refObj: SyntaxKind }): boolean {
            if (key.length > LexerCache.MaxKeywordLength) {
                kind.refObj = SyntaxKind.None;
                return false;
            }
            kind.refObj = this.keywordKindMap.GetOrMakeValue(key);
            return kind.refObj != SyntaxKind.None;
        }
        public LookupTrivia(textBuffer: string[], keyStart: number, keyLength: number, hashCode: number, createTriviaFunction: () => SyntaxTrivia): SyntaxTrivia {
            var value = this.triviaMap.FindItem(textBuffer, keyStart, keyLength, hashCode);
            if (value == null) {
                value = createTriviaFunction();
                this.triviaMap.AddItem(textBuffer, keyStart, keyLength, hashCode, value);
            }
            return value;
        }
        public LookupToken(textBuffer: string[], keyStart: number, keyLength: number, hashCode: number, createTokenFunction: () => SyntaxToken): SyntaxToken {
            var value = this.tokenMap.FindItem(textBuffer, keyStart, keyLength, hashCode);
            if (value == null) {
                value = createTokenFunction();
                this.tokenMap.AddItem(textBuffer, keyStart, keyLength, hashCode, value);
            }
            else {

            }
            return value;
        }
    }
}
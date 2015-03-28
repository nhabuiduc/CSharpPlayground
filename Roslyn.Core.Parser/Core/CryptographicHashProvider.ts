module Microsoft.CodeAnalysis {
    export class CryptographicHashProvider {
        private lazySHA1Hash: System.Collections.Immutable.ImmutableArray<number> ;
        private lazySHA256Hash: System.Collections.Immutable.ImmutableArray<number> ;
        private lazySHA384Hash: System.Collections.Immutable.ImmutableArray<number> ;
        private lazySHA512Hash: System.Collections.Immutable.ImmutableArray<number> ;
        private lazyMD5Hash: System.Collections.Immutable.ImmutableArray<number> ;
        constructor() {

        }
        public static GetHashSize(algorithmId: Microsoft.CodeAnalysis.Text.SourceHashAlgorithm): number {
            switch (algorithmId) {
                case Microsoft.CodeAnalysis.Text.SourceHashAlgorithm.Sha1:
                    return (160 / 8 | 0);
                case Microsoft.CodeAnalysis.Text.SourceHashAlgorithm.Sha256:
                    return (256 / 8 | 0);
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(algorithmId);
            }
        }
        public static Sha1HashSize: number = 20;
    }
}
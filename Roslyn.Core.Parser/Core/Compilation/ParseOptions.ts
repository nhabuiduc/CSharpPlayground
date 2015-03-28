module Microsoft.CodeAnalysis {
    export class ParseOptions {
        public Kind: SourceCodeKind = 0;
        public DocumentationMode: DocumentationMode = 0;
        ctor_2205(kind: SourceCodeKind, documentationMode: DocumentationMode): ParseOptions {
            this.Kind = kind;
            this.DocumentationMode = documentationMode;
            return this;
        }
        public WithKind(kind: SourceCodeKind): ParseOptions {
            return this.CommonWithKind(kind);
        }
        protected  CommonWithKind(kind: SourceCodeKind): ParseOptions { throw new Error('not implemented'); }
        public WithDocumentationMode(documentationMode: DocumentationMode): ParseOptions {
            return this.CommonWithDocumentationMode(documentationMode);
        }
        protected  CommonWithDocumentationMode(documentationMode: DocumentationMode): ParseOptions { throw new Error('not implemented'); }
        public WithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): ParseOptions {
            return this.CommonWithFeatures(features);
        }
        protected  CommonWithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): ParseOptions { throw new Error('not implemented'); }
        public Features: System.Collections.Generic.IReadOnlyDictionary<string, string>;
        public PreprocessorSymbolNames: System.Collections.Generic.IEnumerable<string>;
        public Equals(obj: Object): boolean { throw new Error('not implemented'); }
        protected EqualsHelper(other: ParseOptions): boolean {
            if (ReferenceEquals(other, null)) {
                return false;
            }
            return this.Kind == other.Kind && this.DocumentationMode == other.DocumentationMode && System.Linq.Enumerable.SequenceEqual(this.Features,
                other.Features) && (this.PreprocessorSymbolNames == null ? other.PreprocessorSymbolNames == null : System.Linq.Enumerable.SequenceEqual(this.PreprocessorSymbolNames,
                    other.PreprocessorSymbolNames, System.StringComparer.Ordinal));
        }
        public GetHashCode(): number { throw new Error('not implemented'); }
        protected GetHashCodeHelper(): number {
            return Roslyn.Utilities.Hash.Combine_1641(<number>this.Kind, Roslyn.Utilities.Hash.Combine_1641(<number>this.DocumentationMode, Roslyn.Utilities.Hash.Combine_1641(this.HashFeatures(this.Features), Roslyn.Utilities.Hash.Combine_1641(Roslyn.Utilities.Hash.CombineValues_1752(this.PreprocessorSymbolNames, System.StringComparer.Ordinal), 0))));
        }
        private HashFeatures(features: System.Collections.Generic.IReadOnlyDictionary<string, string>): number {
            var value: number = 0;
            // for each
            var kvEnumerator = features.GetEnumerator();
            try {
                while (kvEnumerator.MoveNext()) {
                    var kv = kvEnumerator.Current;
                    // foreach block
                    value = Roslyn.Utilities.Hash.Combine_1641(
                        kv.Key.GetHashCode(),
                        Roslyn.Utilities.Hash.Combine_1641(kv.Value.GetHashCode(), value));
                }
            } finally {
                if (kvEnumerator !== null) kvEnumerator.Dispose();

            }    
            // end foreach
            return value;
        }
        public op_Equality(right: ParseOptions): boolean {
            var left = this;
            return left== right;
        }

        public op_Inequality(right: ParseOptions): boolean {
            var left = this;
            return left!= right;
        }

        constructor() { }
    }
}
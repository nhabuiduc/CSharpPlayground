///<reference path="LanguageVersion.ts"/>
module Microsoft.CodeAnalysis.CSharp {
    export class CSharpParseOptions extends ParseOptions implements System.IEquatable<CSharpParseOptions>
    {
        public static Default: CSharpParseOptions = new CSharpParseOptions().ctor_2554();
        public LanguageVersion: LanguageVersion = 0;
        public PreprocessorSymbols: System.Collections.Immutable.ImmutableArray<string> = structDefault(System.Collections.Immutable.ImmutableArray);
        public get PreprocessorSymbolNames(): System.Collections.Generic.IEnumerable<string> {
            return this.PreprocessorSymbols;
        }
        ctor_2554(languageVersion: LanguageVersion = LanguageVersion.CSharp6, documentationMode: DocumentationMode = DocumentationMode.Parse, kind: SourceCodeKind = SourceCodeKind.Regular, preprocessorSymbols: System.Collections.Generic.IEnumerable<string> = null): CSharpParseOptions {
            this.ctor_1112(languageVersion, documentationMode, kind, Roslyn.Utilities.ImmutableArrayExtensions.ToImmutableArrayOrEmpty_1553(preprocessorSymbols));
            if (!LanguageVersionExtensions.IsValid(languageVersion)) {
                throw new System.ArgumentOutOfRangeException("languageVersion");
            }
            if (!SourceCodeKindExtensions.IsValid(kind)) {
                throw new System.ArgumentOutOfRangeException("kind");
            }
            if (preprocessorSymbols != null) {
                // for each
                var preprocessorSymbolEnumerator = preprocessorSymbols.GetEnumerator();
                try {
                    while (preprocessorSymbolEnumerator.MoveNext()) {
                        var preprocessorSymbol = preprocessorSymbolEnumerator.Current;
                        // foreach block
                        if (!SyntaxFacts.IsValidIdentifier(preprocessorSymbol)) {
                            throw new System.ArgumentException("preprocessorSymbols");
                        }
                    }
                } finally {
                    if (preprocessorSymbolEnumerator !== null) preprocessorSymbolEnumerator.Dispose();

                }    
                // end foreach
            }
            return this;
        }
        ctor_2353(other: CSharpParseOptions): CSharpParseOptions {
            this.ctor_1112(/*languageVersion:*/other.LanguageVersion,/*documentationMode:*/other.DocumentationMode,/*kind:*/other.Kind,/*preprocessorSymbols:*/other.PreprocessorSymbols);
            return this;
        }
        ctor_1112(languageVersion: LanguageVersion, documentationMode: DocumentationMode, kind: SourceCodeKind, preprocessorSymbols: System.Collections.Immutable.ImmutableArray<string>): CSharpParseOptions {
            super.ctor_2205(kind, documentationMode);
            System.Diagnostics.Debug.Assert(!preprocessorSymbols.IsDefault);
            this.LanguageVersion = languageVersion;
            this.PreprocessorSymbols = preprocessorSymbols;
            return this;
        }
        public WithKind(kind: SourceCodeKind): CSharpParseOptions {
            if (kind == this.Kind) {
                return this;
            }
            if (!SourceCodeKindExtensions.IsValid(kind)) {
                throw new System.ArgumentOutOfRangeException("kind");
            }
            return __init(new CSharpParseOptions().ctor_2353(this), { Kind: kind });
        }
        public WithLanguageVersion(version: LanguageVersion): CSharpParseOptions {
            if (version == this.LanguageVersion) {
                return this;
            }
            if (!LanguageVersionExtensions.IsValid(version)) {
                throw new System.ArgumentOutOfRangeException("version");
            }
            return __init(new CSharpParseOptions().ctor_2353(this), { LanguageVersion: version });
        }
        public WithPreprocessorSymbols_2136(preprocessorSymbols: System.Collections.Generic.IEnumerable<string>): CSharpParseOptions {
            return this.WithPreprocessorSymbols_1926(ImmutableArrayExtensions.AsImmutableOrNull_2024(preprocessorSymbols));
        }
        public WithPreprocessorSymbols_1878(...preprocessorSymbols: string[]): CSharpParseOptions {
            return this.WithPreprocessorSymbols_1926(System.Collections.Immutable.ImmutableArray.Create<string>(preprocessorSymbols));
        }
        public WithPreprocessorSymbols_1926(symbols: System.Collections.Immutable.ImmutableArray<string>): CSharpParseOptions {
            if (symbols.IsDefault) {
                symbols = System.Collections.Immutable.ImmutableArray.Empty;
            }
            if (symbols==this.PreprocessorSymbols) {
                return this;
            }
            return __init(new CSharpParseOptions().ctor_2353(this), { PreprocessorSymbols: symbols });
        }
        public WithDocumentationMode(documentationMode: DocumentationMode): CSharpParseOptions {
            if (documentationMode == this.DocumentationMode) {
                return this;
            }
            if (!DocumentationModeEnumBounds.IsValid(documentationMode)) {
                throw new System.ArgumentOutOfRangeException("documentationMode");
            }
            return __init(new CSharpParseOptions().ctor_2353(this), { DocumentationMode: documentationMode });
        }
        protected  CommonWithKind(kind: SourceCodeKind): ParseOptions {
            return this.WithKind(kind);
        }
        protected  CommonWithDocumentationMode(documentationMode: DocumentationMode): ParseOptions {
            return this.WithDocumentationMode(documentationMode);
        }
        protected  CommonWithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): ParseOptions {
            return this.WithFeatures(features);
        }
        public WithFeatures(features: System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, string>>): CSharpParseOptions {
            if (features == null) {
                throw new System.ArgumentNullException('features');
            }
            if (System.Linq.Enumerable.Any(features)) {
                throw new System.ArgumentException("Experimental features are not supported", 'features');
            }
            return this;
        }
        public get Features(): System.Collections.Generic.IReadOnlyDictionary<string, string> {
            return new System.Collections.Generic.Dictionary<string, string>();
        }
        public Equals(obj: Object): boolean {
            return this.Equals_1428(__as__<CSharpParseOptions>(obj, CSharpParseOptions));
        }
        public Equals_1428(other: CSharpParseOptions): boolean {
            if (ReferenceEquals(this, other)) {
                return true;
            }
            if (!super.EqualsHelper(other)) {
                return false;
            }
            return this.LanguageVersion == other.LanguageVersion;
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(super.GetHashCodeHelper(), Roslyn.Utilities.Hash.Combine_1641(<number>this.LanguageVersion, 0));
        }
        constructor() { super(); }
    }
}
module Microsoft.CodeAnalysis {
    export class DiagnosticDescriptor {
        public Id: string;
        public Title: LocalizableString;
        public Description: LocalizableString;
        public HelpLink: string;
        public MessageFormat: LocalizableString;
        public Category: string;
        public DefaultSeverity: DiagnosticSeverity = 0;
        public IsEnabledByDefault: boolean = false;
        public CustomTags: System.Collections.Generic.IEnumerable<string>;
        ctor_1011(id: string, title: string, messageFormat: string, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description: string = null, helpLink: string = null, ...customTags: string[]): DiagnosticDescriptor {
            this.ctor_3991(id, LocalizableString.op_Implicit_1404(title), LocalizableString.op_Implicit_1404(messageFormat), category, defaultSeverity, isEnabledByDefault, LocalizableString.op_Implicit_1404(description), helpLink, ImmutableArrayExtensions.AsImmutableOrEmpty_1316(customTags));
            return this;
        }
        ctor_1931(id: string, title: LocalizableString, messageFormat: LocalizableString, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description: LocalizableString = null, helpLink: string = null, ...customTags: string[]): DiagnosticDescriptor {
            this.ctor_3991(id, title, messageFormat, category, defaultSeverity, isEnabledByDefault, description, helpLink, ImmutableArrayExtensions.AsImmutableOrEmpty_1316(customTags));
            return this;
        }
        ctor_3991(id: string, title: LocalizableString, messageFormat: LocalizableString, category: string, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, description: LocalizableString, helpLink: string, customTags: System.Collections.Immutable.ImmutableArray<string>): DiagnosticDescriptor {
            if (System.String.IsNullOrWhiteSpace(id)) {
                throw new System.ArgumentException(CodeAnalysisResources.DiagnosticIdCantBeNullOrWhitespace, 'id');
            }
            if (messageFormat == null) {
                throw new System.ArgumentNullException('messageFormat');
            }
            if (category == null) {
                throw new System.ArgumentNullException('category');
            }
            if (title == null) {
                throw new System.ArgumentNullException('title');
            }
            this.Id = id;
            this.Title = title;
            this.Category = category;
            this.MessageFormat = messageFormat;
            this.DefaultSeverity = defaultSeverity;
            this.IsEnabledByDefault = isEnabledByDefault;
            this.Description = description != null ? description : LocalizableString.op_Implicit_1404(System.String.Empty);
            this.HelpLink = helpLink != null ? helpLink : System.String.Empty;
            this.CustomTags = ImmutableArrayExtensions.AsImmutableOrEmpty_1620<string>(customTags);
            return this;
        }
        public Equals(obj: Object): boolean {
            var other = __as__<DiagnosticDescriptor>(obj, DiagnosticDescriptor);
            return other != null && this.Category == other.Category && this.DefaultSeverity == other.DefaultSeverity && this.Description == other.Description && this.HelpLink == other.HelpLink && this.Id == other.Id && this.IsEnabledByDefault == other.IsEnabledByDefault && this.MessageFormat == other.MessageFormat && this.Title == other.Title;
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(
                this.Category.GetHashCode(),
                Roslyn.Utilities.Hash.Combine_1641(
                    this.DefaultSeverity.GetHashCode(),
                    Roslyn.Utilities.Hash.Combine_1641(
                        this.Description.GetHashCode(),
                        Roslyn.Utilities.Hash.Combine_1641(
                            this.HelpLink.GetHashCode(),
                            Roslyn.Utilities.Hash.Combine_1641(
                                this.Id.GetHashCode(),
                                Roslyn.Utilities.Hash.Combine_1641(
                                    this.IsEnabledByDefault.GetHashCode(),
                                    Roslyn.Utilities.Hash.Combine_1641(
                                        this.MessageFormat.GetHashCode(),
                                        this.Title.GetHashCode())))))));
        }
        public IsNotConfigurable_1344(): boolean {
            return DiagnosticDescriptor.IsNotConfigurable_2122(this.CustomTags);
        }
        public static IsNotConfigurable_2122(customTags: System.Collections.Generic.IEnumerable<string>): boolean {
            // for each
            var customTagEnumerator = customTags.GetEnumerator();

            while (customTagEnumerator.MoveNext()) {
                var customTag = customTagEnumerator.Current;
                // foreach block
                if (customTag == WellKnownDiagnosticTags.NotConfigurable) {
                    return true;
                }
            }    
            // end foreach
            return false;
        }
        constructor() { }
    }
}
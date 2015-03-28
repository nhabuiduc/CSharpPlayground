module Microsoft.CodeAnalysis {
    export class Diagnostic implements System.IEquatable<Diagnostic>, System.IFormattable {
        public static CompilerDiagnosticCategory: string = "Compiler";
        public static HighestValidWarningLevel: number = 4;
        public static Create_2896(descriptor: DiagnosticDescriptor, location: Location, ...messageArgs: Object[]): Diagnostic {
            return Diagnostic.Create_1146(descriptor, location, null, messageArgs);
        }
        public static Create_1146(descriptor: DiagnosticDescriptor, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, ...messageArgs: Object[]): Diagnostic {
            if (descriptor == null) {
                throw new System.ArgumentNullException("descriptor");
            }
            var warningLevel = Diagnostic.GetDefaultWarningLevel(descriptor.DefaultSeverity);
            return Diagnostic.SimpleDiagnostic.Create_1471(descriptor,/*severity:*/descriptor.DefaultSeverity,/*warningLevel:*/warningLevel,/*location:*/location != null ? location : Location.None,/*additionalLocations:*/additionalLocations,/*messageArgs:*/messageArgs);
        }
        public static Create_1175(id: string, category: string, message: LocalizableString, severity: DiagnosticSeverity, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, warningLevel: number, title: LocalizableString = null, description: LocalizableString = null, helpLink: string = null, location: Location = null, additionalLocations: System.Collections.Generic.IEnumerable<Location> = null, customTags: System.Collections.Generic.IEnumerable<string> = null): Diagnostic {
            if (id == null) {
                throw new System.ArgumentNullException("id");
            }
            if (category == null) {
                throw new System.ArgumentNullException("category");
            }
            if (message == null) {
                throw new System.ArgumentNullException("message");
            }
            return Diagnostic.SimpleDiagnostic.Create_3980(id, title != null ? title : LocalizableString.op_Implicit_1404(System.String.Empty), category, message, description != null ? description : LocalizableString.op_Implicit_1404(System.String.Empty), helpLink != null ? helpLink : System.String.Empty, severity, defaultSeverity, isEnabledByDefault, warningLevel, location != null ? location : Location.None, additionalLocations, customTags);
        }
        public static Create_2350(messageProvider: CommonMessageProvider, errorCode: number): Diagnostic {
            return Diagnostic.Create_1806(new DiagnosticInfo().ctor_9510(messageProvider, errorCode));
        }
        public static Create_1351(messageProvider: CommonMessageProvider, errorCode: number, ...argumentsRest: Object[]): Diagnostic {
            return Diagnostic.Create_1806(new DiagnosticInfo().ctor_4145(messageProvider, errorCode, argumentsRest));
        }
        public static Create_1806(info: DiagnosticInfo): Diagnostic {
            return new DiagnosticWithInfo().ctor_3747(info, Location.None);
        }
        public Descriptor: DiagnosticDescriptor;
        public Id: string;
        public get Category(): string {
            return this.Descriptor.Category;
        }
        public GetMessage(formatProvider: System.IFormatProvider = null): string { throw new Error('not implemented'); }
        public get DefaultSeverity(): DiagnosticSeverity {
            return this.Descriptor.DefaultSeverity;
        }
        public Severity: DiagnosticSeverity;
        public WarningLevel: number;
        public get IsEnabledByDefault(): boolean {
            return this.Descriptor.IsEnabledByDefault;
        }
        public get IsWarningAsError(): boolean {
            return this.DefaultSeverity == DiagnosticSeverity.Warning && this.Severity == DiagnosticSeverity.Error;
        }
        public Location: Location;
        public AdditionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
        public get CustomTags(): System.Collections.Generic.IReadOnlyList<string> {
            return <System.Collections.Generic.IReadOnlyList<string>>this.Descriptor.CustomTags;
        }
        ToString(ignored?: string, formatProvider?: System.IFormatProvider): string {
            if (formatProvider === void 0) {
                formatProvider = System.Globalization.CultureInfo.CurrentUICulture;
            }
            return DiagnosticFormatter.Instance.Format(this, formatProvider);
        }
        //public ToString(): string {
        //    return DiagnosticFormatter.Instance.Format(this, System.Globalization.CultureInfo.CurrentUICulture);
        //}
        public Equals(obj: Object): boolean { throw new Error('not implemented'); }
        public GetHashCode(): number { throw new Error('not implemented'); }
        public Equals_8787(obj: Diagnostic): boolean { throw new Error('not implemented'); }
        //private GetDebuggerDisplay(): string {
        //    switch (this.Severity) {
        //        case InternalDiagnosticSeverity.Unknown:
        //            return "Unresolved diagnostic at " + this.Location;
        //        case InternalDiagnosticSeverity.Void:
        //            return "Void diagnostic at " + this.Location;
        //        default:
        //            return this.ToString();
        //    }
        //}
        public WithLocation(location: Location): Diagnostic { throw new Error('not implemented'); }
        public WithSeverity(severity: DiagnosticSeverity): Diagnostic { throw new Error('not implemented'); }
        public get Code(): number {
            return 0;
        }
        public get Arguments(): System.Collections.Generic.IReadOnlyList<Object> {
            return Roslyn.Utilities.SpecializedCollections.EmptyReadOnlyList<Object>();
        }
        public ContainsLocation(tree: SyntaxTree, filterSpanWithinTree: Text.TextSpan = null): boolean {
            var locations = this.GetDiagnosticLocationsWithinTree(tree);
            // for each
            var locationEnumerator = locations.GetEnumerator();

            while (locationEnumerator.MoveNext()) {
                var location = locationEnumerator.Current;
                // foreach block
                if (filterSpanWithinTree==null || filterSpanWithinTree.Contains_1915(location.SourceSpan)) {
                    return true;
                }
            }    
            // end foreach
            return false;
        }
        private GetDiagnosticLocationsWithinTree(tree: SyntaxTree): System.Collections.Generic.IEnumerable<Location> {
            var __result = new Array<Location>();
            if (this.Location.SourceTree == tree) {
                __result.push(this.Location);
                //yield return this.Location;
            }
            if (this.AdditionalLocations != null) {
                // for each
                var additionalLocationEnumerator = this.AdditionalLocations.GetEnumerator();

                while (additionalLocationEnumerator.MoveNext()) {
                    var additionalLocation = additionalLocationEnumerator.Current;
                    // foreach block
                    if (additionalLocation.SourceTree == tree) {
                        __result.push(additionalLocation);
                        //yield return additionalLocation;
                    }
                }    
                // end foreach
            }
            return __result;
        }
        public WithReportDiagnostic(reportAction: ReportDiagnostic): Diagnostic {
            switch (reportAction) {
                case ReportDiagnostic.Suppress:
                    return null;
                case ReportDiagnostic.Error:
                    return this.WithSeverity(DiagnosticSeverity.Error);
                case ReportDiagnostic.Default:
                    return this;
                case ReportDiagnostic.Warn:
                    return this.WithSeverity(DiagnosticSeverity.Warning);
                case ReportDiagnostic.Info:
                    return this.WithSeverity(DiagnosticSeverity.Info);
                case ReportDiagnostic.Hidden:
                    return this.WithSeverity(DiagnosticSeverity.Hidden);
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(reportAction);
            }
        }
        public static GetDefaultWarningLevel(severity: DiagnosticSeverity): number {
            switch (severity) {
                case DiagnosticSeverity.Error:
                    return 0;
                case DiagnosticSeverity.Warning:
                    return 1;
                default:
                    return Diagnostic.HighestValidWarningLevel;
            }
        }
        public IsNotConfigurable(): boolean {
            return DiagnosticDescriptor.IsNotConfigurable_2122(this.CustomTags);
        }
        constructor() { }
    }

    export module Diagnostic {
        export class SimpleDiagnostic extends Diagnostic {
            private descriptor: DiagnosticDescriptor;
            private severity: DiagnosticSeverity = 0;
            private warningLevel: number = 0;
            private location: Location;
            private additionalLocations: System.Collections.Generic.IReadOnlyList<Location>;
            private messageArgs: Object[];
            ctor_1463(descriptor: DiagnosticDescriptor, severity: DiagnosticSeverity, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, messageArgs: Object[]): SimpleDiagnostic {
                if ((warningLevel == 0 && severity != DiagnosticSeverity.Error) || (warningLevel != 0 && severity == DiagnosticSeverity.Error)) {
                    throw new System.ArgumentException("warningLevel");
                }
                this.descriptor = descriptor;
                this.severity = severity;
                this.warningLevel = warningLevel;
                this.location = location;
                this.additionalLocations = additionalLocations == null ? Roslyn.Utilities.SpecializedCollections.EmptyReadOnlyList<Location>() : System.Collections.Immutable.ImmutableArray.ToImmutableArray(additionalLocations);
                this.messageArgs = messageArgs != null ? messageArgs : Roslyn.Utilities.SpecializedCollections.EmptyArray<Object>();
                return this;
            }
            public static Create_1471(descriptor: DiagnosticDescriptor, severity: DiagnosticSeverity, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, messageArgs: Object[]): SimpleDiagnostic {
                return new SimpleDiagnostic().ctor_1463(descriptor, severity, warningLevel, location, additionalLocations, messageArgs);
            }
            public static Create_3980(id: string, title: LocalizableString, category: string, message: LocalizableString, description: LocalizableString, helpLink: string, severity: DiagnosticSeverity, defaultSeverity: DiagnosticSeverity, isEnabledByDefault: boolean, warningLevel: number, location: Location, additionalLocations: System.Collections.Generic.IEnumerable<Location>, customTags: System.Collections.Generic.IEnumerable<string>): SimpleDiagnostic {
                var descriptor = new DiagnosticDescriptor().ctor_3991(id, title, message, category, defaultSeverity, isEnabledByDefault, description, helpLink, Roslyn.Utilities.ImmutableArrayExtensions.ToImmutableArrayOrEmpty_1553(customTags));
                return new SimpleDiagnostic().ctor_1463(descriptor, severity, warningLevel, location, additionalLocations,/*messageArgs:*/null);
            }
            public get Descriptor(): DiagnosticDescriptor {
                return this.descriptor;
            }
            public get Id(): string {
                return this.descriptor.Id;
            }
            public GetMessage(formatProvider: System.IFormatProvider = null): string {
                if (this.messageArgs.length == 0) {
                    return this.descriptor.MessageFormat.ToString_1106(formatProvider);
                }
                var localizedMessageFormat = this.descriptor.MessageFormat.ToString_1106(formatProvider);
                return System.String.Format(formatProvider, localizedMessageFormat, this.messageArgs);
            }
            public get Arguments(): System.Collections.Generic.IReadOnlyList<Object> {
                return this.messageArgs;
            }
            public get Severity(): DiagnosticSeverity {
                return this.severity;
            }
            public get WarningLevel(): number {
                return this.warningLevel;
            }
            public get Location(): Location {
                return this.location;
            }
            public get AdditionalLocations(): System.Collections.Generic.IReadOnlyList<Location> {
                return this.additionalLocations;
            }
            public Equals_8787(obj: Diagnostic): boolean {
                var other = __as__<SimpleDiagnostic>(obj, SimpleDiagnostic);
                return other != null && this.descriptor == other.descriptor && Roslyn.Utilities.EnumerableExtensions.SequenceEqual(this.messageArgs,
                    other.messageArgs,(a, b) => a == b) && this.location.op_Equality(other.location) && this.severity == other.severity && this.warningLevel == other.warningLevel;
            }
            public Equals(obj: Object): boolean {
                return this.Equals_8787(__as__<Diagnostic>(obj, Diagnostic));
            }
            public GetHashCode(): number {
                return Roslyn.Utilities.Hash.Combine_7656(
                    this.descriptor, Roslyn.Utilities.Hash.Combine_1641(
                        this.messageArgs.GetHashCode(),
                        Roslyn.Utilities.Hash.Combine_1641(
                            this.location.GetHashCode(),
                            Roslyn.Utilities.Hash.Combine_1641(
                                this.severity.GetHashCode(), this.warningLevel))));
            }
            public WithLocation(location: Location): Diagnostic {
                if (location == null) {
                    throw new System.ArgumentNullException("location");
                }
                if (location.op_Inequality(this.location)) {
                    return new SimpleDiagnostic().ctor_1463(this.descriptor, this.severity, this.warningLevel, location, this.additionalLocations, this.messageArgs);
                }
                return this;
            }
            public WithSeverity(severity: DiagnosticSeverity): Diagnostic {
                if (this.Severity != severity) {
                    var warningLevel = SimpleDiagnostic.GetDefaultWarningLevel(severity);
                    return new SimpleDiagnostic().ctor_1463(this.descriptor, severity, warningLevel, this.location, this.additionalLocations, this.messageArgs);
                }
                return this;
            }
            constructor() { super(); }
        }
    }
}
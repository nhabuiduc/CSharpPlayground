/// <reference path="Diagnostic.ts" />
//// <reference path="../../../System/Collections/Immutable/ImmutableArray.ts" />
/// <reference path="WellKnownDiagnosticTags.ts" />
module Microsoft.CodeAnalysis {
    export class DiagnosticWithInfo extends Diagnostic {
        private info: DiagnosticInfo;
        private location: Location;
        ctor_3747(info: DiagnosticInfo, location: Location): DiagnosticWithInfo {
            System.Diagnostics.Debug.Assert(info != null);
            System.Diagnostics.Debug.Assert(location != null);
            this.info = info;
            this.location = location;
            return this;
        }
        public get Location(): Location {
            return this.location;
        }
        public get AdditionalLocations(): System.Collections.Generic.IReadOnlyList<Location> {
            return this.Info.AdditionalLocations;
        }
        public get CustomTags(): System.Collections.Generic.IReadOnlyList<string> {
            return this.Info.CustomTags;
        }
        public get Descriptor(): DiagnosticDescriptor {
            return this.Info.Descriptor;
        }
        public get Id(): string {
            return this.Info.MessageIdentifier;
        }
        public get Category(): string {
            return this.Info.Category;
        }
        public get Code(): number {
            return this.Info.Code;
        }
        public get Severity(): DiagnosticSeverity {
            return this.Info.Severity;
        }
        public get DefaultSeverity(): DiagnosticSeverity {
            return this.Info.DefaultSeverity;
        }
        public get IsEnabledByDefault(): boolean {
            return true;
        }
        public get WarningLevel(): number {
            return this.Info.WarningLevel;
        }
        public GetMessage(formatProvider: System.IFormatProvider = null): string {
            return this.Info.GetMessage(formatProvider);
        }
        public get Arguments(): System.Collections.Generic.IReadOnlyList<Object> {
            return this.Info.Arguments;
        }
        public get Info(): DiagnosticInfo {
            if (this.info.Severity == InternalDiagnosticSeverity.Unknown) {
                return this.info.GetResolvedInfo();
            }
            return this.info;
        }
        public get HasLazyInfo(): boolean {
            return this.info.Severity == InternalDiagnosticSeverity.Unknown || this.info.Severity == InternalDiagnosticSeverity.Void;
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.Location.GetHashCode(), this.Info.GetHashCode());
        }
        public Equals(obj: Object): boolean {
            return this.Equals_8787(__as__<Diagnostic>(obj, Diagnostic));
        }
        public Equals_8787(obj: Diagnostic): boolean {
            if (this == obj) {
                return true;
            }
            var other = __as__<DiagnosticWithInfo>(obj, DiagnosticWithInfo);
            if (other == null || __classOf(this) != __classOf(other)) {
                return false;
            }
            return this.Location.Equals(other.location) && this.Info.Equals(other.Info) && System.Linq.Enumerable.SequenceEqual(this.AdditionalLocations,
                other.AdditionalLocations);
        }
        //private GetDebuggerDisplay(): string {
        //    switch (this.info.Severity) {
        //        case InternalDiagnosticSeverity.Unknown:
        //            return "Unresolved diagnostic at " + this.Location;
        //        case InternalDiagnosticSeverity.Void:
        //            return "Void diagnostic at " + this.Location;
        //        default:
        //            return this.ToString();
        //    }
        //}
        public WithLocation(location: Location): Diagnostic {
            if (location == null) {
                throw new System.ArgumentNullException("location");
            }
            if (location.op_Inequality(this.location)) {
                return new DiagnosticWithInfo().ctor_3747(this.info, location);
            }
            return this;
        }
        public WithSeverity(severity: DiagnosticSeverity): Diagnostic {
            if (this.Severity != severity) {
                return new DiagnosticWithInfo().ctor_3747(this.Info.GetInstanceWithSeverity(severity), this.location);
            }
            return this;
        }
        public IsNotConfigurable(): boolean {
            return this.Info.IsNotConfigurable();
        }
        constructor() { super(); }
    }
}
module Microsoft.CodeAnalysis {
    export class CommonDiagnosticComparer implements System.Collections.Generic.IEqualityComparer<Diagnostic>
    {
        public Equals(x: Diagnostic, y: Diagnostic): boolean {
            if (ReferenceEquals(x, y)) {
                return true;
            }
            if (x == null || y == null) {
                return false;
            }
            return x.Location.op_Equality(y.Location) && x.Id == y.Id;
        }
        public GetHashCode(obj: Diagnostic): number {
            if (ReferenceEquals(obj, null)) {
                return 0;
            }
            return Roslyn.Utilities.Hash.Combine_7656(obj.Location, obj.Id.GetHashCode());
        }
        constructor() { }
    }
}
module System.Linq {
    export class ImmutableArrayExtensions {
        public static SequenceEqual<TDerived>(immutableArray: Collections.Immutable.ImmutableArray<TDerived>, items: Collections.Immutable.ImmutableArray<TDerived>, comparer: Collections.Generic.IEqualityComparer<TDerived> = null): boolean {
            if (immutableArray == null) {
                throw new System.ArgumentNullException();
            }
            if (items == null) {
                throw new System.ArgumentNullException();
            }

            if (ReferenceEquals(immutableArray.array, items.array)) {
                return true;
            }
            if (immutableArray.Length != items.Length) {
                return false;
            }
            if (comparer == null) {
                comparer = Collections.Generic.EqualityComparer.Default;
            }
            for (var i: number = 0; i < immutableArray.Length; i++) {
                if (!comparer.Equals(immutableArray.array[i], items.array[i])) {
                    return false;
                }
            }
            return true;
        }
    }
}
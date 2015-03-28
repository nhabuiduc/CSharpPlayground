module Roslyn.Utilities.G3 {
    export class ValueTuple<T1, T2, T3> implements System.IEquatable<ValueTuple<T1, T2, T3>>, IStruct {
        private static comparer1: System.Collections.Generic.EqualityComparer<any> = System.Collections.Generic.EqualityComparer.Default;
        private static comparer2: System.Collections.Generic.EqualityComparer<any> = System.Collections.Generic.EqualityComparer.Default;
        private static comparer3: System.Collections.Generic.EqualityComparer<any> = System.Collections.Generic.EqualityComparer.Default;
        public Item1: T1;
        public Item2: T2;
        public Item3: T3;
        ctor_1594(item1: T1, item2: T2, item3: T3): ValueTuple<T1, T2, T3> {
            this.Item1 = item1;
            this.Item2 = item2;
            this.Item3 = item3;
            return this;
        }
        public Equals_1335(other: ValueTuple<T1, T2, T3>): boolean {
            return ValueTuple.comparer1.Equals(this.Item1, other.Item1) && ValueTuple.comparer2.Equals(this.Item2, other.Item2) && ValueTuple.comparer3.Equals(this.Item3, other.Item3);
        }
        public Equals(obj: Object): boolean {
            return this.Equals_1491(obj);
        }
        public Equals_1491(obj: Object): boolean {
            if (obj instanceof ValueTuple) {
                var other = <ValueTuple<T1, T2, T3>>obj;
                return this.Equals_1335(other);
            }
            return false;
        }
        public GetHashCode(): number {
            return Hash.Combine_1641(Hash.Combine_1641(ValueTuple.comparer1.GetHashCode(this.Item1), ValueTuple.comparer2.GetHashCode(this.Item2)), ValueTuple.comparer3.GetHashCode(this.Item3));
        }
        public op_Equality(right: ValueTuple<T1, T2, T3>): boolean {
            var left = this;
            return left.Equals_1335(right);
        }

        public op_Inequality(right: ValueTuple<T1, T2, T3>): boolean {
            var left = this;
            return !left.Equals_1335(right);
        }

        constructor() { }
    }
}
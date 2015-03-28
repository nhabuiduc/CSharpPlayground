module Roslyn.Utilities.G2 {
    export class ValueTuple<T1, T2> implements System.IEquatable<ValueTuple<T1, T2>>, IStruct {
        private static comparer1: System.Collections.Generic.EqualityComparer<any> = System.Collections.Generic.EqualityComparer.Default;
        private static comparer2: System.Collections.Generic.EqualityComparer<any> = System.Collections.Generic.EqualityComparer.Default;
        public Item1: T1;
        public Item2: T2;
        ctor_6194(item1: T1, item2: T2): ValueTuple<T1, T2> {
            this.Item1 = item1;
            this.Item2 = item2;
            return this;
        }
        public Equals_5155(other: ValueTuple<T1, T2>): boolean {
            return ValueTuple.comparer1.Equals(this.Item1, other.Item1) && ValueTuple.comparer2.Equals(this.Item2, other.Item2);
        }
        public Equals(obj: Object): boolean {
            return this.Equals_1491(obj);
        }
        public Equals_1491(obj: Object): boolean {
            if (obj instanceof ValueTuple) {
                var other = <ValueTuple<T1, T2>>obj;
                return this.Equals_5155(other);
            }
            return false;
        }
        public GetHashCode(): number {
            return Hash.Combine_1641(ValueTuple.comparer1.GetHashCode(this.Item1), ValueTuple.comparer2.GetHashCode(this.Item2));
        }
        public op_Equality(right: ValueTuple<T1, T2>): boolean {
            var left = this;
            return left.Equals_5155(right);
        }

        public op_Inequality(right: ValueTuple<T1, T2>): boolean {
            var left = this;
            return !left.Equals_5155(right);
        }

        constructor() { }
    }
}
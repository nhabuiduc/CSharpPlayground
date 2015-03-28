module System.Collections.Generic {
    export class Comparer<T> implements System.Collections.IComparer, IComparer<T>
    {
        public static defaultComparer: Comparer<any> = null;
        public static get Default(): Comparer<any> {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<Comparer<T>>() != null);
            var comparer: Comparer<any> = Comparer.defaultComparer;
            if (comparer == null) {
                comparer = Comparer.CreateComparer();
                Comparer.defaultComparer = comparer;
            }
            return comparer;
        }
        public static Create<T>(comparison: (_: T, __: T) => number): Comparer<T> {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<Comparer<T>>() != null);
            //if (comparison == null)
            //    throw new ArgumentNullException("comparison");
            return new ComparisonComparer<T>(comparison);
        }
        private static CreateComparer<T>(): Comparer<T> {

            return new ObjectComparer<T>();
        }
        public Compare(x: Object, y: Object): number;
        public Compare(x: T, y: T): number;
        Compare(x: any, y: any): number {
            throw new NotSupportedException();
            //if (x == null)
            //    return y == null ? 0 : -1;
            //if (y == null)
            //    return 1;

        }
        //private Compare_overload0(x: Object, y: Object): number {
           

        //    return this.Compare(<T>x, <T>y);
        //    //ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidArgumentForComparison);
        //    return 0;
        //}
    }
    //export class GenericComparer<T> implements Comparer<T> //where T: IComparable<T>
    //{
    //    public Compare(x: T, y: T): number {
    //        if (x != null) {
    //            if (y != null)
    //                return (<System.Generic.IComparable<T>><any>x).CompareTo(y);
    //            return 1;
    //        }
    //        if (y != null)
    //            return -1;
    //        return 0;
    //    }
    //    //public Equals(obj: Object): boolean {
    //    //    var comparer: GenericComparer<T> = obj as GenericComparer < T>;
    //    //    return comparer != null;
    //    //}
    //    //public GetHashCode(): number {
    //    //    return this.GetType().Name.GetHashCode();
    //    //}
    //}
    //export class NullableComparer<T extends IComparable<T>> implements Comparer<Nullable<T>>
    //{
    //    public Compare(x: Nullable<T>, y: Nullable<T>): number {
    //        if (x.HasValue) {
    //            if (y.HasValue)
    //                return x.value.CompareTo(y.value);
    //            return 1;
    //        }
    //        if (y.HasValue)
    //            return -1;
    //        return 0;
    //    }
    //    public Equals(obj: Object): boolean {
    //        var comparer: NullableComparer<T> = obj as NullableComparer < T>;
    //        return comparer != null;
    //    }
    //    public GetHashCode(): number {
    //        return this.GetType().Name.GetHashCode();
    //    }
    //}
    export class ObjectComparer<T> extends Comparer<T>
    {
        public Compare(x: T, y: T): number {
            if (x == null)
                return y == null ? 0 : -1;
            if (y == null)
                return 1;

            return System.Collections.Comparer.Default.Compare(x, y);
        }
        //public Equals(obj: Object): boolean {
        //    var comparer: ObjectComparer<T> = obj as ObjectComparer < T>;
        //    return comparer != null;
        //}
        //public GetHashCode(): number {
        //    return this.GetType().Name.GetHashCode();
        //}  
    }
    export class ComparisonComparer<T> extends Comparer<T>
    {
        private _comparison: (_: T, __: T) => number = null;
        constructor(comparison: (_: T, __: T) => number) {
            super();
            this._comparison = comparison;
        }
        public Compare(x: T, y: T): number {
            if (x == null)
                return y == null ? 0 : -1;
            if (y == null)
                return 1;
            return this._comparison(x, y);
        }
    }
}
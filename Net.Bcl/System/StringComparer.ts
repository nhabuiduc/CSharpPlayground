
module System {
    export class StringComparer implements System.Collections.IComparer, System.Collections.IEqualityComparer, System.Collections.Generic.IComparer<string>, System.Collections.Generic.IEqualityComparer<string>
    {
        //private static _invariantCulture: StringComparer = new CultureAwareComparer(CultureInfo.InvariantCulture, false);
        //private static _invariantCultureIgnoreCase: StringComparer = new CultureAwareComparer(CultureInfo.InvariantCulture, true);
        public static _ordinal: StringComparer;// = new OrdinalComparer();
        //private static _ordinalIgnoreCase: StringComparer = new OrdinalComparer(true);
        //public static get InvariantCulture(): StringComparer {
        //    //Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    return StringComparer._invariantCulture;
        //}
        //public static get InvariantCultureIgnoreCase(): StringComparer {
        //    // Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    return StringComparer._invariantCultureIgnoreCase;
        //}
        //public static get CurrentCulture(): StringComparer {
        //    // Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    return new CultureAwareComparer(CultureInfo.CurrentCulture, false);
        //}
        //public static get CurrentCultureIgnoreCase(): StringComparer {
        //    //Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    return new CultureAwareComparer(CultureInfo.CurrentCulture, true);
        //}
        public static get Ordinal(): StringComparer {
            //Contract.Ensures(Contract.Result<StringComparer>() != null);
            return StringComparer._ordinal;
        }
        //public static get OrdinalIgnoreCase(): StringComparer {
        //    //Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    return StringComparer._ordinalIgnoreCase;
        //}
        //public static Create(culture: CultureInfo, ignoreCase: boolean): StringComparer {
        //    if (culture == null) {
        //        throw new ArgumentNullException("culture");
        //    }
        //    // Contract.Ensures(Contract.Result<StringComparer>() != null);
        //    // Contract.EndContractBlock();
        //    return new CultureAwareComparer(culture, ignoreCase);
        //}
        public Compare(x: String, y: String): number;
        public Compare(x: Object, y: Object): number;
        public Compare(param0: any, param1: any): number {
            if (typeof param0 === 'string' && typeof param1 === 'string') { return this.Compare_String(param0, param1); }
            if ((param0 instanceof Object || param0 === null) && (param1 instanceof Object || param1 === null)) { return this.Compare_overload1(param0, param1); }
        }
        private Compare_String(x: String, y: String): number {
            throw new System.NotSupportedException();
        }
            
        private Compare_overload1(x: Object, y: Object): number {
            if (x == y)
                return 0;
            if (x == null)
                return -1;
            if (y == null)
                return 1;
          
            //var ia: IComparable = x as IComparable;
            if (typeof x["CompareTo"] != 'undefined')
            {
                return (<any>x).CompareTo(y);
            }
            
            throw new ArgumentException(Environment.GetResourceString("Argument_ImplementIComparable"));
        }
        public Equals(x: String, y: String): boolean;
        public Equals(x: Object, y: Object): boolean;
        public Equals(param0: any, param1: any): boolean {
            if (typeof param0 === 'String' && typeof param1 === 'String') { return this.Equals_String(param0, param1); }
            if ((param0 instanceof Object || param0 === null) && (param1 instanceof Object || param1 === null)) { return this.Equals_overload1(param0, param1); }
        }
        private Equals_String(x: String, y: String): boolean {
            throw new System.NotSupportedException();
        }
            
        private Equals_overload1(x: Object, y: Object): boolean {
            if (x == y)
                return true;
            if (x == null || y == null)
                return false;
            // TODO: equals
            return x == y;
        }
        public GetHashCode(obj: string): number;
        public GetHashCode(obj: Object): number;
        public GetHashCode(param0: any): number {
            if (typeof param0 === 'string') { return this.GetHashCode_String(param0); }
            if ((param0 instanceof Object || param0 === null)) { return this.GetHashCode_overload1(param0); }
        }
        private GetHashCode_String(obj: string): number { throw new System.NotSupportedException(); }
            
        private GetHashCode_overload1(obj: Object): number {
            if (obj == null) {
                throw new ArgumentNullException("obj");
            }
            ////Contract.EndContractBlock();
            //var s: string = obj as string;
            //if (s != null) {
            //    return this.GetHashCode(s);
            //}

            if (typeof obj["GetHashCode"] == 'undefined') {
                throw new System.FunctionRequiredException();
            }

            return (<any>obj).GetHashCode();
        }
    }

    export class OrdinalComparer extends StringComparer {
        private _ignoreCase: boolean = false;
        constructor(ignoreCase?: boolean) {
           
            super();
            if (ignoreCase === void 0) {
                ignoreCase = false;
            }
            this._ignoreCase = ignoreCase;
        }
        public Compare(x: any, y: any): number {
            if (x === y)
                return 0;
            if (x == null)
                return -1;
            if (y == null)
                return 1;
            if (this._ignoreCase) {
                return String.Compare(x, y, StringComparison.OrdinalIgnoreCase);
            }
            return String.CompareOrdinal(x, y);
        }
        public Equals(obj: Object): boolean;
        public Equals(x: string, y: string): boolean;
        public Equals(param0: any, param1?: string): boolean {
            if (typeof param0 === 'string' && typeof param1 === 'string') { 
                /* (x:string,y:string) */
                return this.Equals_overload11(param0, param1);
            }
            if ((param0 !== void 0) && (param1 === void 0)) { 
                /* (obj:Object) */
                return this.Equals_overload00(param0);
            }
            throw new Error('overload failed');
        }
        private Equals_overload00(obj: Object): boolean {
            var comparer: OrdinalComparer = __as__<OrdinalComparer>(obj, OrdinalComparer);
            if (comparer == null) {
                return false;
            }
            return (this._ignoreCase == comparer._ignoreCase);
        }
        private Equals_overload11(x: string, y: string): boolean {
            if (x === y)
                return true;
            if (x == null || y == null)
                return false;
            if (this._ignoreCase) {
                if (x.length != y.length) {
                    return false;
                }
                return (String.Compare(x, y, StringComparison.OrdinalIgnoreCase) == 0);
            }
            return x == y;
        }
        public GetHashCode(): number;
        public GetHashCode(obj: string): number;
        public GetHashCode(param0?: string): number {
            if (typeof param0 === 'string') { 
                /* (obj:string) */
                return this.GetHashCode_overload11(param0);
            }
            if ((param0 === void 0)) { 
                /* () */
                return this.GetHashCode_overload00();
            }
            throw new Error('overload failed');
        }
        private GetHashCode_overload00(): number {
            var name: string = "OrdinalComparer";
            var hashCode: number = name.GetHashCode();
            return this._ignoreCase ? (~hashCode) : hashCode;
        }
        private GetHashCode_overload11(obj: string): number {
            if (obj == null) {
                throw new ArgumentNullException("obj");
            }
           // Contract.EndContractBlock();
            //if (this._ignoreCase) {
            //    return TextInfo.GetHashCodeOrdinalIgnoreCase(obj);
            //}
            return obj.GetHashCode();
        }
    }

    System.StringComparer._ordinal = new OrdinalComparer();
}
module System.Collections.Generic {
    export class EqualityComparer<T> implements System.Collections.IEqualityComparer, IEqualityComparer<T>{
        //private __id__: number;
        public constructor() {

            //this.___id__ =  Gb.Id++;
        }

        public static Default: EqualityComparer<any> = new EqualityComparer<any>(); 


        //public static Default<T>():EqualityComparer<T> {
        //    return new EqualityComparer<T>();
        //}

        

        public Equals(x: Object, y: Object): boolean {
            if (typeof x["OperatorEquals"] != 'undefined') {
                return (<any>x).OperatorEquals(y);
            }

            return x == y;
        }

        public GetHashCode(obj: Object): number {
            return 0;
        }
    }
}

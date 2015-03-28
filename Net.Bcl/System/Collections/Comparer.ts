module System.Collections {
    export class Comparer implements IComparer {
        public static Default: Comparer = new Comparer();

        public Compare(x: Object, y: Object): number {
            if (x == y) return 0;
            if (x == null) return -1;
            if (y == null) return 1;

            if (typeof x == 'number' && typeof y == 'number') {
                var xNumber = <number> x;
                var yNumber = <number> y;
                if (xNumber == yNumber) return 0;
                if (xNumber > yNumber) return 1;
                else return -1;
            }

            if (typeof x == 'string' && typeof y == 'string') {
                var xString = <string><any> x;
                var yString = <string><any> y;
                return xString.localeCompare(yString);
            }

            if (typeof x["CompareTo"] != 'undefined') {
                var ia = <IComparable>x;
                return ia.CompareTo(y);
            }

            if (typeof y["CompareTo"] != 'undefined') {
                var ib = <IComparable>y;
                return -ib.CompareTo(x);
            }

            // var ia:IComparable = a as IComparable;
            //if (ia != null)
            //    return ia.CompareTo(b);
 
            //IComparable ib = b as IComparable;
            //if (ib != null)
            //    return -ib.CompareTo(a);
        }
    }
}
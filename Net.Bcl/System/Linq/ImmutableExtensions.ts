module System.Linq {
    export class ImmutableExtensions {
        public static ToArray<T>(sequence: System.Collections.Generic.IEnumerable<T>, count: number): T[] {
            var array: T[] = new Array(count);
            var i: number = 0;

            // for each
            var itemEnumerator = sequence.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    array[i++] = item;
                }
            } finally {
                if (typeof itemEnumerator['Dispose'] != 'undefined') itemEnumerator.Dispose();
            }
            // end foreach

            return array;
        }
        public static TryGetCount<T>(sequence: Collections.IEnumerable, count: { refObj: number }): boolean;
        public static TryGetCount<T>(sequence: System.Collections.Generic.IEnumerable<T>, count: { refObj: number }): boolean;
        public static TryGetCount<T>(param0: any, param1: any): boolean {
             return this.TryGetCount_overload0(param0, param1); 
        }
        private static TryGetCount_overload0<T>(sequence: Collections.IEnumerable, count: { refObj: number }): boolean {
            if (typeof sequence["Count"] != 'undefined') {
                count.refObj = sequence["Count"];
                return true;
            }
            count.refObj = 0;
            return false;
        }

    }
}
module Microsoft.CodeAnalysis {
    export class ArrayElement<T>
    {
        public Value: T;
        public static MakeElementArray<T>(items: T[]): ArrayElement<T>[] {
            if (items == null) {
                return null;
            }
            var array = new Array(items.length);
            for (var i: number = 0; i < items.length; i++) {
                array[i].Value = items[i];
            }
            return array;
        }
        public static MakeArray<T>(items: ArrayElement<T>[]): T[] {
            if (items == null) {
                return null;
            }
            var array = new Array(items.length);
            for (var i: number = 0; i < items.length; i++) {
                array[i] = items[i].Value;
            }
            return array;
        }
    }
}
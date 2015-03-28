module Roslyn.Utilities {
    export class ArrayExtensions {
        public static Copy<T>(array: T[], start: number, length: number): T[] {
            System.Diagnostics.Debug.Assert(start >= 0);
            System.Diagnostics.Debug.Assert(start <= array.length);
            if (start + length > array.length) {
                length = array.length - start;
            }
            var newArray: T[] = new Array(length);
            TSArray.Copy(array, start, newArray, 0, length);
            return newArray;
        }
        public static ValueEquals(array: number[], other: number[]): boolean {
            if (array == other) {
                return true;
            }
            if (array == null || other == null || array.length != other.length) {
                return false;
            }
            for (var i: number = 0; i < array.length; i++) {
                if (array[i] != other[i]) {
                    return false;
                }
            }
            return true;
        }
        public static InsertAt_2794<T>(array: T[], position: number, item: T): T[] {
            var newArray: T[] = new Array(array.length + 1);
            if (position > 0) {
                TSArray.Copy(array, newArray, position);
            }
            if (position < array.length) {
                TSArray.Copy(array, position, newArray, position + 1, array.length - position);
            }
            newArray[position] = item;
            return newArray;
        }
        public static Append_1186<T>(array: T[], item: T): T[] {
            return ArrayExtensions.InsertAt_2794(array, array.length, item);
        }
        public static InsertAt_1940<T>(array: T[], position: number, items: T[]): T[] {
            var newArray: T[] = new Array(array.length + items.length);
            if (position > 0) {
                TSArray.Copy(array, newArray, position);
            }
            if (position < array.length) {
                TSArray.Copy(array, position, newArray, position + items.length, array.length - position);
            }
            items.CopyTo(newArray, position);
            return newArray;
        }
        public static Append_1863<T>(array: T[], items: T[]): T[] {
            return ArrayExtensions.InsertAt_1940(array, array.length, items);
        }
        public static RemoveAt_1797<T>(array: T[], position: number): T[] {
            return ArrayExtensions.RemoveAt_1286(array, position, 1);
        }
        public static RemoveAt_1286<T>(array: T[], position: number, length: number): T[] {
            if (position + length > array.length) {
                length = array.length - position;
            }
            var newArray: T[] = new Array(array.length - length);
            if (position > 0) {
                TSArray.Copy(array, newArray, position);
            }
            if (position < newArray.length) {
                TSArray.Copy(array, position + length, newArray, position, newArray.length - position);
            }
            return newArray;
        }
        public static ReplaceAt_8851<T>(array: T[], position: number, item: T): T[] {
            var newArray: T[] = new Array(array.length);
            TSArray.Copy(array, newArray, array.length);
            newArray[position] = item;
            return newArray;
        }
        public static ReplaceAt_9303<T>(array: T[], position: number, length: number, items: T[]): T[] {
            return ArrayExtensions.InsertAt_1940(ArrayExtensions.RemoveAt_1286(array, position, length), position, items);
        }
        public static ReverseContents_4458<T>(array: T[]): void {
            ArrayExtensions.ReverseContents_5048(array, 0, array.length);
        }
        public static ReverseContents_5048<T>(array: T[], start: number, count: number): void {
            var end: number = start + count - 1;
            for (var i: number = start, j = end; i < j; i++ , j--) {
                var tmp: T = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        }
        public static BinarySearch(array: number[], value: number): number {
            var low = 0;
            var high = array.length - 1;
            while (low <= high) {
                var middle = low + ((high - low) >> 1);
                var midValue = array[middle];
                if (midValue == value) {
                    return middle;
                }
                else if (midValue > value) {
                    high = middle - 1;
                }
                else {
                    low = middle + 1;
                }
            }
            return ~low;
        }
    }
}
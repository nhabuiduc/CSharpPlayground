//module System.Collections.Generic {
//    export interface IArraySortHelper<TKey> {
//        Sort(keys: TKey[], index: number, length: number, comparer: IComparer<TKey>): void;
//        BinarySearch(keys: TKey[], index: number, length: number, value: TKey, comparer: IComparer<TKey>): number;
//    }
//    export class IntrospectiveSortUtilities {
//        public static IntrosortSizeThreshold: number = 16;
//        public static QuickSortDepthThreshold: number = 32;
//        public static FloorLog2(n: number): number {
//            var result: number = 0;
//            while (n >= 1) {
//                result++;
//                n = n / 2;
//            }
//            return result;
//        }
//        public static ThrowOrIgnoreBadComparer(comparer: Object): void {
//            throw new ArgumentException(Environment.GetResourceString("Arg_BogusIComparer", comparer));

//        }
//    }
//    export class ArraySortHelper<T> implements IArraySortHelper<T>
//    {
//        //static defaultArraySortHelper: IArraySortHelper<T> = null;
//        get Default(): IArraySortHelper<T> {
//            var sorter: IArraySortHelper<T> = ArraySortHelper.CreateArraySortHelper();
//            if (sorter == null)
//                sorter = ArraySortHelper.CreateArraySortHelper();
//            return sorter;
//        }
//        private static CreateArraySortHelper<T>(): IArraySortHelper<T> {
//            return  new ArraySortHelper<T>();
//            //return ArraySortHelper.defaultArraySortHelper;
//        }
//        public Sort(keys: T[], index: number, length: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Assert(keys != null, "Check the arguments in the caller!");
//            System.Diagnostics.Contracts.Contract.Assert(index >= 0 && length >= 0 && (keys.length - index >= length), "Check the arguments in the caller!");
//            try {
//                if (comparer == null) {
//                    comparer = Comparer<T>.Default;
//                }
//                ArraySortHelper.DepthLimitedQuickSort(keys, index, length + index - 1, comparer, IntrospectiveSortUtilities.QuickSortDepthThreshold);
//            } catch (__ex__) {
//                if (__ex__ instanceof IndexOutOfRangeException) {
//                    IntrospectiveSortUtilities.ThrowOrIgnoreBadComparer(comparer);
//                }
//                var e = __ex__; if (e instanceof Exception) {
//                    throw new InvalidOperationException(Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
//                }

//            }

//        }
//        public BinarySearch(array: T[], index: number, length: number, value: T, comparer: IComparer<T>): number {
//            try {
//                if (comparer == null) {
//                    comparer = Comparer<T>.Default;
//                }
//                return ArraySortHelper.InternalBinarySearch(array, index, length, value, comparer);
//            }
//            catch (e) {
//                throw new InvalidOperationException(Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
//            }

//        }
//        public static InternalBinarySearch(array: T[], index: number, length: number, value: T, comparer: IComparer<T>): number {
//            System.Diagnostics.Contracts.Contract.Requires(array != null, "Check the arguments in the caller!");
//            System.Diagnostics.Contracts.Contract.Requires(index >= 0 && length >= 0 && (array.length - index >= length), "Check the arguments in the caller!");
//            var lo: number = index;
//            var hi: number = index + length - 1;
//            while (lo <= hi) {
//                var i: number = lo + ((hi - lo) >> 1);
//                var order: number = comparer.Compare(array[i], value);
//                if (order == 0)
//                    return i;
//                if (order < 0) {
//                    lo = i + 1;
//                }
//                else {
//                    hi = i - 1;
//                }
//            }
//            return ~lo;
//        }
//        private static SwapIfGreater(keys: T[], comparer: IComparer<T>, a: number, b: number): void {
//            if (a != b) {
//                if (comparer.Compare(keys[a], keys[b]) > 0) {
//                    var key: T = keys[a];
//                    keys[a] = keys[b];
//                    keys[b] = key;
//                }
//            }
//        }
//        private static Swap(a: T[], i: number, j: number): void {
//            if (i != j) {
//                var t: T = a[i];
//                a[i] = a[j];
//                a[j] = t;
//            }
//        }
//        public static DepthLimitedQuickSort(keys: T[], left: number, right: number, comparer: IComparer<T>, depthLimit: number): void {
//            do {
//                if (depthLimit == 0) {
//                    ArraySortHelper.Heapsort(keys, left, right, comparer);
//                    return
//                }
//                var i: number = left;
//                var j: number = right;
//                var middle: number = i + ((j - i) >> 1);
//                ArraySortHelper.SwapIfGreater(keys, comparer, i, middle);
//                ArraySortHelper.SwapIfGreater(keys, comparer, i, j);
//                ArraySortHelper.SwapIfGreater(keys, comparer, middle, j);
//                var x: T = keys[middle];
//                do {
//                    while (comparer.Compare(keys[i], x) < 0)
//                        i++;
//                    while (comparer.Compare(x, keys[j]) < 0)
//                        j--;
//                    System.Diagnostics.Contracts.Contract.Assert(i >= left && j <= right, "(i>=left && j<=right)  Sort failed - Is your IComparer bogus?");
//                    if (i > j)
//                        break;
//                    if (i < j) {
//                        var key: T = keys[i];
//                        keys[i] = keys[j];
//                        keys[j] = key;
//                    }
//                    i++;
//                    j--;
//                }
//                while (i <= j);
//                depthLimit--;
//                if (j - left <= right - i) {
//                    if (left < j)
//                        ArraySortHelper.DepthLimitedQuickSort(keys, left, j, comparer, depthLimit);
//                    left = i;
//                }
//                else {
//                    if (i < right)
//                        ArraySortHelper.DepthLimitedQuickSort(keys, i, right, comparer, depthLimit);
//                    right = j;
//                }
//            }
//            while (left < right);
//        }
//        public static IntrospectiveSort(keys: T[], left: number, length: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(comparer != null);
//            System.Diagnostics.Contracts.Contract.Requires(left >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(length >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(length <= keys.length);
//            System.Diagnostics.Contracts.Contract.Requires(length + left <= keys.length);
//            if (length < 2)
//                return
//            ArraySortHelper.IntroSort(keys, left, length + left - 1, 2 * IntrospectiveSortUtilities.FloorLog2(keys.length), comparer);
//        }
//        private static IntroSort(keys: T[], lo: number, hi: number, depthLimit: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(comparer != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            while (hi > lo) {
//                var partitionSize: number = hi - lo + 1;
//                if (partitionSize <= IntrospectiveSortUtilities.IntrosortSizeThreshold) {
//                    if (partitionSize == 1) {
//                        return
//                    }
//                    if (partitionSize == 2) {
//                        ArraySortHelper.SwapIfGreater(keys, comparer, lo, hi);
//                        return
//                    }
//                    if (partitionSize == 3) {
//                        ArraySortHelper.SwapIfGreater(keys, comparer, lo, hi - 1);
//                        ArraySortHelper.SwapIfGreater(keys, comparer, lo, hi);
//                        ArraySortHelper.SwapIfGreater(keys, comparer, hi - 1, hi);
//                        return
//                    }
//                    ArraySortHelper.InsertionSort(keys, lo, hi, comparer);
//                    return
//                }
//                if (depthLimit == 0) {
//                    ArraySortHelper.Heapsort(keys, lo, hi, comparer);
//                    return
//                }
//                depthLimit--;
//                var p: number = ArraySortHelper.PickPivotAndPartition(keys, lo, hi, comparer);
//                ArraySortHelper.IntroSort(keys, p + 1, hi, depthLimit, comparer);
//                hi = p - 1;
//            }
//        }
//        private static PickPivotAndPartition(keys: T[], lo: number, hi: number, comparer: IComparer<T>): number {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(comparer != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi > lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= lo && System.Diagnostics.Contracts.Contract.Result<number>() <= hi);
//            var middle: number = lo + ((hi - lo) / 2);
//            ArraySortHelper.SwapIfGreater(keys, comparer, lo, middle);
//            ArraySortHelper.SwapIfGreater(keys, comparer, lo, hi);
//            ArraySortHelper.SwapIfGreater(keys, comparer, middle, hi);
//            var pivot: T = keys[middle];
//            ArraySortHelper.Swap(keys, middle, hi - 1);
//            var left: number = lo, right = hi - 1;
//            while (left < right) {
//                while (comparer.Compare(keys[++left], pivot) < 0)
//                    ;
//                while (comparer.Compare(pivot, keys[--right]) < 0)
//                    ;
//                if (left >= right)
//                    break;
//                ArraySortHelper.Swap(keys, left, right);
//            }
//            ArraySortHelper.Swap(keys, left, (hi - 1));
//            return left;
//        }
//        private static Heapsort(keys: T[], lo: number, hi: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(comparer != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi > lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            var n: number = hi - lo + 1;
//            for (var i: number = n / 2; i >= 1; i = i - 1) {
//                ArraySortHelper.DownHeap(keys, i, n, lo, comparer);
//            }
//            for (var i: number = n; i > 1; i = i - 1) {
//                ArraySortHelper.Swap(keys, lo, lo + i - 1);
//                ArraySortHelper.DownHeap(keys, 1, i - 1, lo, comparer);
//            }
//        }
//        private static DownHeap(keys: T[], i: number, n: number, lo: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(comparer != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(lo < keys.length);
//            var d: T = keys[lo + i - 1];
//            var child: number = 0;
//            while (i <= n / 2) {
//                child = 2 * i;
//                if (child < n && comparer.Compare(keys[lo + child - 1], keys[lo + child]) < 0) {
//                    child++;
//                }
//                if (!(comparer.Compare(d, keys[lo + child - 1]) < 0))
//                    break;
//                keys[lo + i - 1] = keys[lo + child - 1];
//                i = child;
//            }
//            keys[lo + i - 1] = d;
//        }
//        private static InsertionSort(keys: T[], lo: number, hi: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi >= lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi <= keys.length);
//            var i: number = 0, j = 0;
//            var t: T = null;
//            for (; i < hi; i++) {
//                j = i;
//                t = keys[i + 1];
//                while (j >= lo && comparer.Compare(t, keys[j]) < 0) {
//                    keys[j + 1] = keys[j];
//                    j--;
//                }
//                keys[j + 1] = t;
//            }
//        }
//    }
//    export class GenericArraySortHelper<T extends IComparable<T>> implements IArraySortHelper<T>
//    {
//        public Sort(keys: T[], index: number, length: number, comparer: IComparer<T>): void {
//            System.Diagnostics.Contracts.Contract.Assert(keys != null, "Check the arguments in the caller!");
//            System.Diagnostics.Contracts.Contract.Assert(index >= 0 && length >= 0 && (keys.length - index >= length), "Check the arguments in the caller!");
//            try {
//                if (comparer == null || comparer == Comparer<T>.Default) {
//                    if (BinaryCompatibility.TargetsAtLeast_Desktop_V4_5) {
//                        GenericArraySortHelper.IntrospectiveSort(keys, index, length);
//                    }
//                    else {
//                        GenericArraySortHelper.DepthLimitedQuickSort(keys, index, length + index - 1, IntrospectiveSortUtilities.QuickSortDepthThreshold);
//                    }
//                }
//                else {
//                    if (BinaryCompatibility.TargetsAtLeast_Desktop_V4_5) {
//                        ArraySortHelper<T>.IntrospectiveSort(keys, index, length, comparer);
//                    }
//                    else {
//                        ArraySortHelper<T>.DepthLimitedQuickSort(keys, index, length + index - 1, comparer, IntrospectiveSortUtilities.QuickSortDepthThreshold);
//                    }
//                }
//            } catch (__ex__) {
//                if (__ex__ instanceof IndexOutOfRangeException) {
//                    IntrospectiveSortUtilities.ThrowOrIgnoreBadComparer(comparer);
//                }
//                var e = __ex__; if (e instanceof Exception) {
//                    throw new InvalidOperationException(Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
//                }

//            }

//        }
//        private static SwapIfGreaterWithItems(keys: T[], a: number, b: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(0 <= a && a < keys.length);
//            System.Diagnostics.Contracts.Contract.Requires(0 <= b && b < keys.length);
//            if (a != b) {
//                if (keys[a] != null && keys[a].CompareTo(keys[b]) > 0) {
//                    var key: T = keys[a];
//                    keys[a] = keys[b];
//                    keys[b] = key;
//                }
//            }
//        }
//        private static Swap(a: T[], i: number, j: number): void {
//            if (i != j) {
//                var t: T = a[i];
//                a[i] = a[j];
//                a[j] = t;
//            }
//        }
//        private static DepthLimitedQuickSort(keys: T[], left: number, right: number, depthLimit: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(0 <= left && left < keys.length);
//            System.Diagnostics.Contracts.Contract.Requires(0 <= right && right < keys.length);
//            do {
//                if (depthLimit == 0) {
//                    GenericArraySortHelper.Heapsort(keys, left, right);
//                    return
//                }
//                var i: number = left;
//                var j: number = right;
//                var middle: number = i + ((j - i) >> 1);
//                GenericArraySortHelper.SwapIfGreaterWithItems(keys, i, middle);
//                GenericArraySortHelper.SwapIfGreaterWithItems(keys, i, j);
//                GenericArraySortHelper.SwapIfGreaterWithItems(keys, middle, j);
//                var x: T = keys[middle];
//                do {
//                    if (x == null) {
//                        while (keys[j] != null)
//                            j--;
//                    }
//                    else {
//                        while (x.CompareTo(keys[i]) > 0)
//                            i++;
//                        while (x.CompareTo(keys[j]) < 0)
//                            j--;
//                    }
//                    System.Diagnostics.Contracts.Contract.Assert(i >= left && j <= right, "(i>=left && j<=right)  Sort failed - Is your IComparer bogus?");
//                    if (i > j)
//                        break;
//                    if (i < j) {
//                        var key: T = keys[i];
//                        keys[i] = keys[j];
//                        keys[j] = key;
//                    }
//                    i++;
//                    j--;
//                }
//                while (i <= j);
//                depthLimit--;
//                if (j - left <= right - i) {
//                    if (left < j)
//                        GenericArraySortHelper.DepthLimitedQuickSort(keys, left, j, depthLimit);
//                    left = i;
//                }
//                else {
//                    if (i < right)
//                        GenericArraySortHelper.DepthLimitedQuickSort(keys, i, right, depthLimit);
//                    right = j;
//                }
//            }
//            while (left < right);
//        }
//        public static IntrospectiveSort(keys: T[], left: number, length: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(left >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(length >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(length <= keys.length);
//            System.Diagnostics.Contracts.Contract.Requires(length + left <= keys.length);
//            if (length < 2)
//                return
//            GenericArraySortHelper.IntroSort(keys, left, length + left - 1, 2 * IntrospectiveSortUtilities.FloorLog2(keys.length));
//        }
//        private static IntroSort(keys: T[], lo: number, hi: number, depthLimit: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            while (hi > lo) {
//                var partitionSize: number = hi - lo + 1;
//                if (partitionSize <= IntrospectiveSortUtilities.IntrosortSizeThreshold) {
//                    if (partitionSize == 1) {
//                        return
//                    }
//                    if (partitionSize == 2) {
//                        GenericArraySortHelper.SwapIfGreaterWithItems(keys, lo, hi);
//                        return
//                    }
//                    if (partitionSize == 3) {
//                        GenericArraySortHelper.SwapIfGreaterWithItems(keys, lo, hi - 1);
//                        GenericArraySortHelper.SwapIfGreaterWithItems(keys, lo, hi);
//                        GenericArraySortHelper.SwapIfGreaterWithItems(keys, hi - 1, hi);
//                        return
//                    }
//                    GenericArraySortHelper.InsertionSort(keys, lo, hi);
//                    return
//                }
//                if (depthLimit == 0) {
//                    GenericArraySortHelper.Heapsort(keys, lo, hi);
//                    return
//                }
//                depthLimit--;
//                var p: number = GenericArraySortHelper.PickPivotAndPartition(keys, lo, hi);
//                GenericArraySortHelper.IntroSort(keys, p + 1, hi, depthLimit);
//                hi = p - 1;
//            }
//        }
//        private static PickPivotAndPartition(keys: T[], lo: number, hi: number): number {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi > lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= lo && System.Diagnostics.Contracts.Contract.Result<number>() <= hi);
//            var middle: number = lo + ((hi - lo) / 2);
//            GenericArraySortHelper.SwapIfGreaterWithItems(keys, lo, middle);
//            GenericArraySortHelper.SwapIfGreaterWithItems(keys, lo, hi);
//            GenericArraySortHelper.SwapIfGreaterWithItems(keys, middle, hi);
//            var pivot: T = keys[middle];
//            GenericArraySortHelper.Swap(keys, middle, hi - 1);
//            var left: number = lo, right = hi - 1;
//            while (left < right) {
//                if (pivot == null) {
//                    while (left < (hi - 1) && keys[++left] == null)
//                        ;
//                    while (right > lo && keys[--right] != null)
//                        ;
//                }
//                else {
//                    while (pivot.CompareTo(keys[++left]) > 0)
//                        ;
//                    while (pivot.CompareTo(keys[--right]) < 0)
//                        ;
//                }
//                if (left >= right)
//                    break;
//                GenericArraySortHelper.Swap(keys, left, right);
//            }
//            GenericArraySortHelper.Swap(keys, left, (hi - 1));
//            return left;
//        }
//        private static Heapsort(keys: T[], lo: number, hi: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi > lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi < keys.length);
//            var n: number = hi - lo + 1;
//            for (var i: number = n / 2; i >= 1; i = i - 1) {
//                GenericArraySortHelper.DownHeap(keys, i, n, lo);
//            }
//            for (var i: number = n; i > 1; i = i - 1) {
//                GenericArraySortHelper.Swap(keys, lo, lo + i - 1);
//                GenericArraySortHelper.DownHeap(keys, 1, i - 1, lo);
//            }
//        }
//        private static DownHeap(keys: T[], i: number, n: number, lo: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(lo < keys.length);
//            var d: T = keys[lo + i - 1];
//            var child: number = 0;
//            while (i <= n / 2) {
//                child = 2 * i;
//                if (child < n && (keys[lo + child - 1] == null || keys[lo + child - 1].CompareTo(keys[lo + child]) < 0)) {
//                    child++;
//                }
//                if (keys[lo + child - 1] == null || keys[lo + child - 1].CompareTo(d) < 0)
//                    break;
//                keys[lo + i - 1] = keys[lo + child - 1];
//                i = child;
//            }
//            keys[lo + i - 1] = d;
//        }
//        private static InsertionSort(keys: T[], lo: number, hi: number): void {
//            System.Diagnostics.Contracts.Contract.Requires(keys != null);
//            System.Diagnostics.Contracts.Contract.Requires(lo >= 0);
//            System.Diagnostics.Contracts.Contract.Requires(hi >= lo);
//            System.Diagnostics.Contracts.Contract.Requires(hi <= keys.length);
//            var i: number = 0, j = 0;
//            var t: T = null;
//            for (; i < hi; i++) {
//                j = i;
//                t = keys[i + 1];
//                while (j >= lo && (t == null || t.CompareTo(keys[j]) < 0)) {
//                    keys[j + 1] = keys[j];
//                    j--;
//                }
//                keys[j + 1] = t;
//            }
//        }
//        private static BinarySearch(array: T[], index: number, length: number, value: T): number;
//        public BinarySearch(array: T[], index: number, length: number, value: T, comparer: IComparer<T>): number;
//        private static BinarySearch(param0: T[], param1: number, param2: number, param3: T, param4?: IComparer<T>): number {
//            if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined' && typeof param4 == 'undefined') { return this.BinarySearch_overload0(param0, param1, param2, param3); }
//            if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined' && typeof param4 != 'undefined') { return this.BinarySearch_overload1(param0, param1, param2, param3, param4); }
//        }
//        private static BinarySearch_overload0(array: T[], index: number, length: number, value: T): number {
//            var lo: number = index;
//            var hi: number = index + length - 1;
//            while (lo <= hi) {
//                var i: number = lo + ((hi - lo) >> 1);
//                var order: number = 0;
//                if (array[i] == null) {
//                    order = (value == null) ? 0 : -1;
//                }
//                else {
//                    order = array[i].CompareTo(value);
//                }
//                if (order == 0) {
//                    return i;
//                }
//                if (order < 0) {
//                    lo = i + 1;
//                }
//                else {
//                    hi = i - 1;
//                }
//            }
//            return ~lo;
//        }
//        private BinarySearch_overload1(array: T[], index: number, length: number, value: T, comparer: IComparer<T>): number {
//            System.Diagnostics.Contracts.Contract.Assert(array != null, "Check the arguments in the caller!");
//            System.Diagnostics.Contracts.Contract.Assert(index >= 0 && length >= 0 && (array.length - index >= length), "Check the arguments in the caller!");
//            try {
//                if (comparer == null || comparer == Comparer<T>.Default) {
//                    return GenericArraySortHelper.BinarySearch(array, index, length, value);
//                }
//                else {
//                    return ArraySortHelper<T>.InternalBinarySearch(array, index, length, value, comparer);
//                }
//            }
//            catch (e) {
//                throw new InvalidOperationException(Environment.GetResourceString("InvalidOperation_IComparerFailed"), e);
//            }

//        }
//    }
//}
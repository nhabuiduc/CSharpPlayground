///<reference path="../InternalUtilities/ObjectPool`1.ts"/>
module Microsoft.CodeAnalysis {
    export class ArrayBuilder<T> implements System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>
    {
        builder: System.Collections.Immutable.ImmutableArray.Builder<T> ;
        private pool: Roslyn.Utilities.ObjectPool<ArrayBuilder<T>> ;
        ctor_1158(size: number): ArrayBuilder<T> {
            this.builder = System.Collections.Immutable.ImmutableArray.CreateBuilder<T>(size);
            return this;
        }
        ctor_2019(): ArrayBuilder<T> {
            this.ctor_1158(8);
            return this;
        }
        ctor_1444(pool: Roslyn.Utilities.ObjectPool<ArrayBuilder<T>>): ArrayBuilder<T> {
            this.ctor_2019();
            this.pool = pool;
            return this;
        }
        public ToImmutable(): System.Collections.Immutable.ImmutableArray<T> {
            return this.builder.ToImmutable();
        }
        public get Count(): number {
            return this.builder.Count;
        }
        public $get$(index: number): T {
            return this.builder.$get$(index);
        }
        public $set$(index: number, value: T): void {
            this.builder.$set$(index, value);
        }
        public Add(item: T): void {
            this.builder.Add(item);
        }
        public Insert(index: number, item: T): void {
            this.builder.Insert(index, item);
        }
        public EnsureCapacity(capacity: number): void {
            this.builder.EnsureCapacity(capacity);
        }
        public Clear(): void {
            this.builder.Clear();
        }
        public Contains(item: T): boolean {
            return this.builder.Contains(item);
        }
        public RemoveAt(index: number): void {
            this.builder.RemoveAt(index);
        }
        public RemoveLast(): void {
            this.builder.RemoveAt(this.builder.Count - 1);
        }
        //public ReverseContents(): void {
        //    this.builder.ReverseContents();
        //}
        //public Sort_1366(): void {
        //    this.builder.Sort();
        //}
        //public Sort_1296(comparer: System.Collections.Generic.IComparer<T>): void {
        //    this.builder.Sort(comparer);
        //}
        //public Sort_1711(startIndex: number, comparer: System.Collections.Generic.IComparer<T>): void {
        //    this.builder.Sort(startIndex, this.builder.Count - startIndex, comparer);
        //}
        public ToArray(): T[] {
            return this.builder.ToArray();
        }
        //public CopyTo(array: T[], start: number): void {
        //    this.builder.CopyTo(array, start);
        //}
        public Last(): T {
            return this.builder.$get$(this.builder.Count - 1);
        }
        public First(): T {
            return this.builder.$get$(0);
        }
        public Any(): boolean {
            return this.builder.Count > 0;
        }
        public ToImmutableOrNull(): System.Collections.Immutable.ImmutableArray<T> {
            if (this.Count == 0) {
                return null;
            }
            return this.ToImmutable();
        }
        public ToDowncastedImmutable<U extends T>(): System.Collections.Immutable.ImmutableArray<U> {
            if (this.Count == 0) {
                return System.Collections.Immutable.ImmutableArray .Empty;
            }
            var tmp = ArrayBuilder.GetInstance_9802<U>(this.Count);
            // for each
            var iEnumerator = this.GetEnumerator();
            try {
                while (iEnumerator.MoveNext()) {
                    var i = iEnumerator.Current;
                    // foreach block
                    tmp.Add(<U>i);
                }
            } finally {
                if (iEnumerator !== null && (<any>iEnumerator).Dispose !== void 0) (<any>iEnumerator).Dispose();

            }    
            // end foreach
            return tmp.ToImmutableAndFree();
        }
        public ToImmutableAndFree(): System.Collections.Immutable.ImmutableArray<T> {
            var result = this.ToImmutable();
            this.Free();
            return result;
        }
        public ToArrayAndFree(): T[] {
            var result = this.ToArray();
            this.Free();
            return result;
        }
        public Free(): void {
            var pool = this.pool;
            if (pool != null) {
                if (this.Count < 128) {
                    if (this.Count != 0) {
                        this.Clear();
                    }
                    pool.Free(this);
                    return
                }
                else {
                    pool.ForgetTrackedObject(this);
                }
            }
        }
        private static PoolInstance: Roslyn.Utilities.ObjectPool<ArrayBuilder<any>> = ArrayBuilder.CreatePool_2004();
        public static GetInstance_1997<T>(): ArrayBuilder<T> {
            var builder = ArrayBuilder.PoolInstance.Allocate();
            System.Diagnostics.Debug.Assert(builder.Count == 0);
            return builder;
        }
        public static GetInstance_9802<T>(capacity: number): ArrayBuilder<T> {
            var builder = ArrayBuilder.GetInstance_1997<T>();
            builder.EnsureCapacity(capacity);
            return builder;
        }
        public static GetInstance_7127<T>(capacity: number, fillWithValue: T): ArrayBuilder<T> {
            var builder = ArrayBuilder.GetInstance_1997<T>();
            builder.EnsureCapacity(capacity);
            for (var i: number = 0; i < capacity; i++) {
                builder.Add(fillWithValue);
            }
            return builder;
        }
        public static CreatePool_2004<T>(): Roslyn.Utilities.ObjectPool<ArrayBuilder<T>> {
            return ArrayBuilder.CreatePool_7738<T>(128);
        }
        public static CreatePool_7738<T>(size: number): Roslyn.Utilities.ObjectPool<ArrayBuilder<T>> {
            var pool: Roslyn.Utilities.ObjectPool<ArrayBuilder<T>> = null;
            pool = new Roslyn.Utilities.ObjectPool<ArrayBuilder<T>>().ctor_5203(() => new ArrayBuilder<T>().ctor_1444(pool), size);
            return pool;
        }
        public GetEnumerator(): ArrayBuilder.Enumerator<T> {
            return new ArrayBuilder.Enumerator<T>().ctor_9504(this);
        }
        //System.Collections.Generic.IEnumerable<T>.GetEnumerator(): System.Collections.Generic.IEnumerator<T> {
        //    return this.GetEnumerator();
        //}
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    return this.GetEnumerator();
        //}
        //public ToDictionary<K>(keySelector: (_: T) => K, comparer: System.Collections.Generic.IEqualityComparer<K> = null): System.Collections.Generic.Dictionary<K, System.Collections.Immutable.ImmutableArray<T>> {
        //    if (this.Count == 1) {
        //        var dictionary = new System.Collections.Generic.Dictionary<K, System.Collections.Immutable.ImmutableArray<T>>(1, comparer);
        //        var value: T = this.$get$(0);
        //        dictionary.Add(keySelector(value), System.Collections.Immutable.ImmutableArray.Create(value));
        //        return dictionary;
        //    }
        //    else {
        //        var accumulator = new System.Collections.Generic.Dictionary<K, ArrayBuilder<T>>(this.Count, comparer);
        //        for (var i: number = 0; i < this.Count; i++) {
        //            var item = this.$get$(i);
        //            var key = keySelector(item);
        //            var bucket: ArrayBuilder<T> = null;
        //            var bucket_ref0 = { refObj: bucket };
        //            var ret_val__611 = accumulator.TryGetValue(key, bucket_ref0);

        //            bucket = bucket_ref0.refObj;
        //            if (!ret_val__611) {
        //                bucket = ArrayBuilder.GetInstance_1997<T>();
        //                accumulator.Add(key, bucket);
        //            }
        //            bucket.Add(item);
        //        }
        //        var dictionary = new System.Collections.Generic.Dictionary<K, System.Collections.Immutable.ImmutableArray<T>>(accumulator.Count, comparer);
        //        // for each
        //        var pairEnumerator = accumulator.GetEnumerator();
        //        try {
        //            while (pairEnumerator.MoveNext()) {
        //                var pair = pairEnumerator.Current;
        //                // foreach block
        //                dictionary.Add(pair.Key, pair.Value.ToImmutableAndFree());
        //            }
        //        } finally {
        //            if (pairEnumerator !== null && (<any>pairEnumerator).Dispose !== void 0) (<any>pairEnumerator).Dispose();

        //        }    
        //        // end foreach
        //        return dictionary;
        //    }
        //}
        //public AddRange_9246(items: ArrayBuilder<T>): void {
        //    this.builder.AddRange(items.builder);
        //}
        //public AddRange_4741<U extends T>(items: ArrayBuilder<U>): void {
        //    this.builder.AddRange(items.builder);
        //}
        public AddRange_1909(items: System.Collections.Immutable.ImmutableArray<T>): void {
            this.builder.AddRange(items);
        }
        public AddRange_2893(items: System.Collections.Immutable.ImmutableArray<T>, length: number): void {
            this.builder.AddRange(items, length);
        }
        public AddRange_6776(items: System.Collections.Generic.IEnumerable<T>): void {
            this.builder.AddRange(items);
        }
        public AddRange_1179(...items: T[]): void {
            this.builder.AddRange(items);
        }
        public AddRange_1745(items: T[], length: number): void {
            this.builder.AddRange(items, length);
        }
        public Clip(limit: number): void {
            System.Diagnostics.Debug.Assert(limit <= this.Count);
            this.builder.Count = limit;
        }
        public ZeroInit(count: number): void {
            this.builder.Clear();
            this.builder.Count = count;
        }
        public AddMany(item: T, count: number): void {
            for (var i: number = 0; i < count; i++) {
                this.Add(item);
            }
        }
        constructor() { }
    }
    export module ArrayBuilder {
        export class DebuggerProxy<T> {
            private builder: ArrayBuilder<T> = null;
            ctor_1459(builder: ArrayBuilder<T>): DebuggerProxy<T> {
                this.builder = builder;
                return this;
            }
            public get A(): T[] {
                var result = new Array(this.builder.Count);
                for (var i: number = 0; i < result.length; i++) {
                    result[i] = this.builder.$get$(i);
                }
                return result;
            }
            constructor() { }
        }

        export class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>, IStruct {
            private builder: ArrayBuilder<T> = null;
            private index: number = 0;
            ctor_9504(builder: ArrayBuilder<T>): Enumerator<T> {
                this.builder = builder;
                this.index = -1;
                return this;
            }
            public get Current(): T {
                return this.builder.$get$(this.index);
            }
            public MoveNext(): boolean {
                this.index++;
                return this.index < this.builder.Count;
            }
            public Dispose(): void {

            }
            //get Current(): Object {
            //    return this.Current;
            //}
            public Reset(): void {
                this.index = -1;
            }
            constructor() { }
        }
    }
}
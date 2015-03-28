module Roslyn.Utilities {
    export class TextKeyedCache<T>
    {
        private static LocalSizeBits: number = 11;
        private static LocalSize: number = (1 << TextKeyedCache.LocalSizeBits);
        private static LocalSizeMask: number = TextKeyedCache.LocalSize - 1;
        private static SharedSizeBits: number = 16;
        private static SharedSize: number = (1 << TextKeyedCache.SharedSizeBits);
        private static SharedSizeMask: number = TextKeyedCache.SharedSize - 1;
        private static SharedBucketBits: number = 4;
        private static SharedBucketSize: number = (1 << TextKeyedCache.SharedBucketBits);
        private static SharedBucketSizeMask: number = TextKeyedCache.SharedBucketSize - 1;
        private localTable: TextKeyedCache.LocalEntry<T>[] = StructArray(TextKeyedCache.LocalEntry, TextKeyedCache.LocalSize);
        //private static sharedTable: TextKeyedCache.SharedEntry[] = StructArray(TextKeyedCache.SharedEntry, TextKeyedCache.SharedSize);
        private static wrap_sharedTable = new GenericStatic_Static<TextKeyedCache.SharedEntry<any>[]>();
        private static wrap_StaticPool = new GenericStatic_Static<ObjectPool<TextKeyedCache<any>>>();
        //private sharedTableInst: TextKeyedCache.SharedEntry<T>[] = TextKeyedCache.sharedTable;
        private sharedTableInst: TextKeyedCache.SharedEntry<T>[];
        private static StaticConstructor(): number {
            TextKeyedCache.wrap_sharedTable.NewFunc = function () { return StructArray(TextKeyedCache.SharedEntry, TextKeyedCache.SharedSize); };
            TextKeyedCache.wrap_StaticPool.NewFunc = function () { return TextKeyedCache.CreatePool(); };
            return 1;
        }
        private static StaticConstructorVar = TextKeyedCache.StaticConstructor();

        private strings: StringTable;
        private random: System.Random;
        ctor_1063(): TextKeyedCache<T> {
            this.ctor_3603(null);
            return this;
        }
        ctor_3603(pool: ObjectPool<TextKeyedCache<T>>): TextKeyedCache<T> {
            this.pool = pool;
            this.strings = new StringTable().ctor_1032();
            return this;
        }
        private pool: ObjectPool<TextKeyedCache<T>>;
        //private static StaticPool: ObjectPool<TextKeyedCache<T>> = TextKeyedCache.CreatePool();
        private static CreatePool<T>(): ObjectPool<TextKeyedCache<T>> {
            var pool: ObjectPool<TextKeyedCache<T>> = null;
            pool = new ObjectPool<TextKeyedCache<T>>().ctor_5203(() => new TextKeyedCache<T>().ctor_3603(pool), System.Environment.ProcessorCount * 4);
            return pool;
        }
        public static GetInstance<T>(clss: any): TextKeyedCache<T> {
            //return TextKeyedCache.StaticPool.Allocate();
            return TextKeyedCache.wrap_StaticPool.RegisterOrGet(clss).Allocate();
        }
        public Free(): void {
            this.pool.Free(this);
        }
        public FindItem(chars: string[], start: number, len: number, hashCode: number): T {
            var arr = this.localTable;
            var idx = TextKeyedCache.LocalIdxFromHash(hashCode);
            var text = arr[idx].Text;
            if (text != null && arr[idx].HashCode == hashCode) {
                if (StringTable.TextEquals_2659(text, chars, start, len)) {
                    return arr[idx].Item;
                }
            }
            var e: TextKeyedCache.SharedEntryValue<T> = this.FindSharedEntry(chars, start, len, hashCode);
            if (e != null) {
                arr[idx].HashCode = hashCode;
                arr[idx].Text = e.Text;
                var tk = e.Item;
                arr[idx].Item = tk;
                return tk;
            }
            return null;
        }
        private FindSharedEntry(chars: string[], start: number, len: number, hashCode: number): TextKeyedCache.SharedEntryValue<T> {
            if (this.sharedTableInst == null) {
                return null;
            }

            var arr = this.sharedTableInst;
            var idx: number = TextKeyedCache.SharedIdxFromHash(hashCode);
            var e: TextKeyedCache.SharedEntryValue<T> = null;
            for (var i: number = 1; i < TextKeyedCache.SharedBucketSize + 1; i++) {
                e = arr[idx].Entry;
                var hash: number = arr[idx].HashCode;
                if (e != null) {
                    if (hash == hashCode && StringTable.TextEquals_2659(e.Text, chars, start, len)) {
                        break;
                    }
                    e = null;
                }
                else {
                    break;
                }
                idx = (idx + i) & TextKeyedCache.SharedSizeMask;
            }
            return e;
        }
        public AddItem(chars: string[], start: number, len: number, hashCode: number, item: T): void {
            var text = this.strings.Add_5745(chars, start, len);
            var e = new TextKeyedCache.SharedEntryValue<T>().ctor_2137(text, item);
            this.AddSharedEntry(hashCode, e);
            var arr = this.localTable;
            var idx = TextKeyedCache.LocalIdxFromHash(hashCode);
            arr[idx].HashCode = hashCode;
            arr[idx].Text = text;
            arr[idx].Item = item;
        }
        private AddSharedEntry(hashCode: number, e: TextKeyedCache.SharedEntryValue<T>): void {
            this.sharedTableInst = TextKeyedCache.wrap_sharedTable.RegisterOrGet(<any>__classOf(e.Item));

            var arr = this.sharedTableInst;
            var idx: number = TextKeyedCache.SharedIdxFromHash(hashCode);
            var curIdx: number = idx;
            foundIdx:
            while (true) {
                for (var i: number = 1; i < TextKeyedCache.SharedBucketSize + 1; i++) {
                    if (arr[curIdx].Entry == null) {
                        idx = curIdx;
                        break foundIdx;
                    }
                    curIdx = (curIdx + i) & TextKeyedCache.SharedSizeMask;
                }
                var i1 = this.NextRandom() & TextKeyedCache.SharedBucketSizeMask;
                idx = (idx + (((i1 * i1 + i1) / 2 | 0))) & TextKeyedCache.SharedSizeMask; break;
            }
            arr[idx].HashCode = hashCode;
            var Entry_ref0 = { refObj: arr[idx].Entry };
            System.Threading.Volatile.Write(Entry_ref0, e);

            arr[idx].Entry = Entry_ref0.refObj;;
        }
        private static LocalIdxFromHash(hash: number): number {
            return hash & TextKeyedCache.LocalSizeMask;
        }
        private static SharedIdxFromHash(hash: number): number {
            return (hash ^ (hash >> TextKeyedCache.LocalSizeBits)) & TextKeyedCache.SharedSizeMask;
        }
        private NextRandom(): number {
            var r = this.random;
            if (r != null) {
                return r.Next();
            }
            r = new System.Random();
            this.random = r;
            return r.Next();
        }
        constructor() { }
    }
    export module TextKeyedCache {
        export class LocalEntry<T> implements IStruct {
            public Text: string;
            public HashCode: number = 0;
            public Item: T;
            constructor() { }
        }
    }
    export module TextKeyedCache {
        export class SharedEntry<T> implements IStruct {
            public HashCode: number = 0;
            public Entry: SharedEntryValue<T>;
            constructor() { }
        }
    }
    export module TextKeyedCache {
        export class SharedEntryValue<T> {
            public Text: string;
            public Item: T;
            ctor_2137(Text: string, item: T): SharedEntryValue<T> {
                this.Text = Text;
                this.Item = item;
                return this;
            }
            constructor() { }
        }
    }
}
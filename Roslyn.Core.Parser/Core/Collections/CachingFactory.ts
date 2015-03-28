module Microsoft.CodeAnalysis {
    export class CachingBase<TEntry>
    {
        protected  mask: number = 0;
        protected  entries: TEntry[] = null;
        ctor_1934(size: number): CachingBase<TEntry> {
            var alignedSize = CachingBase.AlignSize(size);
            this.mask = alignedSize - 1;
            this.entries = new Array(alignedSize);
            return this;
        }
        private static AlignSize(size: number): number {
            System.Diagnostics.Debug.Assert(size > 0);
            size--;
            size |= size >> 1;
            size |= size >> 2;
            size |= size >> 4;
            size |= size >> 8;
            size |= size >> 16;
            return size + 1;
        }
        constructor() { }
    }
    export class CachingFactory<TKey, TValue> extends CachingBase<CachingFactory.Entry<TKey, TValue>>
    {
        private size: number = 0;
        private valueFactory: (_: TKey) => TValue;
        private keyHash: (_: TKey) => number;
        private keyValueEquality: (_: TKey, __: TValue) => boolean;
        ctor_1794(size: number, valueFactory: (_: TKey) => TValue, keyHash: (_: TKey) => number, keyValueEquality: (_: TKey, __: TValue) => boolean): CachingFactory<TKey, TValue> {
            super.ctor_1934(size);
            InitArray(CachingFactory.Entry,this.entries);
            this.size = size;
            this.valueFactory = valueFactory;
            this.keyHash = keyHash;
            this.keyValueEquality = keyValueEquality;
            return this;
        }
        public Add(key: TKey, value: TValue): void {
            var hash = this.GetKeyHash(key);
            var idx = hash & this.mask;
            this.entries[idx].hash = hash;
            this.entries[idx].value = value;
        }
        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            var hash: number = this.GetKeyHash(key);
            var idx: number = hash & this.mask;
            var entries = this.entries;
            if (entries[idx].hash == hash) {
                var candidate = entries[idx].value;
                if (this.keyValueEquality(key, candidate)) {
                    value.refObj = candidate;
                    return true;
                }
            }
            value.refObj = null;
            return false;
        }
        public GetOrMakeValue(key: TKey): TValue {
            var hash: number = this.GetKeyHash(key);
            var idx: number = hash & this.mask;
            var entries = this.entries;
            if (entries[idx].hash == hash) {
                var candidate = entries[idx].value;
                if (this.keyValueEquality(key, candidate)) {
                    return candidate;
                }
            }
            var value = this.valueFactory(key);
            entries[idx].hash = hash;
            entries[idx].value = value;
            return value;
        }
        private GetKeyHash(key: TKey): number {
            var result: number = this.keyHash(key) | this.size;
            System.Diagnostics.Debug.Assert(result != 0);
            return result;
        }
        constructor() { super(); }
    }
    export class CachingIdentityFactory<TKey, TValue> extends CachingBase<CachingIdentityFactory.Entry<TKey, TValue>>
    {
        private valueFactory: (_: TKey) => TValue;
        private pool: Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>>;
        ctor_1901(size: number, valueFactory: (_: TKey) => TValue): CachingIdentityFactory<TKey, TValue> {
            super.ctor_1934(size);
            InitArray(CachingIdentityFactory.Entry, this.entries);
            this.valueFactory = valueFactory;
            return this;
        }
        ctor_3951(size: number, valueFactory: (_: TKey) => TValue, pool: Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>>): CachingIdentityFactory<TKey, TValue> {
          
            this.ctor_1901(size, valueFactory);
            InitArray(CachingIdentityFactory.Entry, this.entries);
            this.pool = pool;
            return this;
        }
        public Add(key: TKey, value: TValue): void {
            var hash = System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(key);
            var idx = hash & this.mask;
            this.entries[idx].key = key;
            this.entries[idx].value = value;
        }
        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            var hash: number = System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(key);
            var idx: number = hash & this.mask;
            var entries = this.entries;
            if (<Object>entries[idx].key == <Object>key) {
                value.refObj = entries[idx].value;
                return true;
            }
            value.refObj = null;
            return false;
        }
        public GetOrMakeValue(key: TKey): TValue {
            var hash: number = System.Runtime.CompilerServices.RuntimeHelpers.GetHashCode(key);
            var idx: number = hash & this.mask;
            var entries = this.entries;
            if (<Object>entries[idx].key == <Object>key) {
                return entries[idx].value;
            }
            var value = this.valueFactory(key);
            entries[idx].key = key;
            entries[idx].value = value;
            return value;
        }
        public static CreatePool<TKey,TValue>(size: number, valueFactory: (_: TKey) => TValue): Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>> {
            var pool: Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>> = null;
            pool = new Roslyn.Utilities.ObjectPool<CachingIdentityFactory<TKey, TValue>>().ctor_5203(() => new CachingIdentityFactory<TKey, TValue>().ctor_3951(size, valueFactory, pool), System.Environment.ProcessorCount * 2);
            return pool;
        }
        public Free(): void {
            var pool = this.pool;
            if (pool != null) {
                pool.Free(this);
            }
        }
        constructor() { super(); }
    }
  
    export module CachingFactory {
        export class Entry<TKey, TValue> implements IStruct {
            public hash: number = 0;
            public value: TValue = null;
            constructor() { }
        }
    }
    export module CachingIdentityFactory {
        export class Entry<TKey, TValue> implements IStruct {
            public key: TKey = null;
            public value: TValue = null;
            constructor() { }
        }
    }
}
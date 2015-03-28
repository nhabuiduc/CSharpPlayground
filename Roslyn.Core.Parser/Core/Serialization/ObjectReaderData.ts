module Roslyn.Utilities {
    export class ObjectReaderData implements System.IDisposable {
        public static ListPool: ObjectPool<System.Collections.Generic.List<Object>> = new ObjectPool<System.Collections.Generic.List<Object>>().ctor_5203(() => new System.Collections.Generic.List<Object>(128), 2);
        private baseData: ObjectReaderData;
        private values: System.Collections.Generic.List<Object> = ObjectReaderData.ListPool.Allocate();
        private baseDataCount: number = 0;
        ctor_3282(...items: Object[]): ObjectReaderData {
            this.ctor_1102(<System.Collections.Generic.IEnumerable<Object>>items);
            return this;
        }
        ctor_1102(items: System.Collections.Generic.IEnumerable<Object>): ObjectReaderData {
            if (items != null) {
                // for each
                var valueEnumerator = items.GetEnumerator();
                try {
                    while (valueEnumerator.MoveNext()) {
                        var value = valueEnumerator.Current;
                        // foreach block
                        this.values.Add(value);
                    }
                } finally {
                    if (valueEnumerator !== null) valueEnumerator.Dispose();

                }    
                // end foreach
            }
            return this;
        }
        ctor_1681(baseData: ObjectReaderData): ObjectReaderData {
            System.Diagnostics.Debug.Assert(baseData == null || baseData.baseData == null, "Should be <= 1 level deep");
            this.baseData = baseData;
            this.baseDataCount = (baseData != null) ? baseData.values.Count : 0;
            return this;
        }
        public Dispose(): void {
            this.values.Clear();
            ObjectReaderData.ListPool.Free(this.values);
        }
        public GetNextId(): number {
            this.values.Add(null);
            return this.baseDataCount + this.values.Count - 1;
        }
        public AddValue(id: number, value: Object): void {
            this.values.$set$(id - this.baseDataCount, value);
        }
        public GetValue(id: number): Object {
            if (this.baseData != null) {
                if (id < this.baseDataCount) {
                    return this.baseData.GetValue(id);
                }
                else {
                    return this.values.$get$(id - this.baseDataCount);
                }
            }
            else {
                return this.values.$get$(id);
            }
        }
        constructor() { }
    }
}
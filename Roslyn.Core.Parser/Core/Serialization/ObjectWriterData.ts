module Roslyn.Utilities {
    export class ObjectWriterData implements System.IDisposable {
        public static DictionaryPool: ObjectPool<System.Collections.Generic.ObjectDictionary<Object, number>>
        = new ObjectPool<System.Collections.Generic.ObjectDictionary<Object, number>>()
            .ctor_5203(() => new System.Collections.Generic.ObjectDictionary<Object, number>(128), 2);
        private baseData: ObjectWriterData;
        private valueToIdMap: System.Collections.Generic.ObjectDictionary<Object, number> = ObjectWriterData.DictionaryPool.Allocate();
        private nextId: number = 0;
        ctor_5212(...items: Object[]): ObjectWriterData {
            this.ctor_7515(<System.Collections.Generic.IEnumerable<Object>>items);
            return this;
        }
        ctor_7515(items: System.Collections.Generic.IEnumerable<Object>): ObjectWriterData {
            if (items != null) {
                // for each
                var valueEnumerator = items.GetEnumerator();
                try {
                    while (valueEnumerator.MoveNext()) {
                        var value = valueEnumerator.Current;
                        // foreach block
                        this.valueToIdMap.Add(value, this.valueToIdMap.Count);
                    }
                } finally {
                    if (valueEnumerator !== null) valueEnumerator.Dispose();

                }    
                // end foreach
            }
            this.nextId = this.valueToIdMap.Count;
            return this;
        }
        ctor_6162(baseData: ObjectWriterData): ObjectWriterData {
            this.baseData = baseData;
            this.nextId = (baseData != null) ? baseData.nextId : 0;
            return this;
        }
        public Dispose(): void {
            if (this.valueToIdMap.Count > 1024) {
                ObjectWriterData.DictionaryPool.ForgetTrackedObject(this.valueToIdMap);
                return
            }
            this.valueToIdMap.Clear();
            ObjectWriterData.DictionaryPool.Free(this.valueToIdMap);
        }
        public TryGetId(value: Object, id: { refObj: number }): boolean {
            if (this.baseData != null && this.baseData.TryGetId(value, id)) {
                return true;
            }
            return this.valueToIdMap.TryGetValue(value, id);
        }
        private GetNextId(): number {
            var id = this.nextId;
            this.nextId++;
            return id;
        }
        public Add(value: Object): number {
            var id = this.GetNextId();
            this.valueToIdMap.Add(value, id);
            return id;
        }
        constructor() { }
    }
}
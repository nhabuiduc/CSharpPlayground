///<reference path="../Generic/ObjectDictionary.ts"/>
module System.Collections.Concurrent {
    export class ConcurrentDictionary<TKey, TValue> extends Generic.ObjectDictionary<TKey, TValue>
    {
        public TryAdd(key: TKey, value: TValue) {
            if (!this.ContainsKey(key)) {
                this.Add(key, value);
            }
        }
    }
}
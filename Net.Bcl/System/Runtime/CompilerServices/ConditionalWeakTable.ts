///<reference path="../../Collections/Generic/ObjectDictionary.ts"/>
module System.Runtime.CompilerServices {
    export class ConditionalWeakTable<TKey, TValue> {
        private dictionary = new System.Collections.Generic.ObjectDictionary<TKey, TValue>();
        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            return this.dictionary.TryGetValue(key, value);
        }

        public Add(key: TKey, value: TValue): void {
            this.dictionary.Add(key, value);
        }

        //public GetOrCreateValue(key: TKey): TValue {

        //}

        public GetValue(key: TKey, callBack: (_: TKey) => TValue): TValue {
            var refValue: { refObj: TValue } = { refObj: null };
            if (this.TryGetValue(key, refValue)) {
                return refValue.refObj;
            }

            var newValue = callBack(key);
            this.Add(key, newValue);
            return newValue;
        }
    }
}
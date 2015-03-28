module System.Collections.Immutable {
    export class ImmutableDictionary<TKey, TValue>
    {
        constructor(isNumberOrStrKey?: boolean) {
            if (isNumberOrStrKey !== void 0){
                isNumberOrStrKey = false;
            }

            this.innerDic = isNumberOrStrKey
                ? new System.Collections.Generic.Dictionary<TKey, TValue>() 
                : new System.Collections.Generic.ObjectDictionary<TKey, TValue>();
        }
        private innerDic: System.Collections.Generic.Dictionary<TKey, TValue> = null;
        public static Empty: ImmutableDictionary<any, any> = new ImmutableDictionary<any, any>();
        public SetItem(key: TKey, value: TValue): ImmutableDictionary<TKey, TValue> {
            var cloned = this.Clone();
            cloned.$set$(key, value);
            var newDic = new ImmutableDictionary<TKey, TValue>();
            newDic.innerDic = cloned;
            return newDic;
        }
        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            var value_ref0 = { refObj: value.refObj };
            var ret_val_ = this.innerDic.TryGetValue(key, value);

            value.refObj = value_ref0.refObj;
            return ret_val_;
        }
        private Clone(): System.Collections.Generic.Dictionary<TKey, TValue> {
            return this.innerDic.Clone();
        }

        public static Create<TKey, TValue>(): ImmutableDictionary<TKey, TValue> {
            return ImmutableDictionary.Empty;
        }

        public static ToImmutableDictionary<TKey, TValue>(dic: Collections.Generic.Dictionary<TKey, TValue>): ImmutableDictionary<TKey, TValue>{
            var result = new ImmutableDictionary<TKey, TValue>();
            result.innerDic = dic.Clone();
            return result;
        }
    }
}
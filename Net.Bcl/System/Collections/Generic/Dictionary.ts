module System.Collections.Generic {
    export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue>{

        // try to use JavaScript Object is implemented with a hash table.
        // but it only works with string,number
        // for other, temporary solution is using list
        private obj: any = new Object();
        
        constructor();
        constructor(dic: Dictionary<TKey, TValue>);
        constructor(dic?: Dictionary<TKey, TValue>) {
            if (typeof dic == 'undefined') {
                return;
            }

            for (var key in dic.obj) {
                this.obj[key] = dic.obj[key];
            }

        }

        public Clone() {
            return new Dictionary<TKey, TValue>(this);
        }

        public get Count(): number {
            return this.Keys.Count;
        }

        public Clear(): void {
            this.obj = new Object();
        }

        // with other types, I have one way is to use List

        public $get$(key: TKey): TValue {
            if (typeof key === 'number' || typeof key == 'string') {
                if (this.ContainsKey(key)) {
                    return this.obj[<any>key];
                }

                throw new Error("don't have this key");
            }

            throw new Error("don't have this key");
        }

        public $set$(key: TKey, value: TValue): void {
            if (typeof key == 'string' || typeof key == 'number') {
                this.obj[<any>key] = value;
                return;
            }

            throw new Error('not support');
        }

        public get Keys(): ICollection<TKey> {
            var keys = new List<TKey>();
            for (var key in this.obj) {
                keys.Add(<TKey>key);
            }

            return keys;
        }

        public get Values(): ICollection<TValue> {
            var values = new List<TValue>();
            for (var key in this.obj) {
                values.Add(<TValue>this.obj[<any>key]);
            }

            return values;
        }

        public ContainsKey(key: TKey): boolean {
            return typeof this.obj[<any>key] != 'undefined';
        }

        public Add(key: TKey, value: TValue): void {
            if (this.ContainsKey(key)) {
                throw new Error("Already have this key");
            }

            this.$set$(key, value);
        }

        public Remove(key: TKey): boolean {
            if (this.ContainsKey(key)) {                
                delete this.obj[<any>key];
                return true; 
            }
            
        }

        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            if (this.ContainsKey(key)) {
                value.refObj = this.$get$(key);
                return true;
            }

            return false;
        }

        public GetEnumerator(): IEnumerator<KeyValuePair<TKey, TValue>> {
            var values = new List<KeyValuePair<TKey, TValue>>();
            for (var key in this.obj) {
                values.Add(new KeyValuePair<TKey, TValue>(key, this.obj[key]));
            }

            return new Dictionary.Enumerator<TKey, TValue>(values);
        }
    }

    export module Dictionary {
        export class Enumerator<TKey, TValue> implements System.Collections.Generic.IEnumerator<KeyValuePair<TKey, TValue>>, System.Collections.IEnumerator {
            private list: System.Collections.Generic.List<KeyValuePair<TKey, TValue>> = null;
            private index: number = 0;
            private version: number = 0;
            private current: KeyValuePair<TKey, TValue> = null;
            constructor(list: System.Collections.Generic.List<KeyValuePair<TKey, TValue>>) {
                this.list = list;
                this.index = 0;
                this.version = (<any>list)._version;
                this.current = null;
            }
            public Dispose(): void {

            }
            public MoveNext(): boolean {
                var localList: System.Collections.Generic.List<KeyValuePair<TKey, TValue>> = this.list;
                if (this.version == (<any>localList)._version && (<number>this.index < <number>(<any>localList)._size)) {
                    this.current = (<any>localList)._items[this.index];
                    this.index++;
                    return true;
                }
                return this.MoveNextRare();
            }
            private MoveNextRare(): boolean {
                if (this.version != (<any>this.list)._version) {
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                }
                this.index = (<any>this.list)._size + 1;
                this.current = null;
                return false;
            }
            public get Current(): KeyValuePair<TKey, TValue> {
                return this.current;
            }
            //get Current(): Object {
            //    if (this.index == 0 || this.index == this.list._size + 1) {
            //        ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumOpCantHappen);
            //    }
            //    return this.Current;
            //}
            Reset(): void {
                if (this.version != (<any>this.list)._version) {
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                }
                this.index = 0;
                this.current = null;
            }
        }
    }
}
///<reference path="Dictionary.ts"/>
///<reference path="List.ts"/>
///<reference path="KeyValuePair"/>
module System.Collections.Generic {
    export class ObjectDictionary<TKey, TValue> extends Dictionary<TKey, TValue>{

        // try to use JavaScript Object is implemented with a hash table.
        // but it only works with string,number
        // for other, temporary solution is using list
       
        private list: List<KeyValuePair<TKey, TValue>> ;
        constructor();
        constructor(length: number);
        constructor(dic: ObjectDictionary<TKey, TValue>);
        constructor(param?: any) {
            super();
            if (typeof param === 'undefined') {
                this.list = new List<KeyValuePair<TKey, TValue>>();
                return;
            }

            if (typeof param === 'number') {
                this.list = new List<KeyValuePair<TKey, TValue>>(param);
                return;
            }

            this.list = new List<KeyValuePair<TKey, TValue>>();
            for (var i = 0; i < param.list.Count; i++) {
                this.list.Add(param.list.$get$(i));
            }
        }

        public Clone() {
            return new ObjectDictionary<TKey, TValue>(this);
        }

        private Find(key: TKey): KeyValuePair<TKey, TValue> {
            for (var i = 0; i < this.list.Count; i++) {
                var pair = this.list.$get$(i);
                if (EqualityComparer.Default.Equals(pair.Key, key)) {
                    return pair;
                }
            }

            return null;
        }

        public Clear(): void {
            this.list.Clear();
        }

        public get Count(): number {
            return this.list.Count;
        }

        public $get$(key: TKey): TValue {

            var found = this.Find(key);
            if (found != null) {
                return found.Value;
            }

            throw new Error("don't have this key");
        }

        public $set$(key: TKey, value: TValue): void {
            var found = this.Find(key);
            if (found != null) {
                found.Value = value;
            } else {
                this.list.Add(new KeyValuePair(key, value));
            }
        }

        public get Keys(): ICollection<TKey> {
            var keys = new List<TKey>();
            for (var i = 0; i < this.list.Count; i++) {
                var pair = this.list.$get$(i);
                keys.Add(pair.Key);
            }

            return keys;
        }

        public get Values(): ICollection<TValue> {
            var values = new List<TValue>();
           
            for (var i = 0; i < this.list.Count; i++) {
                var pair = this.list.$get$(i);
                values.Add(pair.Value);
            }
            return values;
        }

        public ContainsKey(key: TKey): boolean {
            var found = this.Find(key);
            return found != null;
        }

        public Add(key: TKey, value: TValue): void {
            if (this.ContainsKey(key)) {
                throw new Error("Already have this key");
            }

            this.$set$(key, value);
        }

        public Remove(key: TKey): boolean {
            
            var found = this.Find(key);
            if (found != null) {
                this.list.Remove(found);
                return true;
            }

            return false;
        }

        public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
            if (this.ContainsKey(key)) {
                value.refObj = this.$get$(key);
                return true;
            }

            return false;
        }

        public GetEnumerator(): IEnumerator<KeyValuePair<TKey, TValue>> {
            //var values = new List<KeyValuePair<TKey, TValue>>();
            

            return new Dictionary.Enumerator<TKey, TValue>(this.list);
        }
    }
}
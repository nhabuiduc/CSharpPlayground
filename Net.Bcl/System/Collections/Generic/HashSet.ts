module System.Collections.Generic {
    export class HashSet<T> implements IEnumerable<T>  {

        private list = new List<T>();

        public get Count(): number {
            return this.list.Count;
        }

        constructor(items?: IEnumerable<T>) {
            if (items === void 0) {
                return;
            }
            this.list.AddRange(items);
        }

        public Add(item: T): boolean {
            if (this.Contains(item)) {
                return false;
            }

            this.list.Add(item);
        }

        public Contains(item: T): boolean {
            return this.list.Contains(item);
        }

        public Clear(): void {
            this.list.Clear();
        }

        public GetEnumerator(): IEnumerator<T> {
            return this.list.GetEnumerator();
        }

        public SetEquals(another: IEnumerable<T>): boolean {

            var elementEnumerator = another.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    if (!this.Contains(element)) {
                        return false;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    

            var arr = Linq.Enumerable.ToList(another);

            var elementEnumerator = this.list.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    if (!arr.Contains(element)) {
                        return false;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            
            return true;
            //return Linq.Enumerable.SequenceEqual(this, another);

            //if (this.Count != set.Count) {
            //    return false;
            //}

            //outerFor:for (var i = 0; i < this.Count; i++) {
            //    for (var j = 0; j < set.Count; j++) {
            //        if (this.list.$get$(i) == set.list.$get$(j)) {
            //            continue outerFor;
            //        }
            //    }
            //    return false;
            //}

            //return true;
        }
    }
}
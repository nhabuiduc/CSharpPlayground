module Roslyn.Utilities {
    export class ConsList<T> implements System.Collections.Generic.IEnumerable<T>
    {
        public static Empty: ConsList<any> = new ConsList<any>().ctor_4411();
        public head: T ;
        public tail: ConsList<T> ;
        ctor_4411(): ConsList<T> {
            
            this.head = null;
            this.tail = null;
            return this;
        }
        ctor_9301(head: T, tail: ConsList<T>): ConsList<T> {
            System.Diagnostics.Debug.Assert(tail != null);
            this.head = head;
            this.tail = tail;
            return this;
        }
        public get Head(): T {
            System.Diagnostics.Debug.Assert(this != ConsList.Empty);
            return this.head;
        }
        public get Tail(): ConsList<T> {
            System.Diagnostics.Debug.Assert(this != ConsList.Empty);
            return this.tail;
        }
        public Any(): boolean {
            return this != ConsList.Empty;
        }
        public Push(value: T): ConsList<T> {
            return new ConsList<T>().ctor_9301(value, this);
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    return this.GetEnumerator();
        //}
        //System.Collections.Generic.IEnumerable<T>.GetEnumerator(): System.Collections.Generic.IEnumerator<T> {
        //    return this.GetEnumerator();
        //}
        public GetEnumerator(): ConsList.Enumerator<T> {
            return new ConsList.Enumerator<T>().ctor_9667(this);
        }
        public ToString(): string {
            var result: System.Text.StringBuilder = new System.Text.StringBuilder();
            var any: boolean = false;
            for (var list: ConsList<T> = this; list.tail != null; list = list.tail) {
                if (any) {
                    result.Append(", ");
                }
                result.Append(list.head);
                any = true;
            }
            result.Append("]");
            return result.ToString();
        }
        constructor() { }
    }
    export module ConsList {
        export class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>, IStruct {
            private current: T = null;
            private tail: ConsList<T> = null;
            ctor_9667(list: ConsList<T>): Enumerator<T> {
                this.current = null;
                this.tail = list;
                return this;
            }
            public get Current(): T {
                System.Diagnostics.Debug.Assert(this.tail != null);
                return this.current;
            }
            public MoveNext(): boolean {
                var currentTail = this.tail;
                var newTail = currentTail.tail;
                if (newTail != null) {
                    this.current = currentTail.head;
                    this.tail = newTail;
                    return true;
                }
                this.current = null;
                return false;
            }
            public Dispose(): void {

            }
            //get Current(): Object {
            //    return this.Current;
            //}
            public Reset(): void {
                throw new System.NotSupportedException();
            }
            constructor() { }
        }
    }
}
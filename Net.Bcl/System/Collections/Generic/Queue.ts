module System.Collections.Generic {
    export class Queue<T> implements IEnumerable<T>, System.Collections.ICollection {
        private _array: T[];
        private _head: number = 0;
        private _tail: number = 0;
        public _size: number = 0;
        public _version: number = 0;
        private _syncRoot: Object;
        private _MinimumGrow: number = 4;
        private _ShrinkThreshold: number = 32;
        private _GrowFactor: number = 200;
        private _DefaultCapacity: number = 4;
        private _emptyArray: T[] = new Array(0);
        get Count(): number {
            return this._size;
        }
        get IsSynchronized(): boolean {
            return false;
        }
        get SyncRoot(): Object {
            //if (this._syncRoot == null) {
            //    var _syncRoot_ref = { refObj: this._syncRoot };
            //    System.Threading.Interlocked.CompareExchange<Object>(_syncRoot_ref, new Object(), null);
            //    this._syncRoot = _syncRoot_ref.refObj;;
            //}
            return this._syncRoot;
        }
        public Clear(): void {
            if (this._head < this._tail)
                TSArray.Clear(this._array, this._head, this._size);
            else {
                TSArray.Clear(this._array, this._head, this._array.length - this._head);
                TSArray.Clear(this._array, 0, this._tail);
            }
            this._head = 0;
            this._tail = 0;
            this._size = 0;
            this._version++;
        }
        public Enqueue(item: T): void {
            if (this._size == this._array.length) {
                var newcapacity: number = <number>(<number>this._array.length * <number>(this._GrowFactor / 100 | 0));
                if (newcapacity < this._array.length + this._MinimumGrow) {
                    newcapacity = this._array.length + this._MinimumGrow;
                }
                this.SetCapacity(newcapacity);
            }
            this._array[this._tail] = item;
            this._tail = (this._tail + 1) % this._array.length;
            this._size++;
            this._version++;
        }
        public Dequeue(): T {
            if (this._size == 0)
                ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EmptyQueue);
            var removed: T = this._array[this._head];
            this._array[this._head] = null;
            this._head = (this._head + 1) % this._array.length;
            this._size--;
            this._version++;
            return removed;
        }
        public Peek(): T {
            if (this._size == 0)
                ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EmptyQueue);
            return this._array[this._head];
        }
        public Contains(item: T): boolean {
            var index: number = this._head;
            var count: number = this._size;
            //var c: EqualityComparer<T> = EqualityComparer<T>.Default;
            while (count-- > 0) {
                if ((<Object>item) == null) {
                    if ((<Object>this._array[index]) == null)
                        return true;
                }
                else if (this._array[index] != null && this._array[index] == item) {
                    return true;
                }
                index = (index + 1) % this._array.length;
            }
            return false;
        }
        public GetElement(i: number): T {
            return this._array[(this._head + i) % this._array.length];
        }
        public ToArray(): T[] {
            var arr: T[] = new Array(this._size);
            if (this._size == 0)
                return arr;
            if (this._head < this._tail) {
                TSArray.Copy(this._array, this._head, arr, 0, this._size);
            }
            else {
                TSArray.Copy(this._array, this._head, arr, 0, this._array.length - this._head);
                TSArray.Copy(this._array, 0, arr, this._array.length - this._head, this._tail);
            }
            return arr;
        }
        private SetCapacity(capacity: number): void {
            var newarray: T[] = new Array(capacity);
            if (this._size > 0) {
                if (this._head < this._tail) {
                    TSArray.Copy(this._array, this._head, newarray, 0, this._size);
                }
                else {
                    TSArray.Copy(this._array, this._head, newarray, 0, this._array.length - this._head);
                    TSArray.Copy(this._array, 0, newarray, this._array.length - this._head, this._tail);
                }
            }
            this._array = newarray;
            this._head = 0;
            this._tail = (this._size == capacity) ? 0 : this._size;
            this._version++;
        }
        public TrimExcess(): void {
            var threshold: number = <number>((<number>this._array.length) * 0.9);
            if (this._size < threshold) {
                this.SetCapacity(this._size);
            }
        }
        constructor(capacity: number);
        constructor(collection: IEnumerable<T>);
        constructor();
        constructor(capacity?: any) {
            if ((typeof capacity === "number")) { this.constructor_Queue_overload0(capacity); return; }
            if ((typeof capacity != 'undefined')) { this.constructor_Queue_overload1(capacity); return; }
            if (!capacity) { this.constructor_Queue_overload2(); return;}
        }
        private constructor_Queue_overload0(capacity: number): void {
            if (capacity < 0)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.capacity, ExceptionResource.ArgumentOutOfRange_NeedNonNegNumRequired);
            this._array = new Array(capacity);
            this._head = 0;
            this._tail = 0;
            this._size = 0;
        }
        private constructor_Queue_overload1(collection: IEnumerable<T>): void {
            if (collection == null)
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.collection);
            this._array = new Array(this._DefaultCapacity);
            this._size = 0;
            this._version = 0;
            var en: IEnumerator<T> = collection.GetEnumerator()
            try {
                while (en.MoveNext()) {
                    this.Enqueue(en.Current);
                }
            }
            finally {
                if (en != null) en.Dispose();
            }
        }
        private constructor_Queue_overload2(): void {
            this._array = this._emptyArray;
        }
        CopyTo(array: Array<any>, index: number): void;
        public CopyTo(array: T[], arrayIndex: number): void;
        CopyTo(array: any, index: number): void {
            if ((array && array instanceof Array) && index) { return this.CopyTo_overload0(array, index); }
           // if ((array && array instanceof Array) && index) { return this.CopyTo_overload1(array, index); }
        }
        private CopyTo_overload0(array: Array<any>, index: number): void {
            if (array == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.array);
            }

            var arrayLen: number = array.length;
            if (index < 0 || index > arrayLen) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
            }
            if (arrayLen - index < this._size) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            }
            var numToCopy: number = (arrayLen - index < this._size) ? arrayLen - index : this._size;
            if (numToCopy == 0)
                return
            try {
                var firstPart: number = (this._array.length - this._head < numToCopy) ? this._array.length - this._head : numToCopy;
                TSArray.Copy(this._array, this._head, array, index, firstPart);
                numToCopy -= firstPart;
                if (numToCopy > 0) {
                    TSArray.Copy(this._array, 0, array, index + this._array.length - this._head, numToCopy);
                }
            }
            catch (err) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidArrayType);
            }

        }
        //private CopyTo_overload1(array: T[], arrayIndex: number): void {
        //    if (array == null) {
        //        ThrowHelper.ThrowArgumentNullException(ExceptionArgument.array);
        //    }
        //    if (arrayIndex < 0 || arrayIndex > array.length) {
        //        ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.arrayIndex, ExceptionResource.ArgumentOutOfRange_Index);
        //    }
        //    var arrayLen: number = array.length;
        //    if (arrayLen - arrayIndex < this._size) {
        //        ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
        //    }
        //    var numToCopy: number = (arrayLen - arrayIndex < this._size) ? (arrayLen - arrayIndex) : this._size;
        //    if (numToCopy == 0)
        //        return
        //    var firstPart: number = (this._array.length - this._head < numToCopy) ? this._array.length - this._head : numToCopy;
        //    TSArray.Copy(this._array, this._head, array, arrayIndex, firstPart);
        //    numToCopy -= firstPart;
        //    if (numToCopy > 0) {
        //        TSArray.Copy(this._array, 0, array, arrayIndex + this._array.length - this._head, numToCopy);
        //    }
        //}
        GetEnumerator(): IEnumerator<T>;
        GetEnumerator(): System.Collections.IEnumerator;
        public GetEnumerator(): Queue.Enumerator<T>;
        GetEnumerator(): any {
            return this.GetEnumerator_overload0()
            //return this.GetEnumerator_overload1()
            //return this.GetEnumerator_overload2()
        }
        private GetEnumerator_overload0(): IEnumerator<T> {
            return new Queue.Enumerator(this);
        }
        //private GetEnumerator_overload1(): System.Collections.IEnumerator {
        //    return new Queue.Enumerator(this);
        //}
        //private GetEnumerator_overload2(): Queue.Enumerator<T> {
        //    return new Queue.Enumerator(this);
        //}
    }
    export module Queue {
        export class Enumerator<T> {
            private _q: Queue<T>;
            private _index: number = 0;
            private _version: number = 0;
            private _currentElement: T;
            constructor(q: Queue<T>) {
                this._q = q;
                this._version = this._q._version;
                this._index = -1;
                this._currentElement = null;
            }
            public Dispose(): void {
                this._index = -2;
                this._currentElement = null;
            }
            public MoveNext(): boolean {
                if (this._version != this._q._version)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                if (this._index == -2)
                    return false;
                this._index++;
                if (this._index == this._q._size) {
                    this._index = -2;
                    this._currentElement = null;
                    return false;
                }
                this._currentElement = this._q.GetElement(this._index);
                return true;
            }
            get Current(): T {
                if (this._index < 0) {
                    if (this._index == -1)
                        ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumNotStarted);
                    else ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumEnded);
                }
                return this._currentElement;
            }
            Reset(): void {
                if (this._version != this._q._version)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                this._index = -1;
                this._currentElement = null;
            }
        }
    }
}
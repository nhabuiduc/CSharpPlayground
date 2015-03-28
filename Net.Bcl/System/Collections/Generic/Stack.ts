module System.Collections.Generic {
    export class Stack<T> implements IEnumerable<T>, System.Collections.ICollection {
        public _array: T[];
        public _size: number = 0;
        public _version: number = 0;
        private _syncRoot: Object;
        private _defaultCapacity: number = 4;
        private _emptyArray: Array<T> = new Array(0);
        get Count(): number {
            return this._size;
        }
        get IsSynchronized(): boolean {
            return false;
        }
        get SyncRoot(): Object {
            //if (this._syncRoot == null) {
            //    (() => {
            //        var _syncRoot_ref = { refObj: this._syncRoot };
            //        System.Threading.Interlocked.CompareExchange<Object>(_syncRoot_ref, new Object(), null);
            //        this._syncRoot = _syncRoot_ref.refObj;
            //    })();
            //}
            return this._syncRoot;
        }
        public Clear(): void {
            TSArray.Clear(this._array, 0, this._size);
            this._size = 0;
            this._version++;
        }
        public Contains(item: T): boolean {
            var count: number = this._size;
            //var c: EqualityComparer<T> = EqualityComparer<T>.Default;
            while (count-- > 0) {
                if ((<Object>item) == null) {
                    if ((<Object>this._array[count]) == null)
                        return true;
                }
                else if (this._array[count] != null && this._array[count] == item) {
                    return true;
                }
            }
            return false;
        }
        public TrimExcess(): void {
            var threshold: number = <number>((<number>this._array.length) * 0.9);
            if (this._size < threshold) {
                var newarray: T[] = new Array(this._size);
                TSArray.Copy(this._array, 0, newarray, 0, this._size);
                this._array = newarray;
                this._version++;
            }
        }
        public Peek(): T {
            if (this._size == 0)
                ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EmptyStack);
            return this._array[this._size - 1];
        }
        public Pop(): T {
            if (this._size == 0)
                ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EmptyStack);
            this._version++;
            var item: T = this._array[--this._size];
            this._array[this._size] = null;
            return item;
        }
        public Push(item: T): void {
            if (this._size == this._array.length) {
                var newArray: T[] = new Array((this._array.length == 0) ? this._defaultCapacity : 2 * this._array.length);
                TSArray.Copy(this._array, 0, newArray, 0, this._size);
                this._array = newArray;
            }
            this._array[this._size++] = item;
            this._version++;
        }
        public ToArray(): T[] {
            var objArray: T[] = new Array(this._size);
            var i: number = 0;
            while (i < this._size) {
                objArray[i] = this._array[this._size - i - 1];
                i++;
            }
            return objArray;
        }
        constructor(capacity: number);
        constructor(collection: IEnumerable<T>);
        constructor();
        constructor(capacity?: any) {
            if ((capacity && typeof capacity === "number")) { this.constructor_Stack_overload0(capacity); return;}
            // TODO: check interface
            if ((typeof capacity != 'undefined')) { this.constructor_Stack_overload1(capacity); return;}
            if (!capacity) { this.constructor_Stack_overload2(); return; }
        }
        private constructor_Stack_overload0(capacity: number): void {
            if (capacity < 0)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.capacity, ExceptionResource.ArgumentOutOfRange_NeedNonNegNumRequired);
            this._array = new Array(capacity);
            this._size = 0;
            this._version = 0;
        }
        private constructor_Stack_overload1(collection: IEnumerable<T>): void {
            if (collection == null)
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.collection);
            //var c: ICollection<T> = collection as ICollection < T>;
            if (typeof (<any>collection).CopyTo != "undefined") {
                var c: ICollection<T> = <ICollection<T>>collection;
                var count: number = c.Count;
                this._array = new Array(count);
                c.CopyTo(this._array, 0);
                this._size = count;
            }
            else {
                this._size = 0;
                this._array = new Array(this._defaultCapacity);
               
                var en: IEnumerator<T> = collection.GetEnumerator()
                try {
                    while (en.MoveNext()) {
                        this.Push(en.Current);
                    }
                }
                finally {
                    if (en != null) en.Dispose();
                }


            }
        }
        private constructor_Stack_overload2(): void {
            this._array = this._emptyArray;
            this._size = 0;
            this._version = 0;
        }
        CopyTo(array: Array<any>, arrayIndex: number): void;
        public CopyTo(array: T[], arrayIndex: number): void;
        CopyTo(array: any, arrayIndex: number): void {
            if ((array && array instanceof Array) && arrayIndex) { return this.CopyTo_overload0(array, arrayIndex); }
            //if ((array && array instanceof Array) && arrayIndex) { return this.CopyTo_overload1(array, arrayIndex); }
        }
        private CopyTo_overload0(array: Array<any>, arrayIndex: number): void {
            if (array == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.array);
            }

            if (arrayIndex < 0 || arrayIndex > array.length) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.arrayIndex, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (array.length - arrayIndex < this._size) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            }
            try {
                TSArray.Copy(this._array, 0, array, arrayIndex, this._size);
                TSArray.Reverse(array, arrayIndex, this._size);
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
        //        ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.arrayIndex, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
        //    }
        //    if (array.length - arrayIndex < this._size) {
        //        ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
        //    }
        //    TSArray.Copy(this._array, 0, array, arrayIndex, this._size);
        //    TSArray.Reverse(array, arrayIndex, this._size);
        //}
        GetEnumerator(): IEnumerator<T>;
        GetEnumerator(): System.Collections.IEnumerator;
        public GetEnumerator(): Stack.Enumerator<T>;
        GetEnumerator(): any {
            return this.GetEnumerator_overload0()
            //return this.GetEnumerator_overload1()
            //return this.GetEnumerator_overload2()
        }
        private GetEnumerator_overload0(): IEnumerator<T> {
            return new Stack.Enumerator<T>(this);
        }
        //private GetEnumerator_overload1(): System.Collections.IEnumerator {
        //    return new Stack.Enumerator<T>(this);
        //}
        //private GetEnumerator_overload2(): Stack.Enumerator<T> {
        //    return new Stack.Enumerator<T>(this);
        //}
    }
    export module Stack {
        export class Enumerator<T> {
            private _stack: Stack<T>;
            private _index: number = 0;
            private _version: number = 0;
            private currentElement: T;
            constructor(stack: Stack<T>) {
                this._stack = stack;
                this._version = this._stack._version;
                this._index = -2;
                this.currentElement = null;
            }
            public Dispose(): void {
                this._index = -1;
            }
            public MoveNext(): boolean {
                var retval: boolean;
                if (this._version != this._stack._version)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                if (this._index == -2) {
                    this._index = this._stack._size - 1;
                    retval = (this._index >= 0);
                    if (retval)
                        this.currentElement = this._stack._array[this._index];
                    return retval;
                }
                if (this._index == -1) {
                    return false;
                }
                retval = (--this._index >= 0);
                if (retval)
                    this.currentElement = this._stack._array[this._index];
                else this.currentElement = null;
                return retval;
            }
            get Current(): T {
                if (this._index == -2)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumNotStarted);
                if (this._index == -1)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumEnded);
                return this.currentElement;
            }

            Reset(): void {
                if (this._version != this._stack._version)
                    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
                this._index = -2;
                this.currentElement = null;
            }
        }
    }
}
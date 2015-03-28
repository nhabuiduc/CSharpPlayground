///<reference path="../../Diagnostics/Contracts/Contract.ts"/>
///<reference path="../../ThrowHelper.ts"/>
module System.Collections.Generic {
    export class List<T> implements IList<T>, System.Collections.IList, IReadOnlyList<T>
    {
        private static _defaultCapacity: number = 4;
        private _items: T[] = null;
        private _size: number = 0;
        private _version: number = 0;
        private _syncRoot: Object = null;
        static _emptyArray: any[] = new Array(0);
        public get Capacity(): number {
            return this._items.length;
        }

        public set Capacity(value: number) {
            if (value < this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.value, ExceptionResource.ArgumentOutOfRange_SmallCapacity);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (value != this._items.length) {
                if (value > 0) {
                    var newItems: T[] = new Array(value);
                    if (this._size > 0) {
                        TSArray.Copy(this._items, 0, newItems, 0, this._size);
                    }
                    this._items = newItems;
                }
                else {
                    this._items = List._emptyArray;
                }
            }
        }
        public get Count(): number {
            return this._size;
        }
        get IsFixedSize(): boolean {
            return false;
        }
        get IsReadOnly(): boolean {
            return false;
        }

        get IsSynchronized(): boolean {
            return false;
        }
        get SyncRoot(): Object {
            //if (this._syncRoot == null) {
            //    var _syncRoot_ref0 = { refObj: this._syncRoot };
            //    System.Threading.System.Threading.Interlocked.CompareExchange<Object>(_syncRoot_ref0, new Object(), null);

            //    this._syncRoot = _syncRoot_ref0.refObj;
            //    ;;
            //}
            return this._syncRoot;
        }
        public $get$(index: number): T {
            if (<number>index >= <number>this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException();
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            return this._items[index];
        }
        public $set$(index: number, value: T): void {
            if (<number>index >= <number>this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException();
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            this._items[index] = value;
            this._version++;
        }
        //private static IsCompatibleObject(value: Object): boolean {
        //    return ((value instanceof T) || (value === null && null == null));
        //}

        public AddRange(collection: IEnumerable<T>): void {
            //System.Diagnostics.Contracts.Contract.Ensures(this.Count >= System.Diagnostics.Contracts.Contract.OldValue(this.Count));
            this.InsertRange(this._size, collection);
        }
        //public AsReadOnly(): System.Collections.ObjectModel.ReadOnlyCollection<T> {
        //    System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<System.Collections.ObjectModel.ReadOnlyCollection<T>>() != null);
        //    return new System.Collections.ObjectModel.ReadOnlyCollection<T>(this);
        //}
        public Clear(): void {
            if (this._size > 0) {
                TSArray.Clear(this._items, 0, this._size);
                this._size = 0;
            }
            this._version++;
        }
        //public ConvertAll<TOutput>(converter: Converter<T, TOutput>): List<TOutput> {
        //    if (converter == null) {
        //        ThrowHelper.ThrowArgumentNullException(ExceptionArgument.converter);
        //    }
        //    System.Diagnostics.Contracts.Contract.EndContractBlock();
        //    var list: List<TOutput> = new List<TOutput>(this._size);
        //    for (var i: number = 0; i < this._size; i++) {
        //        list._items[i] = converter(this._items[i]);
        //    }
        //    list._size = this._size;
        //    return list;
        //}
        private EnsureCapacity(min: number): void {
            if (this._items.length < min) {
                var newCapacity: number = this._items.length == 0 ? List._defaultCapacity : this._items.length * 2;

                if (<number>newCapacity > 100000000)
                    newCapacity = 100000000;
                if (newCapacity < min)
                    newCapacity = min;
                this.Capacity = newCapacity;
            }
        }
        public ForEach(action: (_: T) => void): void {
            if (action == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.match);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            var version: number = this._version;
            for (var i: number = 0; i < this._size; i++) {
                //if (version != this._version && BinaryCompatibility.TargetsAtLeast_Desktop_V4_5) {
                //    break;
                //}
                action(this._items[i]);
            }
            //if (version != this._version && BinaryCompatibility.TargetsAtLeast_Desktop_V4_5)
            //    ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation_EnumFailedVersion);
        }
        public GetRange(index: number, count: number): List<T> {
            if (index < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (count < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (this._size - index < count) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            }
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<List<T>>() != null);
            // System.Diagnostics.Contracts.Contract.EndContractBlock();
            var list: List<T> = new List<T>(count);
            TSArray.Copy(this._items, index, list._items, 0, count);
            list._size = count;
            return list;
        }
        public InsertRange(index: number, collection: IEnumerable<T>): void {
            if (collection == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.collection);
            }
            if (<number>index > <number>this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();

            if (typeof collection["Count"] != 'undefined' && typeof collection['CopyTo'] != 'undefined') {
                var c: ICollection<T> = <ICollection<T>> collection;
                var count: number = c.Count;
                if (count > 0) {
                    this.EnsureCapacity(this._size + count);
                    if (index < this._size) {
                        TSArray.Copy(this._items, index, this._items, index + count, this._size - index);
                    }
                    if (this == c) {
                        TSArray.Copy(this._items, 0, this._items, index, index);
                        TSArray.Copy(this._items, index + count, this._items, index * 2, this._size - index);
                    }
                    else {
                        var itemsToInsert: T[] = new Array(count);
                        c.CopyTo(itemsToInsert, 0);
                        TSArray.Copy(itemsToInsert, 0, this._items, index, itemsToInsert.length);
                        //itemsToInsert.CopyTo(this._items, index);
                    }
                    this._size += count;
                }
            }
            else {
                var en: IEnumerator<T> = collection.GetEnumerator()
                try {
                    while (en.MoveNext()) {
                        this.Insert(index++, en.Current);
                    }
                }
                finally {
                    if (en != null) en.Dispose();
                }
            }
            this._version++;
        }
        public RemoveAll(match: (_: T) => boolean): number {
            if (match == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.match);
            }
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= 0);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() <= System.Diagnostics.Contracts.Contract.OldValue(this.Count));
           // System.Diagnostics.Contracts.Contract.EndContractBlock();
            var freeIndex: number = 0;
            while (freeIndex < this._size && !match(this._items[freeIndex]))
                freeIndex++;
            if (freeIndex >= this._size)
                return 0;
            var current: number = freeIndex + 1;
            while (current < this._size) {
                while (current < this._size && match(this._items[current]))
                    current++;
                if (current < this._size) {
                    this._items[freeIndex++] = this._items[current++];
                }
            }
            TSArray.Clear(this._items, freeIndex, this._size - freeIndex);
            var result: number = this._size - freeIndex;
            this._size = freeIndex;
            this._version++;
            return result;
        }
        public RemoveAt(index: number): void {
            if (<number>index >= <number>this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException();
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            this._size--;
            if (index < this._size) {
                TSArray.Copy(this._items, index + 1, this._items, index, this._size - index);
            }
            this._items[this._size] = null;
            this._version++;
        }
        public RemoveRange(index: number, count: number): void {
            if (index < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (count < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (this._size - index < count)
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (count > 0) {
                var i: number = this._size;
                this._size -= count;
                if (index < this._size) {
                    TSArray.Copy(this._items, index + count, this._items, index, this._size - index);
                }
                TSArray.Clear(this._items, this._size, count);
                this._version++;
            }
        }
        public ToArray(): T[] {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<T[]>() != null);
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<T[]>().length == this.Count);
            var array: T[] = new Array(this._size);
            TSArray.Copy(this._items, 0, array, 0, this._size);
            return array;
        }
        public TrimExcess(): void {
            var threshold: number = <number>((<number>this._items.length) * 0.9);
            if (this._size < threshold) {
                this.Capacity = this._size;
            }
        }
        //public static Synchronized(list: List<T>): IList<T> {
        //    return new List.SynchronizedList(list);
        //}
        constructor(capacity: number);
        constructor(collection: IEnumerable<T>);
        constructor();
        constructor(param0?: any) {
            if (typeof param0 == 'number') { this.constructor_List_overload0(param0); return; }
            if (typeof param0 != 'undefined') { this.constructor_List_overload1(param0); return; }
            if (typeof param0 == 'undefined') { this.constructor_List_overload2(); return; }
            throw new Error('overload failed');
        }
        private constructor_List_overload0(capacity: number): void {
            if (capacity < 0)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.capacity, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (capacity == 0)
                this._items = List._emptyArray;
            else this._items = new Array(capacity);
        }
        private constructor_List_overload1(collection: IEnumerable<T>): void {
            if (collection == null)
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.collection);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (typeof collection["Count"] != 'undefined' && typeof collection['CopyTo'] != 'undefined') {
                var c: ICollection<T> = <ICollection<T>> collection;
                var count: number = c.Count;
                if (count == 0) {
                    this._items = List._emptyArray;
                }
                else {
                    this._items = new Array(count);
                    c.CopyTo(this._items, 0);
                    this._size = count;
                }
            }
            else {
                this._size = 0;
                this._items = List._emptyArray;
                var en: IEnumerator<T> = collection.GetEnumerator()
                try {
                    while (en.MoveNext()) {
                        this.Add(en.Current);
                    }
                }
                finally {
                    if (en != null) en.Dispose();
                }
            }
        }
        private constructor_List_overload2(): void {
            this._items = List._emptyArray;
        }
        
        public Add(item: T): void;
        public Add(item: Object): number;
        Add(param0: any): any {
           return this.Add_overload1(param0);
        }
        //private Add_overload0(item: Object): number {
        //    ThrowHelper.IfNullAndNullsAreIllegalThenThrow<T>(item, ExceptionArgument.item);
        //    try {
        //        this.Add(<T>item);
        //    }
        //    catch (err) {
        //        ThrowHelper.ThrowWrongValueTypeArgumentException(item, "type of list");
        //    }

        //    return this.Count - 1;
        //}
        private Add_overload1(item: T): number {
            if (this._size == this._items.length)
                this.EnsureCapacity(this._size + 1);
            this._items[this._size++] = item;
            this._version++;
            return this.Count - 1;
        }
        public BinarySearch(item: T): number;
        public BinarySearch(item: T, comparer: IComparer<T>): number;
        public BinarySearch(index: number, count: number, item: T, comparer: IComparer<T>): number;
        public BinarySearch(param0: any, param1?: any, param2?: T, param3?: IComparer<T>): number {
            if (typeof param0 == 'number' && typeof param1 == 'number' && typeof param2 != 'undefined' && typeof param3 != 'undefined') { return this.BinarySearch_overload2(param0, param1, param2, param3); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.BinarySearch_overload0(param0); }
            if (typeof param0 != 'undefined' && typeof param1 != 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.BinarySearch_overload1(param0, param1); }
            throw new Error('overload failed');
        }
        private BinarySearch_overload0(item: T): number {
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() <= this.Count);
            return this.BinarySearch(0, this.Count, item, null);
        }
        private BinarySearch_overload1(item: T, comparer: IComparer<T>): number {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() <= this.Count);
            return this.BinarySearch(0, this.Count, item, comparer);
        }
        private BinarySearch_overload2(index: number, count: number, item: T, comparer: IComparer<T>): number {
            if (index < 0)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            if (count < 0)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            if (this._size - index < count)
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() <= index + count);
            //System.Diagnostics.Contracts.Contract.EndContractBlock();
            return TSArray.BinarySearch<T>(this._items, index, count, item, comparer);
        }

        public Contains(item: Object): boolean;
        public Contains(item: T): boolean;
        Contains(param0: any): boolean {
            if (typeof param0 != 'undefined') { return this.Contains_overload1(param0); }
            if (param0 instanceof Object) { return this.Contains_overload0(param0); }
            throw new Error('overload failed');
        }
        private Contains_overload0(item: Object): boolean {
            //if (List.IsCompatibleObject(item)) {
                return this.Contains(<T>item);
           // }
           // return false;
        }
        private Contains_overload1(item: T): boolean {
            if (<Object>item == null) {
                for (var i: number = 0; i < this._size; i++)
                    if (<Object>this._items[i] == null)
                        return true;
                return false;
            }
            else {
                var c: EqualityComparer<T> = EqualityComparer.Default;
                for (var i: number = 0; i < this._size; i++) {
                    if (c.Equals(this._items[i], item))
                        return true;
                }
                return false;
            }
        }
        CopyTo(array: Array<any>, arrayIndex: number): void;
        public CopyTo(index: number, array: T[], arrayIndex: number, count: number): void;
        public CopyTo(array: T[], arrayIndex: number): void;
        public CopyTo(array: T[]): void;
        CopyTo(param0: any, param1?: any, param2?: number, param3?: number): void {
            if (typeof param0 == 'number' && param1 instanceof Array && typeof param2 == 'number' && typeof param3 == 'number') { return this.CopyTo_overload1(param0, param1, param2, param3); }
            if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.CopyTo_overload0(param0, param1); }
            if (param0 instanceof Array && typeof param1 == 'number' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.CopyTo_overload2(param0, param1); }
            if (param0 instanceof Array && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.CopyTo_overload3(param0); }
            throw new Error('overload failed');
        }
        private CopyTo_overload0(array: Array<any>, arrayIndex: number): void {
            //if ((array != null) && (array.Rank != 1)) {
            //    ThrowHelper.ThrowArgumentException(ExceptionResource.Arg_RankMultiDimNotSupported);
            //}
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            try {
                TSArray.Copy(this._items, 0, array, arrayIndex, this._size);
            }
            catch (err) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidArrayType);
            }

        }
        private CopyTo_overload1(index: number, array: T[], arrayIndex: number, count: number): void {
            if (this._size - index < count) {
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            TSArray.Copy(this._items, index, array, arrayIndex, count);
        }
        private CopyTo_overload2(array: T[], arrayIndex: number): void {
            TSArray.Copy(this._items, 0, array, arrayIndex, this._size);
        }
        private CopyTo_overload3(array: T[]): void {
            this.CopyTo(array, 0);
        }
        GetEnumerator(): IEnumerator<T>;
        GetEnumerator(): System.Collections.IEnumerator;
        public GetEnumerator(): List.Enumerator<T>;
        GetEnumerator(): any {
            return this.GetEnumerator_overload0();
            //return this.GetEnumerator_overload1();
            //return this.GetEnumerator_overload2();
        }
        private GetEnumerator_overload0(): IEnumerator<T> {
            return new List.Enumerator(this);
        }
        //private GetEnumerator_overload1(): System.Collections.IEnumerator {
        //    return new List.Enumerator(this);
        //}
        //private GetEnumerator_overload2(): List.Enumerator<T> {
        //    return new List.Enumerator(this);
        //}
        IndexOf(item: Object): number;
        public IndexOf(item: T, index: number): number;
        public IndexOf(item: T, index: number, count: number): number;
        public IndexOf(item: T): number;
        IndexOf(param0: any, param1?: number, param2?: number): number {
            if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'number') { return this.IndexOf_overload2(param0, param1, param2); }
            if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'undefined') { return this.IndexOf_overload1(param0, param1); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.IndexOf_overload3(param0); }
            if (param0 instanceof Object && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.IndexOf_overload0(param0); }
            throw new Error('overload failed');
        }
        private IndexOf_overload0(item: Object): number {
          //  if (List.IsCompatibleObject(item)) {
                return this.IndexOf(<T>item);
           // }
           // return -1;
        }
        private IndexOf_overload1(item: T, index: number): number {
            if (index > this._size)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() < this.Count);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            return TSArray.IndexOf(this._items, item, index, this._size - index);
        }
        private IndexOf_overload2(item: T, index: number, count: number): number {
            if (index > this._size)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
            if (count < 0 || index > this._size - count)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_Count);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() < this.Count);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            return TSArray.IndexOf(this._items, item, index, count);
        }
        private IndexOf_overload3(item: T): number {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() < this.Count);
            return TSArray.IndexOf(this._items, item, 0, this._size);
        }
        
        public Insert(index: number, item: T): void;
        Insert(index: number, item: Object): void;
        Insert(param0: number, param1: any): void {
            if (typeof param0 == 'number' && typeof param1 != 'undefined') { return this.Insert_overload1(param0, param1); }
            if (typeof param0 == 'number' && param1 instanceof Object) { return this.Insert_overload0(param0, param1); }
            throw new Error('overload failed');
        }
        private Insert_overload0(index: number, item: Object): void {
            ThrowHelper.IfNullAndNullsAreIllegalThenThrow<T>(item, ExceptionArgument.item);
            try {
                this.Insert(index, <T>item);
            }
            catch (err) {
                ThrowHelper.ThrowWrongValueTypeArgumentException(item,"TypeList");
            }

        }
        private Insert_overload1(index: number, item: T): void {
            if (<number>index > <number>this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_ListInsert);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (this._size == this._items.length)
                this.EnsureCapacity(this._size + 1);
            if (index < this._size) {
                TSArray.Copy(this._items, index, this._items, index + 1, this._size - index);
            }
            this._items[index] = item;
            this._size++;
            this._version++;
        }
        public LastIndexOf(item: T, index: number): number;
        public LastIndexOf(item: T, index: number, count: number): number;
        public LastIndexOf(item: T): number;
        public LastIndexOf(param0: T, param1?: number, param2?: number): number {
            if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'number') { return this.LastIndexOf_overload1(param0, param1, param2); }
            if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'undefined') { return this.LastIndexOf_overload0(param0, param1); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.LastIndexOf_overload2(param0); }
            throw new Error('overload failed');
        }
        private LastIndexOf_overload0(item: T, index: number): number {
            if (index >= this._size)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_Index);
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
           // System.Diagnostics.Contracts.Contract.Ensures(((this.Count == 0) && (System.Diagnostics.Contracts.Contract.Result<number>() == -1)) || ((this.Count > 0) && (System.Diagnostics.Contracts.Contract.Result<number>() <= index)));
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            return this.LastIndexOf(item, index, index + 1);
        }
        private LastIndexOf_overload1(item: T, index: number, count: number): number {
            if ((this.Count != 0) && (index < 0)) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if ((this.Count != 0) && (count < 0)) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
           // System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
           // System.Diagnostics.Contracts.Contract.Ensures(((this.Count == 0) && (System.Diagnostics.Contracts.Contract.Result<number>() == -1)) || ((this.Count > 0) && (System.Diagnostics.Contracts.Contract.Result<number>() <= index)));
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (this._size == 0) {
                return -1;
            }
            if (index >= this._size) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_BiggerThanCollection);
            }
            if (count > index + 1) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_BiggerThanCollection);
            }
            return TSArray.LastIndexOf(this._items, item, index, count);
        }
        private LastIndexOf_overload2(item: T): number {
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() >= -1);
            //System.Diagnostics.Contracts.Contract.Ensures(System.Diagnostics.Contracts.Contract.Result<number>() < this.Count);
            if (this._size == 0) {
                return -1;
            }
            else {
                return this.LastIndexOf(item, this._size - 1, this._size);
            }
        }

        public Remove(item: T): boolean;
        public Remove(item: Object): void;        
        Remove(param0: any): any {
            if (typeof param0 != 'undefined') { return this.Remove_overload1(param0); }
            if (param0 instanceof Object) { return this.Remove_overload0(param0); }
            throw new Error('overload failed');
        }
        private Remove_overload0(item: Object): void {
            //if (List.IsCompatibleObject(item)) {
                this.Remove(<T>item);
           // }
        }
        private Remove_overload1(item: T): boolean {
            var index: number = this.IndexOf(item);
            if (index >= 0) {
                this.RemoveAt(index);
                return true;
            }
            return false;
        }
        public Reverse(index: number, count: number): void;
        public Reverse(): void;
        public Reverse(param0?: number, param1?: number): void {
            if (typeof param0 == 'number' && typeof param1 == 'number') { return this.Reverse_overload0(param0, param1); }
            if (typeof param0 == 'undefined' && typeof param1 == 'undefined') { return this.Reverse_overload1(); }
            throw new Error('overload failed');
        }
        private Reverse_overload0(index: number, count: number): void {
            if (index < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (count < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (this._size - index < count)
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            TSArray.Reverse(this._items, index, count);
            this._version++;
        }
        private Reverse_overload1(): void {
            this.Reverse(0, this.Count);
        }
        public Sort(comparer: IComparer<T>): void;
        public Sort(index: number, count: number, comparer: IComparer<T>): void;
        public Sort(comparison: (_:T,__:T)=>number): void;
        public Sort(): void;
        public Sort(param0?: any, param1?: number, param2?: IComparer<T>): void {
            if (typeof param0 == 'number' && typeof param1 == 'number' && typeof param2 != 'undefined') { return this.Sort_overload1(param0, param1, param2); }
            if (typeof param0 == 'function' && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.Sort_overload2(param0); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.Sort_overload0(param0); }
            if (typeof param0 == 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined') { return this.Sort_overload3(); }
            throw new Error('overload failed');
           
        }
        private Sort_overload0(comparer: IComparer<T>): void {
            this.Sort(0, this.Count, comparer);
        }
        private Sort_overload1(index: number, count: number, comparer: IComparer<T>): void {
            if (index < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.index, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (count < 0) {
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.count, ExceptionResource.ArgumentOutOfRange_NeedNonNegNum);
            }
            if (this._size - index < count)
                ThrowHelper.ThrowArgumentException(ExceptionResource.Argument_InvalidOffLen);
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            TSArray.Sort(this._items, index, count, comparer);
            this._version++;
        }
        private Sort_overload2(comparison: (_: T, __: T) => number): void {
            if (comparison == null) {
                ThrowHelper.ThrowArgumentNullException(ExceptionArgument.match);
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            if (this._size > 0) {
                var comparer: IComparer<T> = new TSArray.FunctorComparer<T>(comparison);
                TSArray.Sort(this._items, 0, this._size, comparer);
            }
        }
        private Sort_overload3(): void {
            this.Sort(0, this.Count, null);
        }
    }
    //export module List {
    //    export class SynchronizedList implements System.Collections.Generic.IList<T>
    //    {
    //        private _list: System.Collections.Generic.List<T> = null;
    //        private _root: Object = null;
    //        constructor(list: System.Collections.Generic.List<T>) {
    //            this._list = list;
    //            this._root = (<System.Collections.ICollection>list).SyncRoot;
    //        }
    //        public get Count(): number {
    //            lock(_root)
    //            {
    //                return _list.Count;
    //            }
    //        }
    //        public get IsReadOnly(): boolean {
    //            return (<System.Collections.Generic.ICollection<T>>this._list).IsReadOnly;
    //        }
    //        public Add(item: T): void {
    //            lock(_root)
    //            {
    //                _list.Add(item);
    //            }
    //        }
    //        public Clear(): void {
    //            lock(_root)
    //            {
    //                _list.Clear();
    //            }
    //        }
    //        public Contains(item: T): boolean {
    //            lock(_root)
    //            {
    //                return _list.Contains(item);
    //            }
    //        }
    //        public CopyTo(array: T[], arrayIndex: number): void {
    //            lock(_root)
    //            {
    //                _list.CopyTo(array, arrayIndex);
    //            }
    //        }
    //        public Remove(item: T): boolean {
    //            lock(_root)
    //            {
    //                return _list.Remove(item);
    //            }
    //        }
    //        public $get$(index: number): T {
    //            lock(_root)
    //            {
    //                return _list[index];
    //            }
    //        }
    //        public $set$(index: number, value: T): void {
    //            lock(_root)
    //            {
    //                _list[index] = value;
    //            }
    //        }
    //        public IndexOf(item: T): number {
    //            lock(_root)
    //            {
    //                return _list.IndexOf(item);
    //            }
    //        }
    //        public Insert(index: number, item: T): void {
    //            lock(_root)
    //            {
    //                _list.Insert(index, item);
    //            }
    //        }
    //        public RemoveAt(index: number): void {
    //            lock(_root)
    //            {
    //                _list.RemoveAt(index);
    //            }
    //        }
    //        GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
    //        GetEnumerator(): System.Collections.IEnumerator;
    //        GetEnumerator(): any {
    //            return this.GetEnumerator_overload0();
    //            return this.GetEnumerator_overload1();
    //        }
    //        private GetEnumerator_overload0(): IEnumerator<T> {
    //            lock(_root)
    //            {
    //                return ((IEnumerable < T>)_list).GetEnumerator();
    //            }
    //        }
    //        private GetEnumerator_overload1(): System.Collections.IEnumerator {
    //            lock(_root)
    //            {
    //                return _list.GetEnumerator();
    //            }
    //        }
    //    }
    //}
    export module List {
        export class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>, System.Collections.IEnumerator {
            private list: System.Collections.Generic.List<T> = null;
            private index: number = 0;
            private version: number = 0;
            private current: T = null;
            constructor(list: System.Collections.Generic.List<T>) {
                this.list = list;
                this.index = 0;
                this.version = (<any>list)._version;
                this.current = null;
            }
            public Dispose(): void {

            }
            public MoveNext(): boolean {
                var localList: System.Collections.Generic.List<T> = this.list;
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
            public get Current(): T {
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
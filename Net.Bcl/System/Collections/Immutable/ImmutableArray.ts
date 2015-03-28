module System.Collections.Immutable {
    export class ImmutableArray<T> implements System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyList<T>
    {
        public static Empty: ImmutableArray<any> = new ImmutableArray<any>(new Array(0));
        public array: T[] = null;
        get IsDefault(): boolean {
            return this.array == null;
        }
        get Length(): number {
            return this.array.length;
        }
        $get$(index: number): T {
            return this.array[index];
        }
        get IsEmpty(): boolean {
            return this.Length == 0;
        }
        public Contains(item: T): boolean {
            return this.IndexOf(item) >= 0;
        }
        get IsDefaultOrEmpty(): boolean {
            var self = this;
            return self.array == null || self.array.length == 0;
        }
        get Count(): number {
            return this.array.length;
        }
        public ToBuilder(): ImmutableArray.Builder<T> {
            var self = this;
            if (self.Length == 0) {
                return new ImmutableArray.Builder<T>();
            }
            var builder = new ImmutableArray.Builder<T>(self.Length);
            builder.AddRange(self);
            return builder;
        }
        constructor(items: T[]);
        constructor();
        constructor(param0?: T[]) {
            if (typeof param0 == 'undefined') { this.constructor_ImmutableArray_overload1(); return;}
            if (param0 instanceof Array) { this.constructor_ImmutableArray_overload0(param0); return; }
            throw new Error('overload failed');
        }
        private constructor_ImmutableArray_overload0(items: T[]): void {
            this.array = items;
        }
        private constructor_ImmutableArray_overload1(): void {

        }

        public GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
        public GetEnumerator(): IEnumerator;
        
        GetEnumerator(): any {
            return this.GetEnumerator_overload0();
            return this.GetEnumerator_overload1();
        }
        private GetEnumerator_overload0(): IEnumerator {
            var self = this;
            return ImmutableArray.EnumeratorObject.Create(self.array);
        }
        private GetEnumerator_overload1(): System.Collections.Generic.IEnumerator<T> {
            var self = this;
            return ImmutableArray.EnumeratorObject.Create(self.array);
        }
        public IndexOf(item: T, startIndex: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number;
        public IndexOf(item: T): number;
        public IndexOf(param0: T, param1?: number, param2?: number, param3?: System.Collections.Generic.IEqualityComparer<T>): number {
            if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined') { return this.IndexOf_overload0(param0, param1, param2, param3); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.IndexOf_overload1(param0); }
            throw new Error('overload failed');
        }
        private IndexOf_overload0(item: T, startIndex: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number {
            var self = this;
            if (count == 0 && startIndex == 0) {
                return -1;
            }
            if (equalityComparer == System.Collections.Generic.EqualityComparer.Default) {
                return TSArray.IndexOf(self.array, item, startIndex, count);
            }
            else {
                for (var i: number = startIndex; i < startIndex + count; i++) {
                    if (equalityComparer.Equals(self.array[i], item)) {
                        return i;
                    }
                }
                return -1;
            }
        }
        private IndexOf_overload1(item: T): number {
            var self = this;
            return self.IndexOf(item, 0, self.Length, System.Collections.Generic.EqualityComparer.Default);
        }

        public static CreateBuilder<T>(size: number): ImmutableArray.Builder<T> {
            return ImmutableArray.Create<T>().ToBuilder();
        }
        public static CreateRange<T>(items: System.Collections.Generic.IEnumerable<T>): ImmutableArray<T> {
            //var immutableArray = items as IImmutableArray;
            if (items instanceof ImmutableArray) {
                var immutableArray = <ImmutableArray<T>>items
                var existingImmutableArray = immutableArray.array;
                if (existingImmutableArray != null) {
                    return new ImmutableArray<T>(existingImmutableArray);
                }
            }
            var count: number = 0;
            if ((() => {
                var count_ref0 = { refObj: count };
                var ret_val_ = Linq.ImmutableExtensions.TryGetCount(items,
                    count_ref0);

                count = count_ref0.refObj;
                return ret_val_;
            })()) {
                if (count == 0) {
                    return ImmutableArray.Create<T>();
                }
                else {
                    return new ImmutableArray<T>(Linq.ImmutableExtensions.ToArray(items,
                        count));
                }
            }
            else {
                return new ImmutableArray<T>(System.Linq.Enumerable.ToArray(items));
            }
        }
        public static ToImmutableArray<TSource>(items: System.Collections.Generic.IEnumerable<TSource>): ImmutableArray<TSource> {
            if (items instanceof ImmutableArray) {
                return <ImmutableArray<TSource>>items;
            }
            return ImmutableArray.CreateRange(items);
        }
        public static CreateDefensiveCopy<T>(items: T[]): ImmutableArray<T> {
            if (items == null) {
                return ImmutableArray.Empty;
            }
            if (items.length == 0) {
                return ImmutableArray.Empty;
            }
            var tmp = new Array(items.length);
            TSArray.Copy(items, tmp, items.length);
            return new ImmutableArray<T>(tmp);
        }
        public static BinarySearch<T>(array: ImmutableArray<T>, value: T): number {
            return TSArray.BinarySearch<T>(array.array, value);
        }
        public static Create<T>(item: T): ImmutableArray<T>;
        public static Create<T>(item1: T, item2: T): ImmutableArray<T>;
        public static Create<T>(item1: T, item2: T, item3: T): ImmutableArray<T>;
        public static Create<T>(item1: T, item2: T, item3: T, item4: T): ImmutableArray<T>;
        public static Create<TBase, TDerived>(items: ImmutableArray<TDerived>): ImmutableArray<TBase>;
        public static Create<T>(): ImmutableArray<T>;
        public static Create<T>(items: T[]): ImmutableArray<T>;
        public static Create<T>(param0?: any, param1?: T, param2?: T, param3?: T): any {
            if (param0 instanceof Array ) { return this.Create_overload6(param0); }
            if (param0 instanceof ImmutableArray ) { return this.Create_overload4(param0); }
            if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.Create_overload0(param0); }
            if (typeof param0 != 'undefined' && typeof param1 != 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.Create_overload1(param0, param1); }
            if (typeof param0 != 'undefined' && typeof param1 != 'undefined' && typeof param2 != 'undefined' && typeof param3 == 'undefined') { return this.Create_overload2(param0, param1, param2); }
            if (typeof param0 != 'undefined' && typeof param1 != 'undefined' && typeof param2 != 'undefined' && typeof param3 != 'undefined') { return this.Create_overload3(param0, param1, param2, param3); }
            if (typeof param0 == 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.Create_overload5(); }
            throw new Error('overload failed');
        }
        public static Create_overload0<T>(item: T): ImmutableArray<T> {
            var array: T[] = new Array(item);
            return new ImmutableArray<T>(array);
        }
        public static Create_overload1<T>(item1: T, item2: T): ImmutableArray<T> {
            var array: T[] = new Array(item1, item2);
            return new ImmutableArray<T>(array);
        }
        public static Create_overload2<T>(item1: T, item2: T, item3: T): ImmutableArray<T> {
            var array: T[] = new Array(item1, item2, item3);
            return new ImmutableArray<T>(array);
        }
        public static Create_overload3<T>(item1: T, item2: T, item3: T, item4: T): ImmutableArray<T> {
            var array: T[] = new Array(item1, item2, item3, item4);
            return new ImmutableArray<T>(array);
        }
        public static Create_overload4<TBase, TDerived>(items: ImmutableArray<TDerived>): ImmutableArray<TBase> {
            return new ImmutableArray<TBase>(<TBase[]><any>items.array);
        }
        public static Create_overload5<T>(): ImmutableArray<T> {
            return ImmutableArray.Empty;
        }
        public static Create_overload6<T>(items: T[]): ImmutableArray<T> {
            if (items == null) {
                return ImmutableArray.Create<T>();
            }
            return ImmutableArray.CreateDefensiveCopy(items);
        }
    }

    export module ImmutableArray {
        export class Builder<T> {
            private _elements: T[] = null;
            private _count: number = 0;
            get Count(): number {
                return this._count;
            }
            set Count(value: number) {
                if (value < this._count) {
                    var e = this._elements;
                    if (this._count - value > 64) {
                        TSArray.Clear(this._elements, value, this._count - value);
                    }
                    else {
                        for (var i: number = value; i < this.Count; i++) {
                            this._elements[i] = null;
                        }
                    }
                }
                else if (value > this._count) {
                    this.EnsureCapacity(value);
                }
                this._count = value;
            }
            $get$(index: number): T {
                return this._elements[index];
            }
            $set$(index: number, value: T): void {
                this._elements[index] = value;
            }
            public Add(item: T): void {
                this.EnsureCapacity(this.Count + 1);
                this._elements[this._count++] = item;
            }
            public Insert(index: number, item: T): void {
                this.EnsureCapacity(this.Count + 1);
                if (index < this.Count) {
                    TSArray.Copy(this._elements, index, this._elements, index + 1, this.Count - index);
                }
                this._count++;
                this._elements[index] = item;
            }
            public ToImmutable(): ImmutableArray<T> {
                if (this.Count == 0) {
                    return ImmutableArray.Empty;
                }
                return new ImmutableArray<T>(this.ToArray());
            }
            public Clear(): void {
                this.Count = 0;
            }
            public Remove(element: T): boolean {
                var index: number = this.IndexOf(element);
                if (index >= 0) {
                    this.RemoveAt(index);
                    return true;
                }
                return false;
            }
            public RemoveAt(index: number): void {
                if (index < this.Count - 1) {
                    TSArray.Copy(this._elements, index + 1, this._elements, index, this.Count - index - 1);
                }
                this.Count--;
            }
            public EnsureCapacity(capacity: number): void {
                if (this._elements.length < capacity) {
                    var newCapacity: number = Math.Max(this._elements.length * 2, capacity);
                    var newArray = new Array<T>(newCapacity);

                    TSArray.Copy(this._elements, 0, newArray, 0, this._elements.length);
                    this._elements = newArray;
                    //Array.Resize(ref _elements, newCapacity);
                }
            }
            public Contains(item: T): boolean {
                return this.IndexOf(item) >= 0;
            }
            public ToArray(): T[]{

                var tmp = new Array<T>(this.Count);
                var elements = this._elements;
                for (var i = 0; i < tmp.length; i++)
                {
                    tmp[i] = elements[i];
                }

                return tmp;
            }
            constructor();
            constructor(capacity: number);
            constructor(param0?: number) {
                if (typeof param0 == 'number') { this.constructor_Builder_overload1(param0); return; }
                if (typeof param0 == 'undefined') { this.constructor_Builder_overload1(8); this.constructor_Builder_overload0(); return;}
            }
            private constructor_Builder_overload0(): void {

            }
            private constructor_Builder_overload1(capacity: number): void {
                this._elements = new Array(capacity);
                this.Count = 0;
            }
            public IndexOf(item: T, startIndex: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number;
            public IndexOf(item: T): number;
            public IndexOf(param0: T, param1?: number, param2?: number, param3?: System.Collections.Generic.IEqualityComparer<T>): number {
                if (typeof param0 != 'undefined' && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 != 'undefined') { return this.IndexOf_overload0(param0, param1, param2, param3); }
                if (typeof param0 != 'undefined' && typeof param1 == 'undefined' && typeof param2 == 'undefined' && typeof param3 == 'undefined') { return this.IndexOf_overload1(param0); }
                throw new Error('overload failed');
            }
            private IndexOf_overload0(item: T, startIndex: number, count: number, equalityComparer: System.Collections.Generic.IEqualityComparer<T>): number {
                if (count == 0 && startIndex == 0) {
                    return -1;
                }
                if (equalityComparer == System.Collections.Generic.EqualityComparer.Default) {
                    return TSArray.IndexOf(this._elements, item, startIndex, count);
                }
                else {
                    for (var i: number = startIndex; i < startIndex + count; i++) {
                        if (equalityComparer.Equals(this._elements[i], item)) {
                            return i;
                        }
                    }
                    return -1;
                }
            }
            private IndexOf_overload1(item: T): number {
                return this.IndexOf(item, 0, this._count, System.Collections.Generic.EqualityComparer.Default);
            }
            public AddRange(items: ImmutableArray<T>, length: number): void;
            public AddRange(items: T[], length: number): void;
            public AddRange(items: System.Collections.Generic.IEnumerable<T>): void;
            public AddRange(param0: any, param1?: number): void {
                if (param0 instanceof Array && typeof param1 == 'number') { return this.AddRange_overload1(param0, param1); }
                if (param0 instanceof ImmutableArray && typeof param1 == 'number') { return this.AddRange_overload0(param0, param1); }
                if (typeof param0 != 'undefined' && typeof param1 == 'undefined') { return this.AddRange_overload2(param0); }
                throw new Error('overload failed');
            }
            private AddRange_overload0(items: ImmutableArray<T>, length: number): void {
                if (items.array != null) {
                    this.AddRange(items.array, length);
                }
            }
            private AddRange_overload1(items: T[], length: number): void {
                var offset = this.Count;
                this.Count += length;
                var nodes = this._elements;
                for (var i: number = 0; i < length; i++) {
                    nodes[offset + i] = items[i];
                }
            }
            private AddRange_overload2(items: System.Collections.Generic.IEnumerable<T>): void {
                var count: number = 0;
                if ((() => {
                    var count_ref0 = { refObj: count };
                    var ret_val_ = Linq.ImmutableExtensions.TryGetCount(items,
                        count_ref0);

                    count = count_ref0.refObj;
                    return ret_val_;
                })()) {
                    this.EnsureCapacity(this.Count + count);
                }

                // for each
                var itemEnumerator = items.GetEnumerator();
                try {
                    while (itemEnumerator.MoveNext()) {
                        var item = itemEnumerator.Current;
                        // foreach block
                        this.Add(item);
                    }
                } finally {
                    if (typeof itemEnumerator['Dispose'] != 'undefined') itemEnumerator.Dispose();
                }
                // end foreach

            }
        }
    }
    export module ImmutableArray {
        export class Enumerator<T> {
            private _array: T[] = null;
            private _index: number = 0;
            constructor(array: T[]) {
                this._array = array;
                this._index = -1;
            }
            get Current(): T {
                return this._array[this._index];
            }
            public MoveNext(): boolean {
                return ++this._index < this._array.length;
            }
        }
    }
    export module ImmutableArray {
        export class EnumeratorObject<T> implements System.Collections.Generic.IEnumerator<T>
        {
            private static s_EmptyEnumerator: System.Collections.Generic.IEnumerator<any> = new EnumeratorObject<any>(ImmutableArray.Empty.array);
            private _array: T[] = null;
            private _index: number = 0;
            constructor(array: T[]) {
                this._index = -1;
                this._array = array;
            }
            get Current(): T {
                if (<number>this._index < <number>this._array.length) {
                    return this._array[this._index];
                }
                throw new System.InvalidOperationException("");
            }

            public MoveNext(): boolean {
                var newIndex: number = this._index + 1;
                var length: number = this._array.length;
                if (<number>newIndex <= <number>length) {
                    this._index = newIndex;
                    return <number>newIndex < <number>length;
                }
                return false;
            }
            Reset(): void {
                this._index = -1;
            }
            public Dispose(): void {

            }
            public static Create<T>(array: T[]): System.Collections.Generic.IEnumerator<T> {
                if (array.length != 0) {
                    return new EnumeratorObject(array);
                }
                else {
                    return EnumeratorObject.s_EmptyEnumerator;
                }
            }
        }
    }
}
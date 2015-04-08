//// <reference path="../../../System/Collections/Generic/Collection.ts" />
module Roslyn.Utilities {
    export class SpecializedCollections {
        //-- load after load Array class
        //public static EmptyBytes: number[] = SpecializedCollections.EmptyArray<number>(); 
        //public static EmptyObjects: Object[] = SpecializedCollections.EmptyArray<Object>();
        public static EmptyBytes: number[] ;
        public static EmptyObjects: Object[];
        public static EmptyArray<T>(): T[] {
            return SpecializedCollections.Empty.Array.Instance;
        }
        public static EmptyEnumerator<T>(): System.Collections.Generic.IEnumerator<T> {
            return SpecializedCollections.Empty.Enumerator.Instance;
        }
        public static EmptyEnumerable<T>(): System.Collections.Generic.IEnumerable<T> {
            return SpecializedCollections.Empty.List.Instance;
        }
        public static EmptyCollection<T>(): System.Collections.Generic.ICollection<T> {
            return SpecializedCollections.Empty.List.Instance;
        }
        public static EmptyList<T>(): System.Collections.Generic.IList<T> {
            return SpecializedCollections.Empty.List.Instance;
        }
        public static EmptyReadOnlyList<T>(): System.Collections.Generic.IReadOnlyList<T> {
            return SpecializedCollections.Empty.List.Instance;
        }
        public static EmptySet<T>(): System.Collections.Generic.ISet<T> {
            return SpecializedCollections.Empty.Set.Instance;
        }
        public static EmptyDictionary<TKey, TValue>(): System.Collections.Generic.IDictionary<TKey, TValue> {
            return SpecializedCollections.Empty.Dictionary.Instance;
        }
        public static SingletonEnumerable<T>(value: T): System.Collections.Generic.IEnumerable<T> {
            return new SpecializedCollections.Singleton.Collection<T>(value);
        }
        public static SingletonCollection<T>(value: T): System.Collections.Generic.ICollection<T> {
            return new SpecializedCollections.Singleton.Collection<T>(value);
        }
        public static SingletonEnumerator<T>(value: T): System.Collections.Generic.IEnumerator<T> {
            return new SpecializedCollections.Singleton.Enumerator<T>(value);
        }
        public static ReadOnlyEnumerable<T>(values: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.IEnumerable<T> {
            return new SpecializedCollections.ReadOnly.Enumerable<System.Collections.Generic.IEnumerable<T>, T>(values);
        }
        public static ReadOnlyCollection<T>(collection: System.Collections.Generic.ICollection<T>): System.Collections.Generic.ICollection<T> {
            return collection == null || collection.Count == 0 ? SpecializedCollections.EmptyCollection<T>() : new SpecializedCollections.ReadOnly.Collection<System.Collections.Generic.ICollection<T>, T>(collection);
        }
        //public static ReadOnlySet<T>(values: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.ISet<T>;
        //public static ReadOnlySet<T>(set: System.Collections.Generic.ISet<T>): System.Collections.Generic.ISet<T>;
        //public static ReadOnlySet<T>(param0: any): System.Collections.Generic.ISet<T> {
        //    return SpecializedCollections.ReadOnlySet_overload0<T>(param0);

        //}
        //private static ReadOnlySet_overload0<T>(values: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.ISet<T> {
        //    if (typeof values["Add"] != 'undefined') {
        //        return SpecializedCollections.ReadOnlySet_overload1(<System.Collections.Generic.ISet<T>>values);
        //    }
        //    var result: System.Collections.Generic.HashSet<T> = null;

        //    // for each
        //    var itemEnumerator = values.GetEnumerator();
        //    try {
        //        while (itemEnumerator.MoveNext()) {
        //            var item = itemEnumerator.Current;
        //            // foreach block
        //            result = result != null ? result : new System.Collections.Generic.HashSet<T>();
        //            result.Add(item);
        //        }
        //    } finally {
        //        if (typeof itemEnumerator['Dispose'] != 'undefined') itemEnumerator.Dispose();
        //    }    
        //    // end foreach

        //    return SpecializedCollections.ReadOnlySet_overload1(result);
        //}
        //private static ReadOnlySet_overload1<T>(set: System.Collections.Generic.ISet<T>): System.Collections.Generic.ISet<T> {
        //    return set == null || set.Count == 0 ? SpecializedCollections.EmptySet<T>() : new SpecializedCollections.ReadOnly.Set<System.Collections.Generic.ISet<T>, T>(set);
        //}
    }

    //SpecializedCollections.Empty.Array
    export module SpecializedCollections {
        export class Empty {

        }
   
        export module Empty {
            export class Array<T>
            {
                public static Instance: any[] = [];
            }

            SpecializedCollections.EmptyBytes = SpecializedCollections.EmptyArray<number>();
            SpecializedCollections.EmptyObjects = SpecializedCollections.EmptyArray<Object>();
            export class Enumerator<T> implements System.Collections.IEnumerator, System.Collections.Generic.IEnumerator<T> {
                public static Instance: System.Collections.Generic.IEnumerator<any> = new Enumerator<any>();
                constructor() {

                }

                public get Current(): any {
                    throw new System.InvalidOperationException();
                }
                public MoveNext(): boolean {
                    return false;
                }
                public Reset(): void {
                    throw new System.InvalidOperationException();
                }

                public Dispose() { }
            }
            export class Enumerable<T> implements System.Collections.Generic.IEnumerable<T>
            {
                private enumerator: System.Collections.Generic.IEnumerator<T> = Empty.Enumerator.Instance;
                GetEnumerator(): System.Collections.IEnumerator;
                public GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
                GetEnumerator(): any {
                    return this.enumerator;
                    //return this.GetEnumerator_overload0();
                    //return this.GetEnumerator_overload1();
                }
                //private GetEnumerator_overload0(): System.Collections.IEnumerator {
                //    return this.GetEnumerator();
                //}
                //private GetEnumerator_overload1(): System.Collections.Generic.IEnumerator<T> {
                //    return this.enumerator;
                //}
            }
            export class Collection<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Enumerable<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Enumerable<T>, System.Collections.Generic.ICollection<T>
            {
                public static Instance: System.Collections.Generic.ICollection<any> = new Collection<any>();
                constructor() {
                    super();
                }
                public Add(item: T): void {
                    throw new System.NotSupportedException();
                }
                public Clear(): void {

                }
                public Contains(item: T): boolean {
                    return false;
                }
                public CopyTo(array: T[], arrayIndex: number): void {

                }
                public get Count(): number {
                    return 0;
                }
                public get IsReadOnly(): boolean {
                    return true;
                }
                public Remove(item: T): boolean {
                    throw new System.NotSupportedException();
                }
            }
            export class Dictionary<TKey, TValue> extends Collection<System.Collections.Generic.KeyValuePair<TKey, TValue>> implements Collection<System.Collections.Generic.KeyValuePair<TKey, TValue>>, System.Collections.Generic.IDictionary<TKey, TValue>
            {
                //public static Instance: System.Collections.Generic.IDictionary<any, any> = new Roslyn.Utilities.SpecializedCollections.Empty.Dictionary<any, any>();
                public static Instance: any = new Dictionary<any, any>();
                constructor() {
                    super();
                }
                public Add(key: TKey, value: TValue): void;
                public Add(value: System.Collections.Generic.KeyValuePair<TKey, TValue>): void;
                public Add(key?: any, value?: TValue): void {
                    throw new System.NotSupportedException();
                }
                public ContainsKey(key: TKey): boolean {
                    return false;
                }
                public get Keys(): System.Collections.Generic.ICollection<TKey> {
                    return Roslyn.Utilities.SpecializedCollections.Empty.Collection.Instance;
                }

                public Remove(key: TKey, value: TValue): void;
                public Remove(key: TKey): boolean;
                public Remove(value: System.Collections.Generic.KeyValuePair<TKey, TValue>): boolean;
                public Remove(key?: any, value?: TValue): any {
                    throw new System.NotSupportedException();
                }
                public TryGetValue(key: TKey, value: { refObj: TValue }): boolean {
                    value.refObj = null;
                    return false;
                }
                public get Values(): System.Collections.Generic.ICollection<TValue> {
                    return Roslyn.Utilities.SpecializedCollections.Empty.Collection.Instance;
                }
                public $get$(key: TKey): TValue {
                    throw new System.NotSupportedException();
                }
                public $set$(key: TKey, value: TValue): void {
                    throw new System.NotSupportedException();
                }
            }

           

            export class List<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Collection<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Collection<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyList<T>
            {
                public static Instance: Roslyn.Utilities.SpecializedCollections.Empty.List<any> = new List<any>();
                constructor() {
                    super();
                }
                public IndexOf(item: T): number {
                    return -1;
                }
                public Insert(index: number, item: T): void {
                    throw new System.NotSupportedException();
                }
                public RemoveAt(index: number): void {
                    throw new System.NotSupportedException();
                }
                public $get$(index: number): T {
                    throw new System.ArgumentOutOfRangeException("index");
                }
                public $set$(index: number, value: T): void {
                    throw new System.NotSupportedException();
                }
            }

            export class Set<T> extends Roslyn.Utilities.SpecializedCollections.Empty.Collection<T> implements Roslyn.Utilities.SpecializedCollections.Empty.Collection<T>, System.Collections.Generic.ISet<T>
            {
                public static Instance: System.Collections.Generic.ISet<any> = new Set<any>();
                constructor() {
                    super();
                }
                public Add(item: T): boolean {
                    throw new System.NotImplementedException();
                }
                public ExceptWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotImplementedException();
                }
                public IntersectWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotImplementedException();
                }
                public IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    throw new System.NotImplementedException();
                }
                public SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotImplementedException();
                }
                public UnionWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotImplementedException();
                }

                public GetEnumerator(): System.Collections.IEnumerator;
                public GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
                public GetEnumerator(): any {
                    return Roslyn.Utilities.SpecializedCollections.Empty.Set.Instance.GetEnumerator();
                }
            }
        }
        export module ReadOnly {
            export class Enumerable<TUnderlying extends System.Collections.IEnumerable, T> implements System.Collections.IEnumerable, System.Collections.Generic.IEnumerable<T>  {
                protected  Underlying: TUnderlying = null;
                constructor(underlying: TUnderlying) {
                    this.Underlying = underlying;
                }

                public GetEnumerator(): System.Collections.IEnumerator;
                public GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
                public GetEnumerator(): any {
                    return this.Underlying.GetEnumerator();
                }
            }
            export class Collection<TUnderlying extends System.Collections.Generic.ICollection<any>, T> extends Roslyn.Utilities.SpecializedCollections.ReadOnly.Enumerable<TUnderlying, T> implements Roslyn.Utilities.SpecializedCollections.ReadOnly.Enumerable<TUnderlying, T>, System.Collections.Generic.ICollection<T>
            {
                constructor(underlying: TUnderlying) {
                    super(underlying);
                }
                public Add(item: T): void {
                    throw new System.NotSupportedException();
                }
                public Clear(): void {
                    throw new System.NotSupportedException();
                }
                public Contains(item: T): boolean {
                    return this.Underlying.Contains(item);
                }
                public CopyTo(array: T[], arrayIndex: number): void {
                    this.Underlying.CopyTo(array, arrayIndex);
                }
                public get Count(): number {
                    return this.Underlying.Count;
                }
                public get IsReadOnly(): boolean {
                    return true;
                }
                public Remove(item: T): boolean {
                    throw new System.NotSupportedException();
                }
            }

            export class Set<TUnderlying extends System.Collections.Generic.ISet<any>, T> extends Roslyn.Utilities.SpecializedCollections.ReadOnly.Collection<TUnderlying, T> implements Roslyn.Utilities.SpecializedCollections.ReadOnly.Collection<TUnderlying, T>, System.Collections.Generic.ISet<T>
            {
                constructor(underlying: TUnderlying) {
                    super(underlying);

                }
                public Add(item: T): boolean {
                    throw new System.NotSupportedException();
                }
                public ExceptWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotSupportedException();
                }
                public IntersectWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotSupportedException();
                }
                public IsProperSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.IsProperSubsetOf(other);
                }
                public IsProperSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.IsProperSupersetOf(other);
                }
                public IsSubsetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.IsSubsetOf(other);
                }
                public IsSupersetOf(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.IsSupersetOf(other);
                }
                public Overlaps(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.Overlaps(other);
                }
                public SetEquals(other: System.Collections.Generic.IEnumerable<T>): boolean {
                    return this.Underlying.SetEquals(other);
                }
                public SymmetricExceptWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotSupportedException();
                }
                public UnionWith(other: System.Collections.Generic.IEnumerable<T>): void {
                    throw new System.NotSupportedException();
                }
            }
        }

        export module Singleton {
            export class Collection<T> implements System.Collections.Generic.ICollection<T>, System.Collections.Generic.IReadOnlyCollection<T>
            {
                private loneValue: T = null;
                constructor(value: T) {
                    this.loneValue = value;
                }
                public Add(item: T): void {
                    throw new System.NotSupportedException();
                }
                public Clear(): void {
                    throw new System.NotSupportedException();
                }
                public Contains(item: T): boolean {
                    return System.Collections.Generic.EqualityComparer.Default.Equals(this.loneValue, item);
                }
                public CopyTo(array: T[], arrayIndex: number): void {
                    array[arrayIndex] = this.loneValue;
                }
                public get Count(): number {
                    return 1;
                }
                public get IsReadOnly(): boolean {
                    return true;
                }
                public Remove(item: T): boolean {
                    throw new System.NotSupportedException();
                }
                GetEnumerator(): System.Collections.IEnumerator;
                public GetEnumerator(): System.Collections.Generic.IEnumerator<T>;
                GetEnumerator(): any {
                    return new Roslyn.Utilities.SpecializedCollections.Singleton.Enumerator<T>(this.loneValue);
                }
            }

            export class Enumerator<T> implements System.Collections.Generic.IEnumerator<T>
            {
                private loneValue: T = null;
                private moveNextCalled: boolean = false;
                constructor(value: T) {
                    this.loneValue = value;
                    this.moveNextCalled = false;
                }
                public get Current(): any {
                    return this.loneValue;
                }

                public Dispose(): void {

                }
                public MoveNext(): boolean {
                    if (!this.moveNextCalled) {
                        this.moveNextCalled = true;
                        return true;
                    }
                    return false;
                }
                public Reset(): void {
                    this.moveNextCalled = false;
                }
            }
        }
    }
}
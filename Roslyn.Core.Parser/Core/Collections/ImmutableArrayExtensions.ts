module Microsoft.CodeAnalysis {
    export class ImmutableArrayExtensions {
        public static AsImmutable_7446<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T> {
            return System.Collections.Immutable.ImmutableArray.CreateRange<T>(items);
        }
        public static AsImmutableOrEmpty_1620<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return System.Collections.Immutable.ImmutableArray.Empty;
            }
            return System.Collections.Immutable.ImmutableArray.CreateRange<T>(items);
        }
        public static AsImmutableOrNull_2024<T>(items: System.Collections.Generic.IEnumerable<T>): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return structDefault(System.Collections.Immutable.ImmutableArray);
            }
            return System.Collections.Immutable.ImmutableArray.CreateRange<T>(items);
        }
        public static AsImmutable_1998<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T> {
            System.Diagnostics.Debug.Assert(items != null);
            return System.Collections.Immutable.ImmutableArray.Create<T>(items);
        }
        public static AsImmutableOrNull_9386<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return structDefault(System.Collections.Immutable.ImmutableArray);
            }
            return System.Collections.Immutable.ImmutableArray.Create<T>(items);
        }
        public static AsImmutableOrEmpty_1316<T>(items: T[]): System.Collections.Immutable.ImmutableArray<T> {
            if (items == null) {
                return System.Collections.Immutable.ImmutableArray.Empty;
            }
            return System.Collections.Immutable.ImmutableArray.Create<T>(items);
        }
        //public static ToImmutable(stream: System.IO.MemoryStream): System.Collections.Immutable.ImmutableArray<number> {
        //    return System.Collections.Immutable.ImmutableArray.Create<number>(stream.ToArray());
        //}
        //public static SelectAsArray_1848<TItem, TResult>(items: System.Collections.Immutable.ImmutableArray<TItem>, map: (_: TItem) => TResult): System.Collections.Immutable.ImmutableArray<TResult> {
        //    return System.Collections.Immutable.ImmutableArray.CreateRange(items, map);
        //}
        //public static SelectAsArray_7643<TItem, TArg, TResult>(items: System.Collections.Immutable.ImmutableArray<TItem>, map: (_: TItem, __: TArg) => TResult, arg: TArg): System.Collections.Immutable.ImmutableArray<TResult> {
        //    return System.Collections.Immutable.ImmutableArray.CreateRange(items, map, arg);
        //}
        public static SelectAsArray_1026<TItem, TArg, TResult>(items: System.Collections.Immutable.ImmutableArray<TItem>, map: (_: TItem, __: number, ___: TArg) => TResult, arg: TArg): System.Collections.Immutable.ImmutableArray<TResult> {
            switch (items.Length) {
                case 0:
                    return System.Collections.Immutable.ImmutableArray.Empty;
                case 1:
                    return System.Collections.Immutable.ImmutableArray.Create(map(items.$get$(0), 0, arg));
                case 2:
                    return System.Collections.Immutable.ImmutableArray.Create(map(items.$get$(0), 0, arg), map(items.$get$(1), 1, arg));
                case 3:
                    return System.Collections.Immutable.ImmutableArray.Create(map(items.$get$(0), 0, arg), map(items.$get$(1), 1, arg), map(items.$get$(2), 2, arg));
                case 4:
                    return System.Collections.Immutable.ImmutableArray.Create(map(items.$get$(0), 0, arg), map(items.$get$(1), 1, arg), map(items.$get$(2), 2, arg), map(items.$get$(3), 3, arg));
                default:
                    var builder = ArrayBuilder.GetInstance_9802<TResult>(items.Length);
                    for (var i: number = 0; i < items.Length; i++) {
                        builder.Add(map(items.$get$(i), i, arg));
                    }
                    return builder.ToImmutableAndFree();
            }
        }
        public static WhereAsArray<T>(array: System.Collections.Immutable.ImmutableArray<T>, predicate: (_: T) => boolean): System.Collections.Immutable.ImmutableArray<T> {
            System.Diagnostics.Debug.Assert(!array.IsDefault);
            var builder: ArrayBuilder<T> = null;
            var none: boolean = true;
            var all: boolean = true;
            var n: number = array.Length;
            for (var i: number = 0; i < n; i++) {
                var a = array.$get$(i);
                if (predicate(a)) {
                    none = false;
                    if (all) {
                        continue;
                    }
                    System.Diagnostics.Debug.Assert(i > 0);
                    if (builder == null) {
                        builder = ArrayBuilder.GetInstance_1997<T>();
                    }
                    builder.Add(a);
                }
                else {
                    if (none) {
                        all = false;
                        continue;
                    }
                    System.Diagnostics.Debug.Assert(i > 0);
                    if (all) {
                        System.Diagnostics.Debug.Assert(builder == null);
                        all = false;
                        builder = ArrayBuilder.GetInstance_1997<T>();
                        for (var j: number = 0; j < i; j++) {
                            builder.Add(array.$get$(j));
                        }
                    }
                }
            }
            if (builder != null) {
                System.Diagnostics.Debug.Assert(!all);
                System.Diagnostics.Debug.Assert(!none);
                return builder.ToImmutableAndFree();
            }
            else if (all) {
                return array;
            }
            else {
                System.Diagnostics.Debug.Assert(none);
                return System.Collections.Immutable.ImmutableArray.Empty;
            }
        }
        //public static AddRange<T, U extends T>(list: System.Collections.Generic.List<T>, items: System.Collections.Immutable.ImmutableArray<U>): void {
        //    System.Diagnostics.Debug.Assert(list != null);
        //    // for each
        //    var uEnumerator = items.GetEnumerator();
        //    try {
        //        while (uEnumerator.MoveNext()) {
        //            var u = uEnumerator.Current;
        //            // foreach block
        //            list.Add(u);
        //        }
        //    } finally {
        //        if (uEnumerator !== null && (<any>uEnumerator).Dispose !== void 0) (<any>uEnumerator).Dispose();

        //    }    
        //    // end foreach
        //}
        //public static Cast<TDerived extends TBase, TBase>(items: System.Collections.Immutable.ImmutableArray<TDerived>): System.Collections.Immutable.ImmutableArray<TBase> {
        //    return System.Collections.Immutable.ImmutableArray.Create<TBase, TDerived>(items);
        //}
        //public static SetEquals<T>(array1: System.Collections.Immutable.ImmutableArray<T>, array2: System.Collections.Immutable.ImmutableArray<T>, comparer: System.Collections.Generic.IEqualityComparer<T>): boolean {
        //    if (array1.IsDefault) {
        //        return array2.IsDefault;
        //    }
        //    else if (array2.IsDefault) {
        //        return false;
        //    }
        //    var count1 = array1.Length;
        //    var count2 = array2.Length;
        //    if (count1 == 0) {
        //        return count2 == 0;
        //    }
        //    else if (count2 == 0) {
        //        return false;
        //    }
        //    else if (count1 == 1 && count2 == 1) {
        //        var item1 = array1.$get$(0);
        //        var item2 = array2.$get$(0);
        //        return comparer.Equals(item1, item2);
        //    }
        //    var set1 = new System.Collections.Generic.HashSet<T>();
        //    var set2 = new System.Collections.Generic.HashSet<T>();
        //    return set1.SetEquals(set2);
        //}
        public static NullToEmpty<T>(array: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T> {
            return array.IsDefault ? System.Collections.Immutable.ImmutableArray.Empty : array;
        }
        //public static Distinct<T>(array: System.Collections.Immutable.ImmutableArray<T>, comparer: System.Collections.Generic.IEqualityComparer<T> = null): System.Collections.Immutable.ImmutableArray<T> {
        //    System.Diagnostics.Debug.Assert(!array.IsDefault);
        //    if (array.Length < 2) {
        //        return array;
        //    }
        //    var set = new System.Collections.Generic.HashSet<T>(comparer);
        //    var builder = ArrayBuilder.GetInstance_1997<T>();
        //    // for each
        //    var aEnumerator = array.GetEnumerator();
        //    try {
        //        while (aEnumerator.MoveNext()) {
        //            var a = aEnumerator.Current;
        //            // foreach block
        //            if (set.Add(a)) {
        //                builder.Add(a);
        //            }
        //        }
        //    } finally {
        //        if (aEnumerator !== null && (<any>aEnumerator).Dispose !== void 0) (<any>aEnumerator).Dispose();

        //    }    
        //    // end foreach
        //    var result = (builder.Count == array.Length) ? array : builder.ToImmutable();
        //    builder.Free();
        //    return result;
        //}
        public static HasAnyErrors<T extends Diagnostic>(diagnostics: System.Collections.Immutable.ImmutableArray<T>): boolean {
            // for each
            var diagnosticEnumerator = diagnostics.GetEnumerator();
            try {
                while (diagnosticEnumerator.MoveNext()) {
                    var diagnostic = diagnosticEnumerator.Current;
                    // foreach block
                    if (diagnostic.Severity == DiagnosticSeverity.Error) {
                        return true;
                    }
                }
            } finally {
                if (diagnosticEnumerator !== null && (<any>diagnosticEnumerator).Dispose !== void 0) (<any>diagnosticEnumerator).Dispose();

            }    
            // end foreach
            return false;
        }
        //public static DeOrder<T>(array: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T> {
        //    if (!array.IsDefault && array.Length >= 2) {
        //        var copy: T[] = System.Linq.ImmutableArrayExtensions.ToArray(array);
        //        var last: number = copy.length - 1;
        //        var temp = copy[0];
        //        copy[0] = copy[last];
        //        copy[last] = temp;
        //        return ImmutableArrayExtensions.AsImmutable_1998(copy);
        //    }
        //    else {
        //        return array;
        //    }
        //}
        //public static Flatten<TKey, TValue>(dictionary: System.Collections.Generic.Dictionary<TKey, System.Collections.Immutable.ImmutableArray<TValue>>, comparer: System.Collections.Generic.IComparer<TValue> = null): System.Collections.Immutable.ImmutableArray<TValue> {
        //    if (dictionary.Count == 0) {
        //        return System.Collections.Immutable.ImmutableArray.Empty;
        //    }
        //    var builder = ArrayBuilder.GetInstance_1997<TValue>();
        //    // for each
        //    var kvpEnumerator = dictionary.GetEnumerator();
        //    try {
        //        while (kvpEnumerator.MoveNext()) {
        //            var kvp = kvpEnumerator.Current;
        //            // foreach block
        //            builder.AddRange_1909(kvp.Value);
        //        }
        //    } finally {
        //        if (kvpEnumerator !== null && (<any>kvpEnumerator).Dispose !== void 0) (<any>kvpEnumerator).Dispose();

        //    }    
        //    // end foreach
        //    if (comparer != null && builder.Count > 1) {
        //        builder.Sort_1296(comparer);
        //    }
        //    return builder.ToImmutableAndFree();
        //}
        //public static Concat<T>(first: System.Collections.Immutable.ImmutableArray<T>, second: System.Collections.Immutable.ImmutableArray<T>): System.Collections.Immutable.ImmutableArray<T> {
        //    return first.AddRange(second);
        //}
        //public static HasDuplicates<T>(array: System.Collections.Immutable.ImmutableArray<T>, comparer: System.Collections.Generic.IEqualityComparer<T>): boolean {
        //    switch (array.Length) {
        //        case 0:
        //        case 1:
        //            return false;
        //        case 2:
        //            return comparer.Equals(array.$get$(0), array.$get$(1));
        //        default:
        //            var set = new System.Collections.Generic.HashSet<T>(comparer);
        //            // for each
        //            var iEnumerator = array.GetEnumerator();
        //            try {
        //                while (iEnumerator.MoveNext()) {
        //                    var i = iEnumerator.Current;
        //                    // foreach block
        //                    if (!set.Add(i))
        //                        return true;
        //                }
        //            } finally {
        //                if (iEnumerator !== null && (<any>iEnumerator).Dispose !== void 0) (<any>iEnumerator).Dispose();

        //            }    
        //            // end foreach
        //            return false;
        //    }
        //}
    }
    //export class StaticCast<T>
    //{
    //    public static From<TDerived extends T>(from: System.Collections.Immutable.ImmutableArray<TDerived>): System.Collections.Immutable.ImmutableArray<T> {
    //        return System.Collections.Immutable.ImmutableArray.Create<T, TDerived>(from);
    //    }
    //}
}
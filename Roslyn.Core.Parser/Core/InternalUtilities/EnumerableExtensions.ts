module Roslyn.Utilities {
    export class EnumerableExtensions {
        public static Do<T>(source: System.Collections.Generic.IEnumerable<T>, action: (_: T) => void): System.Collections.Generic.IEnumerable<T> {
            if (source == null) {
                throw new System.ArgumentNullException();
            }
            if (action == null) {
                throw new System.ArgumentNullException();
            }
            var list = <System.Collections.Generic.IList<T>>source;
            if (list.Count === void 0) {
                list = null;
            }

            if (list != null) {
                for (var i: number = 0, count = list.Count; i < count; i++) {
                    action(list.$get$(i));
                }
            }
            else {
                // for each
                var valueEnumerator = source.GetEnumerator();
                try {
                    while (valueEnumerator.MoveNext()) {
                        var value = valueEnumerator.Current;
                        // foreach block
                        action(value);
                    }
                } finally {
                    if (valueEnumerator !== null && (<any>valueEnumerator).Dispose !== void 0) (<any>valueEnumerator).Dispose();

                }    
                // end foreach
            }
            return source;
        }
        //public static ToReadOnlyCollection<T>(source: System.Collections.Generic.IEnumerable<T>): System.Collections.ObjectModel.ReadOnlyCollection<T> {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return new System.Collections.ObjectModel.ReadOnlyCollection<T>();
        //}
        public static Concat<T>(source: System.Collections.Generic.IEnumerable<T>, value: T): System.Collections.Generic.IEnumerable<T> {
            if (source == null) {
                throw new System.ArgumentNullException();
            }
            return EnumerableExtensions.ConcatWorker(source,
                value);
        }
        private static ConcatWorker<T>(source: System.Collections.Generic.IEnumerable<T>, value: T): System.Collections.Generic.IEnumerable<T> {
            var __result = new Array<T>();
            // for each
            var vEnumerator = source.GetEnumerator();
            try {
                while (vEnumerator.MoveNext()) {
                    var v = vEnumerator.Current;
                    // foreach block
                    __result.push(v);
                    //yield return v;
                }
            } finally {
                if (vEnumerator !== null && (<any>vEnumerator).Dispose !== void 0) (<any>vEnumerator).Dispose();

            }    
            // end foreach
            __result.push(value);
            //yield return value;
            return __result;
        }
        //public static SetEquals_1262<T>(source1: System.Collections.Generic.IEnumerable<T>, source2: System.Collections.Generic.IEnumerable<T>, comparer: System.Collections.Generic.IEqualityComparer<T>): boolean {
        //    if (source1 == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    if (source2 == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return EnumerableExtensions.ToSet_6827(source1,
        //        comparer).SetEquals(source2);
        //}
        //public static SetEquals_1934<T>(source1: System.Collections.Generic.IEnumerable<T>, source2: System.Collections.Generic.IEnumerable<T>): boolean {
        //    if (source1 == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    if (source2 == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return EnumerableExtensions.ToSet_1394(source1).SetEquals(source2);
        //}
        //public static ToSet_6827<T>(source: System.Collections.Generic.IEnumerable<T>, comparer: System.Collections.Generic.IEqualityComparer<T>): System.Collections.Generic.ISet<T> {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return new System.Collections.Generic.HashSet<T>();
        //}
        //public static ToSet_1394<T>(source: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.ISet<T> {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return __as__<System.Collections.Generic.ISet<T>>(source, System.Collections.Generic.ISet<T> ) != null ? __as__<System.Collections.Generic.ISet<T>>(source, System.Collections.Generic.ISet<T> ) : new System.Collections.Generic.HashSet<T>();
        //}
        //public static FirstOrNullable_1315<T>(source: System.Collections.Generic.IEnumerable<T>): T {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return System.Linq.Enumerable.FirstOrDefault(System.Linq.Enumerable.Cast(source));
        //}
        //public static FirstOrNullable_2056<T>(source: System.Collections.Generic.IEnumerable<T>, predicate: (_: T) => boolean): T {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return System.Linq.Enumerable.FirstOrDefault(System.Linq.Enumerable.Cast(source),
        //        v => predicate(v.Value));
        //}
        //public static LastOrNullable<T>(source: System.Collections.Generic.IEnumerable<T>): T {
        //    if (source == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return System.Linq.Enumerable.LastOrDefault(System.Linq.Enumerable.Cast(source));
        //}
        public static IsSingle<T>(list: System.Collections.Generic.IEnumerable<T>): boolean {
            var enumerator = list.GetEnumerator()
            try
            {
                return enumerator.MoveNext() && !enumerator.MoveNext();
            }
            finally {
                if (enumerator != null) enumerator.Dispose();
            }
        }
        public static IsEmpty_9700<T>(source: System.Collections.Generic.IEnumerable<T>): boolean {
            var readOnlyCollection = <System.Collections.Generic.IReadOnlyCollection<T>>source;
            if (readOnlyCollection.Count === void 0) {
                readOnlyCollection = null;
            }

            //if (readOnlyCollection != null) {
            //    return readOnlyCollection.Count == 0;
            //}

            //var genericCollection = <System.Collections.Generic.ICollection<T>>source;

            //if (genericCollection != null) {
            //    return genericCollection.Count == 0;
            //}
            //var collection = __as__<System.Collections.ICollection>(source, System.Collections.ICollection);
            //if (collection != null) {
            //    return collection.Count == 0;
            //}
            var str = __as__<String>(source, String);
            if (str != null) {
                return str.length == 0;
            }
            // for each
            var tEnumerator = source.GetEnumerator();
            try {
                while (tEnumerator.MoveNext()) {
                    var t = tEnumerator.Current;
                    // foreach block
                    return false;
                }
            } finally {
                if (tEnumerator !== null && (<any>tEnumerator).Dispose !== void 0) (<any>tEnumerator).Dispose();

            }    
            // end foreach
            return true;
        }
        public static IsEmpty_1287<T>(source: System.Collections.Generic.IReadOnlyCollection<T>): boolean {
            return source.Count == 0;
        }
        public static IsEmpty_7933<T>(source: System.Collections.Generic.ICollection<T>): boolean {
            return source.Count == 0;
        }
        public static IsEmpty_2124(source: string): boolean {
            return source.length == 0;
        }
        public static IsEmpty_1491<T>(source: T[]): boolean {
            return source.length == 0;
        }
        public static IsEmpty_7926<T>(source: System.Collections.Generic.List<T>): boolean {
            return source.Count == 0;
        }
        private static NotNullTest: (_: Object) => boolean = x => x != null;
        public static WhereNotNull<T>(source: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.IEnumerable<T> {
            if (source == null) {
                return SpecializedCollections.EmptyEnumerable<T>();
            }
            return System.Linq.Enumerable.Where(source,
                <(_: T) => boolean>EnumerableExtensions.NotNullTest);
        }
        public static All(source: System.Collections.Generic.IEnumerable<boolean>): boolean {
            if (source == null) {
                throw new System.ArgumentNullException();
            }
            // for each
            var bEnumerator = source.GetEnumerator();
            try {
                while (bEnumerator.MoveNext()) {
                    var b = bEnumerator.Current;
                    // foreach block
                    if (!b) {
                        return false;
                    }
                }
            } finally {
                if (bEnumerator !== null && (<any>bEnumerator).Dispose !== void 0) (<any>bEnumerator).Dispose();

            }    
            // end foreach
            return true;
        }
        //public static Flatten<T>(sequence: System.Collections.Generic.IEnumerable<System.Collections.Generic.IEnumerable<T>>): System.Collections.Generic.IEnumerable<T> {
        //    if (sequence == null) {
        //        throw new System.ArgumentNullException();
        //    }
        //    return System.Linq.Enumerable.SelectMany(sequence,
        //        s => s);
        //}
        //public static OrderBy_1853<T>(source: System.Collections.Generic.IEnumerable<T>, comparer: System.Collections.Generic.IComparer<T>): System.Collections.Generic.IEnumerable<T> {
        //    return System.Linq.Enumerable.OrderBy(source,
        //        t => t, comparer);
        //}
        //public static OrderBy_2129<T>(source: System.Collections.Generic.IEnumerable<T>, compare: (_: T, __: T) => number): System.Collections.Generic.IEnumerable<T> {
        //    return EnumerableExtensions.OrderBy_1853(source,
        //        new EnumerableExtensions.ComparisonComparer<T>().ctor_7564(compare));
        //}
        //public static Order<T extends System.IComparable<T>>(source: System.Collections.Generic.IEnumerable<T>): System.Collections.Generic.IEnumerable<T> {
        //    return EnumerableExtensions.OrderBy_2129(source,
        //        (t1, t2) => t1.CompareTo(t2));
        //}
        public static IsSorted<T>(enumerable: System.Collections.Generic.IEnumerable<T>, comparer: System.Collections.Generic.IComparer<T>): boolean {
            var e = enumerable.GetEnumerator()
            try
            {
                if (!e.MoveNext()) {
                    return true;
                }
                var previous = e.Current;
                while (e.MoveNext()) {
                    if (comparer.Compare(previous, e.Current) > 0) {
                        return false;
                    }
                    previous = e.Current;
                }
                return true;
            }
            finally {
                if (e != null) e.Dispose();
            }
        }
        public static SequenceEqual<T>(first: System.Collections.Generic.IEnumerable<T>, second: System.Collections.Generic.IEnumerable<T>, comparer: (_: T, __: T) => boolean): boolean {
            System.Diagnostics.Debug.Assert(comparer != null);
            if (first == second) {
                return true;
            }
            if (first == null || second == null) {
                return false;
            }
            var enumerator = first.GetEnumerator()
            try
            {
                var enumerator2 = second.GetEnumerator()
                try
                {
                    while (enumerator.MoveNext()) {
                        if (!enumerator2.MoveNext() || !comparer(enumerator.Current, enumerator2.Current)) {
                            return false;
                        }
                    }
                    if (enumerator2.MoveNext()) {
                        return false;
                    }
                }
                finally {
                    if (enumerator2 != null) enumerator2.Dispose();
                }
            }
            finally {
                if (enumerator != null) enumerator.Dispose();
            }
            return true;
        }
        public static Contains<T>(sequence: System.Collections.Generic.IEnumerable<T>, predicate: (_: T) => boolean): boolean {
            return System.Linq.Enumerable.Any(sequence,
                predicate);
        }
    }

    export module EnumerableExtensions {
        export class ComparisonComparer<T> extends System.Collections.Generic.Comparer<T>
        {
            private compare: (_: T, __: T) => number;
            ctor_7564(compare: (_: T, __: T) => number): ComparisonComparer<T> {
                this.compare = compare;
                return this;
            }
            public Compare(x: T, y: T): number {
                return this.compare(x, y);
            }
            constructor() { super(); }
        }
    }
}
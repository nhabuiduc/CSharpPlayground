module System.Linq {
    export class Enumerable {

        public static All<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): boolean {

            if (source == null)
                throw new ArgumentNullException("source");       

            var e: System.Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
            try
            {
                if (e.MoveNext())
                    if (!predicate(e.Current))
                        return false;
            }
            finally {
                if (e != null) e.Dispose();
            }
            return true;
        }

        public static Any<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate?: (_: TSource) => boolean): boolean {

            if (source == null)
                throw new ArgumentNullException("source");

            if (predicate === void 0 && typeof source["Count"] != 'undefined') {
                return (<any>source).Count > 0;
            }

            if (predicate === void 0) {
                predicate = (_) => true;
            }

            var e: System.Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
            try
            {
                if (e.MoveNext())
                    if (predicate(e.Current))
                        return true;
            }
            finally {
                if (e != null) e.Dispose();
            }
            return false;
        }

        public static ToArray<TElement>(source: System.Collections.Generic.IEnumerable<TElement>): TElement[] {
            var items: TElement[] = [];
            var count: number = 0;
            //var collection: ICollection<TElement> = collection as ICollection < TElement>;
            var collection = <Collections.Generic.ICollection<TElement>>source;
            if (collection.CopyTo !== void 0 && typeof collection.Count !== 'undefined'
                && collection.Contains !== void 0 && collection.Clear !== void 0) {
               
                count = collection.Count;
                if (count > 0) {
                    items = new Array(count);
                    collection.CopyTo(items, 0);
                } else {
                    items = new Array();
                }
            }
            else {

                // for each
                var itemEnumerator = source.GetEnumerator();
                try {
                    while (itemEnumerator.MoveNext()) {
                        var item = itemEnumerator.Current;
                        // foreach block
                        if (items == null) {
                            items = new Array(4);
                        }
                        else if (items.length == count) {
                            var newItems: TElement[] = new Array((count * 2));
                            TSArray.Copy(items, 0, newItems, 0, count);
                            items = newItems;
                        }
                        items[count] = item;
                        count++;
                    }
                } finally {
                    if (typeof itemEnumerator['Dispose'] != 'undefined') itemEnumerator.Dispose();
                }

                var result = new Array<TElement>(count);
                TSArray.Copy_2(items, result, count);
                items = result;
                // end foreach
            }

            return items;
        }

        public static SequenceEqual<TSource>(first: System.Collections.Generic.IEnumerable<TSource>, second: System.Collections.Generic.IEnumerable<TSource>, comparer: System.Collections.Generic.IEqualityComparer<TSource>): boolean;
        public static SequenceEqual<TSource>(first: System.Collections.Generic.IEnumerable<TSource>, second: System.Collections.Generic.IEnumerable<TSource>): boolean;
        public static SequenceEqual<TSource>(param0: System.Collections.Generic.IEnumerable<TSource>, param1: System.Collections.Generic.IEnumerable<TSource>, param2?: System.Collections.Generic.IEqualityComparer<TSource>): boolean {
            if (typeof param2 !== 'undefined') { return Enumerable.SequenceEqual_overload0<TSource>(param0, param1, param2); }
            if (typeof param2 === 'undefined') { return Enumerable.SequenceEqual_overload1<TSource>(param0, param1); }
        }
        private static SequenceEqual_overload0<TSource>(first: System.Collections.Generic.IEnumerable<TSource>, second: System.Collections.Generic.IEnumerable<TSource>, comparer: System.Collections.Generic.IEqualityComparer<TSource>): boolean {
            if (comparer == null)
                comparer = System.Collections.Generic.EqualityComparer.Default;
            if (first == null)
                throw new ArgumentNullException("first");
            if (second == null)
                throw new ArgumentNullException("first");

            var e1: System.Collections.Generic.IEnumerator<TSource> = first.GetEnumerator()
            var e2: System.Collections.Generic.IEnumerator<TSource> = second.GetEnumerator()
            try
            {
                while (e1.MoveNext()) {
                    if (!(e2.MoveNext() && comparer.Equals(e1.Current, e2.Current)))
                        return false;
                }
                if (e2.MoveNext())
                    return false;
            }
            finally {
                if (e2 != null) e2.Dispose();
                if (e1 != null) e1.Dispose();
            }

            return true;
        }
        private static SequenceEqual_overload1<TSource>(first: System.Collections.Generic.IEnumerable<TSource>, second: System.Collections.Generic.IEnumerable<TSource>): boolean {
            return Enumerable.SequenceEqual<TSource>(first, second, null);
        }

        public static Select<TSource, TResult>(source: System.Collections.Generic.IEnumerable<TSource>, selector: (_: TSource) => TResult): System.Collections.Generic.IEnumerable<TResult> {
            var list = new System.Collections.Generic.List<TResult>();
            // for each
            var itemEnumerator = source.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    list.Add(selector(item));
                }
            } finally {
                itemEnumerator.Dispose();
            }
            // end foreach
            return list;
        }

        public static Where<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): System.Collections.Generic.IEnumerable<TSource> {
            var list = new System.Collections.Generic.List<TSource>();
            // for each
            var itemEnumerator = source.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    if (predicate(item)) {
                        list.Add(item);
                    }
                }
            } finally {
                itemEnumerator.Dispose();
            }
            // end foreach
            return list;
        }

        public static Contains<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, value: TSource, comparer: System.Collections.Generic.IEqualityComparer<TSource>): boolean;
        public static Contains<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, value: TSource): boolean;
        public static Contains<TSource>(param0: System.Collections.Generic.IEnumerable<TSource>, param1: TSource, param2?: System.Collections.Generic.IEqualityComparer<TSource>): boolean {
            if (typeof param2 !== 'undefined') { return Enumerable.Contains_overload0<TSource>(param0, param1, param2); }
            if (typeof param2 === 'undefined') { return Enumerable.Contains_overload1<TSource>(param0, param1); }
        }
        private static Contains_overload0<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, value: TSource, comparer: System.Collections.Generic.IEqualityComparer<TSource>): boolean {
            if (comparer == null)
                comparer = System.Collections.Generic.EqualityComparer.Default;
            if (source == null)
                throw new ArgumentNullException("source");

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (comparer.Equals(element, value))
                        return true;
                }
            } finally {
                elementEnumerator.Dispose();
            }    
            // end foreach

            return false;
        }
        private static Contains_overload1<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, value: TSource): boolean {
            //var collection: System.Collections.Generic.ICollection<TSource> =
            // __as__<System.Collections.Generic.ICollection<TSource>>(source, System.Collections.Generic.ICollection<TSource> );
            var collection = <System.Collections.Generic.ICollection<TSource>>source;
            if (typeof collection["Contains"] !== 'undefined')
                return collection.Contains(value);
            return Enumerable.Contains<TSource>(source, value, null);
        }

        public static ToList<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): System.Collections.Generic.List<TSource> {
            if (source instanceof System.Collections.Generic.List) {
                return <System.Collections.Generic.List<TSource>>source;
            }
            var list = new System.Collections.Generic.List<TSource>();
            // for each
            var itemEnumerator = source.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    list.Add(item);
                }
            } finally {
                itemEnumerator.Dispose();
            }
            // end foreach
            return list;
        }

        public static Concat<TSource>(first: System.Collections.Generic.IEnumerable<TSource>, second: System.Collections.Generic.IEnumerable<TSource>):
            System.Collections.Generic.IEnumerable<TSource> {
            var list = new System.Collections.Generic.List<TSource>(first);
            list.AddRange(second);
            return list;
        }

        public static LastOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): TSource;
        public static LastOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, defaultVal: TSource): TSource;
        public static LastOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource;
        public static LastOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource): TSource;
        public static LastOrDefault<TSource>(param0: System.Collections.Generic.IEnumerable<TSource>, param1?: any, param2?: any): TSource {
            if ((param0 !== void 0) && typeof param1 === 'function') { return Enumerable.LastOrDefault_overload0<TSource>(param0, param1, param2); }
            if ((param0 !== void 0)) { return Enumerable.LastOrDefault_overload1<TSource>(param0, param1); }
        }
        private static LastOrDefault_overload0<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource = null): TSource {
            if (source == null)
                throw new ArgumentException("source");
            if (predicate == null)
                throw new ArgumentException("predicate");
            var result: TSource = defaultVal;

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (predicate(element)) {
                        result = element;
                    }
                }
            } finally {
                if (elementEnumerator.Dispose !== void 0) elementEnumerator.Dispose();

            }    
            // end foreach

            return result;
        }
        private static LastOrDefault_overload1<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, defaultVal: TSource = null): TSource {

            if (source == null)
                throw new ArgumentException("source");
            var list: System.Collections.Generic.IList<TSource> = <System.Collections.Generic.IList<TSource>>source;

            if (list.Count === void 0 || list.$get$ === void 0) {
                list = null;
            }

            if (list != null) {
                var count: number = list.Count;
                if (count > 0)
                    return list.$get$(count - 1);
            }
            else {
                var e: System.Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
                try
                {
                    if (e.MoveNext()) {
                        var result: TSource = null;
                        do {
                            result = e.Current;
                        }
                        while (e.MoveNext());
                        return result;
                    }
                }
                finally {
                    if (e != null) e.Dispose();
                }
            }
            return defaultVal;
        }

        public static OfType<TSource>(source: System.Collections.IEnumerable, clssType: { prototype: TSource }): System.Collections.Generic.IEnumerable<TSource> {
            var list = new System.Collections.Generic.List<TSource>();

            if (source == null)
                throw new ArgumentException("source");

            var e: System.Collections.IEnumerator = source.GetEnumerator()
            try
            {
                while (e.MoveNext()) {
                    if (e.Current instanceof <any>clssType) {
                        list.Add(e.Current);
                    }
                }
            }
            finally {
                if (e != null && (<any>e).Dispose !== void 0) (<any>e).Dispose();
            }

            return list;
        }

        public static SingleOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, defaultVal: TSource): TSource;
        public static SingleOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource;
        public static SingleOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource): TSource;
        public static SingleOrDefault<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): TSource;
        public static SingleOrDefault<TSource>(param0: System.Collections.Generic.IEnumerable<TSource>, param1?: any, param2?: TSource): TSource {
            if (typeof param1 === 'function' && (param2 === void 0)) { return Enumerable.SingleOrDefault_overload1<TSource>(param0, param1); }
            if (typeof param1 === 'function' && (param2 !== void 0)) { return Enumerable.SingleOrDefault_overload2<TSource>(param0, param1, param2); }
            if ((param1 !== void 0) && (param2 === void 0)) { return Enumerable.SingleOrDefault_overload0<TSource>(param0, param1); }
            if ((param1 === void 0) && (param2 === void 0)) { return Enumerable.SingleOrDefault_overload3<TSource>(param0); }
        }
        private static SingleOrDefault_overload0<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, defaultVal: TSource): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            var list = <System.Collections.Generic.IList<TSource>>source;

            if (list.Count === void 0 || list.$get$ === void 0) {
                list = null;
            }

            if (list != null) {
                switch (list.Count) {
                    case 0:
                        return defaultVal;
                    case 1:
                        return list.$get$(0);
                }
            }
            else {
                var e: System.Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
                try
                {
                    if (!e.MoveNext())
                        return defaultVal;
                    var result: TSource = e.Current;
                    if (!e.MoveNext())
                        return result;
                }
                finally {
                    if (e != null) e.Dispose();
                }
            }
            throw SystemError.MoreThanOneElement();
        }
        private static SingleOrDefault_overload1<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource {
            return Enumerable.SingleOrDefault_overload2(source, predicate, null);
        }
        private static SingleOrDefault_overload2<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            if (predicate == null)
                throw SystemError.ArgumentNull("predicate");
            var result: TSource = defaultVal;
            var count: number = 0;

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (predicate(element)) {
                        result = element;
                        count++;
                    }
                }
            } finally {
                if (elementEnumerator.Dispose !== void 0) elementEnumerator.Dispose();

            }    
            // end foreach

            switch (count) {
                case 0:
                    return defaultVal;
                case 1:
                    return result;
            }
            throw SystemError.MoreThanOneMatch();
        }
        private static SingleOrDefault_overload3<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): TSource {
            return Enumerable.SingleOrDefault_overload0(source, null);
        }

        public static Count<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): number;
        public static Count<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): number;
        public static Count<TSource>(param0: System.Collections.Generic.IEnumerable<TSource>, param1?: (_: TSource) => boolean): number {
            if (typeof param1 === 'function') { return Enumerable.Count_overload0<TSource>(param0, param1); }
            if ((param1 === void 0)) { return Enumerable.Count_overload1<TSource>(param0); }
        }
        private static Count_overload0<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): number {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            if (predicate == null)
                throw SystemError.ArgumentNull("predicate");
            var count: number = 0;

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                   
                    if (predicate(element)) count++;

                }
            } finally {
                elementEnumerator.Dispose();

            }    
            // end foreach

            return count;
        }
        private static Count_overload1<TSource>(source: System.Collections.Generic.IEnumerable<TSource>): number {
            if (source == null)
                throw SystemError.ArgumentNull("source");

            var asCount = <{ Count: number }><any>source;
            if (asCount.Count !== void 0) {
                return asCount.Count;
            }

            var count: number = 0;
            var e: System.Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
            try
            {

                while (e.MoveNext()) count++;

            }
            finally {
                if (e != null) e.Dispose();
            }
            return count;
        }

        public static FirstOrDefault<TSource>(source: Collections.Generic.IEnumerable<TSource>): TSource;
        public static FirstOrDefault<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource): TSource;
        public static FirstOrDefault<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource;
        public static FirstOrDefault<TSource>(source: Collections.Generic.IEnumerable<TSource>, defaultVal: TSource): TSource;
        public static FirstOrDefault<TSource>(param0: Collections.Generic.IEnumerable<TSource>, param1?: any, param2?: TSource): TSource {
            if (typeof param1 === 'function' && (param2 !== void 0)) { 
                /* (source: Collections.Generic.IEnumerable<TSource>  ,predicate: (_:TSource) => boolean ,defaultVal: TSource ) */
                return Enumerable.FirstOrDefault_overload1<TSource>(param0, param1, param2);
            }
            if (typeof param1 === 'function' && (param2 === void 0)) { 
                /* (source: Collections.Generic.IEnumerable<TSource>  ,predicate: (_:TSource) => boolean ) */
                return Enumerable.FirstOrDefault_overload2<TSource>(param0, param1);
            }
            if ((param1 !== void 0) && (param2 === void 0)) { 
                /* (source: Collections.Generic.IEnumerable<TSource>  ,defaultVal: TSource ) */
                return Enumerable.FirstOrDefault_overload3<TSource>(param0, param1);
            }
            if ((param1 === void 0) && (param2 === void 0)) { 
                /* (source: Collections.Generic.IEnumerable<TSource>  ) */
                return Enumerable.FirstOrDefault_overload0<TSource>(param0);
            }

            throw new Error('overload failed');
        }
        public static FirstOrDefault_overload0<TSource>(source: Collections.Generic.IEnumerable<TSource>): TSource {
            return Enumerable.FirstOrDefault(source, null);
        }
        public static FirstOrDefault_overload1<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean, defaultVal: TSource): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            if (predicate == null)
                throw SystemError.ArgumentNull("predicate");

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (predicate(element))
                        return element;
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach

            return defaultVal;
        }
        public static FirstOrDefault_overload2<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource {
            return Enumerable.FirstOrDefault(source, predicate, null);
        }
        public static FirstOrDefault_overload3<TSource>(source: Collections.Generic.IEnumerable<TSource>, defaultVal: TSource): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            var list = <Collections.Generic.IList<TSource>>source;
            if (list.Count === void 0 || list.$get$ === void 0) {
                list = null;
            }
            if (list != null) {
                if (list.Count > 0)
                    return list.$get$(0);
            }
            else {
                var e: Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
                try
                {
                    if (e.MoveNext())
                        return e.Current;
                }
                finally {
                    if (e != null) e.Dispose();
                }
            }
            return defaultVal;
        }

        
        public static First<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate?: (_: TSource) => boolean): TSource{
        
            if (typeof predicate === 'function' ) { 
                /* (source: Collections.Generic.IEnumerable<TSource>  ,predicate: (_:TSource) => boolean ,defaultVal: TSource ) */
                return Enumerable.First_overload1<TSource>(source, predicate );
            }
         
            return Enumerable.First_overload3<TSource>(source);

            throw new Error('overload failed');
        }
        
        public static First_overload1<TSource>(source: Collections.Generic.IEnumerable<TSource>, predicate: (_: TSource) => boolean): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            if (predicate == null)
                throw SystemError.ArgumentNull("predicate");

            // for each
            var elementEnumerator = source.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (predicate(element))
                        return element;
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach

            throw new System.KeyNotFoundException("");
        }

        public static First_overload3<TSource>(source: Collections.Generic.IEnumerable<TSource>): TSource {
            if (source == null)
                throw SystemError.ArgumentNull("source");
            var list = <Collections.Generic.IList<TSource>>source;
            if (list.Count === void 0 || list.$get$ === void 0) {
                list = null;
            }
            if (list != null) {
                if (list.Count > 0)
                    return list.$get$(0);
            }
            else {
                var e: Collections.Generic.IEnumerator<TSource> = source.GetEnumerator()
                try
                {
                    if (e.MoveNext())
                        return e.Current;
                }
                finally {
                    if (e != null) e.Dispose();
                }
            }
            throw new System.KeyNotFoundException("");
        }

        public static Cast<TDest>(source: Collections.IEnumerable, type: { prototype: TDest } = null): Collections.Generic.IEnumerable<TDest> {
            if (type === null) {
                return <Collections.Generic.IEnumerable<TDest>>source;
            }
            var arr = new Array<TDest>();
            var e = source.GetEnumerator()
            try
            {
                if (e.MoveNext()) {
                    if (type !== null) {
                        if (!(e.Current instanceof <any>type)) {
                            throw new SystemException("can not cast");
                        }
                    }
                    
                    arr.push(<TDest>e.Current);
                    //return e.Current;
                }

            }
            finally {
                if (e != null && (<any>e).Dispose !== void 0) (<any>e).Dispose();
            }

            return arr;
        }
    }

}
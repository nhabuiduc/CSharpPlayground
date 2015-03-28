module Microsoft.CodeAnalysis.CSharp {
    export class FunctionExtensions {
        public static TransitiveClosure<T>(relation: (_: T) => System.Collections.Generic.IEnumerable<T>, item: T): System.Collections.Generic.HashSet<T> {
            var closure = new System.Collections.Generic.HashSet<T>();
            var stack = new System.Collections.Generic.Stack<T>();
            stack.Push(item);
            while (stack.Count > 0) {
                var current: T = stack.Pop();
                // for each
                var newItemEnumerator = relation(current).GetEnumerator();
                try {
                    while (newItemEnumerator.MoveNext()) {
                        var newItem = newItemEnumerator.Current;
                        // foreach block
                        if (closure.Add(newItem)) {
                            stack.Push(newItem);
                        }
                    }
                } finally {
                    if (newItemEnumerator !== null) newItemEnumerator.Dispose();

                }    
                // end foreach
            }
            return closure;
        }
        public static ToLanguageSpecific_2139(predicate: (_: SyntaxToken) => boolean): (_: SyntaxToken) => boolean {
            if (predicate == SyntaxToken.Any) {
                return SyntaxToken.Any;
            }
            else if (predicate == SyntaxToken.NonZeroWidth) {
                return SyntaxToken.NonZeroWidth;
            }
            return (predicate != null) ? t => predicate(t) : <(_: SyntaxToken) => boolean>null;
        }
        public static ToLanguageSpecific_1552(predicate: (_: SyntaxTrivia) => boolean): (_: SyntaxTrivia) => boolean {
            if (predicate == SyntaxTrivia.Any) {
                return SyntaxTrivia.Any;
            }
            return (predicate != null) ? t => predicate(t) : <(_: SyntaxTrivia) => boolean>null;
        }
    }
}
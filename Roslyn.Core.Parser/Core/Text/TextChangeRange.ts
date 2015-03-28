/// <reference path="../InternalUtilities/SpecializedCollections.ts" />
module Microsoft.CodeAnalysis.Text {
    export class TextChangeRange implements System.IEquatable<TextChangeRange>, IStruct {
        public Span: TextSpan = structDefault(TextSpan);
        public NewLength: number = 0;
        ctor_4786(span: TextSpan, newLength: number): TextChangeRange {
            
            if (newLength < 0) {
                throw new System.ArgumentOutOfRangeException("newLength");
            }
            this.Span = span;
            this.NewLength = newLength;
            return this;
        }
        public Equals_5196(other: TextChangeRange): boolean {
            return other.Span.op_Equality(this.Span) && other.NewLength == this.NewLength;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof TextChangeRange && this.Equals_5196(<TextChangeRange>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.NewLength, this.Span.GetHashCode());
        }
        public op_Equality(right: TextChangeRange): boolean {
            var left = this;
            return left.Equals_5196(right);
        }

        public op_Inequality(right: TextChangeRange): boolean {
            var left = this;
            return !(left.op_Equality(right));
        }

        public static NoChanges: System.Collections.Generic.IReadOnlyList<TextChangeRange> = Roslyn.Utilities.SpecializedCollections.EmptyReadOnlyList<TextChangeRange>();
        public static Collapse(changes: System.Collections.Generic.IEnumerable<TextChangeRange>): TextChangeRange {
            var diff = 0;
            var start = Int32.MaxValue;
            var end = 0;
            // for each
            var changeEnumerator = changes.GetEnumerator();
            try {
                while (changeEnumerator.MoveNext()) {
                    var change = changeEnumerator.Current;
                    // foreach block
                    diff += change.NewLength - change.Span.Length;
                    if (change.Span.Start < start) {
                        start = change.Span.Start;
                    }
                    if (change.Span.End > end) {
                        end = change.Span.End;
                    }
                }
            } finally {
                if (changeEnumerator !== null) changeEnumerator.Dispose();

            }    
            // end foreach
            if (start > end) {
                return structDefault(TextChangeRange);
            }
            var combined = TextSpan.FromBounds(start, end);
            var newLen = combined.Length + diff;
            return new TextChangeRange().ctor_4786(combined, newLen);
        }
        constructor() { }
    }
}
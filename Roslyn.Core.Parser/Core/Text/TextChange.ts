module Microsoft.CodeAnalysis.Text {
    export class TextChange implements System.IEquatable<TextChange>, IStruct {
        public Span: TextSpan = structDefault(TextSpan);
        public NewText: string;
        ctor_1791(span: TextSpan, newText: string): TextChange {
            
            if (newText == null) {
                throw new System.ArgumentNullException("newText");
            }
            this.Span = span;
            this.NewText = newText;
            return this;
        }
        public ToString(): string {
            return System.String.Format("{0}: {{ {1}, \"{2}\" }}", __classOf(this).name, this.Span, this.NewText);
        }
        public Equals(obj: Object): boolean {
            return obj instanceof TextChange && this.Equals_8738(<TextChange>obj);
        }
        public Equals_8738(other: TextChange): boolean {
            return System.Collections.Generic.EqualityComparer.Default.Equals(this.Span, other.Span) && System.Collections.Generic.EqualityComparer.Default.Equals(this.NewText, other.NewText);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.Span.GetHashCode(), this.NewText.GetHashCode());
        }
        public op_Equality(right: TextChange): boolean {
            var left = this;
            return left.Equals_8738(right);
        }

        public op_Inequality(right: TextChange): boolean {
            var left = this;
            return !(left.op_Equality(right));
        }

        public static op_Implicit_9951(change: TextChange): TextChangeRange {
            return new TextChangeRange().ctor_4786(change.Span, change.NewText.length);
        }
        public static NoChanges: System.Collections.Generic.IReadOnlyList<TextChange> = Roslyn.Utilities.SpecializedCollections.EmptyReadOnlyList<TextChange>();
        constructor() { }
    }
}
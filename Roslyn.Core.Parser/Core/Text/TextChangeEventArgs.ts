//// <reference path="../../../System/EventArgs.ts" />
module Microsoft.CodeAnalysis.Text {
    export class TextChangeEventArgs extends System.EventArgs {
        ctor_1051(oldText: SourceText, newText: SourceText, changes: System.Collections.Generic.IEnumerable<TextChangeRange>): TextChangeEventArgs {            
            if (changes == null || Roslyn.Utilities.EnumerableExtensions.IsEmpty_9700(changes)) {
                throw new System.ArgumentException("changes");
            }
            this.OldText = oldText;
            this.NewText = newText;
            this.Changes = System.Collections.Immutable.ImmutableArray.ToImmutableArray(changes);
            return this;
        }
        ctor_1283(oldText: SourceText, newText: SourceText, ...changes: TextChangeRange[]): TextChangeEventArgs {
            this.ctor_1051(oldText, newText, <System.Collections.Generic.IEnumerable<TextChangeRange>>changes);
            return this;
        }
        public OldText: SourceText;
        public NewText: SourceText;
        public Changes: System.Collections.Generic.IReadOnlyList<TextChangeRange>;
        constructor() { super(); }
    }
}
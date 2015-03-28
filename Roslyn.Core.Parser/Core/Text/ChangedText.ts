///<reference path="SourceText.ts"/>

module Microsoft.CodeAnalysis.Text {
    export class ChangedText extends SourceText {
        private oldText: SourceText;
        private newText: SourceText;
        private changes: System.Collections.Immutable.ImmutableArray<TextChangeRange> = structDefault(System.Collections.Immutable.ImmutableArray);
        ctor_1415(oldText: SourceText, changeRanges: System.Collections.Immutable.ImmutableArray<TextChangeRange>, segments: System.Collections.Immutable.ImmutableArray<SourceText>): ChangedText {
            super.ctor_1670(structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/oldText.ChecksumAlgorithm, null);
            System.Diagnostics.Debug.Assert(oldText != null);
            System.Diagnostics.Debug.Assert(!changeRanges.IsDefault);
            System.Diagnostics.Debug.Assert(!segments.IsDefault);
            this.oldText = oldText;
            this.newText = segments.IsEmpty ? new StringText().ctor_3448("", oldText.Encoding, structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/oldText.ChecksumAlgorithm) : <SourceText>new CompositeText().ctor_1839(segments);
            this.changes = changeRanges;
            return this;
        }
        public get Encoding(): System.Text.Encoding {
            return this.oldText.Encoding;
        }
        public get OldText(): SourceText {
            return this.oldText;
        }
        public get NewText(): SourceText {
            return this.newText;
        }
        public get Changes(): System.Collections.Generic.IEnumerable<TextChangeRange> {
            return this.changes;
        }
        public get Length(): number {
            return this.newText.Length;
        }
        public $get$(position: number): string {
            return this.newText.$get$(position);
        }
        public ToString_4959(span: TextSpan): string {
            return this.newText.ToString_4959(span);
        }
        public GetSubText_1692(span: TextSpan): SourceText {
            return this.newText.GetSubText_1692(span);
        }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            this.newText.CopyTo(sourceIndex, destination, destinationIndex, count);
        }
        public GetChangeRanges(oldText: SourceText): System.Collections.Generic.IReadOnlyList<TextChangeRange> {
            if (oldText == null) {
                throw new System.ArgumentNullException("oldText");
            }
            if (ReferenceEquals(this.oldText, oldText)) {
                return this.changes;
            }
            if (this.oldText.GetChangeRanges(oldText).Count == 0) {
                return this.changes;
            }
            if (this == oldText) {
                return TextChangeRange.NoChanges;
            }
            return System.Collections.Immutable.ImmutableArray.Create(new TextChangeRange().ctor_4786(new TextSpan().ctor_1506(0, oldText.Length), this.newText.Length));
        }
        constructor() { super(); }
    }
}
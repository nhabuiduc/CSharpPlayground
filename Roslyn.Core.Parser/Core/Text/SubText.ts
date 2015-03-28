module Microsoft.CodeAnalysis.Text {
    export class SubText extends SourceText {
        private text: SourceText;
        private span: TextSpan = structDefault(TextSpan);
        ctor_1484(text: SourceText, span: TextSpan): SubText {
            super.ctor_1670(structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/text.ChecksumAlgorithm, null);
            if (text == null) {
                throw new System.ArgumentNullException('text');
            }
            if (span.Start < 0 || span.Start >= text.Length || span.End < 0 || span.End > text.Length) {
                throw new System.ArgumentException('span');
            }
            this.text = text;
            this.span = span;
            return this;
        }
        public get Encoding(): System.Text.Encoding {
            return this.text.Encoding;
        }
        public get UnderlyingText(): SourceText {
            return this.text;
        }
        public get UnderlyingSpan(): TextSpan {
            return this.span;
        }
        public get Length(): number {
            return this.span.Length;
        }
        public $get$(position: number): string {
            if (position < 0 || position > this.Length) {
                throw new System.ArgumentOutOfRangeException("position");
            }
            return this.text.$get$(this.span.Start + position);
        }
        public ToString_4959(span: TextSpan): string {
            this.CheckSubSpan(span);
            return this.text.ToString_4959(this.GetCompositeSpan(span.Start, span.Length));
        }
        public GetSubText_1692(span: TextSpan): SourceText {
            this.CheckSubSpan(span);
            return new SubText().ctor_1484(this.text, this.GetCompositeSpan(span.Start, span.Length));
        }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            var span = this.GetCompositeSpan(sourceIndex, count);
            this.text.CopyTo(span.Start, destination, destinationIndex, span.Length);
        }
        private GetCompositeSpan(start: number, length: number): TextSpan {
            var compositeStart: number = System.Math.Min(this.text.Length, this.span.Start + start);
            var compositeEnd: number = System.Math.Min(this.text.Length, compositeStart + length);
            return new TextSpan().ctor_1506(compositeStart, compositeEnd - compositeStart);
        }
        constructor() { super(); }
    }
}
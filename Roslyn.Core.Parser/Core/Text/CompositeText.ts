module Microsoft.CodeAnalysis.Text {
    export class CompositeText extends SourceText {
        private texts: System.Collections.Immutable.ImmutableArray<SourceText> = structDefault(System.Collections.Immutable.ImmutableArray);
        private length: number = 0;
        ctor_1839(texts: System.Collections.Immutable.ImmutableArray<SourceText>): CompositeText {
            super.ctor_1670(structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/texts.$get$(0).ChecksumAlgorithm, null);
            System.Diagnostics.Debug.Assert(!texts.IsDefaultOrEmpty);
            //System.Diagnostics.Debug.Assert(System.Linq.ImmutableArrayExtensions.All(texts,
            //    t => System.Linq.ImmutableArrayExtensions.First(texts).Encoding == t.Encoding && System.Linq.ImmutableArrayExtensions.First(texts).ChecksumAlgorithm == t.ChecksumAlgorithm));
            this.texts = texts;
            var len: number = 0;
            // for each
            var textEnumerator = texts.GetEnumerator();
            try {
                while (textEnumerator.MoveNext()) {
                    var text = textEnumerator.Current;
                    // foreach block
                    len += text.Length;
                }
            } finally {
                if (textEnumerator !== null) textEnumerator.Dispose();

            }    
            // end foreach
            this.length = len;
            return this;
        }
        public get Encoding(): System.Text.Encoding {
            return this.texts.$get$(0).Encoding;
        }
        public get Length(): number {
            return this.length;
        }
        public $get$(position: number): string {
            var index: number = 0;
            var offset: number = 0;
            var index_ref0 = { refObj: index };
            var offset_ref1 = { refObj: offset };
            this.GetIndexAndOffset(position, index_ref0, offset_ref1);

            index = index_ref0.refObj;

            offset = offset_ref1.refObj;;
            return this.texts.$get$(index).$get$(offset);
        }
        public GetSubText_1692(span: TextSpan): SourceText {
            this.CheckSubSpan(span);
            var sourceIndex = span.Start;
            var count = span.Length;
            var segIndex: number = 0;
            var segOffset: number = 0;
            var segIndex_ref0 = { refObj: segIndex };
            var segOffset_ref1 = { refObj: segOffset };
            this.GetIndexAndOffset(sourceIndex, segIndex_ref0, segOffset_ref1);

            segIndex = segIndex_ref0.refObj;

            segOffset = segOffset_ref1.refObj;;
            var newTexts = ArrayBuilder.GetInstance_1997<SourceText>();
            while (segIndex < this.texts.Length && count > 0) {
                var segment = this.texts.$get$(segIndex);
                var copyLength = System.Math.Min(count, segment.Length - segOffset);
                CompositeText.AddSegments(newTexts, segment.GetSubText_1692(new TextSpan().ctor_1506(segOffset, copyLength)));
                count -= copyLength;
                segIndex++;
                segOffset = 0;
            }
            if (newTexts.Count == 0) {
                newTexts.Free();
                return SourceText.From_1429(System.String.Empty, this.Encoding, this.ChecksumAlgorithm);
            }
            else if (newTexts.Count == 1) {
                var result: SourceText = newTexts.$get$(0);
                newTexts.Free();
                return result;
            }
            else {
                return new CompositeText().ctor_1839(newTexts.ToImmutableAndFree());
            }
        }
        private GetIndexAndOffset(position: number, index: { refObj: number }, offset: { refObj: number }): void {
            for (var i: number = 0; i < this.texts.Length; i++) {
                var segment = this.texts.$get$(i);
                if (position < segment.Length) {
                    index.refObj = i;
                    offset.refObj = position;
                    return
                }
                else {
                    position -= segment.Length;
                }
            }
            index.refObj = 0;
            offset.refObj = 0;
            throw new System.ArgumentException("position");
        }
        private CheckCopyToArguments(sourceIndex: number, destination: string[], destinationIndex: number, count: number): boolean {
            if (destination == null)
                throw new System.ArgumentNullException("destination");
            if (sourceIndex < 0)
                throw new System.ArgumentOutOfRangeException("sourceIndex");
            if (destinationIndex < 0)
                throw new System.ArgumentOutOfRangeException("destinationIndex");
            if (count < 0 || count > this.Length - sourceIndex || count > destination.length - destinationIndex)
                throw new System.ArgumentOutOfRangeException("count");
            return count > 0;
        }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            if (!this.CheckCopyToArguments(sourceIndex, destination, destinationIndex, count))
                return
            var segIndex: number = 0;
            var segOffset: number = 0;
            var segIndex_ref0 = { refObj: segIndex };
            var segOffset_ref1 = { refObj: segOffset };
            this.GetIndexAndOffset(sourceIndex, segIndex_ref0, segOffset_ref1);

            segIndex = segIndex_ref0.refObj;

            segOffset = segOffset_ref1.refObj;;
            while (segIndex < this.texts.Length && count > 0) {
                var segment = this.texts.$get$(segIndex);
                var copyLength = System.Math.Min(count, segment.Length - segOffset);
                segment.CopyTo(segOffset, destination, destinationIndex, copyLength);
                count -= copyLength;
                destinationIndex += copyLength;
                segIndex++;
                segOffset = 0;
            }
        }
        public static AddSegments(builder: ArrayBuilder<SourceText>, text: SourceText): void {
            var composite: CompositeText = __as__<CompositeText>(text, CompositeText);
            if (composite == null) {
                builder.Add(text);
            }
            else {
                builder.AddRange_1909(composite.texts);
            }
        }
        constructor() { super(); }
    }
}
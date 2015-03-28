module Microsoft.CodeAnalysis.Text {
    export class TextLine implements System.IEquatable<TextLine>, IStruct {
        private text: SourceText;
        private start: number = 0;
        private endIncludingBreaks: number = 0;
        ctor_9479(text: SourceText, start: number, endIncludingBreaks: number): TextLine {
            this.text = text;
            this.start = start;
            this.endIncludingBreaks = endIncludingBreaks;
            return this;
        }
        public static FromSpan(text: SourceText, span: TextSpan): TextLine {
            if (text == null) {
                throw new System.ArgumentNullException("text");
            }
            if (span.Start > text.Length || span.Start < 0 || span.End > text.Length) {
                throw new System.ArgumentOutOfRangeException("span");
            }
            if (text.Length > 0) {
                if (span.Start > 0 && !TextUtilities.IsAnyLineBreakCharacter(text.$get$(span.Start - 1))) {
                    throw new System.ArgumentOutOfRangeException(CodeAnalysisResources.SpanDoesNotIncludeStartOfLine);
                }
                var endIncludesLineBreak: boolean = false;
                if (span.End > span.Start) {
                    endIncludesLineBreak = TextUtilities.IsAnyLineBreakCharacter(text.$get$(span.End - 1));
                }
                if (!endIncludesLineBreak && span.End < text.Length) {
                    var lineBreakLen = TextUtilities.GetLengthOfLineBreak(text, span.End);
                    if (lineBreakLen > 0) {
                        endIncludesLineBreak = true;
                        span = new TextSpan().ctor_1506(span.Start, span.Length + lineBreakLen);
                    }
                }
                if (span.End < text.Length && !endIncludesLineBreak) {
                    throw new System.ArgumentOutOfRangeException(CodeAnalysisResources.SpanDoesNotIncludeEndOfLine);
                }
                return new TextLine().ctor_9479(text, span.Start, span.End);
            }
            else {
                return new TextLine().ctor_9479(text, 0, 0);
            }
        }
        public get Text(): SourceText {
            return this.text;
        }
        public get LineNumber(): number {
            if (this.text != null) {
                return this.text.Lines.IndexOf(this.start);
            }
            else {
                return 0;
            }
        }
        public get Start(): number {
            return this.start;
        }
        public get End(): number {
            return this.endIncludingBreaks - this.LineBreakLength;
        }
        private get LineBreakLength(): number {
            if (this.text == null || this.text.Length == 0 || this.endIncludingBreaks == this.start) {
                return 0;
            }
            else {
                var startLineBreak: number = 0;
                var lineBreakLength: number = 0;
                var startLineBreak_ref0 = { refObj: startLineBreak };
                var lineBreakLength_ref1 = { refObj: lineBreakLength };
                TextUtilities.GetStartAndLengthOfLineBreakEndingAt(this.text, this.endIncludingBreaks - 1, startLineBreak_ref0, lineBreakLength_ref1);

                startLineBreak = startLineBreak_ref0.refObj;

                lineBreakLength = lineBreakLength_ref1.refObj;;
                return lineBreakLength;
            }
        }
        public get EndIncludingLineBreak(): number {
            return this.endIncludingBreaks;
        }
        public get Span(): TextSpan {
            return TextSpan.FromBounds(this.Start, this.End);
        }
        public get SpanIncludingLineBreak(): TextSpan {
            return TextSpan.FromBounds(this.Start, this.EndIncludingLineBreak);
        }
        public ToString(): string {
            if (this.text == null || this.text.Length == 0) {
                return System.String.Empty;
            }
            else {
                return this.text.ToString_4959(this.Span);
            }
        }
        public op_Equality(right: TextLine): boolean {
            var left = this;
            return left.Equals_4451(right);
        }

        public op_Inequality(right: TextLine): boolean {
            var left = this;
            return !left.Equals_4451(right);
        }

        public Equals_4451(other: TextLine): boolean {
            return other.text == this.text && other.start == this.start && other.endIncludingBreaks == this.endIncludingBreaks;
        }
        public Equals(obj: Object): boolean {
            if (obj instanceof TextLine) {
                return this.Equals_4451(<TextLine>obj);
            }
            return false;
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.text, Roslyn.Utilities.Hash.Combine_1641(this.start, this.endIncludingBreaks));
        }
        constructor() { }
    }
}
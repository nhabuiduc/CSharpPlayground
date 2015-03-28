module Microsoft.CodeAnalysis.Text {
    export class TextLineCollection implements System.Collections.Generic.IReadOnlyList<TextLine>
    {
        public Count: number = 0;
        public $get$(index: number): TextLine
        { throw new System.NotImplementedException(); }
        public IndexOf(position: number): number { throw new Error('not implemented'); }
        public GetLineFromPosition(position: number): TextLine {
            return this.$get$(this.IndexOf(position));
        }
        public GetLinePosition(position: number): LinePosition {
            var line = this.GetLineFromPosition(position);
            return new LinePosition().ctor_1367(line.LineNumber, position - line.Start);
        }
        public GetLinePositionSpan(span: TextSpan): LinePositionSpan {
            return new LinePositionSpan().ctor_1348(this.GetLinePosition(span.Start), this.GetLinePosition(span.End));
        }
        public GetPosition(position: LinePosition): number {
            return this.$get$(position.Line).Start + position.Character;
        }
        public GetTextSpan(span: LinePositionSpan): TextSpan {
            return TextSpan.FromBounds(this.GetPosition(span.Start), this.GetPosition(span.End));
        }
        public GetEnumerator(): TextLineCollection.Enumerator {
            return new TextLineCollection.Enumerator().ctor_1673(this);
        }
        //System.Collections.Generic.IEnumerable<Microsoft.CodeAnalysis.Text.TextLine>.GetEnumerator(): System.Collections.Generic.IEnumerator<TextLine> {
        //    return this.GetEnumerator();
        //}
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    return this.GetEnumerator();
        //}
        constructor() { }
    }
    export module TextLineCollection {
        export class Enumerator implements System.Collections.Generic.IEnumerator<TextLine>, System.Collections.IEnumerator, IStruct {
            private lines: TextLineCollection;
            private index: number = 0;
            ctor_1673(lines: TextLineCollection, index: number = -1): Enumerator {
                this.lines = lines;
                this.index = index;
                return this;
            }
            public get Current(): TextLine {
                var ndx = this.index;
                if (ndx >= 0 && ndx < this.lines.Count) {
                    return this.lines.$get$(ndx);
                }
                else {
                    return structDefault(TextLine);
                }
            }
            public MoveNext(): boolean {
                if (this.index < this.lines.Count - 1) {
                    this.index = this.index + 1;
                    return true;
                }
                return false;
            }
            Reset(): void {

            }
            Dispose(): void {

            }
            public Equals(obj: Object): boolean {
                throw new System.NotSupportedException();
            }
            public GetHashCode(): number {
                throw new System.NotSupportedException();
            }
            constructor() { }
        }
    }
}
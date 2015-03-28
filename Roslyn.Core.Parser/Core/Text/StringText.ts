module Microsoft.CodeAnalysis.Text {
    export class StringText extends SourceText {
        private source: string;
        private encodingOpt: System.Text.Encoding;
        ctor_3448(source: string,
            encodingOpt: System.Text.Encoding,
            checksum: System.Collections.Immutable.ImmutableArray<number> = structDefault(System.Collections.Immutable.ImmutableArray),
            checksumAlgorithm: SourceHashAlgorithm = SourceHashAlgorithm.Sha1): StringText {
            super.ctor_1670(checksum, checksumAlgorithm);
            System.Diagnostics.Debug.Assert(source != null);
            this.source = source;
            this.encodingOpt = encodingOpt;
            return this;
        }
        public get Encoding(): System.Text.Encoding {
            return this.encodingOpt;
        }
        public get Source(): string {
            return this.source;
        }
        public get Length(): number {
            return this.Source.length;
        }
        public $get$(position: number): string {
            return this.source[position];
        }
        public ToString_4959(span: TextSpan): string {
            if (span.End > this.Source.length) {
                throw new System.ArgumentOutOfRangeException("span");
            }
            if (span.Start == 0 && span.Length == this.Length) {
                return this.Source;
            }
            else {
                return this.Source.substr(span.Start, span.Length);
            }
        }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            this.Source.CopyTo(sourceIndex, destination, destinationIndex, count);
        }
        public Write_5564(textWriter: System.IO.TextWriter, span: TextSpan, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): void {
            if (span.Start == 0 && span.End == this.Length) {
                textWriter.WriteString(this.Source);
            }
            else {
                super.Write_5564(textWriter, span, cancellationToken);
            }
        }
        constructor() { super(); }
    }
}
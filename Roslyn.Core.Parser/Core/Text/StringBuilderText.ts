module Microsoft.CodeAnalysis.Text {
    export class StringBuilderText extends SourceText {
        private builder: System.Text.StringBuilder;
        private encodingOpt: System.Text.Encoding;
        ctor_1446(builder: System.Text.StringBuilder, encodingOpt: System.Text.Encoding, checksumAlgorithm: SourceHashAlgorithm): StringBuilderText {
            super.ctor_1670(structDefault(System.Collections.Immutable.ImmutableArray),/*checksumAlgorithm:*/checksumAlgorithm, null);
            System.Diagnostics.Debug.Assert(builder != null);
            this.builder = builder;
            this.encodingOpt = encodingOpt;
            return this;
        }
        public get Encoding(): System.Text.Encoding {
            return this.encodingOpt;
        }
        public get Builder(): System.Text.StringBuilder {
            return this.builder;
        }
        public get Length(): number {
            return this.builder.Length;
        }
        public $get$(position: number): string {
            if (position < 0 || position >= this.builder.Length) {
                throw new System.ArgumentOutOfRangeException("position");
            }
            return this.builder.$get$(position);
        }
        public ToString_4959(span: TextSpan): string {
            if (span.End > this.builder.Length) {
                throw new System.ArgumentOutOfRangeException("span");
            }
            return this.builder.ToString(span.Start, span.Length);
        }
        public CopyTo(sourceIndex: number, destination: string[], destinationIndex: number, count: number): void {
            this.builder.CopyTo(sourceIndex, destination, destinationIndex, count);
        }
        constructor() { super(); }
    }
}
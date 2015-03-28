module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxDiagnosticInfo extends DiagnosticInfo {
        public Offset: number = 0;
        public Width: number = 0;
        ctor_7359(offset: number, width: number, code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            super.ctor_4145(CSharp.MessageProvider.Instance, <number>code, args);
            System.Diagnostics.Debug.Assert(width >= 0);
            this.Offset = offset;
            this.Width = width;
            return this;
        }
        ctor_1813(offset: number, width: number, code: ErrorCode): SyntaxDiagnosticInfo {
            this.ctor_7359(offset, width, code, Roslyn.Utilities.SpecializedCollections.EmptyObjects);
            return this;
        }
        ctor_1447(code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            this.ctor_7359(0, 0, code, args);
            return this;
        }
        ctor_2518(code: ErrorCode): SyntaxDiagnosticInfo {
            this.ctor_1813(0, 0, code);
            return this;
        }
        public WithOffset(offset: number): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_7359(offset, this.Width, <ErrorCode>this.Code, this.Arguments);
        }
        public WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            super.WriteTo(writer);
            writer.WriteInt32(this.Offset);
            writer.WriteInt32(this.Width);
        }
        public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return (r) => new SyntaxDiagnosticInfo().ctor_3320(r);
        }
        ctor_3320(reader: Roslyn.Utilities.ObjectReader): SyntaxDiagnosticInfo {
            super.ctor_1156(reader);
            this.Offset = reader.ReadInt32();
            this.Width = reader.ReadInt32();
            return this;
        }
        constructor() { super(); }
    }
}
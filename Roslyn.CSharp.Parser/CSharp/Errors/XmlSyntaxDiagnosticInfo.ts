module Microsoft.CodeAnalysis.CSharp {
    export class XmlSyntaxDiagnosticInfo extends SyntaxDiagnosticInfo {
        private xmlErrorCode: XmlParseErrorCode = 0;
        ctor_5460(code: XmlParseErrorCode, ...args: Object[]): XmlSyntaxDiagnosticInfo {
            this.ctor_8171(0, 0, code, args);
            return this;
        }
        ctor_8171(offset: number, width: number, code: XmlParseErrorCode, ...args: Object[]): XmlSyntaxDiagnosticInfo {
            super.ctor_7359(offset, width, ErrorCode.WRN_XMLParseError, args);
            this.xmlErrorCode = code;
            return this;
        }
        public  WriteTo(writer: Roslyn.Utilities.ObjectWriter): void {
            super.WriteTo(writer);
            writer.WriteCompressedUInt(<number>this.xmlErrorCode);
        }
        public  GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return r => new XmlSyntaxDiagnosticInfo().ctor_1269(r);
        }
        ctor_1269(reader: Roslyn.Utilities.ObjectReader): XmlSyntaxDiagnosticInfo {
            super.ctor_3320(reader);
            this.xmlErrorCode = <XmlParseErrorCode>reader.ReadCompressedUInt();
            return this;
        }
        public GetMessage(formatProvider: System.IFormatProvider = null): string {
            var culture = __as__<System.Globalization.CultureInfo>(formatProvider, System.Globalization.CultureInfo);
            if (culture == null) {
                culture = System.Globalization.CultureInfo.InvariantCulture;
            }
            var messagePrefix: string = this.MessageProvider.LoadMessage(this.Code, culture);
            var message: string = ErrorFacts.GetMessage_1609(this.xmlErrorCode, culture);
            System.Diagnostics.Debug.Assert(!System.String.IsNullOrEmpty(message));
            if (this.Arguments == null || this.Arguments.length == 0) {
                return System.String.Format(culture, messagePrefix, message);
            }
            return System.String.Format(culture, System.String.Format(culture, messagePrefix, message), this.Arguments);
        }
        constructor() { super(); }
    }
}
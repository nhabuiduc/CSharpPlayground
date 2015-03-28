module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class AbstractLexer implements System.IDisposable {
        public TextWindow: SlidingTextWindow;
        private errors: System.Collections.Generic.List<SyntaxDiagnosticInfo>;
        ctor_1225(text: Text.SourceText): AbstractLexer {            
            this.TextWindow = new SlidingTextWindow().ctor_9238(text);
            return this;
        }
        public Dispose(): void {
            this.TextWindow.Dispose(); 
        }
        protected Start(): void {
            this.TextWindow.Start();
            this.errors = null;
        }
        protected get HasErrors(): boolean {
            return this.errors != null;
        }
        protected GetErrors(leadingTriviaWidth: number): SyntaxDiagnosticInfo[] {
            if (this.errors != null) {
                if (leadingTriviaWidth > 0) {
                    var array = new Array(this.errors.Count);
                    for (var i: number = 0; i < this.errors.Count; i++) {
                        array[i] = this.errors.$get$(i).WithOffset(this.errors.$get$(i).Offset + leadingTriviaWidth);
                    }
                    return array;
                }
                else {
                    return this.errors.ToArray();
                }
            }
            else {
                return null;
            }
        }
        protected AddError_1749(position: number, width: number, code: ErrorCode): void {
            this.AddError_9129(this.MakeError_1764(position, width, code));
        }
        protected AddError_1288(position: number, width: number, code: ErrorCode, ...args: Object[]): void {
            this.AddError_9129(this.MakeError_1930(position, width, code, args));
        }
        protected AddError_1315(position: number, width: number, code: XmlParseErrorCode, ...args: Object[]): void {
            this.AddError_9129(this.MakeError_1925(position, width, code, args));
        }
        protected AddError_1261(code: ErrorCode): void {
            this.AddError_9129(AbstractLexer.MakeError_4977(code));
        }
        protected AddError_1515(code: ErrorCode, ...args: Object[]): void {
            this.AddError_9129(AbstractLexer.MakeError_2338(code, args));
        }
        protected AddError_2006(code: XmlParseErrorCode): void {
            this.AddError_9129(AbstractLexer.MakeError_5849(code));
        }
        protected AddError_2611(code: XmlParseErrorCode, ...args: Object[]): void {
            this.AddError_9129(AbstractLexer.MakeError_1869(code, args));
        }
        protected AddError_9129(error: SyntaxDiagnosticInfo): void {
            if (error != null) {
                if (this.errors == null) {
                    this.errors = new System.Collections.Generic.List<SyntaxDiagnosticInfo>(8);
                }
                this.errors.Add(error);
            }
        }
        public MakeError_1764(position: number, width: number, code: ErrorCode): SyntaxDiagnosticInfo {
            var offset: number = this.GetLexemeOffsetFromPosition(position);
            return new SyntaxDiagnosticInfo().ctor_1813(offset, width, code);
        }
        public MakeError_1930(position: number, width: number, code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            var offset: number = this.GetLexemeOffsetFromPosition(position);
            return new SyntaxDiagnosticInfo().ctor_7359(offset, width, code, args);
        }
        public MakeError_1925(position: number, width: number, code: XmlParseErrorCode, ...args: Object[]): XmlSyntaxDiagnosticInfo {
            var offset: number = this.GetLexemeOffsetFromPosition(position);
            return new XmlSyntaxDiagnosticInfo().ctor_8171(offset, width, code, args);
        }
        private GetLexemeOffsetFromPosition(position: number): number {
            return position >= this.TextWindow.LexemeStartPosition ? position - this.TextWindow.LexemeStartPosition : position;
        }
        protected static MakeError_4977(code: ErrorCode): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_2518(code);
        }
        protected static MakeError_2338(code: ErrorCode, ...args: Object[]): SyntaxDiagnosticInfo {
            return new SyntaxDiagnosticInfo().ctor_1447(code, args);
        }
        protected static MakeError_5849(code: XmlParseErrorCode): XmlSyntaxDiagnosticInfo {
            return new XmlSyntaxDiagnosticInfo().ctor_8171(0, 0, code);
        }
        protected static MakeError_1869(code: XmlParseErrorCode, ...args: Object[]): XmlSyntaxDiagnosticInfo {
            return new XmlSyntaxDiagnosticInfo().ctor_8171(0, 0, code, args);
        }
        constructor() { }
    }
}
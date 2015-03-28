module System.IO {
    export class TextWriter {
        private stream: Stream;
        private buffer: Int8Array;
        private dataView: DataView;
        constructor();
        constructor(stream: Stream);
        constructor(stream: Stream, encoding: System.Text.Encoding);
        constructor(stream?: Stream, encoding?: System.Text.Encoding) {
            if (stream === void 0) {
                return;
            }
            this.stream = stream;
            this.buffer = new Int8Array(8);
            this.dataView = new DataView(this.buffer.buffer);
        }

        public WriteCharArray(buffer: string[], index: number, count: number): void {
            if (buffer == null)
                throw new ArgumentNullException("buffer", Environment.GetResourceString("ArgumentNull_Buffer"));
            if (index < 0)
                throw new ArgumentOutOfRangeException("index", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (count < 0)
                throw new ArgumentOutOfRangeException("count", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (buffer.length - index < count)
                throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
            for (var i = 0; i < count; i++) this.WriteChar(buffer[index + i]);
        }

        public WriteString(str: string, ...args: Object[]): void {
            if (args.length > 0) {
                str = System.String.Format(str, args);
            }
            for (var i = 0; i < str.length; i++) this.WriteChar(str.charAt(i));
        }

        public WriteLine(str: string, ...args: Object[]): void {
            if (args.length > 0) {
                str = System.String.Format(str, args);
            }
            for (var i = 0; i < str.length; i++) this.WriteChar(str.charAt(i));
            this.WriteChar('\r');
            this.WriteChar('\n');
        }

        public WriteChar(c: string): void {
            var code = c.charCodeAt(0);
            this.dataView.setUint16(0, code);
            this.stream.Write(this.buffer, 0, 2);
        }
    }
}
module System.IO {
    export class BinaryWriter {

        private stream: Stream;
        private buffer: Int8Array;
        private dataView: DataView;

        constructor(stream: Stream);
        constructor(stream: Stream, encoding: System.Text.Encoding);
        constructor(stream: Stream, encoding?: System.Text.Encoding) {
            this.stream = stream;
            this.buffer = new Int8Array(8);
            this.dataView = new DataView(this.buffer.buffer);
        }

        public WriteChar(c: string): void {
            var code = c.charCodeAt(0);
            this.WriteUInt16(code);
        }

        public WriteString(str: string): void {
            var arrayBuffer = StringToArrayBuffer(str);
            //write length first
            this.WriteUInt32(arrayBuffer.byteLength);
            this.stream.Write(new Int8Array(arrayBuffer), 0, arrayBuffer.byteLength);
        }

        public WriteBoolean(value: boolean): void {
            this.dataView.setUint8(0, Number(value));
            this.stream.Write(this.buffer, 0, 1);
        }

        public WriteByte(value: number): void {
            this.dataView.setUint8(0, value);
            this.stream.Write(this.buffer, 0, 1);
        }

        public WriteDecimal(value: number): void {
            this.dataView.setFloat64(0, value);
            this.stream.Write(this.buffer, 0, 8);
        }

        public WriteDouble(value: number): void {
            this.dataView.setFloat64(0, value);
            this.stream.Write(this.buffer, 0, 8);
        }

        // for js must be stored as 64 bit as well !!!
        public WriteSingle(value: number): void {
            this.dataView.setFloat64(0, value);
            this.stream.Write(this.buffer, 0, 8);
        }

        public WriteSByte(value: number): void {
            this.dataView.setInt8(0, value);
            this.stream.Write(this.buffer, 0, 1);
        }

        public WriteInt16(value: number): void {
            this.dataView.setInt16(0, value);
            this.stream.Write(this.buffer, 0, 2);
        }

        public WriteInt32(value: number): void {
            this.dataView.setInt32(0, value);
            this.stream.Write(this.buffer, 0, 4);
        }

        public WriteUInt16(value: number): void {
            this.dataView.setUint16(0, value);
            this.stream.Write(this.buffer, 0, 2);
        }

        public WriteUShort(value: number): void {
            this.dataView.setUint16(0, value);
            this.stream.Write(this.buffer, 0, 2);
        }

        public WriteUInt32(value: number): void {
            this.dataView.setUint32(0, value);
            this.stream.Write(this.buffer, 0, 4);
        }

        public WriteInt64(value: number): void {
            this.dataView.setFloat64(0, value);
            this.stream.Write(this.buffer, 0, 8);
        }
    }
}
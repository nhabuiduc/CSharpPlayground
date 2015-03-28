module System.IO {
    export class BinaryReader {
        private stream: Stream;
        private dataView: DataView;
        private buffer: Int8Array;
        //private position: number;
        
        constructor(stream: Stream);
        constructor(stream: Stream, encoding: System.Text.Encoding);
        constructor(stream: Stream, encoding?: System.Text.Encoding) {
            stream.Read
            this.stream = stream;
            this.buffer = new Int8Array(8);
            //this.buffer = new Int8Array(stream.Length);
            //stream.Read(this.buffer, 0, stream.Length);
            this.dataView = new DataView(this.buffer.buffer);
        }

        //private EnsurePosition(length: number) {
        //    if (this.position + length > this.buffer.length) {
        //        throw new IndexOutOfRangeException();
        //    }
        //}

        //private IncreasePosition(length: number) {
        //    this.position += length;
        //}

        public ReadChar(): string {
            var code = this.ReadUInt16();
            return GbString.fromCharCode(code);
        }

        public ReadString(): string {
            var length = this.ReadUInt32();
            var buffer = new Int8Array(length);
            this.stream.Read(buffer, 0, length);
            return ArrayBufferToString(buffer.buffer);
        }

        public ReadBoolean(): boolean {
            this.stream.Read(this.buffer, 0, 1);
            var result = this.dataView.getUint8(0);
            return result > 0 ? true : false;
        }

        public ReadSByte(): number {
            this.stream.Read(this.buffer, 0, 1);
            var result = this.dataView.getInt8(0);
            return result;
        }

        public ReadByte(): number {
            this.stream.Read(this.buffer, 0, 1);
            var result = this.dataView.getUint8(0);
            return result;
        }

        public ReadInt16(): number {
            this.stream.Read(this.buffer, 0, 2);
            var result = this.dataView.getInt16(0);
            return result;
        }

        public ReadInt32(): number {
            this.stream.Read(this.buffer, 0, 4);
            var result = this.dataView.getInt32(0);
            return result;
        }

        public ReadUInt16(): number {
            this.stream.Read(this.buffer, 0, 2);
            var result = this.dataView.getUint16(0);
            return result;
        }

        public ReadUInt32(): number {
            this.stream.Read(this.buffer, 0, 4);
            var result = this.dataView.getUint32(0);
            return result;
        }

        public ReadDecimal(): number {
            this.stream.Read(this.buffer, 0, 8);
            var result = this.dataView.getFloat64(0);
            return result;
        }

        public ReadDouble(): number {
            this.stream.Read(this.buffer, 0, 8);
            var result = this.dataView.getFloat64(0);
            return result;
        }

        // for js must be stored as 64 bit as well !!!
        public ReadSingle(): number {
            this.stream.Read(this.buffer, 0, 8);
            var result = this.dataView.getFloat64(0);
            return result;
        }

        public Read(buffer: Int8Array, index: number, count: number): number {
            return this.stream.Read(buffer, index, count);
        }

        public ReadInt64(): number {
            this.stream.Read(this.buffer, 0, 8);
            var result = this.dataView.getFloat64(0);
            return result;
        }
    }
}
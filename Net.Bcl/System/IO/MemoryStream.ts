///<reference path="../PrimitiveType.ts"/>
module System.IO {
    export class MemoryStream implements Stream {
        private _buffer: Int8Array = null;
        private _origin: number = 0;
        private _position: number = 0;
        private _length: number = 0;
        private _capacity: number = 0;
        private _expandable: boolean = false;
        private _writable: boolean = false;
        private _exposable: boolean = false;
        private _isOpen: boolean = false;
        private static MemStreamMaxLength: number = Int32.MaxValue;
        public get CanRead(): boolean {
            return this._isOpen;
        }
        public get CanSeek(): boolean {
            return this._isOpen;
        }
        public get CanWrite(): boolean {
            return this._writable;
        }
        private EnsureWriteable(): void {
            if (!this.CanWrite)
                __Error.WriteNotSupported();
        }

        public Dispose(disposing?: boolean): void {
            if (typeof disposing == 'undefined') {
                disposing = true;
            }
            try
            {
                if (disposing) {
                    this._isOpen = false;
                    this._writable = false;
                    this._expandable = false;
                }
            }

            finally {
                // Call base.Close() to cleanup async IO resources
                //base.Dispose(disposing);
            }
        }
        private EnsureCapacity(value: number): boolean {
            if (value < 0)
                throw new IOException(Environment.GetResourceString("IO.IO_StreamTooLong"));
            if (value > this._capacity) {
                var newCapacity: number = value;
                if (newCapacity < 256)
                    newCapacity = 256;
                if (newCapacity < this._capacity * 2)
                    newCapacity = this._capacity * 2;
                this.Capacity = newCapacity;
                return true;
            }
            return false;
        }
        public Flush(): void {

        }
        public GetBuffer(): Int8Array {
            if (!this._exposable)
                throw new UnauthorizedAccessException(Environment.GetResourceString("UnauthorizedAccess_MemStreamBuffer"));
            return this._buffer;
        }
        public InternalGetBuffer(): Int8Array {
            return this._buffer;
        }
        public InternalGetOriginAndLength(origin: { refObj: number }, length: { refObj: number }): void {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            origin.refObj = this._origin;
            length.refObj = this._length;
        }
        public InternalGetPosition(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            return this._position;
        }
        public InternalReadInt32(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            var pos: number = (this._position += 4);
            if (pos > this._length) {
                this._position = this._length;
                __Error.EndOfFile();
            }
            return <number>(this._buffer[pos - 4] | this._buffer[pos - 3] << 8 | this._buffer[pos - 2] << 16 | this._buffer[pos - 1] << 24);
        }
        public InternalEmulateRead(count: number): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            var n: number = this._length - this._position;
            if (n > count)
                n = count;
            if (n < 0)
                n = 0;
           // Contract.Assert(this._position + n >= 0, "_position + n >= 0");
            this._position += n;
            return n;
        }
        public get Capacity(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            return this._capacity - this._origin;
        }
        public set Capacity(value: number) {
            if (value < this.Length)
                throw new ArgumentOutOfRangeException("value", Environment.GetResourceString("ArgumentOutOfRange_SmallCapacity"));
           // Contract.Ensures(this._capacity - this._origin == value);
          //  Contract.EndContractBlock();
            if (!this._isOpen)
                __Error.StreamIsClosed();
            if (!this._expandable && (value != this.Capacity))
                __Error.MemoryStreamNotExpandable();
            if (this._expandable && value != this._capacity) {
                if (value > 0) {
                    var newBuffer: Int8Array = new Int8Array(value);
                    if (this._length > 0) {
                        //Buffer.InternalBlockCopy(this._buffer, 0, newBuffer, 0, this._length);
                        TSArrayBuffer.Copy_1(this._buffer, 0, newBuffer, 0, this._length);
                    }
                        
                    this._buffer = newBuffer;
                }
                else {
                    this._buffer = null;
                }
                this._capacity = value;
            }
        }
        public get Length(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            return this._length - this._origin;
        }
        public get Position(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            return this._position - this._origin;
        }
        public set Position(value: number) {
            if (value < 0)
                throw new ArgumentOutOfRangeException("value", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
           // Contract.Ensures(this.Position == value);
           // Contract.EndContractBlock();
            if (!this._isOpen)
                __Error.StreamIsClosed();
            if (value > MemoryStream.MemStreamMaxLength)
                throw new ArgumentOutOfRangeException("value", Environment.GetResourceString("ArgumentOutOfRange_StreamLength"));
            this._position = this._origin + <number>value;
        }
        public Read(buffer: Int8Array, offset: number, count: number): number {
            if (buffer == null)
                throw new ArgumentNullException("buffer", Environment.GetResourceString("ArgumentNull_Buffer"));
            if (offset < 0)
                throw new ArgumentOutOfRangeException("offset", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (count < 0)
                throw new ArgumentOutOfRangeException("count", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (buffer.length - offset < count)
                throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
           // Contract.EndContractBlock();
            if (!this._isOpen)
                __Error.StreamIsClosed();
            var n: number = this._length - this._position;
            if (n > count)
                n = count;
            if (n <= 0)
                return 0;
           // Contract.Assert(this._position + n >= 0, "_position + n >= 0");
            if (n <= 8) {
                var byteCount: number = n;
                while (--byteCount >= 0)
                    buffer[offset + byteCount] = this._buffer[this._position + byteCount];
            }
            //else Buffer.InternalBlockCopy(this._buffer, this._position, buffer, offset, n);
            else TSArrayBuffer.Copy_1(this._buffer, this._position, buffer, offset, n);
            this._position += n;
            return n;
        }
        public ReadByte(): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            if (this._position >= this._length)
                return -1;
            return this._buffer[this._position++];
        }
        public Seek(offset: number, loc: SeekOrigin): number {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            if (offset > MemoryStream.MemStreamMaxLength)
                throw new ArgumentOutOfRangeException("offset", Environment.GetResourceString("ArgumentOutOfRange_StreamLength"));
            switch (loc) {
                case SeekOrigin.Begin:
                    {
                        var tempPosition: number = (this._origin + <number>offset);
                        if (offset < 0 || tempPosition < this._origin)
                            throw new IOException(Environment.GetResourceString("IO.IO_SeekBeforeBegin"));
                        this._position = tempPosition;
                        break;
                    }
                case SeekOrigin.Current:
                    {
                        var tempPosition: number = (this._position + <number>offset);
                        if ((this._position + offset) < this._origin || tempPosition < this._origin)
                            throw new IOException(Environment.GetResourceString("IO.IO_SeekBeforeBegin"));
                        this._position = tempPosition;
                        break;
                    }
                case SeekOrigin.End:
                    {
                        var tempPosition: number = (this._length + <number>offset);
                        if ((this._length + offset) < this._origin || tempPosition < this._origin)
                            throw new IOException(Environment.GetResourceString("IO.IO_SeekBeforeBegin"));
                        this._position = tempPosition;
                        break;
                    }
                default:
                    throw new ArgumentException(Environment.GetResourceString("Argument_InvalidSeekOrigin"));
            }
            //Contract.Assert(this._position >= 0, "_position >= 0");
            return this._position;
        }
        public SetLength(value: number): void {
            if (value < 0 || value > Int32.MaxValue) {
                throw new ArgumentOutOfRangeException("value", Environment.GetResourceString("ArgumentOutOfRange_StreamLength"));
            }
          //  Contract.Ensures(this._length - this._origin == value);
           // Contract.EndContractBlock();
            this.EnsureWriteable();
           // Contract.Assert(MemoryStream.MemStreamMaxLength == Int32.MaxValue);
            if (value > (Int32.MaxValue - this._origin)) {
                throw new ArgumentOutOfRangeException("value", Environment.GetResourceString("ArgumentOutOfRange_StreamLength"));
            }
            var newLength: number = this._origin + <number>value;
            var allocatedNewArray: boolean = this.EnsureCapacity(newLength);
            if (!allocatedNewArray && newLength > this._length)
                TSArrayBuffer.Clear(this._buffer, this._length, newLength - this._length);
            this._length = newLength;
            if (this._position > newLength)
                this._position = newLength;
        }
        public ToArray(): Int8Array {
           // BCLDebug.Perf(this._exposable, "MemoryStream::GetBuffer will let you avoid a copy.");
            var copy: Int8Array = new Int8Array(this._length - this._origin);
            //Buffer.InternalBlockCopy(this._buffer, this._origin, copy, 0, this._length - this._origin);
            TSArrayBuffer.Copy_1(this._buffer, this._origin, copy, 0, this._length - this._origin);
            return copy;
        }
        public Write(buffer: Int8Array, offset: number, count: number): void {
            if (buffer == null)
                throw new ArgumentNullException("buffer", Environment.GetResourceString("ArgumentNull_Buffer"));
            if (offset < 0)
                throw new ArgumentOutOfRangeException("offset", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (count < 0)
                throw new ArgumentOutOfRangeException("count", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (buffer.length - offset < count)
                throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
           // System.Contract.EndContractBlock();
            if (!this._isOpen)
                __Error.StreamIsClosed();
            this.EnsureWriteable();
            var i: number = this._position + count;
            if (i < 0)
                throw new IOException(Environment.GetResourceString("IO.IO_StreamTooLong"));
            if (i > this._length) {
                var mustZero: boolean = this._position > this._length;
                if (i > this._capacity) {
                    var allocatedNewArray: boolean = this.EnsureCapacity(i);
                    if (allocatedNewArray)
                        mustZero = false;
                }
                if (mustZero)
                    TSArrayBuffer.Clear(this._buffer, this._length, i - this._length);
                this._length = i;
            }
            if ((count <= 8) && (buffer != this._buffer)) {
                var byteCount: number = count;
                while (--byteCount >= 0)
                    this._buffer[this._position + byteCount] = buffer[offset + byteCount];
            }
            //else Buffer.InternalBlockCopy(buffer, offset, this._buffer, this._position, count);
            else TSArrayBuffer.Copy_1(buffer, offset, this._buffer, this._position, count);
            this._position = i;
        }
        public WriteByte(value: number): void {
            if (!this._isOpen)
                __Error.StreamIsClosed();
            this.EnsureWriteable();
            if (this._position >= this._length) {
                var newLength: number = this._position + 1;
                var mustZero: boolean = this._position > this._length;
                if (newLength >= this._capacity) {
                    var allocatedNewArray: boolean = this.EnsureCapacity(newLength);
                    if (allocatedNewArray)
                        mustZero = false;
                }
                if (mustZero)
                    TSArrayBuffer.Clear(this._buffer, this._length, this._position - this._length);
                this._length = newLength;
            }
            this._buffer[this._position++] = value;
        }
        public WriteTo(stream: Stream): void {
            if (stream == null)
                throw new ArgumentNullException("stream", Environment.GetResourceString("ArgumentNull_Stream"));
           // Contract.EndContractBlock();
            if (!this._isOpen)
                __Error.StreamIsClosed();
            stream.Write(this._buffer, this._origin, this._length - this._origin);
        }
        constructor(capacity: number);
        constructor(buffer: Int8Array);
        constructor(buffer: Int8Array, writable: boolean);
        constructor(buffer: Int8Array, index: number, count: number);
        constructor(buffer: Int8Array, index: number, count: number, writable: boolean);
        constructor(buffer: Int8Array, index: number, count: number, writable: boolean, publiclyVisible: boolean);
        constructor();
        constructor(buffer?: any, param1?: any, param2?: number, param3?: boolean, param4?: boolean) {
            if ((buffer instanceof Int8Array || buffer === null) && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 == 'boolean' && typeof param4 == 'boolean')
            {
                this.constructor_MemoryStream_overload5(buffer, param1, param2, param3, param4);
                return;
            }

            if ((buffer instanceof Int8Array || buffer === null) && typeof param1 == 'number' && typeof param2 == 'number' && typeof param3 == 'boolean' && typeof param4 == 'undefined')
            {
                this.constructor_MemoryStream_overload5(buffer, param1, param2, param3, false);
                this.constructor_MemoryStream_overload4(buffer, param1, param2, param3);
                return;
            }

            if ((buffer instanceof Int8Array || buffer === null) && typeof param1 === 'number' && typeof param2 == 'number' && typeof param3 == 'undefined' && typeof param4 == 'undefined')
            {
                this.constructor_MemoryStream_overload5(buffer, param1, param2, true, false);
                this.constructor_MemoryStream_overload3(buffer, param1, param2);
                return;
            }

            if ((buffer instanceof Int8Array || buffer === null) && typeof param1 === 'boolean' && typeof param2 === 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined')
            {
                this.constructor_MemoryStream_overload2(buffer, param1);
                return;
            }

            if (typeof buffer === 'number' && typeof param1 === 'undefined' && typeof param2 === 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined')
            {
                this.constructor_MemoryStream_overload0(buffer);
                return;
            }

            if ((buffer instanceof Int8Array || buffer === null) && typeof param1 === 'undefined' && typeof param2 === 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined')
            {
                this.constructor_MemoryStream_overload2(buffer, true);
                this.constructor_MemoryStream_overload1(buffer);
                return;
            }

            if (typeof buffer === 'undefined' && typeof param1 === 'undefined' && typeof param2 === 'undefined' && typeof param3 === 'undefined' && typeof param4 === 'undefined')
            {
                this.constructor_MemoryStream_overload0(0);
                this.constructor_MemoryStream_overload6();
                return;
            }
        }
        private constructor_MemoryStream_overload0(capacity: number): void {
            if (capacity < 0) {
                throw new ArgumentOutOfRangeException("capacity", Environment.GetResourceString("ArgumentOutOfRange_NegativeCapacity"));
            }
           // Contract.EndContractBlock();
            this._buffer = new Int8Array(capacity);
            this._capacity = capacity;
            this._expandable = true;
            this._writable = true;
            this._exposable = true;
            this._origin = 0;
            this._isOpen = true;
        }
        private constructor_MemoryStream_overload1(buffer: Int8Array): void {

        }
        private constructor_MemoryStream_overload2(buffer: Int8Array, writable: boolean): void {
            if (buffer == null)
                throw new ArgumentNullException("buffer", Environment.GetResourceString("ArgumentNull_Buffer"));
           // Contract.EndContractBlock();
            this._buffer = buffer;
            this._length = this._capacity = buffer.length;
            this._writable = writable;
            this._exposable = false;
            this._origin = 0;
            this._isOpen = true;
        }
        private constructor_MemoryStream_overload3(buffer: Int8Array, index: number, count: number): void {

        }
        private constructor_MemoryStream_overload4(buffer: Int8Array, index: number, count: number, writable: boolean): void {

        }
        private constructor_MemoryStream_overload5(buffer: Int8Array, index: number, count: number, writable: boolean, publiclyVisible: boolean): void {
            if (buffer == null)
                throw new ArgumentNullException("buffer", Environment.GetResourceString("ArgumentNull_Buffer"));
            if (index < 0)
                throw new ArgumentOutOfRangeException("index", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (count < 0)
                throw new ArgumentOutOfRangeException("count", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
            if (buffer.length - index < count)
                throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
            //Contract.EndContractBlock();
            this._buffer = buffer;
            this._origin = this._position = index;
            this._length = this._capacity = index + count;
            this._writable = writable;
            this._exposable = publiclyVisible;
            this._expandable = false;
            this._isOpen = true;
        }
        private constructor_MemoryStream_overload6(): void {

        }
    }
}
module System.IO {
    export class __Error {
        public static EndOfFile(): void {
            throw new EndOfStreamException(Environment.GetResourceString("IO.EOF_ReadBeyondEOF"));
        }
        public static FileNotOpen(): void {
            throw new ObjectDisposedException(null, Environment.GetResourceString("ObjectDisposed_FileClosed"));
        }
        public static StreamIsClosed(): void {
            throw new ObjectDisposedException(null, Environment.GetResourceString("ObjectDisposed_StreamClosed"));
        }
        public static MemoryStreamNotExpandable(): void {
            throw new NotSupportedException(Environment.GetResourceString("NotSupported_MemStreamNotExpandable"));
        }
        public static ReaderClosed(): void {
            throw new ObjectDisposedException(null, Environment.GetResourceString("ObjectDisposed_ReaderClosed"));
        }
        public static ReadNotSupported(): void {
            throw new NotSupportedException(Environment.GetResourceString("NotSupported_UnreadableStream"));
        }
        public static SeekNotSupported(): void {
            throw new NotSupportedException(Environment.GetResourceString("NotSupported_UnseekableStream"));
        }
        public static WrongAsyncResult(): void {
            throw new ArgumentException(Environment.GetResourceString("Arg_WrongAsyncResult"));
        }
        public static EndReadCalledTwice(): void {
            throw new ArgumentException(Environment.GetResourceString("InvalidOperation_EndReadCalledMultiple"));
        }
        public static EndWriteCalledTwice(): void {
            throw new ArgumentException(Environment.GetResourceString("InvalidOperation_EndWriteCalledMultiple"));
        }
        public static WriteNotSupported(): void {
            throw new NotSupportedException(Environment.GetResourceString("NotSupported_UnwritableStream"));
        }
        public static WriterClosed(): void {
            throw new ObjectDisposedException(null, Environment.GetResourceString("ObjectDisposed_WriterClosed"));
        }
    }
}
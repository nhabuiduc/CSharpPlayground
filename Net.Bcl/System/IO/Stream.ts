module System.IO {
    export interface Stream {
         CanRead: boolean;
         CanSeek: boolean;
         CanWrite: boolean;
         Position: number;
         Length: number;
         //CopyTo(destination: Stream): void;
         //CopyTo(destination: Stream, bufferSize: number): void;
         Dispose(): void;
         Flush(): void;
         Read(buffer: Int8Array, offset: number, count: number);
         ReadByte(): number;
         Seek(offset: number, origin: SeekOrigin): number;
         SetLength(length: number): void;
         Write(buffer: Int8Array, offset: number, count: number): void;
    }
}
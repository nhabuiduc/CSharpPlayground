///// <reference path="Stream.ts" />
//module System.IO {
//    export class ArrayBufferStreamWriter implements System.IO.Stream {

//        private position: number = 0;
//        private arrayBufferList: System.Collections.Generic.List<ArrayBuffer>;

//        constructor() {
//            this.arrayBufferList = new System.Collections.Generic.List<ArrayBuffer>();

//        }

//        public get CanRead(): boolean {
//            return false;
//        }

//        public get CanWrite(): boolean {
//            return true;
//        }

//        public get CanSeek(): boolean {
//            return false;
//        }

//        public get Position(): number {
//            return this.position;
//        }

//        public get Length(): number {
//            return this.position;
//        }

//        public CopyTo(destination: Stream, bufferSize?: number): void {
//            throw new NotSupportedException();
//        }

//        public Dispose(): void {
//        }

//        public Flush(): void {
//        }

//        public Read(buffer: Int8Array, offset: number, count: number) {
//            throw new NotSupportedException();
//        }

//        public ReadByte(): number {
//            throw new NotSupportedException();
//        }

//        public Seek(offset: number, origin: SeekOrigin): number {
//            throw new NotSupportedException();
//        }

//        public SetLength(length: number): void {
//            throw new NotSupportedException();
//        }

//        public Write(buffer: Int8Array, offset: number, count: number): void {
//        }
//    }
//}
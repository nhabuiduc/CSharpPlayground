/// <reference path="IOException.ts" />
module System.IO {
    export class EndOfStreamException extends IOException {
        constructor(public message: string, param?: string) {
            super(message, param);
        }
    }
}
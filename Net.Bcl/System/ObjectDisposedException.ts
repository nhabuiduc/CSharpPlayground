/// <reference path="InvalidOperationException.ts" />
module System {
    export class ObjectDisposedException extends InvalidOperationException {
        constructor(public message: string, param?: string) {
            super(message, param);
        }
    }
}
/// <reference path="../SystemException.ts" />
module System.IO {
    export class IOException extends SystemException {
        constructor(public message: string, param?: string) {
            super(message, param);
        }
    }
}
/// <reference path="SystemException.ts" />
module System {
    export class ArgumentOutOfRangeException extends SystemException {

        constructor(public message?: string, param?: string) {
            super(message, param);
        }

    }
}
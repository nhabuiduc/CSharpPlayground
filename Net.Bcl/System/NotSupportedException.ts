/// <reference path="SystemException.ts" />
module System {
    export class NotSupportedException extends SystemException {

        constructor(public message?: string, param?: string) {
            super(message, param);
        }

    }

    export class FunctionRequiredException extends SystemException {

        constructor(public message?: string, param?: string) {
            super(message, param);
        }

    }
}
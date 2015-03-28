/// <reference path="ArgumentException.ts" />
module System {

    export class ArgumentNullException extends ArgumentException {

        constructor(public message?: string, param?: string) {
            super(message, param);
        }

    }
}
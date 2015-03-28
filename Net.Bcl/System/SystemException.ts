/// <reference path="Exception.ts" />
module System {
    export class SystemException extends Exception {

        constructor(public message?: string,param?:string) {
            super(message);
        }

    }
}
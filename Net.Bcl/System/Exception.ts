module System {
    export declare class Error {
        public name: string;
        public message: string;
        public stack: string;
        constructor(message?: string);
    }

    export class Exception extends Error {

        constructor(public message: string) {
            super(message);
            this.name = 'Exception';
            if (typeof message == 'undefined') {
                message = 'Exception';
            }
            this.message = message;
            this.stack = (<any>new Error()).stack;
        }
        public ToString():string {
            return this.name + ': ' + this.message;
        }
    }
}
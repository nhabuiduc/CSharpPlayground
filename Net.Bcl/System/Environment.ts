module System {
    export class Environment {
        public static ProcessorCount = 4;
        public static NewLine: string = '\r\n';

        public static GetResourceString(str: string, object?: Object, obj2?: Object): string {
            return str;
        }

        public static get TickCount(): number {
            var d = new Date();            
            var n = d.getTime() - 1424000000000;
            return n;
        }
    }
}
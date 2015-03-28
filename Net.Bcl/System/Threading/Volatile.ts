module System.Threading {
    export class Volatile {
        public static Write(location: { refObj: any }, value: any) {
            location.refObj = value;
        }
    }
}
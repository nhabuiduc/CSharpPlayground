/// <reference path="Location.ts" />
module Microsoft.CodeAnalysis {
    export class NoLocation extends Location {
        public static Singleton: Location = new NoLocation();
        constructor() {
            super();
        }
        public get Kind(): LocationKind {
            return LocationKind.None;
        }
        public Equals(obj: Object): boolean {
            return this == obj;
        }
        public GetHashCode(): number {
            return 0x16487756;
        }
    }
}
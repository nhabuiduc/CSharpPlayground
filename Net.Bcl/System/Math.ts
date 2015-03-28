module System {
    export class Math {
        public static Max(val1: number, val2: number): number {
            return val1 > val2 ? val1 : val2;
        }

        public static Min(val1: number, val2: number): number {
            return val1 < val2 ? val1 : val2;
        }

        public static Abs(value: number): number {
            return value >= 0 ? value : - value;
        }
    }
}
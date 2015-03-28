module System.Diagnostics.Contracts {
    export class Contract {
        public static EndContractBlock(): void { }
        public static Requires(condition: boolean): void {
            if (!condition) {
                throw new Error("condition not met");
            }
        }

        public static Assert(condition: boolean, message:string): void {
            if (!condition) {
                throw new Error(message);
            }
        }
    }
}
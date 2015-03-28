module System.Diagnostics {
    export class Debug {        
        get AutoFlush(): boolean {
            return false;
        }
        set AutoFlush(value: boolean) {
        }
        get IndentLevel(): number {
            return 0;
        }
        set IndentLevel(value: number) {
        }
        get IndentSize(): number {
            return 0;
        }
        set IndentSize(value: number) {
        }
        public static Flush(): void {
        }
        public static Close(): void {
        }
        public static Indent(): void {
        }
        public static Unindent(): void {
        }
        public static Assert(condition: boolean, message: string): void;
        public static Assert(condition: boolean, message: string, detailMessage: string): void;
        public static Assert(condition: boolean, message: string, detailMessageFormat: string, ...args: Object[]): void;
        public static Assert(condition: boolean): void;
        public static Assert(condition: boolean, message?: string, detailMessage?: string, args?: Object[]): void {
            
            if (condition && message && !detailMessage && !args) { return this.Assert_overload0(condition, message); }
            if (condition && message && detailMessage && !args) { return this.Assert_overload1(condition, message, detailMessage); }
            if (condition && message && detailMessage && args) { return this.Assert_overload2(condition, message, detailMessage, args); }
            if (condition && !message && !detailMessage && !args) { return this.Assert_overload3(condition); }
        }
        private static Assert_overload0(condition: boolean, message: string): void {
        }
        private static Assert_overload1(condition: boolean, message: string, detailMessage: string): void {
        }
        private static Assert_overload2(condition: boolean, message: string, detailMessageFormat: string, ...args: Object[]): void {
        }
        private static Assert_overload3(condition: boolean): void {
        }
        public static Fail(message: string, detailMessage: string): void;
        public static Fail(message: string): void;
        public static Fail(message: string, detailMessage?: string): void {
            if (message && detailMessage) { return this.Fail_overload0(message, detailMessage); }
            if (message && !detailMessage) { return this.Fail_overload1(message); }
        }
        private static Fail_overload0(message: string, detailMessage: string): void {
        }
        private static Fail_overload1(message: string): void {
        }
        public static Print(format: string, ...args: Object[]): void;
        public static Print(message: string): void;
        public static Print(format: string, args?: Object[]): void {
            if (format && args) { return this.Print_overload0(format, args); }
            if (format && !args) { return this.Print_overload1(format); }
        }
        private static Print_overload0(format: string, ...args: Object[]): void {
        }
        private static Print_overload1(message: string): void {
        }
        public static Write(value: Object): void;
        public static Write(message: string, category: string): void;
        public static Write(value: Object, category: string): void;
        public static Write(message: string): void;
        public static Write(value: any, category?: string): void {
            if ((value && value instanceof Object) && !category) { return this.Write_overload0(value); }
            if ((value && typeof value === "string") && category) { return this.Write_overload1(value, category); }
            if ((value && value instanceof Object) && category) { return this.Write_overload2(value, category); }
            if ((value && typeof value === "string") && !category) { return this.Write_overload3(value); }
        }
        private static Write_overload0(value: Object): void {
        }
        private static Write_overload1(message: string, category: string): void {
        }
        private static Write_overload2(value: Object, category: string): void {
        }
        private static Write_overload3(message: string): void {
        }
        public static WriteLine(value: Object): void;
        public static WriteLine(message: string, category: string): void;
        public static WriteLine(value: Object, category: string): void;
        public static WriteLine(format: string, ...args: Object[]): void;
        public static WriteLine(message: string): void;
        public static WriteLine(value: any, category?: any): void {
            if ((value && value instanceof Object) && !category) { return this.WriteLine_overload0(value); }
            if ((value && typeof value === "string") && (category && typeof category === "string")) { return this.WriteLine_overload1(value, category); }
            if ((value && value instanceof Object) && (category && typeof category === "string")) { return this.WriteLine_overload2(value, category); }
            if ((value && typeof value === "string") && (category && category instanceof Array)) { return this.WriteLine_overload3(value, category); }
            if ((value && typeof value === "string") && !category) { return this.WriteLine_overload4(value); }
        }
        private static WriteLine_overload0(value: Object): void {
        }
        private static WriteLine_overload1(message: string, category: string): void {
        }
        private static WriteLine_overload2(value: Object, category: string): void {
        }
        private static WriteLine_overload3(format: string, ...args: Object[]): void {
        }
        private static WriteLine_overload4(message: string): void {
        }
        public static WriteIf(condition: boolean, value: Object): void;
        public static WriteIf(condition: boolean, message: string, category: string): void;
        public static WriteIf(condition: boolean, value: Object, category: string): void;
        public static WriteIf(condition: boolean, message: string): void;
        public static WriteIf(condition: boolean, value: any, category?: string): void {
            if (condition && (value && value instanceof Object) && !category) { return this.WriteIf_overload0(condition, value); }
            if (condition && (value && typeof value === "string") && category) { return this.WriteIf_overload1(condition, value, category); }
            if (condition && (value && value instanceof Object) && category) { return this.WriteIf_overload2(condition, value, category); }
            if (condition && (value && typeof value === "string") && !category) { return this.WriteIf_overload3(condition, value); }
        }
        private static WriteIf_overload0(condition: boolean, value: Object): void {
        }
        private static WriteIf_overload1(condition: boolean, message: string, category: string): void {
        }
        private static WriteIf_overload2(condition: boolean, value: Object, category: string): void {
        }
        private static WriteIf_overload3(condition: boolean, message: string): void {
        }
        public static WriteLineIf(condition: boolean, value: Object): void;
        public static WriteLineIf(condition: boolean, message: string, category: string): void;
        public static WriteLineIf(condition: boolean, value: Object, category: string): void;
        public static WriteLineIf(condition: boolean, message: string): void;
        public static WriteLineIf(condition: boolean, value: any, category?: string): void {
            if (condition && (value && value instanceof Object) && !category) { return this.WriteLineIf_overload0(condition, value); }
            if (condition && (value && typeof value === "string") && category) { return this.WriteLineIf_overload1(condition, value, category); }
            if (condition && (value && value instanceof Object) && category) { return this.WriteLineIf_overload2(condition, value, category); }
            if (condition && (value && typeof value === "string") && !category) { return this.WriteLineIf_overload3(condition, value); }
        }
        private static WriteLineIf_overload0(condition: boolean, value: Object): void {
        }
        private static WriteLineIf_overload1(condition: boolean, message: string, category: string): void {
        }
        private static WriteLineIf_overload2(condition: boolean, value: Object, category: string): void {
        }
        private static WriteLineIf_overload3(condition: boolean, message: string): void {
        }
    }
}
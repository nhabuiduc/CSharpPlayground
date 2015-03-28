///<reference path="TextWriter.ts"/>
module System.IO {
    export class StringWriter extends TextWriter {

        private builder: System.Text.StringBuilder;

        //constructor();
        //constructor(builder: System.Text.StringBuilder);
        constructor(builder?: System.Text.StringBuilder | System.IFormatProvider, formatProvider?: System.IFormatProvider) {
            super();
            if (builder === void 0) {
                builder = new Text.StringBuilder();
            }

            if (builder instanceof System.Text.StringBuilder) {
                this.builder = <System.Text.StringBuilder>builder;
            }
            
        }
        public WriteString(str: string, ...args: Object[]): void {
            if (args.length > 0) {
                str = System.String.Format(str, args);
            }
            this.builder.Append(str);
        }

        public WriteLine(str: string, ...args: Object[]): void {
            if (args.length > 0) {
                str = System.String.Format(str, args);
            }
            this.builder.Append(str);

            this.WriteChar('\r');
            this.WriteChar('\n');
        }

        public WriteChar(c: string): void {
            this.builder.Append(c);
        }

        public Flush(): void {
            
        }

        public ToString(): string {
            return this.builder.ToString();
        }
    }
}

module Microsoft.CodeAnalysis.Text {
    export class TextUtilities {
        public static GetLengthOfLineBreak(text: SourceText, index: number): number {
            var c = text.$get$(index);
            var bias: number = '\r'.charCodeAt(0) + 1;
            if ((c.charCodeAt(0) - bias) <= (127 - bias)) {
                return 0;
            }
            return TextUtilities.GetLengthOfLineBreakSlow(text, index, c);
        }
        private static GetLengthOfLineBreakSlow(text: SourceText, index: number, c: string): number {
            if (c == '\r') {
                var next = index + 1;
                return (next < text.Length) && '\n' == text.$get$(next) ? 2 : 1;
            }
            else if (TextUtilities.IsAnyLineBreakCharacter(c)) {
                return 1;
            }
            else {
                return 0;
            }
        }
        public static GetStartAndLengthOfLineBreakEndingAt(text: SourceText, index: number, startLinebreak: { refObj: number }, lengthLinebreak: { refObj: number }): void {
            var c: string = text.$get$(index);
            if (c == '\n') {
                if (index > 0 && text.$get$(index - 1) == '\r') {
                    startLinebreak.refObj = index - 1;
                    lengthLinebreak.refObj = 2;
                }
                else {
                    startLinebreak.refObj = index;
                    lengthLinebreak.refObj = 1;
                }
            }
            else if (TextUtilities.IsAnyLineBreakCharacter(c)) {
                startLinebreak.refObj = index;
                lengthLinebreak.refObj = 1;
            }
            else {
                startLinebreak.refObj = index + 1;
                lengthLinebreak.refObj = 0;
            }
        }
        public static IsAnyLineBreakCharacter(c: string): boolean {
            return c == '\n' || c == '\r' || c == '\u0085' || c == '\u2028' || c == '\u2029';
        }
    }
}
module Playground {
    export class CodeMirrorExtended {
        public static runCSharpMode(cm: CodeMirror.Editor, line: CodeMirror.LineHandle, st:any[]): void {
            var lineNo = line.lineNo();
            var startIndex = cm.getDoc().indexFromPos({ line: lineNo, ch: 0 });
            var result = CodeMirrorExtended.BuildEndPositionWithStyle(startIndex, line.text.length, cm, st);
        }

        private static BuildEndPositionWithStyle(start: number, length: number, cm: CodeMirror.Editor, st: any[]): void{
            var tokenSpans = cm.csharpSyntaxService.GetTokensFromSpan(start, length);
            var begin = start;
            _foreach(tokenSpans, ts => {
                var style = Playground.Mapping.getHighlight(ts.Kind);
                st.push(ts.Start + ts.Length - start, style);
            }); 
            if (st.length == 1 || st[st.length - 2] < length) {
                st.push(length, null);
            }
            else if (st[st.length - 2] > length) {
                st[st.length - 2] = length;
            }
        }                        
    }

    class EndPositionWithStyle {
        constructor(public end: number, public style: string) {
        }
    }
}



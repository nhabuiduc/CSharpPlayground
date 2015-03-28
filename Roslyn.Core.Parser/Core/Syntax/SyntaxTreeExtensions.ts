module Microsoft.CodeAnalysis {
    export class SyntaxTreeExtensions {
        public static VerifySource(tree: SyntaxTree, changes: System.Collections.Generic.IEnumerable<Text.TextChangeRange> = null): void {
            var root = tree.GetRoot();
            var text = tree.GetText();
            var fullSpan = new Text.TextSpan().ctor_1506(0, text.Length);
            var node: SyntaxNode = null;
            if (changes != null) {
                var change = Text.TextChangeRange.Collapse(changes).Span;
                if (change.op_Inequality(fullSpan)) {
                    node = System.Linq.Enumerable.LastOrDefault(root.DescendantNodes_1576(n => n.FullSpan.Contains_1915(change)));
                }
            }
            if (node == null) {
                node = root;
            }
            var span = node.FullSpan;
            var textSpanOpt = span.Intersection(fullSpan);
            var index: number = 0;
            if (textSpanOpt == null) {
                index = 0;
            }
            else {
                var fromText = text.ToString_4959(textSpanOpt);
                var fromNode = node.ToFullString();
                index = SyntaxTreeExtensions.FindFirstDifference(fromText, fromNode);
            }
            if (index >= 0) {
                index += span.Start;
                var message: string;
                if (index < text.Length) {
                    var position = text.Lines.GetLinePosition(index);
                    var line = text.Lines.$get$(position.Line);
                    var allText = text.ToString();
                    message = System.String.Format("Unexpected difference at offset {0}: Line {1}, Column {2} \"{3}\"", index, position.Line + 1, position.Character + 1, line.ToString());
                }
                else {
                    message = "Unexpected difference past end of the file";
                }
                System.Diagnostics.Debug.Assert(false, message);
            }
        }
        private static FindFirstDifference(s1: string, s2: string): number {
            var n1 = s1.length;
            var n2 = s2.length;
            var n = System.Math.Min(n1, n2);
            for (var i: number = 0; i < n; i++) {
                if (s1[i] != s2[i]) {
                    return i;
                }
            }
            return (n1 == n2) ? -1 : n + 1;
        }
    }
}
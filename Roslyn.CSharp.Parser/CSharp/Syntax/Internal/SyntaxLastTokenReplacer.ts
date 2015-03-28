module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxLastTokenReplacer extends CSharpSyntaxRewriter {
        private oldToken: SyntaxToken;
        private newToken: SyntaxToken;
        private count: number = 1;
        private found: boolean = false;
        ctor_5622(oldToken: SyntaxToken, newToken: SyntaxToken): SyntaxLastTokenReplacer {
            super.ctor_2068();
            this.oldToken = oldToken;
            this.newToken = newToken;
            return this;
        }
        public static Replace<TRoot extends CSharpSyntaxNode>(root: TRoot, newToken: SyntaxToken): TRoot {
            var oldToken = root.GetLastToken();
            var replacer = new SyntaxLastTokenReplacer().ctor_5622(oldToken, newToken);
            var newRoot = <TRoot>replacer.Visit(root);
            System.Diagnostics.Debug.Assert(replacer.found);
            return newRoot;
        }
        private static CountNonNullSlots(node: CSharpSyntaxNode): number {
            return node.ChildNodesAndTokens().Count;
        }
        public Visit(node: CSharpSyntaxNode): CSharpSyntaxNode {
            if (node != null && !this.found) {
                this.count--;
                if (this.count == 0) {
                    var token = __as__<SyntaxToken>(node, SyntaxToken);
                    if (token != null) {
                        System.Diagnostics.Debug.Assert(token == this.oldToken);
                        this.found = true;
                        return this.newToken;
                    }
                    this.count += SyntaxLastTokenReplacer.CountNonNullSlots(node);
                    return super.Visit(node);
                }
            }
            return node;
        }
        constructor() { super(); }
    }
}
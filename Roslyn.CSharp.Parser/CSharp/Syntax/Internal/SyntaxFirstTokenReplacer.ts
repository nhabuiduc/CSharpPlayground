///<reference path="SyntaxRewriter.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxFirstTokenReplacer extends CSharpSyntaxRewriter {
        private oldToken: SyntaxToken;
        private newToken: SyntaxToken;
        private diagnosticOffsetDelta: number = 0;
        private foundOldToken: boolean = false;
        ctor_3747(oldToken: SyntaxToken, newToken: SyntaxToken, diagnosticOffsetDelta: number): SyntaxFirstTokenReplacer {
            super.ctor_2068();
            this.oldToken = oldToken;
            this.newToken = newToken;
            this.diagnosticOffsetDelta = diagnosticOffsetDelta;
            this.foundOldToken = false;
            return this;
        }
        public static Replace<TRoot extends CSharpSyntaxNode>(root: TRoot, oldToken: SyntaxToken, newToken: SyntaxToken, diagnosticOffsetDelta: number): TRoot {
            var replacer = new SyntaxFirstTokenReplacer().ctor_3747(oldToken, newToken, diagnosticOffsetDelta);
            var newRoot = <TRoot>replacer.Visit(root);
            System.Diagnostics.Debug.Assert(replacer.foundOldToken);
            return newRoot;
        }
        public Visit(node: CSharpSyntaxNode): CSharpSyntaxNode {
            if (node != null) {
                if (!this.foundOldToken) {
                    var token = __as__<SyntaxToken>(node, SyntaxToken);
                    if (token != null) {
                        System.Diagnostics.Debug.Assert(token == this.oldToken);
                        this.foundOldToken = true;
                        return this.newToken;
                    }
                    return SyntaxFirstTokenReplacer.UpdateDiagnosticOffset(super.Visit(node), this.diagnosticOffsetDelta);
                }
            }
            return node;
        }
        private static UpdateDiagnosticOffset<TSyntax extends CSharpSyntaxNode>(node: TSyntax, diagnosticOffsetDelta: number): TSyntax {
            var oldDiagnostics: DiagnosticInfo[] = node.GetDiagnostics();
            if (oldDiagnostics == null || oldDiagnostics.length == 0) {
                return node;
            }
            var numDiagnostics = oldDiagnostics.length;
            var newDiagnostics: DiagnosticInfo[] = new Array(numDiagnostics);
            for (var i: number = 0; i < numDiagnostics; i++) {
                var oldDiagnostic: DiagnosticInfo = oldDiagnostics[i];
                var oldSyntaxDiagnostic: SyntaxDiagnosticInfo = __as__<SyntaxDiagnosticInfo>(oldDiagnostic, SyntaxDiagnosticInfo);
                newDiagnostics[i] = oldSyntaxDiagnostic == null ? oldDiagnostic : new SyntaxDiagnosticInfo().ctor_7359(oldSyntaxDiagnostic.Offset + diagnosticOffsetDelta, oldSyntaxDiagnostic.Width, <ErrorCode>oldSyntaxDiagnostic.Code, oldSyntaxDiagnostic.Arguments);
            }
            return CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(node,
                newDiagnostics);
        }
        constructor() { super(); }
    }
}
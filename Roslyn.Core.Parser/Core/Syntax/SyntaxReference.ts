module Microsoft.CodeAnalysis {
    export class SyntaxReference {
        public SyntaxTree: SyntaxTree;
        public Span: Microsoft.CodeAnalysis.Text.TextSpan;
        public GetSyntax(cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxNode{ throw new Error('not implemented'); }
//        public GetSyntaxAsync(cancellationToken: System.Threading.CancellationToken = default(CancellationToken)): System.Threading.Tasks.Task<SyntaxNode> 
//{
//            return System.Threading.Tasks.Task.FromResult(this.GetSyntax(cancellationToken));
//        }
        public GetLocation(): Location {
            return this.SyntaxTree.GetLocation(this.Span);
        }
    }
}
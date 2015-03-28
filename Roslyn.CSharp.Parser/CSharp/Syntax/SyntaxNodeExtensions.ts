module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxNodeExtensions {
        public static WithAnnotations<TNode extends CSharpSyntaxNode>(node: TNode, ...annotations: SyntaxAnnotation[]): TNode {
            return <TNode>node.Green.SetAnnotations(annotations).CreateRed_5702();
        }
        public static WithAnnotations_Arr<TNode extends CSharpSyntaxNode>(node: TNode, annotations: SyntaxAnnotation[]): TNode {
            return <TNode>node.Green.SetAnnotations(annotations).CreateRed_5702();
        }
        public static IsAnonymousFunction(syntax: CSharpSyntaxNode): boolean {
            System.Diagnostics.Debug.Assert(syntax != null);
            switch (syntax.Kind) {
                case SyntaxKind.ParenthesizedLambdaExpression:
                case SyntaxKind.SimpleLambdaExpression:
                case SyntaxKind.AnonymousMethodExpression:
                    return true;
                default:
                    return false;
            }
        }
        public static IsQuery(syntax: CSharpSyntaxNode): boolean {
            System.Diagnostics.Debug.Assert(syntax != null);
            switch (syntax.Kind) {
                case SyntaxKind.FromClause:
                case SyntaxKind.GroupClause:
                case SyntaxKind.JoinClause:
                case SyntaxKind.JoinIntoClause:
                case SyntaxKind.LetClause:
                case SyntaxKind.OrderByClause:
                case SyntaxKind.QueryContinuation:
                case SyntaxKind.QueryExpression:
                case SyntaxKind.SelectClause:
                case SyntaxKind.WhereClause:
                    return true;
                default:
                    return false;
            }
        }
        public static CanHaveAssociatedLocalBinder(syntax: CSharpSyntaxNode): boolean {
            return SyntaxNodeExtensions.IsAnonymousFunction(syntax) || syntax.Kind == SyntaxKind.CatchClause || syntax.Kind == SyntaxKind.CatchFilterClause || syntax instanceof Syntax.StatementSyntax;
        }
        public static ExtractAnonymousTypeMemberName(input: Syntax.ExpressionSyntax): SyntaxToken {
            while (true) {
                switch (input.Kind) {
                    case SyntaxKind.IdentifierName:
                        return (<Syntax.IdentifierNameSyntax>input).Identifier;
                    case SyntaxKind.SimpleMemberAccessExpression:
                        input = (<Syntax.MemberAccessExpressionSyntax>input).Name;
                        continue;
                    case SyntaxKind.ConditionalAccessExpression:
                        input = (<Syntax.ConditionalAccessExpressionSyntax>input).WhenNotNull;
                        if (input.Kind == SyntaxKind.MemberBindingExpression) {
                            return (<Syntax.MemberBindingExpressionSyntax>input).Name.Identifier;
                        }
                        continue;
                    default:
                        return structDefault(SyntaxToken);
                }
            }
        }
        public static GetReferenceOrNull(nodeOpt: CSharpSyntaxNode): SyntaxReference {
            return (nodeOpt != null) ? nodeOpt.GetReference() : null;
        }
    }
}
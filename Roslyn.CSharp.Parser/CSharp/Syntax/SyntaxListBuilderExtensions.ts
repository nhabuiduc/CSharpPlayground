module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SyntaxListBuilderExtensions {
        public static ToTokenList(builder: SyntaxListBaseBuilder): SyntaxTokenList {
            if (builder == null || builder.Count == 0) {
                return structDefault(SyntaxTokenList);
            }
            return new SyntaxTokenList().ctor_9846(null, builder.ToListNode(), 0, 0);
        }
        public static ToList(builder: SyntaxListBaseBuilder): SyntaxList<SyntaxNode> {
            if (builder == null || builder.Count == 0) {
                return <SyntaxList<SyntaxNode>> structDefault(SyntaxList);
            }
            return new SyntaxList<SyntaxNode>().ctor_6698(builder.ToListNode().CreateRed_5702());
        }
        public static ToSeparatedList<TNode extends SyntaxNode>(builder: SyntaxListBaseBuilder): SeparatedSyntaxList<TNode> {
            if (builder == null || builder.Count == 0) {
                return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
            }
            return new SeparatedSyntaxList<TNode>().ctor_1274(new SyntaxNodeOrTokenList().ctor_1240(builder.ToListNode().CreateRed_5702(), 0));
        }
    }
}
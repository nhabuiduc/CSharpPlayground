///<reference path="SyntaxList`1.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxListBuilderExtensions {
        public static ToTokenList(builder: SyntaxListBaseBuilder): SyntaxList<SyntaxToken> {
            if (builder == null) {
                return structDefault(SyntaxList);
            }
            return new SyntaxList<SyntaxToken>().ctor_1319(builder.ToListNode());
        }
        public static ToList_1673(builder: SyntaxListBaseBuilder): SyntaxList<CSharpSyntaxNode> {
            return SyntaxListBuilderExtensions.ToList_1810<CSharpSyntaxNode>(builder);
        }
        public static ToList_1810<TNode extends CSharpSyntaxNode>(builder: SyntaxListBaseBuilder): SyntaxList<TNode> {
            if (builder == null) {
                return SyntaxList.op_Implicit_8623<TNode>(structDefault(SyntaxList));
            }
            return new SyntaxList<TNode>().ctor_1319(builder.ToListNode());
        }
        public static ToSeparatedList<TNode extends CSharpSyntaxNode>(builder: SyntaxListBaseBuilder): SeparatedSyntaxList<TNode> {
            if (builder == null) {
                return structDefault(SeparatedSyntaxList);
            }
            return SyntaxListBuilderExtensions.ToList_1673(builder).AsSeparatedList<TNode>();
        }
    }
}
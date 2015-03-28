///<reference path="SyntaxListBuilderExtensions"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxListBuilder<TNode extends CSharpSyntaxNode> implements IStruct {
        private builder: SyntaxListBaseBuilder;
        ctor_7707(size: number): SyntaxListBuilder<TNode> {
            this.ctor_1247(new SyntaxListBaseBuilder().ctor_1860(size));
            return this;
        }
        ctor_1247(builder: SyntaxListBaseBuilder): SyntaxListBuilder<TNode> {
            this.builder = builder;
            return this;
        }
        public get IsNull(): boolean {
            return this.builder == null;
        }
        public get Count(): number {
            return this.builder.Count;
        }
        public $get$(index: number): TNode {
            return <TNode>this.builder.$get$(index);
        }
        public $set$(index: number, value: TNode): void {
            this.builder.$set$(index, value);
        }
        public Clear(): void {
            this.builder.Clear();
        }
        public Add(node: TNode): SyntaxListBuilder<TNode> {
            this.builder.Add(node);
            return this;
        }
        public AddRange_1628(items: TNode[], offset: number, length: number): void {
            this.builder.AddRange_1279(items, offset, length);
        }
        public AddRange_1067(nodes: SyntaxList<TNode>): void {
            this.builder.AddRange_2002(nodes);
        }
        public AddRange_1900(nodes: SyntaxList<TNode>, offset: number, length: number): void {
            this.builder.AddRange_4324(nodes, offset, length);
        }
        public Any(kind: SyntaxKind): boolean {
            return this.builder.Any(kind);
        }
        public ToList(): SyntaxList<TNode> {
            return SyntaxList.op_Implicit_8623<TNode>(SyntaxListBuilderExtensions.ToList_1673(this.builder));
        }
        public ToListNode(): CSharpSyntaxNode {
            return this.builder.ToListNode();
        }
        public static op_Implicit_1734<TNode extends CSharpSyntaxNode>(builder: SyntaxListBuilder<TNode>): SyntaxListBaseBuilder {
            return builder.builder;
        }
        public static op_Implicit_3485<TNode extends CSharpSyntaxNode>(builder: SyntaxListBuilder<TNode>): SyntaxList<TNode> {
            if (builder.builder != null) {
                return builder.ToList();
            }
            return structDefault(SyntaxList);
        }
        constructor() { }
    }
}
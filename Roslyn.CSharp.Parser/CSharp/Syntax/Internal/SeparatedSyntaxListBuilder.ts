module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SeparatedSyntaxListBuilder<TNode extends CSharpSyntaxNode> implements IStruct {
        private builder: SyntaxListBaseBuilder;
        ctor_8478(size: number): SeparatedSyntaxListBuilder<TNode> {
            this.ctor_1989(new SyntaxListBaseBuilder().ctor_1860(size));
            return this;
        }
        public static Create<TNode extends CSharpSyntaxNode>(): SeparatedSyntaxListBuilder<TNode> {
            return new SeparatedSyntaxListBuilder<TNode>().ctor_8478(8);
        }
        ctor_1989(builder: SyntaxListBaseBuilder): SeparatedSyntaxListBuilder<TNode> {
            this.builder = builder;
            return this;
        }
        public get IsNull(): boolean {
            return this.builder == null;
        }
        public get Count(): number {
            return this.builder.Count;
        }
        public $get$(index: number): CSharpSyntaxNode {
            return this.builder.$get$(index);
        }
        public $set$(index: number, value: CSharpSyntaxNode): void {
            this.builder.$set$(index, value);
        }
        public Clear(): void {
            this.builder.Clear();
        }
        public Add(node: TNode): SeparatedSyntaxListBuilder<TNode> {
            this.builder.Add(node);
            return this;
        }
        public AddSeparator(separatorToken: SyntaxToken): void {
            this.builder.Add(separatorToken);
        }
        public AddRange_1628(items: TNode[], offset: number, length: number): void {
            this.builder.AddRange_1279(items, offset, length);
        }
        public AddRange_1969(nodes: SeparatedSyntaxList<TNode>): void {
            this.builder.AddRange_4610(nodes.GetWithSeparators());
        }
        public Any(kind: SyntaxKind): boolean {
            return this.builder.Any(kind);
        }
        public ToList(): SeparatedSyntaxList<TNode> {
            return this.builder == null ? structDefault(SeparatedSyntaxList) : new SeparatedSyntaxList<TNode>().ctor_9176(new SyntaxList<CSharpSyntaxNode>().ctor_1319(this.builder.ToListNode()));
        }
        public get UnderlyingBuilder(): SyntaxListBaseBuilder {
            return this.builder;
        }
        public static op_Implicit_4181<TNode extends CSharpSyntaxNode>(builder: SeparatedSyntaxListBuilder<TNode>): SeparatedSyntaxList<TNode> {
            return builder.ToList();
        }
        constructor() { }
    }
}
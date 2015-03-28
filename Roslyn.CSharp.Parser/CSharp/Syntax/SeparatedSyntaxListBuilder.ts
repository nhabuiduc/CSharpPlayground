module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class SeparatedSyntaxListBuilder<TNode extends SyntaxNode> implements IStruct {
        private builder: SyntaxListBaseBuilder;
        private expectedSeparator: boolean = false;
        ctor_8478(size: number): SeparatedSyntaxListBuilder<TNode> {
            this.ctor_1989(new SyntaxListBaseBuilder().ctor_1860(size));
            return this;
        }
        public static Create<TNode extends SyntaxNode>(): SeparatedSyntaxListBuilder<TNode> {
            return new SeparatedSyntaxListBuilder<TNode>().ctor_8478(8);
        }
        ctor_1989(builder: SyntaxListBaseBuilder): SeparatedSyntaxListBuilder<TNode> {
            this.builder = builder;
            this.expectedSeparator = false;
            return this;
        }
        public get IsNull(): boolean {
            return this.builder == null;
        }
        public get Count(): number {
            return this.builder.Count;
        }
        public Clear(): void {
            this.builder.Clear();
        }
        private CheckExpectedElement(): void {
            if (this.expectedSeparator) {
                throw new System.InvalidOperationException(CSharpResources.SeparatorIsExpected);
            }
        }
        private CheckExpectedSeparator(): void {
            if (!this.expectedSeparator) {
                throw new System.InvalidOperationException(CSharpResources.ElementIsExpected);
            }
        }
        public Add(node: TNode): SeparatedSyntaxListBuilder<TNode> {
            this.CheckExpectedElement();
            this.expectedSeparator = true;
            this.builder.Add(node);
            return this;
        }
        public AddSeparator(separatorToken: SyntaxToken): SeparatedSyntaxListBuilder<TNode> {
            this.CheckExpectedSeparator();
            this.expectedSeparator = false;
            this.builder.AddInternal(separatorToken.Node);
            return this;
        }
        public AddRange_1880(nodes: SeparatedSyntaxList<TNode>): SeparatedSyntaxListBuilder<TNode> {
            this.CheckExpectedElement();
            var list: SyntaxNodeOrTokenList = nodes.GetWithSeparators();
            this.builder.AddRange_7508(list);
            this.expectedSeparator = ((this.builder.Count & 1) != 0);
            return this;
        }
        public AddRange_9097(nodes: SeparatedSyntaxList<TNode>, count: number): SeparatedSyntaxListBuilder<TNode> {
            this.CheckExpectedElement();
            var list: SyntaxNodeOrTokenList = nodes.GetWithSeparators();
            this.builder.AddRange_6190(list, this.Count, System.Math.Min(count << 1, list.Count));
            this.expectedSeparator = ((this.builder.Count & 1) != 0);
            return this;
        }
        public ToList_1421(): SeparatedSyntaxList<TNode> {
            if (this.builder == null) {
                return new SeparatedSyntaxList<TNode>();
            }
            return SyntaxListBuilderExtensions.ToSeparatedList<TNode>(this.builder);
        }
        public ToList_2056<TDerived extends TNode>(): SeparatedSyntaxList<TDerived> {
            if (this.builder == null) {
                return new SeparatedSyntaxList<TDerived>();
            }
            return SyntaxListBuilderExtensions.ToSeparatedList<TDerived>(this.builder);
        }
        public static op_Implicit_1343<TNode extends SyntaxNode>(builder: SeparatedSyntaxListBuilder<TNode>): SyntaxListBaseBuilder {
            return builder.builder;
        }
        public static op_Implicit_4181<TNode extends SyntaxNode>(builder: SeparatedSyntaxListBuilder<TNode>): SeparatedSyntaxList<TNode> {
            if (builder.builder != null) {
                return builder.ToList_1421();
            }
            return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
        }
        constructor() { }
    }
}
///<reference path="../Syntax/Internal/SeparatedSyntaxListBuilder.ts"/>
///<reference path="../Syntax/Internal/SyntaxListBuilder.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxListPool {
        private freeList: SyntaxListBaseBuilder[]
        = new Array<SyntaxListBaseBuilder> (10);
        private freeIndex: number = 0;
        private allocated: System.Collections.Generic.List<SyntaxListBaseBuilder> = new System.Collections.Generic.List<SyntaxListBaseBuilder>();
        ctor_8047(): SyntaxListPool {
            return this;
        }
        public AllocateBase(): SyntaxListBaseBuilder {
            var item: SyntaxListBaseBuilder;
            if (this.freeIndex > 0) {
                this.freeIndex--;
                item = this.freeList[this.freeIndex];
                this.freeList[this.freeIndex] = null;
            }
            else {
                item = new SyntaxListBaseBuilder().ctor_1860(10);
            }
            System.Diagnostics.Debug.Assert(!this.allocated.Contains(item));
            this.allocated.Add(item);
            return item;
        }
        public Allocate<TNode extends CSharpSyntaxNode>(): SyntaxListBuilder<TNode> {
            return new SyntaxListBuilder<TNode>().ctor_1247(this.AllocateBase());
        }
        public AllocateSeparated<TNode extends CSharpSyntaxNode>(): SeparatedSyntaxListBuilder<TNode> {
            return new SeparatedSyntaxListBuilder<TNode>().ctor_1989(this.AllocateBase());
        }
        public Free_2078<TNode extends CSharpSyntaxNode>(item: SeparatedSyntaxListBuilder<TNode>): void {
            this.Free_1631(item.UnderlyingBuilder);
        }
        public Free_1631(item: SyntaxListBaseBuilder): void {
            item.Clear();
            if (this.freeIndex >= this.freeList.length) {
                this.Grow();
            }
            System.Diagnostics.Debug.Assert(this.allocated.Contains(item));
            this.allocated.Remove(item);
            this.freeList[this.freeIndex] = item;
            this.freeIndex++;
        }
        private Grow(): void {
            // TODO: Array !!!
            var tmp = new Array<SyntaxListBaseBuilder> (this.freeList.length * 2);
            TSArray.Copy(this.freeList, tmp, this.freeList.length);
            this.freeList = tmp;
        }
        constructor() { }
    }
}
module Microsoft.CodeAnalysis {
    export class SyntaxNodeOrTokenList implements System.IEquatable<SyntaxNodeOrTokenList>, System.Collections.Generic.IReadOnlyCollection<SyntaxNodeOrToken>, IStruct {
        private node: SyntaxNode;
        public index: number = 0;
        ctor_1240(node: SyntaxNode, index: number): SyntaxNodeOrTokenList {
            //this.ctor_1471();
            System.Diagnostics.Debug.Assert(node != null || index == 0);
            if (node != null) {
                this.node = node;
                this.index = index;
            }
            return this;
        }
        public get Node(): SyntaxNode {
            return this.node;
        }
        public get Position(): number {
            return this.node == null ? 0 : this.node.Position;
        }
        public get Parent(): SyntaxNode {
            return this.node == null ? null : this.node.Parent;
        }
        public get Count(): number {
            return this.node == null ? 0 : this.node.Green.IsList ? this.node.SlotCount : 1;
        }
        public $get$(index: number): SyntaxNodeOrToken {
            if (this.node != null) {
                if (!this.node.IsList) {
                    if (index == 0) {
                        return SyntaxNodeOrToken.op_Implicit_1792(this.node);
                    }
                }
                else {
                    if (((index >>> 0)< <number>this.node.SlotCount)) {
                        var green = this.node.Green.GetSlot(index);
                        if (green.IsToken) {
                            return SyntaxNodeOrToken.op_Implicit_7398(new SyntaxToken().ctor_1108(this.Parent, green, this.node.GetChildPosition(index), this.index + index));
                        }
                        else {
                            return SyntaxNodeOrToken.op_Implicit_1792(this.node.GetNodeSlot(index));
                        }
                    }
                }
            }
            throw new System.ArgumentOutOfRangeException("index");
        }
        public get FullSpan(): Text.TextSpan {
            if (this.node == null) {
                return structDefault(Text.TextSpan);
            }
            else {
                return this.node.FullSpan;
            }
        }
        public get Span(): Text.TextSpan {
            if (this.node == null) {
                return structDefault(Text.TextSpan);
            }
            else {
                return this.node.Span;
            }
        }
        public ToString(): string {
            return this.node != null ? this.node.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.node != null ? this.node.ToFullString() : System.String.Empty;
        }
        public First(): SyntaxNodeOrToken {
            return this.$get$(0);
        }
        public FirstOrDefault(): SyntaxNodeOrToken {
            if (this.Any()) {
                return this.$get$(0);
            }
            else {
                return structDefault(SyntaxNodeOrToken);
            }
        }
        public Last(): SyntaxNodeOrToken {
            return this.$get$(this.Count - 1);
        }
        public LastOrDefault(): SyntaxNodeOrToken {
            if (this.Any()) {
                return this.$get$(this.Count - 1);
            }
            else {
                return structDefault(SyntaxNodeOrToken);
            }
        }
        public IndexOf(nodeOrToken: SyntaxNodeOrToken): number {
            var i = 0;
            // for each
            var childEnumerator = this.GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.op_Equality(nodeOrToken)) {
                        return i;
                    }
                    i++;
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return -1;
        }
        public Any(): boolean {
            return this.node != null;
        }
        public CopyTo(offset: number, array: GreenNode[], arrayOffset: number, count: number): void {
            for (var i: number = 0; i < count; i++) {
                array[arrayOffset + i] = this.$get$(i + offset).UnderlyingNode;
            }
        }
        public Add(nodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList {
            return this.Insert(this.Count, nodeOrToken);
        }
        public AddRange(nodesOrTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList {
            return this.InsertRange(this.Count, nodesOrTokens);
        }
        public Insert(index: number, nodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList {
            if (nodeOrToken.op_Equality(structDefault(SyntaxNodeOrToken))) {
                throw new System.ArgumentException("nodeOrToken");
            }
            return this.InsertRange(index, Roslyn.Utilities.SpecializedCollections.SingletonEnumerable(nodeOrToken));
        }
        public InsertRange(index: number, nodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            if (nodesAndTokens == null) {
                throw new System.ArgumentNullException("nodesAndTokens");
            }
            if (Roslyn.Utilities.EnumerableExtensions.IsEmpty_9700(nodesAndTokens)) {
                return this;
            }
            var nodes = System.Linq.Enumerable.ToList(this);
            nodes.InsertRange(index, nodesAndTokens);
            return SyntaxNodeOrTokenList.CreateList(nodes.$get$(0).UnderlyingNode, nodes);
        }
        private static CreateList(creator: GreenNode, items: System.Collections.Generic.List<SyntaxNodeOrToken>): SyntaxNodeOrTokenList {
            if (items.Count == 0) {
                return structDefault(SyntaxNodeOrTokenList);
            }
            var newGreen = creator.CreateList(System.Linq.Enumerable.Select(items,
                n => n.UnderlyingNode));
            if (newGreen.IsToken) {
                newGreen = creator.CreateList(new Array(newGreen),/*alwaysCreateListNode:*/true);
            }
            return new SyntaxNodeOrTokenList().ctor_1240(newGreen.CreateRed_5702(), 0);
        }
        public RemoveAt(index: number): SyntaxNodeOrTokenList {
            if (index < 0 || index >= this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            var node = this.$get$(index);
            var nodes = System.Linq.Enumerable.ToList(this);
            nodes.RemoveAt(index);
            return SyntaxNodeOrTokenList.CreateList(node.UnderlyingNode, nodes);
        }
        public Remove(nodeOrTokenInList: SyntaxNodeOrToken): SyntaxNodeOrTokenList {
            var index = this.IndexOf(nodeOrTokenInList);
            if (index >= 0 && index < this.Count) {
                return this.RemoveAt(index);
            }
            else {
                return this;
            }
        }
        public Replace(nodeOrTokenInList: SyntaxNodeOrToken, newNodeOrToken: SyntaxNodeOrToken): SyntaxNodeOrTokenList {
            if (newNodeOrToken.op_Equality(structDefault(SyntaxNodeOrToken))) {
                throw new System.ArgumentException("newNodeOrToken");
            }
            return this.ReplaceRange(nodeOrTokenInList, new Array(newNodeOrToken));
        }
        public ReplaceRange(nodeOrTokenInList: SyntaxNodeOrToken, newNodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList {
            var index = this.IndexOf(nodeOrTokenInList);
            if (index >= 0 && index < this.Count) {
                var nodes = System.Linq.Enumerable.ToList(this);
                nodes.RemoveAt(index);
                nodes.InsertRange(index, newNodesAndTokens);
                return SyntaxNodeOrTokenList.CreateList(nodeOrTokenInList.UnderlyingNode, nodes);
            }
            else {
                throw new System.ArgumentException("nodeOrTokenInList");
            }
        }
        private get Nodes(): SyntaxNodeOrToken[] {
            return System.Linq.Enumerable.ToArray(this);
        }
        //public GetEnumerator(): SyntaxNodeOrTokenList.Enumerator {
        //    return new SyntaxNodeOrTokenList.Enumerator().ctor_2058(this);
        //}
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxNodeOrToken> {
            return this.node == null
                ? Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>()
                : new SyntaxNodeOrTokenList.Enumerator().ctor_2058(this);
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    return this.node == null ? Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxNodeOrToken>() : this.GetEnumerator();
        //}
        public op_Equality(right: SyntaxNodeOrTokenList): boolean {
            var left = this;
            return left.Equals_1312(right);
        }

        public op_Inequality(right: SyntaxNodeOrTokenList): boolean {
            var left = this;
            return !left.Equals_1312(right);
        }

        public Equals_1312(other: SyntaxNodeOrTokenList): boolean {
            return this.node == other.node;
        }
        public Equals(obj: Object): boolean {
            return (obj instanceof SyntaxNodeOrTokenList) && this.Equals_1312(<SyntaxNodeOrTokenList>obj);
        }
        public GetHashCode(): number {
            return this.node != null ? this.node.GetHashCode() : 0;
        }
        constructor() { }
    }
    export module SyntaxNodeOrTokenList {
        export class Enumerator implements System.Collections.Generic.IEnumerator<SyntaxNodeOrToken>, IStruct {
            private list: SyntaxNodeOrTokenList = structDefault(SyntaxNodeOrTokenList);
            private index: number = 0;
            ctor_2058(list: SyntaxNodeOrTokenList): Enumerator {
               // this.ctor_1108();
                this.list = list;
                this.index = -1;
                return this;
            }
            public MoveNext(): boolean {
                if (this.index < this.list.Count) {
                    this.index++;
                }
                return this.index < this.list.Count;
            }
            public get Current(): SyntaxNodeOrToken {
                return this.list.$get$(this.index);
            }
            //get Current(): Object {
            //    return this.Current;
            //}
            Reset(): void {

            }
            Dispose(): void {

            }
            public Equals(obj: Object): boolean {
                throw new System.NotSupportedException();
            }
            public GetHashCode(): number {
                throw new System.NotSupportedException();
            }
            constructor() { }
        }
    }
}
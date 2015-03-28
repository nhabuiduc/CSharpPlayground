module Microsoft.CodeAnalysis {
    export class SyntaxTokenList implements System.IEquatable<SyntaxTokenList>, System.Collections.Generic.IReadOnlyList<SyntaxToken>, IStruct {
        public parent: SyntaxNode;
        public node: GreenNode;
        public position: number = 0;
        public index: number = 0;
        ctor_9846(parent: SyntaxNode, tokenOrList: GreenNode, position: number, index: number): SyntaxTokenList {
            System.Diagnostics.Debug.Assert(tokenOrList != null || (position == 0 && index == 0 && parent == null));
            System.Diagnostics.Debug.Assert(position >= 0);
            System.Diagnostics.Debug.Assert(tokenOrList == null || (tokenOrList.IsToken) || (tokenOrList.IsList));
            this.parent = parent;
            this.node = tokenOrList;
            this.position = position;
            this.index = index;
            return this;
        }
        ctor_9126(token: SyntaxToken): SyntaxTokenList {
            this.parent = token.Parent;
            this.node = token.Node;
            this.position = token.Position;
            this.index = 0;
            return this;
        }
        public get Node(): GreenNode {
            return this.node;
        }
        public get Position(): number {
            return this.position;
        }
        public get Count(): number {
            return this.node == null ? 0 : (this.node.IsList ? this.node.SlotCount : 1);
        }
        public $get$(index: number): SyntaxToken {
            if (this.node != null) {
                if (this.node.IsList) {
                    if (((index >>> 0) < <number>this.node.SlotCount)) {
                        return new SyntaxToken().ctor_1108(this.parent, this.node.GetSlot(index), this.position + this.node.GetSlotOffset(index), this.index + index);
                    }
                }
                else if (index == 0) {
                    return new SyntaxToken().ctor_1108(this.parent, this.node, this.position, this.index);
                }
            }
            throw new System.ArgumentOutOfRangeException("index");
        }
        public get FullSpan(): Text.TextSpan {
            if (this.node == null) {
                return structDefault(Text.TextSpan);
            }
            else {
                return new Text.TextSpan().ctor_1506(this.Position, this.node.FullWidth);
            }
        }
        public get Span(): Text.TextSpan {
            if (this.node == null) {
                return structDefault(Text.TextSpan);
            }
            else {
                return Text.TextSpan.FromBounds(this.position + this.node.GetLeadingTriviaWidth(), this.position + this.node.FullWidth - this.node.GetTrailingTriviaWidth());
            }
        }
        public ToString(): string {
            return this.node != null ? this.node.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.node != null ? this.node.ToFullString() : System.String.Empty;
        }
        public First(): SyntaxToken {
            if (this.Any()) {
                return this.$get$(0);
            }
            throw new System.InvalidOperationException();
        }
        public Last(): SyntaxToken {
            if (this.Any()) {
                return this.$get$(this.Count - 1);
            }
            throw new System.InvalidOperationException();
        }
        public Any(): boolean {
            return this.node != null;
        }
        public Reverse(): SyntaxTokenList.Reversed {
            return new SyntaxTokenList.Reversed().ctor_1073(this);
        }
        public CopyTo(offset: number, array: GreenNode[], arrayOffset: number, count: number): void {
            System.Diagnostics.Debug.Assert(this.Count >= offset + count);
            for (var i: number = 0; i < count; i++) {
                array[arrayOffset + i] = this.GetGreenNodeAt_3176(offset + i);
            }
        }
        private GetGreenNodeAt_3176(i: number): GreenNode {
            return SyntaxTokenList.GetGreenNodeAt_1419(this.node, i);
        }
        public static GetGreenNodeAt_1419(node: GreenNode, i: number): GreenNode {
            System.Diagnostics.Debug.Assert(node.IsList || (i == 0 && !node.IsList));
            return node.IsList ? node.GetSlot(i) : node;
        }
        public IndexOf_1948(tokenInList: SyntaxToken): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                var token = this.$get$(i);
                if (token.op_Equality(tokenInList)) {
                    return i;
                }
            }
            return -1;
        }
        public IndexOf_9119(rawKind: number): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                if (this.$get$(i).RawKind == rawKind) {
                    return i;
                }
            }
            return -1;
        }
        public Add(token: SyntaxToken): SyntaxTokenList {
            return this.Insert(this.Count, token);
        }
        public AddRange(tokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList {
            return this.InsertRange(this.Count, tokens);
        }
        public Insert(index: number, token: SyntaxToken): SyntaxTokenList {
            if (token.op_Equality(structDefault(SyntaxToken))) {
                throw new System.ArgumentException("token");
            }
            return this.InsertRange(index, new Array(token));
        }
        public InsertRange(index: number, tokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            if (tokens == null) {
                throw new System.ArgumentNullException("tokens");
            }
            var items = System.Linq.Enumerable.ToList(tokens);
            if (items.Count == 0) {
                return this;
            }
            var list = System.Linq.Enumerable.ToList(this);
            list.InsertRange(index, tokens);
            if (list.Count == 0) {
                return this;
            }
            else {
                return new SyntaxTokenList().ctor_9846(null, list.$get$(0).Node.CreateList(System.Linq.Enumerable.Select(list,
                    n => n.Node)), 0, 0);
            }
        }
        public RemoveAt(index: number): SyntaxTokenList {
            if (index < 0 || index >= this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            var list = System.Linq.Enumerable.ToList(this);
            list.RemoveAt(index);
            return new SyntaxTokenList().ctor_9846(null, this.node.CreateList(System.Linq.Enumerable.Select(list,
                n => n.Node)), 0, 0);
        }
        public Remove(tokenInList: SyntaxToken): SyntaxTokenList {
            var index = this.IndexOf_1948(tokenInList);
            if (index >= 0 && index <= this.Count) {
                return this.RemoveAt(index);
            }
            else {
                return this;
            }
        }
        public Replace(tokenInList: SyntaxToken, newToken: SyntaxToken): SyntaxTokenList {
            if (newToken.op_Equality(structDefault(SyntaxToken))) {
                throw new System.ArgumentException("newToken");
            }
            return this.ReplaceRange(tokenInList, new Array(newToken));
        }
        public ReplaceRange(tokenInList: SyntaxToken, newTokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList {
            var index = this.IndexOf_1948(tokenInList);
            if (index >= 0 && index <= this.Count) {
                var list = System.Linq.Enumerable.ToList(this);
                list.RemoveAt(index);
                list.InsertRange(index, newTokens);
                return new SyntaxTokenList().ctor_9846(null, this.node.CreateList(System.Linq.Enumerable.Select(list,
                    n => n.Node)), 0, 0);
            }
            else {
                throw new System.ArgumentException("tokenInList");
            }
        }
        private get Nodes(): SyntaxToken[] {
            return System.Linq.Enumerable.ToArray(this);
        }
        //public GetEnumerator(): SyntaxTokenList.Enumerator {
        //    return new SyntaxTokenList.Enumerator().ctor_1786(this);
        //}
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxToken> {
            if (this.node == null) {
                return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxToken>();
            }
            return new SyntaxTokenList.EnumeratorImpl().ctor_1809(this);
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    if (this.node == null) {
        //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxToken>();
        //    }
        //    return new SyntaxTokenList.EnumeratorImpl().ctor_1809(this);
        //}
        public op_Equality(right: SyntaxTokenList): boolean {
            var left = this;
            return left.Equals_9666(right);
        }

        public op_Inequality(right: SyntaxTokenList): boolean {
            var left = this;
            return !left.Equals_9666(right);
        }

        public Equals_9666(other: SyntaxTokenList): boolean {
            return this.node == other.node && this.parent == other.parent && this.index == other.index;
        }
        public Equals(obj: Object): boolean {
            return (obj instanceof SyntaxTokenList) && this.Equals_9666(<SyntaxTokenList>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.node, this.index);
        }
        public static Create(token: SyntaxToken): SyntaxTokenList {
            return new SyntaxTokenList().ctor_9126(token);
        }
        constructor() { }
    }


    export module SyntaxTokenList {
        export class Enumerator implements IStruct {
            private parent: SyntaxNode;
            private singleNodeOrList: GreenNode;
            private baseIndex: number = 0;
            private count: number = 0;
            private index: number = 0;
            private current: GreenNode;
            private position: number = 0;
            ctor_1786(list:  SyntaxTokenList ): Enumerator {
                this.parent = list.parent;
                this.singleNodeOrList = list.node;
                this.baseIndex = list.index;
                this.count = list.Count;
                this.index = -1;
                this.current = null;
                this.position = list.position;
                return this;
            }
            public MoveNext(): boolean {
                if (this.count == 0 || this.count <= this.index + 1) {
                    this.current = null;
                    return false;
                }
                this.index++;
                if (this.current != null) {
                    this.position += this.current.FullWidth;
                }
                this.current = SyntaxTokenList.GetGreenNodeAt_1419(this.singleNodeOrList, this.index);
                System.Diagnostics.Debug.Assert(this.current != null);
                return true;
            }
            public get Current(): SyntaxToken {
                if (this.current == null) {
                    throw new System.InvalidOperationException();
                }
                return new SyntaxToken().ctor_1108(this.parent, this.current, this.position, this.baseIndex + this.index);
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
    export module SyntaxTokenList {
        export class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxToken>
        {
            private enumerator: Enumerator = structDefault(Enumerator);
            ctor_1809(list:SyntaxTokenList ): EnumeratorImpl {
                this.enumerator = new Enumerator().ctor_1786(list);
                return this;
            }
            public get Current(): SyntaxToken {
                return this.enumerator.Current;
            }
            //get Current(): Object {
            //    return this.enumerator.Current;
            //}
            public MoveNext(): boolean {
                return this.enumerator.MoveNext();
            }
            public Reset(): void {
                throw new System.NotSupportedException();
            }
            public Dispose(): void {

            }
            constructor() { }
        }
    }

    export module SyntaxTokenList {
        export class Reversed implements System.Collections.Generic.IEnumerable<SyntaxToken>, System.IEquatable<Reversed>, IStruct {
            private list: SyntaxTokenList = structDefault(SyntaxTokenList);
            ctor_1073(list: SyntaxTokenList): Reversed {
                this.list = list;
                return this;
            }
            //public GetEnumerator(): Reversed.Enumerator {
            //    return new Reversed.Enumerator().ctor_1786(this.list);
            //}
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxToken> {
                if (this.list.Count == 0) {
                    return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxToken>();
                }
                return new Reversed.EnumeratorImpl().ctor_1809(this.list);
            }
            //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
            //    if (this.list.Count == 0) {
            //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxToken>();
            //    }
            //    return new Reversed.EnumeratorImpl().ctor_1809(this.list);
            //}
            public Equals(obj: Object): boolean {
                return obj instanceof Reversed && this.Equals_1958(<Reversed>obj);
            }
            public Equals_1958(other: Reversed): boolean {
                return this.list.Equals_9666(other.list);
            }
            public GetHashCode(): number {
                return this.list.GetHashCode();
            }
            constructor() { }
        }
        export module Reversed {
            export class Enumerator implements IStruct {
                private parent: SyntaxNode;
                private singleNodeOrList: GreenNode;
                private baseIndex: number = 0;
                private count: number = 0;
                private index: number = 0;
                private current: GreenNode;
                private position: number = 0;
                ctor_1786(list: SyntaxTokenList ): Enumerator {
                    //this.ctor_1108();
                    if (list.Any()) {
                        this.parent = list.parent;
                        this.singleNodeOrList = list.node;
                        this.baseIndex = list.index;
                        this.count = list.Count;
                        this.index = this.count;
                        this.current = null;
                        var last = list.Last();
                        this.position = last.Position + last.FullWidth;
                    }
                    return this;
                }
                public MoveNext(): boolean {
                    if (this.count == 0 || this.index <= 0) {
                        this.current = null;
                        return false;
                    }
                    this.index--;
                    this.current = SyntaxTokenList.GetGreenNodeAt_1419(this.singleNodeOrList, this.index);
                    this.position -= this.current.FullWidth;
                    return true;
                }
                public get Current(): SyntaxToken {
                    if (this.current == null) {
                        throw new System.InvalidOperationException();
                    }
                    return new SyntaxToken().ctor_1108(this.parent, this.current, this.position, this.baseIndex + this.index);
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
        export module Reversed {
            export class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxToken>
            {
                private enumerator: Enumerator = structDefault(Enumerator);
                ctor_1809(list:  SyntaxTokenList ): EnumeratorImpl {
                    this.enumerator = new Enumerator().ctor_1786(list);
                    return this;
                }
                public get Current(): SyntaxToken {
                    return this.enumerator.Current;
                }
                //get Current(): Object {
                //    return this.enumerator.Current;
                //}
                public MoveNext(): boolean {
                    return this.enumerator.MoveNext();
                }
                public Reset(): void {
                    throw new System.NotSupportedException();
                }
                public Dispose(): void {

                }
                constructor() { }
            }
        }
    }
}
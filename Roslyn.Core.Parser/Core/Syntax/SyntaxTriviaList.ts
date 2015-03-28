module Microsoft.CodeAnalysis {
    export class SyntaxTriviaList implements System.IEquatable<SyntaxTriviaList>, System.Collections.Generic.IReadOnlyList<SyntaxTrivia>, IStruct {
        public token: SyntaxToken = structDefault(SyntaxToken);
        public node: GreenNode;
        public position: number = 0;
        public index: number = 0;
        public static Empty: SyntaxTriviaList = structDefault(SyntaxTriviaList);
        ctor_5254(token: SyntaxToken, node: GreenNode, position: number, index: number = 0): SyntaxTriviaList {
            this.token = token;
            this.node = node;
            this.position = position;
            this.index = index;
            return this;
        }
        ctor_1248(token: SyntaxToken, node: GreenNode): SyntaxTriviaList {
            this.token = token;
            this.node = node;
            this.position = token.Position;
            this.index = 0;
            return this;
        }
        ctor_2284(trivia: SyntaxTrivia): SyntaxTriviaList {
            this.token = structDefault(SyntaxToken);
            this.node = trivia.UnderlyingNode;
            this.position = 0;
            this.index = 0;
            return this;
        }
        public get Token(): SyntaxToken {
            return this.token;
        }
        public get Node(): GreenNode {
            return this.node;
        }
        public get Position(): number {
            return this.position;
        }
        public get Index(): number {
            return this.index;
        }
        public get Count(): number {
            return this.node == null ? 0 : (this.node.IsList ? this.node.SlotCount : 1);
        }
        public ElementAt(index: number): SyntaxTrivia {
            return this.$get$(index);
        }
        public $get$(index: number): SyntaxTrivia {
            if (this.node != null) {
                if (this.node.IsList) {
                    if (((index >>>0)< <number>this.node.SlotCount)) {
                        return new SyntaxTrivia().ctor_1046(this.token, this.node.GetSlot(index), this.position + this.node.GetSlotOffset(index), this.index + index);
                    }
                }
                else if (index == 0) {
                    return new SyntaxTrivia().ctor_1046(this.token, this.node, this.position, this.index);
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
        public First(): SyntaxTrivia {
            if (this.Any()) {
                return this.$get$(0);
            }
            throw new System.InvalidOperationException();
        }
        public Last(): SyntaxTrivia {
            if (this.Any()) {
                return this.$get$(this.Count - 1);
            }
            throw new System.InvalidOperationException();
        }
        public Any(): boolean {
            return this.node != null;
        }
        public Reverse(): SyntaxTriviaList.Reversed {
            return new SyntaxTriviaList.Reversed().ctor_2098(this);
        }
        //public GetEnumerator(): SyntaxTriviaList.Enumerator {
        //    return new SyntaxTriviaList.Enumerator().ctor_9491(this);
        //}
        public IndexOf_1053(triviaInList: SyntaxTrivia): number {
            for (var i: number = 0, n = this.Count; i < n; i++) {
                var trivia = this.$get$(i);
                if (trivia.op_Equality(triviaInList)) {
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
        public Add(trivia: SyntaxTrivia): SyntaxTriviaList {
            return this.Insert(this.Count, trivia);
        }
        public AddRange(trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList {
            return this.InsertRange(this.Count, trivia);
        }
        public Insert(index: number, trivia: SyntaxTrivia): SyntaxTriviaList {
            if (trivia.op_Equality(structDefault(SyntaxTrivia))) {
                throw new System.ArgumentException("trivia");
            }
            return this.InsertRange(index, new Array(trivia));
        }
        public InsertRange(index: number, trivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList {
            if (index < 0 || index > this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            var items = System.Linq.Enumerable.ToList(trivia);
            if (items.Count == 0) {
                return this;
            }
            var list = System.Linq.Enumerable.ToList(this);
            list.InsertRange(index, items);
            if (list.Count == 0) {
                return this;
            }
            else {
                return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), list.$get$(0).UnderlyingNode.CreateList(System.Linq.Enumerable.Select(list,
                    n => n.UnderlyingNode)), 0, 0);
            }
        }
        public RemoveAt(index: number): SyntaxTriviaList {
            if (index < 0 || index >= this.Count) {
                throw new System.ArgumentOutOfRangeException("index");
            }
            var list = System.Linq.Enumerable.ToList(this);
            list.RemoveAt(index);
            return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), this.node.CreateList(System.Linq.Enumerable.Select(list,
                n => n.UnderlyingNode)), 0, 0);
        }
        public Remove(triviaInList: SyntaxTrivia): SyntaxTriviaList {
            var index = this.IndexOf_1053(triviaInList);
            if (index >= 0 && index < this.Count) {
                return this.RemoveAt(index);
            }
            else {
                return this;
            }
        }
        public Replace(triviaInList: SyntaxTrivia, newTrivia: SyntaxTrivia): SyntaxTriviaList {
            if (newTrivia.op_Equality(structDefault(SyntaxTrivia))) {
                throw new System.ArgumentException("newTrivia");
            }
            return this.ReplaceRange(triviaInList, new Array(newTrivia));
        }
        public ReplaceRange(triviaInList: SyntaxTrivia, newTrivia: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList {
            var index = this.IndexOf_1053(triviaInList);
            if (index >= 0 && index < this.Count) {
                var list = System.Linq.Enumerable.ToList(this);
                list.RemoveAt(index);
                list.InsertRange(index, newTrivia);
                return new SyntaxTriviaList().ctor_5254(structDefault(SyntaxToken), this.node.CreateList(System.Linq.Enumerable.Select(list,
                    n => n.UnderlyingNode)), 0, 0);
            }
            else {
                throw new System.ArgumentException("triviaInList");
            }
        }
        private get Nodes(): SyntaxTrivia[] {
            return System.Linq.Enumerable.ToArray(this);
        }
        GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxTrivia> {
            if (this.node == null) {
                return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxTrivia>();
            }
            return new SyntaxTriviaList.EnumeratorImpl().ctor_1471(this);
        }
        //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
        //    if (this.node == null) {
        //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxTrivia>();
        //    }
        //    return new SyntaxTriviaList.EnumeratorImpl().ctor_1471(this);
        //}
        private GetGreenNodeAt_3176(i: number): GreenNode {
            return SyntaxTriviaList.GetGreenNodeAt_1419(this.node, i);
        }
        public static GetGreenNodeAt_1419(node: GreenNode, i: number): GreenNode {
            System.Diagnostics.Debug.Assert(node.IsList || (i == 0 && !node.IsList));
            return node.IsList ? node.GetSlot(i) : node;
        }
        public Equals_1854(other: SyntaxTriviaList): boolean {
            return this.node == other.node && this.index == other.index && this.token.Equals_1664(other.token);
        }
        public op_Equality(right: SyntaxTriviaList): boolean {
            var left = this;
            return left.Equals_1854(right);
        }

        public op_Inequality(right: SyntaxTriviaList): boolean {
            var left = this;
            return !left.Equals_1854(right);
        }

        public Equals(obj: Object): boolean {
            return (obj instanceof SyntaxTriviaList) && this.Equals_1854(<SyntaxTriviaList>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.token.GetHashCode(), Roslyn.Utilities.Hash.Combine_7656(this.node, this.index));
        }
        public CopyTo(offset: number, array: SyntaxTrivia[], arrayOffset: number, count: number): void {
            if (offset < 0 || count < 0 || this.Count < offset + count) {
                throw new System.IndexOutOfRangeException();
            }
            if (count == 0) {
                return
            }
            var first = this.$get$(offset);
            array[arrayOffset] = first;
            var position = first.Position;
            var current = first;
            for (var i: number = 1; i < count; i++) {
                position += current.FullWidth;
                current = new SyntaxTrivia().ctor_1046(this.token, this.GetGreenNodeAt_3176(offset + i), position, this.index + i);
                array[arrayOffset + i] = current;
            }
        }
        public ToString(): string {
            return this.node != null ? this.node.ToString() : System.String.Empty;
        }
        public ToFullString(): string {
            return this.node != null ? this.node.ToFullString() : System.String.Empty;
        }
        public static Create(trivia: SyntaxTrivia): SyntaxTriviaList {
            return new SyntaxTriviaList().ctor_2284(trivia);
        }
        constructor() { }
    }

    export module SyntaxTriviaList {
        export class Reversed implements System.Collections.Generic.IEnumerable<SyntaxTrivia>, System.IEquatable<Reversed>, IStruct {
            private list: SyntaxTriviaList = structDefault(SyntaxTriviaList);
            ctor_2098(list: SyntaxTriviaList): Reversed {
                this.list = list;
                return this;
            }
            //public GetEnumerator(): Reversed.Enumerator {
            //    return new Reversed.Enumerator().ctor_9491(this.list);
            //}
            GetEnumerator(): System.Collections.Generic.IEnumerator<SyntaxTrivia> {
                if (this.list.Count == 0) {
                    return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxTrivia>();
                }
                return new Reversed.ReversedEnumeratorImpl().ctor_1247(this.list);
            }
            //System.Collections.IEnumerable.GetEnumerator(): System.Collections.IEnumerator {
            //    if (this.list.Count == 0) {
            //        return Roslyn.Utilities.SpecializedCollections.EmptyEnumerator<SyntaxTrivia>();
            //    }
            //    return new Reversed.ReversedEnumeratorImpl().ctor_1247(this.list);
            //}
            public GetHashCode(): number {
                return this.list.GetHashCode();
            }
            public Equals(obj: Object): boolean {
                return (obj instanceof Reversed) && this.Equals_1958(<Reversed>obj);
            }
            public Equals_1958(other: Reversed): boolean {
                return this.list.Equals_1854(other.list);
            }
            constructor() { }
        }
        export module Reversed {
            export class Enumerator implements IStruct {
                private token: SyntaxToken = structDefault(SyntaxToken);
                private singleNodeOrList: GreenNode;
                private baseIndex: number = 0;
                private count: number = 0;
                private index: number = 0;
                private current: GreenNode;
                private position: number = 0;
                ctor_9491(list: SyntaxTriviaList ): Enumerator {
                   // this.ctor_1108();
                    if (list.Any()) {
                        this.token = list.token;
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
                    this.current = SyntaxTriviaList.GetGreenNodeAt_1419(this.singleNodeOrList, this.index);
                    this.position -= this.current.FullWidth;
                    return true;
                }
                public get Current(): SyntaxTrivia {
                    if (this.current == null) {
                        throw new System.InvalidOperationException();
                    }
                    return new SyntaxTrivia().ctor_1046(this.token, this.current, this.position, this.baseIndex + this.index);
                }
                constructor() { }
            }
        }
        export module Reversed {
            export class ReversedEnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxTrivia>
            {
                private enumerator: Enumerator = structDefault(Enumerator);
                ctor_1247(list: SyntaxTriviaList ): ReversedEnumeratorImpl {
                    this.enumerator = new Enumerator().ctor_9491(list);
                    return this;
                }
                public get Current(): SyntaxTrivia {
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

    export module SyntaxTriviaList {
        export class Enumerator implements IStruct {
            private token: SyntaxToken = structDefault(SyntaxToken);
            private singleNodeOrList: GreenNode;
            private baseIndex: number = 0;
            private count: number = 0;
            private index: number = 0;
            private current: GreenNode;
            private position: number = 0;
            ctor_9491(list: SyntaxTriviaList ): Enumerator {
                this.token = list.token;
                this.singleNodeOrList = list.node;
                this.baseIndex = list.index;
                this.count = list.Count;
                this.index = -1;
                this.current = null;
                this.position = list.position;
                return this;
            }
            private InitializeFrom(token: { refObj: SyntaxToken }, greenNode: GreenNode, index: number, position: number): void {
                this.token = token.refObj;
                this.singleNodeOrList = greenNode;
                this.baseIndex = index;
                this.count = greenNode.IsList ? greenNode.SlotCount : 1;
                this.index = -1;
                this.current = null;
                this.position = position;
            }
            public InitializeFromLeadingTrivia(token: { refObj: SyntaxToken }): void {
                this.InitializeFrom(token, token.refObj.Node.GetLeadingTriviaCore(), 0, token.refObj.Position);
            }
            public InitializeFromTrailingTrivia(token: { refObj: SyntaxToken }): void {
                var leading = token.refObj.Node.GetLeadingTriviaCore();
                var index: number = 0;
                if (leading != null) {
                    index = leading.IsList ? leading.SlotCount : 1;
                }
                var trailingGreen = token.refObj.Node.GetTrailingTriviaCore();
                var trailingPosition: number = token.refObj.Position + token.refObj.FullWidth;
                if (trailingGreen != null) {
                    trailingPosition -= trailingGreen.FullWidth;
                }
                this.InitializeFrom(token, trailingGreen, index, trailingPosition);
            }
            public MoveNext(): boolean {
                var newIndex: number = this.index + 1;
                if (newIndex >= this.count) {
                    this.current = null;
                    return false;
                }
                this.index = newIndex;
                if (this.current != null) {
                    this.position += this.current.FullWidth;
                }
                this.current = SyntaxTriviaList.GetGreenNodeAt_1419(this.singleNodeOrList, newIndex);
                return true;
            }
            public get Current(): SyntaxTrivia {
                if (this.current == null) {
                    throw new System.InvalidOperationException();
                }
                return new SyntaxTrivia().ctor_1046(this.token, this.current, this.position, this.baseIndex + this.index);
            }
            public TryMoveNextAndGetCurrent(current: { refObj: SyntaxTrivia }): boolean {
                if (!this.MoveNext()) {
                    return false;
                }
                current.refObj = new SyntaxTrivia().ctor_1046(this.token, this.current, this.position, this.baseIndex + this.index);
                return true;
            }
            constructor() { }
        }
    }
    export module SyntaxTriviaList {
        export class EnumeratorImpl implements System.Collections.Generic.IEnumerator<SyntaxTrivia>
        {
            private enumerator: Enumerator = structDefault(Enumerator);
            ctor_1471(list: SyntaxTriviaList ): EnumeratorImpl {
                this.enumerator = new Enumerator().ctor_9491(list);
                return this;
            }
            public get Current(): SyntaxTrivia {
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
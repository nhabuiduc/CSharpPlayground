module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxTreeDiagnosticEnumerator implements IStruct {
        private syntaxTree: SyntaxTree;
        private stack: SyntaxTreeDiagnosticEnumerator.NodeIterationStack = structDefault(SyntaxTreeDiagnosticEnumerator.NodeIterationStack);
        private current: Diagnostic;
        private position: number = 0;
        private static DefaultStackCapacity: number = 8;
        ctor_1274(syntaxTree: SyntaxTree, node: GreenNode, position: number): SyntaxTreeDiagnosticEnumerator {
            this.syntaxTree = null;
            this.current = null;
            this.position = position;
            if (node != null && node.ContainsDiagnostics) {
                this.syntaxTree = syntaxTree;
                this.stack = new SyntaxTreeDiagnosticEnumerator.NodeIterationStack().ctor_1146(SyntaxTreeDiagnosticEnumerator.DefaultStackCapacity);
                this.stack.PushNodeOrToken(node);
            }
            else {
                this.stack = new SyntaxTreeDiagnosticEnumerator.NodeIterationStack();
            }
            return this;
        }
        public MoveNext(): boolean {
            __Outer68: while (this.stack.Any()) {
                var diagIndex = this.stack.Top.DiagnosticIndex;
                var node = this.stack.Top.Node;
                var diags = node.GetDiagnostics();
                if (diagIndex < diags.length - 1) {
                    diagIndex++;
                    var sdi = <SyntaxDiagnosticInfo>diags[diagIndex];
                    var leadingWidthAlreadyCounted: number = node.IsToken ? node.GetLeadingTriviaWidth() : 0;
                    this.current = new CSDiagnostic().ctor_1858(sdi, new SourceLocation().ctor_1003(this.syntaxTree, new Text.TextSpan().ctor_1506(this.position - leadingWidthAlreadyCounted + sdi.Offset, sdi.Width)));
                    this.stack.UpdateDiagnosticIndexForStackTop(diagIndex);
                    return true;
                }
                var slotIndex = this.stack.Top.SlotIndex;
                tryAgain:
                while (true) {

                    if (slotIndex < node.SlotCount - 1) {
                        slotIndex++;
                        var child = node.GetSlot(slotIndex);
                        if (child == null) {
                            continue tryAgain;
                        }
                        if (!child.ContainsDiagnostics) {
                            this.position += child.FullWidth;
                            continue tryAgain;
                        }
                        this.stack.UpdateSlotIndexForStackTop(slotIndex);
                        this.stack.PushNodeOrToken(child);
                    }
                    else {
                        if (node.SlotCount == 0) {
                            this.position += node.Width;
                        }
                        this.stack.Pop();
                    } break;
                }
            }
            return false;
        }
        public get Current(): Diagnostic {
            return this.current;
        }
        constructor() { }
    }
    export module SyntaxTreeDiagnosticEnumerator {
        export class NodeIteration implements IStruct {
            public Node: GreenNode;
            public DiagnosticIndex: number = 0;
            public SlotIndex: number = 0;
            ctor_1131(node: GreenNode): NodeIteration {
                this.Node = node;
                this.SlotIndex = -1;
                this.DiagnosticIndex = -1;
                return this;
            }
            constructor() { }
        }
    }
    export module SyntaxTreeDiagnosticEnumerator {
        export class NodeIterationStack implements IStruct {
            private stack: NodeIteration[];
            private count: number = 0;
            ctor_1146(capacity: number): NodeIterationStack {
                System.Diagnostics.Debug.Assert(capacity > 0);
                this.stack = StructArray(NodeIteration, capacity);
                this.count = 0;
                return this;
            }
            public PushNodeOrToken(node: GreenNode): void {
                var token = __as__<Syntax.InternalSyntax.SyntaxToken>(node, Syntax.InternalSyntax.SyntaxToken);
                if (token != null) {
                    this.PushToken(token);
                }
                else {
                    this.Push(node);
                }
            }
            private PushToken(token: Syntax.InternalSyntax.SyntaxToken): void {
                var trailing = token.GetTrailingTrivia();
                if (trailing != null) {
                    this.Push(trailing);
                }
                this.Push(token);
                var leading = token.GetLeadingTrivia();
                if (leading != null) {
                    this.Push(leading);
                }
            }
            private Push(node: GreenNode): void {
                if (this.count >= this.stack.length) {
                    var tmp = StructArray(NodeIteration, this.stack.length * 2);
                    TSArray.Copy(this.stack, tmp, this.stack.length);
                    this.stack = tmp;
                }
                this.stack[this.count] = new NodeIteration().ctor_1131(node);
                this.count++;
            }
            public Pop(): void {
                this.count--;
            }
            public Any(): boolean {
                return this.count > 0;
            }
            public get Top(): NodeIteration {
                return this.$get$(this.count - 1);
            }
            public $get$(index: number): NodeIteration {
                System.Diagnostics.Debug.Assert(this.stack != null);
                System.Diagnostics.Debug.Assert(index >= 0 && index < this.count);
                return this.stack[index];
            }
            public UpdateSlotIndexForStackTop(slotIndex: number): void {
                System.Diagnostics.Debug.Assert(this.stack != null);
                System.Diagnostics.Debug.Assert(this.count > 0);
                this.stack[this.count - 1].SlotIndex = slotIndex;
            }
            public UpdateDiagnosticIndexForStackTop(diagnosticIndex: number): void {
                System.Diagnostics.Debug.Assert(this.stack != null);
                System.Diagnostics.Debug.Assert(this.count > 0);
                this.stack[this.count - 1].DiagnosticIndex = diagnosticIndex;
            }
            constructor() { }
        }
    }
}
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxDiagnosticInfoList implements IStruct {
        private node: GreenNode;
        ctor_2725(node: GreenNode): SyntaxDiagnosticInfoList {
            this.node = node;
            return this;
        }
        public GetEnumerator(): SyntaxDiagnosticInfoList.Enumerator {
            return new SyntaxDiagnosticInfoList.Enumerator().ctor_2154(this.node);
        }
        public Any(predicate: (_: DiagnosticInfo) => boolean): boolean {
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                if (predicate(enumerator.Current))
                    return true;
            }
            return false;
        }
        constructor() { }
    }
    export module SyntaxDiagnosticInfoList {
        export class Enumerator implements IStruct {
            private stack: Enumerator.NodeIteration[];
            private count: number = 0;
            private current: DiagnosticInfo;
            ctor_2154(node: GreenNode): Enumerator {
                this.current = null;
                this.stack = null;
                this.count = 0;
                if (node != null && node.ContainsDiagnostics) {
                    this.stack = StructArray(Enumerator.NodeIteration, 8);
                    this.PushNodeOrToken(node);
                }
                return this;
            }
            public MoveNext(): boolean {
                __Outer97: while (this.count > 0) {
                    var diagIndex = this.stack[this.count - 1].DiagnosticIndex;
                    var node = this.stack[this.count - 1].Node;
                    var diags = node.GetDiagnostics();
                    if (diagIndex < diags.length - 1) {
                        diagIndex++;
                        this.current = diags[diagIndex];
                        this.stack[this.count - 1].DiagnosticIndex = diagIndex;
                        return true;
                    }
                    var slotIndex = this.stack[this.count - 1].SlotIndex;
                    tryAgain:
                    while (true) {

                        if (slotIndex < node.SlotCount - 1) {
                            slotIndex++;
                            var child = node.GetSlot(slotIndex);
                            if (child == null || !child.ContainsDiagnostics) {
                                continue tryAgain;
                            }
                            this.stack[this.count - 1].SlotIndex = slotIndex;
                            this.PushNodeOrToken(child);
                        }
                        else {
                            this.Pop();
                        } break;
                    }
                }
                return false;
            }
            private PushNodeOrToken(node: GreenNode): void {
                var token = __as__<SyntaxToken>(node, SyntaxToken);
                if (token != null) {
                    this.PushToken(token);
                }
                else {
                    this.Push(node);
                }
            }
            private PushToken(token: SyntaxToken): void {
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
                    var tmp = StructArray(Enumerator.NodeIteration, this.stack.length * 2);
                    TSArray.Copy(this.stack, tmp, this.stack.length);
                    this.stack = tmp;
                }
                this.stack[this.count] = new Enumerator.NodeIteration().ctor_1131(node);
                this.count++;
            }
            private Pop(): void {
                this.count--;
            }
            public get Current(): DiagnosticInfo {
                return this.current;
            }
            constructor() { }
        }
        export module Enumerator {
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
    }
}
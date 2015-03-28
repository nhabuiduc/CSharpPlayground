/// <reference path="Location.ts" />
module Microsoft.CodeAnalysis {
    export class SourceLocation extends Location implements System.IEquatable<SourceLocation>
    {
        private syntaxTree: SyntaxTree;
        private span: Text.TextSpan = structDefault(Text.TextSpan);
        ctor_1003(syntaxTree: SyntaxTree, span: Text.TextSpan): SourceLocation {
            super.ctor_1148();
            this.syntaxTree = syntaxTree;
            this.span = span;
            return this;
        }
        ctor_1875(node: SyntaxNode): SourceLocation {
            this.ctor_1003(node.SyntaxTree, node.Span);
            return this;
        }
        ctor_1902(token: SyntaxToken): SourceLocation {
            this.ctor_1003(token.SyntaxTree, token.Span);
            return this;
        }
        ctor_1192(nodeOrToken: SyntaxNodeOrToken): SourceLocation {
            this.ctor_1003(nodeOrToken.SyntaxTree, nodeOrToken.Span);
            return this;
        }
        ctor_2008(trivia: SyntaxTrivia): SourceLocation {
            this.ctor_1003(trivia.SyntaxTree, trivia.Span);
            return this;
        }
        ctor_1638(syntaxRef: SyntaxReference): SourceLocation {
            this.ctor_1003(syntaxRef.SyntaxTree, syntaxRef.Span);
            return this;
        }
        public get Kind(): LocationKind {
            return LocationKind.SourceFile;
        }
        public get SourceSpan(): Text.TextSpan {
            return this.span;
        }
        public get SourceTree(): SyntaxTree {
            return this.syntaxTree;
        }
        public GetLineSpan(): FileLinePositionSpan {
            if (this.syntaxTree == null) {
                var result: FileLinePositionSpan = structDefault(FileLinePositionSpan);
                System.Diagnostics.Debug.Assert(!result.IsValid);
                return result;
            }
            return this.syntaxTree.GetLineSpan(this.span);
        }
        public GetMappedLineSpan(): FileLinePositionSpan {
            if (this.syntaxTree == null) {
                var result: FileLinePositionSpan = structDefault(FileLinePositionSpan);
                System.Diagnostics.Debug.Assert(!result.IsValid);
                return result;
            }
            return this.syntaxTree.GetMappedLineSpan(this.span);
        }
        public Equals_2017(other: SourceLocation): boolean {
            if (ReferenceEquals(this, other)) {
                return true;
            }
            return other != null && other.syntaxTree == this.syntaxTree && other.span.op_Equality(this.span);
        }
        public Equals(obj: Object): boolean {
            return this.Equals_2017(__as__<SourceLocation>(obj, SourceLocation));
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_7656(this.syntaxTree, this.span.GetHashCode());
        }

        constructor() { super(); }
    }
}
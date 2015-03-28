module Microsoft.CodeAnalysis {
    export class SyntaxWalker {
        protected  Depth: SyntaxWalkerDepth = 0;
        ctor_1744(depth: SyntaxWalkerDepth = SyntaxWalkerDepth.Node): SyntaxWalker {
            this.Depth = depth;
            return this;
        }
        public Visit(node: SyntaxNode): void {
            // for each
            var childEnumerator = node.ChildNodesAndTokens().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    if (child.IsNode) {
                        if (this.Depth >= SyntaxWalkerDepth.Node) {
                            this.Visit(child.AsNode());
                        }
                    }
                    else if (child.IsToken) {
                        if (this.Depth >= SyntaxWalkerDepth.Token) {
                            this.VisitToken(child.AsToken());
                        }
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
        }
        protected  VisitToken(token: SyntaxToken): void {
            if (this.Depth >= SyntaxWalkerDepth.Trivia) {
                this.VisitLeadingTrivia(token);
                this.VisitTrailingTrivia(token);
            }
        }
        private VisitLeadingTrivia(token: SyntaxToken): void {
            if (token.HasLeadingTrivia) {
                // for each
                var triviaEnumerator = token.LeadingTrivia.GetEnumerator();
                try {
                    while (triviaEnumerator.MoveNext()) {
                        var trivia = triviaEnumerator.Current;
                        // foreach block
                        this.VisitTrivia(trivia);
                    }
                } finally {
                    if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                }    
                // end foreach
            }
        }
        private VisitTrailingTrivia(token: SyntaxToken): void {
            if (token.HasTrailingTrivia) {
                // for each
                var triviaEnumerator = token.TrailingTrivia.GetEnumerator();
                try {
                    while (triviaEnumerator.MoveNext()) {
                        var trivia = triviaEnumerator.Current;
                        // foreach block
                        this.VisitTrivia(trivia);
                    }
                } finally {
                    if (triviaEnumerator !== null) triviaEnumerator.Dispose();

                }    
                // end foreach
            }
        }
        protected  VisitTrivia(trivia: SyntaxTrivia): void {
            if (this.Depth >= SyntaxWalkerDepth.StructuredTrivia && trivia.HasStructure) {
                this.Visit(trivia.GetStructure());
            }
        }
        constructor() { }
    }
}
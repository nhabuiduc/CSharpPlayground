module Microsoft.CodeAnalysis {
    export class AbstractSyntaxNavigator {
        private static None: number = 0;
        protected  GetStepIntoFunction(skipped: boolean, directives: boolean, docComments: boolean): (_: SyntaxTrivia) => boolean { throw new Error('not implemented'); }
        private GetPredicateFunction(includeZeroWidth: boolean): (_: SyntaxToken) => boolean {
            return includeZeroWidth ? SyntaxToken.Any : SyntaxToken.NonZeroWidth;
        }
        private Matches(predicate: (_: SyntaxToken) => boolean, token: SyntaxToken): boolean {
            return predicate == null || ReferenceEquals(predicate, SyntaxToken.Any) || predicate(token);
        }
        public GetFirstToken_1312(current: SyntaxNode, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken {
            return this.GetFirstToken_2110(current, this.GetPredicateFunction(includeZeroWidth), this.GetStepIntoFunction(includeSkipped, includeDirectives, includeDocumentationComments));
        }
        public GetLastToken_4205(current: SyntaxNode, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken {
            return this.GetLastToken_1389(current, this.GetPredicateFunction(includeZeroWidth), this.GetStepIntoFunction(includeSkipped, includeDirectives, includeDocumentationComments));
        }
        public GetPreviousToken_1070(current: SyntaxToken, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken {
            return this.GetPreviousToken_1392(current, this.GetPredicateFunction(includeZeroWidth), this.GetStepIntoFunction(includeSkipped, includeDirectives, includeDocumentationComments));
        }
        public GetNextToken_1578(current: SyntaxToken, includeZeroWidth: boolean, includeSkipped: boolean, includeDirectives: boolean, includeDocumentationComments: boolean): SyntaxToken {
            return this.GetNextToken_1071(current, this.GetPredicateFunction(includeZeroWidth), this.GetStepIntoFunction(includeSkipped, includeDirectives, includeDocumentationComments));
        }
        public GetPreviousToken_1392(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            return this.GetPreviousToken_3425(current, predicate, stepInto != null, stepInto);
        }
        public GetNextToken_1071(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            return this.GetNextToken_1799(current, predicate, stepInto != null, stepInto);
        }
        public GetFirstToken_2110(current: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            // for each
            var childEnumerator = current.ChildNodesAndTokens().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    var token = child.IsToken ? this.GetFirstToken_6850(child.AsToken(), predicate, stepInto) : this.GetFirstToken_2110(child.AsNode(), predicate, stepInto);
                    if (token.RawKind != AbstractSyntaxNavigator.None) {
                        return token;
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        public GetLastToken_1389(current: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            // for each
            var childEnumerator = current.ChildNodesAndTokens().Reverse().GetEnumerator();
            try {
                while (childEnumerator.MoveNext()) {
                    var child = childEnumerator.Current;
                    // foreach block
                    var token = child.IsToken ? this.GetLastToken_1408(child.AsToken(), predicate, stepInto) : this.GetLastToken_1389(child.AsNode(), predicate, stepInto);
                    if (token.RawKind != AbstractSyntaxNavigator.None) {
                        return token;
                    }
                }
            } finally {
                if (childEnumerator !== null) childEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        private GetFirstToken_1704(triviaList: SyntaxTriviaList, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            System.Diagnostics.Debug.Assert(stepInto != null);
            // for each
            var triviaEnumerator = triviaList.GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (trivia.HasStructure && stepInto(trivia)) {
                        var structure = trivia.GetStructure();
                        var token = this.GetFirstToken_2110(structure, predicate, stepInto);
                        if (token.RawKind != AbstractSyntaxNavigator.None) {
                            return token;
                        }
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        private GetLastToken_1461(list: SyntaxTriviaList, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            System.Diagnostics.Debug.Assert(stepInto != null);
            var token = structDefault(SyntaxToken);
            // for each
            var triviaEnumerator = list.Reverse().GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    var token_ref0 = { refObj: token };
                    var ret_val__626 = this.TryGetLastTokenForStructuredTrivia(trivia, predicate, stepInto, token_ref0);

                    token = token_ref0.refObj;
                    if (ret_val__626) {
                        return token;
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        private TryGetLastTokenForStructuredTrivia(trivia: SyntaxTrivia, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean, token: { refObj: SyntaxToken }): boolean {
            token.refObj = structDefault(SyntaxToken);
            if (!trivia.HasStructure || stepInto == null || !stepInto(trivia)) {
                return false;
            }
            token.refObj = this.GetLastToken_1389(trivia.GetStructure(), predicate, stepInto);
            return token.refObj.RawKind != AbstractSyntaxNavigator.None;
        }
        private GetFirstToken_6850(token: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            if (stepInto != null) {
                var firstToken = this.GetFirstToken_1704(token.LeadingTrivia, predicate, stepInto);
                if (firstToken.RawKind != AbstractSyntaxNavigator.None) {
                    return firstToken;
                }
            }
            if (this.Matches(predicate, token)) {
                return token;
            }
            if (stepInto != null) {
                var firstToken = this.GetFirstToken_1704(token.TrailingTrivia, predicate, stepInto);
                if (firstToken.RawKind != AbstractSyntaxNavigator.None) {
                    return firstToken;
                }
            }
            return structDefault(SyntaxToken);
        }
        private GetLastToken_1408(token: SyntaxToken, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            if (stepInto != null) {
                var lastToken = this.GetLastToken_1461(token.TrailingTrivia, predicate, stepInto);
                if (lastToken.RawKind != AbstractSyntaxNavigator.None) {
                    return lastToken;
                }
            }
            if (this.Matches(predicate, token)) {
                return token;
            }
            if (stepInto != null) {
                var lastToken = this.GetLastToken_1461(token.LeadingTrivia, predicate, stepInto);
                if (lastToken.RawKind != AbstractSyntaxNavigator.None) {
                    return lastToken;
                }
            }
            return structDefault(SyntaxToken);
        }
        public GetNextToken_1439(current: SyntaxTrivia, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            var returnNext: boolean = false;
            var returnNext_ref0 = { refObj: returnNext };
            var ret_val__636 = this.GetNextToken_1982(current, current.Token.LeadingTrivia, predicate, stepInto, returnNext_ref0);

            returnNext = returnNext_ref0.refObj;
            var token = ret_val__636;
            if (token.RawKind != AbstractSyntaxNavigator.None) {
                return token;
            }
            if (returnNext && (predicate == null || predicate == SyntaxToken.Any || predicate(current.Token))) {
                return current.Token;
            }
            var returnNext_ref0 = { refObj: returnNext };
            var ret_val__78 = this.GetNextToken_1982(current, current.Token.TrailingTrivia, predicate, stepInto, returnNext_ref0);

            returnNext = returnNext_ref0.refObj;
            token = ret_val__78;
            if (token.RawKind != AbstractSyntaxNavigator.None) {
                return token;
            }
            return this.GetNextToken_1799(current.Token, predicate, false, stepInto);
        }
        public GetPreviousToken_1349(current: SyntaxTrivia, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            var returnPrevious: boolean = false;
            var returnPrevious_ref0 = { refObj: returnPrevious };
            var ret_val__220 = this.GetPreviousToken_1405(current, current.Token.TrailingTrivia, predicate, stepInto, returnPrevious_ref0);

            returnPrevious = returnPrevious_ref0.refObj;
            var token = ret_val__220;
            if (token.RawKind != AbstractSyntaxNavigator.None) {
                return token;
            }
            if (returnPrevious && this.Matches(predicate, current.Token)) {
                return current.Token;
            }
            var returnPrevious_ref0 = { refObj: returnPrevious };
            var ret_val__433 = this.GetPreviousToken_1405(current, current.Token.LeadingTrivia, predicate, stepInto, returnPrevious_ref0);

            returnPrevious = returnPrevious_ref0.refObj;
            token = ret_val__433;
            if (token.RawKind != AbstractSyntaxNavigator.None) {
                return token;
            }
            return this.GetPreviousToken_3425(current.Token, predicate, false, stepInto);
        }
        private GetNextToken_1982(current: SyntaxTrivia, list: SyntaxTriviaList, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean, returnNext: { refObj: boolean }): SyntaxToken {
            // for each
            var triviaEnumerator = list.GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (returnNext.refObj) {
                        if (trivia.HasStructure && stepInto != null && stepInto(trivia)) {
                            var structure = trivia.GetStructure();
                            var token = this.GetFirstToken_2110(structure, predicate, stepInto);
                            if (token.RawKind != AbstractSyntaxNavigator.None) {
                                return token;
                            }
                        }
                    }
                    else if (trivia.op_Equality(current)) {
                        returnNext.refObj = true;
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        private GetPreviousToken_1405(current: SyntaxTrivia, list: SyntaxTriviaList, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean, returnPrevious: { refObj: boolean }): SyntaxToken {
            var token = structDefault(SyntaxToken);
            // for each
            var triviaEnumerator = list.Reverse().GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (returnPrevious.refObj) {
                        var token_ref0 = { refObj: token };
                        var ret_val__650 = this.TryGetLastTokenForStructuredTrivia(trivia, predicate, stepInto, token_ref0);

                        token = token_ref0.refObj;
                        if (ret_val__650) {
                            return token;
                        }
                    }
                    else if (trivia.op_Equality(current)) {
                        returnPrevious.refObj = true;
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return structDefault(SyntaxToken);
        }
        public GetNextToken_1474(node: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            while (node.Parent != null) {
                var returnNext: boolean = false;
                // for each
                var childEnumerator = node.Parent.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (returnNext) {
                            if (child.IsToken) {
                                var token = this.GetFirstToken_6850(child.AsToken(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                            else {
                                var token = this.GetFirstToken_2110(child.AsNode(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                        }
                        else if (child.IsNode && child.AsNode() == node) {
                            returnNext = true;
                        }
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
                node = node.Parent;
            }
            if (node.IsStructuredTrivia) {
                return this.GetNextToken_1439((<IStructuredTriviaSyntax>node).ParentTrivia, predicate, stepInto);
            }
            return structDefault(SyntaxToken);
        }
        public GetPreviousToken_6217(node: SyntaxNode, predicate: (_: SyntaxToken) => boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            while (node.Parent != null) {
                var returnPrevious: boolean = false;
                // for each
                var childEnumerator = node.Parent.ChildNodesAndTokens().Reverse().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (returnPrevious) {
                            if (child.IsToken) {
                                var token = this.GetLastToken_1408(child.AsToken(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                            else {
                                var token = this.GetLastToken_1389(child.AsNode(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                        }
                        else if (child.IsNode && child.AsNode() == node) {
                            returnPrevious = true;
                        }
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
                node = node.Parent;
            }
            if (node.IsStructuredTrivia) {
                return this.GetPreviousToken_1349((<IStructuredTriviaSyntax>node).ParentTrivia, predicate, stepInto);
            }
            return structDefault(SyntaxToken);
        }
        public GetNextToken_1799(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, searchInsideCurrentTokenTrailingTrivia: boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            System.Diagnostics.Debug.Assert(searchInsideCurrentTokenTrailingTrivia == false || stepInto != null);
            if (current.Parent != null) {
                if (searchInsideCurrentTokenTrailingTrivia) {
                    var firstToken = this.GetFirstToken_1704(current.TrailingTrivia, predicate, stepInto);
                    if (firstToken.RawKind != AbstractSyntaxNavigator.None) {
                        return firstToken;
                    }
                }
                var returnNext: boolean = false;
                // for each
                var childEnumerator = current.Parent.ChildNodesAndTokens().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (returnNext) {
                            if (child.IsToken) {
                                var token = this.GetFirstToken_6850(child.AsToken(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                            else {
                                var token = this.GetFirstToken_2110(child.AsNode(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                        }
                        else if (child.IsToken && child.AsToken().op_Equality(current)) {
                            returnNext = true;
                        }
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
                return this.GetNextToken_1474(current.Parent, predicate, stepInto);
            }
            return structDefault(SyntaxToken);
        }
        public GetPreviousToken_3425(current: SyntaxToken, predicate: (_: SyntaxToken) => boolean, searchInsideCurrentTokenLeadingTrivia: boolean, stepInto: (_: SyntaxTrivia) => boolean): SyntaxToken {
            System.Diagnostics.Debug.Assert(searchInsideCurrentTokenLeadingTrivia == false || stepInto != null);
            if (current.Parent != null) {
                if (searchInsideCurrentTokenLeadingTrivia) {
                    var lastToken = this.GetLastToken_1461(current.LeadingTrivia, predicate, stepInto);
                    if (lastToken.RawKind != AbstractSyntaxNavigator.None) {
                        return lastToken;
                    }
                }
                var returnPrevious: boolean = false;
                // for each
                var childEnumerator = current.Parent.ChildNodesAndTokens().Reverse().GetEnumerator();
                try {
                    while (childEnumerator.MoveNext()) {
                        var child = childEnumerator.Current;
                        // foreach block
                        if (returnPrevious) {
                            if (child.IsToken) {
                                var token = this.GetLastToken_1408(child.AsToken(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                            else {
                                var token = this.GetLastToken_1389(child.AsNode(), predicate, stepInto);
                                if (token.RawKind != AbstractSyntaxNavigator.None) {
                                    return token;
                                }
                            }
                        }
                        else if (child.IsToken && child.AsToken().op_Equality(current)) {
                            returnPrevious = true;
                        }
                    }
                } finally {
                    if (childEnumerator !== null) childEnumerator.Dispose();

                }    
                // end foreach
                return this.GetPreviousToken_6217(current.Parent, predicate, stepInto);
            }
            return structDefault(SyntaxToken);
        }
        constructor() { }
    }
}
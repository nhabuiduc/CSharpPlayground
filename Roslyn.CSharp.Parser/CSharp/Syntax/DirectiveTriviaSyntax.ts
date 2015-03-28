module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class DirectiveTriviaSyntax extends StructuredTriviaSyntax{
        public get DirectiveNameToken(): SyntaxToken {
            switch (this.Kind) {
                case SyntaxKind.IfDirectiveTrivia:
                    return (<IfDirectiveTriviaSyntax>this).IfKeyword;
                case SyntaxKind.ElifDirectiveTrivia:
                    return (<ElifDirectiveTriviaSyntax>this).ElifKeyword;
                case SyntaxKind.ElseDirectiveTrivia:
                    return (<ElseDirectiveTriviaSyntax>this).ElseKeyword;
                case SyntaxKind.EndIfDirectiveTrivia:
                    return (<EndIfDirectiveTriviaSyntax>this).EndIfKeyword;
                case SyntaxKind.RegionDirectiveTrivia:
                    return (<RegionDirectiveTriviaSyntax>this).RegionKeyword;
                case SyntaxKind.EndRegionDirectiveTrivia:
                    return (<EndRegionDirectiveTriviaSyntax>this).EndRegionKeyword;
                case SyntaxKind.ErrorDirectiveTrivia:
                    return (<ErrorDirectiveTriviaSyntax>this).ErrorKeyword;
                case SyntaxKind.WarningDirectiveTrivia:
                    return (<WarningDirectiveTriviaSyntax>this).WarningKeyword;
                case SyntaxKind.BadDirectiveTrivia:
                    return (<BadDirectiveTriviaSyntax>this).Identifier;
                case SyntaxKind.DefineDirectiveTrivia:
                    return (<DefineDirectiveTriviaSyntax>this).DefineKeyword;
                case SyntaxKind.UndefDirectiveTrivia:
                    return (<UndefDirectiveTriviaSyntax>this).UndefKeyword;
                case SyntaxKind.LineDirectiveTrivia:
                    return (<LineDirectiveTriviaSyntax>this).LineKeyword;
                case SyntaxKind.PragmaWarningDirectiveTrivia:
                    return (<PragmaWarningDirectiveTriviaSyntax>this).PragmaKeyword;
                case SyntaxKind.PragmaChecksumDirectiveTrivia:
                    return (<PragmaChecksumDirectiveTriviaSyntax>this).PragmaKeyword;
                case SyntaxKind.ReferenceDirectiveTrivia:
                    return (<ReferenceDirectiveTriviaSyntax>this).ReferenceKeyword;
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(this.Kind);
            }
        }
        public GetNextDirective(predicate: (_: DirectiveTriviaSyntax) => boolean = null): DirectiveTriviaSyntax {
            var token = <SyntaxToken>this.ParentTrivia.Token;
            var next: boolean = false;
            while (CSharpExtensions.CSharpKind_1238(token) != SyntaxKind.None) {
                // for each
                var trEnumerator = token.LeadingTrivia.GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        if (next) {
                            if (tr.IsDirective) {
                                var d = <DirectiveTriviaSyntax>tr.GetStructure();
                                if (predicate == null || predicate(d)) {
                                    return d;
                                }
                            }
                        }
                        else if (tr.UnderlyingNode == this.Green) {
                            next = true;
                        }
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
                token = token.GetNextToken_2254(DirectiveTriviaSyntax.hasDirectivesFunction);
            }
            return null;
        }
        public GetPreviousDirective(predicate: (_: DirectiveTriviaSyntax) => boolean = null): DirectiveTriviaSyntax {
            var token = <SyntaxToken>this.ParentTrivia.Token;
            var next: boolean = false;
            while (CSharpExtensions.CSharpKind_1238(token) != SyntaxKind.None) {
                // for each
                var trEnumerator = token.LeadingTrivia.Reverse().GetEnumerator();
                try {
                    while (trEnumerator.MoveNext()) {
                        var tr = trEnumerator.Current;
                        // foreach block
                        if (next) {
                            if (tr.IsDirective) {
                                var d = <DirectiveTriviaSyntax>tr.GetStructure();
                                if (predicate == null || predicate(d)) {
                                    return d;
                                }
                            }
                        }
                        else if (tr.UnderlyingNode == this.Green) {
                            next = true;
                        }
                    }
                } finally {
                    if (trEnumerator !== null) trEnumerator.Dispose();

                }    
                // end foreach
                token = token.GetPreviousToken_8036(DirectiveTriviaSyntax.hasDirectivesFunction);
            }
            return null;
        }
        public GetRelatedDirectives_6891(): System.Collections.Generic.List<DirectiveTriviaSyntax> {
            var list = new System.Collections.Generic.List<DirectiveTriviaSyntax>();
            this.GetRelatedDirectives_1976(list);
            return list;
        }
        private GetRelatedDirectives_1976(list: System.Collections.Generic.List<DirectiveTriviaSyntax>): void {
            list.Clear();
            var p = this.GetPreviousRelatedDirective();
            while (p != null) {
                list.Add(p);
                p = p.GetPreviousRelatedDirective();
            }
            list.Reverse();
            list.Add(this);
            var n = this.GetNextRelatedDirective();
            while (n != null) {
                list.Add(n);
                n = n.GetNextRelatedDirective();
            }
        }
        private GetNextRelatedDirective(): DirectiveTriviaSyntax {
            var d: DirectiveTriviaSyntax = this;
            switch (d.Kind) {
                case SyntaxKind.IfDirectiveTrivia:
                    while (d != null) {
                        switch (d.Kind) {
                            case SyntaxKind.ElifDirectiveTrivia:
                            case SyntaxKind.ElseDirectiveTrivia:
                            case SyntaxKind.EndIfDirectiveTrivia:
                                return d;
                        }
                        d = d.GetNextPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.ElifDirectiveTrivia:
                    while (d != null) {
                        switch (d.Kind) {
                            case SyntaxKind.ElseDirectiveTrivia:
                            case SyntaxKind.EndIfDirectiveTrivia:
                                return d;
                        }
                        d = d.GetNextPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.ElseDirectiveTrivia:
                    while (d != null) {
                        if (d.Kind == SyntaxKind.EndIfDirectiveTrivia) {
                            return d;
                        }
                        d = d.GetNextPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.RegionDirectiveTrivia:
                    while (d != null) {
                        if (d.Kind == SyntaxKind.EndRegionDirectiveTrivia) {
                            return d;
                        }
                        d = d.GetNextPossiblyRelatedDirective();
                    }
                    break;
            }
            return null;
        }
        private GetNextPossiblyRelatedDirective(): DirectiveTriviaSyntax {
            var d: DirectiveTriviaSyntax = this;
            while (d != null) {
                d = d.GetNextDirective();
                if (d != null) {
                    switch (d.Kind) {
                        case SyntaxKind.IfDirectiveTrivia:
                            while (d != null && d.Kind != SyntaxKind.EndIfDirectiveTrivia) {
                                d = d.GetNextRelatedDirective();
                            }
                            continue;
                        case SyntaxKind.RegionDirectiveTrivia:
                            while (d != null && d.Kind != SyntaxKind.EndRegionDirectiveTrivia) {
                                d = d.GetNextRelatedDirective();
                            }
                            continue;
                    }
                }
                return d;
            }
            return null;
        }
        private GetPreviousRelatedDirective(): DirectiveTriviaSyntax {
            var d: DirectiveTriviaSyntax = this;
            switch (d.Kind) {
                case SyntaxKind.EndIfDirectiveTrivia:
                    while (d != null) {
                        switch (d.Kind) {
                            case SyntaxKind.IfDirectiveTrivia:
                            case SyntaxKind.ElifDirectiveTrivia:
                            case SyntaxKind.ElseDirectiveTrivia:
                                return d;
                        }
                        d = d.GetPreviousPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.ElifDirectiveTrivia:
                    while (d != null) {
                        if (d.Kind == SyntaxKind.IfDirectiveTrivia) {
                            return d;
                        }
                        d = d.GetPreviousPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.ElseDirectiveTrivia:
                    while (d != null) {
                        switch (d.Kind) {
                            case SyntaxKind.IfDirectiveTrivia:
                            case SyntaxKind.ElifDirectiveTrivia:
                                return d;
                        }
                        d = d.GetPreviousPossiblyRelatedDirective();
                    }
                    break;
                case SyntaxKind.EndRegionDirectiveTrivia:
                    while (d != null) {
                        if (d.Kind == SyntaxKind.RegionDirectiveTrivia) {
                            return d;
                        }
                        d = d.GetPreviousPossiblyRelatedDirective();
                    }
                    break;
            }
            return null;
        }
        private GetPreviousPossiblyRelatedDirective(): DirectiveTriviaSyntax {
            var d: DirectiveTriviaSyntax = this;
            while (d != null) {
                d = d.GetPreviousDirective();
                if (d != null) {
                    switch (d.Kind) {
                        case SyntaxKind.EndIfDirectiveTrivia:
                            while (d != null && d.Kind != SyntaxKind.IfDirectiveTrivia) {
                                d = d.GetPreviousRelatedDirective();
                            }
                            continue;
                        case SyntaxKind.EndRegionDirectiveTrivia:
                            while (d != null && d.Kind != SyntaxKind.RegionDirectiveTrivia) {
                                d = d.GetPreviousRelatedDirective();
                            }
                            continue;
                    }
                }
                return d;
            }
            return null;
        }
        private static hasDirectivesFunction: (_: SyntaxToken) => boolean = t => t.ContainsDirectives;
        

        // partial

        ctor_1345(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DirectiveTriviaSyntax {
            super.ctor_1526(green, parent, position);
            return this;
        }
        public HashToken: SyntaxToken = structDefault(SyntaxToken);
        public EndOfDirectiveToken: SyntaxToken = structDefault(SyntaxToken);
        public IsActive: boolean = false;
        constructor() { super(); }
    }
}
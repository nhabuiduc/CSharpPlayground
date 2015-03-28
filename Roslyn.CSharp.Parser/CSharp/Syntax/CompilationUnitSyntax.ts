module Microsoft.CodeAnalysis.CSharp.Syntax {
    export class CompilationUnitSyntax extends CSharpSyntaxNode {
        public GetReferenceDirectives_1524(): System.Collections.Generic.IList<ReferenceDirectiveTriviaSyntax> {
            return this.GetReferenceDirectives_2073(null);
        }
        public GetReferenceDirectives_2073(filter: (_: ReferenceDirectiveTriviaSyntax) => boolean): System.Collections.Generic.IList<ReferenceDirectiveTriviaSyntax> {
            var firstToken = SyntaxNodeOrToken.op_Implicit_7398(this.GetFirstToken_1962(/*includeZeroWidth:*/true, false, false, false));
            return firstToken.GetDirectives_1318<ReferenceDirectiveTriviaSyntax>(filter);
        }
        public GetConditionalDirectivesStack(): Syntax.InternalSyntax.DirectiveStack {
            var directives: System.Collections.Generic.IEnumerable<DirectiveTriviaSyntax> = this.GetDirectives(/*filter:*/CompilationUnitSyntax.IsActiveConditionalDirective);
            var directiveStack = Syntax.InternalSyntax.DirectiveStack.Empty;
            // for each
            var directiveEnumerator = directives.GetEnumerator();
            try {
                while (directiveEnumerator.MoveNext()) {
                    var directive = directiveEnumerator.Current;
                    // foreach block
                    var internalDirective = <Syntax.InternalSyntax.DirectiveTriviaSyntax>directive.Green;
                    directiveStack = internalDirective.ApplyDirectives(directiveStack);
                }
            } finally {
                if (directiveEnumerator !== null) directiveEnumerator.Dispose();

            }    
            // end foreach
            return directiveStack;
        }
        private static IsActiveConditionalDirective(directive: DirectiveTriviaSyntax): boolean {
            switch (directive.Kind) {
                case SyntaxKind.DefineDirectiveTrivia:
                    return (<DefineDirectiveTriviaSyntax>directive).IsActive;
                case SyntaxKind.UndefDirectiveTrivia:
                    return (<UndefDirectiveTriviaSyntax>directive).IsActive;
                default:
                    return false;
            }
        }
     

        // partial

        private externs: CSharpSyntaxNode;
        private usings: CSharpSyntaxNode;
        private attributeLists: CSharpSyntaxNode;
        private members: CSharpSyntaxNode;
        ctor_7453(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CompilationUnitSyntax {
            super.ctor_6242(green, parent, position);
            return this;
        }
        public get Externs(): SyntaxList<ExternAliasDirectiveSyntax> {
            return new SyntaxList<ExternAliasDirectiveSyntax>().ctor_6698((() => {
                var externs_ref0 = { refObj: this.externs };
                var ret_val__549 = this.GetRed_2015(externs_ref0, 0);

                this.externs = externs_ref0.refObj;
                return ret_val__549;
            })());
        }
        public get Usings(): SyntaxList<UsingDirectiveSyntax> {
            return new SyntaxList<UsingDirectiveSyntax>().ctor_6698((() => {
                var usings_ref0 = { refObj: this.usings };
                var ret_val__734 = this.GetRed_2015(usings_ref0, 1);

                this.usings = usings_ref0.refObj;
                return ret_val__734;
            })());
        }
        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            return new SyntaxList<AttributeListSyntax>().ctor_6698((() => {
                var attributeLists_ref0 = { refObj: this.attributeLists };
                var ret_val__15 = this.GetRed_2015(attributeLists_ref0, 2);

                this.attributeLists = attributeLists_ref0.refObj;
                return ret_val__15;
            })());
        }
        public get Members(): SyntaxList<MemberDeclarationSyntax> {
            return new SyntaxList<MemberDeclarationSyntax>().ctor_6698((() => {
                var members_ref0 = { refObj: this.members };
                var ret_val__56 = this.GetRed_2015(members_ref0, 3);

                this.members = members_ref0.refObj;
                return ret_val__56;
            })());
        }
        public get EndOfFileToken(): SyntaxToken {
            return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CompilationUnitSyntax>this.Green).endOfFileToken, this.GetChildPosition(4), this.GetChildIndex(4));
        }
        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var externs_ref0 = { refObj: this.externs };
                    var ret_val__931 = this.GetRedAtZero_2231(externs_ref0);

                    this.externs = externs_ref0.refObj;
                    return ret_val__931;
                case 1:
                    var usings_ref0 = { refObj: this.usings };
                    var ret_val__275 = this.GetRed_2015(usings_ref0, 1);

                    this.usings = usings_ref0.refObj;
                    return ret_val__275;
                case 2:
                    var attributeLists_ref0 = { refObj: this.attributeLists };
                    var ret_val__363 = this.GetRed_2015(attributeLists_ref0, 2);

                    this.attributeLists = attributeLists_ref0.refObj;
                    return ret_val__363;
                case 3:
                    var members_ref0 = { refObj: this.members };
                    var ret_val__750 = this.GetRed_2015(members_ref0, 3);

                    this.members = members_ref0.refObj;
                    return ret_val__750;
                default:
                    return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    return this.externs;
                case 1:
                    return this.usings;
                case 2:
                    return this.attributeLists;
                case 3:
                    return this.members;
                default:
                    return null;
            }
        }
        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCompilationUnit(this);
        }
        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCompilationUnit(this);
        }
        public Update(externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, attributeLists: SyntaxList<AttributeListSyntax>, members: SyntaxList<MemberDeclarationSyntax>, endOfFileToken: SyntaxToken): CompilationUnitSyntax {
            if (externs.op_Inequality(this.Externs) || usings.op_Inequality(this.Usings) || attributeLists.op_Inequality(this.AttributeLists) || members.op_Inequality(this.Members) || endOfFileToken.op_Inequality(this.EndOfFileToken)) {
                var newNode = SyntaxFactory.CompilationUnit_1797(externs, usings, attributeLists, members, endOfFileToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode,
                        annotations);
                return newNode;
            }
            return this;
        }
        public WithExterns(externs: SyntaxList<ExternAliasDirectiveSyntax>): CompilationUnitSyntax {
            return this.Update(externs, this.Usings, this.AttributeLists, this.Members, this.EndOfFileToken);
        }
        public WithUsings(usings: SyntaxList<UsingDirectiveSyntax>): CompilationUnitSyntax {
            return this.Update(this.Externs, usings, this.AttributeLists, this.Members, this.EndOfFileToken);
        }
        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): CompilationUnitSyntax {
            return this.Update(this.Externs, this.Usings, attributeLists, this.Members, this.EndOfFileToken);
        }
        public WithMembers(members: SyntaxList<MemberDeclarationSyntax>): CompilationUnitSyntax {
            return this.Update(this.Externs, this.Usings, this.AttributeLists, members, this.EndOfFileToken);
        }
        public WithEndOfFileToken(endOfFileToken: SyntaxToken): CompilationUnitSyntax {
            return this.Update(this.Externs, this.Usings, this.AttributeLists, this.Members, endOfFileToken);
        }
        public AddExterns(...items: ExternAliasDirectiveSyntax[]): CompilationUnitSyntax {
            return this.WithExterns(this.Externs.AddRange(items));
        }
        public AddUsings(...items: UsingDirectiveSyntax[]): CompilationUnitSyntax {
            return this.WithUsings(this.Usings.AddRange(items));
        }
        public AddAttributeLists(...items: AttributeListSyntax[]): CompilationUnitSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }
        public AddMembers(...items: MemberDeclarationSyntax[]): CompilationUnitSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
        constructor() { super(); }
    }
}
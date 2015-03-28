///<reference path="SyntaxParser.ts"/>
///<reference path="../Syntax/Internal/SyntaxListBuilder`1.ts"/>
///<reference path="../Syntax/Internal/ContextAwareSyntax.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class LanguageParser extends SyntaxParser {
        private static MaxUncheckedRecursionDepth: number = 20;
        private static ensureSufficientExecutionStack: () => void;
        private pool: SyntaxListPool = new SyntaxListPool().ctor_8047();
        private syntaxFactoryContext: SyntaxFactoryContext;
        private syntaxFactory: ContextAwareSyntax;
        private recursionDepth: number = 0;
        private termState: LanguageParser.TerminatorState = 0;
        private isInTry: boolean = false;
        ctor_1741(lexer: Lexer, oldTree: CSharp.CSharpSyntaxNode, changes: System.Collections.Generic.IEnumerable<Text.TextChangeRange>, lexerMode: LexerMode = LexerMode.Syntax, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): LanguageParser {
            super.ctor_2025(lexer, lexerMode, oldTree, changes,/*allowModeReset:*/false,/*preLexIfNotIncremental:*/true,/*cancellationToken:*/cancellationToken);
            this.syntaxFactoryContext = new SyntaxFactoryContext();
            this.syntaxFactory = new ContextAwareSyntax().ctor_5769(this.syntaxFactoryContext);
            if (LanguageParser.ensureSufficientExecutionStack == null) {
                //var type = System.Type.GetType("System.Runtime.CompilerServices.RuntimeHelpers, mscorlib, Version=4.0.0.0, Culture = neutral, PublicKeyToken = b77a5c561934e089");
                //var methodInfo = System.Reflection.IntrospectionExtensions.GetTypeInfo(type).GetDeclaredMethod("EnsureSufficientExecutionStack");
                //if (methodInfo != null) {
                //    LanguageParser.ensureSufficientExecutionStack = <() => void>methodInfo.CreateDelegate(/*typeof*/() => void );
                //}
                //else {
                    LanguageParser.ensureSufficientExecutionStack = () => {

                    };
                //}
            }
            return this;
        }
        private static IsName(node: CSharpSyntaxNode, kind: SyntaxKind): boolean {
            if (node.Kind == SyntaxKind.IdentifierToken) {
                return (<SyntaxToken>node).ContextualKind == kind;
            }
            else if (node.Kind == SyntaxKind.IdentifierName) {
                return (<IdentifierNameSyntax>node).Identifier.ContextualKind == kind;
            }
            else {
                return node.ToString() == SyntaxFacts.GetText_3915(kind);
            } 
        }
        private static IsNameGlobal(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.GlobalKeyword);
        } 
        private static IsNameAssembly(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.AssemblyKeyword);
        }
        private static IsNameModule(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.ModuleKeyword);
        }
        private static IsNameType(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.TypeKeyword);
        }
        private static IsNameGet(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.GetKeyword);
        }
        private static IsNameSet(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.SetKeyword);
        }
        private static IsNameAdd(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.AddKeyword);
        }
        private static IsNameRemove(node: CSharpSyntaxNode): boolean {
            return LanguageParser.IsName(node, SyntaxKind.RemoveKeyword);
        }
        private static IsSomeWord(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.IdentifierToken || SyntaxFacts.IsKeywordKind(kind);
        }
        public static LastTerminatorState: number;//= <number>LanguageParser.TerminatorState.IsEndOfNameInExplicitInterface;
        private IsTerminator(): boolean {
            if (this.CurrentToken.Kind == SyntaxKind.EndOfFileToken) {
                return true;
            }
            for (var i: number = 1; i <= LanguageParser.LastTerminatorState; i <<= 1) {
                var isolated: LanguageParser.TerminatorState = this.termState & <LanguageParser.TerminatorState>i;
                if (isolated != 0) {
                    switch (isolated) {
                        case LanguageParser.TerminatorState.IsNamespaceMemberStartOrStop:
                            if (this.IsNamespaceMemberStartOrStop()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsAttributeDeclarationTerminator:
                            if (this.IsAttributeDeclarationTerminator()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsPossibleAggregateClauseStartOrStop:
                            if (this.IsPossibleAggregateClauseStartOrStop()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsPossibleMemberStartOrStop:
                            if (this.IsPossibleMemberStartOrStop()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfReturnType:
                            if (this.IsEndOfReturnType()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfParameterList:
                            if (this.IsEndOfParameterList()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfFieldDeclaration:
                            if (this.IsEndOfFieldDeclaration()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsPossibleEndOfVariableDeclaration:
                            if (this.IsPossibleEndOfVariableDeclaration()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfTypeArgumentList:
                            if (this.IsEndOfTypeArgumentList()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsPossibleStatementStartOrStop:
                            if (this.IsPossibleStatementStartOrStop()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfFixedStatement:
                            if (this.IsEndOfFixedStatement()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfTryBlock:
                            if (this.IsEndOfTryBlock()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfCatchClause:
                            if (this.IsEndOfCatchClause()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfilterClause:
                            if (this.IsEndOfFilterClause()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfCatchBlock:
                            if (this.IsEndOfCatchBlock()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfDoWhileExpression:
                            if (this.IsEndOfDoWhileExpression()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfForStatementArgument:
                            if (this.IsEndOfForStatementArgument()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfDeclarationClause:
                            if (this.IsEndOfDeclarationClause()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfArgumentList:
                            if (this.IsEndOfArgumentList()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsSwitchSectionStart:
                            if (this.IsPossibleSwitchSection()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfTypeParameterList:
                            if (this.IsEndOfTypeParameterList()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfMethodSignature:
                            if (this.IsEndOfMethodSignature()) {
                                return true;
                            }
                            break;
                        case LanguageParser.TerminatorState.IsEndOfNameInExplicitInterface:
                            if (this.IsEndOfNameInExplicitInterface()) {
                                return true;
                            }
                            break;
                    }
                }
            }
            return false;
        }
        private static GetOldParent(node: CSharp.CSharpSyntaxNode): CSharp.CSharpSyntaxNode {
            return node != null ? node.Parent : null;
        }
        public ParseCompilationUnit(): CompilationUnitSyntax {
            var tmp: SyntaxToken = null;
            var initialBadNodes: SyntaxListBaseBuilder = null;
            var body = new LanguageParser.NamespaceBodyBuilder().ctor_2673(this.pool);
            try
            {
                var hitStackBoundary = false;
                var resetPoint = this.GetResetPoint_LanguageParser();
                try
                {
                    var tmp_ref0 = { refObj: tmp };
                    var body_ref1 = { refObj: body };
                    var initialBadNodes_ref2 = { refObj: initialBadNodes };
                    this.ParseNamespaceBody(tmp_ref0, body_ref1, initialBadNodes_ref2, SyntaxKind.CompilationUnit);

                    tmp = tmp_ref0.refObj;

                    body = body_ref1.refObj;

                    initialBadNodes = initialBadNodes_ref2.refObj;;
                }
                catch (ex) {
                    hitStackBoundary = true;
                }

                var result: CompilationUnitSyntax;
                if (hitStackBoundary) {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    var ret_val__115 = this.CreateForInsufficientStack(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;
                    result = ret_val__115;
                }
                else {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Release_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var eof = this.EatToken_1865(SyntaxKind.EndOfFileToken);
                    result = this.syntaxFactory.CompilationUnit(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>(body.Externs), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>(body.Usings), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(body.Attributes), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(body.Members), eof);
                }
                if (initialBadNodes != null) {
                    result = this.AddLeadingSkippedSyntax(result, initialBadNodes.ToListNode());
                    this.pool.Free_1631(initialBadNodes);
                }
                return result;
            }

            finally {
                body.Free(this.pool);
            }
        }
        private CreateForInsufficientStack(state: { refObj: LanguageParser.ResetPointLanguageParser }): CompilationUnitSyntax {
            var position = this.lexer.TextWindow.Position;
            this.Reset_LanguageParser(state);
            var builder = new SyntaxListBaseBuilder().ctor_1860(4);
            while (this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                builder.Add(this.EatToken_2098());
            }
            var fileAsTrivia = this.syntaxFactory.SkippedTokensTrivia(SyntaxListBuilderExtensions.ToList_1810<SyntaxToken>(builder));
            var result = this.syntaxFactory.CompilationUnit(new SyntaxList<ExternAliasDirectiveSyntax>(), new SyntaxList<UsingDirectiveSyntax>(), new SyntaxList<AttributeListSyntax>(), new SyntaxList<MemberDeclarationSyntax>(), this.EatToken_1865(SyntaxKind.EndOfFileToken));
            result = this.AddLeadingSkippedSyntax(result, fileAsTrivia);
            return this.AddError_1911(result, position, 0, ErrorCode.ERR_InsufficientStack);
        }
        private ParseNamespaceDeclaration(): NamespaceDeclarationSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.NamespaceDeclaration) {
                return <NamespaceDeclarationSyntax>this.EatNode();
            }
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.NamespaceKeyword);
            var namespaceToken = this.EatToken_1865(SyntaxKind.NamespaceKeyword);
            var name = this.ParseQualifiedName();
            if (this.ContainsGeneric(name)) {
                name = this.AddError_1357(name, ErrorCode.ERR_UnexpectedGenericName);
            }
            if (this.ContainsAlias(name)) {
                name = this.AddError_1357(name, ErrorCode.ERR_UnexpectedAliasedName);
            }
            var openBrace: SyntaxToken;
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.IsPossibleNamespaceMemberDeclaration()) {
                openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            }
            else {
                openBrace = this.EatTokenWithPrejudice_1765(SyntaxKind.OpenBraceToken);
                openBrace = this.ConvertToMissingWithTrailingTrivia(openBrace, SyntaxKind.OpenBraceToken);
            }
            var body = new LanguageParser.NamespaceBodyBuilder().ctor_2673(this.pool);
            var initialBadNodes: SyntaxListBaseBuilder = null;
            try
            {
                var openBrace_ref0 = { refObj: openBrace };
                var body_ref1 = { refObj: body };
                var initialBadNodes_ref2 = { refObj: initialBadNodes };
                this.ParseNamespaceBody(openBrace_ref0, body_ref1, initialBadNodes_ref2, SyntaxKind.NamespaceDeclaration);

                openBrace = openBrace_ref0.refObj;

                body = body_ref1.refObj;

                initialBadNodes = initialBadNodes_ref2.refObj;;
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                var semicolon: SyntaxToken = null;
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    semicolon = this.EatToken_2098();
                }
                System.Diagnostics.Debug.Assert(initialBadNodes == null);
                return this.syntaxFactory.NamespaceDeclaration(namespaceToken, name, openBrace, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>(body.Externs), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>(body.Usings), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(body.Members), closeBrace, semicolon);
            }

            finally {
                body.Free(this.pool);
            }
        }
        private ContainsAlias(name: NameSyntax): boolean {
            switch (name.Kind) {
                case SyntaxKind.GenericName:
                    return false;
                case SyntaxKind.AliasQualifiedName:
                    return true;
                case SyntaxKind.QualifiedName:
                    var qualifedName = <QualifiedNameSyntax>name;
                    return this.ContainsAlias(qualifedName.Left);
            }
            return false;
        }
        private ContainsGeneric(name: NameSyntax): boolean {
            switch (name.Kind) {
                case SyntaxKind.GenericName:
                    return true;
                case SyntaxKind.AliasQualifiedName:
                    return this.ContainsGeneric((<AliasQualifiedNameSyntax>name).Name);
                case SyntaxKind.QualifiedName:
                    var qualifedName = <QualifiedNameSyntax>name;
                    return this.ContainsGeneric(qualifedName.Left) || this.ContainsGeneric(qualifedName.Right);
            }
            return false;
        }
        private static IsPossibleStartOfTypeDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.DelegateKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.StructKeyword:
                case SyntaxKind.AbstractKeyword:
                case SyntaxKind.InternalKeyword:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.SealedKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.UnsafeKeyword:
                case SyntaxKind.OpenBracketToken:
                    return true;
                default:
                    return false;
            }
        }
        private AddSkippedNamespaceText(openBrace: { refObj: SyntaxToken }, body: { refObj: LanguageParser.NamespaceBodyBuilder }, initialBadNodes: { refObj: SyntaxListBaseBuilder }, skippedSyntax: CSharpSyntaxNode): void {
            if (body.refObj.Members.Count > 0) {
                body.refObj.Members.$set$(body.refObj.Members.Count - 1, this.AddTrailingSkippedSyntax(body.refObj.Members.$get$(body.refObj.Members.Count - 1), skippedSyntax));
            }
            else if (body.refObj.Attributes.Count > 0) {
                body.refObj.Attributes.$set$(body.refObj.Attributes.Count - 1, this.AddTrailingSkippedSyntax(body.refObj.Attributes.$get$(body.refObj.Attributes.Count - 1), skippedSyntax));
            }
            else if (body.refObj.Usings.Count > 0) {
                body.refObj.Usings.$set$(body.refObj.Usings.Count - 1, this.AddTrailingSkippedSyntax(body.refObj.Usings.$get$(body.refObj.Usings.Count - 1), skippedSyntax));
            }
            else if (body.refObj.Externs.Count > 0) {
                body.refObj.Externs.$set$(body.refObj.Externs.Count - 1, this.AddTrailingSkippedSyntax(body.refObj.Externs.$get$(body.refObj.Externs.Count - 1), skippedSyntax));
            }
            else if (openBrace.refObj != null) {
                openBrace.refObj = this.AddTrailingSkippedSyntax(openBrace.refObj, skippedSyntax);
            }
            else {
                if (initialBadNodes.refObj == null) {
                    initialBadNodes.refObj = this.pool.AllocateBase();
                }
                initialBadNodes.refObj.AddRange_4610(SyntaxList.op_Implicit_5999<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(skippedSyntax));
            }
        }
        private ParseNamespaceBody(openBrace: { refObj: SyntaxToken }, body: { refObj: LanguageParser.NamespaceBodyBuilder }, initialBadNodes: { refObj: SyntaxListBaseBuilder }, parentKind: SyntaxKind): void {
            System.Diagnostics.Debug.Assert(!this.IsInAsync);
            var isGlobal: boolean = openBrace.refObj == null;
            var isGlobalScript: boolean = isGlobal && this.IsScript;
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsNamespaceMemberStartOrStop;
            var seen: LanguageParser.NamespaceParts = LanguageParser.NamespaceParts.None;
            var pendingIncompleteMembers = this.pool.Allocate<MemberDeclarationSyntax>();
            var reportUnexpectedToken: boolean = true;
            try
            {
                while (true) {
                    var __tSwitch93 = this.CurrentToken.Kind;
                    while (true) {
                        var __tDefault52 = false;
                        switch (__tSwitch93) {
                            case SyntaxKind.NamespaceKeyword:
                                var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                LanguageParser.AddIncompleteMembers(pendingIncompleteMembers_ref0, body);

                                pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                body.refObj.Members.Add(this.ParseNamespaceDeclaration());
                                seen = LanguageParser.NamespaceParts.MembersAndStatements;
                                reportUnexpectedToken = true;
                                break;
                            case SyntaxKind.CloseBraceToken:
                                if (isGlobal) {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    var token = this.EatToken_2098();
                                    token = this.AddError_1357(token, this.IsScript ? ErrorCode.ERR_GlobalDefinitionOrStatementExpected : ErrorCode.ERR_EOFExpected);
                                    this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, token);
                                    reportUnexpectedToken = true;
                                    break;
                                }
                                else {
                                    return
                                }
                            case SyntaxKind.EndOfFileToken:
                                return
                            case SyntaxKind.ExternKeyword:
                                if (isGlobalScript && !this.ScanExternAliasDirective()) {
                                    __tDefault52 = true; break;
                                }
                                else {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    var $extern = this.ParseExternAliasDirective();
                                    if (seen > LanguageParser.NamespaceParts.ExternAliases) {
                                        $extern = this.AddErrorToFirstToken_3098($extern, ErrorCode.ERR_ExternAfterElements);
                                        this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, $extern);
                                    }
                                    else {
                                        body.refObj.Externs.Add($extern);
                                        seen = LanguageParser.NamespaceParts.ExternAliases;
                                    }
                                    reportUnexpectedToken = true;
                                    break;
                                }
                            case SyntaxKind.UsingKeyword:
                                if (isGlobalScript && this.PeekToken(1).Kind == SyntaxKind.OpenParenToken) {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    LanguageParser.AddIncompleteMembers(pendingIncompleteMembers_ref0, body);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    body.refObj.Members.Add(this.syntaxFactory.GlobalStatement(this.ParseUsingStatement()));
                                    seen = LanguageParser.NamespaceParts.MembersAndStatements;
                                }
                                else {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    var $using = this.ParseUsingDirective();
                                    if (seen > LanguageParser.NamespaceParts.Usings) {
                                        $using = this.AddError_1357($using, ErrorCode.ERR_UsingAfterElements);
                                        this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, $using);
                                    }
                                    else {
                                        body.refObj.Usings.Add($using);
                                        seen = LanguageParser.NamespaceParts.Usings;
                                    }
                                }
                                reportUnexpectedToken = true;
                                break;
                            case SyntaxKind.OpenBracketToken:
                                if (this.IsPossibleGlobalAttributeDeclaration()) {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    var attribute = this.ParseAttributeDeclaration();
                                    if (!isGlobal || seen > LanguageParser.NamespaceParts.GlobalAttributes) {
                                        attribute = this.AddError_7816(attribute, attribute.Target.Identifier, ErrorCode.ERR_GlobalAttributesNotFirst);
                                        this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, attribute);
                                    }
                                    else {
                                        body.refObj.Attributes.Add(attribute);
                                        seen = LanguageParser.NamespaceParts.GlobalAttributes;
                                    }
                                    reportUnexpectedToken = true;
                                    break;
                                }
                                __tDefault52 = true; break;
                            default:
                                var memberOrStatement = this.ParseMemberDeclarationOrStatement(parentKind);
                                if (memberOrStatement == null) {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    var skippedToken = this.EatToken_2098();
                                    if (reportUnexpectedToken && !skippedToken.ContainsDiagnostics) {
                                        skippedToken = this.AddError_1357(skippedToken, this.IsScript ? ErrorCode.ERR_GlobalDefinitionOrStatementExpected : ErrorCode.ERR_EOFExpected);
                                        reportUnexpectedToken = false;
                                    }
                                    this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, skippedToken);
                                }
                                else if (memberOrStatement.Kind == SyntaxKind.IncompleteMember && seen < LanguageParser.NamespaceParts.MembersAndStatements) {
                                    pendingIncompleteMembers.Add(memberOrStatement);
                                    reportUnexpectedToken = true;
                                }
                                else {
                                    var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                    LanguageParser.AddIncompleteMembers(pendingIncompleteMembers_ref0, body);

                                    pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                    body.refObj.Members.Add(memberOrStatement);
                                    seen = LanguageParser.NamespaceParts.MembersAndStatements;
                                    reportUnexpectedToken = true;
                                }
                                break;
                        }


                        if (__tDefault52) {
                            var memberOrStatement = this.ParseMemberDeclarationOrStatement(parentKind);
                            if (memberOrStatement == null) {
                                var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                this.ReduceIncompleteMembers(pendingIncompleteMembers_ref0, openBrace, body, initialBadNodes);

                                pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                var skippedToken = this.EatToken_2098();
                                if (reportUnexpectedToken && !skippedToken.ContainsDiagnostics) {
                                    skippedToken = this.AddError_1357(skippedToken, this.IsScript ? ErrorCode.ERR_GlobalDefinitionOrStatementExpected : ErrorCode.ERR_EOFExpected);
                                    reportUnexpectedToken = false;
                                }
                                this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, skippedToken);
                            }
                            else if (memberOrStatement.Kind == SyntaxKind.IncompleteMember && seen < LanguageParser.NamespaceParts.MembersAndStatements) {
                                pendingIncompleteMembers.Add(memberOrStatement);
                                reportUnexpectedToken = true;
                            }
                            else {
                                var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                                LanguageParser.AddIncompleteMembers(pendingIncompleteMembers_ref0, body);

                                pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                                body.refObj.Members.Add(memberOrStatement);
                                seen = LanguageParser.NamespaceParts.MembersAndStatements;
                                reportUnexpectedToken = true;
                            }
                            break;
                        }

                        break;
                    }

                }
            }

            finally {
                this.termState = saveTerm;
                var pendingIncompleteMembers_ref0 = { refObj: pendingIncompleteMembers };
                LanguageParser.AddIncompleteMembers(pendingIncompleteMembers_ref0, body);

                pendingIncompleteMembers = pendingIncompleteMembers_ref0.refObj;;
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(pendingIncompleteMembers));
            }
        }
        private static AddIncompleteMembers(incompleteMembers: { refObj: SyntaxListBuilder<MemberDeclarationSyntax> }, body: { refObj: LanguageParser.NamespaceBodyBuilder }): void {
            if (incompleteMembers.refObj.Count > 0) {
                body.refObj.Members.AddRange_1067(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(incompleteMembers.refObj));
                incompleteMembers.refObj.Clear();
            }
        }
        private ReduceIncompleteMembers(incompleteMembers: { refObj: SyntaxListBuilder<MemberDeclarationSyntax> }, openBrace: { refObj: SyntaxToken }, body: { refObj: LanguageParser.NamespaceBodyBuilder }, initialBadNodes: { refObj: SyntaxListBaseBuilder }): void {
            for (var i: number = 0; i < incompleteMembers.refObj.Count; i++) {
                this.AddSkippedNamespaceText(openBrace, body, initialBadNodes, incompleteMembers.refObj.$get$(i));
            }
            incompleteMembers.refObj.Clear();
        }
        private IsPossibleNamespaceMemberDeclaration(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.ExternKeyword:
                case SyntaxKind.UsingKeyword:
                case SyntaxKind.NamespaceKeyword:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsPartialInNamespaceMemberDeclaration();
                default:
                    return LanguageParser.IsPossibleStartOfTypeDeclaration(this.CurrentToken.Kind);
            }
        }
        private IsPartialInNamespaceMemberDeclaration(): boolean {
            if (this.CurrentToken.ContextualKind == SyntaxKind.PartialKeyword) {
                if (this.IsPartialType()) {
                    return true;
                }
                else if (this.PeekToken(1).Kind == SyntaxKind.NamespaceKeyword) {
                    return true;
                }
            }
            return false;
        }
        public IsEndOfNamespace(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseBraceToken;
        }
        public IsGobalAttributesTerminator(): boolean {
            return this.IsEndOfNamespace() || this.IsPossibleNamespaceMemberDeclaration();
        }
        private IsNamespaceMemberStartOrStop(): boolean {
            return this.IsEndOfNamespace() || this.IsPossibleNamespaceMemberDeclaration();
        }
        private ScanExternAliasDirective(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.ExternKeyword && this.PeekToken(1).Kind == SyntaxKind.IdentifierToken && this.PeekToken(1).ContextualKind == SyntaxKind.AliasKeyword && this.PeekToken(2).Kind == SyntaxKind.IdentifierToken && this.PeekToken(3).Kind == SyntaxKind.SemicolonToken;
        }
        private ParseExternAliasDirective(): ExternAliasDirectiveSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.ExternAliasDirective) {
                return <ExternAliasDirectiveSyntax>this.EatNode();
            }
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ExternKeyword);
            var externToken = this.EatToken_1865(SyntaxKind.ExternKeyword);
            var aliasToken = this.EatContextualToken_1181(SyntaxKind.AliasKeyword);
            externToken = this.CheckFeatureAvailability(externToken, MessageID.IDS_FeatureExternAlias);
            var name = this.ParseIdentifierToken();
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.ExternAliasDirective(externToken, aliasToken, name, semicolon);
        }
        private ParseNameEquals(warnOnGlobal: boolean = false): NameEqualsSyntax {
            System.Diagnostics.Debug.Assert(this.IsNamedAssignment());
            var id = this.ParseIdentifierToken();
            var equals = this.EatToken_1865(SyntaxKind.EqualsToken);
            if (warnOnGlobal && LanguageParser.IsNameGlobal(id)) {
                id = this.AddError_1357(id, ErrorCode.WRN_GlobalAliasDefn);
            }
            return this.syntaxFactory.NameEquals(this.syntaxFactory.IdentifierName(id), equals);
        }
        private ParseUsingDirective(): UsingDirectiveSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.UsingDirective) {
                return <UsingDirectiveSyntax>this.EatNode();
            }
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.UsingKeyword);
            var usingToken = this.EatToken_1865(SyntaxKind.UsingKeyword);
            var staticToken = null;
            if (this.CurrentToken.Kind == SyntaxKind.StaticKeyword) {
                staticToken = this.EatToken_1865(SyntaxKind.StaticKeyword);
            }
            var alias: NameEqualsSyntax = null;
            if (this.IsNamedAssignment()) {
                alias = this.ParseNameEquals(/*warnOnGlobal:*/true);
            }
            var name: NameSyntax;
            var semicolon: SyntaxToken;
            if (this.IsPossibleNamespaceMemberDeclaration()) {
                name = this.WithAdditionalDiagnostics(this.CreateMissingIdentifierName(), this.GetExpectedTokenError_2124(SyntaxKind.IdentifierToken, this.CurrentToken.Kind));
                semicolon = SyntaxFactory.MissingToken_7070(SyntaxKind.SemicolonToken);
            }
            else {
                name = this.ParseQualifiedName();
                if (name.IsMissing && this.PeekToken(1).Kind == SyntaxKind.SemicolonToken) {
                    name = this.AddTrailingSkippedSyntax(name, this.EatToken_2098());
                }
                semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            var usingDirective = this.syntaxFactory.UsingDirective(usingToken, staticToken, alias, name, semicolon);
            if (staticToken != null) {
                usingDirective = this.CheckFeatureAvailability(usingDirective, MessageID.IDS_FeatureUsingStatic);
            }
            return usingDirective;
        }
        private IsPossibleGlobalAttributeDeclaration(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.OpenBracketToken && LanguageParser.IsGlobalAttributeTarget(this.PeekToken(1)) && this.PeekToken(2).Kind == SyntaxKind.ColonToken;
        }
        private static IsGlobalAttributeTarget(token: SyntaxToken): boolean {
            switch (Symbols.AttributeLocationExtensions.ToAttributeLocation_8655_NS(token)) {
                case Symbols.AttributeLocation.Assembly:
                case Symbols.AttributeLocation.Module:
                    return true;
                default:
                    return false;
            }
        }
        private IsPossibleAttributeDeclaration(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.OpenBracketToken;
        }
        private ParseAttributeDeclarations(list: SyntaxListBaseBuilder, allowAttributes: boolean = true): void {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsAttributeDeclarationTerminator;
            while (this.IsPossibleAttributeDeclaration()) {
                var section = this.ParseAttributeDeclaration();
                if (!allowAttributes) {
                    section = this.AddError_1357(section, ErrorCode.ERR_AttributesNotAllowed);
                }
                list.Add(section);
            }
            this.termState = saveTerm;
        }
        private IsAttributeDeclarationTerminator(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseBracketToken || this.IsPossibleAttributeDeclaration();
        }
        private ParseAttributeDeclaration(): AttributeListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.AttributeList) {
                return <AttributeListSyntax>this.EatNode();
            }
            var openBracket = this.EatToken_1865(SyntaxKind.OpenBracketToken);
            var attrLocation: AttributeTargetSpecifierSyntax = null;
            if (LanguageParser.IsSomeWord(this.CurrentToken.Kind) && this.PeekToken(1).Kind == SyntaxKind.ColonToken) {
                var id = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                var colon = this.EatToken_1865(SyntaxKind.ColonToken);
                attrLocation = this.syntaxFactory.AttributeTargetSpecifier(id, colon);
            }
            var attributes = this.pool.AllocateSeparated<AttributeSyntax>();
            try
            {
                if (attrLocation != null && Symbols.AttributeLocationExtensions.ToAttributeLocation_8655_NS(attrLocation.Identifier) == Symbols.AttributeLocation.Module) {
                    attrLocation = this.CheckFeatureAvailability(attrLocation, MessageID.IDS_FeatureModuleAttrLoc);
                }
                this.ParseAttributes(attributes);
                var closeBracket = this.EatToken_1865(SyntaxKind.CloseBracketToken);
                var declaration = this.syntaxFactory.AttributeList(openBracket, attrLocation, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeSyntax>(attributes), closeBracket);
                return declaration;
            }

            finally {
                this.pool.Free_2078(attributes);
            }
        }
        private ParseAttributes(nodes: SeparatedSyntaxListBuilder<AttributeSyntax>): void {
            nodes.Add(this.ParseAttribute());
            while (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                    nodes.AddSeparator(this.EatToken_2098());
                    if (this.CurrentToken.Kind == SyntaxKind.CloseBracketToken) {
                        break;
                    }
                    nodes.Add(this.ParseAttribute());
                }
                else if (this.IsPossibleAttribute()) {
                    nodes.AddSeparator(SyntaxFactory.MissingToken_7070(SyntaxKind.CommaToken));
                    nodes.Add(this.ParseAttribute());
                }
                else if (this.SkipBadAttributeListTokens(nodes, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Abort) {
                    break;
                }
            }
        }
        private SkipBadAttributeListTokens(list: SeparatedSyntaxListBuilder<AttributeSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp: SyntaxToken = null;
            var tmp_ref0 = { refObj: tmp };
            var ret_val__543 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleAttribute(), p => p.CurrentToken.Kind == SyntaxKind.CloseBracketToken || p.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__543;
        }
        private IsPossibleAttribute(): boolean {
            return this.IsTrueIdentifier();
        }
        private ParseAttribute(): AttributeSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.Attribute) {
                return <AttributeSyntax>this.EatNode();
            }
            var name = this.ParseQualifiedName();
            var argList = this.ParseAttributeArgumentList();
            return this.syntaxFactory.Attribute(name, argList);
        }
        public ParseAttributeArgumentList(): AttributeArgumentListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.AttributeArgumentList) {
                return <AttributeArgumentListSyntax>this.EatNode();
            }
            var argList: AttributeArgumentListSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
                var argNodes = this.pool.AllocateSeparated<AttributeArgumentSyntax>();
                try
                {
                    var shouldHaveName: boolean = false;
                    tryAgain:
                    while (true) {

                        if (this.CurrentToken.Kind != SyntaxKind.CloseParenToken) {
                            if (this.IsPossibleAttributeArgument() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                                argNodes.Add((() => {
                                    var shouldHaveName_ref0 = { refObj: shouldHaveName };
                                    var ret_val__388 = this.ParseAttributeArgument(shouldHaveName_ref0);

                                    shouldHaveName = shouldHaveName_ref0.refObj;
                                    return ret_val__388;
                                })());
                                while (true) {
                                    if (this.CurrentToken.Kind == SyntaxKind.CloseParenToken) {
                                        break;
                                    }
                                    else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleAttributeArgument()) {
                                        argNodes.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                        argNodes.Add((() => {
                                            var shouldHaveName_ref0 = { refObj: shouldHaveName };
                                            var ret_val__7 = this.ParseAttributeArgument(shouldHaveName_ref0);

                                            shouldHaveName = shouldHaveName_ref0.refObj;
                                            return ret_val__7;
                                        })());
                                    }
                                    else if ((() => {
                                        var openParen_ref0 = { refObj: openParen };
                                        var ret_val__494 = this.SkipBadAttributeArgumentTokens(openParen_ref0, argNodes, SyntaxKind.CommaToken);

                                        openParen = openParen_ref0.refObj;
                                        return ret_val__494;
                                    })() == LanguageParser.PostSkipAction.Abort) {
                                        break;
                                    }
                                }
                            }
                            else if ((() => {
                                var openParen_ref0 = { refObj: openParen };
                                var ret_val__809 = this.SkipBadAttributeArgumentTokens(openParen_ref0, argNodes, SyntaxKind.IdentifierToken);

                                openParen = openParen_ref0.refObj;
                                return ret_val__809;
                            })() == LanguageParser.PostSkipAction.Continue) {
                                continue tryAgain;
                            }
                        } break;
                    }
                    var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                    argList = this.syntaxFactory.AttributeArgumentList(openParen, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeArgumentSyntax>(argNodes), closeParen);
                }

                finally {
                    this.pool.Free_2078(argNodes);
                }
            }
            return argList;
        }
        private SkipBadAttributeArgumentTokens(openParen: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<AttributeArgumentSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(openParen, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleAttributeArgument(), p => p.CurrentToken.Kind == SyntaxKind.CloseParenToken || p.IsTerminator(), expected);
        }
        private IsPossibleAttributeArgument(): boolean {
            return this.IsPossibleExpression();
        }
        private ParseAttributeArgument(shouldHaveName: { refObj: boolean }): AttributeArgumentSyntax {
            var nameEquals: NameEqualsSyntax = null;
            var nameColon: NameColonSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                var nextTokenKind: SyntaxKind = this.PeekToken(1).Kind;
                switch (nextTokenKind) {
                    case SyntaxKind.EqualsToken:
                        {
                            var name = this.ParseIdentifierToken();
                            var equals = this.EatToken_1865(SyntaxKind.EqualsToken);
                            nameEquals = this.syntaxFactory.NameEquals(this.syntaxFactory.IdentifierName(name), equals);
                            shouldHaveName.refObj = true;
                        }
                        break;
                    case SyntaxKind.ColonToken:
                        {
                            var name1 = this.ParseIdentifierName();
                            var colonToken = this.EatToken_1865(SyntaxKind.ColonToken);
                            nameColon = this.syntaxFactory.NameColon(name1, colonToken);
                            nameColon = this.CheckFeatureAvailability(nameColon, MessageID.IDS_FeatureNamedArgument);
                        }
                        break;
                }
            }
            var expr = this.ParseExpression();
            if (shouldHaveName.refObj && nameEquals == null) {
                expr = this.AddError_1357(expr, ErrorCode.ERR_NamedArgumentExpected);
            }
            return this.syntaxFactory.AttributeArgument(nameEquals, nameColon, expr);
        }
        private static AccessModifiers: LanguageParser.SyntaxModifier = LanguageParser.SyntaxModifier.Public | LanguageParser.SyntaxModifier.Internal | LanguageParser.SyntaxModifier.Protected | LanguageParser.SyntaxModifier.Private;
        private static GetModifier(token: SyntaxToken): LanguageParser.SyntaxModifier {
            var __tSwitch67 = token.Kind;
            while (true) {
                var __tDefault66 = false;
                switch (__tSwitch67) {
                    case SyntaxKind.PublicKeyword:
                        return LanguageParser.SyntaxModifier.Public;
                    case SyntaxKind.InternalKeyword:
                        return LanguageParser.SyntaxModifier.Internal;
                    case SyntaxKind.ProtectedKeyword:
                        return LanguageParser.SyntaxModifier.Protected;
                    case SyntaxKind.PrivateKeyword:
                        return LanguageParser.SyntaxModifier.Private;
                    case SyntaxKind.SealedKeyword:
                        return LanguageParser.SyntaxModifier.Sealed;
                    case SyntaxKind.AbstractKeyword:
                        return LanguageParser.SyntaxModifier.Abstract;
                    case SyntaxKind.StaticKeyword:
                        return LanguageParser.SyntaxModifier.Static;
                    case SyntaxKind.VirtualKeyword:
                        return LanguageParser.SyntaxModifier.Virtual;
                    case SyntaxKind.ExternKeyword:
                        return LanguageParser.SyntaxModifier.Extern;
                    case SyntaxKind.NewKeyword:
                        return LanguageParser.SyntaxModifier.New;
                    case SyntaxKind.OverrideKeyword:
                        return LanguageParser.SyntaxModifier.Override;
                    case SyntaxKind.ReadOnlyKeyword:
                        return LanguageParser.SyntaxModifier.ReadOnly;
                    case SyntaxKind.VolatileKeyword:
                        return LanguageParser.SyntaxModifier.Volatile;
                    case SyntaxKind.UnsafeKeyword:
                        return LanguageParser.SyntaxModifier.Unsafe;
                    case SyntaxKind.IdentifierToken:
                        switch (token.ContextualKind) {
                            case SyntaxKind.PartialKeyword:
                                return LanguageParser.SyntaxModifier.Partial;
                            case SyntaxKind.AsyncKeyword:
                                return LanguageParser.SyntaxModifier.Async;
                        }
                        __tDefault66 = true; break;
                    default:
                        return LanguageParser.SyntaxModifier.None;
                }


                if (__tDefault66) {
                    return LanguageParser.SyntaxModifier.None;
                }

                break;
            }

        }
        private static GetFieldModifier(token: SyntaxToken): LanguageParser.SyntaxModifier {
            switch (token.Kind) {
                case SyntaxKind.PublicKeyword:
                    return LanguageParser.SyntaxModifier.Public;
                case SyntaxKind.InternalKeyword:
                    return LanguageParser.SyntaxModifier.Internal;
                case SyntaxKind.ProtectedKeyword:
                    return LanguageParser.SyntaxModifier.Protected;
                case SyntaxKind.PrivateKeyword:
                    return LanguageParser.SyntaxModifier.Private;
                case SyntaxKind.StaticKeyword:
                    return LanguageParser.SyntaxModifier.Static;
                case SyntaxKind.NewKeyword:
                    return LanguageParser.SyntaxModifier.New;
                case SyntaxKind.ReadOnlyKeyword:
                    return LanguageParser.SyntaxModifier.ReadOnly;
                case SyntaxKind.VolatileKeyword:
                    return LanguageParser.SyntaxModifier.Volatile;
                default:
                    return LanguageParser.SyntaxModifier.None;
            }
        }
        private IsPossibleModifier(): boolean {
            return LanguageParser.GetModifier(this.CurrentToken) != LanguageParser.SyntaxModifier.None;
        }
        private ParseModifiers(tokens: SyntaxListBaseBuilder): void {
            var mods: LanguageParser.SyntaxModifier = 0;
            var seenNoDuplicates: boolean = true;
            var seenNoAccessibilityDuplicates: boolean = true;
            while (true) {
                var newMod = LanguageParser.GetModifier(this.CurrentToken);
                if (newMod == LanguageParser.SyntaxModifier.None) {
                    break;
                }
                var modTok: SyntaxToken;
                var __tSwitch41 = newMod;
                while (true) {
                    var __tDefault89 = false;
                    switch (__tSwitch41) {
                        case LanguageParser.SyntaxModifier.Partial:
                            {
                                var nextToken = this.PeekToken(1);
                                if (this.IsPartialType()) {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.CheckFeatureAvailability(modTok, MessageID.IDS_FeaturePartialTypes);
                                }
                                else if (this.IsPartialMember()) {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.CheckFeatureAvailability(modTok, MessageID.IDS_FeaturePartialMethod);
                                }
                                else if (nextToken.Kind == SyntaxKind.NamespaceKeyword) {
                                    __tDefault89 = true; break;
                                }
                                else if (nextToken.Kind == SyntaxKind.EnumKeyword || nextToken.Kind == SyntaxKind.DelegateKeyword) {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.AddError_1357(modTok, ErrorCode.ERR_PartialMisplaced);
                                }
                                else if (!LanguageParser.IsPossibleStartOfTypeDeclaration(nextToken.Kind) || LanguageParser.GetModifier(nextToken) == LanguageParser.SyntaxModifier.None) {
                                    return
                                }
                                else {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.AddError_1357(modTok, ErrorCode.ERR_PartialMisplaced);
                                }
                                break;
                            }
                        case LanguageParser.SyntaxModifier.Async:
                            {
                                var nextToken = this.PeekToken(1);
                                if (LanguageParser.GetModifier(nextToken) != LanguageParser.SyntaxModifier.None && !SyntaxFacts.IsContextualKeyword(nextToken.ContextualKind)) {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.CheckFeatureAvailability(modTok, MessageID.IDS_FeatureAsync);
                                    break;
                                }
                                var isModifier: boolean = false;
                                {
                                    var resetPoint: LanguageParser.ResetPointLanguageParser = this.GetResetPoint_LanguageParser();
                                    this.EatToken_2098();
                                    if (this.CurrentToken.ContextualKind == SyntaxKind.PartialKeyword) {
                                        this.EatToken_2098();
                                    }
                                    var currToken: SyntaxToken = this.CurrentToken;
                                    if (LanguageParser.IsPossibleStartOfTypeDeclaration(currToken.Kind) || currToken.Kind == SyntaxKind.EventKeyword || ((currToken.Kind == SyntaxKind.ExplicitKeyword || currToken.Kind == SyntaxKind.ImplicitKeyword) && this.PeekToken(1).Kind == SyntaxKind.OperatorKeyword) || (this.ScanType_7309() != LanguageParser.ScanTypeFlags.NotType && (this.CurrentToken.Kind == SyntaxKind.OperatorKeyword || this.IsPossibleMemberName()))) {
                                        isModifier = true;
                                    }
                                    var resetPoint_ref0 = { refObj: resetPoint };
                                    this.Reset_LanguageParser(resetPoint_ref0);

                                    resetPoint = resetPoint_ref0.refObj;;
                                    var resetPoint_ref0 = { refObj: resetPoint };
                                    this.Release_LanguageParser(resetPoint_ref0);

                                    resetPoint = resetPoint_ref0.refObj;;
                                }
                                if (isModifier) {
                                    modTok = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                                    modTok = this.CheckFeatureAvailability(modTok, MessageID.IDS_FeatureAsync);
                                    break;
                                }
                                else {
                                    return
                                }
                            }
                        default:
                            {
                                modTok = this.EatToken_2098();
                                break;
                            }
                    }


                    if (__tDefault89) {
                        {
                            modTok = this.EatToken_2098();
                            break;
                        }
                    }

                    break;
                }

                var modTok_ref0 = { refObj: modTok };
                var seenNoDuplicates_ref1 = { refObj: seenNoDuplicates };
                var seenNoAccessibilityDuplicates_ref2 = { refObj: seenNoAccessibilityDuplicates };
                this.ReportDuplicateModifiers(modTok_ref0, newMod, mods, seenNoDuplicates_ref1, seenNoAccessibilityDuplicates_ref2);

                modTok = modTok_ref0.refObj;

                seenNoDuplicates = seenNoDuplicates_ref1.refObj;

                seenNoAccessibilityDuplicates = seenNoAccessibilityDuplicates_ref2.refObj;;
                mods |= newMod;
                tokens.Add(modTok);
            }
        }
        private ReportDuplicateModifiers(modTok: { refObj: SyntaxToken }, newMod: LanguageParser.SyntaxModifier, mods: LanguageParser.SyntaxModifier, seenNoDuplicates: { refObj: boolean }, seenNoAccessibilityDuplicates: { refObj: boolean }): void {
            if ((mods & newMod) != 0) {
                if (seenNoDuplicates.refObj) {
                    modTok.refObj = this.AddError_7870(modTok.refObj, ErrorCode.ERR_DuplicateModifier, SyntaxFacts.GetText_3915(modTok.refObj.Kind));
                    seenNoDuplicates.refObj = false;
                }
            }
            else {
                if ((mods & LanguageParser.AccessModifiers) != 0 && (newMod & LanguageParser.AccessModifiers) != 0) {
                    if (!(((newMod == LanguageParser.SyntaxModifier.Protected) && (mods & LanguageParser.SyntaxModifier.Internal) != 0) || ((newMod == LanguageParser.SyntaxModifier.Internal) && (mods & LanguageParser.SyntaxModifier.Protected) != 0))) {
                        if (seenNoAccessibilityDuplicates.refObj) {
                            modTok.refObj = this.AddError_1357(modTok.refObj, ErrorCode.ERR_BadMemberProtection);
                        }
                        seenNoAccessibilityDuplicates.refObj = false;
                    }
                }
            }
        }
        private IsPartialType(): boolean {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.PartialKeyword);
            switch (this.PeekToken(1).Kind) {
                case SyntaxKind.StructKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.InterfaceKeyword:
                    return true;
            }
            return false;
        }
        private IsPartialMember(): boolean {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.PartialKeyword);
            var point = this.GetResetPoint_LanguageParser();
            try
            {
                this.EatToken_2098();
                if (this.ScanType_7309() == LanguageParser.ScanTypeFlags.NotType) {
                    return false;
                }
                return this.IsPossibleMemberName();
            }

            finally {
                var point_ref0 = { refObj: point };
                this.Reset_LanguageParser(point_ref0);

                point = point_ref0.refObj;;
                var point_ref0 = { refObj: point };
                this.Release_LanguageParser(point_ref0);

                point = point_ref0.refObj;;
            }
        }
        private IsPossibleMemberName(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.IdentifierToken:
                case SyntaxKind.ThisKeyword:
                    return true;
                default:
                    return false;
            }
        }
        private static CanReuseTypeDeclaration(member: CSharp.Syntax.MemberDeclarationSyntax): boolean {
            if (member != null) {
                switch (member.Kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.StructDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.DelegateDeclaration:
                        return true;
                }
            }
            return false;
        }
        private ParseTypeDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): MemberDeclarationSyntax {
            System.Diagnostics.Debug.Assert(!this.IsInAsync);
            this.cancellationToken.ThrowIfCancellationRequested();
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.ClassKeyword:
                    for (var i: number = 0, n = modifiers.Count; i < n; i++) {
                        if (modifiers.$get$(i).Kind == SyntaxKind.StaticKeyword) {
                            modifiers.$set$(i, this.CheckFeatureAvailability(modifiers.$get$(i), MessageID.IDS_FeatureStaticClasses));
                        }
                    }
                    return this.ParseClassOrStructOrInterfaceDeclaration(attributes, modifiers);
                case SyntaxKind.StructKeyword:
                case SyntaxKind.InterfaceKeyword:
                    return this.ParseClassOrStructOrInterfaceDeclaration(attributes, modifiers);
                case SyntaxKind.DelegateKeyword:
                    return this.ParseDelegateDeclaration(attributes, modifiers);
                case SyntaxKind.EnumKeyword:
                    return this.ParseEnumDeclaration(attributes, modifiers);
                default:
                    throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(this.CurrentToken.Kind);
            }
        }
        private static IsMissingName(name: NameSyntax): boolean {
            return name.Kind == SyntaxKind.IdentifierName && (<IdentifierNameSyntax>name).Identifier.IsMissing;
        }
        private ParseClassOrStructOrInterfaceDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): TypeDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ClassKeyword || this.CurrentToken.Kind == SyntaxKind.StructKeyword || this.CurrentToken.Kind == SyntaxKind.InterfaceKeyword);
            System.Diagnostics.Debug.Assert(!this.IsInAsync);
            var classOrStructOrInterface = this.EatToken_2098();
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsPossibleAggregateClauseStartOrStop;
            var name = this.ParseIdentifierToken();
            var typeParameters = this.ParseTypeParameterList(/*allowVariance:*/classOrStructOrInterface.Kind == SyntaxKind.InterfaceKeyword);
            this.termState = saveTerm;
            var hasTypeParams: boolean = typeParameters != null;
            var baseList = this.ParseBaseList();
            var parseMembers: boolean = true;
            var members: SyntaxListBuilder<MemberDeclarationSyntax> = <SyntaxListBuilder<MemberDeclarationSyntax>> structDefault(SyntaxListBuilder);
            var constraints = <SyntaxListBuilder<TypeParameterConstraintClauseSyntax>> structDefault(SyntaxListBuilder);
            try
            {
                if (this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                    constraints = this.pool.Allocate<TypeParameterConstraintClauseSyntax>();
                    this.ParseTypeParameterConstraintClauses(hasTypeParams, SyntaxListBuilder.op_Implicit_1734(constraints));
                }
                var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
                if (name.IsMissing || openBrace.IsMissing) {
                    parseMembers = false;
                }
                if (parseMembers) {
                    members = this.pool.Allocate<MemberDeclarationSyntax>();
                    while (true) {
                        var kind: SyntaxKind = this.CurrentToken.Kind;
                        if (LanguageParser.CanStartMember(kind)) {
                            var saveTerm2 = this.termState;
                            this.termState |= LanguageParser.TerminatorState.IsPossibleMemberStartOrStop;
                            var memberOrStatement = this.ParseMemberDeclarationOrStatement(kind, name.ValueText);
                            if (memberOrStatement != null) {
                                members.Add(memberOrStatement);
                            }
                            else {
                                var openBrace_ref0 = { refObj: openBrace };
                                this.SkipBadMemberListTokens_9151(openBrace_ref0, SyntaxListBuilder.op_Implicit_1734(members));

                                openBrace = openBrace_ref0.refObj;;
                            }
                            this.termState = saveTerm2;
                        }
                        else if (kind == SyntaxKind.CloseBraceToken || kind == SyntaxKind.EndOfFileToken || this.IsTerminator()) {
                            break;
                        }
                        else {
                            var openBrace_ref0 = { refObj: openBrace };
                            this.SkipBadMemberListTokens_9151(openBrace_ref0, SyntaxListBuilder.op_Implicit_1734(members));

                            openBrace = openBrace_ref0.refObj;;
                        }
                    }
                }
                var closeBrace: SyntaxToken;
                if (openBrace.IsMissing) {
                    closeBrace = SyntaxFactory.MissingToken_7070(SyntaxKind.CloseBraceToken);
                    closeBrace = this.WithAdditionalDiagnostics(closeBrace, this.GetExpectedTokenError_2124(SyntaxKind.CloseBraceToken, this.CurrentToken.Kind));
                }
                else {
                    closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                }
                var semicolon: SyntaxToken = null;
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    semicolon = this.EatToken_2098();
                }
                switch (classOrStructOrInterface.Kind) {
                    case SyntaxKind.ClassKeyword:
                        return this.syntaxFactory.ClassDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), classOrStructOrInterface, name, typeParameters, baseList, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraints), openBrace, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members), closeBrace, semicolon);
                    case SyntaxKind.StructKeyword:
                        return this.syntaxFactory.StructDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), classOrStructOrInterface, name, typeParameters, baseList, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraints), openBrace, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members), closeBrace, semicolon);
                    case SyntaxKind.InterfaceKeyword:
                        return this.syntaxFactory.InterfaceDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), classOrStructOrInterface, name, typeParameters, baseList, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraints), openBrace, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members), closeBrace, semicolon);
                    default:
                        throw Roslyn.Utilities.ExceptionUtilities.UnexpectedValue(classOrStructOrInterface.Kind);
                }
            }

            finally {
                if (!members.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(members));
                }
                if (!constraints.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(constraints));
                }
            }
        }
        private SkipBadMemberListTokens_9151(openBrace: { refObj: SyntaxToken }, members: SyntaxListBaseBuilder): void {
            if (members.Count > 0) {
                var tmp: CSharpSyntaxNode = members.$get$(members.Count - 1);
                var tmp_ref0 = { refObj: tmp };
                this.SkipBadMemberListTokens_1812(tmp_ref0);

                tmp = tmp_ref0.refObj;;
                members.$set$(members.Count - 1, tmp);
            }
            else {
                var tmp: CSharpSyntaxNode = openBrace.refObj;
                var tmp_ref0 = { refObj: tmp };
                this.SkipBadMemberListTokens_1812(tmp_ref0);

                tmp = tmp_ref0.refObj;;
                openBrace.refObj = <SyntaxToken>tmp;
            }
        }
        private SkipBadMemberListTokens_1812(previousNode: { refObj: CSharpSyntaxNode }): void {
            var curlyCount: number = 0;
            var tokens = this.pool.AllocateBase();
            try
            {
                var done: boolean = false;
                while (!done) {
                    var kind: SyntaxKind = this.CurrentToken.Kind;
                    if (LanguageParser.CanStartMember(kind) && !(kind == SyntaxKind.DelegateKeyword && (this.PeekToken(1).Kind == SyntaxKind.OpenBraceToken || this.PeekToken(1).Kind == SyntaxKind.OpenParenToken))) {
                        done = true;
                        continue;
                    }
                    switch (kind) {
                        case SyntaxKind.OpenBraceToken:
                            curlyCount++;
                            break;
                        case SyntaxKind.CloseBraceToken:
                            if (curlyCount-- == 0) {
                                done = true;
                                continue;
                            }
                            break;
                        case SyntaxKind.EndOfFileToken:
                            done = true;
                            continue;
                        default:
                            break;
                    }
                    var token = this.EatToken_2098();
                    if (tokens.Count == 0) {
                        token = this.AddError_7870(token, ErrorCode.ERR_InvalidMemberDecl, token.Text);
                    }
                    tokens.Add(token);
                }
                previousNode.refObj = this.AddTrailingSkippedSyntax(previousNode.refObj, tokens.ToListNode());
            }

            finally {
                this.pool.Free_1631(tokens);
            }
        }
        private IsPossibleMemberStartOrStop(): boolean {
            return this.IsPossibleMemberStart() || this.CurrentToken.Kind == SyntaxKind.CloseBraceToken;
        }
        private IsPossibleAggregateClauseStartOrStop(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.ColonToken || this.IsPossibleTypeParameterConstraintClauseStart() || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken;
        }
        private ParseBaseList(): BaseListSyntax {
            if (this.CurrentToken.Kind != SyntaxKind.ColonToken) {
                return null;
            }
            var colon = this.EatToken_2098();
            var list = this.pool.AllocateSeparated<BaseTypeSyntax>();
            try
            {
                if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                    list.Add(this.syntaxFactory.SimpleBaseType(this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_TypeExpected)));
                }
                else {
                    var firstType: TypeSyntax = this.ParseDeclarationType(/*isConstraint:*/false,/*parentIsParameter:*/false);
                    list.Add(this.syntaxFactory.SimpleBaseType(firstType));
                    while (true) {
                        if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.IsPossibleTypeParameterConstraintClauseStart()) {
                            break;
                        }
                        else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleType()) {
                            list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                            if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                                list.Add(this.syntaxFactory.SimpleBaseType(this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_TypeExpected)));
                            }
                            else {
                                list.Add(this.syntaxFactory.SimpleBaseType(this.ParseDeclarationType(/*isConstraint:*/false,/*parentIsParameter:*/false)));
                            }
                            continue;
                        }
                        else if ((() => {
                            var colon_ref0 = { refObj: colon };
                            var ret_val__242 = this.SkipBadBaseListTokens(colon_ref0, list, SyntaxKind.CommaToken);

                            colon = colon_ref0.refObj;
                            return ret_val__242;
                        })() == LanguageParser.PostSkipAction.Abort) {
                            break;
                        }
                    }
                }
                return this.syntaxFactory.BaseList(colon, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseTypeSyntax>(list));
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private SkipBadBaseListTokens(colon: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<BaseTypeSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(colon, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleAttribute(), p => p.CurrentToken.Kind == SyntaxKind.OpenBraceToken || p.IsPossibleTypeParameterConstraintClauseStart() || p.IsTerminator(), expected);
        }
        private IsPossibleTypeParameterConstraintClauseStart(): boolean {
            return this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword && this.PeekToken(1).Kind == SyntaxKind.IdentifierToken && this.PeekToken(2).Kind == SyntaxKind.ColonToken;
        }
        private ParseTypeParameterConstraintClauses(isAllowed: boolean, list: SyntaxListBaseBuilder): void {
            while (this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                var constraint = this.ParseTypeParameterConstraintClause();
                if (!isAllowed) {
                    constraint = this.AddErrorToFirstToken_3098(constraint, ErrorCode.ERR_ConstraintOnlyAllowedOnGenericDecl);
                    isAllowed = true;
                }
                list.Add(constraint);
            }
        }
        private ParseTypeParameterConstraintClause(): TypeParameterConstraintClauseSyntax {
            var where = this.EatContextualToken_1181(SyntaxKind.WhereKeyword);
            var name = (this.IsPossibleTypeParameterConstraintClauseStart() || !this.IsTrueIdentifier()) ? this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_IdentifierExpected) : this.ParseIdentifierName();
            var colon = this.EatToken_1865(SyntaxKind.ColonToken);
            var bounds = this.pool.AllocateSeparated<TypeParameterConstraintSyntax>();
            try
            {
                var isStruct: boolean = false;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.IsPossibleTypeParameterConstraintClauseStart()) {
                    bounds.Add(this.syntaxFactory.TypeConstraint(this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_TypeExpected)));
                }
                else {
                    bounds.Add((() => {
                        var isStruct_ref0 = { refObj: isStruct };
                        var ret_val__642 = this.ParseTypeParameterConstraint(true, isStruct_ref0);

                        isStruct = isStruct_ref0.refObj;
                        return ret_val__642;
                    })());
                    while (true) {
                        if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken || this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                            break;
                        }
                        else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleTypeParameterConstraint()) {
                            bounds.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                            if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                                bounds.Add(this.syntaxFactory.TypeConstraint(this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_TypeExpected)));
                                break;
                            }
                            else {
                                bounds.Add((() => {
                                    var isStruct_ref0 = { refObj: isStruct };
                                    var ret_val__633 = this.ParseTypeParameterConstraint(false, isStruct_ref0);

                                    isStruct = isStruct_ref0.refObj;
                                    return ret_val__633;
                                })());
                            }
                        }
                        else if (this.SkipBadTypeParameterConstraintTokens(bounds, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                            break;
                        }
                    }
                }
                return this.syntaxFactory.TypeParameterConstraintClause(where, name, colon, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintSyntax>(bounds));
            }

            finally {
                this.pool.Free_2078(bounds);
            }
        }
        private IsPossibleTypeParameterConstraint(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.NewKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.StructKeyword:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier();
                default:
                    return LanguageParser.IsPredefinedType(this.CurrentToken.Kind);
            }
        }
        private ParseTypeParameterConstraint(isFirst: boolean, isStruct: { refObj: boolean }): TypeParameterConstraintSyntax {
            var __tSwitch62 = this.CurrentToken.Kind;
            while (true) {

                switch (__tSwitch62) {
                    case SyntaxKind.NewKeyword:
                        var newToken = this.EatToken_2098();
                        if (isStruct.refObj) {
                            newToken = this.AddError_1357(newToken, ErrorCode.ERR_NewBoundWithVal);
                        }
                        var open = this.EatToken_1865(SyntaxKind.OpenParenToken);
                        var close = this.EatToken_1865(SyntaxKind.CloseParenToken);
                        if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                            newToken = this.AddError_1357(newToken, ErrorCode.ERR_NewBoundMustBeLast);
                        }
                        return this.syntaxFactory.ConstructorConstraint(newToken, open, close);
                    case SyntaxKind.StructKeyword:
                        isStruct.refObj = true;
                        __tSwitch62 = SyntaxKind.ClassKeyword; continue;
                    case SyntaxKind.ClassKeyword:
                        var token = this.EatToken_2098();
                        if (!isFirst) {
                            token = this.AddError_1357(token, ErrorCode.ERR_RefValBoundMustBeFirst);
                        }
                        return this.syntaxFactory.ClassOrStructConstraint(isStruct.refObj ? SyntaxKind.StructConstraint : SyntaxKind.ClassConstraint, token);
                    default:
                        var type = this.ParseDeclarationType(true, false);
                        return this.syntaxFactory.TypeConstraint(type);
                }


                break;
            }

        }
        private SkipBadTypeParameterConstraintTokens(list: SeparatedSyntaxListBuilder<TypeParameterConstraintSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var tmp: CSharpSyntaxNode = null;
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp_ref0 = { refObj: tmp };
            var ret_val__51 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => this.CurrentToken.Kind != SyntaxKind.CommaToken && !this.IsPossibleTypeParameterConstraint(), p => this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.IsPossibleTypeParameterConstraintClauseStart() || this.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__51;
        }
        private ParseDeclarationType(isConstraint: boolean, parentIsParameter: boolean): TypeSyntax {
            var type = this.ParseType(parentIsParameter);
            if (type.Kind != SyntaxKind.PredefinedType && !SyntaxFacts.IsName(type.Kind)) {
                if (isConstraint) {
                    type = this.AddError_1357(type, ErrorCode.ERR_BadConstraintType);
                }
                else {
                    type = this.AddError_1357(type, ErrorCode.ERR_BadBaseType);
                }
            }
            return type;
        }
        private IsPossibleMemberStart(): boolean {
            return LanguageParser.CanStartMember(this.CurrentToken.Kind);
        }
        private static CanStartMember(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.AbstractKeyword:
                case SyntaxKind.BoolKeyword:
                case SyntaxKind.ByteKeyword:
                case SyntaxKind.CharKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.DecimalKeyword:
                case SyntaxKind.DelegateKeyword:
                case SyntaxKind.DoubleKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.EventKeyword:
                case SyntaxKind.ExternKeyword:
                case SyntaxKind.FixedKeyword:
                case SyntaxKind.FloatKeyword:
                case SyntaxKind.IntKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.InternalKeyword:
                case SyntaxKind.LongKeyword:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.ObjectKeyword:
                case SyntaxKind.OverrideKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.ReadOnlyKeyword:
                case SyntaxKind.SByteKeyword:
                case SyntaxKind.SealedKeyword:
                case SyntaxKind.ShortKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.StructKeyword:
                case SyntaxKind.UIntKeyword:
                case SyntaxKind.ULongKeyword:
                case SyntaxKind.UnsafeKeyword:
                case SyntaxKind.UShortKeyword:
                case SyntaxKind.VirtualKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.VolatileKeyword:
                case SyntaxKind.IdentifierToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.ImplicitKeyword:
                case SyntaxKind.ExplicitKeyword:
                    return true;
                default:
                    return false;
            }
        }
        private static CanStartTypeDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.DelegateKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.StructKeyword:
                    return true;
                default:
                    return false;
            }
        }
        private static CanReuseMemberDeclaration(member: CSharp.Syntax.MemberDeclarationSyntax, typeName: string): boolean {
            if (member != null) {
                switch (member.Kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.StructDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.DelegateDeclaration:
                    case SyntaxKind.FieldDeclaration:
                    case SyntaxKind.EventFieldDeclaration:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.EventDeclaration:
                    case SyntaxKind.IndexerDeclaration:
                    case SyntaxKind.OperatorDeclaration:
                    case SyntaxKind.ConversionOperatorDeclaration:
                        return true;
                }
                var parent = LanguageParser.GetOldParent(member);
                var originalTypeDeclaration = __as__<CSharp.Syntax.TypeDeclarationSyntax>(parent, CSharp.Syntax.TypeDeclarationSyntax);
                if (originalTypeDeclaration != null) {
                    switch (member.Kind) {
                        case SyntaxKind.MethodDeclaration:
                            var methodDeclaration = <CSharp.Syntax.MethodDeclarationSyntax>member;
                            return methodDeclaration.Identifier.ValueText != typeName;
                        case SyntaxKind.ConstructorDeclaration:
                        case SyntaxKind.DestructorDeclaration:
                            return originalTypeDeclaration.Identifier.ValueText == typeName;
                    }
                }
            }
            return false;
        }
        private ParseMemberDeclarationOrStatement(parentKind: SyntaxKind, typeName: string = null): MemberDeclarationSyntax {
            System.Diagnostics.Debug.Assert(!this.IsInAsync);
            this.cancellationToken.ThrowIfCancellationRequested();
            var isGlobalScript: boolean = parentKind == SyntaxKind.CompilationUnit && this.IsScript;
            var acceptStatement: boolean = isGlobalScript;
            if (this.IsIncrementalAndFactoryContextMatches) {
                var member = __as__<CSharp.Syntax.MemberDeclarationSyntax>(this.CurrentNode, CSharp.Syntax.MemberDeclarationSyntax);
                if (LanguageParser.CanReuseMemberDeclaration(member, typeName) || LanguageParser.CanReuseTypeDeclaration(member)) {
                    return <MemberDeclarationSyntax>this.EatNode();
                }
            }
            var attributes = this.pool.Allocate<AttributeListSyntax>();
            var modifiers = this.pool.AllocateBase();
            var saveTermState = this.termState;
            try
            {
                this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(attributes));
                if (attributes.Count > 0) {
                    acceptStatement = false;
                }
                if (acceptStatement) {
                    switch (this.CurrentToken.Kind) {
                        case SyntaxKind.UnsafeKeyword:
                            if (this.PeekToken(1).Kind == SyntaxKind.OpenBraceToken) {
                                return this.syntaxFactory.GlobalStatement(this.ParseUnsafeStatement());
                            }
                            break;
                        case SyntaxKind.FixedKeyword:
                            if (this.PeekToken(1).Kind == SyntaxKind.OpenParenToken) {
                                return this.syntaxFactory.GlobalStatement(this.ParseFixedStatement());
                            }
                            break;
                        case SyntaxKind.DelegateKeyword:
                            switch (this.PeekToken(1).Kind) {
                                case SyntaxKind.OpenParenToken:
                                case SyntaxKind.OpenBraceToken:
                                    return this.syntaxFactory.GlobalStatement(this.ParseExpressionStatement_1651());
                            }
                            break;
                        case SyntaxKind.NewKeyword:
                            if (this.IsPossibleNewExpression()) {
                                return this.syntaxFactory.GlobalStatement(this.ParseExpressionStatement_1651());
                            }
                            break;
                    }
                }
                this.ParseModifiers(modifiers);
                if (modifiers.Count > 0) {
                    acceptStatement = false;
                }
                if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken && this.PeekToken(1).Kind == SyntaxKind.OpenParenToken) {
                    if (!isGlobalScript && this.CurrentToken.ValueText == typeName) {
                        return this.ParseConstructorDeclaration(typeName, attributes, modifiers);
                    }
                    if (!acceptStatement) {
                        var token = SyntaxFactory.MissingToken_7070(SyntaxKind.VoidKeyword);
                        token = this.AddError_1357(token, ErrorCode.ERR_MemberNeedsType);
                        var voidType = this.syntaxFactory.PredefinedType(token);
                        var identifier = this.EatToken_2098();
                        return this.ParseMethodDeclaration(attributes, modifiers, voidType,/*explicitInterfaceOpt:*/null,/*identifier:*/identifier,/*typeParameterList:*/null);
                    }
                }
                if (!isGlobalScript && this.CurrentToken.Kind == SyntaxKind.TildeToken) {
                    return this.ParseDestructorDeclaration(typeName, attributes, modifiers);
                }
                if (this.CurrentToken.Kind == SyntaxKind.ConstKeyword) {
                    return this.ParseConstantFieldDeclaration(attributes, modifiers, parentKind);
                }
                if (this.CurrentToken.Kind == SyntaxKind.EventKeyword) {
                    return this.ParseEventDeclaration(attributes, modifiers, parentKind);
                }
                if (this.CurrentToken.Kind == SyntaxKind.FixedKeyword) {
                    return this.ParseFixedSizeBufferDeclaration(attributes, modifiers, parentKind);
                }
                if (this.CurrentToken.Kind == SyntaxKind.ExplicitKeyword || this.CurrentToken.Kind == SyntaxKind.ImplicitKeyword || (this.CurrentToken.Kind == SyntaxKind.OperatorKeyword && !SyntaxFacts.IsAnyOverloadableOperator(this.PeekToken(1).Kind))) {
                    return this.ParseConversionOperatorDeclaration(attributes, modifiers);
                }
                if (this.CurrentToken.Kind == SyntaxKind.NamespaceKeyword && parentKind == SyntaxKind.CompilationUnit) {
                    if (attributes.Count > 0) {
                        attributes.$set$(0, this.AddError_1357(attributes.$get$(0), ErrorCode.ERR_BadModifiersOnNamespace));
                    }
                    else {
                        System.Diagnostics.Debug.Assert(modifiers.Count > 0);
                        modifiers.$set$(0, this.AddError_1357(modifiers.$get$(0), ErrorCode.ERR_BadModifiersOnNamespace));
                    }
                    var namespaceDecl = this.ParseNamespaceDeclaration();
                    if (modifiers.Count > 0) {
                        namespaceDecl = this.AddLeadingSkippedSyntax(namespaceDecl, modifiers.ToListNode());
                    }
                    if (attributes.Count > 0) {
                        namespaceDecl = this.AddLeadingSkippedSyntax(namespaceDecl, attributes.ToListNode());
                    }
                    return namespaceDecl;
                }
                if (LanguageParser.CanStartTypeDeclaration(this.CurrentToken.Kind)) {
                    return this.ParseTypeDeclaration(attributes, modifiers);
                }
                if (acceptStatement && this.CurrentToken.Kind != SyntaxKind.CloseBraceToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken && this.IsPossibleStatement()) {
                    var saveTerm = this.termState;
                    this.termState |= LanguageParser.TerminatorState.IsPossibleStatementStartOrStop;
                    var statement = this.ParseStatementNoDeclaration(/*allowAnyExpression:*/true);
                    this.termState = saveTerm;
                    if (statement != null) {
                        return this.syntaxFactory.GlobalStatement(statement);
                    }
                }
                var type = this.ParseReturnType();
                if (LanguageParser.GetModifier(this.CurrentToken) != LanguageParser.SyntaxModifier.None && this.CurrentToken.ContextualKind != SyntaxKind.PartialKeyword && this.CurrentToken.ContextualKind != SyntaxKind.AsyncKeyword && LanguageParser.IsComplete(type)) {
                    var misplacedModifier = this.CurrentToken;
                    type = this.AddError_1911(type, type.FullWidth + misplacedModifier.GetLeadingTriviaWidth(), misplacedModifier.Width, ErrorCode.ERR_BadModifierLocation, misplacedModifier.Text);
                    return this.syntaxFactory.IncompleteMember(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type);
                }
                parse_member_name:
                while (true) {

                    ;
                    if (this.IsOperatorKeyword()) {
                        return this.ParseOperatorDeclaration(attributes, modifiers, type);
                    }
                    if (this.IsFieldDeclaration(/*isEvent:*/false)) {
                        if (acceptStatement) {
                            this.termState |= LanguageParser.TerminatorState.IsPossibleStatementStartOrStop;
                        }
                        return this.ParseNormalFieldDeclaration(attributes, modifiers, type, parentKind);
                    }
                    var explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax;
                    var identifierOrThisOpt: SyntaxToken;
                    var typeParameterListOpt: TypeParameterListSyntax;
                    var explicitInterfaceOpt_ref0 = { refObj: explicitInterfaceOpt };
                    var identifierOrThisOpt_ref1 = { refObj: identifierOrThisOpt };
                    var typeParameterListOpt_ref2 = { refObj: typeParameterListOpt };
                    this.ParseMemberName(explicitInterfaceOpt_ref0, identifierOrThisOpt_ref1, typeParameterListOpt_ref2,/*isEvent:*/false);

                    explicitInterfaceOpt = explicitInterfaceOpt_ref0.refObj;

                    identifierOrThisOpt = identifierOrThisOpt_ref1.refObj;

                    typeParameterListOpt = typeParameterListOpt_ref2.refObj;;
                    if (explicitInterfaceOpt == null && identifierOrThisOpt == null && typeParameterListOpt == null) {
                        if (attributes.Count == 0 && modifiers.Count == 0 && type.IsMissing) {
                            return null;
                        }
                        var incompleteMember = this.syntaxFactory.IncompleteMember(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type.IsMissing ? null : type);
                        if (incompleteMember.ContainsDiagnostics) {
                            return incompleteMember;
                        }
                        else if (parentKind == SyntaxKind.NamespaceDeclaration || parentKind == SyntaxKind.CompilationUnit && !this.IsScript) {
                            return this.AddErrorToLastToken_1417(incompleteMember, ErrorCode.ERR_NamespaceUnexpected);
                        }
                        else {
                            return this.AddError_1911(incompleteMember, incompleteMember.FullWidth + this.CurrentToken.GetLeadingTriviaWidth(), this.CurrentToken.Width, ErrorCode.ERR_InvalidMemberDecl, this.CurrentToken.Text);
                        }
                    }
                    if (identifierOrThisOpt != null && (typeParameterListOpt != null && typeParameterListOpt.ContainsDiagnostics || this.CurrentToken.Kind != SyntaxKind.OpenParenToken && this.CurrentToken.Kind != SyntaxKind.OpenBraceToken) && (() => {
                        var modifiers_ref0 = { refObj: modifiers };
                        var type_ref1 = { refObj: type };
                        var explicitInterfaceOpt_ref2 = { refObj: explicitInterfaceOpt };
                        var ret_val__676 = this.ReconsiderTypeAsAsyncModifier(modifiers_ref0, type_ref1, explicitInterfaceOpt_ref2, identifierOrThisOpt, typeParameterListOpt);

                        modifiers = modifiers_ref0.refObj;

                        type = type_ref1.refObj;

                        explicitInterfaceOpt = explicitInterfaceOpt_ref2.refObj;
                        return ret_val__676;
                    })()) {
                        continue parse_member_name;
                    } break;
                }
                System.Diagnostics.Debug.Assert(identifierOrThisOpt != null);
                if (identifierOrThisOpt.Kind == SyntaxKind.ThisKeyword) {
                    return this.ParseIndexerDeclaration(attributes, modifiers, type, explicitInterfaceOpt, identifierOrThisOpt, typeParameterListOpt);
                }
                else {
                    switch (this.CurrentToken.Kind) {
                        case SyntaxKind.OpenBraceToken:
                        case SyntaxKind.EqualsGreaterThanToken:
                            return this.ParsePropertyDeclaration(attributes, modifiers, type, explicitInterfaceOpt, identifierOrThisOpt, typeParameterListOpt);
                        default:
                            return this.ParseMethodDeclaration(attributes, modifiers, type, explicitInterfaceOpt, identifierOrThisOpt, typeParameterListOpt);
                    }
                }
            }

            finally {
                this.pool.Free_1631(modifiers);
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(attributes));
                this.termState = saveTermState;
            }
        }
        private ReconsiderTypeAsAsyncModifier(modifiers: { refObj: SyntaxListBaseBuilder }, type: { refObj: TypeSyntax }, explicitInterfaceOpt: { refObj: ExplicitInterfaceSpecifierSyntax }, identifierOrThisOpt: SyntaxToken, typeParameterListOpt: TypeParameterListSyntax): boolean {
            if (modifiers.refObj.Any(SyntaxKind.AsyncKeyword))
                return false;
            if (type.refObj.Kind != SyntaxKind.IdentifierName)
                return false;
            if (((<IdentifierNameSyntax>type.refObj).Identifier).ContextualKind != SyntaxKind.AsyncKeyword)
                return false;
            if (identifierOrThisOpt.Kind != SyntaxKind.IdentifierToken)
                return false;
            modifiers.refObj.Add(LanguageParser.ConvertToKeyword((<IdentifierNameSyntax>type.refObj).Identifier));
            var newType: SimpleNameSyntax = typeParameterListOpt == null ? <SimpleNameSyntax>this.syntaxFactory.IdentifierName(identifierOrThisOpt) : this.syntaxFactory.GenericName(identifierOrThisOpt, this.TypeArgumentFromTypeParameters(typeParameterListOpt));
            type.refObj = (explicitInterfaceOpt.refObj == null) ? <TypeSyntax>newType : this.syntaxFactory.QualifiedName(explicitInterfaceOpt.refObj.Name, explicitInterfaceOpt.refObj.DotToken, newType);
            explicitInterfaceOpt.refObj = null;
            identifierOrThisOpt = null;
            typeParameterListOpt = null;
            return true;
        }
        private TypeArgumentFromTypeParameters(typeParameterList: TypeParameterListSyntax): TypeArgumentListSyntax {
            var types = this.pool.AllocateSeparated<TypeSyntax>();
            // for each
            var pEnumerator = typeParameterList.Parameters.GetWithSeparators().GetEnumerator();

            while (pEnumerator.MoveNext()) {
                var p = pEnumerator.Current;
                // foreach block
                switch (p.Kind) {
                    case SyntaxKind.TypeParameter:
                        var typeParameter = <TypeParameterSyntax>p;
                        var typeArgument = this.syntaxFactory.IdentifierName(typeParameter.Identifier);
                        if (typeParameter.VarianceKeyword != null) {
                            typeArgument = this.AddLeadingSkippedSyntax(typeArgument, typeParameter.VarianceKeyword);
                        }
                        if (typeParameter.AttributeLists.Node != null) {
                            typeArgument = this.AddLeadingSkippedSyntax(typeArgument, typeParameter.AttributeLists.Node);
                        }
                        types.Add(typeArgument);
                        break;
                    case SyntaxKind.CommaToken:
                        types.AddSeparator(<SyntaxToken>p);
                        break;
                    default:
                        System.Diagnostics.Debug.Assert(false);
                        break;
                }
            }    
            // end foreach
            var result = this.syntaxFactory.TypeArgumentList(typeParameterList.LessThanToken, types.ToList(), typeParameterList.GreaterThanToken);
            this.pool.Free_2078(types);
            return result;
        }
        private IsFieldDeclaration(isEvent: boolean): boolean {
            if (this.CurrentToken.Kind != SyntaxKind.IdentifierToken) {
                return false;
            }
            var kind = this.PeekToken(1).Kind;
            switch (kind) {
                case SyntaxKind.DotToken:
                case SyntaxKind.ColonColonToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.EqualsGreaterThanToken:
                    return false;
                case SyntaxKind.OpenParenToken:
                    return isEvent;
                default:
                    return true;
            }
        }
        private IsOperatorKeyword(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.ImplicitKeyword || this.CurrentToken.Kind == SyntaxKind.ExplicitKeyword || this.CurrentToken.Kind == SyntaxKind.OperatorKeyword;
        }
        public static IsComplete(node: CSharpSyntaxNode): boolean {
            if (node == null) {
                return false;
            }
            // for each
            var childEnumerator = node.ChildNodesAndTokens().Reverse().GetEnumerator();

            while (childEnumerator.MoveNext()) {
                var child = childEnumerator.Current;
                // foreach block
                var token = __as__<SyntaxToken>(child, SyntaxToken);
                if (token == null) {
                    return LanguageParser.IsComplete(<CSharpSyntaxNode>child);
                }
                if (token.IsMissing) {
                    return false;
                }
                if (token.Kind != SyntaxKind.None) {
                    return true;
                }
            }    
            // end foreach
            return true;
        }
        private ParseConstructorDeclaration(typeName: string, attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): ConstructorDeclarationSyntax {
            var name = this.ParseIdentifierToken();
            System.Diagnostics.Debug.Assert(name.ValueText == typeName);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfMethodSignature;
            try
            {
                var paramList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/false,/*allowDefaults:*/true,/*allowAttributes:*/true);
                var initializer: ConstructorInitializerSyntax = null;
                if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                    var isStatic: boolean = modifiers != null && modifiers.Any(SyntaxKind.StaticKeyword);
                    initializer = this.ParseConstructorInitializer(name.ValueText, isStatic);
                }
                var body: BlockSyntax;
                var semicolon: SyntaxToken;
                var body_ref0 = { refObj: body };
                var semicolon_ref1 = { refObj: semicolon };
                this.ParseBodyOrSemicolon(body_ref0, semicolon_ref1);

                body = body_ref0.refObj;

                semicolon = semicolon_ref1.refObj;;
                return this.syntaxFactory.ConstructorDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), name, paramList, initializer, body, semicolon);
            }

            finally {
                this.termState = saveTerm;
            }
        }
        private ParseConstructorInitializer(name: string, isStatic: boolean): ConstructorInitializerSyntax {
            var colon = this.EatToken_1865(SyntaxKind.ColonToken);
            var reportError = true;
            var kind = this.CurrentToken.Kind == SyntaxKind.BaseKeyword ? SyntaxKind.BaseConstructorInitializer : SyntaxKind.ThisConstructorInitializer;
            var token: SyntaxToken;
            if (this.CurrentToken.Kind == SyntaxKind.BaseKeyword || this.CurrentToken.Kind == SyntaxKind.ThisKeyword) {
                token = this.EatToken_2098();
            }
            else {
                token = this.EatToken_4938(SyntaxKind.ThisKeyword, ErrorCode.ERR_ThisOrBaseExpected);
                reportError = false;
            }
            var argumentList: ArgumentListSyntax;
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                argumentList = this.ParseParenthesizedArgumentList();
            }
            else {
                var openToken = this.EatToken_1610(SyntaxKind.OpenParenToken, reportError);
                var closeToken = this.EatToken_1610(SyntaxKind.CloseParenToken, reportError);
                argumentList = this.syntaxFactory.ArgumentList(openToken, <SeparatedSyntaxList<ArgumentSyntax>> structDefault(SeparatedSyntaxList), closeToken);
            }
            if (isStatic) {
                token = this.AddError_7870(token, ErrorCode.ERR_StaticConstructorWithExplicitConstructorCall, name);
            }
            return this.syntaxFactory.ConstructorInitializer(kind, colon, token, argumentList);
        }
        private ParseDestructorDeclaration(typeName: string, attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): DestructorDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.TildeToken);
            var tilde = this.EatToken_1865(SyntaxKind.TildeToken);
            var name = this.ParseIdentifierToken();
            if (name.ValueText != typeName) {
                name = this.AddError_1357(name, ErrorCode.ERR_BadDestructorName);
            }
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var body: BlockSyntax;
            var semicolon: SyntaxToken;
            var body_ref0 = { refObj: body };
            var semicolon_ref1 = { refObj: semicolon };
            this.ParseBodyOrSemicolon(body_ref0, semicolon_ref1);

            body = body_ref0.refObj;

            semicolon = semicolon_ref1.refObj;;
            var parameterList = this.syntaxFactory.ParameterList(openParen, <SeparatedSyntaxList<ParameterSyntax>> structDefault(SeparatedSyntaxList), closeParen);
            return this.syntaxFactory.DestructorDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), tilde, name, parameterList, body, semicolon);
        }
        private ParseBlockAndExpressionBodiesWithSemicolon(blockBody: { refObj: BlockSyntax }, expressionBody: { refObj: ArrowExpressionClauseSyntax }, semicolon: { refObj: SyntaxToken }): void {
            if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                blockBody.refObj = null;
                expressionBody.refObj = null;
                semicolon.refObj = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return
            }
            blockBody.refObj = null;
            expressionBody.refObj = null;
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                blockBody.refObj = this.ParseBlock(/*isMethodBody:*/true, false);
            }
            if (this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken) {
                expressionBody.refObj = this.ParseArrowExpressionClause();
                expressionBody.refObj = this.CheckFeatureAvailability(expressionBody.refObj, MessageID.IDS_FeatureExpressionBodiedMethod);
            }
            semicolon.refObj = null;
            if (expressionBody.refObj != null || blockBody.refObj == null) {
                semicolon.refObj = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            else if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                semicolon.refObj = this.EatTokenWithPrejudice_1392(ErrorCode.ERR_UnexpectedSemicolon);
            }
        }
        private CheckForBlockAndExpressionBody<T extends CSharpSyntaxNode>(block: CSharpSyntaxNode, expression: CSharpSyntaxNode, syntax: T): T {
            if (block != null && expression != null) {
                var code: ErrorCode = 0;
                if (syntax instanceof BaseMethodDeclarationSyntax) {
                    code = ErrorCode.ERR_BlockBodyAndExpressionBody;
                }
                else {
                    System.Diagnostics.Debug.Assert(syntax instanceof BasePropertyDeclarationSyntax);
                    code = ErrorCode.ERR_AccessorListAndExpressionBody;
                }
                return this.AddError_1357(syntax, code);
            }
            return syntax;
        }
        private ParseBodyOrSemicolon(body: { refObj: BlockSyntax }, semicolon: { refObj: SyntaxToken }): void {
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                body.refObj = this.ParseBlock(/*isMethodBody:*/true, false);
                semicolon.refObj = null;
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    semicolon.refObj = this.EatTokenWithPrejudice_1392(ErrorCode.ERR_UnexpectedSemicolon);
                }
            }
            else {
                semicolon.refObj = this.EatToken_1865(SyntaxKind.SemicolonToken);
                body.refObj = null;
            }
        }
        private IsEndOfTypeParameterList(): boolean {
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                return true;
            }
            if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                return true;
            }
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                return true;
            }
            if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                return true;
            }
            return false;
        }
        private IsEndOfMethodSignature(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.SemicolonToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken;
        }
        private IsEndOfNameInExplicitInterface(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.DotToken || this.CurrentToken.Kind == SyntaxKind.ColonColonToken;
        }
        private ParseMethodDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, type: TypeSyntax, explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax): MethodDeclarationSyntax {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfMethodSignature;
            var paramList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/true,/*allowDefaults:*/true,/*allowAttributes:*/true);
            var constraints = <SyntaxListBuilder<TypeParameterConstraintClauseSyntax>> structDefault(SyntaxListBuilder);
            try
            {
                if (this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                    constraints = this.pool.Allocate<TypeParameterConstraintClauseSyntax>();
                    this.ParseTypeParameterConstraintClauses(typeParameterList != null, SyntaxListBuilder.op_Implicit_1734(constraints));
                }
                else if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                    var colonToken = this.CurrentToken;
                    var initializer: ConstructorInitializerSyntax = this.ParseConstructorInitializer(identifier.ValueText,/*isStatic:*/false);
                    initializer = this.AddErrorToFirstToken_6118(initializer, ErrorCode.ERR_UnexpectedCharacter, colonToken.Text);
                    paramList = this.AddTrailingSkippedSyntax(paramList, initializer);
                }
                if (!constraints.IsNull && constraints.Count > 0 && ((explicitInterfaceOpt != null) || (modifiers != null && modifiers.Any(SyntaxKind.OverrideKeyword)))) {
                    constraints.$set$(0, this.AddErrorToFirstToken_3098(constraints.$get$(0), ErrorCode.ERR_OverrideWithConstraints));
                }
                this.termState = saveTerm;
                var blockBody: BlockSyntax;
                var expressionBody: ArrowExpressionClauseSyntax;
                var semicolon: SyntaxToken;
                System.Diagnostics.Debug.Assert(!this.IsInAsync);
                this.IsInAsync = modifiers.Any(SyntaxKind.AsyncKeyword);
                var blockBody_ref0 = { refObj: blockBody };
                var expressionBody_ref1 = { refObj: expressionBody };
                var semicolon_ref2 = { refObj: semicolon };
                this.ParseBlockAndExpressionBodiesWithSemicolon(blockBody_ref0, expressionBody_ref1, semicolon_ref2);

                blockBody = blockBody_ref0.refObj;

                expressionBody = expressionBody_ref1.refObj;

                semicolon = semicolon_ref2.refObj;;
                this.IsInAsync = false;
                var decl = this.syntaxFactory.MethodDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type, explicitInterfaceOpt, identifier, typeParameterList, paramList, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraints), blockBody, expressionBody, semicolon);
                return this.CheckForBlockAndExpressionBody(blockBody, expressionBody, decl);
            }

            finally {
                if (!constraints.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(constraints));
                }
            }
        }
        private ParseReturnType(): TypeSyntax {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfReturnType;
            var type = this.ParseTypeOrVoid();
            this.termState = saveTerm;
            return type;
        }
        private IsEndOfReturnType(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.SemicolonToken:
                    return true;
                default:
                    return false;
            }
        }
        private ParseConversionOperatorDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): ConversionOperatorDeclarationSyntax {
            var style: SyntaxToken;
            if (this.CurrentToken.Kind == SyntaxKind.ImplicitKeyword || this.CurrentToken.Kind == SyntaxKind.ExplicitKeyword) {
                style = this.EatToken_2098();
            }
            else {
                style = this.EatToken_1865(SyntaxKind.ExplicitKeyword);
            }
            var opKeyword: SyntaxToken = this.EatToken_1865(SyntaxKind.OperatorKeyword);
            var type = this.ParseType(/*parentIsParameter:*/false);
            var paramList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/false,/*allowDefaults:*/true,/*allowAttributes:*/true);
            if (paramList.Parameters.Count != 1) {
                paramList = this.AddErrorToFirstToken_3098(paramList, ErrorCode.ERR_OvlUnaryOperatorExpected);
            }
            var blockBody: BlockSyntax;
            var expressionBody: ArrowExpressionClauseSyntax;
            var semicolon: SyntaxToken;
            var blockBody_ref0 = { refObj: blockBody };
            var expressionBody_ref1 = { refObj: expressionBody };
            var semicolon_ref2 = { refObj: semicolon };
            this.ParseBlockAndExpressionBodiesWithSemicolon(blockBody_ref0, expressionBody_ref1, semicolon_ref2);

            blockBody = blockBody_ref0.refObj;

            expressionBody = expressionBody_ref1.refObj;

            semicolon = semicolon_ref2.refObj;;
            var decl = this.syntaxFactory.ConversionOperatorDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), style, opKeyword, type, paramList, blockBody, expressionBody, semicolon);
            return this.CheckForBlockAndExpressionBody(blockBody, expressionBody, decl);
        }
        private ParseOperatorDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, type: TypeSyntax): OperatorDeclarationSyntax {
            var opKeyword = this.EatToken_1865(SyntaxKind.OperatorKeyword);
            var opToken: SyntaxToken;
            var opTokenErrorOffset: number = 0;
            var opTokenErrorWidth: number = 0;
            if (SyntaxFacts.IsAnyOverloadableOperator(this.CurrentToken.Kind)) {
                opToken = this.EatToken_2098();
                System.Diagnostics.Debug.Assert(!opToken.IsMissing);
                opTokenErrorOffset = opToken.GetLeadingTriviaWidth();
                opTokenErrorWidth = opToken.Width;
            }
            else {
                if (this.CurrentToken.Kind == SyntaxKind.ImplicitKeyword || this.CurrentToken.Kind == SyntaxKind.ExplicitKeyword) {
                    var opTokenErrorOffset_ref0 = { refObj: opTokenErrorOffset };
                    var opTokenErrorWidth_ref1 = { refObj: opTokenErrorWidth };
                    this.GetDiagnosticSpanForMissingToken(opTokenErrorOffset_ref0, opTokenErrorWidth_ref1);

                    opTokenErrorOffset = opTokenErrorOffset_ref0.refObj;

                    opTokenErrorWidth = opTokenErrorWidth_ref1.refObj;;
                    opToken = this.ConvertToMissingWithTrailingTrivia(this.EatToken_2098(), SyntaxKind.PlusToken);
                    System.Diagnostics.Debug.Assert(opToken.IsMissing);
                    System.Diagnostics.Debug.Assert(type != null);
                    if (type.IsMissing) {
                        var diagInfo: SyntaxDiagnosticInfo = LanguageParser.MakeError_1930(opTokenErrorOffset, opTokenErrorWidth, ErrorCode.ERR_BadOperatorSyntax, SyntaxFacts.GetText_3915(SyntaxKind.PlusToken));
                        opToken = this.WithAdditionalDiagnostics(opToken, diagInfo);
                    }
                    else {
                        type = this.AddError_7870(type, ErrorCode.ERR_BadOperatorSyntax, SyntaxFacts.GetText_3915(SyntaxKind.PlusToken));
                    }
                }
                else {
                    opToken = this.EatToken_2098();
                    System.Diagnostics.Debug.Assert(!opToken.IsMissing);
                    opTokenErrorOffset = opToken.GetLeadingTriviaWidth();
                    opTokenErrorWidth = opToken.Width;
                }
            }
            var opKind = opToken.Kind;
            var tk = this.CurrentToken;
            if (opToken.Kind == SyntaxKind.GreaterThanToken && tk.Kind == SyntaxKind.GreaterThanToken) {
                if (opToken.GetTrailingTriviaWidth() == 0 && tk.GetLeadingTriviaWidth() == 0) {
                    var opToken2 = this.EatToken_2098();
                    opToken = SyntaxFactory.Token_1937(opToken.GetLeadingTrivia(), SyntaxKind.GreaterThanGreaterThanToken, opToken2.GetTrailingTrivia());
                }
            }
            var paramList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/false,/*allowDefaults:*/true,/*allowAttributes:*/true);
            switch (paramList.Parameters.Count) {
                case 1:
                    if (opToken.IsMissing || !SyntaxFacts.IsOverloadableUnaryOperator(opKind)) {
                        var diagInfo: SyntaxDiagnosticInfo = LanguageParser.MakeError_1764(opTokenErrorOffset, opTokenErrorWidth, ErrorCode.ERR_OvlUnaryOperatorExpected);
                        opToken = this.WithAdditionalDiagnostics(opToken, diagInfo);
                    }
                    break;
                case 2:
                    if (opToken.IsMissing || !SyntaxFacts.IsOverloadableBinaryOperator(opKind)) {
                        var diagInfo: SyntaxDiagnosticInfo = LanguageParser.MakeError_1764(opTokenErrorOffset, opTokenErrorWidth, ErrorCode.ERR_OvlBinaryOperatorExpected);
                        opToken = this.WithAdditionalDiagnostics(opToken, diagInfo);
                    }
                    break;
                default:
                    if (opToken.IsMissing) {
                        var diagInfo: SyntaxDiagnosticInfo = LanguageParser.MakeError_1764(opTokenErrorOffset, opTokenErrorWidth, ErrorCode.ERR_OvlOperatorExpected);
                        opToken = this.WithAdditionalDiagnostics(opToken, diagInfo);
                    }
                    else if (SyntaxFacts.IsOverloadableBinaryOperator(opKind)) {
                        opToken = this.AddError_7870(opToken, ErrorCode.ERR_BadBinOpArgs, SyntaxFacts.GetText_3915(opKind));
                    }
                    else if (SyntaxFacts.IsOverloadableUnaryOperator(opKind)) {
                        opToken = this.AddError_7870(opToken, ErrorCode.ERR_BadUnOpArgs, SyntaxFacts.GetText_3915(opKind));
                    }
                    else {
                        opToken = this.AddError_1357(opToken, ErrorCode.ERR_OvlOperatorExpected);
                    }
                    break;
            }
            var blockBody: BlockSyntax;
            var expressionBody: ArrowExpressionClauseSyntax;
            var semicolon: SyntaxToken;
            var blockBody_ref0 = { refObj: blockBody };
            var expressionBody_ref1 = { refObj: expressionBody };
            var semicolon_ref2 = { refObj: semicolon };
            this.ParseBlockAndExpressionBodiesWithSemicolon(blockBody_ref0, expressionBody_ref1, semicolon_ref2);

            blockBody = blockBody_ref0.refObj;

            expressionBody = expressionBody_ref1.refObj;

            semicolon = semicolon_ref2.refObj;;
            if (!(SyntaxFacts.IsOverloadableUnaryOperator(opKind) || SyntaxFacts.IsOverloadableBinaryOperator(opKind))) {
                opToken = this.ConvertToMissingWithTrailingTrivia(opToken, SyntaxKind.PlusToken);
            }
            var decl = this.syntaxFactory.OperatorDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type, opKeyword, opToken, paramList, blockBody, expressionBody, semicolon);
            return this.CheckForBlockAndExpressionBody(blockBody, expressionBody, decl);
        }
        private ParseIndexerDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, type: TypeSyntax, explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax, thisKeyword: SyntaxToken, typeParameterList: TypeParameterListSyntax): MemberDeclarationSyntax {
            System.Diagnostics.Debug.Assert(thisKeyword.Kind == SyntaxKind.ThisKeyword);
            if (typeParameterList != null) {
                thisKeyword = this.AddTrailingSkippedSyntax(thisKeyword, typeParameterList);
                thisKeyword = this.AddError_1357(thisKeyword, ErrorCode.ERR_UnexpectedGenericName);
            }
            var parameterList = this.ParseBracketedParameterList();
            if (parameterList.Parameters.Count == 0) {
                parameterList = this.AddErrorToLastToken_1417(parameterList, ErrorCode.ERR_IndexerNeedsParam);
            }
            var accessorList: AccessorListSyntax = null;
            var expressionBody: ArrowExpressionClauseSyntax = null;
            var semicolon: SyntaxToken = null;
            if (this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken) {
                expressionBody = this.ParseArrowExpressionClause();
                expressionBody = this.CheckFeatureAvailability(expressionBody, MessageID.IDS_FeatureExpressionBodiedIndexer);
                semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            else {
                accessorList = this.ParseAccessorList(/*isEvent:*/false);
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    semicolon = this.EatTokenWithPrejudice_1392(ErrorCode.ERR_UnexpectedSemicolon);
                }
            }
            if (this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken && semicolon == null) {
                expressionBody = this.ParseArrowExpressionClause();
                expressionBody = this.CheckFeatureAvailability(expressionBody, MessageID.IDS_FeatureExpressionBodiedIndexer);
                semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            var decl = this.syntaxFactory.IndexerDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type, explicitInterfaceOpt, thisKeyword, parameterList, accessorList, expressionBody, semicolon);
            return this.CheckForBlockAndExpressionBody(accessorList, expressionBody, decl);
        }
        private ParsePropertyDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, type: TypeSyntax, explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax): PropertyDeclarationSyntax {
            if (typeParameterList != null) {
                identifier = this.AddTrailingSkippedSyntax(identifier, typeParameterList);
                identifier = this.AddError_1357(identifier, ErrorCode.ERR_UnexpectedGenericName);
            }
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken);
            var accessorList: AccessorListSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                accessorList = this.ParseAccessorList(/*isEvent:*/false);
            }
            var expressionBody: ArrowExpressionClauseSyntax = null;
            var initializer: EqualsValueClauseSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.EqualsGreaterThanToken) {
                expressionBody = this.ParseArrowExpressionClause();
                expressionBody = this.CheckFeatureAvailability(expressionBody, MessageID.IDS_FeatureExpressionBodiedProperty);
            }
            else if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                var equals = this.EatToken_1865(SyntaxKind.EqualsToken);
                var value = this.ParseVariableInitializer(/*allowStackAlloc:*/false);
                initializer = this.syntaxFactory.EqualsValueClause(equals, value);
                initializer = this.CheckFeatureAvailability(initializer, MessageID.IDS_FeatureAutoPropertyInitializer);
            }
            var semicolon: SyntaxToken = null;
            if (expressionBody != null || initializer != null) {
                semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            else if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                semicolon = this.EatTokenWithPrejudice_1392(ErrorCode.ERR_UnexpectedSemicolon);
            }
            var decl = this.syntaxFactory.PropertyDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type, explicitInterfaceOpt, identifier, accessorList, expressionBody, initializer, semicolon);
            return this.CheckForBlockAndExpressionBody(accessorList, expressionBody, decl);
        }
        private ParseAccessorList(isEvent: boolean): AccessorListSyntax {
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var accessors = <SyntaxList<AccessorDeclarationSyntax>> structDefault(SyntaxList);
            if (!openBrace.IsMissing || !this.IsTerminator()) {
                var builder = this.pool.Allocate<AccessorDeclarationSyntax>();
                try
                {
                    var hasGetOrAdd: boolean = false;
                    var hasSetOrRemove: boolean = false;
                    while (true) {
                        if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                            break;
                        }
                        else if (this.IsPossibleAccessor()) {
                            var hasGetOrAdd_ref0 = { refObj: hasGetOrAdd };
                            var hasSetOrRemove_ref1 = { refObj: hasSetOrRemove };
                            var ret_val__834 = this.ParseAccessorDeclaration(isEvent, hasGetOrAdd_ref0, hasSetOrRemove_ref1);

                            hasGetOrAdd = hasGetOrAdd_ref0.refObj;

                            hasSetOrRemove = hasSetOrRemove_ref1.refObj;
                            var acc = ret_val__834;
                            builder.Add(acc);
                        }
                        else if ((() => {
                            var openBrace_ref0 = { refObj: openBrace };
                            var ret_val__130 = this.SkipBadAccessorListTokens(openBrace_ref0, builder, isEvent ? ErrorCode.ERR_AddOrRemoveExpected : ErrorCode.ERR_GetOrSetExpected);

                            openBrace = openBrace_ref0.refObj;
                            return ret_val__130;
                        })() == LanguageParser.PostSkipAction.Abort) {
                            break;
                        }
                    }
                    accessors = builder.ToList();
                }

                finally {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(builder));
                }
            }
            var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
            return this.syntaxFactory.AccessorList(openBrace, accessors, closeBrace);
        }
        private ParseArrowExpressionClause(): ArrowExpressionClauseSyntax {
            var arrowToken = this.EatToken_1865(SyntaxKind.EqualsGreaterThanToken);
            return this.syntaxFactory.ArrowExpressionClause(arrowToken, this.ParseExpression());
        }
        private SkipBadAccessorListTokens(openBrace: { refObj: SyntaxToken }, list: SyntaxListBuilder<AccessorDeclarationSyntax>, error: ErrorCode): LanguageParser.PostSkipAction {
            return this.SkipBadListTokensWithErrorCode(openBrace, list, p => p.CurrentToken.Kind != SyntaxKind.CloseBraceToken && !p.IsPossibleAccessor(), p => p.IsTerminator(), error);
        }
        private IsPossibleAccessor(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.IdentifierToken || this.IsPossibleAttributeDeclaration() || this.IsPossibleModifier() || SyntaxFacts.GetAccessorDeclarationKind(this.CurrentToken.ContextualKind) != SyntaxKind.None || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
        }
        private SkipBadSeparatedListTokensWithExpectedKind<T extends CSharpSyntaxNode, TNode extends CSharpSyntaxNode>(startToken: { refObj: T }, list: SeparatedSyntaxListBuilder<TNode>, isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var trailingTrivia: CSharpSyntaxNode;
            var trailingTrivia_ref0 = { refObj: trailingTrivia };
            var ret_val__489 = this.SkipBadListTokensWithExpectedKindHelper(list.UnderlyingBuilder, isNotExpectedFunction, abortFunction, expected, trailingTrivia_ref0);

            trailingTrivia = trailingTrivia_ref0.refObj;
            var action = ret_val__489;
            if (trailingTrivia != null) {
                startToken.refObj = this.AddTrailingSkippedSyntax(startToken.refObj, trailingTrivia);
            }
            return action;
        }
        private SkipBadListTokensWithErrorCode<T extends CSharpSyntaxNode, TNode extends CSharpSyntaxNode>(startToken: { refObj: T }, list: SyntaxListBuilder<TNode>, isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, error: ErrorCode): LanguageParser.PostSkipAction {
            var trailingTrivia: CSharpSyntaxNode;
            var trailingTrivia_ref0 = { refObj: trailingTrivia };
            var ret_val__806 = this.SkipBadListTokensWithErrorCodeHelper(list, isNotExpectedFunction, abortFunction, error, trailingTrivia_ref0);

            trailingTrivia = trailingTrivia_ref0.refObj;
            var action = ret_val__806;
            if (trailingTrivia != null) {
                startToken.refObj = this.AddTrailingSkippedSyntax(startToken.refObj, trailingTrivia);
            }
            return action;
        }
        private SkipBadListTokensWithExpectedKindHelper(list: SyntaxListBaseBuilder, isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, expected: SyntaxKind, trailingTrivia: { refObj: CSharpSyntaxNode }): LanguageParser.PostSkipAction {
            if (list.Count == 0) {
                return this.SkipBadTokensWithExpectedKind(isNotExpectedFunction, abortFunction, expected, trailingTrivia);
            }
            else {
                var lastItemTrailingTrivia: CSharpSyntaxNode;
                var lastItemTrailingTrivia_ref0 = { refObj: lastItemTrailingTrivia };
                var ret_val__30 = this.SkipBadTokensWithExpectedKind(isNotExpectedFunction, abortFunction, expected, lastItemTrailingTrivia_ref0);

                lastItemTrailingTrivia = lastItemTrailingTrivia_ref0.refObj;
                var action = ret_val__30;
                if (lastItemTrailingTrivia != null) {
                    list.$set$(list.Count - 1, this.AddTrailingSkippedSyntax(list.$get$(list.Count - 1), lastItemTrailingTrivia));
                }
                trailingTrivia.refObj = null;
                return action;
            }
        }
        private SkipBadListTokensWithErrorCodeHelper<TNode extends CSharpSyntaxNode>(list: SyntaxListBuilder<TNode>, isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, error: ErrorCode, trailingTrivia: { refObj: CSharpSyntaxNode }): LanguageParser.PostSkipAction {
            if (list.Count == 0) {
                return this.SkipBadTokensWithErrorCode(isNotExpectedFunction, abortFunction, error, trailingTrivia);
            }
            else {
                var lastItemTrailingTrivia: CSharpSyntaxNode;
                var lastItemTrailingTrivia_ref0 = { refObj: lastItemTrailingTrivia };
                var ret_val__382 = this.SkipBadTokensWithErrorCode(isNotExpectedFunction, abortFunction, error, lastItemTrailingTrivia_ref0);

                lastItemTrailingTrivia = lastItemTrailingTrivia_ref0.refObj;
                var action = ret_val__382;
                if (lastItemTrailingTrivia != null) {
                    list.$set$(list.Count - 1, this.AddTrailingSkippedSyntax(list.$get$(list.Count - 1), lastItemTrailingTrivia));
                }
                trailingTrivia.refObj = null;
                return action;
            }
        }
        private SkipBadTokensWithExpectedKind(isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, expected: SyntaxKind, trailingTrivia: { refObj: CSharpSyntaxNode }): LanguageParser.PostSkipAction {
            var nodes = this.pool.AllocateBase();
            try
            {
                var first: boolean = true;
                var action = LanguageParser.PostSkipAction.Continue;
                while (isNotExpectedFunction(this)) {
                    if (abortFunction(this)) {
                        action = LanguageParser.PostSkipAction.Abort;
                        break;
                    }
                    var token = (first && !this.CurrentToken.ContainsDiagnostics) ? this.EatTokenWithPrejudice_1765(expected) : this.EatToken_2098();
                    first = false;
                    nodes.Add(token);
                }
                trailingTrivia.refObj = (nodes.Count > 0) ? nodes.ToListNode() : null;
                return action;
            }

            finally {
                this.pool.Free_1631(nodes);
            }
        }
        private SkipBadTokensWithErrorCode(isNotExpectedFunction: (_: LanguageParser) => boolean, abortFunction: (_: LanguageParser) => boolean, errorCode: ErrorCode, trailingTrivia: { refObj: CSharpSyntaxNode }): LanguageParser.PostSkipAction {
            var nodes = this.pool.AllocateBase();
            try
            {
                var first: boolean = true;
                var action = LanguageParser.PostSkipAction.Continue;
                while (isNotExpectedFunction(this)) {
                    if (abortFunction(this)) {
                        action = LanguageParser.PostSkipAction.Abort;
                        break;
                    }
                    var token = (first && !this.CurrentToken.ContainsDiagnostics) ? this.EatTokenWithPrejudice_1392(errorCode) : this.EatToken_2098();
                    first = false;
                    nodes.Add(token);
                }
                trailingTrivia.refObj = (nodes.Count > 0) ? nodes.ToListNode() : null;
                return action;
            }

            finally {
                this.pool.Free_1631(nodes);
            }
        }
        private ParseAccessorDeclaration(isEvent: boolean, hasGetOrAdd: { refObj: boolean }, hasSetOrRemove: { refObj: boolean }): AccessorDeclarationSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CanReuseAccessorDeclaration(isEvent)) {
                return <AccessorDeclarationSyntax>this.EatNode();
            }
            var accAttrs = this.pool.Allocate<AttributeListSyntax>();
            var accMods = this.pool.AllocateBase();
            try
            {
                this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(accAttrs));
                this.ParseModifiers(accMods);
                if (isEvent) {
                    if (accMods != null && accMods.Count > 0) {
                        accMods.$set$(0, this.AddError_1357(accMods.$get$(0), ErrorCode.ERR_NoModifiersOnAccessor));
                    }
                }
                else {
                    if (accMods != null && accMods.Count > 0) {
                        accMods.$set$(0, this.CheckFeatureAvailability(accMods.$get$(0), MessageID.IDS_FeaturePropertyAccessorMods));
                    }
                }
                var validAccName: boolean = false;
                var accessorName: SyntaxToken;
                var accessorKind: SyntaxKind = 0;
                if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                    accessorName = this.EatToken_2098();
                    switch (accessorName.ContextualKind) {
                        case SyntaxKind.GetKeyword:
                        case SyntaxKind.SetKeyword:
                        case SyntaxKind.AddKeyword:
                        case SyntaxKind.RemoveKeyword:
                            accessorName = LanguageParser.ConvertToKeyword(accessorName);
                            break;
                    }
                    if (isEvent) {
                        var isAdd: boolean = LanguageParser.IsNameAdd(accessorName);
                        var isRemove: boolean = LanguageParser.IsNameRemove(accessorName);
                        validAccName = isAdd || isRemove;
                        if (!validAccName) {
                            accessorName = this.AddError_1357(accessorName, ErrorCode.ERR_AddOrRemoveExpected);
                            accessorKind = SyntaxKind.UnknownAccessorDeclaration;
                        }
                        else {
                            if ((isAdd && hasGetOrAdd.refObj) || (isRemove && hasSetOrRemove.refObj)) {
                                accessorName = this.AddError_1357(accessorName, ErrorCode.ERR_DuplicateAccessor);
                            }
                            hasGetOrAdd.refObj = hasGetOrAdd.refObj || isAdd;
                            hasSetOrRemove.refObj = hasSetOrRemove.refObj || isRemove;
                            accessorKind = isRemove ? SyntaxKind.RemoveAccessorDeclaration : SyntaxKind.AddAccessorDeclaration;
                        }
                    }
                    else {
                        var isGet: boolean = LanguageParser.IsNameGet(accessorName);
                        var isSet: boolean = LanguageParser.IsNameSet(accessorName);
                        validAccName = isGet || isSet;
                        if (!validAccName) {
                            accessorName = this.AddError_1357(accessorName, ErrorCode.ERR_GetOrSetExpected);
                            accessorKind = SyntaxKind.UnknownAccessorDeclaration;
                        }
                        else {
                            if ((isGet && hasGetOrAdd.refObj) || (isSet && hasSetOrRemove.refObj)) {
                                accessorName = this.AddError_1357(accessorName, ErrorCode.ERR_DuplicateAccessor);
                            }
                            hasGetOrAdd.refObj = hasGetOrAdd.refObj || isGet;
                            hasSetOrRemove.refObj = hasSetOrRemove.refObj || isSet;
                            accessorKind = isSet ? SyntaxKind.SetAccessorDeclaration : SyntaxKind.GetAccessorDeclaration;
                        }
                    }
                }
                else {
                    validAccName = false;
                    accessorName = SyntaxFactory.MissingToken_7070(SyntaxKind.IdentifierToken);
                    accessorName = this.AddError_1357(accessorName, isEvent ? ErrorCode.ERR_AddOrRemoveExpected : ErrorCode.ERR_GetOrSetExpected);
                    accessorKind = SyntaxKind.UnknownAccessorDeclaration;
                }
                var body: BlockSyntax = null;
                var semicolon: SyntaxToken = null;
                var currentTokenIsSemicolon: boolean = this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || (validAccName && !currentTokenIsSemicolon && !this.IsTerminator())) {
                    body = this.ParseBlock(/*isMethodBody:*/true,/*isAccessorBody:*/true);
                }
                else if (currentTokenIsSemicolon || validAccName) {
                    semicolon = this.EatToken_4938(SyntaxKind.SemicolonToken, ErrorCode.ERR_SemiOrLBraceExpected);
                    if (isEvent) {
                        semicolon = this.AddError_1357(semicolon, ErrorCode.ERR_AddRemoveMustHaveBody);
                    }
                }
                return this.syntaxFactory.AccessorDeclaration(accessorKind, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(accAttrs), SyntaxListBuilderExtensions.ToTokenList(accMods), accessorName, body, semicolon);
            }

            finally {
                this.pool.Free_1631(accMods);
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(accAttrs));
            }
        }
        private CanReuseAccessorDeclaration(isEvent: boolean): boolean {
            var parent = LanguageParser.GetOldParent(this.CurrentNode);
            switch (this.CurrentNodeKind) {
                case SyntaxKind.AddAccessorDeclaration:
                case SyntaxKind.RemoveAccessorDeclaration:
                    if (isEvent && parent != null && parent.Kind == SyntaxKind.EventDeclaration) {
                        return true;
                    }
                    break;
                case SyntaxKind.GetAccessorDeclaration:
                case SyntaxKind.SetAccessorDeclaration:
                    if (!isEvent && parent != null && parent.Kind == SyntaxKind.PropertyDeclaration) {
                        return true;
                    }
                    break;
            }
            return false;
        }
        public ParseParenthesizedParameterList(allowThisKeyword: boolean, allowDefaults: boolean, allowAttributes: boolean): ParameterListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && LanguageParser.CanReuseParameterList(__as__<CSharp.Syntax.ParameterListSyntax>(this.CurrentNode, CSharp.Syntax.ParameterListSyntax))) {
                return <ParameterListSyntax>this.EatNode();
            }
            var parameters = this.pool.AllocateSeparated<ParameterSyntax>();
            try
            {
                var openKind = SyntaxKind.OpenParenToken;
                var closeKind = SyntaxKind.CloseParenToken;
                var open: SyntaxToken;
                var close: SyntaxToken;
                var open_ref0 = { refObj: open };
                var close_ref1 = { refObj: close };
                this.ParseParameterList(open_ref0, parameters, close_ref1, openKind, closeKind, allowThisKeyword, allowDefaults, allowAttributes);

                open = open_ref0.refObj;

                close = close_ref1.refObj;;
                return this.syntaxFactory.ParameterList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>(parameters), close);
            }

            finally {
                this.pool.Free_2078(parameters);
            }
        }
        public ParseBracketedParameterList(allowDefaults: boolean = true): BracketedParameterListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && LanguageParser.CanReuseBracketedParameterList(__as__<CSharp.Syntax.BracketedParameterListSyntax>(this.CurrentNode, CSharp.Syntax.BracketedParameterListSyntax))) {
                return <BracketedParameterListSyntax>this.EatNode();
            }
            var parameters = this.pool.AllocateSeparated<ParameterSyntax>();
            try
            {
                var openKind = SyntaxKind.OpenBracketToken;
                var closeKind = SyntaxKind.CloseBracketToken;
                var open: SyntaxToken;
                var close: SyntaxToken;
                var open_ref0 = { refObj: open };
                var close_ref1 = { refObj: close };
                this.ParseParameterList(open_ref0, parameters, close_ref1, openKind, closeKind,/*allowThisKeyword:*/false,/*allowDefaults:*/allowDefaults,/*allowAttributes:*/true);

                open = open_ref0.refObj;

                close = close_ref1.refObj;;
                return this.syntaxFactory.BracketedParameterList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>(parameters), close);
            }

            finally {
                this.pool.Free_2078(parameters);
            }
        }
        private static CanReuseParameterList(list: CSharp.Syntax.ParameterListSyntax): boolean {
            if (list == null) {
                return false;
            }
            if (list.OpenParenToken.IsMissing) {
                return false;
            }
            if (list.CloseParenToken.IsMissing) {
                return false;
            }
            // for each
            var parameterEnumerator = list.Parameters.GetEnumerator();
            try {
                while (parameterEnumerator.MoveNext()) {
                    var parameter = parameterEnumerator.Current;
                    // foreach block
                    if (!LanguageParser.CanReuseParameter_9004(parameter)) {
                        return false;
                    }
                }
            } finally {
                if (parameterEnumerator !== null) parameterEnumerator.Dispose();

            }    
            // end foreach
            return true;
        }
        private static CanReuseBracketedParameterList(list: CSharp.Syntax.BracketedParameterListSyntax): boolean {
            if (list == null) {
                return false;
            }
            if (list.OpenBracketToken.IsMissing) {
                return false;
            }
            if (list.CloseBracketToken.IsMissing) {
                return false;
            }
            // for each
            var parameterEnumerator = list.Parameters.GetEnumerator();
            try {
                while (parameterEnumerator.MoveNext()) {
                    var parameter = parameterEnumerator.Current;
                    // foreach block
                    if (!LanguageParser.CanReuseParameter_9004(parameter)) {
                        return false;
                    }
                }
            } finally {
                if (parameterEnumerator !== null) parameterEnumerator.Dispose();

            }    
            // end foreach
            return true;
        }
        private ParseParameterList(open: { refObj: SyntaxToken }, nodes: SeparatedSyntaxListBuilder<ParameterSyntax>, close: { refObj: SyntaxToken }, openKind: SyntaxKind, closeKind: SyntaxKind, allowThisKeyword: boolean, allowDefaults: boolean, allowAttributes: boolean): void {
            open.refObj = this.EatToken_1865(openKind);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfParameterList;
            var attributes = this.pool.Allocate<AttributeListSyntax>();
            var modifiers = this.pool.AllocateBase();
            try
            {
                if (this.CurrentToken.Kind != closeKind) {
                    tryAgain:
                    while (true) {

                        var mustBeLastIndex: number = -1;
                        var mustBeLastHadParams: boolean = false;
                        var hasParams: boolean = false;
                        var hasArgList: boolean = false;
                        if (this.IsPossibleParameter(allowThisKeyword) || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                            attributes.Clear();
                            modifiers.Clear();
                            var parameter = this.ParseParameter(attributes, modifiers, allowThisKeyword, allowDefaults, allowAttributes);
                            nodes.Add(parameter);
                            hasParams = modifiers.Any(SyntaxKind.ParamsKeyword);
                            hasArgList = parameter.Identifier.Kind == SyntaxKind.ArgListKeyword;
                            var mustBeLast: boolean = hasParams || hasArgList;
                            if (mustBeLast && mustBeLastIndex == -1) {
                                mustBeLastIndex = nodes.Count - 1;
                                mustBeLastHadParams = hasParams;
                            }
                            while (true) {
                                if (this.CurrentToken.Kind == closeKind) {
                                    break;
                                }
                                else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleParameter(allowThisKeyword)) {
                                    nodes.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                    attributes.Clear();
                                    modifiers.Clear();
                                    parameter = this.ParseParameter(attributes, modifiers, allowThisKeyword, allowDefaults, allowAttributes);
                                    nodes.Add(parameter);
                                    hasParams = modifiers.Any(SyntaxKind.ParamsKeyword);
                                    hasArgList = parameter.Identifier.Kind == SyntaxKind.ArgListKeyword;
                                    mustBeLast = hasParams || hasArgList;
                                    if (mustBeLast && mustBeLastIndex == -1) {
                                        mustBeLastIndex = nodes.Count - 1;
                                        mustBeLastHadParams = hasParams;
                                    }
                                    continue;
                                }
                                else if (this.SkipBadParameterListTokens(open, nodes, SyntaxKind.CommaToken, closeKind, allowThisKeyword) == LanguageParser.PostSkipAction.Abort) {
                                    break;
                                }
                            }
                        }
                        else if (this.SkipBadParameterListTokens(open, nodes, SyntaxKind.IdentifierToken, closeKind, allowThisKeyword) == LanguageParser.PostSkipAction.Continue) {
                            continue tryAgain;
                        } break;
                    }
                    if (mustBeLastIndex >= 0 && mustBeLastIndex < nodes.Count - 1) {
                        nodes.$set$(mustBeLastIndex, this.AddError_1357(nodes.$get$(mustBeLastIndex), mustBeLastHadParams ? ErrorCode.ERR_ParamsLast : ErrorCode.ERR_VarargsLast));
                    }
                }
                this.termState = saveTerm;
                close.refObj = this.EatToken_1865(closeKind);
            }

            finally {
                this.pool.Free_1631(modifiers);
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(attributes));
            }
        }
        private IsEndOfParameterList(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.CloseBracketToken;
        }
        private SkipBadParameterListTokens(open: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ParameterSyntax>, expected: SyntaxKind, closeKind: SyntaxKind, allowThisKeyword: boolean): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(open, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleParameter(allowThisKeyword), p => p.CurrentToken.Kind == closeKind || p.IsTerminator(), expected);
        }
        private IsPossibleParameter(allowThisKeyword: boolean): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.RefKeyword:
                case SyntaxKind.OutKeyword:
                case SyntaxKind.ParamsKeyword:
                case SyntaxKind.ArgListKeyword:
                    return true;
                case SyntaxKind.ThisKeyword:
                    return allowThisKeyword;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier();
                default:
                    return LanguageParser.IsPredefinedType(this.CurrentToken.Kind);
            }
        }
        private static CanReuseParameter_6813(parameter: CSharp.Syntax.ParameterSyntax, attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): boolean {
            if (parameter == null) {
                return false;
            }
            if (attributes.Count != 0 || parameter.AttributeLists.Count != 0) {
                return false;
            }
            if ((modifiers != null && modifiers.Count != 0) || parameter.Modifiers.Count != 0) {
                return false;
            }
            return LanguageParser.CanReuseParameter_9004(parameter);
        }
        private static CanReuseParameter_9004(parameter: CSharp.Syntax.ParameterSyntax): boolean {
            if (parameter.Default != null) {
                return false;
            }
            var parent: CSharp.CSharpSyntaxNode = parameter.Parent;
            if (parent != null) {
                if (parent.Kind == SyntaxKind.SimpleLambdaExpression) {
                    return false;
                }
                var grandparent: CSharp.CSharpSyntaxNode = parent.Parent;
                if (grandparent != null && grandparent.Kind == SyntaxKind.ParenthesizedLambdaExpression) {
                    System.Diagnostics.Debug.Assert(parent.Kind == SyntaxKind.ParameterList);
                    return false;
                }
            }
            return true;
        }
        private ParseParameter(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, allowThisKeyword: boolean, allowDefaults: boolean, allowAttributes: boolean): ParameterSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && LanguageParser.CanReuseParameter_6813(__as__<CSharp.Syntax.ParameterSyntax>(this.CurrentNode, CSharp.Syntax.ParameterSyntax), attributes, modifiers)) {
                return <ParameterSyntax>this.EatNode();
            }
            this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(attributes), allowAttributes);
            this.ParseParameterModifiers(modifiers, allowThisKeyword);
            var hasArgList = this.CurrentToken.Kind == SyntaxKind.ArgListKeyword;
            var type: TypeSyntax = null;
            if (!hasArgList) {
                type = this.ParseType(true);
            }
            else if (this.IsPossibleType()) {
                type = this.ParseType(true);
                type = this.WithAdditionalDiagnostics(type, this.GetExpectedTokenError_1077(SyntaxKind.CloseParenToken, SyntaxKind.IdentifierToken, 0, type.Width));
            }
            var name: SyntaxToken = null;
            if (!hasArgList) {
                name = this.ParseIdentifierToken();
                if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken && this.PeekToken(1).Kind == SyntaxKind.CloseBracketToken) {
                    var open = this.EatToken_2098();
                    var close = this.EatToken_2098();
                    open = this.AddError_1357(open, ErrorCode.ERR_BadArraySyntax);
                    name = this.AddTrailingSkippedSyntax(name, SyntaxListBase.List_1257(open, close));
                }
            }
            else if (this.IsPossibleName()) {
                var diag: SyntaxDiagnosticInfo = this.GetExpectedTokenError_2124(SyntaxKind.CloseParenToken, SyntaxKind.IdentifierToken);
                name = this.ParseIdentifierToken();
                name = this.WithAdditionalDiagnostics(name, diag);
            }
            else {
                name = this.EatToken_1865(SyntaxKind.ArgListKeyword);
            }
            var def: EqualsValueClauseSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                var equals = this.EatToken_1865(SyntaxKind.EqualsToken);
                var expr = this.ParseExpression();
                def = this.syntaxFactory.EqualsValueClause(equals, expr);
                if (!allowDefaults) {
                    def = this.AddError_7816(def, equals, ErrorCode.ERR_DefaultValueNotAllowed);
                }
                else {
                    def = this.CheckFeatureAvailability(def, MessageID.IDS_FeatureOptionalParameter);
                }
            }
            return this.syntaxFactory.Parameter(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), type, name, def);
        }
        private static IsParameterModifier(kind: SyntaxKind, allowThisKeyword: boolean): boolean {
            return LanguageParser.GetParamFlags(kind, allowThisKeyword) != LanguageParser.ParamFlags.None;
        }
        private static GetParamFlags(kind: SyntaxKind, allowThisKeyword: boolean): LanguageParser.ParamFlags {
            switch (kind) {
                case SyntaxKind.ThisKeyword:
                    return (allowThisKeyword ? LanguageParser.ParamFlags.This : LanguageParser.ParamFlags.None);
                case SyntaxKind.RefKeyword:
                    return LanguageParser.ParamFlags.Ref;
                case SyntaxKind.OutKeyword:
                    return LanguageParser.ParamFlags.Out;
                case SyntaxKind.ParamsKeyword:
                    return LanguageParser.ParamFlags.Params;
                default:
                    return LanguageParser.ParamFlags.None;
            }
        }
        private ParseParameterModifiers(modifiers: SyntaxListBaseBuilder, allowThisKeyword: boolean): void {
            var flags = LanguageParser.ParamFlags.None;
            while (LanguageParser.IsParameterModifier(this.CurrentToken.Kind, allowThisKeyword)) {
                var mod = this.EatToken_2098();
                if (mod.Kind == SyntaxKind.ThisKeyword || mod.Kind == SyntaxKind.RefKeyword || mod.Kind == SyntaxKind.OutKeyword || mod.Kind == SyntaxKind.ParamsKeyword) {
                    if (mod.Kind == SyntaxKind.ThisKeyword) {
                        mod = this.CheckFeatureAvailability(mod, MessageID.IDS_FeatureExtensionMethod);
                        if ((flags & LanguageParser.ParamFlags.This) != 0) {
                            mod = this.AddError_7870(mod, ErrorCode.ERR_DupParamMod, SyntaxFacts.GetText_3915(SyntaxKind.ThisKeyword));
                        }
                        else if ((flags & LanguageParser.ParamFlags.Out) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadOutWithThis);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Ref) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadRefWithThis);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Params) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadParamModThis);
                        }
                        else {
                            flags |= LanguageParser.ParamFlags.This;
                        }
                    }
                    else if (mod.Kind == SyntaxKind.RefKeyword) {
                        if ((flags & LanguageParser.ParamFlags.Ref) != 0) {
                            mod = this.AddError_7870(mod, ErrorCode.ERR_DupParamMod, SyntaxFacts.GetText_3915(SyntaxKind.RefKeyword));
                        }
                        else if ((flags & LanguageParser.ParamFlags.This) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadRefWithThis);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Params) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_ParamsCantBeRefOut);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Out) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_MultiParamMod);
                        }
                        else {
                            flags |= LanguageParser.ParamFlags.Ref;
                        }
                    }
                    else if (mod.Kind == SyntaxKind.OutKeyword) {
                        if ((flags & LanguageParser.ParamFlags.Out) != 0) {
                            mod = this.AddError_7870(mod, ErrorCode.ERR_DupParamMod, SyntaxFacts.GetText_3915(SyntaxKind.OutKeyword));
                        }
                        else if ((flags & LanguageParser.ParamFlags.This) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadOutWithThis);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Params) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_ParamsCantBeRefOut);
                        }
                        else if ((flags & LanguageParser.ParamFlags.Ref) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_MultiParamMod);
                        }
                        else {
                            flags |= LanguageParser.ParamFlags.Out;
                        }
                    }
                    else if (mod.Kind == SyntaxKind.ParamsKeyword) {
                        if ((flags & LanguageParser.ParamFlags.Params) != 0) {
                            mod = this.AddError_7870(mod, ErrorCode.ERR_DupParamMod, SyntaxFacts.GetText_3915(SyntaxKind.ParamsKeyword));
                        }
                        else if ((flags & LanguageParser.ParamFlags.This) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_BadParamModThis);
                        }
                        else if ((flags & (LanguageParser.ParamFlags.Ref | LanguageParser.ParamFlags.Out | LanguageParser.ParamFlags.This)) != 0) {
                            mod = this.AddError_1357(mod, ErrorCode.ERR_MultiParamMod);
                        }
                        else {
                            flags |= LanguageParser.ParamFlags.Params;
                        }
                    }
                }
                modifiers.Add(mod);
            }
        }
        private ParseFixedSizeBufferDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, parentKind: SyntaxKind): MemberDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.FixedKeyword);
            var fixedToken = this.EatToken_2098();
            fixedToken = this.CheckFeatureAvailability(fixedToken, MessageID.IDS_FeatureFixedBuffer);
            modifiers.Add(fixedToken);
            var type = this.ParseType(/*parentIsParameter:*/false);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfFieldDeclaration;
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                this.ParseVariableDeclarators_1538(type, LanguageParser.VariableFlags.Fixed, variables, parentKind);
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.FieldDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables)), semicolon);
            }

            finally {
                this.termState = saveTerm;
                this.pool.Free_2078(variables);
            }
        }
        private ParseEventDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, parentKind: SyntaxKind): MemberDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.EventKeyword);
            var eventToken = this.EatToken_2098();
            var type = this.ParseType(/*parentIsParameter:*/false);
            if (this.IsFieldDeclaration(/*isEvent:*/true)) {
                return this.ParseEventFieldDeclaration(attributes, modifiers, eventToken, type, parentKind);
            }
            else {
                return this.ParseEventDeclarationWithAccessors(attributes, modifiers, eventToken, type);
            }
        }
        private ParseEventDeclarationWithAccessors(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, eventToken: SyntaxToken, type: TypeSyntax): MemberDeclarationSyntax {
            var explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax;
            var identifierOrThisOpt: SyntaxToken;
            var typeParameterList: TypeParameterListSyntax;
            var explicitInterfaceOpt_ref0 = { refObj: explicitInterfaceOpt };
            var identifierOrThisOpt_ref1 = { refObj: identifierOrThisOpt };
            var typeParameterList_ref2 = { refObj: typeParameterList };
            this.ParseMemberName(explicitInterfaceOpt_ref0, identifierOrThisOpt_ref1, typeParameterList_ref2,/*isEvent:*/true);

            explicitInterfaceOpt = explicitInterfaceOpt_ref0.refObj;

            identifierOrThisOpt = identifierOrThisOpt_ref1.refObj;

            typeParameterList = typeParameterList_ref2.refObj;;
            if (explicitInterfaceOpt != null && identifierOrThisOpt == null) {
                System.Diagnostics.Debug.Assert(typeParameterList == null, "Exit condition of ParseMemberName in this scenario");
                var missingIdentifier = LanguageParser.CreateMissingIdentifierToken();
                var missingAccessorList = this.syntaxFactory.AccessorList(SyntaxFactory.MissingToken_7070(SyntaxKind.OpenBraceToken), <SyntaxList<AccessorDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.MissingToken_7070(SyntaxKind.CloseBraceToken));
                return this.syntaxFactory.EventDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), eventToken, type, explicitInterfaceOpt, missingIdentifier, missingAccessorList);
            }
            var identifier: SyntaxToken;
            if (identifierOrThisOpt == null) {
                identifier = LanguageParser.CreateMissingIdentifierToken();
            }
            else if (identifierOrThisOpt.Kind != SyntaxKind.IdentifierToken) {
                System.Diagnostics.Debug.Assert(identifierOrThisOpt.Kind == SyntaxKind.ThisKeyword);
                identifier = this.ConvertToMissingWithTrailingTrivia(identifierOrThisOpt, SyntaxKind.IdentifierToken);
            }
            else {
                identifier = identifierOrThisOpt;
            }
            System.Diagnostics.Debug.Assert(identifier != null);
            System.Diagnostics.Debug.Assert(identifier.Kind == SyntaxKind.IdentifierToken);
            if (identifier.IsMissing && !type.IsMissing) {
                identifier = this.AddError_1357(identifier, ErrorCode.ERR_IdentifierExpected);
            }
            if (typeParameterList != null) {
                identifier = this.AddTrailingSkippedSyntax(identifier, typeParameterList);
                identifier = this.AddError_1357(identifier, ErrorCode.ERR_UnexpectedGenericName);
            }
            var accessorList = this.ParseAccessorList(/*isEvent:*/true);
            var decl = this.syntaxFactory.EventDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), eventToken, type, explicitInterfaceOpt, identifier, accessorList);
            decl = this.EatUnexpectedTrailingSemicolon(decl);
            return decl;
        }
        private EatUnexpectedTrailingSemicolon<TNode extends CSharpSyntaxNode>(decl: TNode): TNode {
            if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                var semi = this.EatToken_2098();
                semi = this.AddError_1357(semi, ErrorCode.ERR_UnexpectedSemicolon);
                decl = this.AddTrailingSkippedSyntax(decl, semi);
            }
            return decl;
        }
        private ParseNormalFieldDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, type: TypeSyntax, parentKind: SyntaxKind): FieldDeclarationSyntax {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfFieldDeclaration;
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                this.ParseVariableDeclarators_1538(type,/*flags:*/0,/*variables:*/variables,/*parentKind:*/parentKind);
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.FieldDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables)), semicolon);
            }

            finally {
                this.termState = saveTerm;
                this.pool.Free_2078(variables);
            }
        }
        private ParseEventFieldDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, eventToken: SyntaxToken, type: TypeSyntax, parentKind: SyntaxKind): MemberDeclarationSyntax {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfFieldDeclaration;
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                this.ParseVariableDeclarators_1538(type,/*flags:*/0,/*variables:*/variables,/*parentKind:*/parentKind);
                if (this.CurrentToken.Kind == SyntaxKind.DotToken) {
                    eventToken = this.AddError_1357(eventToken, ErrorCode.ERR_ExplicitEventFieldImpl);
                }
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.EventFieldDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), eventToken, this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables)), semicolon);
            }

            finally {
                this.termState = saveTerm;
                this.pool.Free_2078(variables);
            }
        }
        private IsEndOfFieldDeclaration(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
        }
        private ParseVariableDeclarators_1538(type: TypeSyntax, flags: LanguageParser.VariableFlags, variables: SeparatedSyntaxListBuilder<VariableDeclaratorSyntax>, parentKind: SyntaxKind): void {
            var variableDeclarationsExpected: boolean = parentKind != SyntaxKind.NamespaceDeclaration && (parentKind != SyntaxKind.CompilationUnit || this.IsScript);
            this.ParseVariableDeclarators_9514(type, flags, variables, variableDeclarationsExpected);
        }
        private ParseVariableDeclarators_9514(type: TypeSyntax, flags: LanguageParser.VariableFlags, variables: SeparatedSyntaxListBuilder<VariableDeclaratorSyntax>, variableDeclarationsExpected: boolean): void {
            variables.Add(this.ParseVariableDeclarator(type, flags,/*isFirst:*/true, false));
            while (true) {
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    break;
                }
                else if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                    variables.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                    variables.Add(this.ParseVariableDeclarator(type, flags,/*isFirst:*/false, false));
                }
                else if (!variableDeclarationsExpected || this.SkipBadVariableListTokens(variables, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                    break;
                }
            }
        }
        private SkipBadVariableListTokens(list: SeparatedSyntaxListBuilder<VariableDeclaratorSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var tmp: CSharpSyntaxNode = null;
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp_ref0 = { refObj: tmp };
            var ret_val__880 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => this.CurrentToken.Kind != SyntaxKind.CommaToken, p => this.CurrentToken.Kind == SyntaxKind.SemicolonToken || this.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__880;
        }
        private static GetOriginalModifiers(decl: CSharp.CSharpSyntaxNode): SyntaxTokenList {
            if (decl != null) {
                switch (decl.Kind) {
                    case SyntaxKind.FieldDeclaration:
                        return (<CSharp.Syntax.FieldDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.MethodDeclaration:
                        return (<CSharp.Syntax.MethodDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.ConstructorDeclaration:
                        return (<CSharp.Syntax.ConstructorDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.DestructorDeclaration:
                        return (<CSharp.Syntax.DestructorDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.PropertyDeclaration:
                        return (<CSharp.Syntax.PropertyDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.EventFieldDeclaration:
                        return (<CSharp.Syntax.EventFieldDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.AddAccessorDeclaration:
                    case SyntaxKind.RemoveAccessorDeclaration:
                    case SyntaxKind.GetAccessorDeclaration:
                    case SyntaxKind.SetAccessorDeclaration:
                        return (<CSharp.Syntax.AccessorDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.StructDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        return (<CSharp.Syntax.TypeDeclarationSyntax>decl).Modifiers;
                    case SyntaxKind.DelegateDeclaration:
                        return (<CSharp.Syntax.DelegateDeclarationSyntax>decl).Modifiers;
                }
            }
            return structDefault(SyntaxTokenList);
        }
        private static WasFirstVariable(variable: CSharp.Syntax.VariableDeclaratorSyntax): boolean {
            var parent = __as__<CSharp.Syntax.VariableDeclarationSyntax>(LanguageParser.GetOldParent(variable), CSharp.Syntax.VariableDeclarationSyntax);
            if (parent != null) {
                return parent.Variables.$get$(0) == variable;
            }
            return false;
        }
        private static GetOriginalVariableFlags(old: CSharp.Syntax.VariableDeclaratorSyntax): LanguageParser.VariableFlags {
            var parent = LanguageParser.GetOldParent(old);
            var mods = LanguageParser.GetOriginalModifiers(parent);
            var flags: LanguageParser.VariableFlags = 0;
            if (CSharpExtensions.Any_2090(mods,
                SyntaxKind.FixedKeyword)) {
                flags |= LanguageParser.VariableFlags.Fixed;
            }
            if (CSharpExtensions.Any_2090(mods,
                SyntaxKind.ConstKeyword)) {
                flags |= LanguageParser.VariableFlags.Const;
            }
            if (parent != null && (parent.Kind == SyntaxKind.VariableDeclaration || parent.Kind == SyntaxKind.LocalDeclarationStatement)) {
                flags |= LanguageParser.VariableFlags.Local;
            }
            return flags;
        }
        private static CanReuseVariableDeclarator(old: CSharp.Syntax.VariableDeclaratorSyntax, flags: LanguageParser.VariableFlags, isFirst: boolean): boolean {
            if (old == null) {
                return false;
            }
            var oldKind: SyntaxKind = 0;
            return (flags == LanguageParser.GetOriginalVariableFlags(old)) && (isFirst == LanguageParser.WasFirstVariable(old)) && old.Initializer == null && (oldKind = LanguageParser.GetOldParent(old).Kind) != SyntaxKind.VariableDeclaration && oldKind != SyntaxKind.LocalDeclarationStatement;
        }
        private ParseVariableDeclarator(parentType: TypeSyntax, flags: LanguageParser.VariableFlags, isFirst: boolean, isExpressionContext: boolean = false): VariableDeclaratorSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && LanguageParser.CanReuseVariableDeclarator(__as__<CSharp.Syntax.VariableDeclaratorSyntax>(this.CurrentNode, CSharp.Syntax.VariableDeclaratorSyntax), flags, isFirst)) {
                return <VariableDeclaratorSyntax>this.EatNode();
            }
            if (!isExpressionContext) {
                var resetPoint = this.GetResetPoint_LanguageParser();
                try
                {
                    var currentTokenKind = this.CurrentToken.Kind;
                    if (currentTokenKind == SyntaxKind.IdentifierToken && !parentType.IsMissing) {
                        var isAfterNewLine = parentType.GetLastToken().TrailingTrivia.Any_1043(SyntaxKind.EndOfLineTrivia);
                        if (isAfterNewLine) {
                            var offset: number = 0, width = 0;
                            var offset_ref0 = { refObj: offset };
                            var width_ref1 = { refObj: width };
                            this.GetDiagnosticSpanForMissingToken(offset_ref0, width_ref1);

                            offset = offset_ref0.refObj;

                            width = width_ref1.refObj;;
                            this.EatToken_2098();
                            currentTokenKind = this.CurrentToken.Kind;
                            var isNonEqualsBinaryToken = currentTokenKind != SyntaxKind.EqualsToken && SyntaxFacts.IsBinaryExpressionOperatorToken(currentTokenKind);
                            if (currentTokenKind == SyntaxKind.DotToken || currentTokenKind == SyntaxKind.MinusGreaterThanToken || isNonEqualsBinaryToken) {
                                var missingIdentifier = LanguageParser.CreateMissingIdentifierToken();
                                missingIdentifier = this.AddError_1911(missingIdentifier, offset, width, ErrorCode.ERR_IdentifierExpected);
                                return this.syntaxFactory.VariableDeclarator(missingIdentifier, null, null);
                            }
                        }
                    }
                }

                finally {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Release_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                }
            }
            var name = this.ParseIdentifierToken();
            var argumentList: BracketedArgumentListSyntax = null;
            var initializer: EqualsValueClauseSyntax = null;
            var saveTerm: LanguageParser.TerminatorState = this.termState;
            var isFixed: boolean = (flags & LanguageParser.VariableFlags.Fixed) != 0;
            var isConst: boolean = (flags & LanguageParser.VariableFlags.Const) != 0;
            var isLocal: boolean = (flags & LanguageParser.VariableFlags.Local) != 0;
            if (!isFirst && this.IsTrueIdentifier()) {
                name = this.AddError_1357(name, ErrorCode.ERR_MultiTypeInDeclaration);
            }
            var __tSwitch50 = this.CurrentToken.Kind;
            while (true) {
                var __tDefault61 = false;
                switch (__tSwitch50) {
                    case SyntaxKind.EqualsToken:
                        if (isFixed) {
                            __tDefault61 = true; break;
                        }
                        var equals = this.EatToken_2098();
                        var init = this.ParseVariableInitializer(isLocal && !isConst);
                        initializer = this.syntaxFactory.EqualsValueClause(equals, init);
                        break;
                    case SyntaxKind.OpenParenToken:
                        this.termState |= LanguageParser.TerminatorState.IsPossibleEndOfVariableDeclaration;
                        argumentList = this.ParseBracketedArgumentList();
                        this.termState = saveTerm;
                        argumentList = this.AddError_1357(argumentList, ErrorCode.ERR_BadVarDecl);
                        break;
                    case SyntaxKind.OpenBracketToken:
                        var sawNonOmittedSize: boolean = false;
                        this.termState |= LanguageParser.TerminatorState.IsPossibleEndOfVariableDeclaration;
                        var sawNonOmittedSize_ref0 = { refObj: sawNonOmittedSize };
                        var ret_val__617 = this.ParseArrayRankSpecifier(/*isArrayCreation:*/false,/*expectSizes:*/flags == LanguageParser.VariableFlags.Fixed,/*sawNonOmittedSize:*/sawNonOmittedSize_ref0);

                        sawNonOmittedSize = sawNonOmittedSize_ref0.refObj;
                        var specifier = ret_val__617;
                        this.termState = saveTerm;
                        var open = specifier.OpenBracketToken;
                        var sizes = specifier.Sizes;
                        var close = specifier.CloseBracketToken;
                        if (isFixed && !sawNonOmittedSize) {
                            close = this.AddError_1357(close, ErrorCode.ERR_ValueExpected);
                        }
                        var args = this.pool.AllocateSeparated<ArgumentSyntax>();
                        try
                        {
                            var withSeps = sizes.GetWithSeparators();
                            // for each
                            var itemEnumerator = withSeps.GetEnumerator();

                            while (itemEnumerator.MoveNext()) {
                                var item = itemEnumerator.Current;
                                // foreach block
                                var expression = __as__<ExpressionSyntax>(item, ExpressionSyntax);
                                if (expression != null) {
                                    args.Add(this.syntaxFactory.Argument(null, null, expression));
                                }
                                else {
                                    args.AddSeparator(<SyntaxToken>item);
                                }
                            }    
                            // end foreach
                            argumentList = this.syntaxFactory.BracketedArgumentList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentSyntax>(args), close);
                            if (!isFixed) {
                                argumentList = this.AddError_1357(argumentList, ErrorCode.ERR_CStyleArray);
                                if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                                    __tSwitch50 = SyntaxKind.EqualsToken; continue;
                                }
                            }
                        }

                        finally {
                            this.pool.Free_2078(args);
                        }
                        break;
                    default:
                        if (isConst) {
                            name = this.AddError_1357(name, ErrorCode.ERR_ConstValueRequired);
                        }
                        else if (isFixed) {
                            if (parentType.Kind == SyntaxKind.ArrayType) {
                                name = this.AddError_1357(name, ErrorCode.ERR_FixedDimsRequired);
                            }
                            else {
                                __tSwitch50 = SyntaxKind.OpenBracketToken; continue;
                            }
                        }
                        break;
                }


                if (__tDefault61) {
                    if (isConst) {
                        name = this.AddError_1357(name, ErrorCode.ERR_ConstValueRequired);
                    }
                    else if (isFixed) {
                        if (parentType.Kind == SyntaxKind.ArrayType) {
                            name = this.AddError_1357(name, ErrorCode.ERR_FixedDimsRequired);
                        }
                        else {
                            __tSwitch50 = SyntaxKind.OpenBracketToken; continue;
                        }
                    }
                    break;
                }

                break;
            }

            return this.syntaxFactory.VariableDeclarator(name, argumentList, initializer);
        }
        private IsPossibleEndOfVariableDeclaration(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.CommaToken:
                case SyntaxKind.SemicolonToken:
                    return true;
                default:
                    return false;
            }
        }
        private ParseVariableInitializer(allowStackAlloc: boolean): ExpressionSyntax {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.StackAllocKeyword:
                    var stackAllocExpr: StackAllocArrayCreationExpressionSyntax = this.ParseStackAllocExpression();
                    if (!allowStackAlloc) {
                        stackAllocExpr = this.AddErrorToFirstToken_6118(stackAllocExpr, ErrorCode.ERR_InvalidExprTerm, SyntaxFacts.GetText_3915(SyntaxKind.StackAllocKeyword));
                    }
                    return stackAllocExpr;
                case SyntaxKind.OpenBraceToken:
                    return this.ParseArrayInitializer();
                default:
                    return this.ParseElementInitializer();
            }
        }
        private IsPossibleVariableInitializer(allowStack: boolean): boolean {
            return (allowStack && this.CurrentToken.Kind == SyntaxKind.StackAllocKeyword) || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.IsPossibleExpression();
        }
        private ParseConstantFieldDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder, parentKind: SyntaxKind): FieldDeclarationSyntax {
            var constToken = this.EatToken_1865(SyntaxKind.ConstKeyword);
            modifiers.Add(constToken);
            var type = this.ParseType(false);
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                this.ParseVariableDeclarators_1538(type, LanguageParser.VariableFlags.Const, variables, parentKind);
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.FieldDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables)), semicolon);
            }

            finally {
                this.pool.Free_2078(variables);
            }
        }
        private ParseDelegateDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): DelegateDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.DelegateKeyword);
            var delegateToken = this.EatToken_1865(SyntaxKind.DelegateKeyword);
            var type = this.ParseReturnType();
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfMethodSignature;
            var name = this.ParseIdentifierToken();
            var typeParameters = this.ParseTypeParameterList(/*allowVariance:*/true);
            var parameterList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/false,/*allowDefaults:*/true,/*allowAttributes:*/true);
            var constraints = <SyntaxListBuilder<TypeParameterConstraintClauseSyntax>> structDefault(SyntaxListBuilder);
            try
            {
                if (this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                    constraints = this.pool.Allocate<TypeParameterConstraintClauseSyntax>();
                    this.ParseTypeParameterConstraintClauses(typeParameters != null, SyntaxListBuilder.op_Implicit_1734(constraints));
                }
                this.termState = saveTerm;
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.DelegateDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), delegateToken, type, name, typeParameters, parameterList, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraints), semicolon);
            }

            finally {
                if (!constraints.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(constraints));
                }
            }
        }
        private ParseEnumDeclaration(attributes: SyntaxListBuilder<AttributeListSyntax>, modifiers: SyntaxListBaseBuilder): EnumDeclarationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.EnumKeyword);
            var enumToken = this.EatToken_1865(SyntaxKind.EnumKeyword);
            var name = this.ParseIdentifierToken();
            var typeParameters = this.ParseTypeParameterList(/*allowVariance:*/true);
            if (typeParameters != null) {
                name = this.AddTrailingSkippedSyntax(name, typeParameters);
                name = this.AddError_1357(name, ErrorCode.ERR_UnexpectedGenericName);
            }
            var baseList: BaseListSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                var colon = this.EatToken_1865(SyntaxKind.ColonToken);
                var type = this.ParseType(false);
                var tmpList = this.pool.AllocateSeparated<BaseTypeSyntax>();
                tmpList.Add(this.syntaxFactory.SimpleBaseType(type));
                baseList = this.syntaxFactory.BaseList(colon, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseTypeSyntax>(tmpList));
                this.pool.Free_2078(tmpList);
            }
            var members = <SeparatedSyntaxList<EnumMemberDeclarationSyntax>> structDefault(SeparatedSyntaxList);
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            if (!openBrace.IsMissing) {
                var builder = this.pool.AllocateSeparated<EnumMemberDeclarationSyntax>();
                try
                {
                    var openBrace_ref0 = { refObj: openBrace };
                    this.ParseEnumMemberDeclarations(openBrace_ref0, builder);

                    openBrace = openBrace_ref0.refObj;;
                    members = builder.ToList();
                }

                finally {
                    this.pool.Free_2078(builder);
                }
            }
            var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
            var semicolon: SyntaxToken = null;
            if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                semicolon = this.EatToken_2098();
            }
            return this.syntaxFactory.EnumDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributes), SyntaxListBuilderExtensions.ToTokenList(modifiers), enumToken, name, baseList, openBrace, members, closeBrace, semicolon);
        }
        private ParseEnumMemberDeclarations(openBrace: { refObj: SyntaxToken }, members: SeparatedSyntaxListBuilder<EnumMemberDeclarationSyntax>): void {
            if (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken) {
                tryAgain:
                while (true) {

                    if (this.IsPossibleEnumMemberDeclaration() || this.CurrentToken.Kind == SyntaxKind.CommaToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                        members.Add(this.ParseEnumMemberDeclaration());
                        while (true) {
                            if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                break;
                            }
                            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken || this.IsPossibleEnumMemberDeclaration()) {
                                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                                    members.AddSeparator(this.EatTokenWithPrejudice_1765(SyntaxKind.CommaToken));
                                }
                                else {
                                    members.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                }
                                if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                    break;
                                }
                                else if (!this.IsPossibleEnumMemberDeclaration()) {
                                    continue tryAgain;
                                }
                                members.Add(this.ParseEnumMemberDeclaration());
                                continue;
                            }
                            else if (this.SkipBadEnumMemberListTokens(openBrace, members, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                                break;
                            }
                        }
                    }
                    else if (this.SkipBadEnumMemberListTokens(openBrace, members, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Continue) {
                        continue tryAgain;
                    } break;
                }
            }
        }
        private SkipBadEnumMemberListTokens(openBrace: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<EnumMemberDeclarationSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(openBrace, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && p.CurrentToken.Kind != SyntaxKind.SemicolonToken && !p.IsPossibleEnumMemberDeclaration(), p => p.CurrentToken.Kind == SyntaxKind.CloseBraceToken || p.IsTerminator(), expected);
        }
        private ParseEnumMemberDeclaration(): EnumMemberDeclarationSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.EnumMemberDeclaration) {
                return <EnumMemberDeclarationSyntax>this.EatNode();
            }
            var memberAttrs = this.pool.Allocate<AttributeListSyntax>();
            try
            {
                this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(memberAttrs));
                var memberName = this.ParseIdentifierToken();
                var equalsValue: EqualsValueClauseSyntax = null;
                if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                    var equals = this.EatToken_1865(SyntaxKind.EqualsToken);
                    var value: ExpressionSyntax;
                    if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                        value = this.CreateMissingIdentifierName();
                        value = this.AddErrorToFirstToken_3098(value, ErrorCode.ERR_ConstantExpected);
                    }
                    else {
                        value = this.ParseExpression();
                    }
                    equalsValue = this.syntaxFactory.EqualsValueClause(equals, value);
                }
                return this.syntaxFactory.EnumMemberDeclaration(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(memberAttrs), memberName, equalsValue);
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(memberAttrs));
            }
        }
        private IsPossibleEnumMemberDeclaration(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.OpenBracketToken || this.IsTrueIdentifier();
        }
        private IsDotOrColonColon(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.DotToken || this.CurrentToken.Kind == SyntaxKind.ColonColonToken;
        }
        public ParseName(): NameSyntax {
            return this.ParseQualifiedName();
        }
        private CreateMissingIdentifierName(): IdentifierNameSyntax {
            return this.syntaxFactory.IdentifierName(LanguageParser.CreateMissingIdentifierToken());
        }
        private static CreateMissingIdentifierToken(): SyntaxToken {
            return SyntaxFactory.MissingToken_7070(SyntaxKind.IdentifierToken);
        }
        private IsTrueIdentifier(): boolean {
            if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                if (!this.IsCurrentTokenPartialKeywordOfPartialMethodOrType() && !this.IsCurrentTokenQueryKeywordInQuery()) {
                    return true;
                }
            }
            return false;
        }
        private ParseIdentifierName(): IdentifierNameSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.IdentifierName) {
                if (!SyntaxFacts.IsContextualKeyword(CSharpExtensions.CSharpKind_1238((<CSharp.Syntax.IdentifierNameSyntax>this.CurrentNode).Identifier))) {
                    return <IdentifierNameSyntax>this.EatNode();
                }
            }
            var tk = this.ParseIdentifierToken();
            return SyntaxFactory.IdentifierName(tk);
        }
        private ParseIdentifierToken(): SyntaxToken {
            var ctk = this.CurrentToken.Kind;
            if (ctk == SyntaxKind.IdentifierToken) {
                if (this.IsCurrentTokenPartialKeywordOfPartialMethodOrType() || this.IsCurrentTokenQueryKeywordInQuery()) {
                    var result = LanguageParser.CreateMissingIdentifierToken();
                    result = this.AddError_7870(result, ErrorCode.ERR_InvalidExprTerm, this.CurrentToken.Text);
                    return result;
                }
                var identifierToken: SyntaxToken = this.EatToken_2098();
                if (this.IsInAsync && identifierToken.ContextualKind == SyntaxKind.AwaitKeyword) {
                    identifierToken = this.AddError_1357(identifierToken, ErrorCode.ERR_BadAwaitAsIdentifier);
                }
                return identifierToken;
            }
            else {
                var name = LanguageParser.CreateMissingIdentifierToken();
                name = this.AddError_1357(name, ErrorCode.ERR_IdentifierExpected);
                return name;
            }
        }
        private IsCurrentTokenQueryKeywordInQuery(): boolean {
            return this.IsInQuery && this.IsCurrentTokenQueryContextualKeyword;
        }
        private IsCurrentTokenPartialKeywordOfPartialMethodOrType(): boolean {
            if (this.CurrentToken.ContextualKind == SyntaxKind.PartialKeyword) {
                if (this.IsPartialType() || this.IsPartialMember()) {
                    return true;
                }
            }
            return false;
        }
        private ParseTypeParameterList(allowVariance: boolean): TypeParameterListSyntax {
            if (this.CurrentToken.Kind != SyntaxKind.LessThanToken) {
                return null;
            }
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfTypeParameterList;
            try
            {
                var parameters = this.pool.AllocateSeparated<TypeParameterSyntax>();
                var open = this.EatToken_1865(SyntaxKind.LessThanToken);
                open = this.CheckFeatureAvailability(open, MessageID.IDS_FeatureGenerics);
                parameters.Add(this.ParseTypeParameter(allowVariance));
                while (true) {
                    if (this.CurrentToken.Kind == SyntaxKind.GreaterThanToken || this.IsPossibleTypeParameterConstraintClauseStart()) {
                        break;
                    }
                    else if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        parameters.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                        parameters.Add(this.ParseTypeParameter(allowVariance));
                    }
                    else if (this.SkipBadTypeParameterListTokens(parameters, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                        break;
                    }
                }
                var close = this.EatToken_1865(SyntaxKind.GreaterThanToken);
                return this.syntaxFactory.TypeParameterList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterSyntax>(parameters), close);
            }

            finally {
                this.termState = saveTerm;
            }
        }
        private SkipBadTypeParameterListTokens(list: SeparatedSyntaxListBuilder<TypeParameterSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var tmp: CSharpSyntaxNode = null;
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp_ref0 = { refObj: tmp };
            var ret_val__804 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => this.CurrentToken.Kind != SyntaxKind.CommaToken, p => this.CurrentToken.Kind == SyntaxKind.GreaterThanToken || this.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__804;
        }
        private ParseTypeParameter(allowVariance: boolean): TypeParameterSyntax {
            if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                return this.syntaxFactory.TypeParameter(<SyntaxList<AttributeListSyntax>> structDefault(SyntaxList), null, this.AddError_1357(LanguageParser.CreateMissingIdentifierToken(), ErrorCode.ERR_IdentifierExpected));
            }
            var attrs = this.pool.Allocate<AttributeListSyntax>();
            try
            {
                if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken && this.PeekToken(1).Kind != SyntaxKind.CloseBracketToken) {
                    var saveTerm = this.termState;
                    this.termState = LanguageParser.TerminatorState.IsEndOfTypeArgumentList;
                    this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(attrs));
                    this.termState = saveTerm;
                }
                var varianceToken: SyntaxToken = null;
                if (this.CurrentToken.Kind == SyntaxKind.InKeyword || this.CurrentToken.Kind == SyntaxKind.OutKeyword) {
                    varianceToken = this.EatToken_2098();
                    varianceToken = this.CheckFeatureAvailability(varianceToken, MessageID.IDS_FeatureTypeVariance);
                    if (!allowVariance) {
                        varianceToken = this.AddError_1357(varianceToken, ErrorCode.ERR_IllegalVarianceSyntax);
                    }
                }
                return this.syntaxFactory.TypeParameter(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attrs), varianceToken, this.ParseIdentifierToken());
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(attrs));
            }
        }
        private ParseSimpleName(options: LanguageParser.NameOptions = LanguageParser.NameOptions.None): SimpleNameSyntax {
            var id = this.ParseIdentifierName();
            if (id.Identifier.IsMissing) {
                return id;
            }
            var name: SimpleNameSyntax = id;
            if (this.CurrentToken.Kind == SyntaxKind.LessThanToken) {
                var pt = this.GetResetPoint_LanguageParser();
                var kind = this.ScanTypeArgumentList((options & LanguageParser.NameOptions.InExpression) != 0);
                var pt_ref0 = { refObj: pt };
                this.Reset_LanguageParser(pt_ref0);

                pt = pt_ref0.refObj;;
                var pt_ref0 = { refObj: pt };
                this.Release_LanguageParser(pt_ref0);

                pt = pt_ref0.refObj;;
                if (kind == LanguageParser.ScanTypeArgumentListKind.DefiniteTypeArgumentList || (kind == LanguageParser.ScanTypeArgumentListKind.PossibleTypeArgumentList && (options & LanguageParser.NameOptions.InTypeList) != 0)) {
                    System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.LessThanToken);
                    var open: SyntaxToken;
                    var types = this.pool.AllocateSeparated<TypeSyntax>();
                    var close: SyntaxToken;
                    var open_ref0 = { refObj: open };
                    var close_ref1 = { refObj: close };
                    this.ParseTypeArgumentList(open_ref0, types, close_ref1);

                    open = open_ref0.refObj;

                    close = close_ref1.refObj;;
                    name = this.syntaxFactory.GenericName(id.Identifier, this.syntaxFactory.TypeArgumentList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>(types), close));
                    this.pool.Free_2078(types);
                }
            }
            return name;
        }
        private ScanTypeArgumentList(inExpression: boolean): LanguageParser.ScanTypeArgumentListKind {
            if (this.CurrentToken.Kind == SyntaxKind.LessThanToken) {
                if (inExpression) {
                    if (this.ScanPossibleTypeArgumentList_1851()) {
                        var tokenID = this.CurrentToken.Kind;
                        if (tokenID != SyntaxKind.OpenParenToken && tokenID != SyntaxKind.CloseParenToken && tokenID != SyntaxKind.CloseBracketToken && tokenID != SyntaxKind.ColonToken && tokenID != SyntaxKind.SemicolonToken && tokenID != SyntaxKind.CommaToken && tokenID != SyntaxKind.DotToken && tokenID != SyntaxKind.QuestionToken && tokenID != SyntaxKind.EqualsEqualsToken && tokenID != SyntaxKind.ExclamationEqualsToken && tokenID != SyntaxKind.AmpersandAmpersandToken && tokenID != SyntaxKind.BarBarToken && tokenID != SyntaxKind.CaretToken && tokenID != SyntaxKind.BarToken && tokenID != SyntaxKind.CloseBraceToken && tokenID != SyntaxKind.EndOfFileToken) {
                            return LanguageParser.ScanTypeArgumentListKind.PossibleTypeArgumentList;
                        }
                        else {
                            return LanguageParser.ScanTypeArgumentListKind.DefiniteTypeArgumentList;
                        }
                    }
                }
                else {
                    return LanguageParser.ScanTypeArgumentListKind.DefiniteTypeArgumentList;
                }
            }
            return LanguageParser.ScanTypeArgumentListKind.NotTypeArgumentList;
        }
        private ScanPossibleTypeArgumentList_1851(): boolean {
            var lastTokenOfList: SyntaxToken = null;
            return (() => {
                var lastTokenOfList_ref0 = { refObj: lastTokenOfList };
                var ret_val__285 = this.ScanPossibleTypeArgumentList_1988(lastTokenOfList_ref0);

                lastTokenOfList = lastTokenOfList_ref0.refObj;
                return ret_val__285;
            })() != LanguageParser.ScanTypeFlags.NotType;
        }
        private ScanPossibleTypeArgumentList_1988(lastTokenOfList: { refObj: SyntaxToken }): LanguageParser.ScanTypeFlags {
            if (this.CurrentToken.Kind == SyntaxKind.LessThanToken) {
                var result: LanguageParser.ScanTypeFlags = LanguageParser.ScanTypeFlags.GenericTypeOrExpression;
                do {
                    lastTokenOfList.refObj = this.EatToken_2098();
                    if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken) {
                        return result;
                    }
                    if (this.CurrentToken.Kind == SyntaxKind.GreaterThanToken) {
                        lastTokenOfList.refObj = this.EatToken_2098();
                        return result;
                    }
                    switch (this.ScanType_7346(lastTokenOfList)) {
                        case LanguageParser.ScanTypeFlags.NotType:
                            lastTokenOfList.refObj = null;
                            return LanguageParser.ScanTypeFlags.NotType;
                        case LanguageParser.ScanTypeFlags.MustBeType:
                        case LanguageParser.ScanTypeFlags.GenericTypeOrMethod:
                            result = LanguageParser.ScanTypeFlags.GenericTypeOrMethod;
                            break;
                    }
                }
                while (this.CurrentToken.Kind == SyntaxKind.CommaToken);
                if (this.CurrentToken.Kind != SyntaxKind.GreaterThanToken) {
                    lastTokenOfList.refObj = null;
                    return LanguageParser.ScanTypeFlags.NotType;
                }
                lastTokenOfList.refObj = this.EatToken_2098();
                return result;
            }
            return LanguageParser.ScanTypeFlags.NonGenericTypeOrExpression;
        }
        private ParseTypeArgumentList(open: { refObj: SyntaxToken }, types: SeparatedSyntaxListBuilder<TypeSyntax>, close: { refObj: SyntaxToken }): void {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.LessThanToken);
            open.refObj = this.EatToken_1865(SyntaxKind.LessThanToken);
            open.refObj = this.CheckFeatureAvailability(open.refObj, MessageID.IDS_FeatureGenerics);
            if (this.IsOpenName()) {
                var omittedTypeArgumentInstance = this.syntaxFactory.OmittedTypeArgument(SyntaxFactory.Token_1045(SyntaxKind.OmittedTypeArgumentToken));
                types.Add(omittedTypeArgumentInstance);
                while (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                    types.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                    types.Add(omittedTypeArgumentInstance);
                }
                close.refObj = this.EatToken_1865(SyntaxKind.GreaterThanToken);
                return
            }
            types.Add(this.ParseTypeArgument());
            while (true) {
                if (this.CurrentToken.Kind == SyntaxKind.GreaterThanToken || this.IsPossibleTypeParameterConstraintClauseStart()) {
                    break;
                }
                else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleType()) {
                    types.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                    types.Add(this.ParseTypeArgument());
                }
                else if (this.SkipBadTypeArgumentListTokens(types, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                    break;
                }
            }
            close.refObj = this.EatToken_1865(SyntaxKind.GreaterThanToken);
        }
        private SkipBadTypeArgumentListTokens(list: SeparatedSyntaxListBuilder<TypeSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var tmp: CSharpSyntaxNode = null;
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp_ref0 = { refObj: tmp };
            var ret_val__247 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => this.CurrentToken.Kind != SyntaxKind.CommaToken && !this.IsPossibleType(), p => this.CurrentToken.Kind == SyntaxKind.GreaterThanToken || this.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__247;
        }
        private ParseTypeArgument(): TypeSyntax {
            if (this.IsPossibleTypeParameterConstraintClauseStart()) {
                return this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_TypeExpected);
            }
            var attrs = this.pool.Allocate<AttributeListSyntax>();
            try
            {
                if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken && this.PeekToken(1).Kind != SyntaxKind.CloseBracketToken) {
                    var saveTerm = this.termState;
                    this.termState = LanguageParser.TerminatorState.IsEndOfTypeArgumentList;
                    this.ParseAttributeDeclarations(SyntaxListBuilder.op_Implicit_1734(attrs));
                    this.termState = saveTerm;
                }
                var varianceToken: SyntaxToken = null;
                if (this.CurrentToken.Kind == SyntaxKind.InKeyword || this.CurrentToken.Kind == SyntaxKind.OutKeyword) {
                    varianceToken = this.EatToken_2098();
                    varianceToken = this.CheckFeatureAvailability(varianceToken, MessageID.IDS_FeatureTypeVariance);
                    varianceToken = this.AddError_1357(varianceToken, ErrorCode.ERR_IllegalVarianceSyntax);
                }
                var result = this.ParseType(/*parentIsParameter:*/false);
                if (varianceToken != null) {
                    result = this.AddLeadingSkippedSyntax(result, varianceToken);
                }
                if (attrs.Count > 0) {
                    result = this.AddLeadingSkippedSyntax(result, attrs.ToListNode());
                    result = this.AddError_1357(result, ErrorCode.ERR_TypeExpected);
                }
                return result;
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(attrs));
            }
        }
        private IsEndOfTypeArgumentList(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.GreaterThanToken;
        }
        private IsOpenName(): boolean {
            var isOpen: boolean = true;
            var n: number = 0;
            while (this.PeekToken(n).Kind == SyntaxKind.CommaToken) {
                n++;
            }
            if (this.PeekToken(n).Kind != SyntaxKind.GreaterThanToken) {
                isOpen = false;
            }
            return isOpen;
        }
        private ParseMemberName(explicitInterfaceOpt: { refObj: ExplicitInterfaceSpecifierSyntax }, identifierOrThisOpt: { refObj: SyntaxToken }, typeParameterListOpt: { refObj: TypeParameterListSyntax }, isEvent: boolean): void {
            identifierOrThisOpt.refObj = null;
            explicitInterfaceOpt.refObj = null;
            typeParameterListOpt.refObj = null;
            if (!this.IsPossibleMemberName()) {
                return
            }
            var explicitInterfaceName: NameSyntax = null;
            var separator: SyntaxToken = null;
            var beforeIdentifierPoint: LanguageParser.ResetPointLanguageParser = structDefault(LanguageParser.ResetPointLanguageParser);
            var beforeIdentifierPointSet: boolean = false;
            try
            {
                while (true) {
                    if (this.CurrentToken.Kind == SyntaxKind.ThisKeyword) {
                        beforeIdentifierPoint = this.GetResetPoint_LanguageParser();
                        beforeIdentifierPointSet = true;
                        identifierOrThisOpt.refObj = this.EatToken_2098();
                        typeParameterListOpt.refObj = this.ParseTypeParameterList(/*allowVariance:*/false);
                        break;
                    }
                    var point = this.GetResetPoint_LanguageParser();
                    var isMemberName: boolean = false;
                    try
                    {
                        this.ScanNamedTypePart_1670();
                        isMemberName = !this.IsDotOrColonColon();
                    }

                    finally {
                        var point_ref0 = { refObj: point };
                        this.Reset_LanguageParser(point_ref0);

                        point = point_ref0.refObj;;
                        var point_ref0 = { refObj: point };
                        this.Release_LanguageParser(point_ref0);

                        point = point_ref0.refObj;;
                    }
                    if (isMemberName) {
                        beforeIdentifierPoint = this.GetResetPoint_LanguageParser();
                        beforeIdentifierPointSet = true;
                        if (separator != null && separator.Kind == SyntaxKind.ColonColonToken) {
                            separator = this.AddError_1357(separator, ErrorCode.ERR_AliasQualAsExpression);
                            separator = this.ConvertToMissingWithTrailingTrivia(separator, SyntaxKind.DotToken);
                        }
                        identifierOrThisOpt.refObj = this.ParseIdentifierToken();
                        typeParameterListOpt.refObj = this.ParseTypeParameterList(/*allowVariance:*/false);
                        break;
                    }
                    else {
                        var saveTerm = this.termState;
                        this.termState |= LanguageParser.TerminatorState.IsEndOfNameInExplicitInterface;
                        if (explicitInterfaceName == null) {
                            explicitInterfaceName = this.ParseSimpleName(LanguageParser.NameOptions.InTypeList);
                            separator = this.CurrentToken.Kind == SyntaxKind.ColonColonToken ? this.EatToken_2098() : this.EatToken_1865(SyntaxKind.DotToken);
                        }
                        else {
                            var tmp = this.ParseQualifiedNameRight(LanguageParser.NameOptions.InTypeList, explicitInterfaceName, separator);
                            System.Diagnostics.Debug.Assert(!ReferenceEquals(tmp, explicitInterfaceName), "We should have consumed something and updated explicitInterfaceName");
                            explicitInterfaceName = tmp;
                            separator = this.CurrentToken.Kind == SyntaxKind.ColonColonToken ? this.ConvertToMissingWithTrailingTrivia(this.EatToken_2098(), SyntaxKind.DotToken) : this.EatToken_1865(SyntaxKind.DotToken);
                        }
                        this.termState = saveTerm;
                    }
                }
                if (explicitInterfaceName != null) {
                    if (separator.Kind != SyntaxKind.DotToken) {
                        separator = this.WithAdditionalDiagnostics(separator, this.GetExpectedTokenError_1077(SyntaxKind.DotToken, separator.Kind, separator.GetLeadingTriviaWidth(), separator.Width));
                        separator = this.ConvertToMissingWithTrailingTrivia(separator, SyntaxKind.DotToken);
                    }
                    if (isEvent && this.CurrentToken.Kind != SyntaxKind.OpenBraceToken) {
                        explicitInterfaceOpt.refObj = this.syntaxFactory.ExplicitInterfaceSpecifier(explicitInterfaceName, this.AddError_1357(separator, ErrorCode.ERR_ExplicitEventFieldImpl));
                        System.Diagnostics.Debug.Assert(beforeIdentifierPointSet);
                        var beforeIdentifierPoint_ref0 = { refObj: beforeIdentifierPoint };
                        this.Reset_LanguageParser(beforeIdentifierPoint_ref0);

                        beforeIdentifierPoint = beforeIdentifierPoint_ref0.refObj;;
                        identifierOrThisOpt.refObj = null;
                        typeParameterListOpt.refObj = null;
                    }
                    else {
                        explicitInterfaceOpt.refObj = this.syntaxFactory.ExplicitInterfaceSpecifier(explicitInterfaceName, separator);
                    }
                }
            }

            finally {
                if (beforeIdentifierPointSet) {
                    var beforeIdentifierPoint_ref0 = { refObj: beforeIdentifierPoint };
                    this.Release_LanguageParser(beforeIdentifierPoint_ref0);

                    beforeIdentifierPoint = beforeIdentifierPoint_ref0.refObj;;
                }
            }
        }
        private ParseAliasQualifiedName(allowedParts: LanguageParser.NameOptions = LanguageParser.NameOptions.None): NameSyntax {
            var name: NameSyntax = this.ParseSimpleName(allowedParts);
            if (this.CurrentToken.Kind == SyntaxKind.ColonColonToken) {
                var token = this.EatToken_2098();
                name = this.ParseQualifiedNameRight(allowedParts, name, token);
            }
            return name;
        }
        private ParseQualifiedName(options: LanguageParser.NameOptions = LanguageParser.NameOptions.None): NameSyntax {
            var name: NameSyntax = this.ParseAliasQualifiedName(options);
            while (this.IsDotOrColonColon()) {
                if (this.PeekToken(1).Kind == SyntaxKind.ThisKeyword) {
                    break;
                }
                var separator = this.EatToken_2098();
                name = this.ParseQualifiedNameRight(options, name, separator);
            }
            return name;
        }
        private ParseQualifiedNameRight(options: LanguageParser.NameOptions, left: NameSyntax, separator: SyntaxToken): NameSyntax {
            var right = this.ParseSimpleName(options);
            if (separator.Kind == SyntaxKind.DotToken) {
                return this.syntaxFactory.QualifiedName(left, separator, right);
            }
            else if (separator.Kind == SyntaxKind.ColonColonToken) {
                if (left.Kind != SyntaxKind.IdentifierName) {
                    separator = this.AddError_7870(separator, ErrorCode.ERR_UnexpectedAliasedName, separator.ToString());
                }
                var identifierLeft = __as__<IdentifierNameSyntax>(left, IdentifierNameSyntax);
                if (identifierLeft == null) {
                    separator = this.ConvertToMissingWithTrailingTrivia(separator, SyntaxKind.DotToken);
                    return this.syntaxFactory.QualifiedName(left, separator, right);
                }
                else {
                    if (identifierLeft.Identifier.ContextualKind == SyntaxKind.GlobalKeyword) {
                        identifierLeft = this.syntaxFactory.IdentifierName(LanguageParser.ConvertToKeyword(identifierLeft.Identifier));
                    }
                    identifierLeft = this.CheckFeatureAvailability(identifierLeft, MessageID.IDS_FeatureGlobalNamespace);
                    return this.WithAdditionalDiagnostics_Arr(this.syntaxFactory.AliasQualifiedName(identifierLeft, separator, right), left.GetDiagnostics());
                }
            }
            else {
                return left;
            }
        }
        private ConvertToMissingWithTrailingTrivia(token: SyntaxToken, expectedKind: SyntaxKind): SyntaxToken {
            var newToken = SyntaxFactory.MissingToken_7070(expectedKind);
            newToken = this.AddTrailingSkippedSyntax(newToken, token);
            return newToken;
        }
        private IsPossibleType(): boolean {
            var tk = this.CurrentToken.Kind;
            return LanguageParser.IsPredefinedType(tk) || this.IsTrueIdentifier();
        }
        private IsPossibleName(): boolean {
            return this.IsTrueIdentifier();
        }
        private ScanType_7309(): LanguageParser.ScanTypeFlags {
            var lastTokenOfType: SyntaxToken;
            var lastTokenOfType_ref0 = { refObj: lastTokenOfType };
            var ret_val__12 = this.ScanType_7346(lastTokenOfType_ref0);

            lastTokenOfType = lastTokenOfType_ref0.refObj;
            return ret_val__12;
        }
        private ScanType_7346(lastTokenOfType: { refObj: SyntaxToken }): LanguageParser.ScanTypeFlags {
            var result: LanguageParser.ScanTypeFlags = this.ScanNonArrayType_1475(lastTokenOfType);
            if (result == LanguageParser.ScanTypeFlags.NotType) {
                return result;
            }
            while (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken) {
                this.EatToken_2098();
                if (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                    while (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        this.EatToken_2098();
                    }
                    if (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                        lastTokenOfType.refObj = null;
                        return LanguageParser.ScanTypeFlags.NotType;
                    }
                }
                lastTokenOfType.refObj = this.EatToken_2098();
                result = LanguageParser.ScanTypeFlags.MustBeType;
            }
            return result;
        }
        private ScanNamedTypePart_1670(): void {
            var lastTokenOfType: SyntaxToken;
            var lastTokenOfType_ref0 = { refObj: lastTokenOfType };
            this.ScanNamedTypePart_1461(lastTokenOfType_ref0);

            lastTokenOfType = lastTokenOfType_ref0.refObj;;
        }
        private ScanNamedTypePart_1461(lastTokenOfType: { refObj: SyntaxToken }): LanguageParser.ScanTypeFlags {
            if (this.CurrentToken.Kind != SyntaxKind.IdentifierToken || !this.IsTrueIdentifier()) {
                lastTokenOfType.refObj = null;
                return LanguageParser.ScanTypeFlags.NotType;
            }
            lastTokenOfType.refObj = this.EatToken_2098();
            if (this.CurrentToken.Kind == SyntaxKind.LessThanToken) {
                return this.ScanPossibleTypeArgumentList_1988(lastTokenOfType);
            }
            else {
                return LanguageParser.ScanTypeFlags.NonGenericTypeOrExpression;
            }
        }
        private ScanNonArrayType_1055(): LanguageParser.ScanTypeFlags {
            var lastTokenOfType: SyntaxToken;
            var lastTokenOfType_ref0 = { refObj: lastTokenOfType };
            var ret_val__469 = this.ScanNonArrayType_1475(lastTokenOfType_ref0);

            lastTokenOfType = lastTokenOfType_ref0.refObj;
            return ret_val__469;
        }
        private ScanNonArrayType_1475(lastTokenOfType: { refObj: SyntaxToken }): LanguageParser.ScanTypeFlags {
            var result: LanguageParser.ScanTypeFlags = 0;
            if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                result = this.ScanNamedTypePart_1461(lastTokenOfType);
                if (result == LanguageParser.ScanTypeFlags.NotType) {
                    return LanguageParser.ScanTypeFlags.NotType;
                }
                var isAlias: boolean = this.CurrentToken.Kind == SyntaxKind.ColonColonToken;
                for (var firstLoop: boolean = true; this.IsDotOrColonColon(); firstLoop = false) {
                    if (!firstLoop && isAlias) {
                        isAlias = false;
                    }
                    lastTokenOfType.refObj = this.EatToken_2098();
                    result = this.ScanNamedTypePart_1461(lastTokenOfType);
                    if (result == LanguageParser.ScanTypeFlags.NotType) {
                        return LanguageParser.ScanTypeFlags.NotType;
                    }
                }
                if (isAlias) {
                    result = LanguageParser.ScanTypeFlags.AliasQualifiedName;
                }
            }
            else if (LanguageParser.IsPredefinedType(this.CurrentToken.Kind)) {
                lastTokenOfType.refObj = this.EatToken_2098();
                result = LanguageParser.ScanTypeFlags.MustBeType;
            }
            else {
                lastTokenOfType.refObj = null;
                return LanguageParser.ScanTypeFlags.NotType;
            }
            if (this.CurrentToken.Kind == SyntaxKind.QuestionToken) {
                lastTokenOfType.refObj = this.EatToken_2098();
                result = LanguageParser.ScanTypeFlags.NullableType;
            }
            while (this.CurrentToken.Kind == SyntaxKind.AsteriskToken) {
                lastTokenOfType.refObj = this.EatToken_2098();
                if (result == LanguageParser.ScanTypeFlags.GenericTypeOrExpression || result == LanguageParser.ScanTypeFlags.NonGenericTypeOrExpression) {
                    result = LanguageParser.ScanTypeFlags.PointerOrMultiplication;
                }
                else if (result == LanguageParser.ScanTypeFlags.GenericTypeOrMethod) {
                    result = LanguageParser.ScanTypeFlags.MustBeType;
                }
            }
            return result;
        }
        private static IsPredefinedType(keyword: SyntaxKind): boolean {
            return SyntaxFacts.IsPredefinedType(keyword);
        }
        public ParseTypeName(): TypeSyntax {
            return this.ParseType(/*parentIsParameter:*/false);
        }
        private ParseTypeOrVoid(): TypeSyntax {
            if (this.CurrentToken.Kind == SyntaxKind.VoidKeyword && this.PeekToken(1).Kind != SyntaxKind.AsteriskToken) {
                return this.syntaxFactory.PredefinedType(this.EatToken_2098());
            }
            return this.ParseType(/*parentIsParameter:*/false);
        }
        private ParseType(parentIsParameter: boolean): TypeSyntax {
            return this.ParseTypeCore(parentIsParameter,/*isOrAs:*/false,/*expectSizes:*/false,/*isArrayCreation:*/false);
        }
        private IsTerm(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.ArgListKeyword:
                case SyntaxKind.MakeRefKeyword:
                case SyntaxKind.RefTypeKeyword:
                case SyntaxKind.RefValueKeyword:
                case SyntaxKind.BaseKeyword:
                case SyntaxKind.CheckedKeyword:
                case SyntaxKind.DefaultKeyword:
                case SyntaxKind.DelegateKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.SizeOfKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.UncheckedKeyword:
                case SyntaxKind.NumericLiteralToken:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.StringLiteralToken:
                case SyntaxKind.CharacterLiteralToken:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.EqualsGreaterThanToken:
                case SyntaxKind.InterpolatedStringToken:
                case SyntaxKind.InterpolatedStringStartToken:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier();
                default:
                    return false;
            }
        }
        private ParseTypeCore(parentIsParameter: boolean, isOrAs: boolean, expectSizes: boolean, isArrayCreation: boolean): TypeSyntax {
            var type = this.ParseUnderlyingType(parentIsParameter);
            if (this.CurrentToken.Kind == SyntaxKind.QuestionToken) {
                var resetPoint = this.GetResetPoint_LanguageParser();
                try
                {
                    var question = this.EatToken_2098();
                    if (isOrAs && (this.IsTerm() || LanguageParser.IsPredefinedType(this.CurrentToken.Kind) || SyntaxFacts.IsAnyUnaryExpression(this.CurrentToken.Kind))) {
                        var resetPoint_ref0 = { refObj: resetPoint };
                        this.Reset_LanguageParser(resetPoint_ref0);

                        resetPoint = resetPoint_ref0.refObj;;
                        System.Diagnostics.Debug.Assert(type != null);
                        return type;
                    }
                    question = this.CheckFeatureAvailability(question, MessageID.IDS_FeatureNullable);
                    type = this.syntaxFactory.NullableType(type, question);
                }

                finally {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Release_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                }
            }
            type = this.ParsePointerTypeMods(type);
            if (this.IsPossibleRankAndDimensionSpecifier()) {
                var ranks = this.pool.Allocate<ArrayRankSpecifierSyntax>();
                try
                {
                    while (this.IsPossibleRankAndDimensionSpecifier()) {
                        var unused: boolean = false;
                        var unused_ref0 = { refObj: unused };
                        var ret_val__336 = this.ParseArrayRankSpecifier(isArrayCreation, expectSizes, unused_ref0);

                        unused = unused_ref0.refObj;
                        var rank = ret_val__336;
                        ranks.Add(rank);
                        expectSizes = false;
                    }
                    type = this.syntaxFactory.ArrayType(type, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayRankSpecifierSyntax>(ranks));
                }

                finally {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(ranks));
                }
            }
            System.Diagnostics.Debug.Assert(type != null);
            return type;
        }
        private IsPossibleRankAndDimensionSpecifier(): boolean {
            if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken) {
                return true;
            }
            return false;
        }
        private ParseArrayRankSpecifier(isArrayCreation: boolean, expectSizes: boolean, sawNonOmittedSize: { refObj: boolean }): ArrayRankSpecifierSyntax {
            sawNonOmittedSize.refObj = false;
            var sawOmittedSize: boolean = false;
            var open = this.EatToken_1865(SyntaxKind.OpenBracketToken);
            var list = this.pool.AllocateSeparated<ExpressionSyntax>();
            try
            {
                var omittedArraySizeExpressionInstance = this.syntaxFactory.OmittedArraySizeExpression(SyntaxFactory.Token_1045(SyntaxKind.OmittedArraySizeExpressionToken));
                while (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                    if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        sawOmittedSize = true;
                        list.Add(omittedArraySizeExpressionInstance);
                        list.AddSeparator(this.EatToken_2098());
                    }
                    else if (this.IsPossibleExpression()) {
                        var size = this.ParseExpression();
                        sawNonOmittedSize.refObj = true;
                        if (!expectSizes) {
                            size = this.AddError_1357(size, isArrayCreation ? ErrorCode.ERR_InvalidArray : ErrorCode.ERR_ArraySizeInDeclaration);
                        }
                        list.Add(size);
                        if (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                            list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                        }
                    }
                    else if ((() => {
                        var open_ref0 = { refObj: open };
                        var ret_val__314 = this.SkipBadArrayRankSpecifierTokens(open_ref0, list, SyntaxKind.CommaToken);

                        open = open_ref0.refObj;
                        return ret_val__314;
                    })() == LanguageParser.PostSkipAction.Abort) {
                        break;
                    }
                }
                if (((list.Count & 1) == 0)) {
                    sawOmittedSize = true;
                    list.Add(omittedArraySizeExpressionInstance);
                }
                if (sawOmittedSize && sawNonOmittedSize.refObj) {
                    for (var i: number = 0; i < list.Count; i++) {
                        if (list.$get$(i).Kind == SyntaxKind.OmittedArraySizeExpression) {
                            var width: number = list.$get$(i).Width;
                            var offset: number = list.$get$(i).GetLeadingTriviaWidth();
                            list.$set$(i, this.AddError_1911(this.CreateMissingIdentifierName(), offset, width, ErrorCode.ERR_ValueExpected));
                        }
                    }
                }
                var close = this.EatToken_1865(SyntaxKind.CloseBracketToken);
                return this.syntaxFactory.ArrayRankSpecifier(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(list), close);
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private SkipBadArrayRankSpecifierTokens(openBracket: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(openBracket, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleExpression(), p => p.CurrentToken.Kind == SyntaxKind.CloseBracketToken || p.IsTerminator(), expected);
        }
        private ParseUnderlyingType(parentIsParameter: boolean): TypeSyntax {
            if (LanguageParser.IsPredefinedType(this.CurrentToken.Kind)) {
                var token = this.EatToken_2098();
                if (token.Kind == SyntaxKind.VoidKeyword && this.CurrentToken.Kind != SyntaxKind.AsteriskToken) {
                    token = this.AddError_1357(token, parentIsParameter ? ErrorCode.ERR_NoVoidParameter : ErrorCode.ERR_NoVoidHere);
                }
                return this.syntaxFactory.PredefinedType(token);
            }
            else if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                return this.ParseQualifiedName();
            }
            else {
                var name = this.CreateMissingIdentifierName();
                return this.AddError_1357(name, ErrorCode.ERR_TypeExpected);
            }
        }
        private ParsePointerTypeMods(type: TypeSyntax): TypeSyntax {
            while (this.CurrentToken.Kind == SyntaxKind.AsteriskToken) {
                type = this.syntaxFactory.PointerType(type, this.EatToken_2098());
            }
            return type;
        }
        public ParseStatement(): StatementSyntax {
            try
            {
                this.recursionDepth++;
                if (this.recursionDepth > LanguageParser.MaxUncheckedRecursionDepth) {
                    LanguageParser.ensureSufficientExecutionStack();
                }
                if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNode instanceof CSharp.Syntax.StatementSyntax) {
                    return <StatementSyntax>this.EatNode();
                }
                var result: StatementSyntax = this.ParseStatementNoDeclaration(/*allowAnyExpression:*/false);
                if (result != null) {
                    return result;
                }
                return this.ParsePossibleBadAwaitStatement_1460();
            }

            finally {
                this.recursionDepth--;
            }
        }
        private ParsePossibleBadAwaitStatement_1460(): StatementSyntax {
            var resetPointBeforeStatement: LanguageParser.ResetPointLanguageParser = this.GetResetPoint_LanguageParser();
            var resetPointBeforeStatement_ref0 = { refObj: resetPointBeforeStatement };
            var ret_val__302 = this.ParsePossibleBadAwaitStatement_1438(resetPointBeforeStatement_ref0);

            resetPointBeforeStatement = resetPointBeforeStatement_ref0.refObj;
            var result: StatementSyntax = ret_val__302;
            var resetPointBeforeStatement_ref0 = { refObj: resetPointBeforeStatement };
            this.Release_LanguageParser(resetPointBeforeStatement_ref0);

            resetPointBeforeStatement = resetPointBeforeStatement_ref0.refObj;;
            return result;
        }
        private ParsePossibleBadAwaitStatement_1438(resetPointBeforeStatement: { refObj: LanguageParser.ResetPointLanguageParser }): StatementSyntax {
            var beginsWithAwait: boolean = this.CurrentToken.ContextualKind == SyntaxKind.AwaitKeyword;
            var result: StatementSyntax = this.ParseLocalDeclarationStatement();
            if (!beginsWithAwait || !result.ContainsDiagnostics) {
                return result;
            }
            System.Diagnostics.Debug.Assert(!this.IsInAsync);
            this.Reset_LanguageParser(resetPointBeforeStatement);
            this.IsInAsync = true;
            result = this.ParseStatementNoDeclaration(/*allowAnyExpression:*/false);
            this.IsInAsync = false;
            if (!result.ContainsDiagnostics) {
                return result;
            }
            this.Reset_LanguageParser(resetPointBeforeStatement);
            result = this.ParseLocalDeclarationStatement();
            System.Diagnostics.Debug.Assert(result.ContainsDiagnostics);
            return result;
        }
        private ParseStatementNoDeclaration(allowAnyExpression: boolean): StatementSyntax {
            var __tSwitch10 = this.CurrentToken.Kind;
            while (true) {
                var __tDefault26 = false;
                switch (__tSwitch10) {
                    case SyntaxKind.FixedKeyword:
                        return this.ParseFixedStatement();
                    case SyntaxKind.BreakKeyword:
                        return this.ParseBreakStatement();
                    case SyntaxKind.ContinueKeyword:
                        return this.ParseContinueStatement();
                    case SyntaxKind.TryKeyword:
                    case SyntaxKind.CatchKeyword:
                    case SyntaxKind.FinallyKeyword:
                        return this.ParseTryStatement();
                    case SyntaxKind.CheckedKeyword:
                    case SyntaxKind.UncheckedKeyword:
                        return this.ParseCheckedStatement();
                    case SyntaxKind.ConstKeyword:
                        return null;
                    case SyntaxKind.DoKeyword:
                        return this.ParseDoStatement();
                    case SyntaxKind.ForKeyword:
                    case SyntaxKind.ForEachKeyword:
                        return this.ParseForOrForEachStatement();
                    case SyntaxKind.GotoKeyword:
                        return this.ParseGotoStatement();
                    case SyntaxKind.IfKeyword:
                        return this.ParseIfStatement();
                    case SyntaxKind.LockKeyword:
                        return this.ParseLockStatement();
                    case SyntaxKind.ReturnKeyword:
                        return this.ParseReturnStatement();
                    case SyntaxKind.SwitchKeyword:
                        return this.ParseSwitchStatement();
                    case SyntaxKind.ThrowKeyword:
                        return this.ParseThrowStatement();
                    case SyntaxKind.UnsafeKeyword:
                        return this.ParseUnsafeStatement();
                    case SyntaxKind.UsingKeyword:
                        return this.ParseUsingStatement();
                    case SyntaxKind.WhileKeyword:
                        return this.ParseWhileStatement();
                    case SyntaxKind.OpenBraceToken:
                        return this.ParseBlock();
                    case SyntaxKind.SemicolonToken:
                        return this.syntaxFactory.EmptyStatement(this.EatToken_2098());
                    case SyntaxKind.IdentifierToken:
                        if (this.IsPossibleLabeledStatement()) {
                            return this.ParseLabeledStatement();
                        }
                        else if (this.IsPossibleYieldStatement()) {
                            return this.ParseYieldStatement();
                        }
                        else if (this.IsPossibleAwaitExpressionStatement()) {
                            return this.ParseExpressionStatement_1651();
                        }
                        else if (this.IsQueryExpression(/*mayBeVariableDeclaration:*/true,/*mayBeMemberDeclaration:*/allowAnyExpression)) {
                            return this.ParseExpressionStatement_1863(this.ParseQueryExpression());
                        }
                        else {
                            __tDefault26 = true; break;
                        }
                    default:
                        if (this.IsPossibleLocalDeclarationStatement(allowAnyExpression)) {
                            return null;
                        }
                        else {
                            return this.ParseExpressionStatement_1651();
                        }
                }


                if (__tDefault26) {
                    if (this.IsPossibleLocalDeclarationStatement(allowAnyExpression)) {
                        return null;
                    }
                    else {
                        return this.ParseExpressionStatement_1651();
                    }
                }

                break;
            }

        }
        private IsPossibleLabeledStatement(): boolean {
            return this.PeekToken(1).Kind == SyntaxKind.ColonToken && this.IsTrueIdentifier();
        }
        private IsPossibleYieldStatement(): boolean {
            return this.CurrentToken.ContextualKind == SyntaxKind.YieldKeyword && (this.PeekToken(1).Kind == SyntaxKind.ReturnKeyword || this.PeekToken(1).Kind == SyntaxKind.BreakKeyword);
        }
        private IsPossibleLocalDeclarationStatement(allowAnyExpression: boolean): boolean {
            var tk = this.CurrentToken.Kind;
            if ((SyntaxFacts.IsPredefinedType(tk) && this.PeekToken(1).Kind != SyntaxKind.DotToken) || LanguageParser.IsDeclarationModifier(tk)) {
                return true;
            }
            var typedIdentifier: boolean = LanguageParser.IsPossibleTypedIdentifierStart(this.CurrentToken, this.PeekToken(1),/*allowThisKeyword:*/false);
            if (typedIdentifier != null) {
                return typedIdentifier;
            }
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                var st: LanguageParser.ScanTypeFlags = this.ScanType_7309();
                if (st == LanguageParser.ScanTypeFlags.MustBeType && this.CurrentToken.Kind != SyntaxKind.DotToken) {
                    return true;
                }
                if (st == LanguageParser.ScanTypeFlags.NotType || this.CurrentToken.Kind != SyntaxKind.IdentifierToken) {
                    return false;
                }
                if (allowAnyExpression) {
                    if (st == LanguageParser.ScanTypeFlags.PointerOrMultiplication) {
                        return false;
                    }
                    else if (st == LanguageParser.ScanTypeFlags.NullableType) {
                        return this.IsPossibleDeclarationStatementFollowingNullableType();
                    }
                }
                return true;
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private IsPossibleDeclarationStatementFollowingNullableType(): boolean {
            if (this.IsFieldDeclaration(/*isEvent:*/false)) {
                return this.IsPossibleFieldDeclarationFollowingNullableType();
            }
            var explicitInterfaceOpt: ExplicitInterfaceSpecifierSyntax;
            var identifierOrThisOpt: SyntaxToken;
            var typeParameterListOpt: TypeParameterListSyntax;
            var explicitInterfaceOpt_ref0 = { refObj: explicitInterfaceOpt };
            var identifierOrThisOpt_ref1 = { refObj: identifierOrThisOpt };
            var typeParameterListOpt_ref2 = { refObj: typeParameterListOpt };
            this.ParseMemberName(explicitInterfaceOpt_ref0, identifierOrThisOpt_ref1, typeParameterListOpt_ref2,/*isEvent:*/false);

            explicitInterfaceOpt = explicitInterfaceOpt_ref0.refObj;

            identifierOrThisOpt = identifierOrThisOpt_ref1.refObj;

            typeParameterListOpt = typeParameterListOpt_ref2.refObj;;
            if (explicitInterfaceOpt == null && identifierOrThisOpt == null && typeParameterListOpt == null) {
                return false;
            }
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                return true;
            }
            if (identifierOrThisOpt.Kind == SyntaxKind.ThisKeyword) {
                return false;
            }
            return this.IsPossibleMethodDeclarationFollowingNullableType();
        }
        private IsPossibleFieldDeclarationFollowingNullableType(): boolean {
            if (this.CurrentToken.Kind != SyntaxKind.IdentifierToken) {
                return false;
            }
            this.EatToken_2098();
            if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                var saveTerm = this.termState;
                this.termState |= LanguageParser.TerminatorState.IsEndOfFieldDeclaration;
                this.EatToken_2098();
                this.ParseVariableInitializer(/*allowStackAlloc:*/false);
                this.termState = saveTerm;
            }
            return this.CurrentToken.Kind == SyntaxKind.CommaToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
        }
        private IsPossibleMethodDeclarationFollowingNullableType(): boolean {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfMethodSignature;
            var paramList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/true,/*allowDefaults:*/true,/*allowAttributes:*/true);
            this.termState = saveTerm;
            var separatedParameters = paramList.Parameters.GetWithSeparators();
            if (!paramList.CloseParenToken.IsMissing) {
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword) {
                    return true;
                }
                if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                    return false;
                }
            }
            if (separatedParameters.Count == 0) {
                return false;
            }
            var parameter = <ParameterSyntax>separatedParameters.$get$(0);
            if (parameter.AttributeLists.Count > 0) {
                return true;
            }
            for (var i: number = 0; i < parameter.Modifiers.Count; i++) {
                if (parameter.Modifiers.$get$(i).Kind == SyntaxKind.ParamsKeyword) {
                    return true;
                }
            }
            if (parameter.Type == null) {
                if (parameter.Identifier.Kind == SyntaxKind.ArgListKeyword) {
                    return true;
                }
            }
            else if (parameter.Type.Kind == SyntaxKind.NullableType) {
                if (parameter.Modifiers.Count > 0) {
                    return true;
                }
                if (!parameter.Identifier.IsMissing && (separatedParameters.Count >= 2 && !separatedParameters.$get$(1).IsMissing || separatedParameters.Count == 1 && !paramList.CloseParenToken.IsMissing)) {
                    return true;
                }
            }
            else if (parameter.Type.Kind == SyntaxKind.IdentifierName && (<IdentifierNameSyntax>parameter.Type).Identifier.ContextualKind == SyntaxKind.FromKeyword) {
                return false;
            }
            else {
                if (!parameter.Identifier.IsMissing) {
                    return true;
                }
            }
            return false;
        }
        private IsPossibleNewExpression(): boolean {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.NewKeyword);
            var nextToken: SyntaxToken = this.PeekToken(1);
            switch (nextToken.Kind) {
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.OpenBracketToken:
                    return true;
            }
            if (SyntaxFacts.GetBaseTypeDeclarationKind(nextToken.Kind) != SyntaxKind.None) {
                return false;
            }
            var modifier: LanguageParser.SyntaxModifier = LanguageParser.GetModifier(nextToken);
            if (modifier == LanguageParser.SyntaxModifier.Partial) {
                if (SyntaxFacts.IsPredefinedType(this.PeekToken(2).Kind)) {
                    return false;
                }
                if (LanguageParser.IsPossibleStartOfTypeDeclaration(this.PeekToken(2).Kind)) {
                    return false;
                }
            }
            else if (modifier != LanguageParser.SyntaxModifier.None) {
                return false;
            }
            var typedIdentifier: boolean = LanguageParser.IsPossibleTypedIdentifierStart(nextToken, this.PeekToken(2),/*allowThisKeyword:*/true);
            if (typedIdentifier != null) {
                return !typedIdentifier;
            }
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                this.EatToken_2098();
                var st: LanguageParser.ScanTypeFlags = this.ScanType_7309();
                return !this.IsPossibleMemberName() || st == LanguageParser.ScanTypeFlags.NotType;
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private static IsPossibleTypedIdentifierStart(current: SyntaxToken, next: SyntaxToken, allowThisKeyword: boolean): boolean {
            if (current.Kind == SyntaxKind.IdentifierToken) {
                switch (next.Kind) {
                    case SyntaxKind.DotToken:
                    case SyntaxKind.AsteriskToken:
                    case SyntaxKind.QuestionToken:
                    case SyntaxKind.OpenBracketToken:
                    case SyntaxKind.LessThanToken:
                    case SyntaxKind.ColonColonToken:
                        return null;
                    case SyntaxKind.IdentifierToken:
                        return true;
                    case SyntaxKind.ThisKeyword:
                        return allowThisKeyword;
                    default:
                        return false;
                }
            }
            return null;
        }
        private ParseBlock(isMethodBody: boolean = false, isAccessorBody: boolean = false): BlockSyntax {
            System.Diagnostics.Debug.Assert(!isAccessorBody || isMethodBody, "An accessor body is a method body.");
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.Block) {
                return <BlockSyntax>this.EatNode();
            }
            var openBrace = isAccessorBody && this.CurrentToken.Kind != SyntaxKind.OpenBraceToken ? this.AddError_1357(SyntaxFactory.MissingToken_7070(SyntaxKind.OpenBraceToken), ErrorCode.ERR_SemiOrLBraceExpected) : this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var statements = this.pool.Allocate<StatementSyntax>();
            try
            {
                var tmp: CSharpSyntaxNode = openBrace;
                var tmp_ref0 = { refObj: tmp };
                this.ParseStatements(tmp_ref0, statements,/*stopOnSwitchSections:*/false);

                tmp = tmp_ref0.refObj;;
                openBrace = <SyntaxToken>tmp;
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                var statementList: SyntaxList<StatementSyntax> = <SyntaxList<StatementSyntax>> structDefault(SyntaxList);
                if (isMethodBody && LanguageParser.IsLargeEnoughNonEmptyStatementList(statements)) {
                    statementList = new SyntaxList<StatementSyntax>().ctor_1319(SyntaxListBase.List_2130((SyntaxListBuilder.op_Implicit_1734(statements)).ToArray()));
                }
                else {
                    statementList = SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>(statements);
                }
                return this.syntaxFactory.Block(openBrace, statementList, closeBrace);
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(statements));
            }
        }
        private static IsLargeEnoughNonEmptyStatementList(statements: SyntaxListBuilder<StatementSyntax>): boolean {
            if (statements.Count == 0) {
                return false;
            }
            else if (statements.Count == 1) {
                return statements.$get$(0).Width > 60;
            }
            else {
                return true;
            }
        }
        private ParseStatements(previousNode: { refObj: CSharpSyntaxNode }, statements: SyntaxListBuilder<StatementSyntax>, stopOnSwitchSections: boolean): void {
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsPossibleStatementStartOrStop;
            if (stopOnSwitchSections) {
                this.termState |= LanguageParser.TerminatorState.IsSwitchSectionStart;
            }
            while (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken && this.CurrentToken.Kind != SyntaxKind.EndOfFileToken && !(stopOnSwitchSections && this.IsPossibleSwitchSection())) {
                if (this.IsPossibleStatement()) {
                    var statement = this.ParseStatement();
                    statements.Add(statement);
                }
                else {
                    var trailingTrivia: CSharpSyntaxNode;
                    var trailingTrivia_ref0 = { refObj: trailingTrivia };
                    var ret_val__950 = this.SkipBadStatementListTokens(statements, SyntaxKind.CloseBraceToken, trailingTrivia_ref0);

                    trailingTrivia = trailingTrivia_ref0.refObj;
                    var action = ret_val__950;
                    if (trailingTrivia != null) {
                        previousNode.refObj = this.AddTrailingSkippedSyntax(previousNode.refObj, trailingTrivia);
                    }
                    if (action == LanguageParser.PostSkipAction.Abort) {
                        break;
                    }
                }
            }
            this.termState = saveTerm;
        }
        private IsPossibleStatementStartOrStop(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.SemicolonToken || this.IsPossibleStatement();
        }
        private SkipBadStatementListTokens(statements: SyntaxListBuilder<StatementSyntax>, expected: SyntaxKind, trailingTrivia: { refObj: CSharpSyntaxNode }): LanguageParser.PostSkipAction {
            return this.SkipBadListTokensWithExpectedKindHelper(SyntaxListBuilder.op_Implicit_1734(statements), p => !p.IsPossibleStatement(), p => p.CurrentToken.Kind == SyntaxKind.CloseBraceToken || p.IsTerminator(), expected, trailingTrivia);
        }
        private IsPossibleStatement(): boolean {
            var tk = this.CurrentToken.Kind;
            switch (tk) {
                case SyntaxKind.FixedKeyword:
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.ContinueKeyword:
                case SyntaxKind.TryKeyword:
                case SyntaxKind.CheckedKeyword:
                case SyntaxKind.UncheckedKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.DoKeyword:
                case SyntaxKind.ForKeyword:
                case SyntaxKind.ForEachKeyword:
                case SyntaxKind.GotoKeyword:
                case SyntaxKind.IfKeyword:
                case SyntaxKind.LockKeyword:
                case SyntaxKind.ReturnKeyword:
                case SyntaxKind.SwitchKeyword:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.UnsafeKeyword:
                case SyntaxKind.UsingKeyword:
                case SyntaxKind.WhileKeyword:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.SemicolonToken:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.ReadOnlyKeyword:
                case SyntaxKind.VolatileKeyword:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier();
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.FinallyKeyword:
                    return !this.isInTry;
                default:
                    return LanguageParser.IsPredefinedType(tk) || this.IsPossibleExpression();
            }
        }
        private ParseFixedStatement(): FixedStatementSyntax {
            var $fixed = this.EatToken_1865(SyntaxKind.FixedKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var type: TypeSyntax;
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                var saveTerm = this.termState;
                this.termState |= LanguageParser.TerminatorState.IsEndOfFixedStatement;
                var type_ref0 = { refObj: type };
                this.ParseDeclaration(false, type_ref0, variables);

                type = type_ref0.refObj;;
                this.termState = saveTerm;
                var decl = this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables));
                var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                var statement: StatementSyntax = this.ParseEmbeddedStatement(false);
                return this.syntaxFactory.FixedStatement($fixed, openParen, decl, closeParen, statement);
            }

            finally {
                this.pool.Free_2078(variables);
            }
        }
        private IsEndOfFixedStatement(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
        }
        private ParseEmbeddedStatement(complexCheck: boolean): StatementSyntax {
            var statement: StatementSyntax;
            if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken && (!complexCheck || this.PeekToken(1).Kind == SyntaxKind.OpenBraceToken)) {
                statement = this.ParseStatement();
                statement = this.AddError_1357(statement, ErrorCode.WRN_PossibleMistakenNullStatement);
            }
            else {
                statement = this.ParseStatement();
            }
            if (statement != null && (statement.Kind == SyntaxKind.LabeledStatement || statement.Kind == SyntaxKind.LocalDeclarationStatement)) {
                statement = this.AddError_1357(statement, ErrorCode.ERR_BadEmbeddedStmt);
            }
            return statement;
        }
        private ParseBreakStatement(): BreakStatementSyntax {
            var breakKeyword = this.EatToken_1865(SyntaxKind.BreakKeyword);
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.BreakStatement(breakKeyword, semicolon);
        }
        private ParseContinueStatement(): ContinueStatementSyntax {
            var continueKeyword = this.EatToken_1865(SyntaxKind.ContinueKeyword);
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.ContinueStatement(continueKeyword, semicolon);
        }
        private ParseTryStatement(): TryStatementSyntax {
            var isInTry = this.isInTry;
            this.isInTry = true;
            var $try = this.EatToken_1865(SyntaxKind.TryKeyword);
            var block: BlockSyntax;
            if ($try.IsMissing) {
                block = this.syntaxFactory.Block(this.EatToken_1865(SyntaxKind.OpenBraceToken), <SyntaxList<StatementSyntax>> structDefault(SyntaxList), this.EatToken_1865(SyntaxKind.CloseBraceToken));
            }
            else {
                var saveTerm = this.termState;
                this.termState |= LanguageParser.TerminatorState.IsEndOfTryBlock;
                block = this.ParseBlock();
                this.termState = saveTerm;
            }
            var catches = <SyntaxListBuilder<CatchClauseSyntax>> structDefault(SyntaxListBuilder);
            var $finally: FinallyClauseSyntax = null;
            try
            {
                var hasEnd: boolean = false;
                var hasCatchAll: boolean = false;
                if (this.CurrentToken.Kind == SyntaxKind.CatchKeyword) {
                    hasEnd = true;
                    catches = this.pool.Allocate<CatchClauseSyntax>();
                    while (this.CurrentToken.Kind == SyntaxKind.CatchKeyword) {
                        var clause = this.ParseCatchClause(hasCatchAll);
                        hasCatchAll = hasCatchAll || clause.Declaration == null && clause.Filter == null;
                        catches.Add(clause);
                    }
                }
                if (this.CurrentToken.Kind == SyntaxKind.FinallyKeyword) {
                    hasEnd = true;
                    var fin = this.EatToken_2098();
                    var finBlock = this.ParseBlock();
                    $finally = this.syntaxFactory.FinallyClause(fin, finBlock);
                }
                if (!hasEnd) {
                    block = this.AddErrorToLastToken_1417(block, ErrorCode.ERR_ExpectedEndTry);
                    $finally = this.syntaxFactory.FinallyClause(SyntaxToken.CreateMissing(SyntaxKind.FinallyKeyword, null, null), this.syntaxFactory.Block(SyntaxToken.CreateMissing(SyntaxKind.OpenBraceToken, null, null), <SyntaxList<StatementSyntax>> structDefault(SyntaxList), SyntaxToken.CreateMissing(SyntaxKind.CloseBraceToken, null, null)));
                }
                this.isInTry = isInTry;
                return this.syntaxFactory.TryStatement($try, block, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchClauseSyntax>(catches), $finally);
            }

            finally {
                if (!catches.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(catches));
                }
            }
        }
        private IsEndOfTryBlock(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseBraceToken || this.CurrentToken.Kind == SyntaxKind.CatchKeyword || this.CurrentToken.Kind == SyntaxKind.FinallyKeyword;
        }
        private ParseCatchClause(hasCatchAll: boolean): CatchClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.CatchKeyword);
            var $catch = this.EatToken_2098();
            if (hasCatchAll) {
                $catch = this.AddError_1357($catch, ErrorCode.ERR_TooManyCatches);
            }
            var decl: CatchDeclarationSyntax = null;
            var saveTerm = this.termState;
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                var openParen = this.EatToken_2098();
                this.termState |= LanguageParser.TerminatorState.IsEndOfCatchClause;
                var type = this.ParseClassType();
                var name: SyntaxToken = null;
                if (this.IsTrueIdentifier()) {
                    name = this.ParseIdentifierToken();
                }
                this.termState = saveTerm;
                var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                decl = this.syntaxFactory.CatchDeclaration(openParen, type, name, closeParen);
            }
            var filter: CatchFilterClauseSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.IfKeyword) {
                var ifKeyword = this.CheckFeatureAvailability(this.EatToken_2098(), MessageID.IDS_FeatureExceptionFilter);
                this.termState |= LanguageParser.TerminatorState.IsEndOfilterClause;
                var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
                var filterExpression = this.ParseExpression();
                this.termState = saveTerm;
                var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                filter = this.syntaxFactory.CatchFilterClause(ifKeyword, openParen, filterExpression, closeParen);
            }
            this.termState |= LanguageParser.TerminatorState.IsEndOfCatchBlock;
            var block = this.ParseBlock();
            this.termState = saveTerm;
            return this.syntaxFactory.CatchClause($catch, decl, filter, block);
        }
        private IsEndOfCatchClause(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.Kind == SyntaxKind.CloseBraceToken || this.CurrentToken.Kind == SyntaxKind.CatchKeyword || this.CurrentToken.Kind == SyntaxKind.FinallyKeyword;
        }
        private IsEndOfFilterClause(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken || this.CurrentToken.Kind == SyntaxKind.CloseBraceToken || this.CurrentToken.Kind == SyntaxKind.CatchKeyword || this.CurrentToken.Kind == SyntaxKind.FinallyKeyword;
        }
        private IsEndOfCatchBlock(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseBraceToken || this.CurrentToken.Kind == SyntaxKind.CatchKeyword || this.CurrentToken.Kind == SyntaxKind.FinallyKeyword;
        }
        private ParseClassType(): TypeSyntax {
            var type = this.ParseType(false);
            var __tSwitch10 = type.Kind;
            while (true) {
                var __tDefault91 = false;
                switch (__tSwitch10) {
                    case SyntaxKind.PredefinedType:
                        var kt = (<PredefinedTypeSyntax>type).Keyword.Kind;
                        if (kt != SyntaxKind.ObjectKeyword && kt != SyntaxKind.StringKeyword) {
                            __tDefault91 = true; break;
                        }
                        break;
                    default:
                        if (!SyntaxFacts.IsName(type.Kind)) {
                            type = this.AddError_1357(type, ErrorCode.ERR_ClassTypeExpected);
                        }
                        break;
                }


                if (__tDefault91) {
                    if (!SyntaxFacts.IsName(type.Kind)) {
                        type = this.AddError_1357(type, ErrorCode.ERR_ClassTypeExpected);
                    }
                    break;
                }

                break;
            }

            return type;
        }
        private ParseCheckedStatement(): StatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.CheckedKeyword || this.CurrentToken.Kind == SyntaxKind.UncheckedKeyword);
            if (this.PeekToken(1).Kind == SyntaxKind.OpenParenToken) {
                return this.ParseExpressionStatement_1651();
            }
            var spec = this.EatToken_2098();
            var block = this.ParseBlock();
            return this.syntaxFactory.CheckedStatement(SyntaxFacts.GetCheckStatement(spec.Kind), spec, block);
        }
        private ParseDoStatement(): DoStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.DoKeyword);
            var $do = this.EatToken_1865(SyntaxKind.DoKeyword);
            var statement = this.ParseEmbeddedStatement(false);
            var $while = this.EatToken_1865(SyntaxKind.WhileKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfDoWhileExpression;
            var expression = this.ParseExpression();
            this.termState = saveTerm;
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.DoStatement($do, statement, $while, openParen, expression, closeParen, semicolon);
        }
        private IsEndOfDoWhileExpression(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken;
        }
        private ParseForOrForEachStatement(): StatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ForKeyword || this.CurrentToken.Kind == SyntaxKind.ForEachKeyword);
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                if (this.CurrentToken.Kind == SyntaxKind.ForKeyword) {
                    this.EatToken_2098();
                    if (this.EatToken_2098().Kind == SyntaxKind.OpenParenToken && this.ScanType_7309() != LanguageParser.ScanTypeFlags.NotType && this.EatToken_2098().Kind == SyntaxKind.IdentifierToken && this.EatToken_2098().Kind == SyntaxKind.InKeyword) {
                        var resetPoint_ref0 = { refObj: resetPoint };
                        this.Reset_LanguageParser(resetPoint_ref0);

                        resetPoint = resetPoint_ref0.refObj;;
                        return this.ParseForEachStatement();
                    }
                    else {
                        var resetPoint_ref0 = { refObj: resetPoint };
                        this.Reset_LanguageParser(resetPoint_ref0);

                        resetPoint = resetPoint_ref0.refObj;;
                        return this.ParseForStatement();
                    }
                }
                else {
                    return this.ParseForEachStatement();
                }
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private ParseForStatement(): ForStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ForKeyword);
            var $for = this.EatToken_1865(SyntaxKind.ForKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfForStatementArgument;
            var resetPoint = this.GetResetPoint_LanguageParser();
            var initializers = this.pool.AllocateSeparated<ExpressionSyntax>();
            var incrementors = this.pool.AllocateSeparated<ExpressionSyntax>();
            try
            {
                var st: LanguageParser.ScanTypeFlags = 0;
                if (this.IsQueryExpression(/*mayBeVariableDeclaration:*/true,/*mayBeMemberDeclaration:*/false)) {
                    st = LanguageParser.ScanTypeFlags.NotType;
                }
                else {
                    st = this.ScanType_7309();
                }
                var decl: VariableDeclarationSyntax = null;
                if (st != LanguageParser.ScanTypeFlags.NotType && this.IsTrueIdentifier()) {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var type: TypeSyntax;
                    var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
                    var type_ref0 = { refObj: type };
                    this.ParseDeclaration(false, type_ref0, variables);

                    type = type_ref0.refObj;;
                    decl = this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables));
                    this.pool.Free_2078(variables);
                }
                else {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    if (this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                        var openParen_ref0 = { refObj: openParen };
                        this.ParseForStatementExpressionList(openParen_ref0, initializers);

                        openParen = openParen_ref0.refObj;;
                    }
                }
                var semi = this.EatToken_1865(SyntaxKind.SemicolonToken);
                var condition: ExpressionSyntax = null;
                if (this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                    condition = this.ParseExpression();
                }
                var semi2 = this.EatToken_1865(SyntaxKind.SemicolonToken);
                if (this.CurrentToken.Kind != SyntaxKind.CloseParenToken) {
                    var semi2_ref0 = { refObj: semi2 };
                    this.ParseForStatementExpressionList(semi2_ref0, incrementors);

                    semi2 = semi2_ref0.refObj;;
                }
                var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                var statement = this.ParseEmbeddedStatement(true);
                return this.syntaxFactory.ForStatement($for, openParen, decl, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(initializers), semi, condition, semi2, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(incrementors), closeParen, statement);
            }

            finally {
                this.termState = saveTerm;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                this.pool.Free_2078(incrementors);
                this.pool.Free_2078(initializers);
            }
        }
        private IsEndOfForStatementArgument(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.SemicolonToken || this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.OpenBraceToken;
        }
        private ParseForStatementExpressionList(startToken: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>): void {
            if (this.CurrentToken.Kind != SyntaxKind.CloseParenToken && this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                tryAgain:
                while (true) {

                    if (this.IsPossibleExpression() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        list.Add(this.ParseExpression());
                        while (true) {
                            if (this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                                break;
                            }
                            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleExpression()) {
                                list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                list.Add(this.ParseExpression());
                                continue;
                            }
                            else if (this.SkipBadForStatementExpressionListTokens(startToken, list, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                                break;
                            }
                        }
                    }
                    else if (this.SkipBadForStatementExpressionListTokens(startToken, list, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Continue) {
                        continue tryAgain;
                    } break;
                }
            }
        }
        private SkipBadForStatementExpressionListTokens(startToken: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(startToken, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleExpression(), p => p.CurrentToken.Kind == SyntaxKind.CloseParenToken || p.CurrentToken.Kind == SyntaxKind.SemicolonToken || p.IsTerminator(), expected);
        }
        private ParseForEachStatement(): ForEachStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ForEachKeyword || this.CurrentToken.Kind == SyntaxKind.ForKeyword);
            var $foreach: SyntaxToken;
            if (this.CurrentToken.Kind == SyntaxKind.ForKeyword) {
                var skippedForToken = this.EatToken_2098();
                skippedForToken = this.AddError_7870(skippedForToken, ErrorCode.ERR_SyntaxError, SyntaxFacts.GetText_3915(SyntaxKind.ForEachKeyword), SyntaxFacts.GetText_3915(SyntaxKind.ForKeyword));
                $foreach = this.ConvertToMissingWithTrailingTrivia(skippedForToken, SyntaxKind.ForEachKeyword);
            }
            else {
                $foreach = this.EatToken_1865(SyntaxKind.ForEachKeyword);
            }
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var type = this.ParseType(false);
            var name: SyntaxToken;
            if (this.CurrentToken.Kind == SyntaxKind.InKeyword) {
                name = this.ParseIdentifierToken();
                name = this.AddError_1357(name, ErrorCode.ERR_BadForeachDecl);
            }
            else {
                name = this.ParseIdentifierToken();
            }
            var $in = this.EatToken_4938(SyntaxKind.InKeyword, ErrorCode.ERR_InExpected);
            var expression = this.ParseExpression();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var statement = this.ParseEmbeddedStatement(true);
            return this.syntaxFactory.ForEachStatement($foreach, openParen, type, name, $in, expression, closeParen, statement);
        }
        private ParseGotoStatement(): GotoStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.GotoKeyword);
            var $goto = this.EatToken_1865(SyntaxKind.GotoKeyword);
            var caseOrDefault: SyntaxToken = null;
            var arg: ExpressionSyntax = null;
            var kind: SyntaxKind = 0;
            if (this.CurrentToken.Kind == SyntaxKind.CaseKeyword || this.CurrentToken.Kind == SyntaxKind.DefaultKeyword) {
                caseOrDefault = this.EatToken_2098();
                if (caseOrDefault.Kind == SyntaxKind.CaseKeyword) {
                    kind = SyntaxKind.GotoCaseStatement;
                    arg = this.ParseExpression();
                }
                else {
                    kind = SyntaxKind.GotoDefaultStatement;
                }
            }
            else {
                kind = SyntaxKind.GotoStatement;
                arg = this.ParseIdentifierName();
            }
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.GotoStatement(kind, $goto, caseOrDefault, arg, semicolon);
        }
        private ParseIfStatement(): IfStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.IfKeyword);
            var $if = this.EatToken_1865(SyntaxKind.IfKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var condition = this.ParseExpression();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var statement = this.ParseEmbeddedStatement(false);
            var $else: ElseClauseSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.ElseKeyword) {
                var elseToken = this.EatToken_1865(SyntaxKind.ElseKeyword);
                var elseStatement = this.ParseEmbeddedStatement(false);
                $else = this.syntaxFactory.ElseClause(elseToken, elseStatement);
            }
            return this.syntaxFactory.IfStatement($if, openParen, condition, closeParen, statement, $else);
        }
        private ParseLockStatement(): LockStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.LockKeyword);
            var $lock = this.EatToken_1865(SyntaxKind.LockKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expression = this.ParseExpression();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var statement = this.ParseEmbeddedStatement(false);
            return this.syntaxFactory.LockStatement($lock, openParen, expression, closeParen, statement);
        }
        private ParseReturnStatement(): ReturnStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ReturnKeyword);
            var $return = this.EatToken_1865(SyntaxKind.ReturnKeyword);
            var arg: ExpressionSyntax = null;
            if (this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                arg = this.ParseExpression();
            }
            var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.ReturnStatement($return, arg, semicolon);
        }
        private ParseYieldStatement(): YieldStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.YieldKeyword);
            var yieldToken = LanguageParser.ConvertToKeyword(this.EatToken_2098());
            var returnOrBreak: SyntaxToken = null;
            var arg: ExpressionSyntax = null;
            var kind: SyntaxKind = 0;
            yieldToken = this.CheckFeatureAvailability(yieldToken, MessageID.IDS_FeatureIterators);
            if (this.CurrentToken.Kind == SyntaxKind.BreakKeyword) {
                kind = SyntaxKind.YieldBreakStatement;
                returnOrBreak = this.EatToken_2098();
            }
            else {
                kind = SyntaxKind.YieldReturnStatement;
                returnOrBreak = this.EatToken_1865(SyntaxKind.ReturnKeyword);
                if (this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                    returnOrBreak = this.AddError_1357(returnOrBreak, ErrorCode.ERR_EmptyYield);
                }
                else {
                    arg = this.ParseExpression();
                }
            }
            var semi = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.YieldStatement(kind, yieldToken, returnOrBreak, arg, semi);
        }
        private ParseSwitchStatement(): SwitchStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.SwitchKeyword);
            var $switch = this.EatToken_1865(SyntaxKind.SwitchKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expression = this.ParseExpression();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                openBrace = this.AddError_1357(openBrace, ErrorCode.WRN_EmptySwitch);
            }
            var sections = this.pool.Allocate<SwitchSectionSyntax>();
            try
            {
                while (this.IsPossibleSwitchSection()) {
                    var swcase = this.ParseSwitchSection();
                    sections.Add(swcase);
                }
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                return this.syntaxFactory.SwitchStatement($switch, openParen, expression, closeParen, openBrace, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchSectionSyntax>(sections), closeBrace);
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(sections));
            }
        }
        private IsPossibleSwitchSection(): boolean {
            return (this.CurrentToken.Kind == SyntaxKind.CaseKeyword) || (this.CurrentToken.Kind == SyntaxKind.DefaultKeyword && this.PeekToken(1).Kind != SyntaxKind.OpenParenToken);
        }
        private ParseSwitchSection(): SwitchSectionSyntax {
            System.Diagnostics.Debug.Assert(this.IsPossibleSwitchSection());
            var labels = this.pool.Allocate<SwitchLabelSyntax>();
            var statements = this.pool.Allocate<StatementSyntax>();
            try
            {
                do {
                    var specifier: SyntaxToken;
                    var label: SwitchLabelSyntax;
                    var colon: SyntaxToken;
                    if (this.CurrentToken.Kind == SyntaxKind.CaseKeyword) {
                        var expression: ExpressionSyntax;
                        specifier = this.EatToken_2098();
                        if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                            expression = this.CreateMissingIdentifierName();
                            expression = this.AddError_1357(expression, ErrorCode.ERR_ConstantExpected);
                        }
                        else {
                            expression = this.ParseExpression();
                        }
                        colon = this.EatToken_1865(SyntaxKind.ColonToken);
                        label = this.syntaxFactory.CaseSwitchLabel(specifier, expression, colon);
                    }
                    else {
                        System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.DefaultKeyword);
                        specifier = this.EatToken_1865(SyntaxKind.DefaultKeyword);
                        colon = this.EatToken_1865(SyntaxKind.ColonToken);
                        label = this.syntaxFactory.DefaultSwitchLabel(specifier, colon);
                    }
                    labels.Add(label);
                }
                while (this.IsPossibleSwitchSection());
                var tmp: CSharpSyntaxNode = labels.$get$(labels.Count - 1);
                var tmp_ref0 = { refObj: tmp };
                this.ParseStatements(tmp_ref0, statements, true);

                tmp = tmp_ref0.refObj;;
                labels.$set$(labels.Count - 1, <SwitchLabelSyntax>tmp);
                return this.syntaxFactory.SwitchSection(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchLabelSyntax>(labels), SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>(statements));
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(statements));
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(labels));
            }
        }
        private ParseThrowStatement(): ThrowStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ThrowKeyword);
            var $throw = this.EatToken_1865(SyntaxKind.ThrowKeyword);
            var arg: ExpressionSyntax = null;
            if (this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                arg = this.ParseExpression();
            }
            var semi = this.EatToken_1865(SyntaxKind.SemicolonToken);
            return this.syntaxFactory.ThrowStatement($throw, arg, semi);
        }
        private ParseUnsafeStatement(): UnsafeStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.UnsafeKeyword);
            var $unsafe = this.EatToken_1865(SyntaxKind.UnsafeKeyword);
            var block = this.ParseBlock();
            return this.syntaxFactory.UnsafeStatement($unsafe, block);
        }
        private ParseUsingStatement(): UsingStatementSyntax {
            var $using = this.EatToken_1865(SyntaxKind.UsingKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var declaration: VariableDeclarationSyntax = null;
            var expression: ExpressionSyntax = null;
            var resetPoint = this.GetResetPoint_LanguageParser();
            var declaration_ref0 = { refObj: declaration };
            var expression_ref1 = { refObj: expression };
            var resetPoint_ref2 = { refObj: resetPoint };
            this.ParseUsingExpression(declaration_ref0, expression_ref1, resetPoint_ref2);

            declaration = declaration_ref0.refObj;

            expression = expression_ref1.refObj;

            resetPoint = resetPoint_ref2.refObj;;
            var resetPoint_ref0 = { refObj: resetPoint };
            this.Release_LanguageParser(resetPoint_ref0);

            resetPoint = resetPoint_ref0.refObj;;
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var statement = this.ParseEmbeddedStatement(false);
            return this.syntaxFactory.UsingStatement($using, openParen, declaration, expression, closeParen, statement);
        }
        private ParseUsingExpression(declaration: { refObj: VariableDeclarationSyntax }, expression: { refObj: ExpressionSyntax }, resetPoint: { refObj: LanguageParser.ResetPointLanguageParser }): void {
            if (this.IsAwaitExpression()) {
                expression.refObj = this.ParseExpression();
                return
            }
            var type: TypeSyntax;
            var st: LanguageParser.ScanTypeFlags = 0;
            if (this.IsQueryExpression(/*mayBeVariableDeclaration:*/true,/*mayBeMemberDeclaration:*/false)) {
                st = LanguageParser.ScanTypeFlags.NotType;
            }
            else {
                st = this.ScanType_7309();
            }
            if (st == LanguageParser.ScanTypeFlags.NullableType) {
                if (this.CurrentToken.Kind != SyntaxKind.IdentifierToken) {
                    this.Reset_LanguageParser(resetPoint);
                    expression.refObj = this.ParseExpression();
                }
                else {
                    var variables: SeparatedSyntaxListBuilder<VariableDeclaratorSyntax> = <SeparatedSyntaxListBuilder<VariableDeclaratorSyntax>> structDefault(SeparatedSyntaxListBuilder);
                    switch (this.PeekToken(1).Kind) {
                        default:
                            this.Reset_LanguageParser(resetPoint);
                            expression.refObj = this.ParseExpression();
                            break;
                        case SyntaxKind.CommaToken:
                        case SyntaxKind.CloseParenToken:
                            this.Reset_LanguageParser(resetPoint);
                            variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
                            var type_ref0 = { refObj: type };
                            this.ParseDeclaration(false, type_ref0, variables);

                            type = type_ref0.refObj;;
                            declaration.refObj = this.syntaxFactory.VariableDeclaration(type, variables.ToList());
                            this.pool.Free_2078(variables);
                            break;
                        case SyntaxKind.EqualsToken:
                            this.Reset_LanguageParser(resetPoint);
                            variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
                            var type_ref0 = { refObj: type };
                            this.ParseDeclaration(false, type_ref0, variables);

                            type = type_ref0.refObj;;
                            if (this.CurrentToken.Kind == SyntaxKind.ColonToken && type.Kind == SyntaxKind.NullableType && SyntaxFacts.IsName((<NullableTypeSyntax>type).ElementType.Kind) && variables.Count == 1) {
                                this.Reset_LanguageParser(resetPoint);
                                expression.refObj = this.ParseExpression();
                            }
                            else {
                                declaration.refObj = this.syntaxFactory.VariableDeclaration(type, variables.ToList());
                            }
                            this.pool.Free_2078(variables);
                            break;
                    }
                }
            }
            else if (this.IsUsingStatementVariableDeclaration(st)) {
                this.Reset_LanguageParser(resetPoint);
                var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
                var type_ref0 = { refObj: type };
                this.ParseDeclaration(false, type_ref0, variables);

                type = type_ref0.refObj;;
                declaration.refObj = this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables));
                this.pool.Free_2078(variables);
            }
            else {
                this.Reset_LanguageParser(resetPoint);
                expression.refObj = this.ParseExpression();
            }
        }
        private IsUsingStatementVariableDeclaration(st: LanguageParser.ScanTypeFlags): boolean {
            System.Diagnostics.Debug.Assert(st != LanguageParser.ScanTypeFlags.NullableType);
            var condition1: boolean = st == LanguageParser.ScanTypeFlags.MustBeType && this.CurrentToken.Kind != SyntaxKind.DotToken;
            var condition2: boolean = st != LanguageParser.ScanTypeFlags.NotType && this.CurrentToken.Kind == SyntaxKind.IdentifierToken;
            var condition3: boolean = st == LanguageParser.ScanTypeFlags.NonGenericTypeOrExpression || this.PeekToken(1).Kind == SyntaxKind.EqualsToken;
            return condition1 || (condition2 && condition3);
        }
        private ParseWhileStatement(): WhileStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.WhileKeyword);
            var $while = this.EatToken_1865(SyntaxKind.WhileKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var condition = this.ParseExpression();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            var statement = this.ParseEmbeddedStatement(true);
            return this.syntaxFactory.WhileStatement($while, openParen, condition, closeParen, statement);
        }
        private ParseLabeledStatement(): LabeledStatementSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.IdentifierToken);
            System.Diagnostics.Debug.Assert(this.IsTrueIdentifier());
            var label = this.ParseIdentifierToken();
            var colon = this.EatToken_1865(SyntaxKind.ColonToken);
            System.Diagnostics.Debug.Assert(!colon.IsMissing);
            var statement = this.ParseStatement();
            return this.syntaxFactory.LabeledStatement(label, colon, statement);
        }
        private ParseLocalDeclarationStatement(): LocalDeclarationStatementSyntax {
            var type: TypeSyntax;
            var mods = this.pool.AllocateBase();
            var variables = this.pool.AllocateSeparated<VariableDeclaratorSyntax>();
            try
            {
                this.ParseDeclarationModifiers(mods);
                var type_ref0 = { refObj: type };
                this.ParseDeclaration(mods.Any(SyntaxKind.ConstKeyword), type_ref0, variables);

                type = type_ref0.refObj;;
                var semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
                return this.syntaxFactory.LocalDeclarationStatement(SyntaxListBuilderExtensions.ToTokenList(mods), this.syntaxFactory.VariableDeclaration(type, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables)), semicolon);
            }

            finally {
                this.pool.Free_2078(variables);
                this.pool.Free_1631(mods);
            }
        }
        private ParseDeclaration(isConst: boolean, type: { refObj: TypeSyntax }, variables: SeparatedSyntaxListBuilder<VariableDeclaratorSyntax>): void {
            type.refObj = this.ParseType(false);
            var flags: LanguageParser.VariableFlags = LanguageParser.VariableFlags.Local;
            if (isConst) {
                flags |= LanguageParser.VariableFlags.Const;
            }
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfDeclarationClause;
            this.ParseVariableDeclarators_9514(type.refObj, flags, variables,/*variableDeclarationsExpected:*/true);
            this.termState = saveTerm;
        }
        private IsEndOfDeclarationClause(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.SemicolonToken:
                case SyntaxKind.CloseParenToken:
                case SyntaxKind.ColonToken:
                    return true;
                default:
                    return false;
            }
        }
        private ParseDeclarationModifiers(list: SyntaxListBaseBuilder): void {
            var k: SyntaxKind = 0;
            while (LanguageParser.IsDeclarationModifier(k = this.CurrentToken.Kind)) {
                var mod = this.EatToken_2098();
                if (k == SyntaxKind.StaticKeyword || k == SyntaxKind.ReadOnlyKeyword || k == SyntaxKind.VolatileKeyword) {
                    mod = this.AddError_7870(mod, ErrorCode.ERR_BadMemberFlag, mod.Text);
                }
                list.Add(mod);
            }
        }
        private static IsDeclarationModifier(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.ReadOnlyKeyword:
                case SyntaxKind.VolatileKeyword:
                    return true;
                default:
                    return false;
            }
        }
        private ParseExpressionStatement_1651(): ExpressionStatementSyntax {
            return this.ParseExpressionStatement_1863(this.ParseExpression());
        }
        private ParseExpressionStatement_1863(expression: ExpressionSyntax): ExpressionStatementSyntax {
            var semicolon: SyntaxToken;
            if (this.IsInteractive && this.CurrentToken.Kind == SyntaxKind.EndOfFileToken) {
                semicolon = SyntaxFactory.MissingToken_7070(SyntaxKind.SemicolonToken);
            }
            else {
                semicolon = this.EatToken_1865(SyntaxKind.SemicolonToken);
            }
            return this.syntaxFactory.ExpressionStatement(expression, semicolon);
        }
        public ParseExpression(): ExpressionSyntax {
            try
            {
                this.recursionDepth++;
                if (this.recursionDepth > LanguageParser.MaxUncheckedRecursionDepth) {
                    LanguageParser.ensureSufficientExecutionStack();
                }
                return this.ParseSubExpression(0);
            }

            finally {
                this.recursionDepth--;
            }
        }
        private IsPossibleExpression(): boolean {
            var tk = this.CurrentToken.Kind;
            switch (tk) {
                case SyntaxKind.TypeOfKeyword:
                case SyntaxKind.DefaultKeyword:
                case SyntaxKind.SizeOfKeyword:
                case SyntaxKind.MakeRefKeyword:
                case SyntaxKind.RefTypeKeyword:
                case SyntaxKind.CheckedKeyword:
                case SyntaxKind.UncheckedKeyword:
                case SyntaxKind.RefValueKeyword:
                case SyntaxKind.ArgListKeyword:
                case SyntaxKind.BaseKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.NumericLiteralToken:
                case SyntaxKind.StringLiteralToken:
                case SyntaxKind.InterpolatedStringStartToken:
                case SyntaxKind.InterpolatedStringToken:
                case SyntaxKind.CharacterLiteralToken:
                case SyntaxKind.NewKeyword:
                case SyntaxKind.DelegateKeyword:
                case SyntaxKind.ColonColonToken:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier() || (this.CurrentToken.ContextualKind == SyntaxKind.FromKeyword);
                default:
                    return LanguageParser.IsExpectedPrefixUnaryOperator(tk) || (LanguageParser.IsPredefinedType(tk) && tk != SyntaxKind.VoidKeyword) || SyntaxFacts.IsAnyUnaryExpression(tk) || SyntaxFacts.IsBinaryExpression(tk) || SyntaxFacts.IsAssignmentExpressionOperatorToken(tk);
            }
        }
        private static IsInvalidSubExpression(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.BreakKeyword:
                case SyntaxKind.CaseKeyword:
                case SyntaxKind.CatchKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.ContinueKeyword:
                case SyntaxKind.DoKeyword:
                case SyntaxKind.FinallyKeyword:
                case SyntaxKind.ForKeyword:
                case SyntaxKind.ForEachKeyword:
                case SyntaxKind.GotoKeyword:
                case SyntaxKind.IfKeyword:
                case SyntaxKind.LockKeyword:
                case SyntaxKind.ReturnKeyword:
                case SyntaxKind.SwitchKeyword:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.TryKeyword:
                case SyntaxKind.UsingKeyword:
                case SyntaxKind.WhileKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsRightAssociative(op: SyntaxKind): boolean {
            switch (op) {
                case SyntaxKind.SimpleAssignmentExpression:
                case SyntaxKind.AddAssignmentExpression:
                case SyntaxKind.SubtractAssignmentExpression:
                case SyntaxKind.MultiplyAssignmentExpression:
                case SyntaxKind.DivideAssignmentExpression:
                case SyntaxKind.ModuloAssignmentExpression:
                case SyntaxKind.AndAssignmentExpression:
                case SyntaxKind.ExclusiveOrAssignmentExpression:
                case SyntaxKind.OrAssignmentExpression:
                case SyntaxKind.LeftShiftAssignmentExpression:
                case SyntaxKind.RightShiftAssignmentExpression:
                case SyntaxKind.CoalesceExpression:
                    return true;
                default:
                    return false;
            }
        }
        private static GetPrecedence(op: SyntaxKind): number {
            switch (op) {
                case SyntaxKind.SimpleAssignmentExpression:
                case SyntaxKind.AddAssignmentExpression:
                case SyntaxKind.SubtractAssignmentExpression:
                case SyntaxKind.MultiplyAssignmentExpression:
                case SyntaxKind.DivideAssignmentExpression:
                case SyntaxKind.ModuloAssignmentExpression:
                case SyntaxKind.AndAssignmentExpression:
                case SyntaxKind.ExclusiveOrAssignmentExpression:
                case SyntaxKind.OrAssignmentExpression:
                case SyntaxKind.LeftShiftAssignmentExpression:
                case SyntaxKind.RightShiftAssignmentExpression:
                    return 1;
                case SyntaxKind.CoalesceExpression:
                    return 2;
                case SyntaxKind.LogicalOrExpression:
                    return 3;
                case SyntaxKind.LogicalAndExpression:
                    return 4;
                case SyntaxKind.BitwiseOrExpression:
                    return 5;
                case SyntaxKind.ExclusiveOrExpression:
                    return 6;
                case SyntaxKind.BitwiseAndExpression:
                    return 7;
                case SyntaxKind.EqualsExpression:
                case SyntaxKind.NotEqualsExpression:
                    return 8;
                case SyntaxKind.LessThanExpression:
                case SyntaxKind.LessThanOrEqualExpression:
                case SyntaxKind.GreaterThanExpression:
                case SyntaxKind.GreaterThanOrEqualExpression:
                case SyntaxKind.IsExpression:
                case SyntaxKind.AsExpression:
                    return 9;
                case SyntaxKind.LeftShiftExpression:
                case SyntaxKind.RightShiftExpression:
                    return 10;
                case SyntaxKind.AddExpression:
                case SyntaxKind.SubtractExpression:
                    return 11;
                case SyntaxKind.MultiplyExpression:
                case SyntaxKind.DivideExpression:
                case SyntaxKind.ModuloExpression:
                    return 12;
                case SyntaxKind.UnaryPlusExpression:
                case SyntaxKind.UnaryMinusExpression:
                case SyntaxKind.BitwiseNotExpression:
                case SyntaxKind.LogicalNotExpression:
                case SyntaxKind.PreIncrementExpression:
                case SyntaxKind.PreDecrementExpression:
                case SyntaxKind.TypeOfExpression:
                case SyntaxKind.SizeOfExpression:
                case SyntaxKind.CheckedExpression:
                case SyntaxKind.UncheckedExpression:
                case SyntaxKind.MakeRefExpression:
                case SyntaxKind.RefValueExpression:
                case SyntaxKind.RefTypeExpression:
                case SyntaxKind.AwaitExpression:
                    return 13;
                case SyntaxKind.CastExpression:
                    return 14;
                case SyntaxKind.PointerIndirectionExpression:
                    return 15;
                case SyntaxKind.AddressOfExpression:
                    return 16;
                default:
                    return 0;
            }
        }
        private static IsExpectedPrefixUnaryOperator(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsPrefixUnaryExpression(kind) && kind != SyntaxKind.RefKeyword && kind != SyntaxKind.OutKeyword;
        }
        private static IsExpectedBinaryOperator(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsBinaryExpression(kind);
        }
        private static IsExpectedAssignmentOperator(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsAssignmentExpressionOperatorToken(kind);
        }
        private IsPossibleAwaitExpressionStatement(): boolean {
            return this.IsInAsync && this.CurrentToken.ContextualKind == SyntaxKind.AwaitKeyword;
        }
        private IsAwaitExpression(): boolean {
            if (this.CurrentToken.ContextualKind == SyntaxKind.AwaitKeyword) {
                if (this.IsInAsync) {
                    return true;
                }
                switch (this.PeekToken(1).Kind) {
                    case SyntaxKind.IdentifierToken:
                    case SyntaxKind.NewKeyword:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.BaseKeyword:
                    case SyntaxKind.DelegateKeyword:
                    case SyntaxKind.TypeOfKeyword:
                    case SyntaxKind.CheckedKeyword:
                    case SyntaxKind.UncheckedKeyword:
                    case SyntaxKind.DefaultKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.StringLiteralToken:
                    case SyntaxKind.InterpolatedStringStartToken:
                    case SyntaxKind.InterpolatedStringToken:
                    case SyntaxKind.NumericLiteralToken:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.CharacterLiteralToken:
                        return true;
                }
            }
            return false;
        }
        private ParseSubExpression(precedence: number): ExpressionSyntax {
            var leftOperand: ExpressionSyntax = null;
            var newPrecedence: number = 0;
            var opKind: SyntaxKind = SyntaxKind.None;
            var tk = this.CurrentToken.Kind;
            if (LanguageParser.IsInvalidSubExpression(tk)) {
                return this.AddError_7870(this.CreateMissingIdentifierName(), ErrorCode.ERR_InvalidExprTerm, SyntaxFacts.GetText_3915(tk));
            }
            if (LanguageParser.IsExpectedPrefixUnaryOperator(tk)) {
                opKind = SyntaxFacts.GetPrefixUnaryExpression(tk);
                newPrecedence = LanguageParser.GetPrecedence(opKind);
                var opToken = this.EatToken_2098();
                var operand = this.ParseSubExpression(newPrecedence);
                leftOperand = this.syntaxFactory.PrefixUnaryExpression(opKind, opToken, operand);
            }
            else if (this.IsAwaitExpression()) {
                opKind = SyntaxKind.AwaitExpression;
                newPrecedence = LanguageParser.GetPrecedence(opKind);
                var awaitToken = this.EatContextualToken_1181(SyntaxKind.AwaitKeyword);
                awaitToken = this.CheckFeatureAvailability(awaitToken, MessageID.IDS_FeatureAsync);
                var operand = this.ParseSubExpression(newPrecedence);
                leftOperand = this.syntaxFactory.AwaitExpression(awaitToken, operand);
            }
            else if (this.IsQueryExpression(/*mayBeVariableDeclaration:*/false,/*mayBeMemberDeclaration:*/false)) {
                leftOperand = this.ParseQueryExpression();
            }
            else if (this.CurrentToken.ContextualKind == SyntaxKind.FromKeyword && this.IsInQuery) {
                var skipped: SyntaxToken = this.EatToken_2098();
                skipped = this.AddError_7870(skipped, ErrorCode.ERR_InvalidExprTerm, this.CurrentToken.Text);
                leftOperand = this.AddTrailingSkippedSyntax(this.CreateMissingIdentifierName(), skipped);
            }
            else {
                leftOperand = this.ParseTerm(precedence);
            }
            while (true) {
                tk = this.CurrentToken.Kind;
                var isAssignmentOperator: boolean = false;
                if (LanguageParser.IsExpectedBinaryOperator(tk)) {
                    opKind = SyntaxFacts.GetBinaryExpression(tk);
                }
                else if (LanguageParser.IsExpectedAssignmentOperator(tk)) {
                    opKind = SyntaxFacts.GetAssignmentExpression(tk);
                    isAssignmentOperator = true;
                }
                else {
                    break;
                }
                newPrecedence = LanguageParser.GetPrecedence(opKind);
                System.Diagnostics.Debug.Assert(newPrecedence > 0);
                var doubleOp: boolean = false;
                if (tk == SyntaxKind.GreaterThanToken && (this.PeekToken(1).Kind == SyntaxKind.GreaterThanToken || this.PeekToken(1).Kind == SyntaxKind.GreaterThanEqualsToken)) {
                    if (this.CurrentToken.GetTrailingTriviaWidth() == 0 && this.PeekToken(1).GetLeadingTriviaWidth() == 0) {
                        if (this.PeekToken(1).Kind == SyntaxKind.GreaterThanToken) {
                            opKind = SyntaxFacts.GetBinaryExpression(SyntaxKind.GreaterThanGreaterThanToken);
                        }
                        else {
                            opKind = SyntaxFacts.GetAssignmentExpression(SyntaxKind.GreaterThanGreaterThanEqualsToken);
                            isAssignmentOperator = true;
                        }
                        newPrecedence = LanguageParser.GetPrecedence(opKind);
                        doubleOp = true;
                    }
                }
                if (newPrecedence < precedence) {
                    break;
                }
                if ((newPrecedence == precedence) && !LanguageParser.IsRightAssociative(opKind)) {
                    break;
                }
                var opToken = this.EatToken_2098();
                if (doubleOp) {
                    var opToken2 = this.EatToken_2098();
                    var kind = opToken2.Kind == SyntaxKind.GreaterThanToken ? SyntaxKind.GreaterThanGreaterThanToken : SyntaxKind.GreaterThanGreaterThanEqualsToken;
                    opToken = SyntaxFactory.Token_1937(opToken.GetLeadingTrivia(), kind, opToken2.GetTrailingTrivia());
                }
                if (opKind == SyntaxKind.IsExpression || opKind == SyntaxKind.AsExpression) {
                    leftOperand = this.syntaxFactory.BinaryExpression(opKind, leftOperand, opToken, this.ParseTypeCore(/*parentIsParameter:*/false,/*isOrAs:*/true,/*expectSizes:*/false,/*isArrayCreation:*/false));
                }
                else {
                    var rightOperand = this.ParseSubExpression(newPrecedence);
                    if (isAssignmentOperator) {
                        leftOperand = this.syntaxFactory.AssignmentExpression(opKind, leftOperand, opToken, rightOperand);
                    }
                    else {
                        leftOperand = this.syntaxFactory.BinaryExpression(opKind, leftOperand, opToken, rightOperand);
                    }
                }
            }
            var nullCoalescingPrecedence = LanguageParser.GetPrecedence(SyntaxKind.CoalesceExpression);
            if (tk == SyntaxKind.QuestionToken && precedence < nullCoalescingPrecedence) {
                var questionToken = this.EatToken_2098();
                var colonLeft = this.ParseSubExpression(nullCoalescingPrecedence - 1);
                var colon = this.EatToken_1865(SyntaxKind.ColonToken);
                var colonRight = this.ParseSubExpression(nullCoalescingPrecedence - 1);
                leftOperand = this.syntaxFactory.ConditionalExpression(leftOperand, questionToken, colonLeft, colon, colonRight);
            }
            return leftOperand;
        }
        private ParseTerm(precedence: number): ExpressionSyntax {
            var expr: ExpressionSyntax = null;
            var tk = this.CurrentToken.Kind;
            switch (tk) {
                case SyntaxKind.TypeOfKeyword:
                    expr = this.ParseTypeOfExpression();
                    break;
                case SyntaxKind.DefaultKeyword:
                    expr = this.ParseDefaultExpression();
                    break;
                case SyntaxKind.SizeOfKeyword:
                    expr = this.ParseSizeOfExpression();
                    break;
                case SyntaxKind.MakeRefKeyword:
                    expr = this.ParseMakeRefExpression();
                    break;
                case SyntaxKind.RefTypeKeyword:
                    expr = this.ParseRefTypeExpression();
                    break;
                case SyntaxKind.CheckedKeyword:
                case SyntaxKind.UncheckedKeyword:
                    expr = this.ParseCheckedOrUncheckedExpression();
                    break;
                case SyntaxKind.RefValueKeyword:
                    expr = this.ParseRefValueExpression();
                    break;
                case SyntaxKind.ColonColonToken:
                    expr = this.ParseQualifiedName(LanguageParser.NameOptions.InExpression);
                    break;
                case SyntaxKind.IdentifierToken:
                    if (this.IsTrueIdentifier()) {
                        if (this.CurrentToken.ContextualKind == SyntaxKind.AsyncKeyword && this.PeekToken(1).Kind == SyntaxKind.DelegateKeyword) {
                            expr = this.ParseAnonymousMethodExpression();
                        }
                        else if (this.IsPossibleLambdaExpression(precedence)) {
                            expr = this.ParseLambdaExpression();
                        }
                        else {
                            expr = this.ParseAliasQualifiedName(LanguageParser.NameOptions.InExpression);
                        }
                    }
                    else {
                        expr = this.CreateMissingIdentifierName();
                        expr = this.AddError_7870(expr, ErrorCode.ERR_InvalidExprTerm, this.CurrentToken.Text);
                    }
                    break;
                case SyntaxKind.ThisKeyword:
                    expr = this.syntaxFactory.ThisExpression(this.EatToken_2098());
                    break;
                case SyntaxKind.BaseKeyword:
                    expr = this.syntaxFactory.BaseExpression(this.EatToken_2098());
                    break;
                case SyntaxKind.ArgListKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NumericLiteralToken:
                case SyntaxKind.StringLiteralToken:
                case SyntaxKind.CharacterLiteralToken:
                    expr = this.syntaxFactory.LiteralExpression(SyntaxFacts.GetLiteralExpression(tk), this.EatToken_2098());
                    break;
                case SyntaxKind.InterpolatedStringStartToken:
                    throw new System.NotImplementedException();
                case SyntaxKind.InterpolatedStringToken:
                    expr = this.ParseInterpolatedStringToken();
                    break;
                case SyntaxKind.OpenParenToken:
                    expr = this.ParseCastOrParenExpressionOrLambda(precedence);
                    break;
                case SyntaxKind.NewKeyword:
                    expr = this.ParseNewExpression();
                    break;
                case SyntaxKind.DelegateKeyword:
                    expr = this.ParseAnonymousMethodExpression();
                    break;
                default:
                    if (LanguageParser.IsPredefinedType(tk)) {
                        expr = this.syntaxFactory.PredefinedType(this.EatToken_2098());
                        if (this.CurrentToken.Kind != SyntaxKind.DotToken || tk == SyntaxKind.VoidKeyword) {
                            expr = this.AddError_7870(expr, ErrorCode.ERR_InvalidExprTerm, SyntaxFacts.GetText_3915(tk));
                        }
                    }
                    else {
                        expr = this.CreateMissingIdentifierName();
                        if (tk == SyntaxKind.EndOfFileToken) {
                            expr = this.AddError_1357(expr, ErrorCode.ERR_ExpressionExpected);
                        }
                        else {
                            expr = this.AddError_7870(expr, ErrorCode.ERR_InvalidExprTerm, SyntaxFacts.GetText_3915(tk));
                        }
                    }
                    break;
            }
            return this.ParsePostFixExpression(expr);
        }
        private IsPossibleLambdaExpression(precedence: number): boolean {
            if (precedence <= LanguageParser.LambdaPrecedence && this.PeekToken(1).Kind == SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }
            if (this.ScanAsyncLambda(precedence)) {
                return true;
            }
            return false;
        }
        private ParsePostFixExpression(expr: ExpressionSyntax): ExpressionSyntax {
            System.Diagnostics.Debug.Assert(expr != null);
            while (true) {
                var tk: SyntaxKind = this.CurrentToken.Kind;
                var __tSwitch48 = tk;
                while (true) {
                    var __tDefault2 = false;
                    switch (__tSwitch48) {
                        case SyntaxKind.OpenParenToken:
                            expr = this.syntaxFactory.InvocationExpression(expr, this.ParseParenthesizedArgumentList());
                            break;
                        case SyntaxKind.OpenBracketToken:
                            expr = this.syntaxFactory.ElementAccessExpression(expr, this.ParseBracketedArgumentList());
                            break;
                        case SyntaxKind.PlusPlusToken:
                        case SyntaxKind.MinusMinusToken:
                            expr = this.syntaxFactory.PostfixUnaryExpression(SyntaxFacts.GetPostfixUnaryExpression(tk), expr, this.EatToken_2098());
                            break;
                        case SyntaxKind.ColonColonToken:
                            if (this.PeekToken(1).Kind == SyntaxKind.IdentifierToken) {
                                var ccToken = this.EatToken_2098();
                                ccToken = this.AddError_1357(ccToken, ErrorCode.ERR_UnexpectedAliasedName);
                                var dotToken = this.ConvertToMissingWithTrailingTrivia(ccToken, SyntaxKind.DotToken);
                                expr = this.syntaxFactory.MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression, expr, dotToken, this.ParseSimpleName(LanguageParser.NameOptions.InExpression));
                            }
                            else {
                                expr = this.AddTrailingSkippedSyntax(expr, this.EatTokenWithPrejudice_1765(SyntaxKind.DotToken));
                            }
                            break;
                        case SyntaxKind.MinusGreaterThanToken:
                            expr = this.syntaxFactory.MemberAccessExpression(SyntaxKind.PointerMemberAccessExpression, expr, this.EatToken_2098(), this.ParseSimpleName(LanguageParser.NameOptions.InExpression));
                            break;
                        case SyntaxKind.DotToken:
                            expr = this.syntaxFactory.MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression, expr, this.EatToken_2098(), this.ParseSimpleName(LanguageParser.NameOptions.InExpression));
                            break;
                        case SyntaxKind.QuestionToken:
                            if (this.CanStartConsequenceExpression(this.PeekToken(1).Kind)) {
                                var qToken = this.EatToken_2098();
                                var consequence = this.ParseConsequenceSyntax();
                                expr = this.syntaxFactory.ConditionalAccessExpression(expr, qToken, consequence);
                                expr = this.CheckFeatureAvailability(expr, MessageID.IDS_FeatureNullPropagatingOperator);
                                break;
                            }
                            __tDefault2 = true; break;
                        default:
                            return expr;
                    }


                    if (__tDefault2) {
                        return expr;
                    }

                    break;
                }

            }
        }
        private CanStartConsequenceExpression(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.DotToken || kind == SyntaxKind.OpenBracketToken;
        }
        public ParseConsequenceSyntax(): ExpressionSyntax {
            var tk: SyntaxKind = this.CurrentToken.Kind;
            var expr: ExpressionSyntax = null;
            switch (tk) {
                case SyntaxKind.DotToken:
                    expr = this.syntaxFactory.MemberBindingExpression(this.EatToken_2098(), this.ParseSimpleName(LanguageParser.NameOptions.InExpression));
                    break;
                case SyntaxKind.OpenBracketToken:
                    expr = this.syntaxFactory.ElementBindingExpression(this.ParseBracketedArgumentList());
                    break;
            }
            System.Diagnostics.Debug.Assert(expr != null);
            while (true) {
                tk = this.CurrentToken.Kind;
                switch (tk) {
                    case SyntaxKind.OpenParenToken:
                        expr = this.syntaxFactory.InvocationExpression(expr, this.ParseParenthesizedArgumentList());
                        break;
                    case SyntaxKind.OpenBracketToken:
                        expr = this.syntaxFactory.ElementAccessExpression(expr, this.ParseBracketedArgumentList());
                        break;
                    case SyntaxKind.DotToken:
                        expr = this.syntaxFactory.MemberAccessExpression(SyntaxKind.SimpleMemberAccessExpression, expr, this.EatToken_2098(), this.ParseSimpleName(LanguageParser.NameOptions.InExpression));
                        break;
                    case SyntaxKind.QuestionToken:
                        if (this.CanStartConsequenceExpression(this.PeekToken(1).Kind)) {
                            var qToken = this.EatToken_2098();
                            var consequence = this.ParseConsequenceSyntax();
                            expr = this.syntaxFactory.ConditionalAccessExpression(expr, qToken, consequence);
                        }
                        return expr;
                    default:
                        return expr;
                }
            }
        }
        public ParseParenthesizedArgumentList(): ArgumentListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.ArgumentList) {
                return <ArgumentListSyntax>this.EatNode();
            }
            var openToken: SyntaxToken, closeToken;
            var arguments: SeparatedSyntaxList<ArgumentSyntax> = <SeparatedSyntaxList<ArgumentSyntax>> structDefault(SeparatedSyntaxList);
            var openToken_ref0 = { refObj: openToken };
            var arguments_ref1 = { refObj: arguments };
            var closeToken_ref2 = { refObj: closeToken };
            this.ParseArgumentList(openToken_ref0, arguments_ref1, closeToken_ref2, SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken);

            openToken = openToken_ref0.refObj;

            arguments = arguments_ref1.refObj;

            closeToken = closeToken_ref2.refObj;;
            return this.syntaxFactory.ArgumentList(openToken, arguments, closeToken);
        }
        public ParseBracketedArgumentList(): BracketedArgumentListSyntax {
            if (this.IsIncrementalAndFactoryContextMatches && this.CurrentNodeKind == SyntaxKind.BracketedArgumentList) {
                return <BracketedArgumentListSyntax>this.EatNode();
            }
            var openToken: SyntaxToken, closeToken;
            var arguments: SeparatedSyntaxList<ArgumentSyntax> = <SeparatedSyntaxList<ArgumentSyntax>> structDefault(SeparatedSyntaxList);
            var openToken_ref0 = { refObj: openToken };
            var arguments_ref1 = { refObj: arguments };
            var closeToken_ref2 = { refObj: closeToken };
            this.ParseArgumentList(openToken_ref0, arguments_ref1, closeToken_ref2, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);

            openToken = openToken_ref0.refObj;

            arguments = arguments_ref1.refObj;

            closeToken = closeToken_ref2.refObj;;
            return this.syntaxFactory.BracketedArgumentList(openToken, arguments, closeToken);
        }
        private ParseArgumentList(openToken: { refObj: SyntaxToken }, arguments: { refObj: SeparatedSyntaxList<ArgumentSyntax> }, closeToken: { refObj: SyntaxToken }, openKind: SyntaxKind, closeKind: SyntaxKind): void {
            var isIndexer: boolean = openKind == SyntaxKind.OpenBracketToken;
            var open = this.EatToken_1865(openKind);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfArgumentList;
            var list: SeparatedSyntaxListBuilder<ArgumentSyntax> = <SeparatedSyntaxListBuilder<ArgumentSyntax>> structDefault(SeparatedSyntaxListBuilder);
            try
            {
                if (this.CurrentToken.Kind != closeKind && this.CurrentToken.Kind != SyntaxKind.SemicolonToken) {
                    tryAgain:
                    while (true) {

                        if (list.IsNull) {
                            list = this.pool.AllocateSeparated<ArgumentSyntax>();
                        }
                        if (this.IsPossibleArgumentExpression() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                            list.Add(this.ParseArgumentExpression(isIndexer));
                            while (true) {
                                if (this.CurrentToken.Kind == closeKind || this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                                    break;
                                }
                                else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleArgumentExpression()) {
                                    list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                    list.Add(this.ParseArgumentExpression(isIndexer));
                                    continue;
                                }
                                else if ((() => {
                                    var open_ref0 = { refObj: open };
                                    var ret_val__886 = this.SkipBadArgumentListTokens(open_ref0, list, SyntaxKind.CommaToken, closeKind);

                                    open = open_ref0.refObj;
                                    return ret_val__886;
                                })() == LanguageParser.PostSkipAction.Abort) {
                                    break;
                                }
                            }
                        }
                        else if ((() => {
                            var open_ref0 = { refObj: open };
                            var ret_val__156 = this.SkipBadArgumentListTokens(open_ref0, list, SyntaxKind.IdentifierToken, closeKind);

                            open = open_ref0.refObj;
                            return ret_val__156;
                        })() == LanguageParser.PostSkipAction.Continue) {
                            continue tryAgain;
                        } break;
                    }
                }
                else if (isIndexer && this.CurrentToken.Kind == closeKind) {
                    if (list.IsNull) {
                        list = this.pool.AllocateSeparated<ArgumentSyntax>();
                    }
                    list.Add(this.ParseArgumentExpression(isIndexer));
                }
                this.termState = saveTerm;
                openToken.refObj = open;
                closeToken.refObj = this.EatToken_1865(closeKind);
                arguments.refObj = list.ToList();
            }

            finally {
                if (!list.IsNull) {
                    this.pool.Free_2078(list);
                }
            }
        }
        private SkipBadArgumentListTokens(open: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ArgumentSyntax>, expected: SyntaxKind, closeKind: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(open, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleArgumentExpression(), p => p.CurrentToken.Kind == closeKind || p.CurrentToken.Kind == SyntaxKind.SemicolonToken || p.IsTerminator(), expected);
        }
        private IsEndOfArgumentList(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.CloseBracketToken;
        }
        private IsPossibleArgumentExpression(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.RefKeyword:
                case SyntaxKind.OutKeyword:
                    return true;
                default:
                    return this.IsPossibleExpression();
            }
        }
        private ParseArgumentExpression(isIndexer: boolean): ArgumentSyntax {
            var nameColon: NameColonSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken && this.PeekToken(1).Kind == SyntaxKind.ColonToken) {
                var name = this.ParseIdentifierName();
                var colon = this.EatToken_1865(SyntaxKind.ColonToken);
                nameColon = this.syntaxFactory.NameColon(name, colon);
                nameColon = this.CheckFeatureAvailability(nameColon, MessageID.IDS_FeatureNamedArgument);
            }
            var refOrOutKeyword: SyntaxToken = null;
            if (this.CurrentToken.Kind == SyntaxKind.RefKeyword || this.CurrentToken.Kind == SyntaxKind.OutKeyword) {
                refOrOutKeyword = this.EatToken_2098();
            }
            var expression: ExpressionSyntax;
            if (isIndexer && (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.CurrentToken.Kind == SyntaxKind.CloseBracketToken)) {
                expression = this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_ValueExpected);
            }
            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                expression = this.AddError_1357(this.CreateMissingIdentifierName(), ErrorCode.ERR_MissingArgument);
            }
            else {
                expression = this.ParseSubExpression(0);
            }
            return this.syntaxFactory.Argument(nameColon, refOrOutKeyword, expression);
        }
        private ParseTypeOfExpression(): TypeOfExpressionSyntax {
            var keyword = this.EatToken_2098();
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var type = this.ParseTypeOrVoid();
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.TypeOfExpression(keyword, openParen, type, closeParen);
        }
        private ParseDefaultExpression(): DefaultExpressionSyntax {
            var keyword = this.EatToken_2098();
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var type = this.ParseType(false);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            keyword = this.CheckFeatureAvailability(keyword, MessageID.IDS_FeatureDefault);
            return this.syntaxFactory.DefaultExpression(keyword, openParen, type, closeParen);
        }
        private ParseSizeOfExpression(): SizeOfExpressionSyntax {
            var keyword = this.EatToken_2098();
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var type = this.ParseType(false);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.SizeOfExpression(keyword, openParen, type, closeParen);
        }
        private ParseMakeRefExpression(): MakeRefExpressionSyntax {
            var keyword = this.EatToken_2098();
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expr = this.ParseSubExpression(0);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.MakeRefExpression(keyword, openParen, expr, closeParen);
        }
        private ParseRefTypeExpression(): RefTypeExpressionSyntax {
            var keyword = this.EatToken_2098();
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expr = this.ParseSubExpression(0);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.RefTypeExpression(keyword, openParen, expr, closeParen);
        }
        private ParseCheckedOrUncheckedExpression(): CheckedExpressionSyntax {
            var checkedOrUnchecked = this.EatToken_2098();
            System.Diagnostics.Debug.Assert(checkedOrUnchecked.Kind == SyntaxKind.CheckedKeyword || checkedOrUnchecked.Kind == SyntaxKind.UncheckedKeyword);
            var kind = (checkedOrUnchecked.Kind == SyntaxKind.CheckedKeyword) ? SyntaxKind.CheckedExpression : SyntaxKind.UncheckedExpression;
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expr = this.ParseSubExpression(0);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.CheckedExpression(kind, checkedOrUnchecked, openParen, expr, closeParen);
        }
        private ParseRefValueExpression(): RefValueExpressionSyntax {
            var $refvalue = this.EatToken_1865(SyntaxKind.RefValueKeyword);
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var expr = this.ParseSubExpression(0);
            var comma = this.EatToken_1865(SyntaxKind.CommaToken);
            var type = this.ParseType(false);
            var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
            return this.syntaxFactory.RefValueExpression($refvalue, openParen, expr, comma, type, closeParen);
        }
        private ScanParenthesizedImplicitlyTypedLambda(precedence: number): boolean {
            if (!(precedence <= LanguageParser.LambdaPrecedence)) {
                return false;
            }
            if (this.PeekToken(1).Kind == SyntaxKind.IdentifierToken && (!this.IsInQuery || !LanguageParser.IsTokenQueryContextualKeyword(this.PeekToken(1))) && this.PeekToken(2).Kind == SyntaxKind.CommaToken) {
                return true;
            }
            if (this.PeekToken(1).Kind == SyntaxKind.IdentifierToken && (!this.IsInQuery || !LanguageParser.IsTokenQueryContextualKeyword(this.PeekToken(1))) && this.PeekToken(2).Kind == SyntaxKind.CloseParenToken && this.PeekToken(3).Kind == SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }
            if (this.PeekToken(1).Kind == SyntaxKind.CloseParenToken && this.PeekToken(2).Kind == SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }
            if (this.PeekToken(1).Kind == SyntaxKind.ParamsKeyword) {
                return true;
            }
            return false;
        }
        private ScanExplicitlyTypedLambda(precedence: number): boolean {
            if (!(precedence <= LanguageParser.LambdaPrecedence)) {
                return false;
            }
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                this.EatToken_2098();
                if (this.CurrentToken.Kind == SyntaxKind.RefKeyword || this.CurrentToken.Kind == SyntaxKind.OutKeyword) {
                    this.EatToken_2098();
                }
                if (this.CurrentToken.Kind == SyntaxKind.EndOfFileToken) {
                    return true;
                }
                if (this.ScanType_7309() == LanguageParser.ScanTypeFlags.NotType) {
                    return false;
                }
                if (this.CurrentToken.Kind == SyntaxKind.EndOfFileToken) {
                    return true;
                }
                if (!this.IsTrueIdentifier()) {
                    return false;
                }
                switch (this.PeekToken(1).Kind) {
                    case SyntaxKind.EndOfFileToken:
                    case SyntaxKind.CommaToken:
                        return true;
                    case SyntaxKind.CloseParenToken:
                        switch (this.PeekToken(2).Kind) {
                            case SyntaxKind.EndOfFileToken:
                            case SyntaxKind.EqualsGreaterThanToken:
                                return true;
                            default:
                                return false;
                        }
                    default:
                        return false;
                }
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private ParseCastOrParenExpressionOrLambda(precedence: number): ExpressionSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.OpenParenToken);
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                if (this.ScanParenthesizedImplicitlyTypedLambda(precedence)) {
                    return this.ParseLambdaExpression();
                }
                if (this.ScanCast()) {
                    if (!this.IsCurrentTokenQueryKeywordInQuery()) {
                        var resetPoint_ref0 = { refObj: resetPoint };
                        this.Reset_LanguageParser(resetPoint_ref0);

                        resetPoint = resetPoint_ref0.refObj;;
                        var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
                        var type = this.ParseType(false);
                        var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                        var expr = this.ParseSubExpression(LanguageParser.GetPrecedence(SyntaxKind.CastExpression));
                        return this.syntaxFactory.CastExpression(openParen, type, closeParen, expr);
                    }
                }
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                if (this.ScanExplicitlyTypedLambda(precedence)) {
                    return this.ParseLambdaExpression();
                }
                {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset_LanguageParser(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
                    var expression = this.ParseSubExpression(0);
                    var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                    return this.syntaxFactory.ParenthesizedExpression(openParen, expression, closeParen);
                }
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private ScanCast(): boolean {
            if (this.CurrentToken.Kind != SyntaxKind.OpenParenToken) {
                return false;
            }
            this.EatToken_2098();
            var type = this.ScanType_7309();
            if (type == LanguageParser.ScanTypeFlags.NotType) {
                return false;
            }
            if (this.CurrentToken.Kind != SyntaxKind.CloseParenToken) {
                return false;
            }
            if (type == LanguageParser.ScanTypeFlags.PointerOrMultiplication || type == LanguageParser.ScanTypeFlags.NullableType || type == LanguageParser.ScanTypeFlags.MustBeType || type == LanguageParser.ScanTypeFlags.AliasQualifiedName) {
                return true;
            }
            this.EatToken_2098();
            return (type == LanguageParser.ScanTypeFlags.GenericTypeOrMethod || type == LanguageParser.ScanTypeFlags.GenericTypeOrExpression || type == LanguageParser.ScanTypeFlags.NonGenericTypeOrExpression) && LanguageParser.CanFollowCast(this.CurrentToken.Kind);
        }
        private ScanAsyncLambda(precedence: number): boolean {
            if (precedence > LanguageParser.LambdaPrecedence) {
                return false;
            }
            if (this.CurrentToken.ContextualKind != SyntaxKind.AsyncKeyword) {
                return false;
            }
            if (this.PeekToken(1).Kind == SyntaxKind.IdentifierToken && this.PeekToken(2).Kind == SyntaxKind.EqualsGreaterThanToken) {
                return true;
            }
            if (this.PeekToken(1).Kind != SyntaxKind.OpenParenToken) {
                return false;
            }
            {
                var resetPoint = this.GetResetPoint_LanguageParser();
                this.EatToken_1865(SyntaxKind.IdentifierToken);
                var isAsync: boolean = this.ScanParenthesizedImplicitlyTypedLambda(precedence) || this.ScanExplicitlyTypedLambda(precedence);
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                return isAsync;
            }
        }
        private static CanFollowCast(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.AsKeyword:
                case SyntaxKind.IsKeyword:
                case SyntaxKind.SemicolonToken:
                case SyntaxKind.CloseParenToken:
                case SyntaxKind.CloseBracketToken:
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.CommaToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.QuestionToken:
                case SyntaxKind.ColonToken:
                case SyntaxKind.BarBarToken:
                case SyntaxKind.AmpersandAmpersandToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.CaretToken:
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.DotToken:
                case SyntaxKind.MinusGreaterThanToken:
                case SyntaxKind.QuestionQuestionToken:
                case SyntaxKind.EndOfFileToken:
                    return false;
                default:
                    return true;
            }
        }
        private ParseNewExpression(): ExpressionSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.NewKeyword);
            if (this.IsAnonymousType()) {
                return this.ParseAnonymousTypeExpression();
            }
            else if (this.IsImplicitlyTypedArray()) {
                return this.ParseImplicitlyTypedArrayCreation();
            }
            else {
                return this.ParseArrayOrObjectCreationExpression();
            }
        }
        private IsAnonymousType(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.NewKeyword && this.PeekToken(1).Kind == SyntaxKind.OpenBraceToken;
        }
        private ParseAnonymousTypeExpression(): AnonymousObjectCreationExpressionSyntax {
            System.Diagnostics.Debug.Assert(this.IsAnonymousType());
            var $new = this.EatToken_1865(SyntaxKind.NewKeyword);
            $new = this.CheckFeatureAvailability($new, MessageID.IDS_FeatureAnonymousTypes);
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.OpenBraceToken);
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var expressions = this.pool.AllocateSeparated<AnonymousObjectMemberDeclaratorSyntax>();
            var openBrace_ref0 = { refObj: openBrace };
            var expressions_ref1 = { refObj: expressions };
            this.ParseAnonymousTypeMemberInitializers(openBrace_ref0, expressions_ref1);

            openBrace = openBrace_ref0.refObj;

            expressions = expressions_ref1.refObj;;
            var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
            var result = this.syntaxFactory.AnonymousObjectCreationExpression($new, openBrace, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousObjectMemberDeclaratorSyntax>(expressions), closeBrace);
            this.pool.Free_2078(expressions);
            return result;
        }
        private ParseAnonymousTypeMemberInitializers(openBrace: { refObj: SyntaxToken }, list: { refObj: SeparatedSyntaxListBuilder<AnonymousObjectMemberDeclaratorSyntax> }): void {
            if (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken) {
                tryAgain:
                while (true) {

                    if (this.IsPossibleExpression() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        list.refObj.Add(this.ParseAnonymousTypeMemberInitializer());
                        while (true) {
                            if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                break;
                            }
                            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleExpression()) {
                                list.refObj.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                    break;
                                }
                                else if (!this.IsPossibleExpression()) {
                                    continue tryAgain;
                                }
                                list.refObj.Add(this.ParseAnonymousTypeMemberInitializer());
                                continue;
                            }
                            else if (this.SkipBadInitializerListTokens(openBrace, list.refObj, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                                break;
                            }
                        }
                    }
                    else if (this.SkipBadInitializerListTokens(openBrace, list.refObj, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Continue) {
                        continue tryAgain;
                    } break;
                }
            }
        }
        private ParseAnonymousTypeMemberInitializer(): AnonymousObjectMemberDeclaratorSyntax {
            var isNamedAssignment: boolean = this.IsNamedAssignment();
            var nameEquals: NameEqualsSyntax = null;
            if (isNamedAssignment) {
                nameEquals = this.ParseNameEquals();
            }
            var expression = this.ParseExpression();
            if (!isNamedAssignment && !this.IsAnonymousTypeMemberExpression(expression)) {
                expression = this.AddError_1357(expression, ErrorCode.ERR_InvalidAnonymousTypeMemberDeclarator);
            }
            return this.syntaxFactory.AnonymousObjectMemberDeclarator(nameEquals, expression);
        }
        private IsAnonymousTypeMemberExpression(expr: ExpressionSyntax): boolean {
            while (true) {
                switch (expr.Kind) {
                    case SyntaxKind.QualifiedName:
                        expr = (<QualifiedNameSyntax>expr).Right;
                        continue;
                    case SyntaxKind.ConditionalAccessExpression:
                        expr = (<ConditionalAccessExpressionSyntax>expr).WhenNotNull;
                        if (expr.Kind == SyntaxKind.MemberBindingExpression) {
                            return true;
                        }
                        continue;
                    case SyntaxKind.IdentifierName:
                    case SyntaxKind.SimpleMemberAccessExpression:
                        return true;
                    default:
                        return false;
                }
            }
        }
        private IsInitializerMember(): boolean {
            return this.IsComplexElementInitializer() || this.IsNamedAssignment() || this.IsDictionaryInitializer() || this.IsPossibleExpression();
        }
        private IsComplexElementInitializer(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.OpenBraceToken;
        }
        private IsNamedAssignment(): boolean {
            return this.IsTrueIdentifier() && this.PeekToken(1).Kind == SyntaxKind.EqualsToken;
        }
        private IsDictionaryInitializer(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.OpenBracketToken;
        }
        private ParseArrayOrObjectCreationExpression(): ExpressionSyntax {
            var $new: SyntaxToken = this.EatToken_1865(SyntaxKind.NewKeyword);
            var isPossibleArrayCreation: boolean = this.IsPossibleArrayCreationExpression();
            var type = this.ParseTypeCore(/*parentIsParameter:*/false,/*isOrAs:*/false,/*expectSizes:*/isPossibleArrayCreation,/*isArrayCreation:*/isPossibleArrayCreation);
            if (type.Kind == SyntaxKind.ArrayType) {
                var initializer: InitializerExpressionSyntax = null;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                    initializer = this.ParseArrayInitializer();
                }
                else if (type.Kind == SyntaxKind.ArrayType) {
                    var rankSpec = (<ArrayTypeSyntax>type).RankSpecifiers.$get$(0);
                    if (LanguageParser.GetNumberOfNonOmittedArraySizes(rankSpec) == 0) {
                        type = this.AddError_7816(type, rankSpec, ErrorCode.ERR_MissingArraySize);
                    }
                }
                return this.syntaxFactory.ArrayCreationExpression($new, <ArrayTypeSyntax>type, initializer);
            }
            else {
                var argumentList: ArgumentListSyntax = null;
                if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                    argumentList = this.ParseParenthesizedArgumentList();
                }
                var initializer: InitializerExpressionSyntax = null;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                    initializer = this.ParseObjectOrCollectionInitializer();
                }
                if (argumentList == null && initializer == null) {
                    argumentList = this.syntaxFactory.ArgumentList(this.AddError_1357(SyntaxFactory.MissingToken_7070(SyntaxKind.OpenParenToken), ErrorCode.ERR_BadNewExpr), <SeparatedSyntaxList<ArgumentSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.MissingToken_7070(SyntaxKind.CloseParenToken));
                }
                return this.syntaxFactory.ObjectCreationExpression($new, type, argumentList, initializer);
            }
        }
        private static GetNumberOfNonOmittedArraySizes(rankSpec: ArrayRankSpecifierSyntax): number {
            var count: number = rankSpec.Sizes.Count;
            var result: number = 0;
            for (var i: number = 0; i < count; i++) {
                if (rankSpec.Sizes.$get$(i).Kind != SyntaxKind.OmittedArraySizeExpression) {
                    result++;
                }
            }
            return result;
        }
        private IsPossibleArrayCreationExpression(): boolean {
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                var isType: LanguageParser.ScanTypeFlags = this.ScanNonArrayType_1055();
                return isType != LanguageParser.ScanTypeFlags.NotType && this.CurrentToken.Kind == SyntaxKind.OpenBracketToken;
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
        }
        private ParseObjectOrCollectionInitializer(): InitializerExpressionSyntax {
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var initializers = this.pool.AllocateSeparated<ExpressionSyntax>();
            try
            {
                var isObjectInitializer: boolean = false;
                var openBrace_ref0 = { refObj: openBrace };
                var isObjectInitializer_ref1 = { refObj: isObjectInitializer };
                this.ParseObjectOrCollectionInitializerMembers(openBrace_ref0, initializers, isObjectInitializer_ref1);

                openBrace = openBrace_ref0.refObj;

                isObjectInitializer = isObjectInitializer_ref1.refObj;;
                System.Diagnostics.Debug.Assert(initializers.Count > 0 || isObjectInitializer);
                openBrace = this.CheckFeatureAvailability(openBrace, isObjectInitializer ? MessageID.IDS_FeatureObjectInitializer : MessageID.IDS_FeatureCollectionInitializer);
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                return this.syntaxFactory.InitializerExpression(isObjectInitializer ? SyntaxKind.ObjectInitializerExpression : SyntaxKind.CollectionInitializerExpression, openBrace, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(initializers), closeBrace);
            }

            finally {
                this.pool.Free_2078(initializers);
            }
        }
        private ParseObjectOrCollectionInitializerMembers(startToken: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>, isObjectInitializer: { refObj: boolean }): void {
            isObjectInitializer.refObj = true;
            if (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken) {
                tryAgain:
                while (true) {

                    if (this.IsInitializerMember() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        isObjectInitializer.refObj = false;
                        list.Add(this.ParseObjectOrCollectionInitializerMember(isObjectInitializer));
                        while (true) {
                            if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                break;
                            }
                            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsInitializerMember()) {
                                list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                    break;
                                }
                                list.Add(this.ParseObjectOrCollectionInitializerMember(isObjectInitializer));
                                continue;
                            }
                            else if (this.SkipBadInitializerListTokens(startToken, list, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                                break;
                            }
                        }
                    }
                    else if (this.SkipBadInitializerListTokens(startToken, list, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Continue) {
                        continue tryAgain;
                    } break;
                }
            }
        }
        private ParseObjectOrCollectionInitializerMember(isObjectInitializer: { refObj: boolean }): ExpressionSyntax {
            if (this.IsComplexElementInitializer()) {
                return this.ParseComplexElementInitializer();
            }
            else if (this.IsDictionaryInitializer()) {
                isObjectInitializer.refObj = true;
                var initializer = this.ParseDictionaryInitializer();
                initializer = this.CheckFeatureAvailability(initializer, MessageID.IDS_FeatureDictionaryInitializer);
                return initializer;
            }
            else if (this.IsNamedAssignment()) {
                isObjectInitializer.refObj = true;
                return this.ParseObjectInitializerNamedAssignment();
            }
            else {
                return this.ParseExpression();
            }
        }
        private SkipBadInitializerListTokens<T extends CSharpSyntaxNode>(startToken: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<T>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(startToken, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleExpression(), p => p.CurrentToken.Kind == SyntaxKind.CloseBraceToken || p.IsTerminator(), expected);
        }
        private ParseObjectInitializerNamedAssignment(): ExpressionSyntax {
            var identifier = this.ParseIdentifierName();
            var equal = this.EatToken_1865(SyntaxKind.EqualsToken);
            var expression: ExpressionSyntax;
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                expression = this.ParseObjectOrCollectionInitializer();
            }
            else {
                expression = this.ParseExpression();
            }
            return this.syntaxFactory.AssignmentExpression(SyntaxKind.SimpleAssignmentExpression, identifier, equal, expression);
        }
        private ParseDictionaryInitializer(): ExpressionSyntax {
            var arguments = this.ParseBracketedArgumentList();
            var equal = this.EatToken_1865(SyntaxKind.EqualsToken);
            var expression: ExpressionSyntax;
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                expression = this.ParseObjectOrCollectionInitializer();
            }
            else {
                expression = this.ParseExpression();
            }
            var elementAccess = this.syntaxFactory.ImplicitElementAccess(arguments);
            return this.syntaxFactory.AssignmentExpression(SyntaxKind.SimpleAssignmentExpression, elementAccess, equal, expression);
        }
        private ParseComplexElementInitializer(): InitializerExpressionSyntax {
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var initializers = this.pool.AllocateSeparated<ExpressionSyntax>();
            try
            {
                var closeBraceError: DiagnosticInfo;
                var openBrace_ref0 = { refObj: openBrace };
                var closeBraceError_ref1 = { refObj: closeBraceError };
                this.ParseExpressionsForComplexElementInitializer(openBrace_ref0, initializers, closeBraceError_ref1);

                openBrace = openBrace_ref0.refObj;

                closeBraceError = closeBraceError_ref1.refObj;;
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                if (closeBraceError != null) {
                    closeBrace = this.WithAdditionalDiagnostics(closeBrace, closeBraceError);
                }
                return this.syntaxFactory.InitializerExpression(SyntaxKind.ComplexElementInitializerExpression, openBrace, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(initializers), closeBrace);
            }

            finally {
                this.pool.Free_2078(initializers);
            }
        }
        private ParseExpressionsForComplexElementInitializer(openBrace: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>, closeBraceError: { refObj: DiagnosticInfo }): void {
            closeBraceError.refObj = null;
            if (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken) {
                tryAgain:
                while (true) {

                    if (this.IsPossibleExpression() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        list.Add(this.ParseExpression());
                        while (true) {
                            if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                break;
                            }
                            else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleExpression()) {
                                list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                    closeBraceError.refObj = LanguageParser.MakeError_6690(this.CurrentToken, ErrorCode.ERR_ExpressionExpected);
                                    break;
                                }
                                list.Add(this.ParseExpression());
                                continue;
                            }
                            else if (this.SkipBadInitializerListTokens(openBrace, list, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                                break;
                            }
                        }
                    }
                    else if (this.SkipBadInitializerListTokens(openBrace, list, SyntaxKind.IdentifierToken) == LanguageParser.PostSkipAction.Continue) {
                        continue tryAgain;
                    } break;
                }
            }
        }
        private ParseElementInitializer(): ExpressionSyntax {
            if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                return this.ParseComplexElementInitializer();
            }
            else {
                return this.ParseExpression();
            }
        }
        private IsImplicitlyTypedArray(): boolean {
            return this.CurrentToken.Kind == SyntaxKind.NewKeyword && this.PeekToken(1).Kind == SyntaxKind.OpenBracketToken;
        }
        private ParseImplicitlyTypedArrayCreation(): ImplicitArrayCreationExpressionSyntax {
            var $new = this.EatToken_1865(SyntaxKind.NewKeyword);
            $new = this.CheckFeatureAvailability($new, MessageID.IDS_FeatureImplicitArray);
            var openBracket = this.EatToken_1865(SyntaxKind.OpenBracketToken);
            var commas = this.pool.AllocateBase();
            try
            {
                while (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                    commas.Add(this.EatToken_2098());
                }
                var closeBracket = this.EatToken_1865(SyntaxKind.CloseBracketToken);
                var initializer = this.ParseArrayInitializer();
                return this.syntaxFactory.ImplicitArrayCreationExpression($new, openBracket, SyntaxListBuilderExtensions.ToTokenList(commas), closeBracket, initializer);
            }

            finally {
                this.pool.Free_1631(commas);
            }
        }
        private ParseArrayInitializer(): InitializerExpressionSyntax {
            var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
            var list = this.pool.AllocateSeparated<ExpressionSyntax>();
            try
            {
                if (this.CurrentToken.Kind != SyntaxKind.CloseBraceToken) {
                    tryAgain:
                    while (true) {

                        if (this.IsPossibleVariableInitializer(false) || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                            list.Add(this.ParseVariableInitializer(false));
                            while (true) {
                                if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                    break;
                                }
                                else if (this.IsPossibleVariableInitializer(false) || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                                    list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                    if (this.CurrentToken.Kind == SyntaxKind.CloseBraceToken) {
                                        break;
                                    }
                                    else if (!this.IsPossibleVariableInitializer(false)) {
                                        continue tryAgain;
                                    }
                                    list.Add(this.ParseVariableInitializer(false));
                                    continue;
                                }
                                else if ((() => {
                                    var openBrace_ref0 = { refObj: openBrace };
                                    var ret_val__864 = this.SkipBadArrayInitializerTokens(openBrace_ref0, list, SyntaxKind.CommaToken);

                                    openBrace = openBrace_ref0.refObj;
                                    return ret_val__864;
                                })() == LanguageParser.PostSkipAction.Abort) {
                                    break;
                                }
                            }
                        }
                        else if ((() => {
                            var openBrace_ref0 = { refObj: openBrace };
                            var ret_val__259 = this.SkipBadArrayInitializerTokens(openBrace_ref0, list, SyntaxKind.CommaToken);

                            openBrace = openBrace_ref0.refObj;
                            return ret_val__259;
                        })() == LanguageParser.PostSkipAction.Continue) {
                            continue tryAgain;
                        } break;
                    }
                }
                var closeBrace = this.EatToken_1865(SyntaxKind.CloseBraceToken);
                return this.syntaxFactory.InitializerExpression(SyntaxKind.ArrayInitializerExpression, openBrace, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(list), closeBrace);
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private SkipBadArrayInitializerTokens(openBrace: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ExpressionSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(openBrace, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleVariableInitializer(false), p => this.CurrentToken.Kind == SyntaxKind.CloseBraceToken || this.IsTerminator(), expected);
        }
        private ParseStackAllocExpression(): StackAllocArrayCreationExpressionSyntax {
            var stackAlloc = this.EatToken_1865(SyntaxKind.StackAllocKeyword);
            var elementType = this.ParseTypeCore(/*parentIsParameter:*/false,/*isOrAs:*/false,/*expectSizes:*/true,/*isArrayCreation:*/false);
            if (elementType.Kind != SyntaxKind.ArrayType) {
                elementType = this.AddError_1357(elementType, ErrorCode.ERR_BadStackAllocExpr);
            }
            return this.syntaxFactory.StackAllocArrayCreationExpression(stackAlloc, elementType);
        }
        private ParseAnonymousMethodExpression(): AnonymousMethodExpressionSyntax {
            var parentScopeIsInAsync: boolean = this.IsInAsync;
            this.IsInAsync = false;
            var asyncToken: SyntaxToken = null;
            if (this.CurrentToken.ContextualKind == SyntaxKind.AsyncKeyword) {
                asyncToken = this.EatContextualToken_1181(SyntaxKind.AsyncKeyword);
                asyncToken = this.CheckFeatureAvailability(asyncToken, MessageID.IDS_FeatureAsync);
                this.IsInAsync = true;
            }
            var $delegate = this.EatToken_1865(SyntaxKind.DelegateKeyword);
            $delegate = this.CheckFeatureAvailability($delegate, MessageID.IDS_FeatureAnonDelegates);
            var parameterList: ParameterListSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                parameterList = this.ParseParenthesizedParameterList(/*allowThisKeyword:*/false,/*allowDefaults:*/false,/*allowAttributes:*/false);
            }
            if (this.CurrentToken.Kind != SyntaxKind.OpenBraceToken) {
                var openBrace = this.EatToken_1865(SyntaxKind.OpenBraceToken);
                return this.syntaxFactory.AnonymousMethodExpression(asyncToken, $delegate, parameterList, this.syntaxFactory.Block(openBrace, <SyntaxList<StatementSyntax>> structDefault(SyntaxList), SyntaxFactory.MissingToken_7070(SyntaxKind.CloseBraceToken)));
            }
            var body = this.ParseBlock();
            this.IsInAsync = parentScopeIsInAsync;
            return this.syntaxFactory.AnonymousMethodExpression(asyncToken, $delegate, parameterList, body);
        }
        private static LambdaPrecedence: number = 1;
        private ParseLambdaExpression(): ExpressionSyntax {
            var parentScopeIsInAsync: boolean = this.IsInAsync;
            var asyncToken: SyntaxToken = null;
            if (this.CurrentToken.ContextualKind == SyntaxKind.AsyncKeyword && this.PeekToken(1).Kind != SyntaxKind.EqualsGreaterThanToken) {
                asyncToken = this.EatContextualToken_1181(SyntaxKind.AsyncKeyword);
                asyncToken = this.CheckFeatureAvailability(asyncToken, MessageID.IDS_FeatureAsync);
                this.IsInAsync = true;
            }
            var result: ExpressionSyntax;
            if (this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                var paramList = this.ParseLambdaParameterList();
                var arrow = this.EatToken_1865(SyntaxKind.EqualsGreaterThanToken);
                arrow = this.CheckFeatureAvailability(arrow, MessageID.IDS_FeatureLambda);
                var body: CSharpSyntaxNode;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                    body = this.ParseBlock();
                }
                else {
                    body = this.ParseExpression();
                }
                result = this.syntaxFactory.ParenthesizedLambdaExpression(asyncToken, paramList, arrow, body);
            }
            else {
                var name = this.ParseIdentifierToken();
                var arrow = this.EatToken_1865(SyntaxKind.EqualsGreaterThanToken);
                arrow = this.CheckFeatureAvailability(arrow, MessageID.IDS_FeatureLambda);
                var body: CSharpSyntaxNode = null;
                if (this.CurrentToken.Kind == SyntaxKind.OpenBraceToken) {
                    body = this.ParseBlock();
                }
                else {
                    body = this.ParseExpression();
                }
                result = this.syntaxFactory.SimpleLambdaExpression(asyncToken, this.syntaxFactory.Parameter(<SyntaxList<AttributeListSyntax>> structDefault(SyntaxList), <SyntaxList<SyntaxToken>> structDefault(SyntaxList),/*type:*/null,/*identifier:*/name,/*@default:*/null), arrow, body);
            }
            this.IsInAsync = parentScopeIsInAsync;
            return result;
        }
        private ParseLambdaParameterList(): ParameterListSyntax {
            var openParen = this.EatToken_1865(SyntaxKind.OpenParenToken);
            var saveTerm = this.termState;
            this.termState |= LanguageParser.TerminatorState.IsEndOfParameterList;
            var nodes = this.pool.AllocateSeparated<ParameterSyntax>();
            try
            {
                var hasTypes: boolean = false;
                if (this.CurrentToken.Kind != SyntaxKind.CloseParenToken) {
                    tryAgain:
                    while (true) {

                        if (this.IsPossibleLambdaParameter() || this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                            var hasTypes_ref0 = { refObj: hasTypes };
                            var ret_val__466 = this.ParseLambdaParameter(/*isFirst:*/true,/*hasTypes:*/hasTypes_ref0);

                            hasTypes = hasTypes_ref0.refObj;
                            var parameter = ret_val__466;
                            nodes.Add(parameter);
                            while (true) {
                                if (this.CurrentToken.Kind == SyntaxKind.CloseParenToken) {
                                    break;
                                }
                                else if (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleLambdaParameter()) {
                                    nodes.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                                    var hasTypes_ref0 = { refObj: hasTypes };
                                    var ret_val__282 = this.ParseLambdaParameter(false, hasTypes_ref0);

                                    hasTypes = hasTypes_ref0.refObj;
                                    parameter = ret_val__282;
                                    nodes.Add(parameter);
                                    continue;
                                }
                                else if ((() => {
                                    var openParen_ref0 = { refObj: openParen };
                                    var ret_val__258 = this.SkipBadLambdaParameterListTokens(openParen_ref0, nodes, SyntaxKind.CommaToken, SyntaxKind.CloseParenToken);

                                    openParen = openParen_ref0.refObj;
                                    return ret_val__258;
                                })() == LanguageParser.PostSkipAction.Abort) {
                                    break;
                                }
                            }
                        }
                        else if ((() => {
                            var openParen_ref0 = { refObj: openParen };
                            var ret_val__197 = this.SkipBadLambdaParameterListTokens(openParen_ref0, nodes, SyntaxKind.IdentifierToken, SyntaxKind.CloseParenToken);

                            openParen = openParen_ref0.refObj;
                            return ret_val__197;
                        })() == LanguageParser.PostSkipAction.Continue) {
                            continue tryAgain;
                        } break;
                    }
                }
                this.termState = saveTerm;
                var closeParen = this.EatToken_1865(SyntaxKind.CloseParenToken);
                return this.syntaxFactory.ParameterList(openParen, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>(nodes), closeParen);
            }

            finally {
                this.pool.Free_2078(nodes);
            }
        }
        private IsPossibleLambdaParameter(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.ParamsKeyword:
                case SyntaxKind.RefKeyword:
                case SyntaxKind.OutKeyword:
                    return true;
                case SyntaxKind.IdentifierToken:
                    return this.IsTrueIdentifier();
                default:
                    return LanguageParser.IsPredefinedType(this.CurrentToken.Kind);
            }
        }
        private SkipBadLambdaParameterListTokens(openParen: { refObj: SyntaxToken }, list: SeparatedSyntaxListBuilder<ParameterSyntax>, expected: SyntaxKind, closeKind: SyntaxKind): LanguageParser.PostSkipAction {
            return this.SkipBadSeparatedListTokensWithExpectedKind(openParen, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken && !p.IsPossibleLambdaParameter(), p => p.CurrentToken.Kind == closeKind || p.IsTerminator(), expected);
        }
        private ParseLambdaParameter(isFirst: boolean, hasTypes: { refObj: boolean }): ParameterSyntax {
            var paramType: TypeSyntax = null;
            var paramName: SyntaxToken = null;
            var refOrOutOrParams: SyntaxToken = null;
            var isRefOrOutOrParams: boolean = this.CurrentToken.Kind == SyntaxKind.RefKeyword || this.CurrentToken.Kind == SyntaxKind.OutKeyword || this.CurrentToken.Kind == SyntaxKind.ParamsKeyword;
            var pk = this.PeekToken(1).Kind;
            if (isRefOrOutOrParams || (pk != SyntaxKind.CommaToken && pk != SyntaxKind.CloseParenToken && (hasTypes.refObj || isFirst)) || LanguageParser.IsPredefinedType(this.CurrentToken.Kind)) {
                if (isRefOrOutOrParams) {
                    refOrOutOrParams = this.EatToken_2098();
                }
                paramType = this.ParseType(true);
            }
            paramName = this.ParseIdentifierToken();
            if (isFirst) {
                hasTypes.refObj = paramType != null;
            }
            else if (paramType != null && !hasTypes.refObj && !paramName.IsMissing) {
                paramType = this.AddError_1357(paramType, ErrorCode.ERR_InconsistentLambdaParameterUsage);
            }
            else if (paramType == null && hasTypes.refObj && !paramName.IsMissing) {
                paramName = this.AddError_1357(paramName, ErrorCode.ERR_InconsistentLambdaParameterUsage);
            }
            return this.syntaxFactory.Parameter(<SyntaxList<AttributeListSyntax>> structDefault(SyntaxList), SyntaxList.op_Implicit_5999<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(refOrOutOrParams), paramType, paramName, null);
        }
        private get IsCurrentTokenQueryContextualKeyword(): boolean {
            return LanguageParser.IsTokenQueryContextualKeyword(this.CurrentToken);
        }
        private static IsTokenQueryContextualKeyword(token: SyntaxToken): boolean {
            if (LanguageParser.IsTokenStartOfNewQueryClause(token)) {
                return true;
            }
            switch (token.ContextualKind) {
                case SyntaxKind.OnKeyword:
                case SyntaxKind.EqualsKeyword:
                case SyntaxKind.AscendingKeyword:
                case SyntaxKind.DescendingKeyword:
                case SyntaxKind.ByKeyword:
                    return true;
            }
            return false;
        }
        private static IsTokenStartOfNewQueryClause(token: SyntaxToken): boolean {
            switch (token.ContextualKind) {
                case SyntaxKind.FromKeyword:
                case SyntaxKind.JoinKeyword:
                case SyntaxKind.IntoKeyword:
                case SyntaxKind.WhereKeyword:
                case SyntaxKind.OrderByKeyword:
                case SyntaxKind.GroupKeyword:
                case SyntaxKind.SelectKeyword:
                case SyntaxKind.LetKeyword:
                    return true;
                default:
                    return false;
            }
        }
        private IsQueryExpression(mayBeVariableDeclaration: boolean, mayBeMemberDeclaration: boolean): boolean {
            if (this.CurrentToken.ContextualKind == SyntaxKind.FromKeyword) {
                return this.IsQueryExpressionAfterFrom(mayBeVariableDeclaration, mayBeMemberDeclaration);
            }
            return false;
        }
        private IsQueryExpressionAfterFrom(mayBeVariableDeclaration: boolean, mayBeMemberDeclaration: boolean): boolean {
            var pk1 = this.PeekToken(1).Kind;
            if (LanguageParser.IsPredefinedType(pk1)) {
                return true;
            }
            if (pk1 == SyntaxKind.IdentifierToken) {
                var pk2 = this.PeekToken(2).Kind;
                if (pk2 == SyntaxKind.InKeyword) {
                    return true;
                }
                if (mayBeVariableDeclaration) {
                    if (pk2 == SyntaxKind.SemicolonToken || pk2 == SyntaxKind.CommaToken || pk2 == SyntaxKind.EqualsToken) {
                        return false;
                    }
                }
                if (mayBeMemberDeclaration) {
                    if (pk2 == SyntaxKind.OpenParenToken || pk2 == SyntaxKind.OpenBraceToken) {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            var resetPoint = this.GetResetPoint_LanguageParser();
            try
            {
                this.EatToken_2098();
                var isType: LanguageParser.ScanTypeFlags = this.ScanType_7309();
                if (isType != LanguageParser.ScanTypeFlags.NotType && (this.CurrentToken.Kind == SyntaxKind.IdentifierToken || this.CurrentToken.Kind == SyntaxKind.InKeyword)) {
                    return true;
                }
            }

            finally {
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Reset_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release_LanguageParser(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
            return false;
        }
        private ParseQueryExpression(): QueryExpressionSyntax {
            this.EnterQuery();
            var fc = this.ParseFromClause();
            fc = this.CheckFeatureAvailability(fc, MessageID.IDS_FeatureQueryExpression);
            var body = this.ParseQueryBody();
            this.LeaveQuery();
            return this.syntaxFactory.QueryExpression(fc, body);
        }
        private ParseQueryBody(): QueryBodySyntax {
            var clauses = this.pool.Allocate<QueryClauseSyntax>();
            try
            {
                var selectOrGroupBy: SelectOrGroupClauseSyntax = null;
                var continuation: QueryContinuationSyntax = null;
                while (true) {
                    switch (this.CurrentToken.ContextualKind) {
                        case SyntaxKind.FromKeyword:
                            var fc = this.ParseFromClause();
                            clauses.Add(fc);
                            continue;
                        case SyntaxKind.JoinKeyword:
                            clauses.Add(this.ParseJoinClause());
                            continue;
                        case SyntaxKind.LetKeyword:
                            clauses.Add(this.ParseLetClause());
                            continue;
                        case SyntaxKind.WhereKeyword:
                            clauses.Add(this.ParseWhereClause());
                            continue;
                        case SyntaxKind.OrderByKeyword:
                            clauses.Add(this.ParseOrderByClause());
                            continue;
                    }
                    break;
                }
                switch (this.CurrentToken.ContextualKind) {
                    case SyntaxKind.SelectKeyword:
                        selectOrGroupBy = this.ParseSelectClause();
                        break;
                    case SyntaxKind.GroupKeyword:
                        selectOrGroupBy = this.ParseGroupClause();
                        break;
                    default:
                        selectOrGroupBy = this.AddError_1357(this.syntaxFactory.SelectClause(SyntaxFactory.MissingToken_7070(SyntaxKind.SelectKeyword), this.CreateMissingIdentifierName()), ErrorCode.ERR_ExpectedSelectOrGroup);
                        break;
                }
                if (this.CurrentToken.ContextualKind == SyntaxKind.IntoKeyword) {
                    continuation = this.ParseQueryContinuation();
                }
                return this.syntaxFactory.QueryBody(SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryClauseSyntax>(clauses), selectOrGroupBy, continuation);
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(clauses));
            }
        }
        private ParseFromClause(): FromClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.FromKeyword);
            var $from = this.EatContextualToken_1181(SyntaxKind.FromKeyword);
            $from = this.CheckFeatureAvailability($from, MessageID.IDS_FeatureQueryExpression);
            var type: TypeSyntax = null;
            if (this.PeekToken(1).Kind != SyntaxKind.InKeyword) {
                type = this.ParseType(false);
            }
            var name: SyntaxToken;
            if (this.PeekToken(1).ContextualKind == SyntaxKind.InKeyword && (this.CurrentToken.Kind != SyntaxKind.IdentifierToken || SyntaxFacts.IsQueryContextualKeyword(this.CurrentToken.ContextualKind))) {
                name = this.EatToken_2098();
                name = this.WithAdditionalDiagnostics(name, this.GetExpectedTokenError_1077(SyntaxKind.IdentifierToken, name.ContextualKind, name.GetLeadingTriviaWidth(), name.Width));
                name = this.ConvertToMissingWithTrailingTrivia(name, SyntaxKind.IdentifierToken);
            }
            else {
                name = this.ParseIdentifierToken();
            }
            var $in = this.EatToken_1865(SyntaxKind.InKeyword);
            var expression = this.ParseExpression();
            return this.syntaxFactory.FromClause($from, type, name, $in, expression);
        }
        private ParseJoinClause(): JoinClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.JoinKeyword);
            var $join = this.EatContextualToken_1181(SyntaxKind.JoinKeyword);
            var type: TypeSyntax = null;
            if (this.PeekToken(1).Kind != SyntaxKind.InKeyword) {
                type = this.ParseType(false);
            }
            var name = this.ParseIdentifierToken();
            var $in = this.EatToken_1865(SyntaxKind.InKeyword);
            var inExpression = this.ParseExpression();
            var $on = this.EatContextualToken_1786(SyntaxKind.OnKeyword, ErrorCode.ERR_ExpectedContextualKeywordOn);
            var leftExpression = this.ParseExpression();
            var $equals = this.EatContextualToken_1786(SyntaxKind.EqualsKeyword, ErrorCode.ERR_ExpectedContextualKeywordEquals);
            var rightExpression = this.ParseExpression();
            var joinInto: JoinIntoClauseSyntax = null;
            if (this.CurrentToken.ContextualKind == SyntaxKind.IntoKeyword) {
                var $into = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                var intoId = this.ParseIdentifierToken();
                joinInto = this.syntaxFactory.JoinIntoClause($into, intoId);
            }
            return this.syntaxFactory.JoinClause($join, type, name, $in, inExpression, $on, leftExpression, $equals, rightExpression, joinInto);
        }
        private ParseLetClause(): LetClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.LetKeyword);
            var $let = this.EatContextualToken_1181(SyntaxKind.LetKeyword);
            var name = this.ParseIdentifierToken();
            var equal = this.EatToken_1865(SyntaxKind.EqualsToken);
            var expression = this.ParseExpression();
            return this.syntaxFactory.LetClause($let, name, equal, expression);
        }
        private ParseWhereClause(): WhereClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.WhereKeyword);
            var $where = this.EatContextualToken_1181(SyntaxKind.WhereKeyword);
            var condition = this.ParseExpression();
            return this.syntaxFactory.WhereClause($where, condition);
        }
        private ParseOrderByClause(): OrderByClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.OrderByKeyword);
            var $orderby = this.EatContextualToken_1181(SyntaxKind.OrderByKeyword);
            var list = this.pool.AllocateSeparated<OrderingSyntax>();
            try
            {
                list.Add(this.ParseOrdering());
                while (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                    if (this.CurrentToken.Kind == SyntaxKind.CloseParenToken || this.CurrentToken.Kind == SyntaxKind.SemicolonToken) {
                        break;
                    }
                    else if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                        list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                        list.Add(this.ParseOrdering());
                        continue;
                    }
                    else if (this.SkipBadOrderingListTokens(list, SyntaxKind.CommaToken) == LanguageParser.PostSkipAction.Abort) {
                        break;
                    }
                }
                return this.syntaxFactory.OrderByClause($orderby, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OrderingSyntax>(list));
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private SkipBadOrderingListTokens(list: SeparatedSyntaxListBuilder<OrderingSyntax>, expected: SyntaxKind): LanguageParser.PostSkipAction {
            var tmp: CSharpSyntaxNode = null;
            System.Diagnostics.Debug.Assert(list.Count > 0);
            var tmp_ref0 = { refObj: tmp };
            var ret_val__180 = this.SkipBadSeparatedListTokensWithExpectedKind(tmp_ref0, list, p => p.CurrentToken.Kind != SyntaxKind.CommaToken, p => p.CurrentToken.Kind == SyntaxKind.CloseParenToken || p.CurrentToken.Kind == SyntaxKind.SemicolonToken || p.IsCurrentTokenQueryContextualKeyword || p.IsTerminator(), expected);

            tmp = tmp_ref0.refObj;
            return ret_val__180;
        }
        private ParseOrdering(): OrderingSyntax {
            var expression = this.ParseExpression();
            var direction: SyntaxToken = null;
            var kind: SyntaxKind = SyntaxKind.AscendingOrdering;
            if (this.CurrentToken.ContextualKind == SyntaxKind.AscendingKeyword || this.CurrentToken.ContextualKind == SyntaxKind.DescendingKeyword) {
                direction = LanguageParser.ConvertToKeyword(this.EatToken_2098());
                if (direction.Kind == SyntaxKind.DescendingKeyword) {
                    kind = SyntaxKind.DescendingOrdering;
                }
            }
            return this.syntaxFactory.Ordering(kind, expression, direction);
        }
        private ParseSelectClause(): SelectClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.SelectKeyword);
            var $select = this.EatContextualToken_1181(SyntaxKind.SelectKeyword);
            var expression = this.ParseExpression();
            return this.syntaxFactory.SelectClause($select, expression);
        }
        private ParseGroupClause(): GroupClauseSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.GroupKeyword);
            var $group = this.EatContextualToken_1181(SyntaxKind.GroupKeyword);
            var groupExpression = this.ParseExpression();
            var $by = this.EatContextualToken_1786(SyntaxKind.ByKeyword, ErrorCode.ERR_ExpectedContextualKeywordBy);
            var byExpression = this.ParseExpression();
            return this.syntaxFactory.GroupClause($group, groupExpression, $by, byExpression);
        }
        private ParseQueryContinuation(): QueryContinuationSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.ContextualKind == SyntaxKind.IntoKeyword);
            var $into = this.EatContextualToken_1181(SyntaxKind.IntoKeyword);
            var name = this.ParseIdentifierToken();
            var body = this.ParseQueryBody();
            return this.syntaxFactory.QueryContinuation($into, name, body);
        }
        //private get IsIncremental(): boolean {
        //    throw new System.Exception("Use IsIncrementalAndFactoryContextMatches");
        //}
        private get IsIncrementalAndFactoryContextMatches(): boolean {
            if (!super.GetIsIncremental()) {
                return false;
            }
            var current: CSharp.CSharpSyntaxNode = this.CurrentNode;
            return current != null && LanguageParser.MatchesFactoryContext(current.Green, this.syntaxFactoryContext);
        }
        public static MatchesFactoryContext(green: GreenNode, context: SyntaxFactoryContext): boolean {
            return context.IsInAsync == green.ParsedInAsync && context.IsInQuery == green.ParsedInQuery;
        }
        private get IsInAsync(): boolean {
            return this.syntaxFactoryContext.IsInAsync;
        }
        private set IsInAsync(value: boolean) {
            this.syntaxFactoryContext.IsInAsync = value;
        }
        private get IsInQuery(): boolean {
            return this.syntaxFactoryContext.IsInQuery;
        }
        private EnterQuery(): void {
            this.syntaxFactoryContext.QueryDepth++;
        }
        private LeaveQuery(): void {
            System.Diagnostics.Debug.Assert(this.syntaxFactoryContext.QueryDepth > 0);
            this.syntaxFactoryContext.QueryDepth--;
        }
        private GetResetPoint_LanguageParser(): LanguageParser.ResetPointLanguageParser {
            return new LanguageParser.ResetPointLanguageParser().ctor_1108(super.GetResetPoint(), this.termState, this.isInTry, this.syntaxFactoryContext.IsInAsync, this.syntaxFactoryContext.QueryDepth);
        }
        private Reset_LanguageParser(state: { refObj: LanguageParser.ResetPointLanguageParser }): void {
            this.termState = state.refObj.TerminatorState;
            this.isInTry = state.refObj.IsInTry;
            this.syntaxFactoryContext.IsInAsync = state.refObj.IsInAsync;
            this.syntaxFactoryContext.QueryDepth = state.refObj.QueryDepth;
            var BaseResetPoint_ref0 = { refObj: state.refObj.BaseResetPoint };
            super.Reset(BaseResetPoint_ref0);

            state.refObj.BaseResetPoint = BaseResetPoint_ref0.refObj;;
        }
        private Release_LanguageParser(state: { refObj: LanguageParser.ResetPointLanguageParser }): void {
            var BaseResetPoint_ref0 = { refObj: state.refObj.BaseResetPoint };
            super.Release(BaseResetPoint_ref0);

            state.refObj.BaseResetPoint = BaseResetPoint_ref0.refObj;;
        }
        public ConsumeUnexpectedTokens<TNode extends CSharpSyntaxNode>(node: TNode): TNode {
            if (this.CurrentToken.Kind == SyntaxKind.EndOfFileToken)
                return node;
            var b: SyntaxListBuilder<SyntaxToken> = this.pool.Allocate<SyntaxToken>();
            while (this.CurrentToken.Kind != SyntaxKind.EndOfFileToken) {
                b.Add(this.EatToken_2098());
            }
            var trailingTrash = b.ToList();
            this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(b));
            node = this.AddError_7870(node, ErrorCode.ERR_UnexpectedCharacter, trailingTrash.$get$(0).ToString());
            node = this.AddTrailingSkippedSyntax(node, trailingTrash.Node);
            return node;
        }
        
        private Substring(s: string, first: number, last: number): string {
            var len: number = last - first + 1;
            return (last > s.length || len < 0) ? s : s.substr(first, len);
        }
        private ParseInterpolatedStringToken(): ExpressionSyntax {
            var originalToken = this.EatToken_2098();
            var originalText = originalToken.ValueText;
            System.Diagnostics.Debug.Assert(originalText[0] == '$');
            var isVerbatim = originalText.length > 2 && originalText[1] == '@';
            System.Diagnostics.Debug.Assert(originalToken.Kind == SyntaxKind.InterpolatedStringToken);
            var interpolations = ArrayBuilder.GetInstance_1997<Lexer.Interpolation>();
            var error: SyntaxDiagnosticInfo = null;
            var tempLexer = new Lexer().ctor_1061(Text.SourceText.From_1429(originalText), this.Options,/*allowPreprocessorDirectives:*/false)
            try
            {
                var info = structDefault(Lexer.TokenInfo);
                var info_ref0 = { refObj: info };
                var error_ref1 = { refObj: error };
                tempLexer.ScanInterpolatedStringLiteralTop(interpolations, isVerbatim, info_ref0, error_ref1);

                info = info_ref0.refObj;

                error = error_ref1.refObj;;
            }
            finally {
                if (tempLexer != null) tempLexer.Dispose();
            }
            var builder = this.pool.AllocateSeparated<InterpolatedStringInsertSyntax>();
            try
            {
                var stringStart: SyntaxToken = null;
                var stringEnd: SyntaxToken = null;
                if (interpolations.Count == 0) {
                    var startText = this.Substring(originalText, isVerbatim ? 3 : 2, originalText.length - 1);
                    stringStart = this.MakeStringToken(originalText, startText, isVerbatim, SyntaxKind.InterpolatedStringStartToken).WithLeadingTrivia_9638(originalToken.GetLeadingTrivia());
                    stringEnd = SyntaxFactory.Literal_1924(null, System.String.Empty, SyntaxKind.InterpolatedStringEndToken, System.String.Empty, null).WithTrailingTrivia_9295(originalToken.GetTrailingTrivia());
                }
                else {
                    for (var i: number = 0; i < interpolations.Count; i++) {
                        var interpolation = interpolations.$get$(i);
                        var first = i == 0;
                        var last = i == (interpolations.Count - 1);
                        if (first) {
                            var startText1 = this.Substring(originalText, 0, interpolation.Start);
                            var startText2 = this.Substring(originalText, isVerbatim ? 3 : 2, interpolation.Start - 1);
                            stringStart = this.MakeStringToken(startText1, startText2, isVerbatim, SyntaxKind.InterpolatedStringStartToken).WithLeadingTrivia_9638(originalToken.GetLeadingTrivia());
                            System.Diagnostics.Debug.Assert(stringStart.Kind == SyntaxKind.InterpolatedStringStartToken);
                        }
                        var additionalTrivia: CSharpSyntaxNode;
                        var hasFormatSpecifier = interpolation.Colon != 0;
                        var end = hasFormatSpecifier ? interpolation.Colon : interpolation.End;
                        var interpText = this.Substring(originalText, interpolation.Start + 1, end - 1);
                        var tempLexer = new Lexer().ctor_1061(Text.SourceText.From_1429(interpText), this.Options,/*allowPreprocessorDirectives:*/false)
                        try
                        {
                            var tempParser = new LanguageParser().ctor_1741(tempLexer, null, null)
                            try
                            {
                                var expr: ExpressionSyntax;
                                var commaToken: SyntaxToken;
                                var alignmentExpression: ExpressionSyntax;
                                var expr_ref0 = { refObj: expr };
                                var commaToken_ref1 = { refObj: commaToken };
                                var alignmentExpression_ref2 = { refObj: alignmentExpression };
                                tempParser.ParseInterpolationStart(expr_ref0, commaToken_ref1, alignmentExpression_ref2);

                                expr = expr_ref0.refObj;

                                commaToken = commaToken_ref1.refObj;

                                alignmentExpression = alignmentExpression_ref2.refObj;;
                                additionalTrivia = tempParser.CurrentToken.GetLeadingTrivia();
                                var formatToken = null;
                                if (hasFormatSpecifier) {
                                    additionalTrivia = null;
                                    var formatString1 = this.Substring(originalText, interpolation.Colon, interpolation.End - 1);
                                    var formatString2 = this.Substring(originalText, interpolation.Colon + 1, interpolation.End - 1);
                                    formatToken = this.MakeStringToken(formatString1, formatString2, isVerbatim, SyntaxKind.StringLiteralToken);
                                    var text = formatToken.ValueText;
                                    if (text.length == 0) {
                                        formatToken = this.AddError_1357(formatToken, ErrorCode.ERR_EmptyFormatSpecifier);
                                    }
                                    else if (SyntaxFacts.IsWhitespace(text[text.length - 1]) || SyntaxFacts.IsNewLine(text[text.length - 1])) {
                                        formatToken = this.AddError_1357(formatToken, ErrorCode.ERR_TrailingWhitespaceInFormatSpecifier);
                                    }
                                }
                                var insert = SyntaxFactory.InterpolatedStringInsert(expr, commaToken, alignmentExpression, formatToken);
                                builder.Add(insert);
                            }
                            finally {
                                if (tempParser != null) tempParser.Dispose();
                            }
                        }
                        finally {
                            if (tempLexer != null) tempLexer.Dispose();
                        }
                        if (last) {
                            var endText1 = originalText.substr(interpolation.End);
                            var endText2 = this.Substring(originalText, interpolation.End + 1, originalText.length - 2);
                            stringEnd = this.MakeStringToken(endText1, endText2, isVerbatim, SyntaxKind.InterpolatedStringEndToken).WithLeadingTrivia_9638(additionalTrivia).WithTrailingTrivia_9295(originalToken.GetTrailingTrivia());
                            System.Diagnostics.Debug.Assert(stringEnd.Kind == SyntaxKind.InterpolatedStringEndToken);
                        }
                        else {
                            var midText1 = this.Substring(originalText, interpolation.End, interpolations.$get$(i + 1).Start);
                            var midText2 = this.Substring(originalText, interpolation.End + 1, interpolations.$get$(i + 1).Start - 1);
                            var stringMid = this.MakeStringToken(midText1, midText2, isVerbatim, SyntaxKind.InterpolatedStringMidToken).WithLeadingTrivia_9638(additionalTrivia);
                            System.Diagnostics.Debug.Assert(stringMid.Kind == SyntaxKind.InterpolatedStringMidToken);
                            builder.AddSeparator(stringMid);
                        }
                    }
                }
                interpolations.Free();
                var result = SyntaxFactory.InterpolatedString(stringStart, builder.ToList(), stringEnd);
                if (error != null)
                    result = CodeAnalysis.GreenNodeExtensions.WithDiagnosticsGreen(result,
                        new Array(error));
                return result;
            }

            finally {
                this.pool.Free_2078(builder);
            }
        }
        MakeStringToken(text: string, bodyText: string, isVerbatim: boolean, kind: SyntaxKind): SyntaxToken {
            var fakeString = (isVerbatim ? "@\"" : "\"") + bodyText + "\"";
            var tempLexer = new Lexer().ctor_1061(Text.SourceText.From_1429(fakeString), this.Options,/*allowPreprocessorDirectives:*/false)
            try
            {
                var info = structDefault(Lexer.TokenInfo);
                if (isVerbatim) {
                    var info_ref0 = { refObj: info };
                    tempLexer.ScanVerbatimStringLiteral(info_ref0);

                    info = info_ref0.refObj;;
                }
                else {
                    var info_ref0 = { refObj: info };
                    tempLexer.ScanStringLiteral(info_ref0);

                    info = info_ref0.refObj;;
                }
                System.Diagnostics.Debug.Assert(info.Kind == SyntaxKind.StringLiteralToken);
                return SyntaxFactory.Literal_1924(null, text, kind, info.StringValue, null);
            }
            finally {
                if (tempLexer != null) tempLexer.Dispose();
            }
        }
        private ParseInterpolationStart(expr: { refObj: ExpressionSyntax }, commaToken: { refObj: SyntaxToken }, alignmentExpression: { refObj: ExpressionSyntax }): void {
            expr.refObj = this.ParseExpression();
            if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                commaToken.refObj = this.EatToken_1865(SyntaxKind.CommaToken);
                var minusToken = (this.CurrentToken.Kind == SyntaxKind.MinusToken) ? this.EatToken_1865(SyntaxKind.MinusToken) : null;
                var widthToken = this.EatToken_1865(SyntaxKind.NumericLiteralToken);
                var widthExpression = SyntaxFactory.LiteralExpression(SyntaxKind.NumericLiteralExpression, widthToken);
                alignmentExpression.refObj = (minusToken != null) ? <ExpressionSyntax>SyntaxFactory.PrefixUnaryExpression(SyntaxKind.UnaryMinusExpression, minusToken, widthExpression) : widthExpression;
                alignmentExpression.refObj = this.ConsumeUnexpectedTokens(alignmentExpression.refObj);
            }
            else {
                commaToken.refObj = null;
                alignmentExpression.refObj = null;
                expr.refObj = this.ConsumeUnexpectedTokens(expr.refObj);
            }
        }
        constructor() { super(); } 
        //partial

    }
    export module LanguageParser {
        export enum TerminatorState {
            EndOfFile = 0,
            IsNamespaceMemberStartOrStop = 1 << 0,
            IsAttributeDeclarationTerminator = 1 << 1,
            IsPossibleAggregateClauseStartOrStop = 1 << 2,
            IsPossibleMemberStartOrStop = 1 << 3,
            IsEndOfReturnType = 1 << 4,
            IsEndOfParameterList = 1 << 5,
            IsEndOfFieldDeclaration = 1 << 6,
            IsPossibleEndOfVariableDeclaration = 1 << 7,
            IsEndOfTypeArgumentList = 1 << 8,
            IsPossibleStatementStartOrStop = 1 << 9,
            IsEndOfFixedStatement = 1 << 10,
            IsEndOfTryBlock = 1 << 11,
            IsEndOfCatchClause = 1 << 12,
            IsEndOfilterClause = 1 << 13,
            IsEndOfCatchBlock = 1 << 14,
            IsEndOfDoWhileExpression = 1 << 15,
            IsEndOfForStatementArgument = 1 << 16,
            IsEndOfDeclarationClause = 1 << 17,
            IsEndOfArgumentList = 1 << 18,
            IsSwitchSectionStart = 1 << 19,
            IsEndOfTypeParameterList = 1 << 20,
            IsEndOfMethodSignature = 1 << 21,
            IsEndOfNameInExplicitInterface = 1 << 22
        }
    }
    export module LanguageParser {
        export class NamespaceBodyBuilder implements IStruct {
            public Externs: SyntaxListBuilder<ExternAliasDirectiveSyntax> = <SyntaxListBuilder<ExternAliasDirectiveSyntax>> structDefault(SyntaxListBuilder);
            public Usings: SyntaxListBuilder<UsingDirectiveSyntax> = <SyntaxListBuilder<UsingDirectiveSyntax>> structDefault(SyntaxListBuilder);
            public Attributes: SyntaxListBuilder<AttributeListSyntax> = <SyntaxListBuilder<AttributeListSyntax>> structDefault(SyntaxListBuilder);
            public Members: SyntaxListBuilder<MemberDeclarationSyntax> = <SyntaxListBuilder<MemberDeclarationSyntax>> structDefault(SyntaxListBuilder);
            ctor_2673(pool: SyntaxListPool): NamespaceBodyBuilder {
                this.Externs = pool.Allocate<ExternAliasDirectiveSyntax>();
                this.Usings = pool.Allocate<UsingDirectiveSyntax>();
                this.Attributes = pool.Allocate<AttributeListSyntax>();
                this.Members = pool.Allocate<MemberDeclarationSyntax>();
                return this;
            }
            public Free(pool: SyntaxListPool): void {
                pool.Free_1631(Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBuilder.op_Implicit_1734(this.Members));
                pool.Free_1631(Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBuilder.op_Implicit_1734(this.Attributes));
                pool.Free_1631(Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBuilder.op_Implicit_1734(this.Usings));
                pool.Free_1631(Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxListBuilder.op_Implicit_1734(this.Externs));
            }
            constructor() { }
        }
    }
    export module LanguageParser {
        export enum NamespaceParts {
            None = 0,
            ExternAliases = 1,
            Usings = 2,
            GlobalAttributes = 3,
            MembersAndStatements = 4
        }
    }
    export module LanguageParser {
        export enum SyntaxModifier {
            None = 0,
            Public = 0x0001,
            Internal = 0x0002,
            Protected = 0x0004,
            Private = 0x0008,
            Sealed = 0x0010,
            Abstract = 0x0020,
            Static = 0x0040,
            Virtual = 0x0080,
            Extern = 0x0100,
            New = 0x0200,
            Override = 0x0400,
            ReadOnly = 0x0800,
            Volatile = 0x1000,
            Unsafe = 0x2000,
            Partial = 0x4000,
            Async = 0x8000
        }
    }
    export module LanguageParser {
        export enum PostSkipAction {
            Continue,
            Abort
        }
    }
    export module LanguageParser {
        export enum ParamFlags {
            None = 0x00,
            This = 0x01,
            Ref = 0x02,
            Out = 0x04,
            Params = 0x08
        }
    }
    export module LanguageParser {
        export enum VariableFlags {
            Fixed = 0x01,
            Const = 0x02,
            Local = 0x04
        }
    }
    export module LanguageParser {
        export enum NameOptions {
            None = 0,
            InExpression = 1 << 0,
            InTypeList = 1 << 1
        }
    }
    export module LanguageParser {
        export enum ScanTypeArgumentListKind {
            NotTypeArgumentList,
            PossibleTypeArgumentList,
            DefiniteTypeArgumentList
        }
    }
    export module LanguageParser {
        export enum ScanTypeFlags {
            NotType,
            MustBeType,
            GenericTypeOrMethod,
            GenericTypeOrExpression,
            NonGenericTypeOrExpression,
            AliasQualifiedName,
            NullableType,
            PointerOrMultiplication
        }
    }
    export module LanguageParser {
        export class ResetPointLanguageParser implements IStruct {
            public BaseResetPoint: SyntaxParser.ResetPoint = structDefault(SyntaxParser.ResetPoint);
            public TerminatorState: TerminatorState = 0;
            public IsInTry: boolean = false;
            public IsInAsync: boolean = false;
            public QueryDepth: number = 0;
            ctor_1108(resetPoint: SyntaxParser.ResetPoint, terminatorState: TerminatorState, isInTry: boolean, isInAsync: boolean, queryDepth: number): ResetPointLanguageParser {
                this.BaseResetPoint = resetPoint;
                this.TerminatorState = terminatorState;
                this.IsInTry = isInTry;
                this.IsInAsync = isInAsync;
                this.QueryDepth = queryDepth;
                return this;
            }
            constructor() { }

            //partial


        }
    }

    LanguageParser.LastTerminatorState = <number>LanguageParser.TerminatorState.IsEndOfNameInExplicitInterface;
}
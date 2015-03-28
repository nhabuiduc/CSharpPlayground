module Microsoft.CodeAnalysis.CSharp {
    export class CSharpSyntaxVisitor<TResult>
    {
        public Visit(node: SyntaxNode): TResult {
            if (node != null) {
                return (<CSharpSyntaxNode>node).Accept_1388(this);
            }
            return null;
        }
        public DefaultVisit(node: SyntaxNode): TResult {
            return null;
        }
        

        // partial

        public VisitIdentifierName(node: Syntax.IdentifierNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQualifiedName(node: Syntax.QualifiedNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGenericName(node: Syntax.GenericNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeArgumentList(node: Syntax.TypeArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAliasQualifiedName(node: Syntax.AliasQualifiedNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPredefinedType(node: Syntax.PredefinedTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayType(node: Syntax.ArrayTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayRankSpecifier(node: Syntax.ArrayRankSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPointerType(node: Syntax.PointerTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNullableType(node: Syntax.NullableTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOmittedTypeArgument(node: Syntax.OmittedTypeArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParenthesizedExpression(node: Syntax.ParenthesizedExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPrefixUnaryExpression(node: Syntax.PrefixUnaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAwaitExpression(node: Syntax.AwaitExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPostfixUnaryExpression(node: Syntax.PostfixUnaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMemberAccessExpression(node: Syntax.MemberAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConditionalAccessExpression(node: Syntax.ConditionalAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMemberBindingExpression(node: Syntax.MemberBindingExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElementBindingExpression(node: Syntax.ElementBindingExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitImplicitElementAccess(node: Syntax.ImplicitElementAccessSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBinaryExpression(node: Syntax.BinaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAssignmentExpression(node: Syntax.AssignmentExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConditionalExpression(node: Syntax.ConditionalExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitThisExpression(node: Syntax.ThisExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBaseExpression(node: Syntax.BaseExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLiteralExpression(node: Syntax.LiteralExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMakeRefExpression(node: Syntax.MakeRefExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRefTypeExpression(node: Syntax.RefTypeExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRefValueExpression(node: Syntax.RefValueExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCheckedExpression(node: Syntax.CheckedExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefaultExpression(node: Syntax.DefaultExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeOfExpression(node: Syntax.TypeOfExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSizeOfExpression(node: Syntax.SizeOfExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInvocationExpression(node: Syntax.InvocationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElementAccessExpression(node: Syntax.ElementAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArgumentList(node: Syntax.ArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBracketedArgumentList(node: Syntax.BracketedArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArgument(node: Syntax.ArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameColon(node: Syntax.NameColonSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCastExpression(node: Syntax.CastExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousMethodExpression(node: Syntax.AnonymousMethodExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSimpleLambdaExpression(node: Syntax.SimpleLambdaExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParenthesizedLambdaExpression(node: Syntax.ParenthesizedLambdaExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInitializerExpression(node: Syntax.InitializerExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitObjectCreationExpression(node: Syntax.ObjectCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousObjectMemberDeclarator(node: Syntax.AnonymousObjectMemberDeclaratorSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousObjectCreationExpression(node: Syntax.AnonymousObjectCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayCreationExpression(node: Syntax.ArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitImplicitArrayCreationExpression(node: Syntax.ImplicitArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitStackAllocArrayCreationExpression(node: Syntax.StackAllocArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryExpression(node: Syntax.QueryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryBody(node: Syntax.QueryBodySyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFromClause(node: Syntax.FromClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLetClause(node: Syntax.LetClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitJoinClause(node: Syntax.JoinClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitJoinIntoClause(node: Syntax.JoinIntoClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWhereClause(node: Syntax.WhereClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOrderByClause(node: Syntax.OrderByClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOrdering(node: Syntax.OrderingSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSelectClause(node: Syntax.SelectClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGroupClause(node: Syntax.GroupClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryContinuation(node: Syntax.QueryContinuationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOmittedArraySizeExpression(node: Syntax.OmittedArraySizeExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGlobalStatement(node: Syntax.GlobalStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBlock(node: Syntax.BlockSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLocalDeclarationStatement(node: Syntax.LocalDeclarationStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitVariableDeclaration(node: Syntax.VariableDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitVariableDeclarator(node: Syntax.VariableDeclaratorSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEqualsValueClause(node: Syntax.EqualsValueClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExpressionStatement(node: Syntax.ExpressionStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEmptyStatement(node: Syntax.EmptyStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLabeledStatement(node: Syntax.LabeledStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGotoStatement(node: Syntax.GotoStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBreakStatement(node: Syntax.BreakStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitContinueStatement(node: Syntax.ContinueStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitReturnStatement(node: Syntax.ReturnStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitThrowStatement(node: Syntax.ThrowStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitYieldStatement(node: Syntax.YieldStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWhileStatement(node: Syntax.WhileStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDoStatement(node: Syntax.DoStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitForStatement(node: Syntax.ForStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitForEachStatement(node: Syntax.ForEachStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUsingStatement(node: Syntax.UsingStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFixedStatement(node: Syntax.FixedStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCheckedStatement(node: Syntax.CheckedStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUnsafeStatement(node: Syntax.UnsafeStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLockStatement(node: Syntax.LockStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIfStatement(node: Syntax.IfStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElseClause(node: Syntax.ElseClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSwitchStatement(node: Syntax.SwitchStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSwitchSection(node: Syntax.SwitchSectionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCaseSwitchLabel(node: Syntax.CaseSwitchLabelSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefaultSwitchLabel(node: Syntax.DefaultSwitchLabelSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTryStatement(node: Syntax.TryStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchClause(node: Syntax.CatchClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchDeclaration(node: Syntax.CatchDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchFilterClause(node: Syntax.CatchFilterClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFinallyClause(node: Syntax.FinallyClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCompilationUnit(node: Syntax.CompilationUnitSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExternAliasDirective(node: Syntax.ExternAliasDirectiveSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUsingDirective(node: Syntax.UsingDirectiveSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNamespaceDeclaration(node: Syntax.NamespaceDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeList(node: Syntax.AttributeListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeTargetSpecifier(node: Syntax.AttributeTargetSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttribute(node: Syntax.AttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeArgumentList(node: Syntax.AttributeArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeArgument(node: Syntax.AttributeArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameEquals(node: Syntax.NameEqualsSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameterList(node: Syntax.TypeParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameter(node: Syntax.TypeParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitClassDeclaration(node: Syntax.ClassDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitStructDeclaration(node: Syntax.StructDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterfaceDeclaration(node: Syntax.InterfaceDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEnumDeclaration(node: Syntax.EnumDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDelegateDeclaration(node: Syntax.DelegateDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEnumMemberDeclaration(node: Syntax.EnumMemberDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBaseList(node: Syntax.BaseListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSimpleBaseType(node: Syntax.SimpleBaseTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameterConstraintClause(node: Syntax.TypeParameterConstraintClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorConstraint(node: Syntax.ConstructorConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitClassOrStructConstraint(node: Syntax.ClassOrStructConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeConstraint(node: Syntax.TypeConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFieldDeclaration(node: Syntax.FieldDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEventFieldDeclaration(node: Syntax.EventFieldDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExplicitInterfaceSpecifier(node: Syntax.ExplicitInterfaceSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMethodDeclaration(node: Syntax.MethodDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOperatorDeclaration(node: Syntax.OperatorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConversionOperatorDeclaration(node: Syntax.ConversionOperatorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorDeclaration(node: Syntax.ConstructorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorInitializer(node: Syntax.ConstructorInitializerSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDestructorDeclaration(node: Syntax.DestructorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPropertyDeclaration(node: Syntax.PropertyDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrowExpressionClause(node: Syntax.ArrowExpressionClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEventDeclaration(node: Syntax.EventDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIndexerDeclaration(node: Syntax.IndexerDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAccessorList(node: Syntax.AccessorListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAccessorDeclaration(node: Syntax.AccessorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParameterList(node: Syntax.ParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBracketedParameterList(node: Syntax.BracketedParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParameter(node: Syntax.ParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIncompleteMember(node: Syntax.IncompleteMemberSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSkippedTokensTrivia(node: Syntax.SkippedTokensTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDocumentationCommentTrivia(node: Syntax.DocumentationCommentTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeCref(node: Syntax.TypeCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQualifiedCref(node: Syntax.QualifiedCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameMemberCref(node: Syntax.NameMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIndexerMemberCref(node: Syntax.IndexerMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOperatorMemberCref(node: Syntax.OperatorMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConversionOperatorMemberCref(node: Syntax.ConversionOperatorMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefParameterList(node: Syntax.CrefParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefBracketedParameterList(node: Syntax.CrefBracketedParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefParameter(node: Syntax.CrefParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElement(node: Syntax.XmlElementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElementStartTag(node: Syntax.XmlElementStartTagSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElementEndTag(node: Syntax.XmlElementEndTagSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlEmptyElement(node: Syntax.XmlEmptyElementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlName(node: Syntax.XmlNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlPrefix(node: Syntax.XmlPrefixSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlTextAttribute(node: Syntax.XmlTextAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlCrefAttribute(node: Syntax.XmlCrefAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlNameAttribute(node: Syntax.XmlNameAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlText(node: Syntax.XmlTextSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlCDataSection(node: Syntax.XmlCDataSectionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlProcessingInstruction(node: Syntax.XmlProcessingInstructionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlComment(node: Syntax.XmlCommentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIfDirectiveTrivia(node: Syntax.IfDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElifDirectiveTrivia(node: Syntax.ElifDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElseDirectiveTrivia(node: Syntax.ElseDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEndIfDirectiveTrivia(node: Syntax.EndIfDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRegionDirectiveTrivia(node: Syntax.RegionDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEndRegionDirectiveTrivia(node: Syntax.EndRegionDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitErrorDirectiveTrivia(node: Syntax.ErrorDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWarningDirectiveTrivia(node: Syntax.WarningDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBadDirectiveTrivia(node: Syntax.BadDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefineDirectiveTrivia(node: Syntax.DefineDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUndefDirectiveTrivia(node: Syntax.UndefDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLineDirectiveTrivia(node: Syntax.LineDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPragmaWarningDirectiveTrivia(node: Syntax.PragmaWarningDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: Syntax.PragmaChecksumDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitReferenceDirectiveTrivia(node: Syntax.ReferenceDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterpolatedString(node: Syntax.InterpolatedStringSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterpolatedStringInsert(node: Syntax.InterpolatedStringInsertSyntax): TResult {
            return this.DefaultVisit(node);
        }
        constructor() { }
    }
    export class CSharpSyntaxVisitorBase {
        public Visit(node: SyntaxNode): void {
            if (node != null) {
                (<CSharpSyntaxNode>node).Accept_1012(this);
            }
        }
        public DefaultVisit(node: SyntaxNode): void {

        }
       

        // partial

        public VisitIdentifierName(node: Syntax.IdentifierNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQualifiedName(node: Syntax.QualifiedNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGenericName(node: Syntax.GenericNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeArgumentList(node: Syntax.TypeArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAliasQualifiedName(node: Syntax.AliasQualifiedNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPredefinedType(node: Syntax.PredefinedTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayType(node: Syntax.ArrayTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayRankSpecifier(node: Syntax.ArrayRankSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPointerType(node: Syntax.PointerTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNullableType(node: Syntax.NullableTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOmittedTypeArgument(node: Syntax.OmittedTypeArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParenthesizedExpression(node: Syntax.ParenthesizedExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPrefixUnaryExpression(node: Syntax.PrefixUnaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAwaitExpression(node: Syntax.AwaitExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPostfixUnaryExpression(node: Syntax.PostfixUnaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMemberAccessExpression(node: Syntax.MemberAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConditionalAccessExpression(node: Syntax.ConditionalAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMemberBindingExpression(node: Syntax.MemberBindingExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElementBindingExpression(node: Syntax.ElementBindingExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitImplicitElementAccess(node: Syntax.ImplicitElementAccessSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBinaryExpression(node: Syntax.BinaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAssignmentExpression(node: Syntax.AssignmentExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConditionalExpression(node: Syntax.ConditionalExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitThisExpression(node: Syntax.ThisExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBaseExpression(node: Syntax.BaseExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLiteralExpression(node: Syntax.LiteralExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMakeRefExpression(node: Syntax.MakeRefExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRefTypeExpression(node: Syntax.RefTypeExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRefValueExpression(node: Syntax.RefValueExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCheckedExpression(node: Syntax.CheckedExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefaultExpression(node: Syntax.DefaultExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeOfExpression(node: Syntax.TypeOfExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSizeOfExpression(node: Syntax.SizeOfExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInvocationExpression(node: Syntax.InvocationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElementAccessExpression(node: Syntax.ElementAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArgumentList(node: Syntax.ArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBracketedArgumentList(node: Syntax.BracketedArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArgument(node: Syntax.ArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameColon(node: Syntax.NameColonSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCastExpression(node: Syntax.CastExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousMethodExpression(node: Syntax.AnonymousMethodExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSimpleLambdaExpression(node: Syntax.SimpleLambdaExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParenthesizedLambdaExpression(node: Syntax.ParenthesizedLambdaExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInitializerExpression(node: Syntax.InitializerExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitObjectCreationExpression(node: Syntax.ObjectCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousObjectMemberDeclarator(node: Syntax.AnonymousObjectMemberDeclaratorSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousObjectCreationExpression(node: Syntax.AnonymousObjectCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayCreationExpression(node: Syntax.ArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitImplicitArrayCreationExpression(node: Syntax.ImplicitArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitStackAllocArrayCreationExpression(node: Syntax.StackAllocArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryExpression(node: Syntax.QueryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryBody(node: Syntax.QueryBodySyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFromClause(node: Syntax.FromClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLetClause(node: Syntax.LetClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitJoinClause(node: Syntax.JoinClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitJoinIntoClause(node: Syntax.JoinIntoClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWhereClause(node: Syntax.WhereClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOrderByClause(node: Syntax.OrderByClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOrdering(node: Syntax.OrderingSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSelectClause(node: Syntax.SelectClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGroupClause(node: Syntax.GroupClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryContinuation(node: Syntax.QueryContinuationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOmittedArraySizeExpression(node: Syntax.OmittedArraySizeExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGlobalStatement(node: Syntax.GlobalStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBlock(node: Syntax.BlockSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLocalDeclarationStatement(node: Syntax.LocalDeclarationStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitVariableDeclaration(node: Syntax.VariableDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitVariableDeclarator(node: Syntax.VariableDeclaratorSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEqualsValueClause(node: Syntax.EqualsValueClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExpressionStatement(node: Syntax.ExpressionStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEmptyStatement(node: Syntax.EmptyStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLabeledStatement(node: Syntax.LabeledStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGotoStatement(node: Syntax.GotoStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBreakStatement(node: Syntax.BreakStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitContinueStatement(node: Syntax.ContinueStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitReturnStatement(node: Syntax.ReturnStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitThrowStatement(node: Syntax.ThrowStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitYieldStatement(node: Syntax.YieldStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWhileStatement(node: Syntax.WhileStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDoStatement(node: Syntax.DoStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitForStatement(node: Syntax.ForStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitForEachStatement(node: Syntax.ForEachStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUsingStatement(node: Syntax.UsingStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFixedStatement(node: Syntax.FixedStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCheckedStatement(node: Syntax.CheckedStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUnsafeStatement(node: Syntax.UnsafeStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLockStatement(node: Syntax.LockStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIfStatement(node: Syntax.IfStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElseClause(node: Syntax.ElseClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSwitchStatement(node: Syntax.SwitchStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSwitchSection(node: Syntax.SwitchSectionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCaseSwitchLabel(node: Syntax.CaseSwitchLabelSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefaultSwitchLabel(node: Syntax.DefaultSwitchLabelSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTryStatement(node: Syntax.TryStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchClause(node: Syntax.CatchClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchDeclaration(node: Syntax.CatchDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchFilterClause(node: Syntax.CatchFilterClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFinallyClause(node: Syntax.FinallyClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCompilationUnit(node: Syntax.CompilationUnitSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExternAliasDirective(node: Syntax.ExternAliasDirectiveSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUsingDirective(node: Syntax.UsingDirectiveSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNamespaceDeclaration(node: Syntax.NamespaceDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeList(node: Syntax.AttributeListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeTargetSpecifier(node: Syntax.AttributeTargetSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttribute(node: Syntax.AttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeArgumentList(node: Syntax.AttributeArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeArgument(node: Syntax.AttributeArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameEquals(node: Syntax.NameEqualsSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameterList(node: Syntax.TypeParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameter(node: Syntax.TypeParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitClassDeclaration(node: Syntax.ClassDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitStructDeclaration(node: Syntax.StructDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterfaceDeclaration(node: Syntax.InterfaceDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEnumDeclaration(node: Syntax.EnumDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDelegateDeclaration(node: Syntax.DelegateDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEnumMemberDeclaration(node: Syntax.EnumMemberDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBaseList(node: Syntax.BaseListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSimpleBaseType(node: Syntax.SimpleBaseTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameterConstraintClause(node: Syntax.TypeParameterConstraintClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorConstraint(node: Syntax.ConstructorConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitClassOrStructConstraint(node: Syntax.ClassOrStructConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeConstraint(node: Syntax.TypeConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFieldDeclaration(node: Syntax.FieldDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEventFieldDeclaration(node: Syntax.EventFieldDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExplicitInterfaceSpecifier(node: Syntax.ExplicitInterfaceSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMethodDeclaration(node: Syntax.MethodDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOperatorDeclaration(node: Syntax.OperatorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConversionOperatorDeclaration(node: Syntax.ConversionOperatorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorDeclaration(node: Syntax.ConstructorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorInitializer(node: Syntax.ConstructorInitializerSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDestructorDeclaration(node: Syntax.DestructorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPropertyDeclaration(node: Syntax.PropertyDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrowExpressionClause(node: Syntax.ArrowExpressionClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEventDeclaration(node: Syntax.EventDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIndexerDeclaration(node: Syntax.IndexerDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAccessorList(node: Syntax.AccessorListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAccessorDeclaration(node: Syntax.AccessorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParameterList(node: Syntax.ParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBracketedParameterList(node: Syntax.BracketedParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParameter(node: Syntax.ParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIncompleteMember(node: Syntax.IncompleteMemberSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSkippedTokensTrivia(node: Syntax.SkippedTokensTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDocumentationCommentTrivia(node: Syntax.DocumentationCommentTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeCref(node: Syntax.TypeCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQualifiedCref(node: Syntax.QualifiedCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameMemberCref(node: Syntax.NameMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIndexerMemberCref(node: Syntax.IndexerMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOperatorMemberCref(node: Syntax.OperatorMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConversionOperatorMemberCref(node: Syntax.ConversionOperatorMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefParameterList(node: Syntax.CrefParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefBracketedParameterList(node: Syntax.CrefBracketedParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefParameter(node: Syntax.CrefParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElement(node: Syntax.XmlElementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElementStartTag(node: Syntax.XmlElementStartTagSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElementEndTag(node: Syntax.XmlElementEndTagSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlEmptyElement(node: Syntax.XmlEmptyElementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlName(node: Syntax.XmlNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlPrefix(node: Syntax.XmlPrefixSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlTextAttribute(node: Syntax.XmlTextAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlCrefAttribute(node: Syntax.XmlCrefAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlNameAttribute(node: Syntax.XmlNameAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlText(node: Syntax.XmlTextSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlCDataSection(node: Syntax.XmlCDataSectionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlProcessingInstruction(node: Syntax.XmlProcessingInstructionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlComment(node: Syntax.XmlCommentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIfDirectiveTrivia(node: Syntax.IfDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElifDirectiveTrivia(node: Syntax.ElifDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElseDirectiveTrivia(node: Syntax.ElseDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEndIfDirectiveTrivia(node: Syntax.EndIfDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRegionDirectiveTrivia(node: Syntax.RegionDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEndRegionDirectiveTrivia(node: Syntax.EndRegionDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitErrorDirectiveTrivia(node: Syntax.ErrorDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWarningDirectiveTrivia(node: Syntax.WarningDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBadDirectiveTrivia(node: Syntax.BadDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefineDirectiveTrivia(node: Syntax.DefineDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUndefDirectiveTrivia(node: Syntax.UndefDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLineDirectiveTrivia(node: Syntax.LineDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPragmaWarningDirectiveTrivia(node: Syntax.PragmaWarningDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: Syntax.PragmaChecksumDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitReferenceDirectiveTrivia(node: Syntax.ReferenceDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterpolatedString(node: Syntax.InterpolatedStringSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterpolatedStringInsert(node: Syntax.InterpolatedStringInsertSyntax): void {
            this.DefaultVisit(node);
        }
        constructor() { }
    }
}
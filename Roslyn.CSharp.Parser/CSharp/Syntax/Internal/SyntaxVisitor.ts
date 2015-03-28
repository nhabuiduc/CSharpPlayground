module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class CSharpSyntaxVisitor<TResult>
    {
        public Visit(node: CSharpSyntaxNode): TResult {
            if (node == null) {
                return null;
            }
            return node.Accept_1388(this);
        }
        public VisitToken(token: SyntaxToken): TResult {
            return this.DefaultVisit(token);
        }
        public VisitTrivia(trivia: SyntaxTrivia): TResult {
            return this.DefaultVisit(trivia);
        }
        protected  DefaultVisit(node: CSharpSyntaxNode): TResult {
            return null;
        }
        
        // partial

        public VisitIdentifierName(node: IdentifierNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQualifiedName(node: QualifiedNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGenericName(node: GenericNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeArgumentList(node: TypeArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAliasQualifiedName(node: AliasQualifiedNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPredefinedType(node: PredefinedTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayType(node: ArrayTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayRankSpecifier(node: ArrayRankSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPointerType(node: PointerTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNullableType(node: NullableTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOmittedTypeArgument(node: OmittedTypeArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParenthesizedExpression(node: ParenthesizedExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAwaitExpression(node: AwaitExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMemberAccessExpression(node: MemberAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConditionalAccessExpression(node: ConditionalAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMemberBindingExpression(node: MemberBindingExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElementBindingExpression(node: ElementBindingExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitImplicitElementAccess(node: ImplicitElementAccessSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBinaryExpression(node: BinaryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAssignmentExpression(node: AssignmentExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConditionalExpression(node: ConditionalExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitThisExpression(node: ThisExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBaseExpression(node: BaseExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLiteralExpression(node: LiteralExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMakeRefExpression(node: MakeRefExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRefTypeExpression(node: RefTypeExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRefValueExpression(node: RefValueExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCheckedExpression(node: CheckedExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefaultExpression(node: DefaultExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeOfExpression(node: TypeOfExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSizeOfExpression(node: SizeOfExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInvocationExpression(node: InvocationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElementAccessExpression(node: ElementAccessExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArgumentList(node: ArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBracketedArgumentList(node: BracketedArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArgument(node: ArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameColon(node: NameColonSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCastExpression(node: CastExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousMethodExpression(node: AnonymousMethodExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSimpleLambdaExpression(node: SimpleLambdaExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParenthesizedLambdaExpression(node: ParenthesizedLambdaExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInitializerExpression(node: InitializerExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitObjectCreationExpression(node: ObjectCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousObjectMemberDeclarator(node: AnonymousObjectMemberDeclaratorSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAnonymousObjectCreationExpression(node: AnonymousObjectCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrayCreationExpression(node: ArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitImplicitArrayCreationExpression(node: ImplicitArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitStackAllocArrayCreationExpression(node: StackAllocArrayCreationExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryExpression(node: QueryExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryBody(node: QueryBodySyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFromClause(node: FromClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLetClause(node: LetClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitJoinClause(node: JoinClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitJoinIntoClause(node: JoinIntoClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWhereClause(node: WhereClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOrderByClause(node: OrderByClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOrdering(node: OrderingSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSelectClause(node: SelectClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGroupClause(node: GroupClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQueryContinuation(node: QueryContinuationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOmittedArraySizeExpression(node: OmittedArraySizeExpressionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGlobalStatement(node: GlobalStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBlock(node: BlockSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLocalDeclarationStatement(node: LocalDeclarationStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitVariableDeclaration(node: VariableDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitVariableDeclarator(node: VariableDeclaratorSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEqualsValueClause(node: EqualsValueClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExpressionStatement(node: ExpressionStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEmptyStatement(node: EmptyStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLabeledStatement(node: LabeledStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitGotoStatement(node: GotoStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBreakStatement(node: BreakStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitContinueStatement(node: ContinueStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitReturnStatement(node: ReturnStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitThrowStatement(node: ThrowStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitYieldStatement(node: YieldStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWhileStatement(node: WhileStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDoStatement(node: DoStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitForStatement(node: ForStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitForEachStatement(node: ForEachStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUsingStatement(node: UsingStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFixedStatement(node: FixedStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCheckedStatement(node: CheckedStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUnsafeStatement(node: UnsafeStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLockStatement(node: LockStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIfStatement(node: IfStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElseClause(node: ElseClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSwitchStatement(node: SwitchStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSwitchSection(node: SwitchSectionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCaseSwitchLabel(node: CaseSwitchLabelSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefaultSwitchLabel(node: DefaultSwitchLabelSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTryStatement(node: TryStatementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchClause(node: CatchClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchDeclaration(node: CatchDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCatchFilterClause(node: CatchFilterClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFinallyClause(node: FinallyClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCompilationUnit(node: CompilationUnitSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExternAliasDirective(node: ExternAliasDirectiveSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUsingDirective(node: UsingDirectiveSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNamespaceDeclaration(node: NamespaceDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeList(node: AttributeListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeTargetSpecifier(node: AttributeTargetSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttribute(node: AttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeArgumentList(node: AttributeArgumentListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAttributeArgument(node: AttributeArgumentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameEquals(node: NameEqualsSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameterList(node: TypeParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameter(node: TypeParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitClassDeclaration(node: ClassDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitStructDeclaration(node: StructDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterfaceDeclaration(node: InterfaceDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEnumDeclaration(node: EnumDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDelegateDeclaration(node: DelegateDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEnumMemberDeclaration(node: EnumMemberDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBaseList(node: BaseListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSimpleBaseType(node: SimpleBaseTypeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeParameterConstraintClause(node: TypeParameterConstraintClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorConstraint(node: ConstructorConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitClassOrStructConstraint(node: ClassOrStructConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeConstraint(node: TypeConstraintSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitFieldDeclaration(node: FieldDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEventFieldDeclaration(node: EventFieldDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitExplicitInterfaceSpecifier(node: ExplicitInterfaceSpecifierSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitMethodDeclaration(node: MethodDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOperatorDeclaration(node: OperatorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConversionOperatorDeclaration(node: ConversionOperatorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorDeclaration(node: ConstructorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConstructorInitializer(node: ConstructorInitializerSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDestructorDeclaration(node: DestructorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPropertyDeclaration(node: PropertyDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitArrowExpressionClause(node: ArrowExpressionClauseSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEventDeclaration(node: EventDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIndexerDeclaration(node: IndexerDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAccessorList(node: AccessorListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitAccessorDeclaration(node: AccessorDeclarationSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParameterList(node: ParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBracketedParameterList(node: BracketedParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitParameter(node: ParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIncompleteMember(node: IncompleteMemberSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitSkippedTokensTrivia(node: SkippedTokensTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDocumentationCommentTrivia(node: DocumentationCommentTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitTypeCref(node: TypeCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitQualifiedCref(node: QualifiedCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitNameMemberCref(node: NameMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIndexerMemberCref(node: IndexerMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitOperatorMemberCref(node: OperatorMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitConversionOperatorMemberCref(node: ConversionOperatorMemberCrefSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefParameterList(node: CrefParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefBracketedParameterList(node: CrefBracketedParameterListSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitCrefParameter(node: CrefParameterSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElement(node: XmlElementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElementStartTag(node: XmlElementStartTagSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlElementEndTag(node: XmlElementEndTagSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlEmptyElement(node: XmlEmptyElementSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlName(node: XmlNameSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlPrefix(node: XmlPrefixSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlTextAttribute(node: XmlTextAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlCrefAttribute(node: XmlCrefAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlNameAttribute(node: XmlNameAttributeSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlText(node: XmlTextSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlCDataSection(node: XmlCDataSectionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlProcessingInstruction(node: XmlProcessingInstructionSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitXmlComment(node: XmlCommentSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitIfDirectiveTrivia(node: IfDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElifDirectiveTrivia(node: ElifDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitElseDirectiveTrivia(node: ElseDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEndIfDirectiveTrivia(node: EndIfDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitRegionDirectiveTrivia(node: RegionDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitEndRegionDirectiveTrivia(node: EndRegionDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitErrorDirectiveTrivia(node: ErrorDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitWarningDirectiveTrivia(node: WarningDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitBadDirectiveTrivia(node: BadDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitDefineDirectiveTrivia(node: DefineDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitUndefDirectiveTrivia(node: UndefDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitLineDirectiveTrivia(node: LineDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPragmaWarningDirectiveTrivia(node: PragmaWarningDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: PragmaChecksumDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitReferenceDirectiveTrivia(node: ReferenceDirectiveTriviaSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterpolatedString(node: InterpolatedStringSyntax): TResult {
            return this.DefaultVisit(node);
        }
        public VisitInterpolatedStringInsert(node: InterpolatedStringInsertSyntax): TResult {
            return this.DefaultVisit(node);
        }
        constructor() { }
    }
    export class CSharpSyntaxVisitorBase {
        public Visit(node: CSharpSyntaxNode): void {
            if (node == null) {
                return
            }
            node.Accept_1012(this);
        }
        public VisitToken(token: SyntaxToken): void {
            this.DefaultVisit(token);
        }
        public VisitTrivia(trivia: SyntaxTrivia): void {
            this.DefaultVisit(trivia);
        }
        public DefaultVisit(node: CSharpSyntaxNode): void {

        }
        

        public VisitIdentifierName(node: IdentifierNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQualifiedName(node: QualifiedNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGenericName(node: GenericNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAliasQualifiedName(node: AliasQualifiedNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPredefinedType(node: PredefinedTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayType(node: ArrayTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayRankSpecifier(node: ArrayRankSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPointerType(node: PointerTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNullableType(node: NullableTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOmittedTypeArgument(node: OmittedTypeArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAwaitExpression(node: AwaitExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConditionalAccessExpression(node: ConditionalAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMemberBindingExpression(node: MemberBindingExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElementBindingExpression(node: ElementBindingExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitImplicitElementAccess(node: ImplicitElementAccessSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBinaryExpression(node: BinaryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAssignmentExpression(node: AssignmentExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConditionalExpression(node: ConditionalExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitThisExpression(node: ThisExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBaseExpression(node: BaseExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLiteralExpression(node: LiteralExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMakeRefExpression(node: MakeRefExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRefTypeExpression(node: RefTypeExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRefValueExpression(node: RefValueExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCheckedExpression(node: CheckedExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefaultExpression(node: DefaultExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSizeOfExpression(node: SizeOfExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInvocationExpression(node: InvocationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArgumentList(node: ArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBracketedArgumentList(node: BracketedArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArgument(node: ArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameColon(node: NameColonSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCastExpression(node: CastExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousMethodExpression(node: AnonymousMethodExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSimpleLambdaExpression(node: SimpleLambdaExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParenthesizedLambdaExpression(node: ParenthesizedLambdaExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInitializerExpression(node: InitializerExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousObjectMemberDeclarator(node: AnonymousObjectMemberDeclaratorSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAnonymousObjectCreationExpression(node: AnonymousObjectCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrayCreationExpression(node: ArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitImplicitArrayCreationExpression(node: ImplicitArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitStackAllocArrayCreationExpression(node: StackAllocArrayCreationExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryExpression(node: QueryExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryBody(node: QueryBodySyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFromClause(node: FromClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLetClause(node: LetClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitJoinClause(node: JoinClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitJoinIntoClause(node: JoinIntoClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWhereClause(node: WhereClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOrderByClause(node: OrderByClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOrdering(node: OrderingSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSelectClause(node: SelectClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGroupClause(node: GroupClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQueryContinuation(node: QueryContinuationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOmittedArraySizeExpression(node: OmittedArraySizeExpressionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGlobalStatement(node: GlobalStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBlock(node: BlockSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLocalDeclarationStatement(node: LocalDeclarationStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExpressionStatement(node: ExpressionStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEmptyStatement(node: EmptyStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLabeledStatement(node: LabeledStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitGotoStatement(node: GotoStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBreakStatement(node: BreakStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitContinueStatement(node: ContinueStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitReturnStatement(node: ReturnStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitThrowStatement(node: ThrowStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitYieldStatement(node: YieldStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWhileStatement(node: WhileStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDoStatement(node: DoStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitForStatement(node: ForStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitForEachStatement(node: ForEachStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUsingStatement(node: UsingStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFixedStatement(node: FixedStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCheckedStatement(node: CheckedStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUnsafeStatement(node: UnsafeStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLockStatement(node: LockStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIfStatement(node: IfStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElseClause(node: ElseClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSwitchStatement(node: SwitchStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSwitchSection(node: SwitchSectionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCaseSwitchLabel(node: CaseSwitchLabelSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefaultSwitchLabel(node: DefaultSwitchLabelSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTryStatement(node: TryStatementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchClause(node: CatchClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchDeclaration(node: CatchDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCatchFilterClause(node: CatchFilterClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFinallyClause(node: FinallyClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCompilationUnit(node: CompilationUnitSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExternAliasDirective(node: ExternAliasDirectiveSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUsingDirective(node: UsingDirectiveSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNamespaceDeclaration(node: NamespaceDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeList(node: AttributeListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeTargetSpecifier(node: AttributeTargetSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttribute(node: AttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeArgumentList(node: AttributeArgumentListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAttributeArgument(node: AttributeArgumentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameEquals(node: NameEqualsSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameterList(node: TypeParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameter(node: TypeParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitClassDeclaration(node: ClassDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitStructDeclaration(node: StructDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEnumDeclaration(node: EnumDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDelegateDeclaration(node: DelegateDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEnumMemberDeclaration(node: EnumMemberDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBaseList(node: BaseListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSimpleBaseType(node: SimpleBaseTypeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeParameterConstraintClause(node: TypeParameterConstraintClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorConstraint(node: ConstructorConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitClassOrStructConstraint(node: ClassOrStructConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeConstraint(node: TypeConstraintSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitFieldDeclaration(node: FieldDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEventFieldDeclaration(node: EventFieldDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitExplicitInterfaceSpecifier(node: ExplicitInterfaceSpecifierSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitMethodDeclaration(node: MethodDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOperatorDeclaration(node: OperatorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConversionOperatorDeclaration(node: ConversionOperatorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConstructorInitializer(node: ConstructorInitializerSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDestructorDeclaration(node: DestructorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPropertyDeclaration(node: PropertyDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitArrowExpressionClause(node: ArrowExpressionClauseSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEventDeclaration(node: EventDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIndexerDeclaration(node: IndexerDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAccessorList(node: AccessorListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitAccessorDeclaration(node: AccessorDeclarationSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParameterList(node: ParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBracketedParameterList(node: BracketedParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitParameter(node: ParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIncompleteMember(node: IncompleteMemberSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitSkippedTokensTrivia(node: SkippedTokensTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDocumentationCommentTrivia(node: DocumentationCommentTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitTypeCref(node: TypeCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitQualifiedCref(node: QualifiedCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitNameMemberCref(node: NameMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIndexerMemberCref(node: IndexerMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitOperatorMemberCref(node: OperatorMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitConversionOperatorMemberCref(node: ConversionOperatorMemberCrefSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefParameterList(node: CrefParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefBracketedParameterList(node: CrefBracketedParameterListSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitCrefParameter(node: CrefParameterSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElement(node: XmlElementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElementStartTag(node: XmlElementStartTagSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlElementEndTag(node: XmlElementEndTagSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlEmptyElement(node: XmlEmptyElementSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlName(node: XmlNameSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlPrefix(node: XmlPrefixSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlTextAttribute(node: XmlTextAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlCrefAttribute(node: XmlCrefAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlNameAttribute(node: XmlNameAttributeSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlText(node: XmlTextSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlCDataSection(node: XmlCDataSectionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlProcessingInstruction(node: XmlProcessingInstructionSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitXmlComment(node: XmlCommentSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitIfDirectiveTrivia(node: IfDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElifDirectiveTrivia(node: ElifDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitElseDirectiveTrivia(node: ElseDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEndIfDirectiveTrivia(node: EndIfDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitRegionDirectiveTrivia(node: RegionDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitEndRegionDirectiveTrivia(node: EndRegionDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitErrorDirectiveTrivia(node: ErrorDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitWarningDirectiveTrivia(node: WarningDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitBadDirectiveTrivia(node: BadDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitDefineDirectiveTrivia(node: DefineDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitUndefDirectiveTrivia(node: UndefDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitLineDirectiveTrivia(node: LineDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPragmaWarningDirectiveTrivia(node: PragmaWarningDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: PragmaChecksumDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitReferenceDirectiveTrivia(node: ReferenceDirectiveTriviaSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterpolatedString(node: InterpolatedStringSyntax): void {
            this.DefaultVisit(node);
        }
        public VisitInterpolatedStringInsert(node: InterpolatedStringInsertSyntax): void {
            this.DefaultVisit(node);
        }
        constructor() { }
    }
}
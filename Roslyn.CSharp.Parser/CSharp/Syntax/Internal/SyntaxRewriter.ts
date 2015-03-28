///<reference path="SyntaxVisitor.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class CSharpSyntaxRewriter extends CSharpSyntaxVisitor<CSharpSyntaxNode>
    {
        protected  VisitIntoStructuredTrivia: boolean = false;
        ctor_2068(visitIntoStructuredTrivia: boolean = false): CSharpSyntaxRewriter {
            this.VisitIntoStructuredTrivia = visitIntoStructuredTrivia;
            return this;
        }
        public VisitToken(token: SyntaxToken): CSharpSyntaxNode {
            var leading = this.VisitList_1459(token.LeadingTrivia);
            var trailing = this.VisitList_1459(token.TrailingTrivia);
            if (leading.op_Inequality(token.LeadingTrivia) || trailing.op_Inequality(token.TrailingTrivia)) {
                if (leading.op_Inequality(token.LeadingTrivia)) {
                    token = token.WithLeadingTrivia_9638(leading.Node);
                }
                if (trailing.op_Inequality(token.TrailingTrivia)) {
                    token = token.WithTrailingTrivia_9295(trailing.Node);
                }
            }
            return token;
        }
        public VisitList_1459<TNode extends CSharpSyntaxNode>(list: SyntaxList<TNode>): SyntaxList<TNode> {
            var alternate: SyntaxListBaseBuilder = null;
            for (var i: number = 0, n = list.Count; i < n; i++) {
                var item = list.$get$(i);
                var visited = <TNode>this.Visit(item);
                if (item != visited && alternate == null) {
                    alternate = new SyntaxListBaseBuilder().ctor_1860(n);
                    alternate.AddRange_4324(list, 0, i);
                }
                if (alternate != null) {
                    System.Diagnostics.Debug.Assert(visited != null && visited.Kind != SyntaxKind.None, "Cannot remove node using Syntax.InternalSyntax.SyntaxRewriter.");
                    alternate.Add(visited);
                }
            }
            if (alternate != null) {
                return SyntaxList.op_Implicit_8623<TNode>(SyntaxListBuilderExtensions.ToList_1673(alternate));
            }
            return list;
        }
        public VisitList_2124<TNode extends CSharpSyntaxNode>(list: SeparatedSyntaxList<TNode>): SeparatedSyntaxList<TNode> {
            var withSeps = list.GetWithSeparators();
            var result = this.VisitList_1459(withSeps);
            if (result.op_Inequality(withSeps)) {
                return result.AsSeparatedList<TNode>();
            }
            return list;
        }
        
        // partial

        public VisitIdentifierName(node: IdentifierNameSyntax): CSharpSyntaxNode {
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            return node.Update(identifier);
        }
        public VisitQualifiedName(node: QualifiedNameSyntax): CSharpSyntaxNode {
            var left = <NameSyntax>this.Visit(node.Left);
            var dotToken = <SyntaxToken>this.Visit(node.DotToken);
            var right = <SimpleNameSyntax>this.Visit(node.Right);
            return node.Update(left, dotToken, right);
        }
        public VisitGenericName(node: GenericNameSyntax): CSharpSyntaxNode {
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeArgumentList = <TypeArgumentListSyntax>this.Visit(node.TypeArgumentList);
            return node.Update(identifier, typeArgumentList);
        }
        public VisitTypeArgumentList(node: TypeArgumentListSyntax): CSharpSyntaxNode {
            var lessThanToken = <SyntaxToken>this.Visit(node.LessThanToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var greaterThanToken = <SyntaxToken>this.Visit(node.GreaterThanToken);
            return node.Update(lessThanToken, arguments, greaterThanToken);
        }
        public VisitAliasQualifiedName(node: AliasQualifiedNameSyntax): CSharpSyntaxNode {
            var alias = <IdentifierNameSyntax>this.Visit(node.Alias);
            var colonColonToken = <SyntaxToken>this.Visit(node.ColonColonToken);
            var name = <SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(alias, colonColonToken, name);
        }
        public VisitPredefinedType(node: PredefinedTypeSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            return node.Update(keyword);
        }
        public VisitArrayType(node: ArrayTypeSyntax): CSharpSyntaxNode {
            var elementType = <TypeSyntax>this.Visit(node.ElementType);
            var rankSpecifiers = this.VisitList_1459(node.RankSpecifiers);
            return node.Update(elementType, rankSpecifiers);
        }
        public VisitArrayRankSpecifier(node: ArrayRankSpecifierSyntax): CSharpSyntaxNode {
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var sizes = this.VisitList_2124(node.Sizes);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            return node.Update(openBracketToken, sizes, closeBracketToken);
        }
        public VisitPointerType(node: PointerTypeSyntax): CSharpSyntaxNode {
            var elementType = <TypeSyntax>this.Visit(node.ElementType);
            var asteriskToken = <SyntaxToken>this.Visit(node.AsteriskToken);
            return node.Update(elementType, asteriskToken);
        }
        public VisitNullableType(node: NullableTypeSyntax): CSharpSyntaxNode {
            var elementType = <TypeSyntax>this.Visit(node.ElementType);
            var questionToken = <SyntaxToken>this.Visit(node.QuestionToken);
            return node.Update(elementType, questionToken);
        }
        public VisitOmittedTypeArgument(node: OmittedTypeArgumentSyntax): CSharpSyntaxNode {
            var omittedTypeArgumentToken = <SyntaxToken>this.Visit(node.OmittedTypeArgumentToken);
            return node.Update(omittedTypeArgumentToken);
        }
        public VisitParenthesizedExpression(node: ParenthesizedExpressionSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, expression, closeParenToken);
        }
        public VisitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): CSharpSyntaxNode {
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var operand = <ExpressionSyntax>this.Visit(node.Operand);
            return node.Update(operatorToken, operand);
        }
        public VisitAwaitExpression(node: AwaitExpressionSyntax): CSharpSyntaxNode {
            var awaitKeyword = <SyntaxToken>this.Visit(node.AwaitKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(awaitKeyword, expression);
        }
        public VisitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): CSharpSyntaxNode {
            var operand = <ExpressionSyntax>this.Visit(node.Operand);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            return node.Update(operand, operatorToken);
        }
        public VisitMemberAccessExpression(node: MemberAccessExpressionSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var name = <SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(expression, operatorToken, name);
        }
        public VisitConditionalAccessExpression(node: ConditionalAccessExpressionSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var whenNotNull = <ExpressionSyntax>this.Visit(node.WhenNotNull);
            return node.Update(expression, operatorToken, whenNotNull);
        }
        public VisitMemberBindingExpression(node: MemberBindingExpressionSyntax): CSharpSyntaxNode {
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var name = <SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(operatorToken, name);
        }
        public VisitElementBindingExpression(node: ElementBindingExpressionSyntax): CSharpSyntaxNode {
            var argumentList = <BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(argumentList);
        }
        public VisitImplicitElementAccess(node: ImplicitElementAccessSyntax): CSharpSyntaxNode {
            var argumentList = <BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(argumentList);
        }
        public VisitBinaryExpression(node: BinaryExpressionSyntax): CSharpSyntaxNode {
            var left = <ExpressionSyntax>this.Visit(node.Left);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var right = <ExpressionSyntax>this.Visit(node.Right);
            return node.Update(left, operatorToken, right);
        }
        public VisitAssignmentExpression(node: AssignmentExpressionSyntax): CSharpSyntaxNode {
            var left = <ExpressionSyntax>this.Visit(node.Left);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var right = <ExpressionSyntax>this.Visit(node.Right);
            return node.Update(left, operatorToken, right);
        }
        public VisitConditionalExpression(node: ConditionalExpressionSyntax): CSharpSyntaxNode {
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var questionToken = <SyntaxToken>this.Visit(node.QuestionToken);
            var whenTrue = <ExpressionSyntax>this.Visit(node.WhenTrue);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            var whenFalse = <ExpressionSyntax>this.Visit(node.WhenFalse);
            return node.Update(condition, questionToken, whenTrue, colonToken, whenFalse);
        }
        public VisitThisExpression(node: ThisExpressionSyntax): CSharpSyntaxNode {
            var token = <SyntaxToken>this.Visit(node.Token);
            return node.Update(token);
        }
        public VisitBaseExpression(node: BaseExpressionSyntax): CSharpSyntaxNode {
            var token = <SyntaxToken>this.Visit(node.Token);
            return node.Update(token);
        }
        public VisitLiteralExpression(node: LiteralExpressionSyntax): CSharpSyntaxNode {
            var token = <SyntaxToken>this.Visit(node.Token);
            return node.Update(token);
        }
        public VisitMakeRefExpression(node: MakeRefExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitRefTypeExpression(node: RefTypeExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitRefValueExpression(node: RefValueExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var comma = <SyntaxToken>this.Visit(node.Comma);
            var type = <TypeSyntax>this.Visit(node.Type);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, comma, type, closeParenToken);
        }
        public VisitCheckedExpression(node: CheckedExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitDefaultExpression(node: DefaultExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitTypeOfExpression(node: TypeOfExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitSizeOfExpression(node: SizeOfExpressionSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitInvocationExpression(node: InvocationExpressionSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var argumentList = <ArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(expression, argumentList);
        }
        public VisitElementAccessExpression(node: ElementAccessExpressionSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var argumentList = <BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(expression, argumentList);
        }
        public VisitArgumentList(node: ArgumentListSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, arguments, closeParenToken);
        }
        public VisitBracketedArgumentList(node: BracketedArgumentListSyntax): CSharpSyntaxNode {
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            return node.Update(openBracketToken, arguments, closeBracketToken);
        }
        public VisitArgument(node: ArgumentSyntax): CSharpSyntaxNode {
            var nameColon = <NameColonSyntax>this.Visit(node.NameColon);
            var refOrOutKeyword = <SyntaxToken>this.Visit(node.RefOrOutKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameColon, refOrOutKeyword, expression);
        }
        public VisitNameColon(node: NameColonSyntax): CSharpSyntaxNode {
            var name = <IdentifierNameSyntax>this.Visit(node.Name);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            return node.Update(name, colonToken);
        }
        public VisitCastExpression(node: CastExpressionSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(openParenToken, type, closeParenToken, expression);
        }
        public VisitAnonymousMethodExpression(node: AnonymousMethodExpressionSyntax): CSharpSyntaxNode {
            var asyncKeyword = <SyntaxToken>this.Visit(node.AsyncKeyword);
            var delegateKeyword = <SyntaxToken>this.Visit(node.DelegateKeyword);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var block = <BlockSyntax>this.Visit(node.Block);
            return node.Update(asyncKeyword, delegateKeyword, parameterList, block);
        }
        public VisitSimpleLambdaExpression(node: SimpleLambdaExpressionSyntax): CSharpSyntaxNode {
            var asyncKeyword = <SyntaxToken>this.Visit(node.AsyncKeyword);
            var parameter = <ParameterSyntax>this.Visit(node.Parameter);
            var arrowToken = <SyntaxToken>this.Visit(node.ArrowToken);
            var body = <CSharpSyntaxNode>this.Visit(node.Body);
            return node.Update(asyncKeyword, parameter, arrowToken, body);
        }
        public VisitParenthesizedLambdaExpression(node: ParenthesizedLambdaExpressionSyntax): CSharpSyntaxNode {
            var asyncKeyword = <SyntaxToken>this.Visit(node.AsyncKeyword);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var arrowToken = <SyntaxToken>this.Visit(node.ArrowToken);
            var body = <CSharpSyntaxNode>this.Visit(node.Body);
            return node.Update(asyncKeyword, parameterList, arrowToken, body);
        }
        public VisitInitializerExpression(node: InitializerExpressionSyntax): CSharpSyntaxNode {
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var expressions = this.VisitList_2124(node.Expressions);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            return node.Update(openBraceToken, expressions, closeBraceToken);
        }
        public VisitObjectCreationExpression(node: ObjectCreationExpressionSyntax): CSharpSyntaxNode {
            var newKeyword = <SyntaxToken>this.Visit(node.NewKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var argumentList = <ArgumentListSyntax>this.Visit(node.ArgumentList);
            var initializer = <InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, type, argumentList, initializer);
        }
        public VisitAnonymousObjectMemberDeclarator(node: AnonymousObjectMemberDeclaratorSyntax): CSharpSyntaxNode {
            var nameEquals = <NameEqualsSyntax>this.Visit(node.NameEquals);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameEquals, expression);
        }
        public VisitAnonymousObjectCreationExpression(node: AnonymousObjectCreationExpressionSyntax): CSharpSyntaxNode {
            var newKeyword = <SyntaxToken>this.Visit(node.NewKeyword);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var initializers = this.VisitList_2124(node.Initializers);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            return node.Update(newKeyword, openBraceToken, initializers, closeBraceToken);
        }
        public VisitArrayCreationExpression(node: ArrayCreationExpressionSyntax): CSharpSyntaxNode {
            var newKeyword = <SyntaxToken>this.Visit(node.NewKeyword);
            var type = <ArrayTypeSyntax>this.Visit(node.Type);
            var initializer = <InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, type, initializer);
        }
        public VisitImplicitArrayCreationExpression(node: ImplicitArrayCreationExpressionSyntax): CSharpSyntaxNode {
            var newKeyword = <SyntaxToken>this.Visit(node.NewKeyword);
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var commas = this.VisitList_1459(node.Commas);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            var initializer = <InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, openBracketToken, commas, closeBracketToken, initializer);
        }
        public VisitStackAllocArrayCreationExpression(node: StackAllocArrayCreationExpressionSyntax): CSharpSyntaxNode {
            var stackAllocKeyword = <SyntaxToken>this.Visit(node.StackAllocKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(stackAllocKeyword, type);
        }
        public VisitQueryExpression(node: QueryExpressionSyntax): CSharpSyntaxNode {
            var fromClause = <FromClauseSyntax>this.Visit(node.FromClause);
            var body = <QueryBodySyntax>this.Visit(node.Body);
            return node.Update(fromClause, body);
        }
        public VisitQueryBody(node: QueryBodySyntax): CSharpSyntaxNode {
            var clauses = this.VisitList_1459(node.Clauses);
            var selectOrGroup = <SelectOrGroupClauseSyntax>this.Visit(node.SelectOrGroup);
            var continuation = <QueryContinuationSyntax>this.Visit(node.Continuation);
            return node.Update(clauses, selectOrGroup, continuation);
        }
        public VisitFromClause(node: FromClauseSyntax): CSharpSyntaxNode {
            var fromKeyword = <SyntaxToken>this.Visit(node.FromKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var inKeyword = <SyntaxToken>this.Visit(node.InKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(fromKeyword, type, identifier, inKeyword, expression);
        }
        public VisitLetClause(node: LetClauseSyntax): CSharpSyntaxNode {
            var letKeyword = <SyntaxToken>this.Visit(node.LetKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(letKeyword, identifier, equalsToken, expression);
        }
        public VisitJoinClause(node: JoinClauseSyntax): CSharpSyntaxNode {
            var joinKeyword = <SyntaxToken>this.Visit(node.JoinKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var inKeyword = <SyntaxToken>this.Visit(node.InKeyword);
            var inExpression = <ExpressionSyntax>this.Visit(node.InExpression);
            var onKeyword = <SyntaxToken>this.Visit(node.OnKeyword);
            var leftExpression = <ExpressionSyntax>this.Visit(node.LeftExpression);
            var equalsKeyword = <SyntaxToken>this.Visit(node.EqualsKeyword);
            var rightExpression = <ExpressionSyntax>this.Visit(node.RightExpression);
            var into = <JoinIntoClauseSyntax>this.Visit(node.Into);
            return node.Update(joinKeyword, type, identifier, inKeyword, inExpression, onKeyword, leftExpression, equalsKeyword, rightExpression, into);
        }
        public VisitJoinIntoClause(node: JoinIntoClauseSyntax): CSharpSyntaxNode {
            var intoKeyword = <SyntaxToken>this.Visit(node.IntoKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            return node.Update(intoKeyword, identifier);
        }
        public VisitWhereClause(node: WhereClauseSyntax): CSharpSyntaxNode {
            var whereKeyword = <SyntaxToken>this.Visit(node.WhereKeyword);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            return node.Update(whereKeyword, condition);
        }
        public VisitOrderByClause(node: OrderByClauseSyntax): CSharpSyntaxNode {
            var orderByKeyword = <SyntaxToken>this.Visit(node.OrderByKeyword);
            var orderings = this.VisitList_2124(node.Orderings);
            return node.Update(orderByKeyword, orderings);
        }
        public VisitOrdering(node: OrderingSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var ascendingOrDescendingKeyword = <SyntaxToken>this.Visit(node.AscendingOrDescendingKeyword);
            return node.Update(expression, ascendingOrDescendingKeyword);
        }
        public VisitSelectClause(node: SelectClauseSyntax): CSharpSyntaxNode {
            var selectKeyword = <SyntaxToken>this.Visit(node.SelectKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(selectKeyword, expression);
        }
        public VisitGroupClause(node: GroupClauseSyntax): CSharpSyntaxNode {
            var groupKeyword = <SyntaxToken>this.Visit(node.GroupKeyword);
            var groupExpression = <ExpressionSyntax>this.Visit(node.GroupExpression);
            var byKeyword = <SyntaxToken>this.Visit(node.ByKeyword);
            var byExpression = <ExpressionSyntax>this.Visit(node.ByExpression);
            return node.Update(groupKeyword, groupExpression, byKeyword, byExpression);
        }
        public VisitQueryContinuation(node: QueryContinuationSyntax): CSharpSyntaxNode {
            var intoKeyword = <SyntaxToken>this.Visit(node.IntoKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var body = <QueryBodySyntax>this.Visit(node.Body);
            return node.Update(intoKeyword, identifier, body);
        }
        public VisitOmittedArraySizeExpression(node: OmittedArraySizeExpressionSyntax): CSharpSyntaxNode {
            var omittedArraySizeExpressionToken = <SyntaxToken>this.Visit(node.OmittedArraySizeExpressionToken);
            return node.Update(omittedArraySizeExpressionToken);
        }
        public VisitGlobalStatement(node: GlobalStatementSyntax): CSharpSyntaxNode {
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(statement);
        }
        public VisitBlock(node: BlockSyntax): CSharpSyntaxNode {
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var statements = this.VisitList_1459(node.Statements);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            return node.Update(openBraceToken, statements, closeBraceToken);
        }
        public VisitLocalDeclarationStatement(node: LocalDeclarationStatementSyntax): CSharpSyntaxNode {
            var modifiers = this.VisitList_1459(node.Modifiers);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(modifiers, declaration, semicolonToken);
        }
        public VisitVariableDeclaration(node: VariableDeclarationSyntax): CSharpSyntaxNode {
            var type = <TypeSyntax>this.Visit(node.Type);
            var variables = this.VisitList_2124(node.Variables);
            return node.Update(type, variables);
        }
        public VisitVariableDeclarator(node: VariableDeclaratorSyntax): CSharpSyntaxNode {
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var argumentList = <BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            var initializer = <EqualsValueClauseSyntax>this.Visit(node.Initializer);
            return node.Update(identifier, argumentList, initializer);
        }
        public VisitEqualsValueClause(node: EqualsValueClauseSyntax): CSharpSyntaxNode {
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            var value = <ExpressionSyntax>this.Visit(node.Value);
            return node.Update(equalsToken, value);
        }
        public VisitExpressionStatement(node: ExpressionStatementSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(expression, semicolonToken);
        }
        public VisitEmptyStatement(node: EmptyStatementSyntax): CSharpSyntaxNode {
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(semicolonToken);
        }
        public VisitLabeledStatement(node: LabeledStatementSyntax): CSharpSyntaxNode {
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(identifier, colonToken, statement);
        }
        public VisitGotoStatement(node: GotoStatementSyntax): CSharpSyntaxNode {
            var gotoKeyword = <SyntaxToken>this.Visit(node.GotoKeyword);
            var caseOrDefaultKeyword = <SyntaxToken>this.Visit(node.CaseOrDefaultKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(gotoKeyword, caseOrDefaultKeyword, expression, semicolonToken);
        }
        public VisitBreakStatement(node: BreakStatementSyntax): CSharpSyntaxNode {
            var breakKeyword = <SyntaxToken>this.Visit(node.BreakKeyword);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(breakKeyword, semicolonToken);
        }
        public VisitContinueStatement(node: ContinueStatementSyntax): CSharpSyntaxNode {
            var continueKeyword = <SyntaxToken>this.Visit(node.ContinueKeyword);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(continueKeyword, semicolonToken);
        }
        public VisitReturnStatement(node: ReturnStatementSyntax): CSharpSyntaxNode {
            var returnKeyword = <SyntaxToken>this.Visit(node.ReturnKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(returnKeyword, expression, semicolonToken);
        }
        public VisitThrowStatement(node: ThrowStatementSyntax): CSharpSyntaxNode {
            var throwKeyword = <SyntaxToken>this.Visit(node.ThrowKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(throwKeyword, expression, semicolonToken);
        }
        public VisitYieldStatement(node: YieldStatementSyntax): CSharpSyntaxNode {
            var yieldKeyword = <SyntaxToken>this.Visit(node.YieldKeyword);
            var returnOrBreakKeyword = <SyntaxToken>this.Visit(node.ReturnOrBreakKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(yieldKeyword, returnOrBreakKeyword, expression, semicolonToken);
        }
        public VisitWhileStatement(node: WhileStatementSyntax): CSharpSyntaxNode {
            var whileKeyword = <SyntaxToken>this.Visit(node.WhileKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(whileKeyword, openParenToken, condition, closeParenToken, statement);
        }
        public VisitDoStatement(node: DoStatementSyntax): CSharpSyntaxNode {
            var doKeyword = <SyntaxToken>this.Visit(node.DoKeyword);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            var whileKeyword = <SyntaxToken>this.Visit(node.WhileKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken);
        }
        public VisitForStatement(node: ForStatementSyntax): CSharpSyntaxNode {
            var forKeyword = <SyntaxToken>this.Visit(node.ForKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var initializers = this.VisitList_2124(node.Initializers);
            var firstSemicolonToken = <SyntaxToken>this.Visit(node.FirstSemicolonToken);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var secondSemicolonToken = <SyntaxToken>this.Visit(node.SecondSemicolonToken);
            var incrementors = this.VisitList_2124(node.Incrementors);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(forKeyword, openParenToken, declaration, initializers, firstSemicolonToken, condition, secondSemicolonToken, incrementors, closeParenToken, statement);
        }
        public VisitForEachStatement(node: ForEachStatementSyntax): CSharpSyntaxNode {
            var forEachKeyword = <SyntaxToken>this.Visit(node.ForEachKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var inKeyword = <SyntaxToken>this.Visit(node.InKeyword);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(forEachKeyword, openParenToken, type, identifier, inKeyword, expression, closeParenToken, statement);
        }
        public VisitUsingStatement(node: UsingStatementSyntax): CSharpSyntaxNode {
            var usingKeyword = <SyntaxToken>this.Visit(node.UsingKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(usingKeyword, openParenToken, declaration, expression, closeParenToken, statement);
        }
        public VisitFixedStatement(node: FixedStatementSyntax): CSharpSyntaxNode {
            var fixedKeyword = <SyntaxToken>this.Visit(node.FixedKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(fixedKeyword, openParenToken, declaration, closeParenToken, statement);
        }
        public VisitCheckedStatement(node: CheckedStatementSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var block = <BlockSyntax>this.Visit(node.Block);
            return node.Update(keyword, block);
        }
        public VisitUnsafeStatement(node: UnsafeStatementSyntax): CSharpSyntaxNode {
            var unsafeKeyword = <SyntaxToken>this.Visit(node.UnsafeKeyword);
            var block = <BlockSyntax>this.Visit(node.Block);
            return node.Update(unsafeKeyword, block);
        }
        public VisitLockStatement(node: LockStatementSyntax): CSharpSyntaxNode {
            var lockKeyword = <SyntaxToken>this.Visit(node.LockKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(lockKeyword, openParenToken, expression, closeParenToken, statement);
        }
        public VisitIfStatement(node: IfStatementSyntax): CSharpSyntaxNode {
            var ifKeyword = <SyntaxToken>this.Visit(node.IfKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            var $else = <ElseClauseSyntax>this.Visit(node.Else);
            return node.Update(ifKeyword, openParenToken, condition, closeParenToken, statement, $else);
        }
        public VisitElseClause(node: ElseClauseSyntax): CSharpSyntaxNode {
            var elseKeyword = <SyntaxToken>this.Visit(node.ElseKeyword);
            var statement = <StatementSyntax>this.Visit(node.Statement);
            return node.Update(elseKeyword, statement);
        }
        public VisitSwitchStatement(node: SwitchStatementSyntax): CSharpSyntaxNode {
            var switchKeyword = <SyntaxToken>this.Visit(node.SwitchKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var sections = this.VisitList_1459(node.Sections);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            return node.Update(switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, sections, closeBraceToken);
        }
        public VisitSwitchSection(node: SwitchSectionSyntax): CSharpSyntaxNode {
            var labels = this.VisitList_1459(node.Labels);
            var statements = this.VisitList_1459(node.Statements);
            return node.Update(labels, statements);
        }
        public VisitCaseSwitchLabel(node: CaseSwitchLabelSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var value = <ExpressionSyntax>this.Visit(node.Value);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            return node.Update(keyword, value, colonToken);
        }
        public VisitDefaultSwitchLabel(node: DefaultSwitchLabelSyntax): CSharpSyntaxNode {
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            return node.Update(keyword, colonToken);
        }
        public VisitTryStatement(node: TryStatementSyntax): CSharpSyntaxNode {
            var tryKeyword = <SyntaxToken>this.Visit(node.TryKeyword);
            var block = <BlockSyntax>this.Visit(node.Block);
            var catches = this.VisitList_1459(node.Catches);
            var $finally = <FinallyClauseSyntax>this.Visit(node.Finally);
            return node.Update(tryKeyword, block, catches, $finally);
        }
        public VisitCatchClause(node: CatchClauseSyntax): CSharpSyntaxNode {
            var catchKeyword = <SyntaxToken>this.Visit(node.CatchKeyword);
            var declaration = <CatchDeclarationSyntax>this.Visit(node.Declaration);
            var filter = <CatchFilterClauseSyntax>this.Visit(node.Filter);
            var block = <BlockSyntax>this.Visit(node.Block);
            return node.Update(catchKeyword, declaration, filter, block);
        }
        public VisitCatchDeclaration(node: CatchDeclarationSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var type = <TypeSyntax>this.Visit(node.Type);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, type, identifier, closeParenToken);
        }
        public VisitCatchFilterClause(node: CatchFilterClauseSyntax): CSharpSyntaxNode {
            var ifKeyword = <SyntaxToken>this.Visit(node.IfKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var filterExpression = <ExpressionSyntax>this.Visit(node.FilterExpression);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(ifKeyword, openParenToken, filterExpression, closeParenToken);
        }
        public VisitFinallyClause(node: FinallyClauseSyntax): CSharpSyntaxNode {
            var finallyKeyword = <SyntaxToken>this.Visit(node.FinallyKeyword);
            var block = <BlockSyntax>this.Visit(node.Block);
            return node.Update(finallyKeyword, block);
        }
        public VisitCompilationUnit(node: CompilationUnitSyntax): CSharpSyntaxNode {
            var externs = this.VisitList_1459(node.Externs);
            var usings = this.VisitList_1459(node.Usings);
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var members = this.VisitList_1459(node.Members);
            var endOfFileToken = <SyntaxToken>this.Visit(node.EndOfFileToken);
            return node.Update(externs, usings, attributeLists, members, endOfFileToken);
        }
        public VisitExternAliasDirective(node: ExternAliasDirectiveSyntax): CSharpSyntaxNode {
            var externKeyword = <SyntaxToken>this.Visit(node.ExternKeyword);
            var aliasKeyword = <SyntaxToken>this.Visit(node.AliasKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(externKeyword, aliasKeyword, identifier, semicolonToken);
        }
        public VisitUsingDirective(node: UsingDirectiveSyntax): CSharpSyntaxNode {
            var usingKeyword = <SyntaxToken>this.Visit(node.UsingKeyword);
            var staticKeyword = <SyntaxToken>this.Visit(node.StaticKeyword);
            var alias = <NameEqualsSyntax>this.Visit(node.Alias);
            var name = <NameSyntax>this.Visit(node.Name);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(usingKeyword, staticKeyword, alias, name, semicolonToken);
        }
        public VisitNamespaceDeclaration(node: NamespaceDeclarationSyntax): CSharpSyntaxNode {
            var namespaceKeyword = <SyntaxToken>this.Visit(node.NamespaceKeyword);
            var name = <NameSyntax>this.Visit(node.Name);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var externs = this.VisitList_1459(node.Externs);
            var usings = this.VisitList_1459(node.Usings);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(namespaceKeyword, name, openBraceToken, externs, usings, members, closeBraceToken, semicolonToken);
        }
        public VisitAttributeList(node: AttributeListSyntax): CSharpSyntaxNode {
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var target = <AttributeTargetSpecifierSyntax>this.Visit(node.Target);
            var attributes = this.VisitList_2124(node.Attributes);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            return node.Update(openBracketToken, target, attributes, closeBracketToken);
        }
        public VisitAttributeTargetSpecifier(node: AttributeTargetSpecifierSyntax): CSharpSyntaxNode {
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            return node.Update(identifier, colonToken);
        }
        public VisitAttribute(node: AttributeSyntax): CSharpSyntaxNode {
            var name = <NameSyntax>this.Visit(node.Name);
            var argumentList = <AttributeArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(name, argumentList);
        }
        public VisitAttributeArgumentList(node: AttributeArgumentListSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, arguments, closeParenToken);
        }
        public VisitAttributeArgument(node: AttributeArgumentSyntax): CSharpSyntaxNode {
            var nameEquals = <NameEqualsSyntax>this.Visit(node.NameEquals);
            var nameColon = <NameColonSyntax>this.Visit(node.NameColon);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameEquals, nameColon, expression);
        }
        public VisitNameEquals(node: NameEqualsSyntax): CSharpSyntaxNode {
            var name = <IdentifierNameSyntax>this.Visit(node.Name);
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            return node.Update(name, equalsToken);
        }
        public VisitTypeParameterList(node: TypeParameterListSyntax): CSharpSyntaxNode {
            var lessThanToken = <SyntaxToken>this.Visit(node.LessThanToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var greaterThanToken = <SyntaxToken>this.Visit(node.GreaterThanToken);
            return node.Update(lessThanToken, parameters, greaterThanToken);
        }
        public VisitTypeParameter(node: TypeParameterSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var varianceKeyword = <SyntaxToken>this.Visit(node.VarianceKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            return node.Update(attributeLists, varianceKeyword, identifier);
        }
        public VisitClassDeclaration(node: ClassDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeParameterList = <TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitStructDeclaration(node: StructDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeParameterList = <TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitInterfaceDeclaration(node: InterfaceDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeParameterList = <TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitEnumDeclaration(node: EnumDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var enumKeyword = <SyntaxToken>this.Visit(node.EnumKeyword);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var baseList = <BaseListSyntax>this.Visit(node.BaseList);
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var members = this.VisitList_2124(node.Members);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, enumKeyword, identifier, baseList, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitDelegateDeclaration(node: DelegateDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var delegateKeyword = <SyntaxToken>this.Visit(node.DelegateKeyword);
            var returnType = <TypeSyntax>this.Visit(node.ReturnType);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeParameterList = <TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, delegateKeyword, returnType, identifier, typeParameterList, parameterList, constraintClauses, semicolonToken);
        }
        public VisitEnumMemberDeclaration(node: EnumMemberDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var equalsValue = <EqualsValueClauseSyntax>this.Visit(node.EqualsValue);
            return node.Update(attributeLists, identifier, equalsValue);
        }
        public VisitBaseList(node: BaseListSyntax): CSharpSyntaxNode {
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            var types = this.VisitList_2124(node.Types);
            return node.Update(colonToken, types);
        }
        public VisitSimpleBaseType(node: SimpleBaseTypeSyntax): CSharpSyntaxNode {
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitTypeParameterConstraintClause(node: TypeParameterConstraintClauseSyntax): CSharpSyntaxNode {
            var whereKeyword = <SyntaxToken>this.Visit(node.WhereKeyword);
            var name = <IdentifierNameSyntax>this.Visit(node.Name);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            var constraints = this.VisitList_2124(node.Constraints);
            return node.Update(whereKeyword, name, colonToken, constraints);
        }
        public VisitConstructorConstraint(node: ConstructorConstraintSyntax): CSharpSyntaxNode {
            var newKeyword = <SyntaxToken>this.Visit(node.NewKeyword);
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(newKeyword, openParenToken, closeParenToken);
        }
        public VisitClassOrStructConstraint(node: ClassOrStructConstraintSyntax): CSharpSyntaxNode {
            var classOrStructKeyword = <SyntaxToken>this.Visit(node.ClassOrStructKeyword);
            return node.Update(classOrStructKeyword);
        }
        public VisitTypeConstraint(node: TypeConstraintSyntax): CSharpSyntaxNode {
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitFieldDeclaration(node: FieldDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, declaration, semicolonToken);
        }
        public VisitEventFieldDeclaration(node: EventFieldDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var eventKeyword = <SyntaxToken>this.Visit(node.EventKeyword);
            var declaration = <VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, eventKeyword, declaration, semicolonToken);
        }
        public VisitExplicitInterfaceSpecifier(node: ExplicitInterfaceSpecifierSyntax): CSharpSyntaxNode {
            var name = <NameSyntax>this.Visit(node.Name);
            var dotToken = <SyntaxToken>this.Visit(node.DotToken);
            return node.Update(name, dotToken);
        }
        public VisitMethodDeclaration(node: MethodDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var returnType = <TypeSyntax>this.Visit(node.ReturnType);
            var explicitInterfaceSpecifier = <ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var typeParameterList = <TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var body = <BlockSyntax>this.Visit(node.Body);
            var expressionBody = <ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses, body, expressionBody, semicolonToken);
        }
        public VisitOperatorDeclaration(node: OperatorDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var returnType = <TypeSyntax>this.Visit(node.ReturnType);
            var operatorKeyword = <SyntaxToken>this.Visit(node.OperatorKeyword);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <BlockSyntax>this.Visit(node.Body);
            var expressionBody = <ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, returnType, operatorKeyword, operatorToken, parameterList, body, expressionBody, semicolonToken);
        }
        public VisitConversionOperatorDeclaration(node: ConversionOperatorDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var implicitOrExplicitKeyword = <SyntaxToken>this.Visit(node.ImplicitOrExplicitKeyword);
            var operatorKeyword = <SyntaxToken>this.Visit(node.OperatorKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <BlockSyntax>this.Visit(node.Body);
            var expressionBody = <ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, implicitOrExplicitKeyword, operatorKeyword, type, parameterList, body, expressionBody, semicolonToken);
        }
        public VisitConstructorDeclaration(node: ConstructorDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var initializer = <ConstructorInitializerSyntax>this.Visit(node.Initializer);
            var body = <BlockSyntax>this.Visit(node.Body);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, identifier, parameterList, initializer, body, semicolonToken);
        }
        public VisitConstructorInitializer(node: ConstructorInitializerSyntax): CSharpSyntaxNode {
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            var thisOrBaseKeyword = <SyntaxToken>this.Visit(node.ThisOrBaseKeyword);
            var argumentList = <ArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(colonToken, thisOrBaseKeyword, argumentList);
        }
        public VisitDestructorDeclaration(node: DestructorDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var tildeToken = <SyntaxToken>this.Visit(node.TildeToken);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var parameterList = <ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <BlockSyntax>this.Visit(node.Body);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, tildeToken, identifier, parameterList, body, semicolonToken);
        }
        public VisitPropertyDeclaration(node: PropertyDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var type = <TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var accessorList = <AccessorListSyntax>this.Visit(node.AccessorList);
            var expressionBody = <ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var initializer = <EqualsValueClauseSyntax>this.Visit(node.Initializer);
            var semicolon = <SyntaxToken>this.Visit(node.Semicolon);
            return node.Update(attributeLists, modifiers, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, semicolon);
        }
        public VisitArrowExpressionClause(node: ArrowExpressionClauseSyntax): CSharpSyntaxNode {
            var arrowToken = <SyntaxToken>this.Visit(node.ArrowToken);
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(arrowToken, expression);
        }
        public VisitEventDeclaration(node: EventDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var eventKeyword = <SyntaxToken>this.Visit(node.EventKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var accessorList = <AccessorListSyntax>this.Visit(node.AccessorList);
            return node.Update(attributeLists, modifiers, eventKeyword, type, explicitInterfaceSpecifier, identifier, accessorList);
        }
        public VisitIndexerDeclaration(node: IndexerDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var type = <TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var thisKeyword = <SyntaxToken>this.Visit(node.ThisKeyword);
            var parameterList = <BracketedParameterListSyntax>this.Visit(node.ParameterList);
            var accessorList = <AccessorListSyntax>this.Visit(node.AccessorList);
            var expressionBody = <ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolon = <SyntaxToken>this.Visit(node.Semicolon);
            return node.Update(attributeLists, modifiers, type, explicitInterfaceSpecifier, thisKeyword, parameterList, accessorList, expressionBody, semicolon);
        }
        public VisitAccessorList(node: AccessorListSyntax): CSharpSyntaxNode {
            var openBraceToken = <SyntaxToken>this.Visit(node.OpenBraceToken);
            var accessors = this.VisitList_1459(node.Accessors);
            var closeBraceToken = <SyntaxToken>this.Visit(node.CloseBraceToken);
            return node.Update(openBraceToken, accessors, closeBraceToken);
        }
        public VisitAccessorDeclaration(node: AccessorDeclarationSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var keyword = <SyntaxToken>this.Visit(node.Keyword);
            var body = <BlockSyntax>this.Visit(node.Body);
            var semicolonToken = <SyntaxToken>this.Visit(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, body, semicolonToken);
        }
        public VisitParameterList(node: ParameterListSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, parameters, closeParenToken);
        }
        public VisitBracketedParameterList(node: BracketedParameterListSyntax): CSharpSyntaxNode {
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            return node.Update(openBracketToken, parameters, closeBracketToken);
        }
        public VisitParameter(node: ParameterSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var type = <TypeSyntax>this.Visit(node.Type);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var $default = <EqualsValueClauseSyntax>this.Visit(node.Default);
            return node.Update(attributeLists, modifiers, type, identifier, $default);
        }
        public VisitIncompleteMember(node: IncompleteMemberSyntax): CSharpSyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_1459(node.Modifiers);
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(attributeLists, modifiers, type);
        }
        public VisitSkippedTokensTrivia(node: SkippedTokensTriviaSyntax): CSharpSyntaxNode {
            var tokens = this.VisitList_1459(node.Tokens);
            return node.Update(tokens);
        }
        public VisitDocumentationCommentTrivia(node: DocumentationCommentTriviaSyntax): CSharpSyntaxNode {
            var content = this.VisitList_1459(node.Content);
            var endOfComment = <SyntaxToken>this.Visit(node.EndOfComment);
            return node.Update(content, endOfComment);
        }
        public VisitTypeCref(node: TypeCrefSyntax): CSharpSyntaxNode {
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitQualifiedCref(node: QualifiedCrefSyntax): CSharpSyntaxNode {
            var container = <TypeSyntax>this.Visit(node.Container);
            var dotToken = <SyntaxToken>this.Visit(node.DotToken);
            var member = <MemberCrefSyntax>this.Visit(node.Member);
            return node.Update(container, dotToken, member);
        }
        public VisitNameMemberCref(node: NameMemberCrefSyntax): CSharpSyntaxNode {
            var name = <TypeSyntax>this.Visit(node.Name);
            var parameters = <CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(name, parameters);
        }
        public VisitIndexerMemberCref(node: IndexerMemberCrefSyntax): CSharpSyntaxNode {
            var thisKeyword = <SyntaxToken>this.Visit(node.ThisKeyword);
            var parameters = <CrefBracketedParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(thisKeyword, parameters);
        }
        public VisitOperatorMemberCref(node: OperatorMemberCrefSyntax): CSharpSyntaxNode {
            var operatorKeyword = <SyntaxToken>this.Visit(node.OperatorKeyword);
            var operatorToken = <SyntaxToken>this.Visit(node.OperatorToken);
            var parameters = <CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(operatorKeyword, operatorToken, parameters);
        }
        public VisitConversionOperatorMemberCref(node: ConversionOperatorMemberCrefSyntax): CSharpSyntaxNode {
            var implicitOrExplicitKeyword = <SyntaxToken>this.Visit(node.ImplicitOrExplicitKeyword);
            var operatorKeyword = <SyntaxToken>this.Visit(node.OperatorKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            var parameters = <CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(implicitOrExplicitKeyword, operatorKeyword, type, parameters);
        }
        public VisitCrefParameterList(node: CrefParameterListSyntax): CSharpSyntaxNode {
            var openParenToken = <SyntaxToken>this.Visit(node.OpenParenToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeParenToken = <SyntaxToken>this.Visit(node.CloseParenToken);
            return node.Update(openParenToken, parameters, closeParenToken);
        }
        public VisitCrefBracketedParameterList(node: CrefBracketedParameterListSyntax): CSharpSyntaxNode {
            var openBracketToken = <SyntaxToken>this.Visit(node.OpenBracketToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeBracketToken = <SyntaxToken>this.Visit(node.CloseBracketToken);
            return node.Update(openBracketToken, parameters, closeBracketToken);
        }
        public VisitCrefParameter(node: CrefParameterSyntax): CSharpSyntaxNode {
            var refOrOutKeyword = <SyntaxToken>this.Visit(node.RefOrOutKeyword);
            var type = <TypeSyntax>this.Visit(node.Type);
            return node.Update(refOrOutKeyword, type);
        }
        public VisitXmlElement(node: XmlElementSyntax): CSharpSyntaxNode {
            var startTag = <XmlElementStartTagSyntax>this.Visit(node.StartTag);
            var content = this.VisitList_1459(node.Content);
            var endTag = <XmlElementEndTagSyntax>this.Visit(node.EndTag);
            return node.Update(startTag, content, endTag);
        }
        public VisitXmlElementStartTag(node: XmlElementStartTagSyntax): CSharpSyntaxNode {
            var lessThanToken = <SyntaxToken>this.Visit(node.LessThanToken);
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var attributes = this.VisitList_1459(node.Attributes);
            var greaterThanToken = <SyntaxToken>this.Visit(node.GreaterThanToken);
            return node.Update(lessThanToken, name, attributes, greaterThanToken);
        }
        public VisitXmlElementEndTag(node: XmlElementEndTagSyntax): CSharpSyntaxNode {
            var lessThanSlashToken = <SyntaxToken>this.Visit(node.LessThanSlashToken);
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var greaterThanToken = <SyntaxToken>this.Visit(node.GreaterThanToken);
            return node.Update(lessThanSlashToken, name, greaterThanToken);
        }
        public VisitXmlEmptyElement(node: XmlEmptyElementSyntax): CSharpSyntaxNode {
            var lessThanToken = <SyntaxToken>this.Visit(node.LessThanToken);
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var attributes = this.VisitList_1459(node.Attributes);
            var slashGreaterThanToken = <SyntaxToken>this.Visit(node.SlashGreaterThanToken);
            return node.Update(lessThanToken, name, attributes, slashGreaterThanToken);
        }
        public VisitXmlName(node: XmlNameSyntax): CSharpSyntaxNode {
            var prefix = <XmlPrefixSyntax>this.Visit(node.Prefix);
            var localName = <SyntaxToken>this.Visit(node.LocalName);
            return node.Update(prefix, localName);
        }
        public VisitXmlPrefix(node: XmlPrefixSyntax): CSharpSyntaxNode {
            var prefix = <SyntaxToken>this.Visit(node.Prefix);
            var colonToken = <SyntaxToken>this.Visit(node.ColonToken);
            return node.Update(prefix, colonToken);
        }
        public VisitXmlTextAttribute(node: XmlTextAttributeSyntax): CSharpSyntaxNode {
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            var startQuoteToken = <SyntaxToken>this.Visit(node.StartQuoteToken);
            var textTokens = this.VisitList_1459(node.TextTokens);
            var endQuoteToken = <SyntaxToken>this.Visit(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, textTokens, endQuoteToken);
        }
        public VisitXmlCrefAttribute(node: XmlCrefAttributeSyntax): CSharpSyntaxNode {
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            var startQuoteToken = <SyntaxToken>this.Visit(node.StartQuoteToken);
            var cref = <CrefSyntax>this.Visit(node.Cref);
            var endQuoteToken = <SyntaxToken>this.Visit(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, cref, endQuoteToken);
        }
        public VisitXmlNameAttribute(node: XmlNameAttributeSyntax): CSharpSyntaxNode {
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = <SyntaxToken>this.Visit(node.EqualsToken);
            var startQuoteToken = <SyntaxToken>this.Visit(node.StartQuoteToken);
            var identifier = <IdentifierNameSyntax>this.Visit(node.Identifier);
            var endQuoteToken = <SyntaxToken>this.Visit(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, identifier, endQuoteToken);
        }
        public VisitXmlText(node: XmlTextSyntax): CSharpSyntaxNode {
            var textTokens = this.VisitList_1459(node.TextTokens);
            return node.Update(textTokens);
        }
        public VisitXmlCDataSection(node: XmlCDataSectionSyntax): CSharpSyntaxNode {
            var startCDataToken = <SyntaxToken>this.Visit(node.StartCDataToken);
            var textTokens = this.VisitList_1459(node.TextTokens);
            var endCDataToken = <SyntaxToken>this.Visit(node.EndCDataToken);
            return node.Update(startCDataToken, textTokens, endCDataToken);
        }
        public VisitXmlProcessingInstruction(node: XmlProcessingInstructionSyntax): CSharpSyntaxNode {
            var startProcessingInstructionToken = <SyntaxToken>this.Visit(node.StartProcessingInstructionToken);
            var name = <XmlNameSyntax>this.Visit(node.Name);
            var textTokens = this.VisitList_1459(node.TextTokens);
            var endProcessingInstructionToken = <SyntaxToken>this.Visit(node.EndProcessingInstructionToken);
            return node.Update(startProcessingInstructionToken, name, textTokens, endProcessingInstructionToken);
        }
        public VisitXmlComment(node: XmlCommentSyntax): CSharpSyntaxNode {
            var lessThanExclamationMinusMinusToken = <SyntaxToken>this.Visit(node.LessThanExclamationMinusMinusToken);
            var textTokens = this.VisitList_1459(node.TextTokens);
            var minusMinusGreaterThanToken = <SyntaxToken>this.Visit(node.MinusMinusGreaterThanToken);
            return node.Update(lessThanExclamationMinusMinusToken, textTokens, minusMinusGreaterThanToken);
        }
        public VisitIfDirectiveTrivia(node: IfDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var ifKeyword = <SyntaxToken>this.Visit(node.IfKeyword);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, ifKeyword, condition, endOfDirectiveToken, node.IsActive, node.BranchTaken, node.ConditionValue);
        }
        public VisitElifDirectiveTrivia(node: ElifDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var elifKeyword = <SyntaxToken>this.Visit(node.ElifKeyword);
            var condition = <ExpressionSyntax>this.Visit(node.Condition);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, elifKeyword, condition, endOfDirectiveToken, node.IsActive, node.BranchTaken, node.ConditionValue);
        }
        public VisitElseDirectiveTrivia(node: ElseDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var elseKeyword = <SyntaxToken>this.Visit(node.ElseKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, elseKeyword, endOfDirectiveToken, node.IsActive, node.BranchTaken);
        }
        public VisitEndIfDirectiveTrivia(node: EndIfDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var endIfKeyword = <SyntaxToken>this.Visit(node.EndIfKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, endIfKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitRegionDirectiveTrivia(node: RegionDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var regionKeyword = <SyntaxToken>this.Visit(node.RegionKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, regionKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitEndRegionDirectiveTrivia(node: EndRegionDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var endRegionKeyword = <SyntaxToken>this.Visit(node.EndRegionKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, endRegionKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitErrorDirectiveTrivia(node: ErrorDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var errorKeyword = <SyntaxToken>this.Visit(node.ErrorKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, errorKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitWarningDirectiveTrivia(node: WarningDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var warningKeyword = <SyntaxToken>this.Visit(node.WarningKeyword);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, warningKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitBadDirectiveTrivia(node: BadDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var identifier = <SyntaxToken>this.Visit(node.Identifier);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, identifier, endOfDirectiveToken, node.IsActive);
        }
        public VisitDefineDirectiveTrivia(node: DefineDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var defineKeyword = <SyntaxToken>this.Visit(node.DefineKeyword);
            var name = <SyntaxToken>this.Visit(node.Name);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, defineKeyword, name, endOfDirectiveToken, node.IsActive);
        }
        public VisitUndefDirectiveTrivia(node: UndefDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var undefKeyword = <SyntaxToken>this.Visit(node.UndefKeyword);
            var name = <SyntaxToken>this.Visit(node.Name);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, undefKeyword, name, endOfDirectiveToken, node.IsActive);
        }
        public VisitLineDirectiveTrivia(node: LineDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var lineKeyword = <SyntaxToken>this.Visit(node.LineKeyword);
            var line = <SyntaxToken>this.Visit(node.Line);
            var file = <SyntaxToken>this.Visit(node.File);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, lineKeyword, line, file, endOfDirectiveToken, node.IsActive);
        }
        public VisitPragmaWarningDirectiveTrivia(node: PragmaWarningDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var pragmaKeyword = <SyntaxToken>this.Visit(node.PragmaKeyword);
            var warningKeyword = <SyntaxToken>this.Visit(node.WarningKeyword);
            var disableOrRestoreKeyword = <SyntaxToken>this.Visit(node.DisableOrRestoreKeyword);
            var errorCodes = this.VisitList_2124(node.ErrorCodes);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, pragmaKeyword, warningKeyword, disableOrRestoreKeyword, errorCodes, endOfDirectiveToken, node.IsActive);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: PragmaChecksumDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var pragmaKeyword = <SyntaxToken>this.Visit(node.PragmaKeyword);
            var checksumKeyword = <SyntaxToken>this.Visit(node.ChecksumKeyword);
            var file = <SyntaxToken>this.Visit(node.File);
            var guid = <SyntaxToken>this.Visit(node.Guid);
            var bytes = <SyntaxToken>this.Visit(node.Bytes);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, pragmaKeyword, checksumKeyword, file, guid, bytes, endOfDirectiveToken, node.IsActive);
        }
        public VisitReferenceDirectiveTrivia(node: ReferenceDirectiveTriviaSyntax): CSharpSyntaxNode {
            var hashToken = <SyntaxToken>this.Visit(node.HashToken);
            var referenceKeyword = <SyntaxToken>this.Visit(node.ReferenceKeyword);
            var file = <SyntaxToken>this.Visit(node.File);
            var endOfDirectiveToken = <SyntaxToken>this.Visit(node.EndOfDirectiveToken);
            return node.Update(hashToken, referenceKeyword, file, endOfDirectiveToken, node.IsActive);
        }
        public VisitInterpolatedString(node: InterpolatedStringSyntax): CSharpSyntaxNode {
            var stringStart = <SyntaxToken>this.Visit(node.StringStart);
            var interpolatedInserts = this.VisitList_2124(node.InterpolatedInserts);
            var stringEnd = <SyntaxToken>this.Visit(node.StringEnd);
            return node.Update(stringStart, interpolatedInserts, stringEnd);
        }
        public VisitInterpolatedStringInsert(node: InterpolatedStringInsertSyntax): CSharpSyntaxNode {
            var expression = <ExpressionSyntax>this.Visit(node.Expression);
            var comma = <SyntaxToken>this.Visit(node.Comma);
            var alignment = <ExpressionSyntax>this.Visit(node.Alignment);
            var format = <SyntaxToken>this.Visit(node.Format);
            return node.Update(expression, comma, alignment, format);
        }
        constructor() { super(); }
    }
}
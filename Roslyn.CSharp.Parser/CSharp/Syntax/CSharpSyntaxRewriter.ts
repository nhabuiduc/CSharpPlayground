///<reference path="CSharpSyntaxVisitor.ts"/>
module Microsoft.CodeAnalysis.CSharp {
    export class CSharpSyntaxRewriter extends CSharpSyntaxVisitor<SyntaxNode>
    {
        private visitIntoStructuredTrivia: boolean = false;
        ctor_2068(visitIntoStructuredTrivia: boolean = false): CSharpSyntaxRewriter {
            this.visitIntoStructuredTrivia = visitIntoStructuredTrivia;
            return this;
        }
        public get VisitIntoStructuredTrivia(): boolean {
            return this.visitIntoStructuredTrivia;
        }
        public VisitToken(token: SyntaxToken): SyntaxToken {
            var node = token.Node;
            if (node == null) {
                return token;
            }
            var leadingTrivia = node.GetLeadingTriviaCore();
            var trailingTrivia = node.GetTrailingTriviaCore();
            System.Diagnostics.Debug.Assert(leadingTrivia == null || !leadingTrivia.IsList || leadingTrivia.SlotCount > 0);
            System.Diagnostics.Debug.Assert(trailingTrivia == null || !trailingTrivia.IsList || trailingTrivia.SlotCount > 0);
            if (leadingTrivia != null) {
                var leading = this.VisitList_8614(new SyntaxTriviaList().ctor_1248(token, leadingTrivia));
                if (trailingTrivia != null) {
                    var index = leadingTrivia.IsList ? leadingTrivia.SlotCount : 1;
                    var trailing = this.VisitList_8614(new SyntaxTriviaList().ctor_5254(token, trailingTrivia, token.Position + node.FullWidth - trailingTrivia.FullWidth, index));
                    if (leading.Node != leadingTrivia) {
                        token = token.WithLeadingTrivia_1905(leading);
                    }
                    return trailing.Node != trailingTrivia ? token.WithTrailingTrivia_6264(trailing) : token;
                }
                else {
                    return leading.Node != leadingTrivia ? token.WithLeadingTrivia_1905(leading) : token;
                }
            }
            else if (trailingTrivia != null) {
                var trailing = this.VisitList_8614(new SyntaxTriviaList().ctor_5254(token, trailingTrivia, token.Position + node.FullWidth - trailingTrivia.FullWidth,/*index:*/0));
                return trailing.Node != trailingTrivia ? token.WithTrailingTrivia_6264(trailing) : token;
            }
            else {
                return token;
            }
        }
        public VisitTrivia(trivia: SyntaxTrivia): SyntaxTrivia {
            if (this.VisitIntoStructuredTrivia && trivia.HasStructure) {
                var structure = <CSharpSyntaxNode>trivia.GetStructure();
                var newStructure = <Syntax.StructuredTriviaSyntax>this.Visit(structure);
                if (newStructure != structure) {
                    if (newStructure != null) {
                        return SyntaxFactory.Trivia(newStructure);
                    }
                    else {
                        return structDefault(SyntaxTrivia);
                    }
                }
            }
            return trivia;
        }
        public VisitList_1459<TNode extends SyntaxNode>(list: SyntaxList<TNode>): SyntaxList<TNode> {
            var alternate: Syntax.SyntaxListBaseBuilder = null;
            for (var i: number = 0, n = list.Count; i < n; i++) {
                var item = list.$get$(i);
                var visited = this.VisitListElement_1414(item);
                if (item != visited && alternate == null) {
                    alternate = new Syntax.SyntaxListBaseBuilder().ctor_1860(n);
                    alternate.AddRange_4324(list, 0, i);
                }
                if (alternate != null && visited != null && !CSharpExtensions.IsKind_1139(visited,
                    SyntaxKind.None)) {
                    alternate.Add(visited);
                }
            }
            if (alternate != null) {
                return SyntaxList.op_Implicit_1229<TNode>(Syntax.SyntaxListBuilderExtensions.ToList(alternate));
            }
            return list;
        }
        public VisitListElement_1414<TNode extends SyntaxNode>(node: TNode): TNode {
            return <TNode><SyntaxNode>this.Visit(node);
        }
        public VisitList_2124<TNode extends SyntaxNode>(list: SeparatedSyntaxList<TNode>): SeparatedSyntaxList<TNode> {
            var count = list.Count;
            var sepCount = list.SeparatorCount;
            var alternate: Syntax.SeparatedSyntaxListBuilder<TNode> = <Syntax.SeparatedSyntaxListBuilder<TNode>> structDefault(Syntax.SeparatedSyntaxListBuilder);
            var i: number = 0;
            for (; i < sepCount; i++) {
                var node = list.$get$(i);
                var visitedNode = this.VisitListElement_1414(node);
                var separator = list.GetSeparator(i);
                var visitedSeparator = this.VisitListSeparator(separator);
                if (alternate.IsNull) {
                    if (node != visitedNode || separator.op_Inequality(visitedSeparator)) {
                        alternate = new Syntax.SeparatedSyntaxListBuilder<TNode>().ctor_8478(count);
                        alternate.AddRange_9097(list, i);
                    }
                }
                if (!alternate.IsNull) {
                    if (visitedNode != null) {
                        alternate.Add(visitedNode);
                        if (visitedSeparator.RawKind == 0) {
                            throw new System.InvalidOperationException(CSharpResources.SeparatorIsExpected);
                        }
                        alternate.AddSeparator(visitedSeparator);
                    }
                    else {
                        if (visitedNode == null) {
                            throw new System.InvalidOperationException(CSharpResources.ElementIsExpected);
                        }
                    }
                }
            }
            if (i < count) {
                var node = list.$get$(i);
                var visitedNode = this.VisitListElement_1414(node);
                if (alternate.IsNull) {
                    if (node != visitedNode) {
                        alternate = new Syntax.SeparatedSyntaxListBuilder<TNode>().ctor_8478(count);
                        alternate.AddRange_9097(list, i);
                    }
                }
                if (!alternate.IsNull && visitedNode != null) {
                    alternate.Add(visitedNode);
                }
            }
            if (!alternate.IsNull) {
                return alternate.ToList_1421();
            }
            return list;
        }
        public VisitListSeparator(separator: SyntaxToken): SyntaxToken {
            return this.VisitToken(separator);
        }
        public VisitList_2127(list: SyntaxTokenList): SyntaxTokenList {
            var alternate: Syntax.SyntaxTokenListBuilder = null;
            var count = list.Count;
            var index = -1;
            // for each
            var itemEnumerator = list.GetEnumerator();
            try {
                while (itemEnumerator.MoveNext()) {
                    var item = itemEnumerator.Current;
                    // foreach block
                    index++;
                    var visited = this.VisitToken(item);
                    if (item.op_Inequality(visited) && alternate == null) {
                        alternate = new Syntax.SyntaxTokenListBuilder().ctor_9494(count);
                        alternate.Add_1909(list, 0, index);
                    }
                    if (alternate != null && CSharpExtensions.CSharpKind_1238(visited) != SyntaxKind.None) {
                        alternate.Add_1167(visited);
                    }
                }
            } finally {
                if (itemEnumerator !== null) itemEnumerator.Dispose();

            }    
            // end foreach
            if (alternate != null) {
                return alternate.ToList();
            }
            return list;
        }
        public VisitList_8614(list: SyntaxTriviaList): SyntaxTriviaList {
            var count = list.Count;
            if (count != 0) {
                var alternate: Syntax.SyntaxTriviaListBuilder = null;
                var index = -1;
                // for each
                var itemEnumerator = list.GetEnumerator();
                try {
                    while (itemEnumerator.MoveNext()) {
                        var item = itemEnumerator.Current;
                        // foreach block
                        index++;
                        var visited = this.VisitListElement_1457(item);
                        if (visited.op_Inequality(item) && alternate == null) {
                            alternate = new Syntax.SyntaxTriviaListBuilder().ctor_9798(count);
                            alternate.Add_5102(list, 0, index);
                        }
                        if (alternate != null && CSharpExtensions.CSharpKind_4438(visited) != SyntaxKind.None) {
                            alternate.Add_1150(visited);
                        }
                    }
                } finally {
                    if (itemEnumerator !== null) itemEnumerator.Dispose();

                }    
                // end foreach
                if (alternate != null) {
                    return alternate.ToList();
                }
            }
            return list;
        }
        public VisitListElement_1457(element: SyntaxTrivia): SyntaxTrivia {
            return this.VisitTrivia(element);
        }
      

        public VisitIdentifierName(node: Syntax.IdentifierNameSyntax): SyntaxNode {
            var identifier = this.VisitToken(node.Identifier);
            return node.Update(identifier);
        }
        public VisitQualifiedName(node: Syntax.QualifiedNameSyntax): SyntaxNode {
            var left = <Syntax.NameSyntax>this.Visit(node.Left);
            var dotToken = this.VisitToken(node.DotToken);
            var right = <Syntax.SimpleNameSyntax>this.Visit(node.Right);
            return node.Update(left, dotToken, right);
        }
        public VisitGenericName(node: Syntax.GenericNameSyntax): SyntaxNode {
            var identifier = this.VisitToken(node.Identifier);
            var typeArgumentList = <Syntax.TypeArgumentListSyntax>this.Visit(node.TypeArgumentList);
            return node.Update(identifier, typeArgumentList);
        }
        public VisitTypeArgumentList(node: Syntax.TypeArgumentListSyntax): SyntaxNode {
            var lessThanToken = this.VisitToken(node.LessThanToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var greaterThanToken = this.VisitToken(node.GreaterThanToken);
            return node.Update(lessThanToken, arguments, greaterThanToken);
        }
        public VisitAliasQualifiedName(node: Syntax.AliasQualifiedNameSyntax): SyntaxNode {
            var alias = <Syntax.IdentifierNameSyntax>this.Visit(node.Alias);
            var colonColonToken = this.VisitToken(node.ColonColonToken);
            var name = <Syntax.SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(alias, colonColonToken, name);
        }
        public VisitPredefinedType(node: Syntax.PredefinedTypeSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            return node.Update(keyword);
        }
        public VisitArrayType(node: Syntax.ArrayTypeSyntax): SyntaxNode {
            var elementType = <Syntax.TypeSyntax>this.Visit(node.ElementType);
            var rankSpecifiers = this.VisitList_1459(node.RankSpecifiers);
            return node.Update(elementType, rankSpecifiers);
        }
        public VisitArrayRankSpecifier(node: Syntax.ArrayRankSpecifierSyntax): SyntaxNode {
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var sizes = this.VisitList_2124(node.Sizes);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            return node.Update(openBracketToken, sizes, closeBracketToken);
        }
        public VisitPointerType(node: Syntax.PointerTypeSyntax): SyntaxNode {
            var elementType = <Syntax.TypeSyntax>this.Visit(node.ElementType);
            var asteriskToken = this.VisitToken(node.AsteriskToken);
            return node.Update(elementType, asteriskToken);
        }
        public VisitNullableType(node: Syntax.NullableTypeSyntax): SyntaxNode {
            var elementType = <Syntax.TypeSyntax>this.Visit(node.ElementType);
            var questionToken = this.VisitToken(node.QuestionToken);
            return node.Update(elementType, questionToken);
        }
        public VisitOmittedTypeArgument(node: Syntax.OmittedTypeArgumentSyntax): SyntaxNode {
            var omittedTypeArgumentToken = this.VisitToken(node.OmittedTypeArgumentToken);
            return node.Update(omittedTypeArgumentToken);
        }
        public VisitParenthesizedExpression(node: Syntax.ParenthesizedExpressionSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, expression, closeParenToken);
        }
        public VisitPrefixUnaryExpression(node: Syntax.PrefixUnaryExpressionSyntax): SyntaxNode {
            var operatorToken = this.VisitToken(node.OperatorToken);
            var operand = <Syntax.ExpressionSyntax>this.Visit(node.Operand);
            return node.Update(operatorToken, operand);
        }
        public VisitAwaitExpression(node: Syntax.AwaitExpressionSyntax): SyntaxNode {
            var awaitKeyword = this.VisitToken(node.AwaitKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(awaitKeyword, expression);
        }
        public VisitPostfixUnaryExpression(node: Syntax.PostfixUnaryExpressionSyntax): SyntaxNode {
            var operand = <Syntax.ExpressionSyntax>this.Visit(node.Operand);
            var operatorToken = this.VisitToken(node.OperatorToken);
            return node.Update(operand, operatorToken);
        }
        public VisitMemberAccessExpression(node: Syntax.MemberAccessExpressionSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var name = <Syntax.SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(expression, operatorToken, name);
        }
        public VisitConditionalAccessExpression(node: Syntax.ConditionalAccessExpressionSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var whenNotNull = <Syntax.ExpressionSyntax>this.Visit(node.WhenNotNull);
            return node.Update(expression, operatorToken, whenNotNull);
        }
        public VisitMemberBindingExpression(node: Syntax.MemberBindingExpressionSyntax): SyntaxNode {
            var operatorToken = this.VisitToken(node.OperatorToken);
            var name = <Syntax.SimpleNameSyntax>this.Visit(node.Name);
            return node.Update(operatorToken, name);
        }
        public VisitElementBindingExpression(node: Syntax.ElementBindingExpressionSyntax): SyntaxNode {
            var argumentList = <Syntax.BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(argumentList);
        }
        public VisitImplicitElementAccess(node: Syntax.ImplicitElementAccessSyntax): SyntaxNode {
            var argumentList = <Syntax.BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(argumentList);
        }
        public VisitBinaryExpression(node: Syntax.BinaryExpressionSyntax): SyntaxNode {
            var left = <Syntax.ExpressionSyntax>this.Visit(node.Left);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var right = <Syntax.ExpressionSyntax>this.Visit(node.Right);
            return node.Update(left, operatorToken, right);
        }
        public VisitAssignmentExpression(node: Syntax.AssignmentExpressionSyntax): SyntaxNode {
            var left = <Syntax.ExpressionSyntax>this.Visit(node.Left);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var right = <Syntax.ExpressionSyntax>this.Visit(node.Right);
            return node.Update(left, operatorToken, right);
        }
        public VisitConditionalExpression(node: Syntax.ConditionalExpressionSyntax): SyntaxNode {
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var questionToken = this.VisitToken(node.QuestionToken);
            var whenTrue = <Syntax.ExpressionSyntax>this.Visit(node.WhenTrue);
            var colonToken = this.VisitToken(node.ColonToken);
            var whenFalse = <Syntax.ExpressionSyntax>this.Visit(node.WhenFalse);
            return node.Update(condition, questionToken, whenTrue, colonToken, whenFalse);
        }
        public VisitThisExpression(node: Syntax.ThisExpressionSyntax): SyntaxNode {
            var token = this.VisitToken(node.Token);
            return node.Update(token);
        }
        public VisitBaseExpression(node: Syntax.BaseExpressionSyntax): SyntaxNode {
            var token = this.VisitToken(node.Token);
            return node.Update(token);
        }
        public VisitLiteralExpression(node: Syntax.LiteralExpressionSyntax): SyntaxNode {
            var token = this.VisitToken(node.Token);
            return node.Update(token);
        }
        public VisitMakeRefExpression(node: Syntax.MakeRefExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitRefTypeExpression(node: Syntax.RefTypeExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitRefValueExpression(node: Syntax.RefValueExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var comma = this.VisitToken(node.Comma);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, comma, type, closeParenToken);
        }
        public VisitCheckedExpression(node: Syntax.CheckedExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, expression, closeParenToken);
        }
        public VisitDefaultExpression(node: Syntax.DefaultExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitTypeOfExpression(node: Syntax.TypeOfExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitSizeOfExpression(node: Syntax.SizeOfExpressionSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(keyword, openParenToken, type, closeParenToken);
        }
        public VisitInvocationExpression(node: Syntax.InvocationExpressionSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var argumentList = <Syntax.ArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(expression, argumentList);
        }
        public VisitElementAccessExpression(node: Syntax.ElementAccessExpressionSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var argumentList = <Syntax.BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(expression, argumentList);
        }
        public VisitArgumentList(node: Syntax.ArgumentListSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, arguments, closeParenToken);
        }
        public VisitBracketedArgumentList(node: Syntax.BracketedArgumentListSyntax): SyntaxNode {
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            return node.Update(openBracketToken, arguments, closeBracketToken);
        }
        public VisitArgument(node: Syntax.ArgumentSyntax): SyntaxNode {
            var nameColon = <Syntax.NameColonSyntax>this.Visit(node.NameColon);
            var refOrOutKeyword = this.VisitToken(node.RefOrOutKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameColon, refOrOutKeyword, expression);
        }
        public VisitNameColon(node: Syntax.NameColonSyntax): SyntaxNode {
            var name = <Syntax.IdentifierNameSyntax>this.Visit(node.Name);
            var colonToken = this.VisitToken(node.ColonToken);
            return node.Update(name, colonToken);
        }
        public VisitCastExpression(node: Syntax.CastExpressionSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(openParenToken, type, closeParenToken, expression);
        }
        public VisitAnonymousMethodExpression(node: Syntax.AnonymousMethodExpressionSyntax): SyntaxNode {
            var asyncKeyword = this.VisitToken(node.AsyncKeyword);
            var delegateKeyword = this.VisitToken(node.DelegateKeyword);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            return node.Update(asyncKeyword, delegateKeyword, parameterList, block);
        }
        public VisitSimpleLambdaExpression(node: Syntax.SimpleLambdaExpressionSyntax): SyntaxNode {
            var asyncKeyword = this.VisitToken(node.AsyncKeyword);
            var parameter = <Syntax.ParameterSyntax>this.Visit(node.Parameter);
            var arrowToken = this.VisitToken(node.ArrowToken);
            var body = <CSharpSyntaxNode>this.Visit(node.Body);
            return node.Update(asyncKeyword, parameter, arrowToken, body);
        }
        public VisitParenthesizedLambdaExpression(node: Syntax.ParenthesizedLambdaExpressionSyntax): SyntaxNode {
            var asyncKeyword = this.VisitToken(node.AsyncKeyword);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var arrowToken = this.VisitToken(node.ArrowToken);
            var body = <CSharpSyntaxNode>this.Visit(node.Body);
            return node.Update(asyncKeyword, parameterList, arrowToken, body);
        }
        public VisitInitializerExpression(node: Syntax.InitializerExpressionSyntax): SyntaxNode {
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var expressions = this.VisitList_2124(node.Expressions);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            return node.Update(openBraceToken, expressions, closeBraceToken);
        }
        public VisitObjectCreationExpression(node: Syntax.ObjectCreationExpressionSyntax): SyntaxNode {
            var newKeyword = this.VisitToken(node.NewKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var argumentList = <Syntax.ArgumentListSyntax>this.Visit(node.ArgumentList);
            var initializer = <Syntax.InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, type, argumentList, initializer);
        }
        public VisitAnonymousObjectMemberDeclarator(node: Syntax.AnonymousObjectMemberDeclaratorSyntax): SyntaxNode {
            var nameEquals = <Syntax.NameEqualsSyntax>this.Visit(node.NameEquals);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameEquals, expression);
        }
        public VisitAnonymousObjectCreationExpression(node: Syntax.AnonymousObjectCreationExpressionSyntax): SyntaxNode {
            var newKeyword = this.VisitToken(node.NewKeyword);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var initializers = this.VisitList_2124(node.Initializers);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            return node.Update(newKeyword, openBraceToken, initializers, closeBraceToken);
        }
        public VisitArrayCreationExpression(node: Syntax.ArrayCreationExpressionSyntax): SyntaxNode {
            var newKeyword = this.VisitToken(node.NewKeyword);
            var type = <Syntax.ArrayTypeSyntax>this.Visit(node.Type);
            var initializer = <Syntax.InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, type, initializer);
        }
        public VisitImplicitArrayCreationExpression(node: Syntax.ImplicitArrayCreationExpressionSyntax): SyntaxNode {
            var newKeyword = this.VisitToken(node.NewKeyword);
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var commas = this.VisitList_2127(node.Commas);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            var initializer = <Syntax.InitializerExpressionSyntax>this.Visit(node.Initializer);
            return node.Update(newKeyword, openBracketToken, commas, closeBracketToken, initializer);
        }
        public VisitStackAllocArrayCreationExpression(node: Syntax.StackAllocArrayCreationExpressionSyntax): SyntaxNode {
            var stackAllocKeyword = this.VisitToken(node.StackAllocKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(stackAllocKeyword, type);
        }
        public VisitQueryExpression(node: Syntax.QueryExpressionSyntax): SyntaxNode {
            var fromClause = <Syntax.FromClauseSyntax>this.Visit(node.FromClause);
            var body = <Syntax.QueryBodySyntax>this.Visit(node.Body);
            return node.Update(fromClause, body);
        }
        public VisitQueryBody(node: Syntax.QueryBodySyntax): SyntaxNode {
            var clauses = this.VisitList_1459(node.Clauses);
            var selectOrGroup = <Syntax.SelectOrGroupClauseSyntax>this.Visit(node.SelectOrGroup);
            var continuation = <Syntax.QueryContinuationSyntax>this.Visit(node.Continuation);
            return node.Update(clauses, selectOrGroup, continuation);
        }
        public VisitFromClause(node: Syntax.FromClauseSyntax): SyntaxNode {
            var fromKeyword = this.VisitToken(node.FromKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var identifier = this.VisitToken(node.Identifier);
            var inKeyword = this.VisitToken(node.InKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(fromKeyword, type, identifier, inKeyword, expression);
        }
        public VisitLetClause(node: Syntax.LetClauseSyntax): SyntaxNode {
            var letKeyword = this.VisitToken(node.LetKeyword);
            var identifier = this.VisitToken(node.Identifier);
            var equalsToken = this.VisitToken(node.EqualsToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(letKeyword, identifier, equalsToken, expression);
        }
        public VisitJoinClause(node: Syntax.JoinClauseSyntax): SyntaxNode {
            var joinKeyword = this.VisitToken(node.JoinKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var identifier = this.VisitToken(node.Identifier);
            var inKeyword = this.VisitToken(node.InKeyword);
            var inExpression = <Syntax.ExpressionSyntax>this.Visit(node.InExpression);
            var onKeyword = this.VisitToken(node.OnKeyword);
            var leftExpression = <Syntax.ExpressionSyntax>this.Visit(node.LeftExpression);
            var equalsKeyword = this.VisitToken(node.EqualsKeyword);
            var rightExpression = <Syntax.ExpressionSyntax>this.Visit(node.RightExpression);
            var into = <Syntax.JoinIntoClauseSyntax>this.Visit(node.Into);
            return node.Update(joinKeyword, type, identifier, inKeyword, inExpression, onKeyword, leftExpression, equalsKeyword, rightExpression, into);
        }
        public VisitJoinIntoClause(node: Syntax.JoinIntoClauseSyntax): SyntaxNode {
            var intoKeyword = this.VisitToken(node.IntoKeyword);
            var identifier = this.VisitToken(node.Identifier);
            return node.Update(intoKeyword, identifier);
        }
        public VisitWhereClause(node: Syntax.WhereClauseSyntax): SyntaxNode {
            var whereKeyword = this.VisitToken(node.WhereKeyword);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            return node.Update(whereKeyword, condition);
        }
        public VisitOrderByClause(node: Syntax.OrderByClauseSyntax): SyntaxNode {
            var orderByKeyword = this.VisitToken(node.OrderByKeyword);
            var orderings = this.VisitList_2124(node.Orderings);
            return node.Update(orderByKeyword, orderings);
        }
        public VisitOrdering(node: Syntax.OrderingSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var ascendingOrDescendingKeyword = this.VisitToken(node.AscendingOrDescendingKeyword);
            return node.Update(expression, ascendingOrDescendingKeyword);
        }
        public VisitSelectClause(node: Syntax.SelectClauseSyntax): SyntaxNode {
            var selectKeyword = this.VisitToken(node.SelectKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(selectKeyword, expression);
        }
        public VisitGroupClause(node: Syntax.GroupClauseSyntax): SyntaxNode {
            var groupKeyword = this.VisitToken(node.GroupKeyword);
            var groupExpression = <Syntax.ExpressionSyntax>this.Visit(node.GroupExpression);
            var byKeyword = this.VisitToken(node.ByKeyword);
            var byExpression = <Syntax.ExpressionSyntax>this.Visit(node.ByExpression);
            return node.Update(groupKeyword, groupExpression, byKeyword, byExpression);
        }
        public VisitQueryContinuation(node: Syntax.QueryContinuationSyntax): SyntaxNode {
            var intoKeyword = this.VisitToken(node.IntoKeyword);
            var identifier = this.VisitToken(node.Identifier);
            var body = <Syntax.QueryBodySyntax>this.Visit(node.Body);
            return node.Update(intoKeyword, identifier, body);
        }
        public VisitOmittedArraySizeExpression(node: Syntax.OmittedArraySizeExpressionSyntax): SyntaxNode {
            var omittedArraySizeExpressionToken = this.VisitToken(node.OmittedArraySizeExpressionToken);
            return node.Update(omittedArraySizeExpressionToken);
        }
        public VisitGlobalStatement(node: Syntax.GlobalStatementSyntax): SyntaxNode {
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(statement);
        }
        public VisitBlock(node: Syntax.BlockSyntax): SyntaxNode {
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var statements = this.VisitList_1459(node.Statements);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            return node.Update(openBraceToken, statements, closeBraceToken);
        }
        public VisitLocalDeclarationStatement(node: Syntax.LocalDeclarationStatementSyntax): SyntaxNode {
            var modifiers = this.VisitList_2127(node.Modifiers);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(modifiers, declaration, semicolonToken);
        }
        public VisitVariableDeclaration(node: Syntax.VariableDeclarationSyntax): SyntaxNode {
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var variables = this.VisitList_2124(node.Variables);
            return node.Update(type, variables);
        }
        public VisitVariableDeclarator(node: Syntax.VariableDeclaratorSyntax): SyntaxNode {
            var identifier = this.VisitToken(node.Identifier);
            var argumentList = <Syntax.BracketedArgumentListSyntax>this.Visit(node.ArgumentList);
            var initializer = <Syntax.EqualsValueClauseSyntax>this.Visit(node.Initializer);
            return node.Update(identifier, argumentList, initializer);
        }
        public VisitEqualsValueClause(node: Syntax.EqualsValueClauseSyntax): SyntaxNode {
            var equalsToken = this.VisitToken(node.EqualsToken);
            var value = <Syntax.ExpressionSyntax>this.Visit(node.Value);
            return node.Update(equalsToken, value);
        }
        public VisitExpressionStatement(node: Syntax.ExpressionStatementSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(expression, semicolonToken);
        }
        public VisitEmptyStatement(node: Syntax.EmptyStatementSyntax): SyntaxNode {
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(semicolonToken);
        }
        public VisitLabeledStatement(node: Syntax.LabeledStatementSyntax): SyntaxNode {
            var identifier = this.VisitToken(node.Identifier);
            var colonToken = this.VisitToken(node.ColonToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(identifier, colonToken, statement);
        }
        public VisitGotoStatement(node: Syntax.GotoStatementSyntax): SyntaxNode {
            var gotoKeyword = this.VisitToken(node.GotoKeyword);
            var caseOrDefaultKeyword = this.VisitToken(node.CaseOrDefaultKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(gotoKeyword, caseOrDefaultKeyword, expression, semicolonToken);
        }
        public VisitBreakStatement(node: Syntax.BreakStatementSyntax): SyntaxNode {
            var breakKeyword = this.VisitToken(node.BreakKeyword);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(breakKeyword, semicolonToken);
        }
        public VisitContinueStatement(node: Syntax.ContinueStatementSyntax): SyntaxNode {
            var continueKeyword = this.VisitToken(node.ContinueKeyword);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(continueKeyword, semicolonToken);
        }
        public VisitReturnStatement(node: Syntax.ReturnStatementSyntax): SyntaxNode {
            var returnKeyword = this.VisitToken(node.ReturnKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(returnKeyword, expression, semicolonToken);
        }
        public VisitThrowStatement(node: Syntax.ThrowStatementSyntax): SyntaxNode {
            var throwKeyword = this.VisitToken(node.ThrowKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(throwKeyword, expression, semicolonToken);
        }
        public VisitYieldStatement(node: Syntax.YieldStatementSyntax): SyntaxNode {
            var yieldKeyword = this.VisitToken(node.YieldKeyword);
            var returnOrBreakKeyword = this.VisitToken(node.ReturnOrBreakKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(yieldKeyword, returnOrBreakKeyword, expression, semicolonToken);
        }
        public VisitWhileStatement(node: Syntax.WhileStatementSyntax): SyntaxNode {
            var whileKeyword = this.VisitToken(node.WhileKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(whileKeyword, openParenToken, condition, closeParenToken, statement);
        }
        public VisitDoStatement(node: Syntax.DoStatementSyntax): SyntaxNode {
            var doKeyword = this.VisitToken(node.DoKeyword);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            var whileKeyword = this.VisitToken(node.WhileKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken);
        }
        public VisitForStatement(node: Syntax.ForStatementSyntax): SyntaxNode {
            var forKeyword = this.VisitToken(node.ForKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var initializers = this.VisitList_2124(node.Initializers);
            var firstSemicolonToken = this.VisitToken(node.FirstSemicolonToken);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var secondSemicolonToken = this.VisitToken(node.SecondSemicolonToken);
            var incrementors = this.VisitList_2124(node.Incrementors);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(forKeyword, openParenToken, declaration, initializers, firstSemicolonToken, condition, secondSemicolonToken, incrementors, closeParenToken, statement);
        }
        public VisitForEachStatement(node: Syntax.ForEachStatementSyntax): SyntaxNode {
            var forEachKeyword = this.VisitToken(node.ForEachKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var identifier = this.VisitToken(node.Identifier);
            var inKeyword = this.VisitToken(node.InKeyword);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(forEachKeyword, openParenToken, type, identifier, inKeyword, expression, closeParenToken, statement);
        }
        public VisitUsingStatement(node: Syntax.UsingStatementSyntax): SyntaxNode {
            var usingKeyword = this.VisitToken(node.UsingKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(usingKeyword, openParenToken, declaration, expression, closeParenToken, statement);
        }
        public VisitFixedStatement(node: Syntax.FixedStatementSyntax): SyntaxNode {
            var fixedKeyword = this.VisitToken(node.FixedKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(fixedKeyword, openParenToken, declaration, closeParenToken, statement);
        }
        public VisitCheckedStatement(node: Syntax.CheckedStatementSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            return node.Update(keyword, block);
        }
        public VisitUnsafeStatement(node: Syntax.UnsafeStatementSyntax): SyntaxNode {
            var unsafeKeyword = this.VisitToken(node.UnsafeKeyword);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            return node.Update(unsafeKeyword, block);
        }
        public VisitLockStatement(node: Syntax.LockStatementSyntax): SyntaxNode {
            var lockKeyword = this.VisitToken(node.LockKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(lockKeyword, openParenToken, expression, closeParenToken, statement);
        }
        public VisitIfStatement(node: Syntax.IfStatementSyntax): SyntaxNode {
            var ifKeyword = this.VisitToken(node.IfKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            var $else = <Syntax.ElseClauseSyntax>this.Visit(node.Else);
            return node.Update(ifKeyword, openParenToken, condition, closeParenToken, statement, $else);
        }
        public VisitElseClause(node: Syntax.ElseClauseSyntax): SyntaxNode {
            var elseKeyword = this.VisitToken(node.ElseKeyword);
            var statement = <Syntax.StatementSyntax>this.Visit(node.Statement);
            return node.Update(elseKeyword, statement);
        }
        public VisitSwitchStatement(node: Syntax.SwitchStatementSyntax): SyntaxNode {
            var switchKeyword = this.VisitToken(node.SwitchKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var sections = this.VisitList_1459(node.Sections);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            return node.Update(switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, sections, closeBraceToken);
        }
        public VisitSwitchSection(node: Syntax.SwitchSectionSyntax): SyntaxNode {
            var labels = this.VisitList_1459(node.Labels);
            var statements = this.VisitList_1459(node.Statements);
            return node.Update(labels, statements);
        }
        public VisitCaseSwitchLabel(node: Syntax.CaseSwitchLabelSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var value = <Syntax.ExpressionSyntax>this.Visit(node.Value);
            var colonToken = this.VisitToken(node.ColonToken);
            return node.Update(keyword, value, colonToken);
        }
        public VisitDefaultSwitchLabel(node: Syntax.DefaultSwitchLabelSyntax): SyntaxNode {
            var keyword = this.VisitToken(node.Keyword);
            var colonToken = this.VisitToken(node.ColonToken);
            return node.Update(keyword, colonToken);
        }
        public VisitTryStatement(node: Syntax.TryStatementSyntax): SyntaxNode {
            var tryKeyword = this.VisitToken(node.TryKeyword);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            var catches = this.VisitList_1459(node.Catches);
            var $finally = <Syntax.FinallyClauseSyntax>this.Visit(node.Finally);
            return node.Update(tryKeyword, block, catches, $finally);
        }
        public VisitCatchClause(node: Syntax.CatchClauseSyntax): SyntaxNode {
            var catchKeyword = this.VisitToken(node.CatchKeyword);
            var declaration = <Syntax.CatchDeclarationSyntax>this.Visit(node.Declaration);
            var filter = <Syntax.CatchFilterClauseSyntax>this.Visit(node.Filter);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            return node.Update(catchKeyword, declaration, filter, block);
        }
        public VisitCatchDeclaration(node: Syntax.CatchDeclarationSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var identifier = this.VisitToken(node.Identifier);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, type, identifier, closeParenToken);
        }
        public VisitCatchFilterClause(node: Syntax.CatchFilterClauseSyntax): SyntaxNode {
            var ifKeyword = this.VisitToken(node.IfKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var filterExpression = <Syntax.ExpressionSyntax>this.Visit(node.FilterExpression);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(ifKeyword, openParenToken, filterExpression, closeParenToken);
        }
        public VisitFinallyClause(node: Syntax.FinallyClauseSyntax): SyntaxNode {
            var finallyKeyword = this.VisitToken(node.FinallyKeyword);
            var block = <Syntax.BlockSyntax>this.Visit(node.Block);
            return node.Update(finallyKeyword, block);
        }
        public VisitCompilationUnit(node: Syntax.CompilationUnitSyntax): SyntaxNode {
            var externs = this.VisitList_1459(node.Externs);
            var usings = this.VisitList_1459(node.Usings);
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var members = this.VisitList_1459(node.Members);
            var endOfFileToken = this.VisitToken(node.EndOfFileToken);
            return node.Update(externs, usings, attributeLists, members, endOfFileToken);
        }
        public VisitExternAliasDirective(node: Syntax.ExternAliasDirectiveSyntax): SyntaxNode {
            var externKeyword = this.VisitToken(node.ExternKeyword);
            var aliasKeyword = this.VisitToken(node.AliasKeyword);
            var identifier = this.VisitToken(node.Identifier);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(externKeyword, aliasKeyword, identifier, semicolonToken);
        }
        public VisitUsingDirective(node: Syntax.UsingDirectiveSyntax): SyntaxNode {
            var usingKeyword = this.VisitToken(node.UsingKeyword);
            var staticKeyword = this.VisitToken(node.StaticKeyword);
            var alias = <Syntax.NameEqualsSyntax>this.Visit(node.Alias);
            var name = <Syntax.NameSyntax>this.Visit(node.Name);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(usingKeyword, staticKeyword, alias, name, semicolonToken);
        }
        public VisitNamespaceDeclaration(node: Syntax.NamespaceDeclarationSyntax): SyntaxNode {
            var namespaceKeyword = this.VisitToken(node.NamespaceKeyword);
            var name = <Syntax.NameSyntax>this.Visit(node.Name);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var externs = this.VisitList_1459(node.Externs);
            var usings = this.VisitList_1459(node.Usings);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(namespaceKeyword, name, openBraceToken, externs, usings, members, closeBraceToken, semicolonToken);
        }
        public VisitAttributeList(node: Syntax.AttributeListSyntax): SyntaxNode {
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var target = <Syntax.AttributeTargetSpecifierSyntax>this.Visit(node.Target);
            var attributes = this.VisitList_2124(node.Attributes);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            return node.Update(openBracketToken, target, attributes, closeBracketToken);
        }
        public VisitAttributeTargetSpecifier(node: Syntax.AttributeTargetSpecifierSyntax): SyntaxNode {
            var identifier = this.VisitToken(node.Identifier);
            var colonToken = this.VisitToken(node.ColonToken);
            return node.Update(identifier, colonToken);
        }
        public VisitAttribute(node: Syntax.AttributeSyntax): SyntaxNode {
            var name = <Syntax.NameSyntax>this.Visit(node.Name);
            var argumentList = <Syntax.AttributeArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(name, argumentList);
        }
        public VisitAttributeArgumentList(node: Syntax.AttributeArgumentListSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var arguments = this.VisitList_2124(node.Arguments);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, arguments, closeParenToken);
        }
        public VisitAttributeArgument(node: Syntax.AttributeArgumentSyntax): SyntaxNode {
            var nameEquals = <Syntax.NameEqualsSyntax>this.Visit(node.NameEquals);
            var nameColon = <Syntax.NameColonSyntax>this.Visit(node.NameColon);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(nameEquals, nameColon, expression);
        }
        public VisitNameEquals(node: Syntax.NameEqualsSyntax): SyntaxNode {
            var name = <Syntax.IdentifierNameSyntax>this.Visit(node.Name);
            var equalsToken = this.VisitToken(node.EqualsToken);
            return node.Update(name, equalsToken);
        }
        public VisitTypeParameterList(node: Syntax.TypeParameterListSyntax): SyntaxNode {
            var lessThanToken = this.VisitToken(node.LessThanToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var greaterThanToken = this.VisitToken(node.GreaterThanToken);
            return node.Update(lessThanToken, parameters, greaterThanToken);
        }
        public VisitTypeParameter(node: Syntax.TypeParameterSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var varianceKeyword = this.VisitToken(node.VarianceKeyword);
            var identifier = this.VisitToken(node.Identifier);
            return node.Update(attributeLists, varianceKeyword, identifier);
        }
        public VisitClassDeclaration(node: Syntax.ClassDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var keyword = this.VisitToken(node.Keyword);
            var identifier = this.VisitToken(node.Identifier);
            var typeParameterList = <Syntax.TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <Syntax.BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitStructDeclaration(node: Syntax.StructDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var keyword = this.VisitToken(node.Keyword);
            var identifier = this.VisitToken(node.Identifier);
            var typeParameterList = <Syntax.TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <Syntax.BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitInterfaceDeclaration(node: Syntax.InterfaceDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var keyword = this.VisitToken(node.Keyword);
            var identifier = this.VisitToken(node.Identifier);
            var typeParameterList = <Syntax.TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var baseList = <Syntax.BaseListSyntax>this.Visit(node.BaseList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var members = this.VisitList_1459(node.Members);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitEnumDeclaration(node: Syntax.EnumDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var enumKeyword = this.VisitToken(node.EnumKeyword);
            var identifier = this.VisitToken(node.Identifier);
            var baseList = <Syntax.BaseListSyntax>this.Visit(node.BaseList);
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var members = this.VisitList_2124(node.Members);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, enumKeyword, identifier, baseList, openBraceToken, members, closeBraceToken, semicolonToken);
        }
        public VisitDelegateDeclaration(node: Syntax.DelegateDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var delegateKeyword = this.VisitToken(node.DelegateKeyword);
            var returnType = <Syntax.TypeSyntax>this.Visit(node.ReturnType);
            var identifier = this.VisitToken(node.Identifier);
            var typeParameterList = <Syntax.TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, delegateKeyword, returnType, identifier, typeParameterList, parameterList, constraintClauses, semicolonToken);
        }
        public VisitEnumMemberDeclaration(node: Syntax.EnumMemberDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var identifier = this.VisitToken(node.Identifier);
            var equalsValue = <Syntax.EqualsValueClauseSyntax>this.Visit(node.EqualsValue);
            return node.Update(attributeLists, identifier, equalsValue);
        }
        public VisitBaseList(node: Syntax.BaseListSyntax): SyntaxNode {
            var colonToken = this.VisitToken(node.ColonToken);
            var types = this.VisitList_2124(node.Types);
            return node.Update(colonToken, types);
        }
        public VisitSimpleBaseType(node: Syntax.SimpleBaseTypeSyntax): SyntaxNode {
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitTypeParameterConstraintClause(node: Syntax.TypeParameterConstraintClauseSyntax): SyntaxNode {
            var whereKeyword = this.VisitToken(node.WhereKeyword);
            var name = <Syntax.IdentifierNameSyntax>this.Visit(node.Name);
            var colonToken = this.VisitToken(node.ColonToken);
            var constraints = this.VisitList_2124(node.Constraints);
            return node.Update(whereKeyword, name, colonToken, constraints);
        }
        public VisitConstructorConstraint(node: Syntax.ConstructorConstraintSyntax): SyntaxNode {
            var newKeyword = this.VisitToken(node.NewKeyword);
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(newKeyword, openParenToken, closeParenToken);
        }
        public VisitClassOrStructConstraint(node: Syntax.ClassOrStructConstraintSyntax): SyntaxNode {
            var classOrStructKeyword = this.VisitToken(node.ClassOrStructKeyword);
            return node.Update(classOrStructKeyword);
        }
        public VisitTypeConstraint(node: Syntax.TypeConstraintSyntax): SyntaxNode {
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitFieldDeclaration(node: Syntax.FieldDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, declaration, semicolonToken);
        }
        public VisitEventFieldDeclaration(node: Syntax.EventFieldDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var eventKeyword = this.VisitToken(node.EventKeyword);
            var declaration = <Syntax.VariableDeclarationSyntax>this.Visit(node.Declaration);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, eventKeyword, declaration, semicolonToken);
        }
        public VisitExplicitInterfaceSpecifier(node: Syntax.ExplicitInterfaceSpecifierSyntax): SyntaxNode {
            var name = <Syntax.NameSyntax>this.Visit(node.Name);
            var dotToken = this.VisitToken(node.DotToken);
            return node.Update(name, dotToken);
        }
        public VisitMethodDeclaration(node: Syntax.MethodDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var returnType = <Syntax.TypeSyntax>this.Visit(node.ReturnType);
            var explicitInterfaceSpecifier = <Syntax.ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = this.VisitToken(node.Identifier);
            var typeParameterList = <Syntax.TypeParameterListSyntax>this.Visit(node.TypeParameterList);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var constraintClauses = this.VisitList_1459(node.ConstraintClauses);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var expressionBody = <Syntax.ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses, body, expressionBody, semicolonToken);
        }
        public VisitOperatorDeclaration(node: Syntax.OperatorDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var returnType = <Syntax.TypeSyntax>this.Visit(node.ReturnType);
            var operatorKeyword = this.VisitToken(node.OperatorKeyword);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var expressionBody = <Syntax.ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, returnType, operatorKeyword, operatorToken, parameterList, body, expressionBody, semicolonToken);
        }
        public VisitConversionOperatorDeclaration(node: Syntax.ConversionOperatorDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var implicitOrExplicitKeyword = this.VisitToken(node.ImplicitOrExplicitKeyword);
            var operatorKeyword = this.VisitToken(node.OperatorKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var expressionBody = <Syntax.ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, implicitOrExplicitKeyword, operatorKeyword, type, parameterList, body, expressionBody, semicolonToken);
        }
        public VisitConstructorDeclaration(node: Syntax.ConstructorDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var identifier = this.VisitToken(node.Identifier);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var initializer = <Syntax.ConstructorInitializerSyntax>this.Visit(node.Initializer);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, identifier, parameterList, initializer, body, semicolonToken);
        }
        public VisitConstructorInitializer(node: Syntax.ConstructorInitializerSyntax): SyntaxNode {
            var colonToken = this.VisitToken(node.ColonToken);
            var thisOrBaseKeyword = this.VisitToken(node.ThisOrBaseKeyword);
            var argumentList = <Syntax.ArgumentListSyntax>this.Visit(node.ArgumentList);
            return node.Update(colonToken, thisOrBaseKeyword, argumentList);
        }
        public VisitDestructorDeclaration(node: Syntax.DestructorDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var tildeToken = this.VisitToken(node.TildeToken);
            var identifier = this.VisitToken(node.Identifier);
            var parameterList = <Syntax.ParameterListSyntax>this.Visit(node.ParameterList);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, tildeToken, identifier, parameterList, body, semicolonToken);
        }
        public VisitPropertyDeclaration(node: Syntax.PropertyDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <Syntax.ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = this.VisitToken(node.Identifier);
            var accessorList = <Syntax.AccessorListSyntax>this.Visit(node.AccessorList);
            var expressionBody = <Syntax.ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var initializer = <Syntax.EqualsValueClauseSyntax>this.Visit(node.Initializer);
            var semicolon = this.VisitToken(node.Semicolon);
            return node.Update(attributeLists, modifiers, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, semicolon);
        }
        public VisitArrowExpressionClause(node: Syntax.ArrowExpressionClauseSyntax): SyntaxNode {
            var arrowToken = this.VisitToken(node.ArrowToken);
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            return node.Update(arrowToken, expression);
        }
        public VisitEventDeclaration(node: Syntax.EventDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var eventKeyword = this.VisitToken(node.EventKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <Syntax.ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var identifier = this.VisitToken(node.Identifier);
            var accessorList = <Syntax.AccessorListSyntax>this.Visit(node.AccessorList);
            return node.Update(attributeLists, modifiers, eventKeyword, type, explicitInterfaceSpecifier, identifier, accessorList);
        }
        public VisitIndexerDeclaration(node: Syntax.IndexerDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var explicitInterfaceSpecifier = <Syntax.ExplicitInterfaceSpecifierSyntax>this.Visit(node.ExplicitInterfaceSpecifier);
            var thisKeyword = this.VisitToken(node.ThisKeyword);
            var parameterList = <Syntax.BracketedParameterListSyntax>this.Visit(node.ParameterList);
            var accessorList = <Syntax.AccessorListSyntax>this.Visit(node.AccessorList);
            var expressionBody = <Syntax.ArrowExpressionClauseSyntax>this.Visit(node.ExpressionBody);
            var semicolon = this.VisitToken(node.Semicolon);
            return node.Update(attributeLists, modifiers, type, explicitInterfaceSpecifier, thisKeyword, parameterList, accessorList, expressionBody, semicolon);
        }
        public VisitAccessorList(node: Syntax.AccessorListSyntax): SyntaxNode {
            var openBraceToken = this.VisitToken(node.OpenBraceToken);
            var accessors = this.VisitList_1459(node.Accessors);
            var closeBraceToken = this.VisitToken(node.CloseBraceToken);
            return node.Update(openBraceToken, accessors, closeBraceToken);
        }
        public VisitAccessorDeclaration(node: Syntax.AccessorDeclarationSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var keyword = this.VisitToken(node.Keyword);
            var body = <Syntax.BlockSyntax>this.Visit(node.Body);
            var semicolonToken = this.VisitToken(node.SemicolonToken);
            return node.Update(attributeLists, modifiers, keyword, body, semicolonToken);
        }
        public VisitParameterList(node: Syntax.ParameterListSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, parameters, closeParenToken);
        }
        public VisitBracketedParameterList(node: Syntax.BracketedParameterListSyntax): SyntaxNode {
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            return node.Update(openBracketToken, parameters, closeBracketToken);
        }
        public VisitParameter(node: Syntax.ParameterSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var identifier = this.VisitToken(node.Identifier);
            var $default = <Syntax.EqualsValueClauseSyntax>this.Visit(node.Default);
            return node.Update(attributeLists, modifiers, type, identifier, $default);
        }
        public VisitIncompleteMember(node: Syntax.IncompleteMemberSyntax): SyntaxNode {
            var attributeLists = this.VisitList_1459(node.AttributeLists);
            var modifiers = this.VisitList_2127(node.Modifiers);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(attributeLists, modifiers, type);
        }
        public VisitSkippedTokensTrivia(node: Syntax.SkippedTokensTriviaSyntax): SyntaxNode {
            var tokens = this.VisitList_2127(node.Tokens);
            return node.Update(tokens);
        }
        public VisitDocumentationCommentTrivia(node: Syntax.DocumentationCommentTriviaSyntax): SyntaxNode {
            var content = this.VisitList_1459(node.Content);
            var endOfComment = this.VisitToken(node.EndOfComment);
            return node.Update(content, endOfComment);
        }
        public VisitTypeCref(node: Syntax.TypeCrefSyntax): SyntaxNode {
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(type);
        }
        public VisitQualifiedCref(node: Syntax.QualifiedCrefSyntax): SyntaxNode {
            var container = <Syntax.TypeSyntax>this.Visit(node.Container);
            var dotToken = this.VisitToken(node.DotToken);
            var member = <Syntax.MemberCrefSyntax>this.Visit(node.Member);
            return node.Update(container, dotToken, member);
        }
        public VisitNameMemberCref(node: Syntax.NameMemberCrefSyntax): SyntaxNode {
            var name = <Syntax.TypeSyntax>this.Visit(node.Name);
            var parameters = <Syntax.CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(name, parameters);
        }
        public VisitIndexerMemberCref(node: Syntax.IndexerMemberCrefSyntax): SyntaxNode {
            var thisKeyword = this.VisitToken(node.ThisKeyword);
            var parameters = <Syntax.CrefBracketedParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(thisKeyword, parameters);
        }
        public VisitOperatorMemberCref(node: Syntax.OperatorMemberCrefSyntax): SyntaxNode {
            var operatorKeyword = this.VisitToken(node.OperatorKeyword);
            var operatorToken = this.VisitToken(node.OperatorToken);
            var parameters = <Syntax.CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(operatorKeyword, operatorToken, parameters);
        }
        public VisitConversionOperatorMemberCref(node: Syntax.ConversionOperatorMemberCrefSyntax): SyntaxNode {
            var implicitOrExplicitKeyword = this.VisitToken(node.ImplicitOrExplicitKeyword);
            var operatorKeyword = this.VisitToken(node.OperatorKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            var parameters = <Syntax.CrefParameterListSyntax>this.Visit(node.Parameters);
            return node.Update(implicitOrExplicitKeyword, operatorKeyword, type, parameters);
        }
        public VisitCrefParameterList(node: Syntax.CrefParameterListSyntax): SyntaxNode {
            var openParenToken = this.VisitToken(node.OpenParenToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeParenToken = this.VisitToken(node.CloseParenToken);
            return node.Update(openParenToken, parameters, closeParenToken);
        }
        public VisitCrefBracketedParameterList(node: Syntax.CrefBracketedParameterListSyntax): SyntaxNode {
            var openBracketToken = this.VisitToken(node.OpenBracketToken);
            var parameters = this.VisitList_2124(node.Parameters);
            var closeBracketToken = this.VisitToken(node.CloseBracketToken);
            return node.Update(openBracketToken, parameters, closeBracketToken);
        }
        public VisitCrefParameter(node: Syntax.CrefParameterSyntax): SyntaxNode {
            var refOrOutKeyword = this.VisitToken(node.RefOrOutKeyword);
            var type = <Syntax.TypeSyntax>this.Visit(node.Type);
            return node.Update(refOrOutKeyword, type);
        }
        public VisitXmlElement(node: Syntax.XmlElementSyntax): SyntaxNode {
            var startTag = <Syntax.XmlElementStartTagSyntax>this.Visit(node.StartTag);
            var content = this.VisitList_1459(node.Content);
            var endTag = <Syntax.XmlElementEndTagSyntax>this.Visit(node.EndTag);
            return node.Update(startTag, content, endTag);
        }
        public VisitXmlElementStartTag(node: Syntax.XmlElementStartTagSyntax): SyntaxNode {
            var lessThanToken = this.VisitToken(node.LessThanToken);
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var attributes = this.VisitList_1459(node.Attributes);
            var greaterThanToken = this.VisitToken(node.GreaterThanToken);
            return node.Update(lessThanToken, name, attributes, greaterThanToken);
        }
        public VisitXmlElementEndTag(node: Syntax.XmlElementEndTagSyntax): SyntaxNode {
            var lessThanSlashToken = this.VisitToken(node.LessThanSlashToken);
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var greaterThanToken = this.VisitToken(node.GreaterThanToken);
            return node.Update(lessThanSlashToken, name, greaterThanToken);
        }
        public VisitXmlEmptyElement(node: Syntax.XmlEmptyElementSyntax): SyntaxNode {
            var lessThanToken = this.VisitToken(node.LessThanToken);
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var attributes = this.VisitList_1459(node.Attributes);
            var slashGreaterThanToken = this.VisitToken(node.SlashGreaterThanToken);
            return node.Update(lessThanToken, name, attributes, slashGreaterThanToken);
        }
        public VisitXmlName(node: Syntax.XmlNameSyntax): SyntaxNode {
            var prefix = <Syntax.XmlPrefixSyntax>this.Visit(node.Prefix);
            var localName = this.VisitToken(node.LocalName);
            return node.Update(prefix, localName);
        }
        public VisitXmlPrefix(node: Syntax.XmlPrefixSyntax): SyntaxNode {
            var prefix = this.VisitToken(node.Prefix);
            var colonToken = this.VisitToken(node.ColonToken);
            return node.Update(prefix, colonToken);
        }
        public VisitXmlTextAttribute(node: Syntax.XmlTextAttributeSyntax): SyntaxNode {
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = this.VisitToken(node.EqualsToken);
            var startQuoteToken = this.VisitToken(node.StartQuoteToken);
            var textTokens = this.VisitList_2127(node.TextTokens);
            var endQuoteToken = this.VisitToken(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, textTokens, endQuoteToken);
        }
        public VisitXmlCrefAttribute(node: Syntax.XmlCrefAttributeSyntax): SyntaxNode {
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = this.VisitToken(node.EqualsToken);
            var startQuoteToken = this.VisitToken(node.StartQuoteToken);
            var cref = <Syntax.CrefSyntax>this.Visit(node.Cref);
            var endQuoteToken = this.VisitToken(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, cref, endQuoteToken);
        }
        public VisitXmlNameAttribute(node: Syntax.XmlNameAttributeSyntax): SyntaxNode {
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var equalsToken = this.VisitToken(node.EqualsToken);
            var startQuoteToken = this.VisitToken(node.StartQuoteToken);
            var identifier = <Syntax.IdentifierNameSyntax>this.Visit(node.Identifier);
            var endQuoteToken = this.VisitToken(node.EndQuoteToken);
            return node.Update(name, equalsToken, startQuoteToken, identifier, endQuoteToken);
        }
        public VisitXmlText(node: Syntax.XmlTextSyntax): SyntaxNode {
            var textTokens = this.VisitList_2127(node.TextTokens);
            return node.Update(textTokens);
        }
        public VisitXmlCDataSection(node: Syntax.XmlCDataSectionSyntax): SyntaxNode {
            var startCDataToken = this.VisitToken(node.StartCDataToken);
            var textTokens = this.VisitList_2127(node.TextTokens);
            var endCDataToken = this.VisitToken(node.EndCDataToken);
            return node.Update(startCDataToken, textTokens, endCDataToken);
        }
        public VisitXmlProcessingInstruction(node: Syntax.XmlProcessingInstructionSyntax): SyntaxNode {
            var startProcessingInstructionToken = this.VisitToken(node.StartProcessingInstructionToken);
            var name = <Syntax.XmlNameSyntax>this.Visit(node.Name);
            var textTokens = this.VisitList_2127(node.TextTokens);
            var endProcessingInstructionToken = this.VisitToken(node.EndProcessingInstructionToken);
            return node.Update(startProcessingInstructionToken, name, textTokens, endProcessingInstructionToken);
        }
        public VisitXmlComment(node: Syntax.XmlCommentSyntax): SyntaxNode {
            var lessThanExclamationMinusMinusToken = this.VisitToken(node.LessThanExclamationMinusMinusToken);
            var textTokens = this.VisitList_2127(node.TextTokens);
            var minusMinusGreaterThanToken = this.VisitToken(node.MinusMinusGreaterThanToken);
            return node.Update(lessThanExclamationMinusMinusToken, textTokens, minusMinusGreaterThanToken);
        }
        public VisitIfDirectiveTrivia(node: Syntax.IfDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var ifKeyword = this.VisitToken(node.IfKeyword);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, ifKeyword, condition, endOfDirectiveToken, node.IsActive, node.BranchTaken, node.ConditionValue);
        }
        public VisitElifDirectiveTrivia(node: Syntax.ElifDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var elifKeyword = this.VisitToken(node.ElifKeyword);
            var condition = <Syntax.ExpressionSyntax>this.Visit(node.Condition);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, elifKeyword, condition, endOfDirectiveToken, node.IsActive, node.BranchTaken, node.ConditionValue);
        }
        public VisitElseDirectiveTrivia(node: Syntax.ElseDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var elseKeyword = this.VisitToken(node.ElseKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, elseKeyword, endOfDirectiveToken, node.IsActive, node.BranchTaken);
        }
        public VisitEndIfDirectiveTrivia(node: Syntax.EndIfDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var endIfKeyword = this.VisitToken(node.EndIfKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, endIfKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitRegionDirectiveTrivia(node: Syntax.RegionDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var regionKeyword = this.VisitToken(node.RegionKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, regionKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitEndRegionDirectiveTrivia(node: Syntax.EndRegionDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var endRegionKeyword = this.VisitToken(node.EndRegionKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, endRegionKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitErrorDirectiveTrivia(node: Syntax.ErrorDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var errorKeyword = this.VisitToken(node.ErrorKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, errorKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitWarningDirectiveTrivia(node: Syntax.WarningDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var warningKeyword = this.VisitToken(node.WarningKeyword);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, warningKeyword, endOfDirectiveToken, node.IsActive);
        }
        public VisitBadDirectiveTrivia(node: Syntax.BadDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var identifier = this.VisitToken(node.Identifier);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, identifier, endOfDirectiveToken, node.IsActive);
        }
        public VisitDefineDirectiveTrivia(node: Syntax.DefineDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var defineKeyword = this.VisitToken(node.DefineKeyword);
            var name = this.VisitToken(node.Name);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, defineKeyword, name, endOfDirectiveToken, node.IsActive);
        }
        public VisitUndefDirectiveTrivia(node: Syntax.UndefDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var undefKeyword = this.VisitToken(node.UndefKeyword);
            var name = this.VisitToken(node.Name);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, undefKeyword, name, endOfDirectiveToken, node.IsActive);
        }
        public VisitLineDirectiveTrivia(node: Syntax.LineDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var lineKeyword = this.VisitToken(node.LineKeyword);
            var line = this.VisitToken(node.Line);
            var file = this.VisitToken(node.File);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, lineKeyword, line, file, endOfDirectiveToken, node.IsActive);
        }
        public VisitPragmaWarningDirectiveTrivia(node: Syntax.PragmaWarningDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var pragmaKeyword = this.VisitToken(node.PragmaKeyword);
            var warningKeyword = this.VisitToken(node.WarningKeyword);
            var disableOrRestoreKeyword = this.VisitToken(node.DisableOrRestoreKeyword);
            var errorCodes = this.VisitList_2124(node.ErrorCodes);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, pragmaKeyword, warningKeyword, disableOrRestoreKeyword, errorCodes, endOfDirectiveToken, node.IsActive);
        }
        public VisitPragmaChecksumDirectiveTrivia(node: Syntax.PragmaChecksumDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var pragmaKeyword = this.VisitToken(node.PragmaKeyword);
            var checksumKeyword = this.VisitToken(node.ChecksumKeyword);
            var file = this.VisitToken(node.File);
            var guid = this.VisitToken(node.Guid);
            var bytes = this.VisitToken(node.Bytes);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, pragmaKeyword, checksumKeyword, file, guid, bytes, endOfDirectiveToken, node.IsActive);
        }
        public VisitReferenceDirectiveTrivia(node: Syntax.ReferenceDirectiveTriviaSyntax): SyntaxNode {
            var hashToken = this.VisitToken(node.HashToken);
            var referenceKeyword = this.VisitToken(node.ReferenceKeyword);
            var file = this.VisitToken(node.File);
            var endOfDirectiveToken = this.VisitToken(node.EndOfDirectiveToken);
            return node.Update(hashToken, referenceKeyword, file, endOfDirectiveToken, node.IsActive);
        }
        public VisitInterpolatedString(node: Syntax.InterpolatedStringSyntax): SyntaxNode {
            var stringStart = this.VisitToken(node.StringStart);
            var interpolatedInserts = this.VisitList_2124(node.InterpolatedInserts);
            var stringEnd = this.VisitToken(node.StringEnd);
            return node.Update(stringStart, interpolatedInserts, stringEnd);
        }
        public VisitInterpolatedStringInsert(node: Syntax.InterpolatedStringInsertSyntax): SyntaxNode {
            var expression = <Syntax.ExpressionSyntax>this.Visit(node.Expression);
            var comma = this.VisitToken(node.Comma);
            var alignment = <Syntax.ExpressionSyntax>this.Visit(node.Alignment);
            var format = this.VisitToken(node.Format);
            return node.Update(expression, comma, alignment, format);
        }
        constructor() { super(); }
    }
}
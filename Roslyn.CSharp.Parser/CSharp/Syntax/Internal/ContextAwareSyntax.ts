////<reference path="../../Generated/CSharp.Syntax.InternalSyntaxTS.d.ts"/>

module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class ContextAwareSyntax {
        private context: SyntaxFactoryContext;
        ctor_5769(context: SyntaxFactoryContext): ContextAwareSyntax {
            this.context = context;
            return this;
        }
        public IdentifierName(identifier: SyntaxToken): IdentifierNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__947 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.IdentifierName, identifier, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__947;
            if (cached != null)
                return <IdentifierNameSyntax>cached;
            var result = new IdentifierNameSyntax().ctor_3802(SyntaxKind.IdentifierName, identifier, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public QualifiedName(left: NameSyntax, dotToken: SyntaxToken, right: SimpleNameSyntax): QualifiedNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__854 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.QualifiedName, left, dotToken, right, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__854;
            if (cached != null)
                return <QualifiedNameSyntax>cached;
            var result = new QualifiedNameSyntax().ctor_7156(SyntaxKind.QualifiedName, left, dotToken, right, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public GenericName(identifier: SyntaxToken, typeArgumentList: TypeArgumentListSyntax): GenericNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__772 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.GenericName, identifier, typeArgumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__772;
            if (cached != null)
                return <GenericNameSyntax>cached;
            var result = new GenericNameSyntax().ctor_1555(SyntaxKind.GenericName, identifier, typeArgumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TypeArgumentList(lessThanToken: SyntaxToken, arguments: SeparatedSyntaxList<TypeSyntax>, greaterThanToken: SyntaxToken): TypeArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__188 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.TypeArgumentList, lessThanToken, arguments.Node, greaterThanToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__188;
            if (cached != null)
                return <TypeArgumentListSyntax>cached;
            var result = new TypeArgumentListSyntax().ctor_1481(SyntaxKind.TypeArgumentList, lessThanToken, arguments.Node, greaterThanToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AliasQualifiedName(alias: IdentifierNameSyntax, colonColonToken: SyntaxToken, name: SimpleNameSyntax): AliasQualifiedNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__547 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.AliasQualifiedName, alias, colonColonToken, name, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__547;
            if (cached != null)
                return <AliasQualifiedNameSyntax>cached;
            var result = new AliasQualifiedNameSyntax().ctor_6279(SyntaxKind.AliasQualifiedName, alias, colonColonToken, name, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public PredefinedType(keyword: SyntaxToken): PredefinedTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__507 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.PredefinedType, keyword, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__507;
            if (cached != null)
                return <PredefinedTypeSyntax>cached;
            var result = new PredefinedTypeSyntax().ctor_6017(SyntaxKind.PredefinedType, keyword, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ArrayType(elementType: TypeSyntax, rankSpecifiers: SyntaxList<ArrayRankSpecifierSyntax>): ArrayTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__564 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ArrayType, elementType, rankSpecifiers.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__564;
            if (cached != null)
                return <ArrayTypeSyntax>cached;
            var result = new ArrayTypeSyntax().ctor_9992(SyntaxKind.ArrayType, elementType, rankSpecifiers.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ArrayRankSpecifier(openBracketToken: SyntaxToken, sizes: SeparatedSyntaxList<ExpressionSyntax>, closeBracketToken: SyntaxToken): ArrayRankSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__659 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ArrayRankSpecifier, openBracketToken, sizes.Node, closeBracketToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__659;
            if (cached != null)
                return <ArrayRankSpecifierSyntax>cached;
            var result = new ArrayRankSpecifierSyntax().ctor_1202(SyntaxKind.ArrayRankSpecifier, openBracketToken, sizes.Node, closeBracketToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public PointerType(elementType: TypeSyntax, asteriskToken: SyntaxToken): PointerTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__926 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.PointerType, elementType, asteriskToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__926;
            if (cached != null)
                return <PointerTypeSyntax>cached;
            var result = new PointerTypeSyntax().ctor_2731(SyntaxKind.PointerType, elementType, asteriskToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public NullableType(elementType: TypeSyntax, questionToken: SyntaxToken): NullableTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__432 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.NullableType, elementType, questionToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__432;
            if (cached != null)
                return <NullableTypeSyntax>cached;
            var result = new NullableTypeSyntax().ctor_1091(SyntaxKind.NullableType, elementType, questionToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public OmittedTypeArgument(omittedTypeArgumentToken: SyntaxToken): OmittedTypeArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__777 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.OmittedTypeArgument, omittedTypeArgumentToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__777;
            if (cached != null)
                return <OmittedTypeArgumentSyntax>cached;
            var result = new OmittedTypeArgumentSyntax().ctor_1437(SyntaxKind.OmittedTypeArgument, omittedTypeArgumentToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ParenthesizedExpression(openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): ParenthesizedExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__724 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ParenthesizedExpression, openParenToken, expression, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__724;
            if (cached != null)
                return <ParenthesizedExpressionSyntax>cached;
            var result = new ParenthesizedExpressionSyntax().ctor_6142(SyntaxKind.ParenthesizedExpression, openParenToken, expression, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public PrefixUnaryExpression(kind: SyntaxKind, operatorToken: SyntaxToken, operand: ExpressionSyntax): PrefixUnaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__605 = SyntaxNodeCache.TryGetNode_2745(<number>kind, operatorToken, operand, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__605;
            if (cached != null)
                return <PrefixUnaryExpressionSyntax>cached;
            var result = new PrefixUnaryExpressionSyntax().ctor_1024(kind, operatorToken, operand, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AwaitExpression(awaitKeyword: SyntaxToken, expression: ExpressionSyntax): AwaitExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__79 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.AwaitExpression, awaitKeyword, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__79;
            if (cached != null)
                return <AwaitExpressionSyntax>cached;
            var result = new AwaitExpressionSyntax().ctor_1535(SyntaxKind.AwaitExpression, awaitKeyword, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public PostfixUnaryExpression(kind: SyntaxKind, operand: ExpressionSyntax, operatorToken: SyntaxToken): PostfixUnaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__307 = SyntaxNodeCache.TryGetNode_2745(<number>kind, operand, operatorToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__307;
            if (cached != null)
                return <PostfixUnaryExpressionSyntax>cached;
            var result = new PostfixUnaryExpressionSyntax().ctor_5196(kind, operand, operatorToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public MemberAccessExpression(kind: SyntaxKind, expression: ExpressionSyntax, operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__31 = SyntaxNodeCache.TryGetNode_1394(<number>kind, expression, operatorToken, name, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__31;
            if (cached != null)
                return <MemberAccessExpressionSyntax>cached;
            var result = new MemberAccessExpressionSyntax().ctor_9206(kind, expression, operatorToken, name, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ConditionalAccessExpression(expression: ExpressionSyntax, operatorToken: SyntaxToken, whenNotNull: ExpressionSyntax): ConditionalAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__110 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ConditionalAccessExpression, expression, operatorToken, whenNotNull, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__110;
            if (cached != null)
                return <ConditionalAccessExpressionSyntax>cached;
            var result = new ConditionalAccessExpressionSyntax().ctor_8619(SyntaxKind.ConditionalAccessExpression, expression, operatorToken, whenNotNull, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public MemberBindingExpression(operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberBindingExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__555 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.MemberBindingExpression, operatorToken, name, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__555;
            if (cached != null)
                return <MemberBindingExpressionSyntax>cached;
            var result = new MemberBindingExpressionSyntax().ctor_1227(SyntaxKind.MemberBindingExpression, operatorToken, name, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ElementBindingExpression(argumentList: BracketedArgumentListSyntax): ElementBindingExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__854 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.ElementBindingExpression, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__854;
            if (cached != null)
                return <ElementBindingExpressionSyntax>cached;
            var result = new ElementBindingExpressionSyntax().ctor_9693(SyntaxKind.ElementBindingExpression, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ImplicitElementAccess(argumentList: BracketedArgumentListSyntax): ImplicitElementAccessSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__630 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.ImplicitElementAccess, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__630;
            if (cached != null)
                return <ImplicitElementAccessSyntax>cached;
            var result = new ImplicitElementAccessSyntax().ctor_2625(SyntaxKind.ImplicitElementAccess, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public BinaryExpression(kind: SyntaxKind, left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): BinaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__152 = SyntaxNodeCache.TryGetNode_1394(<number>kind, left, operatorToken, right, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__152;
            if (cached != null)
                return <BinaryExpressionSyntax>cached;
            var result = new BinaryExpressionSyntax().ctor_8809(kind, left, operatorToken, right, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AssignmentExpression(kind: SyntaxKind, left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): AssignmentExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__568 = SyntaxNodeCache.TryGetNode_1394(<number>kind, left, operatorToken, right, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__568;
            if (cached != null)
                return <AssignmentExpressionSyntax>cached;
            var result = new AssignmentExpressionSyntax().ctor_9550(kind, left, operatorToken, right, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ConditionalExpression(condition: ExpressionSyntax, questionToken: SyntaxToken, whenTrue: ExpressionSyntax, colonToken: SyntaxToken, whenFalse: ExpressionSyntax): ConditionalExpressionSyntax {
            return new ConditionalExpressionSyntax().ctor_3635(SyntaxKind.ConditionalExpression, condition, questionToken, whenTrue, colonToken, whenFalse, this.context);
        }
        public ThisExpression(token: SyntaxToken): ThisExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__849 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.ThisExpression, token, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__849;
            if (cached != null)
                return <ThisExpressionSyntax>cached;
            var result = new ThisExpressionSyntax().ctor_1182(SyntaxKind.ThisExpression, token, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public BaseExpression(token: SyntaxToken): BaseExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__42 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.BaseExpression, token, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__42;
            if (cached != null)
                return <BaseExpressionSyntax>cached;
            var result = new BaseExpressionSyntax().ctor_1808(SyntaxKind.BaseExpression, token, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public LiteralExpression(kind: SyntaxKind, token: SyntaxToken): LiteralExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__601 = SyntaxNodeCache.TryGetNode_1444(<number>kind, token, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__601;
            if (cached != null)
                return <LiteralExpressionSyntax>cached;
            var result = new LiteralExpressionSyntax().ctor_2020(kind, token, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public MakeRefExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): MakeRefExpressionSyntax {
            return new MakeRefExpressionSyntax().ctor_7027(SyntaxKind.MakeRefExpression, keyword, openParenToken, expression, closeParenToken, this.context);
        }
        public RefTypeExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): RefTypeExpressionSyntax {
            return new RefTypeExpressionSyntax().ctor_1373(SyntaxKind.RefTypeExpression, keyword, openParenToken, expression, closeParenToken, this.context);
        }
        public RefValueExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, comma: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): RefValueExpressionSyntax {
            return new RefValueExpressionSyntax().ctor_2244(SyntaxKind.RefValueExpression, keyword, openParenToken, expression, comma, type, closeParenToken, this.context);
        }
        public CheckedExpression(kind: SyntaxKind, keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): CheckedExpressionSyntax {
            return new CheckedExpressionSyntax().ctor_1641(kind, keyword, openParenToken, expression, closeParenToken, this.context);
        }
        public DefaultExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): DefaultExpressionSyntax {
            return new DefaultExpressionSyntax().ctor_4943(SyntaxKind.DefaultExpression, keyword, openParenToken, type, closeParenToken, this.context);
        }
        public TypeOfExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): TypeOfExpressionSyntax {
            return new TypeOfExpressionSyntax().ctor_1868(SyntaxKind.TypeOfExpression, keyword, openParenToken, type, closeParenToken, this.context);
        }
        public SizeOfExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): SizeOfExpressionSyntax {
            return new SizeOfExpressionSyntax().ctor_1117(SyntaxKind.SizeOfExpression, keyword, openParenToken, type, closeParenToken, this.context);
        }
        public InvocationExpression(expression: ExpressionSyntax, argumentList: ArgumentListSyntax): InvocationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__807 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.InvocationExpression, expression, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__807;
            if (cached != null)
                return <InvocationExpressionSyntax>cached;
            var result = new InvocationExpressionSyntax().ctor_1045(SyntaxKind.InvocationExpression, expression, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ElementAccessExpression(expression: ExpressionSyntax, argumentList: BracketedArgumentListSyntax): ElementAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__732 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ElementAccessExpression, expression, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__732;
            if (cached != null)
                return <ElementAccessExpressionSyntax>cached;
            var result = new ElementAccessExpressionSyntax().ctor_1566(SyntaxKind.ElementAccessExpression, expression, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ArgumentList(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeParenToken: SyntaxToken): ArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__279 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ArgumentList, openParenToken, arguments.Node, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__279;
            if (cached != null)
                return <ArgumentListSyntax>cached;
            var result = new ArgumentListSyntax().ctor_2059(SyntaxKind.ArgumentList, openParenToken, arguments.Node, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public BracketedArgumentList(openBracketToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeBracketToken: SyntaxToken): BracketedArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__177 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.BracketedArgumentList, openBracketToken, arguments.Node, closeBracketToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__177;
            if (cached != null)
                return <BracketedArgumentListSyntax>cached;
            var result = new BracketedArgumentListSyntax().ctor_3403(SyntaxKind.BracketedArgumentList, openBracketToken, arguments.Node, closeBracketToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public Argument(nameColon: NameColonSyntax, refOrOutKeyword: SyntaxToken, expression: ExpressionSyntax): ArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__120 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.Argument, nameColon, refOrOutKeyword, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__120;
            if (cached != null)
                return <ArgumentSyntax>cached;
            var result = new ArgumentSyntax().ctor_7053(SyntaxKind.Argument, nameColon, refOrOutKeyword, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public NameColon(name: IdentifierNameSyntax, colonToken: SyntaxToken): NameColonSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__419 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.NameColon, name, colonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__419;
            if (cached != null)
                return <NameColonSyntax>cached;
            var result = new NameColonSyntax().ctor_2966(SyntaxKind.NameColon, name, colonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public CastExpression(openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken, expression: ExpressionSyntax): CastExpressionSyntax {
            return new CastExpressionSyntax().ctor_1718(SyntaxKind.CastExpression, openParenToken, type, closeParenToken, expression, this.context);
        }
        public AnonymousMethodExpression(asyncKeyword: SyntaxToken, delegateKeyword: SyntaxToken, parameterList: ParameterListSyntax, block: BlockSyntax): AnonymousMethodExpressionSyntax {
            return new AnonymousMethodExpressionSyntax().ctor_5936(SyntaxKind.AnonymousMethodExpression, asyncKeyword, delegateKeyword, parameterList, block, this.context);
        }
        public SimpleLambdaExpression(asyncKeyword: SyntaxToken, parameter: ParameterSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): SimpleLambdaExpressionSyntax {
            return new SimpleLambdaExpressionSyntax().ctor_4208(SyntaxKind.SimpleLambdaExpression, asyncKeyword, parameter, arrowToken, body, this.context);
        }
        public ParenthesizedLambdaExpression(asyncKeyword: SyntaxToken, parameterList: ParameterListSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): ParenthesizedLambdaExpressionSyntax {
            return new ParenthesizedLambdaExpressionSyntax().ctor_1719(SyntaxKind.ParenthesizedLambdaExpression, asyncKeyword, parameterList, arrowToken, body, this.context);
        }
        public InitializerExpression(kind: SyntaxKind, openBraceToken: SyntaxToken, expressions: SeparatedSyntaxList<ExpressionSyntax>, closeBraceToken: SyntaxToken): InitializerExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__210 = SyntaxNodeCache.TryGetNode_1394(<number>kind, openBraceToken, expressions.Node, closeBraceToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__210;
            if (cached != null)
                return <InitializerExpressionSyntax>cached;
            var result = new InitializerExpressionSyntax().ctor_1546(kind, openBraceToken, expressions.Node, closeBraceToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ObjectCreationExpression(newKeyword: SyntaxToken, type: TypeSyntax, argumentList: ArgumentListSyntax, initializer: InitializerExpressionSyntax): ObjectCreationExpressionSyntax {
            return new ObjectCreationExpressionSyntax().ctor_6392(SyntaxKind.ObjectCreationExpression, newKeyword, type, argumentList, initializer, this.context);
        }
        public AnonymousObjectMemberDeclarator(nameEquals: NameEqualsSyntax, expression: ExpressionSyntax): AnonymousObjectMemberDeclaratorSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__213 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.AnonymousObjectMemberDeclarator, nameEquals, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__213;
            if (cached != null)
                return <AnonymousObjectMemberDeclaratorSyntax>cached;
            var result = new AnonymousObjectMemberDeclaratorSyntax().ctor_8617(SyntaxKind.AnonymousObjectMemberDeclarator, nameEquals, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AnonymousObjectCreationExpression(newKeyword: SyntaxToken, openBraceToken: SyntaxToken, initializers: SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax>, closeBraceToken: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            return new AnonymousObjectCreationExpressionSyntax().ctor_8489(SyntaxKind.AnonymousObjectCreationExpression, newKeyword, openBraceToken, initializers.Node, closeBraceToken, this.context);
        }
        public ArrayCreationExpression(newKeyword: SyntaxToken, type: ArrayTypeSyntax, initializer: InitializerExpressionSyntax): ArrayCreationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__415 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ArrayCreationExpression, newKeyword, type, initializer, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__415;
            if (cached != null)
                return <ArrayCreationExpressionSyntax>cached;
            var result = new ArrayCreationExpressionSyntax().ctor_8413(SyntaxKind.ArrayCreationExpression, newKeyword, type, initializer, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ImplicitArrayCreationExpression(newKeyword: SyntaxToken, openBracketToken: SyntaxToken, commas: SyntaxList<SyntaxToken>, closeBracketToken: SyntaxToken, initializer: InitializerExpressionSyntax): ImplicitArrayCreationExpressionSyntax {
            return new ImplicitArrayCreationExpressionSyntax().ctor_2068(SyntaxKind.ImplicitArrayCreationExpression, newKeyword, openBracketToken, commas.Node, closeBracketToken, initializer, this.context);
        }
        public StackAllocArrayCreationExpression(stackAllocKeyword: SyntaxToken, type: TypeSyntax): StackAllocArrayCreationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__725 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.StackAllocArrayCreationExpression, stackAllocKeyword, type, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__725;
            if (cached != null)
                return <StackAllocArrayCreationExpressionSyntax>cached;
            var result = new StackAllocArrayCreationExpressionSyntax().ctor_7608(SyntaxKind.StackAllocArrayCreationExpression, stackAllocKeyword, type, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public QueryExpression(fromClause: FromClauseSyntax, body: QueryBodySyntax): QueryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__369 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.QueryExpression, fromClause, body, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__369;
            if (cached != null)
                return <QueryExpressionSyntax>cached;
            var result = new QueryExpressionSyntax().ctor_5301(SyntaxKind.QueryExpression, fromClause, body, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public QueryBody(clauses: SyntaxList<QueryClauseSyntax>, selectOrGroup: SelectOrGroupClauseSyntax, continuation: QueryContinuationSyntax): QueryBodySyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__724 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.QueryBody, clauses.Node, selectOrGroup, continuation, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__724;
            if (cached != null)
                return <QueryBodySyntax>cached;
            var result = new QueryBodySyntax().ctor_7581(SyntaxKind.QueryBody, clauses.Node, selectOrGroup, continuation, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public FromClause(fromKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax): FromClauseSyntax {
            return new FromClauseSyntax().ctor_1976(SyntaxKind.FromClause, fromKeyword, type, identifier, inKeyword, expression, this.context);
        }
        public LetClause(letKeyword: SyntaxToken, identifier: SyntaxToken, equalsToken: SyntaxToken, expression: ExpressionSyntax): LetClauseSyntax {
            return new LetClauseSyntax().ctor_2126_C(SyntaxKind.LetClause, letKeyword, identifier, equalsToken, expression, this.context);
        }
        public JoinClause(joinKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, inExpression: ExpressionSyntax, onKeyword: SyntaxToken, leftExpression: ExpressionSyntax, equalsKeyword: SyntaxToken, rightExpression: ExpressionSyntax, into: JoinIntoClauseSyntax): JoinClauseSyntax {
            return new JoinClauseSyntax().ctor_1488(SyntaxKind.JoinClause, joinKeyword, type, identifier, inKeyword, inExpression, onKeyword, leftExpression, equalsKeyword, rightExpression, into, this.context);
        }
        public JoinIntoClause(intoKeyword: SyntaxToken, identifier: SyntaxToken): JoinIntoClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__987 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.JoinIntoClause, intoKeyword, identifier, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__987;
            if (cached != null)
                return <JoinIntoClauseSyntax>cached;
            var result = new JoinIntoClauseSyntax().ctor_1921(SyntaxKind.JoinIntoClause, intoKeyword, identifier, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public WhereClause(whereKeyword: SyntaxToken, condition: ExpressionSyntax): WhereClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__391 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.WhereClause, whereKeyword, condition, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__391;
            if (cached != null)
                return <WhereClauseSyntax>cached;
            var result = new WhereClauseSyntax().ctor_9416(SyntaxKind.WhereClause, whereKeyword, condition, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public OrderByClause(orderByKeyword: SyntaxToken, orderings: SeparatedSyntaxList<OrderingSyntax>): OrderByClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__639 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.OrderByClause, orderByKeyword, orderings.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__639;
            if (cached != null)
                return <OrderByClauseSyntax>cached;
            var result = new OrderByClauseSyntax().ctor_6779(SyntaxKind.OrderByClause, orderByKeyword, orderings.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public Ordering(kind: SyntaxKind, expression: ExpressionSyntax, ascendingOrDescendingKeyword: SyntaxToken): OrderingSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__43 = SyntaxNodeCache.TryGetNode_2745(<number>kind, expression, ascendingOrDescendingKeyword, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__43;
            if (cached != null)
                return <OrderingSyntax>cached;
            var result = new OrderingSyntax().ctor_7726(kind, expression, ascendingOrDescendingKeyword, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public SelectClause(selectKeyword: SyntaxToken, expression: ExpressionSyntax): SelectClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__235 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.SelectClause, selectKeyword, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__235;
            if (cached != null)
                return <SelectClauseSyntax>cached;
            var result = new SelectClauseSyntax().ctor_1469(SyntaxKind.SelectClause, selectKeyword, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public GroupClause(groupKeyword: SyntaxToken, groupExpression: ExpressionSyntax, byKeyword: SyntaxToken, byExpression: ExpressionSyntax): GroupClauseSyntax {
            return new GroupClauseSyntax().ctor_9376(SyntaxKind.GroupClause, groupKeyword, groupExpression, byKeyword, byExpression, this.context);
        }
        public QueryContinuation(intoKeyword: SyntaxToken, identifier: SyntaxToken, body: QueryBodySyntax): QueryContinuationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__846 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.QueryContinuation, intoKeyword, identifier, body, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__846;
            if (cached != null)
                return <QueryContinuationSyntax>cached;
            var result = new QueryContinuationSyntax().ctor_5032(SyntaxKind.QueryContinuation, intoKeyword, identifier, body, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public OmittedArraySizeExpression(omittedArraySizeExpressionToken: SyntaxToken): OmittedArraySizeExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__461 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.OmittedArraySizeExpression, omittedArraySizeExpressionToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__461;
            if (cached != null)
                return <OmittedArraySizeExpressionSyntax>cached;
            var result = new OmittedArraySizeExpressionSyntax().ctor_1827(SyntaxKind.OmittedArraySizeExpression, omittedArraySizeExpressionToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public GlobalStatement(statement: StatementSyntax): GlobalStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__234 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.GlobalStatement, statement, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__234;
            if (cached != null)
                return <GlobalStatementSyntax>cached;
            var result = new GlobalStatementSyntax().ctor_1585(SyntaxKind.GlobalStatement, statement, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public Block(openBraceToken: SyntaxToken, statements: SyntaxList<StatementSyntax>, closeBraceToken: SyntaxToken): BlockSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__331 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.Block, openBraceToken, statements.Node, closeBraceToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__331;
            if (cached != null)
                return <BlockSyntax>cached;
            var result = new BlockSyntax().ctor_2029(SyntaxKind.Block, openBraceToken, statements.Node, closeBraceToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public LocalDeclarationStatement(modifiers: SyntaxList<SyntaxToken>, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): LocalDeclarationStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__333 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.LocalDeclarationStatement, modifiers.Node, declaration, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__333;
            if (cached != null)
                return <LocalDeclarationStatementSyntax>cached;
            var result = new LocalDeclarationStatementSyntax().ctor_4906(SyntaxKind.LocalDeclarationStatement, modifiers.Node, declaration, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public VariableDeclaration(type: TypeSyntax, variables: SeparatedSyntaxList<VariableDeclaratorSyntax>): VariableDeclarationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__650 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.VariableDeclaration, type, variables.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__650;
            if (cached != null)
                return <VariableDeclarationSyntax>cached;
            var result = new VariableDeclarationSyntax().ctor_1234(SyntaxKind.VariableDeclaration, type, variables.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public VariableDeclarator(identifier: SyntaxToken, argumentList: BracketedArgumentListSyntax, initializer: EqualsValueClauseSyntax): VariableDeclaratorSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__184 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.VariableDeclarator, identifier, argumentList, initializer, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__184;
            if (cached != null)
                return <VariableDeclaratorSyntax>cached;
            var result = new VariableDeclaratorSyntax().ctor_3449(SyntaxKind.VariableDeclarator, identifier, argumentList, initializer, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public EqualsValueClause(equalsToken: SyntaxToken, value: ExpressionSyntax): EqualsValueClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__493 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.EqualsValueClause, equalsToken, value, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__493;
            if (cached != null)
                return <EqualsValueClauseSyntax>cached;
            var result = new EqualsValueClauseSyntax().ctor_1366(SyntaxKind.EqualsValueClause, equalsToken, value, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ExpressionStatement(expression: ExpressionSyntax, semicolonToken: SyntaxToken): ExpressionStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__64 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ExpressionStatement, expression, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__64;
            if (cached != null)
                return <ExpressionStatementSyntax>cached;
            var result = new ExpressionStatementSyntax().ctor_5488(SyntaxKind.ExpressionStatement, expression, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public EmptyStatement(semicolonToken: SyntaxToken): EmptyStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__712 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.EmptyStatement, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__712;
            if (cached != null)
                return <EmptyStatementSyntax>cached;
            var result = new EmptyStatementSyntax().ctor_1710(SyntaxKind.EmptyStatement, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public LabeledStatement(identifier: SyntaxToken, colonToken: SyntaxToken, statement: StatementSyntax): LabeledStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__928 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.LabeledStatement, identifier, colonToken, statement, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__928;
            if (cached != null)
                return <LabeledStatementSyntax>cached;
            var result = new LabeledStatementSyntax().ctor_1249(SyntaxKind.LabeledStatement, identifier, colonToken, statement, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public GotoStatement(kind: SyntaxKind, gotoKeyword: SyntaxToken, caseOrDefaultKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): GotoStatementSyntax {
            return new GotoStatementSyntax().ctor_1495(kind, gotoKeyword, caseOrDefaultKeyword, expression, semicolonToken, this.context);
        }
        public BreakStatement(breakKeyword: SyntaxToken, semicolonToken: SyntaxToken): BreakStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__389 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.BreakStatement, breakKeyword, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__389;
            if (cached != null)
                return <BreakStatementSyntax>cached;
            var result = new BreakStatementSyntax().ctor_2038(SyntaxKind.BreakStatement, breakKeyword, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ContinueStatement(continueKeyword: SyntaxToken, semicolonToken: SyntaxToken): ContinueStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__44 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ContinueStatement, continueKeyword, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__44;
            if (cached != null)
                return <ContinueStatementSyntax>cached;
            var result = new ContinueStatementSyntax().ctor_1201(SyntaxKind.ContinueStatement, continueKeyword, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ReturnStatement(returnKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ReturnStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__645 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ReturnStatement, returnKeyword, expression, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__645;
            if (cached != null)
                return <ReturnStatementSyntax>cached;
            var result = new ReturnStatementSyntax().ctor_1404(SyntaxKind.ReturnStatement, returnKeyword, expression, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ThrowStatement(throwKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ThrowStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__322 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ThrowStatement, throwKeyword, expression, semicolonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__322;
            if (cached != null)
                return <ThrowStatementSyntax>cached;
            var result = new ThrowStatementSyntax().ctor_1183(SyntaxKind.ThrowStatement, throwKeyword, expression, semicolonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public YieldStatement(kind: SyntaxKind, yieldKeyword: SyntaxToken, returnOrBreakKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): YieldStatementSyntax {
            return new YieldStatementSyntax().ctor_1922(kind, yieldKeyword, returnOrBreakKeyword, expression, semicolonToken, this.context);
        }
        public WhileStatement(whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): WhileStatementSyntax {
            return new WhileStatementSyntax().ctor_1212(SyntaxKind.WhileStatement, whileKeyword, openParenToken, condition, closeParenToken, statement, this.context);
        }
        public DoStatement(doKeyword: SyntaxToken, statement: StatementSyntax, whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, semicolonToken: SyntaxToken): DoStatementSyntax {
            return new DoStatementSyntax().ctor_1155(SyntaxKind.DoStatement, doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken, this.context);
        }
        public ForStatement(forKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, initializers: SeparatedSyntaxList<ExpressionSyntax>, firstSemicolonToken: SyntaxToken, condition: ExpressionSyntax, secondSemicolonToken: SyntaxToken, incrementors: SeparatedSyntaxList<ExpressionSyntax>, closeParenToken: SyntaxToken, statement: StatementSyntax): ForStatementSyntax {
            return new ForStatementSyntax().ctor_2928(SyntaxKind.ForStatement, forKeyword, openParenToken, declaration, initializers.Node, firstSemicolonToken, condition, secondSemicolonToken, incrementors.Node, closeParenToken, statement, this.context);
        }
        public ForEachStatement(forEachKeyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): ForEachStatementSyntax {
            return new ForEachStatementSyntax().ctor_2084(SyntaxKind.ForEachStatement, forEachKeyword, openParenToken, type, identifier, inKeyword, expression, closeParenToken, statement, this.context);
        }
        public UsingStatement(usingKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): UsingStatementSyntax {
            return new UsingStatementSyntax().ctor_1513(SyntaxKind.UsingStatement, usingKeyword, openParenToken, declaration, expression, closeParenToken, statement, this.context);
        }
        public FixedStatement(fixedKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): FixedStatementSyntax {
            return new FixedStatementSyntax().ctor_7903(SyntaxKind.FixedStatement, fixedKeyword, openParenToken, declaration, closeParenToken, statement, this.context);
        }
        public CheckedStatement(kind: SyntaxKind, keyword: SyntaxToken, block: BlockSyntax): CheckedStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__977 = SyntaxNodeCache.TryGetNode_2745(<number>kind, keyword, block, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__977;
            if (cached != null)
                return <CheckedStatementSyntax>cached;
            var result = new CheckedStatementSyntax().ctor_9134(kind, keyword, block, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public UnsafeStatement(unsafeKeyword: SyntaxToken, block: BlockSyntax): UnsafeStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__714 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.UnsafeStatement, unsafeKeyword, block, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__714;
            if (cached != null)
                return <UnsafeStatementSyntax>cached;
            var result = new UnsafeStatementSyntax().ctor_1796(SyntaxKind.UnsafeStatement, unsafeKeyword, block, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public LockStatement(lockKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): LockStatementSyntax {
            return new LockStatementSyntax().ctor_2931(SyntaxKind.LockStatement, lockKeyword, openParenToken, expression, closeParenToken, statement, this.context);
        }
        public IfStatement(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax, $else: ElseClauseSyntax): IfStatementSyntax {
            return new IfStatementSyntax().ctor_2092(SyntaxKind.IfStatement, ifKeyword, openParenToken, condition, closeParenToken, statement, $else, this.context);
        }
        public ElseClause(elseKeyword: SyntaxToken, statement: StatementSyntax): ElseClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__767 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ElseClause, elseKeyword, statement, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__767;
            if (cached != null)
                return <ElseClauseSyntax>cached;
            var result = new ElseClauseSyntax().ctor_1278(SyntaxKind.ElseClause, elseKeyword, statement, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public SwitchStatement(switchKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, openBraceToken: SyntaxToken, sections: SyntaxList<SwitchSectionSyntax>, closeBraceToken: SyntaxToken): SwitchStatementSyntax {
            return new SwitchStatementSyntax().ctor_1210(SyntaxKind.SwitchStatement, switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, sections.Node, closeBraceToken, this.context);
        }
        public SwitchSection(labels: SyntaxList<SwitchLabelSyntax>, statements: SyntaxList<StatementSyntax>): SwitchSectionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__368 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.SwitchSection, labels.Node, statements.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__368;
            if (cached != null)
                return <SwitchSectionSyntax>cached;
            var result = new SwitchSectionSyntax().ctor_5747(SyntaxKind.SwitchSection, labels.Node, statements.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public CaseSwitchLabel(keyword: SyntaxToken, value: ExpressionSyntax, colonToken: SyntaxToken): CaseSwitchLabelSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__447 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.CaseSwitchLabel, keyword, value, colonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__447;
            if (cached != null)
                return <CaseSwitchLabelSyntax>cached;
            var result = new CaseSwitchLabelSyntax().ctor_5189(SyntaxKind.CaseSwitchLabel, keyword, value, colonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public DefaultSwitchLabel(keyword: SyntaxToken, colonToken: SyntaxToken): DefaultSwitchLabelSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__380 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.DefaultSwitchLabel, keyword, colonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__380;
            if (cached != null)
                return <DefaultSwitchLabelSyntax>cached;
            var result = new DefaultSwitchLabelSyntax().ctor_6195(SyntaxKind.DefaultSwitchLabel, keyword, colonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TryStatement(tryKeyword: SyntaxToken, block: BlockSyntax, catches: SyntaxList<CatchClauseSyntax>, $finally: FinallyClauseSyntax): TryStatementSyntax {
            return new TryStatementSyntax().ctor_1281(SyntaxKind.TryStatement, tryKeyword, block, catches.Node, $finally, this.context);
        }
        public CatchClause(catchKeyword: SyntaxToken, declaration: CatchDeclarationSyntax, filter: CatchFilterClauseSyntax, block: BlockSyntax): CatchClauseSyntax {
            return new CatchClauseSyntax().ctor_1246(SyntaxKind.CatchClause, catchKeyword, declaration, filter, block, this.context);
        }
        public CatchDeclaration(openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, closeParenToken: SyntaxToken): CatchDeclarationSyntax {
            return new CatchDeclarationSyntax().ctor_8016(SyntaxKind.CatchDeclaration, openParenToken, type, identifier, closeParenToken, this.context);
        }
        public CatchFilterClause(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, filterExpression: ExpressionSyntax, closeParenToken: SyntaxToken): CatchFilterClauseSyntax {
            return new CatchFilterClauseSyntax().ctor_2083(SyntaxKind.CatchFilterClause, ifKeyword, openParenToken, filterExpression, closeParenToken, this.context);
        }
        public FinallyClause(finallyKeyword: SyntaxToken, block: BlockSyntax): FinallyClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__422 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.FinallyClause, finallyKeyword, block, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__422;
            if (cached != null)
                return <FinallyClauseSyntax>cached;
            var result = new FinallyClauseSyntax().ctor_1675(SyntaxKind.FinallyClause, finallyKeyword, block, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public CompilationUnit(externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, attributeLists: SyntaxList<AttributeListSyntax>, members: SyntaxList<MemberDeclarationSyntax>, endOfFileToken: SyntaxToken): CompilationUnitSyntax {
            return new CompilationUnitSyntax().ctor_1663(SyntaxKind.CompilationUnit, externs.Node, usings.Node, attributeLists.Node, members.Node, endOfFileToken, this.context);
        }
        public ExternAliasDirective(externKeyword: SyntaxToken, aliasKeyword: SyntaxToken, identifier: SyntaxToken, semicolonToken: SyntaxToken): ExternAliasDirectiveSyntax {
            return new ExternAliasDirectiveSyntax().ctor_9386(SyntaxKind.ExternAliasDirective, externKeyword, aliasKeyword, identifier, semicolonToken, this.context);
        }
        public UsingDirective(usingKeyword: SyntaxToken, staticKeyword: SyntaxToken, alias: NameEqualsSyntax, name: NameSyntax, semicolonToken: SyntaxToken): UsingDirectiveSyntax {
            return new UsingDirectiveSyntax().ctor_8988(SyntaxKind.UsingDirective, usingKeyword, staticKeyword, alias, name, semicolonToken, this.context);
        }
        public NamespaceDeclaration(namespaceKeyword: SyntaxToken, name: NameSyntax, openBraceToken: SyntaxToken, externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): NamespaceDeclarationSyntax {
            return new NamespaceDeclarationSyntax().ctor_2049(SyntaxKind.NamespaceDeclaration, namespaceKeyword, name, openBraceToken, externs.Node, usings.Node, members.Node, closeBraceToken, semicolonToken, this.context);
        }
        public AttributeList(openBracketToken: SyntaxToken, target: AttributeTargetSpecifierSyntax, attributes: SeparatedSyntaxList<AttributeSyntax>, closeBracketToken: SyntaxToken): AttributeListSyntax {
            return new AttributeListSyntax().ctor_2120(SyntaxKind.AttributeList, openBracketToken, target, attributes.Node, closeBracketToken, this.context);
        }
        public AttributeTargetSpecifier(identifier: SyntaxToken, colonToken: SyntaxToken): AttributeTargetSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__320 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.AttributeTargetSpecifier, identifier, colonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__320;
            if (cached != null)
                return <AttributeTargetSpecifierSyntax>cached;
            var result = new AttributeTargetSpecifierSyntax().ctor_1154(SyntaxKind.AttributeTargetSpecifier, identifier, colonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public Attribute(name: NameSyntax, argumentList: AttributeArgumentListSyntax): AttributeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__474 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.Attribute, name, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__474;
            if (cached != null)
                return <AttributeSyntax>cached;
            var result = new AttributeSyntax().ctor_8644(SyntaxKind.Attribute, name, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AttributeArgumentList(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<AttributeArgumentSyntax>, closeParenToken: SyntaxToken): AttributeArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__434 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.AttributeArgumentList, openParenToken, arguments.Node, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__434;
            if (cached != null)
                return <AttributeArgumentListSyntax>cached;
            var result = new AttributeArgumentListSyntax().ctor_1825(SyntaxKind.AttributeArgumentList, openParenToken, arguments.Node, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AttributeArgument(nameEquals: NameEqualsSyntax, nameColon: NameColonSyntax, expression: ExpressionSyntax): AttributeArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__534 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.AttributeArgument, nameEquals, nameColon, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__534;
            if (cached != null)
                return <AttributeArgumentSyntax>cached;
            var result = new AttributeArgumentSyntax().ctor_2711(SyntaxKind.AttributeArgument, nameEquals, nameColon, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public NameEquals(name: IdentifierNameSyntax, equalsToken: SyntaxToken): NameEqualsSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__72 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.NameEquals, name, equalsToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__72;
            if (cached != null)
                return <NameEqualsSyntax>cached;
            var result = new NameEqualsSyntax().ctor_8701(SyntaxKind.NameEquals, name, equalsToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TypeParameterList(lessThanToken: SyntaxToken, parameters: SeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: SyntaxToken): TypeParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__500 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.TypeParameterList, lessThanToken, parameters.Node, greaterThanToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__500;
            if (cached != null)
                return <TypeParameterListSyntax>cached;
            var result = new TypeParameterListSyntax().ctor_1045(SyntaxKind.TypeParameterList, lessThanToken, parameters.Node, greaterThanToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TypeParameter(attributeLists: SyntaxList<AttributeListSyntax>, varianceKeyword: SyntaxToken, identifier: SyntaxToken): TypeParameterSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__561 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.TypeParameter, attributeLists.Node, varianceKeyword, identifier, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__561;
            if (cached != null)
                return <TypeParameterSyntax>cached;
            var result = new TypeParameterSyntax().ctor_6048(SyntaxKind.TypeParameter, attributeLists.Node, varianceKeyword, identifier, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ClassDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): ClassDeclarationSyntax {
            return new ClassDeclarationSyntax().ctor_9117(SyntaxKind.ClassDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken, this.context);
        }
        public StructDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): StructDeclarationSyntax {
            return new StructDeclarationSyntax().ctor_1044(SyntaxKind.StructDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken, this.context);
        }
        public InterfaceDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): InterfaceDeclarationSyntax {
            return new InterfaceDeclarationSyntax().ctor_1608(SyntaxKind.InterfaceDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken, this.context);
        }
        public EnumDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, enumKeyword: SyntaxToken, identifier: SyntaxToken, baseList: BaseListSyntax, openBraceToken: SyntaxToken, members: SeparatedSyntaxList<EnumMemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): EnumDeclarationSyntax {
            return new EnumDeclarationSyntax().ctor_1300(SyntaxKind.EnumDeclaration, attributeLists.Node, modifiers.Node, enumKeyword, identifier, baseList, openBraceToken, members.Node, closeBraceToken, semicolonToken, this.context);
        }
        public DelegateDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, delegateKeyword: SyntaxToken, returnType: TypeSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, semicolonToken: SyntaxToken): DelegateDeclarationSyntax {
            return new DelegateDeclarationSyntax().ctor_1031(SyntaxKind.DelegateDeclaration, attributeLists.Node, modifiers.Node, delegateKeyword, returnType, identifier, typeParameterList, parameterList, constraintClauses.Node, semicolonToken, this.context);
        }
        public EnumMemberDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, identifier: SyntaxToken, equalsValue: EqualsValueClauseSyntax): EnumMemberDeclarationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__954 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.EnumMemberDeclaration, attributeLists.Node, identifier, equalsValue, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__954;
            if (cached != null)
                return <EnumMemberDeclarationSyntax>cached;
            var result = new EnumMemberDeclarationSyntax().ctor_1553(SyntaxKind.EnumMemberDeclaration, attributeLists.Node, identifier, equalsValue, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public BaseList(colonToken: SyntaxToken, types: SeparatedSyntaxList<BaseTypeSyntax>): BaseListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__366 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.BaseList, colonToken, types.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__366;
            if (cached != null)
                return <BaseListSyntax>cached;
            var result = new BaseListSyntax().ctor_6846(SyntaxKind.BaseList, colonToken, types.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public SimpleBaseType(type: TypeSyntax): SimpleBaseTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__947 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.SimpleBaseType, type, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__947;
            if (cached != null)
                return <SimpleBaseTypeSyntax>cached;
            var result = new SimpleBaseTypeSyntax().ctor_1905(SyntaxKind.SimpleBaseType, type, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TypeParameterConstraintClause(whereKeyword: SyntaxToken, name: IdentifierNameSyntax, colonToken: SyntaxToken, constraints: SeparatedSyntaxList<TypeParameterConstraintSyntax>): TypeParameterConstraintClauseSyntax {
            return new TypeParameterConstraintClauseSyntax().ctor_8985(SyntaxKind.TypeParameterConstraintClause, whereKeyword, name, colonToken, constraints.Node, this.context);
        }
        public ConstructorConstraint(newKeyword: SyntaxToken, openParenToken: SyntaxToken, closeParenToken: SyntaxToken): ConstructorConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__304 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ConstructorConstraint, newKeyword, openParenToken, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__304;
            if (cached != null)
                return <ConstructorConstraintSyntax>cached;
            var result = new ConstructorConstraintSyntax().ctor_1843(SyntaxKind.ConstructorConstraint, newKeyword, openParenToken, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ClassOrStructConstraint(kind: SyntaxKind, classOrStructKeyword: SyntaxToken): ClassOrStructConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__80 = SyntaxNodeCache.TryGetNode_1444(<number>kind, classOrStructKeyword, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__80;
            if (cached != null)
                return <ClassOrStructConstraintSyntax>cached;
            var result = new ClassOrStructConstraintSyntax().ctor_1041(kind, classOrStructKeyword, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public TypeConstraint(type: TypeSyntax): TypeConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__310 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.TypeConstraint, type, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__310;
            if (cached != null)
                return <TypeConstraintSyntax>cached;
            var result = new TypeConstraintSyntax().ctor_1460(SyntaxKind.TypeConstraint, type, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public FieldDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): FieldDeclarationSyntax {
            return new FieldDeclarationSyntax().ctor_6503(SyntaxKind.FieldDeclaration, attributeLists.Node, modifiers.Node, declaration, semicolonToken, this.context);
        }
        public EventFieldDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, eventKeyword: SyntaxToken, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): EventFieldDeclarationSyntax {
            return new EventFieldDeclarationSyntax().ctor_1041(SyntaxKind.EventFieldDeclaration, attributeLists.Node, modifiers.Node, eventKeyword, declaration, semicolonToken, this.context);
        }
        public ExplicitInterfaceSpecifier(name: NameSyntax, dotToken: SyntaxToken): ExplicitInterfaceSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__41 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ExplicitInterfaceSpecifier, name, dotToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__41;
            if (cached != null)
                return <ExplicitInterfaceSpecifierSyntax>cached;
            var result = new ExplicitInterfaceSpecifierSyntax().ctor_1307(SyntaxKind.ExplicitInterfaceSpecifier, name, dotToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public MethodDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, returnType: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): MethodDeclarationSyntax {
            return new MethodDeclarationSyntax().ctor_1209(SyntaxKind.MethodDeclaration, attributeLists.Node, modifiers.Node, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses.Node, body, expressionBody, semicolonToken, this.context);
        }
        public OperatorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, returnType: TypeSyntax, operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): OperatorDeclarationSyntax {
            return new OperatorDeclarationSyntax().ctor_1074(SyntaxKind.OperatorDeclaration, attributeLists.Node, modifiers.Node, returnType, operatorKeyword, operatorToken, parameterList, body, expressionBody, semicolonToken, this.context);
        }
        public ConversionOperatorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): ConversionOperatorDeclarationSyntax {
            return new ConversionOperatorDeclarationSyntax().ctor_1454(SyntaxKind.ConversionOperatorDeclaration, attributeLists.Node, modifiers.Node, implicitOrExplicitKeyword, operatorKeyword, type, parameterList, body, expressionBody, semicolonToken, this.context);
        }
        public ConstructorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, identifier: SyntaxToken, parameterList: ParameterListSyntax, initializer: ConstructorInitializerSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): ConstructorDeclarationSyntax {
            return new ConstructorDeclarationSyntax().ctor_1430(SyntaxKind.ConstructorDeclaration, attributeLists.Node, modifiers.Node, identifier, parameterList, initializer, body, semicolonToken, this.context);
        }
        public ConstructorInitializer(kind: SyntaxKind, colonToken: SyntaxToken, thisOrBaseKeyword: SyntaxToken, argumentList: ArgumentListSyntax): ConstructorInitializerSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__933 = SyntaxNodeCache.TryGetNode_1394(<number>kind, colonToken, thisOrBaseKeyword, argumentList, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__933;
            if (cached != null)
                return <ConstructorInitializerSyntax>cached;
            var result = new ConstructorInitializerSyntax().ctor_9502(kind, colonToken, thisOrBaseKeyword, argumentList, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public DestructorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, tildeToken: SyntaxToken, identifier: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): DestructorDeclarationSyntax {
            return new DestructorDeclarationSyntax().ctor_1525(SyntaxKind.DestructorDeclaration, attributeLists.Node, modifiers.Node, tildeToken, identifier, parameterList, body, semicolonToken, this.context);
        }
        public PropertyDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, initializer: EqualsValueClauseSyntax, semicolon: SyntaxToken): PropertyDeclarationSyntax {
            return new PropertyDeclarationSyntax().ctor_3039(SyntaxKind.PropertyDeclaration, attributeLists.Node, modifiers.Node, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, semicolon, this.context);
        }
        public ArrowExpressionClause(arrowToken: SyntaxToken, expression: ExpressionSyntax): ArrowExpressionClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__822 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.ArrowExpressionClause, arrowToken, expression, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__822;
            if (cached != null)
                return <ArrowExpressionClauseSyntax>cached;
            var result = new ArrowExpressionClauseSyntax().ctor_5341(SyntaxKind.ArrowExpressionClause, arrowToken, expression, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public EventDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, eventKeyword: SyntaxToken, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax): EventDeclarationSyntax {
            return new EventDeclarationSyntax().ctor_1179(SyntaxKind.EventDeclaration, attributeLists.Node, modifiers.Node, eventKeyword, type, explicitInterfaceSpecifier, identifier, accessorList, this.context);
        }
        public IndexerDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, thisKeyword: SyntaxToken, parameterList: BracketedParameterListSyntax, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolon: SyntaxToken): IndexerDeclarationSyntax {
            return new IndexerDeclarationSyntax().ctor_1341(SyntaxKind.IndexerDeclaration, attributeLists.Node, modifiers.Node, type, explicitInterfaceSpecifier, thisKeyword, parameterList, accessorList, expressionBody, semicolon, this.context);
        }
        public AccessorList(openBraceToken: SyntaxToken, accessors: SyntaxList<AccessorDeclarationSyntax>, closeBraceToken: SyntaxToken): AccessorListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__679 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.AccessorList, openBraceToken, accessors.Node, closeBraceToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__679;
            if (cached != null)
                return <AccessorListSyntax>cached;
            var result = new AccessorListSyntax().ctor_1005(SyntaxKind.AccessorList, openBraceToken, accessors.Node, closeBraceToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public AccessorDeclaration(kind: SyntaxKind, attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, body: BlockSyntax, semicolonToken: SyntaxToken): AccessorDeclarationSyntax {
            return new AccessorDeclarationSyntax().ctor_5617(kind, attributeLists.Node, modifiers.Node, keyword, body, semicolonToken, this.context);
        }
        public ParameterList(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeParenToken: SyntaxToken): ParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__466 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.ParameterList, openParenToken, parameters.Node, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__466;
            if (cached != null)
                return <ParameterListSyntax>cached;
            var result = new ParameterListSyntax().ctor_1342(SyntaxKind.ParameterList, openParenToken, parameters.Node, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public BracketedParameterList(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeBracketToken: SyntaxToken): BracketedParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__109 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.BracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__109;
            if (cached != null)
                return <BracketedParameterListSyntax>cached;
            var result = new BracketedParameterListSyntax().ctor_3203(SyntaxKind.BracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public Parameter(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, identifier: SyntaxToken, $default: EqualsValueClauseSyntax): ParameterSyntax {
            return new ParameterSyntax().ctor_1292(SyntaxKind.Parameter, attributeLists.Node, modifiers.Node, type, identifier, $default, this.context);
        }
        public IncompleteMember(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax): IncompleteMemberSyntax {
            return new IncompleteMemberSyntax().ctor_2249(SyntaxKind.IncompleteMember, attributeLists.Node, modifiers.Node, type, this.context);
        }
        public SkippedTokensTrivia(tokens: SyntaxList<SyntaxToken>): SkippedTokensTriviaSyntax {
            return new SkippedTokensTriviaSyntax().ctor_2298(SyntaxKind.SkippedTokensTrivia, tokens.Node, this.context);
        }
        public DocumentationCommentTrivia(kind: SyntaxKind, content: SyntaxList<XmlNodeSyntax>, endOfComment: SyntaxToken): DocumentationCommentTriviaSyntax {
            return new DocumentationCommentTriviaSyntax().ctor_1399(kind, content.Node, endOfComment, this.context);
        }
        public TypeCref(type: TypeSyntax): TypeCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__362 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.TypeCref, type, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__362;
            if (cached != null)
                return <TypeCrefSyntax>cached;
            var result = new TypeCrefSyntax().ctor_1565(SyntaxKind.TypeCref, type, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public QualifiedCref(container: TypeSyntax, dotToken: SyntaxToken, member: MemberCrefSyntax): QualifiedCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__981 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.QualifiedCref, container, dotToken, member, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__981;
            if (cached != null)
                return <QualifiedCrefSyntax>cached;
            var result = new QualifiedCrefSyntax().ctor_1897(SyntaxKind.QualifiedCref, container, dotToken, member, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public NameMemberCref(name: TypeSyntax, parameters: CrefParameterListSyntax): NameMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__863 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.NameMemberCref, name, parameters, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__863;
            if (cached != null)
                return <NameMemberCrefSyntax>cached;
            var result = new NameMemberCrefSyntax().ctor_9433(SyntaxKind.NameMemberCref, name, parameters, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public IndexerMemberCref(thisKeyword: SyntaxToken, parameters: CrefBracketedParameterListSyntax): IndexerMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__573 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.IndexerMemberCref, thisKeyword, parameters, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__573;
            if (cached != null)
                return <IndexerMemberCrefSyntax>cached;
            var result = new IndexerMemberCrefSyntax().ctor_4376(SyntaxKind.IndexerMemberCref, thisKeyword, parameters, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public OperatorMemberCref(operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameters: CrefParameterListSyntax): OperatorMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__649 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.OperatorMemberCref, operatorKeyword, operatorToken, parameters, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__649;
            if (cached != null)
                return <OperatorMemberCrefSyntax>cached;
            var result = new OperatorMemberCrefSyntax().ctor_6188(SyntaxKind.OperatorMemberCref, operatorKeyword, operatorToken, parameters, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public ConversionOperatorMemberCref(implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameters: CrefParameterListSyntax): ConversionOperatorMemberCrefSyntax {
            return new ConversionOperatorMemberCrefSyntax().ctor_7179(SyntaxKind.ConversionOperatorMemberCref, implicitOrExplicitKeyword, operatorKeyword, type, parameters, this.context);
        }
        public CrefParameterList(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeParenToken: SyntaxToken): CrefParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__96 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.CrefParameterList, openParenToken, parameters.Node, closeParenToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__96;
            if (cached != null)
                return <CrefParameterListSyntax>cached;
            var result = new CrefParameterListSyntax().ctor_2311(SyntaxKind.CrefParameterList, openParenToken, parameters.Node, closeParenToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public CrefBracketedParameterList(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeBracketToken: SyntaxToken): CrefBracketedParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__759 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.CrefBracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__759;
            if (cached != null)
                return <CrefBracketedParameterListSyntax>cached;
            var result = new CrefBracketedParameterListSyntax().ctor_3133(SyntaxKind.CrefBracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public CrefParameter(refOrOutKeyword: SyntaxToken, type: TypeSyntax): CrefParameterSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__847 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.CrefParameter, refOrOutKeyword, type, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__847;
            if (cached != null)
                return <CrefParameterSyntax>cached;
            var result = new CrefParameterSyntax().ctor_4620(SyntaxKind.CrefParameter, refOrOutKeyword, type, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlElement(startTag: XmlElementStartTagSyntax, content: SyntaxList<XmlNodeSyntax>, endTag: XmlElementEndTagSyntax): XmlElementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__59 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.XmlElement, startTag, content.Node, endTag, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__59;
            if (cached != null)
                return <XmlElementSyntax>cached;
            var result = new XmlElementSyntax().ctor_1661(SyntaxKind.XmlElement, startTag, content.Node, endTag, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlElementStartTag(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, greaterThanToken: SyntaxToken): XmlElementStartTagSyntax {
            return new XmlElementStartTagSyntax().ctor_7130(SyntaxKind.XmlElementStartTag, lessThanToken, name, attributes.Node, greaterThanToken, this.context);
        }
        public XmlElementEndTag(lessThanSlashToken: SyntaxToken, name: XmlNameSyntax, greaterThanToken: SyntaxToken): XmlElementEndTagSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__542 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.XmlElementEndTag, lessThanSlashToken, name, greaterThanToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__542;
            if (cached != null)
                return <XmlElementEndTagSyntax>cached;
            var result = new XmlElementEndTagSyntax().ctor_2034(SyntaxKind.XmlElementEndTag, lessThanSlashToken, name, greaterThanToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlEmptyElement(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, slashGreaterThanToken: SyntaxToken): XmlEmptyElementSyntax {
            return new XmlEmptyElementSyntax().ctor_9676(SyntaxKind.XmlEmptyElement, lessThanToken, name, attributes.Node, slashGreaterThanToken, this.context);
        }
        public XmlName(prefix: XmlPrefixSyntax, localName: SyntaxToken): XmlNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__963 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.XmlName, prefix, localName, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__963;
            if (cached != null)
                return <XmlNameSyntax>cached;
            var result = new XmlNameSyntax().ctor_1772(SyntaxKind.XmlName, prefix, localName, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlPrefix(prefix: SyntaxToken, colonToken: SyntaxToken): XmlPrefixSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__226 = SyntaxNodeCache.TryGetNode_2745(<number>SyntaxKind.XmlPrefix, prefix, colonToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__226;
            if (cached != null)
                return <XmlPrefixSyntax>cached;
            var result = new XmlPrefixSyntax().ctor_1226(SyntaxKind.XmlPrefix, prefix, colonToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlTextAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, endQuoteToken: SyntaxToken): XmlTextAttributeSyntax {
            return new XmlTextAttributeSyntax().ctor_1991(SyntaxKind.XmlTextAttribute, name, equalsToken, startQuoteToken, textTokens.Node, endQuoteToken, this.context);
        }
        public XmlCrefAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, cref: CrefSyntax, endQuoteToken: SyntaxToken): XmlCrefAttributeSyntax {
            return new XmlCrefAttributeSyntax().ctor_1110(SyntaxKind.XmlCrefAttribute, name, equalsToken, startQuoteToken, cref, endQuoteToken, this.context);
        }
        public XmlNameAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, identifier: IdentifierNameSyntax, endQuoteToken: SyntaxToken): XmlNameAttributeSyntax {
            return new XmlNameAttributeSyntax().ctor_2473(SyntaxKind.XmlNameAttribute, name, equalsToken, startQuoteToken, identifier, endQuoteToken, this.context);
        }
        public XmlText(textTokens: SyntaxList<SyntaxToken>): XmlTextSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__817 = SyntaxNodeCache.TryGetNode_1444(<number>SyntaxKind.XmlText, textTokens.Node, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__817;
            if (cached != null)
                return <XmlTextSyntax>cached;
            var result = new XmlTextSyntax().ctor_4772(SyntaxKind.XmlText, textTokens.Node, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlCDataSection(startCDataToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, endCDataToken: SyntaxToken): XmlCDataSectionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__897 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.XmlCDataSection, startCDataToken, textTokens.Node, endCDataToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__897;
            if (cached != null)
                return <XmlCDataSectionSyntax>cached;
            var result = new XmlCDataSectionSyntax().ctor_1490(SyntaxKind.XmlCDataSection, startCDataToken, textTokens.Node, endCDataToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public XmlProcessingInstruction(startProcessingInstructionToken: SyntaxToken, name: XmlNameSyntax, textTokens: SyntaxList<SyntaxToken>, endProcessingInstructionToken: SyntaxToken): XmlProcessingInstructionSyntax {
            return new XmlProcessingInstructionSyntax().ctor_1507(SyntaxKind.XmlProcessingInstruction, startProcessingInstructionToken, name, textTokens.Node, endProcessingInstructionToken, this.context);
        }
        public XmlComment(lessThanExclamationMinusMinusToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, minusMinusGreaterThanToken: SyntaxToken): XmlCommentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__758 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.XmlComment, lessThanExclamationMinusMinusToken, textTokens.Node, minusMinusGreaterThanToken, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__758;
            if (cached != null)
                return <XmlCommentSyntax>cached;
            var result = new XmlCommentSyntax().ctor_1022(SyntaxKind.XmlComment, lessThanExclamationMinusMinusToken, textTokens.Node, minusMinusGreaterThanToken, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public IfDirectiveTrivia(hashToken: SyntaxToken, ifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): IfDirectiveTriviaSyntax {
            return new IfDirectiveTriviaSyntax().ctor_2093(SyntaxKind.IfDirectiveTrivia, hashToken, ifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue, this.context);
        }
        public ElifDirectiveTrivia(hashToken: SyntaxToken, elifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): ElifDirectiveTriviaSyntax {
            return new ElifDirectiveTriviaSyntax().ctor_7592(SyntaxKind.ElifDirectiveTrivia, hashToken, elifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue, this.context);
        }
        public ElseDirectiveTrivia(hashToken: SyntaxToken, elseKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean): ElseDirectiveTriviaSyntax {
            return new ElseDirectiveTriviaSyntax().ctor_2016(SyntaxKind.ElseDirectiveTrivia, hashToken, elseKeyword, endOfDirectiveToken, isActive, branchTaken, this.context);
        }
        public EndIfDirectiveTrivia(hashToken: SyntaxToken, endIfKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndIfDirectiveTriviaSyntax {
            return new EndIfDirectiveTriviaSyntax().ctor_6683(SyntaxKind.EndIfDirectiveTrivia, hashToken, endIfKeyword, endOfDirectiveToken, isActive, this.context);
        }
        public RegionDirectiveTrivia(hashToken: SyntaxToken, regionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): RegionDirectiveTriviaSyntax {
            return new RegionDirectiveTriviaSyntax().ctor_1982(SyntaxKind.RegionDirectiveTrivia, hashToken, regionKeyword, endOfDirectiveToken, isActive, this.context);
        }
        public EndRegionDirectiveTrivia(hashToken: SyntaxToken, endRegionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndRegionDirectiveTriviaSyntax {
            return new EndRegionDirectiveTriviaSyntax().ctor_1167(SyntaxKind.EndRegionDirectiveTrivia, hashToken, endRegionKeyword, endOfDirectiveToken, isActive, this.context);
        }
        public ErrorDirectiveTrivia(hashToken: SyntaxToken, errorKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ErrorDirectiveTriviaSyntax {
            return new ErrorDirectiveTriviaSyntax().ctor_3594(SyntaxKind.ErrorDirectiveTrivia, hashToken, errorKeyword, endOfDirectiveToken, isActive, this.context);
        }
        public WarningDirectiveTrivia(hashToken: SyntaxToken, warningKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): WarningDirectiveTriviaSyntax {
            return new WarningDirectiveTriviaSyntax().ctor_1502(SyntaxKind.WarningDirectiveTrivia, hashToken, warningKeyword, endOfDirectiveToken, isActive, this.context);
        }
        public BadDirectiveTrivia(hashToken: SyntaxToken, identifier: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): BadDirectiveTriviaSyntax {
            return new BadDirectiveTriviaSyntax().ctor_1120(SyntaxKind.BadDirectiveTrivia, hashToken, identifier, endOfDirectiveToken, isActive, this.context);
        }
        public DefineDirectiveTrivia(hashToken: SyntaxToken, defineKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): DefineDirectiveTriviaSyntax {
            return new DefineDirectiveTriviaSyntax().ctor_1673(SyntaxKind.DefineDirectiveTrivia, hashToken, defineKeyword, name, endOfDirectiveToken, isActive, this.context);
        }
        public UndefDirectiveTrivia(hashToken: SyntaxToken, undefKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): UndefDirectiveTriviaSyntax {
            return new UndefDirectiveTriviaSyntax().ctor_1192(SyntaxKind.UndefDirectiveTrivia, hashToken, undefKeyword, name, endOfDirectiveToken, isActive, this.context);
        }
        public LineDirectiveTrivia(hashToken: SyntaxToken, lineKeyword: SyntaxToken, line: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): LineDirectiveTriviaSyntax {
            return new LineDirectiveTriviaSyntax().ctor_2058(SyntaxKind.LineDirectiveTrivia, hashToken, lineKeyword, line, file, endOfDirectiveToken, isActive, this.context);
        }
        public PragmaWarningDirectiveTrivia(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, warningKeyword: SyntaxToken, disableOrRestoreKeyword: SyntaxToken, errorCodes: SeparatedSyntaxList<ExpressionSyntax>, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaWarningDirectiveTriviaSyntax {
            return new PragmaWarningDirectiveTriviaSyntax().ctor_1913(SyntaxKind.PragmaWarningDirectiveTrivia, hashToken, pragmaKeyword, warningKeyword, disableOrRestoreKeyword, errorCodes.Node, endOfDirectiveToken, isActive, this.context);
        }
        public PragmaChecksumDirectiveTrivia(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, checksumKeyword: SyntaxToken, file: SyntaxToken, guid: SyntaxToken, bytes: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaChecksumDirectiveTriviaSyntax {
            return new PragmaChecksumDirectiveTriviaSyntax().ctor_1957(SyntaxKind.PragmaChecksumDirectiveTrivia, hashToken, pragmaKeyword, checksumKeyword, file, guid, bytes, endOfDirectiveToken, isActive, this.context);
        }
        public ReferenceDirectiveTrivia(hashToken: SyntaxToken, referenceKeyword: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ReferenceDirectiveTriviaSyntax {
            return new ReferenceDirectiveTriviaSyntax().ctor_1770(SyntaxKind.ReferenceDirectiveTrivia, hashToken, referenceKeyword, file, endOfDirectiveToken, isActive, this.context);
        }
        public InterpolatedString(stringStart: SyntaxToken, interpolatedInserts: SeparatedSyntaxList<InterpolatedStringInsertSyntax>, stringEnd: SyntaxToken): InterpolatedStringSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__94 = SyntaxNodeCache.TryGetNode_1394(<number>SyntaxKind.InterpolatedString, stringStart, interpolatedInserts.Node, stringEnd, this.context, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__94;
            if (cached != null)
                return <InterpolatedStringSyntax>cached;
            var result = new InterpolatedStringSyntax().ctor_8834(SyntaxKind.InterpolatedString, stringStart, interpolatedInserts.Node, stringEnd, this.context);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public InterpolatedStringInsert(expression: ExpressionSyntax, comma: SyntaxToken, alignment: ExpressionSyntax, format: SyntaxToken): InterpolatedStringInsertSyntax {
            return new InterpolatedStringInsertSyntax().ctor_2595(SyntaxKind.InterpolatedStringInsert, expression, comma, alignment, format, this.context);
        }
        constructor() { }
    }
   
}
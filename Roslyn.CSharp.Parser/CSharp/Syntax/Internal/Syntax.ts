///<reference path="SyntaxTrivia.ts"/>
///<reference path="SyntaxToken.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxFactory {
        private static CrLf: string = "\r\n";
        public static CarriageReturnLineFeed: SyntaxTrivia = SyntaxFactory.EndOfLine(SyntaxFactory.CrLf);
        public static LineFeed: SyntaxTrivia = SyntaxFactory.EndOfLine("\n");
        public static CarriageReturn: SyntaxTrivia = SyntaxFactory.EndOfLine("\r");
        public static Space: SyntaxTrivia = SyntaxFactory.Whitespace(" ");
        public static Tab: SyntaxTrivia = SyntaxFactory.Whitespace("\t");
        public static ElasticCarriageReturnLineFeed: SyntaxTrivia = SyntaxFactory.EndOfLine(SyntaxFactory.CrLf,/*elastic:*/true);
        public static ElasticLineFeed: SyntaxTrivia = SyntaxFactory.EndOfLine("\n",/*elastic:*/true);
        public static ElasticCarriageReturn: SyntaxTrivia = SyntaxFactory.EndOfLine("\r",/*elastic:*/true);
        public static ElasticSpace: SyntaxTrivia = SyntaxFactory.Whitespace(" ",/*elastic:*/true);
        public static ElasticTab: SyntaxTrivia = SyntaxFactory.Whitespace("\t",/*elastic:*/true);
        public static ElasticZeroSpace: SyntaxTrivia = SyntaxFactory.Whitespace(System.String.Empty,/*elastic:*/true);
        private static xmlCarriageReturnLineFeed: SyntaxToken;
        private static get XmlCarriageReturnLineFeed(): SyntaxToken {
            return SyntaxFactory.xmlCarriageReturnLineFeed != null ? SyntaxFactory.xmlCarriageReturnLineFeed : (SyntaxFactory.xmlCarriageReturnLineFeed = SyntaxFactory.XmlTextNewLine_5561(SyntaxFactory.CrLf));
        }
        public static EndOfLine(text: string, elastic: boolean = false): SyntaxTrivia {
            var trivia = SyntaxTrivia.Create(SyntaxKind.EndOfLineTrivia, text);
            if (!elastic) {
                return trivia;
            }
            return CodeAnalysis.GreenNodeExtensions.WithAnnotationsGreen(trivia,
                new Array(SyntaxAnnotation.ElasticAnnotation));
        }
        public static Whitespace(text: string, elastic: boolean = false): SyntaxTrivia {
            var trivia = SyntaxTrivia.Create(SyntaxKind.WhitespaceTrivia, text);
            if (!elastic) {
                return trivia;
            }
            return CodeAnalysis.GreenNodeExtensions.WithAnnotationsGreen(trivia,
                new Array(SyntaxAnnotation.ElasticAnnotation));
        }
        public static Comment(text: string): SyntaxTrivia {
            if (text.StartsWith("/*", System.StringComparison.Ordinal)) {
                return SyntaxTrivia.Create(SyntaxKind.MultiLineCommentTrivia, text);
            }
            else {
                return SyntaxTrivia.Create(SyntaxKind.SingleLineCommentTrivia, text);
            }
        }
        public static DisabledText(text: string): SyntaxTrivia {
            return SyntaxTrivia.Create(SyntaxKind.DisabledTextTrivia, text);
        }
        public static PreprocessingMessage(text: string): SyntaxTrivia {
            return SyntaxTrivia.Create(SyntaxKind.PreprocessingMessageTrivia, text);
        }
        public static Token_1045(kind: SyntaxKind): SyntaxToken {
            return SyntaxToken.Create_1552(kind);
        }
        public static Token_1937(leading: CSharpSyntaxNode, kind: SyntaxKind, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.Create_1118(kind, leading, trailing);
        }
        public static Token_6067(leading: CSharpSyntaxNode, kind: SyntaxKind, text: string, valueText: string, trailing: CSharpSyntaxNode): SyntaxToken {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyToken(kind));
            System.Diagnostics.Debug.Assert(kind != SyntaxKind.IdentifierToken);
            System.Diagnostics.Debug.Assert(kind != SyntaxKind.CharacterLiteralToken);
            System.Diagnostics.Debug.Assert(kind != SyntaxKind.NumericLiteralToken);
            var defaultText: string = SyntaxFacts.GetText_3915(kind);
            return kind >= SyntaxToken.FirstTokenWithWellKnownText && kind <= SyntaxToken.LastTokenWithWellKnownText && text == defaultText && valueText == defaultText ? SyntaxFactory.Token_1937(leading, kind, trailing) : SyntaxToken.WithValue_3998(kind, leading, text, valueText, trailing);
        }
        public static MissingToken_7070(kind: SyntaxKind): SyntaxToken {
            return SyntaxToken.CreateMissing(kind, null, null);
        }
        public static MissingToken_1287(leading: CSharpSyntaxNode, kind: SyntaxKind, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.CreateMissing(kind, leading, trailing);
        }
        public static Identifier_3961(text: string): SyntaxToken {
            return SyntaxFactory.Identifier_1121(SyntaxKind.IdentifierToken, null, text, text, null);
        }
        public static Identifier_2664(leading: CSharpSyntaxNode, text: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxFactory.Identifier_1121(SyntaxKind.IdentifierToken, leading, text, text, trailing);
        }
        public static Identifier_1121(contextualKind: SyntaxKind, leading: CSharpSyntaxNode, text: string, valueText: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.Identifier_1121(contextualKind, leading, text, valueText, trailing);
        }
        public static Literal_2107(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_3278(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_1844(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_7516(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_1315(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_1908(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_2002(leading: CSharpSyntaxNode, text: string, value: number, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.NumericLiteralToken, leading, text, value, trailing);
        }
        public static Literal_1989(leading: CSharpSyntaxNode, text: string, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.StringLiteralToken, leading, text, value, trailing);
        }
        public static Literal_1924(leading: CSharpSyntaxNode, text: string, kind: SyntaxKind, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(kind, leading, text, value, trailing);
        }
        public static Literal_7402(leading: CSharpSyntaxNode, text: string, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.CharacterLiteralToken, leading, text, value, trailing);
        }
        public static BadToken(leading: CSharpSyntaxNode, text: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.BadToken, leading, text, text, trailing);
        }
        public static XmlTextLiteral(leading: CSharpSyntaxNode, text: string, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.XmlTextLiteralToken, leading, text, value, trailing);
        }
        public static XmlTextNewLine_1815(leading: CSharpSyntaxNode, text: string, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            if (leading == null && trailing == null && text == SyntaxFactory.CrLf && value == SyntaxFactory.CrLf) {
                return SyntaxFactory.XmlCarriageReturnLineFeed;
            }
            return SyntaxToken.WithValue_3998(SyntaxKind.XmlTextLiteralNewLineToken, leading, text, value, trailing);
        }
        public static XmlTextNewLine_5561(text: string): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.XmlTextLiteralNewLineToken, null, text, text, null);
        }
        public static XmlEntity(leading: CSharpSyntaxNode, text: string, value: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return SyntaxToken.WithValue_3998(SyntaxKind.XmlEntityLiteralToken, leading, text, value, trailing);
        }
        public static DocumentationCommentExteriorTrivia(text: string): SyntaxTrivia {
            return SyntaxTrivia.Create(SyntaxKind.DocumentationCommentExteriorTrivia, text);
        }
        public static List_1448<TNode extends CSharpSyntaxNode>(): SyntaxList<TNode> {
            return structDefault(SyntaxList);
        }
        public static List_1131<TNode extends CSharpSyntaxNode>(node: TNode): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_1319(SyntaxListBase.List_7470(node));
        }
        public static List_1083<TNode extends CSharpSyntaxNode>(node0: TNode, node1: TNode): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_1319(SyntaxListBase.List_1257(node0, node1));
        }
        public static ListNode_3677(node0: CSharpSyntaxNode, node1: CSharpSyntaxNode): CSharpSyntaxNode {
            return SyntaxListBase.List_1257(node0, node1);
        }
        public static List_2134<TNode extends CSharpSyntaxNode>(node0: TNode, node1: TNode, node2: TNode): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_1319(SyntaxListBase.List_1258(node0, node1, node2));
        }
        public static ListNode_1805(node0: CSharpSyntaxNode, node1: CSharpSyntaxNode, node2: CSharpSyntaxNode): CSharpSyntaxNode {
            return SyntaxListBase.List_1258(node0, node1, node2);
        }
        public static List_1447<TNode extends CSharpSyntaxNode>(...nodes: TNode[]): SyntaxList<TNode> {
            if (nodes != null) {
                return new SyntaxList<TNode>().ctor_1319(SyntaxListBase.List_2130(nodes));
            }
            return structDefault(SyntaxList);
        }
        public static ListNode_1606(...nodes: CSharpSyntaxNode[]): CSharpSyntaxNode {
            return SyntaxListBase.List_2015(nodes);
        }
        public static SeparatedList_1556<TNode extends CSharpSyntaxNode>(node: TNode): SeparatedSyntaxList<TNode> {
            return new SeparatedSyntaxList<TNode>().ctor_9176(new SyntaxList<CSharpSyntaxNode>().ctor_1319(node));
        }
        public static SeparatedList_1383<TNode extends CSharpSyntaxNode>(token: SyntaxToken): SeparatedSyntaxList<TNode> {
            return new SeparatedSyntaxList<TNode>().ctor_9176(new SyntaxList<CSharpSyntaxNode>().ctor_1319(token));
        }
        public static SeparatedList_2711<TNode extends CSharpSyntaxNode>(node1: TNode, token: SyntaxToken, node2: TNode): SeparatedSyntaxList<TNode> {
            return new SeparatedSyntaxList<TNode>().ctor_9176(new SyntaxList<CSharpSyntaxNode>().ctor_1319(SyntaxListBase.List_1258(node1, token, node2)));
        }
        public static SeparatedList_3486<TNode extends CSharpSyntaxNode>(...nodes: CSharpSyntaxNode[]): SeparatedSyntaxList<TNode> {
            if (nodes != null) {
                return new SeparatedSyntaxList<TNode>().ctor_9176(SyntaxList.op_Implicit_5999<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(SyntaxListBase.List_2130(nodes)));
            }
            return structDefault(SeparatedSyntaxList);
        }
        public static GetWellKnownTrivia(): System.Collections.Generic.IEnumerable<SyntaxTrivia> {
            var __result = new Array<SyntaxTrivia>();
            __result.push(SyntaxFactory.CarriageReturnLineFeed);
            //yield return CarriageReturnLineFeed;
            __result.push(SyntaxFactory.LineFeed);
            //yield return LineFeed;
            __result.push(SyntaxFactory.CarriageReturn);
            //yield return CarriageReturn;
            __result.push(SyntaxFactory.Space);
            //yield return Space;
            __result.push(SyntaxFactory.Tab);
            //yield return Tab;
            __result.push(SyntaxFactory.ElasticCarriageReturnLineFeed);
            //yield return ElasticCarriageReturnLineFeed;
            __result.push(SyntaxFactory.ElasticLineFeed);
            //yield return ElasticLineFeed;
            __result.push(SyntaxFactory.ElasticCarriageReturn);
            //yield return ElasticCarriageReturn;
            __result.push(SyntaxFactory.ElasticSpace);
            //yield return ElasticSpace;
            __result.push(SyntaxFactory.ElasticTab);
            //yield return ElasticTab;
            __result.push(SyntaxFactory.ElasticZeroSpace);
            //yield return ElasticZeroSpace;
            return __result;
        }
        public static GetWellKnownTokens(): System.Collections.Generic.IEnumerable<SyntaxToken> {
            return SyntaxToken.GetWellKnownTokens();
        }

        // partial
        public static IdentifierName(identifier: SyntaxToken): IdentifierNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__617 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.IdentifierName, identifier, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__617;
            if (cached != null)
                return <IdentifierNameSyntax>cached;
            var result = new IdentifierNameSyntax().ctor_1665(SyntaxKind.IdentifierName, identifier);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static QualifiedName(left: NameSyntax, dotToken: SyntaxToken, right: SimpleNameSyntax): QualifiedNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__26 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.QualifiedName, left, dotToken, right, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__26;
            if (cached != null)
                return <QualifiedNameSyntax>cached;
            var result = new QualifiedNameSyntax().ctor_9191(SyntaxKind.QualifiedName, left, dotToken, right);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static GenericName(identifier: SyntaxToken, typeArgumentList: TypeArgumentListSyntax): GenericNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__46 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.GenericName, identifier, typeArgumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__46;
            if (cached != null)
                return <GenericNameSyntax>cached;
            var result = new GenericNameSyntax().ctor_9369(SyntaxKind.GenericName, identifier, typeArgumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TypeArgumentList(lessThanToken: SyntaxToken, arguments: SeparatedSyntaxList<TypeSyntax>, greaterThanToken: SyntaxToken): TypeArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__619 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.TypeArgumentList, lessThanToken, arguments.Node, greaterThanToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__619;
            if (cached != null)
                return <TypeArgumentListSyntax>cached;
            var result = new TypeArgumentListSyntax().ctor_1421(SyntaxKind.TypeArgumentList, lessThanToken, arguments.Node, greaterThanToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AliasQualifiedName(alias: IdentifierNameSyntax, colonColonToken: SyntaxToken, name: SimpleNameSyntax): AliasQualifiedNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__105 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.AliasQualifiedName, alias, colonColonToken, name, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__105;
            if (cached != null)
                return <AliasQualifiedNameSyntax>cached;
            var result = new AliasQualifiedNameSyntax().ctor_1992(SyntaxKind.AliasQualifiedName, alias, colonColonToken, name);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static PredefinedType(keyword: SyntaxToken): PredefinedTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__627 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.PredefinedType, keyword, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__627;
            if (cached != null)
                return <PredefinedTypeSyntax>cached;
            var result = new PredefinedTypeSyntax().ctor_4867(SyntaxKind.PredefinedType, keyword);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ArrayType(elementType: TypeSyntax, rankSpecifiers: SyntaxList<ArrayRankSpecifierSyntax>): ArrayTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__448 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ArrayType, elementType, rankSpecifiers.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__448;
            if (cached != null)
                return <ArrayTypeSyntax>cached;
            var result = new ArrayTypeSyntax().ctor_3609(SyntaxKind.ArrayType, elementType, rankSpecifiers.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ArrayRankSpecifier(openBracketToken: SyntaxToken, sizes: SeparatedSyntaxList<ExpressionSyntax>, closeBracketToken: SyntaxToken): ArrayRankSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__891 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ArrayRankSpecifier, openBracketToken, sizes.Node, closeBracketToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__891;
            if (cached != null)
                return <ArrayRankSpecifierSyntax>cached;
            var result = new ArrayRankSpecifierSyntax().ctor_5670(SyntaxKind.ArrayRankSpecifier, openBracketToken, sizes.Node, closeBracketToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static PointerType(elementType: TypeSyntax, asteriskToken: SyntaxToken): PointerTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__314 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.PointerType, elementType, asteriskToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__314;
            if (cached != null)
                return <PointerTypeSyntax>cached;
            var result = new PointerTypeSyntax().ctor_1332(SyntaxKind.PointerType, elementType, asteriskToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static NullableType(elementType: TypeSyntax, questionToken: SyntaxToken): NullableTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__437 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.NullableType, elementType, questionToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__437;
            if (cached != null)
                return <NullableTypeSyntax>cached;
            var result = new NullableTypeSyntax().ctor_1751(SyntaxKind.NullableType, elementType, questionToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static OmittedTypeArgument(omittedTypeArgumentToken: SyntaxToken): OmittedTypeArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__678 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.OmittedTypeArgument, omittedTypeArgumentToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__678;
            if (cached != null)
                return <OmittedTypeArgumentSyntax>cached;
            var result = new OmittedTypeArgumentSyntax().ctor_4471(SyntaxKind.OmittedTypeArgument, omittedTypeArgumentToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ParenthesizedExpression(openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): ParenthesizedExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__732 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ParenthesizedExpression, openParenToken, expression, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__732;
            if (cached != null)
                return <ParenthesizedExpressionSyntax>cached;
            var result = new ParenthesizedExpressionSyntax().ctor_1449(SyntaxKind.ParenthesizedExpression, openParenToken, expression, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static PrefixUnaryExpression(kind: SyntaxKind, operatorToken: SyntaxToken, operand: ExpressionSyntax): PrefixUnaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__781 = SyntaxNodeCache.TryGetNode_1376(<number>kind, operatorToken, operand, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__781;
            if (cached != null)
                return <PrefixUnaryExpressionSyntax>cached;
            var result = new PrefixUnaryExpressionSyntax().ctor_5025(kind, operatorToken, operand);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AwaitExpression(awaitKeyword: SyntaxToken, expression: ExpressionSyntax): AwaitExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__241 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.AwaitExpression, awaitKeyword, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__241;
            if (cached != null)
                return <AwaitExpressionSyntax>cached;
            var result = new AwaitExpressionSyntax().ctor_1403(SyntaxKind.AwaitExpression, awaitKeyword, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static PostfixUnaryExpression(kind: SyntaxKind, operand: ExpressionSyntax, operatorToken: SyntaxToken): PostfixUnaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__530 = SyntaxNodeCache.TryGetNode_1376(<number>kind, operand, operatorToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__530;
            if (cached != null)
                return <PostfixUnaryExpressionSyntax>cached;
            var result = new PostfixUnaryExpressionSyntax().ctor_1442(kind, operand, operatorToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static MemberAccessExpression(kind: SyntaxKind, expression: ExpressionSyntax, operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__141 = SyntaxNodeCache.TryGetNode_1765(<number>kind, expression, operatorToken, name, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__141;
            if (cached != null)
                return <MemberAccessExpressionSyntax>cached;
            var result = new MemberAccessExpressionSyntax().ctor_6416(kind, expression, operatorToken, name);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ConditionalAccessExpression(expression: ExpressionSyntax, operatorToken: SyntaxToken, whenNotNull: ExpressionSyntax): ConditionalAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__54 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ConditionalAccessExpression, expression, operatorToken, whenNotNull, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__54;
            if (cached != null)
                return <ConditionalAccessExpressionSyntax>cached;
            var result = new ConditionalAccessExpressionSyntax().ctor_1887(SyntaxKind.ConditionalAccessExpression, expression, operatorToken, whenNotNull);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static MemberBindingExpression(operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberBindingExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__551 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.MemberBindingExpression, operatorToken, name, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__551;
            if (cached != null)
                return <MemberBindingExpressionSyntax>cached;
            var result = new MemberBindingExpressionSyntax().ctor_4500(SyntaxKind.MemberBindingExpression, operatorToken, name);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ElementBindingExpression(argumentList: BracketedArgumentListSyntax): ElementBindingExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__97 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.ElementBindingExpression, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__97;
            if (cached != null)
                return <ElementBindingExpressionSyntax>cached;
            var result = new ElementBindingExpressionSyntax().ctor_2574(SyntaxKind.ElementBindingExpression, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ImplicitElementAccess(argumentList: BracketedArgumentListSyntax): ImplicitElementAccessSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__398 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.ImplicitElementAccess, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__398;
            if (cached != null)
                return <ImplicitElementAccessSyntax>cached;
            var result = new ImplicitElementAccessSyntax().ctor_1156(SyntaxKind.ImplicitElementAccess, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static BinaryExpression(kind: SyntaxKind, left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): BinaryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__801 = SyntaxNodeCache.TryGetNode_1765(<number>kind, left, operatorToken, right, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__801;
            if (cached != null)
                return <BinaryExpressionSyntax>cached;
            var result = new BinaryExpressionSyntax().ctor_3463(kind, left, operatorToken, right);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AssignmentExpression(kind: SyntaxKind, left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): AssignmentExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__841 = SyntaxNodeCache.TryGetNode_1765(<number>kind, left, operatorToken, right, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__841;
            if (cached != null)
                return <AssignmentExpressionSyntax>cached;
            var result = new AssignmentExpressionSyntax().ctor_2044(kind, left, operatorToken, right);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ConditionalExpression(condition: ExpressionSyntax, questionToken: SyntaxToken, whenTrue: ExpressionSyntax, colonToken: SyntaxToken, whenFalse: ExpressionSyntax): ConditionalExpressionSyntax {
            return new ConditionalExpressionSyntax().ctor_1059(SyntaxKind.ConditionalExpression, condition, questionToken, whenTrue, colonToken, whenFalse);
        }
        public static ThisExpression(token: SyntaxToken): ThisExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__477 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.ThisExpression, token, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__477;
            if (cached != null)
                return <ThisExpressionSyntax>cached;
            var result = new ThisExpressionSyntax().ctor_1863(SyntaxKind.ThisExpression, token);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static BaseExpression(token: SyntaxToken): BaseExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__227 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.BaseExpression, token, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__227;
            if (cached != null)
                return <BaseExpressionSyntax>cached;
            var result = new BaseExpressionSyntax().ctor_1616(SyntaxKind.BaseExpression, token);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static LiteralExpression(kind: SyntaxKind, token: SyntaxToken): LiteralExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__851 = SyntaxNodeCache.TryGetNode_5499(<number>kind, token, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__851;
            if (cached != null)
                return <LiteralExpressionSyntax>cached;
            var result = new LiteralExpressionSyntax().ctor_1875(kind, token);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static MakeRefExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): MakeRefExpressionSyntax {
            return new MakeRefExpressionSyntax().ctor_2439(SyntaxKind.MakeRefExpression, keyword, openParenToken, expression, closeParenToken);
        }
        public static RefTypeExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): RefTypeExpressionSyntax {
            return new RefTypeExpressionSyntax().ctor_2137(SyntaxKind.RefTypeExpression, keyword, openParenToken, expression, closeParenToken);
        }
        public static RefValueExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, comma: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): RefValueExpressionSyntax {
            return new RefValueExpressionSyntax().ctor_7980(SyntaxKind.RefValueExpression, keyword, openParenToken, expression, comma, type, closeParenToken);
        }
        public static CheckedExpression(kind: SyntaxKind, keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): CheckedExpressionSyntax {
            return new CheckedExpressionSyntax().ctor_1447(kind, keyword, openParenToken, expression, closeParenToken);
        }
        public static DefaultExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): DefaultExpressionSyntax {
            return new DefaultExpressionSyntax().ctor_1190(SyntaxKind.DefaultExpression, keyword, openParenToken, type, closeParenToken);
        }
        public static TypeOfExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): TypeOfExpressionSyntax {
            return new TypeOfExpressionSyntax().ctor_2174(SyntaxKind.TypeOfExpression, keyword, openParenToken, type, closeParenToken);
        }
        public static SizeOfExpression(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): SizeOfExpressionSyntax {
            return new SizeOfExpressionSyntax().ctor_4244(SyntaxKind.SizeOfExpression, keyword, openParenToken, type, closeParenToken);
        }
        public static InvocationExpression(expression: ExpressionSyntax, argumentList: ArgumentListSyntax): InvocationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__300 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.InvocationExpression, expression, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__300;
            if (cached != null)
                return <InvocationExpressionSyntax>cached;
            var result = new InvocationExpressionSyntax().ctor_1650(SyntaxKind.InvocationExpression, expression, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ElementAccessExpression(expression: ExpressionSyntax, argumentList: BracketedArgumentListSyntax): ElementAccessExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__14 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ElementAccessExpression, expression, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__14;
            if (cached != null)
                return <ElementAccessExpressionSyntax>cached;
            var result = new ElementAccessExpressionSyntax().ctor_1465(SyntaxKind.ElementAccessExpression, expression, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ArgumentList(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeParenToken: SyntaxToken): ArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__47 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ArgumentList, openParenToken, arguments.Node, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__47;
            if (cached != null)
                return <ArgumentListSyntax>cached;
            var result = new ArgumentListSyntax().ctor_1509(SyntaxKind.ArgumentList, openParenToken, arguments.Node, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static BracketedArgumentList(openBracketToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeBracketToken: SyntaxToken): BracketedArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__744 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.BracketedArgumentList, openBracketToken, arguments.Node, closeBracketToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__744;
            if (cached != null)
                return <BracketedArgumentListSyntax>cached;
            var result = new BracketedArgumentListSyntax().ctor_2475(SyntaxKind.BracketedArgumentList, openBracketToken, arguments.Node, closeBracketToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static Argument(nameColon: NameColonSyntax, refOrOutKeyword: SyntaxToken, expression: ExpressionSyntax): ArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__520 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.Argument, nameColon, refOrOutKeyword, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__520;
            if (cached != null)
                return <ArgumentSyntax>cached;
            var result = new ArgumentSyntax().ctor_1629(SyntaxKind.Argument, nameColon, refOrOutKeyword, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static NameColon(name: IdentifierNameSyntax, colonToken: SyntaxToken): NameColonSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__705 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.NameColon, name, colonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__705;
            if (cached != null)
                return <NameColonSyntax>cached;
            var result = new NameColonSyntax().ctor_5628(SyntaxKind.NameColon, name, colonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static CastExpression(openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken, expression: ExpressionSyntax): CastExpressionSyntax {
            return new CastExpressionSyntax().ctor_1715(SyntaxKind.CastExpression, openParenToken, type, closeParenToken, expression);
        }
        public static AnonymousMethodExpression(asyncKeyword: SyntaxToken, delegateKeyword: SyntaxToken, parameterList: ParameterListSyntax, block: BlockSyntax): AnonymousMethodExpressionSyntax {
            return new AnonymousMethodExpressionSyntax().ctor_1422(SyntaxKind.AnonymousMethodExpression, asyncKeyword, delegateKeyword, parameterList, block);
        }
        public static SimpleLambdaExpression(asyncKeyword: SyntaxToken, parameter: ParameterSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): SimpleLambdaExpressionSyntax {
            return new SimpleLambdaExpressionSyntax().ctor_6581(SyntaxKind.SimpleLambdaExpression, asyncKeyword, parameter, arrowToken, body);
        }
        public static ParenthesizedLambdaExpression(asyncKeyword: SyntaxToken, parameterList: ParameterListSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): ParenthesizedLambdaExpressionSyntax {
            return new ParenthesizedLambdaExpressionSyntax().ctor_1888(SyntaxKind.ParenthesizedLambdaExpression, asyncKeyword, parameterList, arrowToken, body);
        }
        public static InitializerExpression(kind: SyntaxKind, openBraceToken: SyntaxToken, expressions: SeparatedSyntaxList<ExpressionSyntax>, closeBraceToken: SyntaxToken): InitializerExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__667 = SyntaxNodeCache.TryGetNode_1765(<number>kind, openBraceToken, expressions.Node, closeBraceToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__667;
            if (cached != null)
                return <InitializerExpressionSyntax>cached;
            var result = new InitializerExpressionSyntax().ctor_8197(kind, openBraceToken, expressions.Node, closeBraceToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ObjectCreationExpression(newKeyword: SyntaxToken, type: TypeSyntax, argumentList: ArgumentListSyntax, initializer: InitializerExpressionSyntax): ObjectCreationExpressionSyntax {
            return new ObjectCreationExpressionSyntax().ctor_9625(SyntaxKind.ObjectCreationExpression, newKeyword, type, argumentList, initializer);
        }
        public static AnonymousObjectMemberDeclarator(nameEquals: NameEqualsSyntax, expression: ExpressionSyntax): AnonymousObjectMemberDeclaratorSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__599 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.AnonymousObjectMemberDeclarator, nameEquals, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__599;
            if (cached != null)
                return <AnonymousObjectMemberDeclaratorSyntax>cached;
            var result = new AnonymousObjectMemberDeclaratorSyntax().ctor_5919(SyntaxKind.AnonymousObjectMemberDeclarator, nameEquals, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AnonymousObjectCreationExpression(newKeyword: SyntaxToken, openBraceToken: SyntaxToken, initializers: SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax>, closeBraceToken: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            return new AnonymousObjectCreationExpressionSyntax().ctor_1877(SyntaxKind.AnonymousObjectCreationExpression, newKeyword, openBraceToken, initializers.Node, closeBraceToken);
        }
        public static ArrayCreationExpression(newKeyword: SyntaxToken, type: ArrayTypeSyntax, initializer: InitializerExpressionSyntax): ArrayCreationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__905 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ArrayCreationExpression, newKeyword, type, initializer, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__905;
            if (cached != null)
                return <ArrayCreationExpressionSyntax>cached;
            var result = new ArrayCreationExpressionSyntax().ctor_1874(SyntaxKind.ArrayCreationExpression, newKeyword, type, initializer);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ImplicitArrayCreationExpression(newKeyword: SyntaxToken, openBracketToken: SyntaxToken, commas: SyntaxList<SyntaxToken>, closeBracketToken: SyntaxToken, initializer: InitializerExpressionSyntax): ImplicitArrayCreationExpressionSyntax {
            return new ImplicitArrayCreationExpressionSyntax().ctor_1986(SyntaxKind.ImplicitArrayCreationExpression, newKeyword, openBracketToken, commas.Node, closeBracketToken, initializer);
        }
        public static StackAllocArrayCreationExpression(stackAllocKeyword: SyntaxToken, type: TypeSyntax): StackAllocArrayCreationExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__755 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.StackAllocArrayCreationExpression, stackAllocKeyword, type, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__755;
            if (cached != null)
                return <StackAllocArrayCreationExpressionSyntax>cached;
            var result = new StackAllocArrayCreationExpressionSyntax().ctor_4738(SyntaxKind.StackAllocArrayCreationExpression, stackAllocKeyword, type);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static QueryExpression(fromClause: FromClauseSyntax, body: QueryBodySyntax): QueryExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__588 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.QueryExpression, fromClause, body, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__588;
            if (cached != null)
                return <QueryExpressionSyntax>cached;
            var result = new QueryExpressionSyntax().ctor_2030(SyntaxKind.QueryExpression, fromClause, body);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static QueryBody(clauses: SyntaxList<QueryClauseSyntax>, selectOrGroup: SelectOrGroupClauseSyntax, continuation: QueryContinuationSyntax): QueryBodySyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__782 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.QueryBody, clauses.Node, selectOrGroup, continuation, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__782;
            if (cached != null)
                return <QueryBodySyntax>cached;
            var result = new QueryBodySyntax().ctor_1652(SyntaxKind.QueryBody, clauses.Node, selectOrGroup, continuation);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static FromClause(fromKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax): FromClauseSyntax {
            return new FromClauseSyntax().ctor_1051(SyntaxKind.FromClause, fromKeyword, type, identifier, inKeyword, expression);
        }
        public static LetClause(letKeyword: SyntaxToken, identifier: SyntaxToken, equalsToken: SyntaxToken, expression: ExpressionSyntax): LetClauseSyntax {
            return new LetClauseSyntax().ctor_1414(SyntaxKind.LetClause, letKeyword, identifier, equalsToken, expression);
        }
        public static JoinClause(joinKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, inExpression: ExpressionSyntax, onKeyword: SyntaxToken, leftExpression: ExpressionSyntax, equalsKeyword: SyntaxToken, rightExpression: ExpressionSyntax, into: JoinIntoClauseSyntax): JoinClauseSyntax {
            return new JoinClauseSyntax().ctor_8909(SyntaxKind.JoinClause, joinKeyword, type, identifier, inKeyword, inExpression, onKeyword, leftExpression, equalsKeyword, rightExpression, into);
        }
        public static JoinIntoClause(intoKeyword: SyntaxToken, identifier: SyntaxToken): JoinIntoClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__394 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.JoinIntoClause, intoKeyword, identifier, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__394;
            if (cached != null)
                return <JoinIntoClauseSyntax>cached;
            var result = new JoinIntoClauseSyntax().ctor_7536(SyntaxKind.JoinIntoClause, intoKeyword, identifier);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static WhereClause(whereKeyword: SyntaxToken, condition: ExpressionSyntax): WhereClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__452 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.WhereClause, whereKeyword, condition, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__452;
            if (cached != null)
                return <WhereClauseSyntax>cached;
            var result = new WhereClauseSyntax().ctor_4278(SyntaxKind.WhereClause, whereKeyword, condition);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static OrderByClause(orderByKeyword: SyntaxToken, orderings: SeparatedSyntaxList<OrderingSyntax>): OrderByClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__179 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.OrderByClause, orderByKeyword, orderings.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__179;
            if (cached != null)
                return <OrderByClauseSyntax>cached;
            var result = new OrderByClauseSyntax().ctor_1533(SyntaxKind.OrderByClause, orderByKeyword, orderings.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static Ordering(kind: SyntaxKind, expression: ExpressionSyntax, ascendingOrDescendingKeyword: SyntaxToken): OrderingSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__798 = SyntaxNodeCache.TryGetNode_1376(<number>kind, expression, ascendingOrDescendingKeyword, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__798;
            if (cached != null)
                return <OrderingSyntax>cached;
            var result = new OrderingSyntax().ctor_1862(kind, expression, ascendingOrDescendingKeyword);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static SelectClause(selectKeyword: SyntaxToken, expression: ExpressionSyntax): SelectClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__744 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.SelectClause, selectKeyword, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__744;
            if (cached != null)
                return <SelectClauseSyntax>cached;
            var result = new SelectClauseSyntax().ctor_3738(SyntaxKind.SelectClause, selectKeyword, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static GroupClause(groupKeyword: SyntaxToken, groupExpression: ExpressionSyntax, byKeyword: SyntaxToken, byExpression: ExpressionSyntax): GroupClauseSyntax {
            return new GroupClauseSyntax().ctor_7027(SyntaxKind.GroupClause, groupKeyword, groupExpression, byKeyword, byExpression);
        }
        public static QueryContinuation(intoKeyword: SyntaxToken, identifier: SyntaxToken, body: QueryBodySyntax): QueryContinuationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__41 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.QueryContinuation, intoKeyword, identifier, body, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__41;
            if (cached != null)
                return <QueryContinuationSyntax>cached;
            var result = new QueryContinuationSyntax().ctor_1004(SyntaxKind.QueryContinuation, intoKeyword, identifier, body);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static OmittedArraySizeExpression(omittedArraySizeExpressionToken: SyntaxToken): OmittedArraySizeExpressionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__571 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.OmittedArraySizeExpression, omittedArraySizeExpressionToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__571;
            if (cached != null)
                return <OmittedArraySizeExpressionSyntax>cached;
            var result = new OmittedArraySizeExpressionSyntax().ctor_7988(SyntaxKind.OmittedArraySizeExpression, omittedArraySizeExpressionToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static GlobalStatement(statement: StatementSyntax): GlobalStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__989 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.GlobalStatement, statement, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__989;
            if (cached != null)
                return <GlobalStatementSyntax>cached;
            var result = new GlobalStatementSyntax().ctor_1329(SyntaxKind.GlobalStatement, statement);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static Block(openBraceToken: SyntaxToken, statements: SyntaxList<StatementSyntax>, closeBraceToken: SyntaxToken): BlockSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__758 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.Block, openBraceToken, statements.Node, closeBraceToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__758;
            if (cached != null)
                return <BlockSyntax>cached;
            var result = new BlockSyntax().ctor_6549(SyntaxKind.Block, openBraceToken, statements.Node, closeBraceToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static LocalDeclarationStatement(modifiers: SyntaxList<SyntaxToken>, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): LocalDeclarationStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__89 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.LocalDeclarationStatement, modifiers.Node, declaration, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__89;
            if (cached != null)
                return <LocalDeclarationStatementSyntax>cached;
            var result = new LocalDeclarationStatementSyntax().ctor_1978(SyntaxKind.LocalDeclarationStatement, modifiers.Node, declaration, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static VariableDeclaration(type: TypeSyntax, variables: SeparatedSyntaxList<VariableDeclaratorSyntax>): VariableDeclarationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__67 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.VariableDeclaration, type, variables.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__67;
            if (cached != null)
                return <VariableDeclarationSyntax>cached;
            var result = new VariableDeclarationSyntax().ctor_1870(SyntaxKind.VariableDeclaration, type, variables.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static VariableDeclarator(identifier: SyntaxToken, argumentList: BracketedArgumentListSyntax, initializer: EqualsValueClauseSyntax): VariableDeclaratorSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__18 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.VariableDeclarator, identifier, argumentList, initializer, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__18;
            if (cached != null)
                return <VariableDeclaratorSyntax>cached;
            var result = new VariableDeclaratorSyntax().ctor_4771(SyntaxKind.VariableDeclarator, identifier, argumentList, initializer);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static EqualsValueClause(equalsToken: SyntaxToken, value: ExpressionSyntax): EqualsValueClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__113 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.EqualsValueClause, equalsToken, value, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__113;
            if (cached != null)
                return <EqualsValueClauseSyntax>cached;
            var result = new EqualsValueClauseSyntax().ctor_3240(SyntaxKind.EqualsValueClause, equalsToken, value);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ExpressionStatement(expression: ExpressionSyntax, semicolonToken: SyntaxToken): ExpressionStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__72 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ExpressionStatement, expression, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__72;
            if (cached != null)
                return <ExpressionStatementSyntax>cached;
            var result = new ExpressionStatementSyntax().ctor_9739(SyntaxKind.ExpressionStatement, expression, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static EmptyStatement(semicolonToken: SyntaxToken): EmptyStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__579 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.EmptyStatement, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__579;
            if (cached != null)
                return <EmptyStatementSyntax>cached;
            var result = new EmptyStatementSyntax().ctor_7923(SyntaxKind.EmptyStatement, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static LabeledStatement(identifier: SyntaxToken, colonToken: SyntaxToken, statement: StatementSyntax): LabeledStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__910 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.LabeledStatement, identifier, colonToken, statement, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__910;
            if (cached != null)
                return <LabeledStatementSyntax>cached;
            var result = new LabeledStatementSyntax().ctor_7158(SyntaxKind.LabeledStatement, identifier, colonToken, statement);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static GotoStatement(kind: SyntaxKind, gotoKeyword: SyntaxToken, caseOrDefaultKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): GotoStatementSyntax {
            return new GotoStatementSyntax().ctor_1284(kind, gotoKeyword, caseOrDefaultKeyword, expression, semicolonToken);
        }
        public static BreakStatement(breakKeyword: SyntaxToken, semicolonToken: SyntaxToken): BreakStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__874 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.BreakStatement, breakKeyword, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__874;
            if (cached != null)
                return <BreakStatementSyntax>cached;
            var result = new BreakStatementSyntax().ctor_1032(SyntaxKind.BreakStatement, breakKeyword, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ContinueStatement(continueKeyword: SyntaxToken, semicolonToken: SyntaxToken): ContinueStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__435 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ContinueStatement, continueKeyword, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__435;
            if (cached != null)
                return <ContinueStatementSyntax>cached;
            var result = new ContinueStatementSyntax().ctor_1547(SyntaxKind.ContinueStatement, continueKeyword, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ReturnStatement(returnKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ReturnStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__446 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ReturnStatement, returnKeyword, expression, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__446;
            if (cached != null)
                return <ReturnStatementSyntax>cached;
            var result = new ReturnStatementSyntax().ctor_1068(SyntaxKind.ReturnStatement, returnKeyword, expression, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ThrowStatement(throwKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ThrowStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__256 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ThrowStatement, throwKeyword, expression, semicolonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__256;
            if (cached != null)
                return <ThrowStatementSyntax>cached;
            var result = new ThrowStatementSyntax().ctor_5581(SyntaxKind.ThrowStatement, throwKeyword, expression, semicolonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static YieldStatement(kind: SyntaxKind, yieldKeyword: SyntaxToken, returnOrBreakKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): YieldStatementSyntax {
            return new YieldStatementSyntax().ctor_1318(kind, yieldKeyword, returnOrBreakKeyword, expression, semicolonToken);
        }
        public static WhileStatement(whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): WhileStatementSyntax {
            return new WhileStatementSyntax().ctor_1272(SyntaxKind.WhileStatement, whileKeyword, openParenToken, condition, closeParenToken, statement);
        }
        public static DoStatement(doKeyword: SyntaxToken, statement: StatementSyntax, whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, semicolonToken: SyntaxToken): DoStatementSyntax {
            return new DoStatementSyntax().ctor_2075(SyntaxKind.DoStatement, doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken);
        }
        public static ForStatement(forKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, initializers: SeparatedSyntaxList<ExpressionSyntax>, firstSemicolonToken: SyntaxToken, condition: ExpressionSyntax, secondSemicolonToken: SyntaxToken, incrementors: SeparatedSyntaxList<ExpressionSyntax>, closeParenToken: SyntaxToken, statement: StatementSyntax): ForStatementSyntax {
            return new ForStatementSyntax().ctor_2049(SyntaxKind.ForStatement, forKeyword, openParenToken, declaration, initializers.Node, firstSemicolonToken, condition, secondSemicolonToken, incrementors.Node, closeParenToken, statement);
        }
        public static ForEachStatement(forEachKeyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): ForEachStatementSyntax {
            return new ForEachStatementSyntax().ctor_1622(SyntaxKind.ForEachStatement, forEachKeyword, openParenToken, type, identifier, inKeyword, expression, closeParenToken, statement);
        }
        public static UsingStatement(usingKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): UsingStatementSyntax {
            return new UsingStatementSyntax().ctor_1678(SyntaxKind.UsingStatement, usingKeyword, openParenToken, declaration, expression, closeParenToken, statement);
        }
        public static FixedStatement(fixedKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): FixedStatementSyntax {
            return new FixedStatementSyntax().ctor_5060(SyntaxKind.FixedStatement, fixedKeyword, openParenToken, declaration, closeParenToken, statement);
        }
        public static CheckedStatement(kind: SyntaxKind, keyword: SyntaxToken, block: BlockSyntax): CheckedStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__207 = SyntaxNodeCache.TryGetNode_1376(<number>kind, keyword, block, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__207;
            if (cached != null)
                return <CheckedStatementSyntax>cached;
            var result = new CheckedStatementSyntax().ctor_4162(kind, keyword, block);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static UnsafeStatement(unsafeKeyword: SyntaxToken, block: BlockSyntax): UnsafeStatementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__365 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.UnsafeStatement, unsafeKeyword, block, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__365;
            if (cached != null)
                return <UnsafeStatementSyntax>cached;
            var result = new UnsafeStatementSyntax().ctor_9552(SyntaxKind.UnsafeStatement, unsafeKeyword, block);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static LockStatement(lockKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): LockStatementSyntax {
            return new LockStatementSyntax().ctor_1320(SyntaxKind.LockStatement, lockKeyword, openParenToken, expression, closeParenToken, statement);
        }
        public static IfStatement(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax, $else: ElseClauseSyntax): IfStatementSyntax {
            return new IfStatementSyntax().ctor_7562(SyntaxKind.IfStatement, ifKeyword, openParenToken, condition, closeParenToken, statement, $else);
        }
        public static ElseClause(elseKeyword: SyntaxToken, statement: StatementSyntax): ElseClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__166 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ElseClause, elseKeyword, statement, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__166;
            if (cached != null)
                return <ElseClauseSyntax>cached;
            var result = new ElseClauseSyntax().ctor_4115(SyntaxKind.ElseClause, elseKeyword, statement);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static SwitchStatement(switchKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, openBraceToken: SyntaxToken, sections: SyntaxList<SwitchSectionSyntax>, closeBraceToken: SyntaxToken): SwitchStatementSyntax {
            return new SwitchStatementSyntax().ctor_4816(SyntaxKind.SwitchStatement, switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, sections.Node, closeBraceToken);
        }
        public static SwitchSection(labels: SyntaxList<SwitchLabelSyntax>, statements: SyntaxList<StatementSyntax>): SwitchSectionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__945 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.SwitchSection, labels.Node, statements.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__945;
            if (cached != null)
                return <SwitchSectionSyntax>cached;
            var result = new SwitchSectionSyntax().ctor_8674(SyntaxKind.SwitchSection, labels.Node, statements.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static CaseSwitchLabel(keyword: SyntaxToken, value: ExpressionSyntax, colonToken: SyntaxToken): CaseSwitchLabelSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__894 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.CaseSwitchLabel, keyword, value, colonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__894;
            if (cached != null)
                return <CaseSwitchLabelSyntax>cached;
            var result = new CaseSwitchLabelSyntax().ctor_1897(SyntaxKind.CaseSwitchLabel, keyword, value, colonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static DefaultSwitchLabel(keyword: SyntaxToken, colonToken: SyntaxToken): DefaultSwitchLabelSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__152 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.DefaultSwitchLabel, keyword, colonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__152;
            if (cached != null)
                return <DefaultSwitchLabelSyntax>cached;
            var result = new DefaultSwitchLabelSyntax().ctor_8179(SyntaxKind.DefaultSwitchLabel, keyword, colonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TryStatement(tryKeyword: SyntaxToken, block: BlockSyntax, catches: SyntaxList<CatchClauseSyntax>, $finally: FinallyClauseSyntax): TryStatementSyntax {
            return new TryStatementSyntax().ctor_1395(SyntaxKind.TryStatement, tryKeyword, block, catches.Node, $finally);
        }
        public static CatchClause(catchKeyword: SyntaxToken, declaration: CatchDeclarationSyntax, filter: CatchFilterClauseSyntax, block: BlockSyntax): CatchClauseSyntax {
            return new CatchClauseSyntax().ctor_1985(SyntaxKind.CatchClause, catchKeyword, declaration, filter, block);
        }
        public static CatchDeclaration(openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, closeParenToken: SyntaxToken): CatchDeclarationSyntax {
            return new CatchDeclarationSyntax().ctor_2026(SyntaxKind.CatchDeclaration, openParenToken, type, identifier, closeParenToken);
        }
        public static CatchFilterClause(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, filterExpression: ExpressionSyntax, closeParenToken: SyntaxToken): CatchFilterClauseSyntax {
            return new CatchFilterClauseSyntax().ctor_1409(SyntaxKind.CatchFilterClause, ifKeyword, openParenToken, filterExpression, closeParenToken);
        }
        public static FinallyClause(finallyKeyword: SyntaxToken, block: BlockSyntax): FinallyClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__897 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.FinallyClause, finallyKeyword, block, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__897;
            if (cached != null)
                return <FinallyClauseSyntax>cached;
            var result = new FinallyClauseSyntax().ctor_1019(SyntaxKind.FinallyClause, finallyKeyword, block);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static CompilationUnit(externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, attributeLists: SyntaxList<AttributeListSyntax>, members: SyntaxList<MemberDeclarationSyntax>, endOfFileToken: SyntaxToken): CompilationUnitSyntax {
            return new CompilationUnitSyntax().ctor_1196(SyntaxKind.CompilationUnit, externs.Node, usings.Node, attributeLists.Node, members.Node, endOfFileToken);
        }
        public static ExternAliasDirective(externKeyword: SyntaxToken, aliasKeyword: SyntaxToken, identifier: SyntaxToken, semicolonToken: SyntaxToken): ExternAliasDirectiveSyntax {
            return new ExternAliasDirectiveSyntax().ctor_9086(SyntaxKind.ExternAliasDirective, externKeyword, aliasKeyword, identifier, semicolonToken);
        }
        public static UsingDirective(usingKeyword: SyntaxToken, staticKeyword: SyntaxToken, alias: NameEqualsSyntax, name: NameSyntax, semicolonToken: SyntaxToken): UsingDirectiveSyntax {
            return new UsingDirectiveSyntax().ctor_4334(SyntaxKind.UsingDirective, usingKeyword, staticKeyword, alias, name, semicolonToken);
        }
        public static NamespaceDeclaration(namespaceKeyword: SyntaxToken, name: NameSyntax, openBraceToken: SyntaxToken, externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): NamespaceDeclarationSyntax {
            return new NamespaceDeclarationSyntax().ctor_5721(SyntaxKind.NamespaceDeclaration, namespaceKeyword, name, openBraceToken, externs.Node, usings.Node, members.Node, closeBraceToken, semicolonToken);
        }
        public static AttributeList(openBracketToken: SyntaxToken, target: AttributeTargetSpecifierSyntax, attributes: SeparatedSyntaxList<AttributeSyntax>, closeBracketToken: SyntaxToken): AttributeListSyntax {
            return new AttributeListSyntax().ctor_7159(SyntaxKind.AttributeList, openBracketToken, target, attributes.Node, closeBracketToken);
        }
        public static AttributeTargetSpecifier(identifier: SyntaxToken, colonToken: SyntaxToken): AttributeTargetSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__742 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.AttributeTargetSpecifier, identifier, colonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__742;
            if (cached != null)
                return <AttributeTargetSpecifierSyntax>cached;
            var result = new AttributeTargetSpecifierSyntax().ctor_7732(SyntaxKind.AttributeTargetSpecifier, identifier, colonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static Attribute(name: NameSyntax, argumentList: AttributeArgumentListSyntax): AttributeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__38 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.Attribute, name, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__38;
            if (cached != null)
                return <AttributeSyntax>cached;
            var result = new AttributeSyntax().ctor_1785(SyntaxKind.Attribute, name, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AttributeArgumentList(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<AttributeArgumentSyntax>, closeParenToken: SyntaxToken): AttributeArgumentListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__490 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.AttributeArgumentList, openParenToken, arguments.Node, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__490;
            if (cached != null)
                return <AttributeArgumentListSyntax>cached;
            var result = new AttributeArgumentListSyntax().ctor_7160(SyntaxKind.AttributeArgumentList, openParenToken, arguments.Node, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AttributeArgument(nameEquals: NameEqualsSyntax, nameColon: NameColonSyntax, expression: ExpressionSyntax): AttributeArgumentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__355 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.AttributeArgument, nameEquals, nameColon, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__355;
            if (cached != null)
                return <AttributeArgumentSyntax>cached;
            var result = new AttributeArgumentSyntax().ctor_1277(SyntaxKind.AttributeArgument, nameEquals, nameColon, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static NameEquals(name: IdentifierNameSyntax, equalsToken: SyntaxToken): NameEqualsSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__786 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.NameEquals, name, equalsToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__786;
            if (cached != null)
                return <NameEqualsSyntax>cached;
            var result = new NameEqualsSyntax().ctor_1747(SyntaxKind.NameEquals, name, equalsToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TypeParameterList(lessThanToken: SyntaxToken, parameters: SeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: SyntaxToken): TypeParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__760 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.TypeParameterList, lessThanToken, parameters.Node, greaterThanToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__760;
            if (cached != null)
                return <TypeParameterListSyntax>cached;
            var result = new TypeParameterListSyntax().ctor_1238(SyntaxKind.TypeParameterList, lessThanToken, parameters.Node, greaterThanToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TypeParameter(attributeLists: SyntaxList<AttributeListSyntax>, varianceKeyword: SyntaxToken, identifier: SyntaxToken): TypeParameterSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__89 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.TypeParameter, attributeLists.Node, varianceKeyword, identifier, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__89;
            if (cached != null)
                return <TypeParameterSyntax>cached;
            var result = new TypeParameterSyntax().ctor_1702(SyntaxKind.TypeParameter, attributeLists.Node, varianceKeyword, identifier);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ClassDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): ClassDeclarationSyntax {
            return new ClassDeclarationSyntax().ctor_1033(SyntaxKind.ClassDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken);
        }
        public static StructDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): StructDeclarationSyntax {
            return new StructDeclarationSyntax().ctor_2110(SyntaxKind.StructDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken);
        }
        public static InterfaceDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): InterfaceDeclarationSyntax {
            return new InterfaceDeclarationSyntax().ctor_1999(SyntaxKind.InterfaceDeclaration, attributeLists.Node, modifiers.Node, keyword, identifier, typeParameterList, baseList, constraintClauses.Node, openBraceToken, members.Node, closeBraceToken, semicolonToken);
        }
        public static EnumDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, enumKeyword: SyntaxToken, identifier: SyntaxToken, baseList: BaseListSyntax, openBraceToken: SyntaxToken, members: SeparatedSyntaxList<EnumMemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): EnumDeclarationSyntax {
            return new EnumDeclarationSyntax().ctor_5779(SyntaxKind.EnumDeclaration, attributeLists.Node, modifiers.Node, enumKeyword, identifier, baseList, openBraceToken, members.Node, closeBraceToken, semicolonToken);
        }
        public static DelegateDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, delegateKeyword: SyntaxToken, returnType: TypeSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, semicolonToken: SyntaxToken): DelegateDeclarationSyntax {
            return new DelegateDeclarationSyntax().ctor_4290(SyntaxKind.DelegateDeclaration, attributeLists.Node, modifiers.Node, delegateKeyword, returnType, identifier, typeParameterList, parameterList, constraintClauses.Node, semicolonToken);
        }
        public static EnumMemberDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, identifier: SyntaxToken, equalsValue: EqualsValueClauseSyntax): EnumMemberDeclarationSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__613 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.EnumMemberDeclaration, attributeLists.Node, identifier, equalsValue, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__613;
            if (cached != null)
                return <EnumMemberDeclarationSyntax>cached;
            var result = new EnumMemberDeclarationSyntax().ctor_2110(SyntaxKind.EnumMemberDeclaration, attributeLists.Node, identifier, equalsValue);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static BaseList(colonToken: SyntaxToken, types: SeparatedSyntaxList<BaseTypeSyntax>): BaseListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__425 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.BaseList, colonToken, types.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__425;
            if (cached != null)
                return <BaseListSyntax>cached;
            var result = new BaseListSyntax().ctor_4637(SyntaxKind.BaseList, colonToken, types.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static SimpleBaseType(type: TypeSyntax): SimpleBaseTypeSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__253 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.SimpleBaseType, type, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__253;
            if (cached != null)
                return <SimpleBaseTypeSyntax>cached;
            var result = new SimpleBaseTypeSyntax().ctor_2816(SyntaxKind.SimpleBaseType, type);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TypeParameterConstraintClause(whereKeyword: SyntaxToken, name: IdentifierNameSyntax, colonToken: SyntaxToken, constraints: SeparatedSyntaxList<TypeParameterConstraintSyntax>): TypeParameterConstraintClauseSyntax {
            return new TypeParameterConstraintClauseSyntax().ctor_7998(SyntaxKind.TypeParameterConstraintClause, whereKeyword, name, colonToken, constraints.Node);
        }
        public static ConstructorConstraint(newKeyword: SyntaxToken, openParenToken: SyntaxToken, closeParenToken: SyntaxToken): ConstructorConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__755 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ConstructorConstraint, newKeyword, openParenToken, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__755;
            if (cached != null)
                return <ConstructorConstraintSyntax>cached;
            var result = new ConstructorConstraintSyntax().ctor_2123(SyntaxKind.ConstructorConstraint, newKeyword, openParenToken, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ClassOrStructConstraint(kind: SyntaxKind, classOrStructKeyword: SyntaxToken): ClassOrStructConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__376 = SyntaxNodeCache.TryGetNode_5499(<number>kind, classOrStructKeyword, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__376;
            if (cached != null)
                return <ClassOrStructConstraintSyntax>cached;
            var result = new ClassOrStructConstraintSyntax().ctor_1052(kind, classOrStructKeyword);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static TypeConstraint(type: TypeSyntax): TypeConstraintSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__197 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.TypeConstraint, type, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__197;
            if (cached != null)
                return <TypeConstraintSyntax>cached;
            var result = new TypeConstraintSyntax().ctor_9926(SyntaxKind.TypeConstraint, type);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static FieldDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): FieldDeclarationSyntax {
            return new FieldDeclarationSyntax().ctor_1980(SyntaxKind.FieldDeclaration, attributeLists.Node, modifiers.Node, declaration, semicolonToken);
        }
        public static EventFieldDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, eventKeyword: SyntaxToken, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): EventFieldDeclarationSyntax {
            return new EventFieldDeclarationSyntax().ctor_3359(SyntaxKind.EventFieldDeclaration, attributeLists.Node, modifiers.Node, eventKeyword, declaration, semicolonToken);
        }
        public static ExplicitInterfaceSpecifier(name: NameSyntax, dotToken: SyntaxToken): ExplicitInterfaceSpecifierSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__279 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ExplicitInterfaceSpecifier, name, dotToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__279;
            if (cached != null)
                return <ExplicitInterfaceSpecifierSyntax>cached;
            var result = new ExplicitInterfaceSpecifierSyntax().ctor_1329(SyntaxKind.ExplicitInterfaceSpecifier, name, dotToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static MethodDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, returnType: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): MethodDeclarationSyntax {
            return new MethodDeclarationSyntax().ctor_1010(SyntaxKind.MethodDeclaration, attributeLists.Node, modifiers.Node, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses.Node, body, expressionBody, semicolonToken);
        }
        public static OperatorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, returnType: TypeSyntax, operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): OperatorDeclarationSyntax {
            return new OperatorDeclarationSyntax().ctor_1579(SyntaxKind.OperatorDeclaration, attributeLists.Node, modifiers.Node, returnType, operatorKeyword, operatorToken, parameterList, body, expressionBody, semicolonToken);
        }
        public static ConversionOperatorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): ConversionOperatorDeclarationSyntax {
            return new ConversionOperatorDeclarationSyntax().ctor_8245(SyntaxKind.ConversionOperatorDeclaration, attributeLists.Node, modifiers.Node, implicitOrExplicitKeyword, operatorKeyword, type, parameterList, body, expressionBody, semicolonToken);
        }
        public static ConstructorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, identifier: SyntaxToken, parameterList: ParameterListSyntax, initializer: ConstructorInitializerSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): ConstructorDeclarationSyntax {
            return new ConstructorDeclarationSyntax().ctor_1123(SyntaxKind.ConstructorDeclaration, attributeLists.Node, modifiers.Node, identifier, parameterList, initializer, body, semicolonToken);
        }
        public static ConstructorInitializer(kind: SyntaxKind, colonToken: SyntaxToken, thisOrBaseKeyword: SyntaxToken, argumentList: ArgumentListSyntax): ConstructorInitializerSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__371 = SyntaxNodeCache.TryGetNode_1765(<number>kind, colonToken, thisOrBaseKeyword, argumentList, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__371;
            if (cached != null)
                return <ConstructorInitializerSyntax>cached;
            var result = new ConstructorInitializerSyntax().ctor_6726(kind, colonToken, thisOrBaseKeyword, argumentList);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static DestructorDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, tildeToken: SyntaxToken, identifier: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): DestructorDeclarationSyntax {
            return new DestructorDeclarationSyntax().ctor_1562(SyntaxKind.DestructorDeclaration, attributeLists.Node, modifiers.Node, tildeToken, identifier, parameterList, body, semicolonToken);
        }
        public static PropertyDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, initializer: EqualsValueClauseSyntax, semicolon: SyntaxToken): PropertyDeclarationSyntax {
            return new PropertyDeclarationSyntax().ctor_4136(SyntaxKind.PropertyDeclaration, attributeLists.Node, modifiers.Node, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, semicolon);
        }
        public static ArrowExpressionClause(arrowToken: SyntaxToken, expression: ExpressionSyntax): ArrowExpressionClauseSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__199 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.ArrowExpressionClause, arrowToken, expression, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__199;
            if (cached != null)
                return <ArrowExpressionClauseSyntax>cached;
            var result = new ArrowExpressionClauseSyntax().ctor_1881(SyntaxKind.ArrowExpressionClause, arrowToken, expression);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static EventDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, eventKeyword: SyntaxToken, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax): EventDeclarationSyntax {
            return new EventDeclarationSyntax().ctor_6350(SyntaxKind.EventDeclaration, attributeLists.Node, modifiers.Node, eventKeyword, type, explicitInterfaceSpecifier, identifier, accessorList);
        }
        public static IndexerDeclaration(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, thisKeyword: SyntaxToken, parameterList: BracketedParameterListSyntax, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolon: SyntaxToken): IndexerDeclarationSyntax {
            return new IndexerDeclarationSyntax().ctor_1913(SyntaxKind.IndexerDeclaration, attributeLists.Node, modifiers.Node, type, explicitInterfaceSpecifier, thisKeyword, parameterList, accessorList, expressionBody, semicolon);
        }
        public static AccessorList(openBraceToken: SyntaxToken, accessors: SyntaxList<AccessorDeclarationSyntax>, closeBraceToken: SyntaxToken): AccessorListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__542 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.AccessorList, openBraceToken, accessors.Node, closeBraceToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__542;
            if (cached != null)
                return <AccessorListSyntax>cached;
            var result = new AccessorListSyntax().ctor_4446(SyntaxKind.AccessorList, openBraceToken, accessors.Node, closeBraceToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static AccessorDeclaration(kind: SyntaxKind, attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, keyword: SyntaxToken, body: BlockSyntax, semicolonToken: SyntaxToken): AccessorDeclarationSyntax {
            return new AccessorDeclarationSyntax().ctor_1898(kind, attributeLists.Node, modifiers.Node, keyword, body, semicolonToken);
        }
        public static ParameterList(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeParenToken: SyntaxToken): ParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__910 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.ParameterList, openParenToken, parameters.Node, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__910;
            if (cached != null)
                return <ParameterListSyntax>cached;
            var result = new ParameterListSyntax().ctor_2073(SyntaxKind.ParameterList, openParenToken, parameters.Node, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static BracketedParameterList(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeBracketToken: SyntaxToken): BracketedParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__742 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.BracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__742;
            if (cached != null)
                return <BracketedParameterListSyntax>cached;
            var result = new BracketedParameterListSyntax().ctor_3556(SyntaxKind.BracketedParameterList, openBracketToken, parameters.Node, closeBracketToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static Parameter(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax, identifier: SyntaxToken, $default: EqualsValueClauseSyntax): ParameterSyntax {
            return new ParameterSyntax().ctor_1229(SyntaxKind.Parameter, attributeLists.Node, modifiers.Node, type, identifier, $default);
        }
        public static IncompleteMember(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxList<SyntaxToken>, type: TypeSyntax): IncompleteMemberSyntax {
            return new IncompleteMemberSyntax().ctor_1869(SyntaxKind.IncompleteMember, attributeLists.Node, modifiers.Node, type);
        }
        public static SkippedTokensTrivia(tokens: SyntaxList<SyntaxToken>): SkippedTokensTriviaSyntax {
            return new SkippedTokensTriviaSyntax().ctor_1251(SyntaxKind.SkippedTokensTrivia, tokens.Node);
        }
        public static DocumentationCommentTrivia(kind: SyntaxKind, content: SyntaxList<XmlNodeSyntax>, endOfComment: SyntaxToken): DocumentationCommentTriviaSyntax {
            return new DocumentationCommentTriviaSyntax().ctor_5915(kind, content.Node, endOfComment);
        }
        public static TypeCref(type: TypeSyntax): TypeCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__208 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.TypeCref, type, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__208;
            if (cached != null)
                return <TypeCrefSyntax>cached;
            var result = new TypeCrefSyntax().ctor_8612(SyntaxKind.TypeCref, type);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static QualifiedCref(container: TypeSyntax, dotToken: SyntaxToken, member: MemberCrefSyntax): QualifiedCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__569 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.QualifiedCref, container, dotToken, member, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__569;
            if (cached != null)
                return <QualifiedCrefSyntax>cached;
            var result = new QualifiedCrefSyntax().ctor_1939(SyntaxKind.QualifiedCref, container, dotToken, member);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static NameMemberCref(name: TypeSyntax, parameters: CrefParameterListSyntax): NameMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__20 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.NameMemberCref, name, parameters, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__20;
            if (cached != null)
                return <NameMemberCrefSyntax>cached;
            var result = new NameMemberCrefSyntax().ctor_1436(SyntaxKind.NameMemberCref, name, parameters);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static IndexerMemberCref(thisKeyword: SyntaxToken, parameters: CrefBracketedParameterListSyntax): IndexerMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__50 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.IndexerMemberCref, thisKeyword, parameters, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__50;
            if (cached != null)
                return <IndexerMemberCrefSyntax>cached;
            var result = new IndexerMemberCrefSyntax().ctor_2097(SyntaxKind.IndexerMemberCref, thisKeyword, parameters);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static OperatorMemberCref(operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameters: CrefParameterListSyntax): OperatorMemberCrefSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__375 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.OperatorMemberCref, operatorKeyword, operatorToken, parameters, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__375;
            if (cached != null)
                return <OperatorMemberCrefSyntax>cached;
            var result = new OperatorMemberCrefSyntax().ctor_1625(SyntaxKind.OperatorMemberCref, operatorKeyword, operatorToken, parameters);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static ConversionOperatorMemberCref(implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameters: CrefParameterListSyntax): ConversionOperatorMemberCrefSyntax {
            return new ConversionOperatorMemberCrefSyntax().ctor_1291(SyntaxKind.ConversionOperatorMemberCref, implicitOrExplicitKeyword, operatorKeyword, type, parameters);
        }
        public static CrefParameterList(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeParenToken: SyntaxToken): CrefParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__544 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.CrefParameterList, openParenToken, parameters.Node, closeParenToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__544;
            if (cached != null)
                return <CrefParameterListSyntax>cached;
            var result = new CrefParameterListSyntax().ctor_4663(SyntaxKind.CrefParameterList, openParenToken, parameters.Node, closeParenToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static CrefBracketedParameterList(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeBracketToken: SyntaxToken): CrefBracketedParameterListSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__81 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.CrefBracketedParameterList, openBracketToken, parameters.Node, closeBracketToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__81;
            if (cached != null)
                return <CrefBracketedParameterListSyntax>cached;
            var result = new CrefBracketedParameterListSyntax().ctor_5561(SyntaxKind.CrefBracketedParameterList, openBracketToken, parameters.Node, closeBracketToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static CrefParameter(refOrOutKeyword: SyntaxToken, type: TypeSyntax): CrefParameterSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__773 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.CrefParameter, refOrOutKeyword, type, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__773;
            if (cached != null)
                return <CrefParameterSyntax>cached;
            var result = new CrefParameterSyntax().ctor_1290(SyntaxKind.CrefParameter, refOrOutKeyword, type);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlElement(startTag: XmlElementStartTagSyntax, content: SyntaxList<XmlNodeSyntax>, endTag: XmlElementEndTagSyntax): XmlElementSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__332 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.XmlElement, startTag, content.Node, endTag, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__332;
            if (cached != null)
                return <XmlElementSyntax>cached;
            var result = new XmlElementSyntax().ctor_1787(SyntaxKind.XmlElement, startTag, content.Node, endTag);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlElementStartTag(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, greaterThanToken: SyntaxToken): XmlElementStartTagSyntax {
            return new XmlElementStartTagSyntax().ctor_1726(SyntaxKind.XmlElementStartTag, lessThanToken, name, attributes.Node, greaterThanToken);
        }
        public static XmlElementEndTag(lessThanSlashToken: SyntaxToken, name: XmlNameSyntax, greaterThanToken: SyntaxToken): XmlElementEndTagSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__770 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.XmlElementEndTag, lessThanSlashToken, name, greaterThanToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__770;
            if (cached != null)
                return <XmlElementEndTagSyntax>cached;
            var result = new XmlElementEndTagSyntax().ctor_1135(SyntaxKind.XmlElementEndTag, lessThanSlashToken, name, greaterThanToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlEmptyElement(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, slashGreaterThanToken: SyntaxToken): XmlEmptyElementSyntax {
            return new XmlEmptyElementSyntax().ctor_1537(SyntaxKind.XmlEmptyElement, lessThanToken, name, attributes.Node, slashGreaterThanToken);
        }
        public static XmlName(prefix: XmlPrefixSyntax, localName: SyntaxToken): XmlNameSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__83 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.XmlName, prefix, localName, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__83;
            if (cached != null)
                return <XmlNameSyntax>cached;
            var result = new XmlNameSyntax().ctor_1073(SyntaxKind.XmlName, prefix, localName);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlPrefix(prefix: SyntaxToken, colonToken: SyntaxToken): XmlPrefixSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__593 = SyntaxNodeCache.TryGetNode_1376(<number>SyntaxKind.XmlPrefix, prefix, colonToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__593;
            if (cached != null)
                return <XmlPrefixSyntax>cached;
            var result = new XmlPrefixSyntax().ctor_1260(SyntaxKind.XmlPrefix, prefix, colonToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlTextAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, endQuoteToken: SyntaxToken): XmlTextAttributeSyntax {
            return new XmlTextAttributeSyntax().ctor_2141(SyntaxKind.XmlTextAttribute, name, equalsToken, startQuoteToken, textTokens.Node, endQuoteToken);
        }
        public static XmlCrefAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, cref: CrefSyntax, endQuoteToken: SyntaxToken): XmlCrefAttributeSyntax {
            return new XmlCrefAttributeSyntax().ctor_2049(SyntaxKind.XmlCrefAttribute, name, equalsToken, startQuoteToken, cref, endQuoteToken);
        }
        public static XmlNameAttribute(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, identifier: IdentifierNameSyntax, endQuoteToken: SyntaxToken): XmlNameAttributeSyntax {
            return new XmlNameAttributeSyntax().ctor_2001(SyntaxKind.XmlNameAttribute, name, equalsToken, startQuoteToken, identifier, endQuoteToken);
        }
        public static XmlText(textTokens: SyntaxList<SyntaxToken>): XmlTextSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__362 = SyntaxNodeCache.TryGetNode_5499(<number>SyntaxKind.XmlText, textTokens.Node, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__362;
            if (cached != null)
                return <XmlTextSyntax>cached;
            var result = new XmlTextSyntax().ctor_1049(SyntaxKind.XmlText, textTokens.Node);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlCDataSection(startCDataToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, endCDataToken: SyntaxToken): XmlCDataSectionSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__761 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.XmlCDataSection, startCDataToken, textTokens.Node, endCDataToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__761;
            if (cached != null)
                return <XmlCDataSectionSyntax>cached;
            var result = new XmlCDataSectionSyntax().ctor_1686(SyntaxKind.XmlCDataSection, startCDataToken, textTokens.Node, endCDataToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static XmlProcessingInstruction(startProcessingInstructionToken: SyntaxToken, name: XmlNameSyntax, textTokens: SyntaxList<SyntaxToken>, endProcessingInstructionToken: SyntaxToken): XmlProcessingInstructionSyntax {
            return new XmlProcessingInstructionSyntax().ctor_1064(SyntaxKind.XmlProcessingInstruction, startProcessingInstructionToken, name, textTokens.Node, endProcessingInstructionToken);
        }
        public static XmlComment(lessThanExclamationMinusMinusToken: SyntaxToken, textTokens: SyntaxList<SyntaxToken>, minusMinusGreaterThanToken: SyntaxToken): XmlCommentSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__375 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.XmlComment, lessThanExclamationMinusMinusToken, textTokens.Node, minusMinusGreaterThanToken, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__375;
            if (cached != null)
                return <XmlCommentSyntax>cached;
            var result = new XmlCommentSyntax().ctor_1033(SyntaxKind.XmlComment, lessThanExclamationMinusMinusToken, textTokens.Node, minusMinusGreaterThanToken);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static IfDirectiveTrivia(hashToken: SyntaxToken, ifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): IfDirectiveTriviaSyntax {
            return new IfDirectiveTriviaSyntax().ctor_2113(SyntaxKind.IfDirectiveTrivia, hashToken, ifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue);
        }
        public static ElifDirectiveTrivia(hashToken: SyntaxToken, elifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): ElifDirectiveTriviaSyntax {
            return new ElifDirectiveTriviaSyntax().ctor_9784(SyntaxKind.ElifDirectiveTrivia, hashToken, elifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue);
        }
        public static ElseDirectiveTrivia(hashToken: SyntaxToken, elseKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean): ElseDirectiveTriviaSyntax {
            return new ElseDirectiveTriviaSyntax().ctor_1549(SyntaxKind.ElseDirectiveTrivia, hashToken, elseKeyword, endOfDirectiveToken, isActive, branchTaken);
        }
        public static EndIfDirectiveTrivia(hashToken: SyntaxToken, endIfKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndIfDirectiveTriviaSyntax {
            return new EndIfDirectiveTriviaSyntax().ctor_2989(SyntaxKind.EndIfDirectiveTrivia, hashToken, endIfKeyword, endOfDirectiveToken, isActive);
        }
        public static RegionDirectiveTrivia(hashToken: SyntaxToken, regionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): RegionDirectiveTriviaSyntax {
            return new RegionDirectiveTriviaSyntax().ctor_2005(SyntaxKind.RegionDirectiveTrivia, hashToken, regionKeyword, endOfDirectiveToken, isActive);
        }
        public static EndRegionDirectiveTrivia(hashToken: SyntaxToken, endRegionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndRegionDirectiveTriviaSyntax {
            return new EndRegionDirectiveTriviaSyntax().ctor_1067(SyntaxKind.EndRegionDirectiveTrivia, hashToken, endRegionKeyword, endOfDirectiveToken, isActive);
        }
        public static ErrorDirectiveTrivia(hashToken: SyntaxToken, errorKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ErrorDirectiveTriviaSyntax {
            return new ErrorDirectiveTriviaSyntax().ctor_1746(SyntaxKind.ErrorDirectiveTrivia, hashToken, errorKeyword, endOfDirectiveToken, isActive);
        }
        public static WarningDirectiveTrivia(hashToken: SyntaxToken, warningKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): WarningDirectiveTriviaSyntax {
            return new WarningDirectiveTriviaSyntax().ctor_1630(SyntaxKind.WarningDirectiveTrivia, hashToken, warningKeyword, endOfDirectiveToken, isActive);
        }
        public static BadDirectiveTrivia(hashToken: SyntaxToken, identifier: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): BadDirectiveTriviaSyntax {
            return new BadDirectiveTriviaSyntax().ctor_1037(SyntaxKind.BadDirectiveTrivia, hashToken, identifier, endOfDirectiveToken, isActive);
        }
        public static DefineDirectiveTrivia(hashToken: SyntaxToken, defineKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): DefineDirectiveTriviaSyntax {
            return new DefineDirectiveTriviaSyntax().ctor_1051(SyntaxKind.DefineDirectiveTrivia, hashToken, defineKeyword, name, endOfDirectiveToken, isActive);
        }
        public static UndefDirectiveTrivia(hashToken: SyntaxToken, undefKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): UndefDirectiveTriviaSyntax {
            return new UndefDirectiveTriviaSyntax().ctor_5569(SyntaxKind.UndefDirectiveTrivia, hashToken, undefKeyword, name, endOfDirectiveToken, isActive);
        }
        public static LineDirectiveTrivia(hashToken: SyntaxToken, lineKeyword: SyntaxToken, line: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): LineDirectiveTriviaSyntax {
            return new LineDirectiveTriviaSyntax().ctor_4648(SyntaxKind.LineDirectiveTrivia, hashToken, lineKeyword, line, file, endOfDirectiveToken, isActive);
        }
        public static PragmaWarningDirectiveTrivia(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, warningKeyword: SyntaxToken, disableOrRestoreKeyword: SyntaxToken, errorCodes: SeparatedSyntaxList<ExpressionSyntax>, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaWarningDirectiveTriviaSyntax {
            return new PragmaWarningDirectiveTriviaSyntax().ctor_1755(SyntaxKind.PragmaWarningDirectiveTrivia, hashToken, pragmaKeyword, warningKeyword, disableOrRestoreKeyword, errorCodes.Node, endOfDirectiveToken, isActive);
        }
        public static PragmaChecksumDirectiveTrivia(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, checksumKeyword: SyntaxToken, file: SyntaxToken, guid: SyntaxToken, bytes: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaChecksumDirectiveTriviaSyntax {
            return new PragmaChecksumDirectiveTriviaSyntax().ctor_1214(SyntaxKind.PragmaChecksumDirectiveTrivia, hashToken, pragmaKeyword, checksumKeyword, file, guid, bytes, endOfDirectiveToken, isActive);
        }
        public static ReferenceDirectiveTrivia(hashToken: SyntaxToken, referenceKeyword: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ReferenceDirectiveTriviaSyntax {
            return new ReferenceDirectiveTriviaSyntax().ctor_7929(SyntaxKind.ReferenceDirectiveTrivia, hashToken, referenceKeyword, file, endOfDirectiveToken, isActive);
        }
        public static InterpolatedString(stringStart: SyntaxToken, interpolatedInserts: SeparatedSyntaxList<InterpolatedStringInsertSyntax>, stringEnd: SyntaxToken): InterpolatedStringSyntax {
            var hash: number = 0;
            var hash_ref0 = { refObj: hash };
            var ret_val__445 = SyntaxNodeCache.TryGetNode_1765(<number>SyntaxKind.InterpolatedString, stringStart, interpolatedInserts.Node, stringEnd, hash_ref0);

            hash = hash_ref0.refObj;
            var cached = ret_val__445;
            if (cached != null)
                return <InterpolatedStringSyntax>cached;
            var result = new InterpolatedStringSyntax().ctor_2113(SyntaxKind.InterpolatedString, stringStart, interpolatedInserts.Node, stringEnd);
            if (hash >= 0) {
                SyntaxNodeCache.AddNode(result, hash);
            }
            return result;
        }
        public static InterpolatedStringInsert(expression: ExpressionSyntax, comma: SyntaxToken, alignment: ExpressionSyntax, format: SyntaxToken): InterpolatedStringInsertSyntax {
            return new InterpolatedStringInsertSyntax().ctor_7483(SyntaxKind.InterpolatedStringInsert, expression, comma, alignment, format);
        }
        public static GetNodeTypes(): System.Collections.Generic.IEnumerable<System.Type> {
            return new Array<any>(/*typeof*/IdentifierNameSyntax,
/*typeof*/QualifiedNameSyntax,
/*typeof*/GenericNameSyntax,
/*typeof*/TypeArgumentListSyntax,
/*typeof*/AliasQualifiedNameSyntax,
/*typeof*/PredefinedTypeSyntax,
/*typeof*/ArrayTypeSyntax,
/*typeof*/ArrayRankSpecifierSyntax,
/*typeof*/PointerTypeSyntax,
/*typeof*/NullableTypeSyntax,
/*typeof*/OmittedTypeArgumentSyntax,
/*typeof*/ParenthesizedExpressionSyntax,
/*typeof*/PrefixUnaryExpressionSyntax,
/*typeof*/AwaitExpressionSyntax,
/*typeof*/PostfixUnaryExpressionSyntax,
/*typeof*/MemberAccessExpressionSyntax,
/*typeof*/ConditionalAccessExpressionSyntax,
/*typeof*/MemberBindingExpressionSyntax,
/*typeof*/ElementBindingExpressionSyntax,
/*typeof*/ImplicitElementAccessSyntax,
/*typeof*/BinaryExpressionSyntax,
/*typeof*/AssignmentExpressionSyntax,
/*typeof*/ConditionalExpressionSyntax,
/*typeof*/ThisExpressionSyntax,
/*typeof*/BaseExpressionSyntax,
/*typeof*/LiteralExpressionSyntax,
/*typeof*/MakeRefExpressionSyntax,
/*typeof*/RefTypeExpressionSyntax,
/*typeof*/RefValueExpressionSyntax,
/*typeof*/CheckedExpressionSyntax,
/*typeof*/DefaultExpressionSyntax,
/*typeof*/TypeOfExpressionSyntax,
/*typeof*/SizeOfExpressionSyntax,
/*typeof*/InvocationExpressionSyntax,
/*typeof*/ElementAccessExpressionSyntax,
/*typeof*/ArgumentListSyntax,
/*typeof*/BracketedArgumentListSyntax,
/*typeof*/ArgumentSyntax,
/*typeof*/NameColonSyntax,
/*typeof*/CastExpressionSyntax,
/*typeof*/AnonymousMethodExpressionSyntax,
/*typeof*/SimpleLambdaExpressionSyntax,
/*typeof*/ParenthesizedLambdaExpressionSyntax,
/*typeof*/InitializerExpressionSyntax,
/*typeof*/ObjectCreationExpressionSyntax,
/*typeof*/AnonymousObjectMemberDeclaratorSyntax,
/*typeof*/AnonymousObjectCreationExpressionSyntax,
/*typeof*/ArrayCreationExpressionSyntax,
/*typeof*/ImplicitArrayCreationExpressionSyntax,
/*typeof*/StackAllocArrayCreationExpressionSyntax,
/*typeof*/QueryExpressionSyntax,
/*typeof*/QueryBodySyntax,
/*typeof*/FromClauseSyntax,
/*typeof*/LetClauseSyntax,
/*typeof*/JoinClauseSyntax,
/*typeof*/JoinIntoClauseSyntax,
/*typeof*/WhereClauseSyntax,
/*typeof*/OrderByClauseSyntax,
/*typeof*/OrderingSyntax,
/*typeof*/SelectClauseSyntax,
/*typeof*/GroupClauseSyntax,
/*typeof*/QueryContinuationSyntax,
/*typeof*/OmittedArraySizeExpressionSyntax,
/*typeof*/GlobalStatementSyntax,
/*typeof*/BlockSyntax,
/*typeof*/LocalDeclarationStatementSyntax,
/*typeof*/VariableDeclarationSyntax,
/*typeof*/VariableDeclaratorSyntax,
/*typeof*/EqualsValueClauseSyntax,
/*typeof*/ExpressionStatementSyntax,
/*typeof*/EmptyStatementSyntax,
/*typeof*/LabeledStatementSyntax,
/*typeof*/GotoStatementSyntax,
/*typeof*/BreakStatementSyntax,
/*typeof*/ContinueStatementSyntax,
/*typeof*/ReturnStatementSyntax,
/*typeof*/ThrowStatementSyntax,
/*typeof*/YieldStatementSyntax,
/*typeof*/WhileStatementSyntax,
/*typeof*/DoStatementSyntax,
/*typeof*/ForStatementSyntax,
/*typeof*/ForEachStatementSyntax,
/*typeof*/UsingStatementSyntax,
/*typeof*/FixedStatementSyntax,
/*typeof*/CheckedStatementSyntax,
/*typeof*/UnsafeStatementSyntax,
/*typeof*/LockStatementSyntax,
/*typeof*/IfStatementSyntax,
/*typeof*/ElseClauseSyntax,
/*typeof*/SwitchStatementSyntax,
/*typeof*/SwitchSectionSyntax,
/*typeof*/CaseSwitchLabelSyntax,
/*typeof*/DefaultSwitchLabelSyntax,
/*typeof*/TryStatementSyntax,
/*typeof*/CatchClauseSyntax,
/*typeof*/CatchDeclarationSyntax,
/*typeof*/CatchFilterClauseSyntax,
/*typeof*/FinallyClauseSyntax,
/*typeof*/CompilationUnitSyntax,
/*typeof*/ExternAliasDirectiveSyntax,
/*typeof*/UsingDirectiveSyntax,
/*typeof*/NamespaceDeclarationSyntax,
/*typeof*/AttributeListSyntax,
/*typeof*/AttributeTargetSpecifierSyntax,
/*typeof*/AttributeSyntax,
/*typeof*/AttributeArgumentListSyntax,
/*typeof*/AttributeArgumentSyntax,
/*typeof*/NameEqualsSyntax,
/*typeof*/TypeParameterListSyntax,
/*typeof*/TypeParameterSyntax,
/*typeof*/ClassDeclarationSyntax,
/*typeof*/StructDeclarationSyntax,
/*typeof*/InterfaceDeclarationSyntax,
/*typeof*/EnumDeclarationSyntax,
/*typeof*/DelegateDeclarationSyntax,
/*typeof*/EnumMemberDeclarationSyntax,
/*typeof*/BaseListSyntax,
/*typeof*/SimpleBaseTypeSyntax,
/*typeof*/TypeParameterConstraintClauseSyntax,
/*typeof*/ConstructorConstraintSyntax,
/*typeof*/ClassOrStructConstraintSyntax,
/*typeof*/TypeConstraintSyntax,
/*typeof*/FieldDeclarationSyntax,
/*typeof*/EventFieldDeclarationSyntax,
/*typeof*/ExplicitInterfaceSpecifierSyntax,
/*typeof*/MethodDeclarationSyntax,
/*typeof*/OperatorDeclarationSyntax,
/*typeof*/ConversionOperatorDeclarationSyntax,
/*typeof*/ConstructorDeclarationSyntax,
/*typeof*/ConstructorInitializerSyntax,
/*typeof*/DestructorDeclarationSyntax,
/*typeof*/PropertyDeclarationSyntax,
/*typeof*/ArrowExpressionClauseSyntax,
/*typeof*/EventDeclarationSyntax,
/*typeof*/IndexerDeclarationSyntax,
/*typeof*/AccessorListSyntax,
/*typeof*/AccessorDeclarationSyntax,
/*typeof*/ParameterListSyntax,
/*typeof*/BracketedParameterListSyntax,
/*typeof*/ParameterSyntax,
/*typeof*/IncompleteMemberSyntax,
/*typeof*/SkippedTokensTriviaSyntax,
/*typeof*/DocumentationCommentTriviaSyntax,
/*typeof*/TypeCrefSyntax,
/*typeof*/QualifiedCrefSyntax,
/*typeof*/NameMemberCrefSyntax,
/*typeof*/IndexerMemberCrefSyntax,
/*typeof*/OperatorMemberCrefSyntax,
/*typeof*/ConversionOperatorMemberCrefSyntax,
/*typeof*/CrefParameterListSyntax,
/*typeof*/CrefBracketedParameterListSyntax,
/*typeof*/CrefParameterSyntax,
/*typeof*/XmlElementSyntax,
/*typeof*/XmlElementStartTagSyntax,
/*typeof*/XmlElementEndTagSyntax,
/*typeof*/XmlEmptyElementSyntax,
/*typeof*/XmlNameSyntax,
/*typeof*/XmlPrefixSyntax,
/*typeof*/XmlTextAttributeSyntax,
/*typeof*/XmlCrefAttributeSyntax,
/*typeof*/XmlNameAttributeSyntax,
/*typeof*/XmlTextSyntax,
/*typeof*/XmlCDataSectionSyntax,
/*typeof*/XmlProcessingInstructionSyntax,
/*typeof*/XmlCommentSyntax,
/*typeof*/IfDirectiveTriviaSyntax,
/*typeof*/ElifDirectiveTriviaSyntax,
/*typeof*/ElseDirectiveTriviaSyntax,
/*typeof*/EndIfDirectiveTriviaSyntax,
/*typeof*/RegionDirectiveTriviaSyntax,
/*typeof*/EndRegionDirectiveTriviaSyntax,
/*typeof*/ErrorDirectiveTriviaSyntax,
/*typeof*/WarningDirectiveTriviaSyntax,
/*typeof*/BadDirectiveTriviaSyntax,
/*typeof*/DefineDirectiveTriviaSyntax,
/*typeof*/UndefDirectiveTriviaSyntax,
/*typeof*/LineDirectiveTriviaSyntax,
/*typeof*/PragmaWarningDirectiveTriviaSyntax,
/*typeof*/PragmaChecksumDirectiveTriviaSyntax,
/*typeof*/ReferenceDirectiveTriviaSyntax,
/*typeof*/InterpolatedStringSyntax,
/*typeof*/InterpolatedStringInsertSyntax);
        }
    }
    SyntaxToken.static_constructor();
}
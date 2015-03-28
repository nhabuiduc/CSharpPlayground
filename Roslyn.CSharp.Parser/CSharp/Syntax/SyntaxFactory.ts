module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxFactory {
        public static CarriageReturnLineFeed: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.CarriageReturnLineFeed);
        public static LineFeed: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.LineFeed);
        public static CarriageReturn: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.CarriageReturn);
        public static Space: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.Space);
        public static Tab: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.Tab);
        public static ElasticCarriageReturnLineFeed: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticCarriageReturnLineFeed);
        public static ElasticLineFeed: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticLineFeed);
        public static ElasticCarriageReturn: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticCarriageReturn);
        public static ElasticSpace: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticSpace);
        public static ElasticTab: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticTab);
        public static ElasticMarker: SyntaxTrivia = Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.ElasticZeroSpace);
        public static EndOfLine(text: string, elastic: boolean = true): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.EndOfLine(text, elastic));
        }
        public static Whitespace(text: string, elastic: boolean = true): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.Whitespace(text, elastic));
        }
        public static Comment(text: string): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.Comment(text));
        }
        public static DisabledText(text: string): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.DisabledText(text));
        }
        public static PreprocessingMessage(text: string): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.PreprocessingMessage(text));
        }
        public static SyntaxTrivia(kind: SyntaxKind, text: string): SyntaxTrivia {
            if (text == null) {
                throw new System.ArgumentNullException("text");
            }
            switch (kind) {
                case SyntaxKind.DisabledTextTrivia:
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                case SyntaxKind.EndOfLineTrivia:
                case SyntaxKind.MultiLineCommentTrivia:
                case SyntaxKind.SingleLineCommentTrivia:
                case SyntaxKind.WhitespaceTrivia:
                    return new SyntaxTrivia().ctor_1046(structDefault(SyntaxToken), new Syntax.InternalSyntax.SyntaxTrivia().ctor_C_1733(kind, text, null, null), 0, 0);
                default:
                    throw new System.ArgumentException("kind");
            }
        }
        public static Token_1045(kind: SyntaxKind): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Token_1937(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, kind, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Token_1123(leading: SyntaxTriviaList, kind: SyntaxKind, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Token_1937(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, kind, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Token_1359(leading: SyntaxTriviaList, kind: SyntaxKind, text: string, valueText: string, trailing: SyntaxTriviaList): SyntaxToken {
            switch (kind) {
                case SyntaxKind.IdentifierToken:
                    throw new System.ArgumentException(CSharpResources.UseVerbatimIdentifier, "kind");
                case SyntaxKind.CharacterLiteralToken:
                    throw new System.ArgumentException(CSharpResources.UseLiteralForTokens, "kind");
                case SyntaxKind.NumericLiteralToken:
                    throw new System.ArgumentException(CSharpResources.UseLiteralForNumeric, "kind");
            }
            if (!SyntaxFacts.IsAnyToken(kind)) {
                throw new System.ArgumentException(System.String.Format(CSharpResources.ThisMethodCanOnlyBeUsedToCreateTokens, kind), "kind");
            }
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Token_6067(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, kind, text, valueText, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static MissingToken_7070(kind: SyntaxKind): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.MissingToken_1287(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, kind, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static MissingToken_5237(leading: SyntaxTriviaList, kind: SyntaxKind, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.MissingToken_1287(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, kind, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Identifier_3961(text: string): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Identifier_2664(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Identifier_1392(leading: SyntaxTriviaList, text: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Identifier_2664(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static VerbatimIdentifier(leading: SyntaxTriviaList, text: string, valueText: string, trailing: SyntaxTriviaList): SyntaxToken {
            if (text.StartsWith("@", System.StringComparison.Ordinal)) {
                throw new System.ArgumentException("text should not start with an @ character.");
            }
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Identifier_1121(SyntaxKind.IdentifierName, <Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, "@" + text, valueText, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Identifier_1456(leading: SyntaxTriviaList, contextualKind: SyntaxKind, text: string, valueText: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Identifier_1121(contextualKind, <Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, valueText, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_1132(value: number): SyntaxToken {
            return SyntaxFactory.Literal_2119(ObjectDisplay.FormatLiteral_6182(value, ObjectDisplayOptions.None), value);
        }
        public static Literal_2119(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_2107(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1342(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_2107(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_1612(value: number): SyntaxToken {
            return SyntaxFactory.Literal_4691(ObjectDisplay.FormatLiteral_8940(value, ObjectDisplayOptions.IncludeTypeSuffix), value);
        }
        public static Literal_4691(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_3278(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1062(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_3278(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_5880(value: number): SyntaxToken {
            return SyntaxFactory.Literal_9280(ObjectDisplay.FormatLiteral_2865(value, ObjectDisplayOptions.IncludeTypeSuffix), value);
        }
        public static Literal_9280(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1844(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1300(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1844(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_1611(value: number): SyntaxToken {
            return SyntaxFactory.Literal_4687(ObjectDisplay.FormatLiteral_5056(value, ObjectDisplayOptions.IncludeTypeSuffix), value);
        }
        public static Literal_4687(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_7516(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1715(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_7516(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_7513(value: number): SyntaxToken {
            return SyntaxFactory.Literal_2138(ObjectDisplay.FormatLiteral_1087(value, ObjectDisplayOptions.IncludeTypeSuffix), value);
        }
        public static Literal_2138(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1315(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1609(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1315(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_3036(value: number): SyntaxToken {
            return SyntaxFactory.Literal_1071(ObjectDisplay.FormatLiteral_1188(value, ObjectDisplayOptions.None), value);
        }
        public static Literal_1071(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1908(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_2099(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1908(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_1676(value: number): SyntaxToken {
            return SyntaxFactory.Literal_1853(ObjectDisplay.FormatLiteral_8649(value, ObjectDisplayOptions.IncludeTypeSuffix), value);
        }
        public static Literal_1853(text: string, value: number): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_2002(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1085(leading: SyntaxTriviaList, text: string, value: number, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_2002(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_2063(value: string): SyntaxToken {
            return SyntaxFactory.Literal_1069(SymbolDisplay.FormatLiteral(value,/*quote:*/true), value);
        }
        public static Literal_1069(text: string, value: string): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1989(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_4456(leading: SyntaxTriviaList, text: string, value: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_1989(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static Literal_1331(value: string): SyntaxToken {
            return SyntaxFactory.Literal_5364(ObjectDisplay.FormatLiteral_1513(value, ObjectDisplayOptions.UseQuotes), value);
        }
        public static Literal_5364(text: string, value: string): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_7402(<Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>SyntaxFactory.ElasticMarker.UnderlyingNode));
        }
        public static Literal_1408(leading: SyntaxTriviaList, text: string, value: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.Literal_7402(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static BadToken(leading: SyntaxTriviaList, text: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.BadToken(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static XmlTextLiteral(leading: SyntaxTriviaList, text: string, value: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.XmlTextLiteral(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static XmlTextNewLine(leading: SyntaxTriviaList, text: string, value: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.XmlTextNewLine_1815(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static XmlEntity(leading: SyntaxTriviaList, text: string, value: string, trailing: SyntaxTriviaList): SyntaxToken {
            return new SyntaxToken().ctor_1607(Syntax.InternalSyntax.SyntaxFactory.XmlEntity(<Syntax.InternalSyntax.CSharpSyntaxNode>leading.Node, text, value, <Syntax.InternalSyntax.CSharpSyntaxNode>trailing.Node));
        }
        public static DocumentationCommentExterior(text: string): SyntaxTrivia {
            return Syntax.InternalSyntax.SyntaxTrivia.op_Implicit_2041(Syntax.InternalSyntax.SyntaxFactory.DocumentationCommentExteriorTrivia(text));
        }
        public static List_1448<TNode extends SyntaxNode>(): SyntaxList<TNode> {
            return <SyntaxList<TNode>> structDefault(SyntaxList);
        }
        public static SingletonList<TNode extends SyntaxNode>(node: TNode): SyntaxList<TNode> {
            return new SyntaxList<TNode>().ctor_6698(node);
        }
        public static List_1439<TNode extends SyntaxNode>(nodes: System.Collections.Generic.IEnumerable<TNode>): SyntaxList<TNode> {
            if (nodes != null) {
                var collection = <System.Collections.Generic.ICollection<TNode>>nodes;
                if (collection.Count === void 0) {
                    collection = null;
                }
                var builder = (collection != null) ? new Syntax.SyntaxListBuilder<TNode>().ctor_7707(collection.Count) : Syntax.SyntaxListBuilder.Create<TNode>();
                // for each
                var nodeEnumerator = nodes.GetEnumerator();
                try {
                    while (nodeEnumerator.MoveNext()) {
                        var node = nodeEnumerator.Current;
                        // foreach block
                        builder.Add(node);
                    }
                } finally {
                    if (nodeEnumerator !== null) nodeEnumerator.Dispose();

                }    
                // end foreach
                return builder.ToList();
            }
            return <SyntaxList<TNode>> structDefault(SyntaxList);
        }
        public static TokenList_1198(): SyntaxTokenList {
            return structDefault(SyntaxTokenList);
        }
        public static TokenList_2032(token: SyntaxToken): SyntaxTokenList {
            return new SyntaxTokenList().ctor_9126(token);
        }
        public static TokenList_4662_Arr(tokens: SyntaxToken[]): SyntaxTokenList {
            if (tokens == null) {
                return structDefault(SyntaxTokenList);
            }
            var builder: Syntax.SyntaxTokenListBuilder = new Syntax.SyntaxTokenListBuilder().ctor_9494(tokens.length);
            for (var i: number = 0; i < tokens.length; i++) {
                builder.Add_1167_NS(<Syntax.InternalSyntax.SyntaxToken>tokens[i].Node);
            }
            return builder.ToList();
        }
        public static TokenList_4662(...tokens: SyntaxToken[]): SyntaxTokenList {
            return SyntaxFactory.TokenList_4662_Arr(tokens);
        }
        public static TokenList_6736(tokens: System.Collections.Generic.IEnumerable<SyntaxToken>): SyntaxTokenList {
            if (tokens == null) {
                return structDefault(SyntaxTokenList);
            }
            var builder: Syntax.SyntaxTokenListBuilder = Syntax.SyntaxTokenListBuilder.Create();
            // for each
            var tokenEnumerator = tokens.GetEnumerator();
            try {
                while (tokenEnumerator.MoveNext()) {
                    var token = tokenEnumerator.Current;
                    // foreach block
                    builder.Add_1167_NS(<Syntax.InternalSyntax.SyntaxToken>token.Node);
                }
            } finally {
                if (tokenEnumerator !== null) tokenEnumerator.Dispose();

            }    
            // end foreach
            return builder.ToList();
        }
        public static Trivia(node: Syntax.StructuredTriviaSyntax): SyntaxTrivia {
            return new SyntaxTrivia().ctor_1046(structDefault(SyntaxToken), node.Green,/*position:*/0,/*index:*/0);
        }
        public static TriviaList_1535(): SyntaxTriviaList {
            return structDefault(SyntaxTriviaList);
        }
        public static TriviaList_7214(trivia: SyntaxTrivia): SyntaxTriviaList {
            return new SyntaxTriviaList().ctor_2284(trivia);
        }
        public static TriviaList_1408(...trivias: SyntaxTrivia[]): SyntaxTriviaList {
            if (trivias != null) {
                var builder: Syntax.SyntaxTriviaListBuilder = new Syntax.SyntaxTriviaListBuilder().ctor_9798(trivias.length);
                builder.Add_1125(trivias);
                return builder.ToList();
            }
            return structDefault(SyntaxTriviaList);
        }
        public static TriviaList_9316(trivias: System.Collections.Generic.IEnumerable<SyntaxTrivia>): SyntaxTriviaList {
            if (trivias == null) {
                return structDefault(SyntaxTriviaList);
            }
            var builder: Syntax.SyntaxTriviaListBuilder = Syntax.SyntaxTriviaListBuilder.Create();
            // for each
            var triviaEnumerator = trivias.GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    builder.Add_1150(trivia);
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return builder.ToList();
        }
        public static SeparatedList_2415<TNode extends SyntaxNode>(): SeparatedSyntaxList<TNode> {
            return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
        }
        public static SingletonSeparatedList<TNode extends SyntaxNode>(node: TNode): SeparatedSyntaxList<TNode> {
            return new SeparatedSyntaxList<TNode>().ctor_1274(new SyntaxNodeOrTokenList().ctor_1240(node,/*index:*/0));
        }
        public static SeparatedList_4526<TNode extends SyntaxNode>(nodes: System.Collections.Generic.IEnumerable<TNode>): SeparatedSyntaxList<TNode> {
            if (nodes == null) {
                return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
            }
            var collection = <System.Collections.Generic.ICollection<TNode>>nodes;
            if (collection != null && collection.Count == 0) {
                return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
            }
            var enumerator = nodes.GetEnumerator()
            try
            {
                if (!enumerator.MoveNext()) {
                    return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
                }
                var firstNode = enumerator.Current;
                if (!enumerator.MoveNext()) {
                    return SyntaxFactory.SingletonSeparatedList<TNode>(firstNode);
                }
                var builder = new Syntax.SeparatedSyntaxListBuilder<TNode>().ctor_8478(collection != null ? collection.Count : 3);
                builder.Add(firstNode);
                var commaToken = SyntaxFactory.Token_1045(SyntaxKind.CommaToken);
                do {
                    builder.AddSeparator(commaToken);
                    builder.Add(enumerator.Current);
                }
                while (enumerator.MoveNext());
                return builder.ToList_1421();
            }
            finally {
                if (enumerator != null) enumerator.Dispose();
            }
        }
        public static SeparatedList_1014<TNode extends SyntaxNode>(nodes: System.Collections.Generic.IEnumerable<TNode>, separators: System.Collections.Generic.IEnumerable<SyntaxToken>): SeparatedSyntaxList<TNode> {
            if (nodes != null) {
                var enumerator: System.Collections.Generic.IEnumerator<TNode> = nodes.GetEnumerator();
                var builder: Syntax.SeparatedSyntaxListBuilder<TNode> = Syntax.SeparatedSyntaxListBuilder.Create<TNode>();
                if (separators != null) {
                    // for each
                    var tokenEnumerator = separators.GetEnumerator();
                    try {
                        while (tokenEnumerator.MoveNext()) {
                            var token = tokenEnumerator.Current;
                            // foreach block
                            if (!enumerator.MoveNext()) {
                                throw new System.ArgumentException();
                            }
                            builder.Add(enumerator.Current);
                            builder.AddSeparator(token);
                        }
                    } finally {
                        if (tokenEnumerator !== null) tokenEnumerator.Dispose();

                    }    
                    // end foreach
                }
                if (enumerator.MoveNext()) {
                    builder.Add(enumerator.Current);
                    if (enumerator.MoveNext()) {
                        throw new System.ArgumentException();
                    }
                }
                return builder.ToList_1421();
            }
            if (separators != null) {
                throw new System.ArgumentException();
            }
            return <SeparatedSyntaxList<TNode>> structDefault(SeparatedSyntaxList);
        }
        public static SeparatedList_1051<TNode extends SyntaxNode>(typeNode: { prototype: TNode }, nodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SeparatedSyntaxList<TNode> {
            return SyntaxFactory.SeparatedList_1580<TNode>(typeNode,SyntaxFactory.NodeOrTokenList_2074(nodesAndTokens));
        }
        public static SeparatedList_1580<TNode extends SyntaxNode>(typeNode: { prototype: TNode },nodesAndTokens: SyntaxNodeOrTokenList): SeparatedSyntaxList<TNode> {
            if (!SyntaxFactory.HasSeparatedNodeTokenPattern(nodesAndTokens)) {
                throw new System.ArgumentException(Roslyn.Utilities.StringExtensions.NeedsLocalization("A node or token is out of sequence."));
            }
            if (!SyntaxFactory.NodesAreCorrectType<TNode>(typeNode,nodesAndTokens)) {
                throw new System.ArgumentException(Roslyn.Utilities.StringExtensions.NeedsLocalization("A node in the list is not of the expected type."));
            }
            return new SeparatedSyntaxList<TNode>().ctor_1274(nodesAndTokens);
        }
        private static NodesAreCorrectType<TNode>(typeNode: { prototype: TNode },list: SyntaxNodeOrTokenList): boolean {
            for (var i: number = 0, n = list.Count; i < n; i++) {
                var element = list.$get$(i);
                if (element.IsNode && !(element.AsNode() instanceof <any>typeNode)) {
                    return false;
                }
            }
            return true;
        }
        private static HasSeparatedNodeTokenPattern(list: SyntaxNodeOrTokenList): boolean {
            for (var i: number = 0, n = list.Count; i < n; i++) {
                var element = list.$get$(i);
                if (element.IsToken == ((i & 1) == 0)) {
                    return false;
                }
            }
            return true;
        }
        public static NodeOrTokenList_1718(): SyntaxNodeOrTokenList {
            return structDefault(SyntaxNodeOrTokenList);
        }
        public static NodeOrTokenList_2074(nodesAndTokens: System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>): SyntaxNodeOrTokenList {
            if (nodesAndTokens == null) {
                throw new System.ArgumentNullException("nodesAndTokens");
            }
            var builder = new Syntax.SyntaxNodeOrTokenListBuilder().ctor_2261(8);
            builder.Add_1490(nodesAndTokens);
            return builder.ToList();
        }
        public static NodeOrTokenList_2060(...nodesAndTokens: SyntaxNodeOrToken[]): SyntaxNodeOrTokenList {
            return SyntaxFactory.NodeOrTokenList_2074(<System.Collections.Generic.IEnumerable<SyntaxNodeOrToken>>nodesAndTokens);
        }
        public static IdentifierName_1404(name: string): Syntax.IdentifierNameSyntax {
            return SyntaxFactory.IdentifierName_9812(SyntaxFactory.Identifier_3961(name));
        }
        public static SyntaxTree(root: SyntaxNode, options: ParseOptions = null, path: string = "", encoding: System.Text.Encoding = null): SyntaxTree {
            return CSharpSyntaxTree.Create_5969(<CSharpSyntaxNode>root, <CSharpParseOptions>options, path, encoding);
        }
        public static ParseSyntaxTree_2146(text: string, options: ParseOptions = null, path: string = "", encoding: System.Text.Encoding = null, cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxTree {
            return SyntaxFactory.ParseSyntaxTree_2957(Text.SourceText.From_1429(text, encoding), options, path, cancellationToken);
        }
        public static ParseSyntaxTree_2957(text: Text.SourceText, options: ParseOptions = null, path: string = "", cancellationToken: System.Threading.CancellationToken = structDefault(System.Threading.CancellationToken)): SyntaxTree {
            return CSharpSyntaxTree.ParseText_2029(text, <CSharpParseOptions>options, path, cancellationToken);
        }
        public static ParseLeadingTrivia_9484(text: string, offset: number = 0): SyntaxTriviaList {
            return SyntaxFactory.ParseLeadingTrivia_1568(text, CSharpParseOptions.Default, offset);
        }
        public static ParseLeadingTrivia_1568(text: string, options: CSharpParseOptions, offset: number = 0): SyntaxTriviaList {
            var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(SyntaxFactory.MakeSourceText(text, offset), options)
            try
            {
                return lexer.LexSyntaxLeadingTrivia();
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseTrailingTrivia(text: string, offset: number = 0): SyntaxTriviaList {
            var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(SyntaxFactory.MakeSourceText(text, offset), CSharpParseOptions.Default)
            try
            {
                return lexer.LexSyntaxTrailingTrivia();
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseCref(text: string): Syntax.CrefSyntax {
            var commentText: string = System.String.Format("/// <see cref=\"{0}\"/>", text);
            var leadingTrivia: SyntaxTriviaList = SyntaxFactory.ParseLeadingTrivia_1568(commentText, CSharpParseOptions.Default.WithDocumentationMode(DocumentationMode.Diagnose));
            System.Diagnostics.Debug.Assert(leadingTrivia.Count == 1);
            var trivia: SyntaxTrivia = leadingTrivia.First();
            var structure: Syntax.DocumentationCommentTriviaSyntax = <Syntax.DocumentationCommentTriviaSyntax>trivia.GetStructure();
            System.Diagnostics.Debug.Assert(structure.Content.Count == 2);
            var elementSyntax: Syntax.XmlEmptyElementSyntax = <Syntax.XmlEmptyElementSyntax>structure.Content.$get$(1);
            System.Diagnostics.Debug.Assert(elementSyntax.Attributes.Count == 1);
            var attributeSyntax: Syntax.XmlAttributeSyntax = <Syntax.XmlAttributeSyntax>elementSyntax.Attributes.$get$(0);
            return attributeSyntax.Kind == SyntaxKind.XmlCrefAttribute ? (<Syntax.XmlCrefAttributeSyntax>attributeSyntax).Cref : null;
        }
        public static ParseToken(text: string, offset: number = 0): SyntaxToken {
            var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(SyntaxFactory.MakeSourceText(text, offset), CSharpParseOptions.Default)
            try
            {
                return new SyntaxToken().ctor_1607(lexer.Lex_5670(Syntax.InternalSyntax.LexerMode.Syntax));
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseTokens(text: string, offset: number = 0, initialTokenPosition: number = 0, options: CSharpParseOptions = null): System.Collections.Generic.IEnumerable<SyntaxToken> {
            var __result = new Array<SyntaxToken>();
            var lexer = new Syntax.InternalSyntax.Lexer().ctor_1061(SyntaxFactory.MakeSourceText(text, offset), options != null ? options : CSharpParseOptions.Default)
            try
            {
                var position = initialTokenPosition;
                while (true) {
                    var token = lexer.Lex_5670(Syntax.InternalSyntax.LexerMode.Syntax);
                    __result.push(new SyntaxToken().ctor_1108(/*parent:*/null,/*token:*/token,/*position:*/position,/*index:*/0));
                    //yield return new SyntaxToken(parent: null, token: token, position: position, index: 0);
                    position += token.FullWidth;
                    if (token.Kind == SyntaxKind.EndOfFileToken) {
                        break;
                    }
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
            return __result;
        }
        public static ParseName(text: string, offset: number = 0, consumeFullText: boolean = true): Syntax.NameSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseName();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.NameSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseTypeName(text: string, offset: number = 0, consumeFullText: boolean = true): Syntax.TypeSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseTypeName();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.TypeSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseExpression(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.ExpressionSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseExpression();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.ExpressionSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseStatement(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.StatementSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseStatement();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.StatementSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseCompilationUnit(text: string, offset: number = 0, options: CSharpParseOptions = null): Syntax.CompilationUnitSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseCompilationUnit();
                    return <Syntax.CompilationUnitSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseParameterList(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.ParameterListSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseParenthesizedParameterList(/*allowThisKeyword:*/true,/*allowDefaults:*/true,/*allowAttributes:*/true);
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.ParameterListSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseBracketedParameterList(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.BracketedParameterListSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseBracketedParameterList();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.BracketedParameterListSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseArgumentList(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.ArgumentListSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseParenthesizedArgumentList();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.ArgumentListSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseBracketedArgumentList(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.BracketedArgumentListSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseBracketedArgumentList();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.BracketedArgumentListSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        public static ParseAttributeArgumentList(text: string, offset: number = 0, options: ParseOptions = null, consumeFullText: boolean = true): Syntax.AttributeArgumentListSyntax {
            var lexer = SyntaxFactory.MakeLexer(text, offset, <CSharpParseOptions>options)
            try
            {
                var parser = SyntaxFactory.MakeParser(lexer)
                try
                {
                    var node = parser.ParseAttributeArgumentList();
                    if (consumeFullText)
                        node = parser.ConsumeUnexpectedTokens(node);
                    return <Syntax.AttributeArgumentListSyntax>node.CreateRed_5702();
                }
                finally {
                    if (parser != null) parser.Dispose();
                }
            }
            finally {
                if (lexer != null) lexer.Dispose();
            }
        }
        private static MakeSourceText(text: string, offset: number): Text.SourceText {
            return Text.SourceText.From_1429(text, System.Text.Encoding.UTF8).GetSubText_1518(offset);
        }
        private static MakeLexer(text: string, offset: number, options: CSharpParseOptions = null): Syntax.InternalSyntax.Lexer {
            return new Syntax.InternalSyntax.Lexer().ctor_1061(/*text:*/SyntaxFactory.MakeSourceText(text, offset),/*options:*/options != null ? options : CSharpParseOptions.Default);
        }
        private static MakeParser(lexer: Syntax.InternalSyntax.Lexer): Syntax.InternalSyntax.LanguageParser {
            return new Syntax.InternalSyntax.LanguageParser().ctor_1741(lexer,/*oldTree:*/null,/*changes:*/null);
        }
        public static AreEquivalent_1404(oldTree: SyntaxTree, newTree: SyntaxTree, topLevel: boolean): boolean {
            var csOld = __as__<SyntaxTree>(oldTree, SyntaxTree);
            var csNew = __as__<SyntaxTree>(newTree, SyntaxTree);
            if (csOld == null && csNew == null)
                return true;
            if (csOld == null || csNew == null)
                return false;
            return Syntax.SyntaxEquivalence.AreEquivalent_6608(csOld, csNew,/*ignoreChildNode:*/null,/*topLevel:*/topLevel);
        }
        public static AreEquivalent_6317(oldNode: SyntaxNode, newNode: SyntaxNode, topLevel: boolean): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldNode, newNode,/*ignoreChildNode:*/null,/*topLevel:*/topLevel);
        }
        public static AreEquivalent_9979(oldNode: SyntaxNode, newNode: SyntaxNode, ignoreChildNode: (_: SyntaxKind) => boolean = null): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldNode, newNode,/*ignoreChildNode:*/ignoreChildNode,/*topLevel:*/false);
        }
        public static AreEquivalent_8521(oldToken: SyntaxToken, newToken: SyntaxToken): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_8521(oldToken, newToken);
        }
        public static AreEquivalent_1097(oldList: SyntaxTokenList, newList: SyntaxTokenList): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1097(oldList, newList);
        }
        public static AreEquivalent_2110<TNode extends CSharpSyntaxNode>(oldList: SyntaxList<TNode>, newList: SyntaxList<TNode>, topLevel: boolean): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldList.Node, newList.Node, null, topLevel);
        }
        public static AreEquivalent_5736<TNode extends SyntaxNode>(oldList: SyntaxList<TNode>, newList: SyntaxList<TNode>, ignoreChildNode: (_: SyntaxKind) => boolean = null): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldList.Node, newList.Node, ignoreChildNode,/*topLevel:*/false);
        }
        public static AreEquivalent_3678<TNode extends SyntaxNode>(oldList: SeparatedSyntaxList<TNode>, newList: SeparatedSyntaxList<TNode>, topLevel: boolean): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldList.Node, newList.Node, null, topLevel);
        }
        public static AreEquivalent_3062<TNode extends SyntaxNode>(oldList: SeparatedSyntaxList<TNode>, newList: SeparatedSyntaxList<TNode>, ignoreChildNode: (_: SyntaxKind) => boolean = null): boolean {
            return Syntax.SyntaxEquivalence.AreEquivalent_1123(oldList.Node, newList.Node, ignoreChildNode,/*topLevel:*/false);
        }
        public static GetStandaloneType(node: Syntax.TypeSyntax): Syntax.TypeSyntax {
            if (node != null) {
                var parent = __as__<Syntax.ExpressionSyntax>(node.Parent, Syntax.ExpressionSyntax);
                if (parent != null && (node.Kind == SyntaxKind.IdentifierName || node.Kind == SyntaxKind.GenericName)) {
                    switch (parent.Kind) {
                        case SyntaxKind.QualifiedName:
                            var qualifiedName = <Syntax.QualifiedNameSyntax>parent;
                            if (qualifiedName.Right == node) {
                                return qualifiedName;
                            }
                            break;
                        case SyntaxKind.AliasQualifiedName:
                            var aliasQualifiedName = <Syntax.AliasQualifiedNameSyntax>parent;
                            if (aliasQualifiedName.Name == node) {
                                return aliasQualifiedName;
                            }
                            break;
                    }
                }
            }
            return node;
        }
        public static GetStandaloneExpression(expression: Syntax.ExpressionSyntax): Syntax.ExpressionSyntax {
            var temp = __as__<Syntax.ExpressionSyntax>(SyntaxFactory.GetStandaloneNode(expression), Syntax.ExpressionSyntax);

            return temp != null ? temp : expression;
        }
        public static GetStandaloneNode(node: CSharpSyntaxNode): CSharpSyntaxNode {
            if (node == null || !(node instanceof Syntax.ExpressionSyntax || node instanceof Syntax.CrefSyntax)) {
                return node;
            }
            switch (node.Kind) {
                case SyntaxKind.IdentifierName:
                case SyntaxKind.GenericName:
                case SyntaxKind.NameMemberCref:
                case SyntaxKind.IndexerMemberCref:
                case SyntaxKind.OperatorMemberCref:
                case SyntaxKind.ConversionOperatorMemberCref:
                case SyntaxKind.ArrayType:
                case SyntaxKind.NullableType:
                    break;
                default:
                    return node;
            }
            var parent: CSharpSyntaxNode = node.Parent;
            if (parent == null) {
                return node;
            }
            switch (parent.Kind) {
                case SyntaxKind.QualifiedName:
                    if ((<Syntax.QualifiedNameSyntax>parent).Right == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.AliasQualifiedName:
                    if ((<Syntax.AliasQualifiedNameSyntax>parent).Name == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.SimpleMemberAccessExpression:
                case SyntaxKind.PointerMemberAccessExpression:
                    if ((<Syntax.MemberAccessExpressionSyntax>parent).Name == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.MemberBindingExpression:
                    {
                        if ((<Syntax.MemberBindingExpressionSyntax>parent).Name == node) {
                            return parent;
                        }
                        break;
                    }
                case SyntaxKind.NameMemberCref:
                    if ((<Syntax.NameMemberCrefSyntax>parent).Name == node) {
                        var grandparent: CSharpSyntaxNode = parent.Parent;
                        return grandparent != null && grandparent.Kind == SyntaxKind.QualifiedCref ? grandparent : parent;
                    }
                    break;
                case SyntaxKind.QualifiedCref:
                    if ((<Syntax.QualifiedCrefSyntax>parent).Member == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.ArrayCreationExpression:
                    if ((<Syntax.ArrayCreationExpressionSyntax>parent).Type == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.ObjectCreationExpression:
                    if (node.Kind == SyntaxKind.NullableType && (<Syntax.ObjectCreationExpressionSyntax>parent).Type == node) {
                        return parent;
                    }
                    break;
                case SyntaxKind.StackAllocArrayCreationExpression:
                    if ((<Syntax.StackAllocArrayCreationExpressionSyntax>parent).Type == node) {
                        return parent;
                    }
                    break;
            }
            return node;
        }
        public static FindConditionalAccessNodeForBinding(node: CSharpSyntaxNode): Syntax.ConditionalAccessExpressionSyntax {
            var currentNode = node;
            System.Diagnostics.Debug.Assert(currentNode.Kind == SyntaxKind.MemberBindingExpression || currentNode.Kind == SyntaxKind.ElementBindingExpression);
            while (currentNode != null) {
                currentNode = currentNode.Parent;
                System.Diagnostics.Debug.Assert(currentNode != null, "binding should be enclosed in a conditional access");
                if (currentNode.Kind == SyntaxKind.ConditionalAccessExpression) {
                    var condAccess = <Syntax.ConditionalAccessExpressionSyntax>currentNode;
                    if (condAccess.OperatorToken.EndPosition == node.Position) {
                        return condAccess;
                    }
                }
            }
            return null;
        }
        public static GetNonGenericExpression(expression: Syntax.ExpressionSyntax): Syntax.ExpressionSyntax {
            if (expression != null) {
                switch (expression.Kind) {
                    case SyntaxKind.SimpleMemberAccessExpression:
                    case SyntaxKind.PointerMemberAccessExpression:
                        var max = <Syntax.MemberAccessExpressionSyntax>expression;
                        if (max.Name.Kind == SyntaxKind.GenericName) {
                            var gn = <Syntax.GenericNameSyntax>max.Name;
                            return SyntaxFactory.BinaryExpression_2078(expression.Kind, max.Expression, max.OperatorToken, SyntaxFactory.IdentifierName_9812(gn.Identifier));
                        }
                        break;
                    case SyntaxKind.QualifiedName:
                        var qn = <Syntax.QualifiedNameSyntax>expression;
                        if (qn.Right.Kind == SyntaxKind.GenericName) {
                            var gn = <Syntax.GenericNameSyntax>qn.Right;
                            return SyntaxFactory.QualifiedName_1617(qn.Left, qn.DotToken, SyntaxFactory.IdentifierName_9812(gn.Identifier));
                        }
                        break;
                    case SyntaxKind.AliasQualifiedName:
                        var an = <Syntax.AliasQualifiedNameSyntax>expression;
                        if (an.Name.Kind == SyntaxKind.GenericName) {
                            var gn = <Syntax.GenericNameSyntax>an.Name;
                            return SyntaxFactory.AliasQualifiedName_1366(an.Alias, an.ColonColonToken, SyntaxFactory.IdentifierName_9812(gn.Identifier));
                        }
                        break;
                }
            }
            return expression;
        }
        public static IsCompleteSubmission(tree: SyntaxTree): boolean {
            if (tree == null) {
                throw new System.ArgumentNullException("tree");
            }
            if (!tree.HasCompilationUnitRoot) {
                return false;
            }
            var compilation = <Syntax.CompilationUnitSyntax>tree.GetRoot();
            if (!compilation.HasErrors) {
                return true;
            }
            // for each
            var errorEnumerator = compilation.EndOfFileToken.GetDiagnostics().GetEnumerator();
            try {
                while (errorEnumerator.MoveNext()) {
                    var error = errorEnumerator.Current;
                    // foreach block
                    switch (<ErrorCode>error.Code) {
                        case ErrorCode.ERR_OpenEndedComment:
                        case ErrorCode.ERR_EndifDirectiveExpected:
                        case ErrorCode.ERR_EndRegionDirectiveExpected:
                            return false;
                    }
                }
            } finally {
                if (errorEnumerator !== null) errorEnumerator.Dispose();

            }    
            // end foreach
            var lastNode = System.Linq.Enumerable.LastOrDefault(compilation.ChildNodes());
            if (lastNode == null) {
                return true;
            }
            if (lastNode.HasTrailingTrivia && lastNode.ContainsDiagnostics && SyntaxFactory.HasUnterminatedMultiLineComment(lastNode.GetTrailingTrivia())) {
                return false;
            }
            if (CSharpExtensions.IsKind_1139(lastNode,
                SyntaxKind.IncompleteMember)) {
                return false;
            }
            if (!CSharpExtensions.IsKind_1139(lastNode,
                SyntaxKind.GlobalStatement)) {
                var closingToken = lastNode.GetLastToken(/*includeZeroWidth:*/true,/*includeSkipped:*/true,/*includeDirectives:*/true,/*includeDocumentationComments:*/true);
                return !closingToken.IsMissing;
            }
            var globalStatement = <Syntax.GlobalStatementSyntax>lastNode;
            var token = lastNode.GetLastToken(/*includeZeroWidth:*/true,/*includeSkipped:*/true,/*includeDirectives:*/true,/*includeDocumentationComments:*/true);
            if (token.IsMissing) {
                if (tree.Options.Kind != SourceCodeKind.Interactive || globalStatement.Statement.Kind != SyntaxKind.ExpressionStatement || CSharpExtensions.CSharpKind_1238(token) != SyntaxKind.SemicolonToken) {
                    return false;
                }
                token = token.GetPreviousToken_8036(/*predicate:*/SyntaxToken.Any,/*stepInto:*/Microsoft.CodeAnalysis.SyntaxTrivia.Any);
                if (token.IsMissing) {
                    return false;
                }
            }
            // for each
            var errorEnumerator = token.GetDiagnostics().GetEnumerator();
            try {
                while (errorEnumerator.MoveNext()) {
                    var error = errorEnumerator.Current;
                    // foreach block
                    switch (<ErrorCode>error.Code) {
                        case ErrorCode.ERR_NewlineInConst:
                        case ErrorCode.ERR_UnterminatedStringLit:
                        case ErrorCode.ERR_GlobalDefinitionOrStatementExpected:
                        case ErrorCode.ERR_EOFExpected:
                            return false;
                    }
                }
            } finally {
                if (errorEnumerator !== null) errorEnumerator.Dispose();

            }    
            // end foreach
            return true;
        }
        private static HasUnterminatedMultiLineComment(triviaList: SyntaxTriviaList): boolean {
            // for each
            var triviaEnumerator = triviaList.GetEnumerator();
            try {
                while (triviaEnumerator.MoveNext()) {
                    var trivia = triviaEnumerator.Current;
                    // foreach block
                    if (trivia.ContainsDiagnostics && CSharpExtensions.CSharpKind_4438(trivia) == SyntaxKind.MultiLineCommentTrivia) {
                        return true;
                    }
                }
            } finally {
                if (triviaEnumerator !== null) triviaEnumerator.Dispose();

            }    
            // end foreach
            return false;
        }
        public static CaseSwitchLabel_3348(value: Syntax.ExpressionSyntax): Syntax.CaseSwitchLabelSyntax {
            return SyntaxFactory.CaseSwitchLabel_2116(SyntaxFactory.Token_1045(SyntaxKind.CaseKeyword), value, SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static DefaultSwitchLabel_1172(): Syntax.DefaultSwitchLabelSyntax {
            return SyntaxFactory.DefaultSwitchLabel_2103(SyntaxFactory.Token_1045(SyntaxKind.DefaultKeyword), SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static Block_4359(...statements: Syntax.StatementSyntax[]): Syntax.BlockSyntax {
            return SyntaxFactory.Block_1037(SyntaxFactory.List_1439(statements));
        }
        public static Block_6043(statements: System.Collections.Generic.IEnumerable<Syntax.StatementSyntax>): Syntax.BlockSyntax {
            return SyntaxFactory.Block_1037(SyntaxFactory.List_1439(statements));
        }
        public static PropertyDeclaration_1949(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: Syntax.AccessorListSyntax): Syntax.PropertyDeclarationSyntax {
            return SyntaxFactory.PropertyDeclaration_1181(attributeLists, modifiers, type, explicitInterfaceSpecifier, identifier, accessorList, null, null);
        }
        public static MethodDeclaration_1736(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, parameterList: Syntax.ParameterListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.MethodDeclarationSyntax {
            return SyntaxFactory.MethodDeclaration_7196(attributeLists, modifiers, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses, body, null, semicolonToken);
        }
        public static ConversionOperatorDeclaration_1627(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: Syntax.TypeSyntax, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.ConversionOperatorDeclarationSyntax {
            return SyntaxFactory.ConversionOperatorDeclaration_1744(/*attributeLists:*/attributeLists,/*modifiers:*/modifiers,/*implicitOrExplicitKeyword:*/implicitOrExplicitKeyword,/*operatorKeyword:*/operatorKeyword,/*type:*/type,/*parameterList:*/parameterList,/*body:*/body,/*expressionBody:*/null,/*semicolonToken:*/semicolonToken);
        }
        public static OperatorDeclaration_1306(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.OperatorDeclarationSyntax {
            return SyntaxFactory.OperatorDeclaration_1160(/*attributeLists:*/attributeLists,/*modifiers:*/modifiers,/*returnType:*/returnType,/*operatorKeyword:*/operatorKeyword,/*operatorToken:*/operatorToken,/*parameterList:*/parameterList,/*body:*/body,/*expressionBody:*/null,/*semicolonToken:*/semicolonToken);
        }
        public static IndexerDeclaration_1610(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, parameterList: Syntax.BracketedParameterListSyntax, accessorList: Syntax.AccessorListSyntax): Syntax.IndexerDeclarationSyntax {
            return SyntaxFactory.IndexerDeclaration_4594(/*attributeLists:*/attributeLists,/*modifiers:*/modifiers,/*type:*/type,/*explicitInterfaceSpecifier:*/explicitInterfaceSpecifier,/*parameterList:*/parameterList,/*accessorList:*/accessorList,/*expressionBody:*/null);
        }
        public static UsingDirective_5519(alias: Syntax.NameEqualsSyntax, name: Syntax.NameSyntax): Syntax.UsingDirectiveSyntax {
            return SyntaxFactory.UsingDirective_9846(/*usingKeyword:*/SyntaxFactory.Token_1045(SyntaxKind.UsingKeyword),/*staticKeyword:*/structDefault(SyntaxToken),/*alias:*/alias,/*name:*/name,/*semicolonToken:*/SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }

        // partial

        
        public static IdentifierName_9812(identifier: SyntaxToken): Syntax.IdentifierNameSyntax {
            return <Syntax.IdentifierNameSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IdentifierName(<Syntax.InternalSyntax.SyntaxToken>identifier.Node).CreateRed_5702();
        }
        public static QualifiedName_1617(left: Syntax.NameSyntax, dotToken: SyntaxToken, right: Syntax.SimpleNameSyntax): Syntax.QualifiedNameSyntax {
            return <Syntax.QualifiedNameSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.QualifiedName(left == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameSyntax>left.Green, <Syntax.InternalSyntax.SyntaxToken>dotToken.Node, right == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleNameSyntax>right.Green).CreateRed_5702();
        }
        public static QualifiedName_1747(left: Syntax.NameSyntax, right: Syntax.SimpleNameSyntax): Syntax.QualifiedNameSyntax {
            return SyntaxFactory.QualifiedName_1617(left, SyntaxFactory.Token_1045(SyntaxKind.DotToken), right);
        }
        public static GenericName_1946(identifier: SyntaxToken, typeArgumentList: Syntax.TypeArgumentListSyntax): Syntax.GenericNameSyntax {
            return <Syntax.GenericNameSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GenericName(<Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeArgumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeArgumentListSyntax>typeArgumentList.Green).CreateRed_5702();
        }
        public static GenericName_2033(identifier: SyntaxToken): Syntax.GenericNameSyntax {
            return SyntaxFactory.GenericName_1946(identifier, SyntaxFactory.TypeArgumentList_2107());
        }
        public static GenericName_1677(identifier: string): Syntax.GenericNameSyntax {
            return SyntaxFactory.GenericName_1946(SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.TypeArgumentList_2107());
        }
        public static TypeArgumentList_2074(lessThanToken: SyntaxToken, arguments1: SeparatedSyntaxList<Syntax.TypeSyntax>, greaterThanToken: SyntaxToken): Syntax.TypeArgumentListSyntax {
            return <Syntax.TypeArgumentListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeArgumentList(<Syntax.InternalSyntax.SyntaxToken>lessThanToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>(arguments1.Node), <Syntax.InternalSyntax.SyntaxToken>greaterThanToken.Node).CreateRed_5702();
        }
        public static TypeArgumentList_2107(arguments1: SeparatedSyntaxList<Syntax.TypeSyntax> = <SeparatedSyntaxList<Syntax.TypeSyntax>> structDefault(SeparatedSyntaxList)): Syntax.TypeArgumentListSyntax {
            return SyntaxFactory.TypeArgumentList_2074(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), arguments1, SyntaxFactory.Token_1045(SyntaxKind.GreaterThanToken));
        }
        public static AliasQualifiedName_1366(alias: Syntax.IdentifierNameSyntax, colonColonToken: SyntaxToken, name: Syntax.SimpleNameSyntax): Syntax.AliasQualifiedNameSyntax {
            return <Syntax.AliasQualifiedNameSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AliasQualifiedName(alias == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>alias.Green, <Syntax.InternalSyntax.SyntaxToken>colonColonToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleNameSyntax>name.Green).CreateRed_5702();
        }
        public static AliasQualifiedName_1636(alias: Syntax.IdentifierNameSyntax, name: Syntax.SimpleNameSyntax): Syntax.AliasQualifiedNameSyntax {
            return SyntaxFactory.AliasQualifiedName_1366(alias, SyntaxFactory.Token_1045(SyntaxKind.ColonColonToken), name);
        }
        public static AliasQualifiedName_1112(alias: string, name: Syntax.SimpleNameSyntax): Syntax.AliasQualifiedNameSyntax {
            return SyntaxFactory.AliasQualifiedName_1366(SyntaxFactory.IdentifierName_1404(alias), SyntaxFactory.Token_1045(SyntaxKind.ColonColonToken), name);
        }
        public static PredefinedType(keyword: SyntaxToken): Syntax.PredefinedTypeSyntax {
            return <Syntax.PredefinedTypeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PredefinedType(<Syntax.InternalSyntax.SyntaxToken>keyword.Node).CreateRed_5702();
        }
        public static ArrayType_6581(elementType: Syntax.TypeSyntax, rankSpecifiers: SyntaxList<Syntax.ArrayRankSpecifierSyntax>): Syntax.ArrayTypeSyntax {
            return <Syntax.ArrayTypeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ArrayType(elementType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>elementType.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayRankSpecifierSyntax>(rankSpecifiers.Node)).CreateRed_5702();
        }
        public static ArrayType_1264(elementType: Syntax.TypeSyntax): Syntax.ArrayTypeSyntax {
            return SyntaxFactory.ArrayType_6581(elementType, <SyntaxList<Syntax.ArrayRankSpecifierSyntax>> structDefault(SyntaxList));
        }
        public static ArrayRankSpecifier_6813(openBracketToken: SyntaxToken, sizes: SeparatedSyntaxList<Syntax.ExpressionSyntax>, closeBracketToken: SyntaxToken): Syntax.ArrayRankSpecifierSyntax {
            return <Syntax.ArrayRankSpecifierSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ArrayRankSpecifier(<Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(sizes.Node), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node).CreateRed_5702();
        }
        public static ArrayRankSpecifier_4558(sizes: SeparatedSyntaxList<Syntax.ExpressionSyntax> = <SeparatedSyntaxList<Syntax.ExpressionSyntax>> structDefault(SeparatedSyntaxList)): Syntax.ArrayRankSpecifierSyntax {
            return SyntaxFactory.ArrayRankSpecifier_6813(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), sizes, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static PointerType_1337(elementType: Syntax.TypeSyntax, asteriskToken: SyntaxToken): Syntax.PointerTypeSyntax {
            return <Syntax.PointerTypeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PointerType(elementType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>elementType.Green, <Syntax.InternalSyntax.SyntaxToken>asteriskToken.Node).CreateRed_5702();
        }
        public static PointerType_1615(elementType: Syntax.TypeSyntax): Syntax.PointerTypeSyntax {
            return SyntaxFactory.PointerType_1337(elementType, SyntaxFactory.Token_1045(SyntaxKind.AsteriskToken));
        }
        public static NullableType_5850(elementType: Syntax.TypeSyntax, questionToken: SyntaxToken): Syntax.NullableTypeSyntax {
            return <Syntax.NullableTypeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.NullableType(elementType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>elementType.Green, <Syntax.InternalSyntax.SyntaxToken>questionToken.Node).CreateRed_5702();
        }
        public static NullableType_1501(elementType: Syntax.TypeSyntax): Syntax.NullableTypeSyntax {
            return SyntaxFactory.NullableType_5850(elementType, SyntaxFactory.Token_1045(SyntaxKind.QuestionToken));
        }
        public static OmittedTypeArgument_1624(omittedTypeArgumentToken: SyntaxToken): Syntax.OmittedTypeArgumentSyntax {
            return <Syntax.OmittedTypeArgumentSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.OmittedTypeArgument(<Syntax.InternalSyntax.SyntaxToken>omittedTypeArgumentToken.Node).CreateRed_5702();
        }
        public static OmittedTypeArgument_1611(): Syntax.OmittedTypeArgumentSyntax {
            return SyntaxFactory.OmittedTypeArgument_1624(SyntaxFactory.Token_1045(SyntaxKind.OmittedTypeArgumentToken));
        }
        public static ParenthesizedExpression_8161(openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken): Syntax.ParenthesizedExpressionSyntax {
            return <Syntax.ParenthesizedExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ParenthesizedExpression(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static ParenthesizedExpression_6144(expression: Syntax.ExpressionSyntax): Syntax.ParenthesizedExpressionSyntax {
            return SyntaxFactory.ParenthesizedExpression_8161(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static PrefixUnaryExpression_1586(kind: SyntaxKind, operatorToken: SyntaxToken, operand: Syntax.ExpressionSyntax): Syntax.PrefixUnaryExpressionSyntax {
            return <Syntax.PrefixUnaryExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PrefixUnaryExpression(kind, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, operand == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>operand.Green).CreateRed_5702();
        }
        public static PrefixUnaryExpression_1139(kind: SyntaxKind, operand: Syntax.ExpressionSyntax): Syntax.PrefixUnaryExpressionSyntax {
            return SyntaxFactory.PrefixUnaryExpression_1586(kind, SyntaxFactory.Token_1045(SyntaxFactory.GetPrefixUnaryExpressionOperatorTokenKind(kind)), operand);
        }
        private static GetPrefixUnaryExpressionOperatorTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.UnaryPlusExpression:
                    return SyntaxKind.PlusToken;
                case SyntaxKind.UnaryMinusExpression:
                    return SyntaxKind.MinusToken;
                case SyntaxKind.BitwiseNotExpression:
                    return SyntaxKind.TildeToken;
                case SyntaxKind.LogicalNotExpression:
                    return SyntaxKind.ExclamationToken;
                case SyntaxKind.PreIncrementExpression:
                    return SyntaxKind.PlusPlusToken;
                case SyntaxKind.PreDecrementExpression:
                    return SyntaxKind.MinusMinusToken;
                case SyntaxKind.AddressOfExpression:
                    return SyntaxKind.AmpersandToken;
                case SyntaxKind.PointerIndirectionExpression:
                    return SyntaxKind.AsteriskToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static AwaitExpression_1054(awaitKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.AwaitExpressionSyntax {
            return <Syntax.AwaitExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AwaitExpression(<Syntax.InternalSyntax.SyntaxToken>awaitKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static AwaitExpression_6013(expression: Syntax.ExpressionSyntax): Syntax.AwaitExpressionSyntax {
            return SyntaxFactory.AwaitExpression_1054(SyntaxFactory.Token_1045(SyntaxKind.AwaitKeyword), expression);
        }
        public static PostfixUnaryExpression_1042(kind: SyntaxKind, operand: Syntax.ExpressionSyntax, operatorToken: SyntaxToken): Syntax.PostfixUnaryExpressionSyntax {
            return <Syntax.PostfixUnaryExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PostfixUnaryExpression(kind, operand == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>operand.Green, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node).CreateRed_5702();
        }
        public static PostfixUnaryExpression_1001(kind: SyntaxKind, operand: Syntax.ExpressionSyntax): Syntax.PostfixUnaryExpressionSyntax {
            return SyntaxFactory.PostfixUnaryExpression_1042(kind, operand, SyntaxFactory.Token_1045(SyntaxFactory.GetPostfixUnaryExpressionOperatorTokenKind(kind)));
        }
        private static GetPostfixUnaryExpressionOperatorTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.PostIncrementExpression:
                    return SyntaxKind.PlusPlusToken;
                case SyntaxKind.PostDecrementExpression:
                    return SyntaxKind.MinusMinusToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static MemberAccessExpression_6280(kind: SyntaxKind, expression: Syntax.ExpressionSyntax, operatorToken: SyntaxToken, name: Syntax.SimpleNameSyntax): Syntax.MemberAccessExpressionSyntax {
            return <Syntax.MemberAccessExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.MemberAccessExpression(kind, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleNameSyntax>name.Green).CreateRed_5702();
        }
        public static MemberAccessExpression_1658(kind: SyntaxKind, expression: Syntax.ExpressionSyntax, name: Syntax.SimpleNameSyntax): Syntax.MemberAccessExpressionSyntax {
            return SyntaxFactory.MemberAccessExpression_6280(kind, expression, SyntaxFactory.Token_1045(SyntaxFactory.GetMemberAccessExpressionOperatorTokenKind(kind)), name);
        }
        private static GetMemberAccessExpressionOperatorTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.SimpleMemberAccessExpression:
                    return SyntaxKind.DotToken;
                case SyntaxKind.PointerMemberAccessExpression:
                    return SyntaxKind.MinusGreaterThanToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static ConditionalAccessExpression_4365(expression: Syntax.ExpressionSyntax, operatorToken: SyntaxToken, whenNotNull: Syntax.ExpressionSyntax): Syntax.ConditionalAccessExpressionSyntax {
            return <Syntax.ConditionalAccessExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConditionalAccessExpression(expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, whenNotNull == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>whenNotNull.Green).CreateRed_5702();
        }
        public static ConditionalAccessExpression_4438(expression: Syntax.ExpressionSyntax, whenNotNull: Syntax.ExpressionSyntax): Syntax.ConditionalAccessExpressionSyntax {
            return SyntaxFactory.ConditionalAccessExpression_4365(expression, SyntaxFactory.Token_1045(SyntaxKind.QuestionToken), whenNotNull);
        }
        public static MemberBindingExpression_7672(operatorToken: SyntaxToken, name: Syntax.SimpleNameSyntax): Syntax.MemberBindingExpressionSyntax {
            return <Syntax.MemberBindingExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.MemberBindingExpression(<Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleNameSyntax>name.Green).CreateRed_5702();
        }
        public static MemberBindingExpression_1345(name: Syntax.SimpleNameSyntax): Syntax.MemberBindingExpressionSyntax {
            return SyntaxFactory.MemberBindingExpression_7672(SyntaxFactory.Token_1045(SyntaxKind.DotToken), name);
        }
        public static ElementBindingExpression_1527(argumentList: Syntax.BracketedArgumentListSyntax): Syntax.ElementBindingExpressionSyntax {
            return <Syntax.ElementBindingExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ElementBindingExpression(argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static ElementBindingExpression_2234(): Syntax.ElementBindingExpressionSyntax {
            return SyntaxFactory.ElementBindingExpression_1527(SyntaxFactory.BracketedArgumentList_8387());
        }
        public static ImplicitElementAccess_2050(argumentList: Syntax.BracketedArgumentListSyntax): Syntax.ImplicitElementAccessSyntax {
            return <Syntax.ImplicitElementAccessSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ImplicitElementAccess(argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static ImplicitElementAccess_8426(): Syntax.ImplicitElementAccessSyntax {
            return SyntaxFactory.ImplicitElementAccess_2050(SyntaxFactory.BracketedArgumentList_8387());
        }
        public static BinaryExpression_2078(kind: SyntaxKind, left: Syntax.ExpressionSyntax, operatorToken: SyntaxToken, right: Syntax.ExpressionSyntax): Syntax.BinaryExpressionSyntax {
            return <Syntax.BinaryExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BinaryExpression(kind, left == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>left.Green, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, right == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>right.Green).CreateRed_5702();
        }
        public static BinaryExpression_1482(kind: SyntaxKind, left: Syntax.ExpressionSyntax, right: Syntax.ExpressionSyntax): Syntax.BinaryExpressionSyntax {
            return SyntaxFactory.BinaryExpression_2078(kind, left, SyntaxFactory.Token_1045(SyntaxFactory.GetBinaryExpressionOperatorTokenKind(kind)), right);
        }
        private static GetBinaryExpressionOperatorTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.AddExpression:
                    return SyntaxKind.PlusToken;
                case SyntaxKind.SubtractExpression:
                    return SyntaxKind.MinusToken;
                case SyntaxKind.MultiplyExpression:
                    return SyntaxKind.AsteriskToken;
                case SyntaxKind.DivideExpression:
                    return SyntaxKind.SlashToken;
                case SyntaxKind.ModuloExpression:
                    return SyntaxKind.PercentToken;
                case SyntaxKind.LeftShiftExpression:
                    return SyntaxKind.LessThanLessThanToken;
                case SyntaxKind.RightShiftExpression:
                    return SyntaxKind.GreaterThanGreaterThanToken;
                case SyntaxKind.LogicalOrExpression:
                    return SyntaxKind.BarBarToken;
                case SyntaxKind.LogicalAndExpression:
                    return SyntaxKind.AmpersandAmpersandToken;
                case SyntaxKind.BitwiseOrExpression:
                    return SyntaxKind.BarToken;
                case SyntaxKind.BitwiseAndExpression:
                    return SyntaxKind.AmpersandToken;
                case SyntaxKind.ExclusiveOrExpression:
                    return SyntaxKind.CaretToken;
                case SyntaxKind.EqualsExpression:
                    return SyntaxKind.EqualsEqualsToken;
                case SyntaxKind.NotEqualsExpression:
                    return SyntaxKind.ExclamationEqualsToken;
                case SyntaxKind.LessThanExpression:
                    return SyntaxKind.LessThanToken;
                case SyntaxKind.LessThanOrEqualExpression:
                    return SyntaxKind.LessThanEqualsToken;
                case SyntaxKind.GreaterThanExpression:
                    return SyntaxKind.GreaterThanToken;
                case SyntaxKind.GreaterThanOrEqualExpression:
                    return SyntaxKind.GreaterThanEqualsToken;
                case SyntaxKind.IsExpression:
                    return SyntaxKind.IsKeyword;
                case SyntaxKind.AsExpression:
                    return SyntaxKind.AsKeyword;
                case SyntaxKind.CoalesceExpression:
                    return SyntaxKind.QuestionQuestionToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static AssignmentExpression_3657(kind: SyntaxKind, left: Syntax.ExpressionSyntax, operatorToken: SyntaxToken, right: Syntax.ExpressionSyntax): Syntax.AssignmentExpressionSyntax {
            return <Syntax.AssignmentExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AssignmentExpression(kind, left == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>left.Green, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, right == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>right.Green).CreateRed_5702();
        }
        public static AssignmentExpression_7372(kind: SyntaxKind, left: Syntax.ExpressionSyntax, right: Syntax.ExpressionSyntax): Syntax.AssignmentExpressionSyntax {
            return SyntaxFactory.AssignmentExpression_3657(kind, left, SyntaxFactory.Token_1045(SyntaxFactory.GetAssignmentExpressionOperatorTokenKind(kind)), right);
        }
        private static GetAssignmentExpressionOperatorTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.SimpleAssignmentExpression:
                    return SyntaxKind.EqualsToken;
                case SyntaxKind.AddAssignmentExpression:
                    return SyntaxKind.PlusEqualsToken;
                case SyntaxKind.SubtractAssignmentExpression:
                    return SyntaxKind.MinusEqualsToken;
                case SyntaxKind.MultiplyAssignmentExpression:
                    return SyntaxKind.AsteriskEqualsToken;
                case SyntaxKind.DivideAssignmentExpression:
                    return SyntaxKind.SlashEqualsToken;
                case SyntaxKind.ModuloAssignmentExpression:
                    return SyntaxKind.PercentEqualsToken;
                case SyntaxKind.AndAssignmentExpression:
                    return SyntaxKind.AmpersandEqualsToken;
                case SyntaxKind.ExclusiveOrAssignmentExpression:
                    return SyntaxKind.CaretEqualsToken;
                case SyntaxKind.OrAssignmentExpression:
                    return SyntaxKind.BarEqualsToken;
                case SyntaxKind.LeftShiftAssignmentExpression:
                    return SyntaxKind.LessThanLessThanEqualsToken;
                case SyntaxKind.RightShiftAssignmentExpression:
                    return SyntaxKind.GreaterThanGreaterThanEqualsToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static ConditionalExpression_1159(condition: Syntax.ExpressionSyntax, questionToken: SyntaxToken, whenTrue: Syntax.ExpressionSyntax, colonToken: SyntaxToken, whenFalse: Syntax.ExpressionSyntax): Syntax.ConditionalExpressionSyntax {
            return <Syntax.ConditionalExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConditionalExpression(condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>questionToken.Node, whenTrue == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>whenTrue.Green, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node, whenFalse == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>whenFalse.Green).CreateRed_5702();
        }
        public static ConditionalExpression_2720(condition: Syntax.ExpressionSyntax, whenTrue: Syntax.ExpressionSyntax, whenFalse: Syntax.ExpressionSyntax): Syntax.ConditionalExpressionSyntax {
            return SyntaxFactory.ConditionalExpression_1159(condition, SyntaxFactory.Token_1045(SyntaxKind.QuestionToken), whenTrue, SyntaxFactory.Token_1045(SyntaxKind.ColonToken), whenFalse);
        }
        public static ThisExpression_1991(token: SyntaxToken): Syntax.ThisExpressionSyntax {
            return <Syntax.ThisExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ThisExpression(<Syntax.InternalSyntax.SyntaxToken>token.Node).CreateRed_5702();
        }
        public static ThisExpression_1169(): Syntax.ThisExpressionSyntax {
            return SyntaxFactory.ThisExpression_1991(SyntaxFactory.Token_1045(SyntaxKind.ThisKeyword));
        }
        public static BaseExpression_1185(token: SyntaxToken): Syntax.BaseExpressionSyntax {
            return <Syntax.BaseExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BaseExpression(<Syntax.InternalSyntax.SyntaxToken>token.Node).CreateRed_5702();
        }
        public static BaseExpression_1547(): Syntax.BaseExpressionSyntax {
            return SyntaxFactory.BaseExpression_1185(SyntaxFactory.Token_1045(SyntaxKind.BaseKeyword));
        }
        public static LiteralExpression_7980(kind: SyntaxKind, token: SyntaxToken): Syntax.LiteralExpressionSyntax {
            return <Syntax.LiteralExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LiteralExpression(kind, <Syntax.InternalSyntax.SyntaxToken>token.Node).CreateRed_5702();
        }
        public static LiteralExpression_1324(kind: SyntaxKind): Syntax.LiteralExpressionSyntax {
            return SyntaxFactory.LiteralExpression_7980(kind, SyntaxFactory.Token_1045(SyntaxFactory.GetLiteralExpressionTokenKind(kind)));
        }
        private static GetLiteralExpressionTokenKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.ArgListExpression:
                    return SyntaxKind.ArgListKeyword;
                case SyntaxKind.NumericLiteralExpression:
                    return SyntaxKind.NumericLiteralToken;
                case SyntaxKind.StringLiteralExpression:
                    return SyntaxKind.StringLiteralToken;
                case SyntaxKind.CharacterLiteralExpression:
                    return SyntaxKind.CharacterLiteralToken;
                case SyntaxKind.TrueLiteralExpression:
                    return SyntaxKind.TrueKeyword;
                case SyntaxKind.FalseLiteralExpression:
                    return SyntaxKind.FalseKeyword;
                case SyntaxKind.NullLiteralExpression:
                    return SyntaxKind.NullKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static MakeRefExpression_1856(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken): Syntax.MakeRefExpressionSyntax {
            return <Syntax.MakeRefExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.MakeRefExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static MakeRefExpression_8838(expression: Syntax.ExpressionSyntax): Syntax.MakeRefExpressionSyntax {
            return SyntaxFactory.MakeRefExpression_1856(SyntaxFactory.Token_1045(SyntaxKind.MakeRefKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static RefTypeExpression_2003(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken): Syntax.RefTypeExpressionSyntax {
            return <Syntax.RefTypeExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.RefTypeExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static RefTypeExpression_1288(expression: Syntax.ExpressionSyntax): Syntax.RefTypeExpressionSyntax {
            return SyntaxFactory.RefTypeExpression_2003(SyntaxFactory.Token_1045(SyntaxKind.RefTypeKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static RefValueExpression_1254(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, comma: SyntaxToken, type: Syntax.TypeSyntax, closeParenToken: SyntaxToken): Syntax.RefValueExpressionSyntax {
            return <Syntax.RefValueExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.RefValueExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>comma.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static RefValueExpression_1290(expression: Syntax.ExpressionSyntax, type: Syntax.TypeSyntax): Syntax.RefValueExpressionSyntax {
            return SyntaxFactory.RefValueExpression_1254(SyntaxFactory.Token_1045(SyntaxKind.RefValueKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CommaToken), type, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static CheckedExpression_1461(kind: SyntaxKind, keyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken): Syntax.CheckedExpressionSyntax {
            return <Syntax.CheckedExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CheckedExpression(kind, <Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static CheckedExpression_1385(kind: SyntaxKind, expression: Syntax.ExpressionSyntax): Syntax.CheckedExpressionSyntax {
            return SyntaxFactory.CheckedExpression_1461(kind, SyntaxFactory.Token_1045(SyntaxFactory.GetCheckedExpressionKeywordKind(kind)), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        private static GetCheckedExpressionKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.CheckedExpression:
                    return SyntaxKind.CheckedKeyword;
                case SyntaxKind.UncheckedExpression:
                    return SyntaxKind.UncheckedKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static DefaultExpression_9224(keyword: SyntaxToken, openParenToken: SyntaxToken, type: Syntax.TypeSyntax, closeParenToken: SyntaxToken): Syntax.DefaultExpressionSyntax {
            return <Syntax.DefaultExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DefaultExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static DefaultExpression_1872(type: Syntax.TypeSyntax): Syntax.DefaultExpressionSyntax {
            return SyntaxFactory.DefaultExpression_9224(SyntaxFactory.Token_1045(SyntaxKind.DefaultKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static TypeOfExpression_1008(keyword: SyntaxToken, openParenToken: SyntaxToken, type: Syntax.TypeSyntax, closeParenToken: SyntaxToken): Syntax.TypeOfExpressionSyntax {
            return <Syntax.TypeOfExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeOfExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static TypeOfExpression_1591(type: Syntax.TypeSyntax): Syntax.TypeOfExpressionSyntax {
            return SyntaxFactory.TypeOfExpression_1008(SyntaxFactory.Token_1045(SyntaxKind.TypeOfKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static SizeOfExpression_1890(keyword: SyntaxToken, openParenToken: SyntaxToken, type: Syntax.TypeSyntax, closeParenToken: SyntaxToken): Syntax.SizeOfExpressionSyntax {
            return <Syntax.SizeOfExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SizeOfExpression(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static SizeOfExpression_1293(type: Syntax.TypeSyntax): Syntax.SizeOfExpressionSyntax {
            return SyntaxFactory.SizeOfExpression_1890(SyntaxFactory.Token_1045(SyntaxKind.SizeOfKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static InvocationExpression_9198(expression: Syntax.ExpressionSyntax, argumentList: Syntax.ArgumentListSyntax): Syntax.InvocationExpressionSyntax {
            return <Syntax.InvocationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.InvocationExpression(expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static InvocationExpression_2460(expression: Syntax.ExpressionSyntax): Syntax.InvocationExpressionSyntax {
            return SyntaxFactory.InvocationExpression_9198(expression, SyntaxFactory.ArgumentList_1288());
        }
        public static ElementAccessExpression_1162(expression: Syntax.ExpressionSyntax, argumentList: Syntax.BracketedArgumentListSyntax): Syntax.ElementAccessExpressionSyntax {
            return <Syntax.ElementAccessExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ElementAccessExpression(expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static ElementAccessExpression_1533(expression: Syntax.ExpressionSyntax): Syntax.ElementAccessExpressionSyntax {
            return SyntaxFactory.ElementAccessExpression_1162(expression, SyntaxFactory.BracketedArgumentList_8387());
        }
        public static ArgumentList_1043(openParenToken: SyntaxToken, arguments1: SeparatedSyntaxList<Syntax.ArgumentSyntax>, closeParenToken: SyntaxToken): Syntax.ArgumentListSyntax {
            return <Syntax.ArgumentListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ArgumentList(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentSyntax>(arguments1.Node), <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static ArgumentList_1288(arguments1: SeparatedSyntaxList<Syntax.ArgumentSyntax> = <SeparatedSyntaxList<Syntax.ArgumentSyntax>> structDefault(SeparatedSyntaxList)): Syntax.ArgumentListSyntax {
            return SyntaxFactory.ArgumentList_1043(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), arguments1, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static BracketedArgumentList_1168(openBracketToken: SyntaxToken, arguments1: SeparatedSyntaxList<Syntax.ArgumentSyntax>, closeBracketToken: SyntaxToken): Syntax.BracketedArgumentListSyntax {
            return <Syntax.BracketedArgumentListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BracketedArgumentList(<Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentSyntax>(arguments1.Node), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node).CreateRed_5702();
        }
        public static BracketedArgumentList_8387(arguments1: SeparatedSyntaxList<Syntax.ArgumentSyntax> = <SeparatedSyntaxList<Syntax.ArgumentSyntax>> structDefault(SeparatedSyntaxList)): Syntax.BracketedArgumentListSyntax {
            return SyntaxFactory.BracketedArgumentList_1168(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), arguments1, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static Argument_2910(nameColon: Syntax.NameColonSyntax, refOrOutKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.ArgumentSyntax {
            return <Syntax.ArgumentSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.Argument(nameColon == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameColonSyntax>nameColon.Green, <Syntax.InternalSyntax.SyntaxToken>refOrOutKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static Argument_9144(expression: Syntax.ExpressionSyntax): Syntax.ArgumentSyntax {
            return SyntaxFactory.Argument_2910(null, structDefault(SyntaxToken), expression);
        }
        public static NameColon_9012(name: Syntax.IdentifierNameSyntax, colonToken: SyntaxToken): Syntax.NameColonSyntax {
            return <Syntax.NameColonSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.NameColon(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node).CreateRed_5702();
        }
        public static NameColon_1614(name: Syntax.IdentifierNameSyntax): Syntax.NameColonSyntax {
            return SyntaxFactory.NameColon_9012(name, SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static NameColon_1885(name: string): Syntax.NameColonSyntax {
            return SyntaxFactory.NameColon_9012(SyntaxFactory.IdentifierName_1404(name), SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static CastExpression_9709(openParenToken: SyntaxToken, type: Syntax.TypeSyntax, closeParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.CastExpressionSyntax {
            return <Syntax.CastExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CastExpression(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static CastExpression_9612(type: Syntax.TypeSyntax, expression: Syntax.ExpressionSyntax): Syntax.CastExpressionSyntax {
            return SyntaxFactory.CastExpression_9709(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), expression);
        }
        public static AnonymousMethodExpression_1352(asyncKeyword: SyntaxToken, delegateKeyword: SyntaxToken, parameterList: Syntax.ParameterListSyntax, block: Syntax.BlockSyntax): Syntax.AnonymousMethodExpressionSyntax {
            return <Syntax.AnonymousMethodExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AnonymousMethodExpression(<Syntax.InternalSyntax.SyntaxToken>asyncKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>delegateKeyword.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green).CreateRed_5702();
        }
        public static AnonymousMethodExpression_4724(parameterList: Syntax.ParameterListSyntax, block: Syntax.BlockSyntax): Syntax.AnonymousMethodExpressionSyntax {
            return SyntaxFactory.AnonymousMethodExpression_1352(structDefault(SyntaxToken), SyntaxFactory.Token_1045(SyntaxKind.DelegateKeyword), parameterList, block);
        }
        public static AnonymousMethodExpression_1559(): Syntax.AnonymousMethodExpressionSyntax {
            return SyntaxFactory.AnonymousMethodExpression_1352(structDefault(SyntaxToken), SyntaxFactory.Token_1045(SyntaxKind.DelegateKeyword), null, SyntaxFactory.Block_1037());
        }
        public static SimpleLambdaExpression_6633(asyncKeyword: SyntaxToken, parameter: Syntax.ParameterSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): Syntax.SimpleLambdaExpressionSyntax {
            return <Syntax.SimpleLambdaExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SimpleLambdaExpression(<Syntax.InternalSyntax.SyntaxToken>asyncKeyword.Node, parameter == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>parameter.Green, <Syntax.InternalSyntax.SyntaxToken>arrowToken.Node, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>body.Green).CreateRed_5702();
        }
        public static SimpleLambdaExpression_6017(parameter: Syntax.ParameterSyntax, body: CSharpSyntaxNode): Syntax.SimpleLambdaExpressionSyntax {
            return SyntaxFactory.SimpleLambdaExpression_6633(structDefault(SyntaxToken), parameter, SyntaxFactory.Token_1045(SyntaxKind.EqualsGreaterThanToken), body);
        }
        public static ParenthesizedLambdaExpression_1721(asyncKeyword: SyntaxToken, parameterList: Syntax.ParameterListSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): Syntax.ParenthesizedLambdaExpressionSyntax {
            return <Syntax.ParenthesizedLambdaExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ParenthesizedLambdaExpression(<Syntax.InternalSyntax.SyntaxToken>asyncKeyword.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, <Syntax.InternalSyntax.SyntaxToken>arrowToken.Node, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>body.Green).CreateRed_5702();
        }
        public static ParenthesizedLambdaExpression_3875(parameterList: Syntax.ParameterListSyntax, body: CSharpSyntaxNode): Syntax.ParenthesizedLambdaExpressionSyntax {
            return SyntaxFactory.ParenthesizedLambdaExpression_1721(structDefault(SyntaxToken), parameterList, SyntaxFactory.Token_1045(SyntaxKind.EqualsGreaterThanToken), body);
        }
        public static ParenthesizedLambdaExpression_1258(body: CSharpSyntaxNode): Syntax.ParenthesizedLambdaExpressionSyntax {
            return SyntaxFactory.ParenthesizedLambdaExpression_1721(structDefault(SyntaxToken), SyntaxFactory.ParameterList_8831(), SyntaxFactory.Token_1045(SyntaxKind.EqualsGreaterThanToken), body);
        }
        public static InitializerExpression_1979(kind: SyntaxKind, openBraceToken: SyntaxToken, expressions: SeparatedSyntaxList<Syntax.ExpressionSyntax>, closeBraceToken: SyntaxToken): Syntax.InitializerExpressionSyntax {
            return <Syntax.InitializerExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.InitializerExpression(kind, <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(expressions.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node).CreateRed_5702();
        }
        public static InitializerExpression_1714(kind: SyntaxKind, expressions: SeparatedSyntaxList<Syntax.ExpressionSyntax> = <SeparatedSyntaxList<Syntax.ExpressionSyntax>> structDefault(SeparatedSyntaxList)): Syntax.InitializerExpressionSyntax {
            return SyntaxFactory.InitializerExpression_1979(kind, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), expressions, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static ObjectCreationExpression_7070(newKeyword: SyntaxToken, type: Syntax.TypeSyntax, argumentList: Syntax.ArgumentListSyntax, initializer: Syntax.InitializerExpressionSyntax): Syntax.ObjectCreationExpressionSyntax {
            return <Syntax.ObjectCreationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ObjectCreationExpression(<Syntax.InternalSyntax.SyntaxToken>newKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentListSyntax>argumentList.Green, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InitializerExpressionSyntax>initializer.Green).CreateRed_5702();
        }
        public static ObjectCreationExpression_1020(type: Syntax.TypeSyntax, argumentList: Syntax.ArgumentListSyntax, initializer: Syntax.InitializerExpressionSyntax): Syntax.ObjectCreationExpressionSyntax {
            return SyntaxFactory.ObjectCreationExpression_7070(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), type, argumentList, initializer);
        }
        public static ObjectCreationExpression_1793(type: Syntax.TypeSyntax): Syntax.ObjectCreationExpressionSyntax {
            return SyntaxFactory.ObjectCreationExpression_7070(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), type, null, null);
        }
        public static AnonymousObjectMemberDeclarator_1075(nameEquals: Syntax.NameEqualsSyntax, expression: Syntax.ExpressionSyntax): Syntax.AnonymousObjectMemberDeclaratorSyntax {
            return <Syntax.AnonymousObjectMemberDeclaratorSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AnonymousObjectMemberDeclarator(nameEquals == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameEqualsSyntax>nameEquals.Green, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static AnonymousObjectMemberDeclarator_2144(expression: Syntax.ExpressionSyntax): Syntax.AnonymousObjectMemberDeclaratorSyntax {
            return SyntaxFactory.AnonymousObjectMemberDeclarator_1075(null, expression);
        }
        public static AnonymousObjectCreationExpression_6133(newKeyword: SyntaxToken, openBraceToken: SyntaxToken, initializers: SeparatedSyntaxList<Syntax.AnonymousObjectMemberDeclaratorSyntax>, closeBraceToken: SyntaxToken): Syntax.AnonymousObjectCreationExpressionSyntax {
            return <Syntax.AnonymousObjectCreationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AnonymousObjectCreationExpression(<Syntax.InternalSyntax.SyntaxToken>newKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousObjectMemberDeclaratorSyntax>(initializers.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node).CreateRed_5702();
        }
        public static AnonymousObjectCreationExpression_1737(initializers: SeparatedSyntaxList<Syntax.AnonymousObjectMemberDeclaratorSyntax> = <SeparatedSyntaxList<Syntax.AnonymousObjectMemberDeclaratorSyntax>> structDefault(SeparatedSyntaxList)): Syntax.AnonymousObjectCreationExpressionSyntax {
            return SyntaxFactory.AnonymousObjectCreationExpression_6133(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), initializers, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static ArrayCreationExpression_1446(newKeyword: SyntaxToken, type: Syntax.ArrayTypeSyntax, initializer: Syntax.InitializerExpressionSyntax): Syntax.ArrayCreationExpressionSyntax {
            return <Syntax.ArrayCreationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ArrayCreationExpression(<Syntax.InternalSyntax.SyntaxToken>newKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayTypeSyntax>type.Green, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InitializerExpressionSyntax>initializer.Green).CreateRed_5702();
        }
        public static ArrayCreationExpression_3747(type: Syntax.ArrayTypeSyntax, initializer: Syntax.InitializerExpressionSyntax): Syntax.ArrayCreationExpressionSyntax {
            return SyntaxFactory.ArrayCreationExpression_1446(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), type, initializer);
        }
        public static ArrayCreationExpression_2101(type: Syntax.ArrayTypeSyntax): Syntax.ArrayCreationExpressionSyntax {
            return SyntaxFactory.ArrayCreationExpression_1446(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), type, null);
        }
        public static ImplicitArrayCreationExpression_2138(newKeyword: SyntaxToken, openBracketToken: SyntaxToken, commas: SyntaxTokenList, closeBracketToken: SyntaxToken, initializer: Syntax.InitializerExpressionSyntax): Syntax.ImplicitArrayCreationExpressionSyntax {
            return <Syntax.ImplicitArrayCreationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ImplicitArrayCreationExpression(<Syntax.InternalSyntax.SyntaxToken>newKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(commas.Node)), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InitializerExpressionSyntax>initializer.Green).CreateRed_5702();
        }
        public static ImplicitArrayCreationExpression_1037(commas: SyntaxTokenList, initializer: Syntax.InitializerExpressionSyntax): Syntax.ImplicitArrayCreationExpressionSyntax {
            return SyntaxFactory.ImplicitArrayCreationExpression_2138(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), commas, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken), initializer);
        }
        public static ImplicitArrayCreationExpression_1372(initializer: Syntax.InitializerExpressionSyntax): Syntax.ImplicitArrayCreationExpressionSyntax {
            return SyntaxFactory.ImplicitArrayCreationExpression_2138(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken), initializer);
        }
        public static StackAllocArrayCreationExpression_1830(stackAllocKeyword: SyntaxToken, type: Syntax.TypeSyntax): Syntax.StackAllocArrayCreationExpressionSyntax {
            return <Syntax.StackAllocArrayCreationExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.StackAllocArrayCreationExpression(<Syntax.InternalSyntax.SyntaxToken>stackAllocKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static StackAllocArrayCreationExpression_1025(type: Syntax.TypeSyntax): Syntax.StackAllocArrayCreationExpressionSyntax {
            return SyntaxFactory.StackAllocArrayCreationExpression_1830(SyntaxFactory.Token_1045(SyntaxKind.StackAllocKeyword), type);
        }
        public static QueryExpression(fromClause: Syntax.FromClauseSyntax, body: Syntax.QueryBodySyntax): Syntax.QueryExpressionSyntax {
            return <Syntax.QueryExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.QueryExpression(fromClause == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FromClauseSyntax>fromClause.Green, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryBodySyntax>body.Green).CreateRed_5702();
        }
        public static QueryBody_1176(clauses: SyntaxList<Syntax.QueryClauseSyntax>, selectOrGroup: Syntax.SelectOrGroupClauseSyntax, continuation: Syntax.QueryContinuationSyntax): Syntax.QueryBodySyntax {
            return <Syntax.QueryBodySyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.QueryBody(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryClauseSyntax>(clauses.Node), selectOrGroup == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SelectOrGroupClauseSyntax>selectOrGroup.Green, continuation == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryContinuationSyntax>continuation.Green).CreateRed_5702();
        }
        public static QueryBody_1883(selectOrGroup: Syntax.SelectOrGroupClauseSyntax): Syntax.QueryBodySyntax {
            return SyntaxFactory.QueryBody_1176(<SyntaxList<Syntax.QueryClauseSyntax>> structDefault(SyntaxList), selectOrGroup, null);
        }
        public static FromClause_4646(fromKeyword: SyntaxToken, type: Syntax.TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.FromClauseSyntax {
            return <Syntax.FromClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.FromClause(<Syntax.InternalSyntax.SyntaxToken>fromKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>inKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static FromClause_1546(type: Syntax.TypeSyntax, identifier: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.FromClauseSyntax {
            return SyntaxFactory.FromClause_4646(SyntaxFactory.Token_1045(SyntaxKind.FromKeyword), type, identifier, SyntaxFactory.Token_1045(SyntaxKind.InKeyword), expression);
        }
        public static FromClause_5300(identifier: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.FromClauseSyntax {
            return SyntaxFactory.FromClause_4646(SyntaxFactory.Token_1045(SyntaxKind.FromKeyword), null, identifier, SyntaxFactory.Token_1045(SyntaxKind.InKeyword), expression);
        }
        public static FromClause_6642(identifier: string, expression: Syntax.ExpressionSyntax): Syntax.FromClauseSyntax {
            return SyntaxFactory.FromClause_4646(SyntaxFactory.Token_1045(SyntaxKind.FromKeyword), null, SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.InKeyword), expression);
        }
        public static LetClause_9775(letKeyword: SyntaxToken, identifier: SyntaxToken, equalsToken: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.LetClauseSyntax {
            return <Syntax.LetClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LetClause(<Syntax.InternalSyntax.SyntaxToken>letKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>equalsToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static LetClause_6611(identifier: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.LetClauseSyntax {
            return SyntaxFactory.LetClause_9775(SyntaxFactory.Token_1045(SyntaxKind.LetKeyword), identifier, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), expression);
        }
        public static LetClause_2005(identifier: string, expression: Syntax.ExpressionSyntax): Syntax.LetClauseSyntax {
            return SyntaxFactory.LetClause_9775(SyntaxFactory.Token_1045(SyntaxKind.LetKeyword), SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), expression);
        }
        public static JoinClause_1396(joinKeyword: SyntaxToken, type: Syntax.TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, inExpression: Syntax.ExpressionSyntax, onKeyword: SyntaxToken, leftExpression: Syntax.ExpressionSyntax, equalsKeyword: SyntaxToken, rightExpression: Syntax.ExpressionSyntax, into: Syntax.JoinIntoClauseSyntax): Syntax.JoinClauseSyntax {
            return <Syntax.JoinClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.JoinClause(<Syntax.InternalSyntax.SyntaxToken>joinKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>inKeyword.Node, inExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>inExpression.Green, <Syntax.InternalSyntax.SyntaxToken>onKeyword.Node, leftExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>leftExpression.Green, <Syntax.InternalSyntax.SyntaxToken>equalsKeyword.Node, rightExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>rightExpression.Green, into == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinIntoClauseSyntax>into.Green).CreateRed_5702();
        }
        public static JoinClause_5271(type: Syntax.TypeSyntax, identifier: SyntaxToken, inExpression: Syntax.ExpressionSyntax, leftExpression: Syntax.ExpressionSyntax, rightExpression: Syntax.ExpressionSyntax, into: Syntax.JoinIntoClauseSyntax): Syntax.JoinClauseSyntax {
            return SyntaxFactory.JoinClause_1396(SyntaxFactory.Token_1045(SyntaxKind.JoinKeyword), type, identifier, SyntaxFactory.Token_1045(SyntaxKind.InKeyword), inExpression, SyntaxFactory.Token_1045(SyntaxKind.OnKeyword), leftExpression, SyntaxFactory.Token_1045(SyntaxKind.EqualsKeyword), rightExpression, into);
        }
        public static JoinClause_2668(identifier: SyntaxToken, inExpression: Syntax.ExpressionSyntax, leftExpression: Syntax.ExpressionSyntax, rightExpression: Syntax.ExpressionSyntax): Syntax.JoinClauseSyntax {
            return SyntaxFactory.JoinClause_1396(SyntaxFactory.Token_1045(SyntaxKind.JoinKeyword), null, identifier, SyntaxFactory.Token_1045(SyntaxKind.InKeyword), inExpression, SyntaxFactory.Token_1045(SyntaxKind.OnKeyword), leftExpression, SyntaxFactory.Token_1045(SyntaxKind.EqualsKeyword), rightExpression, null);
        }
        public static JoinClause_1767(identifier: string, inExpression: Syntax.ExpressionSyntax, leftExpression: Syntax.ExpressionSyntax, rightExpression: Syntax.ExpressionSyntax): Syntax.JoinClauseSyntax {
            return SyntaxFactory.JoinClause_1396(SyntaxFactory.Token_1045(SyntaxKind.JoinKeyword), null, SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.InKeyword), inExpression, SyntaxFactory.Token_1045(SyntaxKind.OnKeyword), leftExpression, SyntaxFactory.Token_1045(SyntaxKind.EqualsKeyword), rightExpression, null);
        }
        public static JoinIntoClause_2046(intoKeyword: SyntaxToken, identifier: SyntaxToken): Syntax.JoinIntoClauseSyntax {
            return <Syntax.JoinIntoClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.JoinIntoClause(<Syntax.InternalSyntax.SyntaxToken>intoKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node).CreateRed_5702();
        }
        public static JoinIntoClause_1593(identifier: SyntaxToken): Syntax.JoinIntoClauseSyntax {
            return SyntaxFactory.JoinIntoClause_2046(SyntaxFactory.Token_1045(SyntaxKind.IntoKeyword), identifier);
        }
        public static JoinIntoClause_4774(identifier: string): Syntax.JoinIntoClauseSyntax {
            return SyntaxFactory.JoinIntoClause_2046(SyntaxFactory.Token_1045(SyntaxKind.IntoKeyword), SyntaxFactory.Identifier_3961(identifier));
        }
        public static WhereClause_3161(whereKeyword: SyntaxToken, condition: Syntax.ExpressionSyntax): Syntax.WhereClauseSyntax {
            return <Syntax.WhereClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.WhereClause(<Syntax.InternalSyntax.SyntaxToken>whereKeyword.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green).CreateRed_5702();
        }
        public static WhereClause_8812(condition: Syntax.ExpressionSyntax): Syntax.WhereClauseSyntax {
            return SyntaxFactory.WhereClause_3161(SyntaxFactory.Token_1045(SyntaxKind.WhereKeyword), condition);
        }
        public static OrderByClause_4578(orderByKeyword: SyntaxToken, orderings: SeparatedSyntaxList<Syntax.OrderingSyntax>): Syntax.OrderByClauseSyntax {
            return <Syntax.OrderByClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.OrderByClause(<Syntax.InternalSyntax.SyntaxToken>orderByKeyword.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OrderingSyntax>(orderings.Node)).CreateRed_5702();
        }
        public static OrderByClause_1098(orderings: SeparatedSyntaxList<Syntax.OrderingSyntax> = <SeparatedSyntaxList<Syntax.OrderingSyntax>> structDefault(SeparatedSyntaxList)): Syntax.OrderByClauseSyntax {
            return SyntaxFactory.OrderByClause_4578(SyntaxFactory.Token_1045(SyntaxKind.OrderByKeyword), orderings);
        }
        public static Ordering_1799(kind: SyntaxKind, expression: Syntax.ExpressionSyntax, ascendingOrDescendingKeyword: SyntaxToken): Syntax.OrderingSyntax {
            return <Syntax.OrderingSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.Ordering(kind, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>ascendingOrDescendingKeyword.Node).CreateRed_5702();
        }
        public static Ordering_1914(kind: SyntaxKind, expression: Syntax.ExpressionSyntax): Syntax.OrderingSyntax {
            return SyntaxFactory.Ordering_1799(kind, expression, structDefault(SyntaxToken));
        }
        private static GetOrderingAscendingOrDescendingKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.AscendingOrdering:
                    return SyntaxKind.AscendingKeyword;
                case SyntaxKind.DescendingOrdering:
                    return SyntaxKind.DescendingKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static SelectClause_1144(selectKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.SelectClauseSyntax {
            return <Syntax.SelectClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SelectClause(<Syntax.InternalSyntax.SyntaxToken>selectKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static SelectClause_1370(expression: Syntax.ExpressionSyntax): Syntax.SelectClauseSyntax {
            return SyntaxFactory.SelectClause_1144(SyntaxFactory.Token_1045(SyntaxKind.SelectKeyword), expression);
        }
        public static GroupClause_1229(groupKeyword: SyntaxToken, groupExpression: Syntax.ExpressionSyntax, byKeyword: SyntaxToken, byExpression: Syntax.ExpressionSyntax): Syntax.GroupClauseSyntax {
            return <Syntax.GroupClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GroupClause(<Syntax.InternalSyntax.SyntaxToken>groupKeyword.Node, groupExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>groupExpression.Green, <Syntax.InternalSyntax.SyntaxToken>byKeyword.Node, byExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>byExpression.Green).CreateRed_5702();
        }
        public static GroupClause_1761(groupExpression: Syntax.ExpressionSyntax, byExpression: Syntax.ExpressionSyntax): Syntax.GroupClauseSyntax {
            return SyntaxFactory.GroupClause_1229(SyntaxFactory.Token_1045(SyntaxKind.GroupKeyword), groupExpression, SyntaxFactory.Token_1045(SyntaxKind.ByKeyword), byExpression);
        }
        public static QueryContinuation_1244(intoKeyword: SyntaxToken, identifier: SyntaxToken, body: Syntax.QueryBodySyntax): Syntax.QueryContinuationSyntax {
            return <Syntax.QueryContinuationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.QueryContinuation(<Syntax.InternalSyntax.SyntaxToken>intoKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryBodySyntax>body.Green).CreateRed_5702();
        }
        public static QueryContinuation_2329(identifier: SyntaxToken, body: Syntax.QueryBodySyntax): Syntax.QueryContinuationSyntax {
            return SyntaxFactory.QueryContinuation_1244(SyntaxFactory.Token_1045(SyntaxKind.IntoKeyword), identifier, body);
        }
        public static QueryContinuation_1649(identifier: string, body: Syntax.QueryBodySyntax): Syntax.QueryContinuationSyntax {
            return SyntaxFactory.QueryContinuation_1244(SyntaxFactory.Token_1045(SyntaxKind.IntoKeyword), SyntaxFactory.Identifier_3961(identifier), body);
        }
        public static OmittedArraySizeExpression_2029(omittedArraySizeExpressionToken: SyntaxToken): Syntax.OmittedArraySizeExpressionSyntax {
            return <Syntax.OmittedArraySizeExpressionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.OmittedArraySizeExpression(<Syntax.InternalSyntax.SyntaxToken>omittedArraySizeExpressionToken.Node).CreateRed_5702();
        }
        public static OmittedArraySizeExpression_2083(): Syntax.OmittedArraySizeExpressionSyntax {
            return SyntaxFactory.OmittedArraySizeExpression_2029(SyntaxFactory.Token_1045(SyntaxKind.OmittedArraySizeExpressionToken));
        }
        public static GlobalStatement(statement: Syntax.StatementSyntax): Syntax.GlobalStatementSyntax {
            return <Syntax.GlobalStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GlobalStatement(statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static Block_1784(openBraceToken: SyntaxToken, statements: SyntaxList<Syntax.StatementSyntax>, closeBraceToken: SyntaxToken): Syntax.BlockSyntax {
            return <Syntax.BlockSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.Block(<Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>(statements.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node).CreateRed_5702();
        }
        public static Block_1037(statements: SyntaxList<Syntax.StatementSyntax> = <SyntaxList<Syntax.StatementSyntax>> structDefault(SyntaxList)): Syntax.BlockSyntax {
            return SyntaxFactory.Block_1784(SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), statements, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static LocalDeclarationStatement_8668(modifiers: SyntaxTokenList, declaration: Syntax.VariableDeclarationSyntax, semicolonToken: SyntaxToken): Syntax.LocalDeclarationStatementSyntax {
            return <Syntax.LocalDeclarationStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LocalDeclarationStatement(Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static LocalDeclarationStatement_1324(modifiers: SyntaxTokenList, declaration: Syntax.VariableDeclarationSyntax): Syntax.LocalDeclarationStatementSyntax {
            return SyntaxFactory.LocalDeclarationStatement_8668(modifiers, declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static LocalDeclarationStatement_1522(declaration: Syntax.VariableDeclarationSyntax): Syntax.LocalDeclarationStatementSyntax {
            return SyntaxFactory.LocalDeclarationStatement_8668(structDefault(SyntaxTokenList), declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static VariableDeclaration_1163(type: Syntax.TypeSyntax, variables: SeparatedSyntaxList<Syntax.VariableDeclaratorSyntax>): Syntax.VariableDeclarationSyntax {
            return <Syntax.VariableDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.VariableDeclaration(type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>(variables.Node)).CreateRed_5702();
        }
        public static VariableDeclaration_1609(type: Syntax.TypeSyntax): Syntax.VariableDeclarationSyntax {
            return SyntaxFactory.VariableDeclaration_1163(type, <SeparatedSyntaxList<Syntax.VariableDeclaratorSyntax>> structDefault(SeparatedSyntaxList));
        }
        public static VariableDeclarator_2274(identifier: SyntaxToken, argumentList: Syntax.BracketedArgumentListSyntax, initializer: Syntax.EqualsValueClauseSyntax): Syntax.VariableDeclaratorSyntax {
            return <Syntax.VariableDeclaratorSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.VariableDeclarator(<Syntax.InternalSyntax.SyntaxToken>identifier.Node, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>argumentList.Green, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EqualsValueClauseSyntax>initializer.Green).CreateRed_5702();
        }
        public static VariableDeclarator_1143(identifier: SyntaxToken): Syntax.VariableDeclaratorSyntax {
            return SyntaxFactory.VariableDeclarator_2274(identifier, null, null);
        }
        public static VariableDeclarator_1159(identifier: string): Syntax.VariableDeclaratorSyntax {
            return SyntaxFactory.VariableDeclarator_2274(SyntaxFactory.Identifier_3961(identifier), null, null);
        }
        public static EqualsValueClause_1763(equalsToken: SyntaxToken, value: Syntax.ExpressionSyntax): Syntax.EqualsValueClauseSyntax {
            return <Syntax.EqualsValueClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EqualsValueClause(<Syntax.InternalSyntax.SyntaxToken>equalsToken.Node, value == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>value.Green).CreateRed_5702();
        }
        public static EqualsValueClause_1477(value: Syntax.ExpressionSyntax): Syntax.EqualsValueClauseSyntax {
            return SyntaxFactory.EqualsValueClause_1763(SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), value);
        }
        public static ExpressionStatement_1248(expression: Syntax.ExpressionSyntax, semicolonToken: SyntaxToken): Syntax.ExpressionStatementSyntax {
            return <Syntax.ExpressionStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ExpressionStatement(expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ExpressionStatement_8641(expression: Syntax.ExpressionSyntax): Syntax.ExpressionStatementSyntax {
            return SyntaxFactory.ExpressionStatement_1248(expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static EmptyStatement_5677(semicolonToken: SyntaxToken): Syntax.EmptyStatementSyntax {
            return <Syntax.EmptyStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EmptyStatement(<Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static EmptyStatement_1657(): Syntax.EmptyStatementSyntax {
            return SyntaxFactory.EmptyStatement_5677(SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static LabeledStatement_3705(identifier: SyntaxToken, colonToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.LabeledStatementSyntax {
            return <Syntax.LabeledStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LabeledStatement(<Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static LabeledStatement_3323(identifier: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.LabeledStatementSyntax {
            return SyntaxFactory.LabeledStatement_3705(identifier, SyntaxFactory.Token_1045(SyntaxKind.ColonToken), statement);
        }
        public static LabeledStatement_3219(identifier: string, statement: Syntax.StatementSyntax): Syntax.LabeledStatementSyntax {
            return SyntaxFactory.LabeledStatement_3705(SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.ColonToken), statement);
        }
        public static GotoStatement_6985(kind: SyntaxKind, gotoKeyword: SyntaxToken, caseOrDefaultKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax, semicolonToken: SyntaxToken): Syntax.GotoStatementSyntax {
            return <Syntax.GotoStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.GotoStatement(kind, <Syntax.InternalSyntax.SyntaxToken>gotoKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>caseOrDefaultKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static GotoStatement_9517(kind: SyntaxKind, caseOrDefaultKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.GotoStatementSyntax {
            return SyntaxFactory.GotoStatement_6985(kind, SyntaxFactory.Token_1045(SyntaxKind.GotoKeyword), caseOrDefaultKeyword, expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static GotoStatement_3705(kind: SyntaxKind, expression: Syntax.ExpressionSyntax = null): Syntax.GotoStatementSyntax {
            return SyntaxFactory.GotoStatement_6985(kind, SyntaxFactory.Token_1045(SyntaxKind.GotoKeyword), structDefault(SyntaxToken), expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static BreakStatement_1042(breakKeyword: SyntaxToken, semicolonToken: SyntaxToken): Syntax.BreakStatementSyntax {
            return <Syntax.BreakStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BreakStatement(<Syntax.InternalSyntax.SyntaxToken>breakKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static BreakStatement_5136(): Syntax.BreakStatementSyntax {
            return SyntaxFactory.BreakStatement_1042(SyntaxFactory.Token_1045(SyntaxKind.BreakKeyword), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ContinueStatement_6527(continueKeyword: SyntaxToken, semicolonToken: SyntaxToken): Syntax.ContinueStatementSyntax {
            return <Syntax.ContinueStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ContinueStatement(<Syntax.InternalSyntax.SyntaxToken>continueKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ContinueStatement_5243(): Syntax.ContinueStatementSyntax {
            return SyntaxFactory.ContinueStatement_6527(SyntaxFactory.Token_1045(SyntaxKind.ContinueKeyword), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ReturnStatement_3904(returnKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax, semicolonToken: SyntaxToken): Syntax.ReturnStatementSyntax {
            return <Syntax.ReturnStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ReturnStatement(<Syntax.InternalSyntax.SyntaxToken>returnKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ReturnStatement_4392(expression: Syntax.ExpressionSyntax = null): Syntax.ReturnStatementSyntax {
            return SyntaxFactory.ReturnStatement_3904(SyntaxFactory.Token_1045(SyntaxKind.ReturnKeyword), expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ThrowStatement_1358(throwKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax, semicolonToken: SyntaxToken): Syntax.ThrowStatementSyntax {
            return <Syntax.ThrowStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ThrowStatement(<Syntax.InternalSyntax.SyntaxToken>throwKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ThrowStatement_7504(expression: Syntax.ExpressionSyntax = null): Syntax.ThrowStatementSyntax {
            return SyntaxFactory.ThrowStatement_1358(SyntaxFactory.Token_1045(SyntaxKind.ThrowKeyword), expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static YieldStatement_1588(kind: SyntaxKind, yieldKeyword: SyntaxToken, returnOrBreakKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax, semicolonToken: SyntaxToken): Syntax.YieldStatementSyntax {
            return <Syntax.YieldStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.YieldStatement(kind, <Syntax.InternalSyntax.SyntaxToken>yieldKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>returnOrBreakKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static YieldStatement_1867(kind: SyntaxKind, expression: Syntax.ExpressionSyntax = null): Syntax.YieldStatementSyntax {
            return SyntaxFactory.YieldStatement_1588(kind, SyntaxFactory.Token_1045(SyntaxKind.YieldKeyword), SyntaxFactory.Token_1045(SyntaxFactory.GetYieldStatementReturnOrBreakKeywordKind(kind)), expression, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        private static GetYieldStatementReturnOrBreakKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.YieldReturnStatement:
                    return SyntaxKind.ReturnKeyword;
                case SyntaxKind.YieldBreakStatement:
                    return SyntaxKind.BreakKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static WhileStatement_2457(whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.WhileStatementSyntax {
            return <Syntax.WhileStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.WhileStatement(<Syntax.InternalSyntax.SyntaxToken>whileKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static WhileStatement_1771(condition: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.WhileStatementSyntax {
            return SyntaxFactory.WhileStatement_2457(SyntaxFactory.Token_1045(SyntaxKind.WhileKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), condition, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static DoStatement_1208(doKeyword: SyntaxToken, statement: Syntax.StatementSyntax, whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.DoStatementSyntax {
            return <Syntax.DoStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DoStatement(<Syntax.InternalSyntax.SyntaxToken>doKeyword.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green, <Syntax.InternalSyntax.SyntaxToken>whileKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static DoStatement_1554(statement: Syntax.StatementSyntax, condition: Syntax.ExpressionSyntax): Syntax.DoStatementSyntax {
            return SyntaxFactory.DoStatement_1208(SyntaxFactory.Token_1045(SyntaxKind.DoKeyword), statement, SyntaxFactory.Token_1045(SyntaxKind.WhileKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), condition, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ForStatement_5480(forKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: Syntax.VariableDeclarationSyntax, initializers: SeparatedSyntaxList<Syntax.ExpressionSyntax>, firstSemicolonToken: SyntaxToken, condition: Syntax.ExpressionSyntax, secondSemicolonToken: SyntaxToken, incrementors: SeparatedSyntaxList<Syntax.ExpressionSyntax>, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.ForStatementSyntax {
            return <Syntax.ForStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ForStatement(<Syntax.InternalSyntax.SyntaxToken>forKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(initializers.Node), <Syntax.InternalSyntax.SyntaxToken>firstSemicolonToken.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>secondSemicolonToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(incrementors.Node), <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static ForStatement_8259(declaration: Syntax.VariableDeclarationSyntax, initializers: SeparatedSyntaxList<Syntax.ExpressionSyntax>, condition: Syntax.ExpressionSyntax, incrementors: SeparatedSyntaxList<Syntax.ExpressionSyntax>, statement: Syntax.StatementSyntax): Syntax.ForStatementSyntax {
            return SyntaxFactory.ForStatement_5480(SyntaxFactory.Token_1045(SyntaxKind.ForKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), declaration, initializers, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken), condition, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken), incrementors, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static ForStatement_5894(statement: Syntax.StatementSyntax): Syntax.ForStatementSyntax {
            return SyntaxFactory.ForStatement_5480(SyntaxFactory.Token_1045(SyntaxKind.ForKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), null, <SeparatedSyntaxList<Syntax.ExpressionSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken), null, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken), <SeparatedSyntaxList<Syntax.ExpressionSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static ForEachStatement_1184(forEachKeyword: SyntaxToken, openParenToken: SyntaxToken, type: Syntax.TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.ForEachStatementSyntax {
            return <Syntax.ForEachStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ForEachStatement(<Syntax.InternalSyntax.SyntaxToken>forEachKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>inKeyword.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static ForEachStatement_1713(type: Syntax.TypeSyntax, identifier: SyntaxToken, expression: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.ForEachStatementSyntax {
            return SyntaxFactory.ForEachStatement_1184(SyntaxFactory.Token_1045(SyntaxKind.ForEachKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, identifier, SyntaxFactory.Token_1045(SyntaxKind.InKeyword), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static ForEachStatement_8464(type: Syntax.TypeSyntax, identifier: string, expression: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.ForEachStatementSyntax {
            return SyntaxFactory.ForEachStatement_1184(SyntaxFactory.Token_1045(SyntaxKind.ForEachKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.InKeyword), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static UsingStatement_2034(usingKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: Syntax.VariableDeclarationSyntax, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.UsingStatementSyntax {
            return <Syntax.UsingStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.UsingStatement(<Syntax.InternalSyntax.SyntaxToken>usingKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static UsingStatement_1210(declaration: Syntax.VariableDeclarationSyntax, expression: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.UsingStatementSyntax {
            return SyntaxFactory.UsingStatement_2034(SyntaxFactory.Token_1045(SyntaxKind.UsingKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), declaration, expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static UsingStatement_5720(statement: Syntax.StatementSyntax): Syntax.UsingStatementSyntax {
            return SyntaxFactory.UsingStatement_2034(SyntaxFactory.Token_1045(SyntaxKind.UsingKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), null, null, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static FixedStatement_1548(fixedKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: Syntax.VariableDeclarationSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.FixedStatementSyntax {
            return <Syntax.FixedStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.FixedStatement(<Syntax.InternalSyntax.SyntaxToken>fixedKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static FixedStatement_1896(declaration: Syntax.VariableDeclarationSyntax, statement: Syntax.StatementSyntax): Syntax.FixedStatementSyntax {
            return SyntaxFactory.FixedStatement_1548(SyntaxFactory.Token_1045(SyntaxKind.FixedKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), declaration, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static CheckedStatement_1663(kind: SyntaxKind, keyword: SyntaxToken, block: Syntax.BlockSyntax): Syntax.CheckedStatementSyntax {
            return <Syntax.CheckedStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CheckedStatement(kind, <Syntax.InternalSyntax.SyntaxToken>keyword.Node, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green).CreateRed_5702();
        }
        public static CheckedStatement_7841(kind: SyntaxKind, block: Syntax.BlockSyntax = null): Syntax.CheckedStatementSyntax {
            return SyntaxFactory.CheckedStatement_1663(kind, SyntaxFactory.Token_1045(SyntaxFactory.GetCheckedStatementKeywordKind(kind)), block != null ? block : SyntaxFactory.Block_1037());
        }
        private static GetCheckedStatementKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.CheckedStatement:
                    return SyntaxKind.CheckedKeyword;
                case SyntaxKind.UncheckedStatement:
                    return SyntaxKind.UncheckedKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static UnsafeStatement_7221(unsafeKeyword: SyntaxToken, block: Syntax.BlockSyntax): Syntax.UnsafeStatementSyntax {
            return <Syntax.UnsafeStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.UnsafeStatement(<Syntax.InternalSyntax.SyntaxToken>unsafeKeyword.Node, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green).CreateRed_5702();
        }
        public static UnsafeStatement_6353(block: Syntax.BlockSyntax = null): Syntax.UnsafeStatementSyntax {
            return SyntaxFactory.UnsafeStatement_7221(SyntaxFactory.Token_1045(SyntaxKind.UnsafeKeyword), block != null ? block : SyntaxFactory.Block_1037());
        }
        public static LockStatement_6696(lockKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.LockStatementSyntax {
            return <Syntax.LockStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LockStatement(<Syntax.InternalSyntax.SyntaxToken>lockKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static LockStatement_1770(expression: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.LockStatementSyntax {
            return SyntaxFactory.LockStatement_6696(SyntaxFactory.Token_1045(SyntaxKind.LockKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement);
        }
        public static IfStatement_1417(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, statement: Syntax.StatementSyntax, $else: Syntax.ElseClauseSyntax): Syntax.IfStatementSyntax {
            return <Syntax.IfStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IfStatement(<Syntax.InternalSyntax.SyntaxToken>ifKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green, $else == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseClauseSyntax>$else.Green).CreateRed_5702();
        }
        public static IfStatement_6173(condition: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax, $else: Syntax.ElseClauseSyntax): Syntax.IfStatementSyntax {
            return SyntaxFactory.IfStatement_1417(SyntaxFactory.Token_1045(SyntaxKind.IfKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), condition, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement, $else);
        }
        public static IfStatement_1494(condition: Syntax.ExpressionSyntax, statement: Syntax.StatementSyntax): Syntax.IfStatementSyntax {
            return SyntaxFactory.IfStatement_1417(SyntaxFactory.Token_1045(SyntaxKind.IfKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), condition, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), statement, null);
        }
        public static ElseClause_1077(elseKeyword: SyntaxToken, statement: Syntax.StatementSyntax): Syntax.ElseClauseSyntax {
            return <Syntax.ElseClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ElseClause(<Syntax.InternalSyntax.SyntaxToken>elseKeyword.Node, statement == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>statement.Green).CreateRed_5702();
        }
        public static ElseClause_1549(statement: Syntax.StatementSyntax): Syntax.ElseClauseSyntax {
            return SyntaxFactory.ElseClause_1077(SyntaxFactory.Token_1045(SyntaxKind.ElseKeyword), statement);
        }
        public static SwitchStatement_1235(switchKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken, openBraceToken: SyntaxToken, sections: SyntaxList<Syntax.SwitchSectionSyntax>, closeBraceToken: SyntaxToken): Syntax.SwitchStatementSyntax {
            return <Syntax.SwitchStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SwitchStatement(<Syntax.InternalSyntax.SyntaxToken>switchKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node, <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchSectionSyntax>(sections.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node).CreateRed_5702();
        }
        public static SwitchStatement_1938(expression: Syntax.ExpressionSyntax, sections: SyntaxList<Syntax.SwitchSectionSyntax>): Syntax.SwitchStatementSyntax {
            return SyntaxFactory.SwitchStatement_1235(SyntaxFactory.Token_1045(SyntaxKind.SwitchKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), sections, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static SwitchStatement_1441(expression: Syntax.ExpressionSyntax): Syntax.SwitchStatementSyntax {
            return SyntaxFactory.SwitchStatement_1235(SyntaxFactory.Token_1045(SyntaxKind.SwitchKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), expression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.SwitchSectionSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static SwitchSection_1633(labels: SyntaxList<Syntax.SwitchLabelSyntax>, statements: SyntaxList<Syntax.StatementSyntax>): Syntax.SwitchSectionSyntax {
            return <Syntax.SwitchSectionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SwitchSection(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchLabelSyntax>(labels.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StatementSyntax>(statements.Node)).CreateRed_5702();
        }
        public static SwitchSection_6989(): Syntax.SwitchSectionSyntax {
            return SyntaxFactory.SwitchSection_1633(<SyntaxList<Syntax.SwitchLabelSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.StatementSyntax>> structDefault(SyntaxList));
        }
        public static CaseSwitchLabel_2116(keyword: SyntaxToken, value: Syntax.ExpressionSyntax, colonToken: SyntaxToken): Syntax.CaseSwitchLabelSyntax {
            return <Syntax.CaseSwitchLabelSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CaseSwitchLabel(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, value == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>value.Green, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node).CreateRed_5702();
        }
        public static CaseSwitchLabel_1853(value: Syntax.ExpressionSyntax, colonToken: SyntaxToken): Syntax.CaseSwitchLabelSyntax {
            return SyntaxFactory.CaseSwitchLabel_2116(SyntaxFactory.Token_1045(SyntaxKind.CaseKeyword), value, colonToken);
        }
        public static DefaultSwitchLabel_2103(keyword: SyntaxToken, colonToken: SyntaxToken): Syntax.DefaultSwitchLabelSyntax {
            return <Syntax.DefaultSwitchLabelSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DefaultSwitchLabel(<Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node).CreateRed_5702();
        }
        public static DefaultSwitchLabel_1779(colonToken: SyntaxToken): Syntax.DefaultSwitchLabelSyntax {
            return SyntaxFactory.DefaultSwitchLabel_2103(SyntaxFactory.Token_1045(SyntaxKind.DefaultKeyword), colonToken);
        }
        public static TryStatement_3588(tryKeyword: SyntaxToken, block: Syntax.BlockSyntax, catches: SyntaxList<Syntax.CatchClauseSyntax>, $finally: Syntax.FinallyClauseSyntax): Syntax.TryStatementSyntax {
            return <Syntax.TryStatementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TryStatement(<Syntax.InternalSyntax.SyntaxToken>tryKeyword.Node, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchClauseSyntax>(catches.Node), $finally == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FinallyClauseSyntax>$finally.Green).CreateRed_5702();
        }
        public static TryStatement_9994(block: Syntax.BlockSyntax, catches: SyntaxList<Syntax.CatchClauseSyntax>, $finally: Syntax.FinallyClauseSyntax): Syntax.TryStatementSyntax {
            return SyntaxFactory.TryStatement_3588(SyntaxFactory.Token_1045(SyntaxKind.TryKeyword), block, catches, $finally);
        }
        public static TryStatement_4268(catches: SyntaxList<Syntax.CatchClauseSyntax> = <SyntaxList<Syntax.CatchClauseSyntax>> structDefault(SyntaxList)): Syntax.TryStatementSyntax {
            return SyntaxFactory.TryStatement_3588(SyntaxFactory.Token_1045(SyntaxKind.TryKeyword), SyntaxFactory.Block_1037(), catches, null);
        }
        public static CatchClause_1606(catchKeyword: SyntaxToken, declaration: Syntax.CatchDeclarationSyntax, filter: Syntax.CatchFilterClauseSyntax, block: Syntax.BlockSyntax): Syntax.CatchClauseSyntax {
            return <Syntax.CatchClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CatchClause(<Syntax.InternalSyntax.SyntaxToken>catchKeyword.Node, declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchDeclarationSyntax>declaration.Green, filter == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchFilterClauseSyntax>filter.Green, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green).CreateRed_5702();
        }
        public static CatchClause_1141(declaration: Syntax.CatchDeclarationSyntax, filter: Syntax.CatchFilterClauseSyntax, block: Syntax.BlockSyntax): Syntax.CatchClauseSyntax {
            return SyntaxFactory.CatchClause_1606(SyntaxFactory.Token_1045(SyntaxKind.CatchKeyword), declaration, filter, block);
        }
        public static CatchClause_4605(): Syntax.CatchClauseSyntax {
            return SyntaxFactory.CatchClause_1606(SyntaxFactory.Token_1045(SyntaxKind.CatchKeyword), null, null, SyntaxFactory.Block_1037());
        }
        public static CatchDeclaration_1702(openParenToken: SyntaxToken, type: Syntax.TypeSyntax, identifier: SyntaxToken, closeParenToken: SyntaxToken): Syntax.CatchDeclarationSyntax {
            return <Syntax.CatchDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CatchDeclaration(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static CatchDeclaration_1903(type: Syntax.TypeSyntax, identifier: SyntaxToken): Syntax.CatchDeclarationSyntax {
            return SyntaxFactory.CatchDeclaration_1702(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, identifier, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static CatchDeclaration_1762(type: Syntax.TypeSyntax): Syntax.CatchDeclarationSyntax {
            return SyntaxFactory.CatchDeclaration_1702(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), type, structDefault(SyntaxToken), SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static CatchFilterClause_8524(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, filterExpression: Syntax.ExpressionSyntax, closeParenToken: SyntaxToken): Syntax.CatchFilterClauseSyntax {
            return <Syntax.CatchFilterClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CatchFilterClause(<Syntax.InternalSyntax.SyntaxToken>ifKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, filterExpression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>filterExpression.Green, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static CatchFilterClause_9905(filterExpression: Syntax.ExpressionSyntax): Syntax.CatchFilterClauseSyntax {
            return SyntaxFactory.CatchFilterClause_8524(SyntaxFactory.Token_1045(SyntaxKind.IfKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), filterExpression, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static FinallyClause_2308(finallyKeyword: SyntaxToken, block: Syntax.BlockSyntax): Syntax.FinallyClauseSyntax {
            return <Syntax.FinallyClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.FinallyClause(<Syntax.InternalSyntax.SyntaxToken>finallyKeyword.Node, block == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>block.Green).CreateRed_5702();
        }
        public static FinallyClause_1828(block: Syntax.BlockSyntax = null): Syntax.FinallyClauseSyntax {
            return SyntaxFactory.FinallyClause_2308(SyntaxFactory.Token_1045(SyntaxKind.FinallyKeyword), block != null ? block : SyntaxFactory.Block_1037());
        }
        public static CompilationUnit_1797(externs: SyntaxList<Syntax.ExternAliasDirectiveSyntax>, usings: SyntaxList<Syntax.UsingDirectiveSyntax>, attributeLists: SyntaxList<Syntax.AttributeListSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>, endOfFileToken: SyntaxToken): Syntax.CompilationUnitSyntax {
            return <Syntax.CompilationUnitSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CompilationUnit(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>(externs.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>(usings.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>endOfFileToken.Node).CreateRed_5702();
        }
        public static CompilationUnit_7893(externs: SyntaxList<Syntax.ExternAliasDirectiveSyntax>, usings: SyntaxList<Syntax.UsingDirectiveSyntax>, attributeLists: SyntaxList<Syntax.AttributeListSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>): Syntax.CompilationUnitSyntax {
            return SyntaxFactory.CompilationUnit_1797(externs, usings, attributeLists, members, SyntaxFactory.Token_1045(SyntaxKind.EndOfFileToken));
        }
        public static CompilationUnit_1729(): Syntax.CompilationUnitSyntax {
            return SyntaxFactory.CompilationUnit_1797(<SyntaxList<Syntax.ExternAliasDirectiveSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.UsingDirectiveSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.EndOfFileToken));
        }
        public static ExternAliasDirective_3055(externKeyword: SyntaxToken, aliasKeyword: SyntaxToken, identifier: SyntaxToken, semicolonToken: SyntaxToken): Syntax.ExternAliasDirectiveSyntax {
            return <Syntax.ExternAliasDirectiveSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ExternAliasDirective(<Syntax.InternalSyntax.SyntaxToken>externKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>aliasKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ExternAliasDirective_1172(identifier: SyntaxToken): Syntax.ExternAliasDirectiveSyntax {
            return SyntaxFactory.ExternAliasDirective_3055(SyntaxFactory.Token_1045(SyntaxKind.ExternKeyword), SyntaxFactory.Token_1045(SyntaxKind.AliasKeyword), identifier, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ExternAliasDirective_1943(identifier: string): Syntax.ExternAliasDirectiveSyntax {
            return SyntaxFactory.ExternAliasDirective_3055(SyntaxFactory.Token_1045(SyntaxKind.ExternKeyword), SyntaxFactory.Token_1045(SyntaxKind.AliasKeyword), SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static UsingDirective_9846(usingKeyword: SyntaxToken, staticKeyword: SyntaxToken, alias: Syntax.NameEqualsSyntax, name: Syntax.NameSyntax, semicolonToken: SyntaxToken): Syntax.UsingDirectiveSyntax {
            return <Syntax.UsingDirectiveSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.UsingDirective(<Syntax.InternalSyntax.SyntaxToken>usingKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>staticKeyword.Node, alias == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameEqualsSyntax>alias.Green, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static UsingDirective_6482(staticKeyword: SyntaxToken, alias: Syntax.NameEqualsSyntax, name: Syntax.NameSyntax): Syntax.UsingDirectiveSyntax {
            return SyntaxFactory.UsingDirective_9846(SyntaxFactory.Token_1045(SyntaxKind.UsingKeyword), staticKeyword, alias, name, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static UsingDirective_1590(name: Syntax.NameSyntax): Syntax.UsingDirectiveSyntax {
            return SyntaxFactory.UsingDirective_9846(SyntaxFactory.Token_1045(SyntaxKind.UsingKeyword), structDefault(SyntaxToken), null, name, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static NamespaceDeclaration_1400(namespaceKeyword: SyntaxToken, name: Syntax.NameSyntax, openBraceToken: SyntaxToken, externs: SyntaxList<Syntax.ExternAliasDirectiveSyntax>, usings: SyntaxList<Syntax.UsingDirectiveSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.NamespaceDeclarationSyntax {
            return <Syntax.NamespaceDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.NamespaceDeclaration(<Syntax.InternalSyntax.SyntaxToken>namespaceKeyword.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>(externs.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>(usings.Node), Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static NamespaceDeclaration_2111(name: Syntax.NameSyntax, externs: SyntaxList<Syntax.ExternAliasDirectiveSyntax>, usings: SyntaxList<Syntax.UsingDirectiveSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>): Syntax.NamespaceDeclarationSyntax {
            return SyntaxFactory.NamespaceDeclaration_1400(SyntaxFactory.Token_1045(SyntaxKind.NamespaceKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), externs, usings, members, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static NamespaceDeclaration_1529(name: Syntax.NameSyntax): Syntax.NamespaceDeclarationSyntax {
            return SyntaxFactory.NamespaceDeclaration_1400(SyntaxFactory.Token_1045(SyntaxKind.NamespaceKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.ExternAliasDirectiveSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.UsingDirectiveSyntax>> structDefault(SyntaxList), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static AttributeList_1768(openBracketToken: SyntaxToken, target: Syntax.AttributeTargetSpecifierSyntax, attributes: SeparatedSyntaxList<Syntax.AttributeSyntax>, closeBracketToken: SyntaxToken): Syntax.AttributeListSyntax {
            return <Syntax.AttributeListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AttributeList(<Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, target == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeTargetSpecifierSyntax>target.Green, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeSyntax>(attributes.Node), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node).CreateRed_5702();
        }
        public static AttributeList_1877(target: Syntax.AttributeTargetSpecifierSyntax, attributes: SeparatedSyntaxList<Syntax.AttributeSyntax>): Syntax.AttributeListSyntax {
            return SyntaxFactory.AttributeList_1768(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), target, attributes, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static AttributeList_1370(attributes: SeparatedSyntaxList<Syntax.AttributeSyntax> = <SeparatedSyntaxList<Syntax.AttributeSyntax>> structDefault(SeparatedSyntaxList)): Syntax.AttributeListSyntax {
            return SyntaxFactory.AttributeList_1768(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), null, attributes, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static AttributeTargetSpecifier_1734(identifier: SyntaxToken, colonToken: SyntaxToken): Syntax.AttributeTargetSpecifierSyntax {
            return <Syntax.AttributeTargetSpecifierSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AttributeTargetSpecifier(<Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node).CreateRed_5702();
        }
        public static AttributeTargetSpecifier_1352(identifier: SyntaxToken): Syntax.AttributeTargetSpecifierSyntax {
            return SyntaxFactory.AttributeTargetSpecifier_1734(identifier, SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static Attribute_1729(name: Syntax.NameSyntax, argumentList: Syntax.AttributeArgumentListSyntax): Syntax.AttributeSyntax {
            return <Syntax.AttributeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.Attribute(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameSyntax>name.Green, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static Attribute_1080(name: Syntax.NameSyntax): Syntax.AttributeSyntax {
            return SyntaxFactory.Attribute_1729(name, null);
        }
        public static AttributeArgumentList_9314(openParenToken: SyntaxToken, arguments1: SeparatedSyntaxList<Syntax.AttributeArgumentSyntax>, closeParenToken: SyntaxToken): Syntax.AttributeArgumentListSyntax {
            return <Syntax.AttributeArgumentListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AttributeArgumentList(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeArgumentSyntax>(arguments1.Node), <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static AttributeArgumentList_9344(arguments1: SeparatedSyntaxList<Syntax.AttributeArgumentSyntax> = <SeparatedSyntaxList<Syntax.AttributeArgumentSyntax>> structDefault(SeparatedSyntaxList)): Syntax.AttributeArgumentListSyntax {
            return SyntaxFactory.AttributeArgumentList_9314(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), arguments1, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static AttributeArgument_7913(nameEquals: Syntax.NameEqualsSyntax, nameColon: Syntax.NameColonSyntax, expression: Syntax.ExpressionSyntax): Syntax.AttributeArgumentSyntax {
            return <Syntax.AttributeArgumentSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AttributeArgument(nameEquals == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameEqualsSyntax>nameEquals.Green, nameColon == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameColonSyntax>nameColon.Green, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static AttributeArgument_1158(expression: Syntax.ExpressionSyntax): Syntax.AttributeArgumentSyntax {
            return SyntaxFactory.AttributeArgument_7913(null, null, expression);
        }
        public static NameEquals_2119(name: Syntax.IdentifierNameSyntax, equalsToken: SyntaxToken): Syntax.NameEqualsSyntax {
            return <Syntax.NameEqualsSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.NameEquals(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>equalsToken.Node).CreateRed_5702();
        }
        public static NameEquals_1424(name: Syntax.IdentifierNameSyntax): Syntax.NameEqualsSyntax {
            return SyntaxFactory.NameEquals_2119(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken));
        }
        public static NameEquals_1288(name: string): Syntax.NameEqualsSyntax {
            return SyntaxFactory.NameEquals_2119(SyntaxFactory.IdentifierName_1404(name), SyntaxFactory.Token_1045(SyntaxKind.EqualsToken));
        }
        public static TypeParameterList_1787(lessThanToken: SyntaxToken, parameters: SeparatedSyntaxList<Syntax.TypeParameterSyntax>, greaterThanToken: SyntaxToken): Syntax.TypeParameterListSyntax {
            return <Syntax.TypeParameterListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeParameterList(<Syntax.InternalSyntax.SyntaxToken>lessThanToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterSyntax>(parameters.Node), <Syntax.InternalSyntax.SyntaxToken>greaterThanToken.Node).CreateRed_5702();
        }
        public static TypeParameterList_1178(parameters: SeparatedSyntaxList<Syntax.TypeParameterSyntax> = <SeparatedSyntaxList<Syntax.TypeParameterSyntax>> structDefault(SeparatedSyntaxList)): Syntax.TypeParameterListSyntax {
            return SyntaxFactory.TypeParameterList_1787(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), parameters, SyntaxFactory.Token_1045(SyntaxKind.GreaterThanToken));
        }
        public static TypeParameter_6906(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, varianceKeyword: SyntaxToken, identifier: SyntaxToken): Syntax.TypeParameterSyntax {
            return <Syntax.TypeParameterSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeParameter(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), <Syntax.InternalSyntax.SyntaxToken>varianceKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node).CreateRed_5702();
        }
        public static TypeParameter_2019(identifier: SyntaxToken): Syntax.TypeParameterSyntax {
            return SyntaxFactory.TypeParameter_6906(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxToken), identifier);
        }
        public static TypeParameter_7108(identifier: string): Syntax.TypeParameterSyntax {
            return SyntaxFactory.TypeParameter_6906(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxToken), SyntaxFactory.Identifier_3961(identifier));
        }
        public static ClassDeclaration_6025(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<Syntax.MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.ClassDeclarationSyntax {
            return <Syntax.ClassDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ClassDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeParameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>typeParameterList.Green, baseList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseListSyntax>baseList.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraintClauses.Node), <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ClassDeclaration_1337(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>): Syntax.ClassDeclarationSyntax {
            return SyntaxFactory.ClassDeclaration_6025(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.ClassKeyword), identifier, typeParameterList, baseList, constraintClauses, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), members, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static ClassDeclaration_1457(identifier: SyntaxToken): Syntax.ClassDeclarationSyntax {
            return SyntaxFactory.ClassDeclaration_6025(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.ClassKeyword), identifier, null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static ClassDeclaration_1390(identifier: string): Syntax.ClassDeclarationSyntax {
            return SyntaxFactory.ClassDeclaration_6025(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.ClassKeyword), SyntaxFactory.Identifier_3961(identifier), null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static StructDeclaration_3822(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<Syntax.MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.StructDeclarationSyntax {
            return <Syntax.StructDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.StructDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeParameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>typeParameterList.Green, baseList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseListSyntax>baseList.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraintClauses.Node), <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static StructDeclaration_8348(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>): Syntax.StructDeclarationSyntax {
            return SyntaxFactory.StructDeclaration_3822(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.StructKeyword), identifier, typeParameterList, baseList, constraintClauses, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), members, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static StructDeclaration_1761(identifier: SyntaxToken): Syntax.StructDeclarationSyntax {
            return SyntaxFactory.StructDeclaration_3822(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.StructKeyword), identifier, null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static StructDeclaration_2134(identifier: string): Syntax.StructDeclarationSyntax {
            return SyntaxFactory.StructDeclaration_3822(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.StructKeyword), SyntaxFactory.Identifier_3961(identifier), null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static InterfaceDeclaration_1831(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<Syntax.MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.InterfaceDeclarationSyntax {
            return <Syntax.InterfaceDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.InterfaceDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>keyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeParameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>typeParameterList.Green, baseList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseListSyntax>baseList.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraintClauses.Node), <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static InterfaceDeclaration_8639(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, baseList: Syntax.BaseListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, members: SyntaxList<Syntax.MemberDeclarationSyntax>): Syntax.InterfaceDeclarationSyntax {
            return SyntaxFactory.InterfaceDeclaration_1831(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.InterfaceKeyword), identifier, typeParameterList, baseList, constraintClauses, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), members, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static InterfaceDeclaration_1732(identifier: SyntaxToken): Syntax.InterfaceDeclarationSyntax {
            return SyntaxFactory.InterfaceDeclaration_1831(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.InterfaceKeyword), identifier, null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static InterfaceDeclaration_1152(identifier: string): Syntax.InterfaceDeclarationSyntax {
            return SyntaxFactory.InterfaceDeclaration_1831(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.InterfaceKeyword), SyntaxFactory.Identifier_3961(identifier), null, null, <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SyntaxList<Syntax.MemberDeclarationSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static EnumDeclaration_1802(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, enumKeyword: SyntaxToken, identifier: SyntaxToken, baseList: Syntax.BaseListSyntax, openBraceToken: SyntaxToken, members: SeparatedSyntaxList<Syntax.EnumMemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): Syntax.EnumDeclarationSyntax {
            return <Syntax.EnumDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EnumDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>enumKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, baseList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseListSyntax>baseList.Green, <Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumMemberDeclarationSyntax>(members.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static EnumDeclaration_1679(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, baseList: Syntax.BaseListSyntax, members: SeparatedSyntaxList<Syntax.EnumMemberDeclarationSyntax>): Syntax.EnumDeclarationSyntax {
            return SyntaxFactory.EnumDeclaration_1802(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.EnumKeyword), identifier, baseList, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), members, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static EnumDeclaration_1087(identifier: SyntaxToken): Syntax.EnumDeclarationSyntax {
            return SyntaxFactory.EnumDeclaration_1802(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.EnumKeyword), identifier, null, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SeparatedSyntaxList<Syntax.EnumMemberDeclarationSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static EnumDeclaration_1864(identifier: string): Syntax.EnumDeclarationSyntax {
            return SyntaxFactory.EnumDeclaration_1802(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.EnumKeyword), SyntaxFactory.Identifier_3961(identifier), null, SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), <SeparatedSyntaxList<Syntax.EnumMemberDeclarationSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken), structDefault(SyntaxToken));
        }
        public static DelegateDeclaration_5980(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, delegateKeyword: SyntaxToken, returnType: Syntax.TypeSyntax, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, parameterList: Syntax.ParameterListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, semicolonToken: SyntaxToken): Syntax.DelegateDeclarationSyntax {
            return <Syntax.DelegateDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DelegateDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>delegateKeyword.Node, returnType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>returnType.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeParameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>typeParameterList.Green, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraintClauses.Node), <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static DelegateDeclaration_5759(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, parameterList: Syntax.ParameterListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>): Syntax.DelegateDeclarationSyntax {
            return SyntaxFactory.DelegateDeclaration_5980(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.DelegateKeyword), returnType, identifier, typeParameterList, parameterList, constraintClauses, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static DelegateDeclaration_1458(returnType: Syntax.TypeSyntax, identifier: SyntaxToken): Syntax.DelegateDeclarationSyntax {
            return SyntaxFactory.DelegateDeclaration_5980(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.DelegateKeyword), returnType, identifier, null, SyntaxFactory.ParameterList_8831(), <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static DelegateDeclaration_9226(returnType: Syntax.TypeSyntax, identifier: string): Syntax.DelegateDeclarationSyntax {
            return SyntaxFactory.DelegateDeclaration_5980(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.DelegateKeyword), returnType, SyntaxFactory.Identifier_3961(identifier), null, SyntaxFactory.ParameterList_8831(), <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static EnumMemberDeclaration_5981(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, identifier: SyntaxToken, equalsValue: Syntax.EqualsValueClauseSyntax): Syntax.EnumMemberDeclarationSyntax {
            return <Syntax.EnumMemberDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EnumMemberDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), <Syntax.InternalSyntax.SyntaxToken>identifier.Node, equalsValue == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EqualsValueClauseSyntax>equalsValue.Green).CreateRed_5702();
        }
        public static EnumMemberDeclaration_5599(identifier: SyntaxToken): Syntax.EnumMemberDeclarationSyntax {
            return SyntaxFactory.EnumMemberDeclaration_5981(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), identifier, null);
        }
        public static EnumMemberDeclaration_1956(identifier: string): Syntax.EnumMemberDeclarationSyntax {
            return SyntaxFactory.EnumMemberDeclaration_5981(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), SyntaxFactory.Identifier_3961(identifier), null);
        }
        public static BaseList_3029(colonToken: SyntaxToken, types: SeparatedSyntaxList<Syntax.BaseTypeSyntax>): Syntax.BaseListSyntax {
            return <Syntax.BaseListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BaseList(<Syntax.InternalSyntax.SyntaxToken>colonToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseTypeSyntax>(types.Node)).CreateRed_5702();
        }
        public static BaseList_1793(types: SeparatedSyntaxList<Syntax.BaseTypeSyntax> = <SeparatedSyntaxList<Syntax.BaseTypeSyntax>> structDefault(SeparatedSyntaxList)): Syntax.BaseListSyntax {
            return SyntaxFactory.BaseList_3029(SyntaxFactory.Token_1045(SyntaxKind.ColonToken), types);
        }
        public static SimpleBaseType(type: Syntax.TypeSyntax): Syntax.SimpleBaseTypeSyntax {
            return <Syntax.SimpleBaseTypeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SimpleBaseType(type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static TypeParameterConstraintClause_1764(whereKeyword: SyntaxToken, name: Syntax.IdentifierNameSyntax, colonToken: SyntaxToken, constraints: SeparatedSyntaxList<Syntax.TypeParameterConstraintSyntax>): Syntax.TypeParameterConstraintClauseSyntax {
            return <Syntax.TypeParameterConstraintClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeParameterConstraintClause(<Syntax.InternalSyntax.SyntaxToken>whereKeyword.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintSyntax>(constraints.Node)).CreateRed_5702();
        }
        public static TypeParameterConstraintClause_8765(name: Syntax.IdentifierNameSyntax, constraints: SeparatedSyntaxList<Syntax.TypeParameterConstraintSyntax>): Syntax.TypeParameterConstraintClauseSyntax {
            return SyntaxFactory.TypeParameterConstraintClause_1764(SyntaxFactory.Token_1045(SyntaxKind.WhereKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.ColonToken), constraints);
        }
        public static TypeParameterConstraintClause_1524(name: Syntax.IdentifierNameSyntax): Syntax.TypeParameterConstraintClauseSyntax {
            return SyntaxFactory.TypeParameterConstraintClause_1764(SyntaxFactory.Token_1045(SyntaxKind.WhereKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.ColonToken), <SeparatedSyntaxList<Syntax.TypeParameterConstraintSyntax>> structDefault(SeparatedSyntaxList));
        }
        public static TypeParameterConstraintClause_2012(name: string): Syntax.TypeParameterConstraintClauseSyntax {
            return SyntaxFactory.TypeParameterConstraintClause_1764(SyntaxFactory.Token_1045(SyntaxKind.WhereKeyword), SyntaxFactory.IdentifierName_1404(name), SyntaxFactory.Token_1045(SyntaxKind.ColonToken), <SeparatedSyntaxList<Syntax.TypeParameterConstraintSyntax>> structDefault(SeparatedSyntaxList));
        }
        public static ConstructorConstraint_1519(newKeyword: SyntaxToken, openParenToken: SyntaxToken, closeParenToken: SyntaxToken): Syntax.ConstructorConstraintSyntax {
            return <Syntax.ConstructorConstraintSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConstructorConstraint(<Syntax.InternalSyntax.SyntaxToken>newKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static ConstructorConstraint_6302(): Syntax.ConstructorConstraintSyntax {
            return SyntaxFactory.ConstructorConstraint_1519(SyntaxFactory.Token_1045(SyntaxKind.NewKeyword), SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static ClassOrStructConstraint_1543(kind: SyntaxKind, classOrStructKeyword: SyntaxToken): Syntax.ClassOrStructConstraintSyntax {
            return <Syntax.ClassOrStructConstraintSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ClassOrStructConstraint(kind, <Syntax.InternalSyntax.SyntaxToken>classOrStructKeyword.Node).CreateRed_5702();
        }
        public static ClassOrStructConstraint_2074(kind: SyntaxKind): Syntax.ClassOrStructConstraintSyntax {
            return SyntaxFactory.ClassOrStructConstraint_1543(kind, SyntaxFactory.Token_1045(SyntaxFactory.GetClassOrStructConstraintClassOrStructKeywordKind(kind)));
        }
        private static GetClassOrStructConstraintClassOrStructKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.ClassConstraint:
                    return SyntaxKind.ClassKeyword;
                case SyntaxKind.StructConstraint:
                    return SyntaxKind.StructKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static TypeConstraint(type: Syntax.TypeSyntax): Syntax.TypeConstraintSyntax {
            return <Syntax.TypeConstraintSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeConstraint(type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static FieldDeclaration_8233(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, declaration: Syntax.VariableDeclarationSyntax, semicolonToken: SyntaxToken): Syntax.FieldDeclarationSyntax {
            return <Syntax.FieldDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.FieldDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static FieldDeclaration_2138(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, declaration: Syntax.VariableDeclarationSyntax): Syntax.FieldDeclarationSyntax {
            return SyntaxFactory.FieldDeclaration_8233(attributeLists, modifiers, declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static FieldDeclaration_9428(declaration: Syntax.VariableDeclarationSyntax): Syntax.FieldDeclarationSyntax {
            return SyntaxFactory.FieldDeclaration_8233(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static EventFieldDeclaration_8505(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, eventKeyword: SyntaxToken, declaration: Syntax.VariableDeclarationSyntax, semicolonToken: SyntaxToken): Syntax.EventFieldDeclarationSyntax {
            return <Syntax.EventFieldDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EventFieldDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>eventKeyword.Node, declaration == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclarationSyntax>declaration.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static EventFieldDeclaration_1917(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, declaration: Syntax.VariableDeclarationSyntax): Syntax.EventFieldDeclarationSyntax {
            return SyntaxFactory.EventFieldDeclaration_8505(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.EventKeyword), declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static EventFieldDeclaration_1145(declaration: Syntax.VariableDeclarationSyntax): Syntax.EventFieldDeclarationSyntax {
            return SyntaxFactory.EventFieldDeclaration_8505(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.EventKeyword), declaration, SyntaxFactory.Token_1045(SyntaxKind.SemicolonToken));
        }
        public static ExplicitInterfaceSpecifier_1235(name: Syntax.NameSyntax, dotToken: SyntaxToken): Syntax.ExplicitInterfaceSpecifierSyntax {
            return <Syntax.ExplicitInterfaceSpecifierSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ExplicitInterfaceSpecifier(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>dotToken.Node).CreateRed_5702();
        }
        public static ExplicitInterfaceSpecifier_2222(name: Syntax.NameSyntax): Syntax.ExplicitInterfaceSpecifierSyntax {
            return SyntaxFactory.ExplicitInterfaceSpecifier_1235(name, SyntaxFactory.Token_1045(SyntaxKind.DotToken));
        }
        public static MethodDeclaration_7196(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, parameterList: Syntax.ParameterListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): Syntax.MethodDeclarationSyntax {
            return <Syntax.MethodDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.MethodDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), returnType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>returnType.Green, explicitInterfaceSpecifier == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExplicitInterfaceSpecifierSyntax>explicitInterfaceSpecifier.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, typeParameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>typeParameterList.Green, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>(constraintClauses.Node), body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, expressionBody == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>expressionBody.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static MethodDeclaration_4928(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: Syntax.TypeParameterListSyntax, parameterList: Syntax.ParameterListSyntax, constraintClauses: SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax): Syntax.MethodDeclarationSyntax {
            return SyntaxFactory.MethodDeclaration_7196(attributeLists, modifiers, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses, body, expressionBody, structDefault(SyntaxToken));
        }
        public static MethodDeclaration_7463(returnType: Syntax.TypeSyntax, identifier: SyntaxToken): Syntax.MethodDeclarationSyntax {
            return SyntaxFactory.MethodDeclaration_7196(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), returnType, null, identifier, null, SyntaxFactory.ParameterList_8831(), <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), null, null, structDefault(SyntaxToken));
        }
        public static MethodDeclaration_2046(returnType: Syntax.TypeSyntax, identifier: string): Syntax.MethodDeclarationSyntax {
            return SyntaxFactory.MethodDeclaration_7196(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), returnType, null, SyntaxFactory.Identifier_3961(identifier), null, SyntaxFactory.ParameterList_8831(), <SyntaxList<Syntax.TypeParameterConstraintClauseSyntax>> structDefault(SyntaxList), null, null, structDefault(SyntaxToken));
        }
        public static OperatorDeclaration_1160(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): Syntax.OperatorDeclarationSyntax {
            return <Syntax.OperatorDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.OperatorDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), returnType == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>returnType.Green, <Syntax.InternalSyntax.SyntaxToken>operatorKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, expressionBody == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>expressionBody.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static OperatorDeclaration_1772(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: Syntax.TypeSyntax, operatorToken: SyntaxToken, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax): Syntax.OperatorDeclarationSyntax {
            return SyntaxFactory.OperatorDeclaration_1160(attributeLists, modifiers, returnType, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), operatorToken, parameterList, body, expressionBody, structDefault(SyntaxToken));
        }
        public static OperatorDeclaration_1820(returnType: Syntax.TypeSyntax, operatorToken: SyntaxToken): Syntax.OperatorDeclarationSyntax {
            return SyntaxFactory.OperatorDeclaration_1160(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), returnType, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), operatorToken, SyntaxFactory.ParameterList_8831(), null, null, structDefault(SyntaxToken));
        }
        public static ConversionOperatorDeclaration_1744(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: Syntax.TypeSyntax, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): Syntax.ConversionOperatorDeclarationSyntax {
            return <Syntax.ConversionOperatorDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConversionOperatorDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>implicitOrExplicitKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>operatorKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, expressionBody == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>expressionBody.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ConversionOperatorDeclaration_1986(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, implicitOrExplicitKeyword: SyntaxToken, type: Syntax.TypeSyntax, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax): Syntax.ConversionOperatorDeclarationSyntax {
            return SyntaxFactory.ConversionOperatorDeclaration_1744(attributeLists, modifiers, implicitOrExplicitKeyword, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), type, parameterList, body, expressionBody, structDefault(SyntaxToken));
        }
        public static ConversionOperatorDeclaration_2115(implicitOrExplicitKeyword: SyntaxToken, type: Syntax.TypeSyntax): Syntax.ConversionOperatorDeclarationSyntax {
            return SyntaxFactory.ConversionOperatorDeclaration_1744(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), implicitOrExplicitKeyword, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), type, SyntaxFactory.ParameterList_8831(), null, null, structDefault(SyntaxToken));
        }
        public static ConstructorDeclaration_1481(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, parameterList: Syntax.ParameterListSyntax, initializer: Syntax.ConstructorInitializerSyntax, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.ConstructorDeclarationSyntax {
            return <Syntax.ConstructorDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConstructorDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>identifier.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorInitializerSyntax>initializer.Green, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static ConstructorDeclaration_7306(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, parameterList: Syntax.ParameterListSyntax, initializer: Syntax.ConstructorInitializerSyntax, body: Syntax.BlockSyntax): Syntax.ConstructorDeclarationSyntax {
            return SyntaxFactory.ConstructorDeclaration_1481(attributeLists, modifiers, identifier, parameterList, initializer, body, structDefault(SyntaxToken));
        }
        public static ConstructorDeclaration_8125(identifier: SyntaxToken): Syntax.ConstructorDeclarationSyntax {
            return SyntaxFactory.ConstructorDeclaration_1481(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), identifier, SyntaxFactory.ParameterList_8831(), null, null, structDefault(SyntaxToken));
        }
        public static ConstructorDeclaration_1140(identifier: string): Syntax.ConstructorDeclarationSyntax {
            return SyntaxFactory.ConstructorDeclaration_1481(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.ParameterList_8831(), null, null, structDefault(SyntaxToken));
        }
        public static ConstructorInitializer_7095(kind: SyntaxKind, colonToken: SyntaxToken, thisOrBaseKeyword: SyntaxToken, argumentList: Syntax.ArgumentListSyntax): Syntax.ConstructorInitializerSyntax {
            return <Syntax.ConstructorInitializerSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConstructorInitializer(kind, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node, <Syntax.InternalSyntax.SyntaxToken>thisOrBaseKeyword.Node, argumentList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentListSyntax>argumentList.Green).CreateRed_5702();
        }
        public static ConstructorInitializer_1097(kind: SyntaxKind, argumentList: Syntax.ArgumentListSyntax = null): Syntax.ConstructorInitializerSyntax {
            return SyntaxFactory.ConstructorInitializer_7095(kind, SyntaxFactory.Token_1045(SyntaxKind.ColonToken), SyntaxFactory.Token_1045(SyntaxFactory.GetConstructorInitializerThisOrBaseKeywordKind(kind)), argumentList != null ? argumentList : SyntaxFactory.ArgumentList_1288());
        }
        private static GetConstructorInitializerThisOrBaseKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.BaseConstructorInitializer:
                    return SyntaxKind.BaseKeyword;
                case SyntaxKind.ThisConstructorInitializer:
                    return SyntaxKind.ThisKeyword;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static DestructorDeclaration_1923(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, tildeToken: SyntaxToken, identifier: SyntaxToken, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.DestructorDeclarationSyntax {
            return <Syntax.DestructorDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DestructorDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>tildeToken.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>parameterList.Green, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static DestructorDeclaration_7645(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, parameterList: Syntax.ParameterListSyntax, body: Syntax.BlockSyntax): Syntax.DestructorDeclarationSyntax {
            return SyntaxFactory.DestructorDeclaration_1923(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.TildeToken), identifier, parameterList, body, structDefault(SyntaxToken));
        }
        public static DestructorDeclaration_1929(identifier: SyntaxToken): Syntax.DestructorDeclarationSyntax {
            return SyntaxFactory.DestructorDeclaration_1923(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.TildeToken), identifier, SyntaxFactory.ParameterList_8831(), null, structDefault(SyntaxToken));
        }
        public static DestructorDeclaration_1184(identifier: string): Syntax.DestructorDeclarationSyntax {
            return SyntaxFactory.DestructorDeclaration_1923(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.TildeToken), SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.ParameterList_8831(), null, structDefault(SyntaxToken));
        }
        public static PropertyDeclaration_1381(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: Syntax.AccessorListSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, initializer: Syntax.EqualsValueClauseSyntax, semicolon: SyntaxToken): Syntax.PropertyDeclarationSyntax {
            return <Syntax.PropertyDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PropertyDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, explicitInterfaceSpecifier == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExplicitInterfaceSpecifierSyntax>explicitInterfaceSpecifier.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, accessorList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorListSyntax>accessorList.Green, expressionBody == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>expressionBody.Green, initializer == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EqualsValueClauseSyntax>initializer.Green, <Syntax.InternalSyntax.SyntaxToken>semicolon.Node).CreateRed_5702();
        }
        public static PropertyDeclaration_1181(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: Syntax.AccessorListSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, initializer: Syntax.EqualsValueClauseSyntax): Syntax.PropertyDeclarationSyntax {
            return SyntaxFactory.PropertyDeclaration_1381(attributeLists, modifiers, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, structDefault(SyntaxToken));
        }
        public static PropertyDeclaration_1445(type: Syntax.TypeSyntax, identifier: SyntaxToken): Syntax.PropertyDeclarationSyntax {
            return SyntaxFactory.PropertyDeclaration_1381(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), type, null, identifier, null, null, null, structDefault(SyntaxToken));
        }
        public static PropertyDeclaration_1424(type: Syntax.TypeSyntax, identifier: string): Syntax.PropertyDeclarationSyntax {
            return SyntaxFactory.PropertyDeclaration_1381(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), type, null, SyntaxFactory.Identifier_3961(identifier), null, null, null, structDefault(SyntaxToken));
        }
        public static ArrowExpressionClause_7237(arrowToken: SyntaxToken, expression: Syntax.ExpressionSyntax): Syntax.ArrowExpressionClauseSyntax {
            return <Syntax.ArrowExpressionClauseSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ArrowExpressionClause(<Syntax.InternalSyntax.SyntaxToken>arrowToken.Node, expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green).CreateRed_5702();
        }
        public static ArrowExpressionClause_6470(expression: Syntax.ExpressionSyntax): Syntax.ArrowExpressionClauseSyntax {
            return SyntaxFactory.ArrowExpressionClause_7237(SyntaxFactory.Token_1045(SyntaxKind.EqualsGreaterThanToken), expression);
        }
        public static EventDeclaration_1808(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, eventKeyword: SyntaxToken, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: Syntax.AccessorListSyntax): Syntax.EventDeclarationSyntax {
            return <Syntax.EventDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EventDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>eventKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, explicitInterfaceSpecifier == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExplicitInterfaceSpecifierSyntax>explicitInterfaceSpecifier.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, accessorList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorListSyntax>accessorList.Green).CreateRed_5702();
        }
        public static EventDeclaration_4696(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: Syntax.AccessorListSyntax): Syntax.EventDeclarationSyntax {
            return SyntaxFactory.EventDeclaration_1808(attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxKind.EventKeyword), type, explicitInterfaceSpecifier, identifier, accessorList);
        }
        public static EventDeclaration_2008(type: Syntax.TypeSyntax, identifier: SyntaxToken): Syntax.EventDeclarationSyntax {
            return SyntaxFactory.EventDeclaration_1808(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.EventKeyword), type, null, identifier, SyntaxFactory.AccessorList_1820());
        }
        public static EventDeclaration_1015(type: Syntax.TypeSyntax, identifier: string): Syntax.EventDeclarationSyntax {
            return SyntaxFactory.EventDeclaration_1808(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.EventKeyword), type, null, SyntaxFactory.Identifier_3961(identifier), SyntaxFactory.AccessorList_1820());
        }
        public static IndexerDeclaration_8282(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, thisKeyword: SyntaxToken, parameterList: Syntax.BracketedParameterListSyntax, accessorList: Syntax.AccessorListSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax, semicolon: SyntaxToken): Syntax.IndexerDeclarationSyntax {
            return <Syntax.IndexerDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IndexerDeclaration(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, explicitInterfaceSpecifier == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExplicitInterfaceSpecifierSyntax>explicitInterfaceSpecifier.Green, <Syntax.InternalSyntax.SyntaxToken>thisKeyword.Node, parameterList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedParameterListSyntax>parameterList.Green, accessorList == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorListSyntax>accessorList.Green, expressionBody == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>expressionBody.Green, <Syntax.InternalSyntax.SyntaxToken>semicolon.Node).CreateRed_5702();
        }
        public static IndexerDeclaration_4594(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, explicitInterfaceSpecifier: Syntax.ExplicitInterfaceSpecifierSyntax, parameterList: Syntax.BracketedParameterListSyntax, accessorList: Syntax.AccessorListSyntax, expressionBody: Syntax.ArrowExpressionClauseSyntax): Syntax.IndexerDeclarationSyntax {
            return SyntaxFactory.IndexerDeclaration_8282(attributeLists, modifiers, type, explicitInterfaceSpecifier, SyntaxFactory.Token_1045(SyntaxKind.ThisKeyword), parameterList, accessorList, expressionBody, structDefault(SyntaxToken));
        }
        public static IndexerDeclaration_1134(type: Syntax.TypeSyntax): Syntax.IndexerDeclarationSyntax {
            return SyntaxFactory.IndexerDeclaration_8282(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), type, null, SyntaxFactory.Token_1045(SyntaxKind.ThisKeyword), SyntaxFactory.BracketedParameterList_1992(), null, null, structDefault(SyntaxToken));
        }
        public static AccessorList_1639(openBraceToken: SyntaxToken, accessors: SyntaxList<Syntax.AccessorDeclarationSyntax>, closeBraceToken: SyntaxToken): Syntax.AccessorListSyntax {
            return <Syntax.AccessorListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AccessorList(<Syntax.InternalSyntax.SyntaxToken>openBraceToken.Node, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorDeclarationSyntax>(accessors.Node), <Syntax.InternalSyntax.SyntaxToken>closeBraceToken.Node).CreateRed_5702();
        }
        public static AccessorList_1820(accessors: SyntaxList<Syntax.AccessorDeclarationSyntax> = <SyntaxList<Syntax.AccessorDeclarationSyntax>> structDefault(SyntaxList)): Syntax.AccessorListSyntax {
            return SyntaxFactory.AccessorList_1639(SyntaxFactory.Token_1045(SyntaxKind.OpenBraceToken), accessors, SyntaxFactory.Token_1045(SyntaxKind.CloseBraceToken));
        }
        public static AccessorDeclaration_8957(kind: SyntaxKind, attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, body: Syntax.BlockSyntax, semicolonToken: SyntaxToken): Syntax.AccessorDeclarationSyntax {
            return <Syntax.AccessorDeclarationSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.AccessorDeclaration(kind, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), <Syntax.InternalSyntax.SyntaxToken>keyword.Node, body == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>body.Green, <Syntax.InternalSyntax.SyntaxToken>semicolonToken.Node).CreateRed_5702();
        }
        public static AccessorDeclaration_1515(kind: SyntaxKind, attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, body: Syntax.BlockSyntax): Syntax.AccessorDeclarationSyntax {
            return SyntaxFactory.AccessorDeclaration_8957(kind, attributeLists, modifiers, SyntaxFactory.Token_1045(SyntaxFactory.GetAccessorDeclarationKeywordKind(kind)), body, structDefault(SyntaxToken));
        }
        public static AccessorDeclaration_9179(kind: SyntaxKind, body: Syntax.BlockSyntax = null): Syntax.AccessorDeclarationSyntax {
            return SyntaxFactory.AccessorDeclaration_8957(kind, <SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxFactory.GetAccessorDeclarationKeywordKind(kind)), body, structDefault(SyntaxToken));
        }
        private static GetAccessorDeclarationKeywordKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.GetAccessorDeclaration:
                    return SyntaxKind.GetKeyword;
                case SyntaxKind.SetAccessorDeclaration:
                    return SyntaxKind.SetKeyword;
                case SyntaxKind.AddAccessorDeclaration:
                    return SyntaxKind.AddKeyword;
                case SyntaxKind.RemoveAccessorDeclaration:
                    return SyntaxKind.RemoveKeyword;
                case SyntaxKind.UnknownAccessorDeclaration:
                    return SyntaxKind.IdentifierToken;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }
        }
        public static ParameterList_1120(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<Syntax.ParameterSyntax>, closeParenToken: SyntaxToken): Syntax.ParameterListSyntax {
            return <Syntax.ParameterListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ParameterList(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>(parameters.Node), <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static ParameterList_8831(parameters: SeparatedSyntaxList<Syntax.ParameterSyntax> = <SeparatedSyntaxList<Syntax.ParameterSyntax>> structDefault(SeparatedSyntaxList)): Syntax.ParameterListSyntax {
            return SyntaxFactory.ParameterList_1120(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), parameters, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static BracketedParameterList_1823(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<Syntax.ParameterSyntax>, closeBracketToken: SyntaxToken): Syntax.BracketedParameterListSyntax {
            return <Syntax.BracketedParameterListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BracketedParameterList(<Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>(parameters.Node), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node).CreateRed_5702();
        }
        public static BracketedParameterList_1992(parameters: SeparatedSyntaxList<Syntax.ParameterSyntax> = <SeparatedSyntaxList<Syntax.ParameterSyntax>> structDefault(SeparatedSyntaxList)): Syntax.BracketedParameterListSyntax {
            return SyntaxFactory.BracketedParameterList_1823(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), parameters, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static Parameter_7982(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax, identifier: SyntaxToken, $default: Syntax.EqualsValueClauseSyntax): Syntax.ParameterSyntax {
            return <Syntax.ParameterSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.Parameter(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, $default == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EqualsValueClauseSyntax>$default.Green).CreateRed_5702();
        }
        public static Parameter_1967(identifier: SyntaxToken): Syntax.ParameterSyntax {
            return SyntaxFactory.Parameter_7982(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), null, identifier, null);
        }
        public static IncompleteMember_1376(attributeLists: SyntaxList<Syntax.AttributeListSyntax>, modifiers: SyntaxTokenList, type: Syntax.TypeSyntax): Syntax.IncompleteMemberSyntax {
            return <Syntax.IncompleteMemberSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IncompleteMember(Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>(attributeLists.Node), Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(modifiers.Node)), type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static IncompleteMember_1063(type: Syntax.TypeSyntax = null): Syntax.IncompleteMemberSyntax {
            return SyntaxFactory.IncompleteMember_1376(<SyntaxList<Syntax.AttributeListSyntax>> structDefault(SyntaxList), structDefault(SyntaxTokenList), type);
        }
        public static SkippedTokensTrivia_1492(tokens: SyntaxTokenList): Syntax.SkippedTokensTriviaSyntax {
            return <Syntax.SkippedTokensTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.SkippedTokensTrivia(Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(tokens.Node))).CreateRed_5702();
        }
        public static SkippedTokensTrivia_1030(): Syntax.SkippedTokensTriviaSyntax {
            return SyntaxFactory.SkippedTokensTrivia_1492(structDefault(SyntaxTokenList));
        }
        public static DocumentationCommentTrivia_1391(kind: SyntaxKind, content: SyntaxList<Syntax.XmlNodeSyntax>, endOfComment: SyntaxToken): Syntax.DocumentationCommentTriviaSyntax {
            return <Syntax.DocumentationCommentTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DocumentationCommentTrivia(kind, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNodeSyntax>(content.Node), <Syntax.InternalSyntax.SyntaxToken>endOfComment.Node).CreateRed_5702();
        }
        public static DocumentationCommentTrivia_1025(kind: SyntaxKind, content: SyntaxList<Syntax.XmlNodeSyntax> = <SyntaxList<Syntax.XmlNodeSyntax>> structDefault(SyntaxList)): Syntax.DocumentationCommentTriviaSyntax {
            return SyntaxFactory.DocumentationCommentTrivia_1391(kind, content, SyntaxFactory.Token_1045(SyntaxKind.EndOfDocumentationCommentToken));
        }
        public static TypeCref(type: Syntax.TypeSyntax): Syntax.TypeCrefSyntax {
            return <Syntax.TypeCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.TypeCref(type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static QualifiedCref_1689(container: Syntax.TypeSyntax, dotToken: SyntaxToken, member: Syntax.MemberCrefSyntax): Syntax.QualifiedCrefSyntax {
            return <Syntax.QualifiedCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.QualifiedCref(container == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>container.Green, <Syntax.InternalSyntax.SyntaxToken>dotToken.Node, member == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberCrefSyntax>member.Green).CreateRed_5702();
        }
        public static QualifiedCref_6919(container: Syntax.TypeSyntax, member: Syntax.MemberCrefSyntax): Syntax.QualifiedCrefSyntax {
            return SyntaxFactory.QualifiedCref_1689(container, SyntaxFactory.Token_1045(SyntaxKind.DotToken), member);
        }
        public static NameMemberCref_6133(name: Syntax.TypeSyntax, parameters: Syntax.CrefParameterListSyntax): Syntax.NameMemberCrefSyntax {
            return <Syntax.NameMemberCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.NameMemberCref(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>name.Green, parameters == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterListSyntax>parameters.Green).CreateRed_5702();
        }
        public static NameMemberCref_1522(name: Syntax.TypeSyntax): Syntax.NameMemberCrefSyntax {
            return SyntaxFactory.NameMemberCref_6133(name, null);
        }
        public static IndexerMemberCref_1919(thisKeyword: SyntaxToken, parameters: Syntax.CrefBracketedParameterListSyntax): Syntax.IndexerMemberCrefSyntax {
            return <Syntax.IndexerMemberCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IndexerMemberCref(<Syntax.InternalSyntax.SyntaxToken>thisKeyword.Node, parameters == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefBracketedParameterListSyntax>parameters.Green).CreateRed_5702();
        }
        public static IndexerMemberCref_7773(parameters: Syntax.CrefBracketedParameterListSyntax = null): Syntax.IndexerMemberCrefSyntax {
            return SyntaxFactory.IndexerMemberCref_1919(SyntaxFactory.Token_1045(SyntaxKind.ThisKeyword), parameters);
        }
        public static OperatorMemberCref_8861(operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameters: Syntax.CrefParameterListSyntax): Syntax.OperatorMemberCrefSyntax {
            return <Syntax.OperatorMemberCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.OperatorMemberCref(<Syntax.InternalSyntax.SyntaxToken>operatorKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>operatorToken.Node, parameters == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterListSyntax>parameters.Green).CreateRed_5702();
        }
        public static OperatorMemberCref_6802(operatorToken: SyntaxToken, parameters: Syntax.CrefParameterListSyntax): Syntax.OperatorMemberCrefSyntax {
            return SyntaxFactory.OperatorMemberCref_8861(SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), operatorToken, parameters);
        }
        public static OperatorMemberCref_4079(operatorToken: SyntaxToken): Syntax.OperatorMemberCrefSyntax {
            return SyntaxFactory.OperatorMemberCref_8861(SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), operatorToken, null);
        }
        public static ConversionOperatorMemberCref_9661(implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: Syntax.TypeSyntax, parameters: Syntax.CrefParameterListSyntax): Syntax.ConversionOperatorMemberCrefSyntax {
            return <Syntax.ConversionOperatorMemberCrefSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ConversionOperatorMemberCref(<Syntax.InternalSyntax.SyntaxToken>implicitOrExplicitKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>operatorKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green, parameters == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterListSyntax>parameters.Green).CreateRed_5702();
        }
        public static ConversionOperatorMemberCref_1679(implicitOrExplicitKeyword: SyntaxToken, type: Syntax.TypeSyntax, parameters: Syntax.CrefParameterListSyntax): Syntax.ConversionOperatorMemberCrefSyntax {
            return SyntaxFactory.ConversionOperatorMemberCref_9661(implicitOrExplicitKeyword, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), type, parameters);
        }
        public static ConversionOperatorMemberCref_2121(implicitOrExplicitKeyword: SyntaxToken, type: Syntax.TypeSyntax): Syntax.ConversionOperatorMemberCrefSyntax {
            return SyntaxFactory.ConversionOperatorMemberCref_9661(implicitOrExplicitKeyword, SyntaxFactory.Token_1045(SyntaxKind.OperatorKeyword), type, null);
        }
        public static CrefParameterList_1308(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<Syntax.CrefParameterSyntax>, closeParenToken: SyntaxToken): Syntax.CrefParameterListSyntax {
            return <Syntax.CrefParameterListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CrefParameterList(<Syntax.InternalSyntax.SyntaxToken>openParenToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterSyntax>(parameters.Node), <Syntax.InternalSyntax.SyntaxToken>closeParenToken.Node).CreateRed_5702();
        }
        public static CrefParameterList_1621(parameters: SeparatedSyntaxList<Syntax.CrefParameterSyntax> = <SeparatedSyntaxList<Syntax.CrefParameterSyntax>> structDefault(SeparatedSyntaxList)): Syntax.CrefParameterListSyntax {
            return SyntaxFactory.CrefParameterList_1308(SyntaxFactory.Token_1045(SyntaxKind.OpenParenToken), parameters, SyntaxFactory.Token_1045(SyntaxKind.CloseParenToken));
        }
        public static CrefBracketedParameterList_1976(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<Syntax.CrefParameterSyntax>, closeBracketToken: SyntaxToken): Syntax.CrefBracketedParameterListSyntax {
            return <Syntax.CrefBracketedParameterListSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CrefBracketedParameterList(<Syntax.InternalSyntax.SyntaxToken>openBracketToken.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterSyntax>(parameters.Node), <Syntax.InternalSyntax.SyntaxToken>closeBracketToken.Node).CreateRed_5702();
        }
        public static CrefBracketedParameterList_1239(parameters: SeparatedSyntaxList<Syntax.CrefParameterSyntax> = <SeparatedSyntaxList<Syntax.CrefParameterSyntax>> structDefault(SeparatedSyntaxList)): Syntax.CrefBracketedParameterListSyntax {
            return SyntaxFactory.CrefBracketedParameterList_1976(SyntaxFactory.Token_1045(SyntaxKind.OpenBracketToken), parameters, SyntaxFactory.Token_1045(SyntaxKind.CloseBracketToken));
        }
        public static CrefParameter_1799(refOrOutKeyword: SyntaxToken, type: Syntax.TypeSyntax): Syntax.CrefParameterSyntax {
            return <Syntax.CrefParameterSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.CrefParameter(<Syntax.InternalSyntax.SyntaxToken>refOrOutKeyword.Node, type == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>type.Green).CreateRed_5702();
        }
        public static CrefParameter_1173(type: Syntax.TypeSyntax): Syntax.CrefParameterSyntax {
            return SyntaxFactory.CrefParameter_1799(structDefault(SyntaxToken), type);
        }
        public static XmlElement_1306(startTag: Syntax.XmlElementStartTagSyntax, content: SyntaxList<Syntax.XmlNodeSyntax>, endTag: Syntax.XmlElementEndTagSyntax): Syntax.XmlElementSyntax {
            return <Syntax.XmlElementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlElement(startTag == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementStartTagSyntax>startTag.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNodeSyntax>(content.Node), endTag == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementEndTagSyntax>endTag.Green).CreateRed_5702();
        }
        public static XmlElement_4504(startTag: Syntax.XmlElementStartTagSyntax, endTag: Syntax.XmlElementEndTagSyntax): Syntax.XmlElementSyntax {
            return SyntaxFactory.XmlElement_1306(startTag, <SyntaxList<Syntax.XmlNodeSyntax>> structDefault(SyntaxList), endTag);
        }
        public static XmlElementStartTag_2520(lessThanToken: SyntaxToken, name: Syntax.XmlNameSyntax, attributes: SyntaxList<Syntax.XmlAttributeSyntax>, greaterThanToken: SyntaxToken): Syntax.XmlElementStartTagSyntax {
            return <Syntax.XmlElementStartTagSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlElementStartTag(<Syntax.InternalSyntax.SyntaxToken>lessThanToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlAttributeSyntax>(attributes.Node), <Syntax.InternalSyntax.SyntaxToken>greaterThanToken.Node).CreateRed_5702();
        }
        public static XmlElementStartTag_9484(name: Syntax.XmlNameSyntax, attributes: SyntaxList<Syntax.XmlAttributeSyntax>): Syntax.XmlElementStartTagSyntax {
            return SyntaxFactory.XmlElementStartTag_2520(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), name, attributes, SyntaxFactory.Token_1045(SyntaxKind.GreaterThanToken));
        }
        public static XmlElementStartTag_1612(name: Syntax.XmlNameSyntax): Syntax.XmlElementStartTagSyntax {
            return SyntaxFactory.XmlElementStartTag_2520(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), name, <SyntaxList<Syntax.XmlAttributeSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.GreaterThanToken));
        }
        public static XmlElementEndTag_1148(lessThanSlashToken: SyntaxToken, name: Syntax.XmlNameSyntax, greaterThanToken: SyntaxToken): Syntax.XmlElementEndTagSyntax {
            return <Syntax.XmlElementEndTagSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlElementEndTag(<Syntax.InternalSyntax.SyntaxToken>lessThanSlashToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>greaterThanToken.Node).CreateRed_5702();
        }
        public static XmlElementEndTag_1332(name: Syntax.XmlNameSyntax): Syntax.XmlElementEndTagSyntax {
            return SyntaxFactory.XmlElementEndTag_1148(SyntaxFactory.Token_1045(SyntaxKind.LessThanSlashToken), name, SyntaxFactory.Token_1045(SyntaxKind.GreaterThanToken));
        }
        public static XmlEmptyElement_1077(lessThanToken: SyntaxToken, name: Syntax.XmlNameSyntax, attributes: SyntaxList<Syntax.XmlAttributeSyntax>, slashGreaterThanToken: SyntaxToken): Syntax.XmlEmptyElementSyntax {
            return <Syntax.XmlEmptyElementSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlEmptyElement(<Syntax.InternalSyntax.SyntaxToken>lessThanToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, Syntax.GreenNodeExtensions.ToGreenList_1391<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlAttributeSyntax>(attributes.Node), <Syntax.InternalSyntax.SyntaxToken>slashGreaterThanToken.Node).CreateRed_5702();
        }
        public static XmlEmptyElement_1840(name: Syntax.XmlNameSyntax, attributes: SyntaxList<Syntax.XmlAttributeSyntax>): Syntax.XmlEmptyElementSyntax {
            return SyntaxFactory.XmlEmptyElement_1077(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), name, attributes, SyntaxFactory.Token_1045(SyntaxKind.SlashGreaterThanToken));
        }
        public static XmlEmptyElement_1296(name: Syntax.XmlNameSyntax): Syntax.XmlEmptyElementSyntax {
            return SyntaxFactory.XmlEmptyElement_1077(SyntaxFactory.Token_1045(SyntaxKind.LessThanToken), name, <SyntaxList<Syntax.XmlAttributeSyntax>> structDefault(SyntaxList), SyntaxFactory.Token_1045(SyntaxKind.SlashGreaterThanToken));
        }
        public static XmlName_7035(prefix: Syntax.XmlPrefixSyntax, localName: SyntaxToken): Syntax.XmlNameSyntax {
            return <Syntax.XmlNameSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlName(prefix == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlPrefixSyntax>prefix.Green, <Syntax.InternalSyntax.SyntaxToken>localName.Node).CreateRed_5702();
        }
        public static XmlName_3729(localName: SyntaxToken): Syntax.XmlNameSyntax {
            return SyntaxFactory.XmlName_7035(null, localName);
        }
        public static XmlName_1304(localName: string): Syntax.XmlNameSyntax {
            return SyntaxFactory.XmlName_7035(null, SyntaxFactory.Identifier_3961(localName));
        }
        public static XmlPrefix_3737(prefix: SyntaxToken, colonToken: SyntaxToken): Syntax.XmlPrefixSyntax {
            return <Syntax.XmlPrefixSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlPrefix(<Syntax.InternalSyntax.SyntaxToken>prefix.Node, <Syntax.InternalSyntax.SyntaxToken>colonToken.Node).CreateRed_5702();
        }
        public static XmlPrefix_2083(prefix: SyntaxToken): Syntax.XmlPrefixSyntax {
            return SyntaxFactory.XmlPrefix_3737(prefix, SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static XmlPrefix_1375(prefix: string): Syntax.XmlPrefixSyntax {
            return SyntaxFactory.XmlPrefix_3737(SyntaxFactory.Identifier_3961(prefix), SyntaxFactory.Token_1045(SyntaxKind.ColonToken));
        }
        public static XmlTextAttribute_1252(name: Syntax.XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, textTokens: SyntaxTokenList, endQuoteToken: SyntaxToken): Syntax.XmlTextAttributeSyntax {
            return <Syntax.XmlTextAttributeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlTextAttribute(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>equalsToken.Node, <Syntax.InternalSyntax.SyntaxToken>startQuoteToken.Node, Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(textTokens.Node)), <Syntax.InternalSyntax.SyntaxToken>endQuoteToken.Node).CreateRed_5702();
        }
        public static XmlTextAttribute_1816(name: Syntax.XmlNameSyntax, startQuoteToken: SyntaxToken, textTokens: SyntaxTokenList, endQuoteToken: SyntaxToken): Syntax.XmlTextAttributeSyntax {
            return SyntaxFactory.XmlTextAttribute_1252(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), startQuoteToken, textTokens, endQuoteToken);
        }
        public static XmlTextAttribute_7348(name: Syntax.XmlNameSyntax, startQuoteToken: SyntaxToken, endQuoteToken: SyntaxToken): Syntax.XmlTextAttributeSyntax {
            return SyntaxFactory.XmlTextAttribute_1252(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), startQuoteToken, structDefault(SyntaxTokenList), endQuoteToken);
        }
        public static XmlCrefAttribute_1157(name: Syntax.XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, cref: Syntax.CrefSyntax, endQuoteToken: SyntaxToken): Syntax.XmlCrefAttributeSyntax {
            return <Syntax.XmlCrefAttributeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlCrefAttribute(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>equalsToken.Node, <Syntax.InternalSyntax.SyntaxToken>startQuoteToken.Node, cref == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefSyntax>cref.Green, <Syntax.InternalSyntax.SyntaxToken>endQuoteToken.Node).CreateRed_5702();
        }
        public static XmlCrefAttribute_5703(name: Syntax.XmlNameSyntax, startQuoteToken: SyntaxToken, cref: Syntax.CrefSyntax, endQuoteToken: SyntaxToken): Syntax.XmlCrefAttributeSyntax {
            return SyntaxFactory.XmlCrefAttribute_1157(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), startQuoteToken, cref, endQuoteToken);
        }
        public static XmlNameAttribute_3328(name: Syntax.XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, identifier: Syntax.IdentifierNameSyntax, endQuoteToken: SyntaxToken): Syntax.XmlNameAttributeSyntax {
            return <Syntax.XmlNameAttributeSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlNameAttribute(name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, <Syntax.InternalSyntax.SyntaxToken>equalsToken.Node, <Syntax.InternalSyntax.SyntaxToken>startQuoteToken.Node, identifier == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>identifier.Green, <Syntax.InternalSyntax.SyntaxToken>endQuoteToken.Node).CreateRed_5702();
        }
        public static XmlNameAttribute_2143(name: Syntax.XmlNameSyntax, startQuoteToken: SyntaxToken, identifier: Syntax.IdentifierNameSyntax, endQuoteToken: SyntaxToken): Syntax.XmlNameAttributeSyntax {
            return SyntaxFactory.XmlNameAttribute_3328(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), startQuoteToken, identifier, endQuoteToken);
        }
        public static XmlNameAttribute_7999(name: Syntax.XmlNameSyntax, startQuoteToken: SyntaxToken, identifier: string, endQuoteToken: SyntaxToken): Syntax.XmlNameAttributeSyntax {
            return SyntaxFactory.XmlNameAttribute_3328(name, SyntaxFactory.Token_1045(SyntaxKind.EqualsToken), startQuoteToken, SyntaxFactory.IdentifierName_1404(identifier), endQuoteToken);
        }
        public static XmlText_7478(textTokens: SyntaxTokenList): Syntax.XmlTextSyntax {
            return <Syntax.XmlTextSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlText(Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(textTokens.Node))).CreateRed_5702();
        }
        public static XmlText_4657(): Syntax.XmlTextSyntax {
            return SyntaxFactory.XmlText_7478(structDefault(SyntaxTokenList));
        }
        public static XmlCDataSection_1269(startCDataToken: SyntaxToken, textTokens: SyntaxTokenList, endCDataToken: SyntaxToken): Syntax.XmlCDataSectionSyntax {
            return <Syntax.XmlCDataSectionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlCDataSection(<Syntax.InternalSyntax.SyntaxToken>startCDataToken.Node, Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(textTokens.Node)), <Syntax.InternalSyntax.SyntaxToken>endCDataToken.Node).CreateRed_5702();
        }
        public static XmlCDataSection_6071(textTokens: SyntaxTokenList = structDefault(SyntaxTokenList)): Syntax.XmlCDataSectionSyntax {
            return SyntaxFactory.XmlCDataSection_1269(SyntaxFactory.Token_1045(SyntaxKind.XmlCDataStartToken), textTokens, SyntaxFactory.Token_1045(SyntaxKind.XmlCDataEndToken));
        }
        public static XmlProcessingInstruction_6003(startProcessingInstructionToken: SyntaxToken, name: Syntax.XmlNameSyntax, textTokens: SyntaxTokenList, endProcessingInstructionToken: SyntaxToken): Syntax.XmlProcessingInstructionSyntax {
            return <Syntax.XmlProcessingInstructionSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlProcessingInstruction(<Syntax.InternalSyntax.SyntaxToken>startProcessingInstructionToken.Node, name == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>name.Green, Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(textTokens.Node)), <Syntax.InternalSyntax.SyntaxToken>endProcessingInstructionToken.Node).CreateRed_5702();
        }
        public static XmlProcessingInstruction_1292(name: Syntax.XmlNameSyntax, textTokens: SyntaxTokenList): Syntax.XmlProcessingInstructionSyntax {
            return SyntaxFactory.XmlProcessingInstruction_6003(SyntaxFactory.Token_1045(SyntaxKind.XmlProcessingInstructionStartToken), name, textTokens, SyntaxFactory.Token_1045(SyntaxKind.XmlProcessingInstructionEndToken));
        }
        public static XmlProcessingInstruction_5754(name: Syntax.XmlNameSyntax): Syntax.XmlProcessingInstructionSyntax {
            return SyntaxFactory.XmlProcessingInstruction_6003(SyntaxFactory.Token_1045(SyntaxKind.XmlProcessingInstructionStartToken), name, structDefault(SyntaxTokenList), SyntaxFactory.Token_1045(SyntaxKind.XmlProcessingInstructionEndToken));
        }
        public static XmlComment_1987(lessThanExclamationMinusMinusToken: SyntaxToken, textTokens: SyntaxTokenList, minusMinusGreaterThanToken: SyntaxToken): Syntax.XmlCommentSyntax {
            return <Syntax.XmlCommentSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.XmlComment(<Syntax.InternalSyntax.SyntaxToken>lessThanExclamationMinusMinusToken.Node, Syntax.InternalSyntax.SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(Syntax.GreenNodeExtensions.ToGreenList_6072<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode>(textTokens.Node)), <Syntax.InternalSyntax.SyntaxToken>minusMinusGreaterThanToken.Node).CreateRed_5702();
        }
        public static XmlComment_2099(textTokens: SyntaxTokenList = structDefault(SyntaxTokenList)): Syntax.XmlCommentSyntax {
            return SyntaxFactory.XmlComment_1987(SyntaxFactory.Token_1045(SyntaxKind.XmlCommentStartToken), textTokens, SyntaxFactory.Token_1045(SyntaxKind.XmlCommentEndToken));
        }
        public static IfDirectiveTrivia_3004(hashToken: SyntaxToken, ifKeyword: SyntaxToken, condition: Syntax.ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): Syntax.IfDirectiveTriviaSyntax {
            return <Syntax.IfDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.IfDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>ifKeyword.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive, branchTaken, conditionValue).CreateRed_5702();
        }
        public static IfDirectiveTrivia_2146(condition: Syntax.ExpressionSyntax, isActive: boolean, branchTaken: boolean, conditionValue: boolean): Syntax.IfDirectiveTriviaSyntax {
            return SyntaxFactory.IfDirectiveTrivia_3004(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.IfKeyword), condition, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive, branchTaken, conditionValue);
        }
        public static ElifDirectiveTrivia_1767(hashToken: SyntaxToken, elifKeyword: SyntaxToken, condition: Syntax.ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): Syntax.ElifDirectiveTriviaSyntax {
            return <Syntax.ElifDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ElifDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>elifKeyword.Node, condition == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>condition.Green, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive, branchTaken, conditionValue).CreateRed_5702();
        }
        public static ElifDirectiveTrivia_1069(condition: Syntax.ExpressionSyntax, isActive: boolean, branchTaken: boolean, conditionValue: boolean): Syntax.ElifDirectiveTriviaSyntax {
            return SyntaxFactory.ElifDirectiveTrivia_1767(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.ElifKeyword), condition, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive, branchTaken, conditionValue);
        }
        public static ElseDirectiveTrivia_6202(hashToken: SyntaxToken, elseKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean): Syntax.ElseDirectiveTriviaSyntax {
            return <Syntax.ElseDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ElseDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>elseKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive, branchTaken).CreateRed_5702();
        }
        public static ElseDirectiveTrivia_2606(isActive: boolean, branchTaken: boolean): Syntax.ElseDirectiveTriviaSyntax {
            return SyntaxFactory.ElseDirectiveTrivia_6202(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.ElseKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive, branchTaken);
        }
        public static EndIfDirectiveTrivia_1427(hashToken: SyntaxToken, endIfKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.EndIfDirectiveTriviaSyntax {
            return <Syntax.EndIfDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EndIfDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>endIfKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static EndIfDirectiveTrivia_3948(isActive: boolean): Syntax.EndIfDirectiveTriviaSyntax {
            return SyntaxFactory.EndIfDirectiveTrivia_1427(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.EndIfKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static RegionDirectiveTrivia_1280(hashToken: SyntaxToken, regionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.RegionDirectiveTriviaSyntax {
            return <Syntax.RegionDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.RegionDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>regionKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static RegionDirectiveTrivia_8522(isActive: boolean): Syntax.RegionDirectiveTriviaSyntax {
            return SyntaxFactory.RegionDirectiveTrivia_1280(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.RegionKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static EndRegionDirectiveTrivia_3825(hashToken: SyntaxToken, endRegionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.EndRegionDirectiveTriviaSyntax {
            return <Syntax.EndRegionDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.EndRegionDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>endRegionKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static EndRegionDirectiveTrivia_8318(isActive: boolean): Syntax.EndRegionDirectiveTriviaSyntax {
            return SyntaxFactory.EndRegionDirectiveTrivia_3825(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.EndRegionKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static ErrorDirectiveTrivia_4709(hashToken: SyntaxToken, errorKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.ErrorDirectiveTriviaSyntax {
            return <Syntax.ErrorDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ErrorDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>errorKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static ErrorDirectiveTrivia_1714(isActive: boolean): Syntax.ErrorDirectiveTriviaSyntax {
            return SyntaxFactory.ErrorDirectiveTrivia_4709(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.ErrorKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static WarningDirectiveTrivia_3903(hashToken: SyntaxToken, warningKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.WarningDirectiveTriviaSyntax {
            return <Syntax.WarningDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.WarningDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>warningKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static WarningDirectiveTrivia_1865(isActive: boolean): Syntax.WarningDirectiveTriviaSyntax {
            return SyntaxFactory.WarningDirectiveTrivia_3903(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.WarningKeyword), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static BadDirectiveTrivia_1871(hashToken: SyntaxToken, identifier: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.BadDirectiveTriviaSyntax {
            return <Syntax.BadDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.BadDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>identifier.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static BadDirectiveTrivia_2707(identifier: SyntaxToken, isActive: boolean): Syntax.BadDirectiveTriviaSyntax {
            return SyntaxFactory.BadDirectiveTrivia_1871(SyntaxFactory.Token_1045(SyntaxKind.HashToken), identifier, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static DefineDirectiveTrivia_1640(hashToken: SyntaxToken, defineKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.DefineDirectiveTriviaSyntax {
            return <Syntax.DefineDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.DefineDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>defineKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>name.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static DefineDirectiveTrivia_2673(name: SyntaxToken, isActive: boolean): Syntax.DefineDirectiveTriviaSyntax {
            return SyntaxFactory.DefineDirectiveTrivia_1640(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.DefineKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static DefineDirectiveTrivia_2085(name: string, isActive: boolean): Syntax.DefineDirectiveTriviaSyntax {
            return SyntaxFactory.DefineDirectiveTrivia_1640(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.DefineKeyword), SyntaxFactory.Identifier_3961(name), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static UndefDirectiveTrivia_1554(hashToken: SyntaxToken, undefKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.UndefDirectiveTriviaSyntax {
            return <Syntax.UndefDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.UndefDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>undefKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>name.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static UndefDirectiveTrivia_1022(name: SyntaxToken, isActive: boolean): Syntax.UndefDirectiveTriviaSyntax {
            return SyntaxFactory.UndefDirectiveTrivia_1554(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.UndefKeyword), name, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static UndefDirectiveTrivia_6325(name: string, isActive: boolean): Syntax.UndefDirectiveTriviaSyntax {
            return SyntaxFactory.UndefDirectiveTrivia_1554(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.UndefKeyword), SyntaxFactory.Identifier_3961(name), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static LineDirectiveTrivia_2819(hashToken: SyntaxToken, lineKeyword: SyntaxToken, line: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.LineDirectiveTriviaSyntax {
            return <Syntax.LineDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.LineDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>lineKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>line.Node, <Syntax.InternalSyntax.SyntaxToken>file.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static LineDirectiveTrivia_1235(line: SyntaxToken, file: SyntaxToken, isActive: boolean): Syntax.LineDirectiveTriviaSyntax {
            return SyntaxFactory.LineDirectiveTrivia_2819(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.LineKeyword), line, file, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static LineDirectiveTrivia_1817(line: SyntaxToken, isActive: boolean): Syntax.LineDirectiveTriviaSyntax {
            return SyntaxFactory.LineDirectiveTrivia_2819(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.LineKeyword), line, structDefault(SyntaxToken), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static PragmaWarningDirectiveTrivia_1663(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, warningKeyword: SyntaxToken, disableOrRestoreKeyword: SyntaxToken, errorCodes: SeparatedSyntaxList<Syntax.ExpressionSyntax>, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.PragmaWarningDirectiveTriviaSyntax {
            return <Syntax.PragmaWarningDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PragmaWarningDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>pragmaKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>warningKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>disableOrRestoreKeyword.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(errorCodes.Node), <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static PragmaWarningDirectiveTrivia_2287(disableOrRestoreKeyword: SyntaxToken, errorCodes: SeparatedSyntaxList<Syntax.ExpressionSyntax>, isActive: boolean): Syntax.PragmaWarningDirectiveTriviaSyntax {
            return SyntaxFactory.PragmaWarningDirectiveTrivia_1663(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.PragmaKeyword), SyntaxFactory.Token_1045(SyntaxKind.WarningKeyword), disableOrRestoreKeyword, errorCodes, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static PragmaWarningDirectiveTrivia_1709(disableOrRestoreKeyword: SyntaxToken, isActive: boolean): Syntax.PragmaWarningDirectiveTriviaSyntax {
            return SyntaxFactory.PragmaWarningDirectiveTrivia_1663(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.PragmaKeyword), SyntaxFactory.Token_1045(SyntaxKind.WarningKeyword), disableOrRestoreKeyword, <SeparatedSyntaxList<Syntax.ExpressionSyntax>> structDefault(SeparatedSyntaxList), SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static PragmaChecksumDirectiveTrivia_1238(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, checksumKeyword: SyntaxToken, file: SyntaxToken, guid: SyntaxToken, bytes: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.PragmaChecksumDirectiveTriviaSyntax {
            return <Syntax.PragmaChecksumDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.PragmaChecksumDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>pragmaKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>checksumKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>file.Node, <Syntax.InternalSyntax.SyntaxToken>guid.Node, <Syntax.InternalSyntax.SyntaxToken>bytes.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static PragmaChecksumDirectiveTrivia_1298(file: SyntaxToken, guid: SyntaxToken, bytes: SyntaxToken, isActive: boolean): Syntax.PragmaChecksumDirectiveTriviaSyntax {
            return SyntaxFactory.PragmaChecksumDirectiveTrivia_1238(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.PragmaKeyword), SyntaxFactory.Token_1045(SyntaxKind.ChecksumKeyword), file, guid, bytes, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static ReferenceDirectiveTrivia_1118(hashToken: SyntaxToken, referenceKeyword: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): Syntax.ReferenceDirectiveTriviaSyntax {
            return <Syntax.ReferenceDirectiveTriviaSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.ReferenceDirectiveTrivia(<Syntax.InternalSyntax.SyntaxToken>hashToken.Node, <Syntax.InternalSyntax.SyntaxToken>referenceKeyword.Node, <Syntax.InternalSyntax.SyntaxToken>file.Node, <Syntax.InternalSyntax.SyntaxToken>endOfDirectiveToken.Node, isActive).CreateRed_5702();
        }
        public static ReferenceDirectiveTrivia_2058(file: SyntaxToken, isActive: boolean): Syntax.ReferenceDirectiveTriviaSyntax {
            return SyntaxFactory.ReferenceDirectiveTrivia_1118(SyntaxFactory.Token_1045(SyntaxKind.HashToken), SyntaxFactory.Token_1045(SyntaxKind.ReferenceKeyword), file, SyntaxFactory.Token_1045(SyntaxKind.EndOfDirectiveToken), isActive);
        }
        public static InterpolatedString_4706(stringStart: SyntaxToken, interpolatedInserts: SeparatedSyntaxList<Syntax.InterpolatedStringInsertSyntax>, stringEnd: SyntaxToken): Syntax.InterpolatedStringSyntax {
            return <Syntax.InterpolatedStringSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.InterpolatedString(<Syntax.InternalSyntax.SyntaxToken>stringStart.Node, Syntax.GreenNodeExtensions.ToGreenSeparatedList<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterpolatedStringInsertSyntax>(interpolatedInserts.Node), <Syntax.InternalSyntax.SyntaxToken>stringEnd.Node).CreateRed_5702();
        }
        public static InterpolatedString_1171(interpolatedInserts: SeparatedSyntaxList<Syntax.InterpolatedStringInsertSyntax> = <SeparatedSyntaxList<Syntax.InterpolatedStringInsertSyntax>> structDefault(SeparatedSyntaxList)): Syntax.InterpolatedStringSyntax {
            return SyntaxFactory.InterpolatedString_4706(SyntaxFactory.Token_1045(SyntaxKind.InterpolatedStringStartToken), interpolatedInserts, SyntaxFactory.Token_1045(SyntaxKind.InterpolatedStringEndToken));
        }
        public static InterpolatedStringInsert_5213(expression: Syntax.ExpressionSyntax, comma: SyntaxToken, alignment: Syntax.ExpressionSyntax, format: SyntaxToken): Syntax.InterpolatedStringInsertSyntax {
            return <Syntax.InterpolatedStringInsertSyntax>Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxFactory.InterpolatedStringInsert(expression == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>expression.Green, <Syntax.InternalSyntax.SyntaxToken>comma.Node, alignment == null ? null : <Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>alignment.Green, <Syntax.InternalSyntax.SyntaxToken>format.Node).CreateRed_5702();
        }
        public static InterpolatedStringInsert_1969(expression: Syntax.ExpressionSyntax): Syntax.InterpolatedStringInsertSyntax {
            return SyntaxFactory.InterpolatedStringInsert_5213(expression, structDefault(SyntaxToken), null, structDefault(SyntaxToken));
        } 
    }
}
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class DocumentationCommentParser extends SyntaxParser {
        private pool: SyntaxListPool = new SyntaxListPool().ctor_8047();
        private isDelimited: boolean = false;
        ctor_5488(lexer: Lexer, modeflags: LexerMode): DocumentationCommentParser {
            super.ctor_2025(lexer, LexerMode.XmlDocComment | LexerMode.XmlDocCommentLocationStart | modeflags, null, null, true);
            this.isDelimited = (modeflags & LexerMode.XmlDocCommentStyleDelimited) != 0;
            return this;
        }
        public ReInitialize_Overload(modeflags: LexerMode): void {
            super.ReInitialize();
            this.Mode = LexerMode.XmlDocComment | LexerMode.XmlDocCommentLocationStart | modeflags;
            this.isDelimited = (modeflags & LexerMode.XmlDocCommentStyleDelimited) != 0;
        }
        private SetMode(mode: LexerMode): LexerMode {
            var tmp = this.Mode;
            this.Mode = mode | (tmp & (LexerMode.MaskXmlDocCommentLocation | LexerMode.MaskXmlDocCommentStyle));
            return tmp;
        }
        private ResetMode(mode: LexerMode): void {
            this.Mode = mode;
        }
        public ParseDocumentationComment(isTerminated: { refObj: boolean }): DocumentationCommentTriviaSyntax {
            var nodes = this.pool.Allocate<XmlNodeSyntax>();
            try
            {
                this.ParseXmlNodes(nodes);
                if (this.CurrentToken.Kind != SyntaxKind.EndOfDocumentationCommentToken) {
                    this.ParseRemainder(nodes);
                }
                var eoc = this.EatToken_1865(SyntaxKind.EndOfDocumentationCommentToken);
                isTerminated.refObj = !this.isDelimited || (eoc.LeadingTrivia.Count > 0 && eoc.LeadingTrivia.$get$(eoc.LeadingTrivia.Count - 1).ToString() == "*/");
                var kind: SyntaxKind = this.isDelimited ? SyntaxKind.MultiLineDocumentationCommentTrivia : SyntaxKind.SingleLineDocumentationCommentTrivia;
                return SyntaxFactory.DocumentationCommentTrivia(kind, nodes.ToList(), eoc);
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(nodes));
            }
        }
        public ParseRemainder(nodes: SyntaxListBuilder<XmlNodeSyntax>): void {
            var endTag: boolean = this.CurrentToken.Kind == SyntaxKind.LessThanSlashToken;
            var saveMode = this.SetMode(LexerMode.XmlCDataSectionText);
            var textTokens = this.pool.AllocateBase();
            try
            {
                while (this.CurrentToken.Kind != SyntaxKind.EndOfDocumentationCommentToken) {
                    var token = this.EatToken_2098();
                    textTokens.Add(token);
                }
                var allRemainderText = SyntaxFactory.XmlText(SyntaxListBuilderExtensions.ToTokenList(textTokens));
                var code: XmlParseErrorCode = endTag ? XmlParseErrorCode.XML_EndTagNotExpected : XmlParseErrorCode.XML_ExpectedEndOfXml;
                allRemainderText = this.WithAdditionalDiagnostics(allRemainderText, new XmlSyntaxDiagnosticInfo().ctor_8171(0, 1, code));
                nodes.Add(allRemainderText);
            }

            finally {
                this.pool.Free_1631(textTokens);
            }
            this.ResetMode(saveMode);
        }
        private ParseXmlNodes(nodes: SyntaxListBuilder<XmlNodeSyntax>): void {
            while (true) {
                var node = this.ParseXmlNode();
                if (node == null) {
                    return
                }
                nodes.Add(node);
            }
        }
        private ParseXmlNode(): XmlNodeSyntax {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.XmlTextLiteralToken:
                case SyntaxKind.XmlTextLiteralNewLineToken:
                case SyntaxKind.XmlEntityLiteralToken:
                    return this.ParseXmlText();
                case SyntaxKind.LessThanToken:
                    return this.ParseXmlElement();
                case SyntaxKind.XmlCommentStartToken:
                    return this.ParseXmlComment();
                case SyntaxKind.XmlCDataStartToken:
                    return this.ParseXmlCDataSection();
                case SyntaxKind.XmlProcessingInstructionStartToken:
                    return this.ParseXmlProcessingInstruction();
                case SyntaxKind.EndOfDocumentationCommentToken:
                    return null;
                default:
                    return null;
            }
        }
        private IsXmlNodeStartOrStop(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.LessThanToken:
                case SyntaxKind.LessThanSlashToken:
                case SyntaxKind.XmlCommentStartToken:
                case SyntaxKind.XmlCDataStartToken:
                case SyntaxKind.XmlProcessingInstructionStartToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.SlashGreaterThanToken:
                case SyntaxKind.EndOfDocumentationCommentToken:
                    return true;
                default:
                    return false;
            }
        }
        private ParseXmlText(): XmlNodeSyntax {
            var textTokens = this.pool.AllocateBase();
            while (this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralToken || this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralNewLineToken || this.CurrentToken.Kind == SyntaxKind.XmlEntityLiteralToken) {
                textTokens.Add(this.EatToken_2098());
            }
            var list = SyntaxListBuilderExtensions.ToList_1673(textTokens);
            this.pool.Free_1631(textTokens);
            return SyntaxFactory.XmlText(SyntaxList.op_Implicit_8623<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(list));
        }
        private ParseXmlElement(): XmlNodeSyntax {
            var lessThan = this.EatToken_1865(SyntaxKind.LessThanToken);
            var saveMode = this.SetMode(LexerMode.XmlElementTag);
            var name = this.ParseXmlName();
            if (lessThan.GetTrailingTriviaWidth() > 0 || name.GetLeadingTriviaWidth() > 0) {
                name = this.WithXmlParseError_9319(name, XmlParseErrorCode.XML_InvalidWhitespace);
            }
            var attrs = this.pool.Allocate<XmlAttributeSyntax>();
            try
            {
                var name_ref0 = { refObj: name };
                this.ParseXmlAttributes(name_ref0, attrs);

                name = name_ref0.refObj;;
                if (this.CurrentToken.Kind == SyntaxKind.GreaterThanToken) {
                    var startTag = SyntaxFactory.XmlElementStartTag(lessThan, name, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlAttributeSyntax>(attrs), this.EatToken_2098());
                    this.SetMode(LexerMode.XmlDocComment);
                    var nodes = this.pool.Allocate<XmlNodeSyntax>();
                    try
                    {
                        this.ParseXmlNodes(nodes);
                        var endName: XmlNameSyntax;
                        var greaterThan: SyntaxToken;
                        var lessThanSlash = this.EatToken_1610(SyntaxKind.LessThanSlashToken,/*reportError:*/false);
                        if (lessThanSlash.IsMissing) {
                            this.ResetMode(saveMode);
                            lessThanSlash = this.WithXmlParseError_3590(lessThanSlash, XmlParseErrorCode.XML_EndTagExpected, name.ToString());
                            endName = SyntaxFactory.XmlName(/*prefix:*/null,/*localName:*/SyntaxFactory.MissingToken_7070(SyntaxKind.IdentifierToken));
                            greaterThan = SyntaxFactory.MissingToken_7070(SyntaxKind.GreaterThanToken);
                        }
                        else {
                            this.SetMode(LexerMode.XmlElementTag);
                            endName = this.ParseXmlName();
                            if (lessThanSlash.GetTrailingTriviaWidth() > 0 || endName.GetLeadingTriviaWidth() > 0) {
                                endName = this.WithXmlParseError_9319(endName, XmlParseErrorCode.XML_InvalidWhitespace);
                            }
                            if (!endName.IsMissing && name.ToString() != endName.ToString()) {
                                endName = this.WithXmlParseError_7460(endName, XmlParseErrorCode.XML_ElementTypeMatch, endName.ToString(), name.ToString());
                            }
                            if (this.CurrentToken.Kind != SyntaxKind.GreaterThanToken) {
                                var endName_ref0 = { refObj: endName };
                                this.SkipBadTokens(endName_ref0, null, p => p.CurrentToken.Kind != SyntaxKind.GreaterThanToken, p => p.IsXmlNodeStartOrStop(), XmlParseErrorCode.XML_InvalidToken);

                                endName = endName_ref0.refObj;;
                            }
                            greaterThan = this.EatToken_1865(SyntaxKind.GreaterThanToken);
                        }
                        var endTag = SyntaxFactory.XmlElementEndTag(lessThanSlash, endName, greaterThan);
                        this.ResetMode(saveMode);
                        return SyntaxFactory.XmlElement(startTag, nodes.ToList(), endTag);
                    }

                    finally {
                        this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(nodes));
                    }
                }
                else {
                    var slashGreater = this.EatToken_1610(SyntaxKind.SlashGreaterThanToken, false);
                    if (slashGreater.IsMissing && !name.IsMissing) {
                        slashGreater = this.WithXmlParseError_3590(slashGreater, XmlParseErrorCode.XML_ExpectedEndOfTag, name.ToString());
                    }
                    this.ResetMode(saveMode);
                    return SyntaxFactory.XmlEmptyElement(lessThan, name, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlAttributeSyntax>(attrs), slashGreater);
                }
            }

            finally {
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(attrs));
            }
        }
        private attributesSeen: System.Collections.Generic.HashSet<string> = new System.Collections.Generic.HashSet<string>();
        private ParseXmlAttributes(elementName: { refObj: XmlNameSyntax }, attrs: SyntaxListBuilder<XmlAttributeSyntax>): void {
            this.attributesSeen.Clear();
            while (true) {
                if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken) {
                    var attr = this.ParseXmlAttribute(elementName.refObj);
                    var attrName: string = attr.Name.ToString();
                    if (this.attributesSeen.Contains(attrName)) {
                        attr = this.WithXmlParseError_7460(attr, XmlParseErrorCode.XML_DuplicateAttribute, attrName);
                    }
                    else {
                        this.attributesSeen.Add(attrName);
                    }
                    attrs.Add(attr);
                }
                else {
                    var skip = this.SkipBadTokens(elementName, SyntaxListBuilder.op_Implicit_1734(attrs), p => p.CurrentToken.Kind != SyntaxKind.IdentifierName, p => p.CurrentToken.Kind == SyntaxKind.GreaterThanToken || p.CurrentToken.Kind == SyntaxKind.SlashGreaterThanToken || p.CurrentToken.Kind == SyntaxKind.LessThanToken || p.CurrentToken.Kind == SyntaxKind.LessThanSlashToken || p.CurrentToken.Kind == SyntaxKind.EndOfDocumentationCommentToken || p.CurrentToken.Kind == SyntaxKind.EndOfFileToken, XmlParseErrorCode.XML_InvalidToken);
                    if (skip == DocumentationCommentParser.SkipResult.Abort) {
                        break;
                    }
                }
            }
        }
        private SkipBadTokens<T extends CSharpSyntaxNode>(startNode: { refObj: T }, list: SyntaxListBaseBuilder, isNotExpectedFunction: (_: DocumentationCommentParser) => boolean, abortFunction: (_: DocumentationCommentParser) => boolean, error: XmlParseErrorCode): DocumentationCommentParser.SkipResult {
            var badTokens = <SyntaxListBuilder<SyntaxToken>> structDefault(SyntaxListBuilder);
            var hasError: boolean = false;
            try
            {
                var result: DocumentationCommentParser.SkipResult = DocumentationCommentParser.SkipResult.Continue;
                while (isNotExpectedFunction(this)) {
                    if (abortFunction(this)) {
                        result = DocumentationCommentParser.SkipResult.Abort;
                        break;
                    }
                    if (badTokens.IsNull) {
                        badTokens = this.pool.Allocate<SyntaxToken>();
                    }
                    var token = this.EatToken_2098();
                    if (!hasError) {
                        token = this.WithXmlParseError_3590(token, error, token.ToString());
                        hasError = true;
                    }
                    badTokens.Add(token);
                }
                if (!badTokens.IsNull && badTokens.Count > 0) {
                    if (list == null || list.Count == 0) {
                        startNode.refObj = this.AddTrailingSkippedSyntax(startNode.refObj, badTokens.ToListNode());
                    }
                    else {
                        list.$set$(list.Count - 1, this.AddTrailingSkippedSyntax(list.$get$(list.Count - 1), badTokens.ToListNode()));
                    }
                    return result;
                }
                else {
                    return DocumentationCommentParser.SkipResult.Abort;
                }
            }

            finally {
                if (!badTokens.IsNull) {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(badTokens));
                }
            }
        }
        private ParseXmlAttribute(elementName: XmlNameSyntax): XmlAttributeSyntax {
            var attrName = this.ParseXmlName();
            if (attrName.GetLeadingTriviaWidth() == 0) {
                attrName = this.WithXmlParseError_9319(attrName, XmlParseErrorCode.XML_WhitespaceMissing);
            }
            var equals = this.EatToken_1610(SyntaxKind.EqualsToken, false);
            if (equals.IsMissing) {
                equals = this.WithXmlParseError_3590(equals, XmlParseErrorCode.XML_MissingEqualsAttribute);
                switch (this.CurrentToken.Kind) {
                    case SyntaxKind.SingleQuoteToken:
                    case SyntaxKind.DoubleQuoteToken:
                        break;
                    default:
                        return SyntaxFactory.XmlTextAttribute(attrName, equals, SyntaxFactory.MissingToken_7070(SyntaxKind.DoubleQuoteToken), <SyntaxList<SyntaxToken>> structDefault(SyntaxList), SyntaxFactory.MissingToken_7070(SyntaxKind.DoubleQuoteToken));
                }
            }
            var startQuote: SyntaxToken;
            var endQuote: SyntaxToken;
            var attrNameText: string = attrName.LocalName.ValueText;
            var hasNoPrefix: boolean = attrName.Prefix == null;
            if (hasNoPrefix && Roslyn.Utilities.DocumentationCommentXmlNames.AttributeEquals(attrNameText, Roslyn.Utilities.DocumentationCommentXmlNames.CrefAttributeName) && !this.IsVerbatimCref()) {
                var cref: CrefSyntax;
                var startQuote_ref0 = { refObj: startQuote };
                var cref_ref1 = { refObj: cref };
                var endQuote_ref2 = { refObj: endQuote };
                this.ParseCrefAttribute(startQuote_ref0, cref_ref1, endQuote_ref2);

                startQuote = startQuote_ref0.refObj;

                cref = cref_ref1.refObj;

                endQuote = endQuote_ref2.refObj;;
                return SyntaxFactory.XmlCrefAttribute(attrName, equals, startQuote, cref, endQuote);
            }
            else if (hasNoPrefix && Roslyn.Utilities.DocumentationCommentXmlNames.AttributeEquals(attrNameText, Roslyn.Utilities.DocumentationCommentXmlNames.NameAttributeName) && DocumentationCommentParser.XmlElementSupportsNameAttribute(elementName)) {
                var identifier: IdentifierNameSyntax;
                var startQuote_ref0 = { refObj: startQuote };
                var identifier_ref1 = { refObj: identifier };
                var endQuote_ref2 = { refObj: endQuote };
                this.ParseNameAttribute(startQuote_ref0, identifier_ref1, endQuote_ref2);

                startQuote = startQuote_ref0.refObj;

                identifier = identifier_ref1.refObj;

                endQuote = endQuote_ref2.refObj;;
                return SyntaxFactory.XmlNameAttribute(attrName, equals, startQuote, identifier, endQuote);
            }
            else {
                var textTokens = this.pool.Allocate<SyntaxToken>();
                try
                {
                    var startQuote_ref0 = { refObj: startQuote };
                    var endQuote_ref1 = { refObj: endQuote };
                    this.ParseXmlAttributeText(startQuote_ref0, textTokens, endQuote_ref1);

                    startQuote = startQuote_ref0.refObj;

                    endQuote = endQuote_ref1.refObj;;
                    return SyntaxFactory.XmlTextAttribute(attrName, equals, startQuote, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(textTokens), endQuote);
                }

                finally {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(textTokens));
                }
            }
        }
        private static XmlElementSupportsNameAttribute(elementName: XmlNameSyntax): boolean {
            if (elementName.Prefix != null) {
                return false;
            }
            var localName: string = elementName.LocalName.ValueText;
            return Roslyn.Utilities.DocumentationCommentXmlNames.ElementEquals(localName, Roslyn.Utilities.DocumentationCommentXmlNames.ParameterElementName) || Roslyn.Utilities.DocumentationCommentXmlNames.ElementEquals(localName, Roslyn.Utilities.DocumentationCommentXmlNames.ParameterReferenceElementName) || Roslyn.Utilities.DocumentationCommentXmlNames.ElementEquals(localName, Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterElementName) || Roslyn.Utilities.DocumentationCommentXmlNames.ElementEquals(localName, Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterReferenceElementName);
        }
        private IsVerbatimCref(): boolean {
            var isVerbatim: boolean = false;
            var resetPoint = this.GetResetPoint();
            var openQuote: SyntaxToken = this.EatToken_1865(this.CurrentToken.Kind == SyntaxKind.SingleQuoteToken ? SyntaxKind.SingleQuoteToken : SyntaxKind.DoubleQuoteToken);
            this.SetMode(LexerMode.XmlCharacter);
            var current: SyntaxToken = this.CurrentToken;
            if ((current.Kind == SyntaxKind.XmlTextLiteralToken || current.Kind == SyntaxKind.XmlEntityLiteralToken) && current.ValueText != SyntaxFacts.GetText_3915(openQuote.Kind) && current.ValueText != ":") {
                this.EatToken_2098();
                current = this.CurrentToken;
                if ((current.Kind == SyntaxKind.XmlTextLiteralToken || current.Kind == SyntaxKind.XmlEntityLiteralToken) && current.ValueText == ":") {
                    isVerbatim = true;
                }
            }
            var resetPoint_ref0 = { refObj: resetPoint };
            this.Reset(resetPoint_ref0);

            resetPoint = resetPoint_ref0.refObj;;
            var resetPoint_ref0 = { refObj: resetPoint };
            this.Release(resetPoint_ref0);

            resetPoint = resetPoint_ref0.refObj;;
            return isVerbatim;
        }
        private ParseCrefAttribute(startQuote: { refObj: SyntaxToken }, cref: { refObj: CrefSyntax }, endQuote: { refObj: SyntaxToken }): void {
            startQuote.refObj = this.ParseXmlAttributeStartQuote();
            var quoteKind: SyntaxKind = startQuote.refObj.Kind;
            {
                var saveMode = this.SetMode(quoteKind == SyntaxKind.SingleQuoteToken ? LexerMode.XmlCrefQuote : LexerMode.XmlCrefDoubleQuote);
                cref.refObj = this.ParseCrefAttributeValue();
                this.ResetMode(saveMode);
            }
            endQuote.refObj = this.ParseXmlAttributeEndQuote(quoteKind);
        }
        private ParseNameAttribute(startQuote: { refObj: SyntaxToken }, identifier: { refObj: IdentifierNameSyntax }, endQuote: { refObj: SyntaxToken }): void {
            startQuote.refObj = this.ParseXmlAttributeStartQuote();
            var quoteKind: SyntaxKind = startQuote.refObj.Kind;
            {
                var saveMode = this.SetMode(quoteKind == SyntaxKind.SingleQuoteToken ? LexerMode.XmlNameQuote : LexerMode.XmlNameDoubleQuote);
                identifier.refObj = this.ParseNameAttributeValue();
                this.ResetMode(saveMode);
            }
            endQuote.refObj = this.ParseXmlAttributeEndQuote(quoteKind);
        }
        private ParseXmlAttributeText(startQuote: { refObj: SyntaxToken }, textTokens: SyntaxListBuilder<SyntaxToken>, endQuote: { refObj: SyntaxToken }): void {
            startQuote.refObj = this.ParseXmlAttributeStartQuote();
            var quoteKind: SyntaxKind = startQuote.refObj.Kind;
            if (startQuote.refObj.IsMissing && startQuote.refObj.FullWidth == 0) {
                endQuote.refObj = SyntaxFactory.MissingToken_7070(quoteKind);
            }
            else {
                var saveMode = this.SetMode(quoteKind == SyntaxKind.SingleQuoteToken ? LexerMode.XmlAttributeTextQuote : LexerMode.XmlAttributeTextDoubleQuote);
                while (this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralToken || this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralNewLineToken || this.CurrentToken.Kind == SyntaxKind.XmlEntityLiteralToken || this.CurrentToken.Kind == SyntaxKind.LessThanToken) {
                    var token = this.EatToken_2098();
                    if (token.Kind == SyntaxKind.LessThanToken) {
                        token = this.WithXmlParseError_3590(token, XmlParseErrorCode.XML_LessThanInAttributeValue);
                    }
                    textTokens.Add(token);
                }
                this.ResetMode(saveMode);
                endQuote.refObj = this.ParseXmlAttributeEndQuote(quoteKind);
            }
        }
        private ParseXmlAttributeStartQuote(): SyntaxToken {
            if (DocumentationCommentParser.IsNonAsciiQuotationMark(this.CurrentToken)) {
                return this.SkipNonAsciiQuotationMark();
            }
            var quoteKind = this.CurrentToken.Kind == SyntaxKind.SingleQuoteToken ? SyntaxKind.SingleQuoteToken : SyntaxKind.DoubleQuoteToken;
            var startQuote = this.EatToken_1610(quoteKind,/*reportError:*/false);
            if (startQuote.IsMissing) {
                startQuote = this.WithXmlParseError_3590(startQuote, XmlParseErrorCode.XML_StringLiteralNoStartQuote);
            }
            return startQuote;
        }
        private ParseXmlAttributeEndQuote(quoteKind: SyntaxKind): SyntaxToken {
            if (DocumentationCommentParser.IsNonAsciiQuotationMark(this.CurrentToken)) {
                return this.SkipNonAsciiQuotationMark();
            }
            var endQuote = this.EatToken_1610(quoteKind,/*reportError:*/false);
            if (endQuote.IsMissing) {
                endQuote = this.WithXmlParseError_3590(endQuote, XmlParseErrorCode.XML_StringLiteralNoEndQuote);
            }
            return endQuote;
        }
        private SkipNonAsciiQuotationMark(): SyntaxToken {
            var quote = SyntaxFactory.MissingToken_7070(SyntaxKind.DoubleQuoteToken);
            quote = this.AddTrailingSkippedSyntax(quote, this.EatToken_2098());
            quote = this.WithXmlParseError_3590(quote, XmlParseErrorCode.XML_StringLiteralNonAsciiQuote);
            return quote;
        }
        private static IsNonAsciiQuotationMark(token: SyntaxToken): boolean {
            return token.Text.length == 1 && SyntaxFacts.IsNonAsciiQuotationMark(token.Text[0]);
        }
        private ParseXmlName(): XmlNameSyntax {
            var id = this.EatToken_1865(SyntaxKind.IdentifierToken);
            var prefix: XmlPrefixSyntax = null;
            if (this.CurrentToken.Kind == SyntaxKind.ColonToken) {
                var colon = this.EatToken_2098();
                var prefixTrailingWidth: number = id.GetTrailingTriviaWidth();
                var colonLeadingWidth: number = colon.GetLeadingTriviaWidth();
                if (prefixTrailingWidth > 0 || colonLeadingWidth > 0) {
                    var offset: number = -prefixTrailingWidth;
                    var width: number = prefixTrailingWidth + colonLeadingWidth;
                    colon = this.WithAdditionalDiagnostics(colon, new XmlSyntaxDiagnosticInfo().ctor_8171(offset, width, XmlParseErrorCode.XML_InvalidWhitespace));
                }
                prefix = SyntaxFactory.XmlPrefix(id, colon);
                id = this.EatToken_1865(SyntaxKind.IdentifierToken);
                var colonTrailingWidth: number = colon.GetTrailingTriviaWidth();
                var localNameLeadingWidth: number = id.GetLeadingTriviaWidth();
                if (colonTrailingWidth > 0 || localNameLeadingWidth > 0) {
                    var offset: number = -colonTrailingWidth;
                    var width: number = colonTrailingWidth + localNameLeadingWidth;
                    id = this.WithAdditionalDiagnostics(id, new XmlSyntaxDiagnosticInfo().ctor_8171(offset, width, XmlParseErrorCode.XML_InvalidWhitespace));
                }
            }
            return SyntaxFactory.XmlName(prefix, id);
        }
        private ParseXmlComment(): XmlCommentSyntax {
            var lessThanExclamationMinusMinusToken = this.EatToken_1865(SyntaxKind.XmlCommentStartToken);
            var saveMode = this.SetMode(LexerMode.XmlCommentText);
            var textTokens = this.pool.Allocate<SyntaxToken>();
            while (this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralToken || this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralNewLineToken || this.CurrentToken.Kind == SyntaxKind.MinusMinusToken) {
                var token = this.EatToken_2098();
                if (token.Kind == SyntaxKind.MinusMinusToken) {
                    token = this.WithXmlParseError_3590(token, XmlParseErrorCode.XML_IncorrectComment);
                }
                textTokens.Add(token);
            }
            var list = textTokens.ToList();
            this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(textTokens));
            var minusMinusGreaterThanToken = this.EatToken_1865(SyntaxKind.XmlCommentEndToken);
            this.ResetMode(saveMode);
            return SyntaxFactory.XmlComment(lessThanExclamationMinusMinusToken, list, minusMinusGreaterThanToken);
        }
        private ParseXmlCDataSection(): XmlCDataSectionSyntax {
            var startCDataToken = this.EatToken_1865(SyntaxKind.XmlCDataStartToken);
            var saveMode = this.SetMode(LexerMode.XmlCDataSectionText);
            var textTokens = new SyntaxListBuilder<SyntaxToken>().ctor_7707(10);
            while (this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralToken || this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralNewLineToken) {
                textTokens.Add(this.EatToken_2098());
            }
            var endCDataToken = this.EatToken_1865(SyntaxKind.XmlCDataEndToken);
            this.ResetMode(saveMode);
            return SyntaxFactory.XmlCDataSection(startCDataToken, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(textTokens), endCDataToken);
        }
        private ParseXmlProcessingInstruction(): XmlProcessingInstructionSyntax {
            var startProcessingInstructionToken = this.EatToken_1865(SyntaxKind.XmlProcessingInstructionStartToken);
            var saveMode = this.SetMode(LexerMode.XmlElementTag);
            var name = this.ParseXmlName();
            this.SetMode(LexerMode.XmlProcessingInstructionText);
            var textTokens = new SyntaxListBuilder<SyntaxToken>().ctor_7707(10);
            while (this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralToken || this.CurrentToken.Kind == SyntaxKind.XmlTextLiteralNewLineToken) {
                var textToken = this.EatToken_2098();
                textTokens.Add(textToken);
            }
            var endProcessingInstructionToken = this.EatToken_1865(SyntaxKind.XmlProcessingInstructionEndToken);
            this.ResetMode(saveMode);
            return SyntaxFactory.XmlProcessingInstruction(startProcessingInstructionToken, name, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SyntaxToken>(textTokens), endProcessingInstructionToken);
        }
        protected  GetExpectedTokenError_1077(expected: SyntaxKind, actual: SyntaxKind, offset: number, length: number): SyntaxDiagnosticInfo {
            if (this.InCref) {
                var rawInfo: SyntaxDiagnosticInfo = super.GetExpectedTokenError_1077(expected, actual, offset, length);
                var crefInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_7359(rawInfo.Offset, rawInfo.Width, ErrorCode.WRN_ErrorOverride, rawInfo, rawInfo.Code);
                return crefInfo;
            }
            switch (expected) {
                case SyntaxKind.IdentifierToken:
                    return new XmlSyntaxDiagnosticInfo().ctor_8171(offset, length, XmlParseErrorCode.XML_ExpectedIdentifier);
                default:
                    return new XmlSyntaxDiagnosticInfo().ctor_8171(offset, length, XmlParseErrorCode.XML_InvalidToken, SyntaxFacts.GetText_3915(actual));
            }
        }
        protected  GetExpectedTokenError_2124(expected: SyntaxKind, actual: SyntaxKind): SyntaxDiagnosticInfo {
            if (this.InCref) {
                var offset: number = 0, width = 0;
                var offset_ref0 = { refObj: offset };
                var width_ref1 = { refObj: width };
                this.GetDiagnosticSpanForMissingToken(offset_ref0, width_ref1);

                offset = offset_ref0.refObj;

                width = width_ref1.refObj;;
                return this.GetExpectedTokenError_1077(expected, actual, offset, width);
            }
            switch (expected) {
                case SyntaxKind.IdentifierToken:
                    return new XmlSyntaxDiagnosticInfo().ctor_5460(XmlParseErrorCode.XML_ExpectedIdentifier);
                default:
                    return new XmlSyntaxDiagnosticInfo().ctor_5460(XmlParseErrorCode.XML_InvalidToken, SyntaxFacts.GetText_3915(actual));
            }
        }
        private WithXmlParseError_9319<TNode extends CSharpSyntaxNode>(node: TNode, code: XmlParseErrorCode): TNode {
            return this.WithAdditionalDiagnostics(node, new XmlSyntaxDiagnosticInfo().ctor_8171(0, node.Width, code));
        }
        private WithXmlParseError_7460<TNode extends CSharpSyntaxNode>(node: TNode, code: XmlParseErrorCode, ...args: string[]): TNode {
            return this.WithAdditionalDiagnostics(node, new XmlSyntaxDiagnosticInfo().ctor_8171(0, node.Width, code, args));
        }
        private WithXmlParseError_1859<TNode>(node: SyntaxToken, code: XmlParseErrorCode): SyntaxToken {
            return this.WithAdditionalDiagnostics(node, new XmlSyntaxDiagnosticInfo().ctor_8171(0, node.Width, code));
        }
        private WithXmlParseError_3590(node: SyntaxToken, code: XmlParseErrorCode, ...args: string[]): SyntaxToken {
            return this.WithAdditionalDiagnostics(node, new XmlSyntaxDiagnosticInfo().ctor_8171(0, node.Width, code, args));
        }
        protected  WithAdditionalDiagnostics<TNode extends CSharpSyntaxNode>(node: TNode, ...diagnostics: DiagnosticInfo[]): TNode {
            return this.Options.DocumentationMode >= DocumentationMode.Diagnose ? super.WithAdditionalDiagnostics_Arr<TNode>(node, diagnostics) : node;
        }
        private ParseCrefAttributeValue(): CrefSyntax {
            var result: CrefSyntax;
            var type: TypeSyntax = this.ParseCrefType(/*typeArgumentsMustBeIdentifiers:*/true,/*checkForMember:*/true);
            if (type == null) {
                result = this.ParseMemberCref();
            }
            else if (this.IsEndOfCrefAttribute) {
                result = SyntaxFactory.TypeCref(type);
            }
            else if (type.Kind != SyntaxKind.QualifiedName && this.CurrentToken.Kind == SyntaxKind.OpenParenToken) {
                var parameters: CrefParameterListSyntax = this.ParseCrefParameterList();
                result = SyntaxFactory.NameMemberCref(type, parameters);
            }
            else {
                var dot: SyntaxToken = this.EatToken_1865(SyntaxKind.DotToken);
                var member: MemberCrefSyntax = this.ParseMemberCref();
                result = SyntaxFactory.QualifiedCref(type, dot, member);
            }
            var needOverallError: boolean = !this.IsEndOfCrefAttribute || result.ContainsDiagnostics;
            if (!this.IsEndOfCrefAttribute) {
                var badTokens = this.pool.Allocate<SyntaxToken>();
                while (!this.IsEndOfCrefAttribute) {
                    badTokens.Add(this.EatToken_2098());
                }
                result = this.AddTrailingSkippedSyntax(result, badTokens.ToListNode());
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(badTokens));
            }
            if (needOverallError) {
                result = this.AddError_7870(result, ErrorCode.WRN_BadXMLRefSyntax, result.ToFullString());
            }
            return result;
        }
        private ConsumeBadTokens(): CSharpSyntaxNode {
            if (this.CurrentToken.Kind == SyntaxKind.BadToken) {
                var badTokens = this.pool.Allocate<SyntaxToken>();
                while (this.CurrentToken.Kind == SyntaxKind.BadToken) {
                    badTokens.Add(this.EatToken_2098());
                }
                var result = badTokens.ToListNode();
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(badTokens));
                return result;
            }
            return null;
        }
        private ParseMemberCref(): MemberCrefSyntax {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.ThisKeyword:
                    return this.ParseIndexerMemberCref();
                case SyntaxKind.OperatorKeyword:
                    return this.ParseOperatorMemberCref();
                case SyntaxKind.ExplicitKeyword:
                case SyntaxKind.ImplicitKeyword:
                    return this.ParseConversionOperatorMemberCref();
                default:
                    return this.ParseNameMemberCref();
            }
        }
        private ParseNameMemberCref(): NameMemberCrefSyntax {
            var name: SimpleNameSyntax = this.ParseCrefName(/*typeArgumentsMustBeIdentifiers:*/true);
            var parameters: CrefParameterListSyntax = this.ParseCrefParameterList();
            return SyntaxFactory.NameMemberCref(name, parameters);
        }
        private ParseIndexerMemberCref(): IndexerMemberCrefSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ThisKeyword);
            var thisKeyword: SyntaxToken = this.EatToken_2098();
            var parameters: CrefBracketedParameterListSyntax = this.ParseBracketedCrefParameterList();
            return SyntaxFactory.IndexerMemberCref(thisKeyword, parameters);
        }
        private ParseOperatorMemberCref(): OperatorMemberCrefSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.OperatorKeyword);
            var operatorKeyword: SyntaxToken = this.EatToken_2098();
            var operatorToken: SyntaxToken;
            if (SyntaxFacts.IsAnyOverloadableOperator(this.CurrentToken.Kind)) {
                operatorToken = this.EatToken_2098();
            }
            else {
                operatorToken = SyntaxFactory.MissingToken_7070(SyntaxKind.PlusToken);
                var offset: number = 0;
                var width: number = 0;
                var offset_ref0 = { refObj: offset };
                var width_ref1 = { refObj: width };
                this.GetDiagnosticSpanForMissingToken(offset_ref0, width_ref1);

                offset = offset_ref0.refObj;

                width = width_ref1.refObj;;
                if (SyntaxFacts.IsUnaryOperatorDeclarationToken(this.CurrentToken.Kind) || SyntaxFacts.IsBinaryExpressionOperatorToken(this.CurrentToken.Kind)) {
                    operatorToken = this.AddTrailingSkippedSyntax(operatorToken, this.EatToken_2098());
                }
                var rawInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_1813(offset, width, ErrorCode.ERR_OvlOperatorExpected);
                var crefInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_7359(offset, width, ErrorCode.WRN_ErrorOverride, rawInfo, rawInfo.Code);
                operatorToken = this.WithAdditionalDiagnostics(operatorToken, crefInfo);
            }
            if (operatorToken.Kind == SyntaxKind.GreaterThanToken && operatorToken.GetTrailingTriviaWidth() == 0 && this.CurrentToken.GetLeadingTriviaWidth() == 0) {
                if (this.CurrentToken.Kind == SyntaxKind.GreaterThanToken) {
                    var operatorToken2 = this.EatToken_2098();
                    operatorToken = SyntaxFactory.Token_6067(operatorToken.GetLeadingTrivia(), SyntaxKind.GreaterThanGreaterThanToken, operatorToken.Text + operatorToken2.Text, operatorToken.ValueText + operatorToken2.ValueText, operatorToken2.GetTrailingTrivia());
                }
                else if (this.CurrentToken.Kind == SyntaxKind.EqualsToken) {
                    var operatorToken2 = this.EatToken_2098();
                    operatorToken = SyntaxFactory.Token_6067(operatorToken.GetLeadingTrivia(), SyntaxKind.GreaterThanEqualsToken, operatorToken.Text + operatorToken2.Text, operatorToken.ValueText + operatorToken2.ValueText, operatorToken2.GetTrailingTrivia());
                }
                else if (this.CurrentToken.Kind == SyntaxKind.GreaterThanEqualsToken) {
                    var operatorToken2 = this.EatToken_2098();
                    var nonOverloadableOperator = SyntaxFactory.Token_6067(operatorToken.GetLeadingTrivia(), SyntaxKind.GreaterThanGreaterThanEqualsToken, operatorToken.Text + operatorToken2.Text, operatorToken.ValueText + operatorToken2.ValueText, operatorToken2.GetTrailingTrivia());
                    operatorToken = SyntaxFactory.MissingToken_7070(SyntaxKind.PlusToken);
                    operatorToken = this.AddTrailingSkippedSyntax(operatorToken, nonOverloadableOperator);
                    var offset: number = 0;
                    var width: number = nonOverloadableOperator.Width;
                    var rawInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_1813(offset, width, ErrorCode.ERR_OvlOperatorExpected);
                    var crefInfo: SyntaxDiagnosticInfo = new SyntaxDiagnosticInfo().ctor_7359(offset, width, ErrorCode.WRN_ErrorOverride, rawInfo, rawInfo.Code);
                    operatorToken = this.WithAdditionalDiagnostics(operatorToken, crefInfo);
                }
            }
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsAnyOverloadableOperator(operatorToken.Kind));
            var parameters: CrefParameterListSyntax = this.ParseCrefParameterList();
            return SyntaxFactory.OperatorMemberCref(operatorKeyword, operatorToken, parameters);
        }
        private ParseConversionOperatorMemberCref(): ConversionOperatorMemberCrefSyntax {
            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind == SyntaxKind.ExplicitKeyword || this.CurrentToken.Kind == SyntaxKind.ImplicitKeyword);
            var implicitOrExplicit: SyntaxToken = this.EatToken_2098();
            var operatorKeyword: SyntaxToken = this.EatToken_1865(SyntaxKind.OperatorKeyword);
            var type: TypeSyntax = this.ParseCrefType(/*typeArgumentsMustBeIdentifiers:*/false, false);
            var parameters: CrefParameterListSyntax = this.ParseCrefParameterList();
            return SyntaxFactory.ConversionOperatorMemberCref(implicitOrExplicit, operatorKeyword, type, parameters);
        }
        private ParseCrefParameterList(): CrefParameterListSyntax {
            return <CrefParameterListSyntax>this.ParseBaseCrefParameterList(/*useSquareBrackets:*/false);
        }
        private ParseBracketedCrefParameterList(): CrefBracketedParameterListSyntax {
            return <CrefBracketedParameterListSyntax>this.ParseBaseCrefParameterList(/*useSquareBrackets:*/true);
        }
        private ParseBaseCrefParameterList(useSquareBrackets: boolean): BaseCrefParameterListSyntax {
            var openKind: SyntaxKind = useSquareBrackets ? SyntaxKind.OpenBracketToken : SyntaxKind.OpenParenToken;
            var closeKind: SyntaxKind = useSquareBrackets ? SyntaxKind.CloseBracketToken : SyntaxKind.CloseParenToken;
            if (this.CurrentToken.Kind != openKind) {
                return null;
            }
            var open: SyntaxToken = this.EatToken_1865(openKind);
            var list = this.pool.AllocateSeparated<CrefParameterSyntax>();
            try
            {
                while (this.CurrentToken.Kind == SyntaxKind.CommaToken || this.IsPossibleCrefParameter) {
                    list.Add(this.ParseCrefParameter());
                    if (this.CurrentToken.Kind != closeKind) {
                        var comma: SyntaxToken = this.EatToken_1865(SyntaxKind.CommaToken);
                        if (!comma.IsMissing || this.IsPossibleCrefParameter) {
                            list.AddSeparator(comma);
                        }
                        else {
                            System.Diagnostics.Debug.Assert(this.CurrentToken.Kind != SyntaxKind.CommaToken);
                        }
                    }
                }
                var close: SyntaxToken = this.EatToken_1865(closeKind);
                return useSquareBrackets ? <BaseCrefParameterListSyntax>SyntaxFactory.CrefBracketedParameterList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterSyntax>(list), close) : SyntaxFactory.CrefParameterList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterSyntax>(list), close);
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private get IsPossibleCrefParameter(): boolean {
            var kind: SyntaxKind = this.CurrentToken.Kind;
            switch (kind) {
                case SyntaxKind.RefKeyword:
                case SyntaxKind.OutKeyword:
                case SyntaxKind.IdentifierToken:
                    return true;
                default:
                    return SyntaxFacts.IsPredefinedType(kind);
            }
        }
        private ParseCrefParameter(): CrefParameterSyntax {
            var refOrOutOpt: SyntaxToken = null;
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.RefKeyword:
                case SyntaxKind.OutKeyword:
                    refOrOutOpt = this.EatToken_2098();
                    break;
            }
            var type: TypeSyntax = this.ParseCrefType(/*typeArgumentsMustBeIdentifiers:*/false, false);
            return SyntaxFactory.CrefParameter(refOrOutOpt, type);
        }
        private ParseCrefName(typeArgumentsMustBeIdentifiers: boolean): SimpleNameSyntax {
            var identifierToken: SyntaxToken = this.EatToken_1865(SyntaxKind.IdentifierToken);
            if (this.CurrentToken.Kind != SyntaxKind.LessThanToken) {
                return SyntaxFactory.IdentifierName(identifierToken);
            }
            var open = this.EatToken_2098();
            var list = this.pool.AllocateSeparated<TypeSyntax>();
            try
            {
                while (true) {
                    var typeSyntax: TypeSyntax = this.ParseCrefType(typeArgumentsMustBeIdentifiers);
                    if (typeArgumentsMustBeIdentifiers && typeSyntax.Kind != SyntaxKind.IdentifierName) {
                        typeSyntax = this.AddError_7870(typeSyntax, ErrorCode.WRN_ErrorOverride, new SyntaxDiagnosticInfo().ctor_2518(ErrorCode.ERR_TypeParamMustBeIdentifier), System.String.Format("{0:d4}", <number>ErrorCode.ERR_TypeParamMustBeIdentifier));
                    }
                    list.Add(typeSyntax);
                    var currentKind = this.CurrentToken.Kind;
                    if (currentKind == SyntaxKind.CommaToken || currentKind == SyntaxKind.IdentifierToken || SyntaxFacts.IsPredefinedType(this.CurrentToken.Kind)) {
                        list.AddSeparator(this.EatToken_1865(SyntaxKind.CommaToken));
                    }
                    else {
                        break;
                    }
                }
                var close: SyntaxToken = this.EatToken_1865(SyntaxKind.GreaterThanToken);
                open = this.CheckFeatureAvailability(open, MessageID.IDS_FeatureGenerics,/*forceWarning:*/true);
                return SyntaxFactory.GenericName(identifierToken, SyntaxFactory.TypeArgumentList(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeSyntax>(list), close));
            }

            finally {
                this.pool.Free_2078(list);
            }
        }
        private ParseCrefType(typeArgumentsMustBeIdentifiers: boolean, checkForMember: boolean = false): TypeSyntax {
            var typeWithoutSuffix: TypeSyntax = this.ParseCrefTypeHelper(typeArgumentsMustBeIdentifiers, checkForMember);
            return typeArgumentsMustBeIdentifiers ? typeWithoutSuffix : this.ParseCrefTypeSuffix(typeWithoutSuffix);
        }
        private ParseCrefTypeHelper(typeArgumentsMustBeIdentifiers: boolean, checkForMember: boolean = false): TypeSyntax {
            var leftName: NameSyntax;
            if (SyntaxFacts.IsPredefinedType(this.CurrentToken.Kind)) {
                return SyntaxFactory.PredefinedType(this.EatToken_2098());
            }
            else if (this.CurrentToken.Kind == SyntaxKind.IdentifierToken && this.PeekToken(1).Kind == SyntaxKind.ColonColonToken) {
                var alias: SyntaxToken = this.EatToken_2098();
                if (alias.ContextualKind == SyntaxKind.GlobalKeyword) {
                    alias = DocumentationCommentParser.ConvertToKeyword(alias);
                }
                alias = this.CheckFeatureAvailability(alias, MessageID.IDS_FeatureGlobalNamespace,/*forceWarning:*/true);
                var colonColon: SyntaxToken = this.EatToken_2098();
                var name: SimpleNameSyntax = this.ParseCrefName(typeArgumentsMustBeIdentifiers);
                leftName = SyntaxFactory.AliasQualifiedName(SyntaxFactory.IdentifierName(alias), colonColon, name);
            }
            else {
                var resetPoint: SyntaxParser.ResetPoint = this.GetResetPoint();
                leftName = this.ParseCrefName(typeArgumentsMustBeIdentifiers);
                if (checkForMember && (leftName.IsMissing || this.CurrentToken.Kind != SyntaxKind.DotToken)) {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Release(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    return null;
                }
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
            }
            while (this.CurrentToken.Kind == SyntaxKind.DotToken) {
                var resetPoint: SyntaxParser.ResetPoint = this.GetResetPoint();
                var dot: SyntaxToken = this.EatToken_2098();
                var rightName: SimpleNameSyntax = this.ParseCrefName(typeArgumentsMustBeIdentifiers);
                if (checkForMember && (rightName.IsMissing || this.CurrentToken.Kind != SyntaxKind.DotToken)) {
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Reset(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    var resetPoint_ref0 = { refObj: resetPoint };
                    this.Release(resetPoint_ref0);

                    resetPoint = resetPoint_ref0.refObj;;
                    return leftName;
                }
                var resetPoint_ref0 = { refObj: resetPoint };
                this.Release(resetPoint_ref0);

                resetPoint = resetPoint_ref0.refObj;;
                leftName = SyntaxFactory.QualifiedName(leftName, dot, rightName);
            }
            return leftName;
        }
        private ParseCrefTypeSuffix(type: TypeSyntax): TypeSyntax {
            if (this.CurrentToken.Kind == SyntaxKind.QuestionToken) {
                type = SyntaxFactory.NullableType(type, this.EatToken_2098());
            }
            while (this.CurrentToken.Kind == SyntaxKind.AsteriskToken) {
                type = SyntaxFactory.PointerType(type, this.EatToken_2098());
            }
            if (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken) {
                var omittedArraySizeExpressionInstance = SyntaxFactory.OmittedArraySizeExpression(SyntaxFactory.Token_1045(SyntaxKind.OmittedArraySizeExpressionToken));
                var rankList = this.pool.Allocate<ArrayRankSpecifierSyntax>();
                try
                {
                    while (this.CurrentToken.Kind == SyntaxKind.OpenBracketToken) {
                        var open: SyntaxToken = this.EatToken_2098();
                        var dimensionList = this.pool.AllocateSeparated<ExpressionSyntax>();
                        try
                        {
                            while (this.CurrentToken.Kind != SyntaxKind.CloseBracketToken) {
                                if (this.CurrentToken.Kind == SyntaxKind.CommaToken) {
                                    dimensionList.Add(omittedArraySizeExpressionInstance);
                                    dimensionList.AddSeparator(this.EatToken_2098());
                                }
                                else {
                                    break;
                                }
                            }
                            if ((dimensionList.Count & 1) == 0) {
                                dimensionList.Add(omittedArraySizeExpressionInstance);
                            }
                            var close = this.EatToken_1865(SyntaxKind.CloseBracketToken);
                            rankList.Add(SyntaxFactory.ArrayRankSpecifier(open, SeparatedSyntaxListBuilder.op_Implicit_4181<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionSyntax>(dimensionList), close));
                        }

                        finally {
                            this.pool.Free_2078(dimensionList);
                        }
                    }
                    type = SyntaxFactory.ArrayType(type, SyntaxListBuilder.op_Implicit_3485<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayRankSpecifierSyntax>(rankList));
                }

                finally {
                    this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(rankList));
                }
            }
            return type;
        }
        private get IsEndOfCrefAttribute(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.SingleQuoteToken:
                    return (this.Mode & LexerMode.XmlCrefQuote) == LexerMode.XmlCrefQuote;
                case SyntaxKind.DoubleQuoteToken:
                    return (this.Mode & LexerMode.XmlCrefDoubleQuote) == LexerMode.XmlCrefDoubleQuote;
                case SyntaxKind.EndOfFileToken:
                case SyntaxKind.EndOfDocumentationCommentToken:
                    return true;
                case SyntaxKind.BadToken:
                    return this.CurrentToken.Text == SyntaxFacts.GetText_3915(SyntaxKind.LessThanToken) || DocumentationCommentParser.IsNonAsciiQuotationMark(this.CurrentToken);
                default:
                    return false;
            }
        }
        private get InCref(): boolean {
            switch (this.Mode & (LexerMode.XmlCrefDoubleQuote | LexerMode.XmlCrefQuote)) {
                case LexerMode.XmlCrefQuote:
                case LexerMode.XmlCrefDoubleQuote:
                    return true;
                default:
                    return false;
            }
        }
        private ParseNameAttributeValue(): IdentifierNameSyntax {
            var identifierToken: SyntaxToken = this.EatToken_1610(SyntaxKind.IdentifierToken,/*reportError:*/false);
            if (!this.IsEndOfNameAttribute) {
                var badTokens = this.pool.Allocate<SyntaxToken>();
                while (!this.IsEndOfNameAttribute) {
                    badTokens.Add(this.EatToken_2098());
                }
                identifierToken = this.AddTrailingSkippedSyntax(identifierToken, badTokens.ToListNode());
                this.pool.Free_1631(SyntaxListBuilder.op_Implicit_1734(badTokens));
            }
            return SyntaxFactory.IdentifierName(identifierToken);
        }
        private get IsEndOfNameAttribute(): boolean {
            switch (this.CurrentToken.Kind) {
                case SyntaxKind.SingleQuoteToken:
                    return (this.Mode & LexerMode.XmlNameQuote) == LexerMode.XmlNameQuote;
                case SyntaxKind.DoubleQuoteToken:
                    return (this.Mode & LexerMode.XmlNameDoubleQuote) == LexerMode.XmlNameDoubleQuote;
                case SyntaxKind.EndOfFileToken:
                case SyntaxKind.EndOfDocumentationCommentToken:
                    return true;
                case SyntaxKind.BadToken:
                    return this.CurrentToken.Text == SyntaxFacts.GetText_3915(SyntaxKind.LessThanToken) || DocumentationCommentParser.IsNonAsciiQuotationMark(this.CurrentToken);
                default:
                    return false;
            }
        }
        constructor() { super(); }
    }
    export module DocumentationCommentParser {
        export enum SkipResult {
            Continue,
            Abort
        }
    }
}
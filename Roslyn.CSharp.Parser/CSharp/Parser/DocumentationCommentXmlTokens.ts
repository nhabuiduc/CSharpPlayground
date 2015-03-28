///<reference path="../Syntax/Internal/Syntax.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class DocumentationCommentXmlTokens {
        private static seeToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.SeeElementName);
        private static codeToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.CodeElementName);
        private static listToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.ListElementName);
        private static paramToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.ParameterElementName);
        private static valueToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.ValueElementName);
        private static exampleToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.ExampleElementName);
        private static includeToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.IncludeElementName);
        private static remarksToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.RemarksElementName);
        private static seealsoToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.SeeAlsoElementName);
        private static summaryToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.SummaryElementName);
        private static exceptionToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.ExceptionElementName);
        private static typeparamToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterElementName);
        private static permissionToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.PermissionElementName);
        private static typeparamrefToken: SyntaxToken = DocumentationCommentXmlTokens.Identifier(Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterReferenceElementName);
        private static crefToken: SyntaxToken = DocumentationCommentXmlTokens.IdentifierWithLeadingSpace(Roslyn.Utilities.DocumentationCommentXmlNames.CrefAttributeName);
        private static fileToken: SyntaxToken = DocumentationCommentXmlTokens.IdentifierWithLeadingSpace(Roslyn.Utilities.DocumentationCommentXmlNames.FileAttributeName);
        private static nameToken: SyntaxToken = DocumentationCommentXmlTokens.IdentifierWithLeadingSpace(Roslyn.Utilities.DocumentationCommentXmlNames.NameAttributeName);
        private static pathToken: SyntaxToken = DocumentationCommentXmlTokens.IdentifierWithLeadingSpace(Roslyn.Utilities.DocumentationCommentXmlNames.PathAttributeName);
        private static typeToken: SyntaxToken = DocumentationCommentXmlTokens.IdentifierWithLeadingSpace(Roslyn.Utilities.DocumentationCommentXmlNames.TypeAttributeName);
        private static Identifier(text: string): SyntaxToken {
            return SyntaxFactory.Identifier_1121(SyntaxKind.None, null, text, text,/*trailing:*/null);
        }
        private static IdentifierWithLeadingSpace(text: string): SyntaxToken {
            return SyntaxFactory.Identifier_1121(SyntaxKind.None, SyntaxFactory.Space, text, text,/*trailing:*/null);
        }
        private static IsSingleSpaceTrivia(syntax: SyntaxListBaseBuilder): boolean {
            return syntax.Count == 1 && SyntaxFactory.Space.IsEquivalentTo(syntax.$get$(0));
        }
        public static LookupToken(text: string, leading: SyntaxListBaseBuilder): SyntaxToken {
            if (leading == null) {
                return DocumentationCommentXmlTokens.LookupXmlElementTag(text);
            }
            if (DocumentationCommentXmlTokens.IsSingleSpaceTrivia(leading)) {
                return DocumentationCommentXmlTokens.LookupXmlAttribute(text);
            }
            return null;
        }
        private static LookupXmlElementTag(text: string): SyntaxToken {
            switch (text.length) {
                case 3:
                    if (text == Roslyn.Utilities.DocumentationCommentXmlNames.SeeElementName) {
                        return DocumentationCommentXmlTokens.seeToken;
                    }
                    break;
                case 4:
                    switch (text) {
                        case Roslyn.Utilities.DocumentationCommentXmlNames.CodeElementName:
                            return DocumentationCommentXmlTokens.codeToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.ListElementName:
                            return DocumentationCommentXmlTokens.listToken;
                    }
                    break;
                case 5:
                    switch (text) {
                        case Roslyn.Utilities.DocumentationCommentXmlNames.ParameterElementName:
                            return DocumentationCommentXmlTokens.paramToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.ValueElementName:
                            return DocumentationCommentXmlTokens.valueToken;
                    }
                    break;
                case 7:
                    switch (text) {
                        case Roslyn.Utilities.DocumentationCommentXmlNames.ExampleElementName:
                            return DocumentationCommentXmlTokens.exampleToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.IncludeElementName:
                            return DocumentationCommentXmlTokens.includeToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.RemarksElementName:
                            return DocumentationCommentXmlTokens.remarksToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.SeeAlsoElementName:
                            return DocumentationCommentXmlTokens.seealsoToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.SummaryElementName:
                            return DocumentationCommentXmlTokens.summaryToken;
                    }
                    break;
                case 9:
                    switch (text) {
                        case Roslyn.Utilities.DocumentationCommentXmlNames.ExceptionElementName:
                            return DocumentationCommentXmlTokens.exceptionToken;
                        case Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterElementName:
                            return DocumentationCommentXmlTokens.typeparamToken;
                    }
                    break;
                case 10:
                    if (text == Roslyn.Utilities.DocumentationCommentXmlNames.PermissionElementName) {
                        return DocumentationCommentXmlTokens.permissionToken;
                    }
                    break;
                case 12:
                    if (text == Roslyn.Utilities.DocumentationCommentXmlNames.TypeParameterElementName) {
                        return DocumentationCommentXmlTokens.typeparamrefToken;
                    }
                    break;
            }
            return null;
        }
        private static LookupXmlAttribute(text: string): SyntaxToken {
            if (text.length != 4) {
                return null;
            }
            switch (text) {
                case Roslyn.Utilities.DocumentationCommentXmlNames.CrefAttributeName:
                    return DocumentationCommentXmlTokens.crefToken;
                case Roslyn.Utilities.DocumentationCommentXmlNames.FileAttributeName:
                    return DocumentationCommentXmlTokens.fileToken;
                case Roslyn.Utilities.DocumentationCommentXmlNames.NameAttributeName:
                    return DocumentationCommentXmlTokens.nameToken;
                case Roslyn.Utilities.DocumentationCommentXmlNames.PathAttributeName:
                    return DocumentationCommentXmlTokens.pathToken;
                case Roslyn.Utilities.DocumentationCommentXmlNames.TypeAttributeName:
                    return DocumentationCommentXmlTokens.typeToken;
            }
            return null;
        }
    }
}
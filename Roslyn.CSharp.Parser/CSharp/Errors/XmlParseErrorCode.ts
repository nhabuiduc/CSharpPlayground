module Microsoft.CodeAnalysis.CSharp {
    export enum XmlParseErrorCode {
        XML_RefUndefinedEntity_1,
        XML_InvalidCharEntity,
        XML_InvalidUnicodeChar,
        XML_InvalidWhitespace,
        XML_MissingEqualsAttribute,
        XML_StringLiteralNoStartQuote,
        XML_StringLiteralNoEndQuote,
        XML_StringLiteralNonAsciiQuote,
        XML_LessThanInAttributeValue,
        XML_IncorrectComment,
        XML_ElementTypeMatch,
        XML_DuplicateAttribute,
        XML_WhitespaceMissing,
        XML_EndTagNotExpected,
        XML_CDataEndTagNotAllowed,
        XML_EndTagExpected,
        XML_ExpectedIdentifier,
        XML_ExpectedEndOfTag,
        XML_InvalidToken,
        XML_ExpectedEndOfXml
    }
}
﻿module Microsoft.CodeAnalysis.CSharp {
    export class SyntaxFacts {
        public static IsKeywordKind(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsReservedKeyword(kind) || SyntaxFacts.IsContextualKeyword(kind);
        }
        public static GetReservedKeywordKinds(): System.Collections.Generic.IEnumerable<SyntaxKind> {
            var __result = new Array<SyntaxKind>();
            for (var i: number = <number>SyntaxKind.BoolKeyword; i <= <number>SyntaxKind.ImplicitKeyword; i++) {
                __result.push(<SyntaxKind>i);
                //yield return (SyntaxKind)i;
            }
            return __result;
        }
        public static GetKeywordKinds(): System.Collections.Generic.IEnumerable<SyntaxKind> {
            var __result = new Array<SyntaxKind>();
            // for each
            var reservedEnumerator = SyntaxFacts.GetReservedKeywordKinds().GetEnumerator();
            try {
                while (reservedEnumerator.MoveNext()) {
                    var reserved = reservedEnumerator.Current;
                    // foreach block
                    __result.push(reserved);
                    //yield return reserved;
                }
            } finally {
                if (reservedEnumerator !== null) reservedEnumerator.Dispose();

            }    
            // end foreach
            // for each
            var contextualEnumerator = SyntaxFacts.GetContextualKeywordKinds().GetEnumerator();
            try {
                while (contextualEnumerator.MoveNext()) {
                    var contextual = contextualEnumerator.Current;
                    // foreach block
                    __result.push(contextual);
                    //yield return contextual;
                }
            } finally {
                if (contextualEnumerator !== null) contextualEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public static IsReservedKeyword(kind: SyntaxKind): boolean {
            return kind >= SyntaxKind.BoolKeyword && kind <= SyntaxKind.ImplicitKeyword;
        }
        public static IsAttributeTargetSpecifier(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.AssemblyKeyword:
                case SyntaxKind.ModuleKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsAccessibilityModifier(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.InternalKeyword:
                case SyntaxKind.PublicKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsPreprocessorKeyword(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.DefaultKeyword:
                case SyntaxKind.IfKeyword:
                case SyntaxKind.ElseKeyword:
                case SyntaxKind.ElifKeyword:
                case SyntaxKind.EndIfKeyword:
                case SyntaxKind.RegionKeyword:
                case SyntaxKind.EndRegionKeyword:
                case SyntaxKind.DefineKeyword:
                case SyntaxKind.UndefKeyword:
                case SyntaxKind.WarningKeyword:
                case SyntaxKind.ErrorKeyword:
                case SyntaxKind.LineKeyword:
                case SyntaxKind.PragmaKeyword:
                case SyntaxKind.HiddenKeyword:
                case SyntaxKind.ChecksumKeyword:
                case SyntaxKind.DisableKeyword:
                case SyntaxKind.RestoreKeyword:
                case SyntaxKind.ReferenceKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsPreprocessorContextualKeyword(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.DefaultKeyword:
                case SyntaxKind.HiddenKeyword:
                case SyntaxKind.ChecksumKeyword:
                case SyntaxKind.DisableKeyword:
                case SyntaxKind.RestoreKeyword:
                    return false;
                default:
                    return SyntaxFacts.IsPreprocessorKeyword(kind);
            }
        }
        public static GetPreprocessorKeywordKinds(): System.Collections.Generic.IEnumerable<SyntaxKind> {
            var __result = new Array<SyntaxKind>();
            __result.push(SyntaxKind.TrueKeyword);
            //yield return SyntaxKind.TrueKeyword;
            __result.push(SyntaxKind.FalseKeyword);
            //yield return SyntaxKind.FalseKeyword;
            __result.push(SyntaxKind.DefaultKeyword);
            //yield return SyntaxKind.DefaultKeyword;
            __result.push(SyntaxKind.HiddenKeyword);
            //yield return SyntaxKind.HiddenKeyword;
            for (var i: number = <number>SyntaxKind.ElifKeyword; i <= <number>SyntaxKind.RestoreKeyword; i++) {
                __result.push(<SyntaxKind>i);
                //yield return (SyntaxKind)i;
            }
            return __result;
        }
        public static IsPunctuation(kind: SyntaxKind): boolean {
            return kind >= SyntaxKind.TildeToken && kind <= SyntaxKind.PercentEqualsToken;
        }
        public static IsLanguagePunctuation(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsPunctuation(kind) && !SyntaxFacts.IsPreprocessorKeyword(kind) && !SyntaxFacts.IsDebuggerSpecialPunctuation(kind);
        }
        public static IsPreprocessorPunctuation(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.HashToken;
        }
        private static IsDebuggerSpecialPunctuation(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.DollarToken;
        }
        public static GetPunctuationKinds(): System.Collections.Generic.IEnumerable<SyntaxKind> {
            var __result = new Array<SyntaxKind>();
            for (var i: number = <number>SyntaxKind.TildeToken; i <= <number>SyntaxKind.PercentEqualsToken; i++) {
                __result.push(<SyntaxKind>i);
                //yield return (SyntaxKind)i;
            }
            return __result;
        }
        public static IsPunctuationOrKeyword(kind: SyntaxKind): boolean {
            return kind >= SyntaxKind.TildeToken && kind <= SyntaxKind.EndOfFileToken;
        }
        public static IsLiteral(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.IdentifierToken:
                case SyntaxKind.StringLiteralToken:
                case SyntaxKind.CharacterLiteralToken:
                case SyntaxKind.NumericLiteralToken:
                case SyntaxKind.XmlTextLiteralToken:
                case SyntaxKind.XmlTextLiteralNewLineToken:
                case SyntaxKind.XmlEntityLiteralToken:
                    return true;
                default:
                    return false;
            }
        }
        public static IsAnyToken(kind: SyntaxKind): boolean {
            if (kind >= SyntaxKind.TildeToken && kind < SyntaxKind.EndOfLineTrivia)
                return true;
            switch (kind) {
                case SyntaxKind.InterpolatedStringToken:
                case SyntaxKind.InterpolatedStringStartToken:
                case SyntaxKind.InterpolatedStringMidToken:
                case SyntaxKind.InterpolatedStringEndToken:
                    return true;
                default:
                    return false;
            }
        }
        public static IsTrivia(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.EndOfLineTrivia:
                case SyntaxKind.WhitespaceTrivia:
                case SyntaxKind.SingleLineCommentTrivia:
                case SyntaxKind.MultiLineCommentTrivia:
                case SyntaxKind.SingleLineDocumentationCommentTrivia:
                case SyntaxKind.MultiLineDocumentationCommentTrivia:
                case SyntaxKind.DisabledTextTrivia:
                case SyntaxKind.DocumentationCommentExteriorTrivia:
                    return true;
                default:
                    return SyntaxFacts.IsPreprocessorDirective(kind);
            }
        }
        public static IsPreprocessorDirective(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.IfDirectiveTrivia:
                case SyntaxKind.ElifDirectiveTrivia:
                case SyntaxKind.ElseDirectiveTrivia:
                case SyntaxKind.EndIfDirectiveTrivia:
                case SyntaxKind.RegionDirectiveTrivia:
                case SyntaxKind.EndRegionDirectiveTrivia:
                case SyntaxKind.DefineDirectiveTrivia:
                case SyntaxKind.UndefDirectiveTrivia:
                case SyntaxKind.ErrorDirectiveTrivia:
                case SyntaxKind.WarningDirectiveTrivia:
                case SyntaxKind.LineDirectiveTrivia:
                case SyntaxKind.PragmaWarningDirectiveTrivia:
                case SyntaxKind.PragmaChecksumDirectiveTrivia:
                case SyntaxKind.ReferenceDirectiveTrivia:
                case SyntaxKind.BadDirectiveTrivia:
                    return true;
                default:
                    return false;
            }
        }
        public static IsName(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.IdentifierName:
                case SyntaxKind.GenericName:
                case SyntaxKind.QualifiedName:
                case SyntaxKind.AliasQualifiedName:
                    return true;
                default:
                    return false;
            }
        }
        public static IsPredefinedType(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.BoolKeyword:
                case SyntaxKind.ByteKeyword:
                case SyntaxKind.SByteKeyword:
                case SyntaxKind.IntKeyword:
                case SyntaxKind.UIntKeyword:
                case SyntaxKind.ShortKeyword:
                case SyntaxKind.UShortKeyword:
                case SyntaxKind.LongKeyword:
                case SyntaxKind.ULongKeyword:
                case SyntaxKind.FloatKeyword:
                case SyntaxKind.DoubleKeyword:
                case SyntaxKind.DecimalKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.CharKeyword:
                case SyntaxKind.ObjectKeyword:
                case SyntaxKind.VoidKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsTypeSyntax(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ArrayType:
                case SyntaxKind.PointerType:
                case SyntaxKind.NullableType:
                case SyntaxKind.PredefinedType:
                    return true;
                default:
                    return SyntaxFacts.IsName(kind);
            }
        }
        public static IsTypeDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.DelegateDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.StructDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                    return true;
                default:
                    return false;
            }
        }
        public static IsGlobalMemberDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.GlobalStatement:
                case SyntaxKind.FieldDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.EventDeclaration:
                case SyntaxKind.EventFieldDeclaration:
                    return true;
            }
            return false;
        }
        public static IsNamespaceMemberDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.StructDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.DelegateDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.NamespaceDeclaration:
                    return true;
                default:
                    return false;
            }
        }
        public static IsAnyUnaryExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.IsPrefixUnaryExpression(token) || SyntaxFacts.IsPostfixUnaryExpression(token);
        }
        public static IsPrefixUnaryExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.GetPrefixUnaryExpression(token) != SyntaxKind.None;
        }
        public static IsPrefixUnaryExpressionOperatorToken(token: SyntaxKind): boolean {
            return SyntaxFacts.GetPrefixUnaryExpression(token) != SyntaxKind.None;
        }
        public static GetPrefixUnaryExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.PlusToken:
                    return SyntaxKind.UnaryPlusExpression;
                case SyntaxKind.MinusToken:
                    return SyntaxKind.UnaryMinusExpression;
                case SyntaxKind.TildeToken:
                    return SyntaxKind.BitwiseNotExpression;
                case SyntaxKind.ExclamationToken:
                    return SyntaxKind.LogicalNotExpression;
                case SyntaxKind.PlusPlusToken:
                    return SyntaxKind.PreIncrementExpression;
                case SyntaxKind.MinusMinusToken:
                    return SyntaxKind.PreDecrementExpression;
                case SyntaxKind.AmpersandToken:
                    return SyntaxKind.AddressOfExpression;
                case SyntaxKind.AsteriskToken:
                    return SyntaxKind.PointerIndirectionExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsPostfixUnaryExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.GetPostfixUnaryExpression(token) != SyntaxKind.None;
        }
        public static IsPostfixUnaryExpressionToken(token: SyntaxKind): boolean {
            return SyntaxFacts.GetPostfixUnaryExpression(token) != SyntaxKind.None;
        }
        public static GetPostfixUnaryExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.PlusPlusToken:
                    return SyntaxKind.PostIncrementExpression;
                case SyntaxKind.MinusMinusToken:
                    return SyntaxKind.PostDecrementExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsUnaryOperatorDeclarationToken(token: SyntaxKind): boolean {
            return SyntaxFacts.IsPrefixUnaryExpressionOperatorToken(token) || token == SyntaxKind.TrueKeyword || token == SyntaxKind.FalseKeyword;
        }
        public static IsAnyOverloadableOperator(kind: SyntaxKind): boolean {
            return SyntaxFacts.IsOverloadableBinaryOperator(kind) || SyntaxFacts.IsOverloadableUnaryOperator(kind);
        }
        public static IsOverloadableBinaryOperator(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.PercentToken:
                case SyntaxKind.CaretToken:
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.GreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.ExclamationEqualsToken:
                    return true;
                default:
                    return false;
            }
        }
        public static IsOverloadableUnaryOperator(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsPrimaryFunction(keyword: SyntaxKind): boolean {
            return SyntaxFacts.GetPrimaryFunction(keyword) != SyntaxKind.None;
        }
        public static GetPrimaryFunction(keyword: SyntaxKind): SyntaxKind {
            switch (keyword) {
                case SyntaxKind.MakeRefKeyword:
                    return SyntaxKind.MakeRefExpression;
                case SyntaxKind.RefTypeKeyword:
                    return SyntaxKind.RefTypeExpression;
                case SyntaxKind.RefValueKeyword:
                    return SyntaxKind.RefValueExpression;
                case SyntaxKind.CheckedKeyword:
                    return SyntaxKind.CheckedExpression;
                case SyntaxKind.UncheckedKeyword:
                    return SyntaxKind.UncheckedExpression;
                case SyntaxKind.DefaultKeyword:
                    return SyntaxKind.DefaultExpression;
                case SyntaxKind.TypeOfKeyword:
                    return SyntaxKind.TypeOfExpression;
                case SyntaxKind.SizeOfKeyword:
                    return SyntaxKind.SizeOfExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsLiteralExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.GetLiteralExpression(token) != SyntaxKind.None;
        }
        public static GetLiteralExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.StringLiteralToken:
                    return SyntaxKind.StringLiteralExpression;
                case SyntaxKind.CharacterLiteralToken:
                    return SyntaxKind.CharacterLiteralExpression;
                case SyntaxKind.NumericLiteralToken:
                    return SyntaxKind.NumericLiteralExpression;
                case SyntaxKind.NullKeyword:
                    return SyntaxKind.NullLiteralExpression;
                case SyntaxKind.TrueKeyword:
                    return SyntaxKind.TrueLiteralExpression;
                case SyntaxKind.FalseKeyword:
                    return SyntaxKind.FalseLiteralExpression;
                case SyntaxKind.ArgListKeyword:
                    return SyntaxKind.ArgListExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsInstanceExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.GetInstanceExpression(token) != SyntaxKind.None;
        }
        public static GetInstanceExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.ThisKeyword:
                    return SyntaxKind.ThisExpression;
                case SyntaxKind.BaseKeyword:
                    return SyntaxKind.BaseExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsBinaryExpression(token: SyntaxKind): boolean {
            return SyntaxFacts.GetBinaryExpression(token) != SyntaxKind.None;
        }
        public static IsBinaryExpressionOperatorToken(token: SyntaxKind): boolean {
            return SyntaxFacts.GetBinaryExpression(token) != SyntaxKind.None;
        }
        public static GetBinaryExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.QuestionQuestionToken:
                    return SyntaxKind.CoalesceExpression;
                case SyntaxKind.IsKeyword:
                    return SyntaxKind.IsExpression;
                case SyntaxKind.AsKeyword:
                    return SyntaxKind.AsExpression;
                case SyntaxKind.BarToken:
                    return SyntaxKind.BitwiseOrExpression;
                case SyntaxKind.CaretToken:
                    return SyntaxKind.ExclusiveOrExpression;
                case SyntaxKind.AmpersandToken:
                    return SyntaxKind.BitwiseAndExpression;
                case SyntaxKind.EqualsEqualsToken:
                    return SyntaxKind.EqualsExpression;
                case SyntaxKind.ExclamationEqualsToken:
                    return SyntaxKind.NotEqualsExpression;
                case SyntaxKind.LessThanToken:
                    return SyntaxKind.LessThanExpression;
                case SyntaxKind.LessThanEqualsToken:
                    return SyntaxKind.LessThanOrEqualExpression;
                case SyntaxKind.GreaterThanToken:
                    return SyntaxKind.GreaterThanExpression;
                case SyntaxKind.GreaterThanEqualsToken:
                    return SyntaxKind.GreaterThanOrEqualExpression;
                case SyntaxKind.LessThanLessThanToken:
                    return SyntaxKind.LeftShiftExpression;
                case SyntaxKind.GreaterThanGreaterThanToken:
                    return SyntaxKind.RightShiftExpression;
                case SyntaxKind.PlusToken:
                    return SyntaxKind.AddExpression;
                case SyntaxKind.MinusToken:
                    return SyntaxKind.SubtractExpression;
                case SyntaxKind.AsteriskToken:
                    return SyntaxKind.MultiplyExpression;
                case SyntaxKind.SlashToken:
                    return SyntaxKind.DivideExpression;
                case SyntaxKind.PercentToken:
                    return SyntaxKind.ModuloExpression;
                case SyntaxKind.AmpersandAmpersandToken:
                    return SyntaxKind.LogicalAndExpression;
                case SyntaxKind.BarBarToken:
                    return SyntaxKind.LogicalOrExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsAssignmentExpression(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.OrAssignmentExpression:
                case SyntaxKind.AndAssignmentExpression:
                case SyntaxKind.ExclusiveOrAssignmentExpression:
                case SyntaxKind.LeftShiftAssignmentExpression:
                case SyntaxKind.RightShiftAssignmentExpression:
                case SyntaxKind.AddAssignmentExpression:
                case SyntaxKind.SubtractAssignmentExpression:
                case SyntaxKind.MultiplyAssignmentExpression:
                case SyntaxKind.DivideAssignmentExpression:
                case SyntaxKind.ModuloAssignmentExpression:
                case SyntaxKind.SimpleAssignmentExpression:
                    return true;
                default:
                    return false;
            }
        }
        public static IsAssignmentExpressionOperatorToken(token: SyntaxKind): boolean {
            switch (token) {
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.EqualsToken:
                    return true;
                default:
                    return false;
            }
        }
        public static GetAssignmentExpression(token: SyntaxKind): SyntaxKind {
            switch (token) {
                case SyntaxKind.BarEqualsToken:
                    return SyntaxKind.OrAssignmentExpression;
                case SyntaxKind.AmpersandEqualsToken:
                    return SyntaxKind.AndAssignmentExpression;
                case SyntaxKind.CaretEqualsToken:
                    return SyntaxKind.ExclusiveOrAssignmentExpression;
                case SyntaxKind.LessThanLessThanEqualsToken:
                    return SyntaxKind.LeftShiftAssignmentExpression;
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    return SyntaxKind.RightShiftAssignmentExpression;
                case SyntaxKind.PlusEqualsToken:
                    return SyntaxKind.AddAssignmentExpression;
                case SyntaxKind.MinusEqualsToken:
                    return SyntaxKind.SubtractAssignmentExpression;
                case SyntaxKind.AsteriskEqualsToken:
                    return SyntaxKind.MultiplyAssignmentExpression;
                case SyntaxKind.SlashEqualsToken:
                    return SyntaxKind.DivideAssignmentExpression;
                case SyntaxKind.PercentEqualsToken:
                    return SyntaxKind.ModuloAssignmentExpression;
                case SyntaxKind.EqualsToken:
                    return SyntaxKind.SimpleAssignmentExpression;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetCheckStatement(keyword: SyntaxKind): SyntaxKind {
            switch (keyword) {
                case SyntaxKind.CheckedKeyword:
                    return SyntaxKind.CheckedStatement;
                case SyntaxKind.UncheckedKeyword:
                    return SyntaxKind.UncheckedStatement;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetAccessorDeclarationKind(keyword: SyntaxKind): SyntaxKind {
            switch (keyword) {
                case SyntaxKind.GetKeyword:
                    return SyntaxKind.GetAccessorDeclaration;
                case SyntaxKind.SetKeyword:
                    return SyntaxKind.SetAccessorDeclaration;
                case SyntaxKind.AddKeyword:
                    return SyntaxKind.AddAccessorDeclaration;
                case SyntaxKind.RemoveKeyword:
                    return SyntaxKind.RemoveAccessorDeclaration;
                default:
                    return SyntaxKind.None;
            }
        }
        public static IsAccessorDeclaration(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.GetAccessorDeclaration:
                case SyntaxKind.SetAccessorDeclaration:
                case SyntaxKind.AddAccessorDeclaration:
                case SyntaxKind.RemoveAccessorDeclaration:
                    return true;
                default:
                    return false;
            }
        }
        public static IsAccessorDeclarationKeyword(keyword: SyntaxKind): boolean {
            switch (keyword) {
                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                case SyntaxKind.AddKeyword:
                case SyntaxKind.RemoveKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static GetSwitchLabelKind(keyword: SyntaxKind): SyntaxKind {
            switch (keyword) {
                case SyntaxKind.CaseKeyword:
                    return SyntaxKind.CaseSwitchLabel;
                case SyntaxKind.DefaultKeyword:
                    return SyntaxKind.DefaultSwitchLabel;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetBaseTypeDeclarationKind(kind: SyntaxKind): SyntaxKind {
            return kind == SyntaxKind.EnumKeyword ? SyntaxKind.EnumDeclaration : SyntaxFacts.GetTypeDeclarationKind(kind);
        }
        public static GetTypeDeclarationKind(kind: SyntaxKind): SyntaxKind {
            switch (kind) {
                case SyntaxKind.ClassKeyword:
                    return SyntaxKind.ClassDeclaration;
                case SyntaxKind.StructKeyword:
                    return SyntaxKind.StructDeclaration;
                case SyntaxKind.InterfaceKeyword:
                    return SyntaxKind.InterfaceDeclaration;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetKeywordKind(text: string): SyntaxKind {
            switch (text) {
                case "bool":
                    return SyntaxKind.BoolKeyword;
                case "byte":
                    return SyntaxKind.ByteKeyword;
                case "sbyte":
                    return SyntaxKind.SByteKeyword;
                case "short":
                    return SyntaxKind.ShortKeyword;
                case "ushort":
                    return SyntaxKind.UShortKeyword;
                case "int":
                    return SyntaxKind.IntKeyword;
                case "uint":
                    return SyntaxKind.UIntKeyword;
                case "long":
                    return SyntaxKind.LongKeyword;
                case "ulong":
                    return SyntaxKind.ULongKeyword;
                case "double":
                    return SyntaxKind.DoubleKeyword;
                case "float":
                    return SyntaxKind.FloatKeyword;
                case "decimal":
                    return SyntaxKind.DecimalKeyword;
                case "string":
                    return SyntaxKind.StringKeyword;
                case "char":
                    return SyntaxKind.CharKeyword;
                case "void":
                    return SyntaxKind.VoidKeyword;
                case "object":
                    return SyntaxKind.ObjectKeyword;
                case "typeof":
                    return SyntaxKind.TypeOfKeyword;
                case "sizeof":
                    return SyntaxKind.SizeOfKeyword;
                case "null":
                    return SyntaxKind.NullKeyword;
                case "true":
                    return SyntaxKind.TrueKeyword;
                case "false":
                    return SyntaxKind.FalseKeyword;
                case "if":
                    return SyntaxKind.IfKeyword;
                case "else":
                    return SyntaxKind.ElseKeyword;
                case "while":
                    return SyntaxKind.WhileKeyword;
                case "for":
                    return SyntaxKind.ForKeyword;
                case "foreach":
                    return SyntaxKind.ForEachKeyword;
                case "do":
                    return SyntaxKind.DoKeyword;
                case "switch":
                    return SyntaxKind.SwitchKeyword;
                case "case":
                    return SyntaxKind.CaseKeyword;
                case "default":
                    return SyntaxKind.DefaultKeyword;
                case "lock":
                    return SyntaxKind.LockKeyword;
                case "try":
                    return SyntaxKind.TryKeyword;
                case "throw":
                    return SyntaxKind.ThrowKeyword;
                case "catch":
                    return SyntaxKind.CatchKeyword;
                case "finally":
                    return SyntaxKind.FinallyKeyword;
                case "goto":
                    return SyntaxKind.GotoKeyword;
                case "break":
                    return SyntaxKind.BreakKeyword;
                case "continue":
                    return SyntaxKind.ContinueKeyword;
                case "return":
                    return SyntaxKind.ReturnKeyword;
                case "public":
                    return SyntaxKind.PublicKeyword;
                case "private":
                    return SyntaxKind.PrivateKeyword;
                case "internal":
                    return SyntaxKind.InternalKeyword;
                case "protected":
                    return SyntaxKind.ProtectedKeyword;
                case "static":
                    return SyntaxKind.StaticKeyword;
                case "readonly":
                    return SyntaxKind.ReadOnlyKeyword;
                case "sealed":
                    return SyntaxKind.SealedKeyword;
                case "const":
                    return SyntaxKind.ConstKeyword;
                case "fixed":
                    return SyntaxKind.FixedKeyword;
                case "stackalloc":
                    return SyntaxKind.StackAllocKeyword;
                case "volatile":
                    return SyntaxKind.VolatileKeyword;
                case "new":
                    return SyntaxKind.NewKeyword;
                case "override":
                    return SyntaxKind.OverrideKeyword;
                case "abstract":
                    return SyntaxKind.AbstractKeyword;
                case "virtual":
                    return SyntaxKind.VirtualKeyword;
                case "event":
                    return SyntaxKind.EventKeyword;
                case "extern":
                    return SyntaxKind.ExternKeyword;
                case "ref":
                    return SyntaxKind.RefKeyword;
                case "out":
                    return SyntaxKind.OutKeyword;
                case "in":
                    return SyntaxKind.InKeyword;
                case "is":
                    return SyntaxKind.IsKeyword;
                case "as":
                    return SyntaxKind.AsKeyword;
                case "params":
                    return SyntaxKind.ParamsKeyword;
                case "__arglist":
                    return SyntaxKind.ArgListKeyword;
                case "__makeref":
                    return SyntaxKind.MakeRefKeyword;
                case "__reftype":
                    return SyntaxKind.RefTypeKeyword;
                case "__refvalue":
                    return SyntaxKind.RefValueKeyword;
                case "this":
                    return SyntaxKind.ThisKeyword;
                case "base":
                    return SyntaxKind.BaseKeyword;
                case "namespace":
                    return SyntaxKind.NamespaceKeyword;
                case "using":
                    return SyntaxKind.UsingKeyword;
                case "class":
                    return SyntaxKind.ClassKeyword;
                case "struct":
                    return SyntaxKind.StructKeyword;
                case "interface":
                    return SyntaxKind.InterfaceKeyword;
                case "enum":
                    return SyntaxKind.EnumKeyword;
                case "delegate":
                    return SyntaxKind.DelegateKeyword;
                case "checked":
                    return SyntaxKind.CheckedKeyword;
                case "unchecked":
                    return SyntaxKind.UncheckedKeyword;
                case "unsafe":
                    return SyntaxKind.UnsafeKeyword;
                case "operator":
                    return SyntaxKind.OperatorKeyword;
                case "implicit":
                    return SyntaxKind.ImplicitKeyword;
                case "explicit":
                    return SyntaxKind.ExplicitKeyword;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetOperatorKind(operatorMetadataName: string): SyntaxKind {
            switch (operatorMetadataName) {
                case WellKnownMemberNames.AdditionOperatorName:
                    return SyntaxKind.PlusToken;
                case WellKnownMemberNames.BitwiseAndOperatorName:
                    return SyntaxKind.AmpersandToken;
                case WellKnownMemberNames.BitwiseOrOperatorName:
                    return SyntaxKind.BarToken;
                case WellKnownMemberNames.DecrementOperatorName:
                    return SyntaxKind.MinusMinusToken;
                case WellKnownMemberNames.DivisionOperatorName:
                    return SyntaxKind.SlashToken;
                case WellKnownMemberNames.EqualityOperatorName:
                    return SyntaxKind.EqualsEqualsToken;
                case WellKnownMemberNames.ExclusiveOrOperatorName:
                    return SyntaxKind.CaretToken;
                case WellKnownMemberNames.ExplicitConversionName:
                    return SyntaxKind.ExplicitKeyword;
                case WellKnownMemberNames.FalseOperatorName:
                    return SyntaxKind.FalseKeyword;
                case WellKnownMemberNames.GreaterThanOperatorName:
                    return SyntaxKind.GreaterThanToken;
                case WellKnownMemberNames.GreaterThanOrEqualOperatorName:
                    return SyntaxKind.GreaterThanEqualsToken;
                case WellKnownMemberNames.ImplicitConversionName:
                    return SyntaxKind.ImplicitKeyword;
                case WellKnownMemberNames.IncrementOperatorName:
                    return SyntaxKind.PlusPlusToken;
                case WellKnownMemberNames.InequalityOperatorName:
                    return SyntaxKind.ExclamationEqualsToken;
                case WellKnownMemberNames.LeftShiftOperatorName:
                    return SyntaxKind.LessThanLessThanToken;
                case WellKnownMemberNames.LessThanOperatorName:
                    return SyntaxKind.LessThanToken;
                case WellKnownMemberNames.LessThanOrEqualOperatorName:
                    return SyntaxKind.LessThanEqualsToken;
                case WellKnownMemberNames.LogicalNotOperatorName:
                    return SyntaxKind.ExclamationToken;
                case WellKnownMemberNames.ModulusOperatorName:
                    return SyntaxKind.PercentToken;
                case WellKnownMemberNames.MultiplyOperatorName:
                    return SyntaxKind.AsteriskToken;
                case WellKnownMemberNames.OnesComplementOperatorName:
                    return SyntaxKind.TildeToken;
                case WellKnownMemberNames.RightShiftOperatorName:
                    return SyntaxKind.GreaterThanGreaterThanToken;
                case WellKnownMemberNames.SubtractionOperatorName:
                    return SyntaxKind.MinusToken;
                case WellKnownMemberNames.TrueOperatorName:
                    return SyntaxKind.TrueKeyword;
                case WellKnownMemberNames.UnaryNegationOperatorName:
                    return SyntaxKind.MinusToken;
                case WellKnownMemberNames.UnaryPlusOperatorName:
                    return SyntaxKind.PlusToken;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetPreprocessorKeywordKind(text: string): SyntaxKind {
            switch (text) {
                case "true":
                    return SyntaxKind.TrueKeyword;
                case "false":
                    return SyntaxKind.FalseKeyword;
                case "default":
                    return SyntaxKind.DefaultKeyword;
                case "if":
                    return SyntaxKind.IfKeyword;
                case "else":
                    return SyntaxKind.ElseKeyword;
                case "elif":
                    return SyntaxKind.ElifKeyword;
                case "endif":
                    return SyntaxKind.EndIfKeyword;
                case "region":
                    return SyntaxKind.RegionKeyword;
                case "endregion":
                    return SyntaxKind.EndRegionKeyword;
                case "define":
                    return SyntaxKind.DefineKeyword;
                case "undef":
                    return SyntaxKind.UndefKeyword;
                case "warning":
                    return SyntaxKind.WarningKeyword;
                case "error":
                    return SyntaxKind.ErrorKeyword;
                case "line":
                    return SyntaxKind.LineKeyword;
                case "pragma":
                    return SyntaxKind.PragmaKeyword;
                case "hidden":
                    return SyntaxKind.HiddenKeyword;
                case "checksum":
                    return SyntaxKind.ChecksumKeyword;
                case "disable":
                    return SyntaxKind.DisableKeyword;
                case "restore":
                    return SyntaxKind.RestoreKeyword;
                case "r":
                    return SyntaxKind.ReferenceKeyword;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetContextualKeywordKinds(): System.Collections.Generic.IEnumerable<SyntaxKind> {
            var __result = new Array<SyntaxKind>();
            for (var i: number = <number>SyntaxKind.YieldKeyword; i <= <number>SyntaxKind.AwaitKeyword; i++) {
                __result.push(<SyntaxKind>i);
                //yield return (SyntaxKind)i;
            }
            return __result;
        }
        public static IsContextualKeyword(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.YieldKeyword:
                case SyntaxKind.PartialKeyword:
                case SyntaxKind.FromKeyword:
                case SyntaxKind.GroupKeyword:
                case SyntaxKind.JoinKeyword:
                case SyntaxKind.IntoKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ByKeyword:
                case SyntaxKind.WhereKeyword:
                case SyntaxKind.SelectKeyword:
                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                case SyntaxKind.AddKeyword:
                case SyntaxKind.RemoveKeyword:
                case SyntaxKind.OrderByKeyword:
                case SyntaxKind.AliasKeyword:
                case SyntaxKind.OnKeyword:
                case SyntaxKind.EqualsKeyword:
                case SyntaxKind.AscendingKeyword:
                case SyntaxKind.DescendingKeyword:
                case SyntaxKind.AssemblyKeyword:
                case SyntaxKind.ModuleKeyword:
                case SyntaxKind.TypeKeyword:
                case SyntaxKind.GlobalKeyword:
                case SyntaxKind.FieldKeyword:
                case SyntaxKind.MethodKeyword:
                case SyntaxKind.ParamKeyword:
                case SyntaxKind.PropertyKeyword:
                case SyntaxKind.TypeVarKeyword:
                case SyntaxKind.NameOfKeyword:
                case SyntaxKind.AsyncKeyword:
                case SyntaxKind.AwaitKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static IsQueryContextualKeyword(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.FromKeyword:
                case SyntaxKind.WhereKeyword:
                case SyntaxKind.SelectKeyword:
                case SyntaxKind.GroupKeyword:
                case SyntaxKind.IntoKeyword:
                case SyntaxKind.OrderByKeyword:
                case SyntaxKind.JoinKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.OnKeyword:
                case SyntaxKind.EqualsKeyword:
                case SyntaxKind.ByKeyword:
                case SyntaxKind.AscendingKeyword:
                case SyntaxKind.DescendingKeyword:
                    return true;
                default:
                    return false;
            }
        }
        public static GetContextualKeywordKind(text: string): SyntaxKind {
            switch (text) {
                case "yield":
                    return SyntaxKind.YieldKeyword;
                case "partial":
                    return SyntaxKind.PartialKeyword;
                case "from":
                    return SyntaxKind.FromKeyword;
                case "group":
                    return SyntaxKind.GroupKeyword;
                case "join":
                    return SyntaxKind.JoinKeyword;
                case "into":
                    return SyntaxKind.IntoKeyword;
                case "let":
                    return SyntaxKind.LetKeyword;
                case "by":
                    return SyntaxKind.ByKeyword;
                case "where":
                    return SyntaxKind.WhereKeyword;
                case "select":
                    return SyntaxKind.SelectKeyword;
                case "get":
                    return SyntaxKind.GetKeyword;
                case "set":
                    return SyntaxKind.SetKeyword;
                case "add":
                    return SyntaxKind.AddKeyword;
                case "remove":
                    return SyntaxKind.RemoveKeyword;
                case "orderby":
                    return SyntaxKind.OrderByKeyword;
                case "alias":
                    return SyntaxKind.AliasKeyword;
                case "on":
                    return SyntaxKind.OnKeyword;
                case "equals":
                    return SyntaxKind.EqualsKeyword;
                case "ascending":
                    return SyntaxKind.AscendingKeyword;
                case "descending":
                    return SyntaxKind.DescendingKeyword;
                case "assembly":
                    return SyntaxKind.AssemblyKeyword;
                case "module":
                    return SyntaxKind.ModuleKeyword;
                case "type":
                    return SyntaxKind.TypeKeyword;
                case "field":
                    return SyntaxKind.FieldKeyword;
                case "method":
                    return SyntaxKind.MethodKeyword;
                case "param":
                    return SyntaxKind.ParamKeyword;
                case "property":
                    return SyntaxKind.PropertyKeyword;
                case "typevar":
                    return SyntaxKind.TypeVarKeyword;
                case "global":
                    return SyntaxKind.GlobalKeyword;
                case "async":
                    return SyntaxKind.AsyncKeyword;
                case "await":
                    return SyntaxKind.AwaitKeyword;
                case "nameof":
                    return SyntaxKind.NameOfKeyword;
                default:
                    return SyntaxKind.None;
            }
        }
        public static GetText_3915(kind: SyntaxKind): string {
            switch (kind) {
                case SyntaxKind.TildeToken:
                    return "~";
                case SyntaxKind.ExclamationToken:
                    return "!";
                case SyntaxKind.DollarToken:
                    return "$";
                case SyntaxKind.PercentToken:
                    return "%";
                case SyntaxKind.CaretToken:
                    return "^";
                case SyntaxKind.AmpersandToken:
                    return "&";
                case SyntaxKind.AsteriskToken:
                    return "*";
                case SyntaxKind.OpenParenToken:
                    return "(";
                case SyntaxKind.CloseParenToken:
                    return ")";
                case SyntaxKind.MinusToken:
                    return "-";
                case SyntaxKind.PlusToken:
                    return "+";
                case SyntaxKind.EqualsToken:
                    return "=";
                case SyntaxKind.OpenBraceToken:
                    return "{";
                case SyntaxKind.CloseBraceToken:
                    return "}";
                case SyntaxKind.OpenBracketToken:
                    return "[";
                case SyntaxKind.CloseBracketToken:
                    return "]";
                case SyntaxKind.BarToken:
                    return "|";
                case SyntaxKind.BackslashToken:
                    return "\\";
                case SyntaxKind.ColonToken:
                    return ":";
                case SyntaxKind.SemicolonToken:
                    return ";";
                case SyntaxKind.DoubleQuoteToken:
                    return "\"";
                case SyntaxKind.SingleQuoteToken:
                    return "'";
                case SyntaxKind.LessThanToken:
                    return "<";
                case SyntaxKind.CommaToken:
                    return ",";
                case SyntaxKind.GreaterThanToken:
                    return ">";
                case SyntaxKind.DotToken:
                    return ".";
                case SyntaxKind.QuestionToken:
                    return "?";
                case SyntaxKind.HashToken:
                    return "#";
                case SyntaxKind.SlashToken:
                    return "/";
                case SyntaxKind.SlashGreaterThanToken:
                    return "/>";
                case SyntaxKind.LessThanSlashToken:
                    return "</";
                case SyntaxKind.XmlCommentStartToken:
                    return "<!--";
                case SyntaxKind.XmlCommentEndToken:
                    return "-->";
                case SyntaxKind.XmlCDataStartToken:
                    return "<![CDATA[";
                case SyntaxKind.XmlCDataEndToken:
                    return "]]>";
                case SyntaxKind.XmlProcessingInstructionStartToken:
                    return "<?";
                case SyntaxKind.XmlProcessingInstructionEndToken:
                    return "?>";
                case SyntaxKind.BarBarToken:
                    return "||";
                case SyntaxKind.AmpersandAmpersandToken:
                    return "&&";
                case SyntaxKind.MinusMinusToken:
                    return "--";
                case SyntaxKind.PlusPlusToken:
                    return "++";
                case SyntaxKind.ColonColonToken:
                    return "::";
                case SyntaxKind.QuestionQuestionToken:
                    return "??";
                case SyntaxKind.MinusGreaterThanToken:
                    return "->";
                case SyntaxKind.ExclamationEqualsToken:
                    return "!=";
                case SyntaxKind.EqualsEqualsToken:
                    return "==";
                case SyntaxKind.EqualsGreaterThanToken:
                    return "=>";
                case SyntaxKind.LessThanEqualsToken:
                    return "<=";
                case SyntaxKind.LessThanLessThanToken:
                    return "<<";
                case SyntaxKind.LessThanLessThanEqualsToken:
                    return "<<=";
                case SyntaxKind.GreaterThanEqualsToken:
                    return ">=";
                case SyntaxKind.GreaterThanGreaterThanToken:
                    return ">>";
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                    return ">>=";
                case SyntaxKind.SlashEqualsToken:
                    return "/=";
                case SyntaxKind.AsteriskEqualsToken:
                    return "*=";
                case SyntaxKind.BarEqualsToken:
                    return "|=";
                case SyntaxKind.AmpersandEqualsToken:
                    return "&=";
                case SyntaxKind.PlusEqualsToken:
                    return "+=";
                case SyntaxKind.MinusEqualsToken:
                    return "-=";
                case SyntaxKind.CaretEqualsToken:
                    return "^=";
                case SyntaxKind.PercentEqualsToken:
                    return "%=";
                case SyntaxKind.BoolKeyword:
                    return "bool";
                case SyntaxKind.ByteKeyword:
                    return "byte";
                case SyntaxKind.SByteKeyword:
                    return "sbyte";
                case SyntaxKind.ShortKeyword:
                    return "short";
                case SyntaxKind.UShortKeyword:
                    return "ushort";
                case SyntaxKind.IntKeyword:
                    return "int";
                case SyntaxKind.UIntKeyword:
                    return "uint";
                case SyntaxKind.LongKeyword:
                    return "long";
                case SyntaxKind.ULongKeyword:
                    return "ulong";
                case SyntaxKind.DoubleKeyword:
                    return "double";
                case SyntaxKind.FloatKeyword:
                    return "float";
                case SyntaxKind.DecimalKeyword:
                    return "decimal";
                case SyntaxKind.StringKeyword:
                    return "string";
                case SyntaxKind.CharKeyword:
                    return "char";
                case SyntaxKind.VoidKeyword:
                    return "void";
                case SyntaxKind.ObjectKeyword:
                    return "object";
                case SyntaxKind.TypeOfKeyword:
                    return "typeof";
                case SyntaxKind.SizeOfKeyword:
                    return "sizeof";
                case SyntaxKind.NullKeyword:
                    return "null";
                case SyntaxKind.TrueKeyword:
                    return "true";
                case SyntaxKind.FalseKeyword:
                    return "false";
                case SyntaxKind.IfKeyword:
                    return "if";
                case SyntaxKind.ElseKeyword:
                    return "else";
                case SyntaxKind.WhileKeyword:
                    return "while";
                case SyntaxKind.ForKeyword:
                    return "for";
                case SyntaxKind.ForEachKeyword:
                    return "foreach";
                case SyntaxKind.DoKeyword:
                    return "do";
                case SyntaxKind.SwitchKeyword:
                    return "switch";
                case SyntaxKind.CaseKeyword:
                    return "case";
                case SyntaxKind.DefaultKeyword:
                    return "default";
                case SyntaxKind.TryKeyword:
                    return "try";
                case SyntaxKind.CatchKeyword:
                    return "catch";
                case SyntaxKind.FinallyKeyword:
                    return "finally";
                case SyntaxKind.LockKeyword:
                    return "lock";
                case SyntaxKind.GotoKeyword:
                    return "goto";
                case SyntaxKind.BreakKeyword:
                    return "break";
                case SyntaxKind.ContinueKeyword:
                    return "continue";
                case SyntaxKind.ReturnKeyword:
                    return "return";
                case SyntaxKind.ThrowKeyword:
                    return "throw";
                case SyntaxKind.PublicKeyword:
                    return "public";
                case SyntaxKind.PrivateKeyword:
                    return "private";
                case SyntaxKind.InternalKeyword:
                    return "internal";
                case SyntaxKind.ProtectedKeyword:
                    return "protected";
                case SyntaxKind.StaticKeyword:
                    return "static";
                case SyntaxKind.ReadOnlyKeyword:
                    return "readonly";
                case SyntaxKind.SealedKeyword:
                    return "sealed";
                case SyntaxKind.ConstKeyword:
                    return "const";
                case SyntaxKind.FixedKeyword:
                    return "fixed";
                case SyntaxKind.StackAllocKeyword:
                    return "stackalloc";
                case SyntaxKind.VolatileKeyword:
                    return "volatile";
                case SyntaxKind.NewKeyword:
                    return "new";
                case SyntaxKind.OverrideKeyword:
                    return "override";
                case SyntaxKind.AbstractKeyword:
                    return "abstract";
                case SyntaxKind.VirtualKeyword:
                    return "virtual";
                case SyntaxKind.EventKeyword:
                    return "event";
                case SyntaxKind.ExternKeyword:
                    return "extern";
                case SyntaxKind.RefKeyword:
                    return "ref";
                case SyntaxKind.OutKeyword:
                    return "out";
                case SyntaxKind.InKeyword:
                    return "in";
                case SyntaxKind.IsKeyword:
                    return "is";
                case SyntaxKind.AsKeyword:
                    return "as";
                case SyntaxKind.ParamsKeyword:
                    return "params";
                case SyntaxKind.ArgListKeyword:
                    return "__arglist";
                case SyntaxKind.MakeRefKeyword:
                    return "__makeref";
                case SyntaxKind.RefTypeKeyword:
                    return "__reftype";
                case SyntaxKind.RefValueKeyword:
                    return "__refvalue";
                case SyntaxKind.ThisKeyword:
                    return "this";
                case SyntaxKind.BaseKeyword:
                    return "base";
                case SyntaxKind.NamespaceKeyword:
                    return "namespace";
                case SyntaxKind.UsingKeyword:
                    return "using";
                case SyntaxKind.ClassKeyword:
                    return "class";
                case SyntaxKind.StructKeyword:
                    return "struct";
                case SyntaxKind.InterfaceKeyword:
                    return "interface";
                case SyntaxKind.EnumKeyword:
                    return "enum";
                case SyntaxKind.DelegateKeyword:
                    return "delegate";
                case SyntaxKind.CheckedKeyword:
                    return "checked";
                case SyntaxKind.UncheckedKeyword:
                    return "unchecked";
                case SyntaxKind.UnsafeKeyword:
                    return "unsafe";
                case SyntaxKind.OperatorKeyword:
                    return "operator";
                case SyntaxKind.ImplicitKeyword:
                    return "implicit";
                case SyntaxKind.ExplicitKeyword:
                    return "explicit";
                case SyntaxKind.ElifKeyword:
                    return "elif";
                case SyntaxKind.EndIfKeyword:
                    return "endif";
                case SyntaxKind.RegionKeyword:
                    return "region";
                case SyntaxKind.EndRegionKeyword:
                    return "endregion";
                case SyntaxKind.DefineKeyword:
                    return "define";
                case SyntaxKind.UndefKeyword:
                    return "undef";
                case SyntaxKind.WarningKeyword:
                    return "warning";
                case SyntaxKind.ErrorKeyword:
                    return "error";
                case SyntaxKind.LineKeyword:
                    return "line";
                case SyntaxKind.PragmaKeyword:
                    return "pragma";
                case SyntaxKind.HiddenKeyword:
                    return "hidden";
                case SyntaxKind.ChecksumKeyword:
                    return "checksum";
                case SyntaxKind.DisableKeyword:
                    return "disable";
                case SyntaxKind.RestoreKeyword:
                    return "restore";
                case SyntaxKind.ReferenceKeyword:
                    return "r";
                case SyntaxKind.YieldKeyword:
                    return "yield";
                case SyntaxKind.PartialKeyword:
                    return "partial";
                case SyntaxKind.FromKeyword:
                    return "from";
                case SyntaxKind.GroupKeyword:
                    return "group";
                case SyntaxKind.JoinKeyword:
                    return "join";
                case SyntaxKind.IntoKeyword:
                    return "into";
                case SyntaxKind.LetKeyword:
                    return "let";
                case SyntaxKind.ByKeyword:
                    return "by";
                case SyntaxKind.WhereKeyword:
                    return "where";
                case SyntaxKind.SelectKeyword:
                    return "select";
                case SyntaxKind.GetKeyword:
                    return "get";
                case SyntaxKind.SetKeyword:
                    return "set";
                case SyntaxKind.AddKeyword:
                    return "add";
                case SyntaxKind.RemoveKeyword:
                    return "remove";
                case SyntaxKind.OrderByKeyword:
                    return "orderby";
                case SyntaxKind.AliasKeyword:
                    return "alias";
                case SyntaxKind.OnKeyword:
                    return "on";
                case SyntaxKind.EqualsKeyword:
                    return "equals";
                case SyntaxKind.AscendingKeyword:
                    return "ascending";
                case SyntaxKind.DescendingKeyword:
                    return "descending";
                case SyntaxKind.AssemblyKeyword:
                    return "assembly";
                case SyntaxKind.ModuleKeyword:
                    return "module";
                case SyntaxKind.TypeKeyword:
                    return "type";
                case SyntaxKind.FieldKeyword:
                    return "field";
                case SyntaxKind.MethodKeyword:
                    return "method";
                case SyntaxKind.ParamKeyword:
                    return "param";
                case SyntaxKind.PropertyKeyword:
                    return "property";
                case SyntaxKind.TypeVarKeyword:
                    return "typevar";
                case SyntaxKind.GlobalKeyword:
                    return "global";
                case SyntaxKind.AsyncKeyword:
                    return "async";
                case SyntaxKind.AwaitKeyword:
                    return "await";
                case SyntaxKind.NameOfKeyword:
                    return "nameof";
                default:
                    return System.String.Empty;
            }
        }
        public static IsTypeParameterVarianceKeyword(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.OutKeyword || kind == SyntaxKind.InKeyword;
        }
        public static IsDocumentationCommentTrivia(kind: SyntaxKind): boolean {
            return kind == SyntaxKind.SingleLineDocumentationCommentTrivia || kind == SyntaxKind.MultiLineDocumentationCommentTrivia;
        }

        // partial

        public static IsHexDigit(c: string): boolean {
            return (c >= '0' && c <= '9') || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f');
        }
        public static IsDecDigit(c: string): boolean {
            return c >= '0' && c <= '9';
        }
        public static HexValue(c: string): number {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsHexDigit(c));
            return (c >= '0' && c <= '9') ? c.charCodeAt(0) - '0'.charCodeAt(0) : (c.charCodeAt(0) & 0xdf) - 'A'.charCodeAt(0) + 10;
        }
        public static DecValue(c: string): number {
            System.Diagnostics.Debug.Assert(SyntaxFacts.IsDecDigit(c));
            return c.charCodeAt(0) - '0'.charCodeAt(0);
        }
        public static IsWhitespace(ch: string): boolean {
            return ch == ' ' || ch == '\t' || ch == '\v' || ch == '\f' || ch == '\u00A0' || ch == '\uFEFF' || ch == '\u001A' || (ch.charCodeAt(0) > 255 && System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch) == System.Globalization.UnicodeCategory.SpaceSeparator);
        }
        public static IsNewLine(ch: string): boolean {
            return ch == '\r' || ch == '\n' || ch == '\u0085' || ch == '\u2028' || ch == '\u2029';
        }
        public static IsIdentifierStartCharacter(ch: string): boolean {
            if (ch < 'a') {
                if (ch < 'A') {
                    return false;
                }
                return ch <= 'Z' || ch == '_';
            }
            if (ch <= 'z') {
                return true;
            }
            if (ch <= '\u007F') {
                return false;
            }
            return SyntaxFacts.IsLetterChar(System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch));
        }
        public static IsIdentifierPartCharacter(ch: string): boolean {
            if (ch < 'a') {
                if (ch < 'A') {
                    return ch >= '0' && ch <= '9';
                }
                return ch <= 'Z' || ch == '_';
            }
            if (ch <= 'z') {
                return true;
            }
            if (ch <= '\u007F') {
                return false;
            }
            var cat: System.Globalization.UnicodeCategory = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch);
            return SyntaxFacts.IsLetterChar(cat) || SyntaxFacts.IsDecimalDigitChar(cat) || SyntaxFacts.IsConnectingChar(cat) || SyntaxFacts.IsCombiningChar(cat) || SyntaxFacts.IsFormattingChar_2061(cat);
        }
        public static IsValidIdentifier(name: string): boolean {
            if (System.String.IsNullOrEmpty(name)) {
                return false;
            }
            if (!SyntaxFacts.IsIdentifierStartCharacter(name[0])) {
                return false;
            }
            var nameLength: number = name.length;
            for (var i: number = 1; i < nameLength; i++) {
                if (!SyntaxFacts.IsIdentifierPartCharacter(name[i])) {
                    return false;
                }
            }
            return true;
        }
        public static ContainsDroppedIdentifierCharacters(name: string): boolean {
            if (System.String.IsNullOrEmpty(name)) {
                return false;
            }
            if (name[0] == '@') {
                return true;
            }
            var nameLength: number = name.length;
            for (var i: number = 0; i < nameLength; i++) {
                if (SyntaxFacts.IsFormattingChar_1141(name[i])) {
                    return true;
                }
            }
            return false;
        }
        public static IsLetterChar(cat: System.Globalization.UnicodeCategory): boolean {
            switch (cat) {
                case System.Globalization.UnicodeCategory.UppercaseLetter:
                case System.Globalization.UnicodeCategory.LowercaseLetter:
                case System.Globalization.UnicodeCategory.TitlecaseLetter:
                case System.Globalization.UnicodeCategory.ModifierLetter:
                case System.Globalization.UnicodeCategory.OtherLetter:
                case System.Globalization.UnicodeCategory.LetterNumber:
                    return true;
            }
            return false;
        }
        public static IsCombiningChar(cat: System.Globalization.UnicodeCategory): boolean {
            switch (cat) {
                case System.Globalization.UnicodeCategory.NonSpacingMark:
                case System.Globalization.UnicodeCategory.SpacingCombiningMark:
                    return true;
            }
            return false;
        }
        public static IsDecimalDigitChar(cat: System.Globalization.UnicodeCategory): boolean {
            return cat == System.Globalization.UnicodeCategory.DecimalDigitNumber;
        }
        public static IsConnectingChar(cat: System.Globalization.UnicodeCategory): boolean {
            return cat == System.Globalization.UnicodeCategory.ConnectorPunctuation;
        }
        public static IsFormattingChar_1141(ch: string): boolean {
            return ch.charCodeAt(0) > 127 && SyntaxFacts.IsFormattingChar_2061(System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch));
        }
        public static IsFormattingChar_2061(cat: System.Globalization.UnicodeCategory): boolean {
            return cat == System.Globalization.UnicodeCategory.Format;
        }
        public static IsNonAsciiQuotationMark(ch: string): boolean {
            switch (ch) {
                case '\u2018':
                case '\u2019':
                    return true;
                case '\u201C':
                case '\u201D':
                    return true;
                default:
                    return false;
            }
        } 
    }
}
///<reference path="../Syntax/CSharpSyntaxNode.ts"/>
///<reference path="../Syntax/StructuredTriviaSyntax.ts"/>
///<reference path="../Syntax/DirectiveTriviaSyntax.ts"/>




module Microsoft.CodeAnalysis.CSharp.Syntax {


    export class ExpressionSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1263(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ExpressionSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class TypeSyntax extends ExpressionSyntax {
        constructor() { super(); }
        ctor_2045(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeSyntax {
            super.ctor_1263(green, parent, position); return this;
        }
    }

    export class MemberDeclarationSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_7461(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MemberDeclarationSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class NameSyntax extends TypeSyntax {
        constructor() { super(); }
        ctor_1543(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NameSyntax {
            super.ctor_2045(green, parent, position); return this;
        }
    }

    export class SimpleNameSyntax extends NameSyntax {
        constructor() { super(); }
        ctor_1962(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SimpleNameSyntax {
            super.ctor_1543(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken { throw new Error(); }
    }

    export class IdentifierNameSyntax extends SimpleNameSyntax {

        constructor() { super(); }
        ctor_1588(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IdentifierNameSyntax {
            super.ctor_1962(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IdentifierNameSyntax>this.Green).identifier, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIdentifierName(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIdentifierName(this);
        }

        public Update(identifier: SyntaxToken): IdentifierNameSyntax {
            if (identifier != this.Identifier) {
                var newNode = SyntaxFactory.IdentifierName_9812(identifier);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIdentifier(identifier: SyntaxToken): IdentifierNameSyntax {
            return this.Update(identifier);
        }
    }

    export class QualifiedNameSyntax extends NameSyntax {
        private left: NameSyntax;
        private right: SimpleNameSyntax;

        constructor() { super(); }
        ctor_5378(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QualifiedNameSyntax {
            super.ctor_1543(green, parent, position); return this;
        }

        public get Left(): NameSyntax {
            {
                var ref = { refObj: this.left };
                var result = this.GetRedAtZero_2231(ref);
                this.left = ref.refObj; return result;
            }
        }

        public get DotToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QualifiedNameSyntax>this.Green).dotToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Right(): SimpleNameSyntax {
            {
                var ref = { refObj: this.right };
                var result = this.GetRed_2015(ref, 2);
                this.right = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.left };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.left = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.right };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.right = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.left;
                case 2: return this.right;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitQualifiedName(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitQualifiedName(this);
        }

        public Update(left: NameSyntax, dotToken: SyntaxToken, right: SimpleNameSyntax): QualifiedNameSyntax {
            if (left != this.Left || dotToken != this.DotToken || right != this.Right) {
                var newNode = SyntaxFactory.QualifiedName_1617(left, dotToken, right);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLeft(left: NameSyntax): QualifiedNameSyntax {
            return this.Update(left, this.DotToken, this.Right);
        }

        public WithDotToken(dotToken: SyntaxToken): QualifiedNameSyntax {
            return this.Update(this.Left, dotToken, this.Right);
        }

        public WithRight(right: SimpleNameSyntax): QualifiedNameSyntax {
            return this.Update(this.Left, this.DotToken, right);
        }
    }

    export class GenericNameSyntax extends SimpleNameSyntax {
        private typeArgumentList: TypeArgumentListSyntax;

        constructor() { super(); }
        ctor_1471(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): GenericNameSyntax {
            super.ctor_1962(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GenericNameSyntax>this.Green).identifier, this.Position, 0); }
        }

        public get TypeArgumentList(): TypeArgumentListSyntax {
            {
                var ref = { refObj: this.typeArgumentList };
                var result = this.GetRed_2015(ref, 1);
                this.typeArgumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.typeArgumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.typeArgumentList = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.typeArgumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitGenericName(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitGenericName(this);
        }

        public Update(identifier: SyntaxToken, typeArgumentList: TypeArgumentListSyntax): GenericNameSyntax {
            if (identifier != this.Identifier || typeArgumentList != this.TypeArgumentList) {
                var newNode = SyntaxFactory.GenericName_1946(identifier, typeArgumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIdentifier(identifier: SyntaxToken): GenericNameSyntax {
            return this.Update(identifier, this.TypeArgumentList);
        }

        public WithTypeArgumentList(typeArgumentList: TypeArgumentListSyntax): GenericNameSyntax {
            return this.Update(this.Identifier, typeArgumentList);
        }

        public AddTypeArgumentListArguments(...items: TypeSyntax[]): GenericNameSyntax {
            return this.WithTypeArgumentList(this.TypeArgumentList.WithArguments(this.TypeArgumentList.Arguments.AddRange(items)));
        }
    }

    export class TypeArgumentListSyntax extends CSharpSyntaxNode {
        private arguments: SyntaxNode;

        constructor() { super(); }
        ctor_1247(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeArgumentListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get LessThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeArgumentListSyntax>this.Green).lessThanToken, this.Position, 0); }
        }

        public get Arguments(): SeparatedSyntaxList<TypeSyntax> {
            {
                var ref = { refObj: this.arguments };
                var red = this.GetRed_2015(ref, 1);
                this.arguments = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<TypeSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get GreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeArgumentListSyntax>this.Green).greaterThanToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.arguments };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.arguments = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.arguments;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeArgumentList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeArgumentList(this);
        }

        public Update(lessThanToken: SyntaxToken, arguments: SeparatedSyntaxList<TypeSyntax>, greaterThanToken: SyntaxToken): TypeArgumentListSyntax {
            if (lessThanToken != this.LessThanToken || arguments != this.Arguments || greaterThanToken != this.GreaterThanToken) {
                var newNode = SyntaxFactory.TypeArgumentList_2074(lessThanToken, arguments, greaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanToken(lessThanToken: SyntaxToken): TypeArgumentListSyntax {
            return this.Update(lessThanToken, this.Arguments, this.GreaterThanToken);
        }

        public WithArguments(arguments: SeparatedSyntaxList<TypeSyntax>): TypeArgumentListSyntax {
            return this.Update(this.LessThanToken, arguments, this.GreaterThanToken);
        }

        public WithGreaterThanToken(greaterThanToken: SyntaxToken): TypeArgumentListSyntax {
            return this.Update(this.LessThanToken, this.Arguments, greaterThanToken);
        }

        public AddArguments(...items: TypeSyntax[]): TypeArgumentListSyntax {
            return this.WithArguments(this.Arguments.AddRange(items));
        }
    }

    export class AliasQualifiedNameSyntax extends NameSyntax {
        private alias: IdentifierNameSyntax;
        private name: SimpleNameSyntax;

        constructor() { super(); }
        ctor_1535(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AliasQualifiedNameSyntax {
            super.ctor_1543(green, parent, position); return this;
        }

        public get Alias(): IdentifierNameSyntax {
            {
                var ref = { refObj: this.alias };
                var result = this.GetRedAtZero_2231(ref);
                this.alias = ref.refObj; return result;
            }
        }

        public get ColonColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AliasQualifiedNameSyntax>this.Green).colonColonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Name(): SimpleNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 2);
                this.name = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.alias };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.alias = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.name = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.alias;
                case 2: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAliasQualifiedName(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAliasQualifiedName(this);
        }

        public Update(alias: IdentifierNameSyntax, colonColonToken: SyntaxToken, name: SimpleNameSyntax): AliasQualifiedNameSyntax {
            if (alias != this.Alias || colonColonToken != this.ColonColonToken || name != this.Name) {
                var newNode = SyntaxFactory.AliasQualifiedName_1366(alias, colonColonToken, name);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAlias(alias: IdentifierNameSyntax): AliasQualifiedNameSyntax {
            return this.Update(alias, this.ColonColonToken, this.Name);
        }

        public WithColonColonToken(colonColonToken: SyntaxToken): AliasQualifiedNameSyntax {
            return this.Update(this.Alias, colonColonToken, this.Name);
        }

        public WithName(name: SimpleNameSyntax): AliasQualifiedNameSyntax {
            return this.Update(this.Alias, this.ColonColonToken, name);
        }
    }

    export class PredefinedTypeSyntax extends TypeSyntax {

        constructor() { super(); }
        ctor_1442(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PredefinedTypeSyntax {
            super.ctor_2045(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PredefinedTypeSyntax>this.Green).keyword, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPredefinedType(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPredefinedType(this);
        }

        public Update(keyword: SyntaxToken): PredefinedTypeSyntax {
            if (keyword != this.Keyword) {
                var newNode = SyntaxFactory.PredefinedType(keyword);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): PredefinedTypeSyntax {
            return this.Update(keyword);
        }
    }

    export class ArrayTypeSyntax extends TypeSyntax {
        private elementType: TypeSyntax;
        private rankSpecifiers: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_4307(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArrayTypeSyntax {
            super.ctor_2045(green, parent, position); return this;
        }

        public get ElementType(): TypeSyntax {
            {
                var ref = { refObj: this.elementType };
                var result = this.GetRedAtZero_2231(ref);
                this.elementType = ref.refObj; return result;
            }
        }

        public get RankSpecifiers(): SyntaxList<ArrayRankSpecifierSyntax> {
            {
                var ref = { refObj: this.rankSpecifiers };
                var result = new SyntaxList<ArrayRankSpecifierSyntax>().ctor_6698(this.GetRed_2015(ref, 1));
                this.rankSpecifiers = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.elementType };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.elementType = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.rankSpecifiers };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.rankSpecifiers = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.elementType;
                case 1: return this.rankSpecifiers;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArrayType(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArrayType(this);
        }

        public Update(elementType: TypeSyntax, rankSpecifiers: SyntaxList<ArrayRankSpecifierSyntax>): ArrayTypeSyntax {
            if (elementType != this.ElementType || rankSpecifiers != this.RankSpecifiers) {
                var newNode = SyntaxFactory.ArrayType_6581(elementType, rankSpecifiers);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithElementType(elementType: TypeSyntax): ArrayTypeSyntax {
            return this.Update(elementType, this.RankSpecifiers);
        }

        public WithRankSpecifiers(rankSpecifiers: SyntaxList<ArrayRankSpecifierSyntax>): ArrayTypeSyntax {
            return this.Update(this.ElementType, rankSpecifiers);
        }

        public AddRankSpecifiers(...items: ArrayRankSpecifierSyntax[]): ArrayTypeSyntax {
            return this.WithRankSpecifiers(this.RankSpecifiers.AddRange(items));
        }
    }

    export class ArrayRankSpecifierSyntax extends CSharpSyntaxNode {
        private sizes: SyntaxNode;

        constructor() { super(); }
        ctor_5824(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArrayRankSpecifierSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayRankSpecifierSyntax>this.Green).openBracketToken, this.Position, 0); }
        }

        public get Sizes(): SeparatedSyntaxList<ExpressionSyntax> {
            {
                var ref = { refObj: this.sizes };
                var red = this.GetRed_2015(ref, 1);
                this.sizes = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ExpressionSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayRankSpecifierSyntax>this.Green).closeBracketToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.sizes };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.sizes = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.sizes;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArrayRankSpecifier(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArrayRankSpecifier(this);
        }

        public Update(openBracketToken: SyntaxToken, sizes: SeparatedSyntaxList<ExpressionSyntax>, closeBracketToken: SyntaxToken): ArrayRankSpecifierSyntax {
            if (openBracketToken != this.OpenBracketToken || sizes != this.Sizes || closeBracketToken != this.CloseBracketToken) {
                var newNode = SyntaxFactory.ArrayRankSpecifier_6813(openBracketToken, sizes, closeBracketToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): ArrayRankSpecifierSyntax {
            return this.Update(openBracketToken, this.Sizes, this.CloseBracketToken);
        }

        public WithSizes(sizes: SeparatedSyntaxList<ExpressionSyntax>): ArrayRankSpecifierSyntax {
            return this.Update(this.OpenBracketToken, sizes, this.CloseBracketToken);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): ArrayRankSpecifierSyntax {
            return this.Update(this.OpenBracketToken, this.Sizes, closeBracketToken);
        }

        public AddSizes(...items: ExpressionSyntax[]): ArrayRankSpecifierSyntax {
            return this.WithSizes(this.Sizes.AddRange(items));
        }
    }

    export class PointerTypeSyntax extends TypeSyntax {
        private elementType: TypeSyntax;

        constructor() { super(); }
        ctor_6866(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PointerTypeSyntax {
            super.ctor_2045(green, parent, position); return this;
        }

        public get ElementType(): TypeSyntax {
            {
                var ref = { refObj: this.elementType };
                var result = this.GetRedAtZero_2231(ref);
                this.elementType = ref.refObj; return result;
            }
        }

        public get AsteriskToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PointerTypeSyntax>this.Green).asteriskToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.elementType };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.elementType = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.elementType;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPointerType(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPointerType(this);
        }

        public Update(elementType: TypeSyntax, asteriskToken: SyntaxToken): PointerTypeSyntax {
            if (elementType != this.ElementType || asteriskToken != this.AsteriskToken) {
                var newNode = SyntaxFactory.PointerType_1337(elementType, asteriskToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithElementType(elementType: TypeSyntax): PointerTypeSyntax {
            return this.Update(elementType, this.AsteriskToken);
        }

        public WithAsteriskToken(asteriskToken: SyntaxToken): PointerTypeSyntax {
            return this.Update(this.ElementType, asteriskToken);
        }
    }

    export class NullableTypeSyntax extends TypeSyntax {
        private elementType: TypeSyntax;

        constructor() { super(); }
        ctor_6515(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NullableTypeSyntax {
            super.ctor_2045(green, parent, position); return this;
        }

        public get ElementType(): TypeSyntax {
            {
                var ref = { refObj: this.elementType };
                var result = this.GetRedAtZero_2231(ref);
                this.elementType = ref.refObj; return result;
            }
        }

        public get QuestionToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NullableTypeSyntax>this.Green).questionToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.elementType };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.elementType = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.elementType;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitNullableType(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitNullableType(this);
        }

        public Update(elementType: TypeSyntax, questionToken: SyntaxToken): NullableTypeSyntax {
            if (elementType != this.ElementType || questionToken != this.QuestionToken) {
                var newNode = SyntaxFactory.NullableType_5850(elementType, questionToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithElementType(elementType: TypeSyntax): NullableTypeSyntax {
            return this.Update(elementType, this.QuestionToken);
        }

        public WithQuestionToken(questionToken: SyntaxToken): NullableTypeSyntax {
            return this.Update(this.ElementType, questionToken);
        }
    }

    export class OmittedTypeArgumentSyntax extends TypeSyntax {

        constructor() { super(); }
        ctor_5858(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OmittedTypeArgumentSyntax {
            super.ctor_2045(green, parent, position); return this;
        }

        public get OmittedTypeArgumentToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OmittedTypeArgumentSyntax>this.Green).omittedTypeArgumentToken, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOmittedTypeArgument(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOmittedTypeArgument(this);
        }

        public Update(omittedTypeArgumentToken: SyntaxToken): OmittedTypeArgumentSyntax {
            if (omittedTypeArgumentToken != this.OmittedTypeArgumentToken) {
                var newNode = SyntaxFactory.OmittedTypeArgument_1624(omittedTypeArgumentToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOmittedTypeArgumentToken(omittedTypeArgumentToken: SyntaxToken): OmittedTypeArgumentSyntax {
            return this.Update(omittedTypeArgumentToken);
        }
    }

    export class ParenthesizedExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_2189(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ParenthesizedExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParenthesizedExpressionSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParenthesizedExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitParenthesizedExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitParenthesizedExpression(this);
        }

        public Update(openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): ParenthesizedExpressionSyntax {
            if (openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.ParenthesizedExpression_8161(openParenToken, expression, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ParenthesizedExpressionSyntax {
            return this.Update(openParenToken, this.Expression, this.CloseParenToken);
        }

        public WithExpression(expression: ExpressionSyntax): ParenthesizedExpressionSyntax {
            return this.Update(this.OpenParenToken, expression, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ParenthesizedExpressionSyntax {
            return this.Update(this.OpenParenToken, this.Expression, closeParenToken);
        }
    }

    export class PrefixUnaryExpressionSyntax extends ExpressionSyntax {
        private operand: ExpressionSyntax;

        constructor() { super(); }
        ctor_9916(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PrefixUnaryExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PrefixUnaryExpressionSyntax>this.Green).operatorToken, this.Position, 0); }
        }

        public get Operand(): ExpressionSyntax {
            {
                var ref = { refObj: this.operand };
                var result = this.GetRed_2015(ref, 1);
                this.operand = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.operand };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.operand = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.operand;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPrefixUnaryExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPrefixUnaryExpression(this);
        }

        public Update(operatorToken: SyntaxToken, operand: ExpressionSyntax): PrefixUnaryExpressionSyntax {
            if (operatorToken != this.OperatorToken || operand != this.Operand) {
                var newNode = SyntaxFactory.PrefixUnaryExpression_1586(this.CSharpKind(), operatorToken, operand);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOperatorToken(operatorToken: SyntaxToken): PrefixUnaryExpressionSyntax {
            return this.Update(operatorToken, this.Operand);
        }

        public WithOperand(operand: ExpressionSyntax): PrefixUnaryExpressionSyntax {
            return this.Update(this.OperatorToken, operand);
        }
    }

    export class AwaitExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1769(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AwaitExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get AwaitKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AwaitExpressionSyntax>this.Green).awaitKeyword, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAwaitExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAwaitExpression(this);
        }

        public Update(awaitKeyword: SyntaxToken, expression: ExpressionSyntax): AwaitExpressionSyntax {
            if (awaitKeyword != this.AwaitKeyword || expression != this.Expression) {
                var newNode = SyntaxFactory.AwaitExpression_1054(awaitKeyword, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAwaitKeyword(awaitKeyword: SyntaxToken): AwaitExpressionSyntax {
            return this.Update(awaitKeyword, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): AwaitExpressionSyntax {
            return this.Update(this.AwaitKeyword, expression);
        }
    }

    export class PostfixUnaryExpressionSyntax extends ExpressionSyntax {
        private operand: ExpressionSyntax;

        constructor() { super(); }
        ctor_8896(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PostfixUnaryExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Operand(): ExpressionSyntax {
            {
                var ref = { refObj: this.operand };
                var result = this.GetRedAtZero_2231(ref);
                this.operand = ref.refObj; return result;
            }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PostfixUnaryExpressionSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.operand };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.operand = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.operand;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPostfixUnaryExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPostfixUnaryExpression(this);
        }

        public Update(operand: ExpressionSyntax, operatorToken: SyntaxToken): PostfixUnaryExpressionSyntax {
            if (operand != this.Operand || operatorToken != this.OperatorToken) {
                var newNode = SyntaxFactory.PostfixUnaryExpression_1042(this.CSharpKind(), operand, operatorToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOperand(operand: ExpressionSyntax): PostfixUnaryExpressionSyntax {
            return this.Update(operand, this.OperatorToken);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): PostfixUnaryExpressionSyntax {
            return this.Update(this.Operand, operatorToken);
        }
    }

    export class MemberAccessExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;
        private name: SimpleNameSyntax;

        constructor() { super(); }
        ctor_3326(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MemberAccessExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberAccessExpressionSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Name(): SimpleNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 2);
                this.name = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.name = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                case 2: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitMemberAccessExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitMemberAccessExpression(this);
        }

        public Update(expression: ExpressionSyntax, operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberAccessExpressionSyntax {
            if (expression != this.Expression || operatorToken != this.OperatorToken || name != this.Name) {
                var newNode = SyntaxFactory.MemberAccessExpression_6280(this.CSharpKind(), expression, operatorToken, name);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): MemberAccessExpressionSyntax {
            return this.Update(expression, this.OperatorToken, this.Name);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): MemberAccessExpressionSyntax {
            return this.Update(this.Expression, operatorToken, this.Name);
        }

        public WithName(name: SimpleNameSyntax): MemberAccessExpressionSyntax {
            return this.Update(this.Expression, this.OperatorToken, name);
        }
    }

    export class ConditionalAccessExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;
        private whenNotNull: ExpressionSyntax;

        constructor() { super(); }
        ctor_1030(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConditionalAccessExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConditionalAccessExpressionSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get WhenNotNull(): ExpressionSyntax {
            {
                var ref = { refObj: this.whenNotNull };
                var result = this.GetRed_2015(ref, 2);
                this.whenNotNull = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.whenNotNull };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.whenNotNull = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                case 2: return this.whenNotNull;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConditionalAccessExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConditionalAccessExpression(this);
        }

        public Update(expression: ExpressionSyntax, operatorToken: SyntaxToken, whenNotNull: ExpressionSyntax): ConditionalAccessExpressionSyntax {
            if (expression != this.Expression || operatorToken != this.OperatorToken || whenNotNull != this.WhenNotNull) {
                var newNode = SyntaxFactory.ConditionalAccessExpression_4365(expression, operatorToken, whenNotNull);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): ConditionalAccessExpressionSyntax {
            return this.Update(expression, this.OperatorToken, this.WhenNotNull);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): ConditionalAccessExpressionSyntax {
            return this.Update(this.Expression, operatorToken, this.WhenNotNull);
        }

        public WithWhenNotNull(whenNotNull: ExpressionSyntax): ConditionalAccessExpressionSyntax {
            return this.Update(this.Expression, this.OperatorToken, whenNotNull);
        }
    }

    export class MemberBindingExpressionSyntax extends ExpressionSyntax {
        private name: SimpleNameSyntax;

        constructor() { super(); }
        ctor_1286(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MemberBindingExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MemberBindingExpressionSyntax>this.Green).operatorToken, this.Position, 0); }
        }

        public get Name(): SimpleNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitMemberBindingExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitMemberBindingExpression(this);
        }

        public Update(operatorToken: SyntaxToken, name: SimpleNameSyntax): MemberBindingExpressionSyntax {
            if (operatorToken != this.OperatorToken || name != this.Name) {
                var newNode = SyntaxFactory.MemberBindingExpression_7672(operatorToken, name);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOperatorToken(operatorToken: SyntaxToken): MemberBindingExpressionSyntax {
            return this.Update(operatorToken, this.Name);
        }

        public WithName(name: SimpleNameSyntax): MemberBindingExpressionSyntax {
            return this.Update(this.OperatorToken, name);
        }
    }

    export class ElementBindingExpressionSyntax extends ExpressionSyntax {
        private argumentList: BracketedArgumentListSyntax;

        constructor() { super(); }
        ctor_2138(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ElementBindingExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get ArgumentList(): BracketedArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRedAtZero_2231(ref);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.argumentList = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitElementBindingExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitElementBindingExpression(this);
        }

        public Update(argumentList: BracketedArgumentListSyntax): ElementBindingExpressionSyntax {
            if (argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.ElementBindingExpression_1527(argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithArgumentList(argumentList: BracketedArgumentListSyntax): ElementBindingExpressionSyntax {
            return this.Update(argumentList);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): ElementBindingExpressionSyntax {
            return this.WithArgumentList(this.ArgumentList.WithArguments(this.ArgumentList.Arguments.AddRange(items)));
        }
    }

    export class ImplicitElementAccessSyntax extends ExpressionSyntax {
        private argumentList: BracketedArgumentListSyntax;

        constructor() { super(); }
        ctor_5704(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ImplicitElementAccessSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get ArgumentList(): BracketedArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRedAtZero_2231(ref);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.argumentList = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitImplicitElementAccess(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitImplicitElementAccess(this);
        }

        public Update(argumentList: BracketedArgumentListSyntax): ImplicitElementAccessSyntax {
            if (argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.ImplicitElementAccess_2050(argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithArgumentList(argumentList: BracketedArgumentListSyntax): ImplicitElementAccessSyntax {
            return this.Update(argumentList);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): ImplicitElementAccessSyntax {
            return this.WithArgumentList(this.ArgumentList.WithArguments(this.ArgumentList.Arguments.AddRange(items)));
        }
    }

    export class BinaryExpressionSyntax extends ExpressionSyntax {
        private left: ExpressionSyntax;
        private right: ExpressionSyntax;

        constructor() { super(); }
        ctor_5723(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BinaryExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Left(): ExpressionSyntax {
            {
                var ref = { refObj: this.left };
                var result = this.GetRedAtZero_2231(ref);
                this.left = ref.refObj; return result;
            }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BinaryExpressionSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Right(): ExpressionSyntax {
            {
                var ref = { refObj: this.right };
                var result = this.GetRed_2015(ref, 2);
                this.right = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.left };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.left = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.right };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.right = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.left;
                case 2: return this.right;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBinaryExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBinaryExpression(this);
        }

        public Update(left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): BinaryExpressionSyntax {
            if (left != this.Left || operatorToken != this.OperatorToken || right != this.Right) {
                var newNode = SyntaxFactory.BinaryExpression_2078(this.CSharpKind(), left, operatorToken, right);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLeft(left: ExpressionSyntax): BinaryExpressionSyntax {
            return this.Update(left, this.OperatorToken, this.Right);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): BinaryExpressionSyntax {
            return this.Update(this.Left, operatorToken, this.Right);
        }

        public WithRight(right: ExpressionSyntax): BinaryExpressionSyntax {
            return this.Update(this.Left, this.OperatorToken, right);
        }
    }

    export class AssignmentExpressionSyntax extends ExpressionSyntax {
        private left: ExpressionSyntax;
        private right: ExpressionSyntax;

        constructor() { super(); }
        ctor_1006(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AssignmentExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Left(): ExpressionSyntax {
            {
                var ref = { refObj: this.left };
                var result = this.GetRedAtZero_2231(ref);
                this.left = ref.refObj; return result;
            }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AssignmentExpressionSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Right(): ExpressionSyntax {
            {
                var ref = { refObj: this.right };
                var result = this.GetRed_2015(ref, 2);
                this.right = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.left };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.left = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.right };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.right = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.left;
                case 2: return this.right;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAssignmentExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAssignmentExpression(this);
        }

        public Update(left: ExpressionSyntax, operatorToken: SyntaxToken, right: ExpressionSyntax): AssignmentExpressionSyntax {
            if (left != this.Left || operatorToken != this.OperatorToken || right != this.Right) {
                var newNode = SyntaxFactory.AssignmentExpression_3657(this.CSharpKind(), left, operatorToken, right);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLeft(left: ExpressionSyntax): AssignmentExpressionSyntax {
            return this.Update(left, this.OperatorToken, this.Right);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): AssignmentExpressionSyntax {
            return this.Update(this.Left, operatorToken, this.Right);
        }

        public WithRight(right: ExpressionSyntax): AssignmentExpressionSyntax {
            return this.Update(this.Left, this.OperatorToken, right);
        }
    }

    export class ConditionalExpressionSyntax extends ExpressionSyntax {
        private condition: ExpressionSyntax;
        private whenTrue: ExpressionSyntax;
        private whenFalse: ExpressionSyntax;

        constructor() { super(); }
        ctor_1071(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConditionalExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRedAtZero_2231(ref);
                this.condition = ref.refObj; return result;
            }
        }

        public get QuestionToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConditionalExpressionSyntax>this.Green).questionToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get WhenTrue(): ExpressionSyntax {
            {
                var ref = { refObj: this.whenTrue };
                var result = this.GetRed_2015(ref, 2);
                this.whenTrue = ref.refObj; return result;
            }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConditionalExpressionSyntax>this.Green).colonToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get WhenFalse(): ExpressionSyntax {
            {
                var ref = { refObj: this.whenFalse };
                var result = this.GetRed_2015(ref, 4);
                this.whenFalse = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.condition = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.whenTrue };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.whenTrue = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.whenFalse };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.whenFalse = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.condition;
                case 2: return this.whenTrue;
                case 4: return this.whenFalse;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConditionalExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConditionalExpression(this);
        }

        public Update(condition: ExpressionSyntax, questionToken: SyntaxToken, whenTrue: ExpressionSyntax, colonToken: SyntaxToken, whenFalse: ExpressionSyntax): ConditionalExpressionSyntax {
            if (condition != this.Condition || questionToken != this.QuestionToken || whenTrue != this.WhenTrue || colonToken != this.ColonToken || whenFalse != this.WhenFalse) {
                var newNode = SyntaxFactory.ConditionalExpression_1159(condition, questionToken, whenTrue, colonToken, whenFalse);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithCondition(condition: ExpressionSyntax): ConditionalExpressionSyntax {
            return this.Update(condition, this.QuestionToken, this.WhenTrue, this.ColonToken, this.WhenFalse);
        }

        public WithQuestionToken(questionToken: SyntaxToken): ConditionalExpressionSyntax {
            return this.Update(this.Condition, questionToken, this.WhenTrue, this.ColonToken, this.WhenFalse);
        }

        public WithWhenTrue(whenTrue: ExpressionSyntax): ConditionalExpressionSyntax {
            return this.Update(this.Condition, this.QuestionToken, whenTrue, this.ColonToken, this.WhenFalse);
        }

        public WithColonToken(colonToken: SyntaxToken): ConditionalExpressionSyntax {
            return this.Update(this.Condition, this.QuestionToken, this.WhenTrue, colonToken, this.WhenFalse);
        }

        public WithWhenFalse(whenFalse: ExpressionSyntax): ConditionalExpressionSyntax {
            return this.Update(this.Condition, this.QuestionToken, this.WhenTrue, this.ColonToken, whenFalse);
        }
    }

    export class InstanceExpressionSyntax extends ExpressionSyntax {
        constructor() { super(); }
        ctor_2961(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InstanceExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }
    }

    export class ThisExpressionSyntax extends InstanceExpressionSyntax {

        constructor() { super(); }
        ctor_9095(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ThisExpressionSyntax {
            super.ctor_2961(green, parent, position); return this;
        }

        public get Token(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ThisExpressionSyntax>this.Green).token, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitThisExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitThisExpression(this);
        }

        public Update(token: SyntaxToken): ThisExpressionSyntax {
            if (token != this.Token) {
                var newNode = SyntaxFactory.ThisExpression_1991(token);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithToken(token: SyntaxToken): ThisExpressionSyntax {
            return this.Update(token);
        }
    }

    export class BaseExpressionSyntax extends InstanceExpressionSyntax {

        constructor() { super(); }
        ctor_8798(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseExpressionSyntax {
            super.ctor_2961(green, parent, position); return this;
        }

        public get Token(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseExpressionSyntax>this.Green).token, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBaseExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBaseExpression(this);
        }

        public Update(token: SyntaxToken): BaseExpressionSyntax {
            if (token != this.Token) {
                var newNode = SyntaxFactory.BaseExpression_1185(token);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithToken(token: SyntaxToken): BaseExpressionSyntax {
            return this.Update(token);
        }
    }

    export class LiteralExpressionSyntax extends ExpressionSyntax {

        constructor() { super(); }
        ctor_1907(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LiteralExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Token(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LiteralExpressionSyntax>this.Green).token, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLiteralExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLiteralExpression(this);
        }

        public Update(token: SyntaxToken): LiteralExpressionSyntax {
            if (token != this.Token) {
                var newNode = SyntaxFactory.LiteralExpression_7980(this.CSharpKind(), token);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithToken(token: SyntaxToken): LiteralExpressionSyntax {
            return this.Update(token);
        }
    }

    export class MakeRefExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_6904(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MakeRefExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MakeRefExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MakeRefExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MakeRefExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitMakeRefExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitMakeRefExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): MakeRefExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.MakeRefExpression_1856(keyword, openParenToken, expression, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): MakeRefExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Expression, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): MakeRefExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Expression, this.CloseParenToken);
        }

        public WithExpression(expression: ExpressionSyntax): MakeRefExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, expression, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): MakeRefExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, closeParenToken);
        }
    }

    export class RefTypeExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1551(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): RefTypeExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefTypeExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefTypeExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefTypeExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitRefTypeExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitRefTypeExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): RefTypeExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.RefTypeExpression_2003(keyword, openParenToken, expression, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): RefTypeExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Expression, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): RefTypeExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Expression, this.CloseParenToken);
        }

        public WithExpression(expression: ExpressionSyntax): RefTypeExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, expression, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): RefTypeExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, closeParenToken);
        }
    }

    export class RefValueExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1590(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): RefValueExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefValueExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefValueExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get Comma(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefValueExpressionSyntax>this.Green).comma, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 4);
                this.type = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RefValueExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.type = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                case 4: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitRefValueExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitRefValueExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, comma: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): RefValueExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || expression != this.Expression || comma != this.Comma || type != this.Type || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.RefValueExpression_1254(keyword, openParenToken, expression, comma, type, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): RefValueExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Expression, this.Comma, this.Type, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): RefValueExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Expression, this.Comma, this.Type, this.CloseParenToken);
        }

        public WithExpression(expression: ExpressionSyntax): RefValueExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, expression, this.Comma, this.Type, this.CloseParenToken);
        }

        public WithComma(comma: SyntaxToken): RefValueExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, comma, this.Type, this.CloseParenToken);
        }

        public WithType(type: TypeSyntax): RefValueExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, this.Comma, type, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): RefValueExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, this.Comma, this.Type, closeParenToken);
        }
    }

    export class CheckedExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_5940(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CheckedExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CheckedExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CheckedExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CheckedExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCheckedExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCheckedExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken): CheckedExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.CheckedExpression_1461(this.CSharpKind(), keyword, openParenToken, expression, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): CheckedExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Expression, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): CheckedExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Expression, this.CloseParenToken);
        }

        public WithExpression(expression: ExpressionSyntax): CheckedExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, expression, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): CheckedExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Expression, closeParenToken);
        }
    }

    export class DefaultExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_2428(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DefaultExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefaultExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefaultExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefaultExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDefaultExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDefaultExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): DefaultExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || type != this.Type || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.DefaultExpression_9224(keyword, openParenToken, type, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): DefaultExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Type, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): DefaultExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Type, this.CloseParenToken);
        }

        public WithType(type: TypeSyntax): DefaultExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, type, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): DefaultExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Type, closeParenToken);
        }
    }

    export class TypeOfExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_2097(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeOfExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeOfExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeOfExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeOfExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeOfExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeOfExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): TypeOfExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || type != this.Type || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.TypeOfExpression_1008(keyword, openParenToken, type, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): TypeOfExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Type, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): TypeOfExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Type, this.CloseParenToken);
        }

        public WithType(type: TypeSyntax): TypeOfExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, type, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): TypeOfExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Type, closeParenToken);
        }
    }

    export class SizeOfExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1207(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SizeOfExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SizeOfExpressionSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SizeOfExpressionSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SizeOfExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSizeOfExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSizeOfExpression(this);
        }

        public Update(keyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken): SizeOfExpressionSyntax {
            if (keyword != this.Keyword || openParenToken != this.OpenParenToken || type != this.Type || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.SizeOfExpression_1890(keyword, openParenToken, type, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): SizeOfExpressionSyntax {
            return this.Update(keyword, this.OpenParenToken, this.Type, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): SizeOfExpressionSyntax {
            return this.Update(this.Keyword, openParenToken, this.Type, this.CloseParenToken);
        }

        public WithType(type: TypeSyntax): SizeOfExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, type, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): SizeOfExpressionSyntax {
            return this.Update(this.Keyword, this.OpenParenToken, this.Type, closeParenToken);
        }
    }

    export class InvocationExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;
        private argumentList: ArgumentListSyntax;

        constructor() { super(); }
        ctor_1641(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InvocationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get ArgumentList(): ArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 1);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.argumentList = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                case 1: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitInvocationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitInvocationExpression(this);
        }

        public Update(expression: ExpressionSyntax, argumentList: ArgumentListSyntax): InvocationExpressionSyntax {
            if (expression != this.Expression || argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.InvocationExpression_9198(expression, argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): InvocationExpressionSyntax {
            return this.Update(expression, this.ArgumentList);
        }

        public WithArgumentList(argumentList: ArgumentListSyntax): InvocationExpressionSyntax {
            return this.Update(this.Expression, argumentList);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): InvocationExpressionSyntax {
            return this.WithArgumentList(this.ArgumentList.WithArguments(this.ArgumentList.Arguments.AddRange(items)));
        }
    }

    export class ElementAccessExpressionSyntax extends ExpressionSyntax {
        private expression: ExpressionSyntax;
        private argumentList: BracketedArgumentListSyntax;

        constructor() { super(); }
        ctor_1611(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ElementAccessExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get ArgumentList(): BracketedArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 1);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.argumentList = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                case 1: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitElementAccessExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitElementAccessExpression(this);
        }

        public Update(expression: ExpressionSyntax, argumentList: BracketedArgumentListSyntax): ElementAccessExpressionSyntax {
            if (expression != this.Expression || argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.ElementAccessExpression_1162(expression, argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): ElementAccessExpressionSyntax {
            return this.Update(expression, this.ArgumentList);
        }

        public WithArgumentList(argumentList: BracketedArgumentListSyntax): ElementAccessExpressionSyntax {
            return this.Update(this.Expression, argumentList);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): ElementAccessExpressionSyntax {
            return this.WithArgumentList(this.ArgumentList.WithArguments(this.ArgumentList.Arguments.AddRange(items)));
        }
    }

    export class BaseArgumentListSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1139(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseArgumentListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Arguments(): SeparatedSyntaxList<ArgumentSyntax> { throw new Error(); }
    }

    export class ArgumentListSyntax extends BaseArgumentListSyntax {
        private arguments: SyntaxNode;

        constructor() { super(); }
        ctor_1575(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArgumentListSyntax {
            super.ctor_1139(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentListSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Arguments(): SeparatedSyntaxList<ArgumentSyntax> {
            {
                var ref = { refObj: this.arguments };
                var red = this.GetRed_2015(ref, 1);
                this.arguments = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ArgumentSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentListSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.arguments };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.arguments = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.arguments;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArgumentList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArgumentList(this);
        }

        public Update(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeParenToken: SyntaxToken): ArgumentListSyntax {
            if (openParenToken != this.OpenParenToken || arguments != this.Arguments || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.ArgumentList_1043(openParenToken, arguments, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ArgumentListSyntax {
            return this.Update(openParenToken, this.Arguments, this.CloseParenToken);
        }

        public WithArguments(arguments: SeparatedSyntaxList<ArgumentSyntax>): ArgumentListSyntax {
            return this.Update(this.OpenParenToken, arguments, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ArgumentListSyntax {
            return this.Update(this.OpenParenToken, this.Arguments, closeParenToken);
        }

        public AddArguments(...items: ArgumentSyntax[]): ArgumentListSyntax {
            return this.WithArguments(this.Arguments.AddRange(items));
        }
    }

    export class BracketedArgumentListSyntax extends BaseArgumentListSyntax {
        private arguments: SyntaxNode;

        constructor() { super(); }
        ctor_2085(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BracketedArgumentListSyntax {
            super.ctor_1139(green, parent, position); return this;
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>this.Green).openBracketToken, this.Position, 0); }
        }

        public get Arguments(): SeparatedSyntaxList<ArgumentSyntax> {
            {
                var ref = { refObj: this.arguments };
                var red = this.GetRed_2015(ref, 1);
                this.arguments = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ArgumentSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedArgumentListSyntax>this.Green).closeBracketToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.arguments };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.arguments = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.arguments;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBracketedArgumentList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBracketedArgumentList(this);
        }

        public Update(openBracketToken: SyntaxToken, arguments: SeparatedSyntaxList<ArgumentSyntax>, closeBracketToken: SyntaxToken): BracketedArgumentListSyntax {
            if (openBracketToken != this.OpenBracketToken || arguments != this.Arguments || closeBracketToken != this.CloseBracketToken) {
                var newNode = SyntaxFactory.BracketedArgumentList_1168(openBracketToken, arguments, closeBracketToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): BracketedArgumentListSyntax {
            return this.Update(openBracketToken, this.Arguments, this.CloseBracketToken);
        }

        public WithArguments(arguments: SeparatedSyntaxList<ArgumentSyntax>): BracketedArgumentListSyntax {
            return this.Update(this.OpenBracketToken, arguments, this.CloseBracketToken);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): BracketedArgumentListSyntax {
            return this.Update(this.OpenBracketToken, this.Arguments, closeBracketToken);
        }

        public AddArguments(...items: ArgumentSyntax[]): BracketedArgumentListSyntax {
            return this.WithArguments(this.Arguments.AddRange(items));
        }
    }

    export class ArgumentSyntax extends CSharpSyntaxNode {
        private nameColon: NameColonSyntax;
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_7616(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArgumentSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get NameColon(): NameColonSyntax {
            {
                var ref = { refObj: this.nameColon };
                var result = this.GetRedAtZero_2231(ref);
                this.nameColon = ref.refObj; return result;
            }
        }

        public get RefOrOutKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArgumentSyntax>this.Green).refOrOutKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.nameColon };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.nameColon = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.nameColon;
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArgument(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArgument(this);
        }

        public Update(nameColon: NameColonSyntax, refOrOutKeyword: SyntaxToken, expression: ExpressionSyntax): ArgumentSyntax {
            if (nameColon != this.NameColon || refOrOutKeyword != this.RefOrOutKeyword || expression != this.Expression) {
                var newNode = SyntaxFactory.Argument_2910(nameColon, refOrOutKeyword, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNameColon(nameColon: NameColonSyntax): ArgumentSyntax {
            return this.Update(nameColon, this.RefOrOutKeyword, this.Expression);
        }

        public WithRefOrOutKeyword(refOrOutKeyword: SyntaxToken): ArgumentSyntax {
            return this.Update(this.NameColon, refOrOutKeyword, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): ArgumentSyntax {
            return this.Update(this.NameColon, this.RefOrOutKeyword, expression);
        }
    }

    export class NameColonSyntax extends CSharpSyntaxNode {
        private name: IdentifierNameSyntax;

        constructor() { super(); }
        ctor_6392(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NameColonSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Name(): IdentifierNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameColonSyntax>this.Green).colonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitNameColon(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitNameColon(this);
        }

        public Update(name: IdentifierNameSyntax, colonToken: SyntaxToken): NameColonSyntax {
            if (name != this.Name || colonToken != this.ColonToken) {
                var newNode = SyntaxFactory.NameColon_9012(name, colonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: IdentifierNameSyntax): NameColonSyntax {
            return this.Update(name, this.ColonToken);
        }

        public WithColonToken(colonToken: SyntaxToken): NameColonSyntax {
            return this.Update(this.Name, colonToken);
        }
    }

    export class CastExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_2030(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CastExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CastExpressionSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CastExpressionSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 3);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.expression = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                case 3: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCastExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCastExpression(this);
        }

        public Update(openParenToken: SyntaxToken, type: TypeSyntax, closeParenToken: SyntaxToken, expression: ExpressionSyntax): CastExpressionSyntax {
            if (openParenToken != this.OpenParenToken || type != this.Type || closeParenToken != this.CloseParenToken || expression != this.Expression) {
                var newNode = SyntaxFactory.CastExpression_9709(openParenToken, type, closeParenToken, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): CastExpressionSyntax {
            return this.Update(openParenToken, this.Type, this.CloseParenToken, this.Expression);
        }

        public WithType(type: TypeSyntax): CastExpressionSyntax {
            return this.Update(this.OpenParenToken, type, this.CloseParenToken, this.Expression);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): CastExpressionSyntax {
            return this.Update(this.OpenParenToken, this.Type, closeParenToken, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): CastExpressionSyntax {
            return this.Update(this.OpenParenToken, this.Type, this.CloseParenToken, expression);
        }
    }

    export class AnonymousMethodExpressionSyntax extends ExpressionSyntax {
        private parameterList: ParameterListSyntax;
        private block: BlockSyntax;

        constructor() { super(); }
        ctor_7841(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AnonymousMethodExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get AsyncKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousMethodExpressionSyntax>this.Green).asyncKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.Position, 0);

                return structDefault(SyntaxToken);
            }
        }

        public get DelegateKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousMethodExpressionSyntax>this.Green).delegateKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 2);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 3);
                this.block = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.parameterList = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.block = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.parameterList;
                case 3: return this.block;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAnonymousMethodExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAnonymousMethodExpression(this);
        }

        public Update(asyncKeyword: SyntaxToken, delegateKeyword: SyntaxToken, parameterList: ParameterListSyntax, block: BlockSyntax): AnonymousMethodExpressionSyntax {
            if (asyncKeyword != this.AsyncKeyword || delegateKeyword != this.DelegateKeyword || parameterList != this.ParameterList || block != this.Block) {
                var newNode = SyntaxFactory.AnonymousMethodExpression_1352(asyncKeyword, delegateKeyword, parameterList, block);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAsyncKeyword(asyncKeyword: SyntaxToken): AnonymousMethodExpressionSyntax {
            return this.Update(asyncKeyword, this.DelegateKeyword, this.ParameterList, this.Block);
        }

        public WithDelegateKeyword(delegateKeyword: SyntaxToken): AnonymousMethodExpressionSyntax {
            return this.Update(this.AsyncKeyword, delegateKeyword, this.ParameterList, this.Block);
        }

        public WithParameterList(parameterList: ParameterListSyntax): AnonymousMethodExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.DelegateKeyword, parameterList, this.Block);
        }

        public WithBlock(block: BlockSyntax): AnonymousMethodExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.DelegateKeyword, this.ParameterList, block);
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): AnonymousMethodExpressionSyntax {
            var parameterList = this.ParameterList != null ? this.ParameterList : SyntaxFactory.ParameterList_8831();
            return this.WithParameterList(parameterList.WithParameters(parameterList.Parameters.AddRange(items)));
        }

        public AddBlockStatements(...items: StatementSyntax[]): AnonymousMethodExpressionSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }
    }

    export class SimpleLambdaExpressionSyntax extends ExpressionSyntax {
        private parameter: ParameterSyntax;
        private body: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1697(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SimpleLambdaExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get AsyncKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleLambdaExpressionSyntax>this.Green).asyncKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.Position, 0);

                return structDefault(SyntaxToken);
            }
        }

        public get Parameter(): ParameterSyntax {
            {
                var ref = { refObj: this.parameter };
                var result = this.GetRed_2015(ref, 1);
                this.parameter = ref.refObj; return result;
            }
        }

        public get ArrowToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SimpleLambdaExpressionSyntax>this.Green).arrowToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Body(): CSharpSyntaxNode {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 3);
                this.body = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameter };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameter = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.body = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameter;
                case 3: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSimpleLambdaExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSimpleLambdaExpression(this);
        }

        public Update(asyncKeyword: SyntaxToken, parameter: ParameterSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): SimpleLambdaExpressionSyntax {
            if (asyncKeyword != this.AsyncKeyword || parameter != this.Parameter || arrowToken != this.ArrowToken || body != this.Body) {
                var newNode = SyntaxFactory.SimpleLambdaExpression_6633(asyncKeyword, parameter, arrowToken, body);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAsyncKeyword(asyncKeyword: SyntaxToken): SimpleLambdaExpressionSyntax {
            return this.Update(asyncKeyword, this.Parameter, this.ArrowToken, this.Body);
        }

        public WithParameter(parameter: ParameterSyntax): SimpleLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, parameter, this.ArrowToken, this.Body);
        }

        public WithArrowToken(arrowToken: SyntaxToken): SimpleLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.Parameter, arrowToken, this.Body);
        }

        public WithBody(body: CSharpSyntaxNode): SimpleLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.Parameter, this.ArrowToken, body);
        }

        public AddParameterAttributeLists(...items: AttributeListSyntax[]): SimpleLambdaExpressionSyntax {
            return this.WithParameter(this.Parameter.WithAttributeLists(this.Parameter.AttributeLists.AddRange(items)));
        }

        public AddParameterModifiers(...items: SyntaxToken[]): SimpleLambdaExpressionSyntax {
            return this.WithParameter(this.Parameter.WithModifiers(this.Parameter.Modifiers.AddRange(items)));
        }
    }

    export class ParenthesizedLambdaExpressionSyntax extends ExpressionSyntax {
        private parameterList: ParameterListSyntax;
        private body: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1854(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ParenthesizedLambdaExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get AsyncKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParenthesizedLambdaExpressionSyntax>this.Green).asyncKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.Position, 0);

                return structDefault(SyntaxToken);
            }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 1);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get ArrowToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParenthesizedLambdaExpressionSyntax>this.Green).arrowToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Body(): CSharpSyntaxNode {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 3);
                this.body = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameterList = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.body = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameterList;
                case 3: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitParenthesizedLambdaExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitParenthesizedLambdaExpression(this);
        }

        public Update(asyncKeyword: SyntaxToken, parameterList: ParameterListSyntax, arrowToken: SyntaxToken, body: CSharpSyntaxNode): ParenthesizedLambdaExpressionSyntax {
            if (asyncKeyword != this.AsyncKeyword || parameterList != this.ParameterList || arrowToken != this.ArrowToken || body != this.Body) {
                var newNode = SyntaxFactory.ParenthesizedLambdaExpression_1721(asyncKeyword, parameterList, arrowToken, body);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAsyncKeyword(asyncKeyword: SyntaxToken): ParenthesizedLambdaExpressionSyntax {
            return this.Update(asyncKeyword, this.ParameterList, this.ArrowToken, this.Body);
        }

        public WithParameterList(parameterList: ParameterListSyntax): ParenthesizedLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, parameterList, this.ArrowToken, this.Body);
        }

        public WithArrowToken(arrowToken: SyntaxToken): ParenthesizedLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.ParameterList, arrowToken, this.Body);
        }

        public WithBody(body: CSharpSyntaxNode): ParenthesizedLambdaExpressionSyntax {
            return this.Update(this.AsyncKeyword, this.ParameterList, this.ArrowToken, body);
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): ParenthesizedLambdaExpressionSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }
    }

    export class InitializerExpressionSyntax extends ExpressionSyntax {
        private expressions: SyntaxNode;

        constructor() { super(); }
        ctor_9252(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InitializerExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InitializerExpressionSyntax>this.Green).openBraceToken, this.Position, 0); }
        }

        public get Expressions(): SeparatedSyntaxList<ExpressionSyntax> {
            {
                var ref = { refObj: this.expressions };
                var red = this.GetRed_2015(ref, 1);
                this.expressions = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ExpressionSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InitializerExpressionSyntax>this.Green).closeBraceToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expressions };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expressions = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expressions;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitInitializerExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitInitializerExpression(this);
        }

        public Update(openBraceToken: SyntaxToken, expressions: SeparatedSyntaxList<ExpressionSyntax>, closeBraceToken: SyntaxToken): InitializerExpressionSyntax {
            if (openBraceToken != this.OpenBraceToken || expressions != this.Expressions || closeBraceToken != this.CloseBraceToken) {
                var newNode = SyntaxFactory.InitializerExpression_1979(this.CSharpKind(), openBraceToken, expressions, closeBraceToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): InitializerExpressionSyntax {
            return this.Update(openBraceToken, this.Expressions, this.CloseBraceToken);
        }

        public WithExpressions(expressions: SeparatedSyntaxList<ExpressionSyntax>): InitializerExpressionSyntax {
            return this.Update(this.OpenBraceToken, expressions, this.CloseBraceToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): InitializerExpressionSyntax {
            return this.Update(this.OpenBraceToken, this.Expressions, closeBraceToken);
        }

        public AddExpressions(...items: ExpressionSyntax[]): InitializerExpressionSyntax {
            return this.WithExpressions(this.Expressions.AddRange(items));
        }
    }

    export class ObjectCreationExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;
        private argumentList: ArgumentListSyntax;
        private initializer: InitializerExpressionSyntax;

        constructor() { super(); }
        ctor_2065(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ObjectCreationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get NewKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ObjectCreationExpressionSyntax>this.Green).newKeyword, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get ArgumentList(): ArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 2);
                this.argumentList = ref.refObj; return result;
            }
        }

        public get Initializer(): InitializerExpressionSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 3);
                this.initializer = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.argumentList = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.initializer = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                case 2: return this.argumentList;
                case 3: return this.initializer;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitObjectCreationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitObjectCreationExpression(this);
        }

        public Update(newKeyword: SyntaxToken, type: TypeSyntax, argumentList: ArgumentListSyntax, initializer: InitializerExpressionSyntax): ObjectCreationExpressionSyntax {
            if (newKeyword != this.NewKeyword || type != this.Type || argumentList != this.ArgumentList || initializer != this.Initializer) {
                var newNode = SyntaxFactory.ObjectCreationExpression_7070(newKeyword, type, argumentList, initializer);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNewKeyword(newKeyword: SyntaxToken): ObjectCreationExpressionSyntax {
            return this.Update(newKeyword, this.Type, this.ArgumentList, this.Initializer);
        }

        public WithType(type: TypeSyntax): ObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, type, this.ArgumentList, this.Initializer);
        }

        public WithArgumentList(argumentList: ArgumentListSyntax): ObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.Type, argumentList, this.Initializer);
        }

        public WithInitializer(initializer: InitializerExpressionSyntax): ObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.Type, this.ArgumentList, initializer);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): ObjectCreationExpressionSyntax {
            var argumentList = this.ArgumentList != null ? this.ArgumentList : SyntaxFactory.ArgumentList_1288();
            return this.WithArgumentList(argumentList.WithArguments(argumentList.Arguments.AddRange(items)));
        }
    }

    export class AnonymousObjectMemberDeclaratorSyntax extends CSharpSyntaxNode {
        private nameEquals: NameEqualsSyntax;
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_5348(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AnonymousObjectMemberDeclaratorSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get NameEquals(): NameEqualsSyntax {
            {
                var ref = { refObj: this.nameEquals };
                var result = this.GetRedAtZero_2231(ref);
                this.nameEquals = ref.refObj; return result;
            }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.nameEquals };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.nameEquals = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.nameEquals;
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAnonymousObjectMemberDeclarator(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAnonymousObjectMemberDeclarator(this);
        }

        public Update(nameEquals: NameEqualsSyntax, expression: ExpressionSyntax): AnonymousObjectMemberDeclaratorSyntax {
            if (nameEquals != this.NameEquals || expression != this.Expression) {
                var newNode = SyntaxFactory.AnonymousObjectMemberDeclarator_1075(nameEquals, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNameEquals(nameEquals: NameEqualsSyntax): AnonymousObjectMemberDeclaratorSyntax {
            return this.Update(nameEquals, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): AnonymousObjectMemberDeclaratorSyntax {
            return this.Update(this.NameEquals, expression);
        }
    }

    export class AnonymousObjectCreationExpressionSyntax extends ExpressionSyntax {
        private initializers: SyntaxNode;

        constructor() { super(); }
        ctor_1554(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AnonymousObjectCreationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get NewKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousObjectCreationExpressionSyntax>this.Green).newKeyword, this.Position, 0); }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousObjectCreationExpressionSyntax>this.Green).openBraceToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Initializers(): SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax> {
            {
                var ref = { refObj: this.initializers };
                var red = this.GetRed_2015(ref, 2);
                this.initializers = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax>().ctor_9044(red, this.GetChildIndex(2));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AnonymousObjectCreationExpressionSyntax>this.Green).closeBraceToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.initializers };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.initializers = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.initializers;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAnonymousObjectCreationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAnonymousObjectCreationExpression(this);
        }

        public Update(newKeyword: SyntaxToken, openBraceToken: SyntaxToken, initializers: SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax>, closeBraceToken: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            if (newKeyword != this.NewKeyword || openBraceToken != this.OpenBraceToken || initializers != this.Initializers || closeBraceToken != this.CloseBraceToken) {
                var newNode = SyntaxFactory.AnonymousObjectCreationExpression_6133(newKeyword, openBraceToken, initializers, closeBraceToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNewKeyword(newKeyword: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            return this.Update(newKeyword, this.OpenBraceToken, this.Initializers, this.CloseBraceToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, openBraceToken, this.Initializers, this.CloseBraceToken);
        }

        public WithInitializers(initializers: SeparatedSyntaxList<AnonymousObjectMemberDeclaratorSyntax>): AnonymousObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.OpenBraceToken, initializers, this.CloseBraceToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): AnonymousObjectCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.OpenBraceToken, this.Initializers, closeBraceToken);
        }

        public AddInitializers(...items: AnonymousObjectMemberDeclaratorSyntax[]): AnonymousObjectCreationExpressionSyntax {
            return this.WithInitializers(this.Initializers.AddRange(items));
        }
    }

    export class ArrayCreationExpressionSyntax extends ExpressionSyntax {
        private type: ArrayTypeSyntax;
        private initializer: InitializerExpressionSyntax;

        constructor() { super(); }
        ctor_4775(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArrayCreationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get NewKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrayCreationExpressionSyntax>this.Green).newKeyword, this.Position, 0); }
        }

        public get Type(): ArrayTypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get Initializer(): InitializerExpressionSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 2);
                this.initializer = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.initializer = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                case 2: return this.initializer;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArrayCreationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArrayCreationExpression(this);
        }

        public Update(newKeyword: SyntaxToken, type: ArrayTypeSyntax, initializer: InitializerExpressionSyntax): ArrayCreationExpressionSyntax {
            if (newKeyword != this.NewKeyword || type != this.Type || initializer != this.Initializer) {
                var newNode = SyntaxFactory.ArrayCreationExpression_1446(newKeyword, type, initializer);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNewKeyword(newKeyword: SyntaxToken): ArrayCreationExpressionSyntax {
            return this.Update(newKeyword, this.Type, this.Initializer);
        }

        public WithType(type: ArrayTypeSyntax): ArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, type, this.Initializer);
        }

        public WithInitializer(initializer: InitializerExpressionSyntax): ArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.Type, initializer);
        }

        public AddTypeRankSpecifiers(...items: ArrayRankSpecifierSyntax[]): ArrayCreationExpressionSyntax {
            return this.WithType(this.Type.WithRankSpecifiers(this.Type.RankSpecifiers.AddRange(items)));
        }
    }

    export class ImplicitArrayCreationExpressionSyntax extends ExpressionSyntax {
        private initializer: InitializerExpressionSyntax;

        constructor() { super(); }
        ctor_1315(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ImplicitArrayCreationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get NewKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ImplicitArrayCreationExpressionSyntax>this.Green).newKeyword, this.Position, 0); }
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ImplicitArrayCreationExpressionSyntax>this.Green).openBracketToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Commas(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(2);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(2), this.GetChildIndex(2));

                return structDefault(SyntaxTokenList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ImplicitArrayCreationExpressionSyntax>this.Green).closeBracketToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Initializer(): InitializerExpressionSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 4);
                this.initializer = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 4:
                    var ref4 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.initializer = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 4: return this.initializer;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitImplicitArrayCreationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitImplicitArrayCreationExpression(this);
        }

        public Update(newKeyword: SyntaxToken, openBracketToken: SyntaxToken, commas: SyntaxTokenList, closeBracketToken: SyntaxToken, initializer: InitializerExpressionSyntax): ImplicitArrayCreationExpressionSyntax {
            if (newKeyword != this.NewKeyword || openBracketToken != this.OpenBracketToken || commas != this.Commas || closeBracketToken != this.CloseBracketToken || initializer != this.Initializer) {
                var newNode = SyntaxFactory.ImplicitArrayCreationExpression_2138(newKeyword, openBracketToken, commas, closeBracketToken, initializer);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNewKeyword(newKeyword: SyntaxToken): ImplicitArrayCreationExpressionSyntax {
            return this.Update(newKeyword, this.OpenBracketToken, this.Commas, this.CloseBracketToken, this.Initializer);
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): ImplicitArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, openBracketToken, this.Commas, this.CloseBracketToken, this.Initializer);
        }

        public WithCommas(commas: SyntaxTokenList): ImplicitArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.OpenBracketToken, commas, this.CloseBracketToken, this.Initializer);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): ImplicitArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.OpenBracketToken, this.Commas, closeBracketToken, this.Initializer);
        }

        public WithInitializer(initializer: InitializerExpressionSyntax): ImplicitArrayCreationExpressionSyntax {
            return this.Update(this.NewKeyword, this.OpenBracketToken, this.Commas, this.CloseBracketToken, initializer);
        }

        public AddCommas(...items: SyntaxToken[]): ImplicitArrayCreationExpressionSyntax {
            return this.WithCommas(this.Commas.AddRange(items));
        }

        public AddInitializerExpressions(...items: ExpressionSyntax[]): ImplicitArrayCreationExpressionSyntax {
            return this.WithInitializer(this.Initializer.WithExpressions(this.Initializer.Expressions.AddRange(items)));
        }
    }

    export class StackAllocArrayCreationExpressionSyntax extends ExpressionSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1350(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): StackAllocArrayCreationExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get StackAllocKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StackAllocArrayCreationExpressionSyntax>this.Green).stackAllocKeyword, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitStackAllocArrayCreationExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitStackAllocArrayCreationExpression(this);
        }

        public Update(stackAllocKeyword: SyntaxToken, type: TypeSyntax): StackAllocArrayCreationExpressionSyntax {
            if (stackAllocKeyword != this.StackAllocKeyword || type != this.Type) {
                var newNode = SyntaxFactory.StackAllocArrayCreationExpression_1830(stackAllocKeyword, type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStackAllocKeyword(stackAllocKeyword: SyntaxToken): StackAllocArrayCreationExpressionSyntax {
            return this.Update(stackAllocKeyword, this.Type);
        }

        public WithType(type: TypeSyntax): StackAllocArrayCreationExpressionSyntax {
            return this.Update(this.StackAllocKeyword, type);
        }
    }

    export class QueryClauseSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1944(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QueryClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class SelectOrGroupClauseSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_2028(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SelectOrGroupClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class QueryExpressionSyntax extends ExpressionSyntax {
        private fromClause: FromClauseSyntax;
        private body: QueryBodySyntax;

        constructor() { super(); }
        ctor_1529(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QueryExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get FromClause(): FromClauseSyntax {
            {
                var ref = { refObj: this.fromClause };
                var result = this.GetRedAtZero_2231(ref);
                this.fromClause = ref.refObj; return result;
            }
        }

        public get Body(): QueryBodySyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 1);
                this.body = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.fromClause };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.fromClause = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.body = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.fromClause;
                case 1: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitQueryExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitQueryExpression(this);
        }

        public Update(fromClause: FromClauseSyntax, body: QueryBodySyntax): QueryExpressionSyntax {
            if (fromClause != this.FromClause || body != this.Body) {
                var newNode = SyntaxFactory.QueryExpression(fromClause, body);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithFromClause(fromClause: FromClauseSyntax): QueryExpressionSyntax {
            return this.Update(fromClause, this.Body);
        }

        public WithBody(body: QueryBodySyntax): QueryExpressionSyntax {
            return this.Update(this.FromClause, body);
        }

        public AddBodyClauses(...items: QueryClauseSyntax[]): QueryExpressionSyntax {
            return this.WithBody(this.Body.WithClauses(this.Body.Clauses.AddRange(items)));
        }
    }

    export class QueryBodySyntax extends CSharpSyntaxNode {
        private clauses: CSharpSyntaxNode;
        private selectOrGroup: SelectOrGroupClauseSyntax;
        private continuation: QueryContinuationSyntax;

        constructor() { super(); }
        ctor_1968(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QueryBodySyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Clauses(): SyntaxList<QueryClauseSyntax> {
            {
                var ref = { refObj: this.clauses };
                var result = new SyntaxList<QueryClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.clauses = ref.refObj; return result;
            }
        }

        public get SelectOrGroup(): SelectOrGroupClauseSyntax {
            {
                var ref = { refObj: this.selectOrGroup };
                var result = this.GetRed_2015(ref, 1);
                this.selectOrGroup = ref.refObj; return result;
            }
        }

        public get Continuation(): QueryContinuationSyntax {
            {
                var ref = { refObj: this.continuation };
                var result = this.GetRed_2015(ref, 2);
                this.continuation = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.clauses };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.clauses = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.selectOrGroup };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.selectOrGroup = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.continuation };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.continuation = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.clauses;
                case 1: return this.selectOrGroup;
                case 2: return this.continuation;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitQueryBody(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitQueryBody(this);
        }

        public Update(clauses: SyntaxList<QueryClauseSyntax>, selectOrGroup: SelectOrGroupClauseSyntax, continuation: QueryContinuationSyntax): QueryBodySyntax {
            if (clauses != this.Clauses || selectOrGroup != this.SelectOrGroup || continuation != this.Continuation) {
                var newNode = SyntaxFactory.QueryBody_1176(clauses, selectOrGroup, continuation);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithClauses(clauses: SyntaxList<QueryClauseSyntax>): QueryBodySyntax {
            return this.Update(clauses, this.SelectOrGroup, this.Continuation);
        }

        public WithSelectOrGroup(selectOrGroup: SelectOrGroupClauseSyntax): QueryBodySyntax {
            return this.Update(this.Clauses, selectOrGroup, this.Continuation);
        }

        public WithContinuation(continuation: QueryContinuationSyntax): QueryBodySyntax {
            return this.Update(this.Clauses, this.SelectOrGroup, continuation);
        }

        public AddClauses(...items: QueryClauseSyntax[]): QueryBodySyntax {
            return this.WithClauses(this.Clauses.AddRange(items));
        }
    }

    export class FromClauseSyntax extends QueryClauseSyntax {
        private type: TypeSyntax;
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1530(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): FromClauseSyntax {
            super.ctor_1944(green, parent, position); return this;
        }

        public get FromKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FromClauseSyntax>this.Green).fromKeyword, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FromClauseSyntax>this.Green).identifier, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get InKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FromClauseSyntax>this.Green).inKeyword, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 4);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.expression = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                case 4: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitFromClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitFromClause(this);
        }

        public Update(fromKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax): FromClauseSyntax {
            if (fromKeyword != this.FromKeyword || type != this.Type || identifier != this.Identifier || inKeyword != this.InKeyword || expression != this.Expression) {
                var newNode = SyntaxFactory.FromClause_4646(fromKeyword, type, identifier, inKeyword, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithFromKeyword(fromKeyword: SyntaxToken): FromClauseSyntax {
            return this.Update(fromKeyword, this.Type, this.Identifier, this.InKeyword, this.Expression);
        }

        public WithType(type: TypeSyntax): FromClauseSyntax {
            return this.Update(this.FromKeyword, type, this.Identifier, this.InKeyword, this.Expression);
        }

        public WithIdentifier(identifier: SyntaxToken): FromClauseSyntax {
            return this.Update(this.FromKeyword, this.Type, identifier, this.InKeyword, this.Expression);
        }

        public WithInKeyword(inKeyword: SyntaxToken): FromClauseSyntax {
            return this.Update(this.FromKeyword, this.Type, this.Identifier, inKeyword, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): FromClauseSyntax {
            return this.Update(this.FromKeyword, this.Type, this.Identifier, this.InKeyword, expression);
        }
    }

    export class LetClauseSyntax extends QueryClauseSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_7080(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LetClauseSyntax {
            super.ctor_1944(green, parent, position); return this;
        }

        public get LetKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LetClauseSyntax>this.Green).letKeyword, this.Position, 0); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LetClauseSyntax>this.Green).identifier, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LetClauseSyntax>this.Green).equalsToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 3);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 3:
                    var ref3 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.expression = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 3: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLetClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLetClause(this);
        }

        public Update(letKeyword: SyntaxToken, identifier: SyntaxToken, equalsToken: SyntaxToken, expression: ExpressionSyntax): LetClauseSyntax {
            if (letKeyword != this.LetKeyword || identifier != this.Identifier || equalsToken != this.EqualsToken || expression != this.Expression) {
                var newNode = SyntaxFactory.LetClause_9775(letKeyword, identifier, equalsToken, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLetKeyword(letKeyword: SyntaxToken): LetClauseSyntax {
            return this.Update(letKeyword, this.Identifier, this.EqualsToken, this.Expression);
        }

        public WithIdentifier(identifier: SyntaxToken): LetClauseSyntax {
            return this.Update(this.LetKeyword, identifier, this.EqualsToken, this.Expression);
        }

        public WithEqualsToken(equalsToken: SyntaxToken): LetClauseSyntax {
            return this.Update(this.LetKeyword, this.Identifier, equalsToken, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): LetClauseSyntax {
            return this.Update(this.LetKeyword, this.Identifier, this.EqualsToken, expression);
        }
    }

    export class JoinClauseSyntax extends QueryClauseSyntax {
        private type: TypeSyntax;
        private inExpression: ExpressionSyntax;
        private leftExpression: ExpressionSyntax;
        private rightExpression: ExpressionSyntax;
        private into: JoinIntoClauseSyntax;

        constructor() { super(); }
        ctor_1474(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): JoinClauseSyntax {
            super.ctor_1944(green, parent, position); return this;
        }

        public get JoinKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinClauseSyntax>this.Green).joinKeyword, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinClauseSyntax>this.Green).identifier, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get InKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinClauseSyntax>this.Green).inKeyword, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get InExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.inExpression };
                var result = this.GetRed_2015(ref, 4);
                this.inExpression = ref.refObj; return result;
            }
        }

        public get OnKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinClauseSyntax>this.Green).onKeyword, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get LeftExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.leftExpression };
                var result = this.GetRed_2015(ref, 6);
                this.leftExpression = ref.refObj; return result;
            }
        }

        public get EqualsKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinClauseSyntax>this.Green).equalsKeyword, this.GetChildPosition(7), this.GetChildIndex(7)); }
        }

        public get RightExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.rightExpression };
                var result = this.GetRed_2015(ref, 8);
                this.rightExpression = ref.refObj; return result;
            }
        }

        public get Into(): JoinIntoClauseSyntax {
            {
                var ref = { refObj: this.into };
                var result = this.GetRed_2015(ref, 9);
                this.into = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.inExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.inExpression = ref4.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.leftExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.leftExpression = ref6.refObj; return result;
                case 8:
                    var ref8 = { refObj: this.rightExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref8, 8);
                    this.rightExpression = ref8.refObj; return result;
                case 9:
                    var ref9 = { refObj: this.into };
                    var result: SyntaxNode = this.GetRed_2015(ref9, 9);
                    this.into = ref9.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                case 4: return this.inExpression;
                case 6: return this.leftExpression;
                case 8: return this.rightExpression;
                case 9: return this.into;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitJoinClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitJoinClause(this);
        }

        public Update(joinKeyword: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, inExpression: ExpressionSyntax, onKeyword: SyntaxToken, leftExpression: ExpressionSyntax, equalsKeyword: SyntaxToken, rightExpression: ExpressionSyntax, into: JoinIntoClauseSyntax): JoinClauseSyntax {
            if (joinKeyword != this.JoinKeyword || type != this.Type || identifier != this.Identifier || inKeyword != this.InKeyword || inExpression != this.InExpression || onKeyword != this.OnKeyword || leftExpression != this.LeftExpression || equalsKeyword != this.EqualsKeyword || rightExpression != this.RightExpression || into != this.Into) {
                var newNode = SyntaxFactory.JoinClause_1396(joinKeyword, type, identifier, inKeyword, inExpression, onKeyword, leftExpression, equalsKeyword, rightExpression, into);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithJoinKeyword(joinKeyword: SyntaxToken): JoinClauseSyntax {
            return this.Update(joinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithType(type: TypeSyntax): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithIdentifier(identifier: SyntaxToken): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithInKeyword(inKeyword: SyntaxToken): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, inKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithInExpression(inExpression: ExpressionSyntax): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, inExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithOnKeyword(onKeyword: SyntaxToken): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, onKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithLeftExpression(leftExpression: ExpressionSyntax): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, leftExpression, this.EqualsKeyword, this.RightExpression, this.Into);
        }

        public WithEqualsKeyword(equalsKeyword: SyntaxToken): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, equalsKeyword, this.RightExpression, this.Into);
        }

        public WithRightExpression(rightExpression: ExpressionSyntax): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, rightExpression, this.Into);
        }

        public WithInto(into: JoinIntoClauseSyntax): JoinClauseSyntax {
            return this.Update(this.JoinKeyword, this.Type, this.Identifier, this.InKeyword, this.InExpression, this.OnKeyword, this.LeftExpression, this.EqualsKeyword, this.RightExpression, into);
        }
    }

    export class JoinIntoClauseSyntax extends CSharpSyntaxNode {

        constructor() { super(); }
        ctor_3874(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): JoinIntoClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get IntoKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinIntoClauseSyntax>this.Green).intoKeyword, this.Position, 0); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.JoinIntoClauseSyntax>this.Green).identifier, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitJoinIntoClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitJoinIntoClause(this);
        }

        public Update(intoKeyword: SyntaxToken, identifier: SyntaxToken): JoinIntoClauseSyntax {
            if (intoKeyword != this.IntoKeyword || identifier != this.Identifier) {
                var newNode = SyntaxFactory.JoinIntoClause_2046(intoKeyword, identifier);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIntoKeyword(intoKeyword: SyntaxToken): JoinIntoClauseSyntax {
            return this.Update(intoKeyword, this.Identifier);
        }

        public WithIdentifier(identifier: SyntaxToken): JoinIntoClauseSyntax {
            return this.Update(this.IntoKeyword, identifier);
        }
    }

    export class WhereClauseSyntax extends QueryClauseSyntax {
        private condition: ExpressionSyntax;

        constructor() { super(); }
        ctor_6964(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): WhereClauseSyntax {
            super.ctor_1944(green, parent, position); return this;
        }

        public get WhereKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WhereClauseSyntax>this.Green).whereKeyword, this.Position, 0); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 1);
                this.condition = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.condition = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.condition;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitWhereClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitWhereClause(this);
        }

        public Update(whereKeyword: SyntaxToken, condition: ExpressionSyntax): WhereClauseSyntax {
            if (whereKeyword != this.WhereKeyword || condition != this.Condition) {
                var newNode = SyntaxFactory.WhereClause_3161(whereKeyword, condition);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithWhereKeyword(whereKeyword: SyntaxToken): WhereClauseSyntax {
            return this.Update(whereKeyword, this.Condition);
        }

        public WithCondition(condition: ExpressionSyntax): WhereClauseSyntax {
            return this.Update(this.WhereKeyword, condition);
        }
    }

    export class OrderByClauseSyntax extends QueryClauseSyntax {
        private orderings: SyntaxNode;

        constructor() { super(); }
        ctor_7165(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OrderByClauseSyntax {
            super.ctor_1944(green, parent, position); return this;
        }

        public get OrderByKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OrderByClauseSyntax>this.Green).orderByKeyword, this.Position, 0); }
        }

        public get Orderings(): SeparatedSyntaxList<OrderingSyntax> {
            {
                var ref = { refObj: this.orderings };
                var red = this.GetRed_2015(ref, 1);
                this.orderings = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<OrderingSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.orderings };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.orderings = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.orderings;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOrderByClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOrderByClause(this);
        }

        public Update(orderByKeyword: SyntaxToken, orderings: SeparatedSyntaxList<OrderingSyntax>): OrderByClauseSyntax {
            if (orderByKeyword != this.OrderByKeyword || orderings != this.Orderings) {
                var newNode = SyntaxFactory.OrderByClause_4578(orderByKeyword, orderings);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOrderByKeyword(orderByKeyword: SyntaxToken): OrderByClauseSyntax {
            return this.Update(orderByKeyword, this.Orderings);
        }

        public WithOrderings(orderings: SeparatedSyntaxList<OrderingSyntax>): OrderByClauseSyntax {
            return this.Update(this.OrderByKeyword, orderings);
        }

        public AddOrderings(...items: OrderingSyntax[]): OrderByClauseSyntax {
            return this.WithOrderings(this.Orderings.AddRange(items));
        }
    }

    export class OrderingSyntax extends CSharpSyntaxNode {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1222(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OrderingSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get AscendingOrDescendingKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OrderingSyntax>this.Green).ascendingOrDescendingKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOrdering(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOrdering(this);
        }

        public Update(expression: ExpressionSyntax, ascendingOrDescendingKeyword: SyntaxToken): OrderingSyntax {
            if (expression != this.Expression || ascendingOrDescendingKeyword != this.AscendingOrDescendingKeyword) {
                var newNode = SyntaxFactory.Ordering_1799(this.CSharpKind(), expression, ascendingOrDescendingKeyword);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): OrderingSyntax {
            return this.Update(expression, this.AscendingOrDescendingKeyword);
        }

        public WithAscendingOrDescendingKeyword(ascendingOrDescendingKeyword: SyntaxToken): OrderingSyntax {
            return this.Update(this.Expression, ascendingOrDescendingKeyword);
        }
    }

    export class SelectClauseSyntax extends SelectOrGroupClauseSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_2370(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SelectClauseSyntax {
            super.ctor_2028(green, parent, position); return this;
        }

        public get SelectKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SelectClauseSyntax>this.Green).selectKeyword, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSelectClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSelectClause(this);
        }

        public Update(selectKeyword: SyntaxToken, expression: ExpressionSyntax): SelectClauseSyntax {
            if (selectKeyword != this.SelectKeyword || expression != this.Expression) {
                var newNode = SyntaxFactory.SelectClause_1144(selectKeyword, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithSelectKeyword(selectKeyword: SyntaxToken): SelectClauseSyntax {
            return this.Update(selectKeyword, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): SelectClauseSyntax {
            return this.Update(this.SelectKeyword, expression);
        }
    }

    export class GroupClauseSyntax extends SelectOrGroupClauseSyntax {
        private groupExpression: ExpressionSyntax;
        private byExpression: ExpressionSyntax;

        constructor() { super(); }
        ctor_3745(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): GroupClauseSyntax {
            super.ctor_2028(green, parent, position); return this;
        }

        public get GroupKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GroupClauseSyntax>this.Green).groupKeyword, this.Position, 0); }
        }

        public get GroupExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.groupExpression };
                var result = this.GetRed_2015(ref, 1);
                this.groupExpression = ref.refObj; return result;
            }
        }

        public get ByKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GroupClauseSyntax>this.Green).byKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get ByExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.byExpression };
                var result = this.GetRed_2015(ref, 3);
                this.byExpression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.groupExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.groupExpression = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.byExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.byExpression = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.groupExpression;
                case 3: return this.byExpression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitGroupClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitGroupClause(this);
        }

        public Update(groupKeyword: SyntaxToken, groupExpression: ExpressionSyntax, byKeyword: SyntaxToken, byExpression: ExpressionSyntax): GroupClauseSyntax {
            if (groupKeyword != this.GroupKeyword || groupExpression != this.GroupExpression || byKeyword != this.ByKeyword || byExpression != this.ByExpression) {
                var newNode = SyntaxFactory.GroupClause_1229(groupKeyword, groupExpression, byKeyword, byExpression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithGroupKeyword(groupKeyword: SyntaxToken): GroupClauseSyntax {
            return this.Update(groupKeyword, this.GroupExpression, this.ByKeyword, this.ByExpression);
        }

        public WithGroupExpression(groupExpression: ExpressionSyntax): GroupClauseSyntax {
            return this.Update(this.GroupKeyword, groupExpression, this.ByKeyword, this.ByExpression);
        }

        public WithByKeyword(byKeyword: SyntaxToken): GroupClauseSyntax {
            return this.Update(this.GroupKeyword, this.GroupExpression, byKeyword, this.ByExpression);
        }

        public WithByExpression(byExpression: ExpressionSyntax): GroupClauseSyntax {
            return this.Update(this.GroupKeyword, this.GroupExpression, this.ByKeyword, byExpression);
        }
    }

    export class QueryContinuationSyntax extends CSharpSyntaxNode {
        private body: QueryBodySyntax;

        constructor() { super(); }
        ctor_9699(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QueryContinuationSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get IntoKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryContinuationSyntax>this.Green).intoKeyword, this.Position, 0); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QueryContinuationSyntax>this.Green).identifier, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Body(): QueryBodySyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 2);
                this.body = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.body = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitQueryContinuation(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitQueryContinuation(this);
        }

        public Update(intoKeyword: SyntaxToken, identifier: SyntaxToken, body: QueryBodySyntax): QueryContinuationSyntax {
            if (intoKeyword != this.IntoKeyword || identifier != this.Identifier || body != this.Body) {
                var newNode = SyntaxFactory.QueryContinuation_1244(intoKeyword, identifier, body);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIntoKeyword(intoKeyword: SyntaxToken): QueryContinuationSyntax {
            return this.Update(intoKeyword, this.Identifier, this.Body);
        }

        public WithIdentifier(identifier: SyntaxToken): QueryContinuationSyntax {
            return this.Update(this.IntoKeyword, identifier, this.Body);
        }

        public WithBody(body: QueryBodySyntax): QueryContinuationSyntax {
            return this.Update(this.IntoKeyword, this.Identifier, body);
        }

        public AddBodyClauses(...items: QueryClauseSyntax[]): QueryContinuationSyntax {
            return this.WithBody(this.Body.WithClauses(this.Body.Clauses.AddRange(items)));
        }
    }

    export class OmittedArraySizeExpressionSyntax extends ExpressionSyntax {

        constructor() { super(); }
        ctor_1950(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OmittedArraySizeExpressionSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get OmittedArraySizeExpressionToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OmittedArraySizeExpressionSyntax>this.Green).omittedArraySizeExpressionToken, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOmittedArraySizeExpression(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOmittedArraySizeExpression(this);
        }

        public Update(omittedArraySizeExpressionToken: SyntaxToken): OmittedArraySizeExpressionSyntax {
            if (omittedArraySizeExpressionToken != this.OmittedArraySizeExpressionToken) {
                var newNode = SyntaxFactory.OmittedArraySizeExpression_2029(omittedArraySizeExpressionToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOmittedArraySizeExpressionToken(omittedArraySizeExpressionToken: SyntaxToken): OmittedArraySizeExpressionSyntax {
            return this.Update(omittedArraySizeExpressionToken);
        }
    }

    export class GlobalStatementSyntax extends MemberDeclarationSyntax {
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_1315(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): GlobalStatementSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRedAtZero_2231(ref);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.statement = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitGlobalStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitGlobalStatement(this);
        }

        public Update(statement: StatementSyntax): GlobalStatementSyntax {
            if (statement != this.Statement) {
                var newNode = SyntaxFactory.GlobalStatement(statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStatement(statement: StatementSyntax): GlobalStatementSyntax {
            return this.Update(statement);
        }
    }

    export class StatementSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_9341(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): StatementSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class BlockSyntax extends StatementSyntax {
        private statements: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_2388(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BlockSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>this.Green).openBraceToken, this.Position, 0); }
        }

        public get Statements(): SyntaxList<StatementSyntax> {
            {
                var ref = { refObj: this.statements };
                var result = new SyntaxList<StatementSyntax>().ctor_6698(this.GetRed_2015(ref, 1));
                this.statements = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BlockSyntax>this.Green).closeBraceToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.statements };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.statements = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.statements;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBlock(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBlock(this);
        }

        public Update(openBraceToken: SyntaxToken, statements: SyntaxList<StatementSyntax>, closeBraceToken: SyntaxToken): BlockSyntax {
            if (openBraceToken != this.OpenBraceToken || statements != this.Statements || closeBraceToken != this.CloseBraceToken) {
                var newNode = SyntaxFactory.Block_1784(openBraceToken, statements, closeBraceToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): BlockSyntax {
            return this.Update(openBraceToken, this.Statements, this.CloseBraceToken);
        }

        public WithStatements(statements: SyntaxList<StatementSyntax>): BlockSyntax {
            return this.Update(this.OpenBraceToken, statements, this.CloseBraceToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): BlockSyntax {
            return this.Update(this.OpenBraceToken, this.Statements, closeBraceToken);
        }

        public AddStatements(...items: StatementSyntax[]): BlockSyntax {
            return this.WithStatements(this.Statements.AddRange(items));
        }
    }

    export class LocalDeclarationStatementSyntax extends StatementSyntax {
        private declaration: VariableDeclarationSyntax;

        constructor() { super(); }
        ctor_1590(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LocalDeclarationStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(0);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.Position, 0);

                return structDefault(SyntaxTokenList);
            }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 1);
                this.declaration = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LocalDeclarationStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.declaration = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.declaration;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLocalDeclarationStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLocalDeclarationStatement(this);
        }

        public Update(modifiers: SyntaxTokenList, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): LocalDeclarationStatementSyntax {
            if (modifiers != this.Modifiers || declaration != this.Declaration || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.LocalDeclarationStatement_8668(modifiers, declaration, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithModifiers(modifiers: SyntaxTokenList): LocalDeclarationStatementSyntax {
            return this.Update(modifiers, this.Declaration, this.SemicolonToken);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): LocalDeclarationStatementSyntax {
            return this.Update(this.Modifiers, declaration, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): LocalDeclarationStatementSyntax {
            return this.Update(this.Modifiers, this.Declaration, semicolonToken);
        }

        public AddModifiers(...items: SyntaxToken[]): LocalDeclarationStatementSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddDeclarationVariables(...items: VariableDeclaratorSyntax[]): LocalDeclarationStatementSyntax {
            return this.WithDeclaration(this.Declaration.WithVariables(this.Declaration.Variables.AddRange(items)));
        }
    }

    export class VariableDeclarationSyntax extends CSharpSyntaxNode {
        private type: TypeSyntax;
        private variables: SyntaxNode;

        constructor() { super(); }
        ctor_3026(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): VariableDeclarationSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRedAtZero_2231(ref);
                this.type = ref.refObj; return result;
            }
        }

        public get Variables(): SeparatedSyntaxList<VariableDeclaratorSyntax> {
            {
                var ref = { refObj: this.variables };
                var red = this.GetRed_2015(ref, 1);
                this.variables = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<VariableDeclaratorSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.type = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.variables };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.variables = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.type;
                case 1: return this.variables;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitVariableDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitVariableDeclaration(this);
        }

        public Update(type: TypeSyntax, variables: SeparatedSyntaxList<VariableDeclaratorSyntax>): VariableDeclarationSyntax {
            if (type != this.Type || variables != this.Variables) {
                var newNode = SyntaxFactory.VariableDeclaration_1163(type, variables);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithType(type: TypeSyntax): VariableDeclarationSyntax {
            return this.Update(type, this.Variables);
        }

        public WithVariables(variables: SeparatedSyntaxList<VariableDeclaratorSyntax>): VariableDeclarationSyntax {
            return this.Update(this.Type, variables);
        }

        public AddVariables(...items: VariableDeclaratorSyntax[]): VariableDeclarationSyntax {
            return this.WithVariables(this.Variables.AddRange(items));
        }
    }

    export class VariableDeclaratorSyntax extends CSharpSyntaxNode {
        private argumentList: BracketedArgumentListSyntax;
        private initializer: EqualsValueClauseSyntax;

        constructor() { super(); }
        ctor_1406(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): VariableDeclaratorSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.VariableDeclaratorSyntax>this.Green).identifier, this.Position, 0); }
        }

        public get ArgumentList(): BracketedArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 1);
                this.argumentList = ref.refObj; return result;
            }
        }

        public get Initializer(): EqualsValueClauseSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 2);
                this.initializer = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.argumentList = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.initializer = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.argumentList;
                case 2: return this.initializer;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitVariableDeclarator(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitVariableDeclarator(this);
        }

        public Update(identifier: SyntaxToken, argumentList: BracketedArgumentListSyntax, initializer: EqualsValueClauseSyntax): VariableDeclaratorSyntax {
            if (identifier != this.Identifier || argumentList != this.ArgumentList || initializer != this.Initializer) {
                var newNode = SyntaxFactory.VariableDeclarator_2274(identifier, argumentList, initializer);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIdentifier(identifier: SyntaxToken): VariableDeclaratorSyntax {
            return this.Update(identifier, this.ArgumentList, this.Initializer);
        }

        public WithArgumentList(argumentList: BracketedArgumentListSyntax): VariableDeclaratorSyntax {
            return this.Update(this.Identifier, argumentList, this.Initializer);
        }

        public WithInitializer(initializer: EqualsValueClauseSyntax): VariableDeclaratorSyntax {
            return this.Update(this.Identifier, this.ArgumentList, initializer);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): VariableDeclaratorSyntax {
            var argumentList = this.ArgumentList != null ? this.ArgumentList : SyntaxFactory.BracketedArgumentList_8387();
            return this.WithArgumentList(argumentList.WithArguments(argumentList.Arguments.AddRange(items)));
        }
    }

    export class EqualsValueClauseSyntax extends CSharpSyntaxNode {
        private value: ExpressionSyntax;

        constructor() { super(); }
        ctor_9464(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EqualsValueClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EqualsValueClauseSyntax>this.Green).equalsToken, this.Position, 0); }
        }

        public get Value(): ExpressionSyntax {
            {
                var ref = { refObj: this.value };
                var result = this.GetRed_2015(ref, 1);
                this.value = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.value };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.value = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.value;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEqualsValueClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEqualsValueClause(this);
        }

        public Update(equalsToken: SyntaxToken, value: ExpressionSyntax): EqualsValueClauseSyntax {
            if (equalsToken != this.EqualsToken || value != this.Value) {
                var newNode = SyntaxFactory.EqualsValueClause_1763(equalsToken, value);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithEqualsToken(equalsToken: SyntaxToken): EqualsValueClauseSyntax {
            return this.Update(equalsToken, this.Value);
        }

        public WithValue(value: ExpressionSyntax): EqualsValueClauseSyntax {
            return this.Update(this.EqualsToken, value);
        }
    }

    export class ExpressionStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1290(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ExpressionStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExpressionStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitExpressionStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitExpressionStatement(this);
        }

        public Update(expression: ExpressionSyntax, semicolonToken: SyntaxToken): ExpressionStatementSyntax {
            if (expression != this.Expression || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ExpressionStatement_1248(expression, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): ExpressionStatementSyntax {
            return this.Update(expression, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ExpressionStatementSyntax {
            return this.Update(this.Expression, semicolonToken);
        }
    }

    export class EmptyStatementSyntax extends StatementSyntax {

        constructor() { super(); }
        ctor_1090(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EmptyStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EmptyStatementSyntax>this.Green).semicolonToken, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEmptyStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEmptyStatement(this);
        }

        public Update(semicolonToken: SyntaxToken): EmptyStatementSyntax {
            if (semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.EmptyStatement_5677(semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): EmptyStatementSyntax {
            return this.Update(semicolonToken);
        }
    }

    export class LabeledStatementSyntax extends StatementSyntax {
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_2895(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LabeledStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LabeledStatementSyntax>this.Green).identifier, this.Position, 0); }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LabeledStatementSyntax>this.Green).colonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 2);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.statement = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLabeledStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLabeledStatement(this);
        }

        public Update(identifier: SyntaxToken, colonToken: SyntaxToken, statement: StatementSyntax): LabeledStatementSyntax {
            if (identifier != this.Identifier || colonToken != this.ColonToken || statement != this.Statement) {
                var newNode = SyntaxFactory.LabeledStatement_3705(identifier, colonToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIdentifier(identifier: SyntaxToken): LabeledStatementSyntax {
            return this.Update(identifier, this.ColonToken, this.Statement);
        }

        public WithColonToken(colonToken: SyntaxToken): LabeledStatementSyntax {
            return this.Update(this.Identifier, colonToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): LabeledStatementSyntax {
            return this.Update(this.Identifier, this.ColonToken, statement);
        }
    }

    export class GotoStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1317(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): GotoStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get GotoKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GotoStatementSyntax>this.Green).gotoKeyword, this.Position, 0); }
        }

        public get CaseOrDefaultKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GotoStatementSyntax>this.Green).caseOrDefaultKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.GotoStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitGotoStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitGotoStatement(this);
        }

        public Update(gotoKeyword: SyntaxToken, caseOrDefaultKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): GotoStatementSyntax {
            if (gotoKeyword != this.GotoKeyword || caseOrDefaultKeyword != this.CaseOrDefaultKeyword || expression != this.Expression || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.GotoStatement_6985(this.CSharpKind(), gotoKeyword, caseOrDefaultKeyword, expression, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithGotoKeyword(gotoKeyword: SyntaxToken): GotoStatementSyntax {
            return this.Update(gotoKeyword, this.CaseOrDefaultKeyword, this.Expression, this.SemicolonToken);
        }

        public WithCaseOrDefaultKeyword(caseOrDefaultKeyword: SyntaxToken): GotoStatementSyntax {
            return this.Update(this.GotoKeyword, caseOrDefaultKeyword, this.Expression, this.SemicolonToken);
        }

        public WithExpression(expression: ExpressionSyntax): GotoStatementSyntax {
            return this.Update(this.GotoKeyword, this.CaseOrDefaultKeyword, expression, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): GotoStatementSyntax {
            return this.Update(this.GotoKeyword, this.CaseOrDefaultKeyword, this.Expression, semicolonToken);
        }
    }

    export class BreakStatementSyntax extends StatementSyntax {

        constructor() { super(); }
        ctor_1552(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BreakStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get BreakKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BreakStatementSyntax>this.Green).breakKeyword, this.Position, 0); }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BreakStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBreakStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBreakStatement(this);
        }

        public Update(breakKeyword: SyntaxToken, semicolonToken: SyntaxToken): BreakStatementSyntax {
            if (breakKeyword != this.BreakKeyword || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.BreakStatement_1042(breakKeyword, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithBreakKeyword(breakKeyword: SyntaxToken): BreakStatementSyntax {
            return this.Update(breakKeyword, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): BreakStatementSyntax {
            return this.Update(this.BreakKeyword, semicolonToken);
        }
    }

    export class ContinueStatementSyntax extends StatementSyntax {

        constructor() { super(); }
        ctor_1832(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ContinueStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get ContinueKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ContinueStatementSyntax>this.Green).continueKeyword, this.Position, 0); }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ContinueStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitContinueStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitContinueStatement(this);
        }

        public Update(continueKeyword: SyntaxToken, semicolonToken: SyntaxToken): ContinueStatementSyntax {
            if (continueKeyword != this.ContinueKeyword || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ContinueStatement_6527(continueKeyword, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithContinueKeyword(continueKeyword: SyntaxToken): ContinueStatementSyntax {
            return this.Update(continueKeyword, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ContinueStatementSyntax {
            return this.Update(this.ContinueKeyword, semicolonToken);
        }
    }

    export class ReturnStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_7247(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ReturnStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get ReturnKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReturnStatementSyntax>this.Green).returnKeyword, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReturnStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitReturnStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitReturnStatement(this);
        }

        public Update(returnKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ReturnStatementSyntax {
            if (returnKeyword != this.ReturnKeyword || expression != this.Expression || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ReturnStatement_3904(returnKeyword, expression, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithReturnKeyword(returnKeyword: SyntaxToken): ReturnStatementSyntax {
            return this.Update(returnKeyword, this.Expression, this.SemicolonToken);
        }

        public WithExpression(expression: ExpressionSyntax): ReturnStatementSyntax {
            return this.Update(this.ReturnKeyword, expression, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ReturnStatementSyntax {
            return this.Update(this.ReturnKeyword, this.Expression, semicolonToken);
        }
    }

    export class ThrowStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_6630(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ThrowStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get ThrowKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ThrowStatementSyntax>this.Green).throwKeyword, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ThrowStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitThrowStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitThrowStatement(this);
        }

        public Update(throwKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): ThrowStatementSyntax {
            if (throwKeyword != this.ThrowKeyword || expression != this.Expression || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ThrowStatement_1358(throwKeyword, expression, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithThrowKeyword(throwKeyword: SyntaxToken): ThrowStatementSyntax {
            return this.Update(throwKeyword, this.Expression, this.SemicolonToken);
        }

        public WithExpression(expression: ExpressionSyntax): ThrowStatementSyntax {
            return this.Update(this.ThrowKeyword, expression, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ThrowStatementSyntax {
            return this.Update(this.ThrowKeyword, this.Expression, semicolonToken);
        }
    }

    export class YieldStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1958(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): YieldStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get YieldKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.YieldStatementSyntax>this.Green).yieldKeyword, this.Position, 0); }
        }

        public get ReturnOrBreakKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.YieldStatementSyntax>this.Green).returnOrBreakKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.YieldStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitYieldStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitYieldStatement(this);
        }

        public Update(yieldKeyword: SyntaxToken, returnOrBreakKeyword: SyntaxToken, expression: ExpressionSyntax, semicolonToken: SyntaxToken): YieldStatementSyntax {
            if (yieldKeyword != this.YieldKeyword || returnOrBreakKeyword != this.ReturnOrBreakKeyword || expression != this.Expression || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.YieldStatement_1588(this.CSharpKind(), yieldKeyword, returnOrBreakKeyword, expression, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithYieldKeyword(yieldKeyword: SyntaxToken): YieldStatementSyntax {
            return this.Update(yieldKeyword, this.ReturnOrBreakKeyword, this.Expression, this.SemicolonToken);
        }

        public WithReturnOrBreakKeyword(returnOrBreakKeyword: SyntaxToken): YieldStatementSyntax {
            return this.Update(this.YieldKeyword, returnOrBreakKeyword, this.Expression, this.SemicolonToken);
        }

        public WithExpression(expression: ExpressionSyntax): YieldStatementSyntax {
            return this.Update(this.YieldKeyword, this.ReturnOrBreakKeyword, expression, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): YieldStatementSyntax {
            return this.Update(this.YieldKeyword, this.ReturnOrBreakKeyword, this.Expression, semicolonToken);
        }
    }

    export class WhileStatementSyntax extends StatementSyntax {
        private condition: ExpressionSyntax;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_1352(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): WhileStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get WhileKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WhileStatementSyntax>this.Green).whileKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WhileStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 2);
                this.condition = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WhileStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 4);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.condition = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.statement = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.condition;
                case 4: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitWhileStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitWhileStatement(this);
        }

        public Update(whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): WhileStatementSyntax {
            if (whileKeyword != this.WhileKeyword || openParenToken != this.OpenParenToken || condition != this.Condition || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.WhileStatement_2457(whileKeyword, openParenToken, condition, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithWhileKeyword(whileKeyword: SyntaxToken): WhileStatementSyntax {
            return this.Update(whileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): WhileStatementSyntax {
            return this.Update(this.WhileKeyword, openParenToken, this.Condition, this.CloseParenToken, this.Statement);
        }

        public WithCondition(condition: ExpressionSyntax): WhileStatementSyntax {
            return this.Update(this.WhileKeyword, this.OpenParenToken, condition, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): WhileStatementSyntax {
            return this.Update(this.WhileKeyword, this.OpenParenToken, this.Condition, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): WhileStatementSyntax {
            return this.Update(this.WhileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, statement);
        }
    }

    export class DoStatementSyntax extends StatementSyntax {
        private statement: StatementSyntax;
        private condition: ExpressionSyntax;

        constructor() { super(); }
        ctor_6607(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DoStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get DoKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DoStatementSyntax>this.Green).doKeyword, this.Position, 0); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 1);
                this.statement = ref.refObj; return result;
            }
        }

        public get WhileKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DoStatementSyntax>this.Green).whileKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DoStatementSyntax>this.Green).openParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 4);
                this.condition = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DoStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DoStatementSyntax>this.Green).semicolonToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.statement = ref1.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.condition = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.statement;
                case 4: return this.condition;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDoStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDoStatement(this);
        }

        public Update(doKeyword: SyntaxToken, statement: StatementSyntax, whileKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, semicolonToken: SyntaxToken): DoStatementSyntax {
            if (doKeyword != this.DoKeyword || statement != this.Statement || whileKeyword != this.WhileKeyword || openParenToken != this.OpenParenToken || condition != this.Condition || closeParenToken != this.CloseParenToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.DoStatement_1208(doKeyword, statement, whileKeyword, openParenToken, condition, closeParenToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithDoKeyword(doKeyword: SyntaxToken): DoStatementSyntax {
            return this.Update(doKeyword, this.Statement, this.WhileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.SemicolonToken);
        }

        public WithStatement(statement: StatementSyntax): DoStatementSyntax {
            return this.Update(this.DoKeyword, statement, this.WhileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.SemicolonToken);
        }

        public WithWhileKeyword(whileKeyword: SyntaxToken): DoStatementSyntax {
            return this.Update(this.DoKeyword, this.Statement, whileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.SemicolonToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): DoStatementSyntax {
            return this.Update(this.DoKeyword, this.Statement, this.WhileKeyword, openParenToken, this.Condition, this.CloseParenToken, this.SemicolonToken);
        }

        public WithCondition(condition: ExpressionSyntax): DoStatementSyntax {
            return this.Update(this.DoKeyword, this.Statement, this.WhileKeyword, this.OpenParenToken, condition, this.CloseParenToken, this.SemicolonToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): DoStatementSyntax {
            return this.Update(this.DoKeyword, this.Statement, this.WhileKeyword, this.OpenParenToken, this.Condition, closeParenToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): DoStatementSyntax {
            return this.Update(this.DoKeyword, this.Statement, this.WhileKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, semicolonToken);
        }
    }

    export class ForStatementSyntax extends StatementSyntax {
        private declaration: VariableDeclarationSyntax;
        private initializers: SyntaxNode;
        private condition: ExpressionSyntax;
        private incrementors: SyntaxNode;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_5717(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ForStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get ForKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForStatementSyntax>this.Green).forKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 2);
                this.declaration = ref.refObj; return result;
            }
        }

        public get Initializers(): SeparatedSyntaxList<ExpressionSyntax> {
            {
                var ref = { refObj: this.initializers };
                var red = this.GetRed_2015(ref, 3);
                this.initializers = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ExpressionSyntax>().ctor_9044(red, this.GetChildIndex(3));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get FirstSemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForStatementSyntax>this.Green).firstSemicolonToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 5);
                this.condition = ref.refObj; return result;
            }
        }

        public get SecondSemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForStatementSyntax>this.Green).secondSemicolonToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public get Incrementors(): SeparatedSyntaxList<ExpressionSyntax> {
            {
                var ref = { refObj: this.incrementors };
                var red = this.GetRed_2015(ref, 7);
                this.incrementors = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ExpressionSyntax>().ctor_9044(red, this.GetChildIndex(7));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(8), this.GetChildIndex(8)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 9);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.declaration = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.initializers };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.initializers = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.condition = ref5.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.incrementors };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.incrementors = ref7.refObj; return result;
                case 9:
                    var ref9 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref9, 9);
                    this.statement = ref9.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.declaration;
                case 3: return this.initializers;
                case 5: return this.condition;
                case 7: return this.incrementors;
                case 9: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitForStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitForStatement(this);
        }

        public Update(forKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, initializers: SeparatedSyntaxList<ExpressionSyntax>, firstSemicolonToken: SyntaxToken, condition: ExpressionSyntax, secondSemicolonToken: SyntaxToken, incrementors: SeparatedSyntaxList<ExpressionSyntax>, closeParenToken: SyntaxToken, statement: StatementSyntax): ForStatementSyntax {
            if (forKeyword != this.ForKeyword || openParenToken != this.OpenParenToken || declaration != this.Declaration || initializers != this.Initializers || firstSemicolonToken != this.FirstSemicolonToken || condition != this.Condition || secondSemicolonToken != this.SecondSemicolonToken || incrementors != this.Incrementors || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.ForStatement_5480(forKeyword, openParenToken, declaration, initializers, firstSemicolonToken, condition, secondSemicolonToken, incrementors, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithForKeyword(forKeyword: SyntaxToken): ForStatementSyntax {
            return this.Update(forKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ForStatementSyntax {
            return this.Update(this.ForKeyword, openParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithInitializers(initializers: SeparatedSyntaxList<ExpressionSyntax>): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithFirstSemicolonToken(firstSemicolonToken: SyntaxToken): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, firstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithCondition(condition: ExpressionSyntax): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithSecondSemicolonToken(secondSemicolonToken: SyntaxToken): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, secondSemicolonToken, this.Incrementors, this.CloseParenToken, this.Statement);
        }

        public WithIncrementors(incrementors: SeparatedSyntaxList<ExpressionSyntax>): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, incrementors, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): ForStatementSyntax {
            return this.Update(this.ForKeyword, this.OpenParenToken, this.Declaration, this.Initializers, this.FirstSemicolonToken, this.Condition, this.SecondSemicolonToken, this.Incrementors, this.CloseParenToken, statement);
        }

        public AddInitializers(...items: ExpressionSyntax[]): ForStatementSyntax {
            return this.WithInitializers(this.Initializers.AddRange(items));
        }

        public AddIncrementors(...items: ExpressionSyntax[]): ForStatementSyntax {
            return this.WithIncrementors(this.Incrementors.AddRange(items));
        }
    }

    export class ForEachStatementSyntax extends StatementSyntax {
        private type: TypeSyntax;
        private expression: ExpressionSyntax;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_5886(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ForEachStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get ForEachKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForEachStatementSyntax>this.Green).forEachKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForEachStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForEachStatementSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get InKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForEachStatementSyntax>this.Green).inKeyword, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 5);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ForEachStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 7);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.expression = ref5.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.statement = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.type;
                case 5: return this.expression;
                case 7: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitForEachStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitForEachStatement(this);
        }

        public Update(forEachKeyword: SyntaxToken, openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, inKeyword: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): ForEachStatementSyntax {
            if (forEachKeyword != this.ForEachKeyword || openParenToken != this.OpenParenToken || type != this.Type || identifier != this.Identifier || inKeyword != this.InKeyword || expression != this.Expression || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.ForEachStatement_1184(forEachKeyword, openParenToken, type, identifier, inKeyword, expression, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithForEachKeyword(forEachKeyword: SyntaxToken): ForEachStatementSyntax {
            return this.Update(forEachKeyword, this.OpenParenToken, this.Type, this.Identifier, this.InKeyword, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, openParenToken, this.Type, this.Identifier, this.InKeyword, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithType(type: TypeSyntax): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, type, this.Identifier, this.InKeyword, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithIdentifier(identifier: SyntaxToken): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, this.Type, identifier, this.InKeyword, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithInKeyword(inKeyword: SyntaxToken): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, this.Type, this.Identifier, inKeyword, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithExpression(expression: ExpressionSyntax): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, this.Type, this.Identifier, this.InKeyword, expression, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, this.Type, this.Identifier, this.InKeyword, this.Expression, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): ForEachStatementSyntax {
            return this.Update(this.ForEachKeyword, this.OpenParenToken, this.Type, this.Identifier, this.InKeyword, this.Expression, this.CloseParenToken, statement);
        }
    }

    export class UsingStatementSyntax extends StatementSyntax {
        private declaration: VariableDeclarationSyntax;
        private expression: ExpressionSyntax;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_2075(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): UsingStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get UsingKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingStatementSyntax>this.Green).usingKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 2);
                this.declaration = ref.refObj; return result;
            }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 3);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 5);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.declaration = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.expression = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.statement = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.declaration;
                case 3: return this.expression;
                case 5: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitUsingStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitUsingStatement(this);
        }

        public Update(usingKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): UsingStatementSyntax {
            if (usingKeyword != this.UsingKeyword || openParenToken != this.OpenParenToken || declaration != this.Declaration || expression != this.Expression || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.UsingStatement_2034(usingKeyword, openParenToken, declaration, expression, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithUsingKeyword(usingKeyword: SyntaxToken): UsingStatementSyntax {
            return this.Update(usingKeyword, this.OpenParenToken, this.Declaration, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): UsingStatementSyntax {
            return this.Update(this.UsingKeyword, openParenToken, this.Declaration, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): UsingStatementSyntax {
            return this.Update(this.UsingKeyword, this.OpenParenToken, declaration, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithExpression(expression: ExpressionSyntax): UsingStatementSyntax {
            return this.Update(this.UsingKeyword, this.OpenParenToken, this.Declaration, expression, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): UsingStatementSyntax {
            return this.Update(this.UsingKeyword, this.OpenParenToken, this.Declaration, this.Expression, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): UsingStatementSyntax {
            return this.Update(this.UsingKeyword, this.OpenParenToken, this.Declaration, this.Expression, this.CloseParenToken, statement);
        }
    }

    export class FixedStatementSyntax extends StatementSyntax {
        private declaration: VariableDeclarationSyntax;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_8045(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): FixedStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get FixedKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FixedStatementSyntax>this.Green).fixedKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FixedStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 2);
                this.declaration = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FixedStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 4);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.declaration = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.statement = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.declaration;
                case 4: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitFixedStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitFixedStatement(this);
        }

        public Update(fixedKeyword: SyntaxToken, openParenToken: SyntaxToken, declaration: VariableDeclarationSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): FixedStatementSyntax {
            if (fixedKeyword != this.FixedKeyword || openParenToken != this.OpenParenToken || declaration != this.Declaration || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.FixedStatement_1548(fixedKeyword, openParenToken, declaration, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithFixedKeyword(fixedKeyword: SyntaxToken): FixedStatementSyntax {
            return this.Update(fixedKeyword, this.OpenParenToken, this.Declaration, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): FixedStatementSyntax {
            return this.Update(this.FixedKeyword, openParenToken, this.Declaration, this.CloseParenToken, this.Statement);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): FixedStatementSyntax {
            return this.Update(this.FixedKeyword, this.OpenParenToken, declaration, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): FixedStatementSyntax {
            return this.Update(this.FixedKeyword, this.OpenParenToken, this.Declaration, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): FixedStatementSyntax {
            return this.Update(this.FixedKeyword, this.OpenParenToken, this.Declaration, this.CloseParenToken, statement);
        }

        public AddDeclarationVariables(...items: VariableDeclaratorSyntax[]): FixedStatementSyntax {
            return this.WithDeclaration(this.Declaration.WithVariables(this.Declaration.Variables.AddRange(items)));
        }
    }

    export class CheckedStatementSyntax extends StatementSyntax {
        private block: BlockSyntax;

        constructor() { super(); }
        ctor_5206(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CheckedStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CheckedStatementSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 1);
                this.block = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.block = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.block;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCheckedStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCheckedStatement(this);
        }

        public Update(keyword: SyntaxToken, block: BlockSyntax): CheckedStatementSyntax {
            if (keyword != this.Keyword || block != this.Block) {
                var newNode = SyntaxFactory.CheckedStatement_1663(this.CSharpKind(), keyword, block);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): CheckedStatementSyntax {
            return this.Update(keyword, this.Block);
        }

        public WithBlock(block: BlockSyntax): CheckedStatementSyntax {
            return this.Update(this.Keyword, block);
        }

        public AddBlockStatements(...items: StatementSyntax[]): CheckedStatementSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }
    }

    export class UnsafeStatementSyntax extends StatementSyntax {
        private block: BlockSyntax;

        constructor() { super(); }
        ctor_5623(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): UnsafeStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get UnsafeKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UnsafeStatementSyntax>this.Green).unsafeKeyword, this.Position, 0); }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 1);
                this.block = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.block = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.block;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitUnsafeStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitUnsafeStatement(this);
        }

        public Update(unsafeKeyword: SyntaxToken, block: BlockSyntax): UnsafeStatementSyntax {
            if (unsafeKeyword != this.UnsafeKeyword || block != this.Block) {
                var newNode = SyntaxFactory.UnsafeStatement_7221(unsafeKeyword, block);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithUnsafeKeyword(unsafeKeyword: SyntaxToken): UnsafeStatementSyntax {
            return this.Update(unsafeKeyword, this.Block);
        }

        public WithBlock(block: BlockSyntax): UnsafeStatementSyntax {
            return this.Update(this.UnsafeKeyword, block);
        }

        public AddBlockStatements(...items: StatementSyntax[]): UnsafeStatementSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }
    }

    export class LockStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_4559(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LockStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get LockKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LockStatementSyntax>this.Green).lockKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LockStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LockStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 4);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.statement = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                case 4: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLockStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLockStatement(this);
        }

        public Update(lockKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax): LockStatementSyntax {
            if (lockKeyword != this.LockKeyword || openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken || statement != this.Statement) {
                var newNode = SyntaxFactory.LockStatement_6696(lockKeyword, openParenToken, expression, closeParenToken, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLockKeyword(lockKeyword: SyntaxToken): LockStatementSyntax {
            return this.Update(lockKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): LockStatementSyntax {
            return this.Update(this.LockKeyword, openParenToken, this.Expression, this.CloseParenToken, this.Statement);
        }

        public WithExpression(expression: ExpressionSyntax): LockStatementSyntax {
            return this.Update(this.LockKeyword, this.OpenParenToken, expression, this.CloseParenToken, this.Statement);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): LockStatementSyntax {
            return this.Update(this.LockKeyword, this.OpenParenToken, this.Expression, closeParenToken, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): LockStatementSyntax {
            return this.Update(this.LockKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, statement);
        }
    }

    export class IfStatementSyntax extends StatementSyntax {
        private condition: ExpressionSyntax;
        private statement: StatementSyntax;
        private $else: ElseClauseSyntax;

        constructor() { super(); }
        ctor_7214(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IfStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get IfKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfStatementSyntax>this.Green).ifKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 2);
                this.condition = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 4);
                this.statement = ref.refObj; return result;
            }
        }

        public get Else(): ElseClauseSyntax {
            {
                var ref = { refObj: this.$else };
                var result = this.GetRed_2015(ref, 5);
                this.$else = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.condition = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.statement = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.$else };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.$else = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.condition;
                case 4: return this.statement;
                case 5: return this.$else;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIfStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIfStatement(this);
        }

        public Update(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, condition: ExpressionSyntax, closeParenToken: SyntaxToken, statement: StatementSyntax, $else: ElseClauseSyntax): IfStatementSyntax {
            if (ifKeyword != this.IfKeyword || openParenToken != this.OpenParenToken || condition != this.Condition || closeParenToken != this.CloseParenToken || statement != this.Statement || $else != this.Else) {
                var newNode = SyntaxFactory.IfStatement_1417(ifKeyword, openParenToken, condition, closeParenToken, statement, $else);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIfKeyword(ifKeyword: SyntaxToken): IfStatementSyntax {
            return this.Update(ifKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.Statement, this.Else);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): IfStatementSyntax {
            return this.Update(this.IfKeyword, openParenToken, this.Condition, this.CloseParenToken, this.Statement, this.Else);
        }

        public WithCondition(condition: ExpressionSyntax): IfStatementSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, condition, this.CloseParenToken, this.Statement, this.Else);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): IfStatementSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, this.Condition, closeParenToken, this.Statement, this.Else);
        }

        public WithStatement(statement: StatementSyntax): IfStatementSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, statement, this.Else);
        }

        public WithElse($else: ElseClauseSyntax): IfStatementSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, this.Condition, this.CloseParenToken, this.Statement, $else);
        }
    }

    export class ElseClauseSyntax extends CSharpSyntaxNode {
        private statement: StatementSyntax;

        constructor() { super(); }
        ctor_6425(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ElseClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get ElseKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseClauseSyntax>this.Green).elseKeyword, this.Position, 0); }
        }

        public get Statement(): StatementSyntax {
            {
                var ref = { refObj: this.statement };
                var result = this.GetRed_2015(ref, 1);
                this.statement = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.statement };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.statement = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.statement;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitElseClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitElseClause(this);
        }

        public Update(elseKeyword: SyntaxToken, statement: StatementSyntax): ElseClauseSyntax {
            if (elseKeyword != this.ElseKeyword || statement != this.Statement) {
                var newNode = SyntaxFactory.ElseClause_1077(elseKeyword, statement);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithElseKeyword(elseKeyword: SyntaxToken): ElseClauseSyntax {
            return this.Update(elseKeyword, this.Statement);
        }

        public WithStatement(statement: StatementSyntax): ElseClauseSyntax {
            return this.Update(this.ElseKeyword, statement);
        }
    }

    export class SwitchStatementSyntax extends StatementSyntax {
        private expression: ExpressionSyntax;
        private sections: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1833(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SwitchStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get SwitchKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchStatementSyntax>this.Green).switchKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchStatementSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchStatementSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchStatementSyntax>this.Green).openBraceToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get Sections(): SyntaxList<SwitchSectionSyntax> {
            {
                var ref = { refObj: this.sections };
                var result = new SyntaxList<SwitchSectionSyntax>().ctor_6698(this.GetRed_2015(ref, 5));
                this.sections = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.SwitchStatementSyntax>this.Green).closeBraceToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.sections };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.sections = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.expression;
                case 5: return this.sections;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSwitchStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSwitchStatement(this);
        }

        public Update(switchKeyword: SyntaxToken, openParenToken: SyntaxToken, expression: ExpressionSyntax, closeParenToken: SyntaxToken, openBraceToken: SyntaxToken, sections: SyntaxList<SwitchSectionSyntax>, closeBraceToken: SyntaxToken): SwitchStatementSyntax {
            if (switchKeyword != this.SwitchKeyword || openParenToken != this.OpenParenToken || expression != this.Expression || closeParenToken != this.CloseParenToken || openBraceToken != this.OpenBraceToken || sections != this.Sections || closeBraceToken != this.CloseBraceToken) {
                var newNode = SyntaxFactory.SwitchStatement_1235(switchKeyword, openParenToken, expression, closeParenToken, openBraceToken, sections, closeBraceToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithSwitchKeyword(switchKeyword: SyntaxToken): SwitchStatementSyntax {
            return this.Update(switchKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, this.OpenBraceToken, this.Sections, this.CloseBraceToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, openParenToken, this.Expression, this.CloseParenToken, this.OpenBraceToken, this.Sections, this.CloseBraceToken);
        }

        public WithExpression(expression: ExpressionSyntax): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, this.OpenParenToken, expression, this.CloseParenToken, this.OpenBraceToken, this.Sections, this.CloseBraceToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, this.OpenParenToken, this.Expression, closeParenToken, this.OpenBraceToken, this.Sections, this.CloseBraceToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, openBraceToken, this.Sections, this.CloseBraceToken);
        }

        public WithSections(sections: SyntaxList<SwitchSectionSyntax>): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, this.OpenBraceToken, sections, this.CloseBraceToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): SwitchStatementSyntax {
            return this.Update(this.SwitchKeyword, this.OpenParenToken, this.Expression, this.CloseParenToken, this.OpenBraceToken, this.Sections, closeBraceToken);
        }

        public AddSections(...items: SwitchSectionSyntax[]): SwitchStatementSyntax {
            return this.WithSections(this.Sections.AddRange(items));
        }
    }

    export class SwitchSectionSyntax extends CSharpSyntaxNode {
        private labels: CSharpSyntaxNode;
        private statements: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1124(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SwitchSectionSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Labels(): SyntaxList<SwitchLabelSyntax> {
            {
                var ref = { refObj: this.labels };
                var result = new SyntaxList<SwitchLabelSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.labels = ref.refObj; return result;
            }
        }

        public get Statements(): SyntaxList<StatementSyntax> {
            {
                var ref = { refObj: this.statements };
                var result = new SyntaxList<StatementSyntax>().ctor_6698(this.GetRed_2015(ref, 1));
                this.statements = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.labels };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.labels = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.statements };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.statements = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.labels;
                case 1: return this.statements;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSwitchSection(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSwitchSection(this);
        }

        public Update(labels: SyntaxList<SwitchLabelSyntax>, statements: SyntaxList<StatementSyntax>): SwitchSectionSyntax {
            if (labels != this.Labels || statements != this.Statements) {
                var newNode = SyntaxFactory.SwitchSection_1633(labels, statements);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLabels(labels: SyntaxList<SwitchLabelSyntax>): SwitchSectionSyntax {
            return this.Update(labels, this.Statements);
        }

        public WithStatements(statements: SyntaxList<StatementSyntax>): SwitchSectionSyntax {
            return this.Update(this.Labels, statements);
        }

        public AddLabels(...items: SwitchLabelSyntax[]): SwitchSectionSyntax {
            return this.WithLabels(this.Labels.AddRange(items));
        }

        public AddStatements(...items: StatementSyntax[]): SwitchSectionSyntax {
            return this.WithStatements(this.Statements.AddRange(items));
        }
    }

    export class SwitchLabelSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_3712(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SwitchLabelSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken { throw new Error(); }

        public get ColonToken(): SyntaxToken { throw new Error(); }
    }

    export class CaseSwitchLabelSyntax extends SwitchLabelSyntax {
        private value: ExpressionSyntax;

        constructor() { super(); }
        ctor_1688_C(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CaseSwitchLabelSyntax {
            super.ctor_3712(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CaseSwitchLabelSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get Value(): ExpressionSyntax {
            {
                var ref = { refObj: this.value };
                var result = this.GetRed_2015(ref, 1);
                this.value = ref.refObj; return result;
            }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CaseSwitchLabelSyntax>this.Green).colonToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.value };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.value = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.value;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCaseSwitchLabel(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCaseSwitchLabel(this);
        }

        public Update(keyword: SyntaxToken, value: ExpressionSyntax, colonToken: SyntaxToken): CaseSwitchLabelSyntax {
            if (keyword != this.Keyword || value != this.Value || colonToken != this.ColonToken) {
                var newNode = SyntaxFactory.CaseSwitchLabel_2116(keyword, value, colonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): CaseSwitchLabelSyntax {
            return this.Update(keyword, this.Value, this.ColonToken);
        }

        public WithValue(value: ExpressionSyntax): CaseSwitchLabelSyntax {
            return this.Update(this.Keyword, value, this.ColonToken);
        }

        public WithColonToken(colonToken: SyntaxToken): CaseSwitchLabelSyntax {
            return this.Update(this.Keyword, this.Value, colonToken);
        }
    }

    export class DefaultSwitchLabelSyntax extends SwitchLabelSyntax {

        constructor() { super(); }
        ctor_1836(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DefaultSwitchLabelSyntax {
            super.ctor_3712(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefaultSwitchLabelSyntax>this.Green).keyword, this.Position, 0); }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefaultSwitchLabelSyntax>this.Green).colonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDefaultSwitchLabel(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDefaultSwitchLabel(this);
        }

        public Update(keyword: SyntaxToken, colonToken: SyntaxToken): DefaultSwitchLabelSyntax {
            if (keyword != this.Keyword || colonToken != this.ColonToken) {
                var newNode = SyntaxFactory.DefaultSwitchLabel_2103(keyword, colonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithKeyword(keyword: SyntaxToken): DefaultSwitchLabelSyntax {
            return this.Update(keyword, this.ColonToken);
        }

        public WithColonToken(colonToken: SyntaxToken): DefaultSwitchLabelSyntax {
            return this.Update(this.Keyword, colonToken);
        }
    }

    export class TryStatementSyntax extends StatementSyntax {
        private block: BlockSyntax;
        private catches: CSharpSyntaxNode;
        private $finally: FinallyClauseSyntax;

        constructor() { super(); }
        ctor_1844(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TryStatementSyntax {
            super.ctor_9341(green, parent, position); return this;
        }

        public get TryKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TryStatementSyntax>this.Green).tryKeyword, this.Position, 0); }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 1);
                this.block = ref.refObj; return result;
            }
        }

        public get Catches(): SyntaxList<CatchClauseSyntax> {
            {
                var ref = { refObj: this.catches };
                var result = new SyntaxList<CatchClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 2));
                this.catches = ref.refObj; return result;
            }
        }

        public get Finally(): FinallyClauseSyntax {
            {
                var ref = { refObj: this.$finally };
                var result = this.GetRed_2015(ref, 3);
                this.$finally = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.block = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.catches };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.catches = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.$finally };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.$finally = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.block;
                case 2: return this.catches;
                case 3: return this.$finally;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTryStatement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTryStatement(this);
        }

        public Update(tryKeyword: SyntaxToken, block: BlockSyntax, catches: SyntaxList<CatchClauseSyntax>, $finally: FinallyClauseSyntax): TryStatementSyntax {
            if (tryKeyword != this.TryKeyword || block != this.Block || catches != this.Catches || $finally != this.Finally) {
                var newNode = SyntaxFactory.TryStatement_3588(tryKeyword, block, catches, $finally);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithTryKeyword(tryKeyword: SyntaxToken): TryStatementSyntax {
            return this.Update(tryKeyword, this.Block, this.Catches, this.Finally);
        }

        public WithBlock(block: BlockSyntax): TryStatementSyntax {
            return this.Update(this.TryKeyword, block, this.Catches, this.Finally);
        }

        public WithCatches(catches: SyntaxList<CatchClauseSyntax>): TryStatementSyntax {
            return this.Update(this.TryKeyword, this.Block, catches, this.Finally);
        }

        public WithFinally($finally: FinallyClauseSyntax): TryStatementSyntax {
            return this.Update(this.TryKeyword, this.Block, this.Catches, $finally);
        }

        public AddBlockStatements(...items: StatementSyntax[]): TryStatementSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }

        public AddCatches(...items: CatchClauseSyntax[]): TryStatementSyntax {
            return this.WithCatches(this.Catches.AddRange(items));
        }
    }

    export class CatchClauseSyntax extends CSharpSyntaxNode {
        private declaration: CatchDeclarationSyntax;
        private filter: CatchFilterClauseSyntax;
        private block: BlockSyntax;

        constructor() { super(); }
        ctor_1474(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CatchClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get CatchKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchClauseSyntax>this.Green).catchKeyword, this.Position, 0); }
        }

        public get Declaration(): CatchDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 1);
                this.declaration = ref.refObj; return result;
            }
        }

        public get Filter(): CatchFilterClauseSyntax {
            {
                var ref = { refObj: this.filter };
                var result = this.GetRed_2015(ref, 2);
                this.filter = ref.refObj; return result;
            }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 3);
                this.block = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.declaration = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.filter };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.filter = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.block = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.declaration;
                case 2: return this.filter;
                case 3: return this.block;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCatchClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCatchClause(this);
        }

        public Update(catchKeyword: SyntaxToken, declaration: CatchDeclarationSyntax, filter: CatchFilterClauseSyntax, block: BlockSyntax): CatchClauseSyntax {
            if (catchKeyword != this.CatchKeyword || declaration != this.Declaration || filter != this.Filter || block != this.Block) {
                var newNode = SyntaxFactory.CatchClause_1606(catchKeyword, declaration, filter, block);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithCatchKeyword(catchKeyword: SyntaxToken): CatchClauseSyntax {
            return this.Update(catchKeyword, this.Declaration, this.Filter, this.Block);
        }

        public WithDeclaration(declaration: CatchDeclarationSyntax): CatchClauseSyntax {
            return this.Update(this.CatchKeyword, declaration, this.Filter, this.Block);
        }

        public WithFilter(filter: CatchFilterClauseSyntax): CatchClauseSyntax {
            return this.Update(this.CatchKeyword, this.Declaration, filter, this.Block);
        }

        public WithBlock(block: BlockSyntax): CatchClauseSyntax {
            return this.Update(this.CatchKeyword, this.Declaration, this.Filter, block);
        }

        public AddBlockStatements(...items: StatementSyntax[]): CatchClauseSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }
    }

    export class CatchDeclarationSyntax extends CSharpSyntaxNode {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_8164(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CatchDeclarationSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchDeclarationSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchDeclarationSyntax>this.Green).identifier;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(2), this.GetChildIndex(2));

                return structDefault(SyntaxToken);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchDeclarationSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCatchDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCatchDeclaration(this);
        }

        public Update(openParenToken: SyntaxToken, type: TypeSyntax, identifier: SyntaxToken, closeParenToken: SyntaxToken): CatchDeclarationSyntax {
            if (openParenToken != this.OpenParenToken || type != this.Type || identifier != this.Identifier || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.CatchDeclaration_1702(openParenToken, type, identifier, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): CatchDeclarationSyntax {
            return this.Update(openParenToken, this.Type, this.Identifier, this.CloseParenToken);
        }

        public WithType(type: TypeSyntax): CatchDeclarationSyntax {
            return this.Update(this.OpenParenToken, type, this.Identifier, this.CloseParenToken);
        }

        public WithIdentifier(identifier: SyntaxToken): CatchDeclarationSyntax {
            return this.Update(this.OpenParenToken, this.Type, identifier, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): CatchDeclarationSyntax {
            return this.Update(this.OpenParenToken, this.Type, this.Identifier, closeParenToken);
        }
    }

    export class CatchFilterClauseSyntax extends CSharpSyntaxNode {
        private filterExpression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1545(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CatchFilterClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get IfKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchFilterClauseSyntax>this.Green).ifKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchFilterClauseSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get FilterExpression(): ExpressionSyntax {
            {
                var ref = { refObj: this.filterExpression };
                var result = this.GetRed_2015(ref, 2);
                this.filterExpression = ref.refObj; return result;
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CatchFilterClauseSyntax>this.Green).closeParenToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.filterExpression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.filterExpression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.filterExpression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCatchFilterClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCatchFilterClause(this);
        }

        public Update(ifKeyword: SyntaxToken, openParenToken: SyntaxToken, filterExpression: ExpressionSyntax, closeParenToken: SyntaxToken): CatchFilterClauseSyntax {
            if (ifKeyword != this.IfKeyword || openParenToken != this.OpenParenToken || filterExpression != this.FilterExpression || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.CatchFilterClause_8524(ifKeyword, openParenToken, filterExpression, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIfKeyword(ifKeyword: SyntaxToken): CatchFilterClauseSyntax {
            return this.Update(ifKeyword, this.OpenParenToken, this.FilterExpression, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): CatchFilterClauseSyntax {
            return this.Update(this.IfKeyword, openParenToken, this.FilterExpression, this.CloseParenToken);
        }

        public WithFilterExpression(filterExpression: ExpressionSyntax): CatchFilterClauseSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, filterExpression, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): CatchFilterClauseSyntax {
            return this.Update(this.IfKeyword, this.OpenParenToken, this.FilterExpression, closeParenToken);
        }
    }

    export class FinallyClauseSyntax extends CSharpSyntaxNode {
        private block: BlockSyntax;

        constructor() { super(); }
        ctor_1882(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): FinallyClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get FinallyKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FinallyClauseSyntax>this.Green).finallyKeyword, this.Position, 0); }
        }

        public get Block(): BlockSyntax {
            {
                var ref = { refObj: this.block };
                var result = this.GetRed_2015(ref, 1);
                this.block = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.block };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.block = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.block;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitFinallyClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitFinallyClause(this);
        }

        public Update(finallyKeyword: SyntaxToken, block: BlockSyntax): FinallyClauseSyntax {
            if (finallyKeyword != this.FinallyKeyword || block != this.Block) {
                var newNode = SyntaxFactory.FinallyClause_2308(finallyKeyword, block);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithFinallyKeyword(finallyKeyword: SyntaxToken): FinallyClauseSyntax {
            return this.Update(finallyKeyword, this.Block);
        }

        public WithBlock(block: BlockSyntax): FinallyClauseSyntax {
            return this.Update(this.FinallyKeyword, block);
        }

        public AddBlockStatements(...items: StatementSyntax[]): FinallyClauseSyntax {
            return this.WithBlock(this.Block.WithStatements(this.Block.Statements.AddRange(items)));
        }
    }

    export class ExternAliasDirectiveSyntax extends CSharpSyntaxNode {

        constructor() { super(); }
        ctor_2123(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ExternAliasDirectiveSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get ExternKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>this.Green).externKeyword, this.Position, 0); }
        }

        public get AliasKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>this.Green).aliasKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>this.Green).identifier, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExternAliasDirectiveSyntax>this.Green).semicolonToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitExternAliasDirective(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitExternAliasDirective(this);
        }

        public Update(externKeyword: SyntaxToken, aliasKeyword: SyntaxToken, identifier: SyntaxToken, semicolonToken: SyntaxToken): ExternAliasDirectiveSyntax {
            if (externKeyword != this.ExternKeyword || aliasKeyword != this.AliasKeyword || identifier != this.Identifier || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ExternAliasDirective_3055(externKeyword, aliasKeyword, identifier, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExternKeyword(externKeyword: SyntaxToken): ExternAliasDirectiveSyntax {
            return this.Update(externKeyword, this.AliasKeyword, this.Identifier, this.SemicolonToken);
        }

        public WithAliasKeyword(aliasKeyword: SyntaxToken): ExternAliasDirectiveSyntax {
            return this.Update(this.ExternKeyword, aliasKeyword, this.Identifier, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): ExternAliasDirectiveSyntax {
            return this.Update(this.ExternKeyword, this.AliasKeyword, identifier, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ExternAliasDirectiveSyntax {
            return this.Update(this.ExternKeyword, this.AliasKeyword, this.Identifier, semicolonToken);
        }
    }

    export class UsingDirectiveSyntax extends CSharpSyntaxNode {
        private alias: NameEqualsSyntax;
        private name: NameSyntax;

        constructor() { super(); }
        ctor_1802(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): UsingDirectiveSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get UsingKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>this.Green).usingKeyword, this.Position, 0); }
        }

        public get StaticKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>this.Green).staticKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public get Alias(): NameEqualsSyntax {
            {
                var ref = { refObj: this.alias };
                var result = this.GetRed_2015(ref, 2);
                this.alias = ref.refObj; return result;
            }
        }

        public get Name(): NameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 3);
                this.name = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UsingDirectiveSyntax>this.Green).semicolonToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.alias };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.alias = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.name = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.alias;
                case 3: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitUsingDirective(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitUsingDirective(this);
        }

        public Update(usingKeyword: SyntaxToken, staticKeyword: SyntaxToken, alias: NameEqualsSyntax, name: NameSyntax, semicolonToken: SyntaxToken): UsingDirectiveSyntax {
            if (usingKeyword != this.UsingKeyword || staticKeyword != this.StaticKeyword || alias != this.Alias || name != this.Name || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.UsingDirective_9846(usingKeyword, staticKeyword, alias, name, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithUsingKeyword(usingKeyword: SyntaxToken): UsingDirectiveSyntax {
            return this.Update(usingKeyword, this.StaticKeyword, this.Alias, this.Name, this.SemicolonToken);
        }

        public WithStaticKeyword(staticKeyword: SyntaxToken): UsingDirectiveSyntax {
            return this.Update(this.UsingKeyword, staticKeyword, this.Alias, this.Name, this.SemicolonToken);
        }

        public WithAlias(alias: NameEqualsSyntax): UsingDirectiveSyntax {
            return this.Update(this.UsingKeyword, this.StaticKeyword, alias, this.Name, this.SemicolonToken);
        }

        public WithName(name: NameSyntax): UsingDirectiveSyntax {
            return this.Update(this.UsingKeyword, this.StaticKeyword, this.Alias, name, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): UsingDirectiveSyntax {
            return this.Update(this.UsingKeyword, this.StaticKeyword, this.Alias, this.Name, semicolonToken);
        }
    }

    export class NamespaceDeclarationSyntax extends MemberDeclarationSyntax {
        private name: NameSyntax;
        private externs: CSharpSyntaxNode;
        private usings: CSharpSyntaxNode;
        private members: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1862(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NamespaceDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get NamespaceKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NamespaceDeclarationSyntax>this.Green).namespaceKeyword, this.Position, 0); }
        }

        public get Name(): NameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NamespaceDeclarationSyntax>this.Green).openBraceToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Externs(): SyntaxList<ExternAliasDirectiveSyntax> {
            {
                var ref = { refObj: this.externs };
                var result = new SyntaxList<ExternAliasDirectiveSyntax>().ctor_6698(this.GetRed_2015(ref, 3));
                this.externs = ref.refObj; return result;
            }
        }

        public get Usings(): SyntaxList<UsingDirectiveSyntax> {
            {
                var ref = { refObj: this.usings };
                var result = new SyntaxList<UsingDirectiveSyntax>().ctor_6698(this.GetRed_2015(ref, 4));
                this.usings = ref.refObj; return result;
            }
        }

        public get Members(): SyntaxList<MemberDeclarationSyntax> {
            {
                var ref = { refObj: this.members };
                var result = new SyntaxList<MemberDeclarationSyntax>().ctor_6698(this.GetRed_2015(ref, 5));
                this.members = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NamespaceDeclarationSyntax>this.Green).closeBraceToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NamespaceDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(7), this.GetChildIndex(7));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.externs };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.externs = ref3.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.usings };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.usings = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.members };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.members = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                case 3: return this.externs;
                case 4: return this.usings;
                case 5: return this.members;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitNamespaceDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitNamespaceDeclaration(this);
        }

        public Update(namespaceKeyword: SyntaxToken, name: NameSyntax, openBraceToken: SyntaxToken, externs: SyntaxList<ExternAliasDirectiveSyntax>, usings: SyntaxList<UsingDirectiveSyntax>, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): NamespaceDeclarationSyntax {
            if (namespaceKeyword != this.NamespaceKeyword || name != this.Name || openBraceToken != this.OpenBraceToken || externs != this.Externs || usings != this.Usings || members != this.Members || closeBraceToken != this.CloseBraceToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.NamespaceDeclaration_1400(namespaceKeyword, name, openBraceToken, externs, usings, members, closeBraceToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNamespaceKeyword(namespaceKeyword: SyntaxToken): NamespaceDeclarationSyntax {
            return this.Update(namespaceKeyword, this.Name, this.OpenBraceToken, this.Externs, this.Usings, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithName(name: NameSyntax): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, name, this.OpenBraceToken, this.Externs, this.Usings, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, openBraceToken, this.Externs, this.Usings, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithExterns(externs: SyntaxList<ExternAliasDirectiveSyntax>): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, this.OpenBraceToken, externs, this.Usings, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithUsings(usings: SyntaxList<UsingDirectiveSyntax>): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, this.OpenBraceToken, this.Externs, usings, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithMembers(members: SyntaxList<MemberDeclarationSyntax>): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, this.OpenBraceToken, this.Externs, this.Usings, members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, this.OpenBraceToken, this.Externs, this.Usings, this.Members, closeBraceToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): NamespaceDeclarationSyntax {
            return this.Update(this.NamespaceKeyword, this.Name, this.OpenBraceToken, this.Externs, this.Usings, this.Members, this.CloseBraceToken, semicolonToken);
        }

        public AddExterns(...items: ExternAliasDirectiveSyntax[]): NamespaceDeclarationSyntax {
            return this.WithExterns(this.Externs.AddRange(items));
        }

        public AddUsings(...items: UsingDirectiveSyntax[]): NamespaceDeclarationSyntax {
            return this.WithUsings(this.Usings.AddRange(items));
        }

        public AddMembers(...items: MemberDeclarationSyntax[]): NamespaceDeclarationSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
    }

    export class AttributeListSyntax extends CSharpSyntaxNode {
        private target: AttributeTargetSpecifierSyntax;
        private attributes: SyntaxNode;

        constructor() { super(); }
        ctor_3299(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AttributeListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>this.Green).openBracketToken, this.Position, 0); }
        }

        public get Target(): AttributeTargetSpecifierSyntax {
            {
                var ref = { refObj: this.target };
                var result = this.GetRed_2015(ref, 1);
                this.target = ref.refObj; return result;
            }
        }

        public get Attributes(): SeparatedSyntaxList<AttributeSyntax> {
            {
                var ref = { refObj: this.attributes };
                var red = this.GetRed_2015(ref, 2);
                this.attributes = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<AttributeSyntax>().ctor_9044(red, this.GetChildIndex(2));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeListSyntax>this.Green).closeBracketToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.target };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.target = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.attributes };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.attributes = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.target;
                case 2: return this.attributes;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAttributeList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAttributeList(this);
        }

        public Update(openBracketToken: SyntaxToken, target: AttributeTargetSpecifierSyntax, attributes: SeparatedSyntaxList<AttributeSyntax>, closeBracketToken: SyntaxToken): AttributeListSyntax {
            if (openBracketToken != this.OpenBracketToken || target != this.Target || attributes != this.Attributes || closeBracketToken != this.CloseBracketToken) {
                var newNode = SyntaxFactory.AttributeList_1768(openBracketToken, target, attributes, closeBracketToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): AttributeListSyntax {
            return this.Update(openBracketToken, this.Target, this.Attributes, this.CloseBracketToken);
        }

        public WithTarget(target: AttributeTargetSpecifierSyntax): AttributeListSyntax {
            return this.Update(this.OpenBracketToken, target, this.Attributes, this.CloseBracketToken);
        }

        public WithAttributes(attributes: SeparatedSyntaxList<AttributeSyntax>): AttributeListSyntax {
            return this.Update(this.OpenBracketToken, this.Target, attributes, this.CloseBracketToken);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): AttributeListSyntax {
            return this.Update(this.OpenBracketToken, this.Target, this.Attributes, closeBracketToken);
        }

        public AddAttributes(...items: AttributeSyntax[]): AttributeListSyntax {
            return this.WithAttributes(this.Attributes.AddRange(items));
        }
    }

    export class AttributeTargetSpecifierSyntax extends CSharpSyntaxNode {

        constructor() { super(); }
        ctor_2639(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AttributeTargetSpecifierSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeTargetSpecifierSyntax>this.Green).identifier, this.Position, 0); }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeTargetSpecifierSyntax>this.Green).colonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAttributeTargetSpecifier(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAttributeTargetSpecifier(this);
        }

        public Update(identifier: SyntaxToken, colonToken: SyntaxToken): AttributeTargetSpecifierSyntax {
            if (identifier != this.Identifier || colonToken != this.ColonToken) {
                var newNode = SyntaxFactory.AttributeTargetSpecifier_1734(identifier, colonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithIdentifier(identifier: SyntaxToken): AttributeTargetSpecifierSyntax {
            return this.Update(identifier, this.ColonToken);
        }

        public WithColonToken(colonToken: SyntaxToken): AttributeTargetSpecifierSyntax {
            return this.Update(this.Identifier, colonToken);
        }
    }

    export class AttributeSyntax extends CSharpSyntaxNode {
        private name: NameSyntax;
        private argumentList: AttributeArgumentListSyntax;

        constructor() { super(); }
        ctor_1064(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AttributeSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Name(): NameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get ArgumentList(): AttributeArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 1);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.argumentList = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                case 1: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAttribute(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAttribute(this);
        }

        public Update(name: NameSyntax, argumentList: AttributeArgumentListSyntax): AttributeSyntax {
            if (name != this.Name || argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.Attribute_1729(name, argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: NameSyntax): AttributeSyntax {
            return this.Update(name, this.ArgumentList);
        }

        public WithArgumentList(argumentList: AttributeArgumentListSyntax): AttributeSyntax {
            return this.Update(this.Name, argumentList);
        }

        public AddArgumentListArguments(...items: AttributeArgumentSyntax[]): AttributeSyntax {
            var argumentList = this.ArgumentList != null ? this.ArgumentList : SyntaxFactory.AttributeArgumentList_9344();
            return this.WithArgumentList(argumentList.WithArguments(argumentList.Arguments.AddRange(items)));
        }
    }

    export class AttributeArgumentListSyntax extends CSharpSyntaxNode {
        private arguments: SyntaxNode;

        constructor() { super(); }
        ctor_6570(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AttributeArgumentListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeArgumentListSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Arguments(): SeparatedSyntaxList<AttributeArgumentSyntax> {
            {
                var ref = { refObj: this.arguments };
                var red = this.GetRed_2015(ref, 1);
                this.arguments = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<AttributeArgumentSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AttributeArgumentListSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.arguments };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.arguments = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.arguments;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAttributeArgumentList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAttributeArgumentList(this);
        }

        public Update(openParenToken: SyntaxToken, arguments: SeparatedSyntaxList<AttributeArgumentSyntax>, closeParenToken: SyntaxToken): AttributeArgumentListSyntax {
            if (openParenToken != this.OpenParenToken || arguments != this.Arguments || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.AttributeArgumentList_9314(openParenToken, arguments, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): AttributeArgumentListSyntax {
            return this.Update(openParenToken, this.Arguments, this.CloseParenToken);
        }

        public WithArguments(arguments: SeparatedSyntaxList<AttributeArgumentSyntax>): AttributeArgumentListSyntax {
            return this.Update(this.OpenParenToken, arguments, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): AttributeArgumentListSyntax {
            return this.Update(this.OpenParenToken, this.Arguments, closeParenToken);
        }

        public AddArguments(...items: AttributeArgumentSyntax[]): AttributeArgumentListSyntax {
            return this.WithArguments(this.Arguments.AddRange(items));
        }
    }

    export class AttributeArgumentSyntax extends CSharpSyntaxNode {
        private nameEquals: NameEqualsSyntax;
        private nameColon: NameColonSyntax;
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1819(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AttributeArgumentSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get NameEquals(): NameEqualsSyntax {
            {
                var ref = { refObj: this.nameEquals };
                var result = this.GetRedAtZero_2231(ref);
                this.nameEquals = ref.refObj; return result;
            }
        }

        public get NameColon(): NameColonSyntax {
            {
                var ref = { refObj: this.nameColon };
                var result = this.GetRed_2015(ref, 1);
                this.nameColon = ref.refObj; return result;
            }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 2);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.nameEquals };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.nameEquals = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.nameColon };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.nameColon = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.expression = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.nameEquals;
                case 1: return this.nameColon;
                case 2: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAttributeArgument(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAttributeArgument(this);
        }

        public Update(nameEquals: NameEqualsSyntax, nameColon: NameColonSyntax, expression: ExpressionSyntax): AttributeArgumentSyntax {
            if (nameEquals != this.NameEquals || nameColon != this.NameColon || expression != this.Expression) {
                var newNode = SyntaxFactory.AttributeArgument_7913(nameEquals, nameColon, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNameEquals(nameEquals: NameEqualsSyntax): AttributeArgumentSyntax {
            return this.Update(nameEquals, this.NameColon, this.Expression);
        }

        public WithNameColon(nameColon: NameColonSyntax): AttributeArgumentSyntax {
            return this.Update(this.NameEquals, nameColon, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): AttributeArgumentSyntax {
            return this.Update(this.NameEquals, this.NameColon, expression);
        }
    }

    export class NameEqualsSyntax extends CSharpSyntaxNode {
        private name: IdentifierNameSyntax;

        constructor() { super(); }
        ctor_8735(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NameEqualsSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Name(): IdentifierNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.NameEqualsSyntax>this.Green).equalsToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitNameEquals(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitNameEquals(this);
        }

        public Update(name: IdentifierNameSyntax, equalsToken: SyntaxToken): NameEqualsSyntax {
            if (name != this.Name || equalsToken != this.EqualsToken) {
                var newNode = SyntaxFactory.NameEquals_2119(name, equalsToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: IdentifierNameSyntax): NameEqualsSyntax {
            return this.Update(name, this.EqualsToken);
        }

        public WithEqualsToken(equalsToken: SyntaxToken): NameEqualsSyntax {
            return this.Update(this.Name, equalsToken);
        }
    }

    export class TypeParameterListSyntax extends CSharpSyntaxNode {
        private parameters: SyntaxNode;

        constructor() { super(); }
        ctor_2009(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeParameterListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get LessThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>this.Green).lessThanToken, this.Position, 0); }
        }

        public get Parameters(): SeparatedSyntaxList<TypeParameterSyntax> {
            {
                var ref = { refObj: this.parameters };
                var red = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<TypeParameterSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get GreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterListSyntax>this.Green).greaterThanToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeParameterList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeParameterList(this);
        }

        public Update(lessThanToken: SyntaxToken, parameters: SeparatedSyntaxList<TypeParameterSyntax>, greaterThanToken: SyntaxToken): TypeParameterListSyntax {
            if (lessThanToken != this.LessThanToken || parameters != this.Parameters || greaterThanToken != this.GreaterThanToken) {
                var newNode = SyntaxFactory.TypeParameterList_1787(lessThanToken, parameters, greaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanToken(lessThanToken: SyntaxToken): TypeParameterListSyntax {
            return this.Update(lessThanToken, this.Parameters, this.GreaterThanToken);
        }

        public WithParameters(parameters: SeparatedSyntaxList<TypeParameterSyntax>): TypeParameterListSyntax {
            return this.Update(this.LessThanToken, parameters, this.GreaterThanToken);
        }

        public WithGreaterThanToken(greaterThanToken: SyntaxToken): TypeParameterListSyntax {
            return this.Update(this.LessThanToken, this.Parameters, greaterThanToken);
        }

        public AddParameters(...items: TypeParameterSyntax[]): TypeParameterListSyntax {
            return this.WithParameters(this.Parameters.AddRange(items));
        }
    }

    export class TypeParameterSyntax extends CSharpSyntaxNode {
        private attributeLists: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1706(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeParameterSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get VarianceKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterSyntax>this.Green).varianceKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterSyntax>this.Green).identifier, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeParameter(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeParameter(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, varianceKeyword: SyntaxToken, identifier: SyntaxToken): TypeParameterSyntax {
            if (attributeLists != this.AttributeLists || varianceKeyword != this.VarianceKeyword || identifier != this.Identifier) {
                var newNode = SyntaxFactory.TypeParameter_6906(attributeLists, varianceKeyword, identifier);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): TypeParameterSyntax {
            return this.Update(attributeLists, this.VarianceKeyword, this.Identifier);
        }

        public WithVarianceKeyword(varianceKeyword: SyntaxToken): TypeParameterSyntax {
            return this.Update(this.AttributeLists, varianceKeyword, this.Identifier);
        }

        public WithIdentifier(identifier: SyntaxToken): TypeParameterSyntax {
            return this.Update(this.AttributeLists, this.VarianceKeyword, identifier);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): TypeParameterSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }
    }

    export class BaseTypeDeclarationSyntax extends MemberDeclarationSyntax {
        constructor() { super(); }
        ctor_1624(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseTypeDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> { throw new Error(); }

        public get Modifiers(): SyntaxTokenList { throw new Error(); }

        public get Identifier(): SyntaxToken { throw new Error(); }

        public get BaseList(): BaseListSyntax { throw new Error(); }

        public get OpenBraceToken(): SyntaxToken { throw new Error(); }

        public get CloseBraceToken(): SyntaxToken { throw new Error(); }

        public get SemicolonToken(): SyntaxToken { throw new Error(); }
    }

    export class TypeDeclarationSyntax extends BaseTypeDeclarationSyntax {
        constructor() { super(); }
        ctor_1437(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeDeclarationSyntax {
            super.ctor_1624(green, parent, position); return this;
        }

        public get Keyword(): SyntaxToken { throw new Error(); }

        public get TypeParameterList(): TypeParameterListSyntax { throw new Error(); }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> { throw new Error(); }

        public get Members(): SyntaxList<MemberDeclarationSyntax> { throw new Error(); }
    }

    export class ClassDeclarationSyntax extends TypeDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private typeParameterList: TypeParameterListSyntax;
        private baseList: BaseListSyntax;
        private constraintClauses: CSharpSyntaxNode;
        private members: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1093(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ClassDeclarationSyntax {
            super.ctor_1437(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassDeclarationSyntax>this.Green).keyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassDeclarationSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get TypeParameterList(): TypeParameterListSyntax {
            {
                var ref = { refObj: this.typeParameterList };
                var result = this.GetRed_2015(ref, 4);
                this.typeParameterList = ref.refObj; return result;
            }
        }

        public get BaseList(): BaseListSyntax {
            {
                var ref = { refObj: this.baseList };
                var result = this.GetRed_2015(ref, 5);
                this.baseList = ref.refObj; return result;
            }
        }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> {
            {
                var ref = { refObj: this.constraintClauses };
                var result = new SyntaxList<TypeParameterConstraintClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 6));
                this.constraintClauses = ref.refObj; return result;
            }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassDeclarationSyntax>this.Green).openBraceToken, this.GetChildPosition(7), this.GetChildIndex(7)); }
        }

        public get Members(): SyntaxList<MemberDeclarationSyntax> {
            {
                var ref = { refObj: this.members };
                var result = new SyntaxList<MemberDeclarationSyntax>().ctor_6698(this.GetRed_2015(ref, 8));
                this.members = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassDeclarationSyntax>this.Green).closeBraceToken, this.GetChildPosition(9), this.GetChildIndex(9)); }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(10), this.GetChildIndex(10));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.typeParameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.typeParameterList = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.baseList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.baseList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.constraintClauses };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.constraintClauses = ref6.refObj; return result;
                case 8:
                    var ref8 = { refObj: this.members };
                    var result: SyntaxNode = this.GetRed_2015(ref8, 8);
                    this.members = ref8.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.typeParameterList;
                case 5: return this.baseList;
                case 6: return this.constraintClauses;
                case 8: return this.members;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitClassDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitClassDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): ClassDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || keyword != this.Keyword || identifier != this.Identifier || typeParameterList != this.TypeParameterList || baseList != this.BaseList || constraintClauses != this.ConstraintClauses || openBraceToken != this.OpenBraceToken || members != this.Members || closeBraceToken != this.CloseBraceToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ClassDeclaration_6025(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): ClassDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithKeyword(keyword: SyntaxToken): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithTypeParameterList(typeParameterList: TypeParameterListSyntax): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, typeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithBaseList(baseList: BaseListSyntax): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, baseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithConstraintClauses(constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, constraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, openBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithMembers(members: SyntaxList<MemberDeclarationSyntax>): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, closeBraceToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ClassDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): ClassDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): ClassDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddTypeParameterListParameters(...items: TypeParameterSyntax[]): ClassDeclarationSyntax {
            var typeParameterList = this.TypeParameterList != null ? this.TypeParameterList : SyntaxFactory.TypeParameterList_1178();
            return this.WithTypeParameterList(typeParameterList.WithParameters(typeParameterList.Parameters.AddRange(items)));
        }

        public AddBaseListTypes(...items: BaseTypeSyntax[]): ClassDeclarationSyntax {
            var baseList = this.BaseList != null ? this.BaseList : SyntaxFactory.BaseList_1793();
            return this.WithBaseList(baseList.WithTypes(baseList.Types.AddRange(items)));
        }

        public AddConstraintClauses(...items: TypeParameterConstraintClauseSyntax[]): ClassDeclarationSyntax {
            return this.WithConstraintClauses(this.ConstraintClauses.AddRange(items));
        }

        public AddMembers(...items: MemberDeclarationSyntax[]): ClassDeclarationSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
    }

    export class StructDeclarationSyntax extends TypeDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private typeParameterList: TypeParameterListSyntax;
        private baseList: BaseListSyntax;
        private constraintClauses: CSharpSyntaxNode;
        private members: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1296(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): StructDeclarationSyntax {
            super.ctor_1437(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StructDeclarationSyntax>this.Green).keyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StructDeclarationSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get TypeParameterList(): TypeParameterListSyntax {
            {
                var ref = { refObj: this.typeParameterList };
                var result = this.GetRed_2015(ref, 4);
                this.typeParameterList = ref.refObj; return result;
            }
        }

        public get BaseList(): BaseListSyntax {
            {
                var ref = { refObj: this.baseList };
                var result = this.GetRed_2015(ref, 5);
                this.baseList = ref.refObj; return result;
            }
        }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> {
            {
                var ref = { refObj: this.constraintClauses };
                var result = new SyntaxList<TypeParameterConstraintClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 6));
                this.constraintClauses = ref.refObj; return result;
            }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StructDeclarationSyntax>this.Green).openBraceToken, this.GetChildPosition(7), this.GetChildIndex(7)); }
        }

        public get Members(): SyntaxList<MemberDeclarationSyntax> {
            {
                var ref = { refObj: this.members };
                var result = new SyntaxList<MemberDeclarationSyntax>().ctor_6698(this.GetRed_2015(ref, 8));
                this.members = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StructDeclarationSyntax>this.Green).closeBraceToken, this.GetChildPosition(9), this.GetChildIndex(9)); }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.StructDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(10), this.GetChildIndex(10));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.typeParameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.typeParameterList = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.baseList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.baseList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.constraintClauses };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.constraintClauses = ref6.refObj; return result;
                case 8:
                    var ref8 = { refObj: this.members };
                    var result: SyntaxNode = this.GetRed_2015(ref8, 8);
                    this.members = ref8.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.typeParameterList;
                case 5: return this.baseList;
                case 6: return this.constraintClauses;
                case 8: return this.members;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitStructDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitStructDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): StructDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || keyword != this.Keyword || identifier != this.Identifier || typeParameterList != this.TypeParameterList || baseList != this.BaseList || constraintClauses != this.ConstraintClauses || openBraceToken != this.OpenBraceToken || members != this.Members || closeBraceToken != this.CloseBraceToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.StructDeclaration_3822(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): StructDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithKeyword(keyword: SyntaxToken): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithTypeParameterList(typeParameterList: TypeParameterListSyntax): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, typeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithBaseList(baseList: BaseListSyntax): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, baseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithConstraintClauses(constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, constraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, openBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithMembers(members: SyntaxList<MemberDeclarationSyntax>): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, closeBraceToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): StructDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): StructDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): StructDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddTypeParameterListParameters(...items: TypeParameterSyntax[]): StructDeclarationSyntax {
            var typeParameterList = this.TypeParameterList != null ? this.TypeParameterList : SyntaxFactory.TypeParameterList_1178();
            return this.WithTypeParameterList(typeParameterList.WithParameters(typeParameterList.Parameters.AddRange(items)));
        }

        public AddBaseListTypes(...items: BaseTypeSyntax[]): StructDeclarationSyntax {
            var baseList = this.BaseList != null ? this.BaseList : SyntaxFactory.BaseList_1793();
            return this.WithBaseList(baseList.WithTypes(baseList.Types.AddRange(items)));
        }

        public AddConstraintClauses(...items: TypeParameterConstraintClauseSyntax[]): StructDeclarationSyntax {
            return this.WithConstraintClauses(this.ConstraintClauses.AddRange(items));
        }

        public AddMembers(...items: MemberDeclarationSyntax[]): StructDeclarationSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
    }

    export class InterfaceDeclarationSyntax extends TypeDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private typeParameterList: TypeParameterListSyntax;
        private baseList: BaseListSyntax;
        private constraintClauses: CSharpSyntaxNode;
        private members: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_6961(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InterfaceDeclarationSyntax {
            super.ctor_1437(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterfaceDeclarationSyntax>this.Green).keyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterfaceDeclarationSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get TypeParameterList(): TypeParameterListSyntax {
            {
                var ref = { refObj: this.typeParameterList };
                var result = this.GetRed_2015(ref, 4);
                this.typeParameterList = ref.refObj; return result;
            }
        }

        public get BaseList(): BaseListSyntax {
            {
                var ref = { refObj: this.baseList };
                var result = this.GetRed_2015(ref, 5);
                this.baseList = ref.refObj; return result;
            }
        }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> {
            {
                var ref = { refObj: this.constraintClauses };
                var result = new SyntaxList<TypeParameterConstraintClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 6));
                this.constraintClauses = ref.refObj; return result;
            }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterfaceDeclarationSyntax>this.Green).openBraceToken, this.GetChildPosition(7), this.GetChildIndex(7)); }
        }

        public get Members(): SyntaxList<MemberDeclarationSyntax> {
            {
                var ref = { refObj: this.members };
                var result = new SyntaxList<MemberDeclarationSyntax>().ctor_6698(this.GetRed_2015(ref, 8));
                this.members = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterfaceDeclarationSyntax>this.Green).closeBraceToken, this.GetChildPosition(9), this.GetChildIndex(9)); }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterfaceDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(10), this.GetChildIndex(10));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.typeParameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.typeParameterList = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.baseList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.baseList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.constraintClauses };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.constraintClauses = ref6.refObj; return result;
                case 8:
                    var ref8 = { refObj: this.members };
                    var result: SyntaxNode = this.GetRed_2015(ref8, 8);
                    this.members = ref8.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.typeParameterList;
                case 5: return this.baseList;
                case 6: return this.constraintClauses;
                case 8: return this.members;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitInterfaceDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitInterfaceDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, baseList: BaseListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, openBraceToken: SyntaxToken, members: SyntaxList<MemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): InterfaceDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || keyword != this.Keyword || identifier != this.Identifier || typeParameterList != this.TypeParameterList || baseList != this.BaseList || constraintClauses != this.ConstraintClauses || openBraceToken != this.OpenBraceToken || members != this.Members || closeBraceToken != this.CloseBraceToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.InterfaceDeclaration_1831(attributeLists, modifiers, keyword, identifier, typeParameterList, baseList, constraintClauses, openBraceToken, members, closeBraceToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): InterfaceDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithKeyword(keyword: SyntaxToken): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithTypeParameterList(typeParameterList: TypeParameterListSyntax): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, typeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithBaseList(baseList: BaseListSyntax): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, baseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithConstraintClauses(constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, constraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, openBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithMembers(members: SyntaxList<MemberDeclarationSyntax>): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, closeBraceToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): InterfaceDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Identifier, this.TypeParameterList, this.BaseList, this.ConstraintClauses, this.OpenBraceToken, this.Members, this.CloseBraceToken, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): InterfaceDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): InterfaceDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddTypeParameterListParameters(...items: TypeParameterSyntax[]): InterfaceDeclarationSyntax {
            var typeParameterList = this.TypeParameterList != null ? this.TypeParameterList : SyntaxFactory.TypeParameterList_1178();
            return this.WithTypeParameterList(typeParameterList.WithParameters(typeParameterList.Parameters.AddRange(items)));
        }

        public AddBaseListTypes(...items: BaseTypeSyntax[]): InterfaceDeclarationSyntax {
            var baseList = this.BaseList != null ? this.BaseList : SyntaxFactory.BaseList_1793();
            return this.WithBaseList(baseList.WithTypes(baseList.Types.AddRange(items)));
        }

        public AddConstraintClauses(...items: TypeParameterConstraintClauseSyntax[]): InterfaceDeclarationSyntax {
            return this.WithConstraintClauses(this.ConstraintClauses.AddRange(items));
        }

        public AddMembers(...items: MemberDeclarationSyntax[]): InterfaceDeclarationSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
    }

    export class EnumDeclarationSyntax extends BaseTypeDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private baseList: BaseListSyntax;
        private members: SyntaxNode;

        constructor() { super(); }
        ctor_1697(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EnumDeclarationSyntax {
            super.ctor_1624(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EnumKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumDeclarationSyntax>this.Green).enumKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumDeclarationSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get BaseList(): BaseListSyntax {
            {
                var ref = { refObj: this.baseList };
                var result = this.GetRed_2015(ref, 4);
                this.baseList = ref.refObj; return result;
            }
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumDeclarationSyntax>this.Green).openBraceToken, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get Members(): SeparatedSyntaxList<EnumMemberDeclarationSyntax> {
            {
                var ref = { refObj: this.members };
                var red = this.GetRed_2015(ref, 6);
                this.members = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<EnumMemberDeclarationSyntax>().ctor_9044(red, this.GetChildIndex(6));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumDeclarationSyntax>this.Green).closeBraceToken, this.GetChildPosition(7), this.GetChildIndex(7)); }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(8), this.GetChildIndex(8));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.baseList };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.baseList = ref4.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.members };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.members = ref6.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.baseList;
                case 6: return this.members;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEnumDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEnumDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, enumKeyword: SyntaxToken, identifier: SyntaxToken, baseList: BaseListSyntax, openBraceToken: SyntaxToken, members: SeparatedSyntaxList<EnumMemberDeclarationSyntax>, closeBraceToken: SyntaxToken, semicolonToken: SyntaxToken): EnumDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || enumKeyword != this.EnumKeyword || identifier != this.Identifier || baseList != this.BaseList || openBraceToken != this.OpenBraceToken || members != this.Members || closeBraceToken != this.CloseBraceToken || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.EnumDeclaration_1802(attributeLists, modifiers, enumKeyword, identifier, baseList, openBraceToken, members, closeBraceToken, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): EnumDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.EnumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithEnumKeyword(enumKeyword: SyntaxToken): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, enumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, identifier, this.BaseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithBaseList(baseList: BaseListSyntax): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, baseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, this.BaseList, openBraceToken, this.Members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithMembers(members: SeparatedSyntaxList<EnumMemberDeclarationSyntax>): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, members, this.CloseBraceToken, this.SemicolonToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, this.Members, closeBraceToken, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): EnumDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EnumKeyword, this.Identifier, this.BaseList, this.OpenBraceToken, this.Members, this.CloseBraceToken, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): EnumDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): EnumDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddBaseListTypes(...items: BaseTypeSyntax[]): EnumDeclarationSyntax {
            var baseList = this.BaseList != null ? this.BaseList : SyntaxFactory.BaseList_1793();
            return this.WithBaseList(baseList.WithTypes(baseList.Types.AddRange(items)));
        }

        public AddMembers(...items: EnumMemberDeclarationSyntax[]): EnumDeclarationSyntax {
            return this.WithMembers(this.Members.AddRange(items));
        }
    }

    export class DelegateDeclarationSyntax extends MemberDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private returnType: TypeSyntax;
        private typeParameterList: TypeParameterListSyntax;
        private parameterList: ParameterListSyntax;
        private constraintClauses: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1095(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DelegateDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get DelegateKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DelegateDeclarationSyntax>this.Green).delegateKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get ReturnType(): TypeSyntax {
            {
                var ref = { refObj: this.returnType };
                var result = this.GetRed_2015(ref, 3);
                this.returnType = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DelegateDeclarationSyntax>this.Green).identifier, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get TypeParameterList(): TypeParameterListSyntax {
            {
                var ref = { refObj: this.typeParameterList };
                var result = this.GetRed_2015(ref, 5);
                this.typeParameterList = ref.refObj; return result;
            }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 6);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> {
            {
                var ref = { refObj: this.constraintClauses };
                var result = new SyntaxList<TypeParameterConstraintClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 7));
                this.constraintClauses = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DelegateDeclarationSyntax>this.Green).semicolonToken, this.GetChildPosition(8), this.GetChildIndex(8)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.returnType };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.returnType = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.typeParameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.typeParameterList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.parameterList = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.constraintClauses };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.constraintClauses = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 3: return this.returnType;
                case 5: return this.typeParameterList;
                case 6: return this.parameterList;
                case 7: return this.constraintClauses;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDelegateDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDelegateDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, delegateKeyword: SyntaxToken, returnType: TypeSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, semicolonToken: SyntaxToken): DelegateDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || delegateKeyword != this.DelegateKeyword || returnType != this.ReturnType || identifier != this.Identifier || typeParameterList != this.TypeParameterList || parameterList != this.ParameterList || constraintClauses != this.ConstraintClauses || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.DelegateDeclaration_5980(attributeLists, modifiers, delegateKeyword, returnType, identifier, typeParameterList, parameterList, constraintClauses, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): DelegateDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithDelegateKeyword(delegateKeyword: SyntaxToken): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, delegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithReturnType(returnType: TypeSyntax): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, returnType, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithTypeParameterList(typeParameterList: TypeParameterListSyntax): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, typeParameterList, this.ParameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, parameterList, this.ConstraintClauses, this.SemicolonToken);
        }

        public WithConstraintClauses(constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, this.ParameterList, constraintClauses, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): DelegateDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.DelegateKeyword, this.ReturnType, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): DelegateDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): DelegateDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddTypeParameterListParameters(...items: TypeParameterSyntax[]): DelegateDeclarationSyntax {
            var typeParameterList = this.TypeParameterList != null ? this.TypeParameterList : SyntaxFactory.TypeParameterList_1178();
            return this.WithTypeParameterList(typeParameterList.WithParameters(typeParameterList.Parameters.AddRange(items)));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): DelegateDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddConstraintClauses(...items: TypeParameterConstraintClauseSyntax[]): DelegateDeclarationSyntax {
            return this.WithConstraintClauses(this.ConstraintClauses.AddRange(items));
        }
    }

    export class EnumMemberDeclarationSyntax extends MemberDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private equalsValue: EqualsValueClauseSyntax;

        constructor() { super(); }
        ctor_9853(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EnumMemberDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EnumMemberDeclarationSyntax>this.Green).identifier, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EqualsValue(): EqualsValueClauseSyntax {
            {
                var ref = { refObj: this.equalsValue };
                var result = this.GetRed_2015(ref, 2);
                this.equalsValue = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.equalsValue };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.equalsValue = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.equalsValue;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEnumMemberDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEnumMemberDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, identifier: SyntaxToken, equalsValue: EqualsValueClauseSyntax): EnumMemberDeclarationSyntax {
            if (attributeLists != this.AttributeLists || identifier != this.Identifier || equalsValue != this.EqualsValue) {
                var newNode = SyntaxFactory.EnumMemberDeclaration_5981(attributeLists, identifier, equalsValue);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): EnumMemberDeclarationSyntax {
            return this.Update(attributeLists, this.Identifier, this.EqualsValue);
        }

        public WithIdentifier(identifier: SyntaxToken): EnumMemberDeclarationSyntax {
            return this.Update(this.AttributeLists, identifier, this.EqualsValue);
        }

        public WithEqualsValue(equalsValue: EqualsValueClauseSyntax): EnumMemberDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Identifier, equalsValue);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): EnumMemberDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }
    }

    export class BaseListSyntax extends CSharpSyntaxNode {
        private types: SyntaxNode;

        constructor() { super(); }
        ctor_1136(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BaseListSyntax>this.Green).colonToken, this.Position, 0); }
        }

        public get Types(): SeparatedSyntaxList<BaseTypeSyntax> {
            {
                var ref = { refObj: this.types };
                var red = this.GetRed_2015(ref, 1);
                this.types = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<BaseTypeSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.types };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.types = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.types;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBaseList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBaseList(this);
        }

        public Update(colonToken: SyntaxToken, types: SeparatedSyntaxList<BaseTypeSyntax>): BaseListSyntax {
            if (colonToken != this.ColonToken || types != this.Types) {
                var newNode = SyntaxFactory.BaseList_3029(colonToken, types);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithColonToken(colonToken: SyntaxToken): BaseListSyntax {
            return this.Update(colonToken, this.Types);
        }

        public WithTypes(types: SeparatedSyntaxList<BaseTypeSyntax>): BaseListSyntax {
            return this.Update(this.ColonToken, types);
        }

        public AddTypes(...items: BaseTypeSyntax[]): BaseListSyntax {
            return this.WithTypes(this.Types.AddRange(items));
        }
    }

    export class BaseTypeSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_3109(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseTypeSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Type(): TypeSyntax { throw new Error(); }
    }

    export class SimpleBaseTypeSyntax extends BaseTypeSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1308(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SimpleBaseTypeSyntax {
            super.ctor_3109(green, parent, position); return this;
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRedAtZero_2231(ref);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.type = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSimpleBaseType(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSimpleBaseType(this);
        }

        public Update(type: TypeSyntax): SimpleBaseTypeSyntax {
            if (type != this.Type) {
                var newNode = SyntaxFactory.SimpleBaseType(type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithType(type: TypeSyntax): SimpleBaseTypeSyntax {
            return this.Update(type);
        }
    }

    export class TypeParameterConstraintClauseSyntax extends CSharpSyntaxNode {
        private name: IdentifierNameSyntax;
        private constraints: SyntaxNode;

        constructor() { super(); }
        ctor_2081(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeParameterConstraintClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get WhereKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>this.Green).whereKeyword, this.Position, 0); }
        }

        public get Name(): IdentifierNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.TypeParameterConstraintClauseSyntax>this.Green).colonToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Constraints(): SeparatedSyntaxList<TypeParameterConstraintSyntax> {
            {
                var ref = { refObj: this.constraints };
                var red = this.GetRed_2015(ref, 3);
                this.constraints = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<TypeParameterConstraintSyntax>().ctor_9044(red, this.GetChildIndex(3));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.constraints };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.constraints = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                case 3: return this.constraints;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeParameterConstraintClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeParameterConstraintClause(this);
        }

        public Update(whereKeyword: SyntaxToken, name: IdentifierNameSyntax, colonToken: SyntaxToken, constraints: SeparatedSyntaxList<TypeParameterConstraintSyntax>): TypeParameterConstraintClauseSyntax {
            if (whereKeyword != this.WhereKeyword || name != this.Name || colonToken != this.ColonToken || constraints != this.Constraints) {
                var newNode = SyntaxFactory.TypeParameterConstraintClause_1764(whereKeyword, name, colonToken, constraints);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithWhereKeyword(whereKeyword: SyntaxToken): TypeParameterConstraintClauseSyntax {
            return this.Update(whereKeyword, this.Name, this.ColonToken, this.Constraints);
        }

        public WithName(name: IdentifierNameSyntax): TypeParameterConstraintClauseSyntax {
            return this.Update(this.WhereKeyword, name, this.ColonToken, this.Constraints);
        }

        public WithColonToken(colonToken: SyntaxToken): TypeParameterConstraintClauseSyntax {
            return this.Update(this.WhereKeyword, this.Name, colonToken, this.Constraints);
        }

        public WithConstraints(constraints: SeparatedSyntaxList<TypeParameterConstraintSyntax>): TypeParameterConstraintClauseSyntax {
            return this.Update(this.WhereKeyword, this.Name, this.ColonToken, constraints);
        }

        public AddConstraints(...items: TypeParameterConstraintSyntax[]): TypeParameterConstraintClauseSyntax {
            return this.WithConstraints(this.Constraints.AddRange(items));
        }
    }

    export class TypeParameterConstraintSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1687(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeParameterConstraintSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class ConstructorConstraintSyntax extends TypeParameterConstraintSyntax {

        constructor() { super(); }
        ctor_4479(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConstructorConstraintSyntax {
            super.ctor_1687(green, parent, position); return this;
        }

        public get NewKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorConstraintSyntax>this.Green).newKeyword, this.Position, 0); }
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorConstraintSyntax>this.Green).openParenToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorConstraintSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConstructorConstraint(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConstructorConstraint(this);
        }

        public Update(newKeyword: SyntaxToken, openParenToken: SyntaxToken, closeParenToken: SyntaxToken): ConstructorConstraintSyntax {
            if (newKeyword != this.NewKeyword || openParenToken != this.OpenParenToken || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.ConstructorConstraint_1519(newKeyword, openParenToken, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithNewKeyword(newKeyword: SyntaxToken): ConstructorConstraintSyntax {
            return this.Update(newKeyword, this.OpenParenToken, this.CloseParenToken);
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ConstructorConstraintSyntax {
            return this.Update(this.NewKeyword, openParenToken, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ConstructorConstraintSyntax {
            return this.Update(this.NewKeyword, this.OpenParenToken, closeParenToken);
        }
    }

    export class ClassOrStructConstraintSyntax extends TypeParameterConstraintSyntax {

        constructor() { super(); }
        ctor_1223(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ClassOrStructConstraintSyntax {
            super.ctor_1687(green, parent, position); return this;
        }

        public get ClassOrStructKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ClassOrStructConstraintSyntax>this.Green).classOrStructKeyword, this.Position, 0); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitClassOrStructConstraint(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitClassOrStructConstraint(this);
        }

        public Update(classOrStructKeyword: SyntaxToken): ClassOrStructConstraintSyntax {
            if (classOrStructKeyword != this.ClassOrStructKeyword) {
                var newNode = SyntaxFactory.ClassOrStructConstraint_1543(this.CSharpKind(), classOrStructKeyword);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithClassOrStructKeyword(classOrStructKeyword: SyntaxToken): ClassOrStructConstraintSyntax {
            return this.Update(classOrStructKeyword);
        }
    }

    export class TypeConstraintSyntax extends TypeParameterConstraintSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_2135(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeConstraintSyntax {
            super.ctor_1687(green, parent, position); return this;
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRedAtZero_2231(ref);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.type = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeConstraint(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeConstraint(this);
        }

        public Update(type: TypeSyntax): TypeConstraintSyntax {
            if (type != this.Type) {
                var newNode = SyntaxFactory.TypeConstraint(type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithType(type: TypeSyntax): TypeConstraintSyntax {
            return this.Update(type);
        }
    }

    export class BaseFieldDeclarationSyntax extends MemberDeclarationSyntax {
        constructor() { super(); }
        ctor_1810(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseFieldDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> { throw new Error(); }

        public get Modifiers(): SyntaxTokenList { throw new Error(); }

        public get Declaration(): VariableDeclarationSyntax { throw new Error(); }

        public get SemicolonToken(): SyntaxToken { throw new Error(); }
    }

    export class FieldDeclarationSyntax extends BaseFieldDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private declaration: VariableDeclarationSyntax;

        constructor() { super(); }
        ctor_1589(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): FieldDeclarationSyntax {
            super.ctor_1810(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 2);
                this.declaration = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.FieldDeclarationSyntax>this.Green).semicolonToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.declaration = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.declaration;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitFieldDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitFieldDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): FieldDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || declaration != this.Declaration || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.FieldDeclaration_8233(attributeLists, modifiers, declaration, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): FieldDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Declaration, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): FieldDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Declaration, this.SemicolonToken);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): FieldDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, declaration, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): FieldDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Declaration, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): FieldDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): FieldDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddDeclarationVariables(...items: VariableDeclaratorSyntax[]): FieldDeclarationSyntax {
            return this.WithDeclaration(this.Declaration.WithVariables(this.Declaration.Variables.AddRange(items)));
        }
    }

    export class EventFieldDeclarationSyntax extends BaseFieldDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private declaration: VariableDeclarationSyntax;

        constructor() { super(); }
        ctor_1583(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EventFieldDeclarationSyntax {
            super.ctor_1810(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EventKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EventFieldDeclarationSyntax>this.Green).eventKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Declaration(): VariableDeclarationSyntax {
            {
                var ref = { refObj: this.declaration };
                var result = this.GetRed_2015(ref, 3);
                this.declaration = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EventFieldDeclarationSyntax>this.Green).semicolonToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.declaration };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.declaration = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 3: return this.declaration;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEventFieldDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEventFieldDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, eventKeyword: SyntaxToken, declaration: VariableDeclarationSyntax, semicolonToken: SyntaxToken): EventFieldDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || eventKeyword != this.EventKeyword || declaration != this.Declaration || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.EventFieldDeclaration_8505(attributeLists, modifiers, eventKeyword, declaration, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): EventFieldDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.EventKeyword, this.Declaration, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): EventFieldDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.EventKeyword, this.Declaration, this.SemicolonToken);
        }

        public WithEventKeyword(eventKeyword: SyntaxToken): EventFieldDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, eventKeyword, this.Declaration, this.SemicolonToken);
        }

        public WithDeclaration(declaration: VariableDeclarationSyntax): EventFieldDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, declaration, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): EventFieldDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, this.Declaration, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): EventFieldDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): EventFieldDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddDeclarationVariables(...items: VariableDeclaratorSyntax[]): EventFieldDeclarationSyntax {
            return this.WithDeclaration(this.Declaration.WithVariables(this.Declaration.Variables.AddRange(items)));
        }
    }

    export class ExplicitInterfaceSpecifierSyntax extends CSharpSyntaxNode {
        private name: NameSyntax;

        constructor() { super(); }
        ctor_1299(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ExplicitInterfaceSpecifierSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Name(): NameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get DotToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ExplicitInterfaceSpecifierSyntax>this.Green).dotToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitExplicitInterfaceSpecifier(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitExplicitInterfaceSpecifier(this);
        }

        public Update(name: NameSyntax, dotToken: SyntaxToken): ExplicitInterfaceSpecifierSyntax {
            if (name != this.Name || dotToken != this.DotToken) {
                var newNode = SyntaxFactory.ExplicitInterfaceSpecifier_1235(name, dotToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: NameSyntax): ExplicitInterfaceSpecifierSyntax {
            return this.Update(name, this.DotToken);
        }

        public WithDotToken(dotToken: SyntaxToken): ExplicitInterfaceSpecifierSyntax {
            return this.Update(this.Name, dotToken);
        }
    }

    export class BaseMethodDeclarationSyntax extends MemberDeclarationSyntax {
        constructor() { super(); }
        ctor_1899(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseMethodDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> { throw new Error(); }

        public get Modifiers(): SyntaxTokenList { throw new Error(); }

        public get ParameterList(): ParameterListSyntax { throw new Error(); }

        public get Body(): BlockSyntax { throw new Error(); }

        public get SemicolonToken(): SyntaxToken { throw new Error(); }
    }

    export class MethodDeclarationSyntax extends BaseMethodDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private returnType: TypeSyntax;
        private explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax;
        private typeParameterList: TypeParameterListSyntax;
        private parameterList: ParameterListSyntax;
        private constraintClauses: CSharpSyntaxNode;
        private body: BlockSyntax;
        private expressionBody: ArrowExpressionClauseSyntax;

        constructor() { super(); }
        ctor_4143(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MethodDeclarationSyntax {
            super.ctor_1899(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get ReturnType(): TypeSyntax {
            {
                var ref = { refObj: this.returnType };
                var result = this.GetRed_2015(ref, 2);
                this.returnType = ref.refObj; return result;
            }
        }

        public get ExplicitInterfaceSpecifier(): ExplicitInterfaceSpecifierSyntax {
            {
                var ref = { refObj: this.explicitInterfaceSpecifier };
                var result = this.GetRed_2015(ref, 3);
                this.explicitInterfaceSpecifier = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MethodDeclarationSyntax>this.Green).identifier, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get TypeParameterList(): TypeParameterListSyntax {
            {
                var ref = { refObj: this.typeParameterList };
                var result = this.GetRed_2015(ref, 5);
                this.typeParameterList = ref.refObj; return result;
            }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 6);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get ConstraintClauses(): SyntaxList<TypeParameterConstraintClauseSyntax> {
            {
                var ref = { refObj: this.constraintClauses };
                var result = new SyntaxList<TypeParameterConstraintClauseSyntax>().ctor_6698(this.GetRed_2015(ref, 7));
                this.constraintClauses = ref.refObj; return result;
            }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 8);
                this.body = ref.refObj; return result;
            }
        }

        public get ExpressionBody(): ArrowExpressionClauseSyntax {
            {
                var ref = { refObj: this.expressionBody };
                var result = this.GetRed_2015(ref, 9);
                this.expressionBody = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.MethodDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(10), this.GetChildIndex(10));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.returnType };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.returnType = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.explicitInterfaceSpecifier };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.explicitInterfaceSpecifier = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.typeParameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.typeParameterList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.parameterList = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.constraintClauses };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.constraintClauses = ref7.refObj; return result;
                case 8:
                    var ref8 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref8, 8);
                    this.body = ref8.refObj; return result;
                case 9:
                    var ref9 = { refObj: this.expressionBody };
                    var result: SyntaxNode = this.GetRed_2015(ref9, 9);
                    this.expressionBody = ref9.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.returnType;
                case 3: return this.explicitInterfaceSpecifier;
                case 5: return this.typeParameterList;
                case 6: return this.parameterList;
                case 7: return this.constraintClauses;
                case 8: return this.body;
                case 9: return this.expressionBody;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitMethodDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitMethodDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, typeParameterList: TypeParameterListSyntax, parameterList: ParameterListSyntax, constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): MethodDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || returnType != this.ReturnType || explicitInterfaceSpecifier != this.ExplicitInterfaceSpecifier || identifier != this.Identifier || typeParameterList != this.TypeParameterList || parameterList != this.ParameterList || constraintClauses != this.ConstraintClauses || body != this.Body || expressionBody != this.ExpressionBody || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.MethodDeclaration_7196(attributeLists, modifiers, returnType, explicitInterfaceSpecifier, identifier, typeParameterList, parameterList, constraintClauses, body, expressionBody, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): MethodDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithReturnType(returnType: TypeSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, returnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithExplicitInterfaceSpecifier(explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, explicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithTypeParameterList(typeParameterList: TypeParameterListSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, typeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, parameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithConstraintClauses(constraintClauses: SyntaxList<TypeParameterConstraintClauseSyntax>): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, constraintClauses, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithExpressionBody(expressionBody: ArrowExpressionClauseSyntax): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, expressionBody, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): MethodDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.ExplicitInterfaceSpecifier, this.Identifier, this.TypeParameterList, this.ParameterList, this.ConstraintClauses, this.Body, this.ExpressionBody, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): MethodDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): MethodDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddTypeParameterListParameters(...items: TypeParameterSyntax[]): MethodDeclarationSyntax {
            var typeParameterList = this.TypeParameterList != null ? this.TypeParameterList : SyntaxFactory.TypeParameterList_1178();
            return this.WithTypeParameterList(typeParameterList.WithParameters(typeParameterList.Parameters.AddRange(items)));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): MethodDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddConstraintClauses(...items: TypeParameterConstraintClauseSyntax[]): MethodDeclarationSyntax {
            return this.WithConstraintClauses(this.ConstraintClauses.AddRange(items));
        }

        public AddBodyStatements(...items: StatementSyntax[]): MethodDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class OperatorDeclarationSyntax extends BaseMethodDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private returnType: TypeSyntax;
        private parameterList: ParameterListSyntax;
        private body: BlockSyntax;
        private expressionBody: ArrowExpressionClauseSyntax;

        constructor() { super(); }
        ctor_4027(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OperatorDeclarationSyntax {
            super.ctor_1899(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get ReturnType(): TypeSyntax {
            {
                var ref = { refObj: this.returnType };
                var result = this.GetRed_2015(ref, 2);
                this.returnType = ref.refObj; return result;
            }
        }

        public get OperatorKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OperatorDeclarationSyntax>this.Green).operatorKeyword, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OperatorDeclarationSyntax>this.Green).operatorToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 5);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 6);
                this.body = ref.refObj; return result;
            }
        }

        public get ExpressionBody(): ArrowExpressionClauseSyntax {
            {
                var ref = { refObj: this.expressionBody };
                var result = this.GetRed_2015(ref, 7);
                this.expressionBody = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OperatorDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(8), this.GetChildIndex(8));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.returnType };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.returnType = ref2.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.parameterList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.body = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.expressionBody };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.expressionBody = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.returnType;
                case 5: return this.parameterList;
                case 6: return this.body;
                case 7: return this.expressionBody;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOperatorDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOperatorDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, returnType: TypeSyntax, operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): OperatorDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || returnType != this.ReturnType || operatorKeyword != this.OperatorKeyword || operatorToken != this.OperatorToken || parameterList != this.ParameterList || body != this.Body || expressionBody != this.ExpressionBody || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.OperatorDeclaration_1160(attributeLists, modifiers, returnType, operatorKeyword, operatorToken, parameterList, body, expressionBody, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): OperatorDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithReturnType(returnType: TypeSyntax): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, returnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithOperatorKeyword(operatorKeyword: SyntaxToken): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, operatorKeyword, this.OperatorToken, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, operatorToken, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, parameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithExpressionBody(expressionBody: ArrowExpressionClauseSyntax): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, this.Body, expressionBody, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): OperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ReturnType, this.OperatorKeyword, this.OperatorToken, this.ParameterList, this.Body, this.ExpressionBody, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): OperatorDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): OperatorDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): OperatorDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddBodyStatements(...items: StatementSyntax[]): OperatorDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class ConversionOperatorDeclarationSyntax extends BaseMethodDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;
        private parameterList: ParameterListSyntax;
        private body: BlockSyntax;
        private expressionBody: ArrowExpressionClauseSyntax;

        constructor() { super(); }
        ctor_4050(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConversionOperatorDeclarationSyntax {
            super.ctor_1899(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get ImplicitOrExplicitKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConversionOperatorDeclarationSyntax>this.Green).implicitOrExplicitKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get OperatorKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConversionOperatorDeclarationSyntax>this.Green).operatorKeyword, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 4);
                this.type = ref.refObj; return result;
            }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 5);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 6);
                this.body = ref.refObj; return result;
            }
        }

        public get ExpressionBody(): ArrowExpressionClauseSyntax {
            {
                var ref = { refObj: this.expressionBody };
                var result = this.GetRed_2015(ref, 7);
                this.expressionBody = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConversionOperatorDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(8), this.GetChildIndex(8));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.type = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.parameterList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.body = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.expressionBody };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.expressionBody = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.type;
                case 5: return this.parameterList;
                case 6: return this.body;
                case 7: return this.expressionBody;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConversionOperatorDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConversionOperatorDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameterList: ParameterListSyntax, body: BlockSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolonToken: SyntaxToken): ConversionOperatorDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || implicitOrExplicitKeyword != this.ImplicitOrExplicitKeyword || operatorKeyword != this.OperatorKeyword || type != this.Type || parameterList != this.ParameterList || body != this.Body || expressionBody != this.ExpressionBody || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ConversionOperatorDeclaration_1744(attributeLists, modifiers, implicitOrExplicitKeyword, operatorKeyword, type, parameterList, body, expressionBody, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): ConversionOperatorDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithImplicitOrExplicitKeyword(implicitOrExplicitKeyword: SyntaxToken): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, implicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithOperatorKeyword(operatorKeyword: SyntaxToken): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, operatorKeyword, this.Type, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithType(type: TypeSyntax): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, type, this.ParameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, parameterList, this.Body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, body, this.ExpressionBody, this.SemicolonToken);
        }

        public WithExpressionBody(expressionBody: ArrowExpressionClauseSyntax): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, this.Body, expressionBody, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ConversionOperatorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.ParameterList, this.Body, this.ExpressionBody, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): ConversionOperatorDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): ConversionOperatorDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): ConversionOperatorDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddBodyStatements(...items: StatementSyntax[]): ConversionOperatorDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class ConstructorDeclarationSyntax extends BaseMethodDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private parameterList: ParameterListSyntax;
        private initializer: ConstructorInitializerSyntax;
        private body: BlockSyntax;

        constructor() { super(); }
        ctor_1279(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConstructorDeclarationSyntax {
            super.ctor_1899(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorDeclarationSyntax>this.Green).identifier, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 3);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get Initializer(): ConstructorInitializerSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 4);
                this.initializer = ref.refObj; return result;
            }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 5);
                this.body = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(6), this.GetChildIndex(6));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.parameterList = ref3.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.initializer = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.body = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 3: return this.parameterList;
                case 4: return this.initializer;
                case 5: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConstructorDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConstructorDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, identifier: SyntaxToken, parameterList: ParameterListSyntax, initializer: ConstructorInitializerSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): ConstructorDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || identifier != this.Identifier || parameterList != this.ParameterList || initializer != this.Initializer || body != this.Body || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.ConstructorDeclaration_1481(attributeLists, modifiers, identifier, parameterList, initializer, body, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): ConstructorDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Identifier, this.ParameterList, this.Initializer, this.Body, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Identifier, this.ParameterList, this.Initializer, this.Body, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, identifier, this.ParameterList, this.Initializer, this.Body, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Identifier, parameterList, this.Initializer, this.Body, this.SemicolonToken);
        }

        public WithInitializer(initializer: ConstructorInitializerSyntax): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Identifier, this.ParameterList, initializer, this.Body, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Identifier, this.ParameterList, this.Initializer, body, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): ConstructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Identifier, this.ParameterList, this.Initializer, this.Body, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): ConstructorDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): ConstructorDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): ConstructorDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddBodyStatements(...items: StatementSyntax[]): ConstructorDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class ConstructorInitializerSyntax extends CSharpSyntaxNode {
        private argumentList: ArgumentListSyntax;

        constructor() { super(); }
        ctor_7521(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConstructorInitializerSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorInitializerSyntax>this.Green).colonToken, this.Position, 0); }
        }

        public get ThisOrBaseKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConstructorInitializerSyntax>this.Green).thisOrBaseKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get ArgumentList(): ArgumentListSyntax {
            {
                var ref = { refObj: this.argumentList };
                var result = this.GetRed_2015(ref, 2);
                this.argumentList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.argumentList };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.argumentList = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.argumentList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConstructorInitializer(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConstructorInitializer(this);
        }

        public Update(colonToken: SyntaxToken, thisOrBaseKeyword: SyntaxToken, argumentList: ArgumentListSyntax): ConstructorInitializerSyntax {
            if (colonToken != this.ColonToken || thisOrBaseKeyword != this.ThisOrBaseKeyword || argumentList != this.ArgumentList) {
                var newNode = SyntaxFactory.ConstructorInitializer_7095(this.CSharpKind(), colonToken, thisOrBaseKeyword, argumentList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithColonToken(colonToken: SyntaxToken): ConstructorInitializerSyntax {
            return this.Update(colonToken, this.ThisOrBaseKeyword, this.ArgumentList);
        }

        public WithThisOrBaseKeyword(thisOrBaseKeyword: SyntaxToken): ConstructorInitializerSyntax {
            return this.Update(this.ColonToken, thisOrBaseKeyword, this.ArgumentList);
        }

        public WithArgumentList(argumentList: ArgumentListSyntax): ConstructorInitializerSyntax {
            return this.Update(this.ColonToken, this.ThisOrBaseKeyword, argumentList);
        }

        public AddArgumentListArguments(...items: ArgumentSyntax[]): ConstructorInitializerSyntax {
            return this.WithArgumentList(this.ArgumentList.WithArguments(this.ArgumentList.Arguments.AddRange(items)));
        }
    }

    export class DestructorDeclarationSyntax extends BaseMethodDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private parameterList: ParameterListSyntax;
        private body: BlockSyntax;

        constructor() { super(); }
        ctor_1597(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DestructorDeclarationSyntax {
            super.ctor_1899(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get TildeToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DestructorDeclarationSyntax>this.Green).tildeToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DestructorDeclarationSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get ParameterList(): ParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 4);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 5);
                this.body = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DestructorDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(6), this.GetChildIndex(6));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.parameterList = ref4.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.body = ref5.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 4: return this.parameterList;
                case 5: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDestructorDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDestructorDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, tildeToken: SyntaxToken, identifier: SyntaxToken, parameterList: ParameterListSyntax, body: BlockSyntax, semicolonToken: SyntaxToken): DestructorDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || tildeToken != this.TildeToken || identifier != this.Identifier || parameterList != this.ParameterList || body != this.Body || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.DestructorDeclaration_1923(attributeLists, modifiers, tildeToken, identifier, parameterList, body, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): DestructorDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.TildeToken, this.Identifier, this.ParameterList, this.Body, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.TildeToken, this.Identifier, this.ParameterList, this.Body, this.SemicolonToken);
        }

        public WithTildeToken(tildeToken: SyntaxToken): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, tildeToken, this.Identifier, this.ParameterList, this.Body, this.SemicolonToken);
        }

        public WithIdentifier(identifier: SyntaxToken): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.TildeToken, identifier, this.ParameterList, this.Body, this.SemicolonToken);
        }

        public WithParameterList(parameterList: ParameterListSyntax): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.TildeToken, this.Identifier, parameterList, this.Body, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.TildeToken, this.Identifier, this.ParameterList, body, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): DestructorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.TildeToken, this.Identifier, this.ParameterList, this.Body, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): DestructorDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): DestructorDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): DestructorDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddBodyStatements(...items: StatementSyntax[]): DestructorDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class BasePropertyDeclarationSyntax extends MemberDeclarationSyntax {
        constructor() { super(); }
        ctor_3562(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BasePropertyDeclarationSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> { throw new Error(); }

        public get Modifiers(): SyntaxTokenList { throw new Error(); }

        public get Type(): TypeSyntax { throw new Error(); }

        public get ExplicitInterfaceSpecifier(): ExplicitInterfaceSpecifierSyntax { throw new Error(); }

        public get AccessorList(): AccessorListSyntax { throw new Error(); }
    }

    export class PropertyDeclarationSyntax extends BasePropertyDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;
        private explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax;
        private accessorList: AccessorListSyntax;
        private expressionBody: ArrowExpressionClauseSyntax;
        private initializer: EqualsValueClauseSyntax;

        constructor() { super(); }
        ctor_1532(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PropertyDeclarationSyntax {
            super.ctor_3562(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get ExplicitInterfaceSpecifier(): ExplicitInterfaceSpecifierSyntax {
            {
                var ref = { refObj: this.explicitInterfaceSpecifier };
                var result = this.GetRed_2015(ref, 3);
                this.explicitInterfaceSpecifier = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PropertyDeclarationSyntax>this.Green).identifier, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get AccessorList(): AccessorListSyntax {
            {
                var ref = { refObj: this.accessorList };
                var result = this.GetRed_2015(ref, 5);
                this.accessorList = ref.refObj; return result;
            }
        }

        public get ExpressionBody(): ArrowExpressionClauseSyntax {
            {
                var ref = { refObj: this.expressionBody };
                var result = this.GetRed_2015(ref, 6);
                this.expressionBody = ref.refObj; return result;
            }
        }

        public get Initializer(): EqualsValueClauseSyntax {
            {
                var ref = { refObj: this.initializer };
                var result = this.GetRed_2015(ref, 7);
                this.initializer = ref.refObj; return result;
            }
        }

        public get Semicolon(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PropertyDeclarationSyntax>this.Green).semicolon;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(8), this.GetChildIndex(8));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.explicitInterfaceSpecifier };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.explicitInterfaceSpecifier = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.accessorList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.accessorList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.expressionBody };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.expressionBody = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.initializer };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.initializer = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.type;
                case 3: return this.explicitInterfaceSpecifier;
                case 5: return this.accessorList;
                case 6: return this.expressionBody;
                case 7: return this.initializer;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPropertyDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPropertyDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, initializer: EqualsValueClauseSyntax, semicolon: SyntaxToken): PropertyDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || type != this.Type || explicitInterfaceSpecifier != this.ExplicitInterfaceSpecifier || identifier != this.Identifier || accessorList != this.AccessorList || expressionBody != this.ExpressionBody || initializer != this.Initializer || semicolon != this.Semicolon) {
                var newNode = SyntaxFactory.PropertyDeclaration_1381(attributeLists, modifiers, type, explicitInterfaceSpecifier, identifier, accessorList, expressionBody, initializer, semicolon);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): PropertyDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithModifiers(modifiers: SyntaxTokenList): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithType(type: TypeSyntax): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithExplicitInterfaceSpecifier(explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, explicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithIdentifier(identifier: SyntaxToken): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, identifier, this.AccessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithAccessorList(accessorList: AccessorListSyntax): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, accessorList, this.ExpressionBody, this.Initializer, this.Semicolon);
        }

        public WithExpressionBody(expressionBody: ArrowExpressionClauseSyntax): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, expressionBody, this.Initializer, this.Semicolon);
        }

        public WithInitializer(initializer: EqualsValueClauseSyntax): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, initializer, this.Semicolon);
        }

        public WithSemicolon(semicolon: SyntaxToken): PropertyDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList, this.ExpressionBody, this.Initializer, semicolon);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): PropertyDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): PropertyDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddAccessorListAccessors(...items: AccessorDeclarationSyntax[]): PropertyDeclarationSyntax {
            var accessorList = this.AccessorList != null ? this.AccessorList : SyntaxFactory.AccessorList_1820();
            return this.WithAccessorList(accessorList.WithAccessors(accessorList.Accessors.AddRange(items)));
        }
    }

    export class ArrowExpressionClauseSyntax extends CSharpSyntaxNode {
        private expression: ExpressionSyntax;

        constructor() { super(); }
        ctor_1013(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ArrowExpressionClauseSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get ArrowToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ArrowExpressionClauseSyntax>this.Green).arrowToken, this.Position, 0); }
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRed_2015(ref, 1);
                this.expression = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.expression = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.expression;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitArrowExpressionClause(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitArrowExpressionClause(this);
        }

        public Update(arrowToken: SyntaxToken, expression: ExpressionSyntax): ArrowExpressionClauseSyntax {
            if (arrowToken != this.ArrowToken || expression != this.Expression) {
                var newNode = SyntaxFactory.ArrowExpressionClause_7237(arrowToken, expression);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithArrowToken(arrowToken: SyntaxToken): ArrowExpressionClauseSyntax {
            return this.Update(arrowToken, this.Expression);
        }

        public WithExpression(expression: ExpressionSyntax): ArrowExpressionClauseSyntax {
            return this.Update(this.ArrowToken, expression);
        }
    }

    export class EventDeclarationSyntax extends BasePropertyDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;
        private explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax;
        private accessorList: AccessorListSyntax;

        constructor() { super(); }
        ctor_1337(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EventDeclarationSyntax {
            super.ctor_3562(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EventKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EventDeclarationSyntax>this.Green).eventKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 3);
                this.type = ref.refObj; return result;
            }
        }

        public get ExplicitInterfaceSpecifier(): ExplicitInterfaceSpecifierSyntax {
            {
                var ref = { refObj: this.explicitInterfaceSpecifier };
                var result = this.GetRed_2015(ref, 4);
                this.explicitInterfaceSpecifier = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EventDeclarationSyntax>this.Green).identifier, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get AccessorList(): AccessorListSyntax {
            {
                var ref = { refObj: this.accessorList };
                var result = this.GetRed_2015(ref, 6);
                this.accessorList = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.type = ref3.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.explicitInterfaceSpecifier };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.explicitInterfaceSpecifier = ref4.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.accessorList };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.accessorList = ref6.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 3: return this.type;
                case 4: return this.explicitInterfaceSpecifier;
                case 6: return this.accessorList;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEventDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEventDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, eventKeyword: SyntaxToken, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, identifier: SyntaxToken, accessorList: AccessorListSyntax): EventDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || eventKeyword != this.EventKeyword || type != this.Type || explicitInterfaceSpecifier != this.ExplicitInterfaceSpecifier || identifier != this.Identifier || accessorList != this.AccessorList) {
                var newNode = SyntaxFactory.EventDeclaration_1808(attributeLists, modifiers, eventKeyword, type, explicitInterfaceSpecifier, identifier, accessorList);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): EventDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.EventKeyword, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList);
        }

        public WithModifiers(modifiers: SyntaxTokenList): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.EventKeyword, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList);
        }

        public WithEventKeyword(eventKeyword: SyntaxToken): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, eventKeyword, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList);
        }

        public WithType(type: TypeSyntax): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, type, this.ExplicitInterfaceSpecifier, this.Identifier, this.AccessorList);
        }

        public WithExplicitInterfaceSpecifier(explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, this.Type, explicitInterfaceSpecifier, this.Identifier, this.AccessorList);
        }

        public WithIdentifier(identifier: SyntaxToken): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, this.Type, this.ExplicitInterfaceSpecifier, identifier, this.AccessorList);
        }

        public WithAccessorList(accessorList: AccessorListSyntax): EventDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.EventKeyword, this.Type, this.ExplicitInterfaceSpecifier, this.Identifier, accessorList);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): EventDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): EventDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddAccessorListAccessors(...items: AccessorDeclarationSyntax[]): EventDeclarationSyntax {
            return this.WithAccessorList(this.AccessorList.WithAccessors(this.AccessorList.Accessors.AddRange(items)));
        }
    }

    export class IndexerDeclarationSyntax extends BasePropertyDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;
        private explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax;
        private parameterList: BracketedParameterListSyntax;
        private accessorList: AccessorListSyntax;
        private expressionBody: ArrowExpressionClauseSyntax;

        constructor() { super(); }
        ctor_3620(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IndexerDeclarationSyntax {
            super.ctor_3562(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get ExplicitInterfaceSpecifier(): ExplicitInterfaceSpecifierSyntax {
            {
                var ref = { refObj: this.explicitInterfaceSpecifier };
                var result = this.GetRed_2015(ref, 3);
                this.explicitInterfaceSpecifier = ref.refObj; return result;
            }
        }

        public get ThisKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IndexerDeclarationSyntax>this.Green).thisKeyword, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get ParameterList(): BracketedParameterListSyntax {
            {
                var ref = { refObj: this.parameterList };
                var result = this.GetRed_2015(ref, 5);
                this.parameterList = ref.refObj; return result;
            }
        }

        public get AccessorList(): AccessorListSyntax {
            {
                var ref = { refObj: this.accessorList };
                var result = this.GetRed_2015(ref, 6);
                this.accessorList = ref.refObj; return result;
            }
        }

        public get ExpressionBody(): ArrowExpressionClauseSyntax {
            {
                var ref = { refObj: this.expressionBody };
                var result = this.GetRed_2015(ref, 7);
                this.expressionBody = ref.refObj; return result;
            }
        }

        public get Semicolon(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IndexerDeclarationSyntax>this.Green).semicolon;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(8), this.GetChildIndex(8));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.explicitInterfaceSpecifier };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.explicitInterfaceSpecifier = ref3.refObj; return result;
                case 5:
                    var ref5 = { refObj: this.parameterList };
                    var result: SyntaxNode = this.GetRed_2015(ref5, 5);
                    this.parameterList = ref5.refObj; return result;
                case 6:
                    var ref6 = { refObj: this.accessorList };
                    var result: SyntaxNode = this.GetRed_2015(ref6, 6);
                    this.accessorList = ref6.refObj; return result;
                case 7:
                    var ref7 = { refObj: this.expressionBody };
                    var result: SyntaxNode = this.GetRed_2015(ref7, 7);
                    this.expressionBody = ref7.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.type;
                case 3: return this.explicitInterfaceSpecifier;
                case 5: return this.parameterList;
                case 6: return this.accessorList;
                case 7: return this.expressionBody;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIndexerDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIndexerDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, type: TypeSyntax, explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax, thisKeyword: SyntaxToken, parameterList: BracketedParameterListSyntax, accessorList: AccessorListSyntax, expressionBody: ArrowExpressionClauseSyntax, semicolon: SyntaxToken): IndexerDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || type != this.Type || explicitInterfaceSpecifier != this.ExplicitInterfaceSpecifier || thisKeyword != this.ThisKeyword || parameterList != this.ParameterList || accessorList != this.AccessorList || expressionBody != this.ExpressionBody || semicolon != this.Semicolon) {
                var newNode = SyntaxFactory.IndexerDeclaration_8282(attributeLists, modifiers, type, explicitInterfaceSpecifier, thisKeyword, parameterList, accessorList, expressionBody, semicolon);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): IndexerDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithModifiers(modifiers: SyntaxTokenList): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithType(type: TypeSyntax): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithExplicitInterfaceSpecifier(explicitInterfaceSpecifier: ExplicitInterfaceSpecifierSyntax): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, explicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithThisKeyword(thisKeyword: SyntaxToken): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, thisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithParameterList(parameterList: BracketedParameterListSyntax): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, parameterList, this.AccessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithAccessorList(accessorList: AccessorListSyntax): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, accessorList, this.ExpressionBody, this.Semicolon);
        }

        public WithExpressionBody(expressionBody: ArrowExpressionClauseSyntax): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, expressionBody, this.Semicolon);
        }

        public WithSemicolon(semicolon: SyntaxToken): IndexerDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.ExplicitInterfaceSpecifier, this.ThisKeyword, this.ParameterList, this.AccessorList, this.ExpressionBody, semicolon);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): IndexerDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): IndexerDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddParameterListParameters(...items: ParameterSyntax[]): IndexerDeclarationSyntax {
            return this.WithParameterList(this.ParameterList.WithParameters(this.ParameterList.Parameters.AddRange(items)));
        }

        public AddAccessorListAccessors(...items: AccessorDeclarationSyntax[]): IndexerDeclarationSyntax {
            var accessorList = this.AccessorList != null ? this.AccessorList : SyntaxFactory.AccessorList_1820();
            return this.WithAccessorList(accessorList.WithAccessors(accessorList.Accessors.AddRange(items)));
        }
    }

    export class AccessorListSyntax extends CSharpSyntaxNode {
        private accessors: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1609(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AccessorListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get OpenBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorListSyntax>this.Green).openBraceToken, this.Position, 0); }
        }

        public get Accessors(): SyntaxList<AccessorDeclarationSyntax> {
            {
                var ref = { refObj: this.accessors };
                var result = new SyntaxList<AccessorDeclarationSyntax>().ctor_6698(this.GetRed_2015(ref, 1));
                this.accessors = ref.refObj; return result;
            }
        }

        public get CloseBraceToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorListSyntax>this.Green).closeBraceToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.accessors };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.accessors = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.accessors;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAccessorList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAccessorList(this);
        }

        public Update(openBraceToken: SyntaxToken, accessors: SyntaxList<AccessorDeclarationSyntax>, closeBraceToken: SyntaxToken): AccessorListSyntax {
            if (openBraceToken != this.OpenBraceToken || accessors != this.Accessors || closeBraceToken != this.CloseBraceToken) {
                var newNode = SyntaxFactory.AccessorList_1639(openBraceToken, accessors, closeBraceToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBraceToken(openBraceToken: SyntaxToken): AccessorListSyntax {
            return this.Update(openBraceToken, this.Accessors, this.CloseBraceToken);
        }

        public WithAccessors(accessors: SyntaxList<AccessorDeclarationSyntax>): AccessorListSyntax {
            return this.Update(this.OpenBraceToken, accessors, this.CloseBraceToken);
        }

        public WithCloseBraceToken(closeBraceToken: SyntaxToken): AccessorListSyntax {
            return this.Update(this.OpenBraceToken, this.Accessors, closeBraceToken);
        }

        public AddAccessors(...items: AccessorDeclarationSyntax[]): AccessorListSyntax {
            return this.WithAccessors(this.Accessors.AddRange(items));
        }
    }

    export class AccessorDeclarationSyntax extends CSharpSyntaxNode {
        private attributeLists: CSharpSyntaxNode;
        private body: BlockSyntax;

        constructor() { super(); }
        ctor_1760(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): AccessorDeclarationSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Keyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorDeclarationSyntax>this.Green).keyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Body(): BlockSyntax {
            {
                var ref = { refObj: this.body };
                var result = this.GetRed_2015(ref, 3);
                this.body = ref.refObj; return result;
            }
        }

        public get SemicolonToken(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.AccessorDeclarationSyntax>this.Green).semicolonToken;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(4), this.GetChildIndex(4));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.body };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.body = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 3: return this.body;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitAccessorDeclaration(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitAccessorDeclaration(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, keyword: SyntaxToken, body: BlockSyntax, semicolonToken: SyntaxToken): AccessorDeclarationSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || keyword != this.Keyword || body != this.Body || semicolonToken != this.SemicolonToken) {
                var newNode = SyntaxFactory.AccessorDeclaration_8957(this.CSharpKind(), attributeLists, modifiers, keyword, body, semicolonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): AccessorDeclarationSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Keyword, this.Body, this.SemicolonToken);
        }

        public WithModifiers(modifiers: SyntaxTokenList): AccessorDeclarationSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Keyword, this.Body, this.SemicolonToken);
        }

        public WithKeyword(keyword: SyntaxToken): AccessorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, keyword, this.Body, this.SemicolonToken);
        }

        public WithBody(body: BlockSyntax): AccessorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, body, this.SemicolonToken);
        }

        public WithSemicolonToken(semicolonToken: SyntaxToken): AccessorDeclarationSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Keyword, this.Body, semicolonToken);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): AccessorDeclarationSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): AccessorDeclarationSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }

        public AddBodyStatements(...items: StatementSyntax[]): AccessorDeclarationSyntax {
            var body = this.Body != null ? this.Body : SyntaxFactory.Block_1037();
            return this.WithBody(body.WithStatements(body.Statements.AddRange(items)));
        }
    }

    export class BaseParameterListSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1577(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseParameterListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Parameters(): SeparatedSyntaxList<ParameterSyntax> { throw new Error(); }
    }

    export class ParameterListSyntax extends BaseParameterListSyntax {
        private parameters: SyntaxNode;

        constructor() { super(); }
        ctor_1013(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ParameterListSyntax {
            super.ctor_1577(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Parameters(): SeparatedSyntaxList<ParameterSyntax> {
            {
                var ref = { refObj: this.parameters };
                var red = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ParameterSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterListSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitParameterList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitParameterList(this);
        }

        public Update(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeParenToken: SyntaxToken): ParameterListSyntax {
            if (openParenToken != this.OpenParenToken || parameters != this.Parameters || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.ParameterList_1120(openParenToken, parameters, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): ParameterListSyntax {
            return this.Update(openParenToken, this.Parameters, this.CloseParenToken);
        }

        public WithParameters(parameters: SeparatedSyntaxList<ParameterSyntax>): ParameterListSyntax {
            return this.Update(this.OpenParenToken, parameters, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): ParameterListSyntax {
            return this.Update(this.OpenParenToken, this.Parameters, closeParenToken);
        }

        public AddParameters(...items: ParameterSyntax[]): ParameterListSyntax {
            return this.WithParameters(this.Parameters.AddRange(items));
        }
    }

    export class BracketedParameterListSyntax extends BaseParameterListSyntax {
        private parameters: SyntaxNode;

        constructor() { super(); }
        ctor_2140(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BracketedParameterListSyntax {
            super.ctor_1577(green, parent, position); return this;
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedParameterListSyntax>this.Green).openBracketToken, this.Position, 0); }
        }

        public get Parameters(): SeparatedSyntaxList<ParameterSyntax> {
            {
                var ref = { refObj: this.parameters };
                var red = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ParameterSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BracketedParameterListSyntax>this.Green).closeBracketToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBracketedParameterList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBracketedParameterList(this);
        }

        public Update(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<ParameterSyntax>, closeBracketToken: SyntaxToken): BracketedParameterListSyntax {
            if (openBracketToken != this.OpenBracketToken || parameters != this.Parameters || closeBracketToken != this.CloseBracketToken) {
                var newNode = SyntaxFactory.BracketedParameterList_1823(openBracketToken, parameters, closeBracketToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): BracketedParameterListSyntax {
            return this.Update(openBracketToken, this.Parameters, this.CloseBracketToken);
        }

        public WithParameters(parameters: SeparatedSyntaxList<ParameterSyntax>): BracketedParameterListSyntax {
            return this.Update(this.OpenBracketToken, parameters, this.CloseBracketToken);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): BracketedParameterListSyntax {
            return this.Update(this.OpenBracketToken, this.Parameters, closeBracketToken);
        }

        public AddParameters(...items: ParameterSyntax[]): BracketedParameterListSyntax {
            return this.WithParameters(this.Parameters.AddRange(items));
        }
    }

    export class ParameterSyntax extends CSharpSyntaxNode {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;
        private $default: EqualsValueClauseSyntax;

        constructor() { super(); }
        ctor_1019(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ParameterSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ParameterSyntax>this.Green).identifier, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Default(): EqualsValueClauseSyntax {
            {
                var ref = { refObj: this.$default };
                var result = this.GetRed_2015(ref, 4);
                this.$default = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                case 4:
                    var ref4 = { refObj: this.$default };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.$default = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.type;
                case 4: return this.$default;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitParameter(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitParameter(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, type: TypeSyntax, identifier: SyntaxToken, $default: EqualsValueClauseSyntax): ParameterSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || type != this.Type || identifier != this.Identifier || $default != this.Default) {
                var newNode = SyntaxFactory.Parameter_7982(attributeLists, modifiers, type, identifier, $default);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): ParameterSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Type, this.Identifier, this.Default);
        }

        public WithModifiers(modifiers: SyntaxTokenList): ParameterSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Type, this.Identifier, this.Default);
        }

        public WithType(type: TypeSyntax): ParameterSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, type, this.Identifier, this.Default);
        }

        public WithIdentifier(identifier: SyntaxToken): ParameterSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, identifier, this.Default);
        }

        public WithDefault($default: EqualsValueClauseSyntax): ParameterSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, this.Type, this.Identifier, $default);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): ParameterSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): ParameterSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }
    }

    export class IncompleteMemberSyntax extends MemberDeclarationSyntax {
        private attributeLists: CSharpSyntaxNode;
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1857(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IncompleteMemberSyntax {
            super.ctor_7461(green, parent, position); return this;
        }

        public get AttributeLists(): SyntaxList<AttributeListSyntax> {
            {
                var ref = { refObj: this.attributeLists };
                var result = new SyntaxList<AttributeListSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.attributeLists = ref.refObj; return result;
            }
        }

        public get Modifiers(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.attributeLists };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.attributeLists = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.attributeLists;
                case 2: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIncompleteMember(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIncompleteMember(this);
        }

        public Update(attributeLists: SyntaxList<AttributeListSyntax>, modifiers: SyntaxTokenList, type: TypeSyntax): IncompleteMemberSyntax {
            if (attributeLists != this.AttributeLists || modifiers != this.Modifiers || type != this.Type) {
                var newNode = SyntaxFactory.IncompleteMember_1376(attributeLists, modifiers, type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithAttributeLists(attributeLists: SyntaxList<AttributeListSyntax>): IncompleteMemberSyntax {
            return this.Update(attributeLists, this.Modifiers, this.Type);
        }

        public WithModifiers(modifiers: SyntaxTokenList): IncompleteMemberSyntax {
            return this.Update(this.AttributeLists, modifiers, this.Type);
        }

        public WithType(type: TypeSyntax): IncompleteMemberSyntax {
            return this.Update(this.AttributeLists, this.Modifiers, type);
        }

        public AddAttributeLists(...items: AttributeListSyntax[]): IncompleteMemberSyntax {
            return this.WithAttributeLists(this.AttributeLists.AddRange(items));
        }

        public AddModifiers(...items: SyntaxToken[]): IncompleteMemberSyntax {
            return this.WithModifiers(this.Modifiers.AddRange(items));
        }
    }

    export class SkippedTokensTriviaSyntax extends StructuredTriviaSyntax {

        constructor() { super(); }
        ctor_9665(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): SkippedTokensTriviaSyntax {
            super.ctor_1526(green, parent, position); return this;
        }

        public get Tokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(0);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.Position, 0);

                return structDefault(SyntaxTokenList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitSkippedTokensTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitSkippedTokensTrivia(this);
        }

        public Update(tokens: SyntaxTokenList): SkippedTokensTriviaSyntax {
            if (tokens != this.Tokens) {
                var newNode = SyntaxFactory.SkippedTokensTrivia_1492(tokens);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithTokens(tokens: SyntaxTokenList): SkippedTokensTriviaSyntax {
            return this.Update(tokens);
        }

        public AddTokens(...items: SyntaxToken[]): SkippedTokensTriviaSyntax {
            return this.WithTokens(this.Tokens.AddRange(items));
        }
    }

    export class DocumentationCommentTriviaSyntax extends StructuredTriviaSyntax {
        private content: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_4695(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DocumentationCommentTriviaSyntax {
            super.ctor_1526(green, parent, position); return this;
        }

        public get Content(): SyntaxList<XmlNodeSyntax> {
            {
                var ref = { refObj: this.content };
                var result = new SyntaxList<XmlNodeSyntax>().ctor_6698(this.GetRed_2015(ref, 0));
                this.content = ref.refObj; return result;
            }
        }

        public get EndOfComment(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DocumentationCommentTriviaSyntax>this.Green).endOfComment, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.content };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.content = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.content;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDocumentationCommentTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDocumentationCommentTrivia(this);
        }

        public Update(content: SyntaxList<XmlNodeSyntax>, endOfComment: SyntaxToken): DocumentationCommentTriviaSyntax {
            if (content != this.Content || endOfComment != this.EndOfComment) {
                var newNode = SyntaxFactory.DocumentationCommentTrivia_1391(this.CSharpKind(), content, endOfComment);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithContent(content: SyntaxList<XmlNodeSyntax>): DocumentationCommentTriviaSyntax {
            return this.Update(content, this.EndOfComment);
        }

        public WithEndOfComment(endOfComment: SyntaxToken): DocumentationCommentTriviaSyntax {
            return this.Update(this.Content, endOfComment);
        }

        public AddContent(...items: XmlNodeSyntax[]): DocumentationCommentTriviaSyntax {
            return this.WithContent(this.Content.AddRange(items));
        }
    }

    export class CrefSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_7314(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CrefSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class TypeCrefSyntax extends CrefSyntax {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_9808(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): TypeCrefSyntax {
            super.ctor_7314(green, parent, position); return this;
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRedAtZero_2231(ref);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.type = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitTypeCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitTypeCref(this);
        }

        public Update(type: TypeSyntax): TypeCrefSyntax {
            if (type != this.Type) {
                var newNode = SyntaxFactory.TypeCref(type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithType(type: TypeSyntax): TypeCrefSyntax {
            return this.Update(type);
        }
    }

    export class QualifiedCrefSyntax extends CrefSyntax {
        private container: TypeSyntax;
        private member: MemberCrefSyntax;

        constructor() { super(); }
        ctor_9087(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): QualifiedCrefSyntax {
            super.ctor_7314(green, parent, position); return this;
        }

        public get Container(): TypeSyntax {
            {
                var ref = { refObj: this.container };
                var result = this.GetRedAtZero_2231(ref);
                this.container = ref.refObj; return result;
            }
        }

        public get DotToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.QualifiedCrefSyntax>this.Green).dotToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Member(): MemberCrefSyntax {
            {
                var ref = { refObj: this.member };
                var result = this.GetRed_2015(ref, 2);
                this.member = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.container };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.container = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.member };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.member = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.container;
                case 2: return this.member;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitQualifiedCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitQualifiedCref(this);
        }

        public Update(container: TypeSyntax, dotToken: SyntaxToken, member: MemberCrefSyntax): QualifiedCrefSyntax {
            if (container != this.Container || dotToken != this.DotToken || member != this.Member) {
                var newNode = SyntaxFactory.QualifiedCref_1689(container, dotToken, member);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithContainer(container: TypeSyntax): QualifiedCrefSyntax {
            return this.Update(container, this.DotToken, this.Member);
        }

        public WithDotToken(dotToken: SyntaxToken): QualifiedCrefSyntax {
            return this.Update(this.Container, dotToken, this.Member);
        }

        public WithMember(member: MemberCrefSyntax): QualifiedCrefSyntax {
            return this.Update(this.Container, this.DotToken, member);
        }
    }

    export class MemberCrefSyntax extends CrefSyntax {
        constructor() { super(); }
        ctor_1516(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): MemberCrefSyntax {
            super.ctor_7314(green, parent, position); return this;
        }
    }

    export class NameMemberCrefSyntax extends MemberCrefSyntax {
        private name: TypeSyntax;
        private parameters: CrefParameterListSyntax;

        constructor() { super(); }
        ctor_6585(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): NameMemberCrefSyntax {
            super.ctor_1516(green, parent, position); return this;
        }

        public get Name(): TypeSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get Parameters(): CrefParameterListSyntax {
            {
                var ref = { refObj: this.parameters };
                var result = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitNameMemberCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitNameMemberCref(this);
        }

        public Update(name: TypeSyntax, parameters: CrefParameterListSyntax): NameMemberCrefSyntax {
            if (name != this.Name || parameters != this.Parameters) {
                var newNode = SyntaxFactory.NameMemberCref_6133(name, parameters);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: TypeSyntax): NameMemberCrefSyntax {
            return this.Update(name, this.Parameters);
        }

        public WithParameters(parameters: CrefParameterListSyntax): NameMemberCrefSyntax {
            return this.Update(this.Name, parameters);
        }

        public AddParametersParameters(...items: CrefParameterSyntax[]): NameMemberCrefSyntax {
            var parameters = this.Parameters != null ? this.Parameters : SyntaxFactory.CrefParameterList_1621();
            return this.WithParameters(parameters.WithParameters(parameters.Parameters.AddRange(items)));
        }
    }

    export class IndexerMemberCrefSyntax extends MemberCrefSyntax {
        private parameters: CrefBracketedParameterListSyntax;

        constructor() { super(); }
        ctor_1598(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IndexerMemberCrefSyntax {
            super.ctor_1516(green, parent, position); return this;
        }

        public get ThisKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IndexerMemberCrefSyntax>this.Green).thisKeyword, this.Position, 0); }
        }

        public get Parameters(): CrefBracketedParameterListSyntax {
            {
                var ref = { refObj: this.parameters };
                var result = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIndexerMemberCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIndexerMemberCref(this);
        }

        public Update(thisKeyword: SyntaxToken, parameters: CrefBracketedParameterListSyntax): IndexerMemberCrefSyntax {
            if (thisKeyword != this.ThisKeyword || parameters != this.Parameters) {
                var newNode = SyntaxFactory.IndexerMemberCref_1919(thisKeyword, parameters);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithThisKeyword(thisKeyword: SyntaxToken): IndexerMemberCrefSyntax {
            return this.Update(thisKeyword, this.Parameters);
        }

        public WithParameters(parameters: CrefBracketedParameterListSyntax): IndexerMemberCrefSyntax {
            return this.Update(this.ThisKeyword, parameters);
        }

        public AddParametersParameters(...items: CrefParameterSyntax[]): IndexerMemberCrefSyntax {
            var parameters = this.Parameters != null ? this.Parameters : SyntaxFactory.CrefBracketedParameterList_1239();
            return this.WithParameters(parameters.WithParameters(parameters.Parameters.AddRange(items)));
        }
    }

    export class OperatorMemberCrefSyntax extends MemberCrefSyntax {
        private parameters: CrefParameterListSyntax;

        constructor() { super(); }
        ctor_1011(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): OperatorMemberCrefSyntax {
            super.ctor_1516(green, parent, position); return this;
        }

        public get OperatorKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OperatorMemberCrefSyntax>this.Green).operatorKeyword, this.Position, 0); }
        }

        public get OperatorToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.OperatorMemberCrefSyntax>this.Green).operatorToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Parameters(): CrefParameterListSyntax {
            {
                var ref = { refObj: this.parameters };
                var result = this.GetRed_2015(ref, 2);
                this.parameters = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.parameters = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitOperatorMemberCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitOperatorMemberCref(this);
        }

        public Update(operatorKeyword: SyntaxToken, operatorToken: SyntaxToken, parameters: CrefParameterListSyntax): OperatorMemberCrefSyntax {
            if (operatorKeyword != this.OperatorKeyword || operatorToken != this.OperatorToken || parameters != this.Parameters) {
                var newNode = SyntaxFactory.OperatorMemberCref_8861(operatorKeyword, operatorToken, parameters);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOperatorKeyword(operatorKeyword: SyntaxToken): OperatorMemberCrefSyntax {
            return this.Update(operatorKeyword, this.OperatorToken, this.Parameters);
        }

        public WithOperatorToken(operatorToken: SyntaxToken): OperatorMemberCrefSyntax {
            return this.Update(this.OperatorKeyword, operatorToken, this.Parameters);
        }

        public WithParameters(parameters: CrefParameterListSyntax): OperatorMemberCrefSyntax {
            return this.Update(this.OperatorKeyword, this.OperatorToken, parameters);
        }

        public AddParametersParameters(...items: CrefParameterSyntax[]): OperatorMemberCrefSyntax {
            var parameters = this.Parameters != null ? this.Parameters : SyntaxFactory.CrefParameterList_1621();
            return this.WithParameters(parameters.WithParameters(parameters.Parameters.AddRange(items)));
        }
    }

    export class ConversionOperatorMemberCrefSyntax extends MemberCrefSyntax {
        private type: TypeSyntax;
        private parameters: CrefParameterListSyntax;

        constructor() { super(); }
        ctor_1441(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConversionOperatorMemberCrefSyntax {
            super.ctor_1516(green, parent, position); return this;
        }

        public get ImplicitOrExplicitKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConversionOperatorMemberCrefSyntax>this.Green).implicitOrExplicitKeyword, this.Position, 0); }
        }

        public get OperatorKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ConversionOperatorMemberCrefSyntax>this.Green).operatorKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 2);
                this.type = ref.refObj; return result;
            }
        }

        public get Parameters(): CrefParameterListSyntax {
            {
                var ref = { refObj: this.parameters };
                var result = this.GetRed_2015(ref, 3);
                this.parameters = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.type = ref2.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.parameters = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.type;
                case 3: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitConversionOperatorMemberCref(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitConversionOperatorMemberCref(this);
        }

        public Update(implicitOrExplicitKeyword: SyntaxToken, operatorKeyword: SyntaxToken, type: TypeSyntax, parameters: CrefParameterListSyntax): ConversionOperatorMemberCrefSyntax {
            if (implicitOrExplicitKeyword != this.ImplicitOrExplicitKeyword || operatorKeyword != this.OperatorKeyword || type != this.Type || parameters != this.Parameters) {
                var newNode = SyntaxFactory.ConversionOperatorMemberCref_9661(implicitOrExplicitKeyword, operatorKeyword, type, parameters);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithImplicitOrExplicitKeyword(implicitOrExplicitKeyword: SyntaxToken): ConversionOperatorMemberCrefSyntax {
            return this.Update(implicitOrExplicitKeyword, this.OperatorKeyword, this.Type, this.Parameters);
        }

        public WithOperatorKeyword(operatorKeyword: SyntaxToken): ConversionOperatorMemberCrefSyntax {
            return this.Update(this.ImplicitOrExplicitKeyword, operatorKeyword, this.Type, this.Parameters);
        }

        public WithType(type: TypeSyntax): ConversionOperatorMemberCrefSyntax {
            return this.Update(this.ImplicitOrExplicitKeyword, this.OperatorKeyword, type, this.Parameters);
        }

        public WithParameters(parameters: CrefParameterListSyntax): ConversionOperatorMemberCrefSyntax {
            return this.Update(this.ImplicitOrExplicitKeyword, this.OperatorKeyword, this.Type, parameters);
        }

        public AddParametersParameters(...items: CrefParameterSyntax[]): ConversionOperatorMemberCrefSyntax {
            var parameters = this.Parameters != null ? this.Parameters : SyntaxFactory.CrefParameterList_1621();
            return this.WithParameters(parameters.WithParameters(parameters.Parameters.AddRange(items)));
        }
    }

    export class BaseCrefParameterListSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_9114(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BaseCrefParameterListSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Parameters(): SeparatedSyntaxList<CrefParameterSyntax> { throw new Error(); }
    }

    export class CrefParameterListSyntax extends BaseCrefParameterListSyntax {
        private parameters: SyntaxNode;

        constructor() { super(); }
        ctor_1513(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CrefParameterListSyntax {
            super.ctor_9114(green, parent, position); return this;
        }

        public get OpenParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterListSyntax>this.Green).openParenToken, this.Position, 0); }
        }

        public get Parameters(): SeparatedSyntaxList<CrefParameterSyntax> {
            {
                var ref = { refObj: this.parameters };
                var red = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<CrefParameterSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseParenToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterListSyntax>this.Green).closeParenToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCrefParameterList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCrefParameterList(this);
        }

        public Update(openParenToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeParenToken: SyntaxToken): CrefParameterListSyntax {
            if (openParenToken != this.OpenParenToken || parameters != this.Parameters || closeParenToken != this.CloseParenToken) {
                var newNode = SyntaxFactory.CrefParameterList_1308(openParenToken, parameters, closeParenToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenParenToken(openParenToken: SyntaxToken): CrefParameterListSyntax {
            return this.Update(openParenToken, this.Parameters, this.CloseParenToken);
        }

        public WithParameters(parameters: SeparatedSyntaxList<CrefParameterSyntax>): CrefParameterListSyntax {
            return this.Update(this.OpenParenToken, parameters, this.CloseParenToken);
        }

        public WithCloseParenToken(closeParenToken: SyntaxToken): CrefParameterListSyntax {
            return this.Update(this.OpenParenToken, this.Parameters, closeParenToken);
        }

        public AddParameters(...items: CrefParameterSyntax[]): CrefParameterListSyntax {
            return this.WithParameters(this.Parameters.AddRange(items));
        }
    }

    export class CrefBracketedParameterListSyntax extends BaseCrefParameterListSyntax {
        private parameters: SyntaxNode;

        constructor() { super(); }
        ctor_9776(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CrefBracketedParameterListSyntax {
            super.ctor_9114(green, parent, position); return this;
        }

        public get OpenBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefBracketedParameterListSyntax>this.Green).openBracketToken, this.Position, 0); }
        }

        public get Parameters(): SeparatedSyntaxList<CrefParameterSyntax> {
            {
                var ref = { refObj: this.parameters };
                var red = this.GetRed_2015(ref, 1);
                this.parameters = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<CrefParameterSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get CloseBracketToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefBracketedParameterListSyntax>this.Green).closeBracketToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.parameters };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.parameters = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.parameters;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCrefBracketedParameterList(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCrefBracketedParameterList(this);
        }

        public Update(openBracketToken: SyntaxToken, parameters: SeparatedSyntaxList<CrefParameterSyntax>, closeBracketToken: SyntaxToken): CrefBracketedParameterListSyntax {
            if (openBracketToken != this.OpenBracketToken || parameters != this.Parameters || closeBracketToken != this.CloseBracketToken) {
                var newNode = SyntaxFactory.CrefBracketedParameterList_1976(openBracketToken, parameters, closeBracketToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithOpenBracketToken(openBracketToken: SyntaxToken): CrefBracketedParameterListSyntax {
            return this.Update(openBracketToken, this.Parameters, this.CloseBracketToken);
        }

        public WithParameters(parameters: SeparatedSyntaxList<CrefParameterSyntax>): CrefBracketedParameterListSyntax {
            return this.Update(this.OpenBracketToken, parameters, this.CloseBracketToken);
        }

        public WithCloseBracketToken(closeBracketToken: SyntaxToken): CrefBracketedParameterListSyntax {
            return this.Update(this.OpenBracketToken, this.Parameters, closeBracketToken);
        }

        public AddParameters(...items: CrefParameterSyntax[]): CrefBracketedParameterListSyntax {
            return this.WithParameters(this.Parameters.AddRange(items));
        }
    }

    export class CrefParameterSyntax extends CSharpSyntaxNode {
        private type: TypeSyntax;

        constructor() { super(); }
        ctor_1978(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): CrefParameterSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get RefOrOutKeyword(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CrefParameterSyntax>this.Green).refOrOutKeyword;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.Position, 0);

                return structDefault(SyntaxToken);
            }
        }

        public get Type(): TypeSyntax {
            {
                var ref = { refObj: this.type };
                var result = this.GetRed_2015(ref, 1);
                this.type = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.type };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.type = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.type;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitCrefParameter(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitCrefParameter(this);
        }

        public Update(refOrOutKeyword: SyntaxToken, type: TypeSyntax): CrefParameterSyntax {
            if (refOrOutKeyword != this.RefOrOutKeyword || type != this.Type) {
                var newNode = SyntaxFactory.CrefParameter_1799(refOrOutKeyword, type);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithRefOrOutKeyword(refOrOutKeyword: SyntaxToken): CrefParameterSyntax {
            return this.Update(refOrOutKeyword, this.Type);
        }

        public WithType(type: TypeSyntax): CrefParameterSyntax {
            return this.Update(this.RefOrOutKeyword, type);
        }
    }

    export class XmlNodeSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1957(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlNodeSyntax {
            super.ctor_6242(green, parent, position); return this;
        }
    }

    export class XmlElementSyntax extends XmlNodeSyntax {
        private startTag: XmlElementStartTagSyntax;
        private content: CSharpSyntaxNode;
        private endTag: XmlElementEndTagSyntax;

        constructor() { super(); }
        ctor_3794(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlElementSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get StartTag(): XmlElementStartTagSyntax {
            {
                var ref = { refObj: this.startTag };
                var result = this.GetRedAtZero_2231(ref);
                this.startTag = ref.refObj; return result;
            }
        }

        public get Content(): SyntaxList<XmlNodeSyntax> {
            {
                var ref = { refObj: this.content };
                var result = new SyntaxList<XmlNodeSyntax>().ctor_6698(this.GetRed_2015(ref, 1));
                this.content = ref.refObj; return result;
            }
        }

        public get EndTag(): XmlElementEndTagSyntax {
            {
                var ref = { refObj: this.endTag };
                var result = this.GetRed_2015(ref, 2);
                this.endTag = ref.refObj; return result;
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.startTag };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.startTag = ref0.refObj; return result;
                case 1:
                    var ref1 = { refObj: this.content };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.content = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.endTag };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.endTag = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.startTag;
                case 1: return this.content;
                case 2: return this.endTag;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlElement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlElement(this);
        }

        public Update(startTag: XmlElementStartTagSyntax, content: SyntaxList<XmlNodeSyntax>, endTag: XmlElementEndTagSyntax): XmlElementSyntax {
            if (startTag != this.StartTag || content != this.Content || endTag != this.EndTag) {
                var newNode = SyntaxFactory.XmlElement_1306(startTag, content, endTag);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStartTag(startTag: XmlElementStartTagSyntax): XmlElementSyntax {
            return this.Update(startTag, this.Content, this.EndTag);
        }

        public WithContent(content: SyntaxList<XmlNodeSyntax>): XmlElementSyntax {
            return this.Update(this.StartTag, content, this.EndTag);
        }

        public WithEndTag(endTag: XmlElementEndTagSyntax): XmlElementSyntax {
            return this.Update(this.StartTag, this.Content, endTag);
        }

        public AddStartTagAttributes(...items: XmlAttributeSyntax[]): XmlElementSyntax {
            return this.WithStartTag(this.StartTag.WithAttributes(this.StartTag.Attributes.AddRange(items)));
        }

        public AddContent(...items: XmlNodeSyntax[]): XmlElementSyntax {
            return this.WithContent(this.Content.AddRange(items));
        }
    }

    export class XmlElementStartTagSyntax extends CSharpSyntaxNode {
        private name: XmlNameSyntax;
        private attributes: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_1010(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlElementStartTagSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get LessThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementStartTagSyntax>this.Green).lessThanToken, this.Position, 0); }
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get Attributes(): SyntaxList<XmlAttributeSyntax> {
            {
                var ref = { refObj: this.attributes };
                var result = new SyntaxList<XmlAttributeSyntax>().ctor_6698(this.GetRed_2015(ref, 2));
                this.attributes = ref.refObj; return result;
            }
        }

        public get GreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementStartTagSyntax>this.Green).greaterThanToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.attributes };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.attributes = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                case 2: return this.attributes;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlElementStartTag(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlElementStartTag(this);
        }

        public Update(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, greaterThanToken: SyntaxToken): XmlElementStartTagSyntax {
            if (lessThanToken != this.LessThanToken || name != this.Name || attributes != this.Attributes || greaterThanToken != this.GreaterThanToken) {
                var newNode = SyntaxFactory.XmlElementStartTag_2520(lessThanToken, name, attributes, greaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanToken(lessThanToken: SyntaxToken): XmlElementStartTagSyntax {
            return this.Update(lessThanToken, this.Name, this.Attributes, this.GreaterThanToken);
        }

        public WithName(name: XmlNameSyntax): XmlElementStartTagSyntax {
            return this.Update(this.LessThanToken, name, this.Attributes, this.GreaterThanToken);
        }

        public WithAttributes(attributes: SyntaxList<XmlAttributeSyntax>): XmlElementStartTagSyntax {
            return this.Update(this.LessThanToken, this.Name, attributes, this.GreaterThanToken);
        }

        public WithGreaterThanToken(greaterThanToken: SyntaxToken): XmlElementStartTagSyntax {
            return this.Update(this.LessThanToken, this.Name, this.Attributes, greaterThanToken);
        }

        public AddAttributes(...items: XmlAttributeSyntax[]): XmlElementStartTagSyntax {
            return this.WithAttributes(this.Attributes.AddRange(items));
        }
    }

    export class XmlElementEndTagSyntax extends CSharpSyntaxNode {
        private name: XmlNameSyntax;

        constructor() { super(); }
        ctor_7385(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlElementEndTagSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get LessThanSlashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementEndTagSyntax>this.Green).lessThanSlashToken, this.Position, 0); }
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get GreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlElementEndTagSyntax>this.Green).greaterThanToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlElementEndTag(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlElementEndTag(this);
        }

        public Update(lessThanSlashToken: SyntaxToken, name: XmlNameSyntax, greaterThanToken: SyntaxToken): XmlElementEndTagSyntax {
            if (lessThanSlashToken != this.LessThanSlashToken || name != this.Name || greaterThanToken != this.GreaterThanToken) {
                var newNode = SyntaxFactory.XmlElementEndTag_1148(lessThanSlashToken, name, greaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanSlashToken(lessThanSlashToken: SyntaxToken): XmlElementEndTagSyntax {
            return this.Update(lessThanSlashToken, this.Name, this.GreaterThanToken);
        }

        public WithName(name: XmlNameSyntax): XmlElementEndTagSyntax {
            return this.Update(this.LessThanSlashToken, name, this.GreaterThanToken);
        }

        public WithGreaterThanToken(greaterThanToken: SyntaxToken): XmlElementEndTagSyntax {
            return this.Update(this.LessThanSlashToken, this.Name, greaterThanToken);
        }
    }

    export class XmlEmptyElementSyntax extends XmlNodeSyntax {
        private name: XmlNameSyntax;
        private attributes: CSharpSyntaxNode;

        constructor() { super(); }
        ctor_8541(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlEmptyElementSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get LessThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlEmptyElementSyntax>this.Green).lessThanToken, this.Position, 0); }
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get Attributes(): SyntaxList<XmlAttributeSyntax> {
            {
                var ref = { refObj: this.attributes };
                var result = new SyntaxList<XmlAttributeSyntax>().ctor_6698(this.GetRed_2015(ref, 2));
                this.attributes = ref.refObj; return result;
            }
        }

        public get SlashGreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlEmptyElementSyntax>this.Green).slashGreaterThanToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.attributes };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.attributes = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                case 2: return this.attributes;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlEmptyElement(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlEmptyElement(this);
        }

        public Update(lessThanToken: SyntaxToken, name: XmlNameSyntax, attributes: SyntaxList<XmlAttributeSyntax>, slashGreaterThanToken: SyntaxToken): XmlEmptyElementSyntax {
            if (lessThanToken != this.LessThanToken || name != this.Name || attributes != this.Attributes || slashGreaterThanToken != this.SlashGreaterThanToken) {
                var newNode = SyntaxFactory.XmlEmptyElement_1077(lessThanToken, name, attributes, slashGreaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanToken(lessThanToken: SyntaxToken): XmlEmptyElementSyntax {
            return this.Update(lessThanToken, this.Name, this.Attributes, this.SlashGreaterThanToken);
        }

        public WithName(name: XmlNameSyntax): XmlEmptyElementSyntax {
            return this.Update(this.LessThanToken, name, this.Attributes, this.SlashGreaterThanToken);
        }

        public WithAttributes(attributes: SyntaxList<XmlAttributeSyntax>): XmlEmptyElementSyntax {
            return this.Update(this.LessThanToken, this.Name, attributes, this.SlashGreaterThanToken);
        }

        public WithSlashGreaterThanToken(slashGreaterThanToken: SyntaxToken): XmlEmptyElementSyntax {
            return this.Update(this.LessThanToken, this.Name, this.Attributes, slashGreaterThanToken);
        }

        public AddAttributes(...items: XmlAttributeSyntax[]): XmlEmptyElementSyntax {
            return this.WithAttributes(this.Attributes.AddRange(items));
        }
    }

    export class XmlNameSyntax extends CSharpSyntaxNode {
        private prefix: XmlPrefixSyntax;

        constructor() { super(); }
        ctor_3909(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlNameSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Prefix(): XmlPrefixSyntax {
            {
                var ref = { refObj: this.prefix };
                var result = this.GetRedAtZero_2231(ref);
                this.prefix = ref.refObj; return result;
            }
        }

        public get LocalName(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameSyntax>this.Green).localName, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.prefix };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.prefix = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.prefix;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlName(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlName(this);
        }

        public Update(prefix: XmlPrefixSyntax, localName: SyntaxToken): XmlNameSyntax {
            if (prefix != this.Prefix || localName != this.LocalName) {
                var newNode = SyntaxFactory.XmlName_7035(prefix, localName);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithPrefix(prefix: XmlPrefixSyntax): XmlNameSyntax {
            return this.Update(prefix, this.LocalName);
        }

        public WithLocalName(localName: SyntaxToken): XmlNameSyntax {
            return this.Update(this.Prefix, localName);
        }
    }

    export class XmlPrefixSyntax extends CSharpSyntaxNode {

        constructor() { super(); }
        ctor_2531(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlPrefixSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Prefix(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlPrefixSyntax>this.Green).prefix, this.Position, 0); }
        }

        public get ColonToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlPrefixSyntax>this.Green).colonToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlPrefix(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlPrefix(this);
        }

        public Update(prefix: SyntaxToken, colonToken: SyntaxToken): XmlPrefixSyntax {
            if (prefix != this.Prefix || colonToken != this.ColonToken) {
                var newNode = SyntaxFactory.XmlPrefix_3737(prefix, colonToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithPrefix(prefix: SyntaxToken): XmlPrefixSyntax {
            return this.Update(prefix, this.ColonToken);
        }

        public WithColonToken(colonToken: SyntaxToken): XmlPrefixSyntax {
            return this.Update(this.Prefix, colonToken);
        }
    }

    export class XmlAttributeSyntax extends CSharpSyntaxNode {
        constructor() { super(); }
        ctor_1306(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlAttributeSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Name(): XmlNameSyntax { throw new Error(); }

        public get EqualsToken(): SyntaxToken { throw new Error(); }

        public get StartQuoteToken(): SyntaxToken { throw new Error(); }

        public get EndQuoteToken(): SyntaxToken { throw new Error(); }
    }

    export class XmlTextAttributeSyntax extends XmlAttributeSyntax {
        private name: XmlNameSyntax;

        constructor() { super(); }
        ctor_1853(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlTextAttributeSyntax {
            super.ctor_1306(green, parent, position); return this;
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlTextAttributeSyntax>this.Green).equalsToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get StartQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlTextAttributeSyntax>this.Green).startQuoteToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get TextTokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(3);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(3), this.GetChildIndex(3));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EndQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlTextAttributeSyntax>this.Green).endQuoteToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlTextAttribute(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlTextAttribute(this);
        }

        public Update(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, textTokens: SyntaxTokenList, endQuoteToken: SyntaxToken): XmlTextAttributeSyntax {
            if (name != this.Name || equalsToken != this.EqualsToken || startQuoteToken != this.StartQuoteToken || textTokens != this.TextTokens || endQuoteToken != this.EndQuoteToken) {
                var newNode = SyntaxFactory.XmlTextAttribute_1252(name, equalsToken, startQuoteToken, textTokens, endQuoteToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: XmlNameSyntax): XmlTextAttributeSyntax {
            return this.Update(name, this.EqualsToken, this.StartQuoteToken, this.TextTokens, this.EndQuoteToken);
        }

        public WithEqualsToken(equalsToken: SyntaxToken): XmlTextAttributeSyntax {
            return this.Update(this.Name, equalsToken, this.StartQuoteToken, this.TextTokens, this.EndQuoteToken);
        }

        public WithStartQuoteToken(startQuoteToken: SyntaxToken): XmlTextAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, startQuoteToken, this.TextTokens, this.EndQuoteToken);
        }

        public WithTextTokens(textTokens: SyntaxTokenList): XmlTextAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, textTokens, this.EndQuoteToken);
        }

        public WithEndQuoteToken(endQuoteToken: SyntaxToken): XmlTextAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, this.TextTokens, endQuoteToken);
        }

        public AddTextTokens(...items: SyntaxToken[]): XmlTextAttributeSyntax {
            return this.WithTextTokens(this.TextTokens.AddRange(items));
        }
    }

    export class XmlCrefAttributeSyntax extends XmlAttributeSyntax {
        private name: XmlNameSyntax;
        private cref: CrefSyntax;

        constructor() { super(); }
        ctor_1305(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlCrefAttributeSyntax {
            super.ctor_1306(green, parent, position); return this;
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCrefAttributeSyntax>this.Green).equalsToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get StartQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCrefAttributeSyntax>this.Green).startQuoteToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Cref(): CrefSyntax {
            {
                var ref = { refObj: this.cref };
                var result = this.GetRed_2015(ref, 3);
                this.cref = ref.refObj; return result;
            }
        }

        public get EndQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCrefAttributeSyntax>this.Green).endQuoteToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.cref };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.cref = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                case 3: return this.cref;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlCrefAttribute(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlCrefAttribute(this);
        }

        public Update(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, cref: CrefSyntax, endQuoteToken: SyntaxToken): XmlCrefAttributeSyntax {
            if (name != this.Name || equalsToken != this.EqualsToken || startQuoteToken != this.StartQuoteToken || cref != this.Cref || endQuoteToken != this.EndQuoteToken) {
                var newNode = SyntaxFactory.XmlCrefAttribute_1157(name, equalsToken, startQuoteToken, cref, endQuoteToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: XmlNameSyntax): XmlCrefAttributeSyntax {
            return this.Update(name, this.EqualsToken, this.StartQuoteToken, this.Cref, this.EndQuoteToken);
        }

        public WithEqualsToken(equalsToken: SyntaxToken): XmlCrefAttributeSyntax {
            return this.Update(this.Name, equalsToken, this.StartQuoteToken, this.Cref, this.EndQuoteToken);
        }

        public WithStartQuoteToken(startQuoteToken: SyntaxToken): XmlCrefAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, startQuoteToken, this.Cref, this.EndQuoteToken);
        }

        public WithCref(cref: CrefSyntax): XmlCrefAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, cref, this.EndQuoteToken);
        }

        public WithEndQuoteToken(endQuoteToken: SyntaxToken): XmlCrefAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, this.Cref, endQuoteToken);
        }
    }

    export class XmlNameAttributeSyntax extends XmlAttributeSyntax {
        private name: XmlNameSyntax;
        private identifier: IdentifierNameSyntax;

        constructor() { super(); }
        ctor_1624(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlNameAttributeSyntax {
            super.ctor_1306(green, parent, position); return this;
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRedAtZero_2231(ref);
                this.name = ref.refObj; return result;
            }
        }

        public get EqualsToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameAttributeSyntax>this.Green).equalsToken, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get StartQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameAttributeSyntax>this.Green).startQuoteToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get Identifier(): IdentifierNameSyntax {
            {
                var ref = { refObj: this.identifier };
                var result = this.GetRed_2015(ref, 3);
                this.identifier = ref.refObj; return result;
            }
        }

        public get EndQuoteToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlNameAttributeSyntax>this.Green).endQuoteToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.name = ref0.refObj; return result;
                case 3:
                    var ref3 = { refObj: this.identifier };
                    var result: SyntaxNode = this.GetRed_2015(ref3, 3);
                    this.identifier = ref3.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.name;
                case 3: return this.identifier;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlNameAttribute(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlNameAttribute(this);
        }

        public Update(name: XmlNameSyntax, equalsToken: SyntaxToken, startQuoteToken: SyntaxToken, identifier: IdentifierNameSyntax, endQuoteToken: SyntaxToken): XmlNameAttributeSyntax {
            if (name != this.Name || equalsToken != this.EqualsToken || startQuoteToken != this.StartQuoteToken || identifier != this.Identifier || endQuoteToken != this.EndQuoteToken) {
                var newNode = SyntaxFactory.XmlNameAttribute_3328(name, equalsToken, startQuoteToken, identifier, endQuoteToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithName(name: XmlNameSyntax): XmlNameAttributeSyntax {
            return this.Update(name, this.EqualsToken, this.StartQuoteToken, this.Identifier, this.EndQuoteToken);
        }

        public WithEqualsToken(equalsToken: SyntaxToken): XmlNameAttributeSyntax {
            return this.Update(this.Name, equalsToken, this.StartQuoteToken, this.Identifier, this.EndQuoteToken);
        }

        public WithStartQuoteToken(startQuoteToken: SyntaxToken): XmlNameAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, startQuoteToken, this.Identifier, this.EndQuoteToken);
        }

        public WithIdentifier(identifier: IdentifierNameSyntax): XmlNameAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, identifier, this.EndQuoteToken);
        }

        public WithEndQuoteToken(endQuoteToken: SyntaxToken): XmlNameAttributeSyntax {
            return this.Update(this.Name, this.EqualsToken, this.StartQuoteToken, this.Identifier, endQuoteToken);
        }
    }

    export class XmlTextSyntax extends XmlNodeSyntax {

        constructor() { super(); }
        ctor_1447(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlTextSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get TextTokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(0);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.Position, 0);

                return structDefault(SyntaxTokenList);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlText(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlText(this);
        }

        public Update(textTokens: SyntaxTokenList): XmlTextSyntax {
            if (textTokens != this.TextTokens) {
                var newNode = SyntaxFactory.XmlText_7478(textTokens);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithTextTokens(textTokens: SyntaxTokenList): XmlTextSyntax {
            return this.Update(textTokens);
        }

        public AddTextTokens(...items: SyntaxToken[]): XmlTextSyntax {
            return this.WithTextTokens(this.TextTokens.AddRange(items));
        }
    }

    export class XmlCDataSectionSyntax extends XmlNodeSyntax {

        constructor() { super(); }
        ctor_5139(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlCDataSectionSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get StartCDataToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCDataSectionSyntax>this.Green).startCDataToken, this.Position, 0); }
        }

        public get TextTokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EndCDataToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCDataSectionSyntax>this.Green).endCDataToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlCDataSection(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlCDataSection(this);
        }

        public Update(startCDataToken: SyntaxToken, textTokens: SyntaxTokenList, endCDataToken: SyntaxToken): XmlCDataSectionSyntax {
            if (startCDataToken != this.StartCDataToken || textTokens != this.TextTokens || endCDataToken != this.EndCDataToken) {
                var newNode = SyntaxFactory.XmlCDataSection_1269(startCDataToken, textTokens, endCDataToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStartCDataToken(startCDataToken: SyntaxToken): XmlCDataSectionSyntax {
            return this.Update(startCDataToken, this.TextTokens, this.EndCDataToken);
        }

        public WithTextTokens(textTokens: SyntaxTokenList): XmlCDataSectionSyntax {
            return this.Update(this.StartCDataToken, textTokens, this.EndCDataToken);
        }

        public WithEndCDataToken(endCDataToken: SyntaxToken): XmlCDataSectionSyntax {
            return this.Update(this.StartCDataToken, this.TextTokens, endCDataToken);
        }

        public AddTextTokens(...items: SyntaxToken[]): XmlCDataSectionSyntax {
            return this.WithTextTokens(this.TextTokens.AddRange(items));
        }
    }

    export class XmlProcessingInstructionSyntax extends XmlNodeSyntax {
        private name: XmlNameSyntax;

        constructor() { super(); }
        ctor_3449(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlProcessingInstructionSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get StartProcessingInstructionToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlProcessingInstructionSyntax>this.Green).startProcessingInstructionToken, this.Position, 0); }
        }

        public get Name(): XmlNameSyntax {
            {
                var ref = { refObj: this.name };
                var result = this.GetRed_2015(ref, 1);
                this.name = ref.refObj; return result;
            }
        }

        public get TextTokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(2);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(2), this.GetChildIndex(2));

                return structDefault(SyntaxTokenList);
            }
        }

        public get EndProcessingInstructionToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlProcessingInstructionSyntax>this.Green).endProcessingInstructionToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.name };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.name = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.name;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlProcessingInstruction(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlProcessingInstruction(this);
        }

        public Update(startProcessingInstructionToken: SyntaxToken, name: XmlNameSyntax, textTokens: SyntaxTokenList, endProcessingInstructionToken: SyntaxToken): XmlProcessingInstructionSyntax {
            if (startProcessingInstructionToken != this.StartProcessingInstructionToken || name != this.Name || textTokens != this.TextTokens || endProcessingInstructionToken != this.EndProcessingInstructionToken) {
                var newNode = SyntaxFactory.XmlProcessingInstruction_6003(startProcessingInstructionToken, name, textTokens, endProcessingInstructionToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStartProcessingInstructionToken(startProcessingInstructionToken: SyntaxToken): XmlProcessingInstructionSyntax {
            return this.Update(startProcessingInstructionToken, this.Name, this.TextTokens, this.EndProcessingInstructionToken);
        }

        public WithName(name: XmlNameSyntax): XmlProcessingInstructionSyntax {
            return this.Update(this.StartProcessingInstructionToken, name, this.TextTokens, this.EndProcessingInstructionToken);
        }

        public WithTextTokens(textTokens: SyntaxTokenList): XmlProcessingInstructionSyntax {
            return this.Update(this.StartProcessingInstructionToken, this.Name, textTokens, this.EndProcessingInstructionToken);
        }

        public WithEndProcessingInstructionToken(endProcessingInstructionToken: SyntaxToken): XmlProcessingInstructionSyntax {
            return this.Update(this.StartProcessingInstructionToken, this.Name, this.TextTokens, endProcessingInstructionToken);
        }

        public AddTextTokens(...items: SyntaxToken[]): XmlProcessingInstructionSyntax {
            return this.WithTextTokens(this.TextTokens.AddRange(items));
        }
    }

    export class XmlCommentSyntax extends XmlNodeSyntax {

        constructor() { super(); }
        ctor_1807(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): XmlCommentSyntax {
            super.ctor_1957(green, parent, position); return this;
        }

        public get LessThanExclamationMinusMinusToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCommentSyntax>this.Green).lessThanExclamationMinusMinusToken, this.Position, 0); }
        }

        public get TextTokens(): SyntaxTokenList {
            {
                var slot = this.Green.GetSlot(1);
                if (slot != null)
                    return new SyntaxTokenList().ctor_9846(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxTokenList);
            }
        }

        public get MinusMinusGreaterThanToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.XmlCommentSyntax>this.Green).minusMinusGreaterThanToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitXmlComment(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitXmlComment(this);
        }

        public Update(lessThanExclamationMinusMinusToken: SyntaxToken, textTokens: SyntaxTokenList, minusMinusGreaterThanToken: SyntaxToken): XmlCommentSyntax {
            if (lessThanExclamationMinusMinusToken != this.LessThanExclamationMinusMinusToken || textTokens != this.TextTokens || minusMinusGreaterThanToken != this.MinusMinusGreaterThanToken) {
                var newNode = SyntaxFactory.XmlComment_1987(lessThanExclamationMinusMinusToken, textTokens, minusMinusGreaterThanToken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithLessThanExclamationMinusMinusToken(lessThanExclamationMinusMinusToken: SyntaxToken): XmlCommentSyntax {
            return this.Update(lessThanExclamationMinusMinusToken, this.TextTokens, this.MinusMinusGreaterThanToken);
        }

        public WithTextTokens(textTokens: SyntaxTokenList): XmlCommentSyntax {
            return this.Update(this.LessThanExclamationMinusMinusToken, textTokens, this.MinusMinusGreaterThanToken);
        }

        public WithMinusMinusGreaterThanToken(minusMinusGreaterThanToken: SyntaxToken): XmlCommentSyntax {
            return this.Update(this.LessThanExclamationMinusMinusToken, this.TextTokens, minusMinusGreaterThanToken);
        }

        public AddTextTokens(...items: SyntaxToken[]): XmlCommentSyntax {
            return this.WithTextTokens(this.TextTokens.AddRange(items));
        }
    }

    export class BranchingDirectiveTriviaSyntax extends DirectiveTriviaSyntax {
        constructor() { super(); }
        ctor_4303(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BranchingDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get BranchTaken(): boolean { throw new Error(); }
    }

    export class ConditionalDirectiveTriviaSyntax extends BranchingDirectiveTriviaSyntax {
        constructor() { super(); }
        ctor_1842(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ConditionalDirectiveTriviaSyntax {
            super.ctor_4303(green, parent, position); return this;
        }

        public get Condition(): ExpressionSyntax { throw new Error(); }

        public get ConditionValue(): boolean { throw new Error(); }
    }

    export class IfDirectiveTriviaSyntax extends ConditionalDirectiveTriviaSyntax {
        private condition: ExpressionSyntax;

        constructor() { super(); }
        ctor_1844(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): IfDirectiveTriviaSyntax {
            super.ctor_1842(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get IfKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).ifKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 2);
                this.condition = ref.refObj; return result;
            }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).IsActive; }

        public get BranchTaken(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).BranchTaken; }

        public get ConditionValue(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.IfDirectiveTriviaSyntax>this.Green).ConditionValue; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.condition = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.condition;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitIfDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitIfDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, ifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): IfDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || ifKeyword != this.IfKeyword || condition != this.Condition || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.IfDirectiveTrivia_3004(hashToken, ifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): IfDirectiveTriviaSyntax {
            return this.Update(hashToken, this.IfKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithIfKeyword(ifKeyword: SyntaxToken): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, ifKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithCondition(condition: ExpressionSyntax): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.IfKeyword, condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.IfKeyword, this.Condition, endOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithIsActive(isActive: boolean): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.IfKeyword, this.Condition, this.EndOfDirectiveToken, isActive, this.BranchTaken, this.ConditionValue);
        }

        public WithBranchTaken(branchTaken: boolean): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.IfKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, branchTaken, this.ConditionValue);
        }

        public WithConditionValue(conditionValue: boolean): IfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.IfKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, conditionValue);
        }
    }

    export class ElifDirectiveTriviaSyntax extends ConditionalDirectiveTriviaSyntax {
        private condition: ExpressionSyntax;

        constructor() { super(); }
        ctor_1977(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ElifDirectiveTriviaSyntax {
            super.ctor_1842(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get ElifKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).elifKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Condition(): ExpressionSyntax {
            {
                var ref = { refObj: this.condition };
                var result = this.GetRed_2015(ref, 2);
                this.condition = ref.refObj; return result;
            }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).IsActive; }

        public get BranchTaken(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).BranchTaken; }

        public get ConditionValue(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElifDirectiveTriviaSyntax>this.Green).ConditionValue; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 2:
                    var ref2 = { refObj: this.condition };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.condition = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 2: return this.condition;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitElifDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitElifDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, elifKeyword: SyntaxToken, condition: ExpressionSyntax, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean, conditionValue: boolean): ElifDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || elifKeyword != this.ElifKeyword || condition != this.Condition || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.ElifDirectiveTrivia_1767(hashToken, elifKeyword, condition, endOfDirectiveToken, isActive, branchTaken, conditionValue);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): ElifDirectiveTriviaSyntax {
            return this.Update(hashToken, this.ElifKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithElifKeyword(elifKeyword: SyntaxToken): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, elifKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithCondition(condition: ExpressionSyntax): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElifKeyword, condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElifKeyword, this.Condition, endOfDirectiveToken, this.IsActive, this.BranchTaken, this.ConditionValue);
        }

        public WithIsActive(isActive: boolean): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElifKeyword, this.Condition, this.EndOfDirectiveToken, isActive, this.BranchTaken, this.ConditionValue);
        }

        public WithBranchTaken(branchTaken: boolean): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElifKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, branchTaken, this.ConditionValue);
        }

        public WithConditionValue(conditionValue: boolean): ElifDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElifKeyword, this.Condition, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken, conditionValue);
        }
    }

    export class ElseDirectiveTriviaSyntax extends BranchingDirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1939(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ElseDirectiveTriviaSyntax {
            super.ctor_4303(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get ElseKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseDirectiveTriviaSyntax>this.Green).elseKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseDirectiveTriviaSyntax>this.Green).IsActive; }

        public get BranchTaken(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ElseDirectiveTriviaSyntax>this.Green).BranchTaken; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitElseDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitElseDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, elseKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean, branchTaken: boolean): ElseDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || elseKeyword != this.ElseKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.ElseDirectiveTrivia_6202(hashToken, elseKeyword, endOfDirectiveToken, isActive, branchTaken);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): ElseDirectiveTriviaSyntax {
            return this.Update(hashToken, this.ElseKeyword, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken);
        }

        public WithElseKeyword(elseKeyword: SyntaxToken): ElseDirectiveTriviaSyntax {
            return this.Update(this.HashToken, elseKeyword, this.EndOfDirectiveToken, this.IsActive, this.BranchTaken);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): ElseDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElseKeyword, endOfDirectiveToken, this.IsActive, this.BranchTaken);
        }

        public WithIsActive(isActive: boolean): ElseDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElseKeyword, this.EndOfDirectiveToken, isActive, this.BranchTaken);
        }

        public WithBranchTaken(branchTaken: boolean): ElseDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ElseKeyword, this.EndOfDirectiveToken, this.IsActive, branchTaken);
        }
    }

    export class EndIfDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1812(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EndIfDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndIfDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get EndIfKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndIfDirectiveTriviaSyntax>this.Green).endIfKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndIfDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndIfDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEndIfDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEndIfDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, endIfKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndIfDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || endIfKeyword != this.EndIfKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.EndIfDirectiveTrivia_1427(hashToken, endIfKeyword, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): EndIfDirectiveTriviaSyntax {
            return this.Update(hashToken, this.EndIfKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndIfKeyword(endIfKeyword: SyntaxToken): EndIfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, endIfKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): EndIfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.EndIfKeyword, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): EndIfDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.EndIfKeyword, this.EndOfDirectiveToken, isActive);
        }
    }

    export class RegionDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1446(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): RegionDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RegionDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get RegionKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RegionDirectiveTriviaSyntax>this.Green).regionKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RegionDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.RegionDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitRegionDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitRegionDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, regionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): RegionDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || regionKeyword != this.RegionKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.RegionDirectiveTrivia_1280(hashToken, regionKeyword, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): RegionDirectiveTriviaSyntax {
            return this.Update(hashToken, this.RegionKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithRegionKeyword(regionKeyword: SyntaxToken): RegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, regionKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): RegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.RegionKeyword, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): RegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.RegionKeyword, this.EndOfDirectiveToken, isActive);
        }
    }

    export class EndRegionDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_2484(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): EndRegionDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndRegionDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get EndRegionKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndRegionDirectiveTriviaSyntax>this.Green).endRegionKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndRegionDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.EndRegionDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitEndRegionDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitEndRegionDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, endRegionKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): EndRegionDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || endRegionKeyword != this.EndRegionKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.EndRegionDirectiveTrivia_3825(hashToken, endRegionKeyword, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): EndRegionDirectiveTriviaSyntax {
            return this.Update(hashToken, this.EndRegionKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndRegionKeyword(endRegionKeyword: SyntaxToken): EndRegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, endRegionKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): EndRegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.EndRegionKeyword, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): EndRegionDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.EndRegionKeyword, this.EndOfDirectiveToken, isActive);
        }
    }

    export class ErrorDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1813(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ErrorDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ErrorDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get ErrorKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ErrorDirectiveTriviaSyntax>this.Green).errorKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ErrorDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ErrorDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitErrorDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitErrorDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, errorKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ErrorDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || errorKeyword != this.ErrorKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.ErrorDirectiveTrivia_4709(hashToken, errorKeyword, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): ErrorDirectiveTriviaSyntax {
            return this.Update(hashToken, this.ErrorKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithErrorKeyword(errorKeyword: SyntaxToken): ErrorDirectiveTriviaSyntax {
            return this.Update(this.HashToken, errorKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): ErrorDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ErrorKeyword, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): ErrorDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ErrorKeyword, this.EndOfDirectiveToken, isActive);
        }
    }

    export class WarningDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1762(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): WarningDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WarningDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get WarningKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WarningDirectiveTriviaSyntax>this.Green).warningKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WarningDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.WarningDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitWarningDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitWarningDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, warningKeyword: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): WarningDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || warningKeyword != this.WarningKeyword || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.WarningDirectiveTrivia_3903(hashToken, warningKeyword, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): WarningDirectiveTriviaSyntax {
            return this.Update(hashToken, this.WarningKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithWarningKeyword(warningKeyword: SyntaxToken): WarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, warningKeyword, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): WarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.WarningKeyword, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): WarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.WarningKeyword, this.EndOfDirectiveToken, isActive);
        }
    }

    export class BadDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_8533(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): BadDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BadDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get Identifier(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BadDirectiveTriviaSyntax>this.Green).identifier, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BadDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.BadDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitBadDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitBadDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, identifier: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): BadDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || identifier != this.Identifier || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.BadDirectiveTrivia_1871(hashToken, identifier, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): BadDirectiveTriviaSyntax {
            return this.Update(hashToken, this.Identifier, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithIdentifier(identifier: SyntaxToken): BadDirectiveTriviaSyntax {
            return this.Update(this.HashToken, identifier, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): BadDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.Identifier, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): BadDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.Identifier, this.EndOfDirectiveToken, isActive);
        }
    }

    export class DefineDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1613(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): DefineDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefineDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get DefineKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefineDirectiveTriviaSyntax>this.Green).defineKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Name(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefineDirectiveTriviaSyntax>this.Green).name, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefineDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.DefineDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitDefineDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitDefineDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, defineKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): DefineDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || defineKeyword != this.DefineKeyword || name != this.Name || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.DefineDirectiveTrivia_1640(hashToken, defineKeyword, name, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): DefineDirectiveTriviaSyntax {
            return this.Update(hashToken, this.DefineKeyword, this.Name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithDefineKeyword(defineKeyword: SyntaxToken): DefineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, defineKeyword, this.Name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithName(name: SyntaxToken): DefineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.DefineKeyword, name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): DefineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.DefineKeyword, this.Name, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): DefineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.DefineKeyword, this.Name, this.EndOfDirectiveToken, isActive);
        }
    }

    export class UndefDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_2071(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): UndefDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UndefDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get UndefKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UndefDirectiveTriviaSyntax>this.Green).undefKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Name(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UndefDirectiveTriviaSyntax>this.Green).name, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UndefDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.UndefDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitUndefDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitUndefDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, undefKeyword: SyntaxToken, name: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): UndefDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || undefKeyword != this.UndefKeyword || name != this.Name || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.UndefDirectiveTrivia_1554(hashToken, undefKeyword, name, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): UndefDirectiveTriviaSyntax {
            return this.Update(hashToken, this.UndefKeyword, this.Name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithUndefKeyword(undefKeyword: SyntaxToken): UndefDirectiveTriviaSyntax {
            return this.Update(this.HashToken, undefKeyword, this.Name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithName(name: SyntaxToken): UndefDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.UndefKeyword, name, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): UndefDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.UndefKeyword, this.Name, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): UndefDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.UndefKeyword, this.Name, this.EndOfDirectiveToken, isActive);
        }
    }

    export class LineDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1199(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): LineDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get LineKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).lineKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get Line(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).line, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get File(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).file;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(3), this.GetChildIndex(3));

                return structDefault(SyntaxToken);
            }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.LineDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitLineDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitLineDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, lineKeyword: SyntaxToken, line: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): LineDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || lineKeyword != this.LineKeyword || line != this.Line || file != this.File || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.LineDirectiveTrivia_2819(hashToken, lineKeyword, line, file, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): LineDirectiveTriviaSyntax {
            return this.Update(hashToken, this.LineKeyword, this.Line, this.File, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithLineKeyword(lineKeyword: SyntaxToken): LineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, lineKeyword, this.Line, this.File, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithLine(line: SyntaxToken): LineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.LineKeyword, line, this.File, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithFile(file: SyntaxToken): LineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.LineKeyword, this.Line, file, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): LineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.LineKeyword, this.Line, this.File, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): LineDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.LineKeyword, this.Line, this.File, this.EndOfDirectiveToken, isActive);
        }
    }

    export class PragmaWarningDirectiveTriviaSyntax extends DirectiveTriviaSyntax {
        private errorCodes: SyntaxNode;

        constructor() { super(); }
        ctor_7374(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PragmaWarningDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get PragmaKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).pragmaKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get WarningKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).warningKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get DisableOrRestoreKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).disableOrRestoreKeyword, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get ErrorCodes(): SeparatedSyntaxList<ExpressionSyntax> {
            {
                var ref = { refObj: this.errorCodes };
                var red = this.GetRed_2015(ref, 4);
                this.errorCodes = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<ExpressionSyntax>().ctor_9044(red, this.GetChildIndex(4));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaWarningDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 4:
                    var ref4 = { refObj: this.errorCodes };
                    var result: SyntaxNode = this.GetRed_2015(ref4, 4);
                    this.errorCodes = ref4.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 4: return this.errorCodes;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPragmaWarningDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPragmaWarningDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, warningKeyword: SyntaxToken, disableOrRestoreKeyword: SyntaxToken, errorCodes: SeparatedSyntaxList<ExpressionSyntax>, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaWarningDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || pragmaKeyword != this.PragmaKeyword || warningKeyword != this.WarningKeyword || disableOrRestoreKeyword != this.DisableOrRestoreKeyword || errorCodes != this.ErrorCodes || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.PragmaWarningDirectiveTrivia_1663(hashToken, pragmaKeyword, warningKeyword, disableOrRestoreKeyword, errorCodes, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(hashToken, this.PragmaKeyword, this.WarningKeyword, this.DisableOrRestoreKeyword, this.ErrorCodes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithPragmaKeyword(pragmaKeyword: SyntaxToken): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, pragmaKeyword, this.WarningKeyword, this.DisableOrRestoreKeyword, this.ErrorCodes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithWarningKeyword(warningKeyword: SyntaxToken): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, warningKeyword, this.DisableOrRestoreKeyword, this.ErrorCodes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithDisableOrRestoreKeyword(disableOrRestoreKeyword: SyntaxToken): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.WarningKeyword, disableOrRestoreKeyword, this.ErrorCodes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithErrorCodes(errorCodes: SeparatedSyntaxList<ExpressionSyntax>): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.WarningKeyword, this.DisableOrRestoreKeyword, errorCodes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.WarningKeyword, this.DisableOrRestoreKeyword, this.ErrorCodes, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): PragmaWarningDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.WarningKeyword, this.DisableOrRestoreKeyword, this.ErrorCodes, this.EndOfDirectiveToken, isActive);
        }

        public AddErrorCodes(...items: ExpressionSyntax[]): PragmaWarningDirectiveTriviaSyntax {
            return this.WithErrorCodes(this.ErrorCodes.AddRange(items));
        }
    }

    export class PragmaChecksumDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1261(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): PragmaChecksumDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get PragmaKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).pragmaKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get ChecksumKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).checksumKeyword, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get File(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).file, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get Guid(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).guid, this.GetChildPosition(4), this.GetChildIndex(4)); }
        }

        public get Bytes(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).bytes, this.GetChildPosition(5), this.GetChildIndex(5)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(6), this.GetChildIndex(6)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.PragmaChecksumDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitPragmaChecksumDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitPragmaChecksumDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, pragmaKeyword: SyntaxToken, checksumKeyword: SyntaxToken, file: SyntaxToken, guid: SyntaxToken, bytes: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): PragmaChecksumDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || pragmaKeyword != this.PragmaKeyword || checksumKeyword != this.ChecksumKeyword || file != this.File || guid != this.Guid || bytes != this.Bytes || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.PragmaChecksumDirectiveTrivia_1238(hashToken, pragmaKeyword, checksumKeyword, file, guid, bytes, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(hashToken, this.PragmaKeyword, this.ChecksumKeyword, this.File, this.Guid, this.Bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithPragmaKeyword(pragmaKeyword: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, pragmaKeyword, this.ChecksumKeyword, this.File, this.Guid, this.Bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithChecksumKeyword(checksumKeyword: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, checksumKeyword, this.File, this.Guid, this.Bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithFile(file: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.ChecksumKeyword, file, this.Guid, this.Bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithGuid(guid: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.ChecksumKeyword, this.File, guid, this.Bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithBytes(bytes: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.ChecksumKeyword, this.File, this.Guid, bytes, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.ChecksumKeyword, this.File, this.Guid, this.Bytes, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): PragmaChecksumDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.PragmaKeyword, this.ChecksumKeyword, this.File, this.Guid, this.Bytes, this.EndOfDirectiveToken, isActive);
        }
    }

    export class ReferenceDirectiveTriviaSyntax extends DirectiveTriviaSyntax {

        constructor() { super(); }
        ctor_1757(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): ReferenceDirectiveTriviaSyntax {
            super.ctor_1345(green, parent, position); return this;
        }

        public get HashToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReferenceDirectiveTriviaSyntax>this.Green).hashToken, this.Position, 0); }
        }

        public get ReferenceKeyword(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReferenceDirectiveTriviaSyntax>this.Green).referenceKeyword, this.GetChildPosition(1), this.GetChildIndex(1)); }
        }

        public get File(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReferenceDirectiveTriviaSyntax>this.Green).file, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public get EndOfDirectiveToken(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReferenceDirectiveTriviaSyntax>this.Green).endOfDirectiveToken, this.GetChildPosition(3), this.GetChildIndex(3)); }
        }

        public get IsActive(): boolean { return (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.ReferenceDirectiveTriviaSyntax>this.Green).IsActive; }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitReferenceDirectiveTrivia(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitReferenceDirectiveTrivia(this);
        }

        public Update(hashToken: SyntaxToken, referenceKeyword: SyntaxToken, file: SyntaxToken, endOfDirectiveToken: SyntaxToken, isActive: boolean): ReferenceDirectiveTriviaSyntax {
            if (hashToken != this.HashToken || referenceKeyword != this.ReferenceKeyword || file != this.File || endOfDirectiveToken != this.EndOfDirectiveToken) {
                var newNode = SyntaxFactory.ReferenceDirectiveTrivia_1118(hashToken, referenceKeyword, file, endOfDirectiveToken, isActive);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithHashToken(hashToken: SyntaxToken): ReferenceDirectiveTriviaSyntax {
            return this.Update(hashToken, this.ReferenceKeyword, this.File, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithReferenceKeyword(referenceKeyword: SyntaxToken): ReferenceDirectiveTriviaSyntax {
            return this.Update(this.HashToken, referenceKeyword, this.File, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithFile(file: SyntaxToken): ReferenceDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ReferenceKeyword, file, this.EndOfDirectiveToken, this.IsActive);
        }

        public WithEndOfDirectiveToken(endOfDirectiveToken: SyntaxToken): ReferenceDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ReferenceKeyword, this.File, endOfDirectiveToken, this.IsActive);
        }

        public WithIsActive(isActive: boolean): ReferenceDirectiveTriviaSyntax {
            return this.Update(this.HashToken, this.ReferenceKeyword, this.File, this.EndOfDirectiveToken, isActive);
        }
    }

    export class InterpolatedStringSyntax extends ExpressionSyntax {
        private interpolatedInserts: SyntaxNode;

        constructor() { super(); }
        ctor_1690(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InterpolatedStringSyntax {
            super.ctor_1263(green, parent, position); return this;
        }

        public get StringStart(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterpolatedStringSyntax>this.Green).stringStart, this.Position, 0); }
        }

        public get InterpolatedInserts(): SeparatedSyntaxList<InterpolatedStringInsertSyntax> {
            {
                var ref = { refObj: this.interpolatedInserts };
                var red = this.GetRed_2015(ref, 1);
                this.interpolatedInserts = ref.refObj;
                if (red != null)
                    return new SeparatedSyntaxList<InterpolatedStringInsertSyntax>().ctor_9044(red, this.GetChildIndex(1));

                return structDefault(SeparatedSyntaxList);
            }
        }

        public get StringEnd(): SyntaxToken {
            { return new SyntaxToken().ctor_1108(this,(<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterpolatedStringSyntax>this.Green).stringEnd, this.GetChildPosition(2), this.GetChildIndex(2)); }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 1:
                    var ref1 = { refObj: this.interpolatedInserts };
                    var result: SyntaxNode = this.GetRed_2015(ref1, 1);
                    this.interpolatedInserts = ref1.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 1: return this.interpolatedInserts;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitInterpolatedString(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitInterpolatedString(this);
        }

        public Update(stringStart: SyntaxToken, interpolatedInserts: SeparatedSyntaxList<InterpolatedStringInsertSyntax>, stringEnd: SyntaxToken): InterpolatedStringSyntax {
            if (stringStart != this.StringStart || interpolatedInserts != this.InterpolatedInserts || stringEnd != this.StringEnd) {
                var newNode = SyntaxFactory.InterpolatedString_4706(stringStart, interpolatedInserts, stringEnd);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithStringStart(stringStart: SyntaxToken): InterpolatedStringSyntax {
            return this.Update(stringStart, this.InterpolatedInserts, this.StringEnd);
        }

        public WithInterpolatedInserts(interpolatedInserts: SeparatedSyntaxList<InterpolatedStringInsertSyntax>): InterpolatedStringSyntax {
            return this.Update(this.StringStart, interpolatedInserts, this.StringEnd);
        }

        public WithStringEnd(stringEnd: SyntaxToken): InterpolatedStringSyntax {
            return this.Update(this.StringStart, this.InterpolatedInserts, stringEnd);
        }

        public AddInterpolatedInserts(...items: InterpolatedStringInsertSyntax[]): InterpolatedStringSyntax {
            return this.WithInterpolatedInserts(this.InterpolatedInserts.AddRange(items));
        }
    }

    export class InterpolatedStringInsertSyntax extends CSharpSyntaxNode {
        private expression: ExpressionSyntax;
        private alignment: ExpressionSyntax;

        constructor() { super(); }
        ctor_1720(green: Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.CSharpSyntaxNode, parent: SyntaxNode, position: number): InterpolatedStringInsertSyntax {
            super.ctor_6242(green, parent, position); return this;
        }

        public get Expression(): ExpressionSyntax {
            {
                var ref = { refObj: this.expression };
                var result = this.GetRedAtZero_2231(ref);
                this.expression = ref.refObj; return result;
            }
        }

        public get Comma(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterpolatedStringInsertSyntax>this.Green).comma;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(1), this.GetChildIndex(1));

                return structDefault(SyntaxToken);
            }
        }

        public get Alignment(): ExpressionSyntax {
            {
                var ref = { refObj: this.alignment };
                var result = this.GetRed_2015(ref, 2);
                this.alignment = ref.refObj; return result;
            }
        }

        public get Format(): SyntaxToken {
            {
                var slot = (<Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax.InterpolatedStringInsertSyntax>this.Green).format;
                if (slot != null)
                    return new SyntaxToken().ctor_1108(this, slot, this.GetChildPosition(3), this.GetChildIndex(3));

                return structDefault(SyntaxToken);
            }
        }

        public GetNodeSlot(index: number): SyntaxNode {
            switch (index) {
                case 0:
                    var ref0 = { refObj: this.expression };
                    var result: SyntaxNode = this.GetRedAtZero_2231(ref0);
                    this.expression = ref0.refObj; return result;
                case 2:
                    var ref2 = { refObj: this.alignment };
                    var result: SyntaxNode = this.GetRed_2015(ref2, 2);
                    this.alignment = ref2.refObj; return result;
                default: return null;
            }
        }
        public GetCachedSlot(index: number): SyntaxNode {
            switch (index) {
                case 0: return this.expression;
                case 2: return this.alignment;
                default: return null;
            }
        }

        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitInterpolatedStringInsert(this);
        }

        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitInterpolatedStringInsert(this);
        }

        public Update(expression: ExpressionSyntax, comma: SyntaxToken, alignment: ExpressionSyntax, format: SyntaxToken): InterpolatedStringInsertSyntax {
            if (expression != this.Expression || comma != this.Comma || alignment != this.Alignment || format != this.Format) {
                var newNode = SyntaxFactory.InterpolatedStringInsert_5213(expression, comma, alignment, format);
                var annotations = this.GetAnnotations_1741();
                if (annotations != null && annotations.Length > 0)
                    return SyntaxNodeExtensions.WithAnnotations_Arr(newNode, annotations);
                return newNode;
            }

            return this;
        }

        public WithExpression(expression: ExpressionSyntax): InterpolatedStringInsertSyntax {
            return this.Update(expression, this.Comma, this.Alignment, this.Format);
        }

        public WithComma(comma: SyntaxToken): InterpolatedStringInsertSyntax {
            return this.Update(this.Expression, comma, this.Alignment, this.Format);
        }

        public WithAlignment(alignment: ExpressionSyntax): InterpolatedStringInsertSyntax {
            return this.Update(this.Expression, this.Comma, alignment, this.Format);
        }

        public WithFormat(format: SyntaxToken): InterpolatedStringInsertSyntax {
            return this.Update(this.Expression, this.Comma, this.Alignment, format);
        }
    }
}

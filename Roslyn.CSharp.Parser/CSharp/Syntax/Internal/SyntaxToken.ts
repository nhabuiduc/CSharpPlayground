///<reference path="SyntaxNode.ts"/>
///<reference path="../SyntaxKindFacts.ts"/>
module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class SyntaxToken extends CSharpSyntaxNode {
        ctor_1731(kind: SyntaxKind): SyntaxToken {
            super.ctor_1907(kind);
            this.FullWidth = this.Text.length;
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_1947(kind: SyntaxKind, diagnostics: DiagnosticInfo[]): SyntaxToken {
            super.ctor_1475(kind, diagnostics);
            this.FullWidth = this.Text.length;
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_1741(kind: SyntaxKind, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxToken {
            super.ctor_1757(kind, diagnostics, annotations);
            this.FullWidth = this.Text.length;
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_1992(kind: SyntaxKind, fullWidth: number): SyntaxToken {
            super.ctor_2126(kind, fullWidth);
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_1368(kind: SyntaxKind, fullWidth: number, diagnostics: DiagnosticInfo[]): SyntaxToken {
            super.ctor_4463(kind, diagnostics, fullWidth);
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_1822(kind: SyntaxKind, fullWidth: number, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxToken {
            super.ctor_1733(kind, diagnostics, annotations, fullWidth);
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        ctor_2570(reader: Roslyn.Utilities.ObjectReader): SyntaxToken {
            super.ctor_4942(reader);
            var text = this.Text;
            if (text != null) {
                this.FullWidth = text.length;
            }
            this.flags |= GreenNode.NodeFlags.IsNotMissing;
            return this;
        }
        public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
            return r => new SyntaxToken().ctor_2570(r);
        }
        public get IsToken(): boolean {
            return true;
        }
        public GetSlot(index: number): GreenNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        public static Create_1552(kind: SyntaxKind): SyntaxToken {
            if (kind > SyntaxToken.LastTokenWithWellKnownText) {
                if (!SyntaxFacts.IsAnyToken(kind)) {
                    throw new System.ArgumentException(System.String.Format(CSharpResources.ThisMethodCanOnlyBeUsedToCreateTokens, kind), "kind");
                }
                return SyntaxToken.CreateMissing(kind, null, null);
            }
            return SyntaxToken.TokensWithNoTrivia[<number>kind];
        }
        public static Create_1118(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): SyntaxToken {
            if (kind > SyntaxToken.LastTokenWithWellKnownText) {
                if (!SyntaxFacts.IsAnyToken(kind)) {
                    throw new System.ArgumentException(System.String.Format(CSharpResources.ThisMethodCanOnlyBeUsedToCreateTokens, kind), "kind");
                }
                return SyntaxToken.CreateMissing(kind, leading, trailing);
            }
            if (leading == null) {
                if (trailing == null) {
                    return SyntaxToken.TokensWithNoTrivia[<number>kind];
                }
                else if (trailing == SyntaxFactory.Space) {
                    return SyntaxToken.TokensWithSingleTrailingSpace[<number>kind];
                }
                else if (trailing == SyntaxFactory.CarriageReturnLineFeed) {
                    return SyntaxToken.TokensWithSingleTrailingCRLF[<number>kind];
                }
            }
            if (leading == SyntaxFactory.ElasticZeroSpace && trailing == SyntaxFactory.ElasticZeroSpace) {
                return SyntaxToken.TokensWithElasticTrivia[<number>kind];
            }
            return new SyntaxToken.SyntaxTokenWithTrivia().ctor_1430(kind, leading, trailing);
        }
        public static CreateMissing(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): SyntaxToken {
            return new SyntaxToken.MissingTokenWithTrivia().ctor_1083(kind, leading, trailing);
        }
        public static FirstTokenWithWellKnownText: SyntaxKind = SyntaxKind.TildeToken;
        public static LastTokenWithWellKnownText: SyntaxKind = SyntaxKind.EndOfFileToken;
        private static TokensWithNoTrivia: SyntaxToken[] = new Array<SyntaxToken>(<number>SyntaxToken.LastTokenWithWellKnownText + 1);
        private static TokensWithElasticTrivia: SyntaxToken[] = new Array<SyntaxToken>(<number>SyntaxToken.LastTokenWithWellKnownText + 1);
        private static TokensWithSingleTrailingSpace: SyntaxToken[] = new Array<SyntaxToken>(<number>SyntaxToken.LastTokenWithWellKnownText + 1);
        private static TokensWithSingleTrailingCRLF: SyntaxToken[] = new Array<SyntaxToken>(<number>SyntaxToken.LastTokenWithWellKnownText + 1);
        public static static_constructor() {
            for (var kind = SyntaxToken.FirstTokenWithWellKnownText; kind <= SyntaxToken.LastTokenWithWellKnownText; kind++) {
                SyntaxToken.TokensWithNoTrivia[<number>kind] = new SyntaxToken().ctor_1731(kind);
                SyntaxToken.TokensWithElasticTrivia[<number>kind] = new SyntaxToken.SyntaxTokenWithTrivia().ctor_1430(kind, SyntaxFactory.ElasticZeroSpace, SyntaxFactory.ElasticZeroSpace);
                SyntaxToken.TokensWithSingleTrailingSpace[<number>kind] = new SyntaxToken.SyntaxTokenWithTrivia().ctor_1430(kind, null, SyntaxFactory.Space);
                SyntaxToken.TokensWithSingleTrailingCRLF[<number>kind] = new SyntaxToken.SyntaxTokenWithTrivia().ctor_1430(kind, null, SyntaxFactory.CarriageReturnLineFeed);
            }
            return this;
        }
        //static static_construct_var = SyntaxToken.static_constructor();
        public static GetWellKnownTokens(): System.Collections.Generic.IEnumerable<SyntaxToken> {
            var __result = new Array<SyntaxToken>();
            // for each
            var elementEnumerator = SyntaxToken.TokensWithNoTrivia.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (element != null) {
                        __result.push(element);
                        //yield return element.Value;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach
            // for each
            var elementEnumerator = SyntaxToken.TokensWithElasticTrivia.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (element != null) {
                        __result.push(element);
                        //yield return element.Value;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach
            // for each
            var elementEnumerator = SyntaxToken.TokensWithSingleTrailingSpace.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (element != null) {
                        __result.push(element);
                        //yield return element.Value;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach
            // for each
            var elementEnumerator = SyntaxToken.TokensWithSingleTrailingCRLF.GetEnumerator();
            try {
                while (elementEnumerator.MoveNext()) {
                    var element = elementEnumerator.Current;
                    // foreach block
                    if (element != null) {
                        __result.push(element);
                        //yield return element.Value;
                    }
                }
            } finally {
                if (elementEnumerator !== null) elementEnumerator.Dispose();

            }    
            // end foreach
            return __result;
        }
        public static Identifier_3961(text: string): SyntaxToken {
            return new SyntaxToken.SyntaxIdentifier().ctor_2070(text);
        }
        public static Identifier_2664(leading: CSharpSyntaxNode, text: string, trailing: CSharpSyntaxNode): SyntaxToken {
            if (leading == null) {
                if (trailing == null) {
                    return SyntaxToken.Identifier_3961(text);
                }
                else {
                    return new SyntaxToken.SyntaxIdentifierWithTrailingTrivia().ctor_1013(text, trailing);
                }
            }
            return new SyntaxToken.SyntaxIdentifierWithTrivia().ctor_6135(SyntaxKind.IdentifierToken, text, text, leading, trailing);
        }
        public static Identifier_1121(contextualKind: SyntaxKind, leading: CSharpSyntaxNode, text: string, valueText: string, trailing: CSharpSyntaxNode): SyntaxToken {
            if (contextualKind == SyntaxKind.IdentifierToken && valueText == text) {
                return SyntaxToken.Identifier_2664(leading, text, trailing);
            }
            return new SyntaxToken.SyntaxIdentifierWithTrivia().ctor_6135(contextualKind, text, valueText, leading, trailing);
        }
        public static WithValue_9826<T>(kind: SyntaxKind, text: string, value: T): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithValue<T>().ctor_1775(kind, text, value);
        }
        public static WithValue_3998<T>(kind: SyntaxKind, leading: CSharpSyntaxNode, text: string, value: T, trailing: CSharpSyntaxNode): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithValueAndTrivia<T>().ctor_1855(kind, text, value, leading, trailing);
        }
        public static StringLiteral_1704(text: string): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithValue<string>().ctor_1775(SyntaxKind.StringLiteralToken, text, text);
        }
        public static StringLiteral_1284(leading: CSharpSyntaxNode, text: string, trailing: CSharpSyntaxNode): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithValueAndTrivia<string>().ctor_1855(SyntaxKind.StringLiteralToken, text, text, leading, trailing);
        }
        public get ContextualKind(): SyntaxKind {
            return this.Kind;
        }
        public get RawContextualKind(): number {
            return <number>this.ContextualKind;
        }
        public get Text(): string {
            return SyntaxFacts.GetText_3915(this.Kind);
        }
        public ToString(): string {
            return this.Text;
        }
        public get Value(): Object {
            switch (this.Kind) {
                case SyntaxKind.TrueKeyword:
                    return true;
                case SyntaxKind.FalseKeyword:
                    return false;
                case SyntaxKind.NullKeyword:
                    return null;
                default:
                    return this.Text;
            }
        }
        public GetValue(): Object {
            return this.Value;
        }
        public get ValueText(): string {
            return this.Text;
        }
        public GetValueText(): string {
            return this.ValueText;
        }
        public get Width(): number {
            return this.Text.length;
        }
        public GetLeadingTriviaWidth(): number {
            var leading = this.GetLeadingTrivia();
            return leading != null ? leading.FullWidth : 0;
        }
        public GetTrailingTriviaWidth(): number {
            var trailing = this.GetTrailingTrivia();
            return trailing != null ? trailing.FullWidth : 0;
        }
        public get LeadingTrivia(): SyntaxList<CSharpSyntaxNode> {
            return new SyntaxList<CSharpSyntaxNode>().ctor_1319(<CSharpSyntaxNode>this.GetLeadingTrivia());
        }
        public get TrailingTrivia(): SyntaxList<CSharpSyntaxNode> {
            return new SyntaxList<CSharpSyntaxNode>().ctor_1319(<CSharpSyntaxNode>this.GetTrailingTrivia());
        }
        public WithLeadingTrivia(trivia: GreenNode): GreenNode {
            return this.WithLeadingTrivia_9638(<CSharpSyntaxNode>trivia);
        }
        public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithTrivia().ctor_1749(this.Kind, trivia, null, this.GetDiagnostics(), this.GetAnnotations_1741());
        }
        public WithTrailingTrivia(trivia: GreenNode): GreenNode {
            return this.WithTrailingTrivia_9295(<CSharpSyntaxNode>trivia);
        }
        public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
            return new SyntaxToken.SyntaxTokenWithTrivia().ctor_1749(this.Kind, null, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
        }
        public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
            System.Diagnostics.Debug.Assert(__classOf(this) == /*typeof*/<any>SyntaxToken);
            return new SyntaxToken().ctor_1822(this.Kind, this.FullWidth, diagnostics, this.GetAnnotations_1741());
        }
        public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
            System.Diagnostics.Debug.Assert(__classOf(this) == /*typeof*/ <any>SyntaxToken);
            return new SyntaxToken().ctor_1822(this.Kind, this.FullWidth, this.GetDiagnostics(), annotations);
        }
        public ApplyDirectives(stack: DirectiveStack): DirectiveStack {
            if (this.ContainsDirectives) {
                var leading = this.GetLeadingTrivia();
                if (leading != null && leading.ContainsDirectives) {
                    stack = leading.ApplyDirectives(stack);
                }
                var trailing = this.GetTrailingTrivia();
                if (trailing != null && trailing.ContainsDirectives) {
                    stack = trailing.ApplyDirectives(stack);
                }
            }
            return stack;
        }
        public Accept_1388<TResult>(visitor: CSharpSyntaxVisitor<TResult>): TResult {
            return visitor.VisitToken(this);
        }
        public Accept_1012(visitor: CSharpSyntaxVisitorBase): void {
            visitor.VisitToken(this);
        }
        public WriteTo_1077(writer: System.IO.TextWriter, leading: boolean, trailing: boolean): void {
            if (leading) {
                var trivia = this.GetLeadingTrivia();
                if (trivia != null) {
                    trivia.WriteTo_1077(writer, true, true);
                }
            }
            writer.WriteString(this.Text);
            if (trailing) {
                var trivia = this.GetTrailingTrivia();
                if (trivia != null) {
                    trivia.WriteTo_1077(writer, true, true);
                }
            }
        }
        public IsEquivalentTo(other: GreenNode): boolean {
            if (!super.IsEquivalentTo(other)) {
                return false;
            }
            var otherToken = <SyntaxToken>other;
            if (this.Text != otherToken.Text) {
                return false;
            }
            var thisLeading = this.GetLeadingTrivia();
            var otherLeading = otherToken.GetLeadingTrivia();
            if (thisLeading != otherLeading) {
                if (thisLeading == null || otherLeading == null) {
                    return false;
                }
                if (!thisLeading.IsEquivalentTo(otherLeading)) {
                    return false;
                }
            }
            var thisTrailing = this.GetTrailingTrivia();
            var otherTrailing = otherToken.GetTrailingTrivia();
            if (thisTrailing != otherTrailing) {
                if (thisTrailing == null || otherTrailing == null) {
                    return false;
                }
                if (!thisTrailing.IsEquivalentTo(otherTrailing)) {
                    return false;
                }
            }
            return true;
        }
        public CreateRed_9614(parent: SyntaxNode, position: number): SyntaxNode {
            throw Roslyn.Utilities.ExceptionUtilities.Unreachable;
        }
        constructor() { super(); }
    }

    export module SyntaxToken {
        export class SyntaxTokenWithTrivia extends SyntaxToken {
            protected  LeadingField: CSharpSyntaxNode;
            protected  TrailingField: CSharpSyntaxNode;
            ctor_1430(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): SyntaxTokenWithTrivia {
                super.ctor_1731(kind);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.LeadingField = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.TrailingField = trailing;
                }
                return this;
            }
            ctor_1749(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxTokenWithTrivia {
                super.ctor_1741(kind, diagnostics, annotations);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.LeadingField = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.TrailingField = trailing;
                }
                return this;
            }
            ctor_8843(reader: Roslyn.Utilities.ObjectReader): SyntaxTokenWithTrivia {
                super.ctor_2570(reader);
                var leading = <CSharpSyntaxNode>reader.ReadValue();
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.LeadingField = leading;
                }
                var trailing = <CSharpSyntaxNode>reader.ReadValue();
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.TrailingField = trailing;
                }
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxTokenWithTrivia().ctor_8843(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.LeadingField);
                writer.WriteValue(this.TrailingField);
            }
            public GetLeadingTrivia(): CSharpSyntaxNode {
                return this.LeadingField;
            }
            public GetTrailingTrivia(): CSharpSyntaxNode {
                return this.TrailingField;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithTrivia().ctor_1749(this.Kind, trivia, this.TrailingField, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithTrivia().ctor_1749(this.Kind, this.LeadingField, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxTokenWithTrivia().ctor_1749(this.Kind, this.LeadingField, this.TrailingField, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxTokenWithTrivia().ctor_1749(this.Kind, this.LeadingField, this.TrailingField, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }


        export class MissingTokenWithTrivia extends SyntaxTokenWithTrivia {
            ctor_1083(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): MissingTokenWithTrivia {
                super.ctor_1430(kind, leading, trailing);
                this.flags &= ~GreenNode.NodeFlags.IsNotMissing;
                return this;
            }
            ctor_1242(kind: SyntaxKind, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): MissingTokenWithTrivia {
                super.ctor_1749(kind, leading, trailing, diagnostics, annotations);
                this.flags &= ~GreenNode.NodeFlags.IsNotMissing;
                return this;
            }
            ctor_3008(reader: Roslyn.Utilities.ObjectReader): MissingTokenWithTrivia {
                super.ctor_8843(reader);
                this.flags &= ~GreenNode.NodeFlags.IsNotMissing;
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new MissingTokenWithTrivia().ctor_3008(r);
            }
            public get Text(): string {
                return System.String.Empty;
            }
            public get Value(): Object {
                switch (this.Kind) {
                    case SyntaxKind.IdentifierToken:
                        return System.String.Empty;
                    default:
                        return null;
                }
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new MissingTokenWithTrivia().ctor_1242(this.Kind, trivia, this.TrailingField, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new MissingTokenWithTrivia().ctor_1242(this.Kind, this.LeadingField, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new MissingTokenWithTrivia().ctor_1242(this.Kind, this.LeadingField, this.TrailingField, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new MissingTokenWithTrivia().ctor_1242(this.Kind, this.LeadingField, this.TrailingField, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }

        export class SyntaxIdentifier extends SyntaxToken {
            protected  TextField: string;
            ctor_2070(text: string): SyntaxIdentifier {
                super.ctor_1992(SyntaxKind.IdentifierToken, text.length);
                this.TextField = text;
                return this;
            }
            ctor_6514(text: string, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxIdentifier {
                super.ctor_1822(SyntaxKind.IdentifierToken, text.length, diagnostics, annotations);
                this.TextField = text;
                return this;
            }
            ctor_1332(reader: Roslyn.Utilities.ObjectReader): SyntaxIdentifier {
                super.ctor_2570(reader);
                this.TextField = reader.ReadString_7160();
                this.FullWidth = this.TextField.length;
                return this;
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteString(this.TextField);
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxIdentifier().ctor_1332(r);
            }
            public get Text(): string {
                return this.TextField;
            }
            public get Value(): Object {
                return this.TextField;
            }
            public get ValueText(): string {
                return this.TextField;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.Kind, this.TextField, this.TextField, trivia, null, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.Kind, this.TextField, this.TextField, null, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxIdentifier().ctor_6514(this.Text, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxIdentifier().ctor_6514(this.Text, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }


        export class SyntaxIdentifierExtended extends SyntaxIdentifier {
            protected  contextualKind: SyntaxKind = 0;
            protected  valueText: string;
            ctor_6330(contextualKind: SyntaxKind, text: string, valueText: string): SyntaxIdentifierExtended {
                super.ctor_2070(text);
                this.contextualKind = contextualKind;
                this.valueText = valueText;
                return this;
            }
            ctor_1916(contextualKind: SyntaxKind, text: string, valueText: string, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxIdentifierExtended {
                super.ctor_6514(text, diagnostics, annotations);
                this.contextualKind = contextualKind;
                this.valueText = valueText;
                return this;
            }
            ctor_2220(reader: Roslyn.Utilities.ObjectReader): SyntaxIdentifierExtended {
                super.ctor_1332(reader);
                this.contextualKind = <SyntaxKind>reader.ReadInt16();
                this.valueText = reader.ReadString_7160();
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxIdentifierExtended().ctor_2220(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteInt16(<number>this.contextualKind);
                writer.WriteString(this.valueText);
            }
            public get ContextualKind(): SyntaxKind {
                return this.contextualKind;
            }
            public get ValueText(): string {
                return this.valueText;
            }
            public get Value(): Object {
                return this.valueText;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, trivia, null, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, null, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxIdentifierExtended().ctor_1916(this.contextualKind, this.TextField, this.valueText, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxIdentifierExtended().ctor_1916(this.contextualKind, this.TextField, this.valueText, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }


        export class SyntaxIdentifierWithTrailingTrivia extends SyntaxIdentifier {
            private trailing: CSharpSyntaxNode;
            ctor_1013(text: string, trailing: CSharpSyntaxNode): SyntaxIdentifierWithTrailingTrivia {
                super.ctor_2070(text);
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_2005(text: string, trailing: CSharpSyntaxNode, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxIdentifierWithTrailingTrivia {
                super.ctor_6514(text, diagnostics, annotations);
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_3728(reader: Roslyn.Utilities.ObjectReader): SyntaxIdentifierWithTrailingTrivia {
                super.ctor_1332(reader);
                var trailing = <CSharpSyntaxNode>reader.ReadValue();
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxIdentifierWithTrailingTrivia().ctor_3728(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.trailing);
            }
            public GetTrailingTrivia(): CSharpSyntaxNode {
                return this.trailing;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.Kind, this.TextField, this.TextField, trivia, this.trailing, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrailingTrivia().ctor_2005(this.TextField, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxIdentifierWithTrailingTrivia().ctor_2005(this.TextField, this.trailing, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxIdentifierWithTrailingTrivia().ctor_2005(this.TextField, this.trailing, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }

        export class SyntaxIdentifierWithTrivia extends SyntaxIdentifierExtended {
            private leading: CSharpSyntaxNode;
            private trailing: CSharpSyntaxNode;
            ctor_6135(contextualKind: SyntaxKind, text: string, valueText: string, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): SyntaxIdentifierWithTrivia {
                super.ctor_6330(contextualKind, text, valueText);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_8319(contextualKind: SyntaxKind, text: string, valueText: string, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxIdentifierWithTrivia {
                super.ctor_1916(contextualKind, text, valueText, diagnostics, annotations);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_5359(reader: Roslyn.Utilities.ObjectReader): SyntaxIdentifierWithTrivia {
                super.ctor_2220(reader);
                var leading = <CSharpSyntaxNode>reader.ReadValue();
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                var trailing = <CSharpSyntaxNode>reader.ReadValue();
                if (trailing != null) {
                    this.trailing = trailing;
                    this.AdjustFlagsAndWidth(trailing);
                }
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxIdentifierWithTrivia().ctor_5359(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.leading);
                writer.WriteValue(this.trailing);
            }
            public GetLeadingTrivia(): CSharpSyntaxNode {
                return this.leading;
            }
            public GetTrailingTrivia(): CSharpSyntaxNode {
                return this.trailing;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, trivia, this.trailing, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, this.leading, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, this.leading, this.trailing, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxIdentifierWithTrivia().ctor_8319(this.contextualKind, this.TextField, this.valueText, this.leading, this.trailing, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }

        export class SyntaxTokenWithValue<T> extends SyntaxToken {
            protected  TextField: string;
            protected  ValueField: T;
            ctor_1775(kind: SyntaxKind, text: string, value: T): SyntaxTokenWithValue<T> {
                super.ctor_1992(kind, text.length);
                this.TextField = text;
                this.ValueField = value;
                return this;
            }
            ctor_7378(kind: SyntaxKind, text: string, value: T, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxTokenWithValue<T> {
                super.ctor_1822(kind, text.length, diagnostics, annotations);
                this.TextField = text;
                this.ValueField = value;
                return this;
            }
            ctor_3744(reader: Roslyn.Utilities.ObjectReader): SyntaxTokenWithValue<T> {
                super.ctor_2570(reader);
                this.TextField = reader.ReadString_7160();
                this.FullWidth = this.TextField.length;
                this.ValueField = <T>reader.ReadValue();
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxTokenWithValue<T>().ctor_3744(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteString(this.TextField);
                writer.WriteValue(this.ValueField);
            }
            public get Text(): string {
                return this.TextField;
            }
            public get Value(): Object {
                return this.ValueField;
            }
            public get ValueText(): string {
                return System.Convert.ToString(this.ValueField, System.Globalization.CultureInfo.InvariantCulture);
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, trivia, null, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, null, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxTokenWithValue<T>().ctor_7378(this.Kind, this.TextField, this.ValueField, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxTokenWithValue<T>().ctor_7378(this.Kind, this.TextField, this.ValueField, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }

        export class SyntaxTokenWithValueAndTrivia<T> extends SyntaxTokenWithValue<T>
        {
            private leading: CSharpSyntaxNode;
            private trailing: CSharpSyntaxNode;
            ctor_1855(kind: SyntaxKind, text: string, value: T, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode): SyntaxTokenWithValueAndTrivia<T> {
                super.ctor_1775(kind, text, value);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_6719(kind: SyntaxKind, text: string, value: T, leading: CSharpSyntaxNode, trailing: CSharpSyntaxNode, diagnostics: DiagnosticInfo[], annotations: SyntaxAnnotation[]): SyntaxTokenWithValueAndTrivia<T> {
                super.ctor_7378(kind, text, value, diagnostics, annotations);
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            ctor_4420(reader: Roslyn.Utilities.ObjectReader): SyntaxTokenWithValueAndTrivia<T> {
                super.ctor_3744(reader);
                var leading = <CSharpSyntaxNode>reader.ReadValue();
                if (leading != null) {
                    this.AdjustFlagsAndWidth(leading);
                    this.leading = leading;
                }
                var trailing = <CSharpSyntaxNode>reader.ReadValue();
                if (trailing != null) {
                    this.AdjustFlagsAndWidth(trailing);
                    this.trailing = trailing;
                }
                return this;
            }
            public GetReader(): (_: Roslyn.Utilities.ObjectReader) => Object {
                return r => new SyntaxTokenWithValueAndTrivia<T>().ctor_4420(r);
            }
            public WriteTo_2123(writer: Roslyn.Utilities.ObjectWriter): void {
                super.WriteTo_2123(writer);
                writer.WriteValue(this.leading);
                writer.WriteValue(this.trailing);
            }
            public GetLeadingTrivia(): CSharpSyntaxNode {
                return this.leading;
            }
            public GetTrailingTrivia(): CSharpSyntaxNode {
                return this.trailing;
            }
            public WithLeadingTrivia_9638(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, trivia, this.trailing, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public WithTrailingTrivia_9295(trivia: CSharpSyntaxNode): SyntaxToken {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, this.leading, trivia, this.GetDiagnostics(), this.GetAnnotations_1741());
            }
            public SetDiagnostics(diagnostics: DiagnosticInfo[]): GreenNode {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, this.leading, this.trailing, diagnostics, this.GetAnnotations_1741());
            }
            public SetAnnotations(annotations: SyntaxAnnotation[]): GreenNode {
                return new SyntaxTokenWithValueAndTrivia<T>().ctor_6719(this.Kind, this.TextField, this.ValueField, this.leading, this.trailing, this.GetDiagnostics(), annotations);
            }
            constructor() { super(); }
        }
    }

    
}
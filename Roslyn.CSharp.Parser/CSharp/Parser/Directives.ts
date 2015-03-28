module Microsoft.CodeAnalysis.CSharp.Syntax.InternalSyntax {
    export class Directive implements IStruct {
        private node: DirectiveTriviaSyntax;
        ctor_8302(node: DirectiveTriviaSyntax): Directive {
            this.node = node;
            return this;
        }
        public get Kind(): SyntaxKind {
            return this.node.Kind;
        }
        public IncrementallyEquivalent(other: Directive): boolean {
            if (this.Kind != other.Kind) {
                return false;
            }
            var isActive: boolean = this.IsActive;
            var otherIsActive: boolean = other.IsActive;
            if (!isActive && !otherIsActive) {
                return true;
            }
            if (isActive != otherIsActive) {
                return false;
            }
            switch (this.Kind) {
                case SyntaxKind.DefineDirectiveTrivia:
                case SyntaxKind.UndefDirectiveTrivia:
                    return this.GetIdentifier() == other.GetIdentifier();
                case SyntaxKind.IfDirectiveTrivia:
                case SyntaxKind.ElifDirectiveTrivia:
                case SyntaxKind.ElseDirectiveTrivia:
                    return this.BranchTaken == other.BranchTaken;
                default:
                    return true;
            }
        }

        public GetIdentifier(): string {
            switch (this.node.Kind) {
                case SyntaxKind.DefineDirectiveTrivia:
                    return (<DefineDirectiveTriviaSyntax>this.node).Name.ValueText;
                case SyntaxKind.UndefDirectiveTrivia:
                    return (<UndefDirectiveTriviaSyntax>this.node).Name.ValueText;
                default:
                    return null;
            }
        }
        public get IsActive(): boolean {
            return this.node.IsActive;
        }
        public get BranchTaken(): boolean {
            var branching = __as__<BranchingDirectiveTriviaSyntax>(this.node, BranchingDirectiveTriviaSyntax);
            if (branching != null) {
                return branching.BranchTaken;
            }
            return false;
        }
        constructor() { }
    }
    export enum DefineState {
        Defined,
        Undefined,
        Unspecified
    }
    export class DirectiveStack implements IStruct {
        public static Empty: DirectiveStack = new DirectiveStack().ctor_1074(Roslyn.Utilities.ConsList.Empty);
        public static Null: DirectiveStack = new DirectiveStack().ctor_1074(null);
        private directives: Roslyn.Utilities.ConsList<Directive>;
        ctor_1074(directives: Roslyn.Utilities.ConsList<Directive>): DirectiveStack {
            this.directives = directives;
            return this;
        }
        public get IsNull(): boolean {
            return this.directives == null;
        }
        public get IsEmpty(): boolean {
            return this.directives == Roslyn.Utilities.ConsList.Empty;
        }
        public IsDefined(id: string): DefineState {
            for (var current = this.directives; current != null && current.Any(); current = current.Tail) {
                switch (current.Head.Kind) {
                    case SyntaxKind.DefineDirectiveTrivia:
                        if (current.Head.GetIdentifier() == id) {
                            return DefineState.Defined;
                        }
                        break;
                    case SyntaxKind.UndefDirectiveTrivia:
                        if (current.Head.GetIdentifier() == id) {
                            return DefineState.Undefined;
                        }
                        break;
                    case SyntaxKind.ElifDirectiveTrivia:
                    case SyntaxKind.ElseDirectiveTrivia:
                        do {
                            current = current.Tail;
                            if (current == null || !current.Any()) {
                                return DefineState.Unspecified;
                            }
                        }
                        while (current.Head.Kind != SyntaxKind.IfDirectiveTrivia);
                        break;
                }
            }
            return DefineState.Unspecified;
        }
        public PreviousBranchTaken(): boolean {
            for (var current = this.directives; current != null && current.Any(); current = current.Tail) {
                if (current.Head.BranchTaken) {
                    return true;
                }
                else if (current.Head.Kind == SyntaxKind.IfDirectiveTrivia) {
                    return false;
                }
            }
            return false;
        }
        public HasUnfinishedIf(): boolean {
            var prev = DirectiveStack.GetPreviousIfElifElseOrRegion(this.directives);
            return prev != null && prev.Any() && prev.Head.Kind != SyntaxKind.RegionDirectiveTrivia;
        }
        public HasPreviousIfOrElif(): boolean {
            var prev = DirectiveStack.GetPreviousIfElifElseOrRegion(this.directives);
            return prev != null && prev.Any() && (prev.Head.Kind == SyntaxKind.IfDirectiveTrivia || prev.Head.Kind == SyntaxKind.ElifDirectiveTrivia);
        }
        public HasUnfinishedRegion(): boolean {
            var prev = DirectiveStack.GetPreviousIfElifElseOrRegion(this.directives);
            return prev != null && prev.Any() && prev.Head.Kind == SyntaxKind.RegionDirectiveTrivia;
        }
        public Add(directive: Directive): DirectiveStack {
            var __tSwitch68 = directive.Kind;
            while (true) {
                var __tDefault41 = false;
                switch (__tSwitch68) {
                    case SyntaxKind.EndIfDirectiveTrivia:
                        var prevIf = DirectiveStack.GetPreviousIf(this.directives);
                        if (prevIf == null || !prevIf.Any()) {
                            __tDefault41 = true; break;
                        }
                        var tmp: boolean = false;
                        return new DirectiveStack().ctor_1074((() => {
                            var tmp_ref0 = { refObj: tmp };
                            var ret_val__427 = DirectiveStack.CompleteIf(this.directives, tmp_ref0);

                            tmp = tmp_ref0.refObj;
                            return ret_val__427;
                        })());
                    case SyntaxKind.EndRegionDirectiveTrivia:
                        var prevRegion = DirectiveStack.GetPreviousRegion(this.directives);
                        if (prevRegion == null || !prevRegion.Any()) {
                            __tDefault41 = true; break;
                        }
                        return new DirectiveStack().ctor_1074(DirectiveStack.CompleteRegion(this.directives));
                    default:
                        return new DirectiveStack().ctor_1074(new Roslyn.Utilities.ConsList<Directive>().ctor_9301(directive, this.directives != null ? this.directives : Roslyn.Utilities.ConsList.Empty));
                }


                if (__tDefault41) {
                    return new DirectiveStack().ctor_1074(new Roslyn.Utilities.ConsList<Directive>().ctor_9301(directive, this.directives != null ? this.directives : Roslyn.Utilities.ConsList.Empty));
                }

                break;
            }

        }
        private static CompleteIf(stack: Roslyn.Utilities.ConsList<Directive>, include: { refObj: boolean }): Roslyn.Utilities.ConsList<Directive> {
            if (!stack.Any()) {
                include.refObj = true;
                return stack;
            }
            if (stack.Head.Kind == SyntaxKind.IfDirectiveTrivia) {
                include.refObj = stack.Head.BranchTaken;
                return stack.Tail;
            }
            var newStack = DirectiveStack.CompleteIf(stack.Tail, include);
            switch (stack.Head.Kind) {
                case SyntaxKind.ElifDirectiveTrivia:
                case SyntaxKind.ElseDirectiveTrivia:
                    include.refObj = stack.Head.BranchTaken;
                    break;
                default:
                    if (include.refObj) {
                        newStack = new Roslyn.Utilities.ConsList<Directive>().ctor_9301(stack.Head, newStack);
                    }
                    break;
            }
            return newStack;
        }
        private static CompleteRegion(stack: Roslyn.Utilities.ConsList<Directive>): Roslyn.Utilities.ConsList<Directive> {
            if (!stack.Any()) {
                return stack;
            }
            if (stack.Head.Kind == SyntaxKind.RegionDirectiveTrivia) {
                return stack.Tail;
            }
            var newStack = DirectiveStack.CompleteRegion(stack.Tail);
            newStack = new Roslyn.Utilities.ConsList<Directive>().ctor_9301(stack.Head, newStack);
            return newStack;
        }
        private static GetPreviousIf(directives: Roslyn.Utilities.ConsList<Directive>): Roslyn.Utilities.ConsList<Directive> {
            var current = directives;
            while (current != null && current.Any()) {
                switch (current.Head.Kind) {
                    case SyntaxKind.IfDirectiveTrivia:
                        return current;
                }
                current = current.Tail;
            }
            return current;
        }
        private static GetPreviousIfElifElseOrRegion(directives: Roslyn.Utilities.ConsList<Directive>): Roslyn.Utilities.ConsList<Directive> {
            var current = directives;
            while (current != null && current.Any()) {
                switch (current.Head.Kind) {
                    case SyntaxKind.IfDirectiveTrivia:
                    case SyntaxKind.ElifDirectiveTrivia:
                    case SyntaxKind.ElseDirectiveTrivia:
                    case SyntaxKind.RegionDirectiveTrivia:
                        return current;
                }
                current = current.Tail;
            }
            return current;
        }
        private static GetPreviousRegion(directives: Roslyn.Utilities.ConsList<Directive>): Roslyn.Utilities.ConsList<Directive> {
            var current = directives;
            while (current != null && current.Any() && current.Head.Kind != SyntaxKind.RegionDirectiveTrivia) {
                current = current.Tail;
            }
            return current;
        }

        public IncrementallyEquivalent(other: DirectiveStack): boolean {
            var mine = DirectiveStack.SkipInsignificantDirectives(this.directives);
            var theirs = DirectiveStack.SkipInsignificantDirectives(other.directives);
            var mineHasAny: boolean = mine != null && mine.Any();
            var theirsHasAny: boolean = theirs != null && theirs.Any();
            while (mineHasAny && theirsHasAny) {
                if (!mine.Head.IncrementallyEquivalent(theirs.Head)) {
                    return false;
                }
                mine = DirectiveStack.SkipInsignificantDirectives(mine.Tail);
                theirs = DirectiveStack.SkipInsignificantDirectives(theirs.Tail);
                mineHasAny = mine != null && mine.Any();
                theirsHasAny = theirs != null && theirs.Any();
            }
            return mineHasAny == theirsHasAny;
        }
        private static SkipInsignificantDirectives(directives: Roslyn.Utilities.ConsList<Directive>): Roslyn.Utilities.ConsList<Directive> {
            for (; directives != null && directives.Any(); directives = directives.Tail) {
                switch (directives.Head.Kind) {
                    case SyntaxKind.IfDirectiveTrivia:
                    case SyntaxKind.ElifDirectiveTrivia:
                    case SyntaxKind.ElseDirectiveTrivia:
                    case SyntaxKind.EndIfDirectiveTrivia:
                    case SyntaxKind.DefineDirectiveTrivia:
                    case SyntaxKind.UndefDirectiveTrivia:
                    case SyntaxKind.RegionDirectiveTrivia:
                    case SyntaxKind.EndRegionDirectiveTrivia:
                        return directives;
                }
            }
            return directives;
        }
        constructor() { }
    }
}
module Microsoft.CodeAnalysis.Text {
    export class LinePosition implements System.IEquatable<LinePosition>, System.Generic.IComparable<LinePosition>, IStruct {
        public static Zero: LinePosition = new LinePosition().ctor_1367(0, 0);
        private line: number = 0;
        private character: number = 0;
        ctor_1367(line: number, character: number): LinePosition {
            if (line < 0) {
                throw new System.ArgumentOutOfRangeException("line");
            }
            if (character < 0) {
                throw new System.ArgumentOutOfRangeException("character");
            }
            this.line = line;
            this.character = character;
            return this;
        }
        ctor_9638(character: number): LinePosition {
            if (character < 0) {
                throw new System.ArgumentOutOfRangeException("character");
            }
            this.line = -1;
            this.character = character;
            return this;
        }
        public get Line(): number {
            return this.line;
        }
        public get Character(): number {
            return this.character;
        }
        public op_Equality(right: LinePosition): boolean {
            var left = this;
            return left.Equals_6178(right);
        }

        public op_Inequality(right: LinePosition): boolean {
            var left = this;
            return !left.Equals_6178(right);
        }

        public Equals_6178(other: LinePosition): boolean {
            return other.Line == this.Line && other.Character == this.Character;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof LinePosition && this.Equals_6178(<LinePosition>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.Line, this.Character);
        }
        public ToString(): string {
            return this.Line + "," + this.Character;
        }
        public CompareTo(other: LinePosition): number {
            var result: number = this.line.CompareTo(other.line);
            return (result != 0) ? result : this.character.CompareTo(other.Character);
        }
        public op_GreaterThan(right: LinePosition): boolean {
            var left = this;
            return left.CompareTo(right) > 0;
        }

        public op_GreaterThanOrEqual(right: LinePosition): boolean {
            var left = this;
            return left.CompareTo(right) >= 0;
        }

        public op_LessThan(right: LinePosition): boolean {
            var left = this;
            return left.CompareTo(right) < 0;
        }

        public op_LessThanOrEqual(right: LinePosition): boolean {
            var left = this;
            return left.CompareTo(right) <= 0;
        }

        constructor() { }
    }
}
module Microsoft.CodeAnalysis.Text {
    export class LinePositionSpan implements System.IEquatable<LinePositionSpan>, IStruct {
        private start: LinePosition = structDefault(LinePosition);
        private end: LinePosition = structDefault(LinePosition);
        ctor_1348(start: LinePosition, end: LinePosition): LinePositionSpan {
            if (end.op_LessThan(start)) {
                throw new System.ArgumentException("end", CodeAnalysisResources.EndMustNotBeLessThanStart);
            }
            this.start = start;
            this.end = end;
            return this;
        }
        public get Start(): LinePosition {
            return this.start;
        }
        public get End(): LinePosition {
            return this.end;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof LinePositionSpan && this.Equals_2915(<LinePositionSpan>obj);
        }
        public Equals_2915(other: LinePositionSpan): boolean {
            return this.start.Equals_6178(other.start) && this.end.Equals_6178(other.end);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.start.GetHashCode(), this.end.GetHashCode());
        }
        public op_Equality(right: LinePositionSpan): boolean {
            var left = this;
            return left.Equals_2915(right);
        }

        public op_Inequality(right: LinePositionSpan): boolean {
            var left = this;
            return !left.Equals_2915(right);
        }

        public ToString(): string {
            return System.String.Format("({0})-({1})", this.start, this.end);
        }
        constructor() { }
    }
}
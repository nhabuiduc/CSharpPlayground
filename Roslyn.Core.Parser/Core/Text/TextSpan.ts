module Microsoft.CodeAnalysis.Text {
    export class TextSpan implements System.IEquatable<TextSpan>, System.Generic.IComparable<TextSpan>, IStruct {
        private start: number = 0;
        private length: number = 0;
        ctor_1506(start: number, length: number): TextSpan {
            if (start < 0) {
                throw new System.ArgumentOutOfRangeException("start");
            }
            if (start + length < start) {
                throw new System.ArgumentOutOfRangeException("length");
            }
            this.start = start;
            this.length = length;
            return this;
        }
        public get Start(): number {
            return this.start;
        }
        public get End(): number {
            return this.start + this.length;
        }
        public get Length(): number {
            return this.length;
        }
        public get IsEmpty(): boolean {
            return this.Length == 0;
        }
        public Contains_2103(position: number): boolean {
            return (((position - this.start) >>> 0) < <number>this.length);
        }
        public Contains_1915(span: TextSpan): boolean {
            return span.Start >= this.start && span.End <= this.End;
        }
        public OverlapsWith(span: TextSpan): boolean {
            var overlapStart: number = System.Math.Max(this.start, span.Start);
            var overlapEnd: number = System.Math.Min(this.End, span.End);
            return overlapStart < overlapEnd;
        }
        public Overlap(span: TextSpan): TextSpan {
            var overlapStart: number = System.Math.Max(this.start, span.Start);
            var overlapEnd: number = System.Math.Min(this.End, span.End);
            return overlapStart < overlapEnd ? TextSpan.FromBounds(overlapStart, overlapEnd) : <TextSpan>null;
        }
        public IntersectsWith_1989(span: TextSpan): boolean {
            return span.Start <= this.End && span.End >= this.start;
        }
        public IntersectsWith_1739(position: number): boolean {
            return (((position - this.start) >>> 0) <= <number>this.length);
        }
        public Intersection(span: TextSpan): TextSpan {
            var intersectStart: number = System.Math.Max(this.start, span.Start);
            var intersectEnd: number = System.Math.Min(this.End, span.End);
            return intersectStart <= intersectEnd ? TextSpan.FromBounds(intersectStart, intersectEnd) : <TextSpan>null;
        }
        public static FromBounds(start: number, end: number): TextSpan {
            if (start < 0) {
                throw new System.ArgumentOutOfRangeException("start", CodeAnalysisResources.StartMustNotBeNegative);
            }
            if (end < start) {
                throw new System.ArgumentException("end", CodeAnalysisResources.EndMustNotBeLessThanStart);
            }
            return new TextSpan().ctor_1506(start, end - start);
        }
        public op_Equality(right: TextSpan): boolean {
            var left = this;
            return left.Equals_9598(right);
        }

        public op_Inequality(right: TextSpan): boolean {
            var left = this;
            return !left.Equals_9598(right);
        }

        public Equals_9598(other: TextSpan): boolean {
            return this.start == other.start && this.length == other.length;
        }
        public Equals(obj: Object): boolean {
            return obj instanceof TextSpan && this.Equals_9598(<TextSpan>obj);
        }
        public GetHashCode(): number {
            return Roslyn.Utilities.Hash.Combine_1641(this.start, this.length);
        }
        public ToString(): string {
            return System.String.Format("[{0}..{1})", this.Start, this.End);
        }
        public CompareTo(other: TextSpan): number {
            var diff = this.start - other.start;
            if (diff != 0) {
                return diff;
            }
            return this.length - other.length;
        }
        constructor() { }
    }
}
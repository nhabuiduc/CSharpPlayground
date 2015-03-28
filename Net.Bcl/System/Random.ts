module System {
    export class Random {
        private static MBIG: number = Int32.MaxValue;
        private static MSEED: number = 161803398;
        private static MZ: number = 0;
        private inext: number = 0;
        private inextp: number = 0;
        private SeedArray: number[] = new Array(56);
        protected  Sample(): number {
            return (this.InternalSample() * (1.0 / Random.MBIG));
        }
        private InternalSample(): number {
            var retVal: number = 0;
            var locINext: number = this.inext;
            var locINextp: number = this.inextp;
            if (++locINext >= 56)
                locINext = 1;
            if (++locINextp >= 56)
                locINextp = 1;
            retVal = this.SeedArray[locINext] - this.SeedArray[locINextp];
            if (retVal == Random.MBIG)
                retVal--;
            if (retVal < 0)
                retVal += Random.MBIG;
            this.SeedArray[locINext] = retVal;
            this.inext = locINext;
            this.inextp = locINextp;
            return retVal;
        }
        private GetSampleForLargeRange(): number {
            var result: number = this.InternalSample();
            var negative: boolean = (this.InternalSample() % 2 == 0) ? true : false;
            if (negative) {
                result = -result;
            }
            var d: number = result;
            d += (Int32.MaxValue - 1);
            d /= 2 * <number>Int32.MaxValue - 1;
            return d;
        }
        public NextDouble(): number {
            return this.Sample();
        }
        public NextBytes(buffer: number[]): void {
            if (buffer == null)
                throw new ArgumentNullException("buffer");
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            for (var i: number = 0; i < buffer.length; i++) {
                buffer[i] = <number>(this.InternalSample() % (Byte.MaxValue + 1));
            }
        }
        constructor(Seed: number);
        constructor();
        constructor(param0?: number) {
            if (typeof param0 == 'number') { this.constructor_Random_overload0(param0); return; }
            if (typeof param0 == 'undefined') { this.constructor_Random_overload0(Environment.TickCount); this.constructor_Random_overload1(); return; }
            throw new Error('overload failed');
        }
        private constructor_Random_overload0(Seed: number): void {
            var ii: number = 0;
            var mj: number = 0, mk = 0;
            var subtraction: number = (Seed == Int32.MinValue) ? Int32.MaxValue : Math.Abs(Seed);
            mj = Random.MSEED - subtraction;
            this.SeedArray[55] = mj;
            mk = 1;
            for (var i: number = 1; i < 55; i++) {
                ii = (21 * i) % 55;
                this.SeedArray[ii] = mk;
                mk = mj - mk;
                if (mk < 0)
                    mk += Random.MBIG;
                mj = this.SeedArray[ii];
            }
            for (var k: number = 1; k < 5; k++) {
                for (var i: number = 1; i < 56; i++) {
                    this.SeedArray[i] -= this.SeedArray[1 + (i + 30) % 55];
                    if (this.SeedArray[i] < 0)
                        this.SeedArray[i] += Random.MBIG;
                }
            }
            this.inext = 0;
            this.inextp = 21;
            Seed = 1;
        }
        private constructor_Random_overload1(): void {

        }
        public Next(minValue: number, maxValue: number): number;
        public Next(maxValue: number): number;
        public Next(): number;
        public Next(param0?: number, param1?: number): number {
            if (typeof param0 == 'number' && typeof param1 == 'number') { return this.Next_overload0(param0, param1); }
            if (typeof param0 == 'number' && typeof param1 == 'undefined') { return this.Next_overload1(param0); }
            if (typeof param0 == 'undefined' && typeof param1 == 'undefined') { return this.Next_overload2(); }
        }
        private Next_overload0(minValue: number, maxValue: number): number {
            if (minValue > maxValue) {
                throw new ArgumentOutOfRangeException("minValue", Environment.GetResourceString("Argument_MinMaxValue", <any>"minValue",<any> "maxValue"));
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            var range: number = <number>maxValue - minValue;
            if (range <= <number>Int32.MaxValue) {
                return (<number>((this.Sample() * range) | 0) + minValue);
            }
            else {
                return <number>(<number>((this.GetSampleForLargeRange() * range) | 0) + minValue);
            }
        }
        private Next_overload1(maxValue: number): number {
            if (maxValue < 0) {
                throw new ArgumentOutOfRangeException("maxValue", Environment.GetResourceString("ArgumentOutOfRange_MustBePositive", <any>"maxValue"));
            }
            System.Diagnostics.Contracts.Contract.EndContractBlock();
            return <number>((this.Sample() * maxValue) | 0);
        }
        private Next_overload2(): number {
            return this.InternalSample();
        }
    }
}
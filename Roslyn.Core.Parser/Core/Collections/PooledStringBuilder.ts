module Microsoft.CodeAnalysis.Collections {
    export class PooledStringBuilder {
        public Builder: System.Text.StringBuilder = new System.Text.StringBuilder();
        private pool: Roslyn.Utilities.ObjectPool<PooledStringBuilder> ;
        ctor_1297(pool: Roslyn.Utilities.ObjectPool<PooledStringBuilder>): PooledStringBuilder {
            System.Diagnostics.Debug.Assert(pool != null);
            this.pool = pool;
            return this;
        }
        public get Length(): number {
            return this.Builder.Length;
        }
        public Free(): void {
            var builder = this.Builder;
            if (builder.Capacity <= 1024) {
                builder.Clear();
                this.pool.Free(this);
            }
            else {
                this.pool.ForgetTrackedObject(this);
            }
        }
        public ToString(): string {
            return this.Builder.ToString();
        }
        public ToStringAndFree_3093(): string {
            var result: string = this.Builder.ToString();
            this.Free();
            return result;
        }
        public ToStringAndFree_5388(startIndex: number, length: number): string {
            var result: string = this.Builder.ToString(startIndex, length);
            this.Free();
            return result;
        }
        private static PoolInstance: Roslyn.Utilities.ObjectPool<PooledStringBuilder> = PooledStringBuilder.CreatePool();
        public static CreatePool(): Roslyn.Utilities.ObjectPool<PooledStringBuilder> {
            var pool: Roslyn.Utilities.ObjectPool<PooledStringBuilder> = null;
            pool = new Roslyn.Utilities.ObjectPool<PooledStringBuilder>().ctor_5203(() => new PooledStringBuilder().ctor_1297(pool), 32);
            return pool;
        }
        public static GetInstance(): PooledStringBuilder {
            var builder = PooledStringBuilder.PoolInstance.Allocate();
            System.Diagnostics.Debug.Assert(builder.Builder.Length == 0);
            return builder;
        }
        public static op_Implicit_1714(obj: PooledStringBuilder): System.Text.StringBuilder {
            return obj.Builder;
        }
        constructor() { }
    }
}
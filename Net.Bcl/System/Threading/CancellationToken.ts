module System.Threading {
    export class CancellationToken {

        public static Default: CancellationToken = new CancellationToken();
        public static None = new CancellationToken();
        private isCancelled = false;

        public get IsCancellationRequested(): boolean {
            return this.isCancelled;
        }

        public get CanBeCanceled(): boolean {
            return false;
        }

        public ThrowIfCancellationRequested(): void {
            if (this.isCancelled) {
                throw new OperationCanceledException('cancelled');
            }
        }
    }
}
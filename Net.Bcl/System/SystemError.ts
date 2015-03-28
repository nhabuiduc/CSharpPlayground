module System {
    export class SystemError {
        public static ArgumentNull(message: string): void {
            throw new ArgumentNullException(message);
        }

        public static MoreThanOneElement(): void {
            throw new SystemException("More than one element");
        }

        public static MoreThanOneMatch(): void {
            throw new SystemException("More than one matched element");
        }
    }

}
module System.Collections.Immutable {
    // just store the stack free with 0 items
    export class AllocFreeConcurrentStack
    {
        private static MaxSize: number = 35;
        private static t_stack: System.Collections.Generic.Stack<any> = null;
        public static  TryAdd(item: any): void {
            var localStack: System.Collections.Generic.Stack<any> = AllocFreeConcurrentStack.t_stack;
            if (localStack == null) {
                AllocFreeConcurrentStack.t_stack = localStack = new System.Collections.Generic.Stack<any>(AllocFreeConcurrentStack.MaxSize);
            }
            if (localStack.Count < AllocFreeConcurrentStack.MaxSize) {
                localStack.Push(item);
            }
        }
        public static TryTake(item: { refObj: any }): boolean {
            var localStack: System.Collections.Generic.Stack<any> = AllocFreeConcurrentStack.t_stack;
            if (localStack != null && localStack.Count > 0) {
                item.refObj = localStack.Pop().Value;
                return true;
            }
            item.refObj = null;
            return false;
        }
    }
}
/// <reference path="../Generic/Queue.ts"/>
module System.Collections.Concurrent {
    export class ConcurrentQueue<T> extends System.Collections.Generic.Queue<T> {
        public get IsEmpty(): boolean {
            return this.Count == 0;
        }
    }
}
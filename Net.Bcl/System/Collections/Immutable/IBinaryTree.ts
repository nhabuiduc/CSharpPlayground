module System.Collections.Immutable {
    export interface IBinaryTree {
        Height: number;
        IsEmpty: boolean;
        Count: number;
        Left: IBinaryTree;
        Right: IBinaryTree;
    }

}

module System.Collections.Immutable.Generic {
    
    export interface IBinaryTree<T> extends System.Collections.Immutable.IBinaryTree {
        Value: T;
        Left: IBinaryTree<T>;
        Right: IBinaryTree<T>;
    }
}
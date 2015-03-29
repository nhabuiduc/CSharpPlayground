interface VirtualTreeItem {
    $model: TreeItem;
    $children: VirtualTreeItem[];
    $parent: VirtualTreeItem;
    $hasChildren: boolean;
    collapsed: boolean;
}
interface TreeContext {
    nodify(treeItem: TreeItem): VirtualTreeItem;
    nodifyArray(treeItems: TreeItem[]): VirtualTreeItem[];
    collapse($event, node: VirtualTreeItem);
    expand($event, node: VirtualTreeItem);
    selectedNodes: VirtualTreeItem[];
}
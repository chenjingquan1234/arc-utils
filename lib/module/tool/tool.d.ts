declare const _default: {
    /**
     * 获取url上的参数
     * @returns {object}
     */
    getUrlQuery(): Record<string, string>;
    /**
     * 把对象转成url参数，比如 "a=1&b=2"
     * @returns {object}
     */
    objToQueryString(obj: Record<string, any>): string;
    /**
     * 下载文件到电脑
     * @param url // 文件链接
     * @param name // 文件名
     * @returns {*|string}
     */
    downLoadFile(url: string, name: string): void;
    base64ImgPrefix: string;
    /**
     * 获取列表排序序号  1 2 3 4 5...
     * @param index 索引值
     * @param pageNum 当前页码
     * @param pageSize 每页页数 默认10
     */
    getOrdinalKey(index?: number, pageNum?: number, pageSize?: number): number;
    /**
     * 根据id得到name值
     * @param list
     * @param id
     * @returns {*|string}
     */
    findIdName(list: Record<string, any>[], id: string): any;
    /**
     * 根据id得到Item
     * @param list
     * @param id
     * @returns {*|string}
     */
    findIdItem(list: Record<string, any>[], id: string): Record<string, any>;
    /**
     * 拿部门，角色，人员名称
     * @param list
     * @param id
     * @returns {*|string}
     */
    getOrgName(item: Record<string, any>): any;
    /**
     * 根据id得到Item
     * @param obj 对象
     * @param expression 表达式 aa.bb.cc
     * @returns {*|string}
     */
    getValueByExpression(obj: Record<string, any>, expression: string): Record<string, any> | undefined;
    /**
     * 遍历树结构，并对每一项做回调处理
     * @param treeData //树数据，可以是对象或者数组
     * @param callback // 回调函数
     * @param config.children // children名称
     * @param config.additional // 附加的参数
     *
     */
    forEachTree(treeData: any, callback: any, config?: {
        children?: string | undefined;
        additional?: Record<string, any> | undefined;
    } | undefined): void;
    /**
     * 获取树的id映射,浅拷贝来的
     */
    getTreeMap(treeData: any, config?: {
        key?: string | undefined;
        children?: string | undefined;
    } | undefined): Record<string, any>;
    /**
     * 获取树的链路
     */
    getTreeLink(param: {
        treeData: any;
        id: number | string;
        config?: {
            key?: string | undefined;
            children?: string | undefined;
        } | undefined;
    }): any;
    filterTree(tree: any, callback: any): any;
};
export default _default;

import axios from "axios";

/**
 * 获取url上的参数
 * @returns {object}
 */
export function getUrlQuery() {
  const [, query] = location.search.split("?");
  if (!query) return {};
  const queryParams = query.split("&").reduce((p: Record<string, string>, c) => {
    const [key, value] = c.split("=");
    p[key] = value;
    return p;
  }, {});
  return queryParams;
}

/**
 * 把对象转成url参数，比如 "a=1&b=2"
 * @returns {object}
 */
export function objToQueryString(obj: Record<string, any>): string {
  const queryParams = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      queryParams.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return queryParams.join("&");
}

/**
 * 下载文件到电脑
 * @param url // 文件链接
 * @param name // 文件名
 * @returns {*|string}
 */
export function downLoadFile(url: string, name: string) {
  axios(url, {
    responseType: "blob",
  }).then((res) => {
    // { type: 'application/vnd.ms-excel;charset=utf-8' }
    // const blob = new Blob([res.data]);
    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileName = name || "文件";
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  });
}

//拿值相关函数-------------------------------------------------------------

/**
 * 获取列表排序序号  1 2 3 4 5...
 * @param index 索引值
 * @param pageNum 当前页码
 * @param pageSize 每页页数 默认10
 */

export function getOrdinalKey(index = 0, pageNum = 1, pageSize = 10) {
  return pageSize * (pageNum - 1) + index + 1;
}
/**
 * 根据id得到name值
 * @param list
 * @param id
 * @returns {*|string}
 */
export function findIdName(list: Record<string, any>[], id: string) {
  const findItem = list.find((item) => item.id == id);
  return findItem?.name || "-";
}

/**
 * 根据id得到Item
 * @param list
 * @param id
 * @returns {*|string}
 */
export function findIdItem(list: Record<string, any>[], id: string) {
  const findItem = list.find((item) => item.id == id);
  return findItem || {};
}

/**
 * 拿部门，角色，人员名称
 * @param list
 * @param id
 * @returns {*|string}
 */
export function getOrgName(item: Record<string, any>) {
  return item.username || item.deptName || item.roleItem || "";
}
/**
 * 根据id得到Item
 * @param obj 对象
 * @param expression 表达式 aa.bb.cc
 * @returns {*|string}
 */
export function getValueByExpression(obj: Record<string, any>, expression: string) {
  const keys = expression.split(".");
  let value = obj;
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  return value;
}
// 树相关的逻辑 --------------------------------------------------------
/**
 * 遍历树结构，并对每一项做回调处理
 * @param treeData //树数据，可以是对象或者数组
 * @param callback // 回调函数
 * @param config.children // children名称
 * @param config.additional // 附加的参数
 *
 */
export function forEachTree(
  treeData: any,
  callback: any,
  config?: {
    children?: string;
    additional?: Record<string, any>;
  },
) {
  if (!treeData) return;
  const { children = "list", additional = {} } = config || {};

  const loop = (data: any, additional: Record<string, any>) => {
    callback && callback(data, additional);
    if (data[children] && data[children].length) {
      data[children].forEach((item: any) => loop(item, additional));
    }
  };

  const loop2 = (array: Record<string, any>[], additional: Record<string, any>) => {
    if (array.length === 0) return;
    array.forEach((item) => {
      callback && callback(item, additional);
      if (item[children] && item[children].length) {
        loop2(item[children], additional);
      }
    });
  };
  Object.prototype.toString.call(treeData) === "[object Array]" ? loop2(treeData, additional) : loop(treeData, additional);
}

/**
 * 获取树的id映射,浅拷贝来的
 */
export function getTreeMap(
  treeData: any,
  config?: {
    key?: string;
    children?: string;
  },
) {
  const { key = "id", children = "children" } = config || {};
  const treeMap: Record<string, any> = {};
  forEachTree(
    treeData,
    (item: any) => {
      treeMap[item[key]] = item;
    },
    {
      children,
      additional: {},
    },
  );
  return treeMap;
}

/**
 * 获取树的链路
 */
export function getTreeLink(param: {
  treeData: any;
  id: number | string;
  config?: {
    key?: string;
    children?: string;
  };
}) {
  const { treeData, id, config } = param;
  const { key = "id", children = "children" } = config || {};

  function findPath(root: any, targetId: any) {
    // 辅助递归函数
    function findPathHelper(node: any, targetId: any, path: any): any {
      // 如果当前节点为空，则返回空路径
      if (!node) return null;

      // 当前节点匹配目标节点
      if (node[key] === targetId) {
        path.push(node);
        return path;
      }

      // 在子节点中递归查找
      for (const child of node?.children || []) {
        const newPath = findPathHelper(child, targetId, [...path, node]);
        if (newPath) return newPath;
      }

      return null; // 没有找到目标节点
    }
    // 遍历树中的每个节点，调用辅助函数进行查找
    for (const node of root) {
      const path = findPathHelper(node, targetId, []);
      if (path) return path;
    }
  }
  const treeLink = findPath(treeData, id);
  return treeLink;
}

// 过滤树结构的函数
export function filterTree(tree: any, callback: any) {
  // 辅助函数，用于递归过滤
  function filterNode(node: any, callback: any) {
    if (!node) return null;

    // 检查当前节点是否符合条件
    if (callback(node)) {
      // 如果符合条件，则递归过滤子节点
      const filteredChildren = node.children?.map((child: any) => filterNode(child, callback)).filter(Boolean);
      return { id: node.id, ...node, children: filteredChildren };
    } else {
      // 如果不符合条件，则递归过滤子节点并返回空
      return null;
    }
  }

  // 遍历树中的每个节点，调用辅助函数开始过滤
  return tree.map((node: any) => filterNode(node, callback)).filter(Boolean);
}

// TODO 节流
// TODO 防抖
// TODO 防抖
// TODO compose

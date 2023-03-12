export interface TableOptions {
  //表头
  label: string;
  //标识
  prop?: string;
  //每一个单元的宽度
  width?: string | number;
  //每一个单元内容如何排列
  align?: "left" | "center" | "right";
  //自定义列的名称
  slot?: string;
  //是否是操作列
  //   action?: boolean;
  // 是否是操作项
  action?: boolean;
  //是否可以编辑列
  editable?: boolean;
}

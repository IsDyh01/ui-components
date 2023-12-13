//定义菜单的类型
export interface MenuItemType {
  // 导航的图标
  icon?: string;
  // 处理之后的图标
  i?: any;
  // 导航的名字
  title: string;
  // 导航的标识
  index: string;
  // 导航的子菜单
  children?: MenuItemType[];
}

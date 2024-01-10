interface DataType {
  level?: number; // 几级标题 1 2 3
  serial?: string; // 序号
  title: string; // 标题名称
  children?: DataType[]; // 子标题
  id: number;
}

export const handleTreeData = (data: DataType[], serial: string) => {
  data.forEach((item: DataType, index: number) => {
    item.level = serial.split(".").length;
    item.serial = serial + (index + 1);
    if (item.children?.length) {
      handleTreeData(item.children, item.serial + ".");
    }
  });
};

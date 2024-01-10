<template>
  <ui-trees-components :data="data"></ui-trees-components>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue";
interface DataType {
  level?: number; // 几级标题 1 2 3
  serial?: string; // 序号
  title: string; // 标题名称
  children?: DataType[]; // 子标题
  id: number;
}

const data = reactive<DataType[]>([
  {
    id: 1,
    title: "序幕1",
    children: [
      {
        id: 4,
        title: "序幕1.1",
      },
    ],
  },
  {
    id: 2,
    title: "序幕2",
    children: [
      {
        id: 5,
        title: "序幕2.1",
        children: [
          {
            id: 7,
            title: "序幕2.1.1",
          },
          {
            id: 8,
            title: "序幕2.1.2",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "序幕3",
    children: [
      {
        id: 6,
        title: "序幕3.1",
      },
    ],
  },
]);

onMounted(() => {
  handleData(data, 1, "");
});

// 处理树形数据，给一个数据项添加level和serial属性
const handleData = (data: DataType[], level: number, serial: string) => {
  data.forEach((item: DataType, index: number) => {
    item.level = level;
    item.serial = serial + (index + 1);
    if (item.children?.length) {
      handleData(item.children, item.level + 1, item.serial + ".");
    }
  });
};
</script>
<style lang="scss" scoped></style>

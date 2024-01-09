<template>
  <ui-trees-components :data="data"></ui-trees-components>
</template>
<script lang="ts" setup>
interface DataType {
  level: number; // 几级标题 1 2 3
  serial: string; // 序号
  title: string; // 标题名称
  children?: DataType[]; // 子标题
  id: number;
}
const data: DataType[] = [
  {
    id: 1,
    level: 1,
    serial: "1",
    title: "序幕1",
    children: [
      {
        id: 4,
        level: 2,
        serial: "1.1",
        title: "序幕1.1",
      },
    ],
  },
  {
    id: 2,
    level: 1,
    serial: "2",
    title: "序幕2",
    children: [
      {
        id: 5,
        level: 2,
        serial: "2.1",
        title: "序幕2.1",
        children: [
          {
            id: 7,
            level: 3,
            serial: "2.1.1",
            title: "序幕2.1.1",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    level: 1,
    serial: "3",
    title: "序幕3",
    children: [
      {
        id: 6,
        level: 2,
        serial: "3.1",
        title: "序幕3.1",
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>

<template>
  <div class="container">
    <div>
      <span>无限层级菜单</span>
      <ui-recursionMenu
        :data="data2"
        defaultActive="3-1-1-1"
      ></ui-recursionMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
const data1 = [
  { name: "导航1", icon: "document", index: "1" },
  { name: "导航2", icon: "document", index: "2" },
  {
    name: "导航3",
    icon: "document",
    index: "3",
    children: [{ name: "导航3-1", icon: "document", index: "3-1" }],
  },
];

const data2 = [
  { name: "导航1", icon: "Document", index: "1" },
  { name: "导航2", icon: "Document", index: "2" },
  {
    name: "导航3",
    icon: "Document",
    index: "3",
    children: [
      {
        name: "导航3-1",
        icon: "Document",
        index: "3-1",
        children: [
          {
            name: "导航3-1-1",
            icon: "Document",
            index: "3-1-1",
            children: [
              { name: "导航3-1-1-1", icon: "Document", index: "3-1-1-1" },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 900px;
  justify-content: space-between;
}
</style>

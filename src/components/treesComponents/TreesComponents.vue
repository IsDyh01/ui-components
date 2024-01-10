<template>
  <div class="tree-components">
    <div v-for="(item, idx) in data" :key="item.id">
      <div class="item">
        <!-- 一级标题独有得序号展示 -->
        <div
          class="serial"
          :style="{ textIndent: `${(item.level - 1) * 20}px` }"
          v-if="item.level === 1"
        >
          {{ oneLevelToString[idx] }}
        </div>
        <div
          class="serial"
          :style="{ textIndent: `${(item.level! - 1) * 20}px` }"
          v-else
        >
          {{ item.serial }}
        </div>
        <div class="title">{{ item.title }}</div>
        <!-- 增加 | 删除操作 -->
        <div class="action">
          <div class="add" @click="addItem(item)">+</div>
          <div class="delete" @click="deleteItem">-</div>
        </div>
      </div>
      <TreesComponents
        :data="item.children"
        v-if="item.children?.length"
      ></TreesComponents>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TreesComponents from "./TreesComponents.vue";
interface DataType {
  level?: number; // 几级标题 1 2 3
  serial?: string; // 序号
  title: string; // 标题名称
  children?: DataType[]; // 子标题
  id: number;
}
const props = withDefaults(
  defineProps<{
    isDynamic?: boolean; // 是否支持动态增加 | 删除
    data: DataType[]; // 数据项数组
  }>(),
  {
    isDynamic: false,
  }
);

const oneLevelToString: string[] = ["一", "二", "三"];

// 添加数据项，如一级标题点击+是添加一级标题下的二级标题
const addItem = (item: DataType) => {
  item.children?.push({
    id: +Date.now(),
    title: "序幕",
  });
};

const deleteItem = () => {};
</script>
<style lang="scss" scoped>
.tree-components {
  .item {
    display: flex;
    align-items: center;
    .title {
      margin-left: 5px;
    }
    .action {
      display: flex;
      margin-left: 5px;
      .add {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: aqua;
        color: white;
        cursor: pointer;
        margin-right: 5px;
      }
      .delete {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: aqua;
        color: white;
        cursor: pointer;
      }
    }
  }
}
</style>

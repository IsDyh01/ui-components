<template>
  <div id="view-vue">
    <Codemirror
      v-if="props.codeStr"
      v-model="code"
      :extensions="extensions"
      disabled
    ></Codemirror>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { vue as LangVue } from "@codemirror/lang-vue"; // vue专用语言包
import { oneDark } from "@codemirror/theme-one-dark"; // codemirror主题S

const props = defineProps<{
  codeStr: string;
}>();

const code = ref<string>(props.codeStr);

watch(
  () => props.codeStr,
  (newVal) => {
    code.value = newVal;
  }
);

// 扩展codemirror
const extensions = [oneDark, LangVue()];
</script>
<style lang="scss" scoped>
#view-vue {
  height: 100%;
}
:deep(.cm-editor) {
  height: 100%;
  overflow-y: auto;
  border-radius: 5px;
  .cm-scroller {
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
  }
}
</style>

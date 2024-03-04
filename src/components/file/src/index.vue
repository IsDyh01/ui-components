<template>
  <div class="file">
    <div
      ref="fileContainerRef"
      class="file-container"
      @click="fileContainerClick"
    >
      <div class="hidden-input" style="display: none">
        <input ref="hiddenInputRef" type="file" />
      </div>
      <div class="file-icon">
        <SvgIcon icon-name="Document" :size="50"></SvgIcon>
      </div>
      <div class="file-text">请选择文件上传或拖拽上传</div>
    </div>
    <div class="file-list"></div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/SvgIcon.vue";
import { onMounted, ref } from "vue";
const fileContainerRef = ref<HTMLDivElement | null>(null);
const hiddenInputRef = ref<HTMLInputElement | null>(null);
const fileList = ref<File[]>([]);

// const emits = defineEmits<{
//   (e: change, fileList: File[]) => void
// }>()

const change = (list) => {
  console.log(list);
};

const fileContainerClick = () => {
  hiddenInputRef.value!.click();
};

onMounted(() => {
  // 监听input框的change事件
  hiddenInputRef.value!.onchange = () => {
    // console.log(hiddenInputRef.value?.files);
    for (let file of hiddenInputRef.value?.files) {
      // console.log(file);
      fileList.value.push(file);
    }
    console.log(fileList.value);

    // change(fileList.value);
  };
  // 监听拖拽容器的拖拽事件
  // 拖拽目标进入容器事件
  fileContainerRef.value!.ondragenter = (e: Event) => {
    // 阻止默认事件
    e.preventDefault();
  };
  // 拖拽目标离开容器事件
  fileContainerRef.value!.ondragleave = (e: Event) => {
    // 阻止默认事件
    e.preventDefault();
  };
  // 拖拽目标完成拖拽事件
  fileContainerRef.value!.ondrop = async (e) => {
    // 阻止默认事件
    e.preventDefault();
    // 拖拽完成后需要拿到拖拽进去的内容
    // e.dataTransfer?.items是拿到放置进去的DataTransferItem数组，每个item都包含了放置进去的内容信息

    const dataTransferItems = e.dataTransfer.items;
    await getDragFileList(dataTransferItems);
    change(fileList.value);
    // for (let item of e.dataTransfer!.items) {
    //   // console.log(item.getAsFile()); // 获取文件，但是文件夹不能获取到
    //   // console.log(item.webkitGetAsEntry()); // 获取文件或者文件夹的entry对象
    //   const entry = item.webkitGetAsEntry();
    //  readEntry(entry);
    // }
  };
  // 拖拽目标一直覆盖在容器上事件
  fileContainerRef.value!.ondragover = (e: Event) => {
    // 阻止默认事件
    e.preventDefault();
  };

  const getDragFileList = (dataTransferItems) => {
    return new Promise((resolve) => {
      for (let item of dataTransferItems) {
        const entry = item.webkitGetAsEntry();
        readEntry(entry);
      }
      resolve();
    });
  };

  // 读取entrt 文件entry | 文件夹entry
  const readEntry = (entry) => {
    if (entry.isFile) {
      // 文件entry
      entry.file((file) => {
        console.log(file);
        fileList.value.push(file);
      });
    } else {
      // 文件夹entry
      const reader = entry.createReader();
      reader.readEntries((entries) => {
        entries.forEach((item) => {
          readEntry(item);
        });
      });
    }
  };
});
</script>
<style scoped lang="scss">
.file {
  display: flex;
  justify-content: center;
  .file-container {
    width: 80%;
    height: 150px;
    border: 1.5px dotted gray;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    &:hover {
      border: 1.5px dotted blue;
      transition: border 0.3s linear;
    }
    .file-icon {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .file-text {
      width: 100%;
      display: flex;
      justify-content: center;
      color: var(--text-color);
    }
  }
}
</style>

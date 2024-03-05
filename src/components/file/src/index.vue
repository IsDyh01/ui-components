<template>
  <div class="file">
    <div
      ref="fileContainerRef"
      class="file-container"
      @click="fileContainerClick"
    >
      <div class="hidden-input" style="display: none">
        <input ref="hiddenInputRef" type="file" multiple />
      </div>
      <div class="file-icon">
        <SvgIcon icon-name="Document" :size="50"></SvgIcon>
      </div>
      <div class="file-text">请选择文件上传或拖拽上传</div>
    </div>
    <!-- 文件总览 -->
    <div class="file-info">
      <div class="file-count">共{{ fileCount }}个文件</div>
      <div class="file-size">共{{ fileSize }}MB</div>
    </div>
    <!-- 文件列表 -->
    <div class="file-list">
      <div class="list-item" v-for="(item, idx) in fileList" :key="idx">
        <div class="icon">
          <SvgIcon icon-name="Document"></SvgIcon>
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="delete">
          <SvgIcon icon-name="Delete" @click="deleteFile(idx)"></SvgIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/SvgIcon.vue";
import { computed, onMounted, ref } from "vue";
const fileContainerRef = ref<HTMLDivElement | null>(null);
const hiddenInputRef = ref<HTMLInputElement | null>(null);
const fileList = ref<File[]>([]);

// 计算文件的数量
const fileCount = computed(() => {
  return fileList.value.length;
});

// 计算文件的大小单位MB
const fileSize = computed(() => {
  const size = fileList.value.reduce((pre, cur) => {
    return pre + cur.size;
  }, 0);
  return size ? Math.ceil(size / 1024 / 1024) : 0;
});

const emits = defineEmits<{
  (e: "change", fileList: File[]): void;
}>();

// 删除文件图标事件
const deleteFile = (idx: number) => {
  fileList.value.splice(idx, 1);
};

// 点击容器弹出文件选择框
const fileContainerClick = () => {
  hiddenInputRef.value!.click();
};

onMounted(() => {
  // 监听input框的change事件
  hiddenInputRef.value!.onchange = (e: Event) => {
    const files = Array.from(hiddenInputRef.value?.files!);
    files.forEach((item: File) => {
      fileList.value.push(item);
    });
    // 通过父组件的自定义事件向父组件返回文件列表
    emits("change", fileList.value);
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
  fileContainerRef.value!.ondrop = async (e: DragEvent) => {
    // 阻止默认事件
    e.preventDefault();
    // 拖拽完成后需要拿到拖拽进去的内容
    // e.dataTransfer?.items是拿到放置进去的DataTransferItem数组，每个item都包含了放置进去的内容信息

    const dataTransferItems = e.dataTransfer!.items;
    await getDragFileList(dataTransferItems);
    emits("change", fileList.value);
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

  const getDragFileList = (dataTransferItems: DataTransferItemList) => {
    return new Promise<null | undefined>((resolve) => {
      const dataTransferItemsArray = Array.from(dataTransferItems);
      dataTransferItemsArray.forEach((item: DataTransferItem) => {
        const entry = item.webkitGetAsEntry();
        readEntry(entry);
      });
      resolve(undefined);
    });
  };

  // 读取entrt 文件entry | 文件夹entry
  const readEntry = (entry: any) => {
    if (entry.isFile) {
      // 文件entry
      entry.file((file: File) => {
        fileList.value.push(file);
      });
    } else {
      // 文件夹entry
      const reader = entry.createReader();
      reader.readEntries((entries: any) => {
        entries.forEach((item: any) => {
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
  flex-direction: column;
  // justify-content: center;
  align-items: center;
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
  .file-info {
    width: 80%;
    margin-top: 20px;
    display: flex;
    color: var(--text-color);
    .file-count {
      margin-right: 5px;
    }
  }
  .file-list {
    width: 80%;
    height: 300px;
    overflow: auto;
    // background-color: red;
    margin-top: 20px;
    .list-item {
      display: flex;
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      align-items: center;
      .icon {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .name {
        margin-left: 10px;
        flex-grow: 1;
        height: 40px;
        line-height: 40px;
        color: var(--text-color);
      }
      .delete {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

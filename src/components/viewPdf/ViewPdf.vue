import { divide } from 'lodash';
<template>
  <div class="pdf-container">
    <div class="pdf-viewer">
      <div class="pdf-viewer-canvas">
        <canvas id="pdf-canvas" width="100%" height="100%"></canvas>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import * as pdfjs from "pdfjs-dist/build/pdf";
// 导入pdfjs-dist的worker，因为pdf渲染时会进行大量计算因此需要另起一个线程去进行计算
import Worker from "pdfjs-dist/build/pdf.worker.min";
// 设置pdf的线程池
pdfjs.GlobalWorkerOptions.workerSrc = Worker;

onMounted(() => {
  // 获取pdf的document
  pdfjs.getDocument("/党乙豪_前端工程师.pdf").promise.then((doc: any) => {
    console.log(doc);
  });
});
</script>
<style lang="scss" scoped>
.pdf-container {
  height: 100%;
}
</style>

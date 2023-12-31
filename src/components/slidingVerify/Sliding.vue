<template>
  <div class="slidingWrap" ref="slidingWrap">
    <!-- 画布区域 -->
    <div
      class="canvasArea"
      :style="{ width: `${containerWidth}px`, height: `${containerHeight}px` }"
      v-loading="isLoading"
      element-loading-text="加载中..."
    >
      <!-- 主要渲染整体背景及镂空图案 -->
      <canvas
        class="canvas-bg"
        :width="containerWidth"
        :height="containerHeight"
        ref="containerCanvas"
      ></canvas>
      <canvas
        class="block"
        :height="containerHeight"
        :style="{ left: `${blockLeft}px` }"
        ref="blockCanvas"
      ></canvas>
      <!-- 刷新按钮 -->
      <div class="refresh" @click="onRefreshBtnClick">
        <SvgIcon icon-name="Refresh" :size="20"></SvgIcon>
      </div>
    </div>
    <!-- 底部滑块 -->
    <div
      :class="['sliderWrap', status]"
      :style="{ width: `${containerWidth}px` }"
      @mouseleave="handleDrapUp"
      @mousemove="handleDragMove"
    >
      <div
        class="progress"
        :style="{
          width: `${blockLeft}px`,
        }"
      ></div>
      <div
        class="slider-block"
        ref="slider"
        :style="{ left: `${blockLeft}px` }"
        @mousedown="handleDrapDown"
        @mouseup="handleDrapUp"
      >
        &rarr;
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import SvgIcon from "../svgIcon/SvgIcon.vue";

const props = withDefaults(
  defineProps<{
    // 容器canvas宽度
    containerWidth?: number;
    // 容器canvas高度
    containerHeight?: number;
    // 滑块的宽度
    slidingBlockWidth?: number;
    // 滑块中圆的半径
    slidingBlockRadius?: number;
    // 验证容错值
    faultTolerant?: number;
    // 验证成功的回调
    onSuccess: () => void;
    // 验证失败的回调
    onError: () => void;
  }>(),
  {
    containerHeight: 300,
    containerWidth: 300,
    slidingBlockRadius: 9,
    slidingBlockWidth: 42,
    faultTolerant: 5,
  }
);

const containerCanvas = ref<HTMLCanvasElement>(); // 容器canvas实例
const containerCtx = ref<CanvasRenderingContext2D>();
const blockCanvas = ref<HTMLCanvasElement>(); // 滑块canvas实例
const blockCtx = ref<CanvasRenderingContext2D>();

const blockLeft = ref<number>(0);

const initBlockLeft = ref<number>(0);

const status = ref<string>("");

const isLoading = ref<boolean>(true); // 等待图片加载成功

const startDrag = ref<boolean>(false); // 是否开始拖拉滑块

const disabledToClickBlockCanvas = ref<boolean>(false); // false可以点击

onMounted(() => {
  containerCtx.value = containerCanvas.value?.getContext("2d")!;
  blockCtx.value = blockCanvas.value?.getContext("2d", {
    willReadFrequently: true,
  })!;
  initCanvas();

  initBlockLeft.value = blockCanvas.value?.getBoundingClientRect().left!;
});

const initCanvas = () => {
  // 每次需要重新设置滑块canvas的宽度否则刷新时，因为宽度不够所以剪裁时都是空的
  blockCanvas.value!.width = props.containerWidth;
  const image = new Image();
  // 使用picsum动态生成随机图片，加上时间戳避免重复生成图片
  image.src = `https://picsum.photos/${props.containerWidth}/${
    props.containerHeight
  }?time=${+new Date()}`;

  // 解决跨域否则在获取imageData时会报错
  image.crossOrigin = "";
  image.onload = function () {
    // 关闭加载状态
    isLoading.value = false;

    // 可以点击滑块进行移动
    disabledToClickBlockCanvas.value = false;

    containerCtx.value?.drawImage(
      image,
      0,
      0,
      props.containerWidth,
      props.containerHeight
    );
    blockCtx.value?.drawImage(
      image,
      0,
      0,
      props.containerWidth,
      props.containerHeight
    );

    // 获取滑块的imageData(像素对象)
    const imageData = blockCtx.value?.getImageData(
      150,
      150 - props.slidingBlockRadius * 2,
      props.slidingBlockWidth + props.slidingBlockRadius * 2,
      props.slidingBlockWidth + props.slidingBlockRadius * 2
    );

    blockCtx.value?.restore();
    // 改变blockCanvas的宽度，使其跟滑块的宽度一致
    blockCanvas.value!.width =
      props.slidingBlockWidth + props.slidingBlockRadius * 2;

    // 将滑块的imageData重新绘制到blockCanvas中
    blockCtx.value?.putImageData(
      imageData!,
      0,
      150 - props.slidingBlockRadius * 2
    );
  };
  // 传递fill参数 再容器上绘制滑块遮罩层
  drawPath(
    150,
    150,
    props.slidingBlockWidth,
    props.slidingBlockRadius,
    containerCtx.value!,
    "fill"
  );
  blockCtx.value?.save();
  drawPath(
    150,
    150,
    props.slidingBlockWidth,
    props.slidingBlockRadius,
    blockCtx.value!,
    "clip"
  );
};

const handleDrapUp = () => {
  // 通过随机生成滑块的位置x-滑块移动的位置的绝对值进行判断
  if (!startDrag.value) return;
  const val = Math.abs(150 - blockLeft.value);
  // 判断差值是否超过容错值
  if (val > props.faultTolerant) {
    status.value = "fail";
    props.onError();
  } else {
    status.value = "success";
    props.onSuccess();
  }
  // 关闭拖拽
  startDrag.value = false;
  setTimeout(() => {
    onRefreshBtnClick();
  }, 1000);
};

const handleDragMove = (e: MouseEvent) => {
  if (isLoading.value) return;
  if (!startDrag.value) return;
  // 碰撞检测，如果到达滑动区域的边界返回
  if (
    e.clientX -
      initBlockLeft.value +
      blockCanvas.value!.width -
      2 * props.slidingBlockRadius >=
    containerCanvas.value!.width
  )
    return;
  blockLeft.value = e.clientX - initBlockLeft.value;
};

// 鼠标按下滑块
const handleDrapDown = () => {
  if (disabledToClickBlockCanvas.value) return;
  // 还在加载中不能点击滑块
  if (isLoading.value) return;
  // 还在拖拽中不能点击滑块
  if (startDrag.value) return;
  status.value = "wait";
  startDrag.value = true;
  disabledToClickBlockCanvas.value = true;
};

const onRefreshBtnClick = () => {
  status.value = "";
  blockLeft.value = 0;
  containerCtx.value?.clearRect(
    0,
    0,
    containerCanvas.value!.width,
    containerCanvas.value!.height
  );
  blockCtx.value?.clearRect(
    0,
    0,
    blockCanvas.value!.width,
    blockCanvas.value!.height
  );
  isLoading.value = true;
  initCanvas();
};

// 绘制遮罩层 & 滑块
/**
 *
 * @param x 画布上绘制滑块的x起始坐标
 * @param y 画布上绘制滑块的y起始坐标
 * @param l 绘制滑块的宽度
 * @param r 绘制滑块中包含的圆弧的半径
 * @param ctx canvas上下文
 * @param operation fill代表绘制滑块遮罩层 clip代表绘制滑块
 */
const drawPath = (
  x: number,
  y: number,
  l: number,
  r: number,
  ctx: CanvasRenderingContext2D,
  operation: string
) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * Math.PI, 2.78 * Math.PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  // anticlockwise为一个布尔值。为true时，是逆时针方向，否则顺时针方向
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.stroke();
  ctx.globalCompositeOperation = "destination-over";
  // 判断是填充还是裁切, 裁切主要用于生成图案滑块
  operation === "fill" ? ctx.fill() : ctx.clip();
};
</script>
<style scoped lang="scss">
.canvasArea {
  position: relative;
}
.block {
  position: absolute;
}
.sliderWrap {
  height: 40px;
  box-sizing: border-box;
  margin-top: 5px;
  background-color: #efefef;
  border: 1px solid #cbcbcb;
}
.sliderWrap .slider-block {
  width: 40px;
  height: 100%;
  box-shadow: 0 0 5px rgb(209, 209, 209);
  background-color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.sliderWrap .progress {
  position: absolute;
  box-sizing: border-box;
  height: 40px;
}
/* 不同状态显示不同的颜色 */
.wait .progress {
  background-color: #c7defb;
  border: 1px solid #3554cb;
}
.wait .slider-block {
  background-color: #3554cb;
  border: 1px solid #3554cb;
  color: #fff;
}
.fail .progress {
  background-color: #f9d8d6;
  border: 1px solid #ef636a;
}
.fail .slider-block {
  border: 1px solid #ef636a;
  background-color: #ef636a;
  color: #fff;
}
.success .progress {
  background-color: #d2f1eb;
  border: 1px solid #3e8f44;
}
.success .slider-block {
  border: 1px solid #3e8f44;
  background-color: #3e8f44;
  color: #fff;
}
.refresh {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  // background-image: url("https://gitee.com/wanglu001/pic/raw/master/images/20211009194104.png");
  // background-size: 100% 100%;
}
.loading {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  color: #303030;
  font-size: 14px;
  border: 1px solid rgb(209, 209, 209);
}
.loading img {
  width: 40px;
  height: 40px;
  display: block;
  margin: 30px auto;
  margin-bottom: 15px;
}
</style>

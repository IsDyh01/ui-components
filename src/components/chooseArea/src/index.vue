<template>
  <div>
    <!-- v-model 的值为当前被选中的 el-option 的 value 属性值 -->
    <el-select v-model="province" placeholder="请选择省份" clearable>
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      v-model="city"
      :disabled="!province"
      placeholder="请选择城市"
      class="city"
      clearable
    >
      <el-option
        v-for="item in cities"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      v-model="area"
      :disabled="!province || !city"
      placeholder="请选择区域"
      clearable
    >
      <el-option
        v-for="item in cityToArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import allAreas from "./lib/pca-code.json";

const emit = defineEmits(["change"]);

//省份 --> 拿到的是省份对应的code(编码)
const province = ref("");
//城市 --> 拿到的是城市对应的code(编码)
const city = ref("");
//区域 --> 拿到的是区域对应的code(编码)
const area = ref("");
//所有的数据
const areas = ref(allAreas);
//选中的某一个省份对应的城市数据,用计算属性目的是为了响应不同的省份的变化(用watch会好点)
const cities: any = ref([]);
//选中某一个城市要对应他的区域
const cityToArea: any = ref([]);

watch(
  () => province.value,
  (val) => {
    if (val) {
      const provinceItem = areas.value.find((item) => {
        return item.code === val;
      });

      cities.value = provinceItem?.children;
    }
    //省份改变需要先清空后边两个下拉框的值
    city.value = "";
    area.value = "";
  }
);

watch(
  () => city.value,
  (val) => {
    if (val) {
      const cityItem = cities.value?.find((item: any) => {
        return item.code === val;
      });
      cityToArea.value = cityItem?.children;
    }
    //城市改变需要清空区域下拉框的值
    area.value = "";
  }
);

//监听area的变化，当area有值时就给父组件颁发事件，将地区信息传递过去
watch(
  () => area.value,
  (val) => {
    if (val) {
      const provinceDate = {
        code: province.value,
        name: areas.value.find((item) => item.code === province.value)?.name,
      };
      const cityData = {
        code: city.value,
        name: cities.value.find((item: any) => item.code === city.value).name,
      };
      const areaData = {
        code: area.value,
        name: cityToArea.value.find((item: any) => item.code === val).name,
      };

      emit("change", {
        province: provinceDate,
        city: cityData,
        area: areaData,
      });
    }
  }
);

//选中的某一个省份对应的城市数据,用计算属性目的是为了响应不同的省份的变化(用watch会好点)
// const cities = computed(() => {
//     city.value = "";
//     area.value = "";
//   if (!province.value) {
//     return [];
//   } else {

//     const provinceItem = areas.value.find((item) => {
//       return item.code === province.value;
//     });
//     return provinceItem?.children;
//   }
// });

// const cityToArea = computed(() => {
//     area.value = "";
//   if (!province.value || !city.value) {
//     return [];
//   } else {

//     const cityItem = cities.value?.find((item) => {
//       return item.code === city.value;
//     });
//     return cityItem?.children;
//   }
// });
</script>

<style scoped lang="scss">
.city {
  margin: 0 10px;
}
</style>

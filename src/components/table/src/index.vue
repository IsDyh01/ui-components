<template>
  <div class="ui_table">
    <el-table
      @row-click="rowClick"
      :data="tableData"
      v-loading="isLoading"
      :element-loading-text="elementLoadingText"
      :element-loading-spinner="elementLoadingSpinner"
      :element-loading-background="elementLoadingBackground"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in tableOption" :key="index">
        <el-table-column
          v-if="!item.action"
          :label="item.label"
          :prop="item.prop"
          :align="item.align"
        >
          <template #default="scope">
            <!-- 如果该行的rowEdit属性为true，则显示编辑 -->
            <template v-if="scope.row.rowEdit">
              <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
            </template>
            <template v-else>
              <template v-if="currntEdit === scope.$index + scope.column.id">
                <div style="display: flex; align-items: center">
                  <el-input
                    v-model="scope.row[item.prop!]"
                    size="small"
                  ></el-input>
                  <div class="icons">
                    <el-icon-check
                      class="check"
                      @click.stop="checkClick(scope)"
                    ></el-icon-check>
                    <el-icon-close
                      class="close"
                      @click.stop="closeClick(scope)"
                    ></el-icon-close>
                  </div>
                </div>
              </template>
              <template v-else>
                <div style="display: flex; align-items: center">
                  <!-- 如果设置了自定义列就展示自定义列 -->
                  <slot
                    v-if="item.slot"
                    :name="item.slot"
                    :scope="scope"
                  ></slot>

                  <!-- 如果没有设置自定义列就展示表格的数据 -->
                  <span v-else>{{ scope.row[item.prop!] }}</span>

                  <el-icon-edit
                    class="editIcon"
                    v-if="item.editable"
                    @click.stop="editClick(scope)"
                  ></el-icon-edit>
                </div>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="actionOption !== undefined"
        :label="actionOption!.label"
        :width="actionOption!.width"
        :align="actionOption!.align"
      >
        <template #default="scope">
          <!-- 如果点击了编辑，那么就需要将编辑按钮换为确认取消按钮 -->
          <slot
            name="editAction"
            :scope="scope"
            v-if="scope.row.rowEdit"
          ></slot>
          <slot name="action" :scope="scope" v-else></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格的分页处理 -->
    <div class="pagination" v-if="isPagination">
      <el-pagination
        v-model:current-page="cloneCurrentPage"
        v-model:page-size="clonePageSize"
        :page-sizes="pageSizes"
        :disabled="disabled"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import { TableOptions } from "./types/types";
import { computed } from "vue";
import cloneDeep from "lodash/cloneDeep";

//是否禁用分页
const disabled = ref(false);

const emits = defineEmits([
  "confirm",
  "confirmRow",
  "sizeChange",
  "currentPageChange",
]);

const props = defineProps({
  // 表格配置项
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  //加载文案
  elementLoadingText: {
    type: String,
    default: "",
  },
  //自定义加载图标名字
  elementLoadingSpinner: {
    type: String,
  },
  //自定义加载背景
  elementLoadingBackground: {
    type: String,
  },
  //是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  //点击的是什么操作，编辑或者删除
  clickOperate: {
    type: String,
  },
  //当前的页数
  currentPage: {
    type: Number,
    default: 1,
  },
  //一页多少数据
  pageSize: {
    type: Number,
    default: 10,
  },
  //数据总数
  total: {
    type: Number,
  },
  //分页器的分页选项
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 30];
    },
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
});

//克隆父组件传递的currentPage和pageSize
const cloneCurrentPage = ref(props.currentPage);
const clonePageSize = ref(props.pageSize);

const handleSizeChange = (val: number) => {
  //当每页的大小发生改变时,给父组件分发事件
  emits("sizeChange", val);
};

const handleCurrentChange = (val: number) => {
  //当前页数发生改变时,给父组件分发事件
  emits("currentPageChange", val);
};

// 过滤操作项之后的配置
let tableOption = computed(() => props.options.filter((item) => !item.action));
// 操作项,如果父组件没有操作项，这个值就是undefined，因此需要再上边处理操作箱item时需要先加个判断
let actionOption = computed(() => props.options.find((item) => item.action));

//加载表格
const isLoading = computed(() => {
  return !(props.data && (props.data as any).length);
});

//当前要编辑的单元格的标识，一次只能编辑一个单元格
const currntEdit = ref("");

//点击编辑图标
const editClick = (scope: any) => {
  currntEdit.value = scope.$index + scope.column.id;
};

//点击编辑图标后出现的勾图标
const checkClick = (scope: any) => {
  //重置当前编辑的单元格值
  currntEdit.value = "";
  //通知父组件要确认更改表格的数据
  emits("confirm", scope);
};
//点击编辑图标后出现的叉图标
const closeClick = (scope: any) => {
  //重置当前编辑的单元格值
  currntEdit.value = "";
};

//拷贝父组件传来的数据，避免修改父组件的数据
const tableData = ref(cloneDeep(props.data));
const clickOperate = ref(props.clickOperate);

watch(
  () => props.clickOperate,
  (val) => {
    clickOperate.value = val;
  }
);

watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      item.rowEdit = false;
    });
  }
);

onMounted(() => {
  let i = 0;
  //先给拷贝的数据添加是编辑行状态的属性，默认每行都是不编辑状态
  tableData.value.map((item) => {
    item.rowEdit = false;
    item.id = i;
    i++;
  });
});

//点击表格的某一行
const rowClick = (row: any, col: any) => {
  //判断点击的是否是操作项那一列
  if (col.label === actionOption.value!.label) {
    if (props.isEditRow && clickOperate.value === "edit") {
      console.log(row);

      //只有当isEditRow为true(父组件设置了可编辑行状态)，并且父组件点击的操作按钮为编辑按钮才可以编辑
      console.log("点击了操作项");
      //先将表格数据所有的编辑行状态属性rowEdit变为false

      tableData.value.forEach((item) => {
        if (item.id !== row.id) {
          item.rowEdit = false;
        }
      });
      //然后给点击的那一行的编辑行状态属性rowEdit变为true，这样就每次只能有一行是处于编辑状态的
      row.rowEdit = !row.rowEdit;
    }
    if (props.isEditRow && clickOperate.value === "confirmRow") {
      //点击确定按钮
      tableData.value.forEach((item) => {
        item.rowEdit = false;
      });
      //给父组件发送事件
      emits("confirmRow", row);
    }
    if (props.isEditRow && clickOperate.value === "cancelRow") {
      //点击取消按钮
      //将表格数据中所有编辑状态变为false
      tableData.value.forEach((item) => {
        item.rowEdit = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
svg {
  width: 1em;
  height: 1em;
}

.editIcon {
  position: relative;
  left: 10px;
  // top: 2px;
}
.icons {
  display: flex;
  margin-left: 5px;
  .check {
    cursor: pointer;
    color: green;
  }
  .close {
    cursor: pointer;
    color: red;
    margin-left: 5px;
  }
}

.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
</style>

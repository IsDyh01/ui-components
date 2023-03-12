<template>
  <div class="br">基础表格</div>
  <ui-table :options="options1" :data="tableData1"></ui-table>

  <div class="br">自定义列表格</div>
  <ui-table :options="options2" :data="tableData1">
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scope }">
      <el-button type="primary" size="small" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button type="danger" size="small" @click="deleted(scope)"
        >删除</el-button
      >
    </template>
  </ui-table>

  <div class="br">带加载效果的表格</div>
  <ui-table
    :options="options1"
    :data="tableData2"
    elementLoadingText="加载中..."
  ></ui-table>

  <div class="br">可编辑表格</div>
  <ui-table
    :options="options3"
    :data="tableData4"
    @confirm="confirm"
    @confirmRow="confirmRow"
    isEditRow
    :clickOperate="clickOperate"
  >
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scope }">
      <el-button type="primary" size="small" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button type="danger" size="small" @click="deleted(scope)"
        >删除</el-button
      >
    </template>
    <template #editAction="{ scope }">
      <el-button type="primary" size="small" @click="confirmRowEdit(scope)"
        >确认</el-button
      >
      <el-button type="danger" size="small" @click="cancelRowEdit(scope)"
        >取消</el-button
      >
    </template>
  </ui-table>

  <div class="br">带分页器表格</div>
  <ui-table
    :options="options3"
    :data="tableData5"
    @confirm="confirm"
    @confirmRow="confirmRow"
    isEditRow
    :clickOperate="clickOperate"
    :total="total"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :isPagination="true"
    @currentPageChange="currentPageChange"
    @sizeChange="sizeChange"
  >
    <template #name="{ scope }">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{ scope }">
      <el-button type="primary" size="small" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button type="danger" size="small" @click="deleted(scope)"
        >删除</el-button
      >
    </template>
    <template #editAction="{ scope }">
      <el-button type="primary" size="small" @click="confirmRowEdit(scope)"
        >确认</el-button
      >
      <el-button type="danger" size="small" @click="cancelRowEdit(scope)"
        >取消</el-button
      >
    </template>
  </ui-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TableOptions } from "../../components/table/src/types/types";
import axios from "axios";

const options1: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "left",
  },
  {
    label: "姓名",
    prop: "name",
    align: "left",
  },
  {
    label: "地址",
    prop: "address",
    align: "left",
  },
];

//自定义列配置
const options2: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "left",
  },
  {
    label: "姓名",
    prop: "name",
    align: "left",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "left",
  },
  {
    label: "操作",
    align: "left",
    slot: "action",
    action: true,
  },
];

const tableData1 = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

//延迟3s给表格数据赋值
const tableData2 = ref<any>([]);
setTimeout(() => {
  tableData2.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
}, 3000);

//可编辑列
const options3: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "left",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    align: "left",
    slot: "name",
  },
  {
    label: "地址",
    prop: "address",
    align: "left",
    editable: true,
  },
  {
    label: "操作",
    align: "left",
    slot: "action",
    action: true,
  },
];

if (!localStorage.getItem("tableData3")) {
  localStorage.setItem(
    "tableData3",
    JSON.stringify([
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ])
  );
}

//可编辑列中数据先做成响应式(便于更改)
const tableData3 = JSON.parse(localStorage.getItem("tableData3") as any);
const tableData4 = ref(tableData3);
//点击编辑之后再点击确认编辑(列)
const confirm = (scope: any) => {
  //应该通知服务器修改数据,然后再重新获取表格数据，这里直接更改
  const index = scope.$index;
  const keys = Object.keys(tableData4.value[index]);

  keys.forEach((key) => {
    tableData3[index][key] = scope.row[key];
    tableData4.value[index][key] = scope.row[key];
  });

  localStorage.setItem("tableData3", JSON.stringify(tableData3));
};

//点击的操作，是编辑还是删除
const clickOperate = ref("");

//子组件点击确定后可以拿到行编辑后的信息
const confirmRow = (row: any) => {
  //点击确定后,应该发给服务器改变数据
  console.log(row);
};

//编辑行的编辑按钮
const edit = (scope: any) => {
  //给子组件传递过去点击的是编辑行的按钮
  clickOperate.value = "edit";
};
//编辑行的删除按钮
const deleted = (scope: any) => {
  console.log("删除表格改行");
};
//点击编辑后的确认按钮
const confirmRowEdit = (scope: any) => {
  clickOperate.value = "confirmRow";
};

//点击编辑后的取消按钮
const cancelRowEdit = (scope: any) => {
  clickOperate.value = "cancelRow";
};

/**
 * 分页器相关逻辑与数据
 */

const tableData5 = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const getData = () => {
  axios
    .post("/api/list", {
      current: currentPage.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      if (res.data.code === "200") {
        tableData5.value = res.data.data.rows;
        total.value = res.data.data.total;
        console.log(res.data.data);
      }
    });
};
onMounted(() => {
  getData();
});

const currentPageChange = (val: number) => {
  currentPage.value = val;
  getData();
};

const sizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};
</script>

<style scoped lang="scss">
.br {
  margin-top: 20px;
  margin-left: 400px;
}
</style>

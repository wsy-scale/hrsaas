<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构的内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置头部内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置一个el-tree -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @addDepts="addDepts"
            @delDepts="getDepartments"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
      <add-dept
        ref="addDept"
        :showDialog.sync="showDialog"
        :treeNode="node"
        @addDepts="getDepartments"
      />
    </div>
  </div>
</template>

<script>
import TreeTools from "./component/tree-tools.vue";
import addDept from "./component/add-dept.vue";

import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";

export default {
  components: {
    TreeTools,
    addDept,
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: "name",
      },
      showDialog: false, //默认不显示
      node: null, //记录当前点击的node节点
    };
  },
  created() {
    this.getDepartments(); //调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      this.departs = tranListToTreeData(result.depts, ""); // 需要将其转化成树形结构
      console.log(result);
    },
    addDepts(node) {
      this.showDialog = true; //显示弹层
      this.node = node;
    },
    editDepts(node) {
      this.showDialog = true; //显示弹层
      this.node = node;
      this.$refs.addDept.getDepartDetail(node.id); // 直接调用子组件中的方法 传入一个id
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
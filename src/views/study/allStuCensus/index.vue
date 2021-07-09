<!-- 全校学生考勤统计 -->
<!-- author: 张小辉 -->
<template>
  <div class="app-content">
    <search @updateSearch="updateSearch"></search>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="{
        height: '40px',
        color: '#fff',
        background: '#30B08F',
        padding: '0px',
        fontWeight: 'bold',
        fontSize: '14px'
      }"
    >
      <el-table-column
        prop="date"
        label="学号"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="name"
        label="姓名"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="address"
        label="学院"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="address"
        label="班级"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="address"
        label="年级"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column prop="address" label="旷课次数" min-width="100" />
      <el-table-column prop="address" label="迟到次数" min-width="100" />
      <el-table-column prop="address" label="早退次数" min-width="100" />
      <el-table-column prop="address" label="请假次数" min-width="100" />
      <el-table-column prop="address" label="正常次数" min-width="100" />
      <el-table-column prop="address" label="旷课课时" min-width="100" />
    </el-table>
  </div>
</template>

<script>
import api from "@/api/study/allStuCensus";
import search from "@/components/search.vue";
export default {
  name: "",
  components: { search },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市"
        }
      ],
      screen: {
        date: "", // 日期
        college: "", // 学院
        stuNo: "", // 学号
        calss: "", // 班级
        grade: "" // 年级
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList();
  },
  methods: {
    // 更新搜索项
    updateSearch(data) {
      this.screen = data;
      this.getList();
    },
    getList() {
      api
        .getList({
          pageSize: "15",
          startDate: this.screen.date[0],
          endDate: this.screen.date[1]
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>

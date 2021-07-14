<!-- 全校学生考勤统计 -->
<!-- author: 张小辉 -->
<template>
  <div v-loading="loading" class="app-content">
    <search
      college="true"
      grade="true"
      stu="true"
      classno="true"
      exportshow="true"
      @updateSearch="updateSearch"
      @exportList="exportList"
    ></search>
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
        prop="userId"
        label="学号"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="name"
        label="姓名"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="unitName"
        label="学院"
        show-overflow-tooltip
        min-width="120"
      />
      <el-table-column
        prop="classNo"
        label="班级"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="grade"
        label="年级"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column prop="absentCount" label="旷课次数" min-width="60" />
      <el-table-column prop="lateCount" label="迟到次数" min-width="60" />
      <el-table-column
        prop="absentLeaveCount"
        label="早退次数"
        min-width="60"
      />
      <el-table-column prop="leaveCount" label="请假次数" min-width="60" />
      <el-table-column prop="rightCount" label="正常次数" min-width="60" />
      <el-table-column prop="absentTimeCount" label="旷课课时" min-width="60" />
    </el-table>
    <el-pagination
      class="page_button"
      background
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
      :page-sizes="[10, 15, 20, 50, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from "@/api/study/allStuCensus";
import { downLoadFile } from "@/utils/file";
import search from "@/components/search.vue";
export default {
  name: "",
  components: { search },
  data() {
    return {
      loading: false,
      tableData: [],
      screen: {
        date: "", // 日期
        college: "", // 学院
        stuNo: "", // 学号
        class: "", // 班级
        grade: "", // 年级
        workTime: "", // 考勤时间
        status: "", // 考勤状态
        courseId: "", // 课程号
        mode: "" // 模式
      },
      total: 0,
      pageNum: 1,
      pageSize: 15
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 更新搜索项
    updateSearch(data) {
      this.screen = data;
      this.getList();
    },
    getList() {
      this.loading = true;
      api
        .getList({
          unitCode: this.screen.college || undefined,
          classNo: this.screen.class || undefined,
          grade: this.screen.grade || undefined,
          studentId: this.screen.stuNo || undefined,
          startDate: this.screen.date[0] || undefined,
          endDate: this.screen.date[1] || undefined,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.list;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    exportList() {
      api
        .exportList({
          unitCode: this.screen.college || undefined,
          classNo: this.screen.class || undefined,
          grade: this.screen.grade || undefined,
          studentId: this.screen.stuNo || undefined,
          startDate: this.screen.date[0] || undefined,
          endDate: this.screen.date[1] || undefined,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          downLoadFile(res);
        });
    },
    handleSizeChange(e) {
      this.pageSize = e;
      this.getList();
    },
    handleCurrentChange(e) {
      this.pageNum = e;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped></style>

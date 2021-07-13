<!-- 全校学生课程考勤明细 -->
<!-- author: 张小辉 -->
<template>
  <div v-loading="loading" class="app-content">
    <search college="true" work="true" @updateSearch="updateSearch" @exportList="exportList"></search>
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
        prop="studentId"
        label="学号"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="studentName"
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
        prop="courseName"
        label="课程"
        show-overflow-tooltip
        min-width="100"
      />
      <el-table-column
        prop="classRoom"
        label="班级"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="classRoom"
        label="旷课次数"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="classRoom"
        label="早退次数"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="classRoom"
        label="请假次数"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="classRoom"
        label="正常次数"
        show-overflow-tooltip
        min-width="80"
      />
      <el-table-column
        prop="classRoom"
        label="旷课学时预警"
        show-overflow-tooltip
        min-width="80"
      />
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
import mixin from "@/mixins/checkWork";
import api from "@/api/study/allStuLessonDetail";
import { downLoadFile } from "@/utils/file";
import search from "@/components/search.vue";
export default {
  name: "",
  components: { search },
  mixins: [mixin],
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
          courseId: this.screen.courseId || undefined,
          checkInStatus: this.screen.status || undefined,
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
          courseId: this.screen.courseId || undefined,
          checkInStatus: this.screen.status || undefined,
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

<!-- 搜索组件 -->
<!-- author: 张小辉 -->
<template>
  <div class="vue_screen al-cen f-wrap">
    <el-date-picker
      v-model="screen.date"
      type="daterange"
      align="left"
      unlink-panels
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      value-format="yyyy-MM-dd"
      :clearable="false"
      style="margin:0 10px 20px 0"
    >
    </el-date-picker>
    <el-select v-if="college" v-model="screen.college" clearable placeholder="请选择学院" style="margin:0 10px 20px 0">
      <el-option
        v-for="item in options"
        :key="item.UNITCODE"
        :label="item.UNITNAME"
        :value="item.UNITCODE"
      >
      </el-option>
    </el-select>
    <el-input v-if="stu" v-model="screen.stuNo" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">学号</template>
    </el-input>
    <el-input v-if="classno" v-model="screen.class" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">班级</template>
    </el-input>
    <el-input v-if="grade" v-model="screen.grade" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">年级</template>
    </el-input>
    <el-input v-if="lesson" v-model="screen.courseId" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">课程号</template>
    </el-input>
    <el-input v-if="teach" v-model="screen.courseId" clearable placeholder="请输入内容" style="max-width:300px;margin:0 10px 20px 0">
      <template slot="prepend">任课教师学工号</template>
    </el-input>
    <el-select v-if="work" v-model="screen.status" clearable placeholder="考勤状态" style="margin:0 10px 20px 0">
      <el-option
        v-for="item in workOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-search" size="mini" class="filter-item" style="margin:0 10px 20px 0" @click="refreshData()">查询</el-button>
    <el-button type="warning" icon="el-icon-refresh-left" size="mini" style="margin:0 10px 20px 0" @click="resetInfo()">重置</el-button>
    <el-button v-if="exportshow" type="success" icon="el-icon-download" size="mini" style="margin:0 0 20px 0" @click="exportList()">导出</el-button>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  props: {
    college: {
      type: String,
      default: ''
    },
    stu: {
      type: String,
      default: ''
    },
    grade: {
      type: String,
      default: ''
    },
    classno: {
      type: String,
      default: ''
    },
    work: {
      type: String,
      default: ''
    },
    teach: {
      type: String,
      default: ''
    },
    lesson: {
      type: String,
      default: ''
    },
    exportshow: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
      options: [],
      workOptions: [
        {
          label: '旷课',
          value: '0'
        },
        {
          label: '请假',
          value: '1'
        },
        {
          label: '迟到',
          value: '2'
        },
        {
          label: '已到',
          value: '3'
        },
        {
          label: '早退',
          value: '4'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getTime()
    this._getCollege()
  },
  methods: {
    // 刷新接口
    refreshData() {
      this.$emit('updateSearch', this.screen)
    },
    // 导出列表
    exportList() {
      this.$emit('exportList')
    },
    // 获取最近一个月时间
    getTime() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.screen.date = [this.$moment(start).format("YYYY-MM-DD"), this.$moment(end).format("YYYY-MM-DD")]
      this.refreshData()
    },
    // 获取学院列表
    _getCollege() {
      api.getCollege().then(res => {
        this.options = res || []
      })
    },
    // 重置
    resetInfo() {
      this.screen = {
        date: "", // 日期
        college: "", // 学院
        stuNo: "", // 学号
        class: "", // 班级
        grade: "" // 年级
      }
      this.getTime()
      this.refreshData()
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

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
      style="margin:0 10px 20px 0"
    >
    </el-date-picker>
    <el-select v-model="screen.college" clearable placeholder="请选择学院" style="margin:0 10px 20px 0">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input v-model="screen.stuNo" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">学号</template>
    </el-input>
    <el-input v-model="screen.class" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">班级</template>
    </el-input>
    <el-input v-model="screen.grade" clearable placeholder="请输入内容" style="max-width:230px;margin:0 10px 20px 0">
      <template slot="prepend">年级</template>
    </el-input>
    <el-button type="primary" icon="el-icon-search" size="mini" class="filter-item" style="margin:0 10px 20px 0" @click="refreshData()">查询</el-button>
    <el-button type="warning" icon="el-icon-refresh-left" size="mini" style="margin:0 10px 20px 0" @click="resetInfo()">重置</el-button>
    <el-button type="success" icon="el-icon-download" size="mini" style="margin:0 0 20px 0">导出</el-button>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      screen: {
        date: "", // 日期
        college: "", // 学院
        stuNo: "", // 学号
        calss: "", // 班级
        grade: "" // 年级
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
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
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 刷新接口
    refreshData() {
      this.$emit('updateSearch', this.screen)
    },
    // 重置
    resetInfo() {
      this.screen = {
        date: "", // 日期
        college: "", // 学院
        stuNo: "", // 学号
        calss: "", // 班级
        grade: "" // 年级
      }
      this.refreshData()
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

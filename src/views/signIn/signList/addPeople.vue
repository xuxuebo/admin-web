<!-- 新增签到人员 -->
<!-- author: 张小辉 -->
<template>
  <div class="main flex">
    <article class="left f-2">
      <el-input
        placeholder="请输入内容"
        v-model="search"
        class="input-with-select"
      >
        <el-button slot="prepend" icon="el-icon-search"></el-button>
      </el-input>
      <el-tree
        class="mt-20"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[]"
        :default-checked-keys="[]"
        :props="defaultProps"
      >
      </el-tree>
    </article>
    <article class="middle f-4">
      <div class="title mb-10">17动漫1班</div>
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
        <el-table-column type="selection" align="center" min-width="55">
        </el-table-column>
        <el-table-column
          prop="courseCode"
          align="center"
          label="姓名"
          min-width="100"
        />
        <el-table-column
          prop="courseName"
          align="center"
          label="学号"
          min-width="100"
        />
        <el-table-column
          prop="teacher"
          align="center"
          label="性别"
          min-width="100"
        />
        <el-table-column
          prop="teacher"
          align="center"
          label="班级"
          min-width="100"
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
    </article>
    <article class="right f-3">
      <div class="title mb-10">17动漫1班</div>
      <section class="flex f-wrap">
        <div
          class="card center f-column"
          v-for="(item, index) in 20"
          :key="index"
        >
          <i class="delete el-icon-circle-close"></i>
          <div>张三</div>
          <div class="mt-5">01010</div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      search: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: []
        },
        {
          id: 2,
          label: "一级 2",
          children: []
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [{}],
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleSizeChange(e) {
      this.pageSize = e;
    },
    handleCurrentChange(e) {
      this.pageNum = e;
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 20px 20px 45px 20px;
  article {
    // height: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 6px 2px rgb(231, 231, 231);
  }
  .left {
    padding: 20px;
    margin-right: 20px;
  }
  .middle {
    padding: 20px;
    margin-right: 20px;
    .title {
      color: #333;
      font-weight: bold;
    }
  }
  .right {
    color: #333;
    padding: 20px 10px;
    .title {
      font-weight: bold;
      margin: 10px 0 0 10px;
    }
    .card {
      font-size: 14px;
      width: 130px;
      height: 60px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 10px;
      position: relative;
      .delete {
        font-size: 18px;
        position: absolute;
        top: -9px;
        right: -9px;
        cursor: pointer;
      }
      .delete:hover {
        color: #1890ff;
      }
    }
  }
}
</style>

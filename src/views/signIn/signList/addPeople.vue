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
        :props="defaultProps"
        accordion
        :expand-on-click-node="false"
        @node-click="clickTree"
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
      <div class="title mb-10">已勾选签到人员</div>
      <section>
        <transition-group name="list-complete" tag="div" class="flex f-wrap">
          <div
            class="card center f-column"
            v-for="(item, index) in cardList"
            :key="index"
          >
            <i
              class="delete el-icon-circle-close"
              @click="reduceCard(index)"
            ></i>
            <div>{{ item.name }}</div>
            <div class="mt-5">{{ item.stuNo }}</div>
          </div>
        </transition-group>
      </section>
    </article>
  </div>
</template>

<script>
import api from "@/api/signIn/index";
export default {
  name: "",
  components: {},
  data() {
    return {
      search: "",
      data: [
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
      cardList: [
        {
          name: "张三",
          stuNo: "01010"
        },
        {
          name: "李四",
          stuNo: "01010"
        },
        {
          name: "王五",
          stuNo: "01010"
        },
        {
          name: "赵六",
          stuNo: "01010"
        }
      ],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getUserList();
  },
  methods: {
    clickTree(e) {
      console.log(e);
      api
        .getUser({
          pid: e.id
        })
        .then(res => {
          // this.$set(this.data, 0, res.content);
          // this.data[0].children = res.content;
          this.data = res.content.map(function(obj) {
            if (obj.hasChildren) {
              obj.children = null;
            }
            return obj;
          });
        });
    },
    // 获取组织机构
    getUserList() {
      api.getUser().then(res => {
        this.data = res.content;
      });
    },
    reduceCard(index) {
      this.cardList.splice(index, 1);
    },
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
    height: calc(100vh - 150px);
    overflow-y: scroll;
    .title {
      font-weight: bold;
      margin: 10px 0 0 10px;
    }
    .card {
      transition: all 1s;
      font-size: 14px;
      width: 130px;
      height: 60px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 10px;
      position: relative;
      .delete {
        color: #999;
        font-size: 18px;
        position: absolute;
        top: -9px;
        right: -9px;
        cursor: pointer;
      }
      .delete:hover {
        color: #fc4a04;
      }
    }
    .list-complete-enter,
    .list-complete-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }
  }
}
</style>

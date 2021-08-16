<!-- 签到 -->
<!-- author: 张小辉 -->
<template>
  <div v-loading="loading" class="app-content">
    <search add="true" @updateSearch="changeScreen"></search>
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
      <el-table-column label="类型" align="center" min-width="100">
        <template slot-scope="scope">
          <div>
            {{
              scope.row.signType == 0
                ? "活动"
                : scope.row.signType == 1
                ? "返校"
                : scope.row.signType == 2
                ? "疫情打卡"
                : scope.row.signType == 3
                ? "团建"
                : scope.row.signType == 4
                ? "班会"
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="theme"
        align="center"
        label="名称"
        min-width="100"
      />
      <el-table-column
        prop="updatedBy"
        align="center"
        label="创建人"
        min-width="100"
      />
      <el-table-column
        prop="createdTime"
        align="center"
        label="创建时间"
        min-width="100"
      />
      <el-table-column label="签到模式" align="center" min-width="100">
        <template slot-scope="scope">
          <div>
            {{
              scope.row.signMode == 0
                ? "定位签到"
                : scope.row.signMode == 1
                ? "二维码签到"
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="已完成/全部" align="center" min-width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.signUser || 0 }}/{{ scope.row.totalUser || 0 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="签到结束时间"
        align="center"
        min-width="100"
      />
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              plain
              @click.native="toDetail(scope.row)"
              >查看详情</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex just-right">
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
  </div>
</template>

<script>
import api from "@/api/signIn/index";
// import download from "@/api/index";
// import { downLoadFile } from "@/utils/file";
import search from "../component/search.vue";
export default {
  name: "",
  components: { search },
  data() {
    return {
      screen: {
        active: 0, // 筛选
        active2: 0, // 类型
        date: [] // 起止时间
      },
      loading: false,
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList();
  },
  methods: {
    changeScreen(e) {
      this.screen = e;
      this.getList();
    },
    getList() {
      this.loading = true;
      api
        .getList({
          signInType: this.screen.active, // 签到类型 ：0签到中，1未开始，2已结束
          signType: this.screen.active2 == -1 ? undefined : this.screen.active2, // 活动类型：0活动、1返校、2疫情打卡、3团建、4班会
          startDate: this.screen.date[0] || undefined,
          endDate: this.screen.date[1] || undefined,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.pages.list;
          this.total = res.data.pages.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    toDetail(e) {
      this.$router.push({
        path: "/newSign/signDetail",
        query: {
          id: e.id,
          isPhoto: e.isPhoto
        }
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

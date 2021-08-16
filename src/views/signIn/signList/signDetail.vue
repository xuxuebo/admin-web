<!-- 签到详情 -->
<!-- author: 张小辉 -->
<template>
  <div v-loading="loading" class="app-content">
    <div class="al-cen title mb-10">
      <div class="spot"></div>
      <div>签到信息</div>
    </div>
    <header>
      <div class="al-cen">
        {{
          info.signType == 0
            ? "活动签到"
            : info.signType == 1
            ? "返校签到"
            : info.signType == 2
            ? "疫情打卡签到"
            : info.signType == 3
            ? "团建签到"
            : info.signType == 4
            ? "班会签到"
            : ""
        }}
        &nbsp;&nbsp;
        <el-tag effect="dark" size="mini" v-if="info.frequencyType == 0">
          <i class="el-icon-refresh-left"></i> 单次</el-tag
        >
        <el-tag
          type="success"
          effect="dark"
          size="mini"
          v-if="info.frequencyType == 1"
        >
          <i class="el-icon-refresh"></i> 循环</el-tag
        >
      </div>
      <div>主题：{{ info.theme || "" }}</div>
      <div>创建人：{{ info.createdBy || "" }}</div>
      <div>创建时间：{{ info.createdTime || "" }}</div>
      <div>签到时间：{{ info.startDate || "" }} ~ {{ info.endDate || "" }}</div>
    </header>
    <div class="al-cen title">
      <div class="spot"></div>
      <div>签到结果</div>
    </div>
    <search @updateSearch="getList">
      <template #download>
        <el-button type="primary" icon="el-icon-download" @click="exportList()"
          >导出</el-button
        >
      </template>
    </search>
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
        prop="stuName"
        label="姓名"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="userId"
        label="学号"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="college"
        label="学院"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="major"
        label="专业"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="className"
        label="班级"
        align="center"
        min-width="100"
      />
      <el-table-column label="签到结果" align="center" min-width="100">
        <template slot-scope="scope">
          <div>
            {{
              scope.row.signInResult == 1
                ? "正常签到"
                : scope.row.signInResult == 2
                ? "未签到"
                : scope.row.signInResult == 3
                ? "已请假"
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="location"
        label="签到地点"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="picture"
        label="签到图片"
        align="center"
        min-width="100"
      />
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <div class="button" @click="showDetail(scope.row)">
            查看详情
            <!-- <el-button
              size="mini"
              type="primary"
              plain
              @click.native="showDetail(scope.row)"
              >查看详情</el-button
            > -->
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
    <el-dialog
      title="查看详情"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <p>姓名：{{ detail.stuName || "" }}</p>
      <p>学号：{{ detail.userId || "" }}</p>
      <p>学院：{{ detail.college || "" }}</p>
      <p>专业：{{ detail.major || "" }}</p>
      <p>班级：{{ detail.className || "" }}</p>
      <p>
        签到结果：{{
          detail.signInResult == 1
            ? "正常签到"
            : detail.signInResult == 2
            ? "未签到"
            : detail.signInResult == 3
            ? "已请假"
            : "" || ""
        }}
      </p>
      <p>签到地点：{{ detail.location || "" }}</p>
      <div class="flex">
        签到图片：
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="srcList"
        >
        </el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/signIn/index";
// import download from "@/api/index";
import { downLoadFile } from "@/utils/file";
import search from "../component/searchDetail.vue";
export default {
  name: "",
  components: { search },
  data() {
    return {
      loading: false,
      info: {},
      detail: {},
      dialogVisible: false,
      tableData: [],
      total: 0,
      signInResult: 0,
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ],
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
    getList(e) {
      this.signInResult = e;
      this.loading = true;
      api
        .getSignInInformation({
          id: this.$route.query.id || undefined
        })
        .then(res => {
          this.info = res.data;
        });
      api
        .getDeatil({
          signInResult: e,
          id: this.$route.query.id || undefined,
          isPhoto: this.$route.query.isPhoto || undefined,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 查看详情
    showDetail(e) {
      this.dialogVisible = true;
      this.detail = e;
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    exportList() {
      api
        .exportList({
          signInResult: this.signInResult, // 签到结果
          id: this.$route.query.id || undefined,
          isPhoto: this.$route.query.isPhoto || undefined
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
<style lang="scss" scoped>
header {
  color: #333;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 20px;
}
.title {
  font-weight: bold;
  color: #333;
  .spot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #1890ff;
    margin-right: 20px;
  }
}
.button {
  cursor: pointer;
}
.button:hover {
  color: #1890ff;
  // transition: all linear 0.3s;
}
</style>

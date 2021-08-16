<!-- author: 张小辉 -->
<template>
  <div class="screen">
    <!-- 签到情况 -->
    <div class="al-cen just-spa">
      <div class="al-cen">
        筛选：
        <p :class="{ blue: screen.active === 0 }" @click="screen.active = 0">
          签到中（20）
        </p>
        <p :class="{ blue: screen.active === 1 }" @click="screen.active = 1">
          未开始（20）
        </p>
        <p :class="{ blue: screen.active === 2 }" @click="screen.active = 2">
          已结束（20）
        </p>
      </div>
      <el-button
        type="primary"
        icon="el-icon-plus"
        v-if="add === 'true'"
        @click="dialogVisible = true"
        >新建</el-button
      >
    </div>
    <!-- 签到类型 -->
    <div class="al-cen just-spa">
      <div class="al-cen">
        类型：
        <p
          :class="{ blue: screen.active2 === -1 }"
          @click="screen.active2 = -1"
        >
          全部（20）
        </p>
        <p :class="{ blue: screen.active2 === 0 }" @click="screen.active2 = 0">
          活动（20）
        </p>
        <p :class="{ blue: screen.active2 === 1 }" @click="screen.active2 = 1">
          返校（20）
        </p>
        <p :class="{ blue: screen.active2 === 2 }" @click="screen.active2 = 2">
          疫情打卡（20）
        </p>
        <p :class="{ blue: screen.active2 === 3 }" @click="screen.active2 = 3">
          团建（20）
        </p>
        <p :class="{ blue: screen.active2 === 4 }" @click="screen.active2 = 4">
          班会（20）
        </p>
      </div>
      <div class="al-cen" v-show="screen.active === 2">
        <p>起止时间：</p>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="screen.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <el-dialog
      title="新建签到"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="al-cen just-spa card">
        <div class="center" @click="toSignIn(0)">活动</div>
        <div class="center" @click="toSignIn(1)">返校</div>
        <div class="center" @click="toSignIn(2)">疫情打卡</div>
      </div>
      <div class="al-cen just-spa card">
        <div class="center" @click="toSignIn(3)">团建</div>
        <div class="center" @click="toSignIn(4)">班会</div>
        <div class="center" @click="toSignIn(5)">自定义签到模式</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    add: String
  },
  data() {
    return {
      screen: {
        active: 0, // 筛选
        active2: -1, // 类型
        date: [] // 起止时间
      },
      dialogVisible: false
    };
  },
  watch: {
    screen: {
      deep: true,
      handler: function() {
        this.$emit("updateSearch", this.screen);
      }
    }
  },
  methods: {
    toSignIn(e) {
      this.$router.push({
        path: "/newSign/editSign",
        query: {
          type: e
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.screen {
  margin-top: -10px;
  color: #333;
  p {
    padding: 0 20px 0 10px;
    cursor: pointer;
  }
  p:hover {
    color: #1890ff;
  }
  .blue {
    color: #1890ff;
  }
}
.card {
  margin-bottom: 50px;
  font-size: 16px;
  div {
    width: 180px;
    height: 100px;
    border: 1px solid #ddd;
    // box-shadow: 0px 0px 3px 0px #ddd;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
  }
  div:hover {
    border: 1px solid #64dabc;
    box-shadow: 0px 0px 10px 2px #9ee0d0;
    color: #30b08f;
    transition: border 0.75s, box-shadow 0.75s, color 0.5s, fill 0.5s;
  }
}
</style>

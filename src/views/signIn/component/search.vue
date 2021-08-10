<!-- author: 张小辉 -->
<template>
  <div class="al-cen just-spa">
    <div class="al-cen screen">
      筛选：
      <p :class="{ blue: active === 0 }" @click="active = 0">全部（100）</p>
      <p :class="{ blue: active === 1 }" @click="active = 1">签到中（20）</p>
      <p :class="{ blue: active === 2 }" @click="active = 2">未开始（20）</p>
      <p :class="{ blue: active === 3 }" @click="active = 3">已结束（20）</p>
    </div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      v-if="add === 'true'"
      @click="dialogVisible = true"
      >新建</el-button
    >
    <slot name="download"></slot>
    <el-dialog
      title="新建签到"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="al-cen just-spa card">
        <div class="center" @click="toSignIn()">活动</div>
        <div class="center" @click="toSignIn()">返校</div>
        <div class="center" @click="toSignIn()">疫情打卡</div>
      </div>
      <div class="al-cen just-spa card">
        <div class="center" @click="toSignIn()">团建</div>
        <div class="center" @click="toSignIn()">班会</div>
        <div class="center" @click="toSignIn()">自定义签到模式</div>
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
      active: 0,
      dialogVisible: false
    };
  },
  mounted() {},
  methods: {
    toSignIn() {
      this.$router.push("/newSign/editSign");
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.screen {
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

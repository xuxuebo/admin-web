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
    <el-button type="primary" icon="el-icon-plus">新建</el-button>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
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
</style>

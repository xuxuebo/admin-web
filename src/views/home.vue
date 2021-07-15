<!-- 首页 -->
<!-- author: 张小辉 -->
<template>
  <div class="home">
    <section v-for="(item, index) in menu" :key="index" class="al-cen f-wrap">
      <span class="title" :class="{ mt_30: index != 0 }">{{ item.name }}</span>
      <el-divider></el-divider>
      <nav
        v-for="(item2, index2) in item.children"
        :key="index2"
        class="al-cen f-wrap"
        @click="toDetail(item.path, item2.path)"
      >
        <div class="card">
          <svg-icon
            class="icon"
            :icon-class="item2.meta.icon"
            style="height: 40px;width: 24px;"
          />
          <span>{{ item2.meta.title }}</span>
        </div>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {
    menu() {
      return this.$store.state.permission.addRouters;
    }
  },
  watch: {},
  mounted() {
    console.log(this.$store.state.permission.addRouters);
  },
  methods: {
    toDetail(a, b) {
      const path = a + "/" + b;
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  margin: 20px 20px 45px 20px;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .mt_30 {
    margin-top: 30px;
  }
  nav {
    .card {
      display: flex;
      align-items: center;
      width: 400px;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 1px 1px 6px 2px rgb(255, 255, 255);
      border: 1px solid #ddd;
      margin: 0 30px 30px 0;
      cursor: pointer;
      span {
        margin-left: 16px;
      }
      .icon {
        fill: #333;
      }
    }
    .card:hover {
      border: 1px solid #64dabc;
      box-shadow: 1px 1px 8px 2px #9ee0d0;
      color: #30b08f;
      transition: border 0.75s, box-shadow 0.75s, color 0.5s, fill 0.5s;
      .icon {
        color: #30b08f;
        fill: #30b08f;
        transition: fill 0.5s;
      }
    }
  }
}
</style>

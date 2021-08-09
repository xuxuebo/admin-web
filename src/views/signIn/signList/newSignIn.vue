<!-- author: 张小辉 -->
<template>
  <div class="app-content select_block">
    <!-- <el-radio-group class="mb-20" v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
    </el-radio-group> -->
    <el-form
      ref="form"
      :label-position="labelPosition"
      :model="form"
      label-width="120px"
    >
      <el-form-item class="w_50" label="主题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="签到模式">
        <el-radio-group v-model="form.resource">
          <el-radio label="定位签到"></el-radio>
          <el-radio label="二维码签到"></el-radio>
        </el-radio-group>
        <!-- 签到模式-定位签到 -->
        <div v-if="form.resource === '定位签到'">
          <el-form-item label="签到条件">
            <el-radio-group v-model="form.condition">
              <el-radio label="设定范围内打卡"></el-radio>
              <el-radio label="设定范围外打卡"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="签到范围">
            <el-radio-group v-model="form.people">
              <el-checkbox label="中安创谷A1栋" name="type"></el-checkbox>
              <el-checkbox label="中安创谷A2栋" name="type"></el-checkbox>
              <el-checkbox label="中安创谷A3栋" name="type"></el-checkbox>
              <el-checkbox label="中安创谷A4栋" name="type"></el-checkbox>
            </el-radio-group>
          </el-form-item>
          <el-button
            class="w_30"
            type="primary"
            icon="el-icon-plus"
            plain
            round
            @click="$router.push('./newPlace')"
          >
            新增签到地点
          </el-button>
          <el-form-item class="mt-20" label="签到时进行拍照">
            <el-radio-group v-model="form.photo">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="form.photo === '是'">
            <el-form-item label="拍照要求">
              <el-radio-group v-model="form.photoRequire">
                <el-checkbox label="与活动宣传照合照" name="type"></el-checkbox>
                <el-checkbox label="与活动宣传照合照" name="type"></el-checkbox>
                <el-checkbox label="与活动宣传照合照" name="type"></el-checkbox>
              </el-radio-group>
            </el-form-item>
            <el-button
              class="w_30"
              type="primary"
              icon="el-icon-plus"
              plain
              round
            >
              新增拍照要求
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="签到频次">
        <el-radio-group v-model="form.resource">
          <el-radio label="单次签到"></el-radio>
          <el-radio label="循环签到"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到起止日期">
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签到时间段">
        <el-date-picker
          v-model="form.date2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签到人员">
        <el-checkbox-group class="mb-20" v-model="form.people">
          <el-checkbox label="中安创谷A1栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A2栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A3栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A4栋" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-button class="w_30" type="primary" icon="el-icon-plus" plain round>
          新增签到人员
        </el-button>
      </el-form-item>
      <el-form-item class="mt-30">
        <el-button
          class="w_10"
          type="primary"
          icon="el-icon-s-promotion"
          @click="onSubmit"
          >发布</el-button
        >
        <el-button class="w_10" icon="el-icon-finished">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      labelPosition: "left",
      form: {
        title: "", // 主题
        resource: "定位签到", // 签到模式
        condition: "", // 签到条件
        photo: "是", // 签到时进行拍照-是否
        rate: "", // 签到频次
        date1: "", // 签到起止日期
        date2: "", // 签到时间段
        photoRequire: [], // 拍照要求
        people: [] // 签到人员
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="scss" scoped></style>

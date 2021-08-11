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
      <el-form-item class="w_40" label="主题">
        <el-input placeholder="请输入主题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="签到模式">
        <el-radio-group v-model="form.mode">
          <el-radio label="定位签到"></el-radio>
          <el-radio label="二维码签到"></el-radio>
        </el-radio-group>
        <!-- 签到模式-定位签到 -->
        <div v-if="form.mode === '定位签到'">
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
            <div class="al-cen mb-20" v-show="newAddPhoto">
              <el-input
                style="width:25%;margin-right:20px;"
                placeholder="请输入拍照要求"
                v-model="newAddPhotoInfo"
                clearable
              >
              </el-input>
              <el-button type="primary" icon="el-icon-check" circle></el-button>
              <el-button
                icon="el-icon-close"
                circle
                @click="newAddPhoto = false"
              ></el-button>
            </div>
            <el-button
              class="w_30"
              type="primary"
              icon="el-icon-plus"
              plain
              round
              @click="newAddPhoto = true"
            >
              新增拍照要求
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="签到频次">
        <el-radio-group v-model="form.rate">
          <el-radio label="单次签到"></el-radio>
          <el-radio label="循环签到"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="签到频率" v-if="form.rate === '循环签到'">
        <el-checkbox-group v-model="form.frequency" size="small">
          <el-checkbox-button
            v-for="(item, index) in week"
            :label="item"
            :key="index"
            >{{ item }}</el-checkbox-button
          >
        </el-checkbox-group>
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
        <el-button class="w_30" type="primary" icon="el-icon-plus" plain round @click="$router.push('/newSign/addPeople')">
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
      newAddPhoto: false, // 新增拍照要求是否显示
      newAddPhotoInfo: "", // 新增拍照要求
      labelPosition: "left",
      form: {
        title: "", // 主题
        condition: "", // 签到条件
        photo: "", // 签到时进行拍照-是否
        mode: "", // 签到模式
        rate: "", // 签到频次
        frequency: [], // 签到频率
        date1: "", // 签到起止日期
        date2: "", // 签到时间段
        photoRequire: [], // 拍照要求
        people: [] // 签到人员
      },
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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

<!-- author: 张小辉 -->
<template>
  <div class="app-content select_block">
    <!-- <el-radio-group class="mb-20" v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
    </el-radio-group> -->
    <el-form
      ref="ruleForm"
      :rules="rules"
      :label-position="labelPosition"
      :model="ruleForm"
      label-width="120px"
    >
      <el-form-item class="w_40" label="主题" prop="theme">
        <el-input placeholder="请输入主题" v-model="ruleForm.theme"></el-input>
      </el-form-item>
      <el-form-item label="签到模式" prop="signMode">
        <el-radio-group v-model="ruleForm.signMode">
          <el-radio :label="0">定位签到</el-radio>
          <el-radio :label="1">二维码签到</el-radio>
        </el-radio-group>
        <!-- 签到模式-定位签到 -->
        <div v-if="ruleForm.signMode == '0'">
          <el-form-item label="签到条件" prop="signCondition">
            <el-radio-group v-model="ruleForm.signCondition">
              <el-radio :label="0">设定范围内打卡</el-radio>
              <el-radio :label="1">设定范围外打卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="签到范围" prop="locationIdList">
            <el-checkbox-group v-model="ruleForm.locationIdList">
              <el-checkbox
                :label="item.id"
                v-for="(item, index) in locationList"
                :key="index"
              >
                {{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
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
          <el-form-item class="mt-20" label="签到时进行拍照" prop="isPhoto">
            <el-radio-group v-model="ruleForm.isPhoto">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="ruleForm.isPhoto === '是'">
            <el-form-item label="拍照要求" prop="photoIdList">
              <el-checkbox-group v-model="ruleForm.photoIdList">
                <el-checkbox
                  :label="item.id"
                  name="type"
                  v-for="(item, index) in photoList"
                  :key="index"
                  >{{ item.description }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <div class="al-cen mb-20" v-show="newAddPhoto">
              <el-input
                style="width:25%;margin-right:20px;"
                placeholder="请输入拍照要求"
                v-model="newAddPhotoInfo"
                clearable
              >
              </el-input>
              <el-button
                type="primary"
                icon="el-icon-check"
                circle
                @click="addPhoto()"
              ></el-button>
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
      <el-form-item label="签到频次" prop="frequencyType">
        <el-radio-group v-model="ruleForm.frequencyType">
          <el-radio label="单次签到"></el-radio>
          <el-radio label="循环签到"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="签到频率"
        v-if="ruleForm.frequencyType === '循环签到'"
        prop="frequency"
      >
        <el-checkbox-group v-model="ruleForm.frequency" size="small">
          <el-checkbox-button
            v-for="(item, index) in week"
            :label="item"
            :key="index"
            >{{ item }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="签到起止日期" prop="date1">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="ruleForm.date1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签到时间段" prop="date2">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="ruleForm.date2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="签到人员" prop="orgIdsList">
        <el-checkbox-group class="mb-20" v-model="ruleForm.orgIdsList">
          <el-checkbox label="中安创谷A1栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A2栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A3栋" name="type"></el-checkbox>
          <el-checkbox label="中安创谷A4栋" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-button
          class="w_30"
          type="primary"
          icon="el-icon-plus"
          plain
          round
          @click="$router.push('/newSign/addPeople')"
        >
          新增签到人员
        </el-button>
      </el-form-item>
      <el-form-item class="mt-30">
        <el-button
          class="w_10"
          type="primary"
          icon="el-icon-s-promotion"
          @click="submitForm('ruleForm')"
          >发布</el-button
        >
        <el-button
          class="w_10"
          icon="el-icon-finished"
          @click="resetForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api/signIn/index";
export default {
  name: "",
  components: {},
  data() {
    return {
      newAddPhoto: false, // 新增拍照要求是否显示
      newAddPhotoInfo: "", // 新增拍照要求
      labelPosition: "left",
      ruleForm: {
        theme: "", // 主题
        signMode: "", // 签到模式
        signCondition: "", // 签到条件
        locationIdList: [], // 签到范围
        isPhoto: "", // 签到时进行拍照-是否
        photoIdList: [], // 拍照要求
        frequencyType: "", // 签到频次
        frequency: [], // 签到频率
        date1: "", // 签到起止日期
        date2: "", // 签到时间段
        orgIdsList: [] // 签到人员
      },
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      locationList: [], // 签到地点回显
      photoList: [],
      rules: {
        theme: [{ required: true, message: "请输入主题", trigger: "blur" }],
        signMode: [
          { required: true, message: "请选择签到模式", trigger: "change" }
        ],
        signCondition: [
          { required: true, message: "请选择签到模式", trigger: "change" }
        ],
        locationIdList: [
          {
            type: "array",
            required: true,
            message: "请选择签到范围",
            trigger: "change"
          }
        ],
        isPhoto: [
          {
            required: true,
            message: "请选择签到是否进行拍照",
            trigger: "change"
          }
        ],
        photoIdList: [
          {
            required: true,
            message: "请选择拍照要求",
            trigger: "change"
          }
        ],
        frequencyType: [
          { required: true, message: "请选择签到频次", trigger: "change" }
        ],
        frequency: [
          { required: true, message: "请选择签到频率", trigger: "change" }
        ],
        date1: [
          { required: true, message: "请选择签到起止日期", trigger: "change" }
        ],
        date2: [
          { required: true, message: "请选择签到时间段", trigger: "change" }
        ],
        orgIdsList: [
          { required: true, message: "请选择签到人员", trigger: "change" }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getLocation();
    this.getPhoto();
  },
  methods: {
    // 新增拍照要求
    addPhoto() {
      if (this.newAddPhotoInfo.trim() === "") {
        this.$message.error("请输入拍照要求");
      }
      api
        .addPhotoRequire({
          description: this.newAddPhotoInfo
        })
        .then(res => {
          this.$message.success(res.message);
          this.getPhoto();
        });
    },
    // 拍照要求回显
    getPhoto() {
      api.photoRequireShow().then(res => {
        this.photoList = res.data;
      });
    },
    // 签到地点回显
    getLocation() {
      api.locationsShow().then(res => {
        this.locationList = res.data;
        // let i = 0;
        // res.data.forEach(e => {
        //   this.$set(this.locationList, i, {
        //     id: e.id,
        //     name: e.name,
        //     checked: false
        //   });
        //   i++;
        // });
        // console.log(this.locationList);
        // this.$set(this.locationList,res.data)
      });
    },
    submitForm(formName) {
      console.log(this.ruleForm.locationIdList);
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .addSignInTask({
              theme: this.ruleForm.theme, // 主题
              signMode: this.ruleForm.signMode, // 主签到模式：0定位签到、1二维码签到题
              signCondition: this.ruleForm.signCondition, // 签到条件
              locationIdList: this.ruleForm.locationIdList, // 签到范围
              isPhoto: this.ruleForm.isPhoto, // 签到时进行拍照
              photoIdList: this.ruleForm.photoIdList, // 拍照要求
              frequencyType: this.ruleForm.frequencyType, // 签到频次
              frequency: this.ruleForm.frequency, // 签到频率
              startDate: this.ruleForm.date1[0], // 签到起止日期
              endDate: this.ruleForm.date1[1], // 签到起止日期
              startTime: this.ruleForm.date2[0], // 签到时间段
              endTime: this.ruleForm.date2[1], // 签到时间段
              orgIdsList: this.ruleForm.orgIdsList // 签到人组织机构id集合
            })
            .then(res => {})
            .catch(err => {});
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped></style>

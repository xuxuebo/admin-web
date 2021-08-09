<!-- 新增签到地点 -->
<!-- author: 张小辉 -->
<template>
  <div class="app-content">
    <el-input
      placeholder="请搜索定位地点"
      v-model="search"
      class="input-with-select"
    >
      <el-button
        slot="prepend"
        icon="el-icon-search"
        clearable
        @click="searchJWD()"
      ></el-button>
    </el-input>
    <!-- <el-input
      placeholder="请搜索定位地点"
      prefix-icon="el-icon-search"
      v-model="search"
    >
    </el-input> -->
    <div id="container"></div>
    <input v-show="false" type="radio" name="mode" value="dragMap" checked />
    <button v-show="false" id="start">开始选点</button>
    <button v-show="false" id="stop">关闭选点</button>
    <p>打卡地点：{{ place || "" }}</p>
    <p>经纬度：{{ placeCode || "" }}</p>
    <div>
      允许打卡范围：
      <el-select v-model="value" placeholder="请选择范围">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      search: "",
      place: "",
      placeCode: "",
      options: [
        {
          value: "350",
          label: "350米"
        },
        {
          value: "400",
          label: "400米"
        },
        {
          value: "450",
          label: "450米"
        },
        {
          value: "500",
          label: "500米"
        },
        {
          value: "550",
          label: "550米"
        },
        {
          value: "600",
          label: "600米"
        },
        {
          value: "650",
          label: "650米"
        },
        {
          value: "700",
          label: "700米"
        },
        {
          value: "750",
          label: "750米"
        },
        {
          value: "800",
          label: "800米"
        },
        {
          value: "850",
          label: "850米"
        },
        {
          value: "900",
          label: "900米"
        },
        {
          value: "950",
          label: "950米"
        },
        {
          value: "1000",
          label: "1000米"
        }
      ],
      value: ""
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.drawMap();
  },
  methods: {
    // 绘制地图
    drawMap() {
      const that = this;
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        let map = new AMap.Map("container", {
          zoom: 16,
          center: that.placeCode || undefined,
          enableHighAccuracy: true
          //   scrollWheel: false
        });
        let positionPicker = new PositionPicker({
          mode: "dragMap", //设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map //依赖地图对象
        });
        positionPicker.on("success", function(positionResult) {
          that.place = positionResult.address;
          that.placeCode = positionResult.position;
        });
        var onModeChange = function(e) {
          positionPicker.setMode(e.target.value);
        };
        var startButton = document.getElementById("start");
        var stopButton = document.getElementById("stop");
        var dragMapMode = document.getElementsByName("mode")[0];
        startButton.addEventListener("click", function() {
          positionPicker.start(map.getBounds().getSouthWest());
        });
        stopButton.addEventListener("click", function() {
          positionPicker.stop();
        });
        dragMapMode.addEventListener("change", onModeChange);
        positionPicker.start();
        map.panBy(0, 1);
        map.addControl(
          new AMap.ToolBar({
            liteStyle: true
          })
        );
      });
    },
    // 逆地理编码
    searchPlace() {},
    // 地理编码
    searchJWD() {
      const that = this;
      AMap.plugin("AMap.Geocoder", function() {
        let geocoder = new AMap.Geocoder({
          extensions: "all",
          city: "全国"
        });
        geocoder.getLocation(that.search, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            that.place = result.geocodes[0].formattedAddress;
            that.placeCode = result.geocodes[0].location;
            that.drawMap();
          } else {
            that.$notify.error({
              title: "错误",
              message: "无法查询到此地址"
            });
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#container {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  height: 60vh;
}
</style>

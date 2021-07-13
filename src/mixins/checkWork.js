export default {
  methods: {
    workStatus(data) {
      let code = "";
      switch (data) {
        case "0":
          code = "旷课";
          break;
        case "1":
          code = "请假";
          break;
        case "2":
          code = "迟到";
          break;
        case "3":
          code = "已到";
          break;
        case "4":
          code = "早退";
          break;
      }
      return code;
    },
    workMode(data) {
      let mode = "";
      switch (data) {
        case "0":
          mode = "签到码";
          break;
        case "1":
          mode = "手动点名";
          break;
      }
      return mode;
    }
  }
};

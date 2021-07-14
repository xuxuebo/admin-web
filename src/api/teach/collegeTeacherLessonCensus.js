// 学院教师授课考勤统计
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/teacher-course/unit",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "skl/stat/teacher-course/unit-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

// 全校教师授课考勤统计
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/teacher-course/school",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "skl/stat/teacher-course/school-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

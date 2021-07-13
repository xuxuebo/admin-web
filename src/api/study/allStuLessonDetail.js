// 全校学生课程考勤明细
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/stu-course/school",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "stat/stu-course/school-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

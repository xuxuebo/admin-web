// 辅导员所带学生课程考勤统计
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/stu-course/teacher",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "skl/stat/stu-course/teacher-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

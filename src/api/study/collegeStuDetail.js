// 学院学生考勤明细
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/check-in-student-detail/unit",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "sklcheck-in-student-detail/unit-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

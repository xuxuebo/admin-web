// 学院教师使用率
import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/usage/school",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "skl/stat/usage/school-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

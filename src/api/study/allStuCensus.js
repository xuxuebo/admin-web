import request from "@/utils/request";
import qs from "qs";

export function getList(params) {
  return request({
    url: "skl/stat/stu/school",
    method: "get",
    params
  });
}
export function exportList(params) {
  return request({
    url:
      "skl/stat/stu/school-export" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getList, exportList };

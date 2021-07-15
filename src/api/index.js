import request from "@/utils/request";
import qs from "qs";

export function getCollege(params) {
  return request({
    url: "skl/common/all-unit",
    method: "get",
    params
  });
}
// 根据id导出文件
export function exportFile(params) {
  return request({
    url:
      "skl/check-in-export/book" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

export default { getCollege, exportFile };

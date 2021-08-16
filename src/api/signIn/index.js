// 签到列表
import request from "@/utils/request";
import qs from "qs";

// 签到结果 - 列表
export function getList(params) {
  return request({
    url: "skl/signInList/getSignInList",
    method: "get",
    params
  });
}

// 签到详情 - 列表
export function getDeatil(params) {
  return request({
    url: "skl/signInList/getSignInResult",
    method: "get",
    params
  });
}

// 签到信息
export function getSignInInformation(params) {
  return request({
    url: "skl/signInList/getSignInInformation",
    method: "get",
    params
  });
}

// 导出签到结果
export function exportList(params) {
  return request({
    url:
      "skl/signInList/exportSignInResult" +
      "?" +
      qs.stringify(params, { indices: false }),
    method: "get",
    responseType: "blob"
  });
}

// 新建签到任务
export function addSignInTask(data) {
  return request({
    url: "skl/signIn/addSignInTask",
    method: "post",
    data
  });
}

// 新增签到地点
export function addSignInLocations(data) {
  return request({
    url: "skl/signIn/addSignInLocations",
    method: "post",
    data
  });
}

// 签到地点回显
export function locationsShow(params) {
  return request({
    url: "skl/signIn/locationsShow",
    method: "get",
    params
  });
}

// 新增拍照要求
export function addPhotoRequire(data) {
  return request({
    url: "skl/signIn/addPhotoRequire",
    method: "post",
    data
  });
}

// 拍照要求回显示
export function photoRequireShow(params) {
  return request({
    url: "skl/signIn/photoRequireShow",
    method: "get",
    params
  });
}

// 拍照要求回显示
export function getUser(params) {
  return request({
    url: "api/dept",
    method: "get",
    params
  });
}

export default {
  getList,
  getDeatil,
  getSignInInformation,
  addSignInTask,
  addSignInLocations,
  exportList,
  locationsShow,
  addPhotoRequire,
  photoRequireShow,
  getUser
};

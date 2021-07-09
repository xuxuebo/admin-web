// author:张小辉; date:2021-03-19; 文件流处理
// 下载文件
export const downLoadFile = res => {
  const blob = new Blob([res], {
    type: "application/vnd.ms-excel"
  });
  // 创建标签
  const link = document.createElement("a");
  // 隐藏标签
  link.style.display = "none";
  // 添加文件
  link.href = URL.createObjectURL(blob);
  // 获取文件名
  //   const name = res.headers["content-disposition"]
  //     .split(";")[1]
  //     .replace("fileName=", "");
  //   link.download = decodeURI(name);
  // 添加子节点
  document.body.appendChild(link);
  // 模拟点击下载
  link.click();
  // 清除子节点
  document.body.removeChild(link);
};

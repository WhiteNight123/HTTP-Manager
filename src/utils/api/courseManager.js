import request from "./request";

// 获取课程列表
export function getFirstCategorys() {
  return request({
    url: "/api/course/category/getFirstCategorys",
  });
}

// 查询课程标签
export function tagsList(data) {
  return request({
    url: "/api/course/tags/list",
    methods: "post",
    data,
  });
}

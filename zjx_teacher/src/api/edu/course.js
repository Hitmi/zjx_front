import request from '@/utils/request'

/**
 * Course-
 */
export default{

  /**
   * 查询数据列表
   * @param searchObj 查询过滤条件
   */
  list(searchObj) {
    return request({
      url: `/admin/edu/course/list`,
      method: 'get',
      params: searchObj
    })
  },

  /**
   * 通过id删除单个数据
   * @param id 要删除的数据的id
   */
  removeById(id) {
    return request({
      url: `/admin/edu/course/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存数据
   * @param teacher 数据内容
   */
  save(course) {
    return request({
      url: `/admin/edu/course/save`,
      method: 'post',
      data: course
    })
  },

  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/edu/course/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 根据id单个查询用于更新数据的接口
   * @param id 课程id
   */
  getUpdate(id) {
    return request({
      url: `/admin/edu/course/getUpdate/${id}`,
      method: 'get'
    })
  },
  /**
   * 更新指定id的数据
   * @param teacher 更新后的数据
   */
  updateById(course) {
    return request({
      url: `/admin/edu/course/update`,
      method: 'put',
      data: course
    })
  },

  /**
   * 批量删除
   * @param idList 要删除的数据的id数组
   */
  batchRemove(idList) {
    return request({
      url: `/admin/edu/course/batchRemove`,
      method: 'delete',
      data: idList
    })
  },

  /**
   * 导出全部数据
   */
  export() {
    return request({
      url: `/admin/edu/course/export`,
      method: 'get'
    })
  },

  /**
   * 发布课程：更改课程状态
   */
  publishCourseById(id) {
    return request({
      url: `/admin/edu/course/publishCourseById/${id}`,
      method: 'put'
    })
  },
  /**
   * 获取特定老师的所有课程
   * @param page 当前页码
   * @param limit 页面限制数据量
   */
  pageListByTeacher(page, limit) {
    return request({
      url: `/admin/edu/course/listPageByTeacher/${page}/${limit}`,
      method: 'get'
    })
  }
}


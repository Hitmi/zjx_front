import request from '@/utils/request'

/**
 * CourseDescription-
 */
export default{

  /**
   * 查询数据列表
   * @param searchObj 查询过滤条件
   */
  list(searchObj) {
    return request({
      url: `/admin/edu/courseDescription/list`,
      method: 'get',
      params: searchObj
    })
  },

  /**
   * 查询分页列表
   * @param page 页号
   * @param limit 单页数据量
   * @param searchObj 查询过滤条件
   */
  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/courseDescription/listPage/${page}/${limit}`,
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
      url: `/admin/edu/courseDescription/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存数据
   * @param teacher 数据内容
   */
  save(courseDescription) {
    return request({
      url: `/admin/edu/courseDescription/save`,
      method: 'post',
      data: courseDescription
    })
  },

  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/edu/courseDescription/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 更新指定id的数据
   * @param teacher 更新后的数据
   */
  updateById(courseDescription) {
    return request({
      url: `/admin/edu/courseDescription/update`,
      method: 'put',
      data: courseDescription
    })
  },

  /**
   * 批量删除
   * @param idList 要删除的数据的id数组
   */
  batchRemove(idList) {
    return request({
      url: `/admin/edu/courseDescription/batchRemove`,
      method: 'delete',
      data: idList
    })
  },

  /**
   * 导出全部数据
   */
  export() {
    return request({
      url: `/admin/edu/courseDescription/export`,
      method: 'get'
    })
  }
}


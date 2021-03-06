import request from '@/utils/request'

/**
 * Student-
 */
export default{

  /**
   * 查询数据列表
   * @param searchObj 查询过滤条件
   */
  list(searchObj) {
    return request({
      url: `/admin/person/student/list`,
      method: 'get',
      params: searchObj
    })
  },

  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/person/student/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 导出全部数据
   */
  export() {
    return request({
      url: `/admin/person/student/export`,
      method: 'get'
    })
  }
}


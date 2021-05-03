import request from '@/utils/request'

/**
 * Department-
 */
export default{

  /**
   * 获取信息公开数据
   * @param page
   * @param limit
   */
  getDatumList(page, limit) {
    return request({
      url: `/admin/person/department/getDatumList/${page}/${limit}`,
      method: 'get'
    })
  },

  /**
   * 查询数据列表
   * @param searchObj 查询过滤条件
   */
  list(searchObj) {
    return request({
      url: `/admin/person/department/list`,
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
      url: `/admin/person/department/listPage/${page}/${limit}`,
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
      url: `/admin/person/department/get/${id}`,
      method: 'get'
    })
  }
}


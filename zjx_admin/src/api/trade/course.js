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
      url: `/api/trade/course/list`,
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
      url: `/api/trade/course/listPage/${page}/${limit}`,
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
      url: `/api/trade/course/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存数据
   * @param teacher 数据内容
   */
  save(course) {
    return request({
      url: `/api/trade/course/save`,
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
      url: `/api/trade/course/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 更新指定id的数据
   * @param teacher 更新后的数据
   */
  updateById(course) {
    return request({
      url: `/api/trade/course/update`,
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
      url: `/api/trade/course/batchRemove`,
      method: 'delete',
      data: idList
    })
  },

  /**
   * 导出全部数据
   */
  export() {
    return request({
      url: `/api/trade/course/export`,
      method: 'get'
    })
  },

  select(pickForm) {
    return request({
      url: `/api/trade/course/select`,
      method: 'put',
      data: pickForm
    })
  }
}


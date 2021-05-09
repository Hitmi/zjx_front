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
   * 查询分页列表
   * @param page 页号
   * @param limit 单页数据量
   * @param searchObj 查询过滤条件
   */
  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/person/student/listPage/${page}/${limit}`,
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
   * 更新指定id的数据
   * @param teacher 更新后的数据
   */
  updateById(student) {
    return request({
      url: `/admin/person/student/update`,
      method: 'put',
      data: student
    })
  },

  getDetail() {
    return request({
      url: `/api/person/student/getDetail`,
      method: 'get'
    })
  },

  updatePassword(oldPassword, newPassword) {
    return request({
      url: `/api/person/student/updatePassword`,
      method: 'put',
      data: {
        oldPassword,
        newPassword
      }
    })
  },

  updateInfo(newInfo) {
    return request({
      url: `/api/person/student/updateInfo`,
      method: 'put',
      data: newInfo
    })
  }
}


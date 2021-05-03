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
   * 通过id删除单个数据
   * @param id 要删除的数据的id
   */
  removeById(id) {
    return request({
      url: `/admin/person/student/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存数据
   * @param teacher 数据内容
   */
  save(student) {
    return request({
      url: `/admin/person/student/save`,
      method: 'post',
      data: student
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
   * 重置指定id的学生账号密码
   * @param teacher 更新后的数据
   */
  resetPassword(id) {
    return request({
      url: `/admin/person/student/resetPassword/${id}`,
      method: 'put'
    })
  },

  /**
   * 禁用指定id的学生账号
   * @param teacher 更新后的数据
   */
  changeState(id) {
    return request({
      url: `/admin/person/student/changeState/${id}`,
      method: 'put'
    })
  },
  /**
   * 批量删除
   * @param idList 要删除的数据的id数组
   */
  batchRemove(idList) {
    return request({
      url: `/admin/person/student/batchRemove`,
      method: 'delete',
      data: idList
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


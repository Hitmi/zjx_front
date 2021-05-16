import request from '@/utils/request'

/**
 * StudentCourse-
 */
export default {

  /**
   * 查询分页列表
   * @param page 页号
   * @param limit 单页数据量
   * @param searchObj 查询过滤条件
   */
  pageList(page, limit, searchObj) {
    return request({
      url: `/api/edu/studentCourse/listPage/${page}/${limit}`,
      method: 'get'
    })
  }
}


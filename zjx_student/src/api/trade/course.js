import request from '@/utils/request'

/**
 * chapter-
 */
export default{

  /**
   * 查询分页列表
   * @param page 页号
   * @param limit 单页数据量
   * @param searchObj 查询过滤条件
   */
  pageList(page, limit) {
    return request({
      url: `/api/trade/course/listPage/${page}/${limit}`,
      method: 'get'
    })
  },

  /**
   * 选课接口
   * @param pickFrom 选择的课程的信息
   */
  select(pickFrom) {
    return request({
      url: `/api/trade/course/select`,
      method: 'put',
      data: pickFrom
    })
  }

}


import request from '@/utils/request'

/**
 * chapter-
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
      url: `/api/trade/order/listPage/${page}/${limit}`,
      method: 'get'
    })
  },
  /**
   * 移除选课信息(订单)
   * @param id 订单id
   */
  remove(id) {
    return request({
      url: `/api/trade/order/remove/${id}`,
      method: 'delete'
    })
  }

}


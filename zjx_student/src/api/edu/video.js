import request from '@/utils/request'

/**
 * video-课程视频
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
      url: `/api/edu/video/listPage/${page}/${limit}`,
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
      url: `/api/edu/video/get/${id}`,
      method: 'get'
    })
  }

}


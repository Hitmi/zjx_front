import request from '@/utils/request'

/**
 * Course-
 */
export default{
  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/edu/course/get/${id}`,
      method: 'get'
    })
  },
  /**
   * 获取播放凭证
   * @param vid
   */
  getPlayAuth(vid) {
    return request({
      baseURL: 'http://localhost:8130',
      url: `/api/vod/media/getPlayAuth/${vid}`,
      method: 'get'
    })
  }
}


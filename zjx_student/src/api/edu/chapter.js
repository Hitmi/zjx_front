import request from '@/utils/request'

/**
 * chapter-
 */
export default{
  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/api/edu/chapter/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 获取courseId下所有的章节信息
   * @param id 课程id
   */
  getByCourseId(id) {
    return request({
      url: `/api/edu/chapter/getByCourseId/${id}`,
      method: 'get'
    })
  }

}


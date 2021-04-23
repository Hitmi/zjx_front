import request from '@/utils/request'

/**
 * CourseDescription-
 */
export default{

  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/edu/courseDescription/get/${id}`,
      method: 'get'
    })
  }
}


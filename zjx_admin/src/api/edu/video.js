import request from '@/utils/request'

/**
 * Video-课程视频
 */
export default{

  /**
   * 查询数据列表
   * @param searchObj 查询过滤条件
   */
  list(searchObj) {
    return request({
      url: `/admin/edu/video/list`,
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
      url: `/admin/edu/video/listPage/${page}/${limit}`,
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
      url: `/admin/edu/video/remove/${id}`,
      method: 'delete'
    })
  },

  /**
   * 保存数据
   * @param teacher 数据内容
   */
  save(video) {
    return request({
      url: `/admin/edu/video/save`,
      method: 'post',
      data: video
    })
  },

  /**
   * 根据id获取单个数据
   * @param id 数据id
   */
  getById(id) {
    return request({
      url: `/admin/edu/video/get/${id}`,
      method: 'get'
    })
  },

  /**
   * 更新指定id的数据
   * @param teacher 更新后的数据
   */
  updateById(video) {
    return request({
      url: `/admin/edu/video/update`,
      method: 'put',
      data: video
    })
  },

  /**
   * 批量删除
   * @param idList 要删除的数据的id数组
   */
  batchRemove(idList) {
    return request({
      url: `/admin/edu/video/batchRemove`,
      method: 'delete',
      data: idList
    })
  },

  /**
   * 导出全部数据
   */
  export() {
    return request({
      url: `/admin/edu/video/export`,
      method: 'get'
    })
  }
}


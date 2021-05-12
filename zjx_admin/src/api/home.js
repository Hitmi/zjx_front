import request from '@/utils/request'
export default{
    getData(begin,end) {
        return request({
          url: `/admin/statistics/daily/showData/${begin}/${end}`,
          method: 'get',
        })
      }
}
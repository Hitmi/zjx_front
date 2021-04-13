import request from '@/utils/request'

export default {
  login(username, password) {
    return request({
      url: '/admin/person/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  getInfo(token) {
    return request({
      url: '/admin/person/user/info',
      method: 'get',
      params: { token }
    })
  },
  logout() {
    return request({
      url: '/admin/person/user/logout',
      method: 'post'
    })
  }
}


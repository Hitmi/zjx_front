import request from '@/utils/request'

export default {
  login(username, password) {
    return request({
      url: '/api/person/login/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },
  getInfo(token) {
    return request({
      url: '/api/person/login/info',
      method: 'get',
      params: { token }
    })
  },
  logout() {
    return request({
      url: '/api/person/login/logout',
      method: 'post'
    })
  }
}


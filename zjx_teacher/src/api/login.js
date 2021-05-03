import request from '@/utils/request'

export default {
  login(loginForm) {
    return request({
      url: '/admin/person/login/login',
      method: 'post',
      data: loginForm
    })
  },
  getInfo(token) {
    return request({
      url: '/admin/person/login/info',
      method: 'get',
      params: { token }
    })
  },
  logout() {
    return request({
      url: '/admin/person/login/logout',
      method: 'post'
    })
  }
}


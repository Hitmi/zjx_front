'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://121.36.25.240:8190"',
  ALIYUN_API:'"http://106.13.192.187:8130"'
  // BASE_API: '"http://127.0.0.1:8190"'
})

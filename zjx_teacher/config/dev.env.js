'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://106.13.192.187:8190"',
  ALIYUN_API:'"http://106.13.192.187:8130"'
})

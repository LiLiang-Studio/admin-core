const envs = {
  development: {
    VUE_APP_APIBASE: '/api'
  },
  production: {
    VUE_APP_APIBASE: '/'
  }
}

Object.keys(envs).forEach(_ => {
  envs[_].VUE_APP_ENV = _
  envs[_].VUE_APP_NAME = 'Admin-core演示'
})

module.exports = envs
import axios from 'axios'

const session = window.sessionStorage

export const URL = 'https://ssafit.site'

const CustomAxios = axios.create({
  baseURL: URL,
  headers: {
    'Authorization': session.getItem('access-token-jwt'),
    'Refresh': session.getItem('refresh-token-jwt'),
  }
})

CustomAxios.interceptors.response.use(
  function CustomInterceptor(res){
    if (res.headers.authorization) {
      console.log('access', res)
      window.sessionStorage.setItem('access-token-jwt', res.headers.authorization)
    }
    if (res.headers.refreshtoken){
      console.log('refresh', res)
      window.sessionStorage.setItem('refresh-token-jwt', res.headers.refreshtoken)
    }

    return res
  }
)

export default CustomAxios
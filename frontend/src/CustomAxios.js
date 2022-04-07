import axios from 'axios'
import Swal from 'sweetalert2'

const session = window.sessionStorage

export const URL = 'https://ssafit.site'

const CustomAxios = axios.create({
  baseURL: URL,
})

CustomAxios.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': session.getItem('access-token-jwt'),
        'Refresh': session.getItem('refresh-token-jwt')
      }
    }
  }
)

CustomAxios.interceptors.response.use(
  function CustomInterceptorSucced(res){
    if (res.headers.authorization) {
      window.sessionStorage.setItem('access-token-jwt', res.headers.authorization)
    }
    if (res.headers.refreshtoken){
      window.sessionStorage.setItem('refresh-token-jwt', res.headers.refreshtoken)
    }

    return res
  },
  /////// API 처리에서 401 에러는 토큰 인증에 실패했을 경우에만 반환하게 엄격하게 관리해야함!!////////////
  function CustomInterceptorError(err){
    if (err.toJSON().status === 401){
      session.clear()
      Swal.fire({
        text: '인증이 만료되었습니다. 다시 로그인해주세요!',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: 'red',
      }).then(() => window.location.replace('/login'))
    }

    return Promise.reject(err.toJSON());
  }
)

export default CustomAxios
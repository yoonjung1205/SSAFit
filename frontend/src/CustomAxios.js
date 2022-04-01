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

export default CustomAxios
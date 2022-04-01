import axios from 'axios'

const session = window.sessionStorage

const CustomAxios = axios.create({
  baseURL: 'https://ssafit.site',
  headers: {
    'Authorization': session.getItem('access-token-jwt'),
    'Refresh': session.getItem('refresh-token-jwt'),
  }
})

export default CustomAxios
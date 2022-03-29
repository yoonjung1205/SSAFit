import React from 'react'
import kakao from '../images/kakao_logo.png'

export default function KakaoLogin({ history }) {
  const KakaoLogin = function(){
    window.history.pushState({}, '', 'https://ssafit.site/login')
    window.location.replace('https://ssafit.site/api_be/oauth2/authorization/kakao?redirect_uri=https://ssafit.site/moreinfo')
  }

  return (
    <button className='social-login kakao-login' onClick={() => KakaoLogin()}>
      <img src={ kakao } alt="kakao" />
      <p>
        Login with Kakao
      </p>
    </button>
  )
}

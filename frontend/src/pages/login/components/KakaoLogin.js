import React from 'react'
import kakao from '../images/kakao_logo.png'

export default function KakaoLogin() {
  const KakaoLogin = function(){
    window.location.replace('https://ssafit.site/api_be/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/moreinfo')
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

import React from 'react'
import kakao from '../images/kakao_logo.png'

export default function KakaoLogin() {
  const { Kakao } = window;

  return (
    <button className='kakao-login' onClick={() => Kakao.Auth.login()}>
      <img src={ kakao } alt="kakao" />
      <p>
        Login with Kakao
      </p>
    </button>
  )
}

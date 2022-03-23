import React from 'react'
import google from '../images/google_logo.png'

export default function GoogleLoginBtn(){
  const GoogleLogin = function(){
    window.location.replace('http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/moreinfo')
  }

  return (
    <button className='social-login google-login' onClick={() => GoogleLogin()}>
      <img src={ google } alt="kakao" />
      <p>
        Sign in with Google
      </p>
    </button>
  )
}
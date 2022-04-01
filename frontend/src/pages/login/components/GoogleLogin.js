import React from 'react'
import google from '../images/google_logo.png'

export default function GoogleLoginBtn({ history }){
  const GoogleLogin = function(){
    window.history.pushState({}, '', 'https://ssafit.site/login')
    window.location.replace('https://ssafit.site/api_be/oauth2/authorization/google?redirect_uri=https://ssafit.site/moreinfo')
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
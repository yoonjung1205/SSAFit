import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import corr from './images/corr.png'
import incorr from './images/incorr.png'
import './scss/signup.scss'



export default function Signup() {
  const [credentials, setCredentials] = useState({
    email: null, password: null, passwordConf: null
  })
  const [validData, setValidData] = useState({
    email: null, password: null, passwordConf: null
  })
  

  const signup = function(event){
    event.preventDefault()
  }


  const validator = function(target){
    if (target === 'email'){
      
    }
    else if (target ==='password'){
      const passValidator = new RegExp('[0-9a-zA-Z~!@#$%^&*()_+-=[]{};\':",\\|./<>?]{8,16}')
      const result = passValidator.exec(credentials.password)
      if (result[0] === credentials.password){
        setValidData({...validData, password: 1})
      }
      else {
        setValidData({...validData, password: -1})
      }
    }
    else if (target === 'passwordConf'){
      if (credentials.password === credentials.passwordConf){
        return true
      }
    }
    return false
  }


  return (
    <article className='signup-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logo" />
        </Link>
      </section>
      <section className='signup-body'>
        <h1>Sign Up</h1>
        <form onSubmit={event => signup(event)}>
          <label>
            이메일
            <div id='email-input'>
              <input type="email" name="email" id="email"
              placeholder='이메일을 입력하세요'
              onInput={event => {credentials.email = event.target.value}} />
              <button className='eamil-validator' onClick={() => {validator('email')}} >
                <span />
                <p>확인</p>
              </button>
            </div>
            <img className='validator-helper' src={(validData.email && validator.email === 1) ? corr:incorr} alt="correct"/>
          </label>
          <label>
            비밀번호
            <input type="password" name="password" id="password"
             placeholder='비밀번호는 8 ~ 16글자, 특수문자, 영어, 숫자 1개 이상 포함해야 합니다'
             onInput={event => setCredentials({...credentials, password: event.target.value})}
             onBlur={() => {validator('password')}} />
            <img className='validator-helper' src={(validData.password && validator.password === 1) ? corr:incorr} alt="correct"/>
          </label>
          <label>
            비밀번호 확인
            <input type="password" name="password-conf" id="password-conf"
             placeholder='비밀번호를 다시 입력하세요'
             onInput={event => setCredentials({...credentials, passwordConf: event.target.value})}
             onBlur={() => {validator('passwordConf')}} />
            <img className='validator-helper' src={(validData.passwordConf && validator.passwordConf === 1) ? corr:incorr} alt="correct"/>
          </label>
          <button>
            <span/>
            <p>다음</p>
          </button>
        </form>
        <Link to="/login">Login</Link>
      </section>
    </article>
  )
}

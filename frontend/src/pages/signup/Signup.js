import React from 'react'
import {Link} from 'react-router-dom'
import corr from './images/corr.png'
import incorr from './images/incorr.png'
import './scss/signup.scss'

const validator = function(target, credentials){
  if (target === 'email'){
    const emailValidator = new RegExp('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$')
    const result = emailValidator.exec(credentials.email)
    if (result[0] === credentials.email){
      return true
    }
  }
  else if (target ==='password'){
    const passValidator = new RegExp('[0-9a-zA-Z~!@#$%^&*()_+-=\[\]\{};\':",\\./<>?]{8,16}')
    const result = passValidator.exec(credentials.password)
    if (result[0] === credentials.password){
      return true
    }
  }
  else if (target === 'passwordConf'){
    if (credentials.password === credentials.passwordConf){
      return true
    }
  }
  return false
}

const signup = function(event){
  event.preventDefault()
}

export default function Signup() {
  const credentials = {
    email: "", password: "", passwordConf: ""
  }
  const valid_data = {
    email: 0, password: 0, passwordConf: 0
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
              <button className='eamil-validator' onClick={() => {validator('email', credentials) ? valid_data.email = 1: valid_data.email = -1; console.log(valid_data)}}>
                <span />
                <p>확인</p>
              </button>
            </div>
            <img className='validator-helper' src={corr} alt="correct" style={{display: valid_data.email === 1 ? 'block':'none'}}/>
            <img className='validator-helper' src={incorr} alt="incorrect" style={{display: valid_data.email === -1 ? 'block':'none'}} />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" id="password"
             placeholder='비밀번호는 8 ~ 16글자, 특수문자, 영어, 숫자 1개 이상 포함해야 합니다'
             onInput={event => {credentials.password = event.target.value}}
             onChange={() => {validator('password', credentials) ? valid_data.password = 1: valid_data.password = -1}} />
            <img className='validator-helper' src={corr} alt="correct" style={{display: valid_data.password === 1 ? 'block':'none'}}/>
            <img className='validator-helper' src={incorr} alt="incorrect" style={{display: valid_data.password === -1 ? 'block':'none'}} />
          </label>
          <label>
            비밀번호 확인
            <input type="password" name="password-conf" id="password-conf"
             placeholder='비밀번호를 다시 입력하세요'
             onInput={event => {credentials.passwordConf = event.target.value}}
             onChange={() => {validator('passwordConf', credentials) ? valid_data.passwordConf = 1: valid_data.passwordConf = -1}} />
            <img className='validator-helper' src={corr} alt="correct" style={{display: valid_data.passwordConf === 1 ? 'block':'none'}}/>
            <img className='validator-helper' src={incorr} alt="incorrect" style={{display: valid_data.passwordConf === -1 ? 'block':'none'}} />
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

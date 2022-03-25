/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import GoogleLogin from './components/GoogleLogin'
import KakaoLogin from './components/KakaoLogin'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './scss/login.scss'


const signIn = function(event, email, password){
  event.preventDefault()
  axios({
    method: 'post',
    baseURL: 'http://ssafit.site/api_be',
    url: '/auth/login',
    data: {
      email: email,
      password: password
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

export default function Login({ history }) {
  let email = ""; let password = "";

  return (
    <article className='login-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="image" />
        </Link>
      </section>
      <section className='login-body'>
        <h1>Log In</h1>
        <form action="" onSubmit={(event) => signIn(event, email, password)}>
          <label htmlFor="">
            이메일
            <input type="email" name="email" id="email"
             placeholder='이메일을 입력하세요'
             onInput={event => {email = event.target.value}} />
          </label>
          <label htmlFor="">
            비밀번호
            <input type="password" name="password" id="password"
             placeholder='비밀번호를 입력하세요'
             onInput={event => {password = event.target.value}} />
          </label>
          <button>
            <span/>
            <p>
              로그인
            </p>
          </button>
        </form>
        <section className='social-login-container'>
          <KakaoLogin history={history} />
          <GoogleLogin history={history} />
        </section>
        <section className='other-act-container'>
          <Link to='/signup'>회원가입</Link>
          <Link to=''>비밀번호 찾기</Link>
        </section>
      </section>
    </article>
  )
}


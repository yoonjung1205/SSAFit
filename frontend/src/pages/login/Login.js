/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import GoogleLogin from './components/GoogleLogin'
import KakaoLogin from './components/KakaoLogin'
import {Link} from 'react-router-dom'
import CustomAxios from '../../CustomAxios'
import { URL } from '../../CustomAxios'
import './scss/login.scss'
import Swal from 'sweetalert2';


export default function Login({ history }) {
  const [credentials, setCredentials] = useState({
    email: null, password: null
  })

  const signIn = function(){
    CustomAxios({
      method: 'post',
      url: `${URL}/api_be/auth/login`,
      data: {
        email: credentials.email,
        password: credentials.password
      },
    })
    .then(() => {
      Swal.fire({
        text: '로그인 되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: 'green'
      }).then(() => history.push('/main'))
    })
    .catch(() => {
      Swal.fire({
        text: '입력정보를 확인해주세요!',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: 'red'
      })
    })
  }

  return (
    <article className='login-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logoImage" />
        </Link>
      </section>
      <section className='login-body'>
        <h1>Log In</h1>
        <form action="" onSubmit={event => {event.preventDefault(); signIn()}}>
          <label htmlFor="">
            이메일
            <input type="email" name="email" id="email"
              placeholder='이메일을 입력하세요'
              onInput={event => setCredentials({...credentials, email: event.target.value})} />
          </label>
          <label htmlFor="">
            비밀번호
            <input type="password" name="password" id="password"
              placeholder='비밀번호를 입력하세요'
              onInput={event => setCredentials({...credentials, password: event.target.value})} />
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
          <Link to='/password'>비밀번호 찾기</Link>
        </section>
      </section>
    </article>
  )
}


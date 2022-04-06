import React, { useState } from 'react';
import './scss/password.scss'
import CustomAxios from '../../CustomAxios';
import { Link, useHistory } from 'react-router-dom';

const Password = () => {
  let history = useHistory()
  const [inputEmail, setInputEmail] = useState('')

  const requestEmail = v => {
    CustomAxios({
      method: 'post',
      url: '/api_be/auth/pw/find',
      data: { email: v }
    })
    .then(({ data }) => {
      const { message } = data
      if (message === 'not') {
        alert('가입한 이메일을 입력해주세요')
      } else {
        alert('메일을 보냈습니다.\n비밀번호를 확인해주세요!')
        history.push('/login')
      }
    })
  }

  const newPassword = () => {
    const email = inputEmail.trim()
    if (email) {
      requestEmail(email)
    } else {
      alert('가입한 이메일을 입력해주세요')
    }
  }


  return (
    <article className='password-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logoImage" />
        </Link>
      </section>
      <section className='password-body'>
        <h1>새로운 비밀번호 받기</h1>
        <form action="" onSubmit={e => {e.preventDefault(); newPassword()}}>
          <label htmlFor="email">
            이메일
            <input type="email" name="email" id="email"
              placeholder='가입한 이메일을 입력해주세요'
              value={inputEmail} onChange={e => setInputEmail(e.target.value)} />
          </label>
          <button><span/>제출</button>
        </form>
        <section className='other-act-container'>
          <Link to='/login'>로그인</Link>
          <Link to='/signup'>회원가입</Link>
        </section>
      </section>
    </article>
  );
};

export default Password;
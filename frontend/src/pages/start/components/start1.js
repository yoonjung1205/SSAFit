import React from 'react'
import '../scss/start1.scss'

export default function start1({ isLogin, history }) {
  return (
    <article id='start-1'>
      <section className='opac-blk' />
      <section className='content'>
        <h3 id='test'>
          여러분의 옷장을 책임질
        </h3>
        <img src="img/logo_w.png" alt="logo" />
        {isLogin ? <h4 onClick={() => history.push('/main')}>START</h4> : <h4 onClick={() => history.push('/login')}>Log In</h4>}
      </section>
    </article>
  )
}

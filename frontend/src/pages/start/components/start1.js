import React from 'react'
import '../scss/start1.scss'
import { Link } from 'react-router-dom'

export default function start1() {
  return (
    <article id='start-1'>
      <section className='opac-blk' />
      <section className='content'>
        <h3 id='test'>
          여러분의 옷장을 책임질
        </h3>
        <img src="img/logo_w.png" alt="logo" />
        <Link to='login'>
          <h4>Log In</h4>
        </Link>
      </section>
    </article>
  )
}

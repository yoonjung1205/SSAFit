import React from 'react'
import './scss/start1.scss'
import { Link } from 'react-router-dom'

export default function start_1() {
  return (
    <section id='start-1'>
      <article className='opac-blk' />
      <article className='content'>
        <h3 id='test'>
          여러분의 옷장을 책임질
        </h3>
        <img src="img/logo_w.png" alt="logo" />
        <Link to='#'>
          <h4>Sign In</h4>
        </Link>
      </article>
    </section>
  )
}

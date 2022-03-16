import React from 'react'
import scss from './start_1.scss'
import { Link } from 'react-router-dom'

export default function start_1() {
  return (
    <section id='start-1'>
      <article className='opac-blk' />
      <article className='content'>
        <h3>
          여러분의 옷장을 책임질
        </h3>
        <img src="img/logo_w.png" alt="logo" />
        <Link to='#'>
          Sign in
        </Link>
      </article>
    </section>
  )
}

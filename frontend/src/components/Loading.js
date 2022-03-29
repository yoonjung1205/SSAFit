import React from 'react'
import load from './images/loading.gif'
import './scss/Loading.scss'

export default function Loading() {
  return (
    <article className='loading'>
      <img src={load} alt="loading..." />
    </article>
  )
}

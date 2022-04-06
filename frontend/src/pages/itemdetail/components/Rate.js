import React from 'react'
import star from '../images/star.png'
import blank from '../images/star_blank.png'
import '../scss/rate.scss'

export default function Stars({ rate }) {
  return (
    <div id='rate-container'>
      <span id='rate-view' style={{width: `${rate / 5 * 15}rem`}} title={`평점 ${rate}`}>
        <img className='star' src={star} alt="star" />
      </span>
      <img className='star' src={blank} alt="blank" />
    </div>
  )
}

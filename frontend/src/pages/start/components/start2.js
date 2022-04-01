import React from 'react'
import '../scss/start2.scss'
import { Link } from 'react-router-dom'
import ourService from '../images/our_service_img.png'

export default function start2() {
  return (
    <article id='start-2'>
      <section id='intro-header'>
        <img className='dash' src="img/dash.png" alt="dash" />
        <h4>
          SERVICE
        </h4>
        <img className='dash' src="img/dash.png" alt="dash" />
        <h3 className='small-title'>
          나에게 맞는 옷을 찾아준다면<br />
          얼마나 좋을까?
        </h3>
      </section>
      <section id='intro-container' className='flex-row'>
        <img id='intro-img' src={ourService} alt="service" />
        <div className='flex-col'>
          <h5>What We Do?</h5>
          <p>
            SSAFit은 소비자에 딱! 맞는<br />
            서비스를 제공합니다
          </p>
          <p>
            나의 체형에 맞는, 나의 취향에 딱! 맞는<br />
            옷과 코디를 추천해줍니다
          </p>
          <p>
            상황과 장소와 시간에 딱! 맞는<br />
            코디를 추천해줍니다
          </p>
        </div>
      </section>
      <section id='service-container' className='flex-row'>
        <div className='service' id='link-1'>
          <div className='opac-blk' />
          <h4>체형 맞춤 옷</h4>
        </div>
        <div className='service' id='link-2'>
          <div className='opac-blk' />
          <h4>상황 맞춤 코디</h4>
        </div>
        <div className='service' id='link-3'>
          <div className='opac-blk' />
          <h4>취향 맞춤 옷</h4>
        </div>
      </section>
    </article>
  )
}

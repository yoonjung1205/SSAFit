import React from 'react'
import scss from './start_2.scss'

export default function start_2() {
  return (
    <section id='start-2'>
      <article className='partition flex-col'>
        <img className='dash' src="img/dash.png" alt="dash" />
        <h4>
          SERVICE
        </h4>
        <img className='dash' src="img/dash.png" alt="dash" />
        <h3>
          나에게 맞는 옷을 찾아준다면
        </h3>
        <h3>
          얼마나 좋을까?
        </h3>
      </article>
      <article className='partition'>
        <div className='carousel'></div>
        <div className='flex-col'>
          <h5>What We Do?</h5>
          <p>
            SSAFit은 소비자에 딱! 맞는
            서비스를 제공합니다
            \n
            나의 체형에 맞는, 나의 취향에 딱! 맞는
            옷과 코디를 추천해줍니다
            \n
            상황과 장소와 시간에 딱! 맞는
            코디를 추천해줍니다
          </p>
        </div>
      </article>
      <article className='partition'>
        <a>
          <h3>체형 맞춤 옷</h3>
        </a>
        <a>
          <h3>상황 맞춤 코디</h3>
        </a>
        <a>
          <h3>취향 맞춤 옷</h3>
        </a>
      </article>
    </section>
  )
}

import React from 'react'
import './scss/start3.scss'

export default function start_3() {
  return (
    <section id='start-3'>
      <img className='dash' src="img/dash.png" alt="dash" />
      <h4>
        EXPLAIN
      </h4>
      <img className='dash' src="img/dash.png" alt="dash" />
      <h3 className='small-title'>
        고민하는 사람들에게<br />
        "Fit"한 옷을 추천하는 SSAFit
      </h3>
      <article className='explain-container'>
        <div className='explain-desc'>
          <p>
            사용자 맞춤 추천으로 구매전환율을 상승시킬 수 있습니다.
            유저 로그와 리뷰 기반 머신러닝을 통해
            최적의 솔루션을 제공합니다.
          </p>
          <h3>
            한 번 시작해볼까요?
          </h3>
          <button>
            <span>
              GO
            </span>
          </button>
        </div>
        <img src="img/image_4.png" alt="img" />
      </article>
    </section>
  )
}

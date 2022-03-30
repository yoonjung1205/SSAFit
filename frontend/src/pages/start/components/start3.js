import React from 'react'
import {Link} from 'react-router-dom'
import image4 from '../images/image_4.png'
import '../scss/start3.scss'

export default function start3() {
  return (
    <article id='start-3'>
      <img className='dash' src="img/dash.png" alt="dash" />
      <h4>
        EXPLAIN
      </h4>
      <img className='dash' src="img/dash.png" alt="dash" />
      <h3 className='small-title'>
        고민하는 사람들에게<br />
        "Fit"한 옷을 추천하는 SSAFit
      </h3>
      <section className='explain-container'>
        <div className='explain-desc'>
          <p>
            사용자 맞춤 추천으로 구매전환율을 상승시킬 수 있습니다.
            유저 로그와 리뷰 기반 머신러닝을 통해
            최적의 솔루션을 제공합니다.
          </p>
          <div className='explain-desc-button-box'>
            <h3>
              한 번 시작해볼까요?
            </h3>
            <Link to={'/login'}>
              <button>
                <span>
                  GO
                </span>
              </button>
            </Link>
          </div>
        </div>
        <img src={image4} alt="img" />
      </section>
    </article>
  )
}

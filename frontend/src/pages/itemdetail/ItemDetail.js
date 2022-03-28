import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavigationBar from '../../components/NavigationBar'
import RealFit from './components/RealFit'

export default function ItemDetail({ history, location }) {
  const itemId = location.pathname.replace('/item/', '')
  console.log(itemId)

  //////////////////// DA 연결 부분 ////////////////////////
  // const [item, setItem] = useState({})
  // const [realFit, setRealFit] = useState([])
  // const [analysis, setAnalysis] = useState({})
  // const [reviews, setReviews] = useState([])

  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     baseURL: 'https://ssafit.site/api_da',
  //     url: `/${itemId}`,
  //     headers: {} /// 토큰 or 유저 정보      
  //   })
  //   .then(res => setItem(res))
  // })

  // useEffect(() => {
  //   setRealFit(item.realFit);
  //   setAnalysis(item.analysis);
  //   setReviews(item.reviews)
  // }, [item])


  return (
    <article className='detail-container'>
      <NavigationBar boldPath='RECOMMEND' />
      <section className='detail-header'>

        <h3 className='item-category'>아우터 &gt; 후드 집업</h3> {/* 해당 아이템의 카테고리 */}
        <div className='item-box'>
          <div className='image-box'>
            <img src="" alt="image" />{/* 해당 아이템의 이미지 */}
            <span className='like'></span>{/* 좋아요 버튼 */}
          </div>

          <div className='item-info'>
            <h3 className='brand'>TOFFEE</h3>{/* 해당 아이템의 브랜드 */}
            <h2 className='name'>2WAY 스웻 후드 집업 (MELANGE GREY)</h2>{/* 해당 아이템의 이름 */}
            <span className='rate'>4.8</span>{/* 해당 아이템의 평점 */}
            <h3 className='price'>42,500원</h3>{/* 해당 아이템의 가격 */}
            <span className='tags'></span>{/* 해당 아이템의 태그들 */}
            <button>
              구매하러 가기
              <span/>
            </button>
          </div>
        </div>

      </section>
      <div className='anchor'></div>
      <RealFit/>
      <section className='detail-footer'>
      </section>
    </article>
  )
}

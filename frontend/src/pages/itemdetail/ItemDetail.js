/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavigationBar from '../../components/NavigationBar'
import Rate from './components/Rate'
import RealFit from './components/RealFit'
import Analysis from './components/Analysis'
import heart from './images/heart.png'
import './scss/Item.scss'

export default function ItemDetail({ history, location }) {
  const itemId = location.pathname.replace('/item/', '')
  console.log(itemId)

  const [liked, setLiked] = useState(false)
  const tags = ["티셔츠","반팔","반팔티","로고티셔츠","반팔티셔츠","그래픽티셔츠","오와이"]

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
            <img src="https://image.msscdn.net/images/goods_img/20210204/1778404/1778404_1_500.jpg" alt="image" />{/* 해당 아이템의 이미지 */}
            <span className={liked ? 'liked':''} onClick={() => setLiked(!liked)}>
              <img src={heart} alt="like" />
            </span>{/* 좋아요 버튼 */}
          </div>

          <div className='item-info'>
            <h2 className='brand'>TOFFEE</h2>{/* 해당 아이템의 브랜드 */}
            <h3 className='name'>2WAY 스웻 후드 집업 (MELANGE GREY)</h3>{/* 해당 아이템의 이름 */}
            {/* <span className='rate'><h4>4.8</h4></span>해당 아이템의 평점 */}
            <Rate rate={4.8}/>
            <h3 className='price'>42,500원</h3>{/* 해당 아이템의 가격 */}
            <h6 className='tags'>{'#' + tags.join('#')}</h6>{/* 해당 아이템의 태그들 */}
            <button>
              구매하러 가기
              <span/>
            </button>
          </div>
        </div>

      </section>
      <div className='anchor'>
        <a href="">상품정보</a>
        <a href="">추천상품</a>
        <a href="">사용후기</a>
      </div>
      <RealFit/>
      <Analysis/>
      <section className='detail-footer'>
      </section>
    </article>
  )
}

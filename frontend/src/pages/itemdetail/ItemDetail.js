/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { DA_URL } from '../../Request'
import Rate from './components/Rate'
import RealFit from './components/RealFit'
import Analysis from './components/Analysis'
import heart from './images/heart.png'
import './scss/Item.scss'

export default function ItemDetail({ history, location }) {
  const newClothId = useLocation().pathname.replace('/item/', '')
  const [userInfo, setUserInfo] = useState({})
  const [liked, setLiked] = useState(false)

  // if (userInfo === {}) {
  //   setUserInfo(JSON.parse(window.sessionStorage.getItem('userInfo')))
  // }

  //////////////////// DA 연결 부분 ////////////////////////
  const [item, setItem] = useState({})
  const [realFit, setRealFit] = useState([])
  // const [reviews, setReviews] = useState([])

  
  
  useEffect(() => {
    const getCloth = async () => {
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/${newClothId}`,
      })
      .then(res => setItem(res.data[0]))
      // .then(res => console.log('cloth data:', res.data[0]))
      .catch(err => console.log(err, typeof(err)))
    }

    const getRealFit = async () => {
      const userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/reviews/${newClothId}/${userId}/`,
      })
      .then(res => setRealFit(res.data))
      // .then(res => console.log('realFit data:', res.data))
      .catch(err => console.log(err, typeof(err)))
    }

    getCloth()
    .then(getRealFit())
  }, [newClothId])
  
  
  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     baseURL: DA_URL,
  //     url: `/cloth/${newClothId}`,
  //   })
  //   .then(res => {
  //     setItem(res.data[0])
  //   })
  //   .catch(err => console.log(err, typeof(err)))
  // }, [newClothId])



  // useEffect(() => {
  //   setRealFit(item.realFit);
  //   setReviews(item.reviews)
  // }, [item])



  return (
    <>
      <NavigationBar boldPath='RECOMMEND' />
      <article className='detail-container'>
        <section className='detail-header'>
          <h3 className='item-category'>{item.largeCategoryName} &gt; {item.smallCategoryName}</h3>
          <div className='item-box'>
            <div className='image-box'>
              <img src={item.clothImg} alt="image" />
              <span className={liked ? 'liked':''} onClick={() => setLiked(!liked)}>
                <img src={heart} alt="like" />
              </span>
            </div>
            <div className='item-info'>
              <h2 className='brand'>{item.brand}</h2>
              <h3 className='name'>{item.clothName}</h3>
              <Rate rate={item.clothRate}/>
              <h3 className='price'>{item.clothPrice}원</h3>
              <h6 className='tags'>
                {item.clothHashtags && item.clothHashtags.map((hashtag, idx) => 
                <span key={idx} style={{marginRight: '0.5rem'}}>#{hashtag}</span>
                )}
              </h6>
              <button><span/>구매하러 가기</button>
            </div>
          </div>
        </section>
        <div className='anchor'>
          <a href="">상품정보</a>
          <a href="">추천상품</a>
          <a href="">사용후기</a>
        </div>
        { realFit.length && <RealFit review={realFit} /> }
        { item.reviewNoun &&  <Analysis words={item.reviewNoun} /> }
        <section className='detail-footer'>
        </section>
      </article>
      <Footer />
    </>
  )
}

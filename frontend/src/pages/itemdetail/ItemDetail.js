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
import Chart from './components/Chart'
import heart from './images/heart.png'
import dash from './images/dash.png'
import './scss/Item.scss'
import Recommedation from './components/Recommedation';

export default function ItemDetail({ history, location }) {
  const newClothId = useLocation().pathname.replace('/item/', '')
  const [liked, setLiked] = useState(false)
  const [item, setItem] = useState({})
  const [realFit, setRealFit] = useState([])

  
  const comma = function(tar){
    let result = ''
    if (tar){
      for (let i = tar.length - 1; i >= 0; i--){
        if (i !== tar.length - 1 && (tar.length - i - 1) % 3 === 0){
          result = ',' + result
        }
        result = tar[i] + result
      }
    }

    return result
  }

  const goToShop = function(){
    if (Object.keys(item).length){
      window.open(`https://store.musinsa.com/app/goods/${item.clothId}`)
    }
  }

  useEffect(() => {
    const getCloth = async () => {
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/${newClothId}`,
      })
      .then(res => setItem(res.data))
      .catch(err => console.log(err, typeof(err)))
    }

    const getRealFit = async () => {
      const userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/reviews/${newClothId}/${userId}`,
      })
      .then(res => setRealFit(res.data))
      .catch(err => console.log(err, typeof(err)))
    }
    getCloth()
    .then(getRealFit())
  }, [newClothId])


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
              <h3 className='price'>{comma(String(item.clothPrice))}원</h3>
              <h6 className='tags'>
                {item.clothHashtags && item.clothHashtags.map((hashtag, idx) => 
                <span key={idx} style={{marginRight: '0.5rem'}}>#{hashtag}</span>
                )}
              </h6>
              <button onClick={() => goToShop()}>
                <span/>
                구매하러 가기
              </button>
            </div>
          </div>
        </section>
        <div className='anchor'>
          <a href="#info">상품정보</a>
          <img src={dash} alt="" />
          <a href="">추천상품</a>
          <img src={dash} alt="" />
          <a href="">사용후기</a>
        </div>
        <RealFit review={realFit} />
        { item.reviewNoun &&  <Analysis words={item.reviewNoun} /> }
        <Chart male={item.userMale+item.userFemale === 2 ? 0 : item.userMale}
          female={item.userMale+item.userFemale === 2 ? 0 : item.userFemale}
          month={[item.month1, item.month2, item.month3, item.month4, item.month5, item.month6, item.month7, item.month8, item.month9, item.month10, item.month11, item.month12]}
          sum={item.month1 + item.month2 + item.month3 + item.month4 + item.month5 + item.month6 + item.month7 + item.month8 + item.month9 + item.month10 + item.month11 + item.month12}
          />
        <Recommedation />
        <section className='detail-footer'>
        </section>
      </article>
      <Footer />
    </>
  )
}

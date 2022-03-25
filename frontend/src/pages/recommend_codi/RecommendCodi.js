/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Suspense, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import like from './images/like.png'
import dislike from './images/dislike.png'
import ItemBox from './components/ItemBox'
import NavigationBar from '../../components/NavigationBar'
import './scss/recommend_codi.scss'
// import axios from 'axios'
import dummy from './data/dummy.js'

const getCodi = function(){
  //////////////// 코디 가져오기 ////////////////
  // const baseUrl = 'https://ssafit.site/api_da'

  // axios({
  //   method: 'get',
  //   url: baseUrl + '',
  //   body: {}
  // })
  return new Promise(resolve => {
    setTimeout(() => resolve(dummy), 1000);
  })
}

export default function RecommendCodi({ location }) {
  const tpo = location.pathname.replace('/recommend_codi/', '')
  const [codi, setCodi] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCodi().then((codiData) => {
      setCodi(codiData);
      setItems(codiData.codi1.items)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <>Loading</>;
  }

  console.log('나는야', items)

  return (
    <article className='page'>
      <NavigationBar boldPath="TPO" />
      <article className='codi-container'>
        <section className='img-box' style={{backgroundImage: codi ? `url(${codi.codi1.imageUrl})`:''}}/>
        <section className='codi-body'>
          <span className='codi-title'>
            <h1>
              {`ooo님, ${tpo}`}
            </h1>
              에<br /> 맞는 코디를 추천해드릴게요
          </span>
          <ItemBox items={items} setItems={setItems} />
          <div className='button-box'>
            <button className='like-btn'>
              <img src={like} alt="like" />
              맘에 들어요
              <span>
              </span>
            </button>
            <button className='dislike-btn'>
              <img src={dislike} alt="dislike" />
              별로에요
              <span>
              </span>
            </button>
          </div>
        </section>
      </article>
    </article>
  )
}

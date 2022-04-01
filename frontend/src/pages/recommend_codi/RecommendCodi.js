/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import like from './images/like.png'
import dislike from './images/dislike.png'
import ItemBox from './components/ItemBox'
import NavigationBar from '../../components/NavigationBar'
import Loading from '../../components/Loading'
import './scss/recommend_codi.scss'
import CustomAxios from '../../CustomAxios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function RecommendCodi() {
  const history = useHistory()
  
  const [codi, setCodi] = useState({})
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(true);


  const tpo = history.location.pathname.replace('/recommend_codi/', '')
  const tpoObject = {
    Date: '데이트', Daily: '일상', Campus: '캠퍼스', Party: '파티', Travel: '여행', Wedding: '결혼식',
    Business: '출근', Sport: '운동', Interview: '면접', Hip: '힙', Golf: '골프', Other: '기타'
  }

  const nextIdx = function(){
    if (idx < 19){
      setIdx(idx + 1)
    }
    else {
      if (!alert('마지막 페이지입니다')){
        history.push('/main')
      }
    }
  }

  const getCodi = function(){
    CustomAxios({
      method: 'get',
      url: `/api_da/codi/codi${tpo}`
    })
    .then(res => setCodi(res.data))
  }

  useEffect(() => {
    // console.log('나는 코디', codi)
    if (!Object.keys(codi).length){
      getCodi()
    }
  }, [])

  useEffect(() => {
    if (Object.keys(codi).length){
      setLoading(false)
    }
  }, [codi])

  useEffect(() => {
    if (codi[idx]){
      const imgBox = document.getElementsByClassName('img-box')[0]
      imgBox.style.backgroundImage = `url(${codi[idx].imgSrc})`
    }
  }, [loading])

  useEffect(() => {
    if (codi[idx]){
      const imgBox = document.getElementsByClassName('img-box')[0]
      imgBox.style.backgroundImage = `url(${codi[idx].imgSrc})`
    }
  }, [idx])

  if (loading) {
    return <Loading/>;
  }

  return (
    <article className='page'>
      <NavigationBar boldPath="TPO" />
      <article className='codi-container'>
        <section className='img-box'/>
        <section className='codi-body'>
          <span className='codi-title'>
            <h1>
              {`ooo님, ${tpoObject[tpo]}`}
            </h1>
              에<br /> 맞는 코디를 추천해드릴게요
          </span>
          <ItemBox items={codi[idx].clothes} />
          <div className='button-box'>
            {/* 백엔드랑 통신 넣어야함 */}
            <button className='like-btn' onClick={() => nextIdx()}>
              <img src={like} alt="like" />
              맘에 들어요
              <span>
              </span>
            </button>
            {/* 백엔드랑 통신 넣어야함 */}
            <button className='dislike-btn' onClick={() => nextIdx()}>
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

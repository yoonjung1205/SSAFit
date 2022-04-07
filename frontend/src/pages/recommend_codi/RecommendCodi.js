/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import like from './images/like.png'
import dislike from './images/dislike.png'
import back from './images/back.png'
import ItemBox from './components/ItemBox'
import NavigationBar from '../../components/NavigationBar'
import Loading from '../../components/Loading'
import './scss/recommend_codi.scss'
import CustomAxios from '../../CustomAxios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import refresh from './images/refresh.png'

export default function RecommendCodi({ user }) {
  const history = useHistory()
  
  const [codies, setCodies] = useState([])
  const [idx, setIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isLike, setIsLike] = useState(true)


  const tpo = history.location.pathname.replace('/recommend_codi/', '')
  const tpoObject = {
    Date: '데이트', Daily: '일상', Campus: '캠퍼스', Party: '파티', Travel: '여행', Wedding: '결혼식',
    Business: '출근', Sport: '운동', Interview: '면접', Hip: '힙', Golf: '골프', Other: '기타'
  }

  const ClickBtn = async (bool) => {
    const { codiId, hashtags } = codies[idx]
    const data =  {
      codiId, hashtags,
      tpo: tpoObject[tpo],
      codiImg: codies[idx].imgSrc,
      codiTitle: codies[idx].codiContents
    }
    await CustomAxios({
      method: 'post',
      url: `/api_be/codi/${bool ? 'like': 'unlike'}`,
      data
    })
    .then(res => {
      console.log(`click codi ${bool ? 'like' : 'unlike'}:`, res)
    })
    .catch(err => {
      console.log('request data:', data)
      console.log(err)
    })
  }

  const nextIdx = function(like){
    if (idx < codies.length - 1){
      ClickBtn(like)
      .then(setIdx(idx + 1))
    }
    else {
      if (!alert('마지막 페이지입니다')){
        history.push('/tpo')
      }
    }
  }

  const onlyIdx = () => {
    if (idx < codies.length -1) {
      setIdx(idx + 1)
    } else {
      if (!alert('마지막 페이지입니다')) {
        history.push('/tpo')
      }
    }
  }

  const changeLike = () => {
    ClickBtn(!isLike)
    setIsLike(!isLike)
  }

  const getCodiSet = function(){
    CustomAxios({
      method: 'get',
      url: `/api_da/codi/codi${tpo}`
    })
    .then(res => {setCodies(res.data)})
  }

  const getCodi = function(){
    CustomAxios({
      method: 'get',
      url: `/api_da/codi/detail/${tpo}`
    })
    .then(res => {setCodies([res.data]); setIsLike(true)})
  }

  useEffect(() => {
    if (!codies.length) {
      if (!parseInt(tpo)) {
        console.log('codiSet')
        getCodiSet()
      } else {
        console.log('codiOnly')
        getCodi()
      }
    }
  }, [])

  useEffect(() => {
    if (codies.length && user){
      setLoading(false)
    }
  }, [codies])

  useEffect(() => {
    if (codies[idx]){
      const imgBox = document.getElementsByClassName('img-box')[0]
      imgBox.style.backgroundImage = `url(${codies[idx].imgSrc})`
    }
  }, [loading])

  useEffect(() => {
    if (codies[idx]){
      const imgBox = document.getElementsByClassName('img-box')[0]
      imgBox.style.backgroundImage = `url(${codies[idx].imgSrc})`
    }
  }, [idx])

  const ButtonsSet = () => {
    return (
      <div className='button-box'>
        <button className='like-btn' onClick={() => nextIdx(1)}>
          <img src={like} alt="like" />
          맘에 들어요
          <span>
          </span>
        </button>
        <button className='dislike-btn' onClick={() => nextIdx(0)}>
          <img src={dislike} alt="dislike" />
          별로에요
          <span>
          </span>
        </button>
      </div>
    )
  }

  const ButtonOnly = () => {
    return (
      <div className='button-box'>
        <button className='back-btn only' onClick={() => history.goBack()}>
          <img src={back} alt="back" /><span />
        </button>
        {isLike ? 
        <button className='dislike-btn only' onClick={() => changeLike()}>
          <img src={dislike} alt="dislike" />별로에요<span />
        </button>
        :
        <button className='like-btn only' onClick={() => changeLike()}>
          <img src={like} alt="like" />맘에 들어요<span />
        </button>
        }
        <button className='back-btn only no' />
      </div>
    )
  }


  return (
    <>
    <article className='page'>
      <NavigationBar boldPath="TPO" />
      {loading ? <Loading /> :
      <article className='codi-container'>
        <section className='img-box'/>
        <section className='codi-body'>
          <span className='codi-title'>
            {codies.length > 1 ? 
              <>
                <p>
                  <h1>{user.nickname}님, {tpoObject[tpo]}</h1>에<br />
                  맞는 코디를 추천해드릴게요
                </p>
                <div className='codi-refresh' onClick={() => onlyIdx()}>
                  <div className='icon' />
                  <div className='text'>다른 코디</div>
                </div>
              </>
             :
              <p>
                <h1>{user.nickname}님,</h1><br/>
                찜하신 코디를 보여드릴게요
              </p>
            }
          </span>
          <ItemBox items={codies[idx].clothes} />
          { !parseInt(tpo) ? <ButtonsSet /> : <ButtonOnly /> }
        </section>
      </article>
    }
    </article>
    </>
  )
}

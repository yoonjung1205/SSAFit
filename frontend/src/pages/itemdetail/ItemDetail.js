/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import CustomAxios from '../../CustomAxios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import ItemInfo from './components/ItemInfo'
import RealFit from './components/RealFit'
import Analysis from './components/Analysis'
import Chart from './components/Chart'
import dash from './images/dash.png'
import './scss/Item.scss'
import Recommedation from './components/Recommedation';
import Reviews from './components/Reviews';
import Loading from '../../components/Loading'

export default function ItemDetail({ user, setColor, setStyle, setCategory }) {

  const newClothId = useLocation().pathname.replace('/item/', '')
  const [item, setItem] = useState({})
  const [realFit, setRealFit] = useState([])
  const [loading, setLoading] = useState(true)

  const goTop =  () => {
    const view = document.getElementsByClassName('App')[0]
    view.scrollTo({ top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    const getCloth = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_da/cloth/${newClothId}`,
      })
      .then(res => {
        setItem(res.data)
        setLoading(false)
      })
    }

    const getRealFit = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_da/cloth/reviews/${newClothId}/${user.id}`,
      })
      .then(res => {
        setRealFit(res.data)
      })
    }

    const updateRecentItem = async () => {
      await CustomAxios({
        method: 'put',
        url: `/api_da/user/changeRecentItem/${user.id}`,
        data: { "newClothId" : newClothId }
      })
    }

    const likeDa = async() => {
      // 1은 긍정 2는 부정이면...좋아요 누를때 1보내고 취소 누를때 2?
      await CustomAxios({
        method: 'put',
        url: `/api_da/user/${user.id}`,
        data: { "newClothId": newClothId, "num": 1 }
      })
    }

    getCloth()
    .then(getRealFit())
    .then(updateRecentItem())
    .then(likeDa())
    .then(() => {
      const session = window.sessionStorage
      setColor({}); session.removeItem('color-rec');
      setStyle({}); session.removeItem('style-rec');
      setCategory({}); session.removeItem('category-rec');
    })
  }, [newClothId])

  if (loading){
    return <Loading />
  }

  return (
    <>
      <NavigationBar boldPath='RECOMMEND' />
      <article className='detail-container'>
        <ItemInfo item={item} user={user} />
        <div className='anchor'>
          <a href="#info">상품정보</a>
          <img src={dash} alt="" />
          <a href="#recommend">추천상품</a>
          <img src={dash} alt="" />
          <a href="#review">사용후기</a>
        </div>
        <RealFit review={realFit} />
        { item.reviewNoun &&  <Analysis words={item.reviewNoun} /> }
        <Chart male={item.userMale+item.userFemale === 2 ? 0 : item.userMale}
          female={item.userMale+item.userFemale === 2 ? 0 : item.userFemale}
          month={[item.month1, item.month2, item.month3, item.month4, item.month5, item.month6, item.month7, item.month8, item.month9, item.month10, item.month11, item.month12]}
          sum={item.month1 + item.month2 + item.month3 + item.month4 + item.month5 + item.month6 + item.month7 + item.month8 + item.month9 + item.month10 + item.month11 + item.month12}
        />
        <Recommedation brand={item.brand} newClothId={newClothId} />
        <Reviews newClothId={newClothId} />
        <section onClick={() => goTop()} className='go-top'>top</section>
      </article>
      <Footer />
    </>
  )
}

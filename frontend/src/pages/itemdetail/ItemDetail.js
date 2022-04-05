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

export default function ItemDetail({ user }) {

  const newClothId = useLocation().pathname.replace('/item/', '')
  const [item, setItem] = useState({})
  const [realFit, setRealFit] = useState([])

  useEffect(() => {
    const getCloth = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_da/cloth/${newClothId}`,
      })
      .then(res => {
        console.log('getCloth:', res.data)
        setItem(res.data)
      })
      .catch(err => console.log(err, typeof(err)))
    }

    const getRealFit = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_da/cloth/reviews/${newClothId}/${user.id}`,
      })
      .then(res => {
        console.log('getRealFit', res.data)
        setRealFit(res.data)
      })
      .catch(err => console.log(err, typeof(err)))
    }

    const updateRecentItem = async () => {
      await CustomAxios({
        method: 'put',
        url: `/api_da/user/${user.id}/changeRecentItem`,
        data: { "newClothId" : newClothId }
      })
      .then(() => {
        console.log('updateRecentItem!!')
      })
      .catch(err => console.log(err, typeof(err)))
    }

    getCloth()
    .then(getRealFit())
    .then(updateRecentItem())
  }, [newClothId])


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
        <section className='detail-footer'>
        </section>
      </article>
      <Footer />
    </>
  )
}

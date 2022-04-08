/* eslint-disable react-hooks/rules-of-hooks */
import CustomAxios from '../../../CustomAxios'
import React, { useState } from 'react'
import Loading from '../../../components/Loading'
import loadImg from '../../../components/images/loading.gif'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function itembox({ items }) {
  if (items.length === 0){
    return <Loading/>
  }

  let history = useHistory()

  const [loading, setLoading] = useState(null)

  const comma = function(tar){
    let result = ''
    for (let i = tar.length - 1; i >= 0; i--){
      if (i !== tar.length - 1 && (tar.length - i - 1) % 3 === 0){
        result = ',' + result
      }
      result = tar[i] + result
    }

    return result
  }

  const getNewClothId = (clothId) => {
    const userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id

    CustomAxios({
      method: 'get',
      url: `/api_da/cloth/isSSAFIT/${clothId}?userId=${userId}`
    })
    .then(res => {
      setLoading(false)
      return Promise.resolve(res)
    })
    .then(res => {
      if (res.data) {
        history.push(`/item/${res.data}`)
      }
      else {
        Swal.fire({
          title: '판매 사이트로 이동합니다',
          text: '해당 옷의 데이터가 없습니다',
          icon: 'info',
          confirmButtonText: '확인',
          confirmButtonColor: 'blue'
        }).then(() => window.open(`https://store.musinsa.com/app/goods/${clothId}`))
      }
    })
  }

  const cards = items.map((item, idx) => {
    return (
      <div className='item-card' key={item[0]} onClick={() => {setLoading(idx); getNewClothId(item[0])}}>
        <div className='item-img' style={{backgroundImage: `url(${item[3]})`}} alt={item[2]}>
          <span className='load-img' style={{display: loading === idx ? 'flex':'none'}}>
            <img src={loadImg} alt="load" />
          </span>
        </div>
        <div className='item-content'>
          <p>{item[1]}</p>
          <p>{item[2]}</p>
          <p>{comma(item[4]) + '원'}</p>
        </div>
      </div>
    )}
  )

  return (
    <div className='item-box'>
      {cards}
    </div>
  )
}

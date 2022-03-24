import axios from 'axios'
import React from 'react'
import heart from '../images/heart.png'

export default function itembox({ items, setItems }) {
  // const baseUrl = 'https://ssafit.site/api_be'
  // const like = function(){
  //   axios({
  //     method: 'post',
  //     url: '',
  //     body: {}
  //   })
  // }

  if (items.lenght === 0){
    return <>Loding...</>
  }

  const cards = items.map((item, idx) => (
    <div className='item-card' key={idx}>
      <img className='item-img' src={item.imageUrl} alt={item.name} />
      <div className='item-content'>
        <p>{item.brand}</p>
        <p>{item.name}</p>
        <p>{item.price}</p>
        <span className={item.liked ? 'liked':''}
          onClick={() => setItems([...items], items[idx].liked = !items[idx].liked)}>
          <img src={heart} alt="찜하기" />
        </span>
      </div>
    </div>
  ))

  return (
    <div className='item-box'>
      {cards}
    </div>
  )
}

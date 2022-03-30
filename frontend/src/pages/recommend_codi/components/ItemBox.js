import React from 'react'
import Loading from '../../../components/Loading'

export default function itembox({ items }) {
  if (items.length === 0){
    return <Loading/>
  }

  const comma = function(tar){
    let result = ''
    for (let i = tar.length - 1; i >= 0; i--){
      console.log('result!!!!', result)
      if (i !== tar.length - 1 && (tar.length - i - 1) % 3 === 0){
        result = ',' + result
      }
      result = tar[i] + result
    }

    return result
  }

  const cards = items.map(item => {
    return (
    <div className='item-card' key={item[0]}>
      <img className='item-img' src={item[3]} alt={item[2]} />
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

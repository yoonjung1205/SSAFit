/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import left from '../images/arrow-left.png'
import right from '../images/arrow-right.png'
import '../scss/realfit.scss'

export default function RealFit() {
  const [page, setPage] = useState(9)
  const [direc, setDirec] = useState(true)

  console.log(direc)

  const realfit = []
  for (let a = 0; a < 10; a++){
    realfit.push({imageUrl: `https://cdn-icons-png.flaticon.com/512/1893/189323${a}.png`, desc: '이거 되는거죠?'})
  }

  const arr = () => {
    const temp = []
    for (let i = page; i < page + 8; i++){
      temp.push(i % realfit.length)
    }

    return temp
  }

  const CarouselItems = function({ele}){
    return (
    <span className={`carousel-card ${direc ? 'slide-left':'slide-right'}`}>
      <img className='carousel-image' src={ele.imageUrl} alt="" />
      <p className='carousel-desc'>{ele.desc}</p>
    </span>
    )
  }

  return (
    <section className='realfit-container'>
      <div className='realfit-header'>
        <h3 className='title'>Real Fit</h3>
        <p className='desc'>
          SSAFit에서는 사용자와 비슷한 신체
          사이즈를 가진 사람들의 후기를 바탕으로
          상품의 정보를 제공합니다.
        </p>
      </div>
      <div className='carousel-box'>
        <img src={left} className='carousel-btn' onClick={() => {setPage(page > 0 ? page-1 : realfit.length-1); setDirec(true)}}/>
        <div className='carousel-view'>
          <div className='carousel'>
            {arr().map(idx => <CarouselItems ele={realfit[idx]} key={idx}/>)}
          </div>
        </div>
        <img src={right} className='carousel-btn' onClick={() => {setPage(page >= realfit.length-1 ? 0 : page+1); setDirec(false)}}/>
      </div>
    </section>
  )
}

/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import left from '../images/arrow-left.png'
import right from '../images/arrow-right.png'
import '../scss/realfit.scss'

export default function RealFit({ review }) {
  const [page, setPage] = useState(0)
  const [direc, setDirec] = useState(true)

  const realfit = []
  for (let i = 0; i < review.length; i++){
    realfit.push({imageUrl: review[i].reviewImg, desc: `${review[i].userHeight}/${review[i].userWeight} (${review[i].userSexMen ? '남':'여'})`})
  }
  const arr = () => {
    const temp = []
    if (realfit.length < 4){
      for (let i = 0; i < realfit.length; i++){
        temp.push(i)
      }
    }
    else {
      for (let i = page; i < page + 6; i++){
        temp.push(i % realfit.length)
      }
    }

    return temp
  }

  console.log(review)

  const CarouselItems = function({ele}){
    return (
    <div className={`carousel-card ${direc ? 'slide-left':'slide-right'}`}>
      <span className='carousel-image' style={{backgroundImage: `url(${ele.imageUrl})`}} />
      <p className='carousel-desc'>{ele.desc}</p>
    </div>
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
        <img src={left} className='carousel-btn' style={{display: realfit.length > 4 ? 'block':'none'}}
          onClick={() => {setPage(page > 0 ? page-1 : realfit.length-1); setDirec(true)}}/>
        <div className='carousel-view'>
          <div className='carousel'>
            {arr().map((i, idx) => <CarouselItems ele={realfit[i]} key={idx}/>)}
          </div>
        </div>
        <img src={right} className='carousel-btn' style={{display: realfit.length > 4 ? 'block':'none'}}
          onClick={() => {setPage(page >= realfit.length-1 ? 0 : page+1); setDirec(false)}}/>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from 'react'

export default function RealFit({ realFit, setRealFit }) {
  const [page, setPage] = useState(0)

  const CarouselItems = realFit.map((ele, idx) => {
    <span className='carousel-item' key={idx}>
      <img className='carousel-image' src={ele.imageUrl} alt="" />
      <p className='carousel-desc'>{ele.desc}</p>
    </span>
  })

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
        <span className='btn-left'>&lt;</span>
        <div className='carousel'>
          <CarouselItems/>
        </div>
        <span className='btn-right'>&gt;</span>
      </div>
    </section>
  )
}

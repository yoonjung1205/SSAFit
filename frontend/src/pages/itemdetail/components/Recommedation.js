/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import '../scss/recommedation.scss'
import { DA_URL } from '../../../Request';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading'


const Recommedation = ({ brand, newClothId }) => {
  let history = useHistory()

  const [similarClothes, setSimilarClothes] = useState([])
  const [brandClothes, setBrandClothes] = useState([])

  useEffect(() => {
    const userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
    const getSimilarClothes = async () => {
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/similar/${newClothId}`
      })
      .then(res => {
        setSimilarClothes(res.data)
        console.log('getSimilarClothes', res.data)
      })
      .catch(err => console.log(err, typeof(err)))
    }
    const getBrandClothes = async () => {
      await axios({
        method: 'get',
        url: `${DA_URL}/cloth/brand/${newClothId}/${userId}`
      })
      .then(res => {
        setBrandClothes(res.data)
        console.log('getBrandClothes', res.data)
      })
      .catch(err => console.log(err, typeof(err)))
    }
    getSimilarClothes().then(getBrandClothes)
  }, [])

  const FailToLoad = function(){
    return (
    <div className='fail-container'>
      <h1>🤔</h1>
      <p>이미지를 불러오지 못했습니다</p>
    </div>
    )
  }

  return (
    <section className='recommendation'>
      <div className='recom-header'>
        <h3>Recommendation</h3>
        <p>유사한 상품과, 같은 브랜드의 인기상품을 추천합니다.</p>
      </div>
      <br />
      <div className='recom-body'>
        <p>유사한 상품 추천</p>
        <div className='recom-cards'>
          {
          Object.keys(similarClothes).length > 0 ?
          similarClothes.map((cloth, idx) => (
            <div className='card' key={idx} onClick={() => history.push(`/item/${cloth.newClothId}`)} title={`${cloth.clothName}`}>
              <div className='card-image'>
              <img src={cloth.clothImg} alt='fail to load image... 🤔' />
              </div>
              <div className='card-text'>
                <p className='one-line'>{cloth.brand}</p>
                <p className='two-line'>{cloth.clothName}</p>
                <div>
                  <p className='one-line'>Price: {cloth.clothPrice}원</p>
                  <p className='one-line'>Size: {cloth.goodsSize}</p>
                </div>
              </div>
            </div>
          ))
          :
          <Loading/>
        }
        </div>
        <br /><br />
        <p>{brand}의 인기 상품</p>
        <div className='recom-cards'>
        {
          Object.keys(brandClothes).length > 0 ?
          brandClothes.map((cloth, idx) => (
            <div className='card' key={idx} onClick={() => history.push(`/item/${cloth.newClothId}`)} title={`${cloth.clothName}`}>
              <div className='card-image'>
              <img src={cloth.clothImg} alt='fail to load image... 🤔' />
              </div>
              <div className='card-text'>
                <p className='one-line'>{cloth.brand}</p>
                <p className='two-line'>{cloth.clothName}</p>
                <div>
                  <p className='one-line'>Price: {cloth.clothPrice}원</p>
                  <p className='one-line'>Size: {cloth.goodsSize}</p>
                </div>
              </div>
            </div>
          ))
          :
          <Loading/>
        }
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Recommedation;
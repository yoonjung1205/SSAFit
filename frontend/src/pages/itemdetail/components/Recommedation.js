import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../scss/recommedation.scss'
import { DA_URL } from '../../../Request';
import { useHistory } from 'react-router-dom';


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
          {similarClothes.map((cloth, idx) => (
            <div className='card' key={idx} onClick={() => history.push(`/item/${cloth.newClothId}`)} title={`${cloth.clothName}`}>
              <div className='card-image'>
                <img src={cloth.clothImg} alt='cloth' />
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
          ))}
        </div>
        <br /><br />
        <p>{brand}의 인기 상품</p>
        <div className='recom-cards'>
          {brandClothes.map((cloth, idx) => (
            <div className='card' key={idx} onClick={() => history.push(`/item/${cloth.newClothId}`)} title={`${cloth.clothName}`}>
              <div className='card-image'>
                <img src={cloth.clothImg} alt='cloth' />
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
          ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Recommedation;
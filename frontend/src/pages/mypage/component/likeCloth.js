/* eslint-disable react-hooks/rules-of-hooks */
import '../scss/cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { likeClothes } from '../data';

const likeCloth = () => {
  const [clothes, setClothes] = useState([])
  const fillLike = 'https://i.ibb.co/RDV7jPR/heart-free-icon-font.png'
  const lineLike = 'https://i.ibb.co/Nr77tWK/heart-free-icon-font-1.png'

  function chnageLike(item) {
    setClothes([...clothes], item.like = !item.like)
  }

  useEffect(() => {
    setClothes(likeClothes)
  }, [])

  return (
    <Row md={5} className='g-5 mypage-like'>
      {clothes.map((cloth, idx) => (
        <Col key={idx} style={{margin: '0'}}>
          <div className='cloth-card' onClick={() => console.log('go to cloth detail')} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
            <Card.Img src={cloth.clothImage} alt='like-cloth' />
            <p className='text one-line'>{cloth.brand}</p>
            <p className='text two-line'>{cloth.clothName}</p>
            <p className='text one-line price'>{cloth.clothPrice}원</p>
            <div onClick={() => chnageLike(cloth)} className='card-heart'>
              {cloth.like ? 
              <img src={fillLike} alt='heart' />
              :
              <img src={lineLike} alt='heart' />
              }
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default likeCloth;
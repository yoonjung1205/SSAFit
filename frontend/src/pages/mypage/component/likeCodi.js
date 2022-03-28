import '../scss/cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { likeCodies } from '../data';

const LikeCodi = () => {
  const [codies, setCodies] = useState([])
  const fillLike = 'https://i.ibb.co/RDV7jPR/heart-free-icon-font.png'
  const lineLike = 'https://i.ibb.co/Nr77tWK/heart-free-icon-font-1.png'

  function chnageLike(item) {
    setCodies([...codies], item.like = !item.like)
  }

  useEffect(() => {
    const newCodies = []
    setCodies(likeCodies)
  }, [])

  return (
    <Row md={5} className='g-5 mypage-codi'>
      {codies.map((codi, idx) => {
        return(
          <Col key={idx} style={{margin: '0'}}>
            <div className='codi-card' onClick={() => console.log('go to codi detail')} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
              <Card.Img src={codi.codiImage} alt='like-codi' />
              <p className='text one-line'>{codi.tpo}</p>
              <p className='text two-line'>{codi.codiTitle}</p>
              <p className='text one-line'>{codi.hashtags}</p>
              <div onClick={() => chnageLike(codi)} className='card-heart'>
                {codi.like ? 
                <img src={fillLike} alt='heart' />
                :
                <img src={lineLike} alt='heart' />
                }
              </div>
            </div>
          </Col>
        )}
      )}
    </Row>
  );
};

export default LikeCodi;
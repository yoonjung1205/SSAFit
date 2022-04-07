/* eslint-disable react-hooks/exhaustive-deps */
import '../scss/Cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CustomAxios from '../../../CustomAxios';

const Recent = ({ user, history }) => {
  const [clothes, setClothes] = useState([])

  const comma = function(tar){
    let result = ''
    if (tar){
      for (let i = tar.length - 1; i >= 0; i--){
        if (i !== tar.length - 1 && (tar.length - i - 1) % 3 === 0){
          result = ',' + result
        }
        result = tar[i] + result
      }
    }
    return result
  }

  useEffect(() => {
    const getRecent = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_da/user/recentItems/${user.id}`
      })
      .then(res => {
        setClothes(res.data)
      })
    }
    getRecent()
  }, [])


  if (clothes.length > 0) {
    return (
      <Row md={5} className='g-5 mypage-recent'>
        {clothes.map((cloth, idx) => (
          <Col key={idx} style={{margin: '0'}}>
            <div className='cloth-card' onClick={() => history.push(`/item/${cloth.newClothId}`)} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
              <Card.Img src={cloth.clothImg} alt='recent-cloth' />
              <p className='text one-line'>{cloth.brand}</p>
              <p className='text two-line'>{cloth.clothName}</p>
              <p className='text one-line price'>{comma(String(cloth.clothPrice))}원</p>
            </div>
          </Col>
        ))}
      </Row>
    );
  } else {
    return (<div className='no-cards'>최근에 본 상품이 없습니다...(*￣０￣)ノ</div>)
  }
};

export default Recent;
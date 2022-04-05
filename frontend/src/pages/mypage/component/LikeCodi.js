import '../scss/Cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { likeCodies } from '../data';
import CustomAxios from '../../../CustomAxios';

const LikeCodi = () => {
  const [codies, setCodies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const fillLike = 'https://i.ibb.co/RDV7jPR/heart-free-icon-font.png'
  const lineLike = 'https://i.ibb.co/Nr77tWK/heart-free-icon-font-1.png'

  function chnageLike(item) {
    setCodies([...codies], item.like = !item.like)
  }

  const changePage = num => {
    let newPage = currentPage + num
    if (newPage < 1) {
      alert('첫번째 페이지 입니다.')
    } else if (newPage > totalPage) {
      alert('마지막 페이지 입니다.')
    } else {
      setCurrentPage(newPage)
    }
  }

  const makeNumList = () => {
    let arr = []
    if (totalPage < 5) {
      // 1부터 totalPage까지
      for (let i = 1; i < totalPage+1; i++) {arr.push(i)}
    } else if (currentPage > totalPage-2) {
      // totalPage -4부터 totalPage까지 
      for (let i = totalPage-4; i < totalPage+1; i++) {arr.push(i)}
    } else if (currentPage < 3) {
      // 1부터 5까지
      for (let i = 1; i < 6; i++) {arr.push(i)}
    } else {
      // currentPage -2부터 +2까지
      for (let i = currentPage-2; i < currentPage+3; i++) {arr.push(i)}
    }
    return arr
  }

  useEffect(() => {
    setCodies(likeCodies)
    const getLikeCodies = async () => {
      await CustomAxios({
        method: 'get',
        url:`/api_be/codi/mylist?page=${1}&size=${5}`,
      })
      .then(res => {
        console.log('getLikeCodies:', res)
        setCodies(res.data.codiList)
      })
      .catch(err => console.log(err))
    }
    // getLikeCodies()
  }, [])

  return (
    <>
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
      <div className='like-bottom'>
        <div className='pagenation'>
          <div onClick={() => {changePage(-1)}}><p>&lt;</p></div>
          {makeNumList().map((num, idx) => (
            <div className={currentPage === num ? 'active': ''} key={idx} 
              onClick={() => setCurrentPage(num)}
              style={{width: `${totalPage > 4 ? '15%' : `${75/totalPage}%`}`}}
            >
              <p>{num}</p>
            </div>
          ))}
          <div onClick={() => {changePage(1)}}><p>&gt;</p></div>
        </div>
      </div>
    </>
  );
};

export default LikeCodi;
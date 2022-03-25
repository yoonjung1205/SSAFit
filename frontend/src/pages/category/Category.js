import './scss/Category.scss'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { Card, Col, Row } from 'react-bootstrap';
import { cateClothes } from './data';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {
  const params = useParams()
  const path = params.category
  const topText = path[0].toUpperCase() + path.slice(1)
  const [clothes, setClothes] = useState([])
  const [page, setPage] = useState(1)

  function changePage (num) {
    let newPage = page + num
    if (newPage < 1) {
      alert('첫번째 페이지 입니다.')
    } else if (newPage > 5) {
      alert('마지막 페이지 입니다.')
    } else {
      setPage(newPage)
    }
  }

  useEffect(() => {
    setClothes(cateClothes)
  }, [])

  useEffect(() => {
    console.log('change pagenation', page)
  }, [page])

  return (
    <>
      <NavigationBar boldPath='RECOMMEND' />
      <div className='category'>
        <section className='cate-top'>
          <div className='cate-top-text'>
            <h2>{topText}</h2>
          </div>
        </section>
        <section className='cate-middle'>
          <Row md={5} className='g-5'>
          {clothes.map((cloth, idx) => (
            <Col key={idx}>
              <div className='cate-card' onClick={() => console.log('go to cloth detail')} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                <Card.Img src={cloth.clothImg} alt='cloth' />
                <p className='cate-card-text one-line'>{cloth.clothBrand}</p>
                <p className='cate-card-text two-line'>{cloth.clothName}</p>
                <p className='cate-card-text one-line last'>{cloth.clothPrice}원</p>
              </div>
            </Col>
          ))}
          </Row>
        </section>
        <section className='cate-bottom'>
          <div className='pagenation'>
            <div onClick={() => {changePage(-1)}}><p>&lt;</p></div>
            {[1, 2, 3, 4, 5].map(num => (
              <div className={page === num ? 'active': ''} key={num} onClick={() => setPage(num)}><p>{num}</p></div>
            ))}
            <div onClick={() => {changePage(1)}}><p>&gt;</p></div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Category;
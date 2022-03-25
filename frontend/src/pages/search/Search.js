import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import './scss/Search.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { searchClothes } from './data';


const Search = () => {
  let { word } = parse(useLocation().search)

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
    setClothes(searchClothes)
    console.log('search result!')
  }, [word])

  return (
    <>
      <NavigationBar boldPath='SEARCH' />
      <article className='serach'>
        <section className='search-top'>
          <div>
            <img className='left' src='https://i.ibb.co/GTGCmNp/left.png' alt='left' />
            <h2 className='center'>{word}</h2>
            <img className='right' src='https://i.ibb.co/jMFVpqn/right.png' alt='right' />
          </div>
        </section>
        {clothes.length === 0 ? 
        <>
          <div className='no-search'>
            <h4>"{word}"에 대한 결과가 없습니다</h4>
          </div>
        </>
        : 
        <>
          <section className='search-middle'>
            <Row md={5} className='g-5'>
            {clothes.map((cloth, idx) => (
              <Col key={idx}>
                <div className='search-card' onClick={() => console.log('go to cloth detail')} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                  <Card.Img src={cloth.clothImg} alt='cloth' />
                  <p className='search-card-text one-line'>{cloth.clothBrand}</p>
                  <p className='search-card-text two-line'>{cloth.clothName}</p>
                  <p className='search-card-text one-line last'>{cloth.clothPrice}원</p>
                </div>
              </Col>
            ))}
            </Row>
          </section>
          <section className='search-bottom'>
            <div className='pagenation'>
              <div onClick={() => {changePage(-1)}}><p>&lt;</p></div>
              {[1, 2, 3, 4, 5].map(num => (
                <div className={page === num ? 'active': ''} key={num} onClick={() => setPage(num)}><p>{num}</p></div>
              ))}
              <div onClick={() => {changePage(1)}}><p>&gt;</p></div>
            </div>
          </section>
        </>
        }
      </article>
      <Footer />
    </>
  );
};

export default Search;
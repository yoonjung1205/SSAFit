import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import './scss/Search.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { parse } from 'query-string';
import { useLocation, } from 'react-router-dom';
import CustomAxios from '../../CustomAxios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';


const Search = () => {
  const history = useHistory()
  let { word } = parse(useLocation().search)

  const [loading, setLoading] = useState(true)
  const [clothes, setClothes] = useState([])
  const [page, setPage] = useState(1)

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

  const changePage = num => {
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
    setLoading(true)
    const getSearchResult = async () => {
      await CustomAxios({
        method: 'get',
        url: `/api_be/goods/search?keyword=${word}`,
        withCredentials: true,
      })
      .then(res => {console.log(res.data.goodsList[0]); setClothes(res.data.goodsList)})
      .then(() => setLoading(false))
      .catch(err => {console.log(err, typeof(err)); setLoading(false)})
    }
    getSearchResult()
  }, [word])

  const SearchResult = () => {
    if (clothes.length) {
      return (
        <>
          <section className='search-middle'>
            <Row md={5} className='g-5'>
            {clothes.map((cloth, idx) => (
              <Col key={idx}>
                <div className='search-card' onClick={() => history.push(`/item/${cloth.newClothId}`)} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                  <Card.Img src={cloth.clothImg} alt='cloth' />
                  <span className='search-card-text one-line' style={{fontSize: '1.25rem'}}>{cloth.brand}</span>
                  <p className='search-card-text one-line size'>Size : {cloth.goodsSize}</p>
                  <p className='search-card-text one-line'>{cloth.clothName}</p>
                  <p className='search-card-text one-line last'>{comma(String(cloth.clothPrice))}원</p>
                </div>
              </Col>
            ))}
            </Row>
          </section>
          {/* 인피니티 스크롤 할거면 없애도 됨 */}
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
      )
    }
    return (
      <>
        <div className='no-search'>
          <h4>"{word}"에 대한 결과가 없습니다</h4>
        </div>
      </>
    )
  }

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
        {loading ?  <Loading /> : <SearchResult /> }
      </article>
      <Footer />
    </>
  );
};

export default Search;
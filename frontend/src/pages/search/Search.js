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
  const [result, setResult] = useState([])
  const [clothes, setClothes] = useState({})
  const [page, setPage] = useState(0)
  const [choice, setChoice] = useState(null)

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

  function setter() {
    const tempResult = [...result]
    const tempClothes = {...clothes}
  
    while (Object.keys(tempClothes).length < (15 * (page+1)) && tempResult.length){
      const target = tempResult.pop()
      if (!tempClothes[target.clothId]){
        tempClothes[target.clothId] = []
      }
      tempClothes[target.clothId].push(target)
    }

    return new Promise(resolve => resolve([tempResult, tempClothes]))
  }

  function goToDetail(key, newClothId){
    setChoice(null)
    if (newClothId){
      history.push(`/item/${newClothId}`)
    }
    else {
      if (choice === key){
        setChoice(null)
      }
      else{
        setChoice(key)
      }
    }
  }

  function scrollHandler() {
    const footer = document.getElementsByTagName('footer')[0]
    const topToFooter = footer.getBoundingClientRect().top
    const h = window.innerHeight
    if (0.94 * h - topToFooter > 0 && result.length){
      setLoading(true)
      setTimeout(() => setPage(page + 1), 500)
      const app = document.getElementsByClassName('App')[0]
      app.removeEventListener('scroll', scrollHandler)
    }
  }

  const goTop =  () => {
    const view = document.getElementsByClassName('App')[0]
    view.scrollTo({ top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    if (page * 15 < Object.keys(clothes).length){
      const app = document.getElementsByClassName('App')[0]
      app.addEventListener('scroll', scrollHandler)
    }
  })


  useEffect(() => {
    CustomAxios({
      method: 'get',
      url: `/api_be/goods/search?keyword=${word}`,
      withCredentials: true,
    })
    .then(res => {setResult(res.data.goodsList);setClothes({});setPage(0)})
    .then(() => {setPage(1);setLoading(false)})
  }, [word])


  useEffect(() => {
    setLoading(false)
    setter()
    .then(res => {setResult(res[0]); setClothes(res[1]);})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  const SearchResult = () => {
    if (Object.keys(clothes).length) {
      return (
        <>
          <section className='search-middle'>
            <Row md={5} className='g-5'>
            {Object.keys(clothes).map((key, idx) => (
              <Col key={idx}>
                {
                  <div className='search-card' onClick={() => {goToDetail(key)}} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                    <Card.Img src={clothes[key][0].clothImg} alt='cloth' />
                    <span className='search-card-text one-line' style={{fontSize: '1.25rem'}}>{clothes[key][0].brand}</span>
                    <p className='search-card-text one-line'>{clothes[key][0].clothName}</p>
                    <p className='search-card-text one-line last'>{comma(String(clothes[key][0].clothPrice))}원</p>
                    <p>{key}</p>
                    <div className='detail-choice' style={{display: choice === key ? 'flex':'none'}} onClick={() => setChoice(null)}>
                      선택해주세요
                      <div className='btn-box'>
                        {clothes[key].map(ele => (
                          <span className='choice-btn' onClick={() => goToDetail(key, ele.newClothId)} key={ele.newClothId}>
                            {ele.goodsSize}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              </Col>
            ))}
            </Row>
            {loading && <Loading/>}
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
        {(!result.length && !Object.keys(clothes).length) ?  <Loading /> : <SearchResult /> }
        <section onClick={() => goTop()} className='go-top'>top</section>
      </article>
      <Footer />
    </>
  );
};

export default Search;
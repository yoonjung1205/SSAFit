import '../scss/Cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import CustomAxios from '../../../CustomAxios';
import Swal from 'sweetalert2';

const LikeCodi = ({ history }) => {
  const [codies, setCodies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)


  const changePage = num => {
    let newPage = currentPage + num
    if (newPage < 1) {
      Swal.fire({
        text: '첫번째 페이지 입니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: 'orange'
      })
    } else if (newPage > totalPage) {
      Swal.fire({
        text: '마지막 페이지 입니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: 'orange'
      })
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
    const getLikeCodies = async () => {
      await CustomAxios({
        method: 'get',
        url:`/api_be/codi/mylist?page=${currentPage}&size=${5}`,
      })
      .then(res => {
        setCodies(res.data.codiList)
        setCurrentPage(res.data.pageNumber + 1)
        setTotalPage(Math.ceil(res.data.total/5))
      })
    }
    getLikeCodies()
  }, [currentPage])

  const Likes = () => {
    return (<>
      <Row md={5} className='g-5 mypage-codi'>
        {codies.map((codi, idx) => {
          return(
            <Col key={idx} style={{margin: '0'}}>
              <div className='codi-card' onClick={() => history.push(`/recommend_codi/${codi.codi_ID}`)} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                <Card.Img src={codi.codiImg} alt='like-codi' />
                <p className='text one-line'>TPO : {codi.tpo}</p>
                <p className='text two-line'>Description:  {codi.codiTitle}</p>
                {codi.hashtags[0] !== "[]" && 
                <p className='text one-line'>
                  {codi.hashtags.map(hashtag => `#${hashtag} `)}
                </p>
                }
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
    </>)
  }

  return (<>
  {codies.length > 0 ?
  <Likes />
  :
  <div className='no-cards'>찜한 코디가 없습니다...(*￣０￣)ノ</div>}
  </>);
};

export default LikeCodi;
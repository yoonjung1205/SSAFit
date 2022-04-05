import '../scss/Cards.scss'
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { likeClothes } from '../data';
import CustomAxios from '../../../CustomAxios';

const LikeCloth = ({ user, history }) => {
  const [clothes, setClothes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const fillLike = 'https://i.ibb.co/RDV7jPR/heart-free-icon-font.png'
  const lineLike = 'https://i.ibb.co/Nr77tWK/heart-free-icon-font-1.png'

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

  const chnageLike = (item) => {
    
    const likeBe = async() => {
      await CustomAxios({
        method: 'post',
        url: '/api_be/goods/like',
        data: item
      })
      .catch(err => console.log(err))
    }

    const likeDa = async() => {
      // 1은 긍정 2는 부정이면...좋아요 누를때 1보내고 취소 누를때 2?
      const num = item.like ? 2 : 1
      await CustomAxios({
        method: 'put',
        url: `/api_da/user/${user.id}`,
        data: {
          "newClothId": item.newClothId,
          "num": num
        }
      })
      .catch(err => console.log(err))
    }

    likeBe()
    .then(likeDa())
    .then(() => {
      console.log('change like status')
      setClothes([...clothes], item.like = !item.like)
    })
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
    setClothes(likeClothes)
    const getLikeClothes = async () => {
      await CustomAxios({
        method: 'get',
        url:`/api_be/goods/mylist?page=${1}&size=${5}`,
      })
      .then(res => {
        console.log('getLikeClothes:', res)
        setClothes(res.data.goodsList)
      })
      .catch(err => console.log(err))
    }
    // getLikeClothes()
  }, [])

  return (
    <>
      <Row md={5} className='g-5 mypage-like'>
        {clothes.map((cloth, idx) => (
          <Col key={idx} style={{margin: '0'}}>
            <div className='cloth-card' onClick={() => history.push(`/item/${cloth.newClothId}`)} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
              <Card.Img src={cloth.clothImg} alt='like-cloth' />
              <p className='text one-line'>{cloth.brand}</p>
              <p className='text two-line'>{cloth.clothName}</p>
              <p className='text one-line price'>{comma(String(cloth.clothPrice))}원</p>
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

export default LikeCloth;
import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import Loading from '../../../components/Loading';
import '../scss/reviews.scss'


const Review = ({ newClothId }) => {

  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const getReview = async () => {
    await CustomAxios({
      method: 'get',
      url: `/api_da/cloth/reviews/${newClothId}?page=${currentPage}&size=5`
    })
    .then(res => {
      console.log('getReview:', res.data)
      setReviews(res.data.items)
      setCurrentPage(res.data.page)
      setTotalPage(Math.ceil(res.data.total/5))
    })
    .then(() => setLoading(false))
    .catch(err => console.log(err, typeof(err)))
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
    setLoading(true)
    getReview()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

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


  const ReviewBodies = () => {
    if (reviews.length) {
      return (
        <>
          <div className='review-body'>
            {reviews.map(review => (
              <ReviewItem key={review.reviewId} review={review} no={review.reviewId} />
            ))}
          </div>
          <div className='review-bottom'>
            <div className='pagenation'>
              <div onClick={() => {changePage(-1)}}><p>&lt;</p></div>
              {makeNumList().map((num, idx) => (
                <div className={currentPage === num ? 'active': ''} key={idx} 
                  onClick={() => setCurrentPage(num)}
                >
                  <p>{num}</p>
                </div>
              ))}
              <div onClick={() => {changePage(1)}}><p>&gt;</p></div>
            </div>
          </div>
        </>
      )
    }
    return <p style={{textAlign: 'center', marginTop: '2rem'}}>리뷰가 없어요...(*￣０￣)ノ</p>
  }


  return (
    <section className='review-container' id='review'>
      <div className='review-header'>
        <h3>Review</h3>
        <p>사용자와 유사한 관심도,신체 사이즈 유저의 리뷰를 제공합니다.</p>
      </div>
      {loading ? 
      <Loading />
      :
      <ReviewBodies />
      }
    </section>
  );
};

export default Review;
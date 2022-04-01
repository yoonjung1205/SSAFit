import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import Loading from '../../../components/Loading';
import '../scss/reviews.scss'


const Review = ({ newClothId }) => {

  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [pagenation, setPagenation] = useState({ page: 1, total: 0})

  const getReview = async () => {
    await CustomAxios({
      method: 'get',
      url: `/api_da/cloth/reviews/${newClothId}?page=${4}&size=5`
    })
    .then(res => {
      console.log('getReview:', res.data)
      setReviews(res.data.items)
      setPagenation({page: res.data.page, total: res.data.total})
    })
    .then(() => setLoading(false))
    .catch(err => console.log(err, typeof(err)))
  }

  useEffect(() => {
    setLoading(true)
    getReview()
  }, [])

  const changePage = num => {
    let newPage = pagenation.page + num
    if (newPage < 1) {
      alert('첫번째 페이지 입니다.')
    } else if (newPage > 5) {
      alert('마지막 페이지 입니다.')
    } else {
      setPagenation({...pagenation, page: newPage})
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
              {[1, 2, 3, 4, 5].map(num => (
                <div className={pagenation.page === num ? 'active': ''} key={num} 
                  onClick={() => setPagenation({...pagenation, page: num})}
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
    <section className='review-container'>
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
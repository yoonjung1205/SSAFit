import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import { DA_URL, accessToken, refreshToken } from '../../../Request';
import ReviewItem from './ReviewItem';
import '../scss/reviews.scss'


const Review = ({ newClothId }) => {

  const [reviews, setReviews] = useState([])
  const [pagenation, setPagenation] = useState({ page: 1, total: 0})

  const getReview = async () => {
    await CustomAxios({
      method: 'get',
      // url: `${DA_URL}/cloth/reviews/${newClothId}?page=${pagenation.page}&size=5`
      url: `${DA_URL}/cloth/reviews/${newClothId}?page=${4}&size=5`
    })
    .then(res => {
      console.log('getReview:', res.data)
      setReviews(res.data.items)
      setPagenation({page: res.data.page, total: res.data.total})
    })
    .catch(err => console.log(err, typeof(err)))
  }

  useEffect(() => {
    getReview()
  }, [])


  if (!reviews.length) {
    return null
  }

  return (
    <section className='review-container'>
      <div className='review-header'>
        <h3>Review</h3>
        <p>사용자와 유사한 관심도,신체 사이즈 유저의 리뷰를 제공합니다.</p>
      </div>
      <div className='review-body'>
        {reviews.map(review => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Review;
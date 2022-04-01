import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BE_URL, accessToken, refreshToken } from '../../../Request';
import '../scss/reviews.scss'

const ReviewItem = ({ key, review }) => {

  const [comments, setComments] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const size = {1: '커요', 2: '보통이에요', 3: '작아요'}
  const bright = {1: '밝아요', 2: '보통이에요', 3: '어두워요'}
  const color = {1: '선명해요', 2: '보통이에요', 3: '흐려요'}
  const thickness = {1: '두꺼워요', 2: '보통이에요', 3: '얇아요'}

  useEffect(() => {
    const getComment = async () => {
      await CustomAxios({
        method: 'get',
        url: `${BE_URL}/goods/houses/comments/${key}`,
        headers: {
          "Content-type": "application/json",
          "Authorization": accessToken,
          // "Refresh" : refreshToken
        },
        withCredentials: true,
      })
      .then(res => {
        console.log('getComments:', res.data.goodsReviewList)
        setComments(res.data.goodsReviewList)
      })
      .catch(err => console.log(err, typeof(err)))
    }

    getComment()

  }, [])

  // ∨∧

  return (
    <div className='review-item'>
      <Row>
        <Col md={(isOpen || !review.reviewStyle) ? 12 : 10} className='review-text'>
          <div className='top'>
            <div>
              <span className='name'>{review.userName}</span>
              <span>{review.userSexMen ? '남성' : '여성'},</span>
              <span>{review.userHeight}cm,</span>
              <span>{review.userWeight}kg,</span>
              <span>({review.goodsSize}사이즈 구매)</span>
            </div>
            <div>
              <span className='date'>{review.date}</span>
            </div>
          </div>
          <div className='desc'>
            <span className='item'>사이즈가 <span>{size[review.size]}</span></span>
            <span className='item'>밝기가 <span>{bright[review.bright]}</span></span>
            <span className='item'>색깔이 <span>{color[review.color]}</span></span>
            <span className='item'>두께가 <span>{thickness[review.thickness]}</span></span>
          </div>
          <div className='content'>
            {review.reviewContent.map((v, i) => <span key={i}>{v} </span>)}
          </div>
        </Col>
        {(isOpen || review.reviewImg === "-") ? null : (
        <Col className='review-image'>
          <img src={review.reviewImg} alt='review-img' />
        </Col>
        )}
      </Row>
      <div className='review-open'>
        <p>댓글 {comments.length}</p>
        {isOpen ? <p>∧ 리뷰 펼치기</p> : <p>∨ 리뷰 펼치기</p>}
      </div>
      <div className='review-bottom'>
      </div>
    </div>
  );
};

export default ReviewItem;
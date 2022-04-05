/* eslint-disable react-hooks/exhaustive-deps */
import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../scss/reviews.scss'
import Comment from './Comment';

const ReviewItem = ({ no, review, currentPage }) => {

  const [commentList, setCommentList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const size = {1: '커요', 2: '보통이에요', 3: '작아요'}
  const bright = {1: '밝아요', 2: '보통이에요', 3: '어두워요'}
  const color = {1: '선명해요', 2: '보통이에요', 3: '흐려요'}
  const thickness = {1: '두꺼워요', 2: '보통이에요', 3: '얇아요'}

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      postComment()
    }
  }

  const postComment = () => {
    const email = JSON.parse(window.sessionStorage.getItem('userInfo')).sub
    if (inputText.trim().length) {
      CustomAxios({
        method: 'post',
        url: '/api_be/goods/comments',
        headers: {
          "Content-type": "application/json",
        },
        data: {
          contents: inputText,
          email,
          reviewId: review.reviewId
        },
        withCredentials: true,
      })
      .then(res=> {
        console.log('postComment:', res.data.goodsReviewList)
        setCommentList(res.data.goodsReviewList)
      })
      .catch(err => console.log(err, typeof(err)))
    } else {
      alert('댓글 내용이 없습니다')
    }
    setInputText('')
  }

  const getComment = async () => {
    await CustomAxios({
      method: 'get',
      url: `/api_be/goods/houses/comments/${no}`,
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    })
    .then(res => {
      console.log('getComments:', res.data.goodsReviewList)
      setCommentList(res.data.goodsReviewList)
    })
    .catch(err => console.log(err, typeof(err)))
  }

  useEffect(() => {
    getComment()
  }, [review])

  // ∨∧

  return (
    <Row className='review-item'>
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
          {review.size > 0 && <span className='item'>사이즈가 <span>{size[review.size]}</span></span>}
          {review.bright > 0 && <span className='item'>밝기가 <span>{bright[review.bright]}</span></span>}
          {review.color > 0 && <span className='item'>색깔이 <span>{color[review.color]}</span></span>}
          {review.thickness > 0 && <span className='item'>두께가 <span>{thickness[review.thickness]}</span></span>}
        </div>
        <div className='content'>
          {review.reviewContent.map((v, i) => <span key={i}>{v} </span>)}
        </div>
      </Col>

      {!review.reviewStyle ? null : 
      <Col md={isOpen ? 3 : 2} className='review-image' style={{textAlign: `${isOpen ? 'left' : 'right'}`}}>
        <img src={review.reviewImg} alt='review-img' />
      </Col>
      }

      <Col md={12} className='review-open'>
        <p onClick={() => setIsOpen(!isOpen)} title='댓글 보기'>댓글 {commentList.length}</p>
        <p onClick={() => setIsOpen(!isOpen)}>{isOpen ? "∧ 리뷰 접기" : "∨ 리뷰 펼치기"}</p>
      </Col>

      {isOpen && 
      <>
        <Col md={12} className='review-comments'>
          {commentList.length ? 
          commentList.map((v, i) => <Comment key={i} comment={v} setCommentList={setCommentList} commentList={commentList} />)
          :
          <><p className='no-comments'>댓글이 없습니다...(*￣０￣)ノ</p><hr /></>
          }
        </Col>
        <Col md={12} className='write-comment'>
          <div className='input-tag'>
            <input value={inputText} placeholder='댓글을 입력하세요'
              onChange={(e) => setInputText(e.target.value)} onKeyUp={checkEnter} />
          </div>
          <div className='button-tag'>
            <button className='write-button' onClick={() => postComment()}><span /><p>작성하기</p></button>
          </div>
        </Col>
      </>
      }
    </Row>
  );
};

export default ReviewItem;
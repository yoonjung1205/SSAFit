import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BE_URL, accessToken, refreshToken } from '../../../Request';
import '../scss/reviews.scss'
import editImg from '../images/edit.png'
import delImg from '../images/del.png'
import Comment from './Comment';

const ReviewItem = ({ key, review }) => {

  const [comments, setComments] = useState([])
  const [isOpen, setIsOpen] = useState(true)
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
    // // post 요청인데 data로 담지 않고 쿼리로 담아서 보낸다..??
    // // data가 편한데 변경 가능?
    // axios({
    //   method: 'post',
    //   url: `${BE_URL}/goods/comments`,
    //   headers: {
    //     "Content-type": "application/json",
    //     "Authorization": accessToken,
    //     // "Refresh" : refreshToken
    //   },
    //   data: {},
    //   withCredentials: true,
    // })
    // .then(res=> {
    //     console.log(res)
    //   setInputText('')
    // })
    // .catch(err => console.log(err, typeof(err)))
    console.log(inputText)
    setInputText('')
  }

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
        console.log('getComments:', res.data)
        // setComments(res.data.goodsReviewList)
        setComments([
          {
            comment: "코멘트",
            id: 0,
            reviewId: "reviewId",
            user: {
              birthDate: "string",
              createdAt: "2022-04-01T03:10:56.617Z",
              email: "email",
              gender: "FEMALE",
              height: 0,
              nickname: "nickname",
              profileImageUrl: "string",
              providerType: "FACEBOOK",
              role: "string",
              roleList: [
                "string"
              ],
              updatedAt: "2022-04-01T03:10:56.617Z",
              weight: 0
            }
          },
          {
            comment: "코멘트",
            id: 0,
            reviewId: "reviewId",
            user: {
              birthDate: "string",
              createdAt: "2022-04-01T03:10:56.617Z",
              email: "email",
              gender: "FEMALE",
              height: 0,
              nickname: "nickname",
              profileImageUrl: "string",
              providerType: "FACEBOOK",
              role: "string",
              roleList: [
                "string"
              ],
              updatedAt: "2022-04-01T03:10:56.617Z",
              weight: 0
            }
          }
        ])
      })
      .catch(err => console.log(err, typeof(err)))
    }

    getComment()
  }, [])

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
          <span className='item'>사이즈가 <span>{size[review.size]}</span></span>
          <span className='item'>밝기가 <span>{bright[review.bright]}</span></span>
          <span className='item'>색깔이 <span>{color[review.color]}</span></span>
          <span className='item'>두께가 <span>{thickness[review.thickness]}</span></span>
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
        <p onClick={() => setIsOpen(!isOpen)} title='댓글 보기'>댓글 {comments.length}</p>
        <p onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "∧ 리뷰 접기" : "∨ 리뷰 펼치기"}
        </p>
      </Col>
      {isOpen && 
      <>
        <Col md={12} className='review-comments'>
          {comments.length ? 
          // 댓글이 있을 때
          <>
            {comments.map((v, i) => {
              return (
            <Comment key={i} v={v} />
            )})}
          </>
          :
          // 댓글이 없을 때
          <>
            <p className='no-comments'>
              댓글이 없습니다...(*￣０￣)ノ
            </p>
            <hr />
          </>
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
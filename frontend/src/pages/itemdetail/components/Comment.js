/* eslint-disable react-hooks/exhaustive-deps */
import CustomAxios from '../../../CustomAxios';
import React, { useEffect, useState } from 'react';
import '../scss/comment.scss'


const Comment = ({ comment, commentList, setCommentList }) => {
  const [viewComment, setViewComment] = useState('')
  const [inputText, setInputText] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      putComment()
    }
  }

  const putComment = () => {
    const email = JSON.parse(window.sessionStorage.getItem('userInfo')).sub
    console.log('change:', inputText)
    CustomAxios({
      method: 'put',
      url: `/api_be/goods/houses/comments/${comment.id}`,
      headers: {
        "Content-type": "application/json",
      },
      data: {
        contents: inputText,
        reviewId: comment.reviewId,
        email,
      },
      withCredentials: true,
    })
    .then(() => {
      setViewComment(inputText)
      setIsEdit(false)
    })
    .catch(err => console.log(err, typeof(err)))
  }

  const delComment = () => {
    CustomAxios({
      method: 'delete',
      url: `/api_be/goods/houses/comments/${comment.id}`,
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('성공?', res.data.message)
      setCommentList(commentList.filter(v => v.id !== comment.id))
    })
    .catch(err => console.log(err, typeof(err)))
  }

  useEffect(() => {
    setViewComment(comment.comment)
    setInputText(comment.comment)
  }, [comment])


  return (
    <>
      <div className='comment'>
        <div className='nickname'><p className='nick-p'>{comment.user.nickname}</p></div>
        {isEdit ? 
        <div className='comment-edit'>
          <input value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyUp={checkEnter} />
          <button onClick={() => putComment()}><span /><p>수정</p></button>
        </div>
        :
        <div className='content'><p>{viewComment}</p></div>
        }
        {/* 댓글의 userId가 필요함 -> 지금 userId와 같은지 비교하기 위해 -> style display none*/}
        {comment.user.email === JSON.parse(window.sessionStorage.getItem('userInfo')).sub &&
        <>
          <div className='edit-btn' onClick={() => setIsEdit(!isEdit)} />
          <div className='del-btn' onClick={(comment) => delComment(comment.id)} />
        </>
        }
      </div>
      <hr />
    </>
  );
};

export default Comment;
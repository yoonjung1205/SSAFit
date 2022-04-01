import axios from 'axios';
import React, { useState } from 'react';

const Comment = ({ v }) => {

  const [isEdit, setIsEdit] = useState(false)

  // const onClickEdi = () => {
  //   if (isEdit) {
  //     axios({

  //     })
  //   }
  // }

  return (
    <>
      <div className='comment'>
        <div className='nickname'>{v.user.nickname}</div>
        <div className='content'>{v.comment}</div>
        {/* 댓글의 userId가 필요함 -> 지금 userId와 같은지 비교하기 위해 -> style display none*/}
        <div className='edit' onClick={() => setIsEdit(!isEdit)}></div>
        <div className='del' style={{display: `${isEdit ? 'none' : 'block'}`}}></div>
      </div>
      <hr />
    </>
  );
};

export default Comment;
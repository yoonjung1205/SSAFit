/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import Rate from './Rate'
import heart from '../images/heart.png'
import CustomAxios from '../../../CustomAxios'


export default function ItemInfo({ item, user }) {
  const [liked, setLiked] = useState(false)

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


  const goToShop = function(){
    if (Object.keys(item).length){
      window.open(`https://store.musinsa.com/app/goods/${item.clothId}`)
    }
  }

  
  const getLikeInfo = () => {
    CustomAxios({
      method: 'get',
      url: `/api_be/goods/like?clothId=${item.clothId}&userId=${user.id}`,
    })
    .then(res => {
      console.log('getLikeInfo!!!', res.data)
      setLiked(res.data.like)
    })
    .catch(err => {console.log(err); console.log(item.newClothId, user.id)})
  }


  const like = function(){
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
      const num = liked ? 2 : 1
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
    .then(setLiked(!liked))
  }

  useEffect(() => {
    if (Object.keys(item).length){
      getLikeInfo()
    }
  }, [item])
  


  return (
    <section className='detail-header'>
      <h3 className='item-category'>{item.largeCategoryName} &gt; {item.smallCategoryName}</h3>
      <div className='item-box'>
        <div className='image-box'>
          <img src={item.clothImg} alt="image" />
          <span className={liked ? 'liked':''} onClick={() => like()}>
            <img src={heart} alt="like" />
          </span>
        </div>
        <div className='item-info'>
          <h2 className='brand'>{item.brand}</h2>
          <h3 className='name'>{item.clothName}</h3>
          <Rate rate={item.clothRate}/>
          <h3 className='price'>{comma(String(item.clothPrice))}원</h3>
          <h6 className='tags'>
            {item.clothHashtags && item.clothHashtags[0] !== "[]" && item.clothHashtags.map((hashtag, idx) => 
            <span key={idx} style={{marginRight: '0.5rem'}}>#{hashtag}</span>
            )}
          </h6>
          <h6>Size : {item.goodsSize}</h6>
          <button onClick={() => goToShop()}>
            <span/>
            구매하러 가기
          </button>
        </div>
      </div>
    </section>
  )
}

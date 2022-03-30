/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from "react-router-dom";
import '../scss/recCategory.scss'

const recCategory = ({cate, clothes}) => {
  let history = useHistory()

  const goToDetail = () => {
    history.push('/item/1')
  }

  const clickMore = () => {
    window.localStorage.setItem('clothes', JSON.stringify(clothes))
    history.push(`/recommend/${cate}`)
  }

  if (!clothes){
    return false
  }

  return (
    <div className='rec-category'>
      <div className='rec-cate-text'>
        <h3>{cate}</h3>
        <p onClick={() => clickMore()}>더보기</p>
      </div>
      <div className='rec-cate-cloth'>

      { clothes.slice(0, 5).map((cloth, idx) => (
        <div className='card' onClick={() => goToDetail()} key={idx}>
          <div className='card-image'>
            <img src={cloth.clothImg} alt='cloth' />
          </div>
          <div className='card-text'>
            <p>{cloth.brand}</p>
            <p>{cloth.clothName}</p>
            <p>Price: {cloth.clothPrice}</p>
            <p>Size: {cloth.goodsSize}</p>
          </div>
        </div>
      ))}

      </div>
    </div>
  );
};

export default recCategory;
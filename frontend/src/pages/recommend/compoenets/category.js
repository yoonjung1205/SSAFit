/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from "react-router-dom";
import '../scss/category.scss'

const category = ({cate}) => {
  let history = useHistory()

  return (
    <div className='rec-category'>
      <div className='rec-cate-text'>
        <h3>{cate}</h3>
        <p onClick={() => history.push(`/recommend/${cate.toLowerCase()}`)}>더보기</p>
      </div>
      <div className='rec-cate-cloth'>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-image'>
            <img src='//image.msscdn.net/images/goods_img/20180824/836981/836981_2_500.jpg' alt='cloth-image' />
          </div>
          <div className='card-text'>
            <p>브랜드는 한줄</p>
            <p>옷 이름은 두줄</p>
            <p>가격은 한줄</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default category;
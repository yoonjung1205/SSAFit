/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
// import { useHistory } from 'react-router-dom';
import './scss/Main.scss'
import NavigationBar from '../components/NavigationBar';
import maintop from './image/maintop.png'

const Main = () => {
  // let history = useHistory()
  const onClickButton = (path) => {
    console.log(path, '로 이동')
    // history.push(path)
  }

  return (
    <article className='main'>
      <NavigationBar />
      <section className='top'>
        <div className='image'>
          <img src={maintop} alt="main-top" />
        </div>
        <div className='text'>
          <p>맞는 옷을 찾기 위해 고민하지 마세요</p>
          <p>빅데이터 기반 알고리즘으로 맞춤 옷을 추천해드립니다</p>
        </div>
      </section>

      <section className='tpo'>
        <div className='left'>
          <img src="https://i.ibb.co/Qvy9XQW/tpo.png" alt="tpo-image" />
        </div>
        <div className='right'>
          <div className='title'>TPO</div>
          <div className='content'>
            <p>Time, Place, Occasion에 맞는 코디를 추천해드립니다.</p>
            <p>아이템의 키워드를 분석해 태그를 분류하고 라벨링하여 최적의 추천을 제공합니다.</p>
          </div>
          <button onClick={() => onClickButton('/tpo')}>
            <span>TPO</span>
          </button>
        </div>
      </section>

      <section className='recommend'>
        <div className='left'>
          <div className='title'>Recommend</div>
          <div className='content'>유저 정보와 아이템의 리뷰, 유저의 로그를 분석하여 높은 신뢰도의 상품 추천을 제공합니다.</div>
          <button onClick={() => onClickButton('/recommend')}>
            <span>Recommend</span>
          </button>
        </div>
        <div className='right'>
          <img src="https://i.ibb.co/7g3qPp8/recommend.png" alt="recommend-image" />
        </div>
      </section>

    </article>
  );
};

export default Main;
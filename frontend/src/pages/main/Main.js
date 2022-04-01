/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import maintop from './images/maintop.png'
import './scss/Main.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Main = () => {
  const history = useHistory()

  return (
    <article className='main'>
      <NavigationBar />
      <section className='main-top'>
        <div className='main-top-image'>
          <img src={maintop} alt="main-top" />
        </div>
        <div className='text'>
          <h3>맞는 옷을 찾기 위해 고민하지 마세요</h3>
          <h3>빅데이터 기반 알고리즘으로 맞춤 옷을 추천해드립니다</h3>
        </div>
      </section>
      <section className='main-tpo'>
        <img className='left' src="https://i.ibb.co/Qvy9XQW/tpo.png" alt="tpo-image" />
        <div className='right'>
          <h3>TPO</h3>
          <p className='content'>Time, Place, Occasion에 맞는 코디를 추천해드립니다.<br/>아이템의 키워드를 분석해 태그를 분류하고 라벨링하여<br/>최적의 추천을 제공합니다.</p>
          <button onClick={() => history.push('/tpo')}>
            <span>TPO</span>
          </button>
        </div>
      </section>
      <section className='main-recommend'>
        <div className='left'>
          <h3>Recommend</h3>
          <p className='content'>유저 정보와 아이템의 리뷰, 유저의 로그를 분석하여<br/>높은 신뢰도의 상품 추천을 제공합니다.</p>
          <button onClick={() => history.push('/recommend')}>
            <span>Recommend</span>
          </button>
        </div>
        <img className='right' src="https://i.ibb.co/7g3qPp8/recommend.png" alt="recommend-image" />
      </section>
      <Footer />
    </article>
  );
};

export default Main;
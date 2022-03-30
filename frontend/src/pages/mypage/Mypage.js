import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import MyInfo from './component/MyInfo'
import Recent from './component/Recent'
import LikeCloth from './component/LikeCloth'
import LikeCodi from './component/LikeCodi'
import Faq from './component/Faq'
import './scss/Mypage.scss'
import { Col, Row } from 'react-bootstrap';

const Mypage = () => {
  const [myinfo, setMyinfo] = useState({})
  const [menu, setMenu] = useState('recent')
  const colorHanger = 'https://i.ibb.co/cTB977h/free-icon-clothes-hanger-3100599.png'
  const whiteHanger = 'https://i.ibb.co/18ktfCy/free-icon-clothes-hanger-3100575.png'
  
  useEffect(() => {
    let tmp = window.sessionStorage.getItem('userInfo')
    tmp = JSON.parse(tmp)
    setMyinfo(tmp)
  }, [])

  return (
    <>
      <NavigationBar boldPath="MYPAGE" />
      <article className='mypage'>
        <section className='mypage-myinfo'>
          <MyInfo info={myinfo} />
        </section>
        <hr style={{margin: 0}}/>
        <section className='hanger'>
          <Row>
            <Col md={2} className='menus'>
              <div />
              <div className={`menu ${menu === 'recent' ? 'active' : ''}`} onClick={() => setMenu('recent')}>
                <img src={menu === 'recent' ? colorHanger : whiteHanger} alt='hanger' />
                <p>최근에 본 상품</p>
              </div>
              <div className={`menu ${menu === 'likeCloth' ? 'active' : ''}`} onClick={() => setMenu('likeCloth')}>
                <img src={menu === 'likeCloth' ? colorHanger : whiteHanger} alt='hanger' />
                <p>찜한 옷</p>
              </div>
              <div className={`menu ${menu === 'likeCodi' ? 'active' : ''}`} onClick={() => setMenu('likeCodi')}>
                <img src={menu === 'likeCodi' ? colorHanger : whiteHanger} alt='hanger' />
                <p>찜한 코디</p>
              </div>
              <div className={`menu ${menu === 'faq' ? 'active' : ''}`} onClick={() => setMenu('faq')}>
                <img src={menu === 'faq' ? colorHanger : whiteHanger} alt='hanger' />
                <p>FAQ</p>
              </div>
              <div />
            </Col>
            <Col md={10} className='content'>
              {menu === 'recent' && <Recent />}
              {menu === 'likeCloth' && <LikeCloth />}
              {menu === 'likeCodi' && <LikeCodi />}
              {menu === 'faq' && <Faq />}
            </Col>
          </Row>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default Mypage;
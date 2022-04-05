import React from 'react';
import Start1 from './components/start1'
import Start2 from './components/start2'
import Start3 from './components/start3'
import Footer from '../../components/Footer'
import './scss/Start.scss'
import { useHistory } from 'react-router-dom';

const Start = () => {
  const isLogin =  window.sessionStorage.getItem('userInfo')
  const history = useHistory()
  const goPage = (path) => {
    if (!isLogin) {
      history.push('/login')
    } else {
      history.push(path)
    }
  }
  return (
    <article className='start'>
      <Start1 isLogin={isLogin} goPage={goPage} />
      <Start2 isLogin={isLogin} goPage={goPage} />
      <Start3 goPage={goPage} />
      <Footer />
    </article>
  );
};

export default Start;
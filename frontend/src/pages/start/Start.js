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

  return (
    <article className='start'>
      <Start1 isLogin={isLogin} history={history} />
      <Start2 isLogin={isLogin} history={history} />
      <Start3 isLogin={isLogin} history={history} />
      <Footer />
    </article>
  );
};

export default Start;
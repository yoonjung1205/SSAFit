import React from 'react';
import Start1 from './components/start1'
import Start2 from './components/start2'
import Start3 from './components/start3'
import Footer from '../../components/Footer'
import './scss/Start.scss'

const Start = () => {
  return (
    <article className='start'>
      <Start1 />
      <Start2 />
      <Start3 />
      <Footer />
    </article>
  );
};

export default Start;
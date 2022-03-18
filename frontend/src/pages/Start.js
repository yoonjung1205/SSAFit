import React from 'react';
import Start1 from '../components/Start/start1'
import Start2 from '../components/Start/start2'
import Start3 from '../components/Start/start3'
import './scss/Start.scss'

const Start = () => {
  return (
    <div className='start'>
      <Start1 />
      <Start2 />
      <Start3 />
    </div>
  );
};

export default Start;
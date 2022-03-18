import React from 'react';
import Start_1 from '../components/Start/start_1'
import Start_2 from '../components/Start/start_2'
import Start_3 from '../components/Start/start_3'
import scss from './scss/Start.scss'

const Start = () => {
  return (
    <div className='start'>
      <Start_1 />
      <Start_2 />
      <Start_3 />
    </div>
  );
};

export default Start;
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/category'
import './scss/Recommend.scss'

const Recommend = () => {
  const [standard, setStandard] = useState('clothFavor')
  return (
    <article className='recommend'>
      <NavigationBar boldPath='RECOMMEND' />
      <section className='rec-top'>
        <div className='rec-top-text'>
          <h3>Make sure your style</h3>
        </div>
      </section>
      <section className='rec-choice'>
        <div className={`choice ${standard === 'clothFavor' ? 'rec-active' : ''}`} onClick={() => setStandard('clothFavor')}><h5>취향</h5></div>
        <div className='choice-line'></div>
        <div className={`choice ${standard === 'clothSize' ? 'rec-active' : ''}`} onClick={() => setStandard('clothSize')}><h5>사이즈</h5></div>
      </section>
      <section className='rec-clothes'>
        <RecCategory cate='Outer' />
        <RecCategory cate='Top' />
        <RecCategory cate='Bottom' />
      </section>
      <Footer />
    </article>
  );
};

export default Recommend;
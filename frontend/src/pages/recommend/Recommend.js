/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/recCategory'
import Loading from '../../components/Loading'
import './scss/Recommend.scss'

const Recommend = ({ recommend }) => {
  const [loading, setLoading] = useState(true)
  const [standard, setStandard] = useState('clothSize')
  
  useEffect(() => {
    if (Object.keys(recommend).length > 0){
      setLoading(false)
    }
  }, [recommend])

  if (loading){
    return (<Loading/>)
  }

  return (
    <article className='recommend'>
      <NavigationBar boldPath='RECOMMEND' />
      {/* <button onClick={() => getSizeRecommend()}>흠</button> */}
      <section className='rec-top'>
        <div className='rec-top-text'>
          <h3>Make sure your style</h3>
        </div>
      </section>
      <br />
      <section className='rec-choice'>
        <div className={`choice ${standard === 'clothSize' ? 'rec-active' : ''}`} onClick={() => setStandard('clothSize')}><h5>사이즈</h5></div>
        <div className='choice-line'></div>
        <div className={`choice ${standard === 'clothFavor' ? 'rec-active' : ''}`} onClick={() => setStandard('clothFavor')}><h5>취향</h5></div>
      </section>
      {loading ? <>Loading...</> :
      <>
        <section className='rec-clothes'>
          <RecCategory cate='Outer' clothes={recommend.outer} />
          <RecCategory cate='Top' clothes={recommend.top} />
          <RecCategory cate='Pants' clothes={recommend.pants} />
          <RecCategory cate='Onepiece' clothes={recommend.onepiece} />
          <RecCategory cate='Skirt' clothes={recommend.skirt} />
        </section>
      </>
      }
      <Footer />
    </article>
  );
};

export default Recommend;
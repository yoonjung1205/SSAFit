/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/recCategory'
import Loading from '../../components/Loading'
import './scss/Recommend.scss'

const Recommend = ({ size, color, style, category }) => {
  const [loading, setLoading] = useState(true)
  const [standard, setStandard] = useState('clothSize')
  const [recommend, setRecommend] = useState({})

  let tab = false

  useEffect(() => {
    if (Object.keys(recommend).length > 0){
      setLoading(false)
    }
  }, [recommend])

  useEffect(() => {
    if (standard === 'color'){
      setRecommend(color)
    }
    else if (standard === 'style'){
      setRecommend(style)
    }
    else {
      setRecommend(category)
    }
  }, [standard, color, style, category])

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
        <div className={`choice ${standard === 'size' ? 'rec-active' : ''}`} onClick={() => setStandard('size')}><h5>사이즈</h5></div>
        <div className='choice-line'></div>
        <div className={`choice ${standard === 'size' ? '' : 'rec-active'}`} onClick={() => tab = true}><h5>취향</h5></div>
        <div className='tab-container' style={{display: `${tab? 'block':'none'}`}} onClick={() => tab = false}>
          <div className='tab-box'>
            <h4>Recommend By</h4>
            <div className='tabs'>
              <h5 className='tab' onClick={() => {setStandard('color'); tab = false}}>Color</h5>
              <h5 className='tab' onClick={() => {setStandard('style'); tab = false}}>Style</h5>
              <h5 className='tab' onClick={() => {setStandard('category'); tab = false}}>Category</h5>
            </div>
          </div>
        </div>
      </section>
      <section className='rec-clothes'>
        <RecCategory cate='Outer' clothes={recommend.outer} />
        <RecCategory cate='Top' clothes={recommend.top} />
        <RecCategory cate='Pants' clothes={recommend.pants} />
        <RecCategory cate='Onepiece' clothes={recommend.onepiece} />
        <RecCategory cate='Skirt' clothes={recommend.skirt} />
      </section>
      <Footer />
    </article>
  );
};

export default Recommend;
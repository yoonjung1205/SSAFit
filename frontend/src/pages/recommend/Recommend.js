/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import { DA_URL } from '../../Request';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/recCategory'
import './scss/Recommend.scss'

const Recommend = () => {
  const [loading, setLoading] = useState(true)
  const [standard, setStandard] = useState('clothSize')
  const [recommendItems, setRecommendItems] = useState({})

  const getSizeRecommend = async () => {
    setLoading(true)
    try {
      const userId = '85806312'
      const url = `${DA_URL}/recommend/size/${userId}`

      const res = await axios({
        method: 'GET',
        url: url,
      })
      setRecommendItems(res.data)
      console.log(res.data)
    } catch (err) {
      console.log(err, typeof(err))
    }
    setLoading(false)
  }

  useEffect(() => {
    setRecommendItems(getSizeRecommend())
  }, [])


  return (
    <article className='recommend'>
      <NavigationBar boldPath='RECOMMEND' />
      <button onClick={() => getSizeRecommend()}>흠</button>
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
          <RecCategory cate='Outer' clothes={recommendItems.outer} />
          <RecCategory cate='Top' clothes={recommendItems.top} />
          <RecCategory cate='Pants' clothes={recommendItems.pants} />
        </section>
      </>
      }
      <Footer />
    </article>
  );
};

export default Recommend;
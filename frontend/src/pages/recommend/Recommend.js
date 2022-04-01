/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/recCategory'
import Loading from '../../components/Loading'
import './scss/Recommend.scss'

const Recommend = ({ recommend, setter, getter }) => {
  const [loading, setLoading] = useState(true)
  const [standard, setStandard] = useState('size')
  const [tab, setTab] = useState(false)

  const getRecAll = async function(){
    const local = window.localStorage

    if (standard === 'color'){
      console.log('색깔?')
      if (!local.getItem('color-rec')){
        try {
          let res = await getter('color')
          local.setItem('color-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.color(JSON.parse(local.getItem('color-rec')))
    }
    if (standard === 'style'){
      console.log('스타일?')
      if (!local.getItem('style-rec')){
        try {
          let res = await getter('style')
          local.setItem('style-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.style(JSON.parse(local.getItem('style-rec')))
    }
    if (standard === 'category'){
      console.log('카테고리?')
      if (!local.getItem('category-rec')){
        try {
          let res = await getter('category')
          local.setItem('category-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.category(JSON.parse(local.getItem('category-rec')))
    }
  }

  useEffect(() => {
    setLoading(true)
    if (Object.keys(recommend[standard]).length){
      console.log(standard)
      setLoading(false)
    }
    else {
      getRecAll()
    }
  }, [recommend, standard])


  

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
        <div className={`choice ${standard === 'size' ? '' : 'rec-active'}`} onClick={() => setTab(true)}><h5>취향</h5></div>
        <div className='tab-container' style={{display: `${tab? 'flex':'none'}`}} onClick={e => {if (e.target.className === 'tab-container'){setTab(false)}}}>
          <div className='tab-box'>
            <h4>Recommend By</h4>
            <div className='tabs'>
              <span className='tab' onClick={() => {setStandard('color'); setTab(false)}}><h6>Color</h6></span>
              <span className='tab' onClick={() => {setStandard('style'); setTab(false)}}><h6>Style</h6></span>
              <span className='tab' onClick={() => {setStandard('category'); setTab(false)}}><h6>Category</h6></span>
            </div>
          </div>
        </div>
      </section>
      <section className='rec-clothes'>
        <RecCategory cate='Outer' clothes={recommend[standard].outer} />
        <RecCategory cate='Top' clothes={recommend[standard].top} />
        <RecCategory cate='Pants' clothes={recommend[standard].pants} />
        {JSON.parse(window.sessionStorage.getItem('userInfo')).gender === 'FEMALE' &&
        <>
          <RecCategory cate='Onepiece' clothes={recommend[standard].onepiece} />
          <RecCategory cate='Skirt' clothes={recommend[standard].skirt} />
        </>
        }
      </section>
      <Footer />
    </article>
  );
};

export default Recommend;
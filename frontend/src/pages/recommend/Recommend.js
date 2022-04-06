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

  const tabName = {
    size: '취향', color: '색상', category: '카테고리', style: '스타일'
  }

  const getRecAll = async function(){
    const session = window.sessionStorage

    if (standard === 'color'){
      console.log('색깔?')
      if (!session.getItem('color-rec')){
        try {
          let res = await getter('color')
          session.setItem('color-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.color(JSON.parse(session.getItem('color-rec')))
    }
    if (standard === 'style'){
      console.log('스타일?')
      if (!session.getItem('style-rec')){
        try {
          let res = await getter('style')
          session.setItem('style-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.style(JSON.parse(session.getItem('style-rec')))
    }
    if (standard === 'category'){
      console.log('카테고리?')
      if (!session.getItem('category-rec')){
        try {
          let res = await getter('category')
          session.setItem('category-rec', JSON.stringify(res))
        }
        catch{}
      }
      setter.category(JSON.parse(session.getItem('category-rec')))
    }
  }

  useEffect(() => {
    setLoading(true)
    if (Object.keys(recommend[standard]).length){
      setLoading(false)
    }
    else {
      getRecAll()
    }
  }, [recommend, standard])


<<<<<<< HEAD
=======
  

  if (loading){
    return (<Loading/>)
  }

>>>>>>> 6127d93b931d63263e915d9786a2bdabbe8988db
  return (
    <article className='recommend'>
      <NavigationBar boldPath='RECOMMEND' />
      <section className='rec-top'>
        <div className='rec-top-text'>
          <h3>Make sure your style</h3>
        </div>
      </section>
      <br />
      <section className='rec-choice'>
<<<<<<< HEAD
        <div className='choice' onClick={() => setStandard('size')}>
          <h4 className={`${standard === 'size' ? 'rec-active' : ''}`}>사이즈</h4>
        </div>
        <div className='choice' onMouseOver={() => setTab(true)} onMouseLeave={e => setTab(false)}>
          <h4 className={`${standard === 'size' ? '' : 'rec-active'}`}>{tabName[standard]}</h4>
          <div className='tabs' style={{display: `${tab? 'flex':'none'}`}} >
            <span className='tab' onClick={() => {setStandard('color'); setTab(false)}}>
              <h4 className={`${standard === 'color' ? 'rec-active':''}`}>색상</h4>
            </span>
            <span className='tab' onClick={() => {setStandard('style'); setTab(false)}}>
              <h4 className={`${standard === 'style' ? 'rec-active':''}`}>스타일</h4>
            </span>
            <span className='tab' onClick={() => {setStandard('category'); setTab(false)}}>
              <h4 className={`${standard === 'category' ? 'rec-active':''}`}>카테고리</h4>
            </span>
=======
        <div className={`choice ${tab === 'size' ? 'rec-active' : ''}`} onClick={() => setTab('size')}><h5>사이즈</h5></div>
        <div className='choice-line'></div>
        <div className={`choice ${standard === 'size' ? '' : 'rec-active'}`} onClick={() => setTab(true)}><h5>취향</h5></div>
        <div className='tab-container' style={{display: `${tab? 'block':'none'}`}} onClick={e => {if (e.target.className === 'tab-container'){setTab(false)}}}>
          <div className='tab-box'>
            <h4>Recommend By</h4>
            <div className='tabs'>
              <span className='tab' onClick={() => {setStandard('color'); setTab(false)}}><h6>Color</h6></span>
              <span className='tab' onClick={() => {setStandard('style'); setTab(false)}}><h6>Style</h6></span>
              <span className='tab' onClick={() => {setStandard('category'); setTab(false)}}><h6>Category</h6></span>
            </div>
>>>>>>> 6127d93b931d63263e915d9786a2bdabbe8988db
          </div>
        </div>
      </section>
      <section className='rec-clothes'>
<<<<<<< HEAD
        {loading ? <Loading /> :
        <>
          <RecCategory cate='Outer' clothes={recommend[standard].outer} />
          <RecCategory cate='Top' clothes={recommend[standard].top} />
          <RecCategory cate='Pants' clothes={recommend[standard].pants} />
          {JSON.parse(window.sessionStorage.getItem('userInfo')).gender === 0 &&
          <>
            <RecCategory cate='Onepiece' clothes={recommend[standard].onepiece} />
            <RecCategory cate='Skirt' clothes={recommend[standard].skirt} />
          </>
          }
        </>
        }
=======
        <RecCategory cate='Outer' clothes={recommend[standard].outer} />
        <RecCategory cate='Top' clothes={recommend[standard].top} />
        <RecCategory cate='Pants' clothes={recommend[standard].pants} />
        <RecCategory cate='Onepiece' clothes={recommend[standard].onepiece} />
        <RecCategory cate='Skirt' clothes={recommend[standard].skirt} />
>>>>>>> 6127d93b931d63263e915d9786a2bdabbe8988db
      </section>
      <Footer />
    </article>
  );
};

export default Recommend;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import NavigationBar from '../../components/NavigationBar';
import RecCategory from './compoenets/recCategory'
import Loading from '../../components/Loading'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {DA_URL} from '../../Request'
import './scss/Recommend.scss'

const Recommend = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [size, setSize] = useState({})
  const [color, setColor] = useState({})
  const [style, setStyle] = useState({})
  const [category, setCategory] = useState({})
  const [tab, setTab] = useState('size')
  const [act, setAct] = useState(false)
  const recommend = {
    size: size, color: color, style: style, category: category
  }

  console.log('나 불렀어?')
  // let tab = false
  const session = window.sessionStorage

  useEffect(() => {
    if (!Object.keys(user).length){
      const token = session.getItem('access-token-jwt')
      session.setItem('userInfo', JSON.stringify(jwtDecode(token)))
      setUser(jwtDecode(token))
    }   
  }, [])

  useEffect(() => {
    if (Object.keys(size).length){return}
    setLoading(true);
    axios({
      method: 'get',
      baseURL: DA_URL,
      url: `/recommend/size/${user.id}`
    })
    .then(res => setSize(res.data))
    .then(() => setLoading(false))
    .catch(err => console.log(err))
  }, [user])

  useEffect(() => {
    let setter;
    if (act === true){return}
    if (tab === 'size'){setter = setSize; if(Object.keys(size).length){return}}
    if (tab === 'color'){setter = setColor ;if(Object.keys(color).length){return}}
    if (tab === 'style'){setter = setStyle ;if(Object.keys(style).length){return}}
    if (tab === 'category'){setter = setCategory ;if(Object.keys(category).length){return}}
    setLoading(true);
    axios({
      method: 'get',
      baseURL: DA_URL,
      url: `/recommend/${tab}/${user.id}`
    })
    .then(res => setter(res.data))
    .then(() => setLoading(false))
    .catch(err => console.log(err))
  }, [tab])

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
        <div className={`choice ${tab === 'size' ? 'rec-active' : ''}`} onClick={() => setTab('size')}><h5>사이즈</h5></div>
        <div className='choice-line'></div>
        <div className={`choice ${tab === 'size' ? '' : 'rec-active'}`} onClick={() => setAct(true)}><h5>취향</h5></div>
        <div className='tab-container' style={{display: `${act ? 'block':'none'}`}} onClick={e => {if(e.target.className === 'tab-container'){setAct(false)}}}>
          <div className='tab-box'>
            <h4>Recommend By</h4>
            <div className='tabs'>
              <h5 className='tab' onClick={() => {setTab('color'); setAct(false)}}>Color</h5>
              <h5 className='tab' onClick={() => {setTab('style'); setAct(false)}}>Style</h5>
              <h5 className='tab' onClick={() => {setTab('category'); setAct(false)}}>Category</h5>
            </div>
          </div>
        </div>
      </section>
      <section className='rec-clothes'>
        <RecCategory cate='Outer' clothes={recommend[tab].outer} />
        <RecCategory cate='Top' clothes={recommend[tab].top} />
        <RecCategory cate='Pants' clothes={recommend[tab].pants} />
        <RecCategory cate='Onepiece' clothes={recommend[tab].onepiece} />
        <RecCategory cate='Skirt' clothes={recommend[tab].skirt} />
      </section>
      <Footer />
    </article>
  );
};

export default Recommend;
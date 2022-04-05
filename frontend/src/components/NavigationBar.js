import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './scss/NavigationBar.scss'

const NavigationBar = ({ boldPath }) => {
  let history = useHistory()
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [inputText, setInputText] = useState('')

  function checkEnter(e) {
    if (e.key === 'Enter') {
      search()
    }
  }

  function search() {
    const text = inputText.trim()
    setInputText('')
    if (text.length === 0) {
      alert('검색어를 입력하세요')
    } else {
      let path = '/search?word=' + text
      setShowSearchBar(false)
      history.push(path)
    }
  }


  return (
    <>
      {showSearchBar &&
      <section className='search-bar-group'>
        <Row>
          <Col md={1} />
          <Col md={{ span: 6, offset: 2}} className='search-bar'>
            <div className='item'>
              <input onKeyUp={checkEnter} onChange={(e) => setInputText(e.target.value)} value={inputText} placeholder='검색어를 입력하세요' />
              <img onClick={() => search()} src='https://i.ibb.co/CbCZhz1/search.png' alt='icon' />
            </div>
          </Col>
          <Col className='close-search' md={{ span: 1, offset: 2}}><span onClick={() => setShowSearchBar(!showSearchBar)}>X</span></Col>
        </Row>
      </section>
      }
      <nav className='navbar'>
        <img src="https://i.ibb.co/tx6hcxR/ssafit-b.png" className='ssafit-logo' onClick={() => history.push('/')} alt='ssafit-logo' />
        <ul className='nav-menu'>
          <li>
            <Link className={`link ${boldPath === "TPO" ? "active" : ""}`} to="/tpo">TPO</Link>
          </li>
          <li>
            <Link className={`link ${boldPath === "RECOMMEND" ? "active" : ""}`} to="/recommend">RECOMMEND</Link>
          </li>
          <li>
            <Link className={`link ${boldPath === "MYPAGE" ? "active" : ""}`} to="/mypage">MYPAGE</Link>
          </li>
          <li>
            <div onClick={() => {setShowSearchBar(!showSearchBar)}} className={`link ${boldPath === "SEARCH" ? "active" : ""}`}>SEARCH</div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationBar;
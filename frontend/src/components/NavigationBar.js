import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './scss/NavigationBar.scss'
import Swal from 'sweetalert2';

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
      Swal.fire({
        text: '검색어를 입력해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: 'orange'
      })
    } else {
      let path = '/search?word=' + text
      setShowSearchBar(false)
      history.push(path)
    }
  }

  function logout() {
    window.sessionStorage.clear()
    window.localStorage.clear()
    history.push('/')
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
        <div className='nav-menu'>
          <div onClick={() => history.push('/tpo')} className={`${boldPath === "TPO" ? "active" : "inactive"}`}><p>TPO</p></div>
          <div onClick={() => history.push('/recommend')} className={`${boldPath === "RECOMMEND" ? "active" : "inactive"}`}><p>RECOMMEND</p></div>
          <div onClick={() => history.push('/mypage')} className={`${boldPath === "MYPAGE" ? "active" : "inactive"}`}><p>MYPAGE</p></div>
          <div className='inactive' onClick={() => logout()}><p>LOGOUT</p></div>
          <div onClick={() => {setShowSearchBar(!showSearchBar)}} className={`${boldPath === "SEARCH" ? "active" : "inactive"}`}><p>SEARCH</p></div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
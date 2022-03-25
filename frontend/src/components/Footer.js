import React from 'react';
import './scss/Footer.scss'

const Footer = () => {
  function onClickMusinsa () {
    window.open('https://www.musinsa.com/', '_blank')
  }
  return (
    <footer>
      <div className='left'>
        <p className='bold'>Contact Us</p>
        <p>&ensp;SSAFit@SAFFY.com<br/>&ensp;부산 강서구 녹산산업중로 333</p>
        <p className='bold gray'>COPYRIGHT (C) MUSINSA ALL RIGHTS RESERVED.</p>
        <p className='gray'>&ensp;본 서비스는 (주)무신사닷컴<span onClick={onClickMusinsa}>(www.musinsa.com)</span>의 제품 정보를 제공하고 있습니다.</p>
      </div>
      <div className='right'>
        <h1>SSAFit</h1>
      </div>
    </footer>
  );
};

export default Footer;
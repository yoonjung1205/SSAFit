import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './scss/NavigationBar.scss'

const NavigationBar = ({boldPath}) => {
  let history = useHistory()
  const onClickLogo = () => {
    history.push('/')
  }

  return (
    <nav className='navbar'>
      <img src="img/logo_b.png" className='ssafit-logo' onClick={onClickLogo} alt='ssafit-logo' />
      <ul className='menu'>
        <li><Link className='link' to="#" id={boldPath === "TPO" ? "active" : ""}>TPO</Link></li>
        <li><Link className='link' to="#" id={boldPath === "RECOMMEND" ? "active" : ""}>RECOMMEND</Link></li>
        <li><Link className='link' to="#" id={boldPath === "MYPAGE" ? "active" : ""}>MYPAGE</Link></li>
        <li><Link className='link' to='#'>SEARCH</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
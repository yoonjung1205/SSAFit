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
      <img src="https://i.ibb.co/tx6hcxR/ssafit-b.png" className='ssafit-logo' onClick={onClickLogo} alt='ssafit-logo' />
      <ul className='nav-menu'>
        <li><Link className={`link ${boldPath === "TPO" ? "active" : ""}`} to="/tpo">TPO</Link></li>
        <li><Link className={`link ${boldPath === "RECOMMEND" ? "active" : ""}`} to="/recommend">RECOMMEND</Link></li>
        <li><Link className={`link ${boldPath === "MYPAGE" ? "active" : ""}`} to="/mypage">MYPAGE</Link></li>
        <li><Link className={`link ${boldPath === "SEARCH" ? "active" : ""}`} to='#'>SEARCH</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
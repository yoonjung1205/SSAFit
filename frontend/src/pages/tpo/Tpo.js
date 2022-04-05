import React from 'react';
import NavigationBar from '../../components/NavigationBar'
import date from './images/date.jpg'
import daily from './images/daily.jpg'
import campus from './images/campus.jpg'
import party from './images/party.jpg'
import travel from './images/travel.jpg'
import wedding from './images/wedding.jpg'
import business from './images/business.jpg'
import sport from './images/sport.jpg'
import interview from './images/interview.jpg'
import hip from './images/hip.jpg'
import golf from './images/golf.jpg'
import other from './images/other.jpg'
import './scss/tpo.scss'

const Tpo = ({ user, history }) => {
  
  const tpoObject = {
    Date: ['데이트', date], Daily: ['일상', daily], Campus: ['캠퍼스', campus], Party: ['파티', party], Travel: ['여행', travel], Wedding: ['결혼식', wedding],
    Business: ['출근', business], Sport: ['운동', sport], Interview: ['면접', interview], Hip: ['힙', hip], Golf: ['골프', golf], Other: ['기타', other]
  }

  const TpoList = function({target}){
    return (
      <div className='tpo' style={{backgroundImage: `url(${tpoObject[target][1]})`}} id={tpoObject[target][0]}
      onClick={() => history.push('/recommend_codi/' + target)}>
        <span className='opac-blk'>
          <h3 className='tpo-title'>{tpoObject[target][0]}</h3>
        </span>
      </div>
  )}

  return (
    <article className='tpo-container'>
      <NavigationBar boldPath="TPO"/>
      <section className='tpo-body'>
        {Object.keys(tpoObject).map(key => <TpoList key={key} target={key}/>)}
      </section>
    </article>
  );
};

export default Tpo;
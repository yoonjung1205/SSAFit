import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar'
import date from './images/date.jpg'
import daily from './images/daily.jpg'
import campus from './images/campus.jpg'
import party from './images/party.jpg'
import vacation from './images/vacation.jpg'
import wedding from './images/wedding.jpg'
import work from './images/work.jpg'
import workout from './images/workout.jpg'
import meeting from './images/meeting.jpg'
import hip from './images/hip.jpg'
import golf from './images/golf.jpg'
import etc from './images/etc.jpg'
import './scss/tpo.scss'

const Tpo = ({ history }) => {
  const tpoObject = {
    date: ['데이트', date], daily: ['일상', daily], campus: ['캠퍼스', campus], party: ['파티', party], vacation: ['여행', vacation], wedding: ['결혼식', wedding],
    work: ['출근', work], workout: ['운동', workout], meeting: ['면접', meeting], hip: ['힙', hip], golf: ['골프', golf], etc: ['기타', etc]
  }

  const TpoList = function({target}){
    return (
      <div className='tpo' style={{backgroundImage: `url(${tpoObject[target][1]})`}} id={tpoObject[target][0]}
      onMouseOver={event => event.target.children[0].style.display = 'flex'}
      onClick={event => history.push(`/recommend_codi/${event.target.id}`)}>
        <span className='opac-blk' style={{display:'none'}} id={tpoObject[target][0]}
          onMouseLeave={event => event.target.style.display = 'none'}>
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
import React from 'react';
import MonthChart from './MonthChart'
import '../scss/chart.scss'

const Chart = ({ male, female, month, sum }) => {
  const newFemale = Math.round(female * 100) / 100
  return (
    <section className='chart'>
      <div className='gender'>
        <p className='chart-title'>Gender</p>
        <div className='chart-box'>
          <div className='bar-chart left'>
            <div className='female blank'>
              <div className='bar' style={{height: `${female*100}%`}} />
            </div>
            <p>{newFemale*100}%</p>
          </div>
          <div className='bar-chart'>
            <div className='male blank'>
              <div className='bar' style={{height: `${male*100}%`}} />
            </div>
            <p>{(1-newFemale)*100}%</p>
          </div>
        </div>
      </div>
      <div className='month'>
        <p className='chart-title'>Month</p>
        <MonthChart month={month} sum={sum}/>
        <div className='chart-box'></div>
      </div>
      
    </section>
  );
};

export default Chart;
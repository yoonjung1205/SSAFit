import React, { useEffect, useState } from 'react';
// import { ResponsiveLine } from '@nivo/line'
import '../scss/chart.scss'

const Chart = ({ male, female, month }) => {
  const [monthData, setMonthData] = useState([])
  
  console.log('female', female)

  useEffect(() => {
    const tmp = [{
        id: 'ratio',
        color: '#61cdbb',
        data: [
          {x: '1월', y: month[0]}, {x: '2월', y: month[1]}, {x: '3월', y: month[2]},
          {x: '4월', y: month[3]}, {x: '5월', y: month[4]}, {x: '6월', y: month[5]},
          {x: '7월', y: month[6]}, {x: '8월', y: month[7]}, {x: '9월', y: month[8]},
          {x: '10월', y: month[9]}, {x: '11월', y: month[10]}, {x: '12월', y: month[11]}
        ]
      }]
    setMonthData(tmp)
  }, [])

  return (
    <session className='chart'>


      <div className='gender'>
        <h3 className='chart-title'>Gender</h3>
        <div className='chart-box'>
          <div className='bar-chart'>
            <div className='female blank'>
              <div className='bar' style={{height: `${female*100}%`}} />
            </div>
            <p>{female*100}%</p>
          </div>
          <div className='bar-chart'>
            <div className='male blank'>
              <div className='bar' style={{height: `${male*100}%`}} />
            </div>
            <p>{male*100}%</p>
          </div>
        </div>
      </div>


      <div className='month'>
        <h3 className='chart-title'>Month</h3>







        <div className='chart-box'></div>
      </div>
    </session>
  );
};

export default Chart;
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import Loading from '../../../components/Loading'

export default function MonthChart({ month, sum }) {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (month && sum){
      setLoading(false)
    }
  }, [month, sum])


  if (loading){
    return <Loading/>
  }

  return (
    <ResponsiveLine
          data={[{
            id: '월별 판매율',
            color: '#61cdbb',
            data: [
              {x: '1월', y: month[0]/sum}, {x: '2월', y: month[1]/sum}, {x: '3월', y: month[2]/sum},
              {x: '4월', y: month[3]/sum}, {x: '5월', y: month[4]/sum}, {x: '6월', y: month[5]/sum},
              {x: '7월', y: month[6]/sum}, {x: '8월', y: month[7]/sum}, {x: '9월', y: month[8]/sum},
              {x: '10월', y: month[9]/sum}, {x: '11월', y: month[10]/sum}, {x: '12월', y: month[11]/sum}
            ]
          }]}
          margin={{ top: 30, right: 120, bottom: 120, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
          }}
          yFormat=" >-.2f"
          enableGridY={false}
          colors={{ scheme: 'paired' }}
          lineWidth={5}
          pointSize={9}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={3}
          pointBorderColor={{ from: 'serieColor', modifiers: [] }}
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={0.1}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
              }
          ]}
      />
  )
}

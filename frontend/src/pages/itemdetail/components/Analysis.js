import React from 'react'
import ReactWordcloud from 'react-wordcloud'
import '../scss/analysis.scss'
export default function Analysis({ words }) {


  const WordCloud = () => {
    return (
    <ReactWordcloud words={words}
     options={{rotations: 0, fontSizes: [16, 100], enableTooltip: false}}
     size={[600, 400]} />
    )
  }

  return (
    <section className='analysis-container'>
      <div className='analysis-header'>
        <h3 className='title'>Analysis</h3>
        <p className='desc'>리뷰를 분석하여 워드 클라우드와 구매 추이 분석을 제공합니다.</p>
      </div>
      <div className='analysis-body'>
        <WordCloud />
      </div>
    </section>
  )
}

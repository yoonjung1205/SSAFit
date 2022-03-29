import React from 'react'
import ReactWordcloud from 'react-wordcloud'

export default function Analysis() {
  const words = [
    {"text":"하의","value":21},{"text":"길이","value":12},{"text":"생각","value":112},
    {"text":"키","value":13},{"text":"덩","value":66},{"text":"치가","value":45},
    {"text":"편이","value":56},{"text":"정말","value":35},{"text":"반바지","value":7},
    {"text":"실종","value":123},{"text":"패션","value":90},{"text":"디자인","value":1},
  ]

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

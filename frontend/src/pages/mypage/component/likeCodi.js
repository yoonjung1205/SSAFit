import '../scss/cards.scss'

const likeCodi = () => {
  const recentCloth = [
    {
      clothId: 100235,
      brand: '무신사 스탠다드1무신사 스탠다드1',
      clothName: 'Side Pleats Mini Skirt Grey, 상품명이 아주 길게 있겠지 분명히 두줄도 있을거야',
      clothImage: 'https://image.msscdn.net/images/codimap/list/l_3_2022032211343900000007074.jpg?202203221103',
      clothPrice: 68000,
      like: true
    },
    {
      clothId: 100235,
      brand: '무신사 스탠다드2',
      clothName: 'Side Pleats Mini Skirt Grey, 상품명이 아주 길게 있겠지 분명히 두줄도 있을거야',
      clothImage: 'https://image.msscdn.net/images/codimap/list/l_3_2022032211343900000007074.jpg?202203221103',
      clothPrice: 68000,
      like: false
    },
    {
      clothId: 100235,
      brand: '무신사 스탠다드3',
      clothName: 'Side Pleats Mini Skirt Grey, 상품명이 아주 길게 있겠지 분명히 두줄도 있을거야',
      clothImage: 'https://image.msscdn.net/images/codimap/list/l_3_2022032211343900000007074.jpg?202203221103',
      clothPrice: 68000,
      like: true
    },
    {
      clothId: 100235,
      brand: '무신사 스탠다드4',
      clothName: 'Side Pleats Mini Skirt Grey, 상품명이 아주 길게 있겠지 분명히 두줄도 있을거야',
      clothImage: 'https://image.msscdn.net/images/codimap/list/l_3_2022032211343900000007074.jpg?202203221103',
      clothPrice: 68000,
      like: false
    },
  ]

  return (
    <div className='mypage-codi'>
      {recentCloth.map((cloth, idx) => {
        return (
          <div key={idx} className='like-codi'>
            <div className='codi-image'>
              <img src={cloth.clothImage} alt='like-codi' />
            </div>
            <div className='codi-p'>
              <div className='p-top'>{cloth.brand}</div>
              <div className='p-center'>{cloth.clothName}</div>
              <div className='p-bottom'>{cloth.clothPrice}원</div>
            </div>
            <div className='codi-like'>
              {cloth.like ? 
              <img src='https://i.ibb.co/RDV7jPR/heart-free-icon-font.png' alt='heart' />
              :
              <img src='https://i.ibb.co/Nr77tWK/heart-free-icon-font-1.png' alt='heart' />
              }
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default likeCodi;
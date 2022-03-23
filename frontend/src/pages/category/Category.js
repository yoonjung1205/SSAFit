import './scss/Category.scss'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'

const Category = ({match}) => {
  const path = match.params.category
  const topText = path[0].toUpperCase() + path.slice(1)

  const clothes = [
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20210825/2085156/2085156_1_125.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSYJIPSYJIPSYJIPSYJIPSYJIPSYJIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.Trousselier MA-1 STANDARD / OVER FIT.Trousselier MA-1 STANDARD / OVER FIT.Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    {
      clothId: 123450,
      clothBrand: 'JIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
      clothPrice: 99000,
      clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    },
    // {
    //   clothId: 123450,
    //   clothBrand: 'JIPSY',
    //   clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
    //   clothPrice: 99000,
    //   clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    // },
    // {
    //   clothId: 123450,
    //   clothBrand: 'JIPSY',
    //   clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
    //   clothPrice: 99000,
    //   clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    // },
    // {
    //   clothId: 123450,
    //   clothBrand: 'JIPSY',
    //   clothName: 'Trousselier MA-1 STANDARD / OVER FIT.',
    //   clothPrice: 99000,
    //   clothImg: '//image.msscdn.net/images/goods_img/20140919/123450/123450_7_500.jpg'
    // }
  ]

  return (
    <div className='category'>
      <NavigationBar boldPath='RECOMMEND' />
      <section className='cate-top'>
        <div className='cate-top-text'>
          <h2>{topText}</h2>
        </div>
      </section>
      <section className='cate-middle'>


        <div className='cate-middle-clothes'>
        {clothes.map((cloth, idx) => (
          <div className='cloth-card' key={idx}>
            <div className='card-image'>
              <img src={cloth.clothImg} alt='cloth' />
            </div>
            <div className='card-text'>
              <div>
                <p className='cate-text-top'>{cloth.clothBrand}</p>
                <p className='cate-text-middle'>{cloth.clothName}</p>
              </div>
              <p className='cate-text-bottom'>{cloth.clothPrice}원</p>
            </div>
          </div>
        ))}
        </div>


      </section>
      <Footer />
    </div>
  );
};

export default Category;
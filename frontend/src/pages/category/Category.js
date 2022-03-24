import './scss/Category.scss'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { Card, Col, Row } from 'react-bootstrap';

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
      clothBrand: 'JIPSYJIPSYJIPSYJIPSYJIPSYJIPSYJIPSYJIPSY',
      clothName: 'Trousselier MA-1 STANDARD / OVER FIT.Trousselier MA-1 STANDARD / OVER FIT.Trousselier MA-1 STANDARD / OVER FIT.',
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
    <>
      <NavigationBar boldPath='RECOMMEND' />
      <div className='category'>
        <section className='cate-top'>
          <div className='cate-top-text'>
            <h2>{topText}</h2>
          </div>
        </section>
        <section className='cate-middle'>
          <Row md={5} className='g-5'>
          {clothes.map((cloth, idx) => (
            <Col key={idx}>
              <div className='cate-card' onClick={() => console.log('go to cloth detail')} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                <Card.Img src={cloth.clothImg} alt='cloth' />
                <p className='cate-card-text one-line'>{cloth.clothBrand}</p>
                <p className='cate-card-text two-line'>{cloth.clothName}</p>
                <p className='cate-card-text one-line last'>{cloth.clothPrice}원</p>
              </div>
            </Col>
          ))}
          </Row>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Category;
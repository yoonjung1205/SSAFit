import './scss/Category.scss'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Category = () => {
  const params = useParams()
  const path = params.category
  const clothes = JSON.parse(window.localStorage.getItem('clothes'))
  let history = useHistory()


  return (
    <>
      <NavigationBar boldPath='RECOMMEND' />
      <div className='category'>
        <section className='cate-top'>
          <div className='cate-top-text'>
            <h2>{path}</h2>
          </div>
        </section>
        <section className='cate-body'>
          <Row md={5} className='g-5'>
          {clothes.map((cloth, idx) => (
            <Col key={idx}>
              <div className='cate-card' onClick={() => history.push(`/item/${cloth.newClothId}`)} style={{padding: '0.7rem', border: 'none', boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25'}}>
                <Card.Img src={cloth.clothImg} alt='cloth' />
                <div className='card-desc'>
                  <div>
                    <p className='cate-card-text one-line'>{cloth.brand}</p>
                    <p className='cate-card-text two-line'>{cloth.clothName}</p>
                  </div>
                  <p className='cate-card-text one-line last'>SIZE : {cloth.goodsSize}</p>
                </div>
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
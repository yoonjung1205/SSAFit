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

  const comma = function(tar){
    let result = ''
    if (tar){
      for (let i = tar.length - 1; i >= 0; i--){
        if (i !== tar.length - 1 && (tar.length - i - 1) % 3 === 0){
          result = ',' + result
        }
        result = tar[i] + result
      }
    }
    return result
  }

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
                <p className='cate-card-text one-line'>{cloth.clothBrand}</p>
                <p className='cate-card-text two-line'>{cloth.clothName}</p>
                <p className='cate-card-text one-line last'>{comma(String(cloth.clothPrice))}원</p>
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
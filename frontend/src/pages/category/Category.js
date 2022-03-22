import './scss/Category.scss'
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'

const Category = ({match}) => {
  const path = match.params.category
  const topText = path[0].toUpperCase() + path.slice(1)
  return (
    <div className='category'>
      <NavigationBar boldPath='RECOMMEND' />
      <section className='cate-top'>
        <div className='cate-top-text'>
          <h2>{topText}</h2>
        </div>
      </section>
      <section className='cate-clothes'>

      </section>
      <Footer />
    </div>
  );
};

export default Category;
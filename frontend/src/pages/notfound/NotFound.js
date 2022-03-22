import { useHistory } from 'react-router-dom';
import './scss/NotFound.scss'

const NotFound = () => {
  let history = useHistory()
  return (
    <div className='notfound'>
      <section className='left'></section>
      <section className='right'>
        <h1>404 Not Found</h1>
        <h4>페이지를 찾을 수 없습니다.</h4>
        <br/>
        <p>요청하신 페이지가 사라졌거나,<br/>잘못된 경로를 이용하셨어요 :)</p>
        <br/>
        <button onClick={() => history.push('/main')} className='notfound-btn'><span>메인으로 돌아가기</span></button>
      </section>
    </div>
  );
};

export default NotFound;
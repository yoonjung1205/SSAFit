import { useHistory } from 'react-router-dom';
import '../scss/MyInfo.scss'

const MyInfo = ({ user }) => {
  let history = useHistory()

  const logout = () => {
    window.sessionStorage.clear()
    window.localStorage.clear()
    history.push('/')
  }

  return (
    <article className='myinfo'>
      <section className='left'>
        <img src={user.profileImage ? user.profileImage : 'https://i.ibb.co/17HCkM1/default.png'} alt='profileImage' />
      </section>
      <section className='center'>
        <div>
          <p className='title'>닉네임</p>
          <hr />
          <p>{user.nickname}</p>
        </div>
        <div>
          <p className='title'>성별</p>
          <hr />
          <p>{user.gender ? '남자':'여자'}</p>
        </div>
        <div className='myinfo-btn-div'></div>
      </section>
      <section className='right'>
        <div>
          <p className='title'>키</p>
          <hr />
          <p>{user.height} cm</p>
        </div>
        <div>
          <p className='title'>몸무게</p>
          <hr />
          <p>{user.weight} kg</p>
        </div>
        <div className='myinfo-btn-div'>
          <button className='edit' onClick={() => history.push('/edit-mypage')}>편집</button>
          <button className='logout' onClick={() => logout()}>로그아웃</button>
        </div>
      </section>
    </article>
  );
};

export default MyInfo;
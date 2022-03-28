import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import './scss/EditPassword.scss'
import { useState } from "react";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [credentials, setCredentials] = useState({
    password: '',
    passwordConf: ''
  })

  function checkCurrentPassword(e) {
    e.preventDefault()
    // 🎨🎨현재 비밀번호가 맞는지 요청은 get?🎨🎨
    console.log('currentPassword:', currentPassword)
  }

  function changePassword(e) {
    e.preventDefault()
    // 🎨🎨비밀번호가 유효하면 password만 담아서(?) 변경 요청(put) 보내기
    console.log(credentials.password)
  }

  return (
    <>
      <NavigationBar boldPath="MYPAGE" />
      <article className="edit-password">
        <section className="left">
          {/* 현재 비밀번호 확인 */}
          <form onSubmit={(e) => checkCurrentPassword(e)}>
            <label className="input-form" htmlFor="current">
              <div className="label-text">현재 비밀번호</div>
              <div className="current-box">
                <input className="input-box" type="password" id="current" value={currentPassword}
                  placeholder="변경 전 비밀번호를 입력하세요" autoFocus
                  onChange={(e) => setCurrentPassword(e.target.value)} />
                <button><span /><p>확인</p></button>
              </div>
            </label>
          </form>
          <form onSubmit={(e) => changePassword(e)}>
            <label className="input-form" htmlFor="password">
              <div className="label-text">변경할 비밀번호</div>
              <div className="input-box">
                <input type="password" id="password" value={credentials.password}
                  placeholder="비밀번호는 8 ~ 16글자, 특수문자, 영어, 숫자 1개 이상 포함해야 합니다"
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
              </div>
            </label>
            <label className="input-form" htmlFor="passwordConf">
              <div className="label-text">변경할 비밀번호 확인</div>
              <div className="input-box">
                <input type="password" id="passwordConf" value={credentials.passwordConf}
                  placeholder="비밀번호를 다시 입력하세요"
                  onChange={(e) => setCredentials({...credentials, passwordConf: e.target.value})} />
              </div>
            </label>
            <button className="change-password-btn"><span /><p>비밀번호 변경</p></button>
          </form>
        </section>
        <section className="right">
        </section>
      </article>
      <Footer />
    </>
  );
};

export default EditPassword;
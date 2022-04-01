/* eslint-disable no-useless-escape */
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import './scss/EditPassword.scss'
import corr from './images/corr.png'
import incorr from './images/incorr.png'
import { useState } from "react";
import CustomAxios from "../../CustomAxios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const EditPassword = ({ user }) => {
  const history = useHistory()

  const [checkedCurrent, setCheckedCurrent] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const checkCurrentPassword = e => {
    e.preventDefault()
    // 🎨🎨현재 비밀번호가 맞는지 요청은 post🎨🎨
    CustomAxios({
      method: 'post',
      url: `/api_be/auth/user/pw`,
      withCredentials: true,
      data: {email: user.sub, password: currentPassword},
    })
    .then(() => {
      // 맞으면 setChecked(true)
      setCheckedCurrent(true)
    })
    .catch(err => {
      if (err.toString().slice(-3, ) === '401') {
        alert('비밀번호가 틀렸습니다')
      } else {
        console.log(err, typeof(err))
      }
    })
  }


  const [credentials, setCredentials] = useState({ password: '', passwordConf: '' })
  const [validData, setValidData] = useState({ password: null, passwordConf: null })
  const [hover, setHover] = useState({ password: false, passwordConf: false })

  const validator = function(target){
    if (target ==='password') {
      const passValidator = /[0-9a-zA-Z~!@#$%^&*()_+-=[\]{};\':",\\|.\/<>?]{8,16}/
      const result = passValidator.exec(credentials.password)
      if (!credentials.password){
        setValidData({...validData, password: null})
      }
      else if (result && result[0] === credentials.password){
        setValidData({...validData, password: 1})
      }
      else {
        setValidData({...validData, password: -1})
      }
    }
    else if (target === 'passwordConf') {
      if (!credentials.passwordConf){
        setValidData({...validData, passwordConf: null})
      }
      else if (credentials.password === credentials.passwordConf){
        setValidData({...validData, passwordConf: 1})
      }
      else {
        setValidData({...validData, passwordConf: -1})
      }
    }
  }

  const isValid = function(){
    return new Promise((resolve, reject) =>{
      for (const key in validData){
        if (validData[key] !== 1){
          reject('입력 정보가 유효하지 않습니다')
        }
      }
      resolve()
    })
  } 

  const changePassword = e => {
    e.preventDefault()
    isValid()
    .then(() => {
      // 🎨🎨비밀번호가 유효하면 password만 담아서 변경 요청(put) 보내기
      CustomAxios({
        method: 'put',
        url: `/api_be/auth/user/pw`,
        withCredentials: true,
        data: {email: user.sub, password: credentials.password},
      })
      .then(() => {
        alert('비밀번호가 변경되었습니다')
        history.push('/mypage')
      })
      .catch(err => {
        console.log(err, typeof(err))
      })
    })
    .catch(err => {
      alert(err)
    })
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
                  placeholder="변경 전 비밀번호를 입력하세요" autoFocus disabled={checkedCurrent}
                  onChange={(e) => setCurrentPassword(e.target.value)} />
                <button><span /><p>확인</p></button>
              </div>
            </label>
          </form>
          <form onSubmit={(e) => changePassword(e)}>
            <label className="input-form" htmlFor="password">
              <div className="label-text">변경할 비밀번호</div>
              <div className="input-box">
                <input type="password" id="password" value={credentials.password} disabled={!checkedCurrent}
                  placeholder="비밀번호는 8 ~ 16글자, 특수문자, 영어, 숫자 1개 이상 포함해야 합니다"
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  onBlur={() => validator('password')} />
                <img className="validator-helper" src={validData.password === 1 ? corr : incorr} alt='helper'
                  style={{display: validData.password ? 'block' : 'none'}}
                  onMouseOver={() => setHover({...hover, password: true})}
                  onMouseDown={() => setHover({...hover, password: false})} />
              </div>
            </label>
            <label className="input-form" htmlFor="passwordConf">
              <div className="label-text">변경할 비밀번호 확인</div>
              <div className="input-box">
                <input type="password" id="passwordConf" value={credentials.passwordConf}
                  placeholder="비밀번호를 다시 입력하세요" disabled={!checkedCurrent}
                  onChange={(e) => setCredentials({...credentials, passwordConf: e.target.value})}
                  onBlur={() => validator('passwordConf')} />
                <img className="validator-helper" src={validData.passwordConf === 1 ? corr : incorr} alt='helper'
                  style={{display: validData.passwordConf ? 'block' : 'none'}}
                  onMouseOver={() => setHover({...hover, passwordConf: true})}
                  onMouseDown={() => setHover({...hover, passwordConf: false})} />
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
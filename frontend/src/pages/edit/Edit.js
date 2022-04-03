/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import './scss/Edit.scss'
import CustomAxios from "../../CustomAxios";
import jwtDecode from "jwt-decode";
import defaultImage from './images/default.png'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Edit = ({ user }) => {
  const history = useHistory()

  const [credentials, setCredentials] = useState({...user})
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    setProfileImage(user.profileImage)
  }, [user])

  const fileUpload = e => {
    const file = e.target.files[0]
    setCredentials({...credentials, profileImage: URL.createObjectURL(file)})
    setProfileImage(file)
  }

  const makeCredential = () => {
    let userInfo = {...credentials, profileImage: profileImage}
    // console.log('이전정보', credentials)
    // console.log('변경정보', userInfo)
    const formdata = new FormData()

    for (const key in userInfo){
      formdata.append(key, userInfo[key])
    }

    return formdata
  }

  const isValid = function(){
    // eslint-disable-next-line no-useless-escape
    const validatorNickName = /[~!@#$%^&*()_\+\-\=\[\]{};\':",\\|.\/<>?]/
    const invalidKeys = []

    return new Promise((resolve, reject) => {
      if (!credentials.nickname || credentials.nickname.length < 2 || validatorNickName.test(credentials.nickname)){
        invalidKeys.push('닉네임')
      }
      if (!credentials.height || credentials.height < 100 || credentials.height > 210){
        invalidKeys.push('키')
      }
      if (!credentials.weight || credentials.weight < 30 || credentials.weight > 160){
        invalidKeys.push('몸무게')
      }
      if (credentials.gender !== 0 && credentials.gender !== 1){
        invalidKeys.push('성별')
      }
      if (invalidKeys.length > 0){
        reject(invalidKeys)
      }
      else {
        resolve()
      }
    })
  }

  const submit = e => {
    e.preventDefault()

    isValid()
    .then(() => {
      const data = makeCredential()
      console.log(data.entries)
      for (const i of data.entries()){
        console.log(i)
      }
      CustomAxios({
        method: 'put',
        url: '/api_be/auth/user',
        headers: {'Content-Type': 'multipart/form-data'},
        data: data
      })
      .then(res => {
        console.log('되긴함')
        const session = window.sessionStorage
        const accessToken = res.headers.authorization
        const refreshToken = res.headers.refreshtoken
        session.setItem('access-token-jwt', accessToken)
        session.setItem('refresh-token-jwt', refreshToken)
        session.setItem('userInfo', JSON.stringify(jwtDecode(accessToken)))
      })
      .then(() => {
        history.push('/mypage')
      })
      .catch(err => console.log(err))
    })
    .catch(err => {
      if (typeof(err) !== Object) {
        return alert(`${err.join(', ')}를 확인해주세요!`)
      }
      alert('잘못된 요청입니다.')
    })
  }

  return (
    <>
      <NavigationBar boldPath='MYPAGE' />
      <article className="edit-profile">
        <section className="left">
          <form onSubmit={(e) => submit(e)}>
            {/* 프로필 사진 */}
            <label className="profile" htmlFor="profile"
              style={{backgroundImage: `url(${credentials.profileImage.length ? credentials.profileImage:defaultImage})`}}>
              <input type="file" id="profile" accept="image/jpg, image/png, image/jpeg"
                onChange={e => fileUpload(e)} />
            </label>
            {/* 닉네임 */}
            <label className="input-form" htmlFor="nickname">
              <div className="label-text">닉네임</div>
              <div className="input-box">
                <input type="text" id="nickname"
                  placeholder="특수문제를 제외한 2~10자로 입력하세요" maxLength="10"
                  value={credentials.nickname}
                  onChange={(e) => setCredentials({...credentials, nickname: e.target.value})}/>
              </div>
            </label>
            {/* 키 */}
            <label htmlFor="height" className="input-form">
              <div className="label-text">키</div>
              <div className="input-box">
                <input type="number" id="height"
                  placeholder="100이상 210이하의 숫자를 입력하세요" min={100} max={210}
                  value={credentials.height}
                  onChange={(e) => setCredentials({...credentials, height: e.target.value})}/>
                <p className="unit"> cm</p>
              </div>
            </label>
            {/* 몸무게 */}
            <label htmlFor="weight" className="input-form">
              <div className="label-text">몸무게</div>
              <div className="input-box">
                <input type="number" id="weight"
                  placeholder="30이상 160이하의 숫자를 입력하세요" min={30} max={160}
                  value={credentials.weight}
                  onChange={(e) => setCredentials({...credentials, weight: e.target.value})}/>
                <p className="unit"> kg</p>
              </div>
            </label>
            {/* 성별 */}
            <div className="input-form">
              <div className="label-text">성별</div>
              <div className="input-box">
                <input type="radio" id="male" checked={credentials.gender === 1}
                  onChange={() => setCredentials({...credentials, gender: 1})}
                /><label className="gender-label" htmlFor="male">남성</label>
                <input type="radio" id="female" checked={credentials.gender === 0}
                  onChange={() => setCredentials({...credentials, gender: 0})}
                /><label className="gender-label" htmlFor="female">여성</label>
              </div>
            </div>
          </form>
          <div className="buttons">
            <button className={`left-btn ${credentials.oauth === 1 ? 'oauth' : ''}`} onClick={() => history.push('/edit-password')}
            ><span /><p>비밀번호 변경</p></button>
            <button className={`right-btn ${credentials.oauth === 1 ? 'oauth' : ''}`} onClick={(e) => submit(e)}
            ><span /><p>수정</p></button>
          </div>
        </section>
        <section className="right">
        </section>
      </article>
      <Footer />
    </>
  );
};

export default Edit;
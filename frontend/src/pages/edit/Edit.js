import { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import defaultImage from './images/default.png'
import './scss/Edit.scss'

const Edit = () => {
  const [credentials, setCredentials] = useState(
    {
      imageUrl:defaultImage,
      nickname: '',
      height: 1,
      weight: 1,
      gender: 1
    }
  )
  const [profileImage, setProfileImage] = useState(null)

  function fileUpload(e) {
    const file = e.target.files[0]
    setCredentials({...credentials, imageUrl: URL.createObjectURL(file)})
    setProfileImage(file)
  }

  function submit(e) {
    e.preventDefault()
    console.log(credentials)
  }

  return (
    <>
      <NavigationBar boldPath='MYPAGE' />
      <article className="edit-profile">
        <section className="left">
          <form onSubmit={() => submit()}>
            {/* 프로필 사진 */}
            <label className="profile" htmlFor="profile" style={{backgroundImage: `url(${credentials.imageUrl})`}}>
              <input type="file" id="profile" accept="image/jpg, image/png, image/jpeg"
                onChange={e => fileUpload(e)} />
            </label>
            {/* 닉네임 */}
            <label className="input-form" htmlFor="nickname">
              <div className="label-text">닉네임</div>
              <div className="input-box">
                <input type="text" id="nickname" placeholder="닉네임을 입력하세요" maxLength="10"
                  value={credentials.nickname}
                  onChange={(e) => setCredentials({...credentials, nickname: e.target.value})}/>
              </div>
            </label>
            {/* 키 */}
            <label htmlFor="height" className="input-form">
              <div className="label-text">키</div>
              <div className="input-box">
                <input type="number" id="height" placeholder="키를 입력하세요" min={100} max={210}
                  value={credentials.height}
                  onChange={(e) => setCredentials({...credentials, height: e.target.value})}/>
                <p className="unit"> cm</p>
              </div>
            </label>
            {/* 몸무게 */}
            <label htmlFor="weight" className="input-form">
              <div className="label-text">몸무게</div>
              <div className="input-box">
                <input type="number" id="weight" placeholder="몸무게를 입력하세요" min={30} max={160}
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
            <button className="left-btn"><span /><p>비밀번호 변경</p></button>
            <button className="right-btn" onClick={() => submit()}><span /><p>수정</p></button>
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
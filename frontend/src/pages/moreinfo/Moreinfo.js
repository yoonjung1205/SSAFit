/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import defaultImage from './images/default.png'
import CustomAxios from '../../CustomAxios'
import './scss/moreinfo.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import editImage from './images/edit.png'
import Swal from 'sweetalert2'

export default function Moreinfo({ password, setPassword }) {
  const history = useHistory()

  const [firstCredentials, setFirstCredentials] = useState({})
  const [credentials, setCredentials] = useState({
    imageUrl:defaultImage, nickname: null, height: null, weight: null, birth: null, gender: null
  })
  const [profileImage, setProfileImage] = useState(null)

  const date = new Date();

  const fileUpload = function(event){
    const file = event.target.files[0]
    setCredentials({...credentials, imageUrl: URL.createObjectURL(file)})
    setProfileImage(file)
  }

  // url query에서 email, props에서 password
  useEffect(() => {
    const temp = JSON.parse(window.sessionStorage.getItem('credentials'))
    if (!Object.keys(firstCredentials).length && temp){
      setFirstCredentials(temp)
    }
  })


  useEffect(() => {
    if (history.location.search){
      const q = history.location.search.replace('?', '').split('=')
      window.sessionStorage.setItem('credentials', JSON.stringify({ [q[0]]: q[1]}))
      history.push('/moreinfo')
    }
    else if (!window.sessionStorage.getItem('credentials')){
      history.push('/login')
    }
  }, [])

 

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
      if (!credentials.birth){
        invalidKeys.push('생년월일')
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

  const makeCredential = () => {
    let userInfo = {...firstCredentials, ...credentials}
    delete userInfo.imageUrl; userInfo.profileImage = profileImage;
    const formdata = new FormData()
    for (const key in userInfo){
      formdata.append(key, userInfo[key])
    }
    return formdata
  }

  const submit = function(event){
    event.preventDefault();
    isValid()
    .then(() => {
      const userInfo = makeCredential()

      return CustomAxios({
        method: 'post',
        url: '/api_be/auth/signup',
        headers: {'Content-Type': 'multipart/form-data'},
        data: userInfo
      })
    })
    .then(res => {
      Swal.fire({
        text: '가입이 완료되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: 'green'
      }).then(() => {history.push('/main'); sessionStorage.removeItem('credentials')})
    })
    .catch(err => {
      if (err[0]){
        Swal.fire({
          text: err.join(', ') + (['키', '몸무게'].indexOf(err[err.length-1]) !== -1 ? '를':'을') + ' 확인해주세요!',
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: 'red'
        })
      }
      else {
        Swal.fire({
          text: '잘못된 요청입니다!',
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: 'red'
        })
      }
    })
  }

  return (
    <article className='moreinfo-container'>
      <section className='img-box'>
        <Link to="/">
          <img className='logo' src="img/logo_w.png" alt="logo" />
        </Link>
      </section>
      <section className='moreinfo-body'>
        <form onSubmit={event => submit(event)}>
          {/* 프로필사진 */}
          <label id='file-input' style={{backgroundImage: `url(${credentials.imageUrl})`}}>
            <input type="file" name="profile" id="profile" accept='image/*'
            onChange={event => fileUpload(event)} />
            <img className='edit-image' src={editImage} alt="" />
          </label>
          {/* 닉네임 */}
          <label>
            닉네임
            <div className='input-box'>
              <input type="text" name="nickname" id="nickname"
              placeholder='특수문제를 제외한 2~10자로 입력하세요' maxLength='10'
              onInput={event => setCredentials({...credentials, nickname: event.target.value})} />
            </div>
          </label>
          {/* 키 */}
          <label>
            키
            <div className='input-box'>
              <input type="number" name="height" id="height" min={100} max={210} placeholder='100이상 210이하의 숫자를 입력하세요'
              onInput={event => setCredentials({...credentials, height: event.target.value})} />
              <p className='unit'>cm</p>
            </div>
          </label>
          {/* 몸무게 */}
          <label>
            몸무게
            <div className='input-box'>
              <input type="number" name="weight" id="weight" min={30} max={160} placeholder='30이상 160이하의 숫자를 입력하세요'
              onInput={event => setCredentials({...credentials, weight: event.target.value})} />
              <p className='unit'>kg</p>
            </div>
          </label>
          {/* 생년월일 */}
          <label>
            생년월일
            <div className='input-box'>
              <input type="text" name="birth" id="birth" max={date.toISOString().slice(0, 10)} placeholder="날짜를 입력하세요"
              onInput={event => setCredentials({...credentials, birth: event.target.value})}
              onFocus={event => event.target.type = 'date'}
              onBlur={event => {if(!event.target.value){event.target.type = 'text'}}} />
            </div>
          </label>
          {/* 성별 */}
          <div id='gender'>
            성별
            <div className='input-box' id='gender-box'>
              <input type="radio" name="male" id="male" value='남성'
              onInput={() => setCredentials({...credentials, gender: 1})} />
              <label className='gender-label' htmlFor="male">남성</label>
              <input type="radio" name="male" id="female" value='여성'
              onInput={() => setCredentials({...credentials, gender: 0})} />
              <label className='gender-label' htmlFor="female">여성</label>
            </div>
          </div>
          <button>
            <span/>
            <p>회원가입</p>
          </button>
        </form>
        <Link to="/login">로그인</Link>
      </section>
    </article>
  )
}

import React from 'react'
import GoogleLogin from 'react-google-login'

const clientId = '844840822516-gvf2p8l8t86ilf81e1u3ttdaqh16j320.apps.googleusercontent.com'

export default function GoogleLoginBtn(){
  const responseGoogle = (response) => {
    console.log(response);
  }

  return(
    <GoogleLogin className='google-login'
      clientId={clientId}
      responseType={"id_token"}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}/>
  )
}
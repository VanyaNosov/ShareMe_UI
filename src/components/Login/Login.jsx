import React from 'react';
import jwt_decode from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import shareVideo from '../../assets/share.mp4'
import logo from '../../assets/logowhite.png'
import './login.scss'
import { useNavigate } from 'react-router-dom';
import {createClient} from '@sanity/client'
import { client } from '../../container/client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded));
    const { sub, name, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
  
    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })

  }

  return (
    <div className='login'>
      <div className='login__video_container'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='login__video'
        />
        <div className='login__wrapper'>
          <div className='login__logo' style={{margin: '10px'}}>
            <img src={logo} alt='logo' width='130px'/>
          </div>
          <div>
          <GoogleLogin
            onSuccess={responseGoogle}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
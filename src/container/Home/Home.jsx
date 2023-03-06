import React, { useEffect, useState, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../../components';
import Pins from '../Pins/Pins';
import { client } from '../client';
import logo from '../../assets/logo.png'
import './home.scss'
import { userQuery } from '../../utils/data';
import fetchUser from '../../utils/fetchUser';

const Home = () => {
  const userInfo = fetchUser()

  const [sidebar, setSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const query = userQuery(userInfo?.sub)

    client.fetch(query)
      .then(data => {
        setUser(data[0])
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  },[])

  return (
    <div className='home'>
      <div className='home__sidebar'>
        <div className='home__sidebar-block'>
          <Sidebar user={user && user}/> 
        </div>
        <div className='header'>
          <HiMenu fontSize={40} className='icon' onClick={() => setSidebar(!sidebar)}/>
          <Link to='/'>
            <img src={logo} alt='logo' className='home__logo-img'/>
          </Link>
          <Link to={`user-profile/${user?._id}`} className='home__user-logo-block'>
            <img src={user?.image} alt='logo' className='home__user-logo'/>
          </Link> 
          <Sidebar user={user && user} sidebar={sidebar} setSidebar={setSidebar}/>
        </div>
      </div>
      <div className='home__content' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />}/>
          <Route path='/*' element={<Pins user={user && user}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home
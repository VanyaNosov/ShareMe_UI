import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink, Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { categories } from '../../utils/data';
import './sidebar.scss'

const Sidebar = ({ user, sidebar, setSidebar }) => {
  const handleCloseSidebar = () => {
    setSidebar(true)
  }

  return (
    <div className={sidebar ? 'menu active' : 'menu'} onClick={() => handleCloseSidebar()}>
      <div className='menu__blur'/>
      <div className='menu__content' onClick={(e) => e.stopPropagation()}>
        <div className='menu__navigate'>
          <Link to='/' onClick={() => handleCloseSidebar()}>
            <img src={logo} alt='logo' className='menu__logo'/>
          </Link>
          <AiFillCloseCircle color='black' className='menu__close' onClick={() => handleCloseSidebar()}/>
        </div>
        <div className='menu__category-container'>
          <NavLink 
            to='/'
            className={({isActive}) => (isActive ? 'menu__active-link' : 'menu__no-active-link')}
            onClick={() => handleCloseSidebar()}
          >
            <div className='menu__category-items'>
              <RiHomeFill/>
              Home
            </div>
          </NavLink>
          {categories.slice(0, categories.length -1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({isActive}) => (isActive ? 'menu__active-link' : 'menu__no-active-link')}
              onClick={() => handleCloseSidebar()}
              key={category.name}
            >
              <div className='menu__category-items'>
                <img src={category.image} alt='img' className='menu__logo-categies'/>
                <p>{category.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
        {user && (
        <Link
          to={`user-profile/${user._id}`}
          onClick={handleCloseSidebar}
          className='menu__user-profile'
        >
          <img src={user.image} className="menu__user-logo" alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
      </div>
    </div>
  )
}

export default Sidebar
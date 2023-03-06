import React from 'react'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

import './navbar.scss'

const Navbar = ({serchTerm, setSearchTerm, user}) => {
  const navigate = useNavigate()
  if(!user) return null;
  return (
    <div className='navbar'>
      <div className='navbar__content'>
        <div className='navbar__search-container'>
          <IoMdSearch fontSize={21}/>
          <input
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search'
            value={serchTerm}
            onFocus={() => navigate("/search")}
            className='navbar__search'
          />
        </div>
        <div className='navbar__navigate'>
          <Link to={`/user-profile/${user?._id}`}>
            <img src={user.image} alt='user' className='navbar__user-logo'/>
          </Link>
          <Link className='navbar__create-pin' to='create-pin'>
            <IoMdAdd />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar

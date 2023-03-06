import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../../utils/data';
import { client } from '../../container/client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import Spinner from '../Spinner/Spinner';
import './userProfile.scss';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created')

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if(text === 'created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savedPins = userSavedPinsQuery(userId);

      client.fetch(savedPins)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text, userId])
  

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0])
      })
  }, [userId])

  if(!user) {
    <Spinner message='Loading profile...' />
  }
  return (
    <div className='profile'>
      <div className='profile__content-container'>
        <div className='profile__banner-container'>
          <img
            src={randomImage}
            alt='banner-pic'
            className='profile__banner-img'
          />
          <img
            src={user?.image}
            alt='user-profile'
            className='profile__banner-user-img'
          />
          <h1>{user?.userName}</h1>
        </div>
        <div className='profile__button-container'>
          <button 
            type='button'
            onClick={(e) => {
              setActiveBtn('created')
              setText(e.target.textContent)
            }}
            className={`${activeBtn === 'created' ? 'activeBtn' : 'noActiveBtn'}`}
          >
            created
          </button>
          <button
            type='button'
            onClick={(e) => {
              setActiveBtn('saved')
              setText(e.target.textContent)
            }}
            className={`${activeBtn === 'saved' ? 'activeBtn' : 'noActiveBtn'}`}
          >
            saved
          </button>
        </div>
        {pins?.length ? (
          <div className='profile__pins-container'>
            <MasonryLayout pins={pins}/>
          </div>
        ): (
          <div className='profile__no-pins-block'>
            No Pins Found!!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
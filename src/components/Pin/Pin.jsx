import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../../container/client';
import './pin.scss'
import fetchUser from '../../utils/fetchUser';


const Pin = ({pin: {postedBy, image, _id, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false)
  const navigate = useNavigate()
  const userInfo = fetchUser()

let alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfo.sub))?.length

const savePin = (id) => {
  client 
    .patch(id)
    .setIfMissing({save: []})
    .insert('after', 'save[-1]', [{
      _key: uuidv4(),
      userId: userInfo.sub,
      postedBy: {
        _type: 'postedBy',
        _ref: userInfo.sub
      }
    }])
    .commit()
      .then(() => {
        window.location.reload();
      })
}

const deletePin = (id) => {
  client
    .delete(id)
      .then(() => {
        window.location.reload()
      })
}

  return (
    <div className='pin'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='pin__hovered'
      >
        <img className='pin__image' src={(urlFor(image).url())} alt='user-post' />
        {postHovered && (
        <div className='pin__hovered-content'>
          <div className='pin__hovered-navigate-top'>
              <div className='pin__download-btn'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='pin__download-link'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button type='button' className={`pin__button-${alreadySaved}`}>
                {save?.length} saved
                </button>
                ) 
              : (
                <button 
                  type='button' 
                  className={`pin__button-${alreadySaved}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id)
                  }}
                >
                  save
                </button>
                )
              }
            </div> 
            <div className='pin__hovered-navigate-bottom'>
              {destination ? (
                <a 
                  href={destination}
                  className='pin__link'
                  target='_blank'
                  rel='noreferrer'
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15 ? `${destination.slice(0, 15)}...` : destination}
                </a>
              ): undefined}
              {postedBy?._id === userInfo.sub && (
                <button 
                  className='pin__clear'
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id)
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>      
          </div>
        )} 
        </div>
        <Link to={`/user-profile/${postedBy._id}`} className='pin__user-block'>
          <img src={postedBy.image} alt='user' className='pin__user-icon'/>
          <p className='pin__user-name'>{userInfo?.name}</p>
        </Link>
    </div>
  )
}

export default Pin
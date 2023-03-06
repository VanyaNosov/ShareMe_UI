import React, {useState, useEffect} from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import { client, urlFor } from '../../container/client';
import MasonryLayout from '../MasonryLayout/MasonryLayout';
import {pinDetailMorePinQuery, pinDetailQuery} from '../../utils/data';
import Spinner from '../Spinner/Spinner';
import './pinDetail.scss'
import fetchUser from '../../utils/fetchUser';

const PinDetail = () => {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()
  const userInfo = fetchUser();
  
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        console.log(data);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: userInfo.sub } }])
        .commit()
          .then(() => {
            setComment('');
            setAddingComment(false);
          });
    }
  };

  if(!pinDetail) return <Spinner message='Loading pin...'/>

  return (
    <>
      <div className='post'>
        <div className='post__image-block'>
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt='user-post'
            className='post__image'
          />
        </div>
        <div className='post__info-container'>
          <div className='post__links-container'>
            <div className='post__links-block'>
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='post__image-download'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={`${pinDetail?.destination}`} target='_blank' rel='noreferrer' className='post__destination'>
              {pinDetail.destination.slice(7)}
            </a>
          </div>
          <div className='post__info-block'>
            <h1 className='post__title'>
              {pinDetail.title}
            </h1>
            <p className='post__about'>
              {pinDetail.about}
            </p>
            <Link to={`/user-profile/${pinDetail.postedBy._id}`} className='post__user-block'>
              <img src={pinDetail.postedBy.image} alt='user' className='post__user-icon'/>
              <p className='post__user-name'>{pinDetail.postedBy.userName}</p>
            </Link>
            <h2 className='post__comment-title'>Comments</h2>
            {pinDetail?.comments?.map((comment, id) => {
              return (
                <div className='post__comment-block' key={id}>
                  <img
                    src={pinDetail?.postedBy?.image}
                    alt='user-profile'
                    className='post__user-icon'
                  />
                  <div>
                    <h3>{pinDetail.postedBy.userName}</h3>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='post__add-comments-container'>
            <Link to={`/user-profile/${pinDetail.postedBy._id}`} className='post__user-block'>
              <img src={pinDetail.postedBy.image} alt='user' className='post__user-icon'/>
            </Link>
            <input 
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='post__comment-input'
              placeholder='Add comment'
            />
            <button 
              type='button' 
              className='post__add-comment-btn'
              onClick={addComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 ? (
        <>
          <h2 className='post__more-pins-title'>More pins</h2>
          <MasonryLayout pins={pins} />
        </>
      ): (
        <Spinner message='Loading more pins...'/>
      )}
    </>
  )
}
 
export default PinDetail
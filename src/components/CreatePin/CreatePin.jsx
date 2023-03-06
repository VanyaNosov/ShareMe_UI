import React, {useState} from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { client } from '../../container/client';
import Spinner from '../Spinner/Spinner';
import { categories } from '../../utils/data';
import './createPin.scss';

const CreatePin = ({user}) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(false)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)

  const navigate = useNavigate();
  const uploadImage = (e) => {
    const { name, type } = e.target.files[0];
    if(type === 'image/jpeg' || type === 'image/png' || type === 'image/svg' || type === 'image/gif' || type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], {contentType: type, filename: name})
        .then((document) => {
          setImageAsset(document);
          console.log(imageAsset)
          setLoading(false);
        })
        .catch((error) => {
          console.log('Image upload error', error)
        })

    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  }
  
  const savePin = () => {
    if(title && about && imageAsset?._id && category && destination) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        },
        category,
      }
      console.log(doc)
      client.create(doc)
        .then(() => {
          navigate('/')
        })
    } else {
      setFields(true)
      setTimeout(() => setFields(false), 2000)
    }
  }

  return (
    <div className='pin-creator'>
    {fields && (
      <p className='pin-creator__text-error'>Please fill in all fields</p>
    )}
      <div className='pin-creator__image-add'>
        <div className='pin-creator__image-add-content'>
          {loading && <Spinner />}
          {wrongImageType && <p className='pin-creator__text-error'>Wrong image type</p>}
          {!imageAsset ? (
            <label>
              <div className='pin-creator__image-upload-container'>
                <div className='pin-creator__image-upload-block'>
                  <p className='pin-creator__icon-upload'>
                    <AiOutlineCloudUpload />
                  </p>
                  <p>Click to uploud</p>
                </div>
                <p className='pin-creator__text-img-recommend'>Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB</p>
              </div>
              <input 
                type='file'
                name='upload-image'
                onChange={uploadImage}
                style={{width: 0, height: 0}}
              />
            </label>
          ): (
            <div className='pin-creator__image-pin-block'>
              <img src={imageAsset.url} alt="uploaded-pic" className='pin-creator__pin-img' />
              <button className='pin-creator__crear-pin-btn' type='button' 
                onClick={() => setImageAsset(null)}  
              >
                <MdDelete />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='pin-creator__fields-block'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Add your tittle'
          className='pin-creator__field'
        />
        <input
          type='text'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder='What is your pin about'
          className='pin-creator__field'
        />
        <input
          type='text'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder='Add a destination link'
          className='pin-creator__field'
        />
        <div className='pin-creator__category-select-block'>
          <h1 className='pin-creator__category-select-tittle'>Choose Pin Category</h1>
          <select onChange={(e) => setCategory(e.target.value)} className='pin-creator__categories-container'>
            <option value='other'>Select Category</option>
            {categories.map((category) => (
              <option className='pin-creator__category' key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='pin-creator__save-pin-btn-container'>
          <button 
            type='button'
            onClick={savePin}
            className='pin-creator__save-pin-btn'
          >
            Save pin
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePin
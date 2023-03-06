import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../../container/client'
import { searchQuery, feedQuery } from '../../utils/data'
import MasonryLayout from '../MasonryLayout/MasonryLayout'
import Spinner from '../Spinner/Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const {categoryId} = useParams();
  const [pins, setPins] = useState(null)

  useEffect(() => {
    setLoading(true)
    if(categoryId) {
      const query = searchQuery(categoryId)
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
          console.log(data)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [])

  if(!pins?.length) return 'No pins!!!'
  
  if(loading) return <Spinner message="We are adding new ideas to your feed !" />
  return (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  )
}

export default Feed
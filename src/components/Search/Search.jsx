import React, { useState, useEffect } from 'react';

import MasonryLayout from '../MasonryLayout/MasonryLayout';
import { client } from '../../container/client';
import { feedQuery, searchQuery } from '../../utils/data';
import Spinner from '../Spinner/Spinner';

const Search = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  useEffect(() => {
    if(searchTerm) {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())

      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [searchTerm])
  

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div>No Pins Found!!!</div>
      )}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Search
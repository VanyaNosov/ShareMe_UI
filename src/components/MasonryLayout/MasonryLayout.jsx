import React from 'react'
import Masonry from 'react-masonry-css'

import Pin from '../Pin/Pin'
import './masonryLayout.scss'

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1
}

const MasonryLayout = ({pins}) => {
  return (
    <Masonry breakpointCols={breakpointObj} className='my-masonry-grid' columnClassName="my-masonry-grid_column">
      {pins?.map((pin) => <Pin key={pin._id} pin={pin}/>)}
    </Masonry>
  )
}

export default MasonryLayout
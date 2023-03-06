import React from 'react'
import {Circles} from 'react-loader-spinner'

import './spinner.scss'

const Spinner = ({message}) => {
  return (
    <div className='loader-container'>
      <Circles
        color='#00BFFF'
        height={50}
        width={200}
        ariaLabel="circles-loading"
      />
      <p>{message}</p>
    </div>
  )
}

export default Spinner
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {CreatePin, Feed, Navbar, Search, PinDetail} from '../../components';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Feed />}/>
          <Route path='/category/:categoryId' element={<Feed />}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />}/>
          <Route path='/create-pin' element={<CreatePin user={user} />}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins
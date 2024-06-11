import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './components/Signin'
import Signup from './components/Signup'
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import './App.css'

const App = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './components/Signin'
import Signup from './components/Signup'
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';
import './App.css'

const App = () => {
  const [newPerson, setNewPerson] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [personData, setPersonData] = useState({});
  const changePerson = () => {
    setNewPerson((prev) => !prev)
  }
  useEffect(() => {
    fetch('/api/verifyToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(
      (data) => {
        console.log(data);
        if(data.isLoggedIn) {
          setNewPerson(false);
          setPersonData(data);
        }
      }
    )
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  
    // return () => {
    //   // second
    //   //what can be done here
    // }
  }, []);

  // return (
  //   <Home />
  // )
    
  return (
      <>
        {/* {
          isLoading ? <div>Loading</div> : 
          (newPerson) ? <Signin changePerson={changePerson} /> : <ProfilePage />

        } */}

<Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Signin changePerson={changePerson} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={isLoading ? <div>Loading</div> : (newPerson ? <Signin changePerson={changePerson} /> : <ProfilePage />)} />
      </Routes>
    </Router>
        
      </>
    )
}

export default App
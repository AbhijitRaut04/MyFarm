import React, { useEffect, useState } from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ProfilePage from './components/ProfilePage';
import './App.css'

const App = () => {
  const [newPerson, setNewPerson] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [personData, setPersonData] = useState({});
  const changePerson = () => {
    setNewPerson((prev) => !prev)
  }
  useEffect(() => {
    fetch('/api/verify', {
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
  
    return () => {
      // second
      //what can be done here
    }
  }, []);
    
  return (
      <>
        {
          isLoading ? <div>Loading</div> : 
          (newPerson) ? <Signin changePerson={changePerson} /> : <ProfilePage />
        }
        
      </>
    )
}

export default App
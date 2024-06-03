import React, { useState } from 'react'
import Signin from './components/Signin'
import Signup from './components/Signup'

const App = () => {
  const [newPerson, setNewPerson] = useState(1);
  const changePerson = () => {
    setNewPerson((prev) => !prev)
  }
  const changeToSignin = () => {
    setNewPerson(0);
  }
  return (
      <>
        {
          (newPerson) ?  <Signup changePerson={changePerson} /> : <Signin changePerson={changePerson} />
        }
        
      </>
    )
}

export default App
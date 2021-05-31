
import './App.css';
import Login from './components/login'
import React, { useState } from 'react';

function App() {

  const [token, setToken] = useState('')

  const userLogin = (tk)=>{
    setToken(tk)
  }

  return (
    <div className="App">
      <Login userLogin={userLogin}/>
    </div>
  );
}

export default App;

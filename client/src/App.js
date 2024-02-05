import React from 'react';
import "./App.css"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup /> } />
          <Route path="/" element={<Home /> } />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
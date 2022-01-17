import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
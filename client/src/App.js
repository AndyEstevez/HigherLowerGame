import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';
import PostGamePage from './components/PostGamePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/game' element={<GamePage/>}/>
          <Route exact path='/postgame' element={<PostGamePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
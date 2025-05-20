import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import Board from './components/Board/Board';
import HebrewGregorianCalendar from './components/Board/Board3';
// import HebrewDatePicker from './components/Board/Board2';
//import HebrewCalendar from './components/Board/Board2';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
           <Route path="/board3" element={<HebrewGregorianCalendar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

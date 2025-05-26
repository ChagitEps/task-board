/*import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import Board from './components/Board/Board';
import HebrewGregorianCalendar from './components/Board/Board3';
import GoogleLoginButton from './components/googleEnter/GoogleLoginButton';
import GoogleSuccess from './components/googleEnter/GoogleSuccess';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GoogleLoginButton />} />
          <Route path="/google-success" element={<GoogleSuccess />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/board" element={<HebrewGregorianCalendar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


/*import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleSuccess from './GoogleSuccess';
import GoogleLoginButton from './GoogleLoginButton';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
 */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Board from './components/Board/Board';
import HebrewGregorianCalendar from './components/Board/Board3';
import GoogleLoginButton from './components/googleEnter/GoogleLoginButton';
import GoogleSuccess from './components/googleEnter/GoogleSuccess';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        
        {/* הגנה על הנתיבים הבאים */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <HebrewGregorianCalendar />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

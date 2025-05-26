import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const goToBoard = () => {
      navigate('/board');
    };
  return (
    <header>
      <h1>Welcome to my React Project</h1>
      <button onClick={goToBoard}>{"Go to the task panel >>"}</button>
    </header>
  );
}

export default Home;
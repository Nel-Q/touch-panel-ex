import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import MainPage from './components/mainPage';
import StartPage from './components/StartPage';

function App() {
  const [initialPageClicked, setInitialPageClicked] = useState(false);

  const handleInitialPageClick = () => {
    setInitialPageClicked(true);
  }
  
  return (
    <div className="App">
      {!initialPageClicked ? (<StartPage onInitialPageClick={handleInitialPageClick} />) : 
        (<MainPage />)}

    </div>
  );
}

export default App;

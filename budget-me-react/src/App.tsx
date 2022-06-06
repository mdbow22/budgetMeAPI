import React from 'react';
import './index.css';
import Hero from './Landing/Hero';
import TopNav from './Navigation/TopNav';

const App: React.FC = () => {
  return (
    <>
    <TopNav />
    <Hero />
    </>
  );
}

export default App;

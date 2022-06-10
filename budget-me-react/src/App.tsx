import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Dashboard from './Dashboard/Dashboard';
import './index.css';
import Hero from './Landing/Hero';
import UserRouter from './Navigation/Router/UserRouter';
import TopNav from './Navigation/TopNav';
import UserProvider from './services/UserContext';

const App: React.FC = () => {
  return (
    <>
    <UserProvider>
      <TopNav />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/:id' element={<UserRouter />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' />
      </Routes>
    </UserProvider>
    </>
  );
}

export default App;

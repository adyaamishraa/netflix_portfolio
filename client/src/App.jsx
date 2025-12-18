import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Project from './pages/Project.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import KnowYourAdmin from './pages/KnowYourAdmin.jsx';
import AdminProf from './pages/AdminProf.jsx';

function App() {


  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/projects' element={<Project/>}/>
        <Route path='/admin/dashboard' element={<AdminLogin/>} />
        <Route path='/knowyouradmin' element={<KnowYourAdmin/>} />
        <Route path='/adminsprofession' element={<AdminProf/>} />
      </Routes>

    </>
  )
}

export default App

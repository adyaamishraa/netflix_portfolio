import React from 'react'
import { useNavigate } from 'react-router-dom'
import movsBg from '../assets/movsBg.jpg'
import blueEmo from '../assets/blueEmo.jpg'
import redEmo from '../assets/redEmo.jpg'
import greenEmo from '../assets/greenEmo.jpg'
import yellowEmo from '../assets/yellowEmo.jpg'
import navlogo from '../assets/logo.jpg'
import './Home.css'

const Home = () => {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  }

  const handleProject = () => {
    navigate('/projects');
  }
  
  const handleAdminInfo = () => {
    navigate('/knowyouradmin')
  }

  const handleSkills = () => {
    navigate('/adminsprofession')
  }

  return (
    <div className='main-container'>
      <img src={movsBg} alt="bg" id='bgimg' />
      <div className="overlay"></div>

      <nav>
        <img src={navlogo} alt="logo" id='logo'/>
      </nav>

      <h1 id='heading'>
        Who is Watching?
      </h1>
      

      <div className="my-btns">
        <div className="my-btn-wrapper">
          <button className='my-btn' onClick={handleRegisterClick}><img src={blueEmo} alt="be" /></button>
          <span className='labels'>Register / Sign-in</span>
        </div>

        <div className="my-btn-wrapper">
          <button className='my-btn' onClick={handleProject}><img src={redEmo} alt="re" /></button>
          <span className='labels'>Projects</span>
        </div>

        <div className="my-btn-wrapper">
          <button className='my-btn' onClick={handleAdminInfo}><img src={greenEmo} alt="ge" /></button>
          <span className='labels'>Know Your Admin</span>
        </div>

        <div className="my-btn-wrapper">
          <button className='my-btn' onClick={handleSkills}><img src={yellowEmo} alt="ye" /></button>
          <span className='labels'>Tech Used</span>
        </div> 
      </div>
    </div>
  )
}

export default Home
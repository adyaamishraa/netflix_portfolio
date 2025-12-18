import React, { useEffect } from 'react'
import { useState } from 'react'
import './Project.css'
import navlogo from '../assets/logo.jpg'
import highlogo from '../assets/intro_logo.jpg'
import search from '../assets/magnifying-glass-solid-full.svg'
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import slider4 from '../assets/slider4.jpg'
import slider5 from '../assets/slider5.jpg'
import { useNavigate } from 'react-router-dom'

const Project = () => {

    const [showSearch, setShowSearch] = useState(false); // abhi show nhi hoga input.
    const [isLoggedin, setIsLoggedin] = useState(false); //abhi nhi kiya login
    

    const navigate = useNavigate();


    useEffect(() => {
        console.log("Logged in:", localStorage.getItem("isLoggedin"));
        console.log("Admin:", localStorage.getItem("isAdmin"));
        
        const loggedInStatus = localStorage.getItem("isLoggedin");
        if(loggedInStatus === "true"){
            setIsLoggedin(true);
        }
    })

    const gotohome = () => {
        navigate('/');
    }

    const handleLogout = () => {
        setIsLoggedin(false);
        localStorage.removeItem("isLoggedin");
        navigate('/');
    }

    const handleRegister = () => {
        navigate('/register');
    }








    const [projects, setProjects] = useState([]);  // fetching and storing projects data from backend.
    const [highlight, setHighlight] = useState(null); // for highlighted project at the top of page.
    const [activeProject, setActiveProject] = useState(null); // for modal to show active project details.

    //need to make img map for projects mapping with images.
    const projectImages = [slider1, slider2, slider3, slider4, slider5];

    useEffect(() => {
        try {

            const fetchProjects = async() => {
                const response = await fetch("http://localhost:5000/projects", {
                    method: 'GET',
                    credentials: 'include',
                });
                
                const data = await response.json();
                console.log("Fetched data from backend", data);

                const mappedImgProj = data.map( (project, index) => ({  // proj is data fetched from backend.
                    ...project,
                    image_url: projectImages[index % projectImages.length] // cycling through images if projects are more than images.
                }));
                
                setProjects(mappedImgProj);  // Projects state me humne mappedImgProj set kar diya. (Project + image)

                console.log("Mapped Projects ", mappedImgProj);

                if(data.length){
                    setHighlight(mappedImgProj[0]); // setting second project as highlight, we can also change the project index here. 
                }

                console.log("highlighted Proj ", highlight);

            }

            fetchProjects();
            
        } catch (error) {
           
            console.error("Erroring Fetching Project");

        }
    }, []);

   

    // connecting search input with projects in trending section.
    const [searchProj, setSearchProj] = useState('');

    const handlesearch = (e) => {
        setSearchProj(e.target.value);
    }






  return (
    <>
    <div className="slider-container">

        <nav className='nav-bar'>
            <div className="left-side">
                <img src={navlogo} alt="logo.jpg" className='nav-logo'/>
                <p className='nav-heading' onClick={gotohome}>Home</p>
                {
                    isLoggedin ? <p className='nav-heading' onClick={handleLogout}>Logout</p> : <button className='rs' onClick={handleRegister}>Register/Sign-in</button>
                }
            </div>

            <div className="right-side">
                {isLoggedin ? <div className='search-div'>
                    <img src={search} alt="search" className='search-btn' onClick={() => setShowSearch(!showSearch)}/>
                    {
                        showSearch && <input type="text" className='search-input' placeholder='search project' value={searchProj} onChange={handlesearch}/> //agar showSearch true hai to input dikhayega.
                    }
                </div> : null}    
            </div>
        </nav>





        {/* Content */}

        {isLoggedin ? (
            <>
            {
            highlight &&
                <div className='highlight-section' style={{backgroundImage: `url(${highlight.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div style={{ height: '400px', width: '40%', position: 'relative', top: '180px', left: '100px'}}>
                        <img src={highlogo} alt="logo" className='high-logo' style={{marginBottom: "20px"}}/>
                        <h1 style={{color: "#fff", fontFamily: "Bebas Neue, sans-serif", fontSize: "60px" ,fontWeight: "400", fontStyle: "normal", paddingLeft: "20px", marginBottom: "20px"}}>{highlight.title}</h1>
                        <p style={{color: "#fff", fontFamily: "Bebas Neue, sans-serif", paddingLeft: "20px", fontSize: "20px", fontWeight: "100", marginBottom:"40px"}}>{highlight.description}</p>

                        <span>
                            <button className="btns-modal" >▶️ Play</button>
                            <button className="btns-modal" onClick={() => {setActiveProject(highlight); console.log(activeProject)}} >More Info</button>
                        </span>
                    </div>
                </div>
           }

           {
            projects.length > 0 && (
                <div className='horizontal-section'>
                    <h2 className='horizontal-section-heading'>Trending Now</h2>

                    <div className="trending-container">
                        {projects
                        .filter(project => project.title.toLowerCase().includes(searchProj.toLowerCase())) // filtering projects based on search input.
                        .map((project) => (
                            <div key={project.id} className='trending-card' onClick={() => setHighlight(project)} >
                                <img src={project.image_url} alt="card-img" className='trending-card-img'/>
                                <p className='trending-title'>{project.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
           }

           {/* modal ke liye layout */}
           {
            activeProject && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2 className='modal-heading'>{activeProject.title}</h2>
                        <p className='modal-desc'>{activeProject.description}</p>
                        <p className='modal-link'>Git-Hub Link: <span className='spacing'>{activeProject.github_link}</span></p>
                        <p className='modal-tech'>Tech Used: <span className='spacing'>{activeProject.tech_used}</span></p>
                        <button className='closebtn' onClick={() => setActiveProject(null)}>Close</button>
                    </div>
                </div> 
            )
           }
            </>
        )  
        
        :

        (
            <div style={{color: "white", padding: "40px", fontSize: "40px", backgroundColor: "black", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    Please log in or register to see the projects.
            </div>     
        )
        }

    </div>
    </>
  )
}

export default Project
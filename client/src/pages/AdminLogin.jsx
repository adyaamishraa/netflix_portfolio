import React, { useEffect, useState } from 'react'
import './AdminLogin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import glitch from '../assets/glitch2.jpg'

const AdminLogin = () => {

  const [projects, setProjects] = useState([]); // fetching and storing projects data from backend.



  useEffect(() => {
    try {

      const fetchProjects = async () => {
        const response = await fetch("http://localhost:5000/projects", {
          method: 'GET',
          credentials: 'include',
        })

        const data = await response.json();
        
         // ✅ Ensure projects is always an array
        if (Array.isArray(data)) {
          setProjects(data);
        } 

        else {
          setProjects([]); // empty array if data is not an array (e.g., error object)
          console.error("Projects fetch error:", data.error || data.message);
        }

        console.log("Fetched data from backend to show in table", data);
        }
      
      fetchProjects();

    } catch (error) {

      console.error("Projects didn't get fetched");
      
    }
  }, [])





  



  const [showAddPopUp, setShowAddPopUp] = useState(false); // to show add project popup form.
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newGitLink, setNewGitLink] = useState('');
  const [newTechUsed, setNewTechUsed] = useState('');

  const addProject = async() => {
    try {

      if(!newTitle || !newDescription || !newGitLink || !newTechUsed){
        alert("Please fill all the fields");
      }

      const response = await fetch("http://localhost:5000/projects", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          github_link: newGitLink,
          tech_used: newTechUsed
        }),
        credentials: 'include',
      })

      const result = await response.json();
      console.log("Added project:", result);

      setProjects([...projects, result.addedProj]);

      // Reset fields
      setNewTitle("");
      setNewDescription("");
      setNewGitLink("");
      setNewTechUsed("");

      setShowAddPopUp(false);

    } catch (error) {

      console.error("Why proj not adding?  ",error.message);
      
    }
  }










  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    title: '',
    description: '',
    github_link: '',
    tech_used: ''
  });

  const openEditPopUp = (proj) => {
    setEditData({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      github_link: proj.github_link,
      tech_used: proj.tech_used
    })
    setShowEditPopUp(true);
  }

  const updateProject = async() => {
    try {

      const response = await fetch(`http://localhost:5000/projects/${editData.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editData.title,
          description: editData.description,
          github_link: editData.github_link,
          tech_used: editData.tech_used
        })
      })

      const updatedResult = await response.json();
      console.log("Updated Proj", updatedResult);

      // update list in UI
      const updatedProject = updatedResult.updatedProj || updatedResult;

      setProjects(projects.map(proj =>
        proj.id === editData.id ? updatedProject : proj
      ));

      setShowEditPopUp(false);
      
      
    } catch (error) {

      console.error(error.message);
      
    }
  }









  const[showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const deleteProject = async (id) => {
    setDeleteId(id);
    setShowDeletePopUp(true);
  }

  const confirmDelete = async () => {
      try {

        const response = await fetch(`http://localhost:5000/projects/${deleteId}`, {
          method: 'DELETE',
          credentials: 'include',
        })

        const data = await response.json();
        console.log("Deleted:", data);

        setProjects(projects.filter((proj) => proj.id !== deleteId));

        setShowDeletePopUp(false);
        setDeleteId(null);


        
      } catch (error) {

        console.error("Delete error:", error);
        
      }
    }




  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedin");
    navigate('/');
  }

  return (
    <>
    <div className='main-container'>
      <img src={glitch} alt="glitch" className='glitch'/>

      <div className='content'>
        <div className="admin-header">
          <h1 className='admin-head'>Admin Login</h1>
          <span className="material-symbols-outlined plus-btn" onClick={() => setShowAddPopUp(true)}>add</span>
        </div>

        <div className="table-scroll">
        <table className="table table-dark table-striped table-hover">
          <thead style={{paddingRight: "20px"}}>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Git Link</th>
              <th>Tech Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              projects.map((proj) => (
                <tr key={proj.id}>
                  <td>{proj.title}</td>
                  <td>{proj.description}</td>
                  <td><a>{proj.github_link}</a></td>
                  <td>{proj.tech_used}</td>
                  
                  <td id='action-btns'>
                    <span className="material-symbols-outlined" id='edit-btn' onClick={() => openEditPopUp(proj)}>edit</span>
                    <span id='delete-btn' className='material-symbols-outlined' onClick={() => deleteProject(proj.id)}>delete</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>


        <button className='logout-btn' onClick={handleLogout}>Log-out</button>

        
      </div>

      { showAddPopUp && (
          <div className='addpopup-overlay'>
              <div className='addpopup-content'>
                  <h2 className='addpopup-heading'>Add New Project</h2>

                  <div className="proj-inp">
                    <input type="text" placeholder='title' className='modal-inps' value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    <input type="text" placeholder='description' className='modal-inps' value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                    <input type="url" placeholder='git-link' className='modal-inps' value={newGitLink} onChange={(e) => setNewGitLink(e.target.value)}/>
                    <input type="text" placeholder='tech-used' className='modal-inps' value={newTechUsed} onChange={(e) => setNewTechUsed(e.target.value)}/>
                  </div>

                  <div>
                    <button className='close-btn' onClick={() => setShowAddPopUp(false)}>Close</button>
                    <button className='submit-btn' onClick={addProject}>Add</button>
                  </div>
              </div>
          </div> 
        )}


        {
          showDeletePopUp && (
            <div className="deletepopup">
              <div className="popupbox">
                <h2 className='del-head'>Delete Project</h2>
                <p className='del-para'>Are you sure you want to delete this project?</p>

                <div className="popup-buttons">
                  <button className="deleteBTN" onClick={confirmDelete}>Delete</button>
                  <button className="cancelBTN" onClick={() => setShowDeletePopUp(false)}>Cancel</button>
                </div>

              </div>
            </div>
          )
        }


        {
          showEditPopUp && (
            <div className="editpopup">
              <div className="editpopupbox">
                <h2 className='edit-head'>Update Project</h2>
                
                <div>
                  <input type="text" className='update-modal-inps' value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}/>
                  <input type="text" className='update-modal-inps' value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})}/>
                  <input type="text" className='update-modal-inps' value={editData.github_link} onChange={(e) => setEditData({...editData, github_link: e.target.value})}/>
                  <input type="text" className='update-modal-inps' value={editData.tech_used} onChange={(e) => setEditData({...editData, tech_used: e.target.value})}/>
                </div>

                <div className="edit-popup-buttons">
                  <button className="editBTN" onClick={updateProject}>Update</button>
                  <button className="cancel-btn" onClick={() => setShowEditPopUp(false)}>Cancel</button>
                </div>

              </div>
            </div>
          )
        }

      </div>
    </div>
    </>
  )
}

export default AdminLogin
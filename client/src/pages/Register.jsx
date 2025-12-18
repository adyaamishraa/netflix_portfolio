import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'
import netLogo from '../assets/intro_logo.jpg'
import glitch2 from '../assets/glitch2.jpg'
import movsBg from '../assets/movsBg.jpg'
import poster from '../assets/poster.jpg'
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {

  const [isSignIn, setisSignIn] = useState(false); // ye batayega signin hai ya nhi, agar nhi hai to false hoga mtlb register/signup form dikhayega.

  const switchForm = () => {
    setisSignIn((prev) => !prev); // this will help to switch / toggle between sigin and signup form.
  }







  const [formData, setFormData] = useState({name: '', email:'', password:''}); // default values of form. VALID FOR BOTH SIGNIN AND SIGNUP.


  // This function runs every time an input changes.
  const changingFormData = (e) => { 
    const nameOfInput = e.target.name; //eg- email, name, password. JAHA PE USER TYPE KAR RHA HAI, VO INPUT KA NAME.
    const valueOfInput = e.target.value; //eg- mishraadya8@gmail.com, adyamishra, 12345; USER JO TYPE KAR RHA HAI VO VALUE.

    setFormData({
      ...formData, //copying older data.
      [nameOfInput]: valueOfInput //updating the value of current input field.
    })
  }
  








  const navigate = useNavigate();

  // AB REGISTER,LOGIN ME DATA PUSH KARENGE
  const submitData = async(e) => {
     e.preventDefault(); // Prevent page reload

      try {
        let url = "";  //url jaha pe data send karna hai.

        let bodyData = {};  //bodyData will be the object you send in the request body / data kya bhejna hai.

        let isAdminLogin = false;  //isAdminLogin is a flag to remember if this login is for the admin.  Could also make it a state.
 


        // 👑 Check if admin is trying to log in
        if (isSignIn && formData.name === "adya" && formData.password === "portad") {
          url = `${API_URL}/auth/login`;       // yaha pe admin login ka url hai.
          bodyData = { username: formData.name, password: formData.password };   // backend ke req.body me ye recieve hoga.
          isAdminLogin = true;  // set the flag to true
        } 

        else {
          localStorage.removeItem("isAdmin");  // remove admin flag if it exists
          
          // 👤 Normal user login/register
          url = isSignIn
            ? `${API_URL}/user/login`
            : `${API_URL}/user/register`;
          bodyData = isSignIn ? { name: formData.name, password: formData.password } : formData;  
          // agar signin nhi hai to pura formdata jayega warna jo signin me inputs hai vo jayega.
        }



        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important for admin cookies
          body: JSON.stringify(bodyData),
        });

        const result = await response.json();
        console.log(result);



        if (response.ok) {
          alert(
            result.message ||
              (isSignIn ? "Login successful!" : "Registration successful!")
          );

          // ✅ Save login state
          localStorage.setItem("isLoggedin", true);


          
          
          if (isAdminLogin) {
            
            localStorage.setItem("isAdmin", true);
            navigate("/admin/dashboard"); // change to your admin route
          
          }
          else {

            navigate("/projects"); // normal user redirect
          
          }

          // Clear form
          setFormData({ name: "", email: "", password: "" });
      } 
      else {
          alert(result.error || "Something went wrong!");
        }

    } catch (error) {
    
      console.error("Login/Register error:", error);
      alert("Server error during login/register.");

    }
  }



  return (
    <>
    <div className="intro-container">
      <img src={glitch2} alt="bg" id='bg-img' />

      <div className='register-wrapper'>
        <img src={movsBg} alt="" id='register-bg-img'/>
        
        <div className='dark-overlay'></div>



        <div className="register-content">
          
          <div className="poster">
            <img src={poster} alt="" id='poster'/>
          </div>

        </div>



        <div className="form">
          <div className="header"> 
            {
              isSignIn ? (
                <>
                  Don't Have An Account ?<button className='register-btn' onClick={switchForm}>Register</button>
                </>
              ) 
              
              : 

              (
                <>
                  Already Have An Account ?<button className='login-btn' onClick={switchForm}>Log-in</button>  {/* false hai by defualt to ye show hoga. */}
                </>
              )
            }
          </div>

          <form className='form-content' onSubmit={submitData}>

            <img src={netLogo} alt="netLogo" className='netLogo'/>

            <h2 className='form-heading'>{isSignIn ? "Sign-In" : "Sign-Up"}</h2> {/* isSignin false pe set hai, agar true hua to signin dikhayega warna signup */}

           {/* SIGN-UP FORM, ye by default hai */}
           {!isSignIn ? ( 
             <>
               <input
                 type="text"
                 name="name"
                 placeholder="Name"
                 className="inputs"
                 onChange={changingFormData}
                 value={formData.name}
                 required
               />
               <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 className="inputs"
                 onChange={changingFormData}
                 value={formData.email}
                 required
               />
               <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 className="inputs"
                 onChange={changingFormData}
                 value={formData.password}
                 required
               />
             </>
           ) : (
             <>
               {/* SIGN-IN FORM */}
               <input
                 type="name"
                 name="name"
                 placeholder="Name"
                 className="inputs"
                 onChange={changingFormData}
                 value={formData.name}
                 required
               />
               <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 className="inputs"
                 onChange={changingFormData}
                 value={formData.password}
                 required
               />
             </>
           )}


            <button type="submit" className='submitBtn'>
              {isSignIn ? "Login" : "Register"} {/* if isSignin true hai mtlb sigin hai to login dikhayega warna register */}
            </button>

          </form>
        </div>

      </div>
    </div>
    </>
  )
}

export default Register
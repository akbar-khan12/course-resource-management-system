import '../styling.css';
import React,{useState} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { ref, get } from 'firebase/database';

function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // added state to track admin login
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleAdminCheckbox = (event) => {
    setIsAdmin(event.target.checked); // set isAdmin state to the value of the checkbox
  }

  // const handleForm = (event) => {
  //   event.preventDefault();
  
  //   let signInFunction = signInWithEmailAndPassword; // default to regular user login
  //   if (isAdmin) {
  //     // use different Firebase authentication method for admin login
  //     signInWithEmailAndPassword(adminAuth, email, password)
  //     .then(() => {
  //       navigate("/Admin");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error.message);
  //     });

  //   }
  //   signInFunction(auth, email, password)
  //     .then(() => {
  //       navigate("/home");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error.message);
  //     });
  // }

  // const handleForm = (event) => {
  //   event.preventDefault();
  
  //   const authMethod = isAdmin ? adminAuth : auth;
  
  //   signInWithEmailAndPassword(authMethod, email, password)
  //     .then(() => {
  //       navigate(isAdmin ? "/admin" : "/home");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error.message);
  //     });
  // }

   const handleForm = (event) => {
    event.preventDefault();
  let uid;
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        uid = userCredential.user.uid;
        const userRef = ref(db, `users/${uid}`);
        get(userRef).then((snapshot) => {
          const isAdmin = snapshot.val().isAdmin;
          if (isAdmin) {
            navigate("/Admin")
          } else {
            navigate("/Home");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
    }
  return (
    <div className="loginBox">
      <img className="user" src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px" alt="User icon" />
      <h3>Sign in here</h3>

      <form onSubmit={handleForm}>
        <div className="inputBox">
          <label htmlFor="uname">Username</label>
          <input id="uname" type="text" name="Username" placeholder="Username" onChange={handleEmail} required />
          <label htmlFor="pass">Password</label>
          <input id="pass" type="password" name="Password" placeholder="Password" onChange={handlePassword} required/>
        </div>
        <div>
          {/* <label>
            <input type="checkbox" checked={isAdmin} onChange={handleAdminCheckbox} />
            Login as admin
          </label> */}
        </div>
        <input type="submit" value="Login" />
        <div>
        {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;

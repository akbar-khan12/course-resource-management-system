import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Guestpage from "./pages/Guestpage";
import Signup from "./pages/Signup";
import GuestNavbar from "./components/GuestNavbar";
import Home from "./pages/Home";
import Studentnav from "./components/Studentnav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./pages/firebase";
import { useEffect, useState } from "react";
import Helpquery from "./pages/Helpquery";
import Courses from "./pages/Courses";
import Admin from "./pages/Admin";
import CoursePage from "./pages/CoursePage";
import ManageCourse from "./pages/ManageCourse";
import Sem1_manage from "./pages/Sem1_manage";
import PfManage from "./pages/PfManage";

function App() {
  const [isUserloggedin, setIsUserloggedin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserloggedin(!!user); // Update the state based on whether the user object is truthy or not
    });
    return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
  }, []);

  const [isAdminloggedin, setIsAdminloggedin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (admin) => {
      setIsAdminloggedin(!!admin); // Update the state based on whether the user object is truthy or not
    });
    return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
  }, []);

  return (
    
    <div>
      {isUserloggedin ? <Studentnav/> : <GuestNavbar/>}
      <Routes>
        <Route path="/" element={<Guestpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>}/>
        <Route path ="/helpquery" element ={<Helpquery/>}/>
        {/* <Route path="/Sem1" element={<Sem1/>}/> */}
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path='/courses/:id' element={<CoursePage />} />
        <Route path="/ManageCourse" element={<ManageCourse/>}/>
        <Route path="/Sem1_manage" element={<Sem1_manage/>}/>
        <Route path="/PfManage" element={<PfManage/>}/>
        <Route path='/Sem1_manage/:id' element={<PfManage />} />

      )}
      </Routes>

      {/* <div>
      <Sem1/>
    </div> */}
    </div>

    
  );
}

export default App;



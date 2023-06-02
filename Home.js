import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { ref, onValue } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import '../styling.css';
import Semester from "./Semester";



function Home() {
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUserId(user.uid);

      } else {
        // User is signed out
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const userRef = ref(db, `users/${userId}/fullName`);
      onValue(userRef, (snapshot) => {
        const name = snapshot.val();
        setFullName(name);

      });
    }
  }, [userId]);

  return (
    <div>

      <p className="loggedin-name">
        {fullName ? fullName : "User"}
      </p>


      <div className='Home'>
        <div className='Home__container'>

          {/* <img className='Home__image' src='https://lh3.googleusercontent.com/p/AF1QipPpPzRnxfWMTS5bWZPpvq-bPgS_KgX506SZSVcx=s1360-w1360-h1020'></img> */}

          <div className='Home_row'>
            <Link className="link_sem" to="/Courses">
              <Semester id='1' name='semester 1' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
            </Link>

            <Semester id='2' name='semester 2' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
          </div>
          <div className='Home_row' >
            <Semester id='3' name='semester 3' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
            <Semester id='4' name='semester 4' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
            <Semester id='5' name='semester 5' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
          </div>
          <div className='Home_row'>
            <Semester id='6' name='semester 6' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
            <Semester id='7' name='semester 7' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
            <Semester id='8' name='semester 8' image="https://www.pngkit.com/png/full/372-3721978_venue-partner-fast-nuces-logo.png" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;








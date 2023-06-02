import { auth} from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../styling.css';

function Signout() {
  const navigate=useNavigate("");
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return <span className="signout" onClick={handleSignout}><u>(Signout)</u></span>;
}

export default Signout;

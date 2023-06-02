import React, { useState, useEffect } from 'react';
import { ref, push } from "firebase/database";
import { db, auth } from "./firebase";
import { onValue } from 'firebase/database';
import Adminreply from './Adminreply';

function Helpquery() {
  const [queryButton, setQueryButton] = useState(false);
  const [queryText, setQueryText] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [queries,setQueries]= useState([])


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
    
      const userRef = ref(db, `users/${user.uid}/fullName`);
      onValue(userRef, (snapshot) => {
        const name = snapshot.val();
        setFullName(name);
      });
    }
  }, []);

  const handleQueryButton = () => {
    setQueryButton(!queryButton);
  }

  const handleQueryText = (event) => {
    setQueryText(event.target.value);
  }

  const handleQueryForm = (event) => {
    event.preventDefault();
    const queryRef = ref(db, "queries");
    push(queryRef, { fullName, queryText })
      .then(() => {
        console.log("Query added successfully!");
        setQueryText("");
        setQueryButton(false);
      })
      .catch((error) => {
        console.error("Error adding query: ", error);
      });
  };

  useEffect(()=>{
    const queryRef=ref(db,"queries")
    onValue(queryRef, (snapshot) => {
      const queries = [];
      snapshot.forEach((childSnapshot) => {
        const query = childSnapshot.val();
        queries.push(query);
      });
      setQueries(queries);
    });
   
  },[])
  
  return (
    <>
    {/* <Adminreply></Adminreply> */}
      <ul>
        {queries.map((query, index) => (
          <li key={index}>
            <p>Full Name: {query.fullName}</p>
            <p>Query Text: {query.queryText}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleQueryButton}>Post Query</button>
      {queryButton && (
        <form onSubmit={handleQueryForm}>
          <textarea onChange={handleQueryText} placeholder="Enter text" value={queryText} cols="40" rows="5"></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}

export default Helpquery;
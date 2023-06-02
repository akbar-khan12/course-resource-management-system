import React, { useState } from 'react';
import { set, ref } from "firebase/database";
import { db } from "./firebase";

function Adminreply() {
  const [adminReply, setAdminReply] = useState("");
  

  const handleAdminForm = (event) => {
    event.preventDefault();
    const dataRef = ref(db, "Adminreplies");
    set(dataRef, {adminReply})
      .then(() => {
        console.log("Admin reply added successfully!");
        setAdminReply("");
      })
      .catch((error) => {
        console.error("Error adding admin reply: ", error);
      });
  };

  const handleAdminReplyChange = (event) => {
    setAdminReply(event.target.value);
  };

  return (
    <form className='form__reply' onSubmit={handleAdminForm}>
      <input className='form__reply_input' type="text" value={adminReply} onChange={handleAdminReplyChange} />
      <button className='form__reply_button' type="submit">Submit</button>
    </form>
  );
}

export default Adminreply;
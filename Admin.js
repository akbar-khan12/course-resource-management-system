import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, push, update } from "firebase/database";
import { db, auth } from "./firebase";
import Adminreply from './Adminreply';
import { Navigate, Link } from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [queries, setQueries] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState([]);
    const [adminText, setadminText] = useState("");


    const handleReplyText = (event) => {
        setReplyText(event.target.value);
    }

    const handleadminText = (event) => {
        setadminText(event.target.value);
    }


    const handleReplyForm = (event, queryId) => {
        event.preventDefault();
        const replyRef = ref(db, `replies/${queryId}`);
        push(replyRef, replyText)
            .then(() => {
                console.log("Reply added successfully!");
                setReplyText("");
                // update the replies state with the new reply
                setReplies(prevReplies => ({
                    ...prevReplies,
                    [queryId]: [...prevReplies[queryId], replyText]
                }));
            })
            .catch((error) => {
                console.error("Error adding reply: ", error);
            });
    };

    useEffect(() => {
        const replyRef = ref(db, "replies/")
        onValue(replyRef, (snapshot) => {
            const replies = {};
            snapshot.forEach((childSnapshot) => {
                const queryId = childSnapshot.key;
                const queryReplies = childSnapshot.val();
                replies.push(queryReplies);
            });
            setReplies(replies);
            console.log(replies);
        });

    }, [])


    // const db = getDatabase();
    useEffect(() => {
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            const usersData = snapshot.val();
            const users = Object.entries(usersData)
                .filter(([userId, userData]) => !userData.isAdmin) // <-- filter out admins
                .map(([userId, userData]) => ({
                    id: userId,
                    email: userData.email,
                    fullName: userData.fullName
                }));
            setUsers(users);
        });
    }, []);


    useEffect(() => {
        const queriesRef = ref(db, 'queries/');
        onValue(queriesRef, (snapshot) => {
            const queriesData = snapshot.val();
            const queries = Object.entries(queriesData).map(([queryId, queryData]) => ({
                id: queryId,
                fullName: queryData.fullName,
                queryText: queryData.queryText,
            }));
            setQueries(queries);
            console.log(queries);
        });


    }, []);

    return (

        <div className="admin-page">
            <h1 className="admin-page__heading">Admin Page</h1>

            {/* <div className='admin_repp'>
      <form className='form_admin'>
          <label htmlFor="adminText">Admin Text:</label>
          <input type="text" id="adminText" name="adminText" onChange={handleadminText} />
          <button type="submit">Submit</button>
      </form>
  </div> */}

            <div className="admin-page__users">
                <h2 className="admin-page__section-heading">Users</h2>
                {/* <input type="text" className="admin-page__filter-input" placeholder="Filter by full name"  /> */}
                <table className="admin-page__table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            {/* <th>Role</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                {/* <td>{user.role}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-page__queries">
                <h2 className="admin-page__section-heading">Queries</h2>
                {/* <input type="text" className="admin-page__filter-input" placeholder="Filter by query text" onChange={(e) => filterQueriesByQueryText(e.target.value)} /> */}
                <ul className="admin-page__query-list">
                    {queries.map(query => (
                        <li key={query.id}>
                            <div>Query Text: {query.queryText}</div>
                            <div>Full Name: {query.fullName}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="Replies">
                <h2>Replies</h2>
                <Adminreply></Adminreply>
            </div>

            <Link to="/ManageCourse" className="admin-page__manage-course-link">
                <div>
                    <h2>Manage Courses</h2>
                </div>
            </Link>
        </div>

    );
};

export default Admin;

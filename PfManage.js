import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { db, auth } from "./firebase";
import Quiz from "./Quiz";
import Adminquiz from "./Adminquiz";
import Adminoutline from "./Adminoutline";
import Adminpast from "./Adminpast";
import Adminassign from "./Adminassign";
import { useParams } from "react-router-dom";

function PfManage() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const courseRef = ref(getDatabase(), `course/${id}`);

        onValue(courseRef, (snapshot) => {
            const data = snapshot.val();
            setCourseData(data);
        });

        // Clean up the listener when the component unmounts
        return () => {
            // detach the onValue listener
            // e.g., off(courseRef);
        };
    }, [id]);

    console.log(id);
    console.log("hle");

    return (
        <div className="course-page-container">
            <h1 className="course-page-heading">Course Page</h1>
            {courseData && (
                <div className="course-page-content">
                    <h1 className="course-page-section-heading">Course Outline</h1>
                    <p className="course-page-section-content">{courseData.courseOutline}</p>
                    <Adminoutline></Adminoutline>
                    <h1 className="course-page-section-heading">Past Papers</h1>
                    <p className="course-page-section-content">{courseData.pastPapers}</p>
                    <Adminpast></Adminpast>
                    <h1 className="course-page-section-heading">Quizzes</h1>
                    <p className="course-page-section-content">{courseData.quizzes}</p>
                    <Adminquiz></Adminquiz>
                    <h1 className="course-page-section-heading">Assignments</h1>
                    <p className="course-page-section-content">{courseData.assignments}</p>
                    <Adminassign></Adminassign>
                </div>
            )}
        </div>


    );
}

export default PfManage

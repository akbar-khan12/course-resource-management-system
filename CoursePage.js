import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { db, auth } from "./firebase";
import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
import Outline from "./Outline";
import Pastpaperss from "./Pastpaperss";
import Assignments from "./Assignments";

function CoursePage() {
    const { id } = useParams();
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        // Get a reference to the "course" node in the Realtime Database
        const courseRef = ref(getDatabase(), "course");
      
        // Set the course data in the Realtime Database
        set(courseRef, {
          "1": {
            course_name: "programming fundamentals",
            courseOutline: "Course outline for programming fundamentals",
            pastPapers: "Past papers for programming fundamentals",
            quizzes: "Quizzes for programming fundamentals",
            assignments: "Assignments for programming fundamentals",
          },
          "2": {
            course_name: "ICT",
            courseOutline: "Course outline for ICT",
            pastPapers: "Past papers for ICT",
            quizzes: "Quizzes for ICT",
            assignments: "Assignments for ICT",
          },
          "3": {
            course_name: "Pak studies",
            courseOutline: "Course outline for Pak studies",
            pastPapers: "Past papers for Pak studies",
            quizzes: "Quizzes for Pak studies",
            assignments: "Assignments for Pak studies",
          },
          // Add other courses following the same pattern
          "4": {
            course_name: "islamiat",
            courseOutline: "Course outline for islamiat",
            pastPapers: "Past papers for islamiats",
            quizzes: "Quizzes for islamiat",
            assignments: "Assignments for islamiat",
          },
          "5": {
            course_name: "english",
            courseOutline: "Course outline for english",
            pastPapers: "Past papers for english",
            quizzes: "Quizzes for english",
            assignments: "Assignments for english",
          },
          "6": {
            course_name: "calculus",
            courseOutline: "Course outline for calculus ",
            pastPapers: "Past papers for calculus ",
            quizzes: "Quizzes for calculus ",
            assignments: "Assignments for calculus ",
          },
          "7": {
            course_name: "applied physics",
            courseOutline: "Course outline for applied physics",
            pastPapers: "Past papers for applied physics",
            quizzes: "Quizzes for applied physics",
            assignments: "Assignments for applied physics",
          },
        });
      
        // Listen for changes to the course data in the Realtime Database
        onValue(courseRef, (snapshot) => {
          const data = snapshot.val();
          setCourseData(data);
        });
      }, []);

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
        <div className="course-page">
            <h1 className="course-page__heading">Course Page</h1>
            {courseData && (
                <div className="course-page__content">
                    <h2 className="course-page__section-heading">Course Outline</h2>
                    <p className="course-page__section-content">{courseData.courseOutline}</p>
                    <Outline></Outline>
                    <h2 className="course-page__section-heading">Past Papers</h2>
                    <p className="course-page__section-content">{courseData.pastPapers}</p>
                    <Pastpaperss></Pastpaperss>
                    <h2 className="course-page__section-heading">Quizzes</h2>
                    <p className="course-page__section-content">{courseData.quizzes}</p>
                    <Quiz></Quiz>
                    <h2 className="course-page__section-heading">Assignments</h2>
                    <p className="course-page__section-content">{courseData.assignments}</p>
                    <Assignments></Assignments>
                </div>
            )}
        </div>

    );
}

export default CoursePage;

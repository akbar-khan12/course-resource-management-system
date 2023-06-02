import { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { useParams } from "react-router-dom";

function Assignments() {
  const [fileUrls, setFileUrls] = useState([]);
  const { id } = useParams();

  const filesListRef = ref(storage, `courses/${id}/assignments/`);

  useEffect(() => {
    listAll(filesListRef)
      .then((response) => {
        const promises = response.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );
        Promise.all(promises).then((urls) => {
          setFileUrls(urls);
        });
      })
      .catch((error) => {
        console.log("Error fetching files:", error);
      });
  }, []);

  return (
    <div className="App">
      {fileUrls.map((url, index) => (
        <div key={index}>
          {isImage(url) ? (
            <img src={url} alt={`Image ${index}`} />
          ) : isPDF(url) ? (
            <iframe src={url} title={`PDF ${index}`} width="100%" height="500px" />
          ) : isGoogleDriveLink(url) ? (
            <a href={url} target="_blank" rel="noopener noreferrer">
              Google Drive Link
            </a>
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer">
              Assignment {index+1}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

// Helper functions to determine file types
function isImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function isPDF(url) {
  return url.match(/\.pdf$/) != null;
}

function isGoogleDriveLink(url) {
  return url.includes("drive.google.com");
}

export default Assignments;











// import { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "./firebase";
// import { v4 } from "uuid";



// function Quiz() {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const imagesListRef = ref(storage, "quizzes/");
//   const uploadFile = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `quizzes/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls((prev) => [...prev, url]);
//       });
//     });
//   };

//   useEffect(() => {
//     listAll(imagesListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageUrls((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       {/* <input
//         type="file"
//         onChange={(event) => {
//           setImageUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadFile}> Upload Image</button> */}
//       {imageUrls.map((url) => {
//         return <img src={url} />;
//       })}
//     </div>
//   );
// }

// export default Quiz




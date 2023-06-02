import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

function Adminpast() {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrls, setFileUrls] = useState([]);
  const [textInput, setTextInput] = useState("");
  const { id } = useParams();

  console.log(id);
  console.log("iiii");

  const filesListRef = ref(storage, `courses/${id}/pastpapers/`);

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `courses/${id}/pastpapers/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrls((prev) => [...prev, { id: v4(), name: fileUpload.name, url, ref: snapshot.ref }]);
      });
    });
  };
  // console.log(courseId);

  const uploadTextFile = () => {
    if (textInput.trim() === "") return;
    const fileName = `textfile_${v4()}.txt`;
    const textFileRef = ref(storage, `courses/${id}/pastpapers/${fileName}`);
    const textBlob = new Blob([textInput], { type: "text/plain" });
    uploadBytes(textFileRef, textBlob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileUrls((prev) => [...prev, { id: v4(), name: fileName, url, ref: snapshot.ref }]);
      });
    });
    setTextInput("");
  };

  const deleteFile = (file) => {
    deleteObject(file.ref)
      .then(() => {
        setFileUrls((prev) => prev.filter((f) => f.id !== file.id));
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting file: ", error);
      });
  };

  useEffect(() => {
    listAll(filesListRef)
      .then((response) => {
        const promises = response.items.map((item) => {
          return getDownloadURL(item)
            .then((url) => ({
              id: item.name,
              name: item.name,
              url,
              ref: item,
            }))
            .catch((error) => {
              console.error("Error getting download URL: ", error);
              return null;
            });
        });

        Promise.all(promises)
          .then((results) => {
            const filteredResults = results.filter((result) => result !== null);
            setFileUrls(filteredResults);
          })
          .catch((error) => {
            console.error("Error resolving promises: ", error);
          });
      })
      .catch((error) => {
        console.error("Error listing files: ", error);
      });
  }, [id]);


  return (
    <div className="MyApp">
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File</button>

      <input
        type="text"
        value={textInput}
        onChange={(event) => setTextInput(event.target.value)}
      />
      <button onClick={uploadTextFile}>Upload Text File</button>

      {fileUrls.map((file) => (
        <div key={file.name}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
          <button onClick={() => deleteFile(file)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Adminpast;













// import { useState, useEffect } from "react";
// import {
//     ref,
//     uploadBytes,
//     getDownloadURL,
//     listAll,
//     list,
// } from "firebase/storage";
// import { storage } from "./firebase";
// import { v4 } from "uuid";



// function Adminquiz() {
//     const [imageUpload, setImageUpload] = useState(null);
//     const [imageUrls, setImageUrls] = useState([]);

//     const imagesListRef = ref(storage, "quizzes/");
//     const uploadFile = () => {
//         if (imageUpload == null) return;
//         const imageRef = ref(storage, `quizzes/${imageUpload.name + v4()}`);
//         uploadBytes(imageRef, imageUpload).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 setImageUrls((prev) => [...prev, url]);
//             });
//         });
//     };

//     useEffect(() => {
//         listAll(imagesListRef).then((response) => {
//             response.items.forEach((item) => {
//                 getDownloadURL(item).then((url) => {
//                     setImageUrls((prev) => [...prev, url]);
//                 });
//             });
//         });
//     }, []);

//     return (
//         <div className="MyApp">
//             <input
//                 type="file"
//                 onChange={(event) => {
//                     setImageUpload(event.target.files[0]);
//                 }}
//             />
//             <button onClick={uploadFile}>Upload Image</button>
//             {/* {imageUrls.map((url) => {
//     return <img src={url} />;
//   })} */}
//         </div>

//     );
// }

// export default Adminquiz
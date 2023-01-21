import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import {
  ref, uploadBytesResumable, getDownloadURL 
} from "firebase/storage";
import { storage, db, auth } from "../../configs/firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import UseCompressImage from "../../hooks/useCompressImage";

export default function AddMenu() {
  const [ user ] = useAuthState(auth);
  const [ formData, setFormData ] = useState({
    name: "Nasi Goreng",
    image: "",
    price: "50000",
    category: "Seafood",
  });

  const [ progressCompress, setProgressCompress ] = useState(0);

  const [ progress, setProgress ] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    UseCompressImage(e, formData, setFormData, setProgressCompress);
  };

  const handlePublish = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast("Please fill all the fields");
      return;
    }

    const storageRef = ref(storage, `/image/${formData.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          name: "",
          image: "",
          price: "",
          category: ""
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const kameradRef = collection(db, "list-menu");
          addDoc(kameradRef, {
            name: formData.name,
            image: url,
            price: formData.price,
            category: formData.category,
          })
            .then(() => {
              toast("Menu Created", { type: "success" });
              setProgress(0);
            })
            .catch(() => {
              toast("Error", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div>
      {!user ? (
        <>
          <h2>
            <Link to="/login">Login To Create Menu</Link>
          </h2>
        </>
      ) : (
        <div className="formadmincontainer">
          <div className="formtitle">Create</div>

          <div className="formadmin">
            <label htmlFor="">Name</label>
            <textarea
              name="name"
              className="form-control"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="formadmin">
            <label htmlFor="">Price</label>
            <textarea
              name="price"
              className="form-control"
              value={formData.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="formadmin">
            <label htmlFor="">Category</label>
            <textarea
              name="category"
              className="form-control"
              value={formData.category}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="formadmin">
            <label htmlFor="">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
          {progressCompress === 0 || progressCompress == 100 ? null : (
            <div className="progress">
              <div
                className="barloadingcompress"
                style={{ width: `${progressCompress}%` }}
              >
                {`compressing image ${progressCompress}%`}
              </div>
            </div>
          )}
          <button className="formbutton" onClick={handlePublish}>
            Publish
          </button>
        </div>
      )}
    </div>
  );
}

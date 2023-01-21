import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db, auth } from "../configs/firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import UseCompressImage from "../hooks/useCompressImage";

export default function UseUpdateDataWithImage({
  id,
  image,
  type,
  collection,
}) {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });

  const [progressCompress, setProgressCompress] = useState(0);

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    UseCompressImage(e, formData, setFormData, setProgressCompress);
  };

  const success = () => {
    toast("Menu Edited", { type: "success" });
    setFormData({
      name: "",
      image: "",
      price: "",
      category: "",
    });
  };

  const error = () => {
    toast("Error", { type: "error" });
  };

  const handlePublish = () => {
    const docRef = doc(db, type, id);

    if (formData?.name)
      updateDoc(docRef, { name: formData?.name }).then(success).catch(error);
    if (formData?.price)
      updateDoc(docRef, { price: formData?.price }).then(success).catch(error);
    if (formData?.category)
      updateDoc(docRef, { category: formData?.category })
        .then(success)
        .catch(error);
    if (formData?.image) {
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
          getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {
              if (url)
                updateDoc(docRef, { image: url }).then(success).catch(error);
            })
            .then(async () => {
              const storageRef = ref(storage, image);
              await deleteObject(storageRef);
            });
        }
      );
    }
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
          <div className="formtitle">Edit</div>

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
            Submit Edit
          </button>
        </div>
      )}
    </div>
  );
}

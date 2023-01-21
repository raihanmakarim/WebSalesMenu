import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../configs/firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

const UseDeleteDataWithImage = ({
  id, image, type, collection
}) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${collection}?`)) {
      try {
        await deleteDoc(doc(db, type, id))
        toast(`${collection} deleted successfully`, { type: "success" })
        const storageRef = ref(storage, image);
        await deleteObject(storageRef);
      }
      catch (error) {
        toast(`Error deleting ${collection}`, { type: "error" });
      }
    }
  };
  return (
    <div className="deleteButton">
      <button onClick={handleDelete}>{`Delete ${collection}`}</button>
    </div>
  );
}

export default UseDeleteDataWithImage;
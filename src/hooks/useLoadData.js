import { useEffect, useState } from "react";
import {
  query, collection, onSnapshot, limit, where 
} from "firebase/firestore";
import {db} from "../configs/firebase"

const useLoadData = (dbName, limitData = 20, page = 1, isFilter = false) => {
  const [ data, setData ] = useState([]);
  const shownData = page * limitData;

  useEffect(() => {
    const dbCollection = collection(db, dbName);
    const q = query(dbCollection, limit(shownData), where("category", "==", isFilter));
    const r = query(dbCollection, limit(shownData));
    const queryData = isFilter ? q : r;

    onSnapshot(queryData, (snapshot) => {
      const response = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(response);
    });

  }, [ page ]);

  return data;
};

export default useLoadData;
import React from "react";
import { useState } from "react";
import { auth } from "../../configs/firebase";
import AddMenu from "./AddMenu";
import "./index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useLoadDataWithOffset from "../../hooks/useLoadData";
import UseDeleteDataWithImage from "../../hooks/UseDeleteDataWithImage";


const Admin = () => {
  const [user] = useAuthState(auth);

  const [offset, setOffset] = useState(1);
  const dataKegiatan = useLoadDataWithOffset("list-menu", 3, offset);

  const loadMoreKegiatan = () => { setOffset(offset + 1)};

  return (
    <div style={{ marginBottom: 300 }}>
      <div className="testContainer" style={{ marginBottom: 100 }}>
        <div className="adminContainer">
          {dataKegiatan.length === 0 ? (
            <span className="visually-hidden">Loading...</span>
          ) : (
            dataKegiatan.map(({ id, name, image, category, price }) => (
              <div className="kameradContainerz">
                <div key={id} className="kamerad-container-id">
                  <img src={image} style={{ width: 135, height: 135 }}></img>
                  <div className="kamerad-idz">
                    <div>{name}</div>
                    <div>{category}</div>
                    <div>{`Rp${price}`}</div>
                    {user && (
                      <UseDeleteDataWithImage
                        id={id}
                        image={image}
                        type="list-menu"
                        collection="Menu"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <button className="buttonLoadMore" onClick={loadMoreKegiatan}>
            LOAD MORE
          </button>
        </div>
        <div>
          <a href="./">
          <h1>{`< Go Back`}</h1>
          </a>
          <AddMenu></AddMenu>
        </div>
      </div>
    </div>
  );
};

export default Admin;

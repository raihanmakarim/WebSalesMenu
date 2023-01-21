import React from "react";
import { useState } from "react";
import { auth } from "../../configs/firebase";
import AddMenu from "./AddMenu";
import "./index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useLoadDataWithOffset from "../../hooks/useLoadData";
import UseDeleteDataWithImage from "../../hooks/UseDeleteDataWithImage";
import UseUpdateDataWithImage from "../../hooks/useUpdateDataWithImage";
import { numberToCurrency } from "../../helpers/GlobalHelpers";

const Admin = () => {
  const [user] = useAuthState(auth);

  const [offset, setOffset] = useState(1);
  const dataKegiatan = useLoadDataWithOffset("list-menu", 3, offset);

  const loadMoreKegiatan = () => {
    setOffset(offset + 1);
  };

  return (
    <div style={{ marginBottom: 300 }}>
      <div className="testContainer" style={{ marginBottom: 100 }}>
        <div className="adminContainer">
          {dataKegiatan.length === 0 ? (
            <span className="visually-hidden">Loading...</span>
          ) : (
            dataKegiatan.map(({ id, name, image, category, price }) => (
              <div className="adminMenuContainer">
                <div key={id} className="admin-container-id">
                  <img src={image}></img>
                  <div className="adminMenu">
                    <div className="currentMenu">
                      <div>{name}</div>
                      <div>{category}</div>
                      <div>{numberToCurrency(price)}</div>
                      {user && (
                        <UseDeleteDataWithImage
                          id={id}
                          image={image}
                          type="list-menu"
                          collection="Menu"
                        />
                      )}
                    </div>
                    <UseUpdateDataWithImage
                      id={id}
                      type="list-menu"
                      image={image}
                    />
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

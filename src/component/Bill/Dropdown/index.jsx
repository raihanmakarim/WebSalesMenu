import React, { useState, useEffect } from "react";
import s from "./Dropdown.module.scss";

const Dropdown = ({ updateDineOptions }) => {
  //dropDownMenu
  const dineOptions = ["Dine In", "Take Away", "Delivery"];
  const [dineIndex, setDineIndex] = useState(0);
  {
    dineIndex == 4 ? setDineIndex(1) : dineIndex > 2 ? setDineIndex(0) : null;
  }
  const dineIndex1 =
    dineIndex + 1 > 2 ? dineOptions[dineIndex - 2] : dineOptions[dineIndex + 1];
  const dineIndex2 =
    dineIndex + 2 > 2 ? dineOptions[dineIndex - 1] : dineOptions[dineIndex + 2];

  useEffect(() => {
    updateDineOptions(dineIndex);
  }, [dineIndex]);

  return (
    <div className={s.dropDown}>
      <div className={s.dropDownItem}>{dineOptions[dineIndex]}</div>
      <div className={s.dropDownContent}>
        <div
          onClick={() => setDineIndex(dineIndex + 1)}
          className={s.dropDownItem}
        >
          {dineIndex1}
        </div>
        <div
          onClick={() => setDineIndex(dineIndex + 2)}
          className={s.dropDownItem}
        >
          {dineIndex2}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

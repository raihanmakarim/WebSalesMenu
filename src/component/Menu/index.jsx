import React, { useContext, useEffect } from "react";
import s from "./Menu.module.scss";
import { Context as MenuContext } from "../../context/menuContext";
import { Context as CartContext } from "../../context/cartContext";
import { mutateData, objectToArray } from "../../helpers/GlobalHelpers";

const Menu = () => {
  const { state: menuState, getAllMenu } = useContext(MenuContext);
  const {
    state: cartState,
    handleAddToCart,
    handleDecreaseToCart,
  } = useContext(CartContext);
  const mutatedData = mutateData(menuState) || {};
  const mutatedDataToArray = objectToArray(mutatedData) || [];

  useEffect(() => {
    getAllMenu(), [];
  });

  console.log(mutatedDataToArray);

  return (
    <div className={s.menu}>
      {mutatedDataToArray &&
        mutatedDataToArray.map((el) => {
          return (
            <div className={s.menuRow}>
              <div className={s.titleCard}>
                <h1>
                  {el[0][0]}
                  {el[0][1]}
                </h1>
                <div className={s.menuName}>{el[0]}</div>
              </div>
              {el[1].map((item) => {
                return (
                  <div className={s.card}>
                    <div>
                      <div className={s.cardHeader}>{item?.name}</div>
                      <div className={s.cardImage}>
                        <img src={item?.image} />
                      </div>
                      <div className={s.cardFooter}>{item?.price}</div>
                    </div>
                    <div className={s.cardOption}>
                      <div
                        className={s.cardButton}
                        onClick={() => handleDecreaseToCart(item)}
                      >
                        -
                      </div>
                      <div style={{ color: "black" }}>
                        {cartState.find((el) => item?.name === el?.name)
                          ?.quantity || 0}
                      </div>
                      <div
                        className={s.cardButton}
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Menu;

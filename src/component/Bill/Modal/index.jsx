import React, { useState, useEffect } from "react";
import s from "./Modal.module.scss";
import { numberToCurrency } from "../../../helpers/GlobalHelpers";

const Modal = ({
  open,
  onClose,
  updateTable,
  modalName,
  updatePayment,
  updateChange,
  totalValue,
}) => {
  if (!open) return null;
  const [table, setTable] = useState(1);
  const tableList = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  if (updateTable) {
    useEffect(() => {
      updateTable(table);
    }, [table]);
  }

  const [paymentInput, setPaymentInput] = useState(0);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  if ((updatePayment, updateChange)) {
    useEffect(() => {
      updatePayment(payment);
      updateChange(change);
    }, [payment, change]);
  }

  const click = () => {
    setPayment(paymentInput);
  };

  useEffect(() => {
    setPaymentInput(0);
    setChange(payment - totalValue);
  }, [payment]);

  const handlePayment = (e) => {
    setPaymentInput(e.target.value);
  };

  const enter = (e) => {
    if (e.key === "Enter") {
      click();
    }
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      {modalName === "viewtable" ? (
        <div onClick={onClose}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            onScroll={(e) => {
              e.stopPropagation();
            }}
            className={s.modalContainer}
          >
            <p className={s.closeBtn} onClick={onClose}>
              X
            </p>
            <div className={s.content}>
              {tableList.map((item) => {
                return (
                  <div
                    className={s.table}
                    onClick={async () => {
                      await setTable(item);
                      onClose();
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className={s.cashier}> Cashier </div>
            <div className={s.door} />
          </div>
        </div>
      ) : modalName === "charge" ? (
        <div onClick={onClose}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            onScroll={(e) => {
              e.stopPropagation();
            }}
            className={s.modalContainer}
          >
            <p className={s.closeBtn} onClick={onClose}>
              X
            </p>
            <div className={s.contentCharge}>
              <h1>Charge Menu</h1>
              <div>Total Price: {numberToCurrency(totalValue)}</div>
              <div>Input Payment </div>
              <div className={s.cash}>
                <input
                  type="number"
                  title="Rp"
                  onChange={handlePayment}
                  value={paymentInput}
                  onKeyUp={enter}
                />
                <button onClick={click}>OK</button>
              </div>
              <div>Total Change: {numberToCurrency(change)}</div>
              <button
                style={{ width: "100px", height: "50px", fontSize: "20px" }}
                onClick={() => {
                  click();
                  setTimeout(() => {
                    onClose();
                  }, 200);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;

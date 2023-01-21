import React, { useState, useContext, useRef } from "react";
import s from "./Bill.module.scss";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import { numberToCurrency } from "../../helpers/GlobalHelpers";
import { Context as CartContext } from "../../context/cartContext";
import { CgProfile } from "react-icons/cg";
import { FaListUl } from "react-icons/fa";
import { BsLayoutSplit } from "react-icons/bs";

const Bill = () => {
  const { state: cartState, clearCart } = useContext(CartContext);

  const total = cartState.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );

  const [dineIndex, setDineIndex] = useState(0);
  const updateDineOptions = (dineIndex) => {
    setDineIndex(dineIndex);
  };
  const deliveryFee = dineIndex == 2 ? 5000 : 0;

  const [openModal, setOpenModal] = useState(false);
  const [openChargeModal, setOpenChargeModal] = useState(false);

  const [table, setTable] = useState(1);

  const printRef = useRef();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handlePopUpSave = () => {
    if (confirm("Do you want to Print Bill?")) {
      return handleDownloadImage();
    }
    return;
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Bill",
    onAfterPrint: () => alert("Printed"),
  });

  const { BillingVisible, BillingHidden } = s;
  const [Billingclass, setBillingClass] = useState(BillingVisible);

  const updateBillinglist = () => {
    if (Billingclass == BillingVisible) {
      setBillingClass(BillingHidden);
    } else {
      setBillingClass(BillingVisible);
    }
  };

  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);

  return (
    <div className={s.container}>
      <Modal
        modalName="viewtable"
        open={openModal}
        onClose={() => setOpenModal(false)}
        updateTable={(Table) => setTable(Table)}
      ></Modal>
      <Modal
        modalName="charge"
        open={openChargeModal}
        onClose={() => setOpenChargeModal(false)}
        totalValue={total}
        updatePayment={(payment) => setPayment(payment)}
        updateChange={(change) => setChange(change)}
      ></Modal>
      <div className={s.headerButtonBilling} onClick={updateBillinglist}>
        <FaListUl style={{ color: "#5469AD", fontSize: "42px" }} />
        Billing List
      </div>
      <div ref={printRef} className={Billingclass}>
        <div>
          <div className={s.header}>
            <div className={s.headerButton}>
              <a href="./login">
                <CgProfile style={{ color: "#5469AD", fontSize: "40px" }} />
              </a>
              Customer
            </div>
            <h1>New Customer</h1>
            <div className={s.headerButton}>billing</div>
          </div>
          <Dropdown updateDineOptions={updateDineOptions} />
        </div>

        <div className={s.billListBlock}>
          <div className={s.viewTable}>
            <div>{table}</div>
            <div
              onClick={() => {
                setOpenModal(true);
              }}
            >
              View Table
            </div>
          </div>
          <div
            style={{
              flexDirection: "column",
              height: "72%",
            }}
          >
            {cartState &&
              cartState.map((el) => {
                return (
                  <div className={s.listItem}>
                    <div>{el?.name}</div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div>{el?.quantity}x</div>
                      <div>{numberToCurrency(el?.quantity * el?.price)}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className={s.listItem}>
            <div>Delivery Fee :</div>
            <div>{numberToCurrency(deliveryFee)}</div>
          </div>
          <div className={s.listItem}>
            <div>Sub-Total:</div>
            <div>{numberToCurrency(total + deliveryFee)}</div>
          </div>
          <div className={s.listItem}>
            <div>Total:</div>
            <div>{numberToCurrency(total + deliveryFee)}</div>
          </div>
          <div className={s.listItem}>
            <div>Payment:</div>
            <div>{numberToCurrency(payment)}</div>
          </div>
          <div className={s.listItem} style={{ marginBottom: "3px" }}>
            <div>Change:</div>
            <div>{numberToCurrency(change)}</div>
          </div>
        </div>

        <div className={s.clearSaleButton} onClick={clearCart}>
          Clear Sale
        </div>

        <div className={s.billBlock} style={{ paddingTop: "25px", gap: "2px" }}>
          <div className={s.billButton} onClick={handlePopUpSave}>
            Save Bill
          </div>
          <div className={s.billButton} onClick={handlePrint}>
            Print Bill
          </div>
        </div>

        <div style={{ display: "flex", gap: "1px" }}>
          <div className={s.splitBill} style={{ width: "20%" }}>
            <BsLayoutSplit style={{ fontSize: "35px" }} />
            Split Bill
          </div>

          <div
            className={s.charge}
            onClick={() => {
              setOpenChargeModal(true);
            }}
          >
            Charge {numberToCurrency(total + deliveryFee)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;

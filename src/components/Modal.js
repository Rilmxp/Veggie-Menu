import { useRef, useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ isOpen, handleDeleteUserAccount, close }) => {
  const dialog = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
      document.body.style.overflow = "hidden"; // prevent bg scroll
    } else {
      dialog.current.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <dialog className={styles.dialog} ref={dialog}>
      <p>Are you sure you want to delete your account?</p>
      <div className={styles.btnGroup}>
        <button className={styles.btnConfirm} onClick={handleDeleteUserAccount}>
          Confirm
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </dialog>
  );
};

export default Modal;

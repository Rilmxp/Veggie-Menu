import { useSelector, useDispatch } from "react-redux";
import styles from "./Account.module.scss";
import RecipesContainer from "../../components/RecipesContainer";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../context/features/userSlice";
import { auth } from "../../firebase";
import Modal from "../../components/Modal";
import { useState, useEffect } from "react";

const Account = () => {
  const { user, errorMessage } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");

  useEffect(() => {
    if (showErrorMsg) {
      setTimeout(() => setShowErrorMsg(""), 7000);
    }
  }, [showErrorMsg]);

  if (!user) return;

  function handleDeleteUserAccount(auth) {
    dispatch(deleteUserAccount(auth.currentUser))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((error) => {
        setIsOpen(false);
        setShowErrorMsg(error);
      });
  }

  return (
    <main>
      <article>
        <div className={styles.textTableMagins}>
          <h1>Welcome {user && user.username}.</h1>
          <p>
            This is your reserved area where you can manage your account and see
            all your favourites recipes.
          </p>
          <section>
            <h3>Account Information</h3>
            {showErrorMsg && (
              <p className={styles.deleteErrorMsg}>{errorMessage}</p>
            )}

            <table className={styles.tableStyles}>
              <tbody>
                <tr>
                  <th>Username</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Manage</th>
                  <td>
                    <button onClick={() => setIsOpen(true)}>
                      Delete Account
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <aside>
            <Modal
              isOpen={isOpen}
              handleDeleteUserAccount={() => handleDeleteUserAccount(auth)}
              close={() => setIsOpen(false)}
            />
          </aside>
        </div>

        <RecipesContainer />
      </article>
    </main>
  );
};

export default Account;

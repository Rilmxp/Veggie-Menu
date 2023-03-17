import { useSelector, useDispatch } from "react-redux";
import styles from "./Account.module.scss";
import RecipesContainer from "../../components/RecipesContainer";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../context/features/userSlice";
import { auth } from "../../firebase";

const Account = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return;
  }

  function handleDeleteUserAccount() {
    dispatch(deleteUserAccount(auth.currentUser))
      .unwrap()
      .then(() => navigate("/login"))
      .catch();
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
                    <button onClick={handleDeleteUserAccount}>
                      Delete Account
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <RecipesContainer />
      </article>
    </main>
  );
};

export default Account;

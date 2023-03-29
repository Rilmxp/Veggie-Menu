import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../../assets/images/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../../../context/features/userSlice";
import { auth } from "../../../database/firebaseAuthentication";

import styles from "./NavigationBar.module.scss";

const NavigationBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logOutUser(auth))
      .unwrap()
      .then(() => navigate("/login"))
      .catch();
  }

  return (
    <Navbar bg="light" className={styles.navBar}>
      <Container>
        <Link to="/" className={styles.link}>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-3"
            />
            Veggie Menu
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user ? (
              <>
                <Link to="/account">{user.username}</Link>
                <span> / </span>{" "}
                <button onClick={handleLogOut} className={styles.btn}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo.svg";
import styles from "./NavigationBar.module.scss";

const NavigationBar = () => {
  return (
    <Navbar bg="light">
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
            <a href="#login" className=" mt-2">
              Login
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

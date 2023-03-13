import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";
// import {image} from "../assets/images/default.jpg"

const PageNotFound = () => {
  return (
    <main className={styles.wrapper}>
      <header>
        <h1 className={styles.header}>Page not found</h1>
      </header>
      <Link to="/">
        <button type="button" className="btn btn-secondary">
          Back to Homepage
        </button>
      </Link>
    </main>
  );
};

export default PageNotFound;

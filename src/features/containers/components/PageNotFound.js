import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.header}>Page not found</h1>
      </header>
      <Link to="/" className={styles.backHomeBtn}>
        <button type="button">Back to Homepage</button>
      </Link>
    </div>
  );
};

export default PageNotFound;

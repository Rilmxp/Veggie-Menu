import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.header}>Page not found</h1>
      </header>
      <Link to="/">
        <button type="button" className="btn btn-secondary">
          Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;

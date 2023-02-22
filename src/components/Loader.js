import { FaCarrot } from "react-icons/fa";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <FaCarrot className={styles.carrotIcon} />
      <p>Loading recipes... </p>
    </div>
  );
};

export { Loader };

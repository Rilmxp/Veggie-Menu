import { FaGithub } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.background}>
      <FaGithub />
      <FaBriefcase />
    </footer>
  );
};

export default Footer;

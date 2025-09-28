import { FaGithub } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.layout}>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Rilmxp/Veggie-Menu"
        title="Github"
      >
        <FaGithub />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href=""
        title="Portfolio"
      >
        <FaBriefcase />
      </a>
    </footer>
  );
};

export default Footer;

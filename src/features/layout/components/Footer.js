// import { FaGithub } from "react-icons/fa";
// import { FaBriefcase } from "react-icons/fa";
import prontonicoLogo from "../../../assets/images/brand-sin-raya.svg";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.layout}>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://protonicouy.com/"
        title="Protonico official website"
      >
        <img
      className="d-block w-100"
      src={prontonicoLogo}
      alt="Protononico's logo"
        />
      </a>
    </footer>
  );
};

export default Footer;

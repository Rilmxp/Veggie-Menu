import styles from "./SectionHeading.module.scss";

const SectionHeading = ({ title }) => {
  return <h1 className={styles.heading}>{title}</h1>;
};

export default SectionHeading;

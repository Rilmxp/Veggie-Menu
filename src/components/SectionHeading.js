import styles from "./SectionHeading.module.scss";

const SectionHeading = ({ title }) => {
  return <h2 className={styles.heading}>{title}</h2>;
};

export default SectionHeading;

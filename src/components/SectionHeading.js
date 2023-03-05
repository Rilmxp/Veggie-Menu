import styles from "./SectionHeading.module.scss";

const SectionHeading = ({ title, addId }) => {
  return (
    <h1 className={styles.heading} id={addId && "search-recipe"}>
      {title}
    </h1>
  );
};

export default SectionHeading;

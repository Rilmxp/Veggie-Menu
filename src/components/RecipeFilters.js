import Form from "react-bootstrap/Form";
import SectionHeading from "./SectionHeading";
import styles from "./RecipeFilters.module.scss";

const RecipeFilters = () => {
  return (
    <Form className="form-layout">
      <SectionHeading title="Filter Results" />

      <Form.Group className="field-layout" controlId="maxCalories">
        <Form.Label>Max Calories per Serving</Form.Label>
        <Form.Control
          type="number"
          placeholder="Calories"
          min="100"
          max="1000"
          step="100"
        />
      </Form.Group>

      {/* <div className={`row ${styles.myCustomClassName}`}  */}
      <Form.Group
        className={`field-layout ${styles.checkBoxesAlignment}`}
        controlId="formBasicCheckbox"
      >
        <Form.Check inline type="checkbox" label="Gluten Free" />
        <Form.Check inline type="checkbox" label="Dairy Free" />
        <Form.Check inline type="checkbox" label="Vegan" />
        {/* <Form.Check inline type="checkbox" label="Dinner" /> */}
      </Form.Group>
    </Form>
  );
};

export default RecipeFilters;

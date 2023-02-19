import Form from "react-bootstrap/Form";
import styles from "./FormComponent.module.scss";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

function FormComponent() {
  return (
    <Form className={styles.formLayout}>
      <InputGroup className={styles.fieldLayout}>
        <InputGroup.Text id="recipe-search">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Recipe"
          aria-label="Recipe"
          aria-describedby="recipe-search"
          type="search"
        />
      </InputGroup>

      <SectionHeading title="Filter Results" />
      <Form.Group className={styles.fieldLayout} controlId="maxCalories">
        <Form.Label>Max Calories per Serving</Form.Label>
        <Form.Control
          type="number"
          placeholder="Calories"
          min="400"
          max="1000"
          step="200"
        />
      </Form.Group>

      <Form.Group className={styles.fieldLayout} controlId="formBasicCheckbox">
        <Form.Check inline type="checkbox" label="Breakfast" />
        <Form.Check inline type="checkbox" label="Lunch" />
        <Form.Check inline type="checkbox" label="Snack" />
        <Form.Check inline type="checkbox" label="Dinner" />
      </Form.Group>
    </Form>
  );
}

export default FormComponent;

/*

*/

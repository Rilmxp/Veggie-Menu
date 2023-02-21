import Form from "react-bootstrap/Form";
import SectionHeading from "./SectionHeading";

const RecipeFilters = () => {
  return (
    <Form className="form-layout">
      <SectionHeading title="Filter Results" />

      <Form.Group className="field-layout" controlId="maxCalories">
        <Form.Label>Max Calories per Serving</Form.Label>
        <Form.Control
          type="number"
          placeholder="Calories"
          min="400"
          max="1000"
          step="200"
        />
      </Form.Group>

      <Form.Group className="field-layout" controlId="formBasicCheckbox">
        <Form.Check inline type="checkbox" label="Breakfast" />
        <Form.Check inline type="checkbox" label="Lunch" />
        <Form.Check inline type="checkbox" label="Snack" />
        <Form.Check inline type="checkbox" label="Dinner" />
      </Form.Group>
    </Form>
  );
};

export default RecipeFilters;

import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterRecipes } from "../features/recipesSlice";
import SectionHeading from "./SectionHeading";
import styles from "./RecipeFilters.module.scss";

const RecipeFilters = () => {
  const [formData, setFormData] = useState({
    calories: "",
    glutenFree: false,
    dairyFree: false,
    vegan: false,
  });
  const [wasValidated, setWasValidated] = useState(false);
  const refCaloriesInput = useRef(null);
  const refFeedbackMsg = useRef(null);

  const dispatch = useDispatch();

  function handleChange(event) {
    const form = event.currentTarget;

    if (refCaloriesInput.current.validity.rangeOverflow) {
      refFeedbackMsg.current.innerHTML = "Maximum value 1000";
    } else if (refCaloriesInput.current.validity.rangeUnderflow) {
      refFeedbackMsg.current.innerHTML = "Minimum value 100";
    } else {
      refFeedbackMsg.current.innerHTML =
        "Please insert a number in steps of 100";
    }

    setFormData((prevState) => {
      let { name, type, value, checked } = event.target;

      // make calories filter show "" instead of 0
      if (value === "0") value = "";
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    form.checkValidity();

    setWasValidated(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    dispatch(filterRecipes(formData));
  }, [formData]);

  return (
    <Form
      validated={wasValidated}
      onSubmit={handleSubmit}
      className="form-layout"
      noValidate
    >
      <SectionHeading title="Filter Results" />

      <Form.Group className="field-layout" controlId="maxCalories">
        <Form.Label>Max Calories per Serving</Form.Label>
        <Form.Control
          type="number"
          placeholder="Calories"
          min="100"
          max="1000"
          step="100"
          name="calories"
          onChange={handleChange}
          value={formData.calories}
          ref={refCaloriesInput}
        />
        <Form.Control.Feedback
          type="invalid"
          ref={refFeedbackMsg}
        ></Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        className={`field-layout ${styles.checkBoxesAlignment}`}
        controlId="formBasicCheckbox"
      >
        <Form.Check
          inline
          type="checkbox"
          label="Gluten Free"
          name="glutenFree"
          checked={formData.glutenFree}
          onChange={handleChange}
        />
        <Form.Check
          inline
          type="checkbox"
          label="Dairy Free"
          name="dairyFree"
          checked={formData.dairyFree}
          onChange={handleChange}
        />
        <Form.Check
          inline
          type="checkbox"
          label="Vegan"
          name="vegan"
          checked={formData.vegan}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default RecipeFilters;

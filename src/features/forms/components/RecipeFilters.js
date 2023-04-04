import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterRecipes } from "../../../context/features/recipesSlice";
import { filterFavoriteRecipes } from "../../../context/features/userSlice";
import styles from "./RecipeFilters.module.scss";

const RecipeFilters = ({ accountPage }) => {
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

  // to be used to asign attributes to checkboxes through a loop: [0]=label, [1]=name
  const labelAndName = [
    ["Gluten Free", "glutenFree"],
    ["Dairy Free", "dairyFree"],
    ["Vegan", "vegan"],
  ];

  // gives feedback on input and updates state
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

  // filter either favorite recipes (if filters displayed on Account page) or all recipes (if on Home page);
  useEffect(() => {
    if (accountPage) {
      dispatch(filterFavoriteRecipes(formData));
    } else {
      dispatch(filterRecipes(formData));
    }
  }, [formData]);

  return (
    <Form
      validated={wasValidated}
      onSubmit={handleSubmit}
      className="form-layout"
      noValidate
    >
      <h2 className={styles.heading}>Filters</h2>

      <div className={styles.filtersLayout}>
        <Form.Group className="field-layout" controlId="maxCalories">
          <Form.Label className={styles.label}>
            Max Calories per Serving
          </Form.Label>
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

        {/* Check boxes created with a loop */}
        <Form.Group className={`field-layout ${styles.checkBoxesAlignment}`}>
          <p className={styles.labelCheck}>Special Diets</p>
          <div className={styles.checkboxLayout}>
            {labelAndName.map((item, index) => (
              <Form.Check
                key={index}
                inline
                type="checkbox"
                label={item[0]}
                name={item[1]}
                checked={formData[item[1]]}
                onChange={handleChange}
                id={item[1]}
              />
            ))}
          </div>
        </Form.Group>
      </div>
    </Form>
  );
};

export default RecipeFilters;

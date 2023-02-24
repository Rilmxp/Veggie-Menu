import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useDispatch } from "react-redux";
import { useState, useRef, findDOMNode } from "react";
import { fetchRecipes } from "../features/recipesSlice";
import isEmpty from "lodash/isEmpty";

function SearchForm() {
  const [formData, setFormData] = useState({
    searchForm: "",
  });
  const [validated, setValidated] = useState(false);
  const refSearchInput = useRef(null);
  const refInvalidFeedback = useRef(null);

  const dispatch = useDispatch();

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    console.log("form", form);

    if (isEmpty(refSearchInput.current.value)) {
      refSearchInput.current.setCustomValidity("Field cannot be empty");
      console.log("empty field");
      refInvalidFeedback.current.innerHTML =
        "Please insert a recipe or ingredient";
    } else {
      refSearchInput.current.setCustomValidity("");
      console.log("field ok");
    }

    console.log("checkvalidity()", form.checkValidity());

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // DO NOT CANCELL //
    // event.preventDefault();
    // dispatch(fetchRecipes(`complexSear?query=${formData.searchForm}`));
  }

  return (
    <>
      <SectionHeading title="Recipe Search" />
      <Form
        validated={validated}
        className="form-layout"
        onSubmit={handleSubmit}
        noValidate
      >
        <InputGroup className="field-layout" hasValidation>
          <InputGroup.Text id="recipe-search">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Recipe"
            aria-label="Recipe"
            aria-describedby="recipe-search"
            type="search"
            name="searchForm"
            value={formData.searchForm}
            onChange={handleChange}
            ref={refSearchInput}
          />
          <Form.Control.Feedback ref={refInvalidFeedback} type="invalid">
            Invalid feedback
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    </>
  );
}

export default SearchForm;

/*

*/

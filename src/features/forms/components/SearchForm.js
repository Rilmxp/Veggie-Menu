import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { fetchRecipes } from "../../../context/features/recipesSlice";
import isEmpty from "lodash/isEmpty";

function SearchForm() {
  const { loading } = useSelector((store) => store.recipes);
  const [formData, setFormData] = useState({
    searchForm: "",
  });
  const [wasValidated, setWasValidated] = useState(false);
  const refSearchInput = useRef(null);
  const dispatch = useDispatch();

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    // form validation
    if (isEmpty(refSearchInput.current.value)) {
      refSearchInput.current.setCustomValidity("Empty Field");
    } else {
      refSearchInput.current.setCustomValidity("");
    }

    if (form.checkValidity()) {
      dispatch(fetchRecipes(`complexSearch?query=${formData.searchForm}`));
      setFormData((prevState) => {
        return {
          ...prevState,
          searchForm: "",
        };
      });
    }
    // removes invalid feedback msg after a few seconds
    setTimeout(() => {
      setWasValidated(false);
    }, 3000);

    setWasValidated(true);
  }

  return (
    <section>
      <h1 id="search-recipe">Recipe Search</h1>
      <Form
        validated={wasValidated}
        className="form-layout"
        onSubmit={handleSubmit}
        noValidate
      >
        <InputGroup className="field-layout" hasValidation>
          <InputGroup.Text id="recipe-search">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Type an Ingredient"
            aria-label="Recipe"
            aria-describedby="recipe-search"
            type="search"
            name="searchForm"
            value={formData.searchForm}
            onChange={handleChange}
            ref={refSearchInput}
            disabled={loading ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            <p>Please insert a recipe or ingredient</p>
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    </section>
  );
}

export default SearchForm;

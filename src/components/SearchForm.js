import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { fetchRecipes } from "../features/recipesSlice";
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
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (isEmpty(refSearchInput.current.value)) {
      refSearchInput.current.setCustomValidity("Empty Field");
    } else {
      refSearchInput.current.setCustomValidity("");
    }

    if (form.checkValidity()) {
      dispatch(fetchRecipes(`complexSearch?query=${formData.searchForm}`));
      setFormData((prevState) => {
        return {
          searchForm: "",
        };
      });
    }
    setTimeout(() => {
      setWasValidated(false);
    }, 3000);

    setWasValidated(true);
  }

  return (
    <>
      <SectionHeading title="Recipe Search" />
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
            placeholder="Recipe"
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
            Please insert a recipe or ingredient
          </Form.Control.Feedback>
        </InputGroup>
      </Form>
    </>
  );
}

export default SearchForm;

/*

*/

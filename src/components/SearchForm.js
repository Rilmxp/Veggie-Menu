import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateValue } from "../features/searchFormSlice";
import baseAxiosConfig from "../helpers";
import { fetchRecipes } from "../features/recipesSlice";

function SearchForm() {
  // const { searchValue } = useSelector((store) => store.searchForm);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    searchForm: "",
  });

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        [event.target.name]: event.target.value,
      };
    });
  }

  // dispatch(fetchRecipes("ravioli"));

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData.searchForm);
    // dispatch(fetchRecipes(formData.value));
  }

  return (
    <>
      <SectionHeading title="Recipe Search" />
      <Form className="form-layout" onSubmit={handleSubmit}>
        <InputGroup className="field-layout">
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
          />
        </InputGroup>
      </Form>
    </>
  );
}

export default SearchForm;

/*

*/

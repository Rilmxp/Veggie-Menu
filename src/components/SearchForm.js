import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

function SearchForm() {
  return (
    <>
      <SectionHeading title="Recipe Search" />
      <Form className="form-layout">
        <InputGroup className="field-layout">
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
      </Form>
    </>
  );
}

export default SearchForm;

/*

*/

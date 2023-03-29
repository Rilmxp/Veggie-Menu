import SignUpFields from "./SignUpFields";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../../context/features/userSlice";
import { formatUsername } from "../../../helpers";

import styles from "./Forms.module.scss";

const SignUpForm = () => {
  const { loading, errorMessage } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false); // for form validation
  const [showErrorMsg, setShowErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormDataChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      // format username string (eg "rICHard LuCAS  " => "Richard Lucas")
      const formattedUsername = formatUsername(formData.username);
      const formattedFormData = { ...formData, username: formattedUsername };

      // register user
      dispatch(registerUser(formattedFormData))
        .unwrap()
        .then(() => navigate("/account"))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {loading && <p className={styles.loading}>Creating account...</p>}
      {showErrorMsg && <p className={styles.error}>{errorMessage}</p>}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.formLayout}
      >
        <SignUpFields
          formData={formData}
          handleFormDataChange={handleFormDataChange}
        />
        <Button className={styles.submitBtn} variant="primary" type="submit">
          Register
        </Button>
        <Link to={"/login"}>
          <p className={styles.paragraphLayout}>
            Already registered? Login here!
          </p>
        </Link>
      </Form>
    </div>
  );
};

export default SignUpForm;

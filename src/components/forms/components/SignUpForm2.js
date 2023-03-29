import SignUpFields from "./SignUpFields";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "../../../context/features/userSlice";

import styles from "./Forms.module.scss";

const SignUpForm2 = () => {
  const { loading, errorMessage } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showErrorMsg, setShowErrorMsg] = useState("");

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
      // format username string
      let formattedUsername = formData.username.toLowerCase().trim();
      let words = formattedUsername.split(" ");
      words.forEach((item, index) => {
        words[index] = item[0].toUpperCase() + item.substring(1);
      });

      formattedUsername = words.join(" ");

      const formattedFormData = { ...formData, username: formattedUsername };

      dispatch(registerUser(formattedFormData))
        .unwrap()
        .then((result) => navigate("/account"))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    }
    setValidated(true);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <h1>SignUp 2</h1>
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
      </Form>
      <Link to={"/login"}>
        <p className={styles.paragraphLayout}>
          Already registered? Login here!
        </p>
      </Link>
    </div>
  );
};

export default SignUpForm2;

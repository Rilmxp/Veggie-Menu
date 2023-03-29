import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import LoginFields from "./LoginFields";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../context/features/userSlice";
import styles from "./Forms.module.scss";

const LoginForm2 = () => {
  const { loading, errorMessage } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      dispatch(loginUser(formData))
        .unwrap()
        .then(() => navigate("/account"))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    }
    setValidated(true);
  };

  function handleFormDataChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      {loading && <p className={styles.loading}>Retrieving account...</p>}
      {showErrorMsg && <p className={styles.error}>{errorMessage}</p>}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.formLayout}
      >
        <LoginFields
          formData={formData}
          handleFormDataChange={handleFormDataChange}
        />
        <Button className={styles.submitBtn} variant="primary" type="submit">
          Log in
        </Button>
        <Link to={"/signup"}>
          <p className={styles.paragraphLayout}>
            Don't have an account yet? Register here!
          </p>
        </Link>
      </Form>
    </div>
  );
};
export default LoginForm2;

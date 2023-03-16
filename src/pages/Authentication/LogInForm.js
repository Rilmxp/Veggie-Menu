import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SectionHeading from "../../components/SectionHeading";
import styles from "./LoginSignUpForms.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../context/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loading, user, errorMessage } = useSelector((store) => store.user);
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
        .then((result) => navigate("/account"))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    }
    setValidated(true);
  };

  function handleChange(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <main>
      <SectionHeading title="Login Form" />
      {loading && <p className={styles.loading}>Retrieving account...</p>}
      {showErrorMsg && <p className={styles.error}>{errorMessage}</p>}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.formLayout}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            minLength="6"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Minimum length: 6 characters
          </Form.Control.Feedback>
        </Form.Group>
        <Button className={styles.submitBtn} variant="primary" type="submit">
          Log in
        </Button>
        <Link to={"/signup"}>
          <p className={styles.paragraphLayout}>
            Don't have an account yet? Register here!
          </p>
        </Link>
      </Form>
    </main>
  );
};

export default LoginForm;

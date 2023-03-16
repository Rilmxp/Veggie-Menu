import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SectionHeading from "../../components/SectionHeading";
import Loader from "../../components/Loader";
import styles from "./LoginSignUpForms.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../context/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { loading, user, errorMessage } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    username: "",
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

    // format username string
    let formattedUsername = formData.username.toLowerCase().trim();
    let words = formattedUsername.split(" ");
    words.forEach((item, index) => {
      words[index] = item[0].toUpperCase() + item.substring(1);
    });

    formattedUsername = words.join(" ");
    console.log("formattedUsername", formattedUsername);

    const formattedFormData = { ...formData, username: formattedUsername };

    console.log("formattedFormData", formattedFormData);

    if (form.checkValidity()) {
      dispatch(registerUser(formattedFormData))
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
      <SectionHeading title="SignUp Form" />
      {loading && <p className={styles.loading}>Creating account...</p>}
      {showErrorMsg && <p className={styles.error}>{errorMessage}</p>}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className={styles.formLayout}
      >
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name
          </Form.Control.Feedback>
        </Form.Group>

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
          Register
        </Button>
        <Link to={"/login"}>
          <p className={styles.paragraphLayout}>
            Already registered? Login here!
          </p>
        </Link>
      </Form>
    </main>
  );
};

export default SignUpForm;

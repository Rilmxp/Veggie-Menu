import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SectionHeading from "../../components/SectionHeading";
import styles from "./LogInSignUpForms.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../context/features/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { loading, user } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      dispatch(registerUser(formData))
        .unwrap()
        .then((result) => navigate("/account"))
        .catch((error) => console.log("error", error));

      // if user was successfully created
      // if (user) {
      //   navigate("/account");
      // } else {
      //   console.log("error occured");
      // }

      // setFormData((prevState) => {
      //   return {
      //     ...prevState,
      //     username: "",
      //     email: "",
      //     password: "",
      //   };
      // });
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

  // DO NOT REMOVE //
  // register and logIn user automatically
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   dispatch(registerUser(formData));
  // }

  return (
    <main>
      <SectionHeading title="SignUp Form" />
      <Form
        required
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
          <Form.Text className="text-muted">Minimun characters: 6</Form.Text>
          <Form.Control.Feedback type="invalid">
            Password must be of a minimum of 6 characters
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

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SectionHeading from "../../components/SectionHeading";
import styles from "./LogInSignUpForms.module.scss";

const SignUpForm = () => {
  return (
    <main>
      <SectionHeading title="SignUp Form" />
      <Form className={styles.formLayout}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">Minimun characters: 6</Form.Text>
        </Form.Group>
        <Button className={styles.submitBtn} variant="primary" type="submit">
          Register
        </Button>
        <p className={styles.paragraphLayout}>
          Already registered? Login here!
        </p>
      </Form>
    </main>
  );
};

export default SignUpForm;

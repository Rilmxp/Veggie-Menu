import Button from "react-bootstrap/Button";
import SectionHeading from "../../components/SectionHeading";
import Form from "react-bootstrap/Form";
import styles from "./LogInSignUpForms.module.scss";

const LogInForm = () => {
  return (
    <main>
      <SectionHeading title="Login Form" />
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
          Log in
        </Button>
        <p className={styles.paragraphLayout}>Don't have an account yet? Signup here!</p>
      </Form>
    </main>
  );
};

export default LogInForm;

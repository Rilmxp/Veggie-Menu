import { Form } from "react-bootstrap";

const LoginFields = ({ formData, handleFormDataChange }) => {
  return (
    <div>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
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
          onChange={handleFormDataChange}
          type="password"
          placeholder="Password"
        />
        <Form.Control.Feedback type="invalid">
          Minimum length: 6 characters
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default LoginFields;

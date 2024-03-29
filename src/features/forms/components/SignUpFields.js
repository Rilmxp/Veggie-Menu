import { Form } from "react-bootstrap";
import LoginFields from "./LoginFields";

const SignUpFields = ({ formData, handleFormDataChange }) => {
  // Note: the regex pattern on username form prevents user from sending an empty string to firebase and make sure the user will actually have a name

  return (
    <div>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          minLength="1"
          pattern="^[\w]+.*$"
          name="username"
          value={formData.username}
          onChange={handleFormDataChange}
          type="text"
          placeholder="Enter your name"
        />
        <Form.Control.Feedback type="invalid">
          Please enter your name
        </Form.Control.Feedback>
      </Form.Group>
      <LoginFields
        formData={formData}
        handleFormDataChange={handleFormDataChange}
      />
    </div>
  );
};

export default SignUpFields;

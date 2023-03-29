import { LoginForm } from "../../features/forms/index";

import { useEffect, useState } from "react";
import { screenResizeListener } from "../../helpers";

const Login = () => {
  const [initialHeight, setInitialHeight] = useState(window.innerHeight);
  const [initialWidth, setInitialWidth] = useState(window.innerWidth);

  useEffect(() => {
    screenResizeListener(initialHeight, initialWidth);
  }, [initialHeight, initialWidth]);
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Login;

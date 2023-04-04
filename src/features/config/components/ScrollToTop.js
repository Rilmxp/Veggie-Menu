import { useEffect } from "react";
import { useLocation } from "react-router";

// React router dom does not automatically scroll the route to the top of the page. This is what this function is for.

export default function ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return <>{props.children}</>;
}

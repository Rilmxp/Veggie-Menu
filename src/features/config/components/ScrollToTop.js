import { useEffect } from "react";
import { useLocation } from "react-router";

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

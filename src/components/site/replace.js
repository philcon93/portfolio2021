import { useEffect } from "react";
import PropTypes from "prop-types";

export default function Replace({ url }) {
  useEffect(() => {
    location.replace(url);
  }, []);

  return null;
}

Replace.propTypes = {
  url: PropTypes.string,
};

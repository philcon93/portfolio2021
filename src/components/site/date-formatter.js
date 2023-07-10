import { parseISO, format } from "date-fns";
import PropTypes from "prop-types";

export const DateFormatter = ({ dateString, dateFormat = "LLLL	d, yyyy" }) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, dateFormat)}</time>;
};

DateFormatter.propTypes = {
  dateString: PropTypes.string,
};

import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

export const DateFormatter = ({ dateString }) => {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
};

DateFormatter.propTypes = {
  dateString: PropTypes.string
};
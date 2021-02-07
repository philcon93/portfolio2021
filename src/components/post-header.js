import { DateFormatter, PostTitle } from '../components';
import PropTypes from 'prop-types';

export const PostHeader = ({ title, date }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

PostHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string
};
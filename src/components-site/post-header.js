import { DateFormatter, PostTitle } from '../components-site';
import PropTypes from 'prop-types';

export const PostHeader = ({ title, date, excerpt }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {
        excerpt && <p>{excerpt}</p>
      }
      <div className="max-w-2xl mx-auto mb-3 font-bold">
        <DateFormatter dateString={date} />
      </div>
    </>
  )
}

PostHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string
};
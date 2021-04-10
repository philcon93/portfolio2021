import { PostSubtitle, PostTitle } from './';
import PropTypes from 'prop-types';

export const PostHeader = ({ title, date, excerpt, tags }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <PostSubtitle date={date} tags={tags} excerpt={excerpt} />
    </>
  )
}

PostHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.array
};
import PropTypes from 'prop-types';

export const PostBody = ({ content }) => {
    return (
      <div className="max-w-2xl mx-auto">
        {content}
      </div>
    )
}

PostBody.propTypes = {
  content: PropTypes.node
};
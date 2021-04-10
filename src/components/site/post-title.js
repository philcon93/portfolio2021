import PropTypes from 'prop-types';

export const PostTitle = ({ children }) => {
    return (
      <h1 className="text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-6">
        {children}
      </h1>
    )
};

PostTitle.propTypes = {
  children: PropTypes.node
};

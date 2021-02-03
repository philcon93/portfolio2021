import PropTypes from 'prop-types';

export const PostTitle = ({ children }) => {
    return (
      <h1 className="text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
        {children}
      </h1>
    )
};

PostTitle.propTypes = {
  children: PropTypes.node
};
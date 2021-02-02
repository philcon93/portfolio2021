import PropTypes from 'prop-types';

export const Avatar = ({ name, picture }) => {
    return (
      <div className="flex items-center">
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
        <div className="text-xl font-bold">{name}</div>
      </div>
    )
};

Avatar.propTypes = {
  name: PropTypes.string,
  picture: PropTypes.string
};
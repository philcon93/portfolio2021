import PropTypes from 'prop-types';

export const Badge = ({ children }) => {
    return (
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 first:ml-1 last:mr-0 mr-1">
            {children}
        </span>
    )
};

Badge.propTypes = {
    children: PropTypes.node
};

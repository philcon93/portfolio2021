import PropTypes from 'prop-types';

export const MenuToggle = ({ toggle, className }) => {
  return (
    <div className={`p-4 md:hidden ${className}`}>
      <button type="button" onClick={toggle}>
        <span className="block w-8 bg-gray-600 rounded" style={{ height: '0.1875rem', marginBottom: '0.375rem' }} />
        <span className="block w-8 bg-gray-600 rounded" style={{ height: '0.1875rem', marginBottom: '0.375rem' }} />
        <span className="block w-6 bg-gray-600 rounded" style={{ height: '0.1875rem' }} />
      </button>
    </div>
  );
}

MenuToggle.propTypes = {
  toggle: PropTypes.func,
  className: PropTypes.string
};
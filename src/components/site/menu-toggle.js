import PropTypes from "prop-types";

export const MenuToggle = ({ toggleMenu, className }) => {
  return (
    <div className={`md:hidden ${className ? className : ""}`}>
      <button type="button" onClick={toggleMenu}>
        <span
          className="block w-8 bg-gray-600 rounded"
          style={{ height: "0.1875rem", marginBottom: "0.375rem" }}
        />
        <span
          className="block w-8 bg-gray-600 rounded"
          style={{ height: "0.1875rem", marginBottom: "0.375rem" }}
        />
        <span
          className="block w-6 bg-gray-600 rounded"
          style={{ height: "0.1875rem" }}
        />
      </button>
    </div>
  );
};

MenuToggle.propTypes = {
  toggleMenu: PropTypes.func,
  className: PropTypes.string,
};

import PropTypes from "prop-types";

export const PageWrapper = (props) => {
  const { size, children } = props;
  const width = size === "sm" ? "lg:max-w-2xl" : "";
  return (
    <div
      className={`p-4 md:p-8 ${width} lg:mx-auto text-gray-600 dark:text-gray-300`}
    >
      {children}
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
};

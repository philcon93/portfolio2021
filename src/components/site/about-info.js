import PropTypes from 'prop-types';

export const AboutInfo = ({ children, title, timeframe, subtitle }) => {
    return (
      <div className="py-5">
        <h3 className="text-2xl mb-3">{title}</h3>
        <div className="flex justify-between font-bold mb-2">
            <span>{subtitle}</span>
            <span>{timeframe}</span>
        </div>
        {children}
      </div>
    )
};

AboutInfo.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  timeframe: PropTypes.string,
  subtitle: PropTypes.string
};
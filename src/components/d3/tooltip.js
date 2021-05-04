import PropTypes from 'prop-types';

export const Tooltip = ({ show, topPos, leftPos, children }) => {
    return (
    show &&
        <div style={{
            backgroundColor: '#000',
            border: 'none',
            borderRadius: '5px',
            padding: '15px',
            minWidth: '200px',
            color: '#fff',
            position: 'absolute',
            top: topPos,
            left: leftPos
            }}>
            {children}
        </div>
    )
};

Tooltip.propTypes = {
    show: PropTypes.bool,
    topPos: PropTypes.number,
    leftPos: PropTypes.number,
    children: PropTypes.node
};

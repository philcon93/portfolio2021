import PropTypes from 'prop-types';

export const Intro = ({ title, subtitle}) => {
  return (
    <section className="flex flex-col md:justify-between mt-12 mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      {
        subtitle &&
          <h4 className="text-lg mt-5">
            {subtitle}
          </h4>
      }
    </section>
  )
};

Intro.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.node
};
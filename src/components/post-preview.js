import { DateFormatter } from './';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const PostPreview = ({
  title,
  date,
  excerpt,
  directory,
  slug,
}) => {
  return (
    <div className="pb-4">
      <h3 className="text-2xl mb-3 leading-snug">
        <Link as={`/${directory}/${slug}`} href={`/${directory}/[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      {
        excerpt &&
          <p className="leading-relaxed mb-3">{excerpt}</p>
      }
      <div className="font-bold mb-3">
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
};

PostPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  directory: PropTypes.string,
  slug: PropTypes.string
};
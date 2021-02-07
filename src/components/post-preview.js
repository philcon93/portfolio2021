import { DateFormatter } from './';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const PostPreview = ({
  title,
  date,
  excerpt,
  slug,
}) => {
  return (
    <div>
      <h3 className="text-2xl mb-3 leading-snug">
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="font-bold mb-2">
        <DateFormatter dateString={date} />
      </div>
      <p className="leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
};

PostPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  slug: PropTypes.string
};
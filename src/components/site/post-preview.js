import { PostSubtitle } from './';
import Link from 'next/link';
import PropTypes from 'prop-types';

export const PostPreview = ({
  title,
  date,
  excerpt,
  directory,
  slug,
  tags
}) => {
  return (
    <div className="pb-6">
      <h3 className="text-2xl mb-2 leading-snug">
        <Link as={`/${directory}/${slug}`} href={`/${directory}/[slug]`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <PostSubtitle date={date} tags={tags} excerpt={excerpt} />
    </div>
  )
};

PostPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  directory: PropTypes.string,
  slug: PropTypes.string,
  tags: PropTypes.array
};
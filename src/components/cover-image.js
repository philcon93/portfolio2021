import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

export const CoverImage = ({ title, src, slug, height, width }) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

CoverImage.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  slug: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};
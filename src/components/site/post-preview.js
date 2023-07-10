import { PostSubtitle } from "./";
import Link from "next/link";
import PropTypes from "prop-types";

export const PostPreview = (props) => {
  const { title, date, directory, slug, tags, external, url } = props;

  const href = url ? url : `/${directory}/${slug}`;
  const target = external ? "_blank" : "_self";

  return (
    <div className="pb-6 flex-[48%]">
      <h3 className="text-2xl mb-2 leading-snug">
        <Link className="hover:underline" href={href} target={target}>
          {title}
        </Link>
      </h3>
      <PostSubtitle date={date} dateFormat="yyyy" tags={tags} />
    </div>
  );
};

PostPreview.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  url: PropTypes.string,
  external: PropTypes.bool,
  directory: PropTypes.string,
  slug: PropTypes.string,
  tags: PropTypes.array,
};

import { PostPreview } from "./post-preview";
import PropTypes from "prop-types";

export const Posts = ({ directory, posts }) => {
  return (
    <section>
      <div className="flex flex-wrap gap-4 md:gap-y-12 mb-6">
        {posts.map((post) => (
          <PostPreview key={post.slug} directory={directory} {...post} />
        ))}
      </div>
    </section>
  );
};

Posts.propTypes = {
  directory: PropTypes.string,
  posts: PropTypes.array,
};

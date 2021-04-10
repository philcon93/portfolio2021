import { PostPreview } from './post-preview';
import PropTypes from 'prop-types';

export const Posts = ({ directory, posts }) => {
  return (
    <section>
      <div className="md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            directory={directory}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  )
};

Posts.propTypes = {
  directory: PropTypes.string,
  posts: PropTypes.array
};

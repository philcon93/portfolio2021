import { PostPreview } from './post-preview';
import PropTypes from 'prop-types';

export const Posts = ({ posts }) => {
  return (
    <section>
      <div className="md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
};

Posts.propTypes = {
  posts: PropTypes.array
};

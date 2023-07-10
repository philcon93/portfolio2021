import PropTypes from "prop-types";
import { Badge, DateFormatter } from "./";

export const PostSubtitle = (props) => {
  const { date, tags, excerpt, dateFormat } = props;
  return (
    <>
      <div className="mb-2 font-bold">
        <DateFormatter dateString={date} dateFormat={dateFormat} /> •
        <span>
          {tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </span>
      </div>
      {excerpt && <p>{excerpt}</p>}
    </>
  );
};

PostSubtitle.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.array,
};

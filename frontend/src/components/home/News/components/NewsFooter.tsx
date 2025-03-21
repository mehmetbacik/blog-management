import React from "react";

interface NewsFooterProps {
  author: string;
  date: string;
}

const NewsFooter: React.FC<NewsFooterProps> = ({ author, date }) => {
  return (
    <div className="news__footer">
      <span>{author}</span>
      <span>{date}</span>
    </div>
  );
};

export default NewsFooter;

import React from "react";
import { NewsItem as NewsItemType } from "@/types";

interface NewsItemProps {
  news: NewsItemType;
  isActive: boolean;
  onClick: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ news, isActive, onClick }) => {
  return (
    <div
      className={`news__smallNews ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <img
        src={news.image}
        alt={news.title}
        className="news__smallNews--image"
      />
      <div className="news__smallNewsContent">
        <h3 className="news__smallNewsContent--title">{news.title}</h3>
        <div className="news__smallNewsContent--footer">
          <span className="news__smallNewsContent--author">{news.author}</span>
          <span className="news__smallNewsContent--date">{news.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

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
      <img src={news.image} alt={news.title} className="news__smallImage" />
      <h3>{news.title}</h3>
    </div>
  );
};

export default NewsItem;

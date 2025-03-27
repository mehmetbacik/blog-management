import React from "react";
import { NewsItem as NewsItemType } from "@/types";
import { useCharacterLimit } from "@/hooks/useCharacterLimit";

const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

interface NewsItemProps {
  news: NewsItemType;
  isActive: boolean;
  onClick: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ news, isActive, onClick }) => {
  const charLimit = useCharacterLimit();

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
        <h3 className="news__smallNewsContent--title">{truncateText(news.title, charLimit.title)}</h3>
        <div className="news__smallNewsContent--footer">
          <span className="news__smallNewsContent--author">{news.author}</span>
          <span className="news__smallNewsContent--date">{news.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

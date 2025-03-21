import React from "react";
import { NewsItem } from "@/types";
import NewsItemComponent from "./NewsItem";

interface NewsListProps {
  newsData: NewsItem[];
  selectedNewsTitle: string;
  onSelectNews: (news: NewsItem) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  newsData,
  selectedNewsTitle,
  onSelectNews,
}) => {
  return (
    <div className="news__list">
      {newsData.map((news) => (
        <NewsItemComponent
          key={news.title}
          news={news}
          isActive={news.title === selectedNewsTitle}
          onClick={() => onSelectNews(news)}
        />
      ))}
    </div>
  );
};

export default NewsList;

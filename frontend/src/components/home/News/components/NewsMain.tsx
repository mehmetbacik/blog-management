import React from "react";
import { NewsItem as NewsItemType } from "@/types";

interface NewsMainProps {
  selectedNews: NewsItemType;
}

const NewsMain: React.FC<NewsMainProps> = ({ selectedNews }) => {
  return (
    <div className="news__main">
      <img
        src={selectedNews.image}
        alt={selectedNews.title}
        className="news__mainImage"
      />
      <div className="news__mainContent">
        <h2>{selectedNews.title}</h2>
        <p>{selectedNews.description}</p>
        <div className="news__footer">
          <span>{selectedNews.author}</span>
          <span>{selectedNews.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsMain;

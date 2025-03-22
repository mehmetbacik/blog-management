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
        <h2 className="news__mainContent--title">{selectedNews.title}</h2>
        <p className="news__mainContent--description">{selectedNews.description}</p>
        <div className="news__mainFooter">
          <span className="news__mainFooter--author">{selectedNews.author}</span>
          <span className="news__mainFooter--date">{selectedNews.date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsMain;

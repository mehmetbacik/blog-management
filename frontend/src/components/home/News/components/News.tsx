'use client';

import React, { useState } from "react";
import { NewsItem } from "@/types";
import { newsData } from "@/data/newsData";

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem>(newsData[0]);

  return (
    <div className="news__content">
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

      <div className="news__sidebar">
        <div className="news__list">
          {newsData.map((news, index) => (
            <div
              key={index}
              className={`news__smallNews ${
                news.title === selectedNews.title ? "active" : ""
              }`}
              onClick={() => setSelectedNews(news)}
            >
              <img
                src={news.image}
                alt={news.title}
                className="news__smallImage"
              />
              <h3>{news.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

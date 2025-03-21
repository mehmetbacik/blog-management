"use client";

import React, { useState } from "react";
import { NewsItem as NewsItemType } from "@/types";
import { newsData } from "@/data/newsData";
import NewsMain from "./NewsMain";
import NewsList from "./NewsList";

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItemType>(newsData[0]);

  return (
    <div className="news__content">
      <NewsMain selectedNews={selectedNews} />
      <div className="news__sidebar">
        <NewsList
          newsData={newsData}
          selectedNewsTitle={selectedNews.title}
          onSelectNews={setSelectedNews}
        />
      </div>
    </div>
  );
};

export default News;

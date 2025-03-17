import React from "react";
import { NewsItem } from '@/types';
import { newsData } from "@/data/newsData";

const News: React.FC<NewsItem> = ({
  image,
  title,
  description,
  author,
  date,
}) => {
  return (
    <div className="newsCard">
      <img className="newsImage" src={image} alt={title} />
      <div className="newsContent">
        <h2 className="newsTitle">{title}</h2>
        <p className="newsDescription">{description}</p>
        <div className="newsFooter">
          <span className="newsAuthor">{author}</span>
          <span className="newsDate">{date}</span>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  return (
    <div>
      {newsData.map((news, index) => (
        <News
          key={index}
          image={news.image}
          title={news.title}
          description={news.description}
          author={news.author}
          date={news.date}
        />
      ))}
    </div>
  );
};

export default NewsPage;

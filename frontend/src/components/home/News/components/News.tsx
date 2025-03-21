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
    <div className="newsCard__wrapper">
      <img className="newsCard__newsImage" src={image} alt={title} />
      <div className="newsCard__newsContent">
        <h2 className="newsCard__newsTitle">{title}</h2>
        <p className="newsCard__newsDescription">{description}</p>
        <div className="newsCard__newsFooter">
          <span className="newsCard__newsAuthor">{author}</span>
          <span className="newsCard__newsDate">{date}</span>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  return (
    <div className="newsCard__content">
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

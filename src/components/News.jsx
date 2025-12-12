import React, { useState, useEffect } from 'react'
import { Typography, Col, Row, Card } from 'antd'
import { useGetCryptosNewsQuery } from '../Services/newsApi';

const News = ({ simplified }) => {
  const { Title } = Typography;

  const count = simplified ? 10 : 50;
  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery(count);

  const [news, setNews] = useState([]);

  useEffect(() => {
  if (cryptoNews?.data) {
    const limitedNews = cryptoNews.data.slice(0, count);
    setNews(limitedNews);
  }
}, [cryptoNews, count]);


  if (isFetching) return 'Loading...';

  return (
    <div>
      <Row gutter={[24, 24]}>
        {news.map((cnews) => (
          <Col key={cnews.url} xs={24} sm={12} lg={8}>
            <Card hoverable className='news-card'>
              <a href={cnews.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={5}>
                    {cnews.title}
                  </Title>
                  <img 
                    src={cnews.thumbnail || "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"} 
                    alt={cnews.title}
                    className='news-image'
                  />
                </div>
                  <p style={{ fontSize: "12px" }}>
                    {cnews.description?.length > 100
                      ? `${cnews.description.substring(0, 100)}...`
                      : cnews.description}
                  </p>              
                  </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;

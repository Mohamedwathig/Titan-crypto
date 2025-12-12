// src/components/CryptoDetailes.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailesQuery, useGetCryptoHistoryQuery } from '../Services/cryptoApi';
import { Col, Row, Typography, Select, Spin } from 'antd';
import { 
  MoneyCollectOutlined, 
  DollarCircleOutlined, 
  FundOutlined, 
  ExclamationCircleOutlined, 
  StopOutlined, 
  TrophyOutlined, 
  CheckOutlined, 
  NumberOutlined, 
  ThunderboltOutlined 
} from '@ant-design/icons';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import LineChar from './LineChar';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetailes = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');

  const { data, isFetching } = useGetCryptoDetailesQuery(coinId);
  const { data: coinHistory, isFetching: isHistoryFetching } = useGetCryptoHistoryQuery({ 
    coinId, 
    timeperiod 
  });
  console.log(coinHistory);
  if (isFetching) return <Spin size="large" />;
  
  const cryptoDetails = data?.data?.coin;
  
  if (!cryptoDetails) return <div>Cryptocurrency not found</div>;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails.allTimeHigh?.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.supply?.total && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply?.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-datail-container'>
      <Col className='coin-header-container'>
        <Title level={2}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US Dollars. View value statistics, market cap and supply.
        </p>
      </Col>
      
      <Select
        defaultValue="7d"
        className='select-timeperiod'
        placeholder="Select Time Period"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date} value={date}>{date}</Option>
        ))}
      </Select>
      
      <LineChar 
        coinHistory={coinHistory} 
        currentPrice={millify(cryptoDetails?.price)} 
        coinName={cryptoDetails.name} 
        change={cryptoDetails.change}
      />
      
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-detailes-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>

          {stats.map(({icon, title, value}, index) => (
            <Col className='coin-stats' key={`stat-${index}`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        
        <Col className='other-statis-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-detailes-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>

          {genericStats.map(({icon, title, value}, index) => (
            <Col className='coin-stats' key={`generic-stat-${index}`}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description || '')}
        </Row>
        
        <Col className='coin-links'>
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>

          {cryptoDetails.links?.map((link, index) => (
            <Row className="coin-link" key={`link-${index}`}>              
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col> 
    </Col>
  );
};

export default CryptoDetailes;
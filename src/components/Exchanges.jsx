import React from 'react';
import { Typography, Collapse, Spin, Input, Skeleton } from 'antd';
import { useGetCryptosQuery, useGetCryptoDetailesQuery } from '../Services/cryptoApi';
import { useState, useEffect } from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

const { Title } = Typography;

// Define CoinDescription component INSIDE the same file
const CoinDescription = ({ coinId, coinName }) => {
  const { data: coinDetails, isFetching } = useGetCryptoDetailesQuery(coinId);
  
  if (isFetching) {
    return <Skeleton paragraph={{ rows: 3 }} active />;
  }
  
  const description = coinDetails?.data?.coin?.description || 
                     `No description available for ${coinName}.`;
  
  return (
    <div style={{ textAlign: 'justify', lineHeight: '1.6' }}>
      {HTMLReactParser(description)}
    </div>
  );
};

const Exchanges = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (cryptoList?.data?.coins) {
      if (searchTerm) {
        const filteredData = cryptoList.data.coins.filter((coin) => 
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCryptos(filteredData);
      } else {
        setCryptos(cryptoList.data.coins);
      }
    }
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Spin size="large" />;

  const items = cryptos.map((coin) => ({
    key: coin.uuid,
    label: (
      <div style={{ justifyContent: "space-evenly", display: "flex", gap: "20px", alignItems: "center" }}>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%" }}>{coin.name}</Title>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", textAlign: "center" }}>
          ${millify(coin.price)}
        </Title>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", textAlign: "center" }}>
          ${millify(coin.marketCap)}
        </Title>
        <Title style={{ 
          fontSize: "12px", 
          margin: 0, 
          width: "25%", 
          textAlign: "center",
          color: coin.change >= 0 ? 'green' : 'red'
        }}>
          {coin.change}%
        </Title>
      </div>
    ),
    children: (
      <div style={{ padding: '15px' }}>
        {/* Description section */}
        <div style={{ marginTop: '20px' }}>
          <Title level={5}>Description:</Title>
          <CoinDescription coinId={coin.uuid} coinName={coin.name} />
        </div>
      </div>
    ),
  }));

  return (
    <div>
      {!simplified && (
        <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}
      
      {/* Header */}
      <div style={{ 
        justifyContent: "space-evenly", 
        display: "flex", 
        gap: "20px",
        background: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
      }}>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", fontWeight: 'bold' }}>Cryptocurrency</Title>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", textAlign: "center", fontWeight: 'bold' }}>Price</Title>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", textAlign: "center", fontWeight: 'bold' }}>Market Cap</Title>
        <Title style={{ fontSize: "12px", margin: 0, width: "25%", textAlign: "center", fontWeight: 'bold' }}>24h Change</Title>
      </div>

      {/* Collapse component with crypto data */}
      {cryptos.length > 0 ? (
        <Collapse items={items} defaultActiveKey={[cryptos[0]?.uuid]} />
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No cryptocurrencies found</p>
        </div>
      )}
    </div>
  );
};

export default Exchanges;
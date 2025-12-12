// src/components/LineChar.jsx
import React from 'react';
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChar = ({ coinHistory, currentPrice, coinName, change }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Check if coinHistory exists and has data
   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
  const price = coinHistory.data.history[i].price;
  const timestamp = coinHistory.data.history[i].timestamp;

  if (price !== null) {
    coinPrice.push(Number(price));

    coinTimestamp.push(
      new Date(timestamp * 1000).toLocaleDateString()
    );
  }
}



  // Prepare chart data
   const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
  };
  
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price</Title>
        <Col className="price-container"> 
          <Title level={5} className="price-change">{change}%</Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      
      {coinHistory?.data?.history ? (
        <Line data={data} options={options} />
      ) : (
        <div>Loading chart data...</div>
      )}
    </>
  );
};

export default LineChar;
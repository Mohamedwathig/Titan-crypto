import './App.css';
import { Navbar, Exchanges, Homepage, News, Cryptocurrencies, CryptoDetailes } from './components/index';
import { Layout, Space, Typography } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>

      <div  className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetailes />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>

      <div className='footer'>
        <Typography.Title level={5} style={{color:"white",textAlign:'center'}}>
          Cryptoverse<br/>
          all rights reserved
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">exchanges</Link>
          <Link to="/News">News</Link>
        </Space>
      </div>
    </div>

    </div>
  );
}

export default App;

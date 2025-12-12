import React, { useState, useEffect } from 'react';
import { Menu, Typography, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import icon from '../images/cryptocurrency.png';

import {
  HomeOutlined,
  FundOutlined,
  DollarOutlined,
  BulbOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // On large screens, always show menu
    if (screenSize > 800) {
      setActiveMenu(true);
    } else {
      // On mobile, start with menu closed
      setActiveMenu(false);
    }
  }, [screenSize]);

  return (
    <div className={`nav-container ${activeMenu && screenSize <= 800 ? 'active-menu' : ''}`}>
      <div className="logo-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar style={{width:"33px",height:"100px",marginRight:"-15"}} src={icon} />
          <Typography.Title level={2} className="logo" >
            <Link style={{color:"white"}} to="/">TitanCrypto</Link>
          </Typography.Title>
        </div>
        
        {/* This button will only show on mobile screens (max-width: 800px) */}
        {screenSize <= 800 && (
          <Button 
            className="menu-control-container" 
            onClick={() => setActiveMenu(!activeMenu)}
            icon={activeMenu ? <CloseOutlined /> : <MenuOutlined />}
          />
        )}
      </div>

      {/* Show menu on large screens OR when activeMenu is true on mobile */}
      {(screenSize > 800 || activeMenu) && (
        <Menu style={{background:"black"}} theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="cryptos" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item key="exchanges" icon={<DollarOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>

          <Menu.Item key="news" icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
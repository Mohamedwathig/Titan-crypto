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
  const [screenSize, setScreenSize] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on the client side (important for SSR)
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width);
      setIsMobile(width <= 800);
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize > 800) {
      setActiveMenu(true);
    } else {
      setActiveMenu(false);
    }
  }, [screenSize]);

  const toggleMenu = () => {
    setActiveMenu(prev => !prev);
  };

  // Handle menu item click on mobile
  const handleMenuItemClick = () => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    }
  };

  return (
    <div className={`nav-container ${activeMenu && isMobile ? 'active-menu' : ''}`}>
      <div className="logo-container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '15px 20px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar 
            style={{
              width: "33px", 
              height: "33px", // Fixed the height issue
              marginRight: "-15px"
            }} 
            src={icon} 
          />
          <Typography.Title level={2} className="logo" style={{ margin: 0 }}>
            <Link 
              style={{
                color: "white",
                textDecoration: 'none',
                fontSize: isMobile ? '18px' : '24px'
              }} 
              to="/"
            >
              TitanCrypto
            </Link>
          </Typography.Title>
        </div>
        
        {/* Mobile menu button */}
        {isMobile && (
          <Button 
            type="text"
            className="menu-control-container" 
            onClick={toggleMenu}
            style={{
              fontSize: '24px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backgroundColor: 'transparent',
              border: 'none',
              padding: 0,
              minWidth: '40px'
            }}
          >
            {activeMenu ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        )}
      </div>

      {/* Menu */}
      {(!isMobile || activeMenu) && (
        <Menu 
          theme="dark"
          mode={isMobile ? "inline" : "horizontal"}
          style={{
            backgroundColor: "black",
            ...(isMobile && {
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              zIndex: 1000,
              width: '100%',
              borderTop: '1px solid #303030'
            })
          }}
          onClick={handleMenuItemClick}
        >
          <Menu.Item 
            key="home" 
            icon={<HomeOutlined />}
            style={isMobile ? { padding: '16px 24px' } : {}}
          >
            <Link to="/" onClick={handleMenuItemClick}>Home</Link>
          </Menu.Item>

          <Menu.Item 
            key="cryptos" 
            icon={<FundOutlined />}
            style={isMobile ? { padding: '16px 24px' } : {}}
          >
            <Link to="/cryptocurrencies" onClick={handleMenuItemClick}>Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item 
            key="exchanges" 
            icon={<DollarOutlined />}
            style={isMobile ? { padding: '16px 24px' } : {}}
          >
            <Link to="/exchanges" onClick={handleMenuItemClick}>Exchanges</Link>
          </Menu.Item>

          <Menu.Item 
            key="news" 
            icon={<BulbOutlined />}
            style={isMobile ? { padding: '16px 24px' } : {}}
          >
            <Link to="/news" onClick={handleMenuItemClick}>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
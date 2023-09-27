import { Menu } from 'antd'
import React from 'react'
import {Dropdown, Button, Space, Row, Col} from 'antd'
import { Link } from 'react-router-dom';
function DefaultLayout(props) {

  const user = JSON.parse(localStorage.getItem('user'))

  const items = [
    {
      key: '1',
      label: (
        <a href="/">
          Ana Sayfa
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="/iletisim">
          İletişim
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a href="/userbookings">
          Rezervasyonlar
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a href="/admin">
          Admin
        </a>
      ),
    },
    
    {
      key: '5',
      label: 'Çıkış',
      onClick: () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
      },
    }
    
    
  ];


  

  return (
    <div>
      <div className="header bs1">
         <Row gutter={16} justify='center'> 
          <Col lg={20} sm={24} xs={24}>
          <div className="d-flex justify-content-between">
          <h1><b><Link to="/"  style={{color:'orangered'}}>Emis Rent a Car</Link></b></h1>

          <Dropdown
        menu={{
          items,
        }}
        placement="bottom"
      >
        <Button>{user.username}</Button>
      </Dropdown>

        </div>
    
          </Col>
         </Row>
        
      </div>
      <div className="content">
        {props.children}

      </div>
    </div>
  )
}

export default DefaultLayout
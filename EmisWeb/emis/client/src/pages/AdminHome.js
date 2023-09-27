import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { deleteCar, gettAllCars } from '../redux/actions/carActions';
import { Row, Col, Checkbox, Select, Edit } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { Button, message, Popconfirm } from 'antd';

const { Option } = Select;

function AdminHome() {
    const { cars } = useSelector((state) => state.carsReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [totalCars, setTotalCars] = useState([]);
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(false); 

    useEffect(() => {
        dispatch(gettAllCars());
    }, []);

    useEffect(() => {
        setTotalCars(cars);
    }, [cars]);

    
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <div className='admin-home'>
        <DefaultLayout>
            <Row gutter={16} className='mt-3'>
                <Col lg={20} sm={24}>
                    <div className='text-right'>
                    <button className={`${darkMode ? 'btn11 dark-mode' : 'btn1'}`} style={{ marginRight: '20px' }}>
                            <a href="/addcar">Araç Ekle</a>
                        </button>
                    </div>
                </Col>
                <Col lg={4} sm={24}>
                    <div className='text-left'>
                        <Switch
                            checked={darkMode}
                            onChange={handleDarkModeToggle}
                        />
                        Dark Mode
                    </div>
                </Col>
            </Row>

            <Row justify='center' gutter={16}>
                {totalCars.map((car) => (
                    <Col lg={5} sm={24} xs={24} key={car._id}>
                        <div className={`car p-2 bs1 ${darkMode ? 'dark-mode' : ''}`}>
                            <img src={car.image} className='carimg' alt='Car' />
                            <div className='car-content d-flex align-items-center justify-content-between'>
                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p>Saatlik: {car.rentPerHour} TL</p>
                                </div>
                                <div className='mr-2'>
                                    <Link to={`/editcar/${car._id}`}>
                                        <EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} />
                                    </Link>

                                    <Popconfirm
                                        title="Aracı Kaldır"
                                        description="Aracı kaldırmak istediğinden emin misin?"
                                        onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    </div>);
}

export default AdminHome;
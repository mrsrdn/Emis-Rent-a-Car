import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { gettAllCars } from '../redux/actions/carActions';
import { Row, Col, Divider, Checkbox, Select } from 'antd';
import DatePicker from '../components/DatePicker';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

const { RangePicker } = DatePicker;
dayjs.extend(isBetween);
const { Option } = Select;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const [filterValue, setFilterValue] = useState(200);
  const [sortOrder, setSortOrder] = useState('Sıralama Yap');
  const [fuelType, setFuelType] = useState('Tümü');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gettAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  useEffect(() => {
    filterCars();
  }, [filterValue, fuelType]);

  useEffect(() => {
    sortCars();
  }, [sortOrder]);

 
  function setFilter(values) {
    var selectedFrom = dayjs(values[0]).format('MMM DD YYYY HH:mm');
    var selectedTo = dayjs(values[1]).format('MMM DD YYYY HH:mm');
    var temp = [];
    for (var car of cars) {
      if (car.bookedTimeSlots.length === 0) {   
        temp.push(car);
      } else {
        let carBooked = false;
        for (var booking of car.bookedTimeSlots) {
          if (
            !(
              dayjs(selectedFrom).isBetween(dayjs(booking.from), dayjs(booking.to)) ||
              dayjs(selectedTo).isBetween(dayjs(booking.from), dayjs(booking.to)) ||
              dayjs(booking.from).isBetween(dayjs(selectedFrom), dayjs(selectedTo)) ||
              dayjs(booking.to).isBetween(dayjs(selectedFrom), dayjs(selectedTo))
            )
          ) {
            carBooked = true;
          }
        }
        if (carBooked) {
          temp.push(car);
        }
      }
    }
    setTotalCars(temp);
  }

  function filterCars() {
    var temp = [];
    for (var car of cars) {
      if (filterValue >= car.rentPerHour && (fuelType === 'Tümü' || fuelType === car.fuelType)) {
        temp.push(car);
      }
    }
    setTotalCars(temp);
  }

 
  function sortCars() {
    const sortedCars = [...totalCars];
    sortedCars.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rentPerHour - b.rentPerHour;
      } else {
        return b.rentPerHour - a.rentPerHour;
      }
    });
    setTotalCars(sortedCars);
  }

  return (
    <DefaultLayout>
      <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker showTime={{ format: 'HH:mm'}} format='MMM DD YYYY HH:mm' onChange={setFilter} />
</Col>
</Row><Row className='mt-3' justify='center' style={{ position: 'absolute', top: '70px', right: '650px' }}>
    <Col lg={20} sm={24} className='d-flex justify-content-left'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>Yakıt Tipi:</span>
        <Select style={{ width: '150px' }} value={fuelType} onChange={(value) => setFuelType(value)}>
          <Option value='Tümü'>Tümü</Option>
          <Option value='Benzinli'>Benzinli</Option>
          <Option value='Dizel'>Dizel</Option>
        </Select>
      </div>
    </Col>
  </Row>

  <Row className='mt-3' justify='center' style={{ position: 'absolute', top: '70px', right: '300px' }}>
    <Col lg={20} sm={24} className='d-flex justify-content-left'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>Saatlik Kiralama Fiyatı:</span>
        <Slider
          style={{ width: '150px' }}
          min={0}
          max={200}
          value={filterValue}
          onChange={(value) => setFilterValue(value)}
        />
        <span style={{ marginLeft: '10px' }}>{filterValue} TL</span>
      </div>
    </Col>
  </Row>

  <Row className='mt-3' justify='end' style={{ position: 'absolute', top: '70px', right: '100px' }}>
    <Col lg={20} sm={24} className='d-flex justify-content-left'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}>Sıralama:</span>
        <Select style={{ width: '150px' }} value={sortOrder} onChange={(value) => setSortOrder(value)}>
          <Option value='asc'>Artan Fiyat</Option>
          <Option value='desc'>Azalan Fiyat</Option>
        </Select>
      </div>
    </Col>
  </Row>

  {loading && <Spinner />}

  <Row justify='center' gutter={16}>
    {totalCars.map((car) => { 
      return (
        <Col lg={5} sm={24} xs={24}>
          <div className='car p-2 bs1'>
            <img src={car.image} className='carimg' alt='Car' />
            <div className='car-content d-flex align-items-center justify-content-between'>
              <div className='text-left pl-2'>
                <p>{car.name}</p>
                <p>Saatlik: {car.rentPerHour} TL</p>
              </div>
              <div>                
                <Link to={`/booking/${car._id}`} className='btn1 mr-2'>
                  Kirala
                </Link>
              </div>
            </div>
          </div>
        </Col>
      );
    })}
  </Row>
</DefaultLayout>);
}

export default Home;

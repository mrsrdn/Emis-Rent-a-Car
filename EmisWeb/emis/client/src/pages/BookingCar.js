import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Checkbox, Modal, Input, Select } from 'antd';
import DatePicker from '../components/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { gettAllCars } from '../redux/actions/carActions';
import Spinner from '../components/Spinner';
import dayjs from 'dayjs';
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;


function BookingCar({ match }) {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState();
  const [guvenlikpaket, setSigorta] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [tcNo, setTcNo] = useState('');
  const [ehliyetNo, setEhliyetNo] = useState('');
  const [drivingLicense, setDrivingLicense] = useState(false);
  const [teslimAlma, setTeslimAlma] = useState("");
  const [teslimEtme, setTeslimEtme] = useState("");

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(gettAllCars());
    } else {
      setCar(cars.find(o => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (guvenlikpaket) {
      setTotalAmount(totalAmount + 10 * totalHours);
    }
  }, [guvenlikpaket, totalHours]);

  useEffect(() => {
    console.log('From date:', from);
    console.log('To date:', to);
    console.log('Total hours:', totalHours);
  }, [from, to, totalHours]);

  function selectTimeSlots(values) {
    let dateFrom = dayjs(values[0]).format('MMM DD YYYY HH:mm');
    setFrom(dateFrom);

    let dateTo = dayjs(values[1]).format('MMM DD YYYY HH:mm');
    setTo(dateTo);

    let hours = values[1].diff(values[0], 'hours');

    setTotalHours(hours);
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      guvenlikpaket: guvenlikpaket,
      bookedTimeSlots: {
        from,
        to
      },
      tcNo,
      ehliyetNo,
      adSoyad: name,
      ehliyet: drivingLicense,
      teslimAlma,
      teslimEtme
    };
    dispatch(bookCar(reqObj));
  }

  const canRent = name && tcNo && drivingLicense;

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className='carimg2 bs1' />
        </Col>
        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type='horizontal' dashed>Araç Bilgisi</Divider>
          <div style={{ textAlign: 'right' }}>
            <p>{car.name}</p>
            <p>Yıl: {car.trafikCikis}</p>
            <p>Araç Sınıfı: {car.aracSinif}</p>
            <p>Şanzıman Tipi: {car.sanziman}</p>
            <p>Saatlik: {car.rentPerHour} TL</p>
            <p>Yakıt Tipi: {car.fuelType}</p>
            <p>Maksimum Kişi: {car.capacity}</p>
            <p>Açıklama: {car.aciklama}</p>
          </div>
          <Divider type='horizontal' dashed>Zaman Dilimini Seçin</Divider>
          <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={selectTimeSlots} />
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', textAlign: 'left' }}>
            <Select
              style={{ width: '180px' }}
              placeholder="Teslim Alma Yeri"
              onChange={value => setTeslimAlma(value)}
            >
              <Option value="Istanbul Havalimanı">Istanbul Havalimanı</Option>
              <Option value="Istanbul Sabiha Gökçen Havalimanı">Istanbul Sabiha Gökçen Havalimanı</Option>
              <Option value="Trabzon Havalimanı">Trabzon Havalimanı</Option>
              <Option value="Bursa Yenişehir Havalimanı">Bursa Yenişehir Havalimanı</Option>

            </Select>
            <Select
              style={{ width: '180px' }}
              placeholder="Teslim Etme Yeri"
              onChange={value => setTeslimEtme(value)}
            >
              <Option value="Istanbul Havalimanı">Istanbul Havalimanı</Option>
              <Option value="Istanbul Sabiha Gökçen Havalimanı">Istanbul Sabiha Gökçen Havalimanı</Option>
              <Option value="Trabzon Havalimanı">Trabzon Havalimanı</Option>
              <Option value="Bursa Yenişehir Havalimanı">Bursa Yenişehir Havalimanı</Option>
            </Select>
          </div>

          <br />
          <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>Rezerve Araçları Gör</button>
          {from && to && (
            <div>
              <Divider type='horizontal' dashed>Kiralama Bilgileri</Divider>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Input
                  style={{ width: '250px' }}
                  placeholder="İsim Soyisim"
                  value={name}
                  onChange={e => {
                    const inputValue = e.target.value;
                    const textValue = inputValue.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\s]/g, ''); // Sadece harfleri ve boşluk karakterini tutar

                    setName(textValue);
                  }}
                  onKeyPress={e => {
                    if (e.key >= '0' && e.key <= '9') {
                      e.preventDefault(); // Sayı girişini engeller
                    }
                  }}
                />
                <span style={{ marginRight: '5px' }}></span>
                <Input style={{ width: '250px' }} placeholder="TC Kimlik No" value={tcNo} onChange={e => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/\D/g, '');

                  setTcNo(numericValue);
                }} maxLength={11} />
              </div>
              <div>
                <br />
                <Input style={{ width: '250px', position: 'relative', left: '-125px' }} placeholder="EhliyetNo" value={ehliyetNo} onChange={e => {
                  const inputValue = e.target.value;
                  const numericValue = inputValue.replace(/\D/g, '');

                  setEhliyetNo(numericValue);
                }} maxLength={5} />

              </div>

              <br />
              <Checkbox onChange={e => setDrivingLicense(e.target.checked)}>B sınıfı ehliyet</Checkbox>

              <br />
              <p>Toplam Saat: <b>{totalHours}</b></p>
              <p>Saatlik: <b>{car.rentPerHour}</b> TL</p>
              <Checkbox onChange={e => setSigorta(e.target.checked)}>Güvenlik Paketi</Checkbox>
              <h3>Tutar: {totalAmount}</h3>

              <StripeCheckout
                token={onToken}
                stripeKey='pk_test_51MvoFaDE8xE5W9Wp1s9fw5ECRWP0AGXvC1s5RsuPeLwYE2Dceex0R4F0cBdQluSjwM1mwFqgOEg1w3U4qKXKQIXx00JPf7gZG4'
                currency='TRY'
                amount={totalAmount * 100}
                shippingAddress
              >
                <button className='btn1' disabled={!canRent} style={{marginBottom:"20px"}} >Kirala</button>
              </StripeCheckout>
            </div>
          )}
        </Col> {car.name && (
          <Modal visible={showModal} closable={false} footer={false} title='RezerveAraçları Gör'>
            {cars.length && (
              <div className='p-2'>
                {car.bookedTimeSlots.map(slot => {
                  return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                })}
                <div className='text-right mt-5'>
                  <button className='btn1' onClick={() => { setShowModal(false) }}>Çıkış</button>

                </div>

              </div>
            )}
          </Modal>
        )}
      </Row>
    </DefaultLayout>)
}

export default BookingCar;
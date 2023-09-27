import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux/actions/bookingActions';
import { Col, Row } from 'antd';
import dayjs from 'dayjs';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';


function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem('user'));
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  function handleButtonClick() {
    setSuccessMessage(<b>Tel: 0511 111 11 11</b>);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);
  }

  function generatePDF() {
    const doc = new jsPDF();

    const fontName = "Arial";
    doc.setFont(fontName);


    bookings
      .filter((o) => o.user === user._id)
      .forEach((booking, index) => {
        const startY = 10 + index * 60;
        doc.text(`Fatura`, 100, startY + 1);
        doc.text(`Ad-Soyad: ${booking.adSoyad}`, 10, startY + 10);
        doc.text(`Tc: ${booking.tcNo}`, 10, startY + 20);
        doc.text(`Ehliyet No: ${booking.ehliyetNo}`, 10, startY + 30);
        doc.text(`Arac Ad: ${booking.car.name}`, 10, startY + 40);
        doc.text(`Baslangic: ${dayjs(booking.bookedTimeSlots.from).format('MMM DD YYYY HH:mm')}`, 10, startY + 50);
        doc.text(`Bitis: ${dayjs(booking.bookedTimeSlots.to).format('MMM DD YYYY HH:mm')}`, 10, startY + 60);
        doc.text(`Toplam Saat: ${booking.totalHours}`, 10, startY + 70);
        doc.text(`Saatlik: ${booking.car.rentPerHour} TL`, 10, startY + 80);
        doc.text(`Tutar: ${booking.totalAmount} TL`, 10, startY + 90);
        doc.text(`Sigorta: ${booking.guvenlikpaket ? 'Güvenlik paketi Yapildi' : 'Güvenlik paketi Yapilmadi'}`, 10, startY + 100);
        doc.text(`Teslim Alma: ${booking.teslimAlma}`, 10, startY + 110);
        doc.text(`Teslim Etme: ${booking.teslimEtme}`, 10, startY + 120);
        doc.text(`Rezervasyon Tarihi: ${dayjs(booking.createdAt).format('MMM DD YYYY')}`, 10, startY + 130);


        doc.text(`Emis Rent a Car`, 140, startY + 180)


        
        if (index !== bookings.length - 1) {
          doc.addPage();
        }
      });

    doc.save('bookings.pdf');
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">Rezervasyonlarım</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          <div className="text-right">
            <button onClick={handleButtonClick} className="btn1">
              Yardım
            </button>
            {successMessage && <p>{successMessage}</p>}

          </div>      {bookings
            .filter((o) => o.user === user._id)
            .map((booking) => (
              <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                  <p>
                    <b>{booking.car.name}</b>
                  </p>
                  <p>Ad-Soyad: <b>{booking.adSoyad}</b></p>
                  <p>Toplam Saat: <b>{booking.totalHours}</b></p>
                  <p>Saatlik: <b>{booking.car.rentPerHour}</b></p>
                  <p>Tutar: <b>{booking.totalAmount}</b></p>
                  <p>Güvenlik Paketi: <b>{booking.guvenlikpaket ? 'Güvenlik Paketi Yapıldı' : 'Güvenlik Paketi Yapılmadı'}</b></p>
                  <p>Teslim Alma: <b>{booking.teslimAlma}</b></p>
                  

                </Col>
                <Col lg={12} sm={24}>
                  <p>İşlem Id: <b>{booking.transactionId}</b></p>
                  <p>Tc: <b>{booking.tcNo}</b></p>
                  <p>Başlangıç: <b>{dayjs(booking.bookedTimeSlots.from).format('MMM DD YYYY HH:mm')}</b></p>
                  <p>Bitiş: <b>{dayjs(booking.bookedTimeSlots.to).format('MMM DD YYYY HH:mm')}</b></p>
                  <p>Rezervasyon Tarihi: <b>{dayjs(booking.createdAt).format('MMM DD YYYY')}</b></p>
                  <p>Ehliyet No: <b>{booking.ehliyetNo}</b></p>
                  <p>Teslim Etme: <b>{booking.teslimEtme}</b></p>

                </Col>
                <Col lg={6} sm={24} className="text-right">
                  <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className="p-2" />
                  <br />
                  <div style={{ display: 'flex', gap: '20px',marginLeft:'10px'}}>
                    
                    <button style={{ position: 'relative' ,width: '100px', height: '50px', fontSize: '12px',marginBottom:'10px',marginLeft:'65px' }} onClick={generatePDF} className="btn1">
                      Fatura İndir
                    </button>
                  </div>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </DefaultLayout>);
}

export default UserBookings;
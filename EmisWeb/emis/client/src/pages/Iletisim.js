import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';

function Iletisim() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const data = {
      name,
      surname,
      email,
      phone,
      message
    };


    const mailtoLink = `mailto:emreserdan061@gmail.com?subject=İletişim Formu&body=${encodeURIComponent(JSON.stringify(data))}`;
    window.location.href = mailtoLink;
  };

  return (
    <DefaultLayout>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', marginTop: '100px', maxWidth: '500px',marginLeft:'50px' }}>
        <h2>İletişim Bilgileri</h2>
        <p>Emis İletişim Merkezi</p>
        <p>444 4 444</p>
        <p style={{ display: 'flex' }}>
          Bizlere 444 4 444 no’lu Emis İletişim Merkezi hattımızdan 7 gün 24 saat ulaşabilirsiniz.
          İletişim Merkezimizden bizlere paylaşmak istediğiniz tüm talep, öneri, görüş ve sorularınızı iletebilirsiniz.
        </p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginLeft:'500px', marginTop: '-100px' }}>
  <form onSubmit={handleSubmit} style={{ width: '400px' }}>
    <label style={{ display: 'flex', alignItems: 'center' }}>
      Adı:
      <input className='btn5'  type="text" value={name} onChange={(e) => setName(e.target.value)} style={{width:'305px',marginLeft: '10px' }} />
    </label>
    <br />
    <label style={{ display: 'flex', alignItems: 'center' }}>
      Soyadı:
      <input  className='btn5' type="text" value={surname} onChange={(e) => setSurname(e.target.value)} style={{width:'280px', marginLeft: '10px' }} />
    </label>
    <br />
    <label style={{ display: 'flex', alignItems: 'center' }}>
      E-Posta:
      <input className='btn5' type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{width:'275px', marginLeft: '10px' }} />
    </label>
    <br />
    <label style={{ display: 'flex', alignItems: 'center' }}>
      Telefon Numarası:
      <input className='btn5' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ marginLeft: '10px' }} />
    </label>
    <br />
    <label style={{ display: 'flex', alignItems: 'center' }}>
      Mesaj:
      <textarea className='btn5' value={message} onChange={(e) => setMessage(e.target.value)} style={{width:'290px', marginLeft: '10px' }} />
    </label>
    <br />
    <button className='btn1' type="submit">Gönder</button>
  </form>
</div>
    </div>
    </DefaultLayout>
  );
}

export default Iletisim;
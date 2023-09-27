import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Form, Input, Row } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { addcar } from '../redux/actions/carActions'
import Spinner from '../components/Spinner'



function AddCar() {


    const dispatch=useDispatch()
    const {loading}=useSelector(state=>state.alertsReducer)

function onFinish(values){

    values.bookedTimeSlots=[]

    dispatch(addcar(values))
    console.log(values)

}



  return (
    <DefaultLayout>
        {loading  && (<Spinner/>)}
<Row justify='center mt-5'>
    <Col lg={12} sm={24} >
        <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Yeni Araç Ekle</h3>
            <Form.Item name='name' label='Araç adı' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='image' label='Görsel url' className='lb 10' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='rentPerHour' label='Saatlik Fiyat' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='capacity' label='Kapasite' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='fuelType' label='Yakıt Tipi' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='trafikCikis' label='Trafiğe Çıkış Tarihi' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='aracSinif' label='Araç Sınıfı' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='sanziman' label='Şanzıman' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='aciklama' label='Açıklama' rules={[{required:true}]}>
                <Input></Input>
            </Form.Item>
            <div className='text-right'>
            <button className='btn1'>Araç Ekle</button>
            </div>
            
            

        </Form>
        <br/>
        <br/>

    </Col>
</Row>

    </DefaultLayout>
  )
}
export default AddCar;
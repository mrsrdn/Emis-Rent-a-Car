import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addcar, editCar, gettAllCars } from '../redux/actions/carActions'
import Spinner from '../components/Spinner'




function EditCar({ match }) {

    const { cars } = useSelector(state => state.carsReducer)
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [car, setcar] = useState()
    const [totalcars, settotalcars] = useState([])

    useEffect(() => {

        if (cars.length === 0) {
            dispatch(gettAllCars());
        } else {
            settotalcars(cars)
            setcar(cars.find(o => o._id === match.params.carid));
        }


    }, [cars]);

    function onFinish(values) {

        values._id=car._id

        dispatch(editCar(values))
        console.log(values)

    }



    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} >
                    {totalcars.length > 0 && (<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Araç Düzenle</h3>
                        {car.name}

                        <Form.Item name='name' label='Araç adı' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='image' label='Görsel url' className='lb10' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Saatlik Fiyat' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='capacity' label='Kapasite' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='fuelType' label='Yakıt Tipi' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='trafikCikis' label='Trafiğe Çıkış Tarihi' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='aracSinif' label='Araç Sınıfı' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='sanziman' label='Şanzıman' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name='aciklama' label='Açıklama' rules={[{ required: true }]}>
                            <Input></Input>
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1'>Araç Düzenle</button>
                        </div>



                    </Form>)}
                    <br />
                    <br />

                </Col>
            </Row>

        </DefaultLayout>
    )
}
export default EditCar;
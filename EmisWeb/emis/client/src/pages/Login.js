import React from 'react'
import{Row,Col,Form,Input} from 'antd'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
// ..
AOS.init();

function Login() {
  const dispatch =useDispatch();
  const {loading} = useSelector(state=>state.alertsReducer)
  function onFinish(values){
    dispatch(userLogin(values))
    console.log(values)
      }
  return (
    <div className='login'>
        {loading && (<Spinner/>)}
        <Row gutter={16} className='d-flex align-items-center'>

          <Col lg={16} style={{position: 'relative'}}>
            <img 
           data-aos='slide-right'
           data-aos-duration='1500'
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBtZXJjZWRlc3xlbnwwfHwwfHw%3D&w=1000&q=80" />
            <h1 className='login-logo'>EMIS Rent a Car</h1>
          </Col>
          <Col lg={8} className='text-left p-5'>
            <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                  <h1>Giriş</h1>
                  <hr/>
                <Form.Item name='username' label='Kullanıcı Adı:' rules={[{required:true}]}>
                  <Input/>
                </Form.Item>
                <Form.Item name='password' label='Şifre:' rules={[{required:true}]}>
                  <Input.Password  className='login-form1'/>
                </Form.Item>

                  <button className='btn1 mt-2 mb-4'>Giriş</button>
                  <hr />
                  <Link to='/register'>Kayıt Ol</Link>
            </Form>
          </Col>

        </Row>
    </div>
  )
}

export default Login

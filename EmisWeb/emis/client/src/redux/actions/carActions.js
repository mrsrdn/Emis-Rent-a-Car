import { message } from 'antd';
import axios from 'axios';

export const gettAllCars = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await axios.get('/api/cars/getallcars')
        dispatch({ type: 'GET_ALL_CARS', payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }
}
export const addcar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/cars/addcar', reqObj)
        message.success("Yeni araç ekleme başarılı")
        setTimeout(() => {
            window.location.href = '/admin'

        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
export const editCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/cars/editcar', reqObj)
        message.success("Araç düzenleme başarılı")
        setTimeout(() => {
            window.location.href = '/admin'

        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
export const deleteCar = (reqObj) => async dispatch => {

    dispatch({ type: 'LOADING', payload: true })
    try {
        await axios.post('/api/cars/deletecar', reqObj)
        dispatch({ type: 'LOADING', payload: false })
        message.success("Araç kaldırma başarılı")
        setTimeout(() => {
            window.location.reload()

        }, 500);
        
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING', payload: false })
    }


}
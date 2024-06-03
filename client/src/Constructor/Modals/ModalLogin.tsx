import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import Input from '../UIkit/Inputs/Input.tsx'
import './Modals.css';

import { setModalAuthAction, setModalLoginAuthAction, setModalCodeAuthAction, setModalTokenAuthAction } from '../../redux/actions/constructorActions.js';


//Конфиг
import { backBaseURL5000 } from '../Config.js';

function ModalLogin() {

    const dispatch = useDispatch(); 
    const [phone, setPhone] = useState('')
    const [inputPhone, setInputPhone] = useState('+7(___)___-__-__')
    const [validatePhone, setValidatePhone] = useState(false)

    const handleLogin = async () => {

        if (inputPhone.replace(/[^+\d]/g, '').length === 12) {

            await axios.post(backBaseURL5000+'auth_api/auth/phone_login', { phone_number: inputPhone })
                .then(({ data }) => {
                    // console.log( data );
                    dispatch( setModalAuthAction( { modalLogin: false, modalCode : true, token : data.token, phoneLogin : inputPhone } ) );
                })
                .catch(async (error) => {

                    if (error.response.data.message === 'User does not exist') {
                        await axios.post(backBaseURL5000+'auth_api/auth/phone_signup', { full_name: '', password: '', phone_number: inputPhone })
                            .then(async ({ data }) => {
                                if (data) {
                                    // console.log( data );
                                    // dispatch(changeLogin(false));
                                    dispatch( setModalLoginAuthAction( false ) );
                                    await axios.post(backBaseURL5000+'auth_api/auth/phone_login', { phone_number: inputPhone })
                                        .then(({ data }) => {
                                            // console.log( data );
                                            dispatch( setModalAuthAction( { modalLogin: false, modalCode : true, token : data.token, phoneLogin : inputPhone } ) );
                                        })
                                }
                            })
                            .catch(error => {
                                console.log( error );
                                // dispatch(notificate({ title: 'Ошибка', isShown: true }));
                            } )
                    } else {
                        console.log('Ошибка');
                        // dispatch(notificate({ title: 'Ошибка', isShown: true }))
                    }
                })
        }
        else {
            setValidatePhone(true)
        }

    }

    const handleInputPhone = (value: string) => {
        setValidatePhone(false)
        let _value = value.replace(/[^+\d]/g, '')
        if (_value.length <= 2) {
            setInputPhone('+7(')
        }
        if (_value.length > 2 && _value.length < 6) {
            setInputPhone('+7(' + _value.slice(2, 7))
        }
        if (_value.length >= 6 && _value.length < 9) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8))
        }
        if (_value.length >= 9 && _value.length < 11) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10))
        }
        if (_value.length >= 11 && _value.length < 13) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10) + '-' + _value.slice(10, 12))
        }
        setPhone(_value)
    }


    return (
        <div className="modal_login modal__body">
            <h1 className="modal__title">Войти/зарегистрироваться</h1>
            <Input title="Телефон" isRequired={true} isLittle={false} value={inputPhone} onchange={handleInputPhone} onblur={() => { }} />
            {
                validatePhone ? <div className="modal__hint red-text modal__hint_non-valid">Поле обязательно</div> : <></>
            }
            <div className="button button_primary" onClick={handleLogin}>
                Получить код
            </div>


        </div >
    )
}

export default ModalLogin
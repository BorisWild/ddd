import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import Input from '../UIkit/Inputs/Input.tsx'
import './Modals.css';

import { setModalSave } from '../../redux/actions/constructorActions.js';

//Конфиг
import { baseURL } from '../Config.js';

function ModalSave() {

    const dispatch = useDispatch(); 

    const handleSave = () => {

        dispatch( setModalSave( false ) );

    }

    const handleClose = () => {

        dispatch( setModalSave( false ) );

    }

    const redirectToHome = () => {

        window.location.href = baseURL;

    }

    return (
        <div className="modal_name modal__body">
            <h1 className="modal__title">Выйти без сохранения?</h1>
            <div className="fs-14 ff-helvetica">Вы уверены, что хотите выйти из конструктора? Собранная конструкция не сохранится</div>
            <div className="d-flex">
                <div className="button button_primary mr-1 w-100 ff-helvetica" onClick={ () => handleSave() }>
                    СОХРАНИТЬ
                </div>
                <div className="button button_secondary ml-1 w-100 ff-helvetica" onClick={ () => redirectToHome() }>
                    ОТМЕНА
                </div>
            </div>
        </div>
    )
}

export default ModalSave
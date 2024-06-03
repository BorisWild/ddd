import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';

import { setModalSave, setNotificationsAction } from '../../redux/actions/constructorActions.js';

import './Notifications.css';

function Notifications() {

    const dispatch = useDispatch(); 

    const notificationsData = useSelector( state => state.constructorReducer.notifications );

    const NotificationsCloseBtn = () => {

        const onCloseBtn = () => {
            dispatch( setNotificationsAction( {
                ...notificationsData,
                show : false,
            } ));
        }

        return (

            <div className="NotificationsCloseBtn notifications_close_btn" onClick={ () => onCloseBtn() }>
                
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_5025_2429)">
                    <path d="M4.34375 4.34375L15.6575 15.6575" stroke="#ffffff" strokeWidth="2" strokeLinecap="square"/>
                    <path d="M4.34375 15.6562L15.6575 4.34254" stroke="#ffffff" strokeWidth="2" strokeLinecap="square"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_5025_2429">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

            </div>

        )

    }

    return (
        <div className={`Notifications notifications ${ notificationsData.show ? 'show' : '' } `} >

            {
                notificationsData.type !== 'LOADING' ? (
                    <NotificationsCloseBtn />
                ) : '' 
            }
           
            <div className="notifications_header d-flex">
                {
                    notificationsData.type === 'LOADING' ? (
                        <div className="spinner-border spinner-border-sm text-light mr-2"></div>
                    ) : '' 
                }
                <span>{ notificationsData.header }</span>               
            </div>
            
            <div className="notifications_des">{ notificationsData.description }</div>
        </div>
    )
}

export default Notifications
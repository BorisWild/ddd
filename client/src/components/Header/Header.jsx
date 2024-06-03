import React from 'react'
import './Header.css';

import logo_header from '../../images/logo-header.png';

//Redux
import { useDispatch, useSelector } from 'react-redux';

import { setModalSave } from '../../redux/actions/constructorActions.js';  


//Конфиг
import { baseURL } from '../../Constructor/Config.js';

function Header() {

  const dispatch = useDispatch(); 

  const lastDataStore = useSelector( state => state.constructorReducer.lastData );


  const backToHomeUrl = ( url ) => {

    //Проверяем, есть ли что-то в стеке истории
    if ( lastDataStore ){

      window.location.href = url;

    } else {

      dispatch( setModalSave( true ) );

    }

  }

  return (


    <div className="Header">
      <div className="header-container">
        <div className="header-logo" onClick={ () => backToHomeUrl( baseURL ) }>
          <div>
            <img src={logo_header} />
          </div>
        </div>
        <div className="drimo-btn drimo-btn-yellow drimo-btn-menu">
          
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3H18" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <path d="M2 17H18" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <path d="M2 10H18" stroke="black" strokeWidth="2" strokeLinecap="square"/>
          </svg>

        </div>
      </div>
    </div>

  );
}

export default Header;

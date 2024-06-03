import React from 'react'
import './App.css';
import './styles/bootstrap.css';
import './styles/bootstrap-add.css';

import { Constructor } from './Constructor';
import { Header } from './components/Header';

import { useSelector, useDispatch } from 'react-redux';

import { Route, Routes } from 'react-router-dom';

import ModalContainer from './Constructor/Modals/ModalContainer.tsx'
import ModalLogin from './Constructor/Modals/ModalLogin.tsx'
import ModalCode from './Constructor/Modals/ModalCode.tsx'
import ModalName from './Constructor/Modals/ModalName.tsx'
import ModalSave from './Constructor/Modals/ModalSave.tsx'
import Notifications from './Constructor/Notifications/Notifications.tsx'


import { getCookie } from './Constructor/helpers/cookies.js';

import { setModalLoginAuthAction } from './redux/actions/constructorActions.js';  

function App() {

  const dispatch = useDispatch(); 

  const modalLogin = useSelector( state => state.constructorReducer.modalLogin ); 
  const modalCode = useSelector( state => state.constructorReducer.modalCode ); 
  const modalName = useSelector( state => state.constructorReducer.modalName );
  const totalName = useSelector( state => state.constructorReducer.totalName );  
  const modalSave = useSelector( state => state.constructorReducer.modalSave ); 

  // React.useEffect( () => {

  //   if ( Number( getCookie('userId')) > 0 ){

  //   }else{

  //     dispatch( setModalLoginAuthAction( true ) );

  //   }

  // }, [] )

  return (
    <div className={ `App ${ modalLogin || modalCode || modalName || modalSave ? 'app-blocked' : '' }` }>

     <ModalContainer>
      { modalLogin ? <ModalLogin /> : '' }
      { modalCode ? <ModalCode /> : '' }
      { modalName ? <ModalName /> : '' }
      { modalSave ? <ModalSave /> : '' }
     </ModalContainer>

     <Notifications />

      <Header />

      <Routes>

        <Route path="/constructor" element={<Constructor />} exact />
        
      </Routes>
      
    </div>
  );
}

export default App;
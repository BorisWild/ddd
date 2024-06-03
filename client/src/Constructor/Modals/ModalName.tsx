import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux';
import Input from '../UIkit/Inputs/Input.tsx'
import './Modals.css';

import { setModalName, setTotalName, setSaveNameModeAction, setNotificationsAction } from '../../redux/actions/constructorActions.js';


function ModalName( props ) {
 
    // const { saveConstructorDataAction, orderConstructorDataAction } = props;

    const notifications = useSelector( state => state.constructorReducer.notifications );
    const dispatch = useDispatch(); 
    const totalName = useSelector( state => state.constructorReducer.totalName); 
    const saveNameMode = useSelector( state => state.constructorReducer.saveNameMode); 
    const [phone, setPhone] = useState('')
    const [validateName, setValidateName] = useState(true)

    const [ nameState, setNameState ] =  useState( totalName );

    const handleInputName = ( value ) => {

        setNameState( value );

        if ( value.length > 50 ){

            setValidateName( false ); 

        }else{
            setValidateName( true ); 
        }

    }

    const handleName = () => {

        if ( validateName ){

            if ( saveNameMode === 1 ){
                console.log('save mode');
                // saveConstructorDataAction();
                dispatch( setSaveNameModeAction(3) );
            } else if ( saveNameMode === 2 ){
                // orderConstructorDataAction();
                console.log('order mode');
                dispatch( setSaveNameModeAction(4) );
            } else {

                dispatch( setNotificationsAction( {
                    header : 'Успешно',
                    description : 'Название конструкции сохранилось.',
                    type : 'SUCCES',
                    show : true,
                } ));

                setTimeout( () => {

                    dispatch( setNotificationsAction( {
                        ...notifications,
                        show : false,
                    } ));

                }, 3000 );

            }
            
            dispatch( setTotalName( nameState ) );
            dispatch( setModalName( false ) );

        }

    }

    const handleClose = () => {

        dispatch( setModalName( false ) );

    }

    return (
        <div className="modal_name modal__body">
            <h1 className="modal__title">название конструкции</h1>
            <Input title="Мое название" isRequired={true} isLittle={false} value={ nameState } onchange={ handleInputName } onblur={() => { }} />
            {
                !validateName ? <div className="modal__hint red-text modal__hint_non-valid">Слишком длинное название</div> : <></>
            }
            <div className="d-flex">
                <div className="button button_primary mr-1 w-100 ff-helvetica" onClick={ () => handleName() }>
                    СОХРАНИТЬ
                </div>
                <div className="button button_secondary ml-1 w-100 ff-helvetica" onClick={ () => handleClose() }>
                    ОТМЕНА
                </div>
            </div>
        </div>
    )
}

export default ModalName
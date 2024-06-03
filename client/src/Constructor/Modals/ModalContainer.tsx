import React from 'react'
import { CloseIcon } from '../../UIkit/Icons.tsx'
import { useDispatch, useSelector } from 'react-redux';

function ModalContainer(props: any) {

    const dispatch = useDispatch(); 

    const modalLogin = useSelector( state => state.constructorReducer.modalLogin ); 
    const modalCode = useSelector( state => state.constructorReducer.modalCode ); 
    const modalName = useSelector( state => state.constructorReducer.modalName );
    const modalSave = useSelector( state => state.constructorReducer.modalSave ); 

    return (
        <div className="modal " className={ `modal ${ modalLogin || modalCode || modalName || modalSave ? 'modal_active' : '' }` }>
            <div className="modal__container" >
                <svg className='modal__close' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="white" />
                    <path d="M4 4L19.9997 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square" />
                    <path d="M20 4L4.0003 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square" />
                </svg>
                {props.children}
            </div>
        </div>
    )
}

export default ModalContainer
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
// import { modalSlice } from '../../store/reducers/client/ModalSlice'
// import { notificationsSlice } from '../../store/reducers/NotificationsSlice'
import Input from '../UIkit/Inputs/Input.tsx'
import { setModalAuthAction, setModalLoginAuthAction, setModalCodeAuthAction, setModalTokenAuthAction, setSaveAndOrderAction } from '../../redux/actions/constructorActions.js';

//Конфиг
import { backBaseURL5000 } from '../Config.js';

function ModalCode() {

  const dispatch = useDispatch()

  const phoneLogin = useSelector( state => state.constructorReducer.phoneLogin ); 
  const loginToken = useSelector( state => state.constructorReducer.token );
  const saveAndOrderAction = useSelector( state => state.constructorReducer.saveAndOrderAction );

  const [timer, setTimer] = useState(180)
  
  // const { changeCode, changeToken } = modalSlice.actions
  const [code, setCode] = useState<string>('')
  const [validateCode, setValidateCode] = useState(false)
  // const { notificate } = notificationsSlice.actions

  useEffect(() => { 
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    }

  }, [timer])

  const getMinutes = () => {
    return '0' + Math.floor(timer / 60)
  }

  const getSeconds = () => {
    if (String(timer % 60).length == 1) {
      return '0' + timer % 60
    } else return timer % 60
  }

  const handleLogin = async () => {
    if (code.length === 4) {
      await axios.post(backBaseURL5000+'auth_api/auth/verify_phone', { secret: code, token: loginToken })
        .then(({ data }) => {
          document.cookie = `apiToken=${data.access_token}; path=/; max-age=2592000;`
          document.cookie = `refreshToken=${data.refresh_token}; path=/; max-age=2592000;`
          document.cookie = `userId=${data.id}; path=/; max-age=2592000;`
          dispatch(setModalCodeAuthAction(false))
          dispatch(setSaveAndOrderAction( {
            ...saveAndOrderAction,
            status : true,
          } ));
          // dispatch(notificate({ title: 'Успешно', isShown: true }))
        })
        .catch(e => {
          setValidateCode(true)
          // dispatch(notificate({ title: 'Ошибка', isShown: true }))
        })

    } else {
      setValidateCode(true)
    }

  }

  const handleResendCode = async () => {
    setTimer(180)
    await axios.post(backBaseURL5000+'auth_api/auth/phone_login', { phone_number: phoneLogin })
      .then(({ data }) => {
        console.log( data );
        dispatch( setModalTokenAuthAction( data.token ) );
        // dispatch(changeToken(data.token))
      })
      .catch(e => {

        console.log( 'Ошибка' );
        // dispatch(notificate({ title: 'Ошибка', isShown: true }))

      })
  }

  const handleCodeInput = (value: string) => {
    setCode(value)
  }

  useEffect(() => {

  }, [phoneLogin])

  return (
    <div className="modal_code modal__body">
      <h1 className="modal__title">Войти/зарегистрироваться</h1>
      <Input length={4} title="Код из СМС" isRequired={true} isLittle={false} onblur={() => { }} onchange={handleCodeInput} value={code} />
      {validateCode && <div className="modal__hint modal__hint_non-valid red-text">Неверный код</div>}
      <div className="modal__hints-container">
        <div className="modal__hint">Код отправлен на номер {phoneLogin}</div>

        {
          timer > 0 ? <div className="modal__hint">Получить новый код можно через {getMinutes()}:{getSeconds()}</div> : <div className="modal__hint red-text modal__hint_code" onClick={handleResendCode}>ПОЛУЧИТЬ КОД ПОВТОРНО</div>
        }
      </div>
      <div className="button button_primary" onClick={handleLogin}>
        Войти
      </div>

    </div >
  )
}

export default ModalCode
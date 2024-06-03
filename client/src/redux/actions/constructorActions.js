const CHANGE_CURRENT_SELECTION = 'CHANGE_CURRENT_SELECTION';
const CHANGE_CURRENT_CEIL = 'CHANGE_CURRENT_CEIL';
const CHANGE_NOTIFICATION_HELP_TEXT = 'CHANGE_NOTIFICATION_HELP_TEXT';
const CHANGE_CURRENT_ELEMENT = 'CHANGE_CURRENT_ELEMENT';
const CHANGE_MODE_EDITOR = 'CHANGE_CURRENT_ELEMENT';
const CHANGE_MODAL_AUTH = 'CHANGE_MODAL_AUTH';

const CHANGE_MODAL_LOGIN_AUTH = 'CHANGE_MODAL_LOGIN_AUTH';
const CHANGE_MODAL_TOKEN_AUTH = 'CHANGE_MODAL_TOKEN_AUTH';
const CHANGE_MODAL_CODE_AUTH = 'CHANGE_MODAL_CODE_AUTH';
const CHANGE_MODAL_PHONE_AUTH = 'CHANGE_MODAL_PHONE_AUTH';

const CHANGE_USER_ID = 'CHANGE_USER_ID';

const CHANGE_MODAL_NAME = 'CHANGE_MODAL_NAME';
const CHANGE_TOTAL_NAME = 'CHANGE_TOTAL_NAME';
const CHANGE_MODAL_SAVE = 'CHANGE_MODAL_SAVE';

const CHANGE_LAST_DATA = 'CHANGE_LAST_DATA';

const CHANGE_SAVE_AND_ORDER_ACTION = 'CHANGE_SAVE_AND_ORDER_ACTION';

const CHANGE_SAVE_NAME_MODE = 'CHANGE_SAVE_NAME_MODE';

const CHANGE_NOTIFICATIONS = 'CHANGE_NOTIFICATIONS';

export const setNotificationHelp = ( type ) => {

  var newNext = '';

  if ( type === 'PUT' ){
    newNext = 'Выберите куда добавить элемент';
  }else if ( type === 'CHOICE' ){
    newNext = 'Выберите элемент, который хотите добавить';
  }else if ( type === 'HIDE' ){
    newNext =  '';
  }else{
    newNext =  'Выберите элемент, чтобы начать работу с ним';
  }

  return { type : CHANGE_NOTIFICATION_HELP_TEXT, payload: newNext }

}

export const setCurrentSelectionAction = ( index, state ) => {

  if ( index === state ) index = -1;

  return { type : CHANGE_CURRENT_SELECTION, payload: index }

}

export const setCurrentCeilAction = ( index, state ) => {

  if ( index === state ) index = -1;

  return { type : CHANGE_CURRENT_CEIL, payload: index }

}

export const setCurrentElementAction = ( elem ) => {

  return { type : CHANGE_CURRENT_ELEMENT, payload: elem }

}

export const setModeEditorAction = ( mode ) => {

  return { type : CHANGE_MODE_EDITOR, payload: mode }

}

export const setModalPhoneLoginAuthAction = ( phoneLogin ) => {

  return { type : CHANGE_MODAL_PHONE_AUTH, phoneLogin: phoneLogin }

}

export const setModalTokenAuthAction = ( token ) => {

  return { type : CHANGE_MODAL_TOKEN_AUTH, token: token }

}

export const setModalCodeAuthAction = ( modalCode ) => {

  return { type : CHANGE_MODAL_CODE_AUTH, modalCode: modalCode }

}

export const setModalLoginAuthAction = ( modalLogin ) => {

  return { type : CHANGE_MODAL_LOGIN_AUTH, modalLogin: modalLogin }

}

export const setModalAuthAction = ( { modalLogin, modalCode, token, phoneLogin }  ) => {

  return { type : CHANGE_MODAL_AUTH, modalLogin: modalLogin, modalCode : modalCode, token : token, phoneLogin : phoneLogin }

}

export const setModalName = ( modalName ) => {

  return { type : CHANGE_MODAL_NAME, payload: modalName }

}

export const setTotalName  = ( totalName ) => {

  return { type : CHANGE_TOTAL_NAME, payload: totalName }

}

export const setModalSave  = ( modalSave ) => {

  return { type : CHANGE_MODAL_SAVE, payload: modalSave }

}

export const setSaveAndOrderAction  = ( action ) => {

  return { type : CHANGE_SAVE_AND_ORDER_ACTION, payload: action }

}

export const setLastDataAction  = ( action ) => {

  return { type : CHANGE_LAST_DATA, payload: action }

}

export const setSaveNameModeAction  = ( action ) => {

  return { type : CHANGE_SAVE_NAME_MODE, payload: action }

}

export const setNotificationsAction  = ( action ) => {

  return { type : CHANGE_NOTIFICATIONS, payload: action }

}

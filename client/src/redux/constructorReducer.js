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

const defaultState = {
  currentSelection: -1,
  currentCeil: -1,
  currentDrimoAction : 'SELECT',
  notificationHelpText : 'Выберите элемент чтобы начать работу с ним',
  currentElement : [],
  modeEditor : false, 
  modalCode : false,
  modalLogin : false,
  phoneLogin : '',
  modalName : false,
  modalSave : false,
  totalName : 'Моя конструкция',
  token : null,
  userID : 0,
  saveAndOrderAction : {
    status : false,
    type : 0, // 0 - ничего, 1 - для сохранения, 2 - для заказа.
  }, 
  lastData: true,
  saveNameMode : 0, //0 - просто сохранение имени, 1 - для сохранения, 2 - для заказа. 3 - запуск сохранения, 4 - запуск заказа
  notifications : {
    header : '',
    description : '',
    type : '',
    show : false,
  }
}

export const constructorReducer = (state = defaultState, action) => {
  switch (action.type) {

    case CHANGE_CURRENT_SELECTION:
      return { ...state, currentSelection: action.payload }

    case CHANGE_CURRENT_CEIL:
      return { ...state, currentCeil: action.payload }

    case CHANGE_NOTIFICATION_HELP_TEXT:
      return { ...state, notificationHelpText: action.payload }

    case CHANGE_CURRENT_ELEMENT:
      return { ...state, currentElement: action.payload }

    case CHANGE_MODE_EDITOR:
      return { ...state, modeEditor: action.payload }

    case CHANGE_MODAL_LOGIN_AUTH:
      return { ...state, modalLogin: action.modalLogin }

    case CHANGE_MODAL_TOKEN_AUTH:
      return { ...state, token : action.token }

    case CHANGE_MODAL_CODE_AUTH:
      return { ...state, modalCode : action.modalCode }

    case CHANGE_MODAL_PHONE_AUTH:
      return { ...state, phoneLogin : action.phoneLogin }

    case CHANGE_MODAL_AUTH:
      return { ...state, modalLogin: action.modalLogin, modalCode : action.modalCode, token : action.token, phoneLogin : action.phoneLogin}

    case CHANGE_USER_ID:
      return { ...state, userID: action.payload }

    case CHANGE_MODAL_NAME:
      return { ...state, modalName: action.payload }

    case CHANGE_TOTAL_NAME:
      return { ...state, totalName: action.payload }

    case CHANGE_MODAL_SAVE:
      return { ...state, modalSave: action.payload }

    case CHANGE_SAVE_AND_ORDER_ACTION:
      return { ...state, saveAndOrderAction: action.payload }

    case CHANGE_LAST_DATA:
      return { ...state, lastData: action.payload }

    case CHANGE_SAVE_NAME_MODE:
      return { ...state, saveNameMode: action.payload }

    case CHANGE_NOTIFICATIONS:
      return { ...state, notifications: action.payload }

    default:
      return state

  }
}
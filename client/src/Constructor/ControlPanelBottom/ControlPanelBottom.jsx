import React from 'react'
import './ControlPanelBottom.css';

import { useDispatch, useSelector, connect } from 'react-redux';

//Конфиг
import { SIZE_STANDART, baseURL } from '../Config.js';

import NotificationHelp from './Common/NotificationHelp.jsx';

import DivisionBtn from './Common/DivisionBtn.jsx';

import { setCurrentSelectionAction, setCurrentCeilAction, setNotificationHelp, setCurrentElementAction, setModeEditorAction, setModalSave, setSaveNameModeAction } from '../../redux/actions/constructorActions.js';  

import { listCeils } from './listCeils.js';

import preview_model_1 from './images/1.png';

import preview_model_frame_1 from './images/frame/1.png';
import preview_model_frame_2 from './images/frame/2.png';
import preview_model_frame_3 from './images/frame/3.png';
import preview_model_frame_4 from './images/frame/4.png';
import preview_model_frame_5 from './images/frame/5.png';
import preview_model_frame_6 from './images/frame/6.png';
import preview_model_frame_7 from './images/frame/7.png';

import preview_model_frame_8 from './images/frame/8.png';
import preview_model_frame_9 from './images/frame/9.png';
import preview_model_frame_10 from './images/frame/10.png';
import preview_model_frame_11 from './images/frame/11.png';
import preview_model_frame_12 from './images/frame/12.png';
import preview_model_frame_13 from './images/frame/13.png';

import texture_preview_1 from './images/textures/1.png';
import texture_preview_2 from './images/textures/2.png';

function ControlPanelBottom( props ) {

  const { 
    state, 
    dispatchSetCurrentSelectionAction, 
    dispatchSetCurrentCeilAction,
    dispatchSetNotificationHelp,
    dispatchSetCurrentElement,
    dispatchSetModeEditor,

    upCameraPosition,
    changeCurrentCeilAction,
    changeModeEditorAction,
    saveConstructorDataAction,
    orderConstructorDataAction,
    addObjIntoScene, 
    deleteElemFromScene,
    deleteGroupElementsFromScene,
    changeElemsSizeByPanel,
    changeElemsSizeByProfile,
    changeCeilSize,
    changeElemTexture,
    changeAllElemTexture,
    changeTexturesForCell,
    openModelAR,
    unionGroupElements,
    divisionGroupElements,
    openModalForChangeTotalName,
    lastData,
    disabledOrder,
    totalParams,
    totalListTextures,
    changeGlobalSize,

    changeLegsStatus,
    legsStatus,

    currentCeil,
    listTextures,

    elements2textures,

  } = props; 

  const dispatch = useDispatch(); 

  
  const currentSelection = useSelector( state => state.constructorReducer.currentSelection );
  const notificationHelpText = useSelector( state => state.constructorReducer.notificationHelpText );
  const currentElement = useSelector( state => state.constructorReducer.currentElement );
  const totalName = useSelector( state => state.constructorReducer.totalName); 
  const notifications = useSelector( state => state.constructorReducer.notifications );

  const [ activeGroup, setActiveGroup ] = React.useState(-1);

  const listSelectionBtns = [ 
    {
      name : 'Ячейка',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66797 1L12.668 6.6V15L4.66797 9.4V1Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    },
    {
      name : 'Панель',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1L12.5 6.6V15L4.5 9.4V1Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    },
    {
      name : 'Профиль',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.83594 5L12.8359 10.6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    }
  ];

  const listFillingBtns = [

    {
      name : 'Панели',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1L12.5 6.6V15L4.5 9.4V1Z" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    },
    {
      name : 'Профили',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.83594 5L12.8359 10.6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    },
    {
      name : 'Ячейки',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.125 5L8.125 1L14.125 5M2.125 5L8.125 9M2.125 5V11L8.125 15M14.125 5L8.125 9M14.125 5V11L8.125 15M8.125 9V15" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    },
    {
      name : 'Наполнение',
      icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1777_23798)"><path d="M8.375 7.5L2.70233 9.52595C1.90634 9.81023 1.375 10.5642 1.375 11.4094V11.5C1.375 12.6046 2.27043 13.5 3.375 13.5H13.375C14.4796 13.5 15.375 12.6046 15.375 11.5V11.4094C15.375 10.5642 14.8437 9.81024 14.0477 9.52595L8.375 7.5ZM8.375 7.5V5.83333C8.375 5.64924 8.52424 5.5 8.70833 5.5V5.5C9.62881 5.5 10.375 4.75381 10.375 3.83333V3.75C10.375 2.7835 9.5915 2 8.625 2H7.88406C7.28146 2 6.74647 2.3856 6.55591 2.95728L6.375 3.5" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/></g><defs><clipPath id="clip0_1777_23798"><rect width="16" height="16" fill="white" transform="translate(0.375)"/></clipPath></defs></svg>),
    },

    // {
    //   name : 'Каркас',
    //   icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.125 5L8.125 1L14.125 5M2.125 5L8.125 9M2.125 5V11L8.125 15M14.125 5L8.125 9M14.125 5V11L8.125 15M8.125 9V15" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    // },
    // {
    //   name : 'Двери',
    //   icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1.375 1L11.375 3.20628V15L1.375 13V1Z" stroke="#A2A2A2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.375 1H15.375" stroke="#A2A2A2" strokeWidth="2" strokeLinecap="round"/><path d="M11.875 14H15.375" stroke="#A2A2A2" strokeWidth="2" strokeLinecap="round"/><path d="M7.875 8V9" stroke="#A2A2A2" strokeWidth="2" strokeLinecap="round"/></g><defs><clipPath id="clip0_1777_23785"><rect width="16" height="16" fill="white" transform="translate(0.375)"/></clipPath></defs></svg>),
    // },
    // {
    //   name : 'Ящики',
    //   icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1777_23792)"><path d="M7.625 4.5H9.625" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/><path d="M7.625 11.5H9.625" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/><path d="M1.625 1H15.625V8V15H1.625V8V1Z" stroke="#C4C4C4" strokeWidth="2" strokeLinejoin="round"/></g><defs><clipPath id="clip0_1777_23792"><rect width="16" height="16" fill="white" transform="translate(0.625)"/></clipPath></defs></svg>),
    // },
    // {
    //   name : 'Хранение',
    //   icon : (<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1777_23798)"><path d="M8.375 7.5L2.70233 9.52595C1.90634 9.81023 1.375 10.5642 1.375 11.4094V11.5C1.375 12.6046 2.27043 13.5 3.375 13.5H13.375C14.4796 13.5 15.375 12.6046 15.375 11.5V11.4094C15.375 10.5642 14.8437 9.81024 14.0477 9.52595L8.375 7.5ZM8.375 7.5V5.83333C8.375 5.64924 8.52424 5.5 8.70833 5.5V5.5C9.62881 5.5 10.375 4.75381 10.375 3.83333V3.75C10.375 2.7835 9.5915 2 8.625 2H7.88406C7.28146 2 6.74647 2.3856 6.55591 2.95728L6.375 3.5" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round"/></g><defs><clipPath id="clip0_1777_23798"><rect width="16" height="16" fill="white" transform="translate(0.375)"/></clipPath></defs></svg>),
    // },
  ];

  const backToHomeUrl = ( url ) => {

    //Проверяем, есть ли что-то в стеке истории
    if ( lastData ){

      window.location.href = url;

    } else {

      dispatch( setModalSave( true ) );

    }

  }

  const onGroup = ( index ) => {

    if ( index === activeGroup ){
      setActiveGroup(-1)
    }else{

      dispatchSetNotificationHelp( 'CHOICE' );

      setActiveGroup(index);
    }

  }

  const onBtn = ( index ) => {

    changeModeEditorAction(null);

    changeCurrentCeilAction( -1, 0 );

    dispatchSetCurrentElement( [] );

    if ( [0,1,2].includes( index ) ){
      setActiveGroup(-1)

      if ( index === currentSelection ){
        dispatchSetNotificationHelp( '' );
      }else{
        dispatchSetNotificationHelp( 'HIDE' );
      }
     
    }else{

      dispatchSetNotificationHelp( '' );    

    }

    dispatchSetCurrentSelectionAction( index, currentSelection);
    
  }

  const onCeil = ( index ) => {

    if ( index === currentCeil ){
      dispatchSetNotificationHelp( 'CHOICE' );
      changeModeEditorAction(null);
    }else{
      dispatchSetNotificationHelp( 'PUT' );
      changeModeEditorAction('PUT');
    }
  
    // addObjIntoScene( index );

    changeCurrentCeilAction( index, currentCeil );

  }

  React.useEffect( () => {

    if ( ![0,1,2].includes( currentSelection ) ){
      if ( [3,4,5].includes( currentSelection ) ){
        setActiveGroup(0);
      }else if ( [6,7,8,9].includes( currentSelection ) ){
        setActiveGroup(1);
      }
    }
    
  }, [ currentSelection ] )

  const closeWindow = () => {

    changeCurrentCeilAction( -1, 0 );

    setActiveGroup(-1)

    dispatchSetCurrentElement( [] );

    dispatchSetNotificationHelp( '' );

    dispatchSetCurrentSelectionAction( -1, currentSelection);

  }

  const getIdElement = ( elem ) => {

    if ( elem  ){

      return elem.getID();

    }

  }

  const getDefaultId = ( elem ) => {

    if ( elem ){

      return elem.getDefaultId();

    }

  } 

  const Prompt = ( { text } ) => {

    return (

      <div className="prompt">
        { text }
      </div>

    )

  } 

  const TextureItem = ( {texture, index, elems, everything, cell, activeGroup, callback, callbackAll, callbackCell} ) => {

    if ( cell ){

      if ( texture && texture.name && texture.file ){
        return ( 
          <div className="item prompt-hover">

            <Prompt text={ texture.name } />

            <div
              className="item-wrapper"
              onClick={ () => callbackCell( texture, activeGroup, elems ) }
              >
              <img src={ texture.file } />
            </div>
            
          </div>
        );
      }

    }

    if ( everything ){

      if ( texture && texture.name && texture.file ){
        return ( 
          <div className="item prompt-hover">

            <Prompt text={ texture.name } />

            <div
              className="item-wrapper"
              onClick={ () => callbackAll( texture, activeGroup ) }
              >
              <img src={ texture.file } />
            </div>
            
          </div>
        );
      }

    }else{

      if ( texture && texture.name && texture.file ){
        return ( 
          <div className="item prompt-hover">

            <Prompt text={ texture.name } />

            <div
              className="item-wrapper"
              onClick={ () => callback( texture, elems ) }
              >
              <img src={ texture.file } />
            </div>
            
          </div>
        );
      }

    }

  }

  const TexturePanel = ( { textures, elems, everything = false, cell = false } ) => {

    const [ activeGroup, setActiveGroup ] = React.useState(
      elems && elems[0] && ( elems[0].type === 'profile' || elems[0].type === 'finger' || elems[0].type === 'leg' ) ? 1 : 0
    );

    let countPanel = 0, countProfile = 0;

    if ( textures.length !== 0 ){

      textures.forEach( (item) => {

        if ( item.type === 'panel' ){
          countPanel += 1;
        }else if (  item.type === 'profile' ){
          countProfile += 1;
        }

      } );

    }

    const onGroupBtnTab = ( index ) => {
      if ( everything || cell ){
        setActiveGroup(index);
      }
     
    }

    return (

      <div className="TexturePanel">
        <div className="btn-tag-container mb-2">
          <div 
            className={ `drimo-btn-tag ${ activeGroup === 0 ? 'selected' : '' }`}
            onClick={ () => onGroupBtnTab( 0 ) }
            >
            Панели
            <span>{ countPanel }</span>
          </div>
          <div className={ `drimo-btn-tag ${ activeGroup === 1 ? 'selected' : '' }`}
            onClick={ () => onGroupBtnTab( 1 ) }>
            Профиль
            <span> { countProfile } </span>
          </div>
        </div>
        <div className="textures-preview-wrapper">
          
          {
            textures && textures.length && textures.map( (texture, index) => (

              activeGroup === 0 && texture.type === 'panel' ? (
                <TextureItem 
                  texture={ texture } 
                  elems={ elems }
                  everything={everything}
                  cell={cell}
                  activeGroup={activeGroup}
                  callback={ changeElemTexture }
                  callbackAll={ changeAllElemTexture }
                  callbackCell={ changeTexturesForCell }
                  key={ `texture-item${index}`} 
                />  
              ) : (
                activeGroup === 1 && texture.type === 'profile' ? (
                  <TextureItem 
                    texture={ texture } 
                    elems={ elems }
                    everything={everything}
                    cell={cell}
                    activeGroup={activeGroup}
                    callback={ changeElemTexture }
                    callbackAll={ changeAllElemTexture }
                    callbackCell={ changeTexturesForCell }
                    key={ `texture-item${index}`} 
                  />  
                ) : ''
              )
            
              )
              
            )
          }

        </div>
      </div>

    )

  } 

  const Ceil = ( { obj } ) => {

    return (

      <div 
        className={ `control-panels-ceil ${ currentCeil === obj.id ? 'selected': ''}` }
        onClick={ () => onCeil( obj.id ) }  
        >
        <div className="preview">
          <img src={obj.preview} />
        </div>
        <div className="title">
          {obj.name}
        </div>
      </div>

    )

  } 

  const UnionBtn = ( { elems, callback } ) => {

    return (

      <div 
        className="theme-btn theme-btn-graydark theme-btn-sm"
        onClick={ () => callback( elems ) }
        >
        <svg className="svg-big" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 11L19 1L9 1L9 7L1 7L1 19H10L10 11L19 11Z" stroke="black" strokeWidth="2"/>
        </svg>
        Объединить

      </div>

    )

  }

  const AddElemBtn = ( { elems, callback } ) => {

    return (

      <div 
        className="theme-btn theme-btn-graydark theme-btn-sm"
        // onClick={ () => callback( elems ) }
        >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="9" transform="matrix(-1 0 0 1 10 10)" stroke="black" strokeWidth="2"/>
          <path d="M13 10L7 10" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
          <path d="M10 7L10 13" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
          </svg>
        </svg>
        Добавить
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 8L11 12L11 4L5 8Z" fill="black"/>
        </svg>

      </div>

    )

  }

  const DeleteFillingBtn = ( { elems, callback } ) => {

    return (

      <div 
        className="theme-btn theme-btn-graydark theme-btn-sm"
        onClick={ () => callback( elems ) }
        >
        <svg className="svg-big" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66536 7.5L6.66536 15.8333L13.332 15.8333L13.332 7.5L6.66536 7.5ZM7.91536 2.5L12.082 2.5L12.9154 3.33333L15.832 3.33333V5L4.16536 5V3.33333L7.08203 3.33333L7.91536 2.5ZM4.9987 5.83333L14.9987 5.83333L14.9987 15.8333C14.9987 16.75 14.2487 17.5 13.332 17.5H6.66536C5.7487 17.5 4.9987 16.75 4.9987 15.8333L4.9987 5.83333Z" fill="black"/>
        </svg>
        Удалить
      </div>

    )

  }

  const SettingsElement = ( { elem } ) => {

    let setting = {}, type, functionCallback;

    if ( elem ){
      if ( elem.getChars() !== null ){
        setting = elem.getChars();
        type = elem.getType();

        if ( type === 'ceil' ){
          functionCallback = changeCeilSize;
        }else if ( type === 'panel' ){
          functionCallback = changeElemsSizeByPanel;
        }else if ( type === 'profile' ){
          functionCallback = changeElemsSizeByProfile;
        }else{
          functionCallback = function () { 

            console.log('Empty function');
            
          };
        }
      }
    }

    const SettingInput = ( { elem, label, typeSize, setup, callback } ) => {

      const [ value, setValue ] = React.useState( setup.value ); 

      const [ changeableEnabled, setChangeableEnabled ] = React.useState( setup.status === 'enabled' ? true : false ); 
      
      var _type = elem.type;

      const getLenghtSizeStandartByType = ( type ) => {

        return SIZE_STANDART[ type ].length;

      }

      const getIndexLevelBySize = ( size ) => {

        return SIZE_STANDART[ type ].findIndex( item => item === size );

      }

      const getSizeByLevel = ( level ) => {

        return SIZE_STANDART[ type ][level];

      } 

      const decreaseBtn = ( size ) => {

        var level = getIndexLevelBySize( size );

        if ( level !== 0 ){ level -= 1; }

        var _size = getSizeByLevel( level );

        setValue( _size );

        callback( elem, _size, typeSize );

      }

      const increaseBtn = ( size ) => {

        var level = getIndexLevelBySize( size );

        if ( level !== (getLenghtSizeStandartByType( _type )-1) ){ level += 1; }

        var _size = getSizeByLevel( level );

        setValue( _size );

        callback( elem, _size, typeSize );

      }

      return (

        <div className="SettingInput">
          
          <div className="input-wrapper mb-2">
            <div className="label"> { label } </div>
            <div className={`input-container input-container-blocked ${ !changeableEnabled ? 'change-disabled' : '' }`}>
              <div 
                className="decrease" 
                onClick={ () => decreaseBtn( value ) }
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="translate(0 16) rotate(-90)" fill="white"/><path d="M11 3L6 8L11 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
              </div>
              <input
                type="text"
                value={ value }
                readOnly={true}
              />
              <div
                className="increase"
                onClick={ () => increaseBtn( value ) }
                >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)" fill="white"/><path d="M5 3L10 8L5 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
              </div>
            </div>
          </div>

        </div>
        

      )

    }

    return (

      <div className="SettingsElement">
          
        {
          setting && setting.width ? (
            <SettingInput label="Ширина, мм" elem={ elem } typeSize="width" setup={ setting.width } callback={ functionCallback } />
          ) : ''
        }
        {
          setting && setting.height ? (
            <SettingInput label="Высота, мм" elem={ elem } typeSize="height" setup={ setting.height } callback={ functionCallback } />
          ) : ''
        }
        {
          setting && setting.depth ? (
            <SettingInput label="Глубина, мм" elem={ elem } typeSize="depth" setup={ setting.depth } callback={ functionCallback } />
          ) : ''
        }

      </div>

    )

  }

  const needShowWindow = ( index ) => {

    if ( index !== -1 ){

      if ( [3,4,5].includes( index ) ){
        if( currentElement.length !== 0 ){
          return true;
        }else{
          return false;
        }
      }else{
        return true;
      }

    }else{
      return false;
    }

  }


  const onBtnSaveData = () => {

    if ( notifications.type !== 'LOADING' && !notifications.show ){

      // saveConstructorDataAction();

      dispatch( setSaveNameModeAction(1) );

      openModalForChangeTotalName();

    }
   
  }

  const onBtnOrder = () => {

    if ( notifications.type !== 'LOADING' && !notifications.show ){

      // orderConstructorDataAction();

      dispatch( setSaveNameModeAction(2) );

      openModalForChangeTotalName();

    }

  }


  const TitleWindow = ( {single, multipe, elems} ) => {

    let price = ''; 

    try {
      price = ' - ' + elements2textures.find( (item) => item.id === elems[0].elementToTextureID ).cost + ' р';
    }catch(err){
      
    }

    let render = (
      <div className="fs-32">      
        {/*{ single } #{ getIdElement( currentElement[0] ) } */}
        { single } { price } 
      </div>
    )

    if ( elems.length > 1 ) {

      render = (
        <div className="fs-32">   

          { multipe }

          {/*{
            elems.map( (item) => ( ` #${ getIdElement(item) }` ) )
          }*/}

        </div>
      )

    }

    return render;

  } 

  const ARbottom = () => {

    return (

      <div className="ARbottom" onClick={ () => openModelAR() }>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7.5L18 5.5M21 7.5L18.4344 9.21038M21 7.5V10.5M3 7.5L5.56557 5.78962M3 7.5L5.56557 9.21038M3 7.5V10.5M12 13.5L9.4111 11.7741M12 13.5L14.5954 11.7697M12 13.5V16.5M12 22.5L14.8279 20.6148M12 22.5L9.17214 20.6148M12 22.5V18.75M14.5954 3.23029L12 1.5L9.59599 3.10267M21 14.25V16.5L18.75 18M5.25 18L3 16.5V14.25" stroke="#E92627" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>AR</span>
      </div>

    )

  }

  const TotalPrice = ( { price } ) => {

    let stringPrice = '';

    if ( price ){

      stringPrice = price.toLocaleString() + ' Р';

    }else{
      stringPrice = 0 + ' Р';
    }


    return ( <span>{ stringPrice }</span> )

  }

  const TotalParams = ( { params } ) => {

    let weight = (params.weight/1000).toFixed(3);

    return (

      <div className="TotalParams">
        <div>
          <span className="text-gray ff-helvetica">Габариты, мм: <span className="fw-700 text-black ff-helvetica">{params.height} x {params.width} x {params.depth}</span></span>
        </div>
        <div className="mt-2">
          <span className="text-gray ff-helvetica">Вес, кг: <span className="fw-700 text-black ff-helvetica">{weight}</span></span>
        </div>
      </div>

    )

  }

  const TexturesListTotal = ( { params } ) => {

    const TextureItemTotal = ( { texture } ) => {

      if ( texture && texture.name && texture.file ){
        return ( 
          <div className="item prompt-hover">

            <Prompt text={ texture.name } />

            <div
              className="item-wrapper"
              >
              <img src={ texture.file } />
            </div>
            
          </div>
        );
      }

    }

    return (

      <div className="TexturesListTotal">
      
        <div className="d-flex">
          <div className="ff-helvetica text-gray mr-1">
            Текстура панелей:
          </div>
          <div className="textures-preview-wrapper small">
            {
              params.panels && params.panels.map( (texture) => <TextureItemTotal texture={ texture } key={ `texture-item-panel-${texture.id}` } /> )
            }
          </div>
        </div>  
        <div className="d-flex mt-1">
          <div className="ff-helvetica text-gray mr-1">
            Текстура профиля:
          </div>
          <div className="textures-preview-wrapper small">
            {
              params.profiles && params.profiles.map( (texture) => <TextureItemTotal texture={ texture } key={ `texture-item-profile-${texture.id}` } /> )
            }
          </div>
        </div>  
      </div>

    )

  }

  const ChangeTotalName = ( { callback } ) => {

    return (

      <div className="ChangeTotalName">

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4269_109337)">
            <path d="M2.5 14.5482V17.0815C2.5 17.3148 2.68333 17.4982 2.91667 17.4982H5.45C5.55833 17.4982 5.66667 17.4565 5.74167 17.3732L14.8417 8.28151L11.7167 5.15651L2.625 14.2482C2.54167 14.3315 2.5 14.4315 2.5 14.5482ZM17.2583 5.86484C17.5833 5.53984 17.5833 5.01484 17.2583 4.68984L15.3083 2.73984C14.9833 2.41484 14.4583 2.41484 14.1333 2.73984L12.6083 4.26484L15.7333 7.38984L17.2583 5.86484Z" fill="#C4C4C4"/>
          </g>
          <defs>
            <clipPath id="clip0_4269_109337">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>

      </div>

    )

  }

  const TotalName = ( { name, children, callback } ) => {

    return (

      <div className="TotalName d-inline-flex" onClick={ () => callback() }>
        <div className="fs-20 mr-2">{ name }</div>
        { children }
      </div>

    )

  }

  const Switcher = ( { checked, callback } ) => {

    return (

      <div>
        <div className="d-flex align-items-center">
          <div className={ `switcher ${ checked ? 'checked' : '' }` } onClick={ () => callback() }>
            <label className="switcher"></label>
          </div>
          <div className="ml-2 fs-14 mb-1 ff-helvetica">
            Ножки
          </div>
        </div>
        <div className="text-gray fs-12 ff-helvetica">
          +10 см снизу конструкции
        </div>
        
      </div>
      

    )

  }

  const ChangeGlobalSize = ( { total, callback } ) => {

    const onClickIncreaseBtn = ( type ) => {

      callback( type, 'INCREASE' )

    }

    const onClickDecreaseBtn = ( type ) => {

      callback( type, 'DECREASE' )

    }

    return (

      <div className="ChangeGlobalSize">
        <div className="input-wrapper mb-2">
          <div className="label">
            Ширина, мм
          </div>
          <div className="input-container input-container-blocked">
            <div className="decrease" onClick={ () => onClickDecreaseBtn( 'WIDTH' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="translate(0 16) rotate(-90)" fill="white"/><path d="M11 3L6 8L11 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
            <input type="text" defaultValue={ total.width } />
            <div className="increase" onClick={ () => onClickIncreaseBtn( 'WIDTH' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)" fill="white"/><path d="M5 3L10 8L5 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
          </div>
        </div>
        <div className="input-wrapper mb-2">
          <div className="label">
            Высота, мм
          </div>
          <div className="input-container input-container-blocked">
            <div className="decrease" onClick={ () => onClickDecreaseBtn( 'HEIGHT' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="translate(0 16) rotate(-90)" fill="white"/><path d="M11 3L6 8L11 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
            <input type="text" defaultValue={ total.height } />
            <div className="increase" onClick={ () => onClickIncreaseBtn( 'HEIGHT' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)" fill="white"/><path d="M5 3L10 8L5 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
          </div>
        </div>
        <div className="input-wrapper">
          <div className="label">
            Глубина, мм
          </div>
          <div className="input-container input-container-blocked">
            <div className="decrease" onClick={ () => onClickDecreaseBtn( 'DEPTH' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="translate(0 16) rotate(-90)" fill="white"/><path d="M11 3L6 8L11 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
            <input type="text" defaultValue={ total.depth } />
            <div className="increase" onClick={ () => onClickIncreaseBtn( 'DEPTH' ) }>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)" fill="white"/><path d="M5 3L10 8L5 13" stroke="black" strokeWidth="2" strokeLinecap="square"/></svg>
            </div>
          </div>
        </div>
      </div>

    )

  } 

  return (

    <div className={ `ControlPanelBottom control-panels-bottom ${ needShowWindow(currentSelection) ? 'active' : ''}` }>
      
      <NotificationHelp text={ notificationHelpText } />

      <ARbottom />

      <div className="control-panels-bottom-btns d-flex">
        <div className="drimo-btn drimo-btn-yellow drimo-btn-svg drimo-btn-right fs-18" onClick={ () => backToHomeUrl( baseURL ) }>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10H16" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <path d="M9 5L4 10L9 15" stroke="black" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </div>
        <div 
          className={`drimo-btn drimo-btn-yellow drimo-btn-svg drimo-btn-right fs-18 ${ currentSelection === 0 ? 'active' : '' }` }
          onClick={ () => onBtn( 0 ) } >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6H11M18 6H15" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <path d="M2 14H5M18 14H9" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <circle cx="13" cy="6" r="2" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="7" cy="14" r="2" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
        <div 
          className={`drimo-btn drimo-btn-yellow drimo-btn-svg drimo-btn-right fs-18 ${ currentSelection === 1 ? 'active' : '' }` }
          onClick={ () => onBtn( 1 ) }>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.50006 6.00006C7.49993 8.50006 5.49994 9.00006 2.49994 10.0001C2.99994 12.5001 4.13309 13.5475 5.49993 15.5001L8.49994 14.5001L7.49993 17.0001L9 18.5001C12 16.5001 14 13.5001 14.3743 11.1924L9.50006 6.00006Z" stroke="black" strokeWidth="2"/>
            <path d="M13.9995 5.94975L18.9492 1" stroke="black" strokeWidth="2"/>
            <path d="M10.9258 3L16.8502 8.92462" stroke="black" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className={`control-panels-bottom-btns-group control-panels-bottom-btns-group-selection ${ activeGroup === -1 ? 'default' : '' } ${ activeGroup === 0 ? 'active' : '' }`}
          >
          <div 
            className="drimo-btn drimo-btn-blue drimo-btn-parent fs-18"
            onClick={ () => onGroup( 0 ) }
            >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2"/>
              <path d="M7 10H13" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
              <path d="M10 7L10 13" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
            <span>Выделение</span>
          </div>
          <div className="control-panels-bottom-btns-group-childs">
            {
              listSelectionBtns && listSelectionBtns.map( (item, index) => (

                <div 
                  key={ `item-selection-${index+ 3}` }
                  className={`drimo-btn drimo-btn-black drimo-btn-right justify-content-center w-100 fs-18 ${ currentSelection === index+3 ? 'active' : '' }`}
                  onClick={ () => onBtn( index + 3 ) }
                  >
                  {item.icon} <span>{ item.name }</span>
                </div>

              ) )
            }
          </div>
        </div>
        <div className={`control-panels-bottom-btns-group control-panels-bottom-btns-group-filling ${ activeGroup === -1 ? 'default' : '' } ${ activeGroup === 1 ? 'active' : '' }`}>
          <div 
            className="drimo-btn drimo-btn-blue drimo-btn-parent fs-18"
            onClick={ () => onGroup( 1 ) }>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1731_24485)">
                <path d="M8.48437 8.48633L13.0093 18.0112C13.0438 16.9347 13.5994 16.3791 14.1549 15.8235L17.1848 18.8535L18.8515 17.1868L15.8216 14.1569C16.3964 13.6206 16.9519 13.065 18.0093 13.0112L8.48437 8.48633Z" stroke="white" strokeWidth="2" strokeLinejoin="bevel"/>
                <path d="M10 6L13 4" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M4.51007 6.18899L0.999307 5.3677" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M3.75782 13.028L5.26361 9.99998" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                <path d="M7.04806 4.17035L8.2259 1.00036" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1731_24485">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Наполнение</span>
          </div>
          <div className="control-panels-bottom-btns-group-childs">
            {
              listFillingBtns && listFillingBtns.map( (item, index) => (

                <div 
                  key={ `item-filling-${index + listSelectionBtns.length + 3}` }
                  className={`drimo-btn drimo-btn-black ${ index+1 !== listFillingBtns.length ? 'drimo-btn-right' : '' } justify-content-center w-100 fs-18 ${ currentSelection === index+ listSelectionBtns.length + 3 ? 'active' : '' }`}
                  onClick={ () => onBtn( index + listSelectionBtns.length + 3 ) }
                  >
                  {item.icon} <span>{ item.name }</span>
                </div>

              ) )

            }
          </div>
        </div>
        <div 
          className={`drimo-btn drimo-btn-red drimo-btn-left fs-18 ${ currentSelection === 2 ? 'active' : '' }` }
          onClick={ () => onBtn(2) }
          >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2"/>
            <path d="M8 15V6H11C12.1046 6 13 6.89543 13 8V8C13 9.10457 12.1046 10 11 10H6.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 13H10" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>

          <TotalPrice price={ totalParams.price } />

        </div>
      </div>
      <div className="control-panels-bottom-windows-wrapper">
        <div className="close" onClick={ () => closeWindow() }>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white"/>
            <path d="M4 4L19.9997 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square"/>
            <path d="M20 4L4.0003 19.9997" stroke="black" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </div>

        <div className={ `control-panels-bottom-window ${ currentSelection === 0 ? 'active' : '' }` } >
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <div className="fs-32">Общие габариты</div>
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-4">

                    <ChangeGlobalSize total={ totalParams } callback={changeGlobalSize} />

                  </div>
                  <div className="col-4">
                    
                    <Switcher checked={ legsStatus } callback={ changeLegsStatus } />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 1 ? 'active' : '' }` } >
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <div className="fs-32">Текстуры</div>
               {/* <div className="btn-tag-container">
                  <div className="drimo-btn-tag">
                    Панели
                    <span>15</span>
                  </div>
                  <div className="drimo-btn-tag selected">
                    Профиль
                    <span>4</span>
                  </div>
                </div>*/}
              </div>
              <div className="col-9">
                <div className="textures-preview-wrapper">

                  <TexturePanel textures={ listTextures } elems={ currentElement } everything={true} />

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 2 ? 'active' : '' }` } > 
          <div className="container-fluid"> 

            <div className="row">
              
              <div className="col-8">

                <TotalName 
                  name={ totalName }
                  children={ <ChangeTotalName /> } 
                  callback={ openModalForChangeTotalName } />

                <div className="row mt-12">
                  <div className="col-5">
                    <TotalParams params={ totalParams } />
                  </div>
                  <div className="col-7">
                    <TexturesListTotal params={ totalListTextures } />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="fs-32"><TotalPrice price={ totalParams.price } /></div>
                <div className="d-flex mt-12">
                  <div 
                    className={ `theme-btn theme-btn-red w-100 mb-2  mr-1 ${ disabledOrder ? 'theme-btn-disabled' : '' }` }
                    onClick={ () => onBtnOrder() }
                    >
                    Заказать
                  </div>
                  <div 
                    className="theme-btn theme-btn-gray w-100  ml-1 mb-2"
                    onClick={ () => onBtnSaveData() }
                    >
                    Сохранить
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 3 && currentElement.length !== 0 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="row">
              <div className="col-3">

                <TitleWindow single="Ячейка" multipe="Ячейки" elems={ currentElement } />

                <div className="mt-3">
                  <div className="theme-btn-sm-container">
                    <DeleteFillingBtn 
                      elems={ currentElement } 
                      callback={ deleteGroupElementsFromScene }
                    />
                    {/*<AddElemBtn />*/}
                    <UnionBtn 
                      elems={ currentElement } 
                      callback={ unionGroupElements }
                    />


                    <DivisionBtn
                      elems={ currentElement }  
                      callback={ divisionGroupElements }
                    />

                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-4">

                    <SettingsElement 
                      elem={ currentElement[0] } 
                    />

                  </div>
                  <div className="col-4">

                    <TexturePanel textures={ listTextures } elems={ currentElement } cell={true} />

                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>        
        <div className={ `control-panels-bottom-window ${ currentSelection === 4 && currentElement.length !== 0 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="row">
              <div className="col-3">

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'door' ? (
                    <TitleWindow single="Дверь" multipe="Двери" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'box' ? (
                    <TitleWindow single="Ящик" multipe="Ящики" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'panel' ? (
                    <TitleWindow single="Панель" multipe="Панели" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'leg' ? (
                    <TitleWindow single="Ножка" multipe="Ножки" elems={ currentElement } />
                  ) : ''
                }

                <div className="mt-3">
                  <DeleteFillingBtn 
                    elems={ currentElement } 
                    callback={ deleteElemFromScene }
                  />
                </div>
               
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-4">

                    <SettingsElement 
                      elem={ currentElement[0] } 
                    />

                  </div>
                  <div className="col-4">

                    <TexturePanel textures={ listTextures } elems={ currentElement } />

                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 5 && currentElement.length !== 0 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="row">
              <div className="col-3">

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'profile' ? (
                    <TitleWindow single="Профиль" multipe="Профили" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'finger' ? (
                    <TitleWindow single="Коннектор" multipe="Коннекторы" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type === 'leg' ? (
                    <TitleWindow single="Ножка" multipe="Ножки" elems={ currentElement } />
                  ) : ''
                }

                {
                  currentElement && currentElement[0] && currentElement[0].type !== 'leg' ? (
                  <div className="mt-3">
                    <DeleteFillingBtn elems={ currentElement } callback={ deleteElemFromScene } />
                  </div>
                  ) : ''
                }

              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-4">

                    <SettingsElement 
                      elem={ currentElement[0] } 
                    />

                  </div>
                  <div className="col-4">

                    <TexturePanel textures={ listTextures } elems={ currentElement } />

                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 6 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="control-panels-ceil-list">
              {
                listCeils.filling && listCeils.filling[0].map( ( ceil ) => ( <Ceil obj={ ceil } key={ `ceil-${ceil.id}` } />  ) )
              }
              
            </div>
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 7 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="control-panels-ceil-list">
             {
                listCeils.filling && listCeils.filling[1].map( ( ceil ) => ( <Ceil obj={ ceil } key={ `ceil-${ceil.id}` } />  ) )
              }
             
            </div>
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 8 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="control-panels-ceil-list">
              {
                listCeils.filling && listCeils.filling[2].map( ( ceil ) => ( <Ceil obj={ ceil } key={ `ceil-${ceil.id}` } />  ) )
              }
            </div>
          </div>
        </div>
        <div className={ `control-panels-bottom-window ${ currentSelection === 9 ? 'active' : '' }` } > 
          <div className="container-fluid"> 
            <div className="control-panels-ceil-list">
              {
                listCeils.filling && listCeils.filling[3].map( ( ceil ) => ( <Ceil obj={ ceil } key={ `ceil-${ceil.id}` } />  ) )
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

const mapStateToProps = (store) => {
  return {
    state: store.constructorDrimo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentSelectionAction: ( index, state ) => {
    dispatch( setCurrentSelectionAction( index, state ) )
  },
  dispatchSetCurrentCeilAction: ( index, state ) => {
    dispatch( setCurrentCeilAction( index, state ) )
  },
  dispatchSetNotificationHelp: ( type ) => {
    dispatch( setNotificationHelp( type ) )
  },
  dispatchSetCurrentElement: ( elem ) => {
    dispatch( setCurrentElementAction( elem ) )
  },
  dispatchSetModeEditor: ( mode ) => {
    dispatch( setModeEditorAction( mode ) )
  },
  
});

// export default ControlPanelBottom;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanelBottom);


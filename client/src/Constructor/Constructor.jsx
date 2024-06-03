import React from 'react';
import ReactDOM from 'react-dom/client';
import './Constructor.css';

//Axios
import API from '../api.js';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

//Three.js
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

//Классы
import Element from './Classes/Element/Element.js';
import GroupElements from './Classes/GroupElements/GroupElements.js';

//Компоненты
import { ControlPanelBottom } from './ControlPanelBottom';
import { ControlPanelLeft } from './ControlPanelLeft';
import { AR } from './Models/AR';
import { BG } from './Models/BG';

import { modelAR } from './model.glb';

//Массивы изначальных данных
import { listElememetsOther, listElememetsPanels, listElememetsFingers, listElememetsProfiles, listElememetsLegs, listGroupElements, listElementsOther2 } from './testElements.js';

//Список моделей
import { listGLTFModels } from './listGLTFModels.js';

//Текстуры
import coordinate_system from '../images/coordinate_system.png';

//Конфиг
import { PI, PI_90, baseURL, backBaseURL } from './Config.js';

//Дополнительные функции
import { addNewCeilByPanel, addNewCeilByCeil } from './Supports/addNewCeil.js';
import { addNewCell } from './Supports/addNewCell.js';
import { addNewColumnCornice, addNewRowCornice } from './Supports/addNewCornice.js';
import { changeSizePanel } from './Supports/changeSizePanel.js';
import { changeSizeProfile } from './Supports/changeSizeProfile.js';
import { changeSizeCeil } from './Supports/changeSizeCeil.js';
import { deleteGroupElements } from './Supports/deleteGroupElements.js';
import { unionGroupElements } from './Supports/unionGroupElements.js';
import { divisionGroupElements } from './Supports/divisionGroupElements.js';
import { addNewBox } from './Supports/addNewBox.js';
import { addNewDoor } from './Supports/addNewDoor.js';
import { changeGlobalSizeConstructor } from './Supports/changeGlobalSizeConstructor.js';

import { getGlobalMatrixCeils, findObjById, findObjByDefaultId, getObjMatrixByCeil, getPanelMatrixByObj, getProfileMatrixByFingerObj, getPanelMatrixByProfile, round, getAllElementsByCell } from './helpers/constructorHelper.js';
import { getCookie } from './helpers/cookies.js';

//Зависимости для сцены
import { initScene } from './Scene/initScene.js';
import { initLights } from './Scene/initLights.js';
import { initLines } from './Scene/initLines.js';
import { initLabelRenderer } from './Scene/initLabelRenderer.js';
import { initCamera } from './Scene/initCamera.js';
import { initControls } from './Scene/initControls.js';
import { initRender } from './Scene/initRender.js';


//Экшены
import { setCurrentSelectionAction, setCurrentCeilAction, setNotificationHelp, setCurrentElementAction, setModalName, setModalLoginAuthAction, setSaveAndOrderAction, setLastDataAction, setSaveNameModeAction, setTotalName, setNotificationsAction } from '../redux/actions/constructorActions.js';  

function Constructor() {

  const dispatch = useDispatch(); 

  const currentElementState = useSelector( state => state.constructorReducer.currentElement );
  const currentSelectionState = useSelector( state => state.constructorReducer.currentSelection );
  const totalNameStore = useSelector( state =>  state.constructorReducer.totalName );
  const saveAndOrderAction = useSelector( state => state.constructorReducer.saveAndOrderAction );
  const lastDataStore = useSelector( state => state.constructorReducer.lastData );
  const saveNameMode = useSelector( state => state.constructorReducer.saveNameMode); 
  const notifications = useSelector( state => state.constructorReducer.notifications );

  const [ cameraPosition, setCameraPosition ] = React.useState( 0 );
  const [ currentCeilState, setCurrentCeilState ] = React.useState( -1 );
  const [ currentModeEditorState, setCurrentModeEditorState ] = React.useState( null );
  const [ currentElement, setCurrentElement ] = React.useState( currentElementState );
  const [ elemsProfilesState, setElemsProfilesState ] = React.useState( [] );
  const [ elemsFingersState, setElemsFingersState ] = React.useState( [] );
  const [ elemsPanelsState, setElemsPanelsState ] = React.useState( [] );
  const [ elemsLegsState, setElemsLegsState ] = React.useState( [] );
  const [ elemsPanelsOtherState, setElemsPanelsOtherState ] = React.useState( [] );
  const [ elemsGroupElementsState, setElemsGroupElementsState ] = React.useState( [] );
  const [ elemsOtherState, setElemsOtherState ] = React.useState( [] );
  const [ globalCeilGrid, setGlobalCeilGrid ] = React.useState([]);
  const [ triggerChangeCurrentSelection, setTriggerChangeCurrentSelection ] = React.useState(0);
  const [ triggerMoveChanger, setTriggerMoveChanger ] = React.useState(0);
  const [ savedData, setSavedData ] = React.useState( false );
  const [ stackHistory, setStackHistory ] = React.useState( [] );
  const [ currentHistory, setCurrentHistory ] = React.useState(-1);
  const [ canPrev, setCanPrev ] = React.useState( false );
  const [ canNext, setCanNext ] = React.useState( false );
  const [ pressShift, setPressShift ] = React.useState( false );
  const [ lastData, setLastData ] = React.useState( true );
  const [ legsStatus, setLegsStatus ] = React.useState( true );
  const [ totalParams, setTotalParams ] = React.useState( { height : 0, width : 0, depth : 0, weight : 0, price : 0 } );
  const [ modelAR, setModelAR ] = React.useState( false );
  const [ linkToModel, setLinkToModel ] = React.useState( '' );
  const [ listGLTFModelsState , setListGLTFModelsState ] = React.useState( listGLTFModels );
  const [ totalListTextures, setTotalListTextures] = React.useState( { panels : [], profiles : [] } );
  const [ disabledOrder, setDisabledOrder ] = React.useState( false );
  const [ texturesState, setTexturesState ] = React.useState( [] );
  const [ elementsState, setElementsState ] = React.useState( [] );
  const [ elements2textures, setElements2textures ] = React.useState( [] );
  const [ modelsLoadingComplete, setModelsLoadingComplete ] = React.useState(false);
  const [ isRendered, setIsRendered ] = React.useState(0);
  const [ everyModelLoaded, setEveryModelLoaded ] = React.useState(false);
  const [ visibleLine, setVisibleLine ] = React.useState( true );
  const [ searchParams, setSearchParams ] = useSearchParams();

  var elemsProfiles, elemsFingers, elemsPanels, elemsPanelsOther, elemsLegs, elemGroupElements, elemsOther;
  const textureLoader = new THREE.TextureLoader();
  const loaderGLTF = new GLTFLoader();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(1,1);
  const raycaster2 = new THREE.Raycaster();
  const pointer2 = new THREE.Vector2(1,1);
  const mountRef = React.useRef(null);
  const bundleNames = {
    'Панель' : { little : 'panel', large : 'Panel' },
    'Профиль' : { little : 'profile', large : 'Profile' },
    'Коннектор' : { little : 'finger', large : 'Finger' },
    'Дверная панель' : { little : 'door', large : 'Door_Panel' },
    'Ящик' : { little : 'box', large : 'Box' },
    'Ножки' : { little : 'leg', large : 'Leg' },
  }
  const params = [];

  searchParams.forEach((key, value) => {
    params[value] = key;
  });

  React.useEffect( () => {

    const response = getGlobalMatrixCeils( elemsGroupElementsState ); 

    setGlobalCeilGrid( response );

    // console.log( response );

  }, [ elemsGroupElementsState ] )

  React.useEffect( () => {

    let prev = 0, change = 0, next = 0;

    stackHistory.forEach( (moment) => {

      if ( moment.action.type === 'CHANGE' ) { change++;
      } else if ( moment.action.type === 'PREV' ) { prev++;
      } else if ( moment.action.type === 'NEXT' ){ next++; }

    } );

    let deltaChange = 0;

    if ( next !== 0 ){ deltaChange = next * 2 + next; }

    if ( (change + deltaChange) === prev ){ setCanPrev(false); }else{ setCanPrev(true); }

    if ( prev === next ){ setCanNext(false); }else{ setCanNext(true); }

    setLastData( false );

  }, [ stackHistory ] )

  React.useEffect( () => {

    dispatch( setLastDataAction( lastData ) );

  }, [ lastData ] )

  React.useEffect( () => {

    console.log( 'currentCeilState: ' + currentCeilState );

    if ( currentCeilState === 0 || currentCeilState === 5 || currentCeilState === 6 || currentCeilState === 7 || currentCeilState === 8 || currentCeilState === 9 || currentCeilState === 10 || currentCeilState === 11){

      elemsGroupElementsState.forEach( ( obj ) => {

        obj.setVisibleObject( true );

      } )

    }else{

      elemsGroupElementsState.forEach( ( obj ) => {

        obj.setVisibleObject( false );

      } )

    }

  }, [ currentCeilState ] )

  React.useEffect( () => {

    setCurrentElement( currentElementState );
    
  }, [ currentElementState ] )

  React.useEffect( () => {

    let timeStamp = 750, step = 2.5;

    if( triggerChangeCurrentSelection == 0 ){

      new TWEEN.Tween( controls.target )
        .to({
            x: controls.target.x,
            y: 0,
            z: controls.target.z,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

      new TWEEN.Tween( camera.position )
        .to({
            x: camera.position.x,
            y: camera.position.y + step,
            z: camera.position.z,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

    }else{

      new TWEEN.Tween( controls.target )
        .to({
            x: controls.target.x,
            y: controls.target.y - step,
            z: controls.target.z,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

      new TWEEN.Tween( camera.position )
        .to({
            x: camera.position.x,
            y: camera.position.y - step,
            z: camera.position.z,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

    }
    
  }, [ triggerChangeCurrentSelection ] );

  React.useEffect( () => {

    if( currentSelectionState === -1 || 
      ( currentElementState.length == 0 && ( currentSelectionState === 3 || currentSelectionState === 4 || currentSelectionState === 5 ))
      ){
      setTriggerChangeCurrentSelection( 0 );
    }else{
      setTriggerChangeCurrentSelection( 1 )
    }

    if ( currentSelectionState === 3 ){

      elemsGroupElementsState.forEach( ( obj ) => {

        obj.setVisibleObject( true );

      } )

    }else{

      elemsGroupElementsState.forEach( ( obj ) => {

        obj.setVisibleObject( false );

      } )

    }

  }, [ currentSelectionState, currentElementState ] )

  const changeCurrentCeilAction = ( index, state ) => {
    
    if ( index === state ) index = -1;
    setCurrentCeilState(index);

  }

  const changeModeEditorAction = ( mode ) => {

    setCurrentModeEditorState( mode ); 

  }

  const link = React.useMemo( () => {

    let _link = document.createElement( 'a' );
    _link.style.display = 'none';
    document.body.appendChild( _link );

    return _link

  }, [] );

  //Настройка сцены
  const scene = React.useMemo( 
    () => {

      return new THREE.Scene();

    }, []
  )

  //Настройка камеры
  const defaultCamera = React.useMemo( 
    () => {

      return initCamera();

    }, []
  )

  //Настройка камеры
  const camera = React.useMemo( 

    () => {

      return initCamera();

    }, []

  )

  const labelRenderer = React.useMemo( 
    () => {
  
      return initLabelRenderer();

    }, []

  )

  const lineScene = React.useMemo( 
    () => {

      return initLines( scene );

    }, []

  )

  //Настройка рендера
  const renderer = React.useMemo( 
    () => {

      return initRender(); 

    }, []
  )

  //Настройка вращения камеры
  const controls = React.useMemo( 

    () => {

      return initControls( camera, labelRenderer );

    }, []
  )

  const changeVisibleLine = () => {

    let status = false, opacity = 1;

    if ( visibleLine ){

      status = false; opacity = 0;
      
      setVisibleLine( false );

    } else {

      status = true; opacity = 1;

      setVisibleLine( true );
    }

    lineScene.width.main.obj.visible = status;
    lineScene.width.main.labelDiv.style.opacity = opacity;
    lineScene.width.first.visible = status;
    lineScene.width.second.visible = status;

    lineScene.height.main.obj.visible = status;
    lineScene.height.main.labelDiv.style.opacity = opacity;
    lineScene.height.first.visible = status;
    lineScene.height.second.visible = status;

    lineScene.depth.main.obj.visible = status;
    lineScene.depth.main.labelDiv.style.opacity = opacity;
    lineScene.depth.first.visible = status;
    lineScene.depth.second.visible = status;

  }

  const moveAllElements = ( total ) => {

    const isIncrease = ( total ) => {
      //Уменьшили
      if ( total.oldWidth > total.width ){
        return false;
      }else {
        return true;
      }
    }

    const getDimension = ( total ) => {

      if ( Math.abs((( total.width - 20 ) + total.minPointX)) !== Math.abs( total.minPointX ) ) {

        //Если правая сторона больше
        if ( Math.abs((( total.width - 20 ) + total.minPointX)) > Math.abs( total.minPointX) ){
          // console.log( 'Правая больше' );
          return -1 * ( (total.width)/2 - (Math.abs(total.minPointX)+10) );
        }else{ //Левая сторона больше
           // console.log( 'Левая больше' );
          return -1 * ( (total.width)/2 - (Math.abs(total.minPointX)+10) );
        }

      } else {
        return 0;
      }
    }

    const DIMENSION = getDimension( total );

    // console.log( 'DIMENSION: ' + DIMENSION );

    if ( DIMENSION !== 0 && String(DIMENSION) !== 'NaN' ){

      const states = [
        {
          state : elemsPanelsState,
          stateNew : [],
          callback :  setElemsPanelsState,
        },
        {
          state : elemsProfilesState,
          stateNew : [],
          callback :  setElemsProfilesState,
        },
        {
          state : elemsFingersState,
          stateNew : [],
          callback :  setElemsFingersState,
        },
        {
          state : elemsLegsState,
          stateNew : [],
          callback :  setElemsLegsState,
        },
        {
          state : elemsOtherState,
          stateNew : [],
          callback :  setElemsOtherState,
        },
        {
          state : elemsGroupElementsState,
          stateNew : [],
          callback :  setElemsGroupElementsState,
        },
        {
          state : elemsPanelsOtherState,
          stateNew : [],
          callback :  setElemsPanelsOtherState,
        },
        
      ];

      states.forEach( ( item ) => {

        let _state = [ ...item.state ].map( (obj) => {

          let _elem = obj.elem;

          let objParams = obj.params; 

          let dimensionX = _elem.position.x + DIMENSION/100;
          let paramsX = objParams.positionX + DIMENSION;

          let direction = -1, dir = 0.25;;
         
          if ( isIncrease( total ) ){
            direction = 1;
          }

          if( obj.type === 'furn' ){

            if ( obj.name !== 'Vase' ){

              dimensionX = _elem.position.x + direction * ( Math.abs(DIMENSION)/100 + dir );
              paramsX = objParams.positionX + direction * ( Math.abs(DIMENSION) + dir * 100 );

            } else {

              dimensionX = _elem.position.x -1 * direction * ( Math.abs(DIMENSION)/100 + dir );
              paramsX = objParams.positionX -1 * direction * ( Math.abs(DIMENSION) + dir * 100 );

            }

          }

          if ( obj.name === 'Carpet' ){
            dimensionX = _elem.position.x;
            paramsX = objParams.positionX;
          }

          new TWEEN.Tween( _elem.position )
            .to({
              x: dimensionX,
              y: _elem.position.y,
              z: _elem.position.z,
            }, 500)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate(() => controls.update() )
            .start()

          
          objParams.positionX = paramsX;

          return { ...obj, params : objParams };

        } )

        item.stateNew = _state;

      } )

      states.forEach( ( item ) => {

        item.callback( [ ...item.stateNew ] );

      } )

    }

  }

  const moveCameraAndScene = ( total, controls, camera ) => {

    const isIncrease = ( total ) => {
      //Уменьшили
      if ( total.oldWidth > total.width ){
        return false;
      }else {
        return true;
      }
    }

    const getDimension = ( total ) => {

      if ( Math.abs((( total.width - 20 ) + total.minPointX)) !== Math.abs( total.minPointX ) ) {

        //Если правая сторона больше
        if ( Math.abs((( total.width - 20 ) + total.minPointX)) > Math.abs( total.minPointX) ){
          // console.log( 'Правая больше' );
          return -1 * ( (total.width)/2 - (Math.abs(total.minPointX)+10) );
        }else{ //Левая сторона больше
           // console.log( 'Левая больше' );
          return -1 * ( (total.width)/2 - (Math.abs(total.minPointX)+10) );
        }

      } else {
        return 0;
      }
    }

    const DIMENSION = getDimension( total );

    // console.log( total );

    // console.log( DIMENSION );

    if ( String(DIMENSION) !== 'NaN' ){
      new TWEEN.Tween( controls.target )
        .to({
          x: -1 * DIMENSION/100,
          y: controls.target.y,
          z: controls.target.z,
        }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(() => controls.update() )
        .start()

      if ( total.oldWidth !== total.width ){

        new TWEEN.Tween( camera.position )
          .to({
            x: camera.position.x - DIMENSION/100,
            y: camera.position.y,
            z: camera.position.z,
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(() => controls.update() )
          .start()

      }

    } 

    const states = [
      {
        state : elemsPanelsOtherState,
        stateNew : [],
        callback :  setElemsPanelsOtherState,
      },
    ];

    states.forEach( ( item ) => {

      let _state = [ ...item.state ].map( (obj) => {

        let _elem = obj.elem;

        let dimensionX = 0;

        let objParams = obj.params;

        if ( obj.name === 'Vase' ){
          dimensionX = total.minPointX - 1500;
        } else if ( obj.name === 'Picture' ) {
          dimensionX = total.minPointX + total.width + 2600;
        } else if ( obj.name === 'Carpet' ) {
          dimensionX = total.minPointX + total.width/2 + 700;
        } else if ( obj.name === 'Torsher' ) {
          dimensionX = total.minPointX + total.width + 1200;
        } else if ( obj.name === 'Sofa' ) {
          dimensionX = total.minPointX + total.width + 2600;
        }

        let paramsX = dimensionX;

        new TWEEN.Tween( _elem.position )
          .to({
            x: dimensionX/100,
            y: _elem.position.y,
            z: _elem.position.z,
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(() => controls.update() )
          .start()

        
        objParams.positionX = paramsX;

        return { ...obj, params : objParams };

      } )

      item.stateNew = _state;

    } )

    states.forEach( ( item ) => {

      item.callback( [ ...item.stateNew ] );

    } )

  }

  const calcLineScene = ( total ) => {

    lineScene.width.main.labelDiv.textContent = total.width + ' мм';
    lineScene.height.main.labelDiv.textContent = total.height + ' мм';
    lineScene.depth.main.labelDiv.textContent = total.depth + ' мм';

    new TWEEN.Tween( lineScene.width.main.obj.scale )
      .to({
        x: total.width/600,
        y: 1,
        z: 1,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.width.main.obj.position )
      .to({
        x: total.minPointX/100 + (total.width/100)/2 - 0.1,
        y: ( (total.height) - 100 )/100,
        z: lineScene.width.main.obj.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.width.first.position )
      .to({
        x: total.minPointX/100,
        y: ( (total.height) - 100 )/100,
        z: lineScene.width.first.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.width.second.position )
      .to({
        x: total.minPointX/100 + ( (total.width -20 ) )/100,
        y: ( (total.height) - 100 )/100,
        z: lineScene.width.second.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.height.main.obj.scale )
      .to({
        x: 1,
        y: total.height/600,
        z: 1,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.height.main.obj.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: ( (total.height) / 2 - 300 )/100,
        z: lineScene.height.main.obj.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.height.first.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: lineScene.height.first.position.y,
        z: lineScene.height.first.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.height.second.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: ( (total.height-20) - 300 )/100,
        z: lineScene.height.second.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.depth.main.obj.scale )
      .to({
        x: total.depth/600,
        y: 1,
        z: 1,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.depth.main.obj.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: lineScene.depth.main.obj.position.y,
        z: ( (total.depth) / 2 - 300 )/100,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.depth.first.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: lineScene.depth.first.position.y,
        z: ( (total.depth - 20) - 300)/100,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

    new TWEEN.Tween( lineScene.depth.second.position )
      .to({
        x: total.minPointX/100 - 2.3,
        y: lineScene.depth.second.position.y,
        z: lineScene.depth.second.position.z,
      }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onUpdate(() => controls.update() )
      .start()

  }

  React.useEffect( () => {

    setTimeout( () => {

      // moveAllElements( totalParams );
      moveCameraAndScene( totalParams, controls, camera );

    }, 10 );

  }, [ triggerMoveChanger ] )

  function resetMaterials () {

    for ( let i = 0; i < scene.children.length; i ++ ) {
      
      scene.children[i].traverse ( ( obj ) => {

        if (obj.isMesh) {

          obj.material.transparent = true;

          if ( scene.children[i].userData.defaultColor ) {

            if ( currentElement.length ){

              let index = currentElement.findIndex( item => item && scene.children[i].id === item.id );

              if ( index !== -1 ){
                obj.material.color.setHex( '0xff0000' );
                obj.material.opacity = 0.1;
              }else{
                obj.material.color.setHex( scene.children[i].userData.defaultColor );
              }

            }else{
              obj.material.color.setHex( scene.children[i].userData.defaultColor );
            }
            
          }

          if ( obj.userData.type === 'door' ){

            new TWEEN.Tween( obj.rotation )
            .to({
              x: obj.userData.defaultParams.rotation.x,
              y: obj.userData.defaultParams.rotation.y,
              z: obj.userData.defaultParams.rotation.z,
            }, 750)
            //.delay (1000)
            .easing(TWEEN.Easing.Cubic.Out)

            .onUpdate(() => controls.update() )

            .start()

            new TWEEN.Tween( obj.position )
            .to({
              z: 0,
              x: 0,
              y: 0,
            }, 750)
            //.delay (1000)
            .easing(TWEEN.Easing.Cubic.Out)

            .onUpdate(() => controls.update() )

            .start()

          }    

          if ( obj.userData.type === 'box' ){

            new TWEEN.Tween( obj.position )
            .to({
              ...obj.position,
              z: 0,
            }, 750)
            //.delay (1000)
            .easing(TWEEN.Easing.Cubic.Out)

            .onUpdate(() => controls.update() )

            .start()

          }

          if ( scene.children[i].userData.type === 'ceil' ){

            if ( currentElement.length ){

              let index = currentElement.findIndex( item => item && scene.children[i].id === item.id );

              if ( index !== -1 ){
                obj.material.opacity = 0.8;
              }else{
                obj.material.opacity = 0;
              }

            }else{

              obj.material.opacity = 0;

            }

          } else {
             obj.material.opacity = 1;
          }

        }

      });

    }

  }

  function isElementByName ( name ) {

    if(  name !== 'wall' 
      && name !== 'plinth' 
      && name !== 'carpet' 
      && name !== 'man'
      && name !== 'roof'
      && name !== 'Sofa'
      && name !== 'Torsher'
      && name !== 'Picture'
      && name !== 'Vase'
      && name !== 'Carpet'
    ){

      return true; 

    } else{
      return false;
    }

  } 

  function rayCasterMaterials () {

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ){

      let i = 0;

      if ( 
        intersects[ i ].object.userData.type === 'ceil' &&
        intersects[ i ].object.visible === false ){
        i = 1;
      }

      if ( Object.keys(intersects[ i ].object.userData).length ){

        intersects[ i ].object.traverse ( ( obj ) => {

          if (obj.isMesh) {

            if ( isElementByName( obj.userData.name ) ){

              obj.material.color.setHex( 0xff0000 );
              obj.material.transparent = false;
              obj.material.opacity = 1;
              // obj.material.visible = false;
              
            }

            if ( obj.userData.type === 'door' ){

              new TWEEN.Tween( obj.rotation )
              .to({
                x: obj.userData.hoverParams.rotation.x,
                y: obj.userData.hoverParams.rotation.y,
                z: obj.userData.hoverParams.rotation.z,
              }, 750)
              //.delay (1000)
              .easing(TWEEN.Easing.Cubic.Out)

              .onUpdate(() => controls.update() )

              .start()

              new TWEEN.Tween( obj.position )
              .to({
                x: obj.userData.hoverParams.position.x,
                y: obj.userData.hoverParams.position.y,
                z: obj.userData.hoverParams.position.z,
              }, 750)
              //.delay (1000)
              .easing(TWEEN.Easing.Cubic.Out)

              .onUpdate(() => controls.update() )

              .start()

            }
            if ( obj.userData.type === 'box' ){

              new TWEEN.Tween( obj.position )
              .to({
                ...obj.position,
                z: obj.userData.hoverParams.position.z,
                // x: obj.userData.hoverParams.position.x,
                // y: obj.userData.hoverParams.position.y,
              }, 750)
              //.delay (1000)
              .easing(TWEEN.Easing.Cubic.Out)

              .onUpdate(() => controls.update() )

              .start()

            }

          }

        });

      }
    }  

  }

  function openModelAR() {

    setModelAR( true );

    exportGLTFandSave([
      ...elemsProfilesState.map( (item) => { return item.elem; }  ),
      ...elemsFingersState.map( (item) => { return item.elem; }  ),
      ...elemsPanelsState.map( (item) => { return item.elem; }  ),
      ...elemsLegsState.map( (item) => { return item.elem; }  ),
      ...elemsOtherState.map( (item) => { return item.elem; }  ),
    ]);

  }

  function closeModelAR() {

    setModelAR( false );

  }

  function endNotifications ( data ){

    dispatch( setNotificationsAction( {
      ...notifications,
      show : false,
    } ));

    setTimeout( () => {
      dispatch( setNotificationsAction( {
        header : data.header,
        description : data.description,
        type : data.type,
        show : true,
      } ));

      setTimeout( () => {

        dispatch( setNotificationsAction( {
          ...notifications,
          show : false,
        } ));

      }, 3000 );

    }, 300 );

  }

  function save( blob, filename ) {

    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();

  }

  function saveArrayBuffer( buffer, filename ) {

    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

  }

  function saveString( text, filename ) {

    save( new Blob( [ text ], { type: 'text/plain' } ), filename );

  }

  function getArrayBuffer( buffer, filename ) {

    return URL.createObjectURL( new Blob( [ buffer ], { type: 'application/octet-stream' } ) );

  }

  function exportGLTF( input ) {

    const gltfExporter = new GLTFExporter();

    const params = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: true,
      maxTextureSize: 256,
    };

    const options = {
      trs: params.trs,
      onlyVisible: params.onlyVisible,
      truncateDrawRange: params.truncateDrawRange,
      binary: params.binary,
      maxTextureSize: params.maxTextureSize
    };

    gltfExporter.parse(
      input,
      function ( result ) {

        if ( result instanceof ArrayBuffer ) {

          saveArrayBuffer( result, 'scene.glb' );

        } else {

          const output = JSON.stringify( result, null, 2 );
          // console.log( output );
          saveString( output, 'scene.gltf' );

        }

      },
      function ( error ) {

        // console.log( 'An error happened during parsing', error );

      },
      options
    );

  }

  function exportGLTFandSave( input ) {

    const gltfExporter = new GLTFExporter();

    const params = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: true,
      maxTextureSize: 256,
    };

    const options = {
      trs: params.trs,
      onlyVisible: params.onlyVisible,
      truncateDrawRange: params.truncateDrawRange,
      binary: params.binary,
      maxTextureSize: params.maxTextureSize
    };

    gltfExporter.parse(
      input,
      function ( result ) {

        if ( result instanceof ArrayBuffer ) {
 
          let _fileAR = new File( [ new Blob( [ result ], { type: 'application/octet-stream' } ) ], 'model.glb' );
         
          saveConstructorDataAction( _fileAR );

        } else {

          const output = JSON.stringify( result, null, 2 );

          saveString( output, 'scene.gltf' );

        }

      },
      function ( error ) {

        // console.log( 'An error happened during parsing', error );

      },
      options
    );

  }

  function createARmodel(){

    exportGLTF( [
      ...elemsProfilesState.map( (item) => { return item.elem; }  ),
      ...elemsFingersState.map( (item) => { return item.elem; }  ),
      ...elemsPanelsState.map( (item) => { return item.elem; }  ),
      ...elemsLegsState.map( (item) => { return item.elem; }  ),
      ...elemsOtherState.map( (item) => { return item.elem; }  ),
    ] ) ;  

  }

  //Событие по наведению на любой объект на сцене 
  function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    resetMaterials();

    rayCasterMaterials();

  }

  //Событие по клику на любой объект на сцене
  function onClickMove( event ) {

    onPointerMove( event );

    pointer2.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer2.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster2.setFromCamera( pointer2, camera );

    const intersects = raycaster2.intersectObjects( scene.children );

    if ( intersects.length > 0 ){

      let i = 0;

      if ( 
        intersects[ i ].object.userData.type === 'ceil' &&
        intersects[ i ].object.visible === false ){
        i = 1;
      }

      if ( isElementByName( intersects[ i ].object.userData.name ) ){

        let obj = null;

        if ( obj === null ){
          obj = findObjById( 
            intersects[ i ].object.id - 2,
            elemsProfilesState, elemsFingersState, elemsPanelsState, elemsOtherState, elemsLegsState
          );
        }

        if ( obj === null ){
          obj = findObjById( 
            intersects[ i ].object.id - 1,
            elemsProfilesState, elemsFingersState, elemsPanelsState, elemsOtherState, elemsLegsState
          );
        }

        if ( obj === null ){
          obj = findObjByDefaultId( 
            intersects[ i ].object.userData.drimoID,
            elemsProfilesState, elemsFingersState, elemsPanelsState, elemsGroupElementsState, elemsOtherState, elemsLegsState
          );
        }


        let objs = [ obj ]; 

        let enter = true;

        // if ( currentSelectionState === 5 && ( obj.type === 'box' || obj.type === 'door' ) ){
        //   enter = false;
        // }

        // if ( currentSelectionState === 3 && obj.type !== 'ceil' ){
        //   enter = false;
        // }

        if ( obj !== null && enter ){

          if ( pressShift ){

            let index = currentElement.findIndex( (item) => item.id === obj.id );

            if ( index === -1 ){

              if ( currentElement[0].type === objs[0].type ){
                objs = [...currentElement,  ...objs ]; 
              }else{
                objs = [...currentElement ]; 
              }

            }else{

              let _currentElement = currentElement;

              delete _currentElement[index];

              objs = _currentElement.filter(Boolean); 

            }
           
          }

          if( currentModeEditorState === null ){

            showSettingElem( objs );

          }else if ( currentModeEditorState === 'PUT' ){

            addElemToScene( objs, intersects[ i ], currentCeilState );

          }

          dispatch( setCurrentElementAction( objs ) );

        }
      }
    }    

  }

  const updateCameraPosition = ( action ) => {

    let timeStamp = 750, decrementValue = 0.5, incrementValue = 1.5;

    if ( action === 'increment' ){

      new TWEEN.Tween( camera.position )
        .to({
            x: camera.position.x * incrementValue,
            y: camera.position.y * incrementValue,
            z: camera.position.z * incrementValue,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

    } else if ( action === 'decrement' ){

      new TWEEN.Tween( camera.position )
        .to({
            x: camera.position.x * decrementValue,
            y: camera.position.y * decrementValue,
            z: camera.position.z * decrementValue,
        }, timeStamp)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)

        .onUpdate(() => controls.update() )

        .start()

    }

  } 

  const prevHistory = () => {

    console.log('Назад!');

    let _stackHistory = stackHistory;
    let needIndex = _stackHistory.length-1;

    let findEnd = false, i = _stackHistory.length, deltaIndex = 0; 

    while ( !findEnd ) {

      i = i - 1;

      let _moment = _stackHistory[i];

      // console.log( 'i: ' + i );

      if ( _moment.action.type === 'CHANGE' || _moment.action.type === 'NEXT' ){

        console.log( 'CHANGE or NEXT is finded');

        findEnd = true;

        deltaIndex = (_stackHistory.length-1) - i;

      }
      if ( i === 0 ){

        findEnd = true;

      }

    }

    needIndex = needIndex - deltaIndex*2;

    console.log( needIndex, deltaIndex );

    let moment = _stackHistory[needIndex];

    //Так как событие НАЗАД, то нужно инвертировать самое событие.
    let _response = {      
      push : {
        panels : moment.action.response.DELETE.panels.map( (item) => { return item.original; } ),
        profiles : moment.action.response.DELETE.profiles.map( (item) => { return item.original; } ),
        fingers : moment.action.response.DELETE.fingers.map( (item) => { return item.original; } ),
        legs : moment.action.response.DELETE.legs.map( (item) => { return item.original; } ),
        ceils : moment.action.response.DELETE.ceils.map( (item) => { return item.original; } ),
        others : moment.action.response.DELETE.others.map( (item) => { return item.original; } ),
      },
      remove: {
        panels : moment.action.response.PUT.panels.map( (item) => { return item.elem; } ),
        profiles : moment.action.response.PUT.profiles.map( (item) => { return item.elem; } ),
        fingers : moment.action.response.PUT.fingers.map( (item) => { return item.elem; } ),
        legs : moment.action.response.PUT.legs.map( (item) => { return item.elem; } ),
        ceils : moment.action.response.PUT.ceils.map( (item) => { return item.elem; } ),
        others : moment.action.response.PUT.others.map( (item) => { return item.elem; } ),
      }
    }

    pusherChanges( _response, 'PREV' );

  }

  const nextHistory = () => {

    console.log('Вперед!');

    let _stackHistory = stackHistory;
    let needIndex = _stackHistory.length-1;

    let findEnd = false, i = _stackHistory.length, deltaIndex = 0; 

    while ( !findEnd ) {

      i = i - 1;

      let _moment = _stackHistory[i];

      console.log( 'i: ' + i );

      if ( _moment.action.type === 'PREV' ){

        console.log( 'PREV is finded');

        findEnd = true;

        deltaIndex = (_stackHistory.length-1) - i;

      }
      if ( i === 0 ){

        findEnd = true;

      }

    }

    needIndex = needIndex - deltaIndex*2;

    console.log( needIndex, deltaIndex );

    let moment = _stackHistory[needIndex];

    //Так как событие НАЗАД, то нужно инвертировать самое событие.
    let _response = {      
      push : {
        panels : moment.action.response.DELETE.panels.map( (item) => { return item.original; } ),
        profiles : moment.action.response.DELETE.profiles.map( (item) => { return item.original; } ),
        fingers : moment.action.response.DELETE.fingers.map( (item) => { return item.original; } ),
        legs : moment.action.response.DELETE.legs.map( (item) => { return item.original; } ),
        ceils : moment.action.response.DELETE.ceils.map( (item) => { return item.original; } ),
        others : moment.action.response.DELETE.others.map( (item) => { return item.original; } ),
      },
      remove: {
        panels : moment.action.response.PUT.panels.map( (item) => { return item.elem; } ),
        profiles : moment.action.response.PUT.profiles.map( (item) => { return item.elem; } ),
        fingers : moment.action.response.PUT.fingers.map( (item) => { return item.elem; } ),
        legs : moment.action.response.PUT.legs.map( (item) => { return item.elem; } ),
        ceils : moment.action.response.PUT.ceils.map( (item) => { return item.elem; } ),
        others : moment.action.response.PUT.others.map( (item) => { return item.elem; } ),
      }
    }

    pusherChanges( _response, 'NEXT' );

  }

  const zoomCameraIncrement = () => {

    updateCameraPosition( 'increment' );

  }

  const zoomCameraDecrement = () => {

    updateCameraPosition( 'decrement' );

  }

  function getExportGLTF( input ) {

    const gltfExporter = new GLTFExporter();

    const params = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: true,
      maxTextureSize: 256,
    };

    const options = {
      trs: params.trs,
      onlyVisible: params.onlyVisible,
      truncateDrawRange: params.truncateDrawRange,
      binary: params.binary,
      maxTextureSize: params.maxTextureSize
    };

    let promise = new Promise((resolve, reject) => {

      gltfExporter.parse(
        input,
        function ( result ) {

          if ( result instanceof ArrayBuffer ) {

            resolve( URL.createObjectURL( new Blob( [ result ] ) ) );

          } else {

            const output = JSON.stringify( result, null, 2 );

            resolve( new File( [ new Blob( [ output ], { type: 'text/plain' } ) ], 'model.gltf' ) );

          }

        },
        function ( error ) {

          // console.log( 'An error happened during parsing', error );

        },
        options
      );

    });

    return promise

  }

  async function getFileModelAsync ( input ) {

    const response = await getExportGLTF( input );

    return response;

  } 

  const createPreviewWithCallback = ( callback ) => {

    const sceneSnapshot = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );

    // sceneSnapshot.add( cube );

    const light = new THREE.AmbientLight( 0xffffff, 1.4 ); 
    sceneSnapshot.add( light );

    const light2 = new THREE.PointLight( 0xffffff, 0.5 );
    light2.position.set( 100, 100, 100 );
    light2.shadow.mapSize.width = 4096;
    light2.shadow.mapSize.height = 4096;
    light2.castShadow = true;
    sceneSnapshot.add( light2 );

    renderer.setClearColor( 0xffffff, 1 );

    getFileModelAsync( [
      ...elemsProfilesState.map( (item) => { return item.elem; }  ),
      ...elemsFingersState.map( (item) => { return item.elem; }  ),
      ...elemsPanelsState.map( (item) => { return item.elem; }  ),
      ...elemsLegsState.map( (item) => { return item.elem; }  ),
      ...elemsOtherState.map( (item) => { return item.elem; }  ),
    ]  ).then( (resp) => {

      loaderGLTF.load( resp, function ( gltf ) {

        new TWEEN.Tween( camera.position )
          .to({
            x: -25,
            y: 10,
            z: 75,
          }, 750)
          //.delay (1000)
          .easing(TWEEN.Easing.Cubic.Out)

          .onUpdate(() => controls.update() )

          .start()

        setTimeout( () => {

          let entity = gltf.scene;

          entity.traverse ( ( obj ) => {

            if (obj.isMesh) {
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
            
          } );

          // entity.position.y = -config.distY;

          sceneSnapshot.add( entity );

          camera.aspect = window.innerHeight / window.innerHeight;

          camera.updateProjectionMatrix();


          renderer.setSize( window.innerHeight, window.innerHeight );

          renderer.render( sceneSnapshot, camera );

          const base64_img = renderer.domElement.toDataURL( 'image/png' );

          let fileImg = dataURLtoFile( base64_img , 'preview.png');

          // saveAs( base64_img, 'drimo_screenshot.png' );

          callback( fileImg );

          camera.aspect = window.innerWidth / window.innerHeight;

          camera.updateProjectionMatrix();

          renderer.setSize( window.innerWidth, window.innerHeight );

        }, 751 )

      });

    } );

  }

  const takeSnapshot = () => {   

    new TWEEN.Tween( camera.position )
      .to({
        x: -25,
        y: 10,
        z: 100,
      }, 750)
      //.delay (1000)
      .easing(TWEEN.Easing.Cubic.Out)

      .onUpdate(() => controls.update() )

      .start()

    setTimeout( () => {

      renderer.render( scene, camera );

      const dataURL = renderer.domElement.toDataURL( 'image/png' );

      saveAs( dataURL, 'drimo_screenshot.png' );

    }, 751 )

  }

  const createSolutionToElements = ( solution_id, redirect = false ) => {

    console.log( 'solution_id: ' + solution_id );

    //Здесь мы будем добавлять все детали к решению
    let solutionsToElementsArray = [];

    [ elemsProfilesState, elemsFingersState, elemsPanelsState, elemsLegsState, elemsOtherState ].forEach( (state) => {

      state.forEach( ( elem ) => {

        let elementToTextureID = elem.elementToTextureID;

        if ( elementToTextureID > 0 ){

          let index = solutionsToElementsArray.findIndex( ( item ) => item.element2texture_id === elementToTextureID );

          //Если такое уже существует, то мы должны прибавить к кол-во плюс один
          if( index !== -1 ){
            solutionsToElementsArray[index].quantity += 1;
          }else{ // Создать новый

            solutionsToElementsArray.push( {
              element2texture_id : elementToTextureID,
              quantity : 1,
            } )

          }

        }

      } )

    } )

    let amountWhile = solutionsToElementsArray.length;
    let countWhile = 0;

    if ( amountWhile === 0 ){
      setTimeout( () => {
        if ( redirect ){
          console.log( 'Редирект' )
          window.location.href = redirect;
        }
      }, 2000 )
    }

    solutionsToElementsArray.forEach( ( item ) => {

      API.post(
        'solution2element', 
        {
          'element2texture_id' : item.element2texture_id, 
          'solution_id' : solution_id,
          'quantity' : item.quantity,
        }
        
      ).then( ( resp ) => {

        countWhile += 1;
        if ( amountWhile === countWhile ){
          setTimeout( () => {
            if ( redirect ){
              window.location.href = redirect;
            }
          }, 2000 )
        }
        
      }).catch( err => {

        console.log( err );

        countWhile += 1;

        if ( amountWhile === countWhile ){
          setTimeout( () => {
            
            if ( redirect ){
              window.location.href = redirect;
            }
            
          }, 2000 )
        }

      });

    } )

  }

  const userIsAuthorized = () => {

    if ( Number( getCookie('userId')) > 0 ) {
      return true; 
    }
    return false;

  }

  const orderConstructorDataAction = () => {

    const startAction = () => {

      dispatch( setNotificationsAction( {
        header : 'Загрузка',
        description : 'Подождите, мы собираем заказ для вашей конструкции.',
        type : 'LOADING',
        show : true,
      } ));

      setDisabledOrder( true ); 

      let linkRedirect = baseURL + 'new_order?solution_id=';

      let userId = 1, apiToken = '';

      if ( Number(getCookie('userId')) > 0 ){

        userId = Number(getCookie('userId'));

      }

      if( getCookie('apiToken') !== '' ){
        apiToken = getCookie('apiToken');
      }

      let constructorData = packElemsToSave();

      // console.log( constructorData );

      const callbackOrder = ( fileImg ) => {

        constructorData = JSON.stringify( constructorData );   
        localStorage.setItem('constructorData', constructorData);

        let blob = new Blob( [constructorData], {type: "text/plain;charset=utf-8"});

        let file = new File( [blob], "file.txt" );

        let image = fileImg;

        let formData = new FormData();

        // console.log( savedData );

        //Если что-то есть, значит мы сохраняем уже созданное решение
        if ( savedData ){

          formData.append('title', totalNameStore);
          formData.append('image', image);
          formData.append('file', file);

          formData.append('subcategory_id', 2);
          formData.append('length', savedData.length);
          formData.append('height', savedData.height);
          formData.append('width', savedData.width);
          formData.append('weight', savedData.weight);

          formData.append('user_id', userId );

          API.patch(
            'solution/'+savedData.id, 
            formData,  
            { 
              headers : { 
                'Content-type' : 'multi-part/form-data'
              } 
            } 
          ).then( ( resp ) => {

            // console.log( resp ); 

            if ( resp && resp.data && resp.data.solution_id ){

              linkRedirect += resp.data.solution_id;

              // На этом моменте нужно собрать все детали и привязать к созданному решению.
              createSolutionToElements( resp.data.solution_id, linkRedirect );

              // window.location.href = linkRedirect;

            }else{
              // console.log('Ошибка');
            }

          }).catch( err => {

            console.log( err );

          });

        }else{ //Создаем новое

          formData.append('title', totalNameStore);
          formData.append('image', image);
          formData.append('file', file);

          formData.append('subcategory_id', 2);
          formData.append('length', totalParams.depth);
          formData.append('height', totalParams.height);
          formData.append('width', totalParams.width);
          formData.append('weight', totalParams.weight);

          formData.append('user_id', userId);

          let _savedData = { 
            id : 0,
            name : totalNameStore,
            length : totalParams.depth,
            height : totalParams.height,
            width : totalParams.width,
            weight : totalParams.weight,
          }

          API.post(
            'solution', 
            formData,  
            { 
              headers : { 
                'Content-type' : 'multi-part/form-data'
              } 
            } 
          ).then( ( resp ) => {

            // console.log( resp ); 

            if ( resp && resp.data && resp.data.solution_id ){

              _savedData.id = resp.data.solution_id;

              API.post( 
                'saved', 
                {
                  solution_id : resp.data.solution_id,
                },
                {
                  headers: {
                    'Authorization': 'Bearer '+apiToken,
                    'ID' : userId,
                  },
                }
              ).then( (respSaved) => {

                console.log(respSaved);

              } ).catch( (err) => {

                console.log(err);

              })

              setSavedData( _savedData );

              linkRedirect += resp.data.solution_id;

              createSolutionToElements( resp.data.solution_id, linkRedirect );

              // window.location.href = linkRedirect;

            }else{
              console.log('Ошибка');
            }

          }).catch( err => {

            console.log( err );

          });

        }

      }

      try{

        createPreviewWithCallback( callbackOrder )
        
      }catch ( error ){

        console.log( error );
      }

    }

    if ( userIsAuthorized() ){

      startAction();

    } else {

      dispatch(setSaveAndOrderAction( {
        type : 2,
        status : false,
      } ));

      dispatch( setModalLoginAuthAction( true ) );

    }

  }

  const packElemsToSave = () => {

    let _elemsProfilesState = elemsProfilesState.map( (item) => {
      if ( item.id ){
        return {
          id : item.id,
          name : item.name,
          type : item.type,
          params : item.params,
          textureId : item.textureId,
        }
      }
    } ).filter(Boolean);

    let _elemsFingersState = elemsFingersState.map( (item) => {
      if ( item.id ){
        return {
          id : item.id,
          name : item.name,
          type : item.type,
          params : item.params,
          textureId : item.textureId,
        }
      }
    } ).filter(Boolean);

    let _elemsPanelsState = elemsPanelsState.map( (item) => {

      if ( item.id ){
        return {
          id : item.id,
          name : item.name,
          type : item.type,
          params : item.params,
          textureId : item.textureId,
        }
      }
    } ).filter(Boolean);

    let _elemsLegsState = elemsLegsState.map( (item) => {

      if ( item.id ){

        return {
          id : item.id,
          name : item.name,
          type : item.type,
          params : item.params,
          textureId : item.textureId,
        }

      }
      
    } ).filter(Boolean);

    let _elemsGroupElementsState = elemsGroupElementsState.map( (item) => {
      if ( item.id ){
        return {
          id : item.id,
          name : item.name,
          type : item.type,
          merge : item.merge,
          grid : item.grid,
          connect : item.connect,
          params : item.params,
          chars : item.chars,
          textureId : item.textureId,
        }
      }
      
    } ).filter(Boolean);

    let _elemsOtherState = elemsOtherState.map( (item) => {
      if ( item.id ){
        return {
          id : item.id,
          name : item.name,
          type : item.type,
          params : item.params,
          textureId : item.textureId,
        }
      }
      
    } ).filter(Boolean);

    return { 
      elemsProfiles : _elemsProfilesState,
      elemsFingers : _elemsFingersState,
      elemsPanels : _elemsPanelsState,
      elemsLegs : _elemsLegsState,
      elemsGroupElements : _elemsGroupElementsState,
      elemsOther : _elemsOtherState,
    };;

  }

  const dataURLtoFile = (dataurl, filename) =>  {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

  const saveConstructorDataAction = ( fileAR ) => {

    const startAction = () => {

      dispatch( setNotificationsAction( {
        header : 'Загрузка',
        description : 'Подождите, мы сохраняем для Вас конструкцию.',
        type : 'LOADING',
        show : true,
      } ));

      setLinkToModel( '' );

      let userId = 0, apiToken = '';

      console.log( Number(getCookie('userId')) );

      if ( Number(getCookie('userId')) > 0 ){
        userId = Number(getCookie('userId'));
      }

      if( getCookie('apiToken') !== '' ){
        apiToken = getCookie('apiToken');
      }

      let constructorData = packElemsToSave();

      try{

        constructorData = JSON.stringify( constructorData );   
        localStorage.setItem('constructorData', constructorData);

        let blob = new Blob( [constructorData], {type: "text/plain;charset=utf-8"});

        let file = new File( [blob], "file.txt" );

        const callbackSave = ( fileImg ) => {

          let image = fileImg;

          let formData = new FormData();

          //Если что-то есть, значит мы сохраняем уже созданное решение
          if ( savedData ){

            formData.append('title', totalNameStore);
            formData.append('image', image);
            formData.append('file', file);

            formData.append('subcategory_id', 2);
            formData.append('length', savedData.length);
            formData.append('height', savedData.height);
            formData.append('width', savedData.width);
            formData.append('weight', savedData.weight);
            formData.append('user_id', userId );

            if ( fileAR ){
              formData.append('ar_file', fileAR);
            }

            API.patch(
              'solution/'+savedData.id, 
              formData,  
              { 
                headers : { 
                  'Content-type' : 'multi-part/form-data'
                } 
              } 
            ).then( ( resp ) => {

              if ( resp.data.solution_id ){

                endNotifications({
                  header : 'Успешно',
                  description : 'Конструкция сохранилась',
                  type : 'SUCCESS',
                })
                
                createSolutionToElements( resp.data.solution_id );
                setLastData( true );
              }

              if ( fileAR ){

                if ( resp.data.solution_id ){

                  API.get( 'solution/'+resp.data.solution_id ).then( (response) => {
                    
                    let respJson =  JSON.parse(response.data.ar_file)

                    if ( respJson.src ){
                      setLinkToModel( respJson.src );
                    }

                  } ).catch( err => {
                    console.log( err ); 
                    setLinkToModel( 'error' );
                  } )

                }

              }

            }).catch( err => {

              setLinkToModel( 'error' );

              console.log( err );

              endNotifications({
                header : 'Ошибка!',
                description : 'Конструкция не удалось сохранить',
                type : 'ERROR',
              })

            });

          }else{ //Создаем новое

            formData.append('title', totalNameStore);
            formData.append('image', image);
            formData.append('file', file);

            formData.append('subcategory_id', 2);
            formData.append('length', totalParams.depth);
            formData.append('height', totalParams.height);
            formData.append('width', totalParams.width);
            formData.append('weight', totalParams.weight);

            let _savedData = { 
              id : 0,
              name : totalNameStore,
              length : totalParams.depth,
              height : totalParams.height,
              width : totalParams.width,
              weight : totalParams.weight,
            }

            if ( fileAR ){

              formData.append('ar_file', fileAR);

            }

            formData.append('user_id', userId);

            API.post(
              'solution', 
              formData,  
              { 
                headers : { 
                  'Content-type' : 'multi-part/form-data'
                } 
              } 
            ).then( ( resp ) => {

              // console.log( resp ); 

              if ( resp.data.solution_id ){

                _savedData.id = resp.data.solution_id;

                API.post( 
                  'saved', 
                  {
                    solution_id : resp.data.solution_id,
                  },
                  {
                    headers: {
                      'Authorization': 'Bearer '+apiToken,
                      'ID' : userId,
                    },
                  }
                ).then( (respSaved) => {

                  endNotifications({
                    header : 'Успешно',
                    description : 'Конструкция сохранилась',
                    type : 'SUCCESS',
                  })

                } ).catch( (err) => {

                  endNotifications({
                    header : 'Ошибка!',
                    description : 'Конструкция не удалось сохранить',
                    type : 'ERROR',
                  })

                  console.log(err);

                })

                setSavedData( _savedData );

                createSolutionToElements( resp.data.solution_id );

                setLastData( true );

              }

              if ( fileAR ){

                if ( resp.data.solution_id ){

                  API.get( 'solution/'+resp.data.solution_id ).then( (response) => {

                    // console.log( response.data.ar_file );

                    // console.log( response );

                    let respJson =  JSON.parse(response.data.ar_file)

                    if ( respJson.src ){
                      setLinkToModel( respJson.src );
                    }

                  } ).catch( err => {
                    console.log( err ); 
                    setLinkToModel( 'error' );
                  } )

                }

              }

            }).catch( err => {

              setLinkToModel( 'error' );

              console.log( err );

            });

          }

          // if ( !fileAR ){
          //   alert( 'Сохранение!' );
          // }

        }

        createPreviewWithCallback( callbackSave )

      }catch ( error ){

        console.log( error );
        // alert( 'Что-то пошло не так!' );

      }

    }

    if ( userIsAuthorized() ){

      startAction();

    } else {

      dispatch(setSaveAndOrderAction( {
        type : 1,
        status : false,
      } ));

      dispatch( setModalLoginAuthAction( true ) );

    }

  }

  React.useEffect( () => {

    if ( saveAndOrderAction.status ){

      if ( saveAndOrderAction.type === 1 ){ //Сохрание
        saveConstructorDataAction();
      } else if ( saveAndOrderAction.type === 2 ) { //Заказ
        orderConstructorDataAction();
      }

      dispatch(setSaveAndOrderAction( {
        type : 0,
        status : false,
      } ));

    }

  }, [ saveAndOrderAction ] );

  React.useEffect( () => {

    if ( saveNameMode === 3 ){
      dispatch( setSaveNameModeAction(0) );
      saveConstructorDataAction();
    } else if ( saveNameMode === 4 ) {
      dispatch( setSaveNameModeAction(0) );
      orderConstructorDataAction();
    }

  }, [ saveNameMode ] );

  function addElemToScene( elems, target, indexCeil ){

    console.log( elems );

    let elem = elems[0];

    console.log( elem, indexCeil );

    //Для ячейки
    if ( indexCeil === 0 ){

      if ( elem.type === 'panel' || elem.type === 'ceil' ){

        let states = {
          profiles : elemsProfilesState,
          fingers : elemsFingersState,
          panels : elemsPanelsState,
          legs : elemsLegsState,
          ceils : elemsGroupElementsState,
          ceilsGrid : globalCeilGrid,
        }

        //Получаем ответ
        let response = addNewCell( elem, target.face.normal, states );

        console.log( response );

        pusherChanges( response, 'CHANGE' ); 

      }else{
        console.log('Добавить Ячейку можно только к панели или другой ячейке');
      }

     //Для вертикальной панели
    } else if ( indexCeil === 1 ){
  
      if ( elem.type === 'profile' ){

        //Если профиль стандартного положения
        if (  elem.params.rotationX === 0 ){

          let params = { 
            ...elem.params,
            positionY : elem.params.positionY + ( (560/2) + 10 ), 
            rotationX: 0, 
            rotationY: 0, 
            rotationZ: 0,
          }

          //Если профиль горизонтальный
          if ( elem.params.rotationY === 0 ){

            params = { 
              ...params,
              positionY : elem.params.positionY + ( (560/2) + 10 ), 
              rotationX: 0, 
              rotationY: PI_90, 
              rotationZ: 0,
            }

          }

          let _obj = {
            id : 100,
            name : 'Panel_560x560',
            type : 'panel',
            params : params,
            textureId : 76,
          }

          let push = {
            push : {
              panels : [ _obj ],
            }
          }

          pusherChanges( push, 'CHANGE' );

        }

      }
    //Для горизонтальной панели
    } else if ( indexCeil === 2 ){ 

      if ( elem.type === 'profile' ){

        let type = "panel";

        let name = "Panel_560x560";

        let _id = 100;

        let elemID = elem.getDefaultId();

        let connect = {
          pX : null,
          pY : null,
          pZ : null,
          nX : null,
          nY : null,
          nZ : null,
        };

        let params = { 
          ...elem.params,
          positionZ : elem.params.positionZ + ( (560/2) + 10 ), 
          rotationX: PI_90, 
          rotationY: 0, 
          rotationZ: 0,
        }

        if (  elem.params.rotationX === 0 ){

          if ( elem.params.rotationY === 0 ){

            if ( camera.position.x > 0 ){

              connect = {
                ...connect,
                nX : elemID,
              }

              elem.setConnect({
                ...elem.connect,
                pX : _id,
              })

              params = { 
                ...params,
                positionZ : elem.params.positionZ,
                positionX : elem.params.positionX + ( (560/2) + 10 ), 
              }

            }else {

              connect = {
                ...connect,
                pX : elemID,
              }

              elem.setConnect({
                ...elem.connect,
                nX : _id,
              })

              params = { 
                ...params,
                positionZ : elem.params.positionZ,
                positionX : elem.params.positionX - ( (560/2) + 10 ), 
              }

            }

          }else{
            connect = {
              ...connect,
              nZ : elemID,
            }

            elem.setConnect({
              ...elem.connect,
              pZ : _id,
            })

          }

          console.log(params);

          let _obj = {
            id : 100,
            name : name,
            type : type,
            params : params,
            textureId : null,
          }

          let push = {
            push : {
              panels : [ _obj ],
            }
          }

          pusherChanges( push, 'CHANGE' );

        }

      }
    //Для вертикального профиля
    } else if ( indexCeil === 3 ){

      if ( elem.type === 'finger' ){

        let type = "profile";

        let name = "Profile_560";

        let _id = 100;

        let connect = {
          pX : null,
          pY : null,
          pZ : null,
          nX : null,
          nY : null,
          nZ : null,
        };

        let params = { 
          ...elem.params,
          positionY : elem.params.positionY + ( (560/2) + 10 ), 
          rotationX: PI_90, 
          rotationY: 0, 
          rotationZ: 0
        }

        let _obj = {
          id : 100,
          name : name,
          type : type,
          params : params,
          textureId : null,
        }

        let push = {
          push : {
            profiles : [ _obj ],
          }
        }

        pusherChanges( push, 'CHANGE' );

      }
      //Для горизотнального профиля
    } else if ( indexCeil === 4 ){

      if ( elem.type === 'finger' ){

        let type = "profile";

        let name = "Profile_560";

        let _id = 100;

        let connect = {
          pX : null,
          pY : null,
          pZ : null,
          nX : null,
          nY : null,
          nZ : null,
        };

        let params = { 
          ...elem.params,
          rotationX: 0, 
          rotationY: 0, 
          rotationZ: 0
        }

        if ( camera.position.x < -20 ){
          params = { 
            ...params,
            positionX : elem.params.positionX - ( (560/2) + 10 ), 

            rotationY: PI_90, 
          }
        }else if ( camera.position.x > 20 ) {
          params = { 
            ...params,
            positionX : elem.params.positionX + ( (560/2) + 10 ), 
            rotationY: PI_90, 
          }
        }else{
          params = { 
            ...params,
            positionZ : elem.params.positionZ + ( (560/2) + 10 ), 
            rotationY: 0, 
          }
        }

        let _obj = {
          id : 100,
          name : name,
          type : type,
          params : params,
          textureId : null,
        }

        let push = {
          push : {
            profiles : [ _obj ],
          }
        }

        pusherChanges( push, 'CHANGE' );

      }
    //Для вертикального каркаса
    } else if ( indexCeil === 5 ) {

      if ( elem.type === 'panel' ||  elem.type === 'ceil' ){

        let states = {
          profiles : elemsProfilesState,
          fingers : elemsFingersState,
          panels : elemsPanelsState,
          legs : elemsLegsState,
          ceils : elemsGroupElementsState,
          ceilsGrid : globalCeilGrid,
        }

        //Получаем ответ
        let response = addNewColumnCornice( elem, 4, states );

        console.log( response );

        pusherChanges( response, 'CHANGE' ); 

      }

    //Для горизонтального каркаса
    } else if ( indexCeil === 6 ) {

      let states = {
        profiles : elemsProfilesState,
        fingers : elemsFingersState,
        panels : elemsPanelsState,
        legs : elemsLegsState,
        ceils : elemsGroupElementsState,
        ceilsGrid : globalCeilGrid,
      }

      //Получаем ответ
      let response = addNewRowCornice( 4, states );

      console.log( response );

      pusherChanges( response, 'CHANGE' ); 

    } else if ( indexCeil === 7 ){

      if ( elem.type === 'ceil' ){

        let states = {
          others : elemsOtherState,
        }

        let response = addNewDoor( elem, 1, states );

        pusherChanges( response, 'CHANGE' );

      }

    } else if ( indexCeil === 8 ){

      if ( elem.type === 'ceil' ){

        let states = {
          others : elemsOtherState,
        }

        let response = addNewDoor( elem, 2, states );

        pusherChanges( response, 'CHANGE' );

      }

    } else if ( indexCeil === 9 ){

      if ( elem.type === 'ceil' ){

        let states = {
          others : elemsOtherState,
        }

        let response = addNewDoor( elem, 3, states );

        pusherChanges( response, 'CHANGE' );

      }

    } else if ( indexCeil === 10 ){

      if ( elem.type === 'ceil' ){

        let states = {
          others : elemsOtherState,
        }

        let response = addNewDoor( elem, 4, states );

        pusherChanges( response, 'CHANGE' );
      }

    } else if ( indexCeil === 11 ){

      if ( elem.type === 'ceil' ){

        let states = {
          others : elemsOtherState,
        }

        let response = addNewBox( elem, states );

        pusherChanges( response, 'CHANGE' );

      }

    }

  }

  function changeCeilSize ( elem, value, type ){

    console.log( 'changing size ceil!' );
    console.log( elem );
    console.log( value );
    console.log( type );

    let _elemsPanelsState = [ ...elemsPanelsState ];
    let _elemsProfilesState = [ ...elemsProfilesState ];
    let _elemsFingersState = [ ...elemsFingersState ];
    let _elemsGroupElementsState = [ ...elemsGroupElementsState ];
    let _elemsLegsState = [ ...elemsLegsState ];

    let states = {
      profiles : elemsProfilesState,
      fingers : elemsFingersState,
      panels : elemsPanelsState,
      legs : elemsLegsState,
      ceils : elemsGroupElementsState,
      ceilsGrid : globalCeilGrid,
    }

    //Получаем ответ
    let response = changeSizeCeil( elem, value, type, states );

    console.log( response );

    pusherChanges( response, 'CHANGE' ); 

  }

  function changeElemsSizeByProfile ( elem, value, type ){

    // //Получаем ответ
    let response = changeSizeProfile( elem, value, type, elemsProfilesState, elemsFingersState, elemsPanelsState );

    console.log( response );

    pusherChanges( response, 'CHANGE' ); 
    
  }

  function changeElemsSizeByPanel ( elem, value, type ){

    //Получаем матрицу для текущей панели
    let matrix = getPanelMatrixByObj( elem, elemsProfilesState, elemsFingersState );

    //Получаем ответ
    let response = changeSizePanel( elem, matrix, value, type, elemsProfilesState, elemsFingersState, elemsPanelsState );

    console.log( response );

    pusherChanges( response, 'CHANGE' ); 
    
  }

  function showSettingElem ( elems ) {

    // console.log(elems);

    if ( elems.length ){

      let indexSelection = -1;

      if ( elems[0].type === 'ceil' ){

        indexSelection = 3; 

      }else if ( elems[0].type === 'panel' || elems[0].type === 'box' || elems[0].type === 'door' ){

        indexSelection = 4; 

      }else if ( elems[0].type === 'finger' || elems[0].type === 'profile' || elems[0].type === 'leg' ){

        indexSelection = 5;

      }
      if ( indexSelection !== -1 ){

        dispatch( setCurrentSelectionAction( indexSelection, 0 ) );

      }

    }

  }

  function divisionGroupElementsAction ( elems, chars ) {

    let response = {
      push : { panels : [], profiles : [], fingers : [], ceils : [] },
      remove : { panels : [], profiles : [], fingers : [], ceils : [] }
    }

    //Проверяем, есть ли что-то вообще
    if (  elems.length ) {

      let elem = elems[0];

      //Проверяем: ячейка ли? 
      if ( elem.type === 'ceil' ){

        let states = {
          profiles : elemsProfilesState,
          fingers : elemsFingersState,
          panels : elemsPanelsState,
          legs : elemsLegsState,
          ceils : elemsGroupElementsState,
          ceilsGrid : globalCeilGrid,
        }

        let _response = divisionGroupElements( elem, chars, states );

        response = {
          push : {
            panels : [ ...response.push.panels, ..._response.push.panels ],
            profiles : [ ...response.push.profiles, ..._response.push.profiles ],
            fingers : [ ...response.push.fingers, ..._response.push.fingers ],
            ceils : [ ...response.push.ceils, ..._response.push.ceil ],
          },
          remove : {
            panels : [ ...response.remove.panels, ..._response.remove.panels ],
            profiles : [ ...response.remove.profiles, ..._response.remove.profiles ],
            fingers : [ ...response.remove.fingers, ..._response.remove.fingers ],
            ceils : [ ...response.remove.ceils, ..._response.remove.ceil ],
          }
        }

      }

      console.log( response );

      //Применяем изменения.
      pusherChanges( response, 'CHANGE' ); 

    }else{
      console.error( 'Нет выделенных элементов' );
    }

  }

  function unionGroupElementsAction ( elems ) {

    if (  elems.length ) {

      let response = unionGroupElements( elems, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsLegsState, elemsOtherState, elemsGroupElementsState, globalCeilGrid );
      console.log( response );

      pusherChanges( response, 'CHANGE' ); 

    }

  }

  function deleteGroupElementsFromScene( elems ){

    if ( elems.length ){ 

      let response = deleteGroupElements( elems[0], elemsProfilesState, elemsFingersState, elemsPanelsState, elemsLegsState, elemsOtherState, elemsGroupElementsState );

      //Применяем изменения.
      pusherChanges( response, 'CHANGE' ); 

    }

  }

  function deleteElemFromScene ( elems ){

    if ( elems.length ){

      let response = {
        push : { },
        remove : {
          panels : [],
          profiles : [],
          fingers : [],
          legs : [],
          ceils : [],
          others : [],
        }
      }

      elems.forEach( (elem, index) => {

        let _type = elem.type;

        if ( _type === 'profile' ){

          let index = elemsProfilesState.findIndex( (item) => item.id === elem.id);

          response.remove.profiles.push( elemsProfilesState[index] );

        }else if(_type === 'panel' ){

          let index = elemsPanelsState.findIndex( (item) => item.id === elem.id);

          response.remove.panels.push( elemsPanelsState[index] );

        }else if(_type === 'fingers' ){

          let index = elemsFingersState.findIndex( (item) => item.id === elem.id);

          response.remove.panels.push( elemsFingersState[index] );

        }else if(_type === 'legs' ){

          let index = elemsLegsState.findIndex( (item) => item.id === elem.id);

          response.remove.legs.push( elemsLegsState[index] );

        } else if( _type === 'door' || _type === 'box' ){

          let index = elemsOtherState.findIndex( (item) => item.id === elem.id);

          response.remove.others.push( elemsOtherState[index] );

        }

      } );

      pusherChanges( response, 'CHANGE' ); 

    }
  
  } 

  function changeElemTexture ( texture, elems ){

    if( elems.length ){

      elems.forEach( item => {

        item.changeTexture( texture );

      } )

    }

    calcTotalParams( {
      elemsPanelsState :  elemsPanelsState,
      elemsProfilesState : elemsProfilesState, 
      elemsFingersState : elemsFingersState,
      elemsGroupElementsState : elemsGroupElementsState,
      elemsLegsState : elemsLegsState,
      elemsOtherState : elemsOtherState,
    } );

  }

  function changeAllElemTexture ( texture, type ){

    let _elems = [];

    if ( type === 0 ){
      _elems = [ ...elemsPanelsState, ...elemsOtherState ];
    }else {
      _elems = [ ...elemsLegsState, ...elemsFingersState, ...elemsProfilesState ];
    }

    if( _elems.length ){

      _elems.forEach( item => {

        item.changeTexture( texture );

      } )

    }

    calcTotalParams( {
      elemsPanelsState :  elemsPanelsState,
      elemsProfilesState : elemsProfilesState, 
      elemsFingersState : elemsFingersState,
      elemsGroupElementsState : elemsGroupElementsState,
      elemsLegsState : elemsLegsState,
      elemsOtherState : elemsOtherState,
    } );

  }

  function changeTexturesForCell ( texture, type, elems ){

    let allowedTypes = [ 'panel', 'box', 'door' ];

    if ( type === 1 ){
      allowedTypes = [ 'profile', 'finger', 'leg' ];
    }

    const states = {
      profiles : elemsProfilesState,
      fingers : elemsFingersState,
      panels : elemsPanelsState,
      legs : elemsLegsState,
      ceils : elemsGroupElementsState,
      others : elemsOtherState,
      ceilsGrid : globalCeilGrid
    }

    const result = getAllElementsByCell( elems[0], states );
   
    result.forEach( ( item ) => {

      if ( allowedTypes.find( ( allowedType ) => allowedType === item.type ) ){

        item.changeTexture( texture );

      }

    } )

  }

  function changeGlobalSize ( type, direction ) {

    let states = {
      profiles : elemsProfilesState,
      fingers : elemsFingersState,
      panels : elemsPanelsState,
      legs : elemsLegsState,
      ceils : elemsGroupElementsState,
      ceilsGrid : globalCeilGrid,
    }

    let response = changeGlobalSizeConstructor( type, direction, states );

    console.log( response );

    pusherChanges( response, 'CHANGE' ); 

  }

  function getTextureById ( id, list ) {

    let index = list.findIndex( (item) => item.id === id );

    if ( index !== -1 ){
      return list[index];
    }else{
      return null;
    }

  }

  function checkFreeArea ( total ){

    let minX = total.min.x, maxX = total.max.x;

  }

  function openModalForChangeTotalName(){

    dispatch( setModalName( true ) );

  }

  function changeLegsStatus () {

    let SIZE_LENG = 125/100;

    setLegsStatus( !legsStatus );

    if ( legsStatus ){
      SIZE_LENG = -1 * SIZE_LENG;
    }

    [
      {
        state : elemsPanelsState,
        callback :  setElemsPanelsState,
      },
      {
        state : elemsProfilesState,
        callback :  setElemsProfilesState,
      },
      {
        state : elemsFingersState,
        callback :  setElemsFingersState,
      },
      {
        state : elemsLegsState,
        callback :  setElemsLegsState,
      },
      {
        state : elemsOtherState,
        callback :  setElemsOtherState,
      },
      {
        state : elemsGroupElementsState,
        callback :  setElemsGroupElementsState,
      },
      
    ].forEach( ( item ) => {

      let _state = [ ...item.state ].map( (obj) => {

        let _elem = obj.elem;

        new TWEEN.Tween( _elem.position )
          .to({
            x: _elem.position.x,
            y: _elem.position.y + SIZE_LENG,
            z: _elem.position.z,
          }, 500)
          .easing(TWEEN.Easing.Cubic.Out)
          .onUpdate(() => controls.update() )
          .start()

        let objParams = obj.params; 
        objParams.positionY = objParams.positionY + SIZE_LENG*100;

        return { ...obj, params : objParams };

      } )

      item.callback( _state );

    } )

  }

  function calcTotalParams ( stateElems ) {

    //Общее число всего.
    let amountElems = {
      panels : stateElems.elemsPanelsState.length, 
      profiles : stateElems.elemsProfilesState.length, 
      fingers : stateElems.elemsFingersState.length, 
      legs : stateElems.elemsLegsState.length, 
      others : stateElems.elemsOtherState.length, 
    }
    let totalWeight = 0, totalPrice = 0;

    //Здесь будем высчитвать габариты конструкции.
    let pTotal = {
      min : { x : 0, y : 0, z : 0 },
      max : { x : 0, y : 0, z : 0 }
    }

    // let _totalListTextures = totalListTextures;

    let _totalListTextures = {
      panels : [], profiles : [] 
    };

    //Здесь считаем цену по текстурам, а также будем формировать массивы для totalListTextures.
    Object.keys( stateElems ).forEach( (key) => {

      stateElems[key].forEach( (item) => {

        if ( item.weight !== undefined && item.weight > 1 ){
          totalWeight += item.weight;
        }

        //TexturesState
        let typeObj = item.type;

        //Получаю id текстуры.
        let textureID = item.textureId;

        if ( typeof textureID === 'number' && textureID > 0 ){

          //проверяю тип
          if ( typeObj === 'profile' || typeObj === 'finger' || typeObj === 'legs' ){ //профили

            let indexProfileTexture = _totalListTextures.profiles.findIndex( (texture) => texture.id === textureID );

            //Значит первое вхождение
            if ( indexProfileTexture === -1 ){

              //Находим объект текстуры, чтобы полчуть его данные.
              let objTexture = texturesState.find( (texture) => texture.id === textureID );

              if ( objTexture !== undefined ){
                _totalListTextures.profiles.push( objTexture );
              } 

            }


          }else if ( typeObj === 'panel' || typeObj === 'box' || typeObj === 'door'  ){ //все остальное панели

            let indexProfileTexture = _totalListTextures.panels.findIndex( (texture) => texture.id === textureID );

            //Значит первое вхождение
            if ( indexProfileTexture === -1 ){

              //Находим объект текстуры, чтобы полчуть его данные.
              let objTexture = texturesState.find( (texture) => texture.id === textureID );

              if ( objTexture !== undefined ){
                _totalListTextures.panels.push( objTexture );
              } 

            }

          }

        }

        //Здесь я получаю номер связи
        let elementToTextureID = item.elementToTextureID;

        if ( elementToTextureID > 0 ){

          let index = item.allowedTextures.findIndex( (texture) => texture.elements2texturesID === elementToTextureID );

          if ( index !== -1 ){

            totalPrice += Number( item.allowedTextures[index].cost );

          }

        }

      } )

    } )

    setTotalListTextures( _totalListTextures );

    //Здесь считаем размер конструкции по крайним пальцам.
    stateElems.elemsFingersState.forEach( (finger, index) => {

      let fp = {
        x : finger.params.positionX, 
        y : finger.params.positionY, 
        z : finger.params.positionZ 
      }

      if ( index === 0 ){

        pTotal = {
          min : { 
            x : fp.x, 
            y : fp.y, 
            z : fp.z
          },
          max : { 
            x : fp.x, 
            y : fp.y, 
            z : fp.z
          }
        }

      } else {


        //Сначала для 
        if ( fp.x <= pTotal.min.x ){
          pTotal = {
            min : { ...pTotal.min, x : fp.x },
            max : pTotal.max
          }
        }else if ( fp.x >= pTotal.max.x ){
          pTotal = {
            min : pTotal.min,
            max : { ...pTotal.max, x : fp.x }
          }
        }

        if ( fp.y <= pTotal.min.y ){
          pTotal = {
            min : { ...pTotal.min, y : fp.y },
            max : pTotal.max
          }
        }else if ( fp.y >= pTotal.max.y ){
          pTotal = {
            min : pTotal.min,
            max : { ...pTotal.max, y : fp.y }
          }
        }

        if ( fp.z <= pTotal.min.z ){
          pTotal = {
            min : { ...pTotal.min, z : fp.z },
            max : pTotal.max
          }
        }else if ( fp.z >= pTotal.max.z ){
          pTotal = {
            min : pTotal.min,
            max : { ...pTotal.max, z : fp.z }
          }
        }

      }

    } );

    //Формируем ответ.
    let response = {
      height : Number(((pTotal.max.y - pTotal.min.y) + 20).toFixed(0)),
      width : Number(((pTotal.max.x - pTotal.min.x) + 20).toFixed(0)),
      depth : Number(((pTotal.max.z - pTotal.min.z) + 20).toFixed(0)),
      weight : totalWeight,
      price : totalPrice,
      minPointX : pTotal.min.x,
      oldWidth : totalParams.width,
    }

    //Считаем свободное пространство
    checkFreeArea( pTotal );

    setTotalParams( response );

    calcLineScene( response );



    return response;

  }

  //Эта функция применяет все изменения на сцену и в стейт
  function pusherChanges( response, action ){

    let listTextures = texturesState;

    let _elemsPanelsState = [ ...elemsPanelsState ];
    let _elemsProfilesState = [ ...elemsProfilesState ];
    let _elemsFingersState = [ ...elemsFingersState ];
    let _elemsGroupElementsState = [ ...elemsGroupElementsState ];
    let _elemsLegsState = [ ...elemsLegsState ];
    let _elemsOtherState= [ ...elemsOtherState ];


    //Создаем объект события.
    let moment = {
      action : {
        type : action, 
        response : {
          PUT : {
            panels : [], profiles : [], fingers : [], legs : [], ceils : [], others : [],
          },
          DELETE : {
            panels : [], profiles : [], fingers : [], legs : [], ceils : [], others : [],
          },
        }
      },
      
    }

    if ( response.push ) {

      if ( response.push.panels ){

        //Добавляем панели
        response.push.panels.forEach( (obj, index) => {

          let texture = listTextures[0];

          if ( obj.textureId && getTextureById( obj.textureId, listTextures ) ){
            texture = getTextureById( obj.textureId, listTextures )
          }

          let _obj = new Element( obj.id, obj.name, obj.type, null, null, texture, obj.params, listGLTFModelsState, scene, texturesState );

          _elemsPanelsState.push( _obj );

          moment.action.response.PUT.panels.push( {
            elem : _obj,
            original : obj,
          } );

        } )

      }
      if ( response.push.profiles ){
        //Добавляем профили
        response.push.profiles.forEach( (obj, index) => {

          // let texture = listTextures[0];

          // if ( obj.textureId && getTextureById( obj.textureId, listTextures ) ){
          //   texture = getTextureById( obj.textureId, listTextures )
          // }

          let _obj = new Element( obj.id, obj.name, obj.type, null, null, obj.textureId, obj.params, listGLTFModelsState, scene, texturesState );

          _elemsProfilesState.push( _obj );

          moment.action.response.PUT.profiles.push( {
            elem : _obj,
            original : obj,
          } );

        } )
      }

      if ( response.push.fingers ){
        //Добавляем коннекторы
        response.push.fingers.forEach( (obj, index) => {

          // let texture = listTextures[0];

          // if ( obj.textureId && getTextureById( obj.textureId, listTextures ) ){
          //   texture = getTextureById( obj.textureId, listTextures )
          // }

          let _obj = new Element( obj.id, obj.name, obj.type, null, null, obj.textureId, obj.params, listGLTFModelsState, scene, texturesState );

          _elemsFingersState.push( _obj );

          moment.action.response.PUT.fingers.push( {
            elem : _obj,
            original : obj,
          } );

        } )
      }

      if ( response.push.others ){
        //Добавляем коннекторы
        response.push.others.forEach( (obj, index) => {

          // let texture = listTextures[0];

          // if ( obj.textureId && getTextureById( obj.textureId, listTextures ) ){
          //   texture = getTextureById( obj.textureId, listTextures )
          // }

          let _obj = new Element( obj.id, obj.name, obj.type, null, null, obj.textureId, obj.params, listGLTFModelsState, scene, texturesState );

          _elemsOtherState.push( _obj );

          moment.action.response.PUT.others.push( {
            elem : _obj,
            original : obj,
          } );

        } )
      }

      if ( response.push.legs ){

        response.push.legs.forEach( (obj, index) => {

          // let texture = listTextures[0];

          // if ( obj.textureId && getTextureById( obj.textureId, listTextures ) ){
          //   texture = getTextureById( obj.textureId, listTextures )
          // }

          let _obj = new Element( obj.id, obj.name, obj.type, null, null, obj.textureId, obj.params, listGLTFModelsState, scene, texturesState );

          _elemsLegsState.push( _obj );

          moment.action.response.PUT.legs.push( {
            elem : _obj,
            original : obj,
          } );

        } )

      }
      if ( response.push.ceils ){

        response.push.ceils.forEach( (obj, index) => {

          let _obj = new GroupElements( obj.id, obj.merge, obj.dimensions, obj.params, obj.grid, obj.chars, scene ); 

          _elemsGroupElementsState.push( _obj );

          moment.action.response.PUT.ceils.push( {
            elem : _obj,
            original : obj,
          } );

        } )

      }
      
    }

    if ( response.remove ) {

      if ( response.remove.panels ){
        //Удаляем панели
        response.remove.panels.forEach( ( elem ) => {

          let index = _elemsPanelsState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsPanelsState[index].deleteFromScene( scene );

            delete _elemsPanelsState[index];

            _elemsPanelsState = _elemsPanelsState.filter(Boolean);

            moment.action.response.DELETE.panels.push( {
              elem : elem,
              original : {
                id : elem.id,
                name : elem.name,
                params : elem.params,
                textureId : elem.textureId,
                type : elem.type,
              }
            } );

          }

        } )
      }
      if ( response.remove.profiles ){
        //Удаляем профили
        response.remove.profiles.forEach( ( elem ) => {

          let index = _elemsProfilesState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsProfilesState[index].deleteFromScene( scene );

            delete _elemsProfilesState[index];

            _elemsProfilesState = _elemsProfilesState.filter(Boolean);

            moment.action.response.DELETE.profiles.push( {
              elem : elem,
              original : {
                id : elem.id,
                name : elem.name,
                params : elem.params,
                textureId : elem.textureId,
                type : elem.type,
              }
            } );

          }

        } )
      }
      if ( response.remove.fingers ){
        //Удаляем коннекторы
        response.remove.fingers.forEach( ( elem ) => {

          let index = _elemsFingersState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsFingersState[index].deleteFromScene( scene );

            delete _elemsFingersState[index];

            _elemsFingersState = _elemsFingersState.filter(Boolean);

            moment.action.response.DELETE.fingers.push( {
              elem : elem,
              original : {
                id : elem.id,
                name : elem.name,
                params : elem.params,
                textureId : elem.textureId,
                type : elem.type,
              }
            } );

          }

        } )
      }
      if ( response.remove.others ){
        //Удаляем коннекторы
        response.remove.others.forEach( ( elem ) => {

          let index = _elemsOtherState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsOtherState[index].deleteFromScene( scene );

            delete _elemsOtherState[index];

            _elemsOtherState = _elemsOtherState.filter(Boolean);

            moment.action.response.DELETE.others.push( {
              elem : elem,
              original : {
                id : elem.id,
                name : elem.name,
                params : elem.params,
                textureId : elem.textureId,
                type : elem.type,
              }
            } );

          }

        } )
      }
      if ( response.remove.legs ){



        //Удаляем ножки
        response.remove.legs.forEach( ( elem ) => {

          let index = _elemsLegsState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsLegsState[index].deleteFromScene( scene );

            delete _elemsLegsState[index];

            _elemsLegsState = _elemsLegsState.filter(Boolean);

            moment.action.response.DELETE.legs.push( {
              elem : elem,
              original : {
                id : elem.id,
                name : elem.name,
                params : elem.params,
                textureId : elem.textureId,
                type : elem.type,
              }
            } );

          }

        } )
      }
      if ( response.remove.ceils ){
        //Удаляем ячейки
        response.remove.ceils.forEach( ( elem ) => {

          let index = _elemsGroupElementsState.findIndex( (item) => 
            round(item.params.positionX.toFixed(2)) == round(elem.params.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(elem.params.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(elem.params.positionZ.toFixed(2))
          )

          if ( index !== -1 ){

            _elemsGroupElementsState[index].deleteFromScene( scene );

            delete _elemsGroupElementsState[index];

            _elemsGroupElementsState = _elemsGroupElementsState.filter(Boolean);

            moment.action.response.DELETE.ceils.push( {
              elem : elem,
              original : {
                id : elem.id,
                merge : elem.merge,
                dimensions : elem.dimensions,
                params : elem.params,
                grid : elem.grid,
                chars : elem.chars,
              }
            } );

          }

        } )
      }

    }

    setCurrentModeEditorState( null ); 
    setCurrentCeilState(-1);

    setStackHistory( [ ...stackHistory, moment ] );
    setCurrentHistory( currentHistory + 1 );

    dispatch( setCurrentElementAction( [] ) );
    // dispatch( setCurrentSelectionAction( -1, 0 ) );


    const states = {
      panels :  _elemsPanelsState,
      profiles : _elemsProfilesState, 
      fingers : _elemsFingersState,
      cells : _elemsGroupElementsState,
      legs : _elemsLegsState,
      others : _elemsOtherState,
    };

    // //Применяем в стейт
    setElemsPanelsState( states.panels );
    setElemsProfilesState( states.profiles );
    setElemsFingersState( states.fingers );
    setElemsGroupElementsState( states.cells );
    setElemsLegsState( states.legs );
    setElemsOtherState( states.others ); 

    calcTotalParams( {
      elemsPanelsState :  states.panels,
      elemsProfilesState : states.profiles, 
      elemsFingersState : states.fingers,
      elemsGroupElementsState : states.cells,
      elemsLegsState : states.legs,
      elemsOtherState : states.others,
    } );

    setTriggerMoveChanger( triggerMoveChanger + 1 );

  }
 
  //Инициализация объектов
  function initObjs(){

    console.log('Starting initialisation 3d objects');

    let listElememetsOtherFinal, listElememetsPanelsFinal, listElememetsFingersFinal, listElememetsProfilesFinal, listElememetsLegsFinal, listGroupElementsFinal, listElementsOtherFinal;

    function setStateFromAPI ( response ){

      listElememetsPanelsFinal = response.elemsPanels;
      listElememetsFingersFinal = response.elemsFingers;
      listElememetsProfilesFinal = response.elemsProfiles;
      listElememetsLegsFinal = response.elemsLegs;
      listGroupElementsFinal = response.elemsGroupElements;
      listElementsOtherFinal = response.elemsOther;

      startInitObjs();

    }

    function setStateFromDefault () {

      listElememetsPanelsFinal = listElememetsPanels;
      listElememetsFingersFinal = listElememetsFingers;
      listElememetsProfilesFinal = listElememetsProfiles;
      listElememetsLegsFinal = listElememetsLegs;
      listGroupElementsFinal = listGroupElements;
      listElementsOtherFinal = listElementsOther2;

      startInitObjs();

    }

    function startInitObjs(){

      let listTextures = texturesState;

      elemGroupElements = listGroupElementsFinal.map( (item, index) => {

        return new GroupElements( item.id, item.merge, item.dimensions, item.params, item.grid, item.chars, scene ); 

      })  

      setElemsGroupElementsState( elemGroupElements );

      elemsProfiles = listElememetsProfilesFinal.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsProfilesState( elemsProfiles );

      elemsFingers = listElememetsFingersFinal.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsFingersState( elemsFingers );

      elemsPanels = listElememetsPanelsFinal.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsPanelsState( elemsPanels );

      elemsPanelsOther = listElememetsOther.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsPanelsOtherState( elemsPanelsOther );

      elemsLegs = listElememetsLegsFinal.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsLegsState( elemsLegs);

      elemsOther = listElementsOtherFinal.map( (item, index) => {

        let material = null, texture = null;

        if ( item.textureId && getTextureById( item.textureId, listTextures ) ){
          texture = getTextureById( item.textureId, listTextures )
        }

        if ( item.material ) {
          material = item.material;
        }

        return new Element( item.id, item.name, item.type, item.model, material, texture, item.params, listGLTFModelsState, scene, texturesState );
     
      } );

      setElemsOtherState( elemsOther );

      calcTotalParams( {
        elemsPanelsState :  elemsPanels,
        elemsProfilesState : elemsProfiles, 
        elemsFingersState : elemsFingers,
        elemsGroupElementsState : [],
        elemsLegsState : elemsLegs,
        elemsOtherState : elemsOther,
      } );

    }

    if ( params.id && Number(params.id) > 0 ){

      API.get( 'solution/'+params.id ).then( (response) => {

        if ( response.data && response.data.file ){

          const fileJSON = response.data.file;

          const resp = response;

          try{

            const file = JSON.parse( fileJSON );

            API.get( backBaseURL+file.src ).then( (response) => {
              console.log( response.data );

              if ( response.data.elemsPanels &&
                   response.data.elemsFingers &&
                   response.data.elemsProfiles && 
                   response.data.elemsLegs && 
                   response.data.elemsGroupElements ){ //&& response.data.elemsOther 

                setSavedData( resp.data );

                //сразу обновляем имя
                dispatch( setTotalName( resp.data.name ) );

                setStateFromAPI( response.data );

              }else{
                setStateFromDefault();
              }

            } );

          }catch( error){

            setStateFromDefault();

            console.log('Не получилось получить ссылку на сохраненное решение.');

          }

        }else{
          setStateFromDefault();
        }

      } )

    } else {

      setStateFromDefault();

    }

  }

  //Запуск анимации
  function animate() {

    requestAnimationFrame( animate );

    TWEEN.update()

    controls.update();

    renderer.render( scene, camera );

    labelRenderer.render( scene, camera );

  }

  function pushLoadedModal ( item, model ){

    const isLastModels = ( item2, list ) => {

      let array = [];

      Object.keys(list).forEach( (key) => {
        list[key].forEach( (obj) => {
          array.push(obj);
        } )     
      })

      let index_item = array.findIndex( (item_1) => item_1.name === item2.name );

      if ( index_item !== -1 && index_item+1 === array.length ){
        return true;
      }else{
        return false;
      }

    }

    let index_model = listGLTFModelsState[item.type].findIndex( (item_1) => item_1.name === item.name );

    if ( index_model !== -1 ){

      listGLTFModelsState[item.type][index_model].isLoaded = true;

      listGLTFModelsState[item.type][index_model].model = model;

      if( isLastModels( item, listGLTFModelsState ) ){
        setTimeout( function () {
          setModelsLoadingComplete(true);
        }, 1500 );
      }

    }else{
      console.log('Model with index -1 not found');
    }

  }

  function loadModelFromGTFL ( item, callback ) {

    loaderGLTF.load( item.file, (model) => {

      pushLoadedModal( item, model );

    }  );   

    return true;

  }

  function loadEveryFromGTFL ( list ){

    let array = [];

    Object.keys(list).forEach( (key) => { 

      for ( const obj of list[key] ){

        loadModelFromGTFL( obj, pushLoadedModal );

      }

    });
 
  }

  function init(){

    console.log('Every models is loaded');

    mountRef.current.appendChild( renderer.domElement );

    initScene( scene );

    initLights( scene );

    initObjs();

    animate(); 

  }

  React.useEffect( () => {

    API.get( 'element/elements' ).then( (response) => {

      // console.log( 'elements:' );
      // console.log( response.data );

      setElementsState( response.data );

    } );

    API.get( 'element2texture/element2textures' ).then( (response) => {

      // console.log( 'element2texture:' );
      // console.log( response.data.rows );

      setElements2textures( response.data.rows );

    } );

    API.get( 'texture/textures' ).then( (response) => {

      let textures = response.data.rows.map( (texture) => {

        let srcJSON = JSON.parse( texture.image );

        try{
          srcJSON = srcJSON.src;
        }catch (err) {
          srcJSON = '';
        }

        if ( texture.status ){
          return {
            id : texture.id,
            type : bundleNames[ texture.type ].little,
            name : texture.title,
            file : backBaseURL + srcJSON,
          }
        }
        
      } )

      textures = textures.filter(Boolean);
      // console.log( 'textures:' );
      // console.log( textures );

      setTexturesState( textures );

    } );

  }, [] );

  React.useEffect( () => {

    if ( modelsLoadingComplete && texturesState.length > 1 && elementsState.length > 1 && elements2textures.length > 1 ){

      let _elements2textures = [];

      elements2textures.forEach( (elem) => {

        let index = _elements2textures.findIndex( ( elem2 ) => elem2.element_id === elem.element_id )

        //Значит нет такого
        if ( index !== -1 ){
          _elements2textures[index].textures.push( {
            elements2texturesID : elem.id,
            texture_id : elem.texture_id,
            cost : elem.cost,
          } )
        }else{
          _elements2textures.push({
            element_id : elem.element_id,
            textures : [{
              elements2texturesID : elem.id,
              texture_id : elem.texture_id,
              cost : elem.cost,
            }],
          })
        }

      } )

      // console.log( '_elements2textures:' );
      // console.log( _elements2textures );

      let _listGLTFModels = listGLTFModelsState;

      elementsState.forEach( (item) => {

        let type = ''

        try{
          type = bundleNames[ item.type ].little;
        }catch(err){

        }

        let dimensions = item.dimensions.split('x');
        let name = '';

        if ( type === 'profile' ){
          name = 'Profile_' +dimensions[0];
        } else if ( type === 'panel' ){
          name = 'Panel_' +dimensions[0]+'x'+dimensions[1];
        } else if (  type === 'door' ){
          name = 'Door_Panel_' +dimensions[0]+'x'+dimensions[1];
        } else if ( type === 'box' ){
          name = 'Box_' +dimensions[0]+'x'+dimensions[1]+'x'+dimensions[2];
        } else if ( type === 'finger' ){
          name = 'Fingers_4';
        } else if ( type === 'leg' ){
          name = 'Leg';
        }

        try {

          let index = listGLTFModelsState[type].findIndex( ( itemGLTF ) => itemGLTF.name === name );

          if ( index !== -1 ){

            let textures = _elements2textures.find( (element2texture) => element2texture.element_id === item.id )

            _listGLTFModels[type][index].id = item.id;
            _listGLTFModels[type][index].weight = item.weight;
            _listGLTFModels[type][index].textures = textures.textures;

          }

        }catch (err){

        }

      } )

      // console.log( '_listGLTFModels:' );
      // console.log( _listGLTFModels );

      init();

    }  

  }, [ modelsLoadingComplete, texturesState, elementsState, elements2textures]);

  React.useEffect( () => {

    if (isRendered === 1){
      console.log('Constructor is rendered');
      loadEveryFromGTFL( listGLTFModelsState );
    }

  }, [ isRendered ]);

  React.useEffect( () => {

    const element = document.querySelectorAll('html')
    element[0].classList.add("Constructor-html");

    setIsRendered( isRendered+1 );

  }, [] );

  React.useEffect( () => {

    window.addEventListener( 'click', onClickMove );

    return () => {
      window.removeEventListener( 'click', onClickMove );
    }

  }, [ pressShift, currentElement, currentModeEditorState, currentCeilState, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsGroupElementsState] );

  React.useEffect( () => {

    window.addEventListener( 'pointermove', onPointerMove );

    return () => {
      window.removeEventListener( 'pointermove', onPointerMove );
    }

  }, [ currentElement ] );

  React.useEffect( () => {

    window.addEventListener( 'click', onPointerMove );

    return () => {
      window.removeEventListener( 'click', onPointerMove );
    }

  }, [ currentElement ] );

  function onKeyDown ( event ) {
    if ( event.key == 'Shift' ) {
      setPressShift( true ); 
    }
  }

  function onKeyUp ( event ) {
    if ( event.key == 'Shift' ) {
      setPressShift( false ); 
    }
  }

  function onWindowResize () {

    console.log('WARNING: Resize');

    defaultCamera.aspect = window.innerWidth / window.innerHeight;

    defaultCamera.updateProjectionMatrix();

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render( scene, camera );

  }

  React.useEffect( () => {

    window.addEventListener('resize', onWindowResize );

    return () => {
      window.removeEventListener('resize', onWindowResize );
    }

  }, [] )

  React.useEffect( () => {

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener( 'keydown', onKeyDown );
    }

  }, [] );

  React.useEffect( () => {

    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener( 'keyup', onKeyUp );
    }

  }, [] );

  const redirectToHome = () => {

    window.location.href = baseURL;

  }

  return (

    <div id="constructor-app" className="constructor-app">

      <BG 
        closeModelAR={ closeModelAR }
        modelAR={ modelAR }
      />

      <AR 
        closeModelAR={ closeModelAR }
        modelAR={ modelAR }
        linkToModel={ linkToModel }
      />

     {/* <div className="coordinate-system">
        <img src={coordinate_system} />
      </div>*/}

      <div id="constructor-app-canvas" className="constructor-app-canvas" ref={ mountRef }></div>

      <ControlPanelLeft
        zoomCameraIncrement={ zoomCameraIncrement }
        zoomCameraDecrement={ zoomCameraDecrement }
        takeSnapshot={ takeSnapshot }
        changeVisibleLine = { changeVisibleLine }
        nextHistory={ nextHistory }
        prevHistory={ prevHistory }
        currentHistory={ currentHistory }
        canPrev={ canPrev }
        canNext={ canNext }
        stackHistory={ stackHistory }
      />

      <ControlPanelBottom 
        deleteElemFromScene={ deleteElemFromScene }
        deleteGroupElementsFromScene={ deleteGroupElementsFromScene }
        changeElemsSizeByPanel={ changeElemsSizeByPanel }
        changeElemsSizeByProfile={ changeElemsSizeByProfile }
        changeCeilSize={ changeCeilSize }
        changeElemTexture={ changeElemTexture }
        changeAllElemTexture={ changeAllElemTexture }
        changeTexturesForCell={ changeTexturesForCell }
        unionGroupElements={ unionGroupElementsAction }
        divisionGroupElements={ divisionGroupElementsAction }
        changeModeEditorAction={ changeModeEditorAction }
        changeCurrentCeilAction={ changeCurrentCeilAction }
        saveConstructorDataAction={ saveConstructorDataAction }
        orderConstructorDataAction={ orderConstructorDataAction } 
        openModelAR={ openModelAR }
        totalParams={ totalParams }
        disabledOrder={ disabledOrder }
        openModalForChangeTotalName={ openModalForChangeTotalName }
        lastData={ lastData }
        changeLegsStatus={ changeLegsStatus }
        changeGlobalSize={changeGlobalSize}
        legsStatus={ legsStatus }
        totalListTextures={ totalListTextures }
        currentCeil={ currentCeilState }
        listTextures={ texturesState }
        elements2textures={ elements2textures }
      />
      
      <img src="../src/files/solution/files/50543e87-caf5-468c-b5bd-9fc08662126e.txt" />
      <div className="desktop-notification">
        <div className="desktop-notification-wrapper">
          <div className="desktop-notification-title">
          “Конфигуратор доступен в декстопной версии”
          </div>
          <div className="desktop-notification-des">Мы разрабатываем конфигуратор для использования в мобильной версии, пока он доступен только с десктопного устройства</div>
          <div className="button button_primary" onClick={ () => redirectToHome() }>
            Назад
          </div>
        </div>
        
      </div>

    </div>

  );

}

export default Constructor;
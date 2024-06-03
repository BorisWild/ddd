import * as THREE from 'three';

import textureFloor from '../../textures/floor.jpg';

var textureLoader = new THREE.TextureLoader();

export default class Element {

  constructor ( id, name, type, model, connect, params, listGLTFModels, scene ) {

    this.defaultId = id;

    this.id = id;
    this.name = name;
    this.type = type;
    this.model = model;
    this.params = params;

    this.elem = null;

    this.chars = null;

    this.defaultColor = null; 

    this.listGLTFModels = listGLTFModels;

    this.scene = scene;

    this.connect = connect;

    this.addToScene( listGLTFModels, scene );

    this.setID = this.setId.bind( this );
    this.setEntity = this.setEntity.bind( this );

    this.setDefaultColor = this.setDefaultColor.bind( this );

    this.setChars = this.setChars.bind( this );

  }

  setId = ( new_id ) => {
    this.id = new_id;
  }
  getID = () => {
    return this.id;
  }
  getDefaultId = () => {
    return this.defaultId;
  }
  getElem = () => {
    return this.elem;
  }
  getChars = () => {
    return this.chars;
  }
  getType = () => {
    return this.type;
  }

  getDefaultColor = ( ) => {
    return this.defaultColor;
  }

  setDefaultColor = ( color ) => {
    this.defaultColor = color;
  }

  setEntity = ( entity ) => {
    this.elem = entity; 
  }

  setChars = ( entity ) => {
    this.chars = entity;
  }  

  setConnect = ( connect ) => {
    this.connect = connect;
  }

  setCharsWidthValue = ( value ) => {
    this.chars = { 
      ...this.chars, 
      width : { 
        ...this.chars.width, 
        value : value 
      } 
    }
    this.updateModel();
  }
  setCharsHeightValue = ( value ) => {
    this.chars = { 
      ...this.chars, 
      height : { 
        ...this.chars.height, 
        value : value 
      } 
    }
  }
  setCharsDepthValue = ( value ) => {
    this.chars = { 
      ...this.chars, 
      depth : { 
        ...this.chars.depth, 
        value : value 
      } 
    }
  }

  updateModel = ( ) => {

    // console.log( this );

    let indexLoadedModel = this.listGLTFModels[ this.type ].findIndex( (item) => {
      if ( item.chars.width.value === this.chars.width.value && 
           item.chars.height.value === this.chars.height.value &&
           item.chars.depth.value === this.chars.depth.value ){
        return true;
      }else{
        return false;
      }
    });

    console.log( this.listGLTFModels[  this.type ][indexLoadedModel] );

    if ( this.listGLTFModels[  this.type ][indexLoadedModel] ){

      let loadedModel = this.listGLTFModels[  this.type ][indexLoadedModel].model;

      let elem = loadedModel.scene.clone();

      // console.log(elem);

      // this.deleteFromScene( this.scene );

      // this.setId( elem.id );

      // this.setEntity( elem );

    }

  } 

  addToScene = ( listGLTFModels, scene ) => {

    let _id = this.id;
    let _name = this.name;
    let _model = this.model;
    let _type = this.type;
    let _params = this.params;
    let _elem = this.elem;

    let indexLoadedModel = listGLTFModels[_type].findIndex( (item) => item.name === _name );

    if ( indexLoadedModel !== -1 && listGLTFModels[_type][indexLoadedModel].isLoaded ){

      // textureLoader.load( textureFloor, (texture) => {

        // console.log(`Modal with name "${_name}" and id "${_id}" is rendered`);

        let loadedModel = listGLTFModels[_type][indexLoadedModel].model;

        _elem = loadedModel.scene.clone();

        this.setId( _elem.id );
        this.setEntity( _elem );

        this.setChars( listGLTFModels[_type][indexLoadedModel].chars );

        // texture.encoding = THREE.sRGBEncoding;

        // texture.flipY = false;

        let _color = "#3a3a3a";
        let defaultColorHex = '0x3a3a3a';

        if ( _type === 'panel' || _type === 'box' || _type === 'door'  ){
          _color = '#f4d7ac';
          defaultColorHex = '0xf4d7ac';
        }

        if ( _type === 'human' ){
          _color = '#ffffff';
          defaultColorHex = '0xffffff';
        }

        if ( _params.rotationType === 1 ){
          _color = '#ff0000';
          defaultColorHex = '0xff0000';
        }

        let material = null;

        // if ( _type === 'profile' || _type === 'panel' || _name === 'Fingers_90_3' ){
        //   material = new THREE.MeshStandardMaterial({
        //     map: texture,
        //   });
        // }else{
        //   material = new THREE.MeshStandardMaterial({
        //     color: _color,
        //   });
        // }

        this.setDefaultColor( _color );

        material = new THREE.MeshStandardMaterial({
          color: _color,
        });

        //Кастомные поля
        _elem.userData.drimoID = _id;
        _elem.userData.drimoName = _name;
        _elem.userData.drimoType = _type;
        _elem.userData.defaultColor = defaultColorHex;
        _elem.userData.type = _type;

        // _elem.userData.type = _type;

        _elem.name = `${_id}_${_name}_${_type}`;

        _elem.traverse ( ( obj ) => {

          let zoomScale = 10, size = 1;

          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.material = material;
            // obj.material.map = texture;
            // obj.material.color = _color;
            obj.material.transparent = true;
          }

        
          if ( _type === 'finger' || _type === 'shtift' || _name === 'Door_Panel_267x122' ){
            
            if ( _name !== 'Fingers_90_3' ){
              zoomScale = 0.01;
            }

          }else if( _type === 'human' ){
            zoomScale = 0.45;
          }

          size = size * zoomScale; 

          if ( _type === 'panel' ){
            _elem.scale.set( size, size, size*0.5);
          }else{
            _elem.scale.set( size, size, size);
          }
          
          //Задаем стандартный цвет
          _elem.standardColor = _color;

          //Задаем соответствующие координаты
          _elem.position.x = _params.positionX;
          _elem.position.y = _params.positionY;
          _elem.position.z = _params.positionZ;

          //Задаем соответствующие градусы
          _elem.rotation.x = _params.rotationX;
          _elem.rotation.y = _params.rotationY;
          _elem.rotation.z = _params.rotationZ;

          //Добавляем на сцену
          scene.add( _elem );

        // } );

      } );

    }else{

      console.log(`Modal with name "${_name}"" and id "${_id}" not found`);

    }
  }
  deleteFromScene = ( scene ) => {
    scene.remove( this.elem ); 
  }

}
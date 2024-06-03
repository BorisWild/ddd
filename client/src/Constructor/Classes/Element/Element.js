import * as THREE from 'three';

//Конфиг
import { config, PI, PI_90 } from '../../Config.js';

import wood from '../../../textures/wood4.png';
import dark_wood from '../../../textures/dark_wood.jpg';

import { listTextures } from '../../listTextures.js';


var textureLoader = new THREE.TextureLoader();

export default class Element {

  constructor ( id, name, type, model, material, texture, params, listGLTFModels, scene, texturesState ) {

    this.id = id;
    this.name = name;
    this.type = type;
    this.model = model;
    this.params = params;
    this.material = material;
    this.elementToTextureID = 0;
    this.allowedTextures = [];
    this.weight = 0;
    this.idToTexture = 0;
    this.texturesState = texturesState;
    this.defaultId = id;
    this.elem = null;
    this.chars = null;
    this.defaultColor = null; 
    this.listGLTFModels = listGLTFModels;
    this.scene = scene;
    this.textureId = null;
    this.texture = null
    this.textureInit = texture;

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

  setDefaultId = ( _id ) => {
    this.defaultId = _id;
  }

  setEntity = ( entity ) => {
    this.elem = entity; 
  }

  setChars = ( entity ) => {
    this.chars = entity;
  }  

  setIdToTexture = ( value ) => {
    this.idToTexture = value;
  }

  setWeight = ( value ) => {
    this.weight = value;
  }

  setAllowedTextures = ( value ) => {
    this.allowedTextures = value;
  }

  setElementToTextureID = ( value ) => {
    this.elementToTextureID = value;
  }

  setTextureId = ( id ) => {
    this.textureId = id;
  }

  setTexture= ( texture ) => {
    this.texture = texture;
  }

  changeTexture = ( texture ) => {

    if (  this.allowedTextures && this.allowedTextures.length > 0 ){

      let index = this.allowedTextures.findIndex( (item) => item.texture_id === texture.id );

      //Значит текстуру можно использовать
      if ( index !== -1 ){

        this.setElementToTextureID( this.allowedTextures[index].elements2texturesID ); 

        this.textureId = texture.id;

        if ( texture.file ){

          let file = texture.file;

          textureLoader.load( file, (_texture) => {

            this.elem.traverse( (obj) => {

              if (obj.isMesh) {

                obj.material.map = _texture;
                obj.material.map.color = '#ffffff';
              }
                    
            });

          });

        }

      }

    }

  }

  addToScene = ( listGLTFModels, scene ) => {

    let _id = this.id;
    let _name = this.name;
    let _model = this.model;
    let _type = this.type;
    let _params = this.params;
    let _elem = this.elem;
    let _material = this.material;
    let _chars = this.chars;
    let _textureInit = this.textureInit;
    let _texturesState = this.texturesState;

    let indexLoadedModel = listGLTFModels[_type].findIndex( (item) => item.name === _name );

    if ( _type === 'finger' ){
      indexLoadedModel = listGLTFModels[_type].findIndex( (item) => item.name === 'Fingers_4' );
    }

    if ( indexLoadedModel !== -1 && listGLTFModels[_type][indexLoadedModel].isLoaded ){

      let _texture = '';
      let item = listGLTFModels[_type][indexLoadedModel];

      this.setAllowedTextures ( item.textures );
      this.setIdToTexture ( item.id );
      this.setWeight( item.weight );

      if ( _textureInit !== null && typeof _textureInit === 'object' ){

        try {
          this.setElementToTextureID( item.textures.find( (item) => item.texture_id === _textureInit.id ).elements2texturesID );
        }catch (err) {
          console.log('Внимание: Ошибки в ценообразовании. Не найден ID связи elements2texturesID для _textureInit.id = ' + _textureInit.id);
        }

        this.setTextureId( _textureInit.id );
        this.setTexture( _texturesState.find( (texture2) => texture2.id === this.textureInit.id ) );

        _texture = _texturesState.find( (texture2) => texture2.id === this.textureInit.id ).file;

      }else{

        let typeForFind = 'profile'; 

        if ( _type === 'panel' || _type === 'box' || _type === 'door' ){
          typeForFind = 'panel'; 
        }

        const textureObj = _texturesState.find( (t) => t.type === typeForFind );

        try {
          this.setElementToTextureID( item.textures.find( (item) => item.texture_id === textureObj.id ).elements2texturesID );
        }catch (err) {
          console.log('Внимание: Ошибки в ценообразовании. Не найден ID связи elements2texturesID для textureObj.id = ' + textureObj.id);
        }

        this.setTextureId( textureObj.id );
        this.setTexture( textureObj );

        _texture = textureObj.file;

      }

      if ( _name === 'Sofa' ){

        if ( _material && _material.texture ){
          _texture = _material.texture;
        }

      }

      textureLoader.load( _texture, (texture) => {

        let loadedModel = listGLTFModels[_type][indexLoadedModel].model;

        _elem = loadedModel.scene.clone();

        this.setId( _elem.id );
        this.setDefaultId( _elem.id );
        this.setEntity( _elem );

        if ( _type == 'panel' ||  _type == 'profile' || _type == 'door' || _type == 'box' ){
          _chars = {
            width : {
              value : listGLTFModels[_type][indexLoadedModel].chars.width.value,
              status : listGLTFModels[_type][indexLoadedModel].chars.width.status,
            },
            height : {
              value : listGLTFModels[_type][indexLoadedModel].chars.height.value,
              status : listGLTFModels[_type][indexLoadedModel].chars.height.status,
            },
            depth : {
              value : listGLTFModels[_type][indexLoadedModel].chars.depth.value,
              status : listGLTFModels[_type][indexLoadedModel].chars.depth.status,
            },
          }; 
        }        

        if ( _params.rotationZ == PI_90 && _type == 'panel' ){

          let _height = _chars.height.value

          _chars.height.value = _chars.width.value;
          _chars.width.value = _height;
        }

        this.setChars( _chars );

        // texture.flipY = false;

        let _color = "#3a3a3a";
        let defaultColorHex = '0x3a3a3a';

        if ( _type === 'panel' || _type === 'box' || _type === 'door' || _type === 'profile' || _type === 'finger' || _type === 'leg' || _type === 'door' ){
          _color = '#ffffff';
          defaultColorHex = '0xffffff';
        }

        if ( _type === 'human' ){
          _color = '#ffffff';
          defaultColorHex = '0xffffff';
        }

        if ( _type === 'furn' ){
          _color = '#eeefe1';
          defaultColorHex = '0xeeefe1';
        }

        let material = null;

        if (_type !== 'furn' ){

          material = new THREE.MeshStandardMaterial({
            map: texture,
            color: '#ffffff',
          });

        }else{

          if ( _name === 'Torsher' ){
            if ( _material && _material.color ){
              _color = _material.color;
            }
            if ( _material && _material.defaultColorHex ){
              defaultColorHex = _material.defaultColorHex;
            }
            material = new THREE.MeshStandardMaterial({
              color: _color,
            });
          }else{

            if ( _name === 'Sofa' ){
              if ( _material && _material.color ){
                _color = _material.color;
              }
              if ( _material && _material.defaultColorHex ){
                defaultColorHex = _material.defaultColorHex;
              }
              material = new THREE.MeshStandardMaterial({
                map: texture,
                color: '#ffffff',
              });

            }            
          }
        }

        this.setDefaultColor( _color );

        _elem.name = _name;
        
        //Кастомные поля
        _elem.userData.drimoID = _elem.id;
        _elem.userData.drimoName = _name;
        _elem.userData.drimoType = _type;
        _elem.userData.defaultColor = defaultColorHex;
        _elem.userData.name = _name;


        _elem.receiveShadow = true;

        _elem.name = `${_id}_${_name}_${_type}`;

        _elem.traverse ( ( obj ) => {

          obj.userData.type = _type;

          obj.userData.name = _name;


          let zoomScale = 10, size = 1;

          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            if ( material ){
              obj.material = material;
            }
          }

          //_type === 'finger' ||
          if ( _type === 'shtift' ){
            
            if ( _name !== 'Fingers_90_3' ){
              zoomScale = 0.01;
            }

          }else if( _type === 'human' ){
            zoomScale = 0.45;
          }

          if ( _type === 'box' ){
            zoomScale = 10;
          }

          size = size * zoomScale; 

          if ( _type === 'panel' ){
            _elem.scale.set( size, size, size*0.5);
          }else{
            _elem.scale.set( size, size, size);
          }

          //Задаем соответствующие координаты
          _elem.position.x = _params.positionX/100;
          _elem.position.y = _params.positionY/100;
          _elem.position.z = _params.positionZ/100;


          //Задаем соответствующие градусы
          _elem.rotation.x = _params.rotationX;
          _elem.rotation.y = _params.rotationY;
          _elem.rotation.z = _params.rotationZ;

          obj.userData.defaultParams = {
            rotation : {
              x : _params.rotationX,
              y : _params.rotationY,
              z : 0,
            },
            position : {
              x : _params.positionX/100,
              y : _params.positionY/100,
              z : _params.positionZ/100,
            }
          }

          

          if ( _type === 'door' ){

            if ( _params.rotationZ === PI_90 ){

              if ( _params.typeDoor === 1 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX + PI_90/2,
                    y : _params.rotationY,
                    z : 0,
                  },
                  position : {
                    x : 0,
                    y : -(_chars.width.value/8) / 100 / 10,
                    z : (_chars.width.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 2 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX,
                    y : _params.rotationY - PI_90/2,
                    z : 0,
                  },
                  position : {
                    x : (-_chars.height.value/8) / 100 / 10,
                    y : 0,
                    z : (_chars.height.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 3 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX,
                    y : _params.rotationY + PI_90/2,
                    z : 0,
                  },
                  position : {
                    x : (_chars.height.value/8) / 100 / 10,
                    y : 0,
                    z : (_chars.height.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 4 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX - PI_90/2,
                    y : _params.rotationY,
                    z : 0,
                  },
                  position : {
                    x : 0,
                    y : (_chars.width.value/8) / 100 / 10,
                    z : (_chars.width.value/3) / 100 / 10,
                  }
                }

              }
            } else {



              if ( _params.typeDoor === 1 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX,
                    y : _params.rotationY + PI_90/2,
                    z : 0,
                  },
                  position : {
                    x : (_chars.height.value/8) / 100 / 10,
                    y : 0,
                    z : (_chars.height.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 2 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX + PI_90/2,
                    y : _params.rotationY,
                    z : 0,
                  },
                  position : {
                    x : 0,
                    y : (-_chars.width.value/8) / 100 / 10,
                    z : (_chars.width.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 3 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX - PI_90/2,
                    y : _params.rotationY,
                    z : 0,
                  },
                  position : {
                    x : 0,
                    y : (_chars.width.value/8) / 100 / 10,
                    z : (_chars.width.value/3) / 100 / 10,
                  }
                }

              } else if ( _params.typeDoor === 4 ){

                obj.userData.hoverParams = {
                  rotation : {
                    x : _params.rotationX,
                    y : _params.rotationY - PI_90/2,
                    z : 0,
                  },
                  position : {
                    x : (-_chars.height.value/8) / 100 / 10,
                    y : 0,
                    z : (_chars.height.value/3) / 100 / 10,
                  }
                }

              }
            }

          }

          if ( _type === 'box' ){ 

            obj.userData.hoverParams = {
                rotation : {
                  x : 0,
                  y : 0,
                  z : 0,
                },
                position : {
                  x : 0,
                  y : 0,
                  z : 50/100,
                }
              }            

          }

          //Добавляем на сцену
          scene.add( _elem );

        } );

      } );

    }else{

      console.log(`Modal with name "${_name}"" and id "${_id}" not found`);

    }
  }

  deleteFromScene = ( scene ) => {
    scene.remove( this.elem ); 
  }

}
import * as THREE from 'three';

export default class GroupElements {

  constructor ( id, merge, dimensions, params, grid, chars, scene ) {

    this.id = id;
    this.type = 'ceil';
    this.defaultId = id;
    this.merge = merge;
    this.dimensions = dimensions;
    this.grid = grid;
    this.chars = {
      width : {
        status : 'enabled',
        value : chars.width.value,
      },
      height : {
        status : 'enabled',
        value : chars.height.value,
      },
      depth : {
        status : 'enabled',
        value : chars.depth.value,
      },
    };
    this.params = params;

    this.elem = null;
    this.defaultColor = null; 

    this.statusHover = false;
    this.scene = scene;

    this.setID = this.setId.bind( this );
    this.setEntity = this.setEntity.bind( this );
    this.setDefaultColor = this.setDefaultColor.bind( this );

    this.addToScene( scene );
    this.setVisibleObject( false );

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
  getStatusHover () {
    return this.statusHover;
  }
  getDefaultColor = ( ) => {
    return this.defaultColor;
  }
  getVisibleStatus = () => {
    return this.elem.visible;
  }
  getChars = () => {
    return this.chars;
  }
  getType = () => {
    return this.type;
  }

  addToScene ( scene ) {

    let _params = this.params;
    let _color = '#green';
    let defaultColorHex = '0xff0000';
    let _type = this.type;
    let _defaultId = this.defaultId;
    let _chars = this.chars;

    if ( _chars.height && _chars.width && _chars.depth ){

      let _elem = new THREE.Mesh( 

        new THREE.BoxGeometry( (_chars.width.value)/100, (_chars.height.value)/100, (_chars.depth.value)/100 ),
        new THREE.MeshStandardMaterial( { color: 'green' } )

      ).clone();

      //Кастомные поля
      _elem.userData.drimoID = _elem.id;
      _elem.userData.defaultColor = defaultColorHex;
      _elem.userData.type = _type;

      //Задаем соответствующие координаты
      _elem.position.x = _params.positionX/100;
      _elem.position.y = _params.positionY/100;
      _elem.position.z = _params.positionZ/100;

      _elem.traverse ( ( obj ) => {
        if (obj.isMesh) {
          obj.material.transparent = true;
          obj.material.opacity = 0.5;
          // obj.material.visible = false;
        }

        this.setId( _elem.id );
        this.setDefaultId( _elem.id );
        this.setEntity( _elem );
        this.setDefaultColor( _color );

        //Добавляем на сцену
        scene.add( _elem );
        
      });


    }else{
      console.error( 'Ошибка при создании ячейки: отсутствуют размеры' );
    }

  }

  setVisibleObject = ( bool ) => {

    let _elem = this.elem;
    _elem.visible = bool;
    this.setEntity( _elem );

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

  setMerge = ( merge ) => {
    this.merge = merge;
  }

  setId = ( new_id ) => {
    this.id = new_id;
  }
  deleteFromScene = ( scene ) => {
    scene.remove( this.elem ); 
  }

}
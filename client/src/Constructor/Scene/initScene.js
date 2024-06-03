import * as THREE from 'three';

//Конфиг
import { config, PI_90 } from '../Config.js';

//Текстуры
import textureFloorPng from '../../textures/floor4.png';

//Инициализация сцены
export function initScene( scene ){

  let textureLoader = new THREE.TextureLoader();

  //Настройка плинтуса
  const geometryPlinth = new THREE.BoxGeometry( 1000, 1, 0.5, 10, 10 );
  const materialPlinth = new THREE.MeshStandardMaterial( { color: '#f5ede3' } );

  const plinth = new THREE.Mesh( geometryPlinth, materialPlinth );
  plinth.receiveShadow = true;
  plinth.position.z = 0 - config.distSceneZ;
  plinth.position.y = 0.45  - config.distSceneY;
  plinth.name = 'plinth';
  plinth.userData.name = 'plinth';
  scene.add( plinth );

  //Настройка потолка
  const geometryRoof = new THREE.PlaneGeometry( 1000, 200, 10, 10 );
  const materialRoof = new THREE.MeshStandardMaterial( { color: '#e6d7c7' } );
  const roof = new THREE.Mesh( geometryRoof, materialRoof );
  roof.receiveShadow = false;
  roof.castShadow = false;
  roof.position.z = 0 - config.distSceneZ;
  roof.position.y =  30 - config.distSceneY;
  roof.rotation.x = PI_90;
  roof.name = 'roof';
  roof.userData.name = 'roof';
  scene.add( roof );

  //Настройка стены
  const geometryWall = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
  const materialWall = new THREE.MeshStandardMaterial( { color: '#e6d7c7' } );

  const wall = new THREE.Mesh( geometryWall, materialWall );
  wall.receiveShadow = true;
  wall.position.z = 0 - config.distSceneZ;
  wall.position.y =  - config.distSceneY;
  wall.name = 'wall';
  wall.userData.name = 'wall';
  scene.add( wall );

  //Настройка пола
  const loader = new THREE.TextureLoader();

  loader.load( textureFloorPng, function ( texture ) {

    const geometryCarpet = new THREE.PlaneGeometry( 1000, 200, 1, 1 );

    let _texture = texture;

    _texture.wrapS = THREE.RepeatWrapping;
    _texture.wrapT = THREE.RepeatWrapping;

    const timesToRepeatHorizontally = 40;
    const timesToRepeatVertically = 10;
    _texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);

    const materialCarpet = new THREE.MeshStandardMaterial({
      map: _texture, 
      color : '#FFFFFF' 
    } );

    const carpet = new THREE.Mesh( geometryCarpet, materialCarpet ); 

    carpet.receiveShadow = true;
    carpet.name = 'carpet';
    carpet.userData.name = 'carpet';

    carpet.position.y = 0 - config.distSceneY;
    carpet.position.z = 0 - config.distSceneZ;
    carpet.rotation.x = - PI_90;
    
    scene.add( carpet );

  });
  
}
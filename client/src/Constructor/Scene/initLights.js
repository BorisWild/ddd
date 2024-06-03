import * as THREE from 'three';

//Конфиг
import { config, PI, PI_90 } from '../Config.js';

//Инициализация света
export function initLights( scene ){ 

  // const lightGlobal1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  // lightGlobal1.position.set( -100, 100, 100 );
  // lightGlobal1.castShadow = false;
  // scene.add( lightGlobal1 );

  // const lightGlobal2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  // lightGlobal2.position.set( 100, 100, 100 );
  // lightGlobal2.castShadow = false;
  // scene.add( lightGlobal2 );

  const lightInt = 0.4;

  const lightIntY = 12;
  const lightIntZ = 15;
  const lightIntStep = 40;

  const light = new THREE.PointLight( 0xffffff, lightInt/3 );
  light.position.set( 0, 150, lightIntZ+10 );
  light.castShadow = false;
  scene.add( light );


  const lightM = new THREE.PointLight( 0xffffff, lightInt/3 );
  lightM.position.set( 0, -150, lightIntZ+10 );
  lightM.castShadow = false;
  scene.add( lightM );

  const light0 = new THREE.PointLight( 0xffffff, lightInt );
  light0.position.set( 0, lightIntY, lightIntZ );
  light0.castShadow = false;
  scene.add( light0 );


  const light1 = new THREE.PointLight( 0xffffff, lightInt );
  light1.position.set( -1 * lightIntStep, lightIntY, lightIntZ );
  light1.castShadow = false;
  scene.add( light1 );


  const light2 = new THREE.PointLight( 0xffffff, lightInt );
  light2.position.set( 1* lightIntStep, lightIntY, lightIntZ );
  light2.castShadow = false;
  scene.add( light2 );


  const light3 = new THREE.PointLight( 0xffffff, lightInt );
  light3.position.set( -2 * lightIntStep, lightIntY, lightIntZ );
  light3.castShadow = false;
  scene.add( light3 );


  const light4 = new THREE.PointLight( 0xffffff, lightInt );
  light4.position.set( 2 * lightIntStep, lightIntY, lightIntZ );
  light4.castShadow = false;
  scene.add( light4 );


  const lightShadow = new THREE.PointLight( 0xffffff, 0.1 );
  lightShadow.position.set( 0, 50, 50 );
  lightShadow.castShadow = true;

  lightShadow.shadow.mapSize.width = 4096;
  lightShadow.shadow.mapSize.height = 4096;

  scene.add( lightShadow );


  // var spotLight = new THREE.SpotLight( 0xfff2c7, 0.3 );
  // spotLight.position.set( config.distX + 12, config.distY + 10, config.distZ + 5 );
  // spotLight.angle = Math.PI/4;
  // spotLight.penumbra = 0.1;
  // spotLight.decay = 2;
  // spotLight.distance = 100;

  // spotLight.castShadow = true;
  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;
  // spotLight.shadow.camera.near = 10;
  // spotLight.shadow.camera.far = 200;
  // spotLight.shadow.focus = 1;

  // const targetObject = new THREE.Object3D();

  // scene.add( targetObject );

  // targetObject.position.x = config.distX + 12;
  // targetObject.position.y = config.distY - 10;
  // targetObject.position.z = config.distZ + 5;

  // spotLight.target = targetObject;

  // scene.add( spotLight );

  // const light = new THREE.PointLight( 0xffffff, 0.6 );
  // light.position.set( 25, 5, 20 );
  // light.castShadow = false;

  // light.shadow.radius = 5;

  // light.shadow.mapSize.width = 4096;
  // light.shadow.mapSize.height = 4096;
  // light.shadow.mapSize.width = 1024;
  // light.shadow.mapSize.height = 1024;

  // scene.add( light );


  

  // const light4 = new THREE.PointLight( 0xffffff, 0.6 );
  // // const light = new THREE.DirectionalLight( 0xffffff, 0.55 );
  // light4.position.set( -25, 5, 20 );
  // light4.castShadow = false;

  // light4.shadow.mapSize.width = 4096;
  // light4.shadow.mapSize.height = 4096;

  // scene.add( light4 );

  // const light5 = new THREE.PointLight( 0xffffff, 0.1 );
  // // const light = new THREE.DirectionalLight( 0xffffff, 0.55 );
  // light5.position.set( 0, 15, 40 );
  // light5.castShadow = true;

  // light5.shadow.mapSize.width = 4096;
  // light5.shadow.mapSize.height = 4096;

  // scene.add( light5 );

  

  // const light3 = new THREE.DirectionalLight( 0xffffff, 0.4 );
  // light3.position.set( 100, 100, 100 );
  // light3.castShadow = false;
  // scene.add( light3 );

  // const light8 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  // light8.position.set( 0, 500, 0 );
  // light8.castShadow = false;
  // scene.add( light8 );

}
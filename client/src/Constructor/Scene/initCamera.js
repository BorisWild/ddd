import * as THREE from 'three';

export function initCamera(){

	let _camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.25, 1000 );

	_camera.position.z = 50;
	_camera.position.x = -20;
	_camera.position.y = 5;
	_camera.position.normalize().multiplyScalar(110);

	return _camera;

}


//Настройка вращения камеры
// const defaultControls = React.useMemo( 

//   () => {

//     return initControls( camera, labelRenderer );

//   }, []
// )

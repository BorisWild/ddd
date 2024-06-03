import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initControls( camera, labelRenderer ){

	let _controls = new OrbitControls( camera, labelRenderer.domElement );

	_controls.maxAzimuthAngle = 3.14/4;
	_controls.minAzimuthAngle = -3.14/4;
	_controls.maxPolarAngle = 3.14/2.2;  
	_controls.minPolarAngle = -3.14/4;  

	_controls.maxAzimuthAngle = 3.14/4;
	_controls.minAzimuthAngle = -3.14/4;
	_controls.maxPolarAngle = 3.14/2.1;  
	_controls.minPolarAngle = -3.14/16;  

	_controls.enablePan = false;

	_controls.minDistance = 0.5;
	_controls.maxDistance = 125;

	_controls.update();

	return _controls;

}
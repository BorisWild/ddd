import * as THREE from 'three';

export function initRender( camera, labelRenderer ){

	let beautifulMode = true;

	let _renderer = new THREE.WebGLRenderer({
		antialias: beautifulMode, 
	});

	_renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	_renderer.shadowMap.enabled = beautifulMode;
	_renderer.shadowMapSoft = beautifulMode;
	_renderer.shadowMap.needsUpdate = beautifulMode;

	// _renderer.outputEncoding = THREE.sRGBEncoding

	_renderer.setSize( window.innerWidth, window.innerHeight );

	return _renderer;	

}
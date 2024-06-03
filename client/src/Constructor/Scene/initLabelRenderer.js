import * as THREE from 'three';

import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function initLabelRenderer(){

	let _labelRenderer = new CSS2DRenderer();
	_labelRenderer.setSize( window.innerWidth, window.innerHeight );
	_labelRenderer.domElement.style.position = 'absolute';
	_labelRenderer.domElement.style.top = '0px';
	document.body.appendChild( _labelRenderer.domElement );

	return _labelRenderer;

} 
import * as THREE from 'three';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { PI_90 } from '../Config.js';

export function initLines( scene ){

	const widthLineGeometry = new THREE.BoxGeometry( 5.6, 0.1, 0 );
	const widthLineMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let widthLine = new THREE.Mesh( widthLineGeometry, widthLineMaterial );
	widthLine.position.y = 5;
	scene.add( widthLine );
	const widthLineDiv = document.createElement( 'div' );
	widthLineDiv.className = 'labelRuler';
	widthLineDiv.textContent = '600 мм';
	const widthLabel = new CSS2DObject( widthLineDiv );
	widthLabel.position.set( 0, 0, 0 );
	widthLine.add( widthLabel );
	widthLabel.layers.set( 0 );

	const widthLineBoxFirstGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const widthLineBoxFirstMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let widthLineBoxFirst = new THREE.Mesh( widthLineBoxFirstGeometry, widthLineBoxFirstMaterial );
	widthLineBoxFirst.rotation.z = PI_90/2;
	widthLineBoxFirst.position.y = 5;
	widthLineBoxFirst.position.x = -5.6/2;
	scene.add( widthLineBoxFirst );

	const widthLineBoxSecondGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const widthLineBoxSecondMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let widthLineBoxSecond = new THREE.Mesh( widthLineBoxSecondGeometry, widthLineBoxSecondMaterial );
	widthLineBoxSecond.rotation.z = PI_90/2;
	widthLineBoxSecond.position.y = 5;
	widthLineBoxSecond.position.x = 5.6/2;
	scene.add( widthLineBoxSecond );


	const heightLineGeometry = new THREE.BoxGeometry( 0.1, 5.6, 0 );
	const heightLineMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let heightLine = new THREE.Mesh( heightLineGeometry, heightLineMaterial );
	heightLine.position.x = -5;
	scene.add( heightLine );
	const heightLineDiv = document.createElement( 'div' );
	heightLineDiv.className = 'labelRuler';
	heightLineDiv.textContent = '600 мм';
	const heightLabel = new CSS2DObject( heightLineDiv );
	heightLabel.position.set( 0, 0, 0 );
	heightLine.add( heightLabel );
	heightLabel.layers.set( 0 );

	const heightLineBoxFirstGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const heightLineBoxFirstMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let heightLineBoxFirst = new THREE.Mesh( heightLineBoxFirstGeometry, heightLineBoxFirstMaterial );
	heightLineBoxFirst.rotation.z = PI_90/2;
	heightLineBoxFirst.position.y = -5.6/2;
	heightLineBoxFirst.position.x = -5;
	scene.add( heightLineBoxFirst );

	const heightLineBoxSecondGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const heightLineBoxSecondMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let heightLineBoxSecond = new THREE.Mesh( heightLineBoxSecondGeometry, heightLineBoxSecondMaterial );
	heightLineBoxSecond.rotation.z = PI_90/2;
	heightLineBoxSecond.position.y = 5.6/2;
	heightLineBoxSecond.position.x = -5;
	scene.add( heightLineBoxSecond );


	const depthLineGeometry = new THREE.BoxGeometry( 5.6, 0, 0.1 );
	const depthLineMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let depthLine = new THREE.Mesh( depthLineGeometry, depthLineMaterial );
	depthLine.position.x = -5;
	depthLine.position.y = -5.6/2;
	depthLine.rotation.y = PI_90;
	scene.add( depthLine );
	const depthLineDiv = document.createElement( 'div' );
	depthLineDiv.className = 'labelRuler';
	depthLineDiv.textContent = '600 мм';
	const depthLabel = new CSS2DObject( depthLineDiv );
	depthLabel.position.set( 0, 0, 0 );
	depthLine.add( depthLabel );
	depthLabel.layers.set( 0 );

	const depthLineBoxFirstGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const depthLineBoxFirstMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let depthLineBoxFirst = new THREE.Mesh( depthLineBoxFirstGeometry, depthLineBoxFirstMaterial );
	depthLineBoxFirst.rotation.z = PI_90/2;
	depthLineBoxFirst.rotation.x = PI_90;
	depthLineBoxFirst.position.x = -5;
	depthLineBoxFirst.position.y = -5.6/2;
	depthLineBoxFirst.position.z = 5.6/2;
	scene.add( depthLineBoxFirst );

	const depthLineBoxSecondGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0 );
	const depthLineBoxSecondMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
	let depthLineBoxSecond = new THREE.Mesh( depthLineBoxSecondGeometry, depthLineBoxSecondMaterial );
	depthLineBoxSecond.rotation.z = PI_90/2;
	depthLineBoxSecond.rotation.x = PI_90;
	depthLineBoxSecond.position.x = -5;
	depthLineBoxSecond.position.y = -5.6/2;
	depthLineBoxSecond.position.z = -5.6/2;
	scene.add( depthLineBoxSecond );

	const lines = {
	width : {
	  main : {
	    obj : widthLine,
	    labelDiv : widthLineDiv,
	  },
	  first : widthLineBoxFirst,
	  second : widthLineBoxSecond,
	},
	height : {
	  main : {
	    obj : heightLine,
	    labelDiv : heightLineDiv,
	  },
	  first : heightLineBoxFirst,
	  second : heightLineBoxSecond,
	},
	depth : {
	  main : {
	    obj : depthLine,
	    labelDiv : depthLineDiv,
	  },
	  first : depthLineBoxFirst,
	  second : depthLineBoxSecond,
	}
	};

	let status = true, opacity = 1;

	lines.width.main.obj.visible = status;
	lines.width.main.labelDiv.style.opacity = opacity;
	lines.width.first.visible = status;
	lines.width.second.visible = status;

	lines.height.main.obj.visible = status;
	lines.height.main.labelDiv.style.opacity = opacity;
	lines.height.first.visible = status;
	lines.height.second.visible = status;

	lines.depth.main.obj.visible = status;
	lines.depth.main.labelDiv.style.opacity = opacity;
	lines.depth.first.visible = status;
	lines.depth.second.visible = status;

     return lines;

} 
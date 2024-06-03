//Конфиг
import { config, PI, PI_90 } from '../Config.js';

//Классы
import Element from '../Classes/Element/Element.js';
import GroupElements from '../Classes/GroupElements/GroupElements.js';

//Список моделей
import { listGLTFModels } from '../listGLTFModels.js';

function time(){
  return parseInt(new Date().getTime()/1000);
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export const addNewCeilByPanel = ( mainElement, cameraPositionX, ceils, listGLTFModels, scene ) => {

	let sizeCeil = 560;

	let listElemNotPush = [];

	let direction = null;

	let aimParams = { x : 0, y : 0, z : 0 };

	if ( mainElement.params.rotationX !== 0 ){

		console.log('Direction = TOP' );

		aimParams = { 
			x : (sizeCeil/2) + 10,
			y : (sizeCeil/2) + 10, 
			z : 0 
		};

	}else if ( mainElement.params.rotationX === 0 && mainElement.params.rotationY === 0 ){ 

		console.log('Direction = FRONT' );

		aimParams = { 
			x : (sizeCeil/2) + 10,
			y : 0, 
			z : (sizeCeil/2) + 10, 
		};

  } else if ( mainElement.params.rotationX === 0 && mainElement.params.rotationY !== 0 ){

  	if ( cameraPositionX > 0){
  		console.log('Direction = RIGHT' );

  		aimParams = { 
				x : (sizeCeil) + 10*2,
				y : 0, 
				z : 0, 
			};

  	}else{
  		console.log('Direction = LEFT' );
  	}
 
  }

	let fingers = [], profile = [], panels = [], legs = [];
	let params = null
	let connect = null;
	// let _id = time()/2;

	let _id = getRandomIntInclusive( 0, 1000000 ) + Math.floor(time()/2); 
	let obj = null;

	_id = _id + 1;
	let merge = [];
	params = {
    positionX : mainElement.params.positionX + aimParams.x - ( (560/2) + 10),
    positionY : mainElement.params.positionY + aimParams.y,
    positionZ : mainElement.params.positionZ + aimParams.z, 
  }

  // console.log( params );

  let dimensions = {
    width: 600,
    height: 600,
    depth: 600,
  };

  let grid = {
    x : Number( ( params.positionX / 580 ).toFixed( 0 ) ),
    y : Number( ( params.positionY / 580 ).toFixed( 0 ) ),
    z : Number( ( params.positionZ / 580 ).toFixed( 0 ) ),
  };

  let mush = {
  	pX : null,
    pY : null,
    pZ : null,
    nX : null,
    nY : null,
    nZ : null,
  };

  ceils.forEach( ( ceil ) => {

  	// console.log( ceil.grid );

  	let _grid = ceil.grid;

  	if ( ( Math.abs(grid.x - _grid.x) === 1 ) && grid.y === _grid.y && grid.z === _grid.z ){

  		if ( grid.x - _grid.x === 1 ){
  			mush = { ...mush, nX : ceil.getDefaultId() }
  		}else{
  			mush = { ...mush, pX : ceil.getDefaultId() }
  		}

  	} else if ( ( Math.abs(grid.y - _grid.y) === 1 ) && grid.x === _grid.x && grid.z === _grid.z ){

  		if ( grid.y - _grid.y === 1 ){
  			mush = { ...mush, nY : ceil.getDefaultId() }
  		}else{
  			mush = { ...mush, pY : ceil.getDefaultId() }
  		}

  	} else if ( ( Math.abs(grid.z - _grid.z) === 1 ) && grid.x === _grid.x && grid.y === _grid.y ){

  		if ( grid.z - _grid.z === 1 ){
  			mush = { ...mush, nZ : ceil.getDefaultId() }
  		}else{
  			mush = { ...mush, pZ : ceil.getDefaultId() }
  		}

  	}

  } )

  let chars = {
    width : {
      status : 'enabled',
      value : 560,
    },
    height : {
      status : 'enabled',
      value : 560,
    },
    depth : {
      status : 'enabled',
      value : 560,
    },
  }

	// let ceil = new GroupElements( _id, merge, dimensions, params, grid, chars, scene ); 

	let ceil = {
    id : 100,
    merge : merge,
    dimensions : dimensions,
    params : params,
    grid : grid,
    chars : chars,
  }

	if( mush.pX === null ){
		//Панели
		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
		//--Панели

  }
  if( mush.nX === null ){

  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY +  aimParams.y,
	    positionZ : mainElement.params.positionZ +  aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
  	
  	//--Панели

  }
  if( mush.pY === null ){
  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ +  aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
		//--Панели
  	
  }
  if( mush.nY === null ){
  	//Панели
  	params = { 
		   ...mainElement.params,
		   positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
		   positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		   positionZ : mainElement.params.positionZ + aimParams.z,
		   rotationX: PI_90, 
		   rotationY: 0, 
		   rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj );  
		//--Панели
  	
  }
  if( mush.pZ === null ){
 	
  }
  if( mush.nZ === null ){

  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
  	//--Панели

  }
  
  if ( !mush.nX && !mush.nY ){

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x,  
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + aimParams.z,
		    rotationX: 0, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

  }

	if ( !mush.nX && !mush.pY ){

		params = { 
	   ...mainElement.params,
	   positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	   positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	   positionZ : mainElement.params.positionZ + aimParams.z,
	   rotationX: 0, 
	   rotationY: 0, 
	   rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.pY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.nY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}
	if ( !mush.nZ && !mush.pY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.nZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: 0, 
		    rotationY: PI_90, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pZ && !mush.nY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}
	if ( !mush.nX && !mush.pZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.nX && !mush.nZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	//Коннекторы
	if ( !mush.nX && !mush.nZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.nX && !mush.nZ && !mush.nY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.nX && !mush.pZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}
	
	if ( !mush.nX && !mush.pZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && !mush.pY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && !mush.pY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 
		
	}

	if ( !mush.nX && !mush.nZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.nX && !mush.pZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && grid.y === 0){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}
	
	return { 
		fingers : fingers,
		panels : panels,
		profile : profile,
		legs : legs,
		ceil : [ ceil ] 
	};

}

export const addNewCeilByCeil = ( mainElement, directions, ceils, listGLTFModels, scene ) => {

	let sizeCeil = 560;

	let listElemNotPush = [];

	let direction = null;

	let aimParams = { x : 0, y : 0, z : 0 };

	console.log( directions ); 

	if ( directions.y === 1 ){

		console.log('Direction = TOP' );

		aimParams = { 
			x : (sizeCeil/2) + 10,
			y : (sizeCeil) + 10*2, 
			z : 0 
		};

	}else if ( directions.z === 1 ){ 

		console.log('Direction = FRONT' );

		aimParams = { 
			x : (sizeCeil/2) + 10,
			y : 0, 
			z : (sizeCeil) + 10*2, 
		};

  } else if ( directions.x === 1 ){

  	console.log('Direction = RIGHT' );
		aimParams = { 
			x : (sizeCeil+sizeCeil/2) + 10*2,
			y : 0, 
			z : 0, 
		};
 
  } else if ( directions.x === -1 ){
  	console.log('Direction = LEFT' );

		aimParams = { 
			x : -1 * ( (sizeCeil/2) + 10 ),
			y : 0, 
			z : 0, 
		};
  }

	let fingers = [], profile = [], panels = [], legs = [];
	let params = null
	let connect = null;
	let _id = time();
	let obj = null;

	_id = _id + 1;
	let merge = [];
	params = {
    positionX : mainElement.params.positionX + aimParams.x - ( (560/2) + 10),
    positionY : mainElement.params.positionY + aimParams.y,
    positionZ : mainElement.params.positionZ + aimParams.z, 
  }

  // console.log( params );

  let dimensions = {
    width: 600,
    height: 600,
    depth: 600,
  };

  let grid = {
    x : Number( (params.positionX / 5.8 ).toFixed( 0 ) ),
    y : Number( ((params.positionY + 4.2)/5.8).toFixed( 0 ) ),
    z : Number( ((params.positionZ - 2.5)/5.8).toFixed( 0 ) ),
  };

  let mush = {
  	pX : null,
    pY : null,
    pZ : null,
    nX : null,
    nY : null,
    nZ : null,
  };

  ceils.forEach( ( ceil ) => {

  	// console.log( ceil.grid );

  	let _grid = ceil.grid;

  	if ( ceil.grid ){

  		if ( ( Math.abs(grid.x - _grid.x) === 1 ) && grid.y === _grid.y && grid.z === _grid.z ){

	  		if ( grid.x - _grid.x === 1 ){
	  			mush = { ...mush, nX : ceil.getDefaultId() }
	  		}else{
	  			mush = { ...mush, pX : ceil.getDefaultId() }
	  		}

	  	} else if ( ( Math.abs(grid.y - _grid.y) === 1 ) && grid.x === _grid.x && grid.z === _grid.z ){

	  		if ( grid.y - _grid.y === 1 ){
	  			mush = { ...mush, nY : ceil.getDefaultId() }
	  		}else{
	  			mush = { ...mush, pY : ceil.getDefaultId() }
	  		}

	  	} else if ( ( Math.abs(grid.z - _grid.z) === 1 ) && grid.x === _grid.x && grid.y === _grid.y ){

	  		if ( grid.z - _grid.z === 1 ){
	  			mush = { ...mush, nZ : ceil.getDefaultId() }
	  		}else{
	  			mush = { ...mush, pZ : ceil.getDefaultId() }
	  		}

	  	}

  	}

  	

  } )

  // console.log( mush );

  let chars = {
    width : {
      status : 'enabled',
      value : 560,
    },
    height : {
      status : 'enabled',
      value : 560,
    },
    depth : {
      status : 'enabled',
      value : 560,
    },
  }

	

	let ceil = {
    id : 100,
    merge : merge,
    dimensions : dimensions,
    params : params,
    grid : grid,
    chars : chars,
  }

  // let ceil = new GroupElements( _id, merge, dimensions, params, grid, chars, scene ); 

	if( mush.pX === null ){
		//Панели
		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY +  aimParams.y,
	    positionZ : mainElement.params.positionZ +  aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
		//--Панели

  }
  if( mush.nX === null ){

  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY +  aimParams.y,
	    positionZ : mainElement.params.positionZ +  aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
  	
  	//--Панели

  }
  if( mush.pY === null ){
  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ +  aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
		//--Панели
  	
  }
  if( mush.nY === null ){
  	//Панели
  	params = { 
		   ...mainElement.params,
		   positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
		   positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		   positionZ : mainElement.params.positionZ + aimParams.z,
		   rotationX: PI_90, 
		   rotationY: 0, 
		   rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj );  
		//--Панели
  	
  }
  if( mush.pZ === null ){
 	
  }
  if( mush.nZ === null ){

  	//Панели
  	params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Panel_560x560',
      type : 'panel',
      params : params,
      textureId : null,
    }
		panels.push( obj ); 
  	//--Панели

  }
  
  if ( !mush.nX && !mush.nY ){

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x,  
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + aimParams.z,
		    rotationX: 0, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

  }

	if ( !mush.nX && !mush.pY ){

		params = { 
	   ...mainElement.params,
	   positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	   positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	   positionZ : mainElement.params.positionZ + aimParams.z,
	   rotationX: 0, 
	   rotationY: 0, 
	   rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.pY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.nY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + aimParams.z,
	    rotationX: 0, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}
	if ( !mush.nZ && !mush.pY ){

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.nZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: 0, 
		    rotationY: PI_90, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pZ && !mush.nY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil/2) + 10 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: 0, 
	    rotationY: PI_90, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}
	if ( !mush.nX && !mush.pZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	if ( !mush.nX && !mush.nZ ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Profile_560',
      type : 'profile',
      params : params,
      textureId : null,
    }
		profile.push( obj ); 

	}

	//Коннекторы
	if ( !mush.nX && !mush.nZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.nX && !mush.nZ && !mush.nY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.nX && !mush.pZ && !mush.pY ) {

		params = { 
	    ...mainElement.params,
	    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
	    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}
	
	if ( !mush.nX && !mush.pZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && !mush.pY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && !mush.pY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY + ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && !mush.nY ) {

		params = { 
		    ...mainElement.params,
		    positionX : mainElement.params.positionX + aimParams.x, 
		    positionY : mainElement.params.positionY - ( (sizeCeil/2) + 10 ) + aimParams.y,
		    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
		    rotationX: PI_90, 
		    rotationY: 0, 
		    rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Fingers_4',
      type : 'finger',
      params : params,
      textureId : null,
    }
		fingers.push( obj ); 
		
	}

	if ( !mush.nX && !mush.nZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.nX && !mush.pZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX - ( (sizeCeil) + 10*2 ) + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.pX && !mush.nZ && grid.y === 0 ){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ - ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	if ( !mush.pX && !mush.pZ && grid.y === 0){

		params = { 
		  ...mainElement.params,
		  positionX : mainElement.params.positionX + aimParams.x, 
	    positionY : mainElement.params.positionY - ( (125/2) + ( sizeCeil/2 ) + 10*2 ) + aimParams.y,
	    positionZ : mainElement.params.positionZ + ( (sizeCeil/2) + 10 ) + aimParams.z,
	    rotationX: PI_90, 
	    rotationY: 0, 
		  rotationZ: 0,
		}
		connect = { pX : null, pY : null, pZ : null, nX : null, nY : null, nZ : null };
		_id = _id + 1;
		obj = {
      id : 100,
      name : 'Leg',
      type : 'leg',
      params : params,
      textureId : null,
    }
		legs.push( obj ); 

	}

	profile.forEach( profile =>{

		if ( profile.getDefaultId() === ceil.getDefaultId() ){
			console.log('DANGER!' + profile.getDefaultId() );
		}

	} )
	
	return { 
		fingers : fingers,
		panels : panels,
		profile : profile,
		legs : legs,
		ceil : [ ceil ] 
	};

}

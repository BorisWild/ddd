//Конфиг
import { config, PI, PI_90 } from '../Config.js';

import { getMatrixByPoints } from '../helpers/constructorHelper.js';

const generationOfElementsByMatrixAndExtremePointsAndSide = ( matrix, extremePoints, side, step ) => {

	let responsePush = { panels : [], profiles : [], fingers : [], legs : [] }

	let startPosition = {
		x : 0,
		y : 0,
		z : 0,
	}

	if ( side === 'RIGHT' || side === 'TOP' ){

		startPosition = {
			x : extremePoints.x,
			y : extremePoints.y,
			z : extremePoints.z,
		}

	} else if ( side === 'LEFT' ){

		startPosition = {
			x : extremePoints.x - step*145,
			y : extremePoints.y,
			z : extremePoints.z,
		}

	}

	//Генерация всех коннекторов
	matrix.forEach ( ( xm, xIndex) => {
		xm.forEach( (ym, yIndex) => {
			ym.forEach( ( zm, zIndex ) => {
				const dist = { x : (xIndex * 72.5), y : (yIndex * 72.5), z : (zIndex * 72.5) }
				if ( zm === 3 ){ //коннектор
					const paramsFinger = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : 0, rotationY : 0, rotationZ : 0,
					}
					responsePush.fingers.push({
						id : 100, 
						name : 'Fingers_4', 
						type : 'finger', 
						textureId : 0, 
						params : {  
							...paramsFinger, 
						}
					} );  
				}
			} );
		} );
	} );

	//Генерация профилей от конца к нам.
	matrix.forEach ( ( xm, xIndex) => {
		xm.forEach( (ym, yIndex) => {

			if ( xIndex % 2 === 0 && yIndex % 2 === 0 ){

				let profilesObj = {
					profiles : [], 
				};
				let obj = { length : 0, startIndex : 0, prevItem : -1 }

				ym.forEach( (zm, zIndex) => {
					//Если встречается, ничего не делаем.
					if ( zm === 2 ){ //Если встречается профиль, то
						//Если до этого был коннектор 
 						if ( obj.prevItem === 3 ){
 							//Значит встретился новый профиль. Пушим старый, создамем новый
 							obj = { length : 1, startIndex : zIndex, prevItem : obj.prevItem }
						} else if (  obj.prevItem === 2 ){ // если до этого был профиль
							//Профиль продолжается
							obj = { ...obj, length: obj.length + 1 }
						}
					} else if ( zm === 3 ){
						if ( obj.prevItem === 2 ){ // если до этого был профиль
							//Значит профиль закончился. Пушим профиль.
 							profilesObj.profiles.push( obj );
 							//Обнуляем профиль
 							obj = { length : 0, startIndex : 0, prevItem : obj.prevItem }
						}
					}

					obj.prevItem = zm;

				} );
				
				// console.log( profilesObj.profiles );

				profilesObj.profiles.forEach( (item) => {

					const dist = { x : (xIndex * 72.5), y : (yIndex * 72.5), z : ( ((item.length+1)/2 + item.startIndex-1) * 72.5) }

					const paramsProfile = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : 0, rotationY : 0, rotationZ : 0,
					}

					const nameProfile = 'Profile_'+(((item.length+1)*72.5)-20);

					responsePush.profiles.push({
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : 0, 
						params : paramsProfile,

					});

				} );

			}

		} );
	} );

	//Генерация профилей от низа на вверх .
	matrix.forEach ( ( xm, xIndex) => {

		for ( let zIndex = 0; zIndex < matrix[0][0].length; zIndex++ ){

			if ( xIndex % 2 === 0 && zIndex % 2 === 0 ){ 

				let profilesObj = {
					profiles : [], 
				};
				let obj = { length : 0, startIndex : 0, prevItem : -1 }

				for ( let yIndex = 0; yIndex < matrix[0].length; yIndex++ ){

					const item = matrix[ xIndex ][ yIndex ][ zIndex ];

					//Если встречается, ничего не делаем.
					if ( item === 2 ){ //Если встречается профиль, то
						//Если до этого был коннектор 
 						if ( obj.prevItem === 3 ){
 							//Значит встретился новый профиль. Пушим старый, создамем новый
 							obj = { length : 1, startIndex : yIndex, prevItem : obj.prevItem }
						} else if (  obj.prevItem === 2 ){ // если до этого был профиль
							//Профиль продолжается
							obj = { ...obj, length: obj.length + 1 }
						}
					} else if ( item === 3 ){
						if ( obj.prevItem === 2 ){ // если до этого был профиль
							//Значит профиль закончился. Пушим профиль.
 							profilesObj.profiles.push( obj );
 							//Обнуляем профиль
 							obj = { length : 0, startIndex : 0, prevItem : obj.prevItem }
						}
					}

					obj.prevItem = item;

				}

				profilesObj.profiles.forEach( (item) => {

					const dist = { x : (xIndex * 72.5), y : ( ((item.length+1)/2 + item.startIndex-1) * 72.5), z : (zIndex * 72.5) }

					const paramsProfile = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : PI_90, rotationY : 0, rotationZ : 0,
					}

					const nameProfile = 'Profile_'+(((item.length+1)*72.5)-20);

					responsePush.profiles.push({
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : 0, 
						params : paramsProfile,

					});

				} );

			}

		}

	} );

	//Генерация профилей от слева на вправо.
	for ( let yIndex = 0; yIndex < matrix[0].length; yIndex++ ){

		for ( let zIndex = 0; zIndex < matrix[0][0].length; zIndex++ ){

			if ( yIndex % 2 === 0 && zIndex % 2 === 0 ){

				let profilesObj = {
					profiles : [], 
				};
				let obj = { length : 0, startIndex : 0, prevItem : -1 }

				for ( let xIndex = 0; xIndex < matrix.length; xIndex++  ){

					const item = matrix[ xIndex ][ yIndex ][ zIndex ];

					//Если встречается, ничего не делаем.
					if ( item === 2 ){ //Если встречается профиль, то
						//Если до этого был коннектор 
							if ( obj.prevItem === 3 ){
								//Значит встретился новый профиль. Пушим старый, создамем новый
								obj = { length : 1, startIndex : xIndex, prevItem : obj.prevItem }
						} else if (  obj.prevItem === 2 ){ // если до этого был профиль
							//Профиль продолжается
							obj = { ...obj, length: obj.length + 1 }
						}
					} else if ( item === 3 ){
						if ( obj.prevItem === 2 ){ // если до этого был профиль
							//Значит профиль закончился. Пушим профиль.
								profilesObj.profiles.push( obj );
								//Обнуляем профиль
								obj = { length : 0, startIndex : 0, prevItem : obj.prevItem }
						}
					}

					obj.prevItem = item;

				}

				profilesObj.profiles.forEach( (item) => {

					const dist = { x : ( ((item.length+1)/2 + item.startIndex-1) * 72.5), y : (yIndex * 72.5), z :  (zIndex * 72.5) }

					const paramsProfile = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : 0, rotationY : PI_90, rotationZ : 0,
					}

					const nameProfile = 'Profile_'+(((item.length+1)*72.5)-20);

					responsePush.profiles.push({
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : 0, 
						params : paramsProfile,

					});

				} );

			}

			


		}

	}

	//Генерация панелей слева на право
	matrix.forEach( (xm, xIndex) => {

		if ( xIndex % 2 === 0 ){

			let panelsObj = [];

			xm.forEach( (ym, yIndex) => {

				if ( yIndex !== 0 && yIndex !== xm.length-1 && yIndex % 2 !== 0 ){

					let obj = { length : 0, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 }, startIndex : 0, prevItem : -1 }

					ym.forEach( (zm, zIndex) => {

						let isForbidden = false;

						panelsObj.forEach( (item) => {
							if ( 
								item.points.i1 <= zIndex &&
								item.points.i2 <= yIndex &&
								(item.points.i1 + item.chars.length1) >= zIndex && 
								(item.points.i2 + item.chars.length2) >= yIndex
							){
								isForbidden = true;
							}
						} ) 

						if ( !isForbidden ){

							if ( zm === 1 ){ //Если встречается панель, то

								//Если до этого был коннектор или профиль
		 						if ( obj.prevItem === 3 || obj.prevItem === 2  ){
		 							//Значит встречается новая панель. Пушим старый, создаем новый
		 							obj = { 
		 								length : 1, 
		 								startIndex : zIndex, 
		 								prevItem : obj.prevItem, 
		 								chars : { length1: 1, length2: 1 }, 
		 								points : { i1 : zIndex, i2 : yIndex }
		 							}
								} else if (  obj.prevItem === 1 ){ // если до этого была панель
									//Панель продолжается
									obj = { ...obj, length: obj.length + 1 }
								}

							} else if ( zm === 3 || zm === 2 ){ //Если коннектор или профиль

								if ( obj.prevItem === 1 ){ // если до этого была панель

									//Значит панель закончилась. Пушим панель.
									//Ищем длину её другой стороны:
									let lengthOther = 0, isEnd = false;;

									for ( let i = yIndex; i < xm.length; i++ ){

										if ( !isEnd ){
											let item = matrix[xIndex][i][obj.startIndex];
											if ( item === 1 ){ //Встретилась панель
												lengthOther++;
											}else{
												isEnd = true;
											}
										}
									}
					
									obj.chars.length1 = obj.length;
									obj.chars.length2 = lengthOther;

									obj.points.i1 = obj.startIndex;
									obj.points.i2 = yIndex;

		 							panelsObj.push( obj );
		 							//Обнуляем панель
		 							obj = { length : 0, startIndex : 0, prevItem : obj.prevItem, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 } }
								}

							}
							
						}

						obj.prevItem = zm;

					} );

				}

			} );

			if ( panelsObj.length ){

				panelsObj.forEach( (item) => {

					const dist = { 
						x : ( xIndex * 72.5 ), 
						y : ( ( ((item.chars.length2+1)/2 + item.points.i2-1) * 72.5) ), 
						z : ( ( ((item.chars.length1+1)/2 + item.points.i1-1) * 72.5) )
					}

					const paramsPanel = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : 0, rotationY : PI_90, rotationZ : 0,
					}

					const charsPanel = {
						width : {
							value : (((item.chars.length1+1)*72.5)-20),
							status : 'enabled'
						},
						height : {
							value : (((item.chars.length2+1)*72.5)-20),
							status : 'enabled'
						},
						depth : {
							value : 20,
							status : 'disabled'
						},
					}

					let namePanel = 'Panel_';

					if ( charsPanel.width.value > charsPanel.height.value ){
						namePanel = namePanel+charsPanel.height.value+'x'+charsPanel.width.value;
						paramsPanel.rotationZ = PI_90;
					}else{
						namePanel = namePanel+charsPanel.width.value+'x'+charsPanel.height.value;
					}

					responsePush.panels.push( {
						id : 100, 
						name : namePanel, 
						type : 'panel', 
						textureId : 0, 
						chars : charsPanel,
						params : paramsPanel,
					} )


				} );

			}

		}

	} );

	//Генерация панелей сверху вниз
	for ( let yIndex = 0; yIndex < matrix[0].length; yIndex++ ){

		if ( yIndex % 2 === 0 ){

			let panelsObj = [];

			for ( let zIndex = 0; zIndex < matrix[0][0].length; zIndex++ ){

				if ( zIndex !== 0 && zIndex !== matrix[0][0].length-1 && zIndex % 2 !== 0 ){

					let obj = { length : 0, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 }, startIndex : 0, prevItem : -1 }

					for ( let xIndex = 0; xIndex < matrix.length; xIndex++ ){

						let currentItem = matrix[xIndex][yIndex][zIndex];

						let isForbidden = false;
						
						panelsObj.forEach( (item) => {
							if ( 
								item.points.i1 <= xIndex &&
								item.points.i2 <= zIndex &&
								(item.points.i1 + item.chars.length1) >= xIndex && 
								(item.points.i2 + item.chars.length2) >= zIndex
							){
								isForbidden = true;
							}
						} ) 

						if ( !isForbidden ){

							if ( currentItem === 1 ){ //Если встречается панель, то

								//Если до этого был коннектор или профиль
		 						if ( obj.prevItem === 3 || obj.prevItem === 2  ){
		 							//Значит встречается новая панель. Пушим старый, создаем новый
		 							obj = { 
		 								length : 1, 
		 								startIndex : xIndex, 
		 								prevItem : obj.prevItem, 
		 								chars : { length1: 1, length2: 1 }, 
		 								points : { i1 : xIndex, i2 : zIndex }
		 							}
								} else if (  obj.prevItem === 1 ){ // если до этого была панель
									//Панель продолжается
									obj = { ...obj, length: obj.length + 1 }
								}

							} else if ( currentItem === 3 || currentItem === 2 ){ //Если коннектор или профиль

								if ( obj.prevItem === 1 ){ // если до этого была панель

									//Значит панель закончилась. Пушим панель.
									//Ищем длину её другой стороны:
									let lengthOther = 0, isEnd = false;

									for ( let i = zIndex; i < matrix[0][0].length; i++ ){

										if ( !isEnd ){
											let item = matrix[obj.startIndex][yIndex][i];
											if ( item === 1 ){ //Встретилась панель
												lengthOther++;
											}else{
												isEnd = true;
											}
										}
									}
					
									obj.chars.length1 = obj.length;
									obj.chars.length2 = lengthOther;

									obj.points.i1 = obj.startIndex;
									obj.points.i2 = zIndex;

		 							panelsObj.push( obj );
		 							//Обнуляем панель
		 							obj = { length : 0, startIndex : 0, prevItem : obj.prevItem, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 } }
								}

							}
							
						}

						obj.prevItem = currentItem;

					}

				}

			}

			if ( panelsObj.length ){

				panelsObj.forEach( (item) => {

					const dist = { 
						x : ( ( ((item.chars.length1+1)/2 + item.points.i1-1) * 72.5) ), 
						y : ( yIndex * 72.5 ), 
						z : ( ( ((item.chars.length2+1)/2 + item.points.i2-1) * 72.5) )
					}

					const paramsPanel = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : PI_90, rotationY : 0, rotationZ : 0,
					}

					const charsPanel = {
						width : {
							value : (((item.chars.length1+1)*72.5)-20),
							status : 'enabled'
						},
						height : {
							value : (((item.chars.length2+1)*72.5)-20),
							status : 'enabled'
						},
						depth : {
							value : 20,
							status : 'disabled'
						},
					}

					let namePanel = 'Panel_';

					if ( charsPanel.width.value > charsPanel.height.value ){
						namePanel = namePanel+charsPanel.height.value+'x'+charsPanel.width.value;
						paramsPanel.rotationZ = PI_90;
					}else{
						namePanel = namePanel+charsPanel.width.value+'x'+charsPanel.height.value;
					}

					responsePush.panels.push( {
						id : 100, 
						name : namePanel, 
						type : 'panel', 
						textureId : 0, 
						chars : charsPanel,
						params : paramsPanel,
					} )


				} );

			}

		}

	}

	//Генерация панелей сзади вперед
	for ( let zIndex = 0; zIndex < matrix[0][0].length; zIndex++ ){

		if ( zIndex % 2 === 0 ){

			let panelsObj = [];

			for ( let yIndex = 0; yIndex < matrix[0].length; yIndex++ ){

				if ( yIndex !== 0 && yIndex !== matrix[0].length-1 && yIndex % 2 !== 0 ){

					let obj = { length : 0, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 }, startIndex : 0, prevItem : -1 }

					for ( let xIndex = 0; xIndex < matrix.length; xIndex++ ){

						let currentItem = matrix[xIndex][yIndex][zIndex];

						let isForbidden = false;

						panelsObj.forEach( (item) => {
							if ( 
								item.points.i1 <= xIndex &&
								item.points.i2 <= yIndex &&
								(item.points.i1 + item.chars.length1) >= xIndex && 
								(item.points.i2 + item.chars.length2) >= yIndex
							){
								isForbidden = true;
							}
						} ) 

						if ( !isForbidden ){

							if ( currentItem === 1 ){ //Если встречается панель, то

								//Если до этого был коннектор или профиль
		 						if ( obj.prevItem === 3 || obj.prevItem === 2  ){
		 							//Значит встречается новая панель. Пушим старый, создаем новый
		 							obj = { 
		 								length : 1, 
		 								startIndex : xIndex, 
		 								prevItem : obj.prevItem, 
		 								chars : { length1: 1, length2: 1 }, 
		 								points : { i1 : xIndex, i2 : yIndex }
		 							}
								} else if (  obj.prevItem === 1 ){ // если до этого была панель
									//Панель продолжается
									obj = { ...obj, length: obj.length + 1 }
								}

							} else if ( currentItem === 3 || currentItem === 2 ){ //Если коннектор или профиль

								if ( obj.prevItem === 1 ){ // если до этого была панель

									//Значит панель закончилась. Пушим панель.
									//Ищем длину её другой стороны:
									let lengthOther = 0, isEnd = false;

									for ( let i = yIndex; i < matrix[0].length; i++ ){

										if ( !isEnd ){
											let item = matrix[obj.startIndex][i][zIndex];
											if ( item === 1 ){ //Встретилась панель
												lengthOther++;
											}else{
												isEnd = true;
											}
										}
									}
					
									obj.chars.length1 = obj.length;
									obj.chars.length2 = lengthOther;

									obj.points.i1 = obj.startIndex;
									obj.points.i2 = yIndex;

		 							panelsObj.push( obj );
		 							//Обнуляем панель
		 							obj = { length : 0, startIndex : 0, prevItem : obj.prevItem, chars : { length1: 0, length2: 0 }, points : { i1 : 0, i2 : 0 } }
								}

							}
							
						}

						obj.prevItem = currentItem;

					}


				}

			}

			if ( panelsObj.length ){

				panelsObj.forEach( (item) => {

					const dist = { 
						x : ( ( ((item.chars.length1+1)/2 + item.points.i1-1) * 72.5) ), 
						y : ( ( ((item.chars.length2+1)/2 + item.points.i2-1) * 72.5) ), 
						z : ( zIndex * 72.5 )
					}

					const paramsPanel = {
						positionX : startPosition.x + dist.x,
						positionY : startPosition.y + dist.y,
						positionZ : startPosition.z + dist.z,
						rotationX : 0, rotationY : 0, rotationZ : 0,
					}

					const charsPanel = {
						width : {
							value : (((item.chars.length1+1)*72.5)-20),
							status : 'enabled'
						},
						height : {
							value : (((item.chars.length2+1)*72.5)-20),
							status : 'enabled'
						},
						depth : {
							value : 20,
							status : 'disabled'
						},
					}

					let namePanel = 'Panel_';

					if ( charsPanel.width.value > charsPanel.height.value ){
						namePanel = namePanel+charsPanel.height.value+'x'+charsPanel.width.value;
						paramsPanel.rotationZ = PI_90;
					}else{
						namePanel = namePanel+charsPanel.width.value+'x'+charsPanel.height.value;
					}

					responsePush.panels.push( {
						id : 100, 
						name : namePanel, 
						type : 'panel', 
						textureId : 0, 
						chars : charsPanel,
						params : paramsPanel,
					} )


				} );

			}

		}

	}

	let firstParams = {
		positionX : 0, 
		positionY : startPosition.y - (125/2) -10, 
		positionZ : startPosition.z,
		rotationX : PI_90, rotationY : 0, rotationZ : 0,
	}
	let secondParams = {
		positionX : 0, 
		positionY : startPosition.y - (125/2) -10, 
		positionZ : startPosition.z + (((matrix[0][0].length)-1)/2)*145,
		rotationX : PI_90, rotationY : 0, rotationZ : 0,
	}

	//Генерация ножек ( дополнение ).
	if ( side === 'RIGHT' ){

		firstParams.positionX = startPosition.x+step*145;
		secondParams.positionX = startPosition.x+step*145; 

	} else if ( side === 'LEFT' ){

		firstParams.positionX = startPosition.x;
		secondParams.positionX = startPosition.x; 

	}

	if (  side !== 'TOP' ){

		//Дальная ножка
		responsePush.legs.push( {	
			id : 100,
	      	name : 'Leg',
	      	type : 'leg',
	      	params : firstParams,
	    	textureId : null,
		} ); 

		//Ближняя ножка
		responsePush.legs.push( {	
			id : 100,
	      	name : 'Leg',
	      	type : 'leg',
	      	params : secondParams,
	    	textureId : null,
		} ); 	

	}

	return responsePush;

}

const generationOfCellsByCellMatrixAndPointsAndSide = ( matrix, points, side, step ) => {

	//переворачиваем матрицу
	let _matrix = [];

	if ( side === 'TOP' ){

		_matrix = matrix;

	} else {

		for ( let z = 0; z < matrix[0][0].length; z++ ){

			let matrix2 = [];

			for ( let y = 0; y < matrix[0].length; y++ ){

				let matrix3 = [];
				
				for( let x = 0; x < matrix.length; x++ ){

					matrix3.push( matrix[x][y][z] );
					
				}

				matrix2.push( matrix3 );

			}

			_matrix.push( matrix2 );

		}
		

	}

	console.log( _matrix );
	console.log( matrix );

	let responsePush = { ceils : [] };

	let startPosition = { x : 0, y : 0, z : 0, }

	if ( side === 'RIGHT' || side === 'TOP' ){

		startPosition = {
			x : points.x,
			y : points.y,
			z : points.z,
		}

	} else if ( side === 'LEFT' ){

		startPosition = {
			x : points.x - step*145,
			y : points.y,
			z : points.z,
		}

	}

	const getCellsWithPointsByDivided = ( matrix ) => {

		//Эта функция должна на основе делителя сформировать новую матрицу с идеальной разделенной ячейки.	
		let _cells = [];

		matrix.forEach( (xm, xIndex) => {
			xm.forEach( (idCell, yIndex) => {
				if ( idCell !== -1 ){
					if ( !_cells.find( ( cell ) => cell.id === idCell ) ){
						_cells.push( {
							id : idCell,
							tails : [ { points : { x : xIndex, y : yIndex } } ],
							points : {
								p1 : { x : 0, y : 0 },
								p2 : { x : 0, y : 0 },
							}
						} )
					} else {
						let indexCell = _cells.findIndex( (cell) => cell.id === idCell );
						_cells[indexCell].tails.push( { points : { x : xIndex, y : yIndex } } );
					}
				}
			} )
		} );

		//Определяем точки ячеек.
		_cells = _cells.map( (cell) => {
			let points = {
				p1 : { x : 10, y : 10 },
				p2 : { x : 0, y : 0 },
			} 
			cell.tails.forEach( ( tail ) => {
				//Определяем на максимальность
				if ( tail.points.x >= points.p2.x && tail.points.y >= points.p2.y ){
					points.p2.x = tail.points.x;
					points.p2.y = tail.points.y;
				}
				//Определяем на минимальность
				if ( tail.points.x <= points.p1.x && tail.points.y <= points.p1.y ){
					points.p1.x = tail.points.x;
					points.p1.y = tail.points.y;
				}
			} )

			return {  ...cell,  points : points }

		} );

		//Получаем реальные точки в матрице
		_cells = _cells.map( (cell) => {
			return {  
				...cell,  
				realPoints : {
					p1 : { 
						x : cell.points.p1.x * 2, 
						y : cell.points.p1.y * 2 
					},
					p2 : {
						x : cell.points.p2.x * 2 + 2, 
						y : cell.points.p2.y * 2 + 2, 
					},
				} 
			}

		});


		//Теперь нам нужно найтив все унарные ячейки.
		//Просто перебираем все клетки и ищем их в ячейках. Если их нет, добалвляем, как отдльную ячейку.
		matrix.forEach( (xm, xIndex) => {

			xm.forEach( (ym, yIndex) => {

				if ( _cells.findIndex( (cell) => 
					cell.points.p1.x <= xIndex && cell.points.p2.x >= xIndex &&
					cell.points.p1.y <= yIndex && cell.points.p2.y >= yIndex ) === -1 
				){
					_cells.push({

						id : _cells.length,
						points : {
							p1: {
								x : xIndex,
								y : yIndex,
							},
							p2: {
								x : xIndex,
								y : yIndex,
							},
						},
						realPoints : {
							p1: {
								x : xIndex * 2,
								y : yIndex * 2,
							},
							p2: {
								x : xIndex * 2 + 2,
								y : yIndex * 2 + 2,
							},
						}, 
						tails : {
							points : {
								x : xIndex,
								y : yIndex,
							}
						}

					})

				}

			} );

		} ) ;

		return _cells;

	}

	const cells = getCellsWithPointsByDivided( _matrix[0] );	

	console.log( cells );

	//Перебираем массив и генерируем ячейки на основе родительской ячейки.
	cells.forEach( (cell) => {

		let chars = {
			width : {
				value : (((cell.realPoints.p2.y - cell.realPoints.p1.y) * 72.5) - 20),
				status : 'enabled',
			},
			height : {
				value : (((cell.realPoints.p2.x - cell.realPoints.p1.x) * 72.5) - 20),
				status : 'enabled',
			},
			depth : {
				value : ( matrix[0][0].length * 145 - 20 ),
				status : 'enabled',
			},
		}

		let params = { 
			positionX : startPosition.x + ((cell.realPoints.p1.y+((cell.realPoints.p2.y-cell.realPoints.p1.y)/2)))*72.5,
			positionY : startPosition.y + ((cell.realPoints.p1.x+((cell.realPoints.p2.x-cell.realPoints.p1.x)/2)))*72.5,
			positionZ : startPosition.z + (matrix[0][0].length * 145)/2,
		}

		if ( side === 'TOP' ){
			chars = {
				width : {
					value : (((cell.realPoints.p2.x - cell.realPoints.p1.x) * 72.5) - 20),
					status : 'enabled',
				},
				height : {
					value : (((cell.realPoints.p2.y - cell.realPoints.p1.y) * 72.5) - 20),
					status : 'enabled',
				},
				depth : {
					value : ( matrix.length * 145 - 20 ),
					status : 'enabled',
				},
			}
			params = { 
				positionX : startPosition.x + ((cell.realPoints.p1.x+((cell.realPoints.p2.x-cell.realPoints.p1.x)/2)))*72.5,
				positionY : startPosition.y + ((cell.realPoints.p1.y+((cell.realPoints.p2.y-cell.realPoints.p1.y)/2)))*72.5,
				positionZ : startPosition.z + (matrix.length * 145)/2,
			}
		}

		responsePush.ceils.push({
			chars : chars,
			params : params,
			grid : { x : 0, y: 0, z : 0 },
			dimensions : {
				width: chars.width.value + 20*2,
			    height: chars.height.value + 20*2,
			    depth: chars.depth.value + 20*2,
			}
		});

	} );

	return responsePush;

}

const mergingMatrix = ( matrix1, matrix2 ) => {

	const crossedProfiles = ( points, matrix1, matrix2 ) => {

		let bounds = { px : 0, nx : 0, py : 0, ny : 0, pz : 0, nz : 0 };

		if ( points.y !== 0 && matrix1[points.x][points.y-1][points.z] === 2 ){ bounds.ny = 1; } //Низ по y для 1 матрицы 
		if ( points.y !== 0 && matrix2[points.x][points.y-1][points.z] === 2 ){ bounds.ny = 1; } //Низ по y для 2 матрицы  
		if ( points.y !== matrix1[0].length-1 && matrix1[points.x][points.y+1][points.z] === 2 ){ bounds.py = 1; } //Сначала вверх по y для 1 матрицы 
		if ( points.y !== matrix2[0].length-1 && matrix2[points.x][points.y+1][points.z] === 2 ){ bounds.py = 1; } //Сначала вверх по y для 2 матрицы 

		if ( points.x !== 0 && matrix1[points.x-1][points.y][points.z] === 2 ){ bounds.nx = 1; } //Лево по x для 1 матрицы 
		if ( points.x !== 0 && matrix2[points.x-1][points.y][points.z] === 2 ){ bounds.nx = 1; } //Лево по x для 2 матрицы  
		if ( points.x !== matrix1.length-1 && matrix1[points.x+1][points.y][points.z] === 2 ){ bounds.px = 1; } //Право по x для 1 матрицы 
		if ( points.x !== matrix2.length-1 && matrix2[points.x+1][points.y][points.z] === 2 ){ bounds.px = 1; } //Право вверх по x для 2 матрицы 

		if ( points.z !== 0 && matrix1[points.x][points.y][points.z-1] === 2 ){ bounds.nz = 1; } //Назад по z для 1 матрицы 
		if ( points.z !== 0 && matrix2[points.x][points.y][points.z-1] === 2 ){ bounds.nz = 1; } //Назад по z для 2 матрицы  
		if ( points.z !== matrix1[0][0].length-1 && matrix1[points.x][points.y][points.z+1] === 2 ){ bounds.pz = 1; } //Вперед по z для 1 матрицы 
		if ( points.z !== matrix2[0][0].length-1 && matrix2[points.x][points.y][points.z+1] === 2 ){ bounds.pz = 1; } //Вперед вверх по z для 2 матрицы 

		
		if ( 
			( bounds.px == 1 && bounds.nx == 1 && bounds.pz == 1 && bounds.nz == 1 ) || //Рассматриваем по горизонтали
			( bounds.py == 1 && bounds.ny == 1 && bounds.pz == 1 && bounds.nz == 1 )    //Рассматриваем по вертикали
		){
			return true;
		}

		return false;

	}

	//Слияние матриц.
	return matrix1.map( (xm, xIndex) => {

		return xm.map( ( ym, yIndex ) => {

			return ym.map( (zm, zIndex) => {

				if ( zm < matrix2[xIndex][yIndex][zIndex] ){
					return matrix2[xIndex][yIndex][zIndex];
				}else{

					if ( zm === matrix2[xIndex][yIndex][zIndex] && zm === 2 ){ //Если сливаются два профиля

						if ( crossedProfiles( { x : xIndex, y : yIndex, z : zIndex }, matrix1, matrix2 ) ){
							return 3;
						}

					}

					return zm;
				}

			} )

		} )

	} );

}

const getUnaryMatrixByOriginalMatrix = ( matrix, states ) => {

	const isObject = ( elem ) => {

		if ( typeof elem === 'object' ){
			return true;
		}
		return false;

	}

	const isUndefined = ( value ) => {
		if ( value === 'undefined' ){
			return true;
		}
		return false;
	} 

	const getValueElementByType = ( type ) => {

		if ( type === 'finger' ){
			return 3;
		}else if ( type === 'profile' ){
			return 2;
		}else if ( type === 'panel' ){
			return 1;
		} else{
			return 0;
		}

	}

	const getOrientationProfile = ( obj ) => {
		let params = obj.params;
		if ( params.rotationX === 0 && params.rotationY === 0 && params.rotationZ === 0){
			return 1;
		} else if( params.rotationX === PI_90 && params.rotationY === 0 && params.rotationZ === 0) {
			return 2;
		} else if ( 
			( params.rotationX === 0 && params.rotationY === PI_90 && params.rotationZ === 0 ) ||
			( params.rotationX === PI_90 && params.rotationY === PI_90 && params.rotationZ === PI_90 )
		){
			return 3;
		}
		return 0; //Неопределен
	}

	const getOrientationPanel = ( obj ) => {

		if ( 
			obj.params.rotationX === 0 &&
			obj.params.rotationY === 0 &&
			obj.params.rotationZ === 0 
		){
			return 1;
		} else if ( 
			obj.params.rotationX === PI_90 &&
			obj.params.rotationY === 0 &&
			obj.params.rotationZ === 0 
		){
			return 2;
		} else if (
			obj.params.rotationX === 0 &&
			obj.params.rotationY === PI_90 &&
			obj.params.rotationZ === 0
		){
			return 3;
		} else if (
			obj.params.rotationX === 0 &&
			obj.params.rotationY === 0 &&
			obj.params.rotationZ === PI_90
		){
			return 4;
		} else if (
			obj.params.rotationX === PI_90 &&
			obj.params.rotationY === 0 &&
			obj.params.rotationZ === PI_90
		){
			return 5;
		}else if (
			obj.params.rotationX === 0 &&
			obj.params.rotationY === PI_90 &&
			obj.params.rotationZ === PI_90
		){
			return 6;
		}

	} 

	const getUnaryViewObjProfile = ( target, matrix ) => {

		let unaryArrayObj = [];
		//Сначала определеяем его ориентацию.
		const orientation = getOrientationProfile( target.obj );

		//Получаем длину профиля в упрощенном виде.
		const lengthSimplified = ((target.obj.chars.depth.value + 20)/72.5) - 1;

		if ( orientation === 1 ){ //горизонтально к нам.
			for ( let i = -1 * ((lengthSimplified-1)/2); i <= ((lengthSimplified-1)/2); i++ ){
				unaryArrayObj.push( {
					value : 2,
					points : {
						x : target.points.x,
						y : target.points.y,
						z : target.points.z + i,
					},
					orientation : orientation,
					length : lengthSimplified,
				} )
			}
		} else if ( orientation === 2 ){ //вертикално
			for ( let i = -1 * ((lengthSimplified-1)/2); i <= ((lengthSimplified-1)/2); i++ ){
				unaryArrayObj.push( {
					value : 2,
					points : {
						x : target.points.x,
						y : target.points.y + i,
						z : target.points.z,
					},
					orientation : orientation,
					length : lengthSimplified,
					obj : target.obj,
				} )
			}
		} else if ( orientation === 3 ){ //горизонтально в стороны
			for ( let i = -1 * ((lengthSimplified-1)/2); i <= ((lengthSimplified-1)/2); i++ ){
				unaryArrayObj.push( {
					value : 2,
					points : {
						x : target.points.x + i,
						y : target.points.y ,
						z : target.points.z,
					},
					orientation : orientation,
					length : lengthSimplified,
				} )
			}
		}

		return unaryArrayObj;

	}

	const getUnaryViewObjPanel = ( target, matrix ) => {

		let unaryArrayObj = [];
		//Сначала определеяем его ориентацию.
		const orientation = getOrientationPanel( target.obj );
		
		//Получаем длину панели в упрощенном виде.
		const lengthSimplified = {
			width : ((target.obj.chars.width.value + 20)/72.5) - 1,
			height : ((target.obj.chars.height.value + 20)/72.5) - 1,
		}

		if ( orientation === 1 || orientation === 4 ){ //вертикально
			for ( let x = -1 * ((lengthSimplified.width-1)/2); x <= ((lengthSimplified.width-1)/2); x++ ){
				for ( let y = -1 * ((lengthSimplified.height-1)/2); y <= ((lengthSimplified.height-1)/2); y++  ){
					unaryArrayObj.push( {
						value : 1,
						points : {
							x : target.points.x + x,
							y : target.points.y + y,
							z : target.points.z,
						}
					} )
				}
			}
		} else if ( orientation === 2 || orientation === 5 ){ //горихзонтально к нам
			for ( let x = -1 * ((lengthSimplified.width-1)/2); x <= ((lengthSimplified.width-1)/2); x++ ){
				for ( let z = -1 * ((lengthSimplified.height-1)/2); z <= ((lengthSimplified.height-1)/2); z++  ){
					unaryArrayObj.push( {
						value : 1,
						points : {
							x : target.points.x + x,
							y : target.points.y,
							z : target.points.z + z,
						}
					} )
				}
				
			}
		} else if ( orientation === 3 || orientation === 6 ){ //вертикально 
			for ( let z = -1 * ((lengthSimplified.width-1)/2); z <= ((lengthSimplified.width-1)/2); z++ ){
				for ( let y = -1 * ((lengthSimplified.height-1)/2); y <= ((lengthSimplified.height-1)/2); y++  ){
					unaryArrayObj.push( {
						value : 1,
						points : {
							x : target.points.x,
							y : target.points.y + y,
							z : target.points.z + z,
						}
					} )
				}
				
			}
		}

		return unaryArrayObj;

	}

	//Создамем матрицу такой же размерности.
	let unaryMatrix = [], sizeMatrix = {
		x : matrix.length,
		y : matrix[0].length,
		z : matrix[0][0].length,
	};
	for ( let x = 0; x < sizeMatrix.x; x++ ){
	    unaryMatrix.push([]);
	    for ( let y = 0; y < sizeMatrix.y; y++ ){
	      unaryMatrix[x].push([]);
	      for ( let z = 0; z < sizeMatrix.z; z++ ){
	        unaryMatrix[x][y].push( 0 );
	      }
	    }
	}		

	matrix.forEach( (xm, xIndex) => {
		xm.forEach( (ym, yIndex) => {
			ym.forEach( (zm, zIndex) => {

				if ( isObject( zm ) ){

					let points = { x : xIndex, y : yIndex, z : zIndex };

					if ( getValueElementByType( zm.type ) === 3 ){ //Рабоатем с коннектором
						unaryMatrix[ xIndex ][ yIndex ][ zIndex ] = 3;
					}
					else if ( getValueElementByType( zm.type ) === 2 ){ //Работаем с профилем

						//Получаем элемент
						let objProfile = states.profiles.find( (item) => item.id === zm.id );

						if ( !isUndefined( objProfile ) ){

							const unaryViewObj = getUnaryViewObjProfile( { obj : objProfile, points : points }, matrix );

							// console.log( unaryViewObj );

							//Заполняем матрицу данными с унарного вида объекта.
							unaryViewObj.forEach( ( item ) => {

								// console.log( item );

								unaryMatrix[ item.points.x ][ item.points.y ][ item.points.z ] = item.value;
							} )

						}  

					}
					else if ( getValueElementByType( zm.type ) === 1 ){ //работаем с панелями.

						//Получаем элемент
						let objPanel = states.panels.find( (item) => item.id === zm.id );

						if ( !isUndefined( objPanel ) ){

							const unaryViewObj = getUnaryViewObjPanel( { obj : objPanel, points : points }, matrix );

							// console.log( unaryViewObj );
							//Заполняем матрицу данными с унарного вида объекта.
							unaryViewObj.forEach( ( item ) => {
								unaryMatrix[ item.points.x ][ item.points.y ][ item.points.z ] = item.value;
							} )

						}  


					}

				}

			} )

		} ); 

	} );

	return unaryMatrix;

}

const removeMatrix = ( matrix, states ) => {

	const isObject = ( elem ) => {

		if ( typeof elem === 'object' ){
			return true;
		}
		return false;

	}

	const isUndefined = ( value ) => {
		if ( value === 'undefined' ){
			return true;
		}
		return false;
	} 

	const getSlugStateByTypeObj = ( type ) => {

		if ( type === 'finger' ){
			return 'fingers';
		} else if ( type === 'panel' ){
			return 'panels';
		} else if ( type === 'profile' ){
			return 'profiles';
		} else if ( type === 'leg' ){
			return 'legs';
		}
	} 

	let responseRemove = { panels : [], profiles : [], fingers : [], legs : [], ceil : [] };

	matrix.forEach( (xm, xIndex) => {

		xm.forEach( ( ym, yIndex ) => {

			ym.forEach( ( zm, zIndex ) => {

				if ( isObject( zm ) ){

					const slugState = getSlugStateByTypeObj ( zm.type );

					const obj = states[slugState].find( (item) => item.id === zm.id );

					if ( !isUndefined( obj ) ){
						responseRemove[ slugState ].push ( obj );
					}

				}

			} );

		} );

	} );

	return responseRemove;

}

const getExtremePointsByUnaryCellMatrix = ( unaryCellMatrix, side, cells ) => {

	const getObjById = ( id, cells ) => {

		return cells.find( ( cell ) => cell.id === id );;

	}

	const getExtremePointsByCell = ( cell, side ) => {

		if ( side === 'LEFT' ){

			return {
				x : cell.params.positionX - (  cell.chars.width.value / 2 + 10 ),
				y : cell.params.positionY - (  cell.chars.height.value / 2 + 10 ),
				z : cell.params.positionZ - (  cell.chars.depth.value / 2 + 10 ),
			}

		} else if ( side === 'RIGHT' ){

			return {
				x : cell.params.positionX + (  cell.chars.width.value / 2 + 10 ),
				y : cell.params.positionY - (  cell.chars.height.value / 2 + 10 ),
				z : cell.params.positionZ - (  cell.chars.depth.value / 2 + 10 ),
			}

		}

	}

	//1. Получаем ID самой нижней ячейки в матрице.
	const cellID = unaryCellMatrix[0][0][0];

	//2. Получаем объект ячейки
	const objCell = getObjById( cellID, cells );

	//3. Получаем крайние точки
	const points = getExtremePointsByCell ( objCell, side );

	return points;

} 

const getUnaryCellMatrixCornice = ( grid, side, step ) => {

	const getIndexDublicateMatrixBySide = ( grid, side ) => {
		if ( side === 'LEFT' ){
			return 0;
		} else if (  side === 'RIGHT' ){
			return grid.length-1;
		} else {
			console.err( 'Сторона не найдена!' );
		}
	}

	const getMatrixSideByIndex = ( grid, index ) => {

		return grid[index];

	} 

	const getCleanMatrixSideByIndex = ( matrix ) => {

		const listCell = [];

		return matrix.map( ( xm, xIndex ) => {

			return xm.map ( ( ym, yIndex) => {

				//Если есть ячейка
				if ( ym > 0 ){

					//Если нащли совпадение
					if ( listCell.findIndex( (cellID) => cellID === ym ) !== -1 ){

						return listCell.findIndex( (cellID) => cellID === ym ) + 1;

					} else{

						listCell.push( ym );

						return listCell.length;

					}

				}

			} );

		} );

	}

	const getDublicateMatrix = ( matrix, amount ) => {

		const dublicateMatrix = [];

		for ( let i = 0; i < amount; i++ ){
			dublicateMatrix.push( matrix );
		} 

		return dublicateMatrix;

	} 

	//1. В зависимости от стороны получаем индекс стороны, которую мы будем дубировать.
	const indexDublicateMatrix = getIndexDublicateMatrixBySide( grid, side );

	//2. Получаем сторону матрицы из глобальной сетки, которую мы будем дублировать
	const matrixSide = getMatrixSideByIndex ( grid, indexDublicateMatrix );

	//3. Эту сторону теперь нам нужно отчистить от старых ID и вручить им новые.
	// const cleanMatrixSide = getCleanMatrixSideByIndex ( matrixSide );

	//4 Теперь создаем массив, состоящий из четырех продублированных из стороны матрицы.
	const dublicateMatrix = getDublicateMatrix ( matrixSide, step );

	return dublicateMatrix;

} 

const getComplexMatrixByUnaryCellMatrix = ( unaryCellMatrix ) => {

	const getComplexMatrix = ( unaryCellMatrix ) => {

		let matrix = [];

		const charsMatrix = {
			width : (unaryCellMatrix.length * 2 + 1),
			height : (unaryCellMatrix[0].length * 2 + 1),
			depth : (unaryCellMatrix[0][0].length * 2 + 1),
		}

		console.log( charsMatrix );

		for ( let x = 0; x < charsMatrix.width; x++ ){
			matrix.push([]);
			for ( let y = 0; y < charsMatrix.height; y++ ){
				matrix[x].push([]);
				for ( let z = 0; z < charsMatrix.depth; z++ ){
					matrix[x][y].push( 0 );
				}

			}

		}

		return matrix;

	}

	const initAroundComplexMatrix = ( matrix ) => {

		return matrix.map( (xm, xIndex) => {

			return xm.map( (ym, yIndex) => {

				return ym.map( (zm, zIndex) => {

					if (
						( xIndex === 0 || xIndex === matrix.length-1 ) && 
						( yIndex === 0 || yIndex === xm.length-1 ) && 
						( zIndex === 0 || zIndex === ym.length-1 )
					){
						return 3;
					} else if ( 
						( xIndex === 0 && zIndex === 0 ) ||
						( xIndex === 0 && zIndex === ym.length-1 ) ||
						( xIndex === matrix.length-1 && zIndex === 0 ) ||
						( xIndex === matrix.length-1 && zIndex === ym.length-1 ) ||
						( xIndex === 0 && yIndex === 0 ) ||
						( xIndex === 0 && yIndex === xm.length-1 ) ||
						( xIndex === matrix.length-1 && yIndex === 0 ) ||
						( xIndex === matrix.length-1 && yIndex === xm.length-1 ) ||
						( zIndex === 0 && yIndex === 0 ) ||
						( zIndex === 0 && yIndex === xm.length-1 ) ||
						( zIndex === ym.length-1 && yIndex === 0 ) ||
						( zIndex === ym.length-1 && yIndex === xm.length-1 )
					){
						return 2; //Возвращаем профиль
					} else {
						return zm;
					}

				} );

			} );

		} );

	}

	const initFingersComplexMatrix = ( matrix, unaryMatrix ) => {

		const getIntervals = ( unaryMatrix ) => {

			let _intervals = []; let _id = -1;
			unaryCellMatrix[0].forEach(  (ym, yIndex) => {

				if ( _id !== ym[0] ){
					_intervals.push( yIndex );
					_id = ym[0];
				}

			});

			return _intervals;

		}

		//1. Проходимся по унарной матрице и получаем интервалы, по которым мы будем ставит коннекторы
		const intervals = getIntervals( unaryMatrix );

		//2. На основе интервало заполянем все нужные слои коннекторами

		intervals.forEach( ( interval ) => {

			if ( interval !== 0 ){

				let index = interval * 2;

				//Заполняем слой коннекторами
				matrix[0][index][0] = 3;
				matrix[0][index][matrix[0][0].length-1] = 3;
				matrix[matrix.length-1][index][0] = 3;
				matrix[matrix.length-1][index][matrix[0][0].length-1] = 3;

			}

		} );

		return matrix;

	}

	const initProfilesComplexMatrix = ( matrix ) => {

		//Заполняем матрицу горизонтальными профилями по Оси X.
		matrix[0].forEach( (ym, yIndex) => {
			if ( yIndex !== 0 || yIndex !== matrix[0].length-1 ){
				ym.forEach( ( zm, zIndex ) => {
					if ( zIndex === 0 || zIndex === ym.length-1 ){
						if ( zm === 3 ){
							for ( let x = 1; x < matrix.length-1; x++ ){
								matrix[x][yIndex][zIndex] = 2;
							}
						}
					}
				} );
			}
		} );

		//Заполняем матрицу горизонтальными профилями по Оси Z.
		matrix.forEach( ( xm, xIndex ) => {

			if ( xIndex === 0 || xIndex === matrix.length-1 ){

				xm.forEach( (ym, yIndex) => {

					if ( yIndex !== 0 || yIndex !== matrix[0].length-1 ){

						ym.forEach( ( zm, zIndex ) => {

							if ( zIndex === 0 ){
								if ( zm === 3 ){
									for ( let z = 1; z < ym.length-1; z++ ){
										matrix[xIndex][yIndex][z] = 2;
									}
								}
							}

						} );

					}
				} );

			}
			
		} );
 
		return matrix;

	}

	const initPanelsComplexMatrix = ( matrix ) => {

		//1. Расставляем панели вокруг матрицы.
		matrix = matrix.map( (xm, xIndex) => {

			return xm.map( (ym, yIndex) => {

				return ym.map( (zm, zIndex) => {

					if (
						!( xIndex !== 0 && xIndex !== matrix.length-1 &&
						   yIndex !== 0 && yIndex !== xm.length-1 &&
						   zIndex !== 0 && zIndex !== ym.length-1 )
					){
						if ( zm === 0 && zIndex !== ym.length-1 ){
							return 1;
						} 
					}
					
					return zm;

				} );

			} );

		} );

		//2. Расставляем панели по дополнительным профилям.

		matrix[0].forEach( ( ym, yIndex ) => {
			ym.forEach( ( zm, zIndex ) => {
				if ( zIndex !== 0 && zIndex !== ym.length-1 ){
					if ( zm === 2 ){ //Если профиль
						for( let x = 1; x < matrix.length-1; x++ ){
							matrix[x][yIndex][zIndex] = 1;

						}
					}
				}
			} );
		} );

		return matrix;

	}

	//1. Генерируем матрицу с соответствующей размерностью на основе унарно ячеечной матрицей.
	let complexMatrix = getComplexMatrix ( unaryCellMatrix );

	//2. Заполняем матрицу всеми профилями по вертикали и крайние горизонтальные, а также коннеторами на вершинах
	complexMatrix = initAroundComplexMatrix( complexMatrix );

	//3. Теперь на основе унарной ячеечной матрицы формируем все недостающие коннекторы
	complexMatrix = initFingersComplexMatrix( complexMatrix, unaryCellMatrix );

	//4. По все коннекторам достраиваем недостающие профили.
	complexMatrix = initProfilesComplexMatrix( complexMatrix );

	//5. Заполняем всю матрицу панелями за ислючением фронтальной стороны
	complexMatrix = initPanelsComplexMatrix( complexMatrix );

	return complexMatrix

}

const getPointsForOriginalMatrix = ( cells, extremePoints ) => {

	//1. Первая точка нам известна. Остлось найти самую высокую. Находим высоту
	let points = {
		first : { 
			position : {
				...extremePoints
			}
		},
		second : {
			position : {
				x : extremePoints.x,
				y : ( cells[0].length-2 ) * 145,
				z : ( cells[0][0].length-2 ) * 145,
			}
		}
	}

	return points;

}

const getOriginalMatrixByPoints = ( points, complexMatrix, side, states ) => {

	const initCleanMatrixByMatrix = ( matrix ) => {

		let cleanMatrix = [];

		for ( let x = 0; x < matrix.length; x++ ){
			cleanMatrix.push([]);
			for ( let y = 0; y < matrix[0].length; y++ ){
				cleanMatrix[x].push([]);
				for ( let z = 0; z < matrix[0][0].length; z++ ){
					cleanMatrix[x][y].push( 0 );
				}

			}

		}

		return cleanMatrix;

	}
	

	//1. Сначала сгенерируем матрицу с такой же размерностью, как и у входящей матрицы.
	const complexOriginalMatrix = initCleanMatrixByMatrix( complexMatrix ) ;

	//2. Теперь получим сложную матрицу по точкам
	const originalMatrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers );

	//3. Мержим матрицы
	originalMatrix.forEach( (xm, xIndex) => {

		xm.forEach( (ym, yIndex) => {

			ym.forEach( (zm, zIndex) => {

				if ( side === 'RIGHT' ){
					complexOriginalMatrix[xIndex][yIndex][zIndex] = zm;
				} else if ( side === 'LEFT' ){
					complexOriginalMatrix[complexOriginalMatrix.length-1][yIndex][zIndex] = zm;
				}

			} );

		} );

	} );

	return complexOriginalMatrix;

}

const defineSideByElement = ( elem ) => {

	if ( typeof elem === 'object' ){
		if ( elem.params.positionX >= 0 ){
			return 'RIGHT';
		} else {
			return 'LEFT';
		}
	} else {
		return elem;
	}

}

// ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ ДЛЯ ГОРИЗОНТАЛЬНОГО КАРКАСА
const getUnaryCellMatrixCornice_ROW = ( grid, step ) => {

	const getMatrixTopSide = ( grid ) => {

		let matrixTop = [];

		grid.forEach( (xm, xIndex) => {

			xm.forEach( (ym, yIndex) => {

				if ( yIndex === xm.length-1){
					matrixTop.push( ym );
				}

			} ) ;

		} );

		return matrixTop;

	} 

	const getDublicateMatrix = ( matrix, amount ) => {

		const dublicateMatrix = [];

		for ( let x = 0; x < matrix.length; x++ ){

			let _matrix = [];

			for ( let i = 0; i < amount; i++ ){
				_matrix.push( matrix[x] );
			} 

			dublicateMatrix.push( _matrix );

		}

		
		return dublicateMatrix;

	} 

	//1. Получаем сторону матрицы из глобальной сетки, которую мы будем дублировать
	const matrixSide = getMatrixTopSide ( grid  );

	//2 Теперь создаем массив, состоящий из четырех продублированных из стороны матрицы.
	const dublicateMatrix = getDublicateMatrix ( matrixSide, step );

	return dublicateMatrix;

}

const getExtremePointsByUnaryCellMatrix_ROW = ( unaryCellMatrix, cells ) => {

	const getObjById = ( id, cells ) => {

		return cells.find( ( cell ) => cell.id === id );;

	}

	const getExtremePointsByCell = ( cell ) => {
		return {
			x : cell.params.positionX - (  cell.chars.width.value / 2 + 10 ),
			y : cell.params.positionY + (  cell.chars.height.value / 2 + 10 ),
			z : cell.params.positionZ - (  cell.chars.depth.value / 2 + 10 ),
		}
	}

	//1. Получаем ID самой верхней левой ячейки в матрице.
	const cellID = unaryCellMatrix[0][ unaryCellMatrix[0].length-1][0];

	//2. Получаем объект ячейки
	const objCell = getObjById( cellID, cells );

	//3. Получаем крайние точки
	const points = getExtremePointsByCell ( objCell );

	return points;

}

const getPointsForOriginalMatrix_ROW = ( cells, extremePoints ) => {

	//1. Первая точка нам известна. Остлось найти самую высокую. Находим высоту
	let points = {
		first : { 
			position : {
				...extremePoints
			}
		},
		second : {
			position : {
				x : ( cells.length-2 ) * 145 + extremePoints.x + 290,
				y : ( cells[0].length-2 ) * 145,
				z : ( cells[0][0].length-2 ) * 145,
			}
		}
	}

	return points;

}

const getOriginalMatrixByPoints_ROW = ( points, complexMatrix, states ) => {

	const initCleanMatrixByMatrix = ( matrix ) => {

		let cleanMatrix = [];

		for ( let x = 0; x < matrix.length; x++ ){
			cleanMatrix.push([]);
			for ( let y = 0; y < matrix[0].length; y++ ){
				cleanMatrix[x].push([]);
				for ( let z = 0; z < matrix[0][0].length; z++ ){
					cleanMatrix[x][y].push( 0 );
				}

			}

		}

		return cleanMatrix;

	}
	
	//1. Сначала сгенерируем матрицу с такой же размерностью, как и у входящей матрицы.
	const complexOriginalMatrix = initCleanMatrixByMatrix( complexMatrix ) ;

	//2. Теперь получим сложную матрицу по точкам
	const originalMatrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers );

	//3. Мержим матрицы
	originalMatrix.forEach( (xm, xIndex) => {
		xm.forEach( (ym, yIndex) => {
			ym.forEach( (zm, zIndex) => {
				complexOriginalMatrix[xIndex][yIndex][zIndex] = zm;
			} );
		} );
	} );

	return complexOriginalMatrix;

}

const getComplexMatrixByUnaryCellMatrix_ROW = ( unaryCellMatrix ) => {

	const getComplexMatrix = ( unaryCellMatrix ) => {

		let matrix = [];

		const charsMatrix = {
			width : (unaryCellMatrix.length * 2 + 1),
			height : (unaryCellMatrix[0].length * 2 + 1),
			depth : (unaryCellMatrix[0][0].length * 2 + 1),
		}

		console.log( charsMatrix );

		for ( let x = 0; x < charsMatrix.width; x++ ){
			matrix.push([]);
			for ( let y = 0; y < charsMatrix.height; y++ ){
				matrix[x].push([]);
				for ( let z = 0; z < charsMatrix.depth; z++ ){
					matrix[x][y].push( 0 );
				}

			}

		}

		return matrix;

	}

	const initAroundComplexMatrix = ( matrix ) => {

		return matrix.map( (xm, xIndex) => {

			return xm.map( (ym, yIndex) => {

				return ym.map( (zm, zIndex) => {

					if (
						( xIndex === 0 || xIndex === matrix.length-1 ) && 
						( yIndex === 0 || yIndex === xm.length-1 ) && 
						( zIndex === 0 || zIndex === ym.length-1 )
					){
						return 3;
					} else if ( 
						( xIndex === 0 && zIndex === 0 ) ||
						( xIndex === 0 && zIndex === ym.length-1 ) ||
						( xIndex === matrix.length-1 && zIndex === 0 ) ||
						( xIndex === matrix.length-1 && zIndex === ym.length-1 ) ||
						( xIndex === 0 && yIndex === 0 ) ||
						( xIndex === 0 && yIndex === xm.length-1 ) ||
						( xIndex === matrix.length-1 && yIndex === 0 ) ||
						( xIndex === matrix.length-1 && yIndex === xm.length-1 ) ||
						( zIndex === 0 && yIndex === 0 ) ||
						( zIndex === 0 && yIndex === xm.length-1 ) ||
						( zIndex === ym.length-1 && yIndex === 0 ) ||
						( zIndex === ym.length-1 && yIndex === xm.length-1 )
					){
						return 2; //Возвращаем профиль
					} else {
						return zm;
					}

				} );

			} );

		} );

	}

	const initFingersComplexMatrix = ( matrix, unaryMatrix ) => {

		const getIntervals = ( unaryMatrix ) => {

			let _intervals = []; let _id = -1;

			unaryCellMatrix.forEach( ( xm, xIndex ) => {

				if ( _id !== xm[0][0] ){
					_intervals.push( xIndex );
					_id = xm[0][0];
				}

			} );

			return _intervals;

		}

		//1. Проходимся по унарной матрице и получаем интервалы, по которым мы будем ставит коннекторы
		const intervals = getIntervals( unaryMatrix );

		//2. На основе интервалов заполянем все нужные слои коннекторами
		intervals.forEach( ( interval ) => {

			if ( interval !== 0 ){

				let index = interval * 2;
				//Заполняем слой коннекторами
				matrix[index][0][0] = 3;
				matrix[index][matrix[0].length-1][0] = 3;
				matrix[index][0][matrix[0][0].length-1] = 3;
				matrix[index][matrix[0].length-1][matrix[0][0].length-1] = 3;

			}

		} );

		return matrix;

	}

	const initProfilesComplexMatrix = ( matrix ) => {

		//Заполняем матрицу горизонтальными профилями по Оси Y.
		matrix.forEach( ( xm, xIndex ) => {
			if ( xIndex !== 0 && xIndex !== matrix.length-1 ) {
				xm.forEach( ( ym, yIndex) => {
					ym.forEach( ( zm, zIndex ) => {	
						if ( zIndex === 0 || zIndex === ym.length-1 ){
							if ( zm === 3 ){
								for ( let y = 1; y < xm.length-1; y++ ){
									matrix[xIndex][y][zIndex] = 2;
								}
							}
						}
					} );
				} );
			}
		} );

		//Заполняем матрицу горизонтальными профилями по Оси Z.
		matrix.forEach( ( xm, xIndex ) => {
			if ( xIndex !== 0 && xIndex !== matrix.length-1 ){
				xm.forEach( ( ym, yIndex) => {
					if ( yIndex === 0 || yIndex === xm.length-1 ){
						ym.forEach( ( zm, zIndex ) => {	
							if ( zm === 3 ){
								for ( let z = 1; z < ym.length-1; z++ ){
									matrix[xIndex][yIndex][z] = 2;
								}
							}
						} );
					}
				} );
			}
		} );

 
		return matrix;

	}

	const initPanelsComplexMatrix = ( matrix ) => {

		//1. Расставляем панели вокруг матрицы.
		matrix = matrix.map( (xm, xIndex) => {

			return xm.map( (ym, yIndex) => {

				return ym.map( (zm, zIndex) => {

					if (
						!( xIndex !== 0 && xIndex !== matrix.length-1 &&
						   yIndex !== 0 && yIndex !== xm.length-1 &&
						   zIndex !== 0 && zIndex !== ym.length-1 )
					){
						if ( zm === 0 && zIndex !== ym.length-1 ){
							return 1;
						} 
					}
					
					return zm;

				} );

			} );

		} );

		//2. Расставляем панели по дополнительным профилям.

		matrix.forEach( ( xm, xIndex ) => {

			if ( xIndex !== 0 && xIndex !== matrix.length-1 ){
				xm.forEach( ( ym, yIndex ) => {
					ym.forEach( ( zm, zIndex ) => {
						if ( zIndex !== 0 && zIndex !== ym.length-1 ){
							if ( zm === 2 ){ //Если профиль
								for( let y = 1; y < matrix[0].length-1; y++ ){
									matrix[xIndex][y][zIndex] = 1;

								}
							}
						}
					} );
				} );
			}
		} );

		return matrix;

	}

	//1. Генерируем матрицу с соответствующей размерностью на основе унарно ячеечной матрицей.
	let complexMatrix = getComplexMatrix ( unaryCellMatrix );

	//2. Заполняем матрицу всеми профилями по вертикали и крайние горизонтальные, а также коннеторами на вершинах
	complexMatrix = initAroundComplexMatrix( complexMatrix );

	//3. Теперь на основе унарной ячеечной матрицы формируем все недостающие коннекторы
	complexMatrix = initFingersComplexMatrix( complexMatrix, unaryCellMatrix );

	//4. По все коннекторам достраиваем недостающие профили.
	complexMatrix = initProfilesComplexMatrix( complexMatrix );

	//5. Заполняем всю матрицу панелями за ислючением фронтальной стороны
	complexMatrix = initPanelsComplexMatrix( complexMatrix );

	return complexMatrix

}

const getUnaryCellMatrixCorniceForGeneration_ROW = ( matrix ) => {

	console.log( matrix );

	let _matrix = [[]];

	matrix.forEach( (xm, xIndex) => {

		let matrix2 = [];
		xm.forEach( ( ym, yIndex ) => {
			ym.forEach( (zm, zIndex) => {
				if ( zIndex === 0 ){
					matrix2.push( zm );
				}
			} );
		} );
		_matrix[0].push(matrix2);
	} );

	for ( let i = 1; i < matrix[0][0].length; i++ ){
		_matrix.push([]);
		_matrix[i] = _matrix[0];
	}

	return _matrix;

}

export const addNewRowCornice = ( step, states ) => {

	//0. Определяем сторону
	const side = 'TOP';

	//1. Получаем унарную ячеечную матрицу, которую нам нужно получить в результате 
	const unaryCellMatrixCornice = getUnaryCellMatrixCornice_ROW( states.ceilsGrid, step );
	// console.log(unaryCellMatrixCornice  );

	//2. Получаем координаты самой крайней точки в глобальной сетке по унарной матрице
	const extremePoints = getExtremePointsByUnaryCellMatrix_ROW ( unaryCellMatrixCornice, states.ceils );
	// console.log( extremePoints );

	//3. На основе унарной ячеечной матрицы формируем "идеальную" коплексную матрицу
	const complexMatrixByUnaryCellMatrix = getComplexMatrixByUnaryCellMatrix_ROW ( unaryCellMatrixCornice );
	console.log( complexMatrixByUnaryCellMatrix );

	//4. Получаем точки по которым нужно получить оригинальную матрицу.
	const points = getPointsForOriginalMatrix_ROW ( states.ceilsGrid, extremePoints );
	// console.log( points );

	//5. Получаем оригинальную матрицу по точкам, но ВАЖНО с сходной размерностью комплексной матрицы
	const originalMatrix = getOriginalMatrixByPoints_ROW( points, complexMatrixByUnaryCellMatrix, states )
	// console.log( originalMatrix );

	//6. Получаем комлекснумаю матрицу по оригинально матрице. 
	const complexOriginalMatrix = getUnaryMatrixByOriginalMatrix( originalMatrix, states );
	// console.log( complexOriginalMatrix );

	//7. Мержим две матрицы
	const mergedUnaryMatrix = mergingMatrix( complexOriginalMatrix, complexMatrixByUnaryCellMatrix );
	// console.log( mergedUnaryMatrix );

	//8. Удаляем все элементы с оригинальной матрицы 
	const responseRemove = removeMatrix( originalMatrix, states );

	//9. Генерируем элементы по комплексной матрице, а также ножки (высчитываются отдельно).
	const responsePush = generationOfElementsByMatrixAndExtremePointsAndSide( mergedUnaryMatrix, extremePoints, side, step );
	
	//10.1 Проводим небольшие манипуляции с unaryCellMatrixCornice.
	const unaryCellMatrixCornice_ROW = getUnaryCellMatrixCorniceForGeneration_ROW ( unaryCellMatrixCornice  ); 

	//10.2 Получаем ячейки
	const responsePushCells = generationOfCellsByCellMatrixAndPointsAndSide( unaryCellMatrixCornice_ROW, extremePoints, side, step );
	// console.log( responsePushCells );

	const response = {
		push : { 
			...responsePush, 
			...responsePushCells
		},
		remove : { ...responseRemove },
	}

	return response; 

}

//Добавление каркаса
export const addNewColumnCornice = ( elem, step, states ) => {

	//0. Определяем сторону по элементу.
	const side = defineSideByElement ( elem );

	if ( side === 'RIGHT' ||  side === 'LEFT' ){

		//1. Получаем унарную ячеечную матрицу, которую нам нужно получить в результате 
		const unaryCellMatrixCornice = getUnaryCellMatrixCornice ( states.ceilsGrid, side, step ); 
		// console.log( unaryCellMatrixCornice );

		//2. Получаем координаты самой крайней точки в глобальной сетке по унарной матрице и ее стороне
		const extremePoints = getExtremePointsByUnaryCellMatrix ( unaryCellMatrixCornice, side, states.ceils );
		// console.log( extremePoints );

		//3. На основе унарной ячеечной матрицы формируем "идеальную" коплексную матрицу
		const complexMatrixByUnaryCellMatrix = getComplexMatrixByUnaryCellMatrix ( unaryCellMatrixCornice );
		// console.log( complexMatrixByUnaryCellMatrix );

		//4. Получаем точки по которым нужно получить оригинальную матрицу.
		const points = getPointsForOriginalMatrix ( states.ceilsGrid, extremePoints );
		// console.log( points );

		//5. Получаем оригинальную матрицу по точкам, но ВАЖНО с сходной размерностью комплексной матрицы
		const originalMatrix = getOriginalMatrixByPoints( points, complexMatrixByUnaryCellMatrix, side, states )
		// console.log( originalMatrix );

		//6. Получаем комлекснумаю матрицу по оригинально матрице. 
		const complexOriginalMatrix = getUnaryMatrixByOriginalMatrix( originalMatrix, states );
		// console.log( complexOriginalMatrix );

		//7. Мержим две матрицы
		const mergedUnaryMatrix = mergingMatrix( complexOriginalMatrix, complexMatrixByUnaryCellMatrix );
		// console.log( mergedUnaryMatrix );

		//8. Удаляем все элементы с оригинальной матрицы 
		const responseRemove = removeMatrix( originalMatrix, states );

		//9. Генерируем элементы по комплексной матрице, а также ножки (высчитываются отдельно).
		const responsePush = generationOfElementsByMatrixAndExtremePointsAndSide( mergedUnaryMatrix, extremePoints, side, step );
		
		//10. Получаем ячейки
		const responsePushCells = generationOfCellsByCellMatrixAndPointsAndSide( unaryCellMatrixCornice, extremePoints, side, step )
		// console.log( responsePushCells );

		const response = {
			push : { 
				...responsePush, 
				...responsePushCells
			},
			remove : { ...responseRemove },
		}

		return response; 

	}

	return {}

}
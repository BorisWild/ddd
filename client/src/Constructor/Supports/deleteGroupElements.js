//Конфиг
import { config, PI, PI_90, SIZE_STANDART } from '../Config.js';

import { getProfileMatrixByFingerObj, getPanelMatrixByProfile, getObjMatrixByCeil, checkClosedLeg, getElemInsideByCell } from '../helpers/constructorHelper.js';

export const deleteGroupElements = ( elem, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsLegsState, elemsOtherState, elemsGroupElementsState ) => {

	let params = elem.params;

	let matrix = getObjMatrixByCeil( elem, elemsPanelsState, elemsFingersState, elemsProfilesState );

	let responseCellInside = getElemInsideByCell( elem, elemsOtherState );

	console.log( responseCellInside );

    //Шаблон ответа
	let response = {
		push : {
			panels : [],
			profiles : [],
			fingers : [],
			legs : [],
			others : [],
			ceils : [],
		},
		remove : {
			panels : [],
			profiles : [],
			fingers : [],
			legs : [],
			others : [],
			ceils : [],
		}
	}

	if ( responseCellInside !== null ){
		response.remove.others.push( responseCellInside );
	}

	let grid = {
	    x : Number( ( params.positionX / 580 ).toFixed( 0 ) ),
	    y : Number( ( params.positionY / 580).toFixed( 0 ) ),
	    z : Number( ( params.positionZ / 580).toFixed( 0 ) ),
	};

	console.log( grid );

	let mush = {
	  	pX : null,
	    pY : null,
	    pZ : null,
	    nX : null,
	    nY : null,
	    nZ : null,
	};

	//Формируем сетку помех.
	elemsGroupElementsState.forEach( ( ceil ) => {

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

	} );

	console.log( mush );

    //Теперь нам нужно удалить все, что незакрыто
	matrix.forEach( (xm, xIndex) => {

		xm.forEach( (ym, yIndex) => {

			ym.forEach( (zm, zIndex) => {

				//Значит что-то есть
				if ( zm !== 1 ){

					//Тут проверяем, вообще можно удалять или нет.
					// xIndex = 0 , yIndex = 0 , zIndex = 0 - это левый нижний угол от нас.
					// xIndex = 8 , yIndex = 8 , zIndex = 8 - это правый верхний угол к нам.

					//Здесь формируем направленность перебора. То есть в какай сейчас стороне происходит перебор.
					//Где -1 - это отрицательная сторона, где 0 - середина, а 1 - положительная.
					let dimension = { x : 0, y : 0, z : 0 }

					//Значит работаем только по левой стороне. 
					if ( xIndex === 0 ){
						dimension.x = -1; 
					}else if ( xIndex === matrix.length-1 ){
						dimension.x = 1; 
					}

					if ( yIndex === 0 ){
						dimension.y = -1; 
					}else if ( yIndex === xm.length-1 ){
						dimension.y = 1; 
					}

					if ( zIndex === 0 ){
						dimension.z = -1; 
					}else if ( zIndex === ym.length-1 ){
						dimension.z = 1; 
					}

					//Мы сформировали направленность элемента.
					//Теперь нам нужно сравнить его с сеткой помех. В тех сторонах, где у сетки помех есть помеха, нужно не удалять элемент.

					//Если есть хотя бы одна помеха, нельзя удалять.

					//Если направленность равна нулю, то помех быть недолжно именно с этой стороны.

					let removable = true;

					//Начинаем сравнивание.

					//Смотрим по осьX
					if ( dimension.x === -1 ){ //Отрицательное

						if ( mush.nX !== null ){
							removable = false;
						}

					}else if ( dimension.x === 1 ){ //Положительное
						if ( mush.pX !== null ){
							removable = false;
						}
					}

					//Смотрим по осьY
					if ( dimension.y === -1 ){ //Отрицательное

						if ( mush.nY !== null ){
							removable = false;
						}

					}else if ( dimension.y === 1 ){ //Положительное
						if ( mush.pY !== null ){
							removable = false;
						}
					}

					//Смотрим по осьY
					if ( dimension.z === -1 ){ //Отрицательное

						if ( mush.nZ !== null ){
							removable = false;
						}

					}else if ( dimension.y === 1 ){ //Положительное
						if ( mush.pZ !== null ){
							removable = false;
						}
					}


					if ( removable ){

						if ( zm.type === 'panel' ){

							//Находим и удаляем.
							let _objPanel = elemsPanelsState.find( (iObj) => iObj.id === zm.id );

							if ( _objPanel !== undefined ){

								//Удаляем панель
								response.remove.panels.push( _objPanel );

							}

						}else if ( zm.type === 'profile' ){

							//Находим и удаляем.
							let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === zm.id );

							if ( _objProfile !== undefined ){

								//Удаляем профиль
								response.remove.profiles.push( _objProfile );

							}

						}else if ( zm.type === 'finger' ){

							//Находим и удаляем.
							let _objFinger = elemsFingersState.find( (iObj) => iObj.id === zm.id );

							if ( _objFinger !== undefined ){

								//Удаляем палец
								response.remove.fingers.push( _objFinger );

								//еслм ячейка самая нижняя, значит у нее есть ножки.
								if ( grid.y === 0 ){

									let matrixFinger = getProfileMatrixByFingerObj( _objFinger, elemsProfilesState, elemsLegsState );

									let item = matrixFinger[1][0][1]; //Нижняя часть.

									console.log( xIndex, zIndex, yIndex );

									console.log( matrixFinger );

									console.log( item );

									//Значит ножка есть
									if ( item > 1 ){

										// //Находим конкретно ножку.
										// let _objLegs = elemsLegsState.find( (iObj) => iObj.id === item );

										// if ( _objLegs !== undefined ){
										// 	//Удаляем ножку
										// 	response.remove.legs.push( _objLegs );
										// }
										
									}

								}

							}

						}


					}


					
				}

			} )			

		} )

	} )

	console.log( elemsLegsState );

	elemsLegsState.forEach( ( item ) => {

		console.log( item.id, checkClosedLeg( item, elemsProfilesState ) );

	} );

	//Удаляем текущую ячейку.
	response.remove.ceils.push( elem );

	return response;

}
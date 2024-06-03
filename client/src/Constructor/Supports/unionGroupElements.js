//Конфиг
import { config, PI, PI_90, SIZE_STANDART } from '../Config.js';

import { getProfileMatrixByFingerObj, getPanelMatrixByProfile, getObjMatrixByCeil, getMatrixByPoints, getElemInsideByCell } from '../helpers/constructorHelper.js';

const allElemsIsCeil = ( elems ) => {

	let isAllRight = true;

	if ( elems.length ){

		elems.forEach( (elem) => {

			if ( elem.type !== 'ceil' ){

				isAllRight = false; 

			}

		} )

	}
	return isAllRight;

}

const ceilsIsUnionity = ( ceils, globalCeilGrid, states ) => {

	let isAllRight = true;

	let expectedValue = 0;

	//Здесь нужно проверить, можно ли объединять ячейки:
	//1.Ячейки должны формировать прямоугольник.

	//2. Для этого нам нужно получить все объемы и координаты двух точек всех ячеек.

	//Сначала получаем просто переработанный массив с ячейками.
	let _ceils = ceils.map( (ceil) => {

		let points = {
			first : { x : 100000, y : 100000, z : 100000 },
			second : { x : 0, y : 0, z : 0 }
		}

		globalCeilGrid.forEach( (xm, xIndex) => {

			xm.forEach( ( ym, yIndex) =>{

				ym.forEach( (id, zIndex) => {

					//перебираем только нужную ячейку.
					if ( id === ceil.id ){

						//Здесь мы получаем id ячейки в глобальной сетке
						//Теперь надо просто перебрать все значения и найти из них самую наименьшую и самую наибольшую
						//Индексы ячейки в переборе будет соответтсовать координатам в нашем объекте.
						if ( ( points.first.x >= xIndex ) && ( points.first.y >= yIndex ) && ( points.first.z >= zIndex )  ){
							points.first = {
								x : xIndex,
								y : yIndex,
								z : zIndex,
							}
						}
						if ( ( points.second.x <= xIndex ) && ( points.second.y <= yIndex ) && ( points.second.z <= zIndex )  ){
							points.second = {
								x : xIndex,
								y : yIndex,
								z : zIndex,
							}
						}

					}

				} )

			} )

		} )

		expectedValue += ((points.second.x - points.first.x)+1) * ((points.second.y - points.first.y)+1) * ((points.second.z - points.first.z)+1);

		return {
			id : ceil.id,
			position: {
				x : ceil.params.positionX,
				y : ceil.params.positionY,
				z : ceil.params.positionZ,
			},
			chars : ceil.chars,
			points : points
		};
	} )

	// console.log( _ceils );

	let globalPoints = {
		first : { x : 100000, y : 100000, z : 100000 },
		second : { x : 0, y : 0, z : 0 }
	}

	//Теперь перебираем все получившиеся точки, чтобы выяыить из них самую наименьшую и самую наибольшую.
	_ceils.forEach( (ceil) => {

		if ( ( globalPoints.first.x >= ceil.points.first.x ) && ( globalPoints.first.y >= ceil.points.first.y ) && ( globalPoints.first.z >= ceil.points.first.z )  ){
			
			let ceilObj = states.ceils.find( (item) => item.id === ceil.id );

			globalPoints.first = {
				x : ceil.points.first.x,
				y : ceil.points.first.y,
				z : ceil.points.first.z,
				position : {
					x : ceilObj.params.positionX - (ceilObj.chars.width.value/2 + 10),
					y : ceilObj.params.positionY - (ceilObj.chars.height.value/2 + 10),
					z : ceilObj.params.positionZ - (ceilObj.chars.depth.value/2 + 10),
				}
			}
		}
		if ( ( globalPoints.second.x <= ceil.points.second.x ) && ( globalPoints.second.y <= ceil.points.second.y ) && ( globalPoints.second.z <= ceil.points.second.z )  ){
			
			let ceilObj = states.ceils.find( (item) => item.id === ceil.id );

			globalPoints.second = {
				x : ceil.points.second.x,
				y : ceil.points.second.y,
				z : ceil.points.second.z,
				position : {
					x : ceilObj.params.positionX + (ceilObj.chars.width.value/2 + 10) ,
					y : ceilObj.params.positionY + (ceilObj.chars.height.value/2 + 10),
					z : ceilObj.params.positionZ + (ceilObj.chars.depth.value/2 + 10),
				}
			}
			
		}

	} );

	// console.log( globalPoints );

	let realValue = ((globalPoints.second.x - globalPoints.first.x)+1) * ((globalPoints.second.y - globalPoints.first.y)+1) * ((globalPoints.second.z - globalPoints.first.z)+1)

	// console.log( 'expectedValue: ' + expectedValue  + ', ' + 'realValue: ' + realValue );

	if ( expectedValue !== realValue ){

		isAllRight = false;		

	}else{
		isAllRight = {
			globalPoints : globalPoints,
			ceils : _ceils,
		};
	}

	return isAllRight;

}

const ceilsIsUnionityFirstVariable = ( points ) => {
	//Эта функция проверяет: можно ли объединять ячейки по первому варианту.
	if ( 
		(points.second.x - points.first.x + 1) > 4 ||
		(points.second.y - points.first.y + 1) > 4 ||
		(points.second.z - points.first.z + 1) > 4
		){
		return false
	}

	return true;

}

const ceilsIsUnionitySecondVariable = ( points ) => {
	//Эта функция проверяет: можно ли объединять ячейки по второму варианту.

	if ( 
		(points.second.x - points.first.x + 1) > 4 ||
		(points.second.y - points.first.y + 1) > 4 ||
		(points.second.z - points.first.z + 1) > 4
		){
		return true
	}

	return false;

}

const mergingCeilsFirstVariate = ( ceilsMesh, states, elems ) => {

	const ceilsReplaceIntoMatrix = ( ceilsMesh, othersElems, state ) => {

		console.log( othersElems );

		let response = {
			push : {
				ceils : [],
				others : [],
			},
			remove : {
				ceils : [],
			}
		}

		//Сначала удаляем все ячейки.
		ceilsMesh.ceils.forEach( (ceil) => {

			let obj = state.find( (item) => item.id === ceil.id );

			if ( obj !== undefined ){

				response.remove.ceils.push( obj );

			}

		} );

		//Теперь добавляем одну большую ячейку.

		//1.Сначала определяем его размернсть.
		let chars = {
		    width : {
		      status : 'enabled',
		      value : ( (ceilsMesh.globalPoints.second.x - ceilsMesh.globalPoints.first.x + 1) * 2 * 72.5 - 20 ),
		    },
		    height : {
		      status : 'enabled',
		      value : ( (ceilsMesh.globalPoints.second.y - ceilsMesh.globalPoints.first.y + 1) * 2 * 72.5 - 20 ),
		    },
		    depth : {
		      status : 'enabled',
		      value : ( (ceilsMesh.globalPoints.second.z - ceilsMesh.globalPoints.first.z + 1) * 2 * 72.5 - 20 ),
		    },
		}

		let dimensions = {
		    width: chars.width.value + 20*2,
		    height: chars.height.value + 20*2,
		    depth: chars.depth.value  + 20*2,
		};

		let params = {
			positionX : ceilsMesh.globalPoints.first.position.x + chars.width.value/2 + 10,
			positionY : ceilsMesh.globalPoints.first.position.y + chars.height.value/2 + 10,
			positionZ : ceilsMesh.globalPoints.first.position.z + chars.depth.value/2 + 10,
		}

		response.push.ceils.push({
		    id : 100,
		    merge : [],
		    dimensions : dimensions,
		    params : params,
		    grid : { x : 0, y: 0, z : 0},
		    chars : chars,
		});


		if ( othersElems.remove.others.length && othersElems.remove.others[0].type === 'box' ){

			let charsBox = {
				width : chars.width.value - 3,
				height : chars.height.value - 3,
				depth : chars.depth.value - 3,
			}

			let nameBox = 'Box_' + charsBox.width + 'x' + charsBox.depth + 'x' + charsBox.height;

			response.push.others.push({
			    id : 100,
			    name : nameBox,
			    type : 'box',
			    params : {
			      ...params,
			      rotationX: 0, 
			      rotationY: 0, 
			      rotationZ: 0,
			    },
			    textureId : null,
			});
		}

		return response;

	}

	const removeInsideElemsInMatrix = ( matrix, states ) => {

		let response = {
			remove : {
				panels : [],
				profiles : [],
				fingers : [],
			}
		}

		matrix.forEach( ( xm, xIndex ) => {

			xm.forEach( (ym, yIndex) => {

				ym.forEach( (elem, zIndex) => {

					//Берем только внутренние части
					if ( 
						(xIndex > 0 && xIndex < matrix.length-1) && 
					    (yIndex > 0 && yIndex < xm.length-1) && 
					    (zIndex > 0 && zIndex <= ym.length-1) 
					){
						//Есть ли что-то 
						if ( elem !== 0 ){

							let state = [], responseDirection = null; 


							//Получаем его тип, чтобы понять с какого стейта брать элемент.
							if ( elem.type === 'finger' ){
								state = states.fingers;
								responseDirection = response.remove.fingers;
							} else if ( elem.type === 'profile' ){
								state = states.profiles;
								responseDirection = response.remove.profiles;
							} else if ( elem.type === 'panel' ){
								state = states.panels;
								responseDirection = response.remove.panels;
							}

							let obj = state.find( (item) => item.id === elem.id );

							if ( obj !== undefined ){

								//Удаляем.
								responseDirection.push( obj );

							}

						}

					}

				} )

			} )

		} )

		return response;

	}

	const removeInsideOtherElemsInCells = ( elems, states ) => {

		let responseRemoveOthers = {
			remove : { 
				others : [],
			},
		}

		elems.forEach( ( elem ) => {

			let responseRemoveOtherElem = getElemInsideByCell( elem, states.others );

			if ( responseRemoveOtherElem !== null ){
				responseRemoveOthers.remove.others.push( responseRemoveOtherElem );
			}

		} ) 

		return responseRemoveOthers;

	} 

	//Эта функция возвращает response первого вида объединения.
	let points = {
		first : {
			position : {
				x : ceilsMesh.globalPoints.first.position.x,
				y : ceilsMesh.globalPoints.first.position.y,
				z : ceilsMesh.globalPoints.first.position.z,
			}
		},
		second : {
			position : {
				x : ceilsMesh.globalPoints.second.position.x,
				y : ceilsMesh.globalPoints.second.position.y,
				z : ceilsMesh.globalPoints.second.position.z,
			}
		}
	}

	//Получаем общую матрицу ячеек.
	let matrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers );

	console.log( matrix );

	//Теперь сносим все к чертям, что находится внутри.
	let removeElems = removeInsideElemsInMatrix( matrix, states );

	let removeOtherElems = removeInsideOtherElemsInCells( elems, states );
	//Замена ячееек.
	let ceilsReplace = ceilsReplaceIntoMatrix( ceilsMesh, removeOtherElems, states.ceils );

	let response = {
		push : { ...ceilsReplace.push },
		remove : { 
			...removeElems.remove,
			ceils : [ ...ceilsReplace.remove.ceils ],
			others : [ ...removeOtherElems.remove.others ] 
		},
	}

	return response;

}

const mergingCeilsSecondVariate = ( ceilsMesh, states, elems ) => {

	const removeInsideElemsInMatrix = ( matrix, states ) => {

		let response = {
			remove : {
				panels : [],
				profiles : [],
				fingers : [],
			}
		}

		matrix.forEach( ( xm, xIndex ) => {

			xm.forEach( (ym, yIndex) => {

				ym.forEach( (elem, zIndex) => {

					//Берем только внутренние части
					if ( 
						(xIndex > 0 && xIndex < matrix.length-1) && 
					    (yIndex > 0 && yIndex < xm.length-1) && 
					    (zIndex > 0 && zIndex <= ym.length-1) 
					){
						//Есть ли что-то 
						if ( elem !== 0 ){

							let state = [], responseDirection = null; 


							//Получаем его тип, чтобы понять с какого стейта брать элемент.
							if ( elem.type === 'finger' ){
								state = states.fingers;
								responseDirection = response.remove.fingers;
							} else if ( elem.type === 'profile' ){
								state = states.profiles;
								responseDirection = response.remove.profiles;
							} else if ( elem.type === 'panel' ){
								state = states.panels;
								responseDirection = response.remove.panels;
							}

							let obj = state.find( (item) => item.id === elem.id );

							if ( obj !== undefined ){

								//Удаляем.
								responseDirection.push( obj );

							}

						}

					}

				} )

			} )

		} )

		return response;

	}

	//Эта функция возвращает response первого вида объединения.
	let points = {
		first : {
			position : {
				x : ceilsMesh.globalPoints.first.position.x,
				y : ceilsMesh.globalPoints.first.position.y,
				z : ceilsMesh.globalPoints.first.position.z,
			}
		},
		second : {
			position : {
				x : ceilsMesh.globalPoints.second.position.x,
				y : ceilsMesh.globalPoints.second.position.y,
				z : ceilsMesh.globalPoints.second.position.z,
			}
		}
	}

	//Получаем общую матрицу ячеек.
	let matrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers );

	//Теперь сносим все к чертям, что находится внутри.
	let removeElems = removeInsideElemsInMatrix( matrix, states );

	let response = {
		remove : { 
			...removeElems.remove,
		},
	}

	return response;

}

export const unionGroupElements = ( elems, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsLegsState, elemsOtherState, elemsGroupElementsState, globalCeilGrid ) => {

	//Условия, благодаря которым ячейки можно объединить.
	//1. Ячейки соприкасаются хотя бы по одной грани.
	//2. Ячейки должны формировать один большой прямоугольник. Без проблеов и т.п. (вытекает из 1-го условия).

	//Существует два типа объединения: 1-й, когда ячейки в итоге нужно слить в одну ячеку, 2-е - ячейки нужно оставить, как есть.
	//Первый вариант работает только тогда, когда габариты ячейки, которые объединяются, в сумме не дают больше 560. 

	let response = {};

	//Объдинение вохможно, если выбрано больше ячеек.
	//Также все элементы должны быть ячейками.
	if ( elems.length > 1 && allElemsIsCeil( elems ) ){

		let ceilsMesh = ceilsIsUnionity( elems, globalCeilGrid, { ceils : elemsGroupElementsState } );

		console.log( ceilsMesh );

		if ( ceilsMesh ){

			//Все окей, идем дальше
			console.log( 'Starting union' );

			if ( ceilsIsUnionityFirstVariable( ceilsMesh.globalPoints ) ){
				console.log( 'First variate' )

				let responseMerging = mergingCeilsFirstVariate( ceilsMesh, { ceils : elemsGroupElementsState, panels : elemsPanelsState, fingers : elemsFingersState, profiles : elemsProfilesState, others : elemsOtherState }, elems );

				response = responseMerging;

			} else if ( ceilsIsUnionitySecondVariable( ceilsMesh.globalPoints ) ){

				console.log( 'Second variate' )

				let responseMerging = mergingCeilsSecondVariate( ceilsMesh, { ceils : elemsGroupElementsState, panels : elemsPanelsState, fingers : elemsFingersState, profiles : elemsProfilesState, others : elemsOtherState }, elems );

				response = responseMerging;

			} else {
				console.log('Merging is not possible');
			}


		}

	}

	return response;

}
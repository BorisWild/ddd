//Конфиг
import { PI, PI_90 } from '../Config.js';

//Вспомогательные инструменты
import { getMatrixByPoints } from '../helpers/constructorHelper.js';

//Понятно что существует два способа изменения размеров ячеек: 
//1. Изменение размера ячейки без создания другой ячейки. Просто меняет рамер существующей
//2. Деление ячейки на две (этот вариант работает тогда, когда есть связи/помехи с разных сторон.)

//P.S. Первый вариант назван "Открытым", а второй - "Закрытым".

const ceilIsResizable = ( ceil, type, value ) => {

	if ( ceil.chars[type].value !== value ){
		return true;
	}
	return false

}

const isCeilSizeIncrease = ( ceil, value, type ) => {

	//Определяем направлвление изменения рахмеров ячейки
	if ( ceil.chars[type].value > value ){
		return false; //Значит уменьшаем размер
	}
	return true; //Значит увеличиваем размер

}

const isCeilResizableByOpenVariationWithIncrease = ( id, type, grid ) => {

	//Эта функция определяет можно ли УВЕЛИЧИВАТЬ ячейку с ОТКРЫТЫМ вариантом.
	return false;

}

const isCeilResizableByOpenVariationWithDecrease = ( id, type, grid ) => {

	//Закрытость стороны определяется тем, что с соответствующей стороны, грань текущей ячейки будет полностью прилигать с другой ячейкой.

	const dependentSidesByType = ( type ) => {

		let depends = [ 'top' ];

		if ( type === 'width' ){
			depends.push( 'left' );
			depends.push( 'right' );
		} else if ( type === 'height' ){

		} else if ( type === 'depth' ) {

		}

		return depends;

	}

	const isCeilHaveStrayBySides = ( id, sides, grid ) => {

		const isSideHasStrayTop = ( id, params, grid ) => {

			if ( grid[0].length-1 > params.y && grid[params.x][params.y + 1][params.z] > 0 && grid[params.x][params.y + 1][params.z] !== id ){

				return true;
			}

			return false;

		}

		const isSideHasStrayLeft = ( id, params, grid ) => {

			if ( 0 < params.x && grid[params.x-1][params.y][params.z] > 0 && grid[params.x-1][params.y][params.z] !== id ){

				return true;
			}

			return false;

		}

		const isSideHasStrayRight = ( id, params, grid ) => {

			if ( grid.length-1 > params.x && grid[params.x+1][params.y][params.z] > 0 && grid[params.x+1][params.y][params.z] !== id ){

				return true;
			}

			return false;

		}

		const isNotHasStraysTotalAllSides = ( strays ) => {

			if ( strays.top || ( strays.left && strays.right ) ){
				return false;
			}

			return true;

		}

		let strays = { top: false, left : false, right : false };

		sides.forEach( ( side ) => {

			grid.forEach( ( xm, xIndex ) => {

				xm.forEach( ( ym, yIndex ) => {

					ym.forEach( ( ceilId, zIndex ) => {

						let params = {
							x : xIndex,
							y : yIndex,
							z : zIndex,
						}

						if ( ceilId === id ){

							if ( side === 'top' && isSideHasStrayTop( id, params, grid ) ){
								strays.top = true;
							}

							if ( side === 'left' && isSideHasStrayLeft( id, params, grid ) ){
								strays.left = true;
							}	

							if ( side === 'right' && isSideHasStrayRight( id, params, grid ) ){
								strays.right = true;
							}	

						}						

					} )					

				} )  

			})

		} )

		return isNotHasStraysTotalAllSides( strays );

	}

	const dependentSides = dependentSidesByType( type );

	const isCeilResiable = isCeilHaveStrayBySides( id, dependentSides, grid ); 

	return isCeilResiable; 

}

const changeSizeCeilByCloseVariationWithDescrease = ( elem, type, states ) => {

	console.log( elem );
	console.log( type );
	console.log( states );

	const responseChangeCeil = ( elem, type, states ) => {

		let response = {
			push : [], remove : [],
		};

		let mainCeil = {}, secondCeil;

		//1. Определяем, что нужно удалить.
		response.remove.push( elem );

		//2. Определяем, что нужно добавить.
		if ( type === 'width' ){

			mainCeil = {
				chars : {
					...elem.chars,
					width : {
						status : 'enabled',
						value : elem.chars.width.value - 145,
					}				
				},
				params : {
					...elem.params,
					positionX : elem.params.positionX - 72.5,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width: (elem.chars.width.value - 145) + 20*2,
				    height: elem.chars.height.value + 20*2,
				    depth: elem.chars.depth.value  + 20*2,
				}
			}

			secondCeil = {
				chars : {
					...elem.chars,
					width : {
						status : 'enabled',
						value : 125,
					}				
				},
				params : {
					...elem.params,
					positionX : elem.params.positionX + ((elem.chars.width.value - 145) + 20)/2,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width: (125) + 20 * 2,
				    height: elem.chars.height.value + 20*2,
				    depth: elem.chars.depth.value  + 20*2,
				}
			}

		} else if ( type === 'height' ){

			mainCeil = {
				chars : {
					...elem.chars,
					height : {
						status : 'enabled',
						value : elem.chars.height.value - 145,
					}				
				},
				params : {
					...elem.params,
					positionY : elem.params.positionY - 72.5,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width:  elem.chars.width.value + 20*2,
				    height: (elem.chars.height.value - 145) + 20*2,
				    depth: elem.chars.depth.value  + 20*2,
				}
			}

			secondCeil = {
				chars : {
					...elem.chars,
					height : {
						status : 'enabled',
						value : 125,
					}				
				},
				params : {
					...elem.params,
					positionY : elem.params.positionY + ((elem.chars.height.value - 145) + 20)/2,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width: elem.chars.width.value + 20*2,
				    height: (125) + 20 * 2,
				    depth: elem.chars.depth.value  + 20*2,
				}
			}

		} else if ( type === 'depth' ){

			mainCeil = {
				chars : {
					...elem.chars,
					depth : {
						status : 'enabled',
						value : elem.chars.depth.value - 145,
					}				
				},
				params : {
					...elem.params,
					positionZ : elem.params.positionZ - 72.5,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width: elem.chars.width.value  + 20*2,
				    height: elem.chars.height.value + 20*2,
				    depth: (elem.chars.depth.value - 145) + 20*2,
				}
			}

			secondCeil = {
				chars : {
					...elem.chars,
					depth : {
						status : 'enabled',
						value : 125,
					}				
				},
				params : {
					...elem.params,
					positionZ : elem.params.positionZ + ((elem.chars.depth.value - 145) + 20)/2,
				},
				grid : { x : 0, y: 0, z : 0 },
				dimensions : {
					width: elem.chars.width.value  + 20*2,
				    height: elem.chars.height.value + 20*2,
				    depth: (125) + 20 * 2,
				}
			}

		}

		response.push.push( {
			id : 100,
		    merge : [],
		    dimensions : mainCeil.dimensions,
		    params : mainCeil.params,
		    grid : mainCeil.grid,
		    chars : mainCeil.chars,
		} );
		response.push.push( {
			id : 100,
		    merge : [],
		    dimensions : secondCeil.dimensions,
		    params : secondCeil.params,
		    grid : secondCeil.grid,
		    chars : secondCeil.chars,
		} );

		return response;

	}

	const responseChangeMain = ( elem, type, states ) => {

		const getPointsCrossesStraightWithPlane = ( target, plane ) => {

			//Проверяем, профиль пересекается с плоскостью или нет.

			//Функция вернет точку пересечения на элементе, где начало координат будет первая точка объема этого элемента
			let crossesPoints = {
				type : 'dot',
				coordinate : {
					x : 0,
					y : 0,
					z : 0,
				}
			}
			//Находим рабочую плоскость прямой
			if ( plane.p1.x === plane.p2.x ){

				if ( plane.p1.x >= target.p1.x && plane.p2.x <= target.p2.x ){

					if ( target.p1.x === target.p2.x ) {

						if ( target.p1.y !== target.p2.y ){
							return {
								...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									y : target.p2.y - target.p1.y,
								}
								
							}
						} else if ( target.p1.z !== target.p2.z ) {
							return {
								...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									z : target.p2.z - target.p1.z,
								}
								
							}
						}

						

					} else {

						return {
							...crossesPoints,
							coordinate : {
								...crossesPoints.coordinate,
								x : plane.p1.x - target.p1.x,
							}
							
						}

					}

				} 

			} else if ( plane.p1.y === plane.p2.y ){

				if ( plane.p1.y >= target.p1.y && plane.p2.y <= target.p2.y ){

					if ( target.p1.y === target.p2.y ){

						if ( target.p1.x !== target.p2.x ){
							return {
								...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									x : target.p2.x - target.p1.x,
								}
								
							}
						} else if ( target.p1.z !== target.p2.z ) {
							return {
								...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									z : target.p2.z - target.p1.z,
								}
								
							}
						}

					} else {
						return {
							...crossesPoints,
							coordinate : {
								...crossesPoints.coordinate,
								y : plane.p1.y - target.p1.y,
							}
							
						}
					}

				}

			} else if ( plane.p1.z === plane.p2.z ){

				if ( plane.p1.z >= target.p1.z && plane.p2.z <= target.p2.z ){

					if ( target.p1.z === target.p2.z ){

						if ( target.p1.x !== target.p2.x ){
							return {
							...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									x : target.p2.x - target.p1.x,
								}
								
							}
						} else if ( target.p1.y !== target.p2.y ) {
							return {
							...crossesPoints,
								type : 'coincidence',
								coordinate : {
									...crossesPoints.coordinate,
									y : target.p2.y - target.p1.y,
								}
								
							}
						}

						
					} else {
						return {
						...crossesPoints,
							coordinate : {
								...crossesPoints.coordinate,
								z : plane.p1.z - target.p1.z,
							}
							
						}
					}

					

				}

			}

			return 'no crosses';

		}

		const getPointsCrossesPanelWithPlane = ( target, plane ) => {

			//Проверяем, панель пересекается с плоскостью или нет.
			//Функция вернет точки пересечения( две ) на элементе, где начало координат будет первая точка объема этого элемента

			// console.log( target );

			// console.log( plane );

			let crossesPoints = {
				p1 : {
					x : 0,
					y : 0,
					z : 0,
				},
				p2 : {
					x : 0,
					y : 0,
					z : 0,
				}
				
			}

			let workSizeVariation = 0;

			//Находим рабочие координаты панели.
			if ( target.p1.x === target.p2.x){
				workSizeVariation = 0;
			} else if ( target.p1.y === target.p2.y ) {
				workSizeVariation = 1;
			} else if ( target.p1.z === target.p2.z ){
				workSizeVariation = 2;
			}

			//Находим рабочую сторону плоскости 
			if ( plane.p1.x === plane.p2.x ){

				if ( plane.p1.x > target.p1.x && plane.p2.x < target.p2.x ){

					if ( workSizeVariation === 0 ){
						return 'no crosses';
					} else if ( workSizeVariation === 1 ){
						return {
							p1 : {
								x : plane.p1.x - target.p1.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : plane.p1.x - target.p1.x,
								y : 0,
								z : target.p2.z - target.p1.z,
							}
						}
					} else if ( workSizeVariation === 2 ){
						return {
							p1 : {
								x : plane.p1.x - target.p1.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : plane.p1.x - target.p1.x,
								y : target.p2.y - target.p1.y,
								z : 0,
							}
						}
					}

				}

			} else if ( plane.p1.y === plane.p2.y ){

				if ( plane.p1.y > target.p1.y && plane.p2.y < target.p2.y ){

					if ( workSizeVariation === 0 ){
						return {
							p1 : {
								x : 0,
								y : plane.p1.y - target.p1.y,
								z : 0,
							},
							p2 : {
								x : 0,
								y : plane.p1.y - target.p1.y,
								z : target.p2.z - target.p1.z,
							}
						}
						
					} else if ( workSizeVariation === 1 ){
						return 'no crosses';
					} else if ( workSizeVariation === 2 ){
						return {
							p1 : {
								x : 0,
								y : plane.p1.y - target.p1.y,
								z : 0,
							},
							p2 : {
								x : target.p2.x - target.p1.x,
								y : plane.p1.y - target.p1.y,
								z : 0,
							}
						}
					}
					
				}

			} else if ( plane.p1.z === plane.p2.z ){

				if ( plane.p1.z > target.p1.z && plane.p2.z < target.p2.z ){

					if ( workSizeVariation === 0 ){
						return {
							p1 : {
								x : 0,
								y : 0,
								z : plane.p1.z - target.p1.z,
							},
							p2 : {
								x : 0,
								y : target.p2.y - target.p1.y,
								z : plane.p1.z - target.p1.z,
							}
						}		
					} else if ( workSizeVariation === 1 ){
						return {
							p1 : {
								x : 0,
								y : 0,
								z : plane.p1.z - target.p1.z,
							},
							p2 : {
								x : target.p2.x - target.p1.x,
								y : 0,
								z : plane.p1.z - target.p1.z,
							}
						}
					} else if ( workSizeVariation === 2 ){
						
						return 'no crosses';
					}
					
				}

			}

			return 'no crosses';

		}

		const getVolumePointsProfile = ( elem ) => {

			//Эта функция получает объем элемента по индексиальным точкам.
			let 
				directionElement = 0, //По Z
				points = {
					p1 : { x : 0,  y : 0,  z : 0 },
					p2 : { x : 0,  y : 0, z : 0 }
				}; 

			if ( elem.params.rotationY !== 0 ){
				directionElement = 1; //По X
			} else if ( elem.params.rotationX !== 0 ){
				directionElement = 2; //По Y
			} 

			
			if ( directionElement == 0 ){
				points.p1 = { ...points.p1, z : - ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
				points.p2 = { ...points.p2, z : ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
			} else if ( directionElement == 1 ){
				points.p1 = { ...points.p1, x : - ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
				points.p2 = { ...points.p2, x : ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
			} else if ( directionElement == 2 ){
				points.p1 = { ...points.p1, y : - ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
				points.p2 = { ...points.p2, y : ( (elem.chars.depth.value + 20)/2 / 72.5 ) };
			}

			return points;

		}

		const getOrientationPanel = (elem) => {

			if ( 
				elem.params.rotationX === 0 &&
				elem.params.rotationY === 0 &&
				elem.params.rotationZ === 0 
			){
				return 1;
			} else if ( 
				elem.params.rotationX === PI_90 &&
				elem.params.rotationY === 0 &&
				elem.params.rotationZ === 0 
			){
				return 2;
			} else if (
				elem.params.rotationX === 0 &&
				elem.params.rotationY === PI_90 &&
				elem.params.rotationZ === 0
			){
				return 3;
			} else if (
				elem.params.rotationX === 0 &&
				elem.params.rotationY === 0 &&
				elem.params.rotationZ === PI_90
			){
				return 4;
			} else if (
				elem.params.rotationX === PI_90 &&
				elem.params.rotationY === 0 &&
				elem.params.rotationZ === PI_90
			){
				return 5;
			}else if (
				elem.params.rotationX === 0 &&
				elem.params.rotationY === PI_90 &&
				elem.params.rotationZ === PI_90
			){
				return 6;
			}

		} 

		const getVolumePointsPanel = ( elem ) => {

			//Эта функция получает объем элемента по индексиальным точкам.
			let 
				directionElement = getOrientationPanel( elem ),
				points = {
					p1 : { x : 0,  y : 0,  z : 0 },
					p2 : { x : 0,  y : 0, z : 0 }
				}; 

			if ( directionElement === 1 ){

				points.p1 = { 
					...points.p1, 
					x : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					x : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};

			} else if ( directionElement === 2 ){

				points.p1 = { 
					...points.p1, 
					x : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					z : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					x : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					z : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};

			} else if ( directionElement === 3 ){
				points.p1 = { 
					...points.p1, 
					z : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					z : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
			} else if ( directionElement === 4 ){
				points.p1 = { 
					...points.p1, 
					x : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					x : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
			} else if ( directionElement === 5 ){
				points.p1 = { 
					...points.p1, 
					x : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					z : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					x : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					z : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
			} else if ( directionElement === 6 ){
				points.p1 = { 
					...points.p1, 
					z : - ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : - ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
				points.p2 = { 
					...points.p2, 
					z : ( (elem.chars.width.value + 20)/2 / 72.5 ),
					y : ( (elem.chars.height.value + 20)/2 / 72.5 ),
				};
			}

			return points;

		}

		const getPointsElement = ( volume, indexes ) => {

			return {
				p1 : {
					x : indexes.x + volume.p1.x,
					y : indexes.y + volume.p1.y,
					z : indexes.z + volume.p1.z,
				},	
				p2 : {
					x : indexes.x + volume.p2.x,
					y : indexes.y + volume.p2.y,
					z : indexes.z + volume.p2.z,
				}
			}

		}

		const get3dMatrixByIndexes = ( _x, _y, _z ) => {

			let matrix = [];

			//Формируем пустую матрицу.
		    for ( let x = 0; x < _x; x++ ){
		      matrix.push([]);
		      for ( let y = 0; y < _y; y++ ){
		        matrix[x].push([]);
		        for ( let z = 0; z < _z; z++ ){
		          matrix[x][y].push( 0 );
		        }
		      }
		    }

		    return matrix;

		}

		let response = {
			push : {
				profiles : [],
				fingers : [],
				panels : [],
			}, 
			remove : {
				profiles : [],
				fingers : [],
				panels : [],
			},
		};

		let points = {
			first : {
				position : {
					x : elem.params.positionX - (elem.chars.width.value/2 + 10), 
					y : elem.params.positionY - (elem.chars.height.value/2 + 10), 
					z : elem.params.positionZ - (elem.chars.depth.value/2 + 10)
				}
				
			},
			second : {
				position : {
					x : elem.params.positionX + (elem.chars.width.value/2 + 10), 
					y : elem.params.positionY + (elem.chars.height.value/2 + 10), 
					z : elem.params.positionZ + (elem.chars.depth.value/2 + 10)
				}
			}
		}

		let matrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers );

		let secondMatrix = {
			matrix : get3dMatrixByIndexes( (matrix.length), (matrix[0].length), (matrix[0][0].length) ),
			coordinate : {
				value : (matrix.length-1)-2,
				axis : 'x',
			},
		}

		//Задаем координаты плоскости
		let plane = {
			p1 : {
				x : (matrix.length-1)-2,
				y : 0,
				z : 0,
			},
			p2 : {
				x : (matrix.length-1)-2,
				y : (matrix[0].length-1),
				z : (matrix[0][0].length-1),
			}
		}

		if ( type === 'height' ){

			plane = {
				p1 : {
					x : 0,
					y : (matrix[0].length-1)-2,
					z : 0,
				},
				p2 : {
					x : (matrix.length-1),
					y : (matrix[0].length-1)-2,
					z : (matrix[0][0].length-1),
				}
			}

			secondMatrix.coordinate.value = (matrix[0].length-1)-2;
			secondMatrix.coordinate.axis = 'y';

		} else if ( type === 'depth' ){

			plane = {
				p1 : {
					x : 0,
					y : 0,
					z : (matrix[0][0].length-1)-2,
				},
				p2 : {
					x : (matrix.length-1),
					y : (matrix[0].length-1),
					z : (matrix[0][0].length-1)-2,
				}
			}

			secondMatrix.coordinate.value = (matrix[0][0].length-1)-2;
			secondMatrix.coordinate.axis = 'z';

		}

		console.log( plane ); 

		//Добавлем деляющую панель
		let planeObject = {
			name : 'Panel_',
			params : {
				positionX : elem.params.positionX,
				positionY : elem.params.positionY,
				positionZ : elem.params.positionZ,
				rotationX : 0,
				rotationY : 0,
				rotationZ : 0,
			},
			chars : {
				width : {
					value : 0, 
					status : 'enabled',
				},
				height : {
					value : 0, 
					status : 'enabled',
				},
				depth : {
					value : 0, 
					status : 'enabled',
				},
			},
			charsIndexes : {
				width : 0,
				height : 0,
				depth : 0,
			}
		}

		
		//Определяем рабочую плоскость
		if ( plane.p1.x === plane.p2.x ){

			planeObject.charsIndexes = {
				width : plane.p2.z - plane.p1.z,
				height : plane.p2.y - plane.p1.y,
				depth : 0,
			}

			planeObject.params.positionX = points.first.position.x + plane.p1.x * 72.5;

			if ( plane.p2.z - plane.p1.z > plane.p2.y - plane.p1.y ){
				planeObject.params.rotationZ = PI_90;	
			}

			planeObject.params.rotationY = PI_90;

		} else if ( plane.p1.y === plane.p2.y ){

			planeObject.charsIndexes = {
				width : plane.p2.x - plane.p1.x,
				height : plane.p2.z - plane.p1.z,
				depth : 0,
			}

			planeObject.params.positionY = points.first.position.y + plane.p1.y * 72.5;

			if ( plane.p2.x - plane.p1.x > plane.p2.z - plane.p1.z ){
				planeObject.params.rotationZ = PI_90;	
			}

			planeObject.params.rotationX = PI_90;

		} else if ( plane.p1.z === plane.p2.z ){

			planeObject.params.positionZ = points.first.position.z + plane.p1.z * 72.5;

			planeObject.charsIndexes = {
				width : plane.p2.x - plane.p1.x,
				height : plane.p2.y - plane.p1.y,
				depth : 0,
			}

			if ( plane.p2.x - plane.p1.x > plane.p2.y - plane.p1.y ){
				planeObject.params.rotationZ = PI_90;	
			}

		}

		if ( planeObject.charsIndexes.width >= planeObject.charsIndexes.height ){
			
			planeObject.chars.width.value = planeObject.charsIndexes.width * 72.5 - 20;
			planeObject.chars.height.value = planeObject.charsIndexes.height * 72.5 - 20;

			planeObject.name += (planeObject.charsIndexes.height * 72.5 - 20) + 'x' + (planeObject.charsIndexes.width * 72.5 - 20);

		} else {

			planeObject.chars.width.value = planeObject.charsIndexes.height * 72.5 - 20;
			planeObject.chars.height.value = planeObject.charsIndexes.width * 72.5 - 20;

			planeObject.name += (planeObject.charsIndexes.width * 72.5 - 20) + 'x' + (planeObject.charsIndexes.height * 72.5 - 20);
		}

		response.push.panels.push( {
			id : 100, 
			name : planeObject.name, 
			type : 'panel', 
			textureId : 0, 
			chars : planeObject.chars,
			params : planeObject.params,
		} )

		let crossedElements = [];

		matrix.forEach( ( xm, xIndex ) => {

			xm.forEach( ( ym, yIndex ) => {

				ym.forEach( ( zm, zIndex ) => {

					if ( zm !== 0 ){

						if ( zm.type === 'profile' ){

							let obj = states.profiles.find( (item) => item.id === zm.id );

							if ( obj !== undefined ){

								const volumeElem = getVolumePointsProfile( obj );

								const pointsElem = getPointsElement( volumeElem, { x : xIndex, y : yIndex, z : zIndex } );

								const crossedPoint = getPointsCrossesStraightWithPlane( pointsElem, plane );

								if ( crossedPoint !== 'no crosses' && !( crossedPoint.coordinate.x === 0 && crossedPoint.coordinate.y === 0 && crossedPoint.coordinate.z === 0 ) ){

									if ( crossedPoint.type === 'coincidence' ){

										if ( secondMatrix.coordinate.axis === 'x' ){

											if ( crossedPoint.coordinate.y !== 0 ){

												for ( let i = -1 * ((crossedPoint.coordinate.y/2)-1); i < (crossedPoint.coordinate.y/2); i++ ){
													secondMatrix.matrix[ secondMatrix.coordinate.value ][ yIndex + i ][ zIndex ] = 1;
												}

											} else if ( crossedPoint.coordinate.z !== 0 ) {
												for ( let i = -1 * ((crossedPoint.coordinate.z/2)-1); i < (crossedPoint.coordinate.z/2); i++ ){
													secondMatrix.matrix[ secondMatrix.coordinate.value ][ yIndex][ zIndex + i ] = 1;
												}
											}

										} else if ( secondMatrix.coordinate.axis === 'y' ){

											if ( crossedPoint.coordinate.x !== 0 ){

												for ( let i = -1 * ((crossedPoint.coordinate.x/2)-1); i < (crossedPoint.coordinate.x/2); i++ ){
													secondMatrix.matrix[ xIndex + i ][ secondMatrix.coordinate.value ][ zIndex ] = 1;
												}

											} else if ( crossedPoint.coordinate.z !== 0 ) {
												for ( let i = -1 * ((crossedPoint.coordinate.z/2)-1); i < (crossedPoint.coordinate.z/2); i++ ){
													secondMatrix.matrix[ xIndex ][ secondMatrix.coordinate.value ][ zIndex  + i ] = 1;
												}
											}

										} else if ( secondMatrix.coordinate.axis === 'z' ){

											if ( crossedPoint.coordinate.x !== 0 ){

												for ( let i = -1 * ( (crossedPoint.coordinate.x/2)-1); i < (crossedPoint.coordinate.x/2); i++ ){
													secondMatrix.matrix[ xIndex + i ][ yIndex ][ secondMatrix.coordinate.value ] = 1;
												}

											} else if ( crossedPoint.coordinate.y !== 0 ) {
												for ( let i = -1 * ((crossedPoint.coordinate.y/2)-1); i < (crossedPoint.coordinate.y/2); i++ ){
													secondMatrix.matrix[ xIndex ][ yIndex + i ][ secondMatrix.coordinate.value ] = 1;
												}
											}

										}	

									} else if ( crossedPoint.type === 'dot'  ) {

										if ( secondMatrix.coordinate.axis === 'x' ){

											secondMatrix.matrix[ secondMatrix.coordinate.value ][ yIndex ][ zIndex ] = 1;

										} else if ( secondMatrix.coordinate.axis === 'y' ){

											secondMatrix.matrix[ xIndex ][ secondMatrix.coordinate.value ][ zIndex ] = 1;

										} else if ( secondMatrix.coordinate.axis === 'z' ){

											secondMatrix.matrix[ xIndex ][ yIndex ][ secondMatrix.coordinate.value ] = 1;

										}		

										crossedElements.push( {
											elem : obj,
											cross : crossedPoint.coordinate,

										} );

									}

								}

							}

						} else if ( zm.type === 'panel' ){

							let obj = states.panels.find( (item) => item.id === zm.id );

							if ( obj !== undefined ){

								const volumeElem = getVolumePointsPanel( obj );

								const pointsElem = getPointsElement( volumeElem, { x : xIndex, y : yIndex, z : zIndex } );

								const crossedPoint = getPointsCrossesPanelWithPlane( pointsElem, plane );
							
								if ( (crossedPoint !== 'no crosses') ){

									let pCenter = { x : 0, y : 0, z : 0 }, axisPanel = '';

									if ( secondMatrix.coordinate.axis === 'x' ){

										pCenter = {
											x : secondMatrix.coordinate.value,
											y : yIndex,
											z : zIndex,
										}

									} else if ( secondMatrix.coordinate.axis === 'y' ){

										pCenter = {
											x : xIndex,
											y : secondMatrix.coordinate.value,
											z : zIndex,
										}

									} else if ( secondMatrix.coordinate.axis === 'z' ){

										pCenter = {
											x : xIndex,
											y : yIndex,
											z : secondMatrix.coordinate.value,
										}

									}		

									//Это длинна разреза.
									let cutting = 0;

									if ( crossedPoint.p1.x !== crossedPoint.p2.x ){
										cutting = crossedPoint.p2.x - crossedPoint.p1.x;
										axisPanel = 'x';
									} else if ( crossedPoint.p1.y !== crossedPoint.p2.y ){
										cutting = crossedPoint.p2.y - crossedPoint.p1.y;
										axisPanel = 'y';
									} else {
										cutting = crossedPoint.p2.z - crossedPoint.p1.z;
										axisPanel = 'z';
									}

									if ( axisPanel === 'x' ){

										for ( let i = -1 * ((cutting/2)-1); i <= ((cutting/2)-1); i++ ){

											secondMatrix.matrix[ pCenter.x  + i ][ pCenter.y ][ pCenter.z ] = 1;

										}

									} else if ( axisPanel === 'y' ){

										for ( let i = -1 * ((cutting/2)-1); i <= ((cutting/2)-1); i++ ){

											secondMatrix.matrix[ pCenter.x ][ pCenter.y  + i ][ pCenter.z ] = 1;

										}

									} else if ( axisPanel === 'z' ){

										for ( let i = -1 * ((cutting/2)-1); i <= ((cutting/2)-1); i++ ){

											secondMatrix.matrix[ pCenter.x ][ pCenter.y ][ pCenter.z + i ] = 1;

										}

									}

									crossedElements.push( {
										elem : obj,
										cross : crossedPoint,
									} );

								}

							}

						}

					}

				} )

			} )

		} )

		crossedElements.forEach( (item) => {

			if ( item.elem.type === 'profile' ){

				response.remove.profiles.push( item.elem );

				let 
					directionWork = 0, 
					params = { ...item.elem.params },
					paramsFinger = { ...params },
					firstProfile = {},
					secondProfile = {};

				if ( item.cross.x !== 0 ){
					directionWork = 'x';
				} else if ( item.cross.y !== 0 ){
					directionWork = 'y';
				} else if ( item.cross.z !== 0 ){
					directionWork = 'z';
				} 

				let lengthProfile = ( item.elem.chars.depth.value + 20 ) / 72.5;
				
				if ( directionWork === 'x' ){
					params = {
						...item.elem.params,
						positionX : item.elem.params.positionX - (item.elem.chars.depth.value + 20) / 2,
					}

					paramsFinger = {
						...paramsFinger,
						positionX : params.positionX + ( item.cross.x * 72.5 ),
						rotationX : 0, rotationY : 0,  rotationZ : 0, 
					}

					let nameProfile = 'Profile_' + (item.cross.x * 72.5 - 20);

					firstProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionX : params.positionX + (item.cross.x * 72.5) / 2, 
						},

					}

					nameProfile = 'Profile_' + ( ( lengthProfile - item.cross.x) * 72.5 - 20 );

					secondProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionX : params.positionX + (lengthProfile - (lengthProfile - item.cross.x)/2) * 72.5,
						},

					}

				} else if ( directionWork === 'y' ){
					params = {
						...item.elem.params,
						positionY : item.elem.params.positionY - (item.elem.chars.depth.value + 20) / 2,
					}

					paramsFinger = {
						...paramsFinger,
						positionY : params.positionY + ( item.cross.y * 72.5 ),
						rotationX : 0, rotationY : 0,  rotationZ : 0, 
					}

					let nameProfile = 'Profile_' + (item.cross.y * 72.5 - 20);

					firstProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionY : params.positionY + (item.cross.y * 72.5) / 2, 
						},

					}

					nameProfile = 'Profile_' + ( ( lengthProfile - item.cross.y) * 72.5 - 20 );

					secondProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionY : params.positionY + (lengthProfile - (lengthProfile - item.cross.y)/2) * 72.5,
						},

					}

				} else if ( directionWork === 'z' ){
					params = {
						...item.elem.params,
						positionZ : item.elem.params.positionZ - (item.elem.chars.depth.value + 20) / 2,
					}

					paramsFinger = {
						...paramsFinger,
						positionZ : params.positionZ + ( item.cross.z * 72.5 ),
						rotationX : 0, rotationY : 0,  rotationZ : 0, 
					}

					let nameProfile = 'Profile_' + (item.cross.z * 72.5 - 20);

					firstProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionZ : params.positionZ + (item.cross.z * 72.5) / 2, 
						},

					}

					nameProfile = 'Profile_' + ( ( lengthProfile - item.cross.z) * 72.5 - 20 );

					secondProfile = {
						id : 100, 
						name : nameProfile, 
						type : 'profile', 
						textureId : item.elem.textureId, 
						params : {  
							...params, 
							positionZ : params.positionZ + (lengthProfile - (lengthProfile - item.cross.z)/2) * 72.5,
						},

					}

				}
				
				let rightNames = [ 'Profile_125', 'Profile_270', 'Profile_415', 'Profile_560' ];

				if ( rightNames.includes( firstProfile.name ) ){

					response.push.profiles.push( firstProfile );

				}

				if ( rightNames.includes( secondProfile.name ) ){

					//Добавляем коннектор.
					response.push.fingers.push( {
						id : 100, 
						name : 'Fingers_4', 
						type : 'finger', 
						textureId : item.elem.textureId, 
						params : {  
							...paramsFinger, 
						}
					} );

					response.push.profiles.push( secondProfile );

				}

			}

			if ( item.elem.type === 'panel' ){

				response.remove.panels.push( item.elem );

				let 
					directionElement = getOrientationPanel( item.elem ),
					workingSide = 0, 
					params = { ...item.elem.params },
					mainProfile = false,
					firstPanel = false,
					secondPanel = false,
					sizeIndexesMainPanel = {
						width : ( item.elem.chars.width.value + 20 ) / 72.5,
						height : ( item.elem.chars.height.value + 20 ) / 72.5,
					};

				let matrixPanel = { 
					operation : directionElement,
					width : ( item.elem.chars.width.value + 20 ) / 72.5,
					height : ( item.elem.chars.height.value + 20 ) / 72.5 ,
				}

				let nameFirstPanel = '', sizeIndexFirstPanel = { x : 0, y : 0 }, rotationFirstPanel = { x : 0, y : 0, z : 0}, dimensionsFirstPanel = { x : 0, y : 0, z : 0 };

				let nameSecondPanel = '', sizeIndexSecondPanel = { x : 0, y : 0 }, rotationSecondPanel = { x : 0, y : 0, z : 0}, dimensionsSecondPanel = { x : 0, y : 0, z : 0 };

				if ( item.cross.p1.x !== item.cross.p2.x ){
					workingSide = 'x';
				} else if ( item.cross.p1.y !== item.cross.p2.y){
					workingSide = 'y';
				} else if ( item.cross.p1.z !== item.cross.p2.z ){
					workingSide = 'z';
				} 

				if ( directionElement === 1 || directionElement === 4 ){

					params = {
						...item.elem.params,
						positionY : item.elem.params.positionY - (item.elem.chars.height.value + 20) / 2,
						positionX : item.elem.params.positionX - (item.elem.chars.width.value + 20) / 2,
					}

					if ( workingSide === 'x' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : 0,
								y : item.cross.p2.y,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : matrixPanel.height,
								z : 0,
							}
						}

					} else if ( workingSide === 'y' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : item.cross.p2.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : matrixPanel.height,
								z : 0,
							}
						}
						
					} else if ( workingSide === 'z'  ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : item.cross.p2.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : 0,
								z : matrixPanel.height,
							}
						}

					}

				} else if ( directionElement === 2 || directionElement === 5 ){

					params = {
						...item.elem.params,
						positionZ : item.elem.params.positionZ - (item.elem.chars.height.value + 20) / 2,
						positionX : item.elem.params.positionX - (item.elem.chars.width.value + 20) / 2,
					}

					if ( workingSide === 'x' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : 0,
								y : 0,
								z : item.cross.p2.z,
							},
							p2 : {
								x : matrixPanel.width,
								y : 0,
								z : matrixPanel.height,
							}
						}

					} else if ( workingSide === 'y' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : item.cross.p2.x,
								y : item.cross.p2.y,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : 0,
								z : matrixPanel.height,
							}
						}

					} else if ( workingSide === 'z' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : item.cross.p2.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : 0,
								z : matrixPanel.height,
							}
						}

					}

				} else if ( directionElement === 3 || directionElement === 6 ){

					params = {
						...item.elem.params,
						positionZ : item.elem.params.positionZ - (item.elem.chars.width.value + 20) / 2,
						positionY : item.elem.params.positionY - (item.elem.chars.height.value + 20) / 2,
					}

					if ( workingSide === 'x' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : item.cross.p2.x,
								y : 0,
								z : 0,
							},
							p2 : {
								x : matrixPanel.width,
								y : 0,
								z : matrixPanel.height,
							}
						}

					} else if ( workingSide === 'y' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {
							p1 : {
								...item.cross.p2,
								x : 0,
								y : 0,
								z : item.cross.p2.z,
							},
							p2 : {
								x : 0,
								y : matrixPanel.height,
								z : matrixPanel.width,
							}
						}

					} else if ( workingSide === 'z' ){

						sizeIndexFirstPanel = {
							p1 : {
								x : 0, y : 0, z : 0,
							},
							p2 : {
								...item.cross.p2,
							}
						}
						sizeIndexSecondPanel = {

							p1 : {
								...item.cross.p2,
								x : 0,
								y : item.cross.p2.y,
								z : 0,
							},

							p2 : {
								x : 0,
								y : matrixPanel.height,
								z : matrixPanel.width,
							}

						}

					}

				}

				// console.log( 'workingSide: ' + workingSide + ', directionElement: ' + directionElement );
				// console.log( sizeIndexFirstPanel );
				// console.log( sizeIndexSecondPanel );

				let firstPanelObj, secondPanelObj;

				//Работаем с первой панелью.
				//Сначала определяем какая у неё ориентация.
				if ( sizeIndexFirstPanel.p1.x === 0 && sizeIndexFirstPanel.p2.x === 0){ 

					// console.log( '1' ); 

					let size = {
						width : (sizeIndexFirstPanel.p2.z - sizeIndexFirstPanel.p1.z) * 72.5 - 20,
						height : (sizeIndexFirstPanel.p2.y - sizeIndexFirstPanel.p1.y) * 72.5 - 20,
					}

					// console.log( 'size: ' + size ); 

					if (  size.width === size.height || size.width < size.height ){
						nameFirstPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameFirstPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationFirstPanel.z = PI_90;
					}

					// console.log( 'nameFirstPanel: ' + nameFirstPanel ); 

					dimensionsFirstPanel = {
						x : 0,
						y : (sizeIndexFirstPanel.p1.y * 72.5) + (size.height + 20) / 2,
						z : (sizeIndexFirstPanel.p1.z * 72.5) + (size.width + 20) / 2,
					}

					rotationFirstPanel.y = PI_90;

				} else if ( sizeIndexFirstPanel.p1.y === 0 && sizeIndexFirstPanel.p2.y === 0){

					// console.log( '2' ); 

					let size = {
						width : (sizeIndexFirstPanel.p2.x - sizeIndexFirstPanel.p1.x) * 72.5 - 20,
						height : (sizeIndexFirstPanel.p2.z - sizeIndexFirstPanel.p1.z) * 72.5 - 20,
					}

					if (  size.width === size.height || size.width < size.height ){
						nameFirstPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameFirstPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationFirstPanel.z = PI_90;
					}

					dimensionsFirstPanel = {
						x : (size.width + 20) / 2,
						y : 0,
						z : (size.height + 20) / 2,
					}

					rotationFirstPanel.x = PI_90;

				} else if ( sizeIndexFirstPanel.p1.z === 0 && sizeIndexFirstPanel.p2.z === 0){

					// console.log( '3' ); 

					let size = {
						width : (sizeIndexFirstPanel.p2.x - sizeIndexFirstPanel.p1.x) * 72.5 - 20,
						height : (sizeIndexFirstPanel.p2.y - sizeIndexFirstPanel.p1.y) * 72.5 - 20,
					}

					if (  size.width === size.height || size.width < size.height ){
						nameFirstPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameFirstPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationFirstPanel.z = PI_90;
					}

					dimensionsFirstPanel = {
						x : (size.width + 20) / 2,
						y : (size.height + 20) / 2,
						z : 0,
					}
				}

				//Работаем с второй панелью.
				//Сначала определяем какая у неё ориентация.
				if ( sizeIndexSecondPanel.p1.x === 0 && sizeIndexSecondPanel.p2.x === 0){ 

					// console.log( '+1' ); 

					let size = {
						width : (sizeIndexSecondPanel.p2.z - sizeIndexSecondPanel.p1.z) * 72.5 - 20,
						height : (sizeIndexSecondPanel.p2.y - sizeIndexSecondPanel.p1.y) * 72.5 - 20,
					}

					// console.log( 'size: ' + size ); 

					if (  size.width === size.height || size.width < size.height ){
						nameSecondPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameSecondPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationSecondPanel.z = PI_90;
					}

					// console.log( 'nameSecondPanel: ' + nameSecondPanel ); 

					dimensionsSecondPanel = {
						x : 0,
						y : (sizeIndexSecondPanel.p1.y * 72.5) + (size.height + 20) / 2,
						z : (sizeIndexSecondPanel.p1.z * 72.5) + (size.width + 20) / 2,
					}

					rotationSecondPanel.y = PI_90;

				} else if ( sizeIndexSecondPanel.p1.y === 0 && sizeIndexSecondPanel.p2.y === 0){

					// console.log( '+2' ); 

					let size = {
						width : (sizeIndexSecondPanel.p2.x - sizeIndexSecondPanel.p1.x) * 72.5 - 20,
						height : (sizeIndexSecondPanel.p2.z - sizeIndexSecondPanel.p1.z) * 72.5 - 20,
					}

					if (  size.width === size.height || size.width < size.height ){
						nameSecondPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameSecondPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationSecondPanel.z = PI_90;
					}

					dimensionsSecondPanel = {
						x : (sizeIndexSecondPanel.p1.x * 72.5) + (size.width + 20) / 2,
						y : 0,
						z : (sizeIndexSecondPanel.p1.z * 72.5) + (size.height + 20) / 2,
					}

					rotationSecondPanel.x = PI_90;

				} else if ( sizeIndexSecondPanel.p1.z === 0 && sizeIndexSecondPanel.p2.z === 0){

					// console.log( '+3' ); 

					let size = {
						width : (sizeIndexSecondPanel.p2.x - sizeIndexSecondPanel.p1.x) * 72.5 - 20,
						height : (sizeIndexSecondPanel.p2.y - sizeIndexSecondPanel.p1.y) * 72.5 - 20,
					}

					if (  size.width === size.height || size.width < size.height ){
						nameSecondPanel = 'Panel_' +  size.width + 'x' + size.height;

					} else { 
						nameSecondPanel = 'Panel_' + size.height + 'x' + size.width;

						rotationSecondPanel.z = PI_90;
					}

					dimensionsSecondPanel = {
						x : (sizeIndexSecondPanel.p1.x * 72.5) + (size.width + 20) / 2,
						y : (sizeIndexSecondPanel.p1.y * 72.5) + (size.height + 20) / 2,
						z : 0,
					}

				}

				// console.log( directionElement, workingSide );

				let sizeIndexProfile = 0, rotationProfile = { x : 0, y : 0, z : 0}, dimensionsProfile = { x : 0, y : 0, z : 0 };

				if ( workingSide === 'x' ){

					sizeIndexProfile = item.cross.p2.x - item.cross.p1.x;

					rotationProfile = {
						...rotationProfile,
						y : PI_90
					}

					dimensionsProfile = {
						...dimensionsProfile,
						x : (sizeIndexProfile * 72.5)/2,
						y : (item.cross.p1.y * 72.5),
						z : (item.cross.p1.z * 72.5),
					}


				} else if ( workingSide === 'y' ){

					sizeIndexProfile = item.cross.p2.y - item.cross.p1.y;

					dimensionsProfile = {
						...dimensionsProfile,
						x : (item.cross.p1.x * 72.5),
						y : (sizeIndexProfile * 72.5)/2,
						z : (item.cross.p1.z * 72.5),
					}

					rotationProfile = {
						...rotationProfile,
						x : PI_90
					}

				} else if ( workingSide === 'z' ){

					sizeIndexProfile = item.cross.p2.z - item.cross.p1.z;

					dimensionsProfile = {
						...dimensionsProfile,
						x : (item.cross.p1.x * 72.5),
						y : (item.cross.p1.y * 72.5),
						z : (sizeIndexProfile * 72.5)/2,
					}

				}

				// console.log( sizeIndexProfile );
				// console.log( dimensionsProfile );

				mainProfile = {

					id : 100, 
					name : 'Profile_' + ( (sizeIndexProfile * 72.5) - 20), 
					type : 'profile', 
					textureId : 0, 
					params : {
						...params,
						positionX : params.positionX + dimensionsProfile.x,
						positionY : params.positionY + dimensionsProfile.y,
						positionZ : params.positionZ + dimensionsProfile.z,
						rotationX : rotationProfile.x, rotationY : rotationProfile.y,  rotationZ : rotationProfile.z,
					}

				}

				firstPanel = {

					id : 100, 
					name : nameFirstPanel, 
					type : 'panel', 
					textureId : item.elem.textureId, 
					params : {
						...params,
						positionX : params.positionX + dimensionsFirstPanel.x,
						positionY : params.positionY + dimensionsFirstPanel.y,
						positionZ : params.positionZ + dimensionsFirstPanel.z,
						rotationX : rotationFirstPanel.x, rotationY : rotationFirstPanel.y,  rotationZ : rotationFirstPanel.z,
					}
					
				}

				secondPanel = {

					id : 100, 
					name : nameSecondPanel, 
					type : 'panel', 
					textureId : item.elem.textureId, 
					params : {
						...params,
						positionX : params.positionX + dimensionsSecondPanel.x,
						positionY : params.positionY + dimensionsSecondPanel.y,
						positionZ : params.positionZ + dimensionsSecondPanel.z,
						rotationX : rotationSecondPanel.x, rotationY : rotationSecondPanel.y,  rotationZ : rotationSecondPanel.z,
					}
					
				}

				//Добавляем коннектор.
				if ( mainProfile ){
					response.push.profiles.push( mainProfile );
				}
				if ( firstPanel ){
					response.push.panels.push( firstPanel );
				}
				if ( secondPanel ){
					response.push.panels.push( secondPanel );
				}

			}

		} )

		//Теперь нам нужно получить плосость из secondMatrix.
		let planeSecond = [];
	
		if ( secondMatrix.coordinate.axis === 'x' ){

			planeSecond = secondMatrix.matrix[ secondMatrix.coordinate.value ];

		} else if ( secondMatrix.coordinate.axis === 'y' ){

			secondMatrix.matrix.forEach( (xm, xIndex) => {

				planeSecond.push( xm[ secondMatrix.coordinate.value ] );

			} )

		} else if ( secondMatrix.coordinate.axis === 'z' ){

			secondMatrix.matrix.forEach( (xm, xIndex) => {

				let _array = [];

				xm.forEach( (ym, yIndex) => {

					_array.push( ym[ secondMatrix.coordinate.value ] );

				} )

				planeSecond.push( _array );  

			} )

		}

		//Теперь работаем с этой плоскость, находим все пропуски.
		//Разобъем плоскость на 4 прямые.
		let listStrights = [];

		for ( let i = 0; i < 4; i++ ){
			listStrights.push( {
				stright : [],
				finds : [],
			} )
		}

		// Нижняя линия горизонтальная.
		for ( let y = 1; y < planeSecond[0].length-1; y++){
			listStrights[0].stright.push( planeSecond[0][y] );
		}

		for ( let y = 1; y < planeSecond[0].length-1; y++){
			listStrights[1].stright.push( planeSecond[ planeSecond.length-1 ][y] );
		}

		for ( let x = 1; x < planeSecond.length-1; x++){
			listStrights[2].stright.push( planeSecond[x][0] );
		}

		for ( let x = 1; x < planeSecond.length-1; x++){
			listStrights[3].stright.push( planeSecond[x][ planeSecond[0].length-1 ] );
		}

		//Теперь на этих прямых ищем пропуски
		listStrights.forEach( ( line, indexLine ) => {

			let profileDist = 0;

			line.stright.forEach( (item, index) => {

				if ( item === 0 ){

					profileDist++;

					if ( index === line.stright.length-1 ){
						listStrights[indexLine].finds.push( {
							lenght : profileDist,
							startIndex : index - (profileDist-1),
						} );
					}

				} else {

					if ( profileDist !== 0 ){

						listStrights[indexLine].finds.push( {
							lenght : profileDist,
							startIndex : index - (profileDist),
						} );

						profileDist = 0;

					}

				}

			} )

		} )

		//Теперь добавляем их на сцену.
		listStrights.forEach( ( line, indexLine ) => {

			let finds = line.finds;

			finds.forEach( (item) => {

				//Вычисляем длину профиля.
				let lengthProfile = 0, _params = {
					positionX : elem.params.positionX - (elem.chars.width.value/2 + 10), 
					positionY : elem.params.positionY - (elem.chars.height.value/2 + 10), 
					positionZ : elem.params.positionZ - (elem.chars.depth.value/2 + 10),
					rotationX : 0, rotationY : 0, rotationZ : 0,
				};

				if ( item.lenght === 1 ){
					lengthProfile = 125; 
				} else if ( item.lenght === 3 ){
					lengthProfile = 270; 
				} else if ( item.lenght === 5 ){
					lengthProfile = 415; 
				} else if ( item.lenght === 7 ){
					lengthProfile = 560; 
				}

				let nameProfile = 'Profile_' + lengthProfile;

				//Вычисляем его ориентацию.
				if ( secondMatrix.coordinate.axis === 'x' ){

					_params.positionX += secondMatrix.coordinate.value * 72.5;


					if ( indexLine === 0 ){

						_params.positionZ += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;

					}else if ( indexLine === 1 ){

						_params.positionZ += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.positionY += (elem.chars.height.value) + 20;

					}else if ( indexLine === 2 ){

						_params.positionY += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.rotationX = PI_90;

					}else if ( indexLine === 3 ){

						_params.positionY += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.positionZ += (elem.chars.depth.value) + 20;
						_params.rotationX = PI_90;

					}

				} else if ( secondMatrix.coordinate.axis === 'y' ){

					_params.positionY += secondMatrix.coordinate.value * 72.5;

					if ( indexLine === 0 ){

						_params.positionZ += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;

					}else if ( indexLine === 1 ){

						_params.positionZ += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.positionX += (elem.chars.width.value) + 20;

					}else if ( indexLine === 2 ){

						_params.positionX += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.rotationY = PI_90;

					}else if ( indexLine === 3 ){

						_params.positionZ += (elem.chars.depth.value) + 20;
						_params.positionX += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.rotationY = PI_90;

					}

				} else if ( secondMatrix.coordinate.axis === 'z' ){

					_params.positionZ += secondMatrix.coordinate.value * 72.5;

					if ( indexLine === 0 ){

						_params.positionY += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.rotationX = PI_90;

					}else if ( indexLine === 1 ){

						_params.positionY += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.positionX += (elem.chars.width.value) + 20;
						_params.rotationX = PI_90;

					}else if ( indexLine === 2 ){

						_params.positionX += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;
						_params.rotationY = PI_90;

					}else if ( indexLine === 3 ){

						_params.positionY += (elem.chars.height.value) + 20;

						_params.positionX += ( item.startIndex ) * 72.5 + lengthProfile/2 + 10;

						_params.rotationY = PI_90;

					}
				}

				let profileObj = {
					id : 101, 
					name : nameProfile, 
					type : 'profile', 
					textureId : 0, 
					params : {  
						..._params, 
					},
				}

				response.push.profiles.push( profileObj );

			} )

		} )

		return response;

	}

	let responseCeil = responseChangeCeil( elem, type, states );

	let responseMain = responseChangeMain( elem, type, states );

	let response = {
		push : { 
			...responseMain.push,
			ceils : [ ...responseCeil.push ]
		},
		remove : {
			...responseMain.remove, 
			ceils : [ ...responseCeil.remove ],
		}
	}

	return response;

}

export const changeSizeCeil = ( elem, value, type, states ) => {
	
	//Сначала проверяем, вообще можно менять размер ячейки.
	if ( ceilIsResizable( elem, type, value ) ){

		console.log('Ceil is resizable');

		//Теперь нужно понять, какой способ изменения использовать + учитывать направление изменения.
		if ( isCeilSizeIncrease( elem, value, type ) ){

			if ( isCeilResizableByOpenVariationWithIncrease( elem.id, type, states.ceilsGrid ) ){

				console.log( 'Opened variant with increase' );

			} else {

				console.log( 'Closed variant with increase' );

			}

		} else {

			if ( isCeilResizableByOpenVariationWithDecrease( elem.id, type, states.ceilsGrid ) ){

				console.log( 'Opened variant with decrease' );

				return changeSizeCeilByCloseVariationWithDescrease( elem, type, states );

			} else {

				console.log( 'Closed variant with decrease' );

				return changeSizeCeilByCloseVariationWithDescrease( elem, type, states );

			}

		}

	} else {

		console.log('Ceil is not resizable');

	}

	return {};

}
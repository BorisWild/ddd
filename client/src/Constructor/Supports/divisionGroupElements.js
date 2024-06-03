//Конфиг
import { config, PI, PI_90, SIZE_STANDART } from '../Config.js';

import { getProfileMatrixByFingerObj, getPanelMatrixByProfile, getObjMatrixByCeil, getMatrixByPoints } from '../helpers/constructorHelper.js';

const getPointsByCell = ( elem ) => {

	return {
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
	};

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

const dividerCanDivide = ( devider ) => {

	//Эта функция не закончена.
	return true;

}

const getDividerByEnterData = ( data ) => {

	//Преобразовываем массив, получаем рассекающую плоскость.
	let cellsPlane = []; let i = 0;

	for ( let x = 0; x < data.value; x++ ){
		cellsPlane.push( [] );
		for ( let y = 0; y < (data.cells.length/data.value); y++ ){
			cellsPlane[x].push(0);
		} 
	}
	for ( let y = 0; y < (data.cells.length/data.value); y++ ){
		for ( let x = 0; x < data.value; x++ ){
			cellsPlane[x][y] = data.cells[i].parent;
			i++;
		}
	} 

	//Теперь нужно отзеркалить массив по y.

	cellsPlane = cellsPlane.map( (xm) => {

		let ym = [];

		for ( let i = xm.length-1; i >= 0; i-- ){
			ym.push( xm[i] );
		}

		return ym;

	} )

	return cellsPlane;

}

const getIdealSplitMatrix = ( elem ) => {

	//Эта фукнция должна сформировать 3d матрицу, разделенную максимально на унарные ячейки, на основе изначальной ячейки.
	let matrix = [];

  	//Получаем размерность матрицы.
  	let sizeMatrix = {
    	x : ( elem.chars.width.value + 20 ) / 72.5 + 1,
    	y : ( elem.chars.height.value + 20 ) / 72.5 + 1,
    	z : ( elem.chars.depth.value + 20 ) / 72.5 + 1,
  	}

  	//Формируем пустую матрицу.
  	for ( let x = 0; x < sizeMatrix.x; x++ ){
    	matrix.push([]);
    	for ( let y = 0; y < sizeMatrix.y; y++ ){
	      	matrix[x].push([]);
	      	for ( let z = 0; z < sizeMatrix.z; z++ ){
	       		matrix[x][y].push( 0 );
	      	}
    	}
  	}

  	matrix = matrix.map( ( xm, xIndex ) => {
  		return xm.map( ( ym, yIndex ) => {
  			return ym.map( (zm, zIndex) => {
  				// Если элемент лежит на поверхности
  				if ( 
  					! ( ( xIndex > 0 && xIndex < matrix.length-1 ) &&
  					    ( yIndex > 0 && yIndex < xm.length-1 )     &&
  					    ( zIndex > 0 && zIndex < ym.length-1 )        )
  				){
  					//Если элемент лежит на фронте или беке
  					if ( zIndex === 0 || zIndex === ym.length-1 ){
  						//Заполняем его сеточным патерном
  						if ( xIndex % 2 === 0 ){
		  					//Если четные заполняем паттерном коннекторов.
			  				if ( yIndex % 2 === 0 ){
			  					if ( zIndex % 2 === 0  ){ return 3; } else { return 2; }
			  				} else {
			  					if ( zIndex % 2 === 0  ){ return 2; } else { return 1; }
			  				}
		  				} else {
		  					//Если нечетные заполняем паттерном панелей и профилей.
			  				if ( yIndex % 2 === 0 ){
			  					if ( zIndex % 2 === 0  ){ return 2; } else { return 1; }
			  				} else {
			  					if ( zIndex % 2 === 0  ){
			  						if ( zIndex !== 0 ){ return 1; } else { return 0; }
			  					} else {
			  						return 2;
			  					}
			  				}
		  				}
  					}
  					//Если по бокам без фронтальных и задних ребер
  					else if ( (xIndex === 0 || xIndex === matrix.length-1) && (zIndex !== 0 && zIndex !== ym.length-1) ){
  						if ( yIndex % 2 === 0 ){ return 2; }else{ return 1; }
  					}
  					//Если по вверх и низ без фронтаных и задниъ ребер
  					else if ( (yIndex === 0 || yIndex === xm.length-1) && (zIndex !== 0 && zIndex !== ym.length-1) ){
  						if ( xIndex % 2 === 0 ){ return 2;}else{ return 1; }
  					}
  				}else{
  					if ( xIndex % 2 === 0 ){
  						if ( yIndex % 2 === 0 ){ return 2; }else{ return 1; }
  					} else {
  						if ( yIndex % 2 === 0 ){ return 1; } else { return 0; }
  					}
  				}
  				return 0;
  			} )
  		} )
  	} )

  	matrix = matrix.map( (xm, xIndex) => {

  		return xm.map( (ym, yIndex) => {

  			return ym.map( (zm, zIndex) => {

  				if ( zIndex === ym.length-1 && zm === 1 ){
  					return 0;
  				}

  				return zm;

  			} );

  		} );

  	} );

	return matrix;

}

const getMatrixDividedCellByDivider = ( matrix, divider ) => {

	const getCellsWithPointsByDivided = ( divider ) => {

		//Эта функция должна на основе делителя сформировать новую матрицу с идеальной разделенной ячейки.	
		let _cells = [];

		divider.forEach( (xm, xIndex) => {
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

		return _cells;

	}

	const elementIsInsideTheCell = ( points, points2 ) => {

		if (
			points.x > points2.p1.x && 
			points.y > points2.p1.y &&  
			points.x < points2.p2.x &&  
			points.y < points2.p2.y
		){
			return true;
		}

		return false;

	}

	const fingerIsBound = ( points, matrix ) => {
		//Эта фунуция проверяет, связан ли коннектор двумя или более профилями.
		let countBound = 0;
		//рассматриваем только четрые стороны: топ, них, лево и право.
		if ( points.y !== matrix[0].length-1 && matrix[points.x][points.y+1][points.z] === 2 ){ //Топ
			countBound++;
		}
		if ( points.y !== 0 && matrix[points.x][points.y-1][points.z] === 2 ){ //Низ
			countBound++;
		}
		if ( points.x !== matrix.length-1 && matrix[points.x+1][points.y][points.z] === 2 ){ //Право
			countBound++;
		}
		if ( points.x !== 0 && matrix[points.x-1][points.y][points.z] === 2 ){ //Лево
			countBound++;
		}

		if ( countBound < 3 ){
			return false;
		}
		return true;
	}
	
	const cells = getCellsWithPointsByDivided( divider );

	//Получаем матрицу без внутренних элементов
	let matrixWithoutInsideElements = matrix.map( (xm, xIndex) => {
		return xm.map( (ym, yIndex) => {
			return ym.map( (zm, zIndex) => {
				//Формируем точку в массиве для рассматриваемого элемента
				let pointsElement = {
					x : xIndex,
					y : yIndex,
					z : zIndex,
				}
				let findedCell = cells.find( (cell) => 
					pointsElement.x >= cell.realPoints.p1.x && 
					pointsElement.y >= cell.realPoints.p1.y &&  
					pointsElement.x <= cell.realPoints.p2.x &&  
					pointsElement.y <= cell.realPoints.p2.y
				);
				if ( findedCell !== undefined ){
					if ( elementIsInsideTheCell( pointsElement, findedCell.realPoints ) ){ //Внутри
						return 0;
					}
				}
				return zm;
			} );		
		} );
	} );

	//Получаем матрицу без свободных коннекторов
	let matrixWithoutFingers = matrixWithoutInsideElements.map( (xm, xIndex) => {
		return xm.map( (ym, yIndex) => {
			return ym.map( (zm, zIndex) => {

				//Работаем только с коннекторами
				if ( zm === 3 ){
					//Формируем точку в массиве для рассматриваемого элемента
					let pointsElement = { x : xIndex, y : yIndex, z : zIndex }

					if ( 
						(pointsElement.z === 0 || pointsElement.z === ym.length-1) && //Рассматриваем только фронт и бек грани
						!(pointsElement.x === 0 && pointsElement.y === 0) && //Не берем углы ячейки
						!(pointsElement.x === 0 && pointsElement.y === xm.length-1) && //Не берем углы ячейки
						!(pointsElement.x === matrixWithoutInsideElements.length-1 && pointsElement.y === 0) && //Не берем углы ячейки
						!(pointsElement.x === matrixWithoutInsideElements.length-1 && pointsElement.y === xm.length-1) //Не берем углы ячейки
					){
						//Если конннекторы не связан, то его нужно заместить на профиль.
						if ( !fingerIsBound ( pointsElement, matrixWithoutInsideElements ) ){
							return 2;
						}
					}
				}

				return zm;
			} );		
		} );
	} );

	//Рассматриваем все места, где должны быть коннекторы и, если там нет коннектора, то замещаем все профили на панели находящиеся за ним. 
	let totalMatrix = [...matrixWithoutFingers]; 

	matrixWithoutFingers.forEach( (xm, xIndex) => {
		xm.forEach( (ym, yIndex) => {
			ym.forEach( (zm, zIndex) => {
				//Работаем только с коннекторами. Их индексы только четные
				if ( zIndex === 0 && xIndex % 2 === 0 && yIndex % 2 === 0 ){
					//Формируем точку в массиве для рассматриваемого элемента
					let pointsElement = { x : xIndex, y : yIndex, z : zIndex }
					//Коннектор необнаружен!
					if ( zm !== 3 ){

						//Замещаем все профили на панели за ним.
						matrixWithoutFingers[ xIndex ][yIndex].forEach( ( item, zIndexIndex ) => {

							if ( item === 2 && zIndexIndex !== 0 && zIndexIndex !== matrixWithoutFingers[ xIndex ][yIndex].length-1 ){
								totalMatrix[xIndex][yIndex][zIndexIndex] = 1;
							}

						} )

					}
				}
			} );		
		} );
	} );

	return totalMatrix;

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

const generationOfCellsByDividerAndCell = ( divider, elem ) => {

	let responsePush = { ceil : [] };

	const startPosition = {
		x : elem.params.positionX - (elem.chars.width.value/2 + 10),
		y : elem.params.positionY - (elem.chars.height.value/2 + 10),
		z : elem.params.positionZ - (elem.chars.depth.value/2),
	}

	const getCellsWithPointsByDivided = ( divider ) => {

		//Эта функция должна на основе делителя сформировать новую матрицу с идеальной разделенной ячейки.	
		let _cells = [];

		divider.forEach( (xm, xIndex) => {
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
		divider.forEach( (xm, xIndex) => {

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

	const cells = getCellsWithPointsByDivided( divider );

	//Перебираем массив и генерируем ячейки на основе родительской ячейки.
	cells.forEach( (cell) => {

		let chars = {
			width : {
				value : (((cell.realPoints.p2.x - cell.realPoints.p1.x) * 72.5) - 20),
				status : 'enabled',
			},
			height : {
				value : (((cell.realPoints.p2.y - cell.realPoints.p1.y) * 72.5) - 20),
				status : 'enabled',
			},
			depth : {
				value : elem.chars.depth.value,
				status : 'enabled',
			},
		}
		let params = { 
			positionX : startPosition.x + ((cell.realPoints.p1.x+((cell.realPoints.p2.x-cell.realPoints.p1.x)/2)))*72.5,
			positionY : startPosition.y + ((cell.realPoints.p1.y+((cell.realPoints.p2.y-cell.realPoints.p1.y)/2)))*72.5,
			positionZ : elem.params.positionZ,
		}
		responsePush.ceil.push({
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

const generationOfElementsByMatrixAndElement = ( matrix, elem ) => {

	//Эта функция должна сгенерировать все элементы в массиве относительно элемента - второго аргумента функции
	let responsePush = { panels : [], profiles : [], fingers : [], legs : [] }

	const startPosition = {
		x : elem.params.positionX - (elem.chars.width.value/2 + 10),
		y : elem.params.positionY - (elem.chars.height.value/2 + 10),
		z : elem.params.positionZ - (elem.chars.depth.value/2 + 10),
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

	return responsePush;

}

const removeMatrix = ( matrix, cell, states ) => {

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

	responseRemove.ceil.push( cell );

	return responseRemove;

}

export const divisionGroupElements = ( elem, chars, states ) => {
	
	console.log( elem ); //Работаем только с одной ячейкой.
	console.log( chars ); //На сколько частей нужно поделить ячейку.

	//1. Получаем делитель
	const divider = getDividerByEnterData( chars );
	console.log( divider );

	//2.Проверяем ее на делимость
	if ( dividerCanDivide( divider ) ){

		//3.Получаем матрицу изначальной ячейки по её крайним точкам.
		const points = getPointsByCell ( elem );
		const originalMatrix = getMatrixByPoints( points, states.panels, states.profiles, states.fingers ); 
		const unaryOriginalMatrix = getUnaryMatrixByOriginalMatrix( originalMatrix, states );
		console.log( unaryOriginalMatrix );

		//4.Получаем идеально разделенную матрицу по ячейке.
		const idealSplitedMatrix = getIdealSplitMatrix( elem );
		console.log( idealSplitedMatrix );

		//5. Получаем матрицу, результатом которой является слияние делителя и идеальной разделенной ячейки.
		const dividedMatrix = getMatrixDividedCellByDivider( idealSplitedMatrix, divider );
		console.log( dividedMatrix );

		//6. Слияние двух матриц: изначальной матрицы и результат 5 пункта.
		const mergedMatrix = mergingMatrix( unaryOriginalMatrix, dividedMatrix )
		console.log( mergedMatrix );

		//7. Проводим генерацию ячеек по делителю
		const pushResponseCells = generationOfCellsByDividerAndCell( divider, elem );
		console.log( pushResponseCells );

		//8. Проводим генерацию элементов по матрице 6 пункта.
		const pushResponseElements = generationOfElementsByMatrixAndElement( mergedMatrix, elem );

		//9. Удаляем старые элементы
		const removeResponse = removeMatrix( originalMatrix, elem, states );

		const reponse = {
			push : {
				...pushResponseElements,
				...pushResponseCells,
			},
			remove : removeResponse,
		};

		console.log(reponse); 

		return reponse;

	} else {

		return new Error( 'Ошибка: ячейку нельзя разделить таким делителем' );

	}

}
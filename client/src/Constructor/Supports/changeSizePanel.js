//Конфиг
import { config, PI, PI_90, SIZE_STANDART } from '../Config.js';

import { getProfileMatrixByFingerObj, getPanelMatrixByProfile, getCountLinkByFinger } from '../helpers/constructorHelper.js';

export const changeSizePanel = ( elem, matrix, value, type, elemsProfilesState, elemsFingersState, elemsPanelsState ) => {
	
	//Матрица выбранной панели
	console.log( matrix );

	//Вычисляем индекс панели в матрице для дальнейшего использования в расчетах
	let matrixPositionPanel = {
		x : (matrix.length-1)/2,
		y : (matrix[0].length-1)/2,
	}
	console.log( matrixPositionPanel );

	let sizeProfileIntoMatrix = [
		{ value : 125, size : 1 },
	    { value : 270, size : 3 },
	    { value : 415, size : 5 },
	    { value : 560, size : 7 },
	];

	let needParams = [
	    { value : 125, matrix : 3 },
	    { value : 270, matrix : 5 },
	    { value : 415, matrix : 7 },
	    { value : 560, matrix : 9 },
	 ];

	let response = {
		push : {
			panels : [],
			profiles : [],
			fingers : [],
		},
		remove : {
			panels : [],
			profiles : [],
			fingers : [],
		}
	}

	let rotationIndex = 0, operation = 0;

	let baseChars = {
		width : {
			value : elem.chars.width.value,
			status : elem.chars.width.status,
		},
		height : {
			value : elem.chars.height.value,
			status : elem.chars.height.status,
		},
		depth : {
			value : elem.chars.depth.value,
			status : elem.chars.depth.status,
		},
	}; 

	baseChars[ type ].value = value;

	//Определяем операцию. Увеличение или уменьшение.
	if ( baseChars[ type ].value > elem.chars[ type ].value ){
		operation = 1;
	}else{
		operation = -1;
	}

	if ( (elem.params.rotationX).toFixed(2) === PI_90.toFixed(2) ){

	    rotationIndex = 1; 

	}else if( (elem.params.rotationY).toFixed(2) === PI_90.toFixed(2) ){

	    rotationIndex = 2; 

	}

	//Здесь собираем нужное имя для новой панели.
	//P.S. Нужно чтобы первая размерность всегда была меньше второй в названии.
	let name = 'Panel_';

	if ( baseChars.width.value < baseChars.height.value ){
		name = name + baseChars.width.value + 'x' + baseChars.height.value;
	}else{
		name = name + baseChars.height.value + 'x' + baseChars.width.value;
	}

	console.log( 'rotationIndex: ' + rotationIndex );

	let params = null;

	let _rotation = PI_90;

	console.log( baseChars );

	if ( baseChars.width.value === baseChars.height.value ){

		_rotation = 0;

	}else if ( baseChars.width.value > baseChars.height.value ){
		if ( rotationIndex === 0 ){
			_rotation = PI_90;
		}else if ( rotationIndex === 1 ){
			_rotation = PI_90;
		} else if ( rotationIndex === 2 ){
			_rotation = PI_90;
		}
	}else if ( baseChars.height.value > baseChars.width.value ){

		if ( rotationIndex === 0 ){
			_rotation = 0;
		}else if ( rotationIndex === 1 ){
			_rotation = 0;
		}else if ( rotationIndex === 2 ){
			_rotation = 0;
		}
	}

	//Если изменяем по высоте
	// if ( type === 'height' ){

	// 	//Если увеличиваем
	// 	if ( operation === 1 ){



	// 	}else{ //Если уменьшаем

	// 	}

	// 	if ( (baseChars.width.value === baseChars.height.value) ){

	// 		_rotation = 0;

	// 	}else if ( baseChars.width.value ){

	// 	}

	// } else if ( type === 'width' ){ //Если изменяем по ширине

	// 	//Если увеличиваем
	// 	if ( operation === 1 ){

	// 	}else{ //Если уменьшаем

	// 	}

	// }

	

	console.log( baseChars );

	if ( type === 'height' ){

		if ( rotationIndex === 0 ){

			params = {
				...elem.params,
				rotationZ : _rotation,
				positionY : elem.params.positionY + operation * ( (( -1*operation*(elem.chars.height.value - baseChars.height.value))/2) )
			}

			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( yIndex === 0 ){

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][1][2] > 1 || //к себе
									 matrixFinger[1][1][0] > 1 || //от себя
									 matrixFinger[0][1][1] > 1 ){ //слева
									closed = true;
								}

							}else if ( yIndex === matrix[0].length-1 ){
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][1][2] > 1 || //к себе
									 matrixFinger[1][1][0] > 1 || //от себя
									 matrixFinger[2][1][1] > 1 ){ //справа
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[1][1][2] > 1 || //к себе
								    matrixProfile[1][1][0] > 1 || //от себя
								    matrixProfile[1][2][1] > 1 //вверх
								) || matrix.length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix.length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === 0 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === (xm.length-1)/2 ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					// console.log( isExist );

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {

							//Разбираем ведущие коннекторы
							if ( xIndex === 0 ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === 0 && yIndex === xm.length-1 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[1][0][1]; // вниз

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionY : _objProfile.params.positionY + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[1][2][1]; //вверх

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[1][0][1];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

							

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix.length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущие коннекторы
						if ( xIndex === 0 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === 0 || yIndex === xm.length-1 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[1][2][1]; //Вверх

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionY : _objProfile.params.positionY - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[1][0][1]; //вниз

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[1][0][1]; //вниз

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === 0 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === (xm.length-1)/2 ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.height.value === 560 )  ){

					console.log( );

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.width.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationX : 0,
							rotationY : PI_90,
							rotationZ : 0,
							positionY : params.positionY + ( (baseChars.height.value/2) + 10 )
						},
					} );

				}

			}

		}else if ( rotationIndex === 1 ) {

			params = {
				...elem.params,
				rotationZ : _rotation,
				positionZ : elem.params.positionZ + operation * ( (( -1*operation*(elem.chars.height.value - baseChars.height.value))/2) )
			}

			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( yIndex === 0 ){ //Берем только левую сторону

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][0][1] > 1 || //вниз
									 matrixFinger[1][2][1] > 1 || //вверх
									 matrixFinger[0][1][1] > 1 ){ //влево
									closed = true;
								}

							}else if ( yIndex === matrix[0].length-1 ){ //Берем только правую сторону
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][0][1] > 1 || //вниз
									 matrixFinger[1][2][1] > 1 || //вверх
									 matrixFinger[2][1][1] > 1 ){ //право
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[1][1][2] > 1 || //к себе
								    matrixProfile[1][2][1] > 1 || //вверх
								    matrixProfile[1][0][1] > 1    //вниз
								) || matrix.length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix.length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === matrixByMatrix.length-1 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === (xm.length-1)/2  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {


							//Разбираем ведущие коннекторы
							if ( xIndex === matrixByMatrix.length-1  ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === 0 || yIndex === xm.length-1 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[1][1][0]; //от себя

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionZ : _objProfile.params.positionZ + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[1][1][2]; //к себе

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[1][1][2];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix.length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущие коннекторы
						if ( xIndex === matrixByMatrix.length-1 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === 0 || yIndex === xm.length-1 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[1][1][2]; //к себе

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionZ : _objProfile.params.positionZ - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[1][1][0]; //от себя

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[1][1][0]; //от себя

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1) ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === ((xm.length-1)/2)  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.height.value === 560 )  ){

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.width.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationY : PI_90,
							positionZ : params.positionZ + ( (baseChars.height.value/2) + 10 )
						},
					} );

				}

			}

		}else{

			params = {
				...elem.params,
				rotationZ : _rotation,
				positionY : elem.params.positionY + operation * ( (( -1*operation*(elem.chars.height.value - baseChars.height.value))/2) )
			}
			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( yIndex === 0 ){

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[0][1][1] > 1 || //слева
									 matrixFinger[2][1][1] > 1 || //справа
									 matrixFinger[1][1][2] > 1 ){ //к себе
									closed = true;
								}

							}else if ( yIndex === matrix[0].length-1 ){
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[0][1][1] > 1 || //слева
									 matrixFinger[2][1][1] > 1 || //справа
									 matrixFinger[1][1][0] > 1 ){ //от себя
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[2][1][1] > 1 || //справа
								    matrixProfile[0][1][1] > 1 || //слева
								    matrixProfile[1][2][1] > 1 //вверх
								) || matrix.length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix.length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === 0 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === (xm.length-1)/2 ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					// console.log( isExist );

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {

							//Разбираем ведущие коннекторы
							if ( xIndex === 0 ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === 0 && yIndex === xm.length-1 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[1][0][1]; // вниз

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionY : _objProfile.params.positionY + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[1][2][1]; //вверх

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[1][0][1];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionY : _obj.params.positionY - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

							

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix.length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущие коннекторы
						if ( xIndex === 0 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === 0 || yIndex === xm.length-1 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[1][2][1]; //Вверх

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionY : _objProfile.params.positionY - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[1][0][1]; //вниз

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[1][0][1]; //вниз

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionY : _obj.params.positionY + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionY : _obj.params.positionY + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === 0 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === (xm.length-1)/2 ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.height.value === 560 )  ){

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.width.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationX : 0,
							rotationY : 0,
							rotationZ : 0,
							positionY : params.positionY + ( (baseChars.height.value/2) + 10 )
						},
					} );

				}

			}

		}

	}else if ( type === 'width' ) {

		if ( rotationIndex === 0 ){

			params = {
				...elem.params,
				rotationZ : _rotation,
				positionX : elem.params.positionX + operation * ( (( -1*operation*(elem.chars.width.value - baseChars.width.value))/2) )
			}

			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( xIndex === 0 ){

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][1][2] > 1 || //к себе
									 matrixFinger[1][1][0] > 1 || //от себя 
									 matrixFinger[1][2][1] > 1 ){ //вверх
									closed = true;
								}

							}else if ( xIndex === matrix.length-1 ){
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][1][2] > 1 || //к себе
									 matrixFinger[1][1][0] > 1 || //от себя 
									 matrixFinger[1][0][1] > 1 ){ //вниз
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[1][1][2] > 1 ||
								    matrixProfile[1][1][0] > 1 ||
								    matrixProfile[2][1][1] > 1 
								) || matrix[0].length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix[0].length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === xm.length-1  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {

							//Разбираем ведущеи коннекторы
							if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === xm.length-1 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[0][1][1];

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionX : _objProfile.params.positionX + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[2][1][1];

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[2][1][1];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

							

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix[0].length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущеи коннекторы
						if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === xm.length-1 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[2][1][1];

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionX : _objProfile.params.positionX - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[0][1][1];

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[0][1][1];

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === xm.length-1  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.width.value === 560 )  ){

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.height.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationX : PI_90,
							rotationY : 0,
							rotationZ : 0,
							positionX : params.positionX + ( (baseChars.width.value/2) + 10 )
						},
					} );

				}

			}


		}else if ( rotationIndex === 1 ) {

			//Сразу задаем новые параметры новой панели
			params = {
				...elem.params,
				rotationZ : _rotation,
				positionX : elem.params.positionX + operation * ( (( -1*operation*(elem.chars.width.value - baseChars.width.value)/2)) )
			}

			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( xIndex === 0 ){

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][0][1] > 1 ||
									 matrixFinger[1][2][1] > 1 ||
									 matrixFinger[1][1][0] > 1 ){
									closed = true;
								}

							}else if ( xIndex === matrix.length-1 ){
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[1][0][1] > 1 ||
									 matrixFinger[1][2][1] > 1 ||
									 matrixFinger[1][1][2] > 1 ){
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[2][1][1] > 1 ||
								    matrixProfile[1][2][1] > 1 ||
								    matrixProfile[1][0][1] > 1 
								) || matrix[0].length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix[0].length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === xm.length-1  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {

							//Разбираем ведущеи коннекторы
							if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === xm.length-1 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[0][1][1];

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionX : _objProfile.params.positionX + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[2][1][1];

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[2][1][1];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionX : _obj.params.positionX - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

							

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix[0].length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущеи коннекторы
						if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === xm.length-1 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[2][1][1];

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionX : _objProfile.params.positionX - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[0][1][1];

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[0][1][1];

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionX : _obj.params.positionX + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionX : _obj.params.positionX + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === xm.length-1  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.width.value === 560 )  ){

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.height.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationX : 0,
							rotationY : 0,
							rotationZ : 0,
							positionX : params.positionX + ( (baseChars.width.value/2) + 10 )
						},
					} );

				}

			}

		}else{

			params = {
				...elem.params,
				rotationZ : _rotation,
				positionZ : elem.params.positionZ + operation * ( (( -1*operation*(elem.chars.width.value - baseChars.width.value)/2)) )
			}

			//Получаем ту же матрицу, что и была, но вместо ID коннеткторов передаем объект с его матрицей на профили
			let matrixByMatrix = matrix.map( (xm, xIndex) => {

				return xm.map( ( ym, yIndex ) => {

					if ( ym > 1 ){

						let obj = elemsFingersState.find( (iObj) => iObj.id === ym );

						if ( obj !== undefined ){

							let matrixFinger = getProfileMatrixByFingerObj( obj, elemsProfilesState );

							let closed = false;

							if ( xIndex === 0 ){

								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[0][1][1] > 1 || //слева
									 matrixFinger[2][1][1] > 1 || //справа
									 matrixFinger[1][2][1] > 1 ){ //вверх
									closed = true;
								}

							}else if ( xIndex === matrix.length-1 ){
								//Отсюда понятно, что коннектор закрытый
								if ( matrixFinger[0][1][1] > 1 || //слева
									 matrixFinger[2][1][1] > 1 || //справа
									 matrixFinger[1][0][1] > 1 ){ //вниз
									closed = true;
								}
							}

							return { 
								id : ym, 
								closed : closed,
								type : 'finger', 
								matrix : matrixFinger
							};
							
						}

						let objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym );

						let matrixProfile = false, closedMatrix = false;

						if ( objProfile !== undefined ){

							matrixProfile = getPanelMatrixByProfile( objProfile, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

							//Профиль закрытый
							if (  
								( 
									matrixProfile[2][1][1] > 1 || //справа
								    matrixProfile[0][1][1] > 1 || //слева
								    matrixProfile[1][1][2] > 1   // к себе
								) || matrix[0].length === 9 ){

								closedMatrix = true;

							}else{
								closedMatrix = false;
							}

						}

						//Значит это профиль
						return {
							id : ym,
							type : 'profile',
							closed : closedMatrix,
							matrix : matrixProfile,
						};

					}else{
						return ym;
					}

				} );

			} );

			//Это исходный матрица
			console.log( matrixByMatrix ); 

			//Копирую этот дуракций массив
			let totalMatrix = matrixByMatrix.map( xm => {
				return xm.map( ym => {
					return ym;
				} )
			} );

			let _textureId = 0, _textureIdProfile = 0, isExist = true;

			//Если увеличиваем панель
			if ( operation === 1 ){

				console.log('increase');

				//Если увеличивать вообще возможно
				if ( matrix[0].length < 9 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === 0  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}else{
											isExist = false;
										}

									}

									

								}

							} )

						}

					});

					if ( isExist ){

						matrixByMatrix.forEach( (xm, xIndex) => {

							//Разбираем ведущеи коннекторы
							if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

								xm.forEach( ( ym, yIndex ) => {

									//Рассматриваем ведущие коннекторы
									if ( yIndex === 0 ){

										//Если коннектор открытый
										if ( !ym.closed ){

											// console.log( 'Открытый' );

											let _rightID = ym.matrix[1][1][0]; //от себя

											let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

											if ( _objFinger !== undefined ){

												//Сначала удаляем коннектор в реестр
												response.remove.fingers.push( _objFinger );

												//Теперь находим объект профиля слева от коннектора
												let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

												if ( _objProfile !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile.chars.depth.value;

													//Если его можно увеличивать
													if ( valueProfile !== 560  ){

														valueProfile = valueProfile + ( 125 + 20 );

														//Удаляем старый профиль
														response.remove.profiles.push( _objProfile );

														//Новый профиль профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_'+valueProfile,
															type : 'profile',
															textureId : _objProfile.textureId,
															params : { 
																..._objProfile.params,
																positionZ : _objProfile.params.positionZ + (125/2+10),
															},
														} );

													}

												}


												let _leftID = ym.matrix[1][1][2]; //к себе

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}


											}


										}

										//Рассматриваем то, что справа от него 
										let _rightID = ym.matrix[1][1][2];

										//Получаем объект профиля
										let _obj = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

										console.log( _obj );

										if ( _obj !== undefined ){

											let valueProfile = _obj.chars.depth.value;

											//Если не равна 125, то делим эту панель, иначе ничего не трогаем
											if ( _obj.chars.depth.value !== 125 ){

												// console.log( '!= 125' );

												_textureId = _obj.textureId;

												//Сначала удаляем ее в реестр
												response.remove.profiles.push( _obj );

												//Теперь нужно добавить два профиля и один коннектор
												if ( valueProfile === 270 ){

													console.log( '= 270' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 125/2 + 10 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params, 
														},
													} );

													if ( ym.closed ){

														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 125/2 + 10 ),
															},
														} );
														

													}

												}else if ( valueProfile === 415 ){

													// console.log( '= 415' );

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_270',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 415/2 - 270/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ - ( 415/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Левый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 415/2 - 125/2 ),
															},
														} );
														
													}
													

												}else if ( valueProfile === 560 ){

													// console.log( '= 560' );

													//Левый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_415',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 560/2 - 415/2 ),
														},
													} );

													//Коннектор
													response.push.fingers.push( {
														id : 100,
														name : 'Fingers_4',
														type : 'finger',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ - ( 560/2 - (125 + 10) ),
														},
													} );

													if ( ym.closed ){
														//Правый профиль
														response.push.profiles.push( {
															id : 100,
															name : 'Profile_125',
															type : 'profile',
															textureId : _textureId,
															params : { 
																..._obj.params,
																positionZ : _obj.params.positionZ - ( 560/2 - 125/2 ),
															},
														} );
													}

												}

											}

										}

									}

								} )

							}

							

						} )

						//Добавляем панель в реестр добавления
						response.push.panels.push( {
							id : 100,
							name : name,
							type : 'panel',
							params : params,
							textureId : elem.textureId,
						} );

						//Добавляем панель в реестр удаления
						response.remove.panels.push( elem ); 

					}

				}

			}else{ //Если уменьшаем панель

				console.log('decrease');

				//Если уменьшать вообще возможно
				if ( matrix[0].length > 3 ){	

					matrixByMatrix.forEach( (xm, xIndex) => {

						//Разбираем ведущие коннекторы
						if ( xIndex === 0 || xIndex === matrixByMatrix.length-1 ){

							xm.forEach( ( ym, yIndex ) => {

								//Рассматриваем ведущие коннекторы
								if ( yIndex === 0 ){

									//Если коннектор открытый
									if ( !ym.closed ){

										// console.log( 'Открытый' );

										let _rightID = ym.matrix[1][1][2]; //к себе

										let _objFinger = elemsFingersState.find( (iObj) => iObj.id === ym.id );

										if ( _objFinger !== undefined ){

											//Сначала удаляем коннектор в реестр
											response.remove.fingers.push( _objFinger );

											//Теперь находим объект профиля справа от коннектора
											let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === _rightID );

											if ( _objProfile !== undefined ){

												//Получаем его размер
												let valueProfile = _objProfile.chars.depth.value;

												//Если его можно увеличивать
												if ( valueProfile !== 560  ){

													valueProfile = valueProfile + ( 125 + 20 );

													//Удаляем старый профиль
													response.remove.profiles.push( _objProfile );

													//Новый профиль профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_'+valueProfile,
														type : 'profile',
														textureId : _objProfile.textureId,
														params : { 
															..._objProfile.params,
															positionZ : _objProfile.params.positionZ - (125/2+10),
														},
													} );

												}

												let _leftID = ym.matrix[1][1][0]; //от себя

												//Теперь находим объект профиля справа от коннектора
												let _objProfile2 = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

												if ( _objProfile2 !== undefined ){

													//Получаем его размер
													let valueProfile = _objProfile2.chars.depth.value;

													//Если он 125, то удаляем
													if ( valueProfile === 125  ){

														//Удаляем  профиль
														response.remove.profiles.push( _objProfile2 );

													}

												}

											}

										}
										
									}

									//Рассматриваем то, что слева от него 
									let _leftID = ym.matrix[1][1][0]; //от себя

									//Получаем объект профиля
									let _obj = elemsProfilesState.find( (iObj) => iObj.id === _leftID );

									console.log( _obj );

									if ( _obj !== undefined ){

										let valueProfile = _obj.chars.depth.value;

										//Если не равна 125, то делим эту панель, иначе ничего не трогаем
										if ( _obj.chars.depth.value !== 125 ){

											// console.log( '!= 125' );

											_textureId = _obj.textureId;

											//Сначала удаляем ее в реестр
											response.remove.profiles.push( _obj );

											//Теперь нужно добавить два профиля и один коннектор
											if ( valueProfile === 270 ){

												// console.log( '= 270' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_125',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 125/2 + 10 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params, 
													},
												} );

												if ( ym.closed ){

													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 125/2 + 10 ),
														},
													} );

												}

											}else if ( valueProfile === 415 ){

												// console.log( '= 415' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_270',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 415/2 - 270/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ + ( 415/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 415/2 - 125/2 ),
														},
													} );
												}
												

											}else if ( valueProfile === 560 ){

												// console.log( '= 560' );

												//Левый профиль
												response.push.profiles.push( {
													id : 100,
													name : 'Profile_415',
													type : 'profile',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ - ( 560/2 - 415/2 ),
													},
												} );

												//Коннектор
												response.push.fingers.push( {
													id : 100,
													name : 'Fingers_4',
													type : 'finger',
													textureId : _textureId,
													params : { 
														..._obj.params,
														positionZ : _obj.params.positionZ + ( 560/2 - (125 + 10) ),
													},
												} );

												if ( ym.closed ){
													//Правый профиль
													response.push.profiles.push( {
														id : 100,
														name : 'Profile_125',
														type : 'profile',
														textureId : _textureId,
														params : { 
															..._obj.params,
															positionZ : _obj.params.positionZ + ( 560/2 - 125/2 ),
														},
													} );
												}

											}

										}

									}



								}

							} )

						}

						//Разбираем ведущую панель
						if ( xIndex === (matrixByMatrix.length-1)/2 ){

							xm.forEach( (ym, yIndex) => {

								//Расстатриваем только ведущий профиль
								if ( yIndex === 0  ){

									//Если это вообще профиль
									if ( typeof ym === 'object' && ym.type === 'profile' ){

										//Теперь находим объект профиля справа от коннектора
										let _objProfile = elemsProfilesState.find( (iObj) => iObj.id === ym.id );

										_textureIdProfile = _objProfile.textureId;

										//Если он открытый, то удаляем
										if ( !ym.closed ){

											if ( _objProfile !== undefined ){

												//Удаляем старый профиль
												response.remove.profiles.push( _objProfile );

											}

										}

									}

									

								}

							} )

						}

					} )

					//Добавляем панель в реестр добавления
					response.push.panels.push( {
						id : 100,
						name : name,
						type : 'panel',
						params : params,
						textureId : elem.textureId,
					} );

					//Добавляем панель в реестр удаления
					response.remove.panels.push( elem ); 

				}

			}

			if ( isExist ){

				if ( !( operation === 1 && baseChars.width.value === 560 )  ){

					response.push.profiles.push( {
						id : 100,
						name : 'Profile_'+baseChars.height.value,
						type : 'profile',
						textureId : _textureIdProfile,
						params : { 
							...params, 
							rotationX : PI_90,
							rotationY : 0,
							rotationZ : 0,
							positionZ : params.positionZ + ( (baseChars.width.value/2) + 10 )
						},
					} );

				}

			}

		}

	}

	return response;


}
//Конфиг
import { config, PI, PI_90, SIZE_STANDART } from '../Config.js';

import { getProfileMatrixByFingerObj, getPanelMatrixByProfile } from '../helpers/constructorHelper.js';

export const changeSizeProfile = ( elem, value, type, elemsProfilesState, elemsFingersState, elemsPanelsState ) => {
	
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
	    rotationIndex = 1; //Вертикальный по ОсиY
	}else if( (elem.params.rotationY).toFixed(2) === PI_90.toFixed(2) ){
	    rotationIndex = 2; //Горизонтальный по ОсиX
	}

	//Готовим респонз в пуш.
	let response = {
		push : {
			profiles : [],
			fingers : []
		},
		remove : {
			profiles : [],
			fingers : []
		}
	}

	//Получаем матрицу рабочего профиля
	let matrixProfile = getPanelMatrixByProfile( elem, elemsPanelsState, elemsFingersState, elemsProfilesState ); 

	// console.log( matrixProfile );

	//Если увеличиваем профиль
	if ( operation === 1 ){

		let isClosed = false;

		//Получаем ведущий коннектор.
		let idFinger;
		if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
			idFinger = matrixProfile[1][1][2].id; //Вперед
		} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
			idFinger = matrixProfile[1][2][1].id; //Вверх
		} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
			idFinger = matrixProfile[2][1][1].id; //Вправо
		}

		console.log( 'idFinger: ' + idFinger );

		//Получаем объект пальца по ID.
		let objFinger = elemsFingersState.find( (iObj) => iObj.id === idFinger );

		//Обявляем ведущий профиль
		let _objProfile = undefined;

		if ( objFinger !== undefined ){
				
			//Получаем его матрицу
			let matrixObjFinger = getProfileMatrixByFingerObj( objFinger, elemsProfilesState  );

			console.log( matrixObjFinger );

			//Получаем ID ведущего профиля.
			let leadProfileID;
			if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
				leadProfileID = matrixObjFinger[1][1][2]; //Вперед
			} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
				leadProfileID = matrixObjFinger[1][2][1]; //Вверх
			} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
				leadProfileID = matrixObjFinger[2][1][1]; //Вправо
			}

			console.log( 'Ведущий профиль: ' + leadProfileID );

			//Значит профиль есть.
			if ( leadProfileID > 1 ){

				//Получаем его объект.
				_objProfile = elemsProfilesState.find( (iObj) => iObj.id === leadProfileID );

				console.log( _objProfile );

				if ( _objProfile !== undefined ){

					if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[0][1][1] > 1 || //Влево
						     matrixObjFinger[2][1][1] > 1 || //Вправо
						     matrixObjFinger[1][0][1] > 1 || //Вверх
						     matrixObjFinger[1][2][1] > 1    //Вниз
						    ){
							isClosed = true;
						}
					} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[0][1][1] > 1 || //Влево
						     matrixObjFinger[2][1][1] > 1 || //Вправо
						     matrixObjFinger[1][1][2] > 1 || //Вперед
						     matrixObjFinger[1][1][0] > 1    //Назад
						    ){
							isClosed = true;
						}
					} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[1][1][2] > 1 || //Вперед
						     matrixObjFinger[1][1][0] > 1 || //Назад
						     matrixObjFinger[1][0][1] > 1 || //Вверх
						     matrixObjFinger[1][2][1] > 1    //Вниз
						    ){
							isClosed = true;
						}
					}

				}

			}else{ // Коннектор точно закрытый

				isClosed = true;

			}

		}

		//Не закрытый
		if ( ! isClosed ){

			let _obj = elem, valueProfile = _obj.chars.depth.value, valueSecondProfile = _objProfile.chars.depth.value, textureId = _obj.textureId;

			if ( valueProfile !== 560 ){

				//Сначала удаляем ее в реестр работающий
				response.remove.profiles.push( _obj );

				//Сначала удаляем ее в реестр ведущий
				response.remove.profiles.push( _objProfile );

				//Сначала удаляем ее в реестр коннектор
				response.remove.fingers.push( objFinger );

				let workingSide;
				if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
					workingSide = 'positionZ';
				} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
					workingSide = 'positionY';
				} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
					workingSide = 'positionX'; 
				}

				let firstProfile = { //Работающий профиль
					name : '',
					position : 0,
				}, finger = {
					name : 'Fingers_4',
					position : 0,
				}, secondProfile = { //Ведущий профиль
					name : '',
					position : 0,
				}

				if ( valueProfile === 125 ){
					firstProfile = {
						name : 'Profile_270',
						position : ( (125+20)/2 ),
					}
					finger = {
						name : 'Fingers_4',
						position : ( (125 + 270 + 40)/2 ),
					}
				} else if ( valueProfile === 270 ){
					firstProfile = {
						name : 'Profile_415',
						position : ( (270+20)/2 - ( 125 + 20 )/2 ),
					}
					finger = {
						name : 'Fingers_4',
						position : ( (270 + 415 + 40)/2 - 145/2 ),
					}
				} else if ( valueProfile === 415 ){
					firstProfile = {
						name : 'Profile_560',
						position : ( (415+20)/2 - (270+20)/2 ),
					}
					finger = {
						name : 'Fingers_4',
						position : ( (415 + 560 + 40)/2 - 145/2 ),
					}
				}

				if ( valueSecondProfile === 270 ){

					secondProfile = {
						name : 'Profile_125',
						position : ( 270/2 - 125/2 ),
					}

				} else if ( valueSecondProfile === 415 ){

					secondProfile = {
						name : 'Profile_270',
						position : ( 415/2 - 270/2 ),
					}

				} else if ( valueSecondProfile === 560 ){

					secondProfile = {
						name : 'Profile_415',
						position : ( 560/2 - 415/2 ),
					}

				}

				if( valueSecondProfile !== 125 ){
					
					response.push.profiles.push( {
						id : 100,
						name : secondProfile.name,
						type : 'profile',
						textureId : textureId,
						params : { 
							..._objProfile.params,
							[workingSide] : _objProfile.params[workingSide] + secondProfile.position,
						},
					} );
					response.push.fingers.push( {
						id : 100,
						name : finger.name,
						type : 'finger',
						textureId : textureId,
						params : { 
							..._obj.params,
							[workingSide] : _obj.params[workingSide] + finger.position,
						},
					} );
				}

				response.push.profiles.push( {
					id : 100,
					name : firstProfile.name,
					type : 'profile',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + firstProfile.position,
					},
				} );

				

			}

		}

	}else{ //Если уменьшаем профиль

		let isClosed = false;

		//Получаем ведущий коннектор.
		let idFinger;
		if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
			idFinger = matrixProfile[1][1][2].id; //Вперед
		} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
			idFinger = matrixProfile[1][2][1].id; //Вверх
		} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
			idFinger = matrixProfile[2][1][1].id; //Вправо
		}

		console.log( 'idFinger: ' + idFinger );

		//Получаем объект пальца по ID.
		let objFinger = elemsFingersState.find( (iObj) => iObj.id === idFinger );

		//Обявляем ведущий профиль
		let _objProfile = undefined;

		if ( objFinger !== undefined ){
				
			//Получаем его матрицу
			let matrixObjFinger = getProfileMatrixByFingerObj( objFinger, elemsProfilesState  );

			console.log( matrixObjFinger );

			//Получаем ID ведущего профиля.
			let leadProfileID;
			if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
				leadProfileID = matrixObjFinger[1][1][2]; //Вперед
			} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
				leadProfileID = matrixObjFinger[1][2][1]; //Вверх
			} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
				leadProfileID = matrixObjFinger[2][1][1]; //Вправо
			}

			console.log( 'Ведущий профиль: ' + leadProfileID );

			//Значит профиль есть.
			if ( leadProfileID > 1 ){

				//Получаем его объект.
				_objProfile = elemsProfilesState.find( (iObj) => iObj.id === leadProfileID );

				console.log( _objProfile );

				if ( _objProfile !== undefined ){

					if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[0][1][1] > 1 || //Влево
						     matrixObjFinger[2][1][1] > 1 || //Вправо
						     matrixObjFinger[1][0][1] > 1 || //Вверх
						     matrixObjFinger[1][2][1] > 1 || //Вниз
						     _objProfile.chars.depth.value === 560
						    ){
							isClosed = true;
						}
					} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[0][1][1] > 1 || //Влево
						     matrixObjFinger[2][1][1] > 1 || //Вправо
						     matrixObjFinger[1][1][2] > 1 || //Вперед
						     matrixObjFinger[1][1][0] > 1 || //Назад
						     _objProfile.chars.depth.value === 560
						    ){
							isClosed = true;
						}
					} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
						//Проверяем его на закрытость по сторонам.
						if ( matrixObjFinger[1][1][2] > 1 || //Вперед
						     matrixObjFinger[1][1][0] > 1 || //Назад
						     matrixObjFinger[1][0][1] > 1 || //Вверх
						     matrixObjFinger[1][2][1] > 1 || //Вниз
						     _objProfile.chars.depth.value === 560
						    ){
							isClosed = true;
						}
					}

				}

			}else{ // Коннектор точно закрытый

				isClosed = true;

			}

		}

		//Закрытый
		if ( isClosed ){

			let _obj = elem, valueProfile = _obj.chars.depth.value, textureId = _obj.textureId;

			if ( valueProfile !== 125 ){

				//Сначала удаляем ее в реестр
				response.remove.profiles.push( _obj );

				let firstProfile = {
					name : '',
					position : 0,
				}, secondProfile = {
					name : '',
					position : 0,
				}, finger = {
					name : 'Fingers_4',
					position : 0,
				}

				let workingSide;
				if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
					workingSide = 'positionZ';
				} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
					workingSide = 'positionY';
				} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
					workingSide = 'positionX'; 
				}


				if ( valueProfile === 270 ){

					firstProfile = {
						name : 'Profile_125',
						position : -1 * ( 125/2 + 10 ),
					}
					secondProfile ={
						name : 'Profile_125',
						position : ( 125/2 + 10 ),
					}

				} else if ( valueProfile === 415 ){

					firstProfile = {
						name : 'Profile_270',
						position : -1 *( 415/2 - 270/2 ),
					}
					secondProfile ={
						name : 'Profile_125',
						position : ( 415/2 - 125/2 ),
					}
					finger = {
						name : 'Fingers_4',
						position : ( 415/2 - (125 + 10) ),
					}

				} else if ( valueProfile === 560 ){

					firstProfile = {
						name : 'Profile_415',
						position : -1 * ( 560/2 - 415/2 ),
					}
					secondProfile ={
						name : 'Profile_125',
						position :  ( 560/2 - 125/2 ),
					}
					finger = {
						name : 'Fingers_4',
						position :  ( 560/2 - (125 + 10) ),
					}

				}

				response.push.profiles.push( {
					id : 100,
					name : firstProfile.name,
					type : 'profile',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + firstProfile.position,
					},
				} );

				response.push.fingers.push( {
					id : 100,
					name : finger.name,
					type : 'finger',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + finger.position,
					},
				} );

				response.push.profiles.push( {
					id : 100,
					name : secondProfile.name,
					type : 'profile',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + secondProfile.position,
					},
				} );

			}

		}else{ 
			//Открытый коннектор
			let _obj = elem, valueProfile = _obj.chars.depth.value, valueSecondProfile = _objProfile.chars.depth.value, textureId = _obj.textureId;

			//Удаляем текущий профиль
			response.remove.profiles.push( _obj );

			console.log( _obj );

			//Удаляем ведущий профиль
			response.remove.fingers.push( objFinger );

			console.log( objFinger );

			//Удаляем ведущий профиль
			response.remove.profiles.push( _objProfile );

			console.log( _objProfile );

			let workingSide;
			if ( rotationIndex === 0 ){ //Горизонтальный по ОсиZ
				workingSide = 'positionZ';
			} else if ( rotationIndex === 1 ){ //Вертикальный по ОсиY
				workingSide = 'positionY';
			} else if ( rotationIndex === 2 ){ //Горизонтальный по ОсиX
				workingSide = 'positionX'; 
			}

			let firstProfile = { //Работающий профиль
				name : '',
				position : 0,
			}, finger = {
				name : 'Fingers_4',
				position : 0,
			}, secondProfile = { //Ведущий профиль
				name : '',
				position : 0,
			}

			if ( valueProfile === 270 ){
				firstProfile = {
					name : 'Profile_125',
					position : -1 * ( 125/2 + 10 ),
				}
				secondProfile ={
					name : 'Profile_125',
					position : ( 125/2 + 10 ),
				}
			} else if ( valueProfile === 415 ){
				firstProfile = {
					name : 'Profile_270',
					position : -1 *( 415/2 - 270/2 ),
				}
				finger = {
					name : 'Fingers_4',
					position : ( 415/2 - (125 + 10) ),
				}
			}

			if ( valueSecondProfile === 125 ){

				secondProfile = {
					name : 'Profile_270',
					position : -1 * ( 125/2 + 10 ),
				}

			} else if ( valueSecondProfile === 270 ){

				secondProfile = {
					name : 'Profile_415',
					position : -1 * (  415/2 - 270/2 ),
				}

			} else if ( valueSecondProfile === 415 ){

				secondProfile = {
					name : 'Profile_560',
					position : -1 * ( 560/2 - 415/2 ),
				}

			}

			if ( valueProfile !== 125 ){

				response.push.profiles.push( {
					id : 100,
					name : firstProfile.name,
					type : 'profile',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + firstProfile.position,
					},
				} );

				response.push.fingers.push( {
					id : 100,
					name : finger.name,
					type : 'finger',
					textureId : textureId,
					params : { 
						..._obj.params,
						[workingSide] : _obj.params[workingSide] + finger.position,
					},
				} );

			}
			
			response.push.profiles.push( {
				id : 100,
				name : secondProfile.name,
				type : 'profile',
				textureId : textureId,
				params : { 
					..._objProfile.params,
					[workingSide] : _objProfile.params[workingSide] + secondProfile.position,
				},
			} );

		}

	}


	return response;

}
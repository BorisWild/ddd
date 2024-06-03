//Конфиг
import { config, PI, PI_90 } from '../Config.js';

// const round = ( num ) => {
//   // return Math.floor(num * 10) / 10
//   return ( ( num * 100) - ( num * 100) % 1 ) / 100;
// }

export function round ( num ) {
  // return Math.floor(num * 10) / 10
  return ( ( num * 100) - ( num * 100) % 1 ) / 100;
  
};

export function getCountLinkByFinger( matrix ) {

  let count = 0;

  matrix.forEach( xm => {
   xm.forEach( ym => {
     ym.forEach( id => {
       if ( id > 1 ){
         count++;
       }
     } )
   } )
  })

  return count;

}


export function getPanelMatrixByObj( obj, elemsProfilesState, elemsFingersState ){

  // console.log( obj );

  let needParams = [
    { value : 125, matrix : 3 },
    { value : 270, matrix : 5 },
    { value : 415, matrix : 7 },
    { value : 560, matrix : 9 },
  ];

  let chars = null, matrix = [], xMatrix = 0, yMatrix = 0, rotationIndex = 0, objPosition = obj.params;

  if ( obj && obj.chars ){

    chars = obj.chars;

  }

  if ( obj.chars.height && obj.chars.width ){

    let _yMatrix = 0;

    // console.log( needParams.find( param => param.value === obj.chars.width.value ) );

    // console.log( needParams.find( param => param.value === obj.chars.height.value ) ) 

    if ( needParams.find( param => param.value === obj.chars.width.value ) ){
      yMatrix = needParams.find( param => param.value === obj.chars.width.value ).matrix;
      _yMatrix = needParams.find( param => param.value === obj.chars.width.value ).matrix;
    }

    if ( needParams.find( param => param.value === obj.chars.height.value ) ){
      
      xMatrix = needParams.find( param => param.value === obj.chars.height.value ).matrix;
    }

    if ( obj.params.rotationZ.toFixed(2) === PI_90.toFixed(2) ){

      // console.log('rotationaly!');

    }

    // console.log( xMatrix, yMatrix );

  }

  for ( let x = 0; x < xMatrix; x++ ){
    matrix.push([]); 
    for ( let y = 0; y < yMatrix; y++ ){
      matrix[x].push([]); 
      matrix[x][y] = 0;
    }
  }

  if ( (objPosition.rotationX).toFixed(2) === PI_90.toFixed(2) ){

    rotationIndex = 1;

  }else if( (objPosition.rotationY).toFixed(2) === PI_90.toFixed(2) ){

    rotationIndex = 2;

  }

  // console.log( 'rotationIndex: ' + rotationIndex );

  let _params = {
    positionX : objPosition.positionX,
    positionY : objPosition.positionY,
    positionZ : objPosition.positionZ,
  }


  let dimensionHeight = ((obj.chars.height.value/2))+(10);
  let dimensionWidth = ((obj.chars.width.value/2))+(10);

  if ( xMatrix < yMatrix || rotationIndex === 2 ){

    dimensionWidth = ((obj.chars.height.value/2))+(10);
    dimensionHeight = ((obj.chars.width.value/2))+(10);

    // if ( !(xMatrix < yMatrix && rotationIndex === 2) ){

      

    // }

  }

  if ( rotationIndex === 0 ){
    if (  obj.params.rotationZ.toFixed(2) === PI_90.toFixed(2) ){
      _params.positionX -= dimensionHeight;
      _params.positionY += dimensionWidth;
    }else{
      _params.positionX -= dimensionWidth;
      _params.positionY += dimensionHeight;
    }
  }else if ( rotationIndex === 1 ){
    if (  obj.params.rotationZ.toFixed(2) === PI_90.toFixed(2) ){
      _params.positionX -= dimensionHeight;
      _params.positionZ -= dimensionWidth;
    }else{
      _params.positionX -= dimensionWidth;
      _params.positionZ -= dimensionHeight;
    }
  }else{
    if (  obj.params.rotationZ.toFixed(2) === PI_90.toFixed(2) ){
      _params.positionY += dimensionHeight;
      _params.positionZ += dimensionWidth;
    }else{
      _params.positionY += dimensionWidth;
      _params.positionZ += dimensionHeight;
    }
    
  }

  // console.log( _params ); 

  matrix.forEach( (xm, xIndex) => {

    xm.forEach( (ym, yIndex) => {

      let mParams = { ..._params };

      if( xIndex === 0 || xIndex === xMatrix-1 ){
        matrix[xIndex][yIndex] = 1;
      }else{
        if ( yIndex === 0 || yIndex === yMatrix-1 ){
          matrix[xIndex][yIndex] = 1;
        }
      }

      if ( matrix[xIndex][yIndex] === 1){

        if ( yIndex !== 0 ){

          if( yIndex % 2 == 0 ){
            if ( rotationIndex === 0 ){
              mParams.positionX += ( (125 * (yIndex/2) ) + (20 * (yIndex/2) ) );
            }else if ( rotationIndex === 1 ){
              mParams.positionX += ( (125 * (yIndex/2) ) + (20 * (yIndex/2) ) );
            }else{
              mParams.positionZ -= ( (125 * (yIndex/2) ) + (20 * (yIndex/2) ) );
            }
            
          }else{
            if ( rotationIndex === 0 ){
              mParams.positionX += ( (125 * (parseInt(yIndex/2)+1) ) + (20 * parseInt(yIndex/2) ) );
            }else if ( rotationIndex === 1 ){
              mParams.positionX += ( (125 * (yIndex/2) ) + (20 * (yIndex/2) ) );
            }else{
              mParams.positionZ -= ( (125 * (yIndex/2) ) + (20 * (yIndex/2) ) );
            }
            
          }

        }
        if ( xIndex !== 0 ){

          if( xIndex % 2 == 0 ){
            if ( rotationIndex === 0 ){
              mParams.positionY -= ( (125 * (xIndex/2) ) + (20 * (xIndex/2) ) );
            }else if ( rotationIndex === 1 ){
              mParams.positionZ += ( (125 * (xIndex/2) ) + (20 * (xIndex/2) ) );
            }else{
              mParams.positionY -= ( (125 * (xIndex/2) ) + (20 * (xIndex/2) ) );
            }
            
          }else{
            if ( rotationIndex === 0 ){
              mParams.positionY -= ( (125 * (parseInt(xIndex/2)+1) ) + (20 * parseInt(xIndex/2) ) );
            }else if ( rotationIndex === 1 ){
              mParams.positionZ += ( (125 * (parseInt(xIndex/2)+1) ) + (20 * parseInt(xIndex/2) ) );
            }else{
              mParams.positionY -= ( (125 * (parseInt(xIndex/2)+1) ) + (20 * parseInt(xIndex/2) ) );
            }
            
          }

        }
      
        let obj = elemsFingersState.find( (item) => 
          round(item.params.positionX.toFixed(2)) == round( mParams.positionX.toFixed(2) ) &&
          round(item.params.positionY.toFixed(2)) == round( mParams.positionY.toFixed(2) ) &&
          round(item.params.positionZ.toFixed(2)) == round( mParams.positionZ.toFixed(2) )
        )

        if ( obj === undefined ){

          obj = elemsProfilesState.find( (item) => 
            round(item.params.positionX.toFixed(2)) == round(mParams.positionX.toFixed(2)) &&
            round(item.params.positionY.toFixed(2)) == round(mParams.positionY.toFixed(2)) &&
            round(item.params.positionZ.toFixed(2)) == round(mParams.positionZ.toFixed(2))
          )
        }

        if ( obj !== undefined ){
          if ( matrix[xIndex][yIndex] <= 1 ){
            matrix[xIndex][yIndex] = obj.id;
          }
          
        }
       
      }

    } )

  } )

  return matrix;

}


export function getProfileMatrixByFingerObj( obj, elemsProfilesState, elemsLegsState = [] ){

  // console.log( obj );

  let matrix = [], objPosition = obj.params;

  for ( let x = 0; x < 3; x++){
    matrix.push([]); 
    for ( let y = 0; y < 3; y++ ){
      matrix[x].push([]); 
      for ( let z = 0; z < 3; z++ ){
        matrix[x][y].push([]); 
        if( x === 1 && y === 1 && z === 1 ){
          matrix[x][y][z] = 0;
        }else{
          matrix[x][y][z] = 0;
        }

      }

    }

  }

  // matrix[1][1][0] - это точка по середине фронтальной стороны куба.

  matrix[1][1][0] = 1; //фронтальная
  matrix[1][1][2] = 1; //заднаяя

  matrix[0][1][1] = 1; //левая
  matrix[2][1][1] = 1; //правая

  matrix[1][2][1] = 1; //вверху
  matrix[1][0][1] = 1; //внизу

  matrix.forEach( ( xm, xIndex ) => {

    xm.forEach( (ym, yIndex) => {

      ym.forEach( (zm, zIndex) => {

        if ( zm === 1 ){

          // console.log( xIndex, yIndex, zIndex ); 

          let _targerPosition = {
            positionX : round(objPosition.positionX),
            positionY : round(objPosition.positionY),
            positionZ : round(objPosition.positionZ),
          };

          // console.log(_targerPosition);

          let deltaX = 0, deltaY = 0, deltaZ = 0;

          [ xIndex, yIndex, zIndex ].forEach( ( dir, dirIndex ) => {

            let isEnd = false, objId = 0, needParams = [ 125, 270, 415, 560 ];

            needParams.forEach( ( size ) => {

              deltaX = 0; deltaY = 0; deltaZ = 0;

              if ( objId !== 0 || !isEnd ){

                if ( dirIndex === 0 ){

                  if ( dir === 0 ){ //cлева

                    deltaX = -1 * ( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //справа

                    deltaX = ( ( (size/2)+10 ) );
                  }

                }else if ( dirIndex == 1 ){

                  if ( dir === 0 ){ //вниз

                    deltaY = -1 * ( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //вверх

                    deltaY = ( ( (size/2)+10 ) );

                  }

                } else if ( dirIndex === 2 ){

                  if ( dir === 0 ){ //зад

                    deltaZ = -1 *( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //перед

                    deltaZ = ( ( (size/2)+10 ) );

                  }

                }

                _targerPosition = {
                  positionX : objPosition.positionX + deltaX,
                  positionY : objPosition.positionY + deltaY,
                  positionZ : objPosition.positionZ + deltaZ,
                };

                // if ( xIndex === 2 && yIndex === 1 && zIndex === 1 && size === 125){

                //   console.log( _targerPosition.positionX );

  
                //   elemsProfilesState.forEach( ( item ) => {

                //     if ( item.params.positionX === 0.725 && item.name === 'Profile_125' ){

                //       console.log( round( (item.params.positionX).toFixed(2)), round( (_targerPosition.positionX).toFixed(2)) );
                //       console.log( round( (item.params.positionY).toFixed(2)), round( (_targerPosition.positionY).toFixed(2)) );
                //       console.log( round( (item.params.positionZ).toFixed(2)), round( (_targerPosition.positionZ).toFixed(2)) );

                //       if (
                //         round( (item.params.positionX).toFixed(2)) == round( (_targerPosition.positionX).toFixed(2)) &&
                //         round( (item.params.positionY).toFixed(2)) == round( (_targerPosition.positionY).toFixed(2)) &&
                //         round( (item.params.positionZ).toFixed(2)) == round( (_targerPosition.positionZ).toFixed(2)) ){
                //         console.log('Да!' + item.id);

                //       }else{
                //         console.log('Ноу!' + item.id);
                //       }
                //     }

                //   } )

                // }

                let obj = elemsProfilesState.find( (item) => 
                  round( (item.params.positionX).toFixed(2)) == round( (_targerPosition.positionX).toFixed(2)) &&
                  round( (item.params.positionY).toFixed(2)) == round( (_targerPosition.positionY).toFixed(2)) &&
                  round( (item.params.positionZ).toFixed(2)) == round( (_targerPosition.positionZ).toFixed(2))
                )

                if ( obj !== undefined ){

                  if ( matrix[xIndex][yIndex][zIndex] <= 1 ){
                    // if ( xIndex === 2 && yIndex === 1 && zIndex === 1 && size === 125 && obj.params.positionX === 0.725 && obj.name === 'Profile_125'){

                    //   console.log('size : ' + size + ' ' + obj.id);

                    // }
                    matrix[xIndex][yIndex][zIndex] = obj.id;
                    objId = obj.id;
                  }                 

                }else{

                  obj = elemsLegsState.find( (item) => 
                    round( (item.params.positionX).toFixed(2)) == round( (_targerPosition.positionX).toFixed(2)) &&
                    round( (item.params.positionY).toFixed(2)) == round( (_targerPosition.positionY).toFixed(2)) &&
                    round( (item.params.positionZ).toFixed(2)) == round( (_targerPosition.positionZ).toFixed(2))
                  )
                  if ( obj !== undefined ){

                    if ( matrix[xIndex][yIndex][zIndex] <= 1 ){
                      matrix[xIndex][yIndex][zIndex] = obj.id;
                      objId = obj.id;
                    }                 

                  }

                }

              }

            } )

            

          }) 


        }

      })


    } )


  } )

  return matrix;

}

export function getPanelMatrixByProfile( obj, elemsPanelsState, elemsFingersState, elemsProfilesState ){

  let matrix = [], objPosition = obj.params, rotationIndex = 0;

  if ( (objPosition.rotationY).toFixed(2) === PI_90.toFixed(2) ){
    rotationIndex = 1;
  }else if( (objPosition.rotationX).toFixed(2) === PI_90.toFixed(2) ){
    rotationIndex = 2;
  }

  for ( let x = 0; x < 3; x++){
    matrix.push([]); 
    for ( let y = 0; y < 3; y++ ){
      matrix[x].push([]); 
      for ( let z = 0; z < 3; z++ ){
        matrix[x][y].push([]); 
        if( x === 1 && y === 1 && z === 1 ){
          matrix[x][y][z] = 0;
        }else{
          matrix[x][y][z] = 0;
        }

      }

    }

  }

  matrix[1][1][0] = 1; //фронтальная
  matrix[1][1][2] = 1; //заднаяя

  matrix[0][1][1] = 1; //левая
  matrix[2][1][1] = 1; //правая

  matrix[1][2][1] = 1; //внизу
  matrix[1][0][1] = 1; //вверху

  if ( rotationIndex === 0 ) {

    matrix[1][1][0] = -1; //фронтальная
    matrix[1][1][2] = -1; //заднаяя

  } else if ( rotationIndex === 1 ) {

    matrix[0][1][1] = -1; //левая
    matrix[2][1][1] = -1; //правая

  } else if ( rotationIndex === 2 ){

    matrix[1][2][1] = -1; //внизу
    matrix[1][0][1] = -1; //вверху

  }

  matrix.forEach( ( xm, xIndex ) => {

    xm.forEach( (ym, yIndex) => {

      ym.forEach( (zm, zIndex) => {

        if ( zm === 1 || zm === -1 ){

          // console.log( xIndex, yIndex, zIndex ); 

          let _targerPosition = {
            positionX : round(objPosition.positionX),
            positionY : round(objPosition.positionY),
            positionZ : round(objPosition.positionZ),
          };

          // console.log(_targerPosition);

          let deltaX = 0, deltaY = 0, deltaZ = 0;

          [ xIndex, yIndex, zIndex ].forEach( ( dir, dirIndex ) => {

            let isEnd = false, objId = 0, needParams = [ 125, 270, 415, 560 ];

            needParams.forEach( ( size ) => {

              deltaX = 0; deltaY = 0; deltaZ = 0;

              if ( objId !== 0 || !isEnd ){

                if ( dirIndex === 0 ){

                  if ( dir === 0 ){ //cлева

                    deltaX = -1 * ( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //справа

                    deltaX = ( ( (size/2)+10 ) );
                  }

                }else if ( dirIndex == 1 ){

                  if ( dir === 0 ){ //вниз

                    deltaY = -1 * ( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //вверх

                    deltaY = ( ( (size/2)+10 ) );

                  }

                } else if ( dirIndex === 2 ){

                  if ( dir === 0 ){ //назад

                    deltaZ = -1 *( ( (size/2)+10 ) );

                  }else if ( dir === 2 ){ //вперед

                    deltaZ = ( ( (size/2)+10 ) );

                  }

                }

                _targerPosition = {
                  positionX : objPosition.positionX + deltaX,
                  positionY : objPosition.positionY + deltaY,
                  positionZ : objPosition.positionZ + deltaZ,
                };

                // console.log( _targerPosition );

                let obj = elemsPanelsState.find( (item) => 
                  round(item.params.positionX.toFixed(2)) == round(_targerPosition.positionX.toFixed(2)) &&
                  round(item.params.positionY.toFixed(2)) == round(_targerPosition.positionY.toFixed(2)) &&
                  round(item.params.positionZ.toFixed(2)) == round(_targerPosition.positionZ.toFixed(2))
                )

                if ( obj !== undefined ){

                  if ( matrix[xIndex][yIndex][zIndex] <= 0 ){
                    matrix[xIndex][yIndex][zIndex] = { type : 'finger', id : obj.id };
                    objId = obj.id;
                  }

                }else {

                  if ( zm === -1 ){

                    obj = elemsFingersState.find( (item) => 
                      round(item.params.positionX.toFixed(2)) == round(_targerPosition.positionX.toFixed(2)) &&
                      round(item.params.positionY.toFixed(2)) == round(_targerPosition.positionY.toFixed(2)) &&
                      round(item.params.positionZ.toFixed(2)) == round(_targerPosition.positionZ.toFixed(2))
                    )
                    if ( obj !== undefined ){

                      if ( matrix[xIndex][yIndex][zIndex] <= 0 ){
                        matrix[xIndex][yIndex][zIndex] = { type : 'finger', id : obj.id };
                        objId = obj.id;
                      }

                    } 

                  }else{
                    obj = elemsProfilesState.find( (item) => 
                      round(item.params.positionX.toFixed(2)) == round(_targerPosition.positionX.toFixed(2)) &&
                      round(item.params.positionY.toFixed(2)) == round(_targerPosition.positionY.toFixed(2)) &&
                      round(item.params.positionZ.toFixed(2)) == round(_targerPosition.positionZ.toFixed(2))
                    )

                    if ( obj !== undefined ){

                      if ( matrix[xIndex][yIndex][zIndex] <= 0){
                        matrix[xIndex][yIndex][zIndex] = 0;
                        objId = 1;
                      }

                     

                    }
                  }

                }

              }

            } )


          }) 


        }

      })


    } )


  } )

  return matrix;

}

export function checkClosedLeg ( leg, elemsFingersState ){

  let isClosed = false;

  console.log( leg );

  let _targerPosition = {
    positionX : leg.params.positionX,
    positionY : leg.params.positionY + ((125+20)/2),
    positionZ : leg.params.positionZ,
  }

  console.log( _targerPosition );

  let obj = false, fault = 0.01, fault2 = 0.1;

  [ elemsFingersState ].forEach( (states) => {

    states.forEach( ( item ) => {

      if ( !obj ){

        [ 0 ].forEach( (value) => {

          let arrValue = [];

          arrValue.push( { x: 0, y: 0, z: 0 } ); //1
          // arrValue.push( { x: value, y: 0, z: 0 } ); //2
          // arrValue.push( { x: 0, y: value, z: 0 } ); //3
          // arrValue.push( { x: 0, y: 0, z: value } ); //4
          // arrValue.push( { x: value, y: value, z: 0 } ); //5
          // arrValue.push( { x: 0, y: value, z: value } ); //6
          // arrValue.push( { x: value, y: 0, z: value } ); //7
          // arrValue.push( { x: value, y: value, z: value } ); //8

          arrValue.forEach( (val) => {

            if ( !obj ){

              let findObj = states.find( (item) => 
                round(item.params.positionX) == _targerPosition.positionX + val.x &&
                round(item.params.positionY) == _targerPosition.positionY + val.y &&
                round(item.params.positionZ) == _targerPosition.positionZ + val.z
              )

              if ( findObj !== undefined ){

                obj = findObj;

              }

            }  

          } )

                        

        } )

      }

    } )

  } );

  if ( obj !== false ){
    isClosed = true;
  }

  return isClosed;

}

export function getObjMatrixByCeil( obj, elemsPanelsState, elemsFingersState, elemsProfilesState ){

  let matrix = [], objPosition = obj.params, chars = obj.chars, xStandart = 0, yStandart = 0, zStandart = 0;

  let standartParamsForMatrix = [
    { value : 125, matrix : 3 },
    { value : 270, matrix : 5 },
    { value : 415, matrix : 7 },
    { value : 560, matrix : 9 },
  ];

  xStandart = (standartParamsForMatrix.find( (item) => item.value === chars.width.value )).matrix;
  yStandart = (standartParamsForMatrix.find( (item) => item.value === chars.height.value )).matrix;
  zStandart = (standartParamsForMatrix.find( (item) => item.value === chars.depth.value )).matrix;
  //По габаритам определяем размерность для матрицы

  //Тут генерируем размер матрицы
  for ( let x = 0; x < xStandart; x++){
    matrix.push([]); 
    for ( let y = 0; y < yStandart; y++ ){
      matrix[x].push([]); 
      for ( let z = 0; z < zStandart; z++ ){
        matrix[x][y].push([]); 
        if( x === 1 && y === 1 && z === 1 ){
          matrix[x][y][z] = 0;
        }else{
          matrix[x][y][z] = 0;
        }

      }

    }

  }

  //Это координаты ячейки
  let targerPosition = {
    positionX : round(objPosition.positionX - ( (chars.width.value + 20 )/2 ) ),
    positionY : round(objPosition.positionY - ( (chars.height.value + 20 )/2 ) ),
    positionZ : round(objPosition.positionZ - ( (chars.depth.value + 20 )/2 ) ),
  };

  console.log( targerPosition );

  //Теперь жесткий перебор всего, что есть на свете

  matrix.forEach( (xm, xIndex) => {

    xm.forEach( (ym, yIndex) => {

      ym.forEach( (zm, zIndex) => {

        //Если он пуст, на всякие пожарные.
        if ( zm === 0 ){

          //Нам нужны только те ячейки, которые проходят по поверхности куба
          if( !( ( (xIndex > 0) && (xIndex < matrix.length-1) ) &&
                 ( (yIndex > 0) && (yIndex < xm.length-1    ) ) &&
                 ( (zIndex > 0) && (zIndex < ym.length-1    ) ) ) ){

            //Помечаем все такие ячейки
            matrix[xIndex][yIndex][zIndex] = 1;

            let distX = 0, distY = 0, distZ = 0, dirX = 0, dirY= 0, dirZ = 0;

            distX = (( (125+20)/2 ) * xIndex);
            distY = (( (125+20)/2 ) * yIndex);
            distZ = (( (125+20)/2 ) * zIndex);

            targerPosition = {
              positionX : round(objPosition.positionX - ( (chars.width.value + 20 )/2 ) + distX),
              positionY : round(objPosition.positionY - ( (chars.height.value + 20 )/2 ) + distY),
              positionZ : round(objPosition.positionZ - ( (chars.depth.value + 20 )/2 ) + distZ),
            };

            let obj = false, fault = 0.01, fault2 = 0.1;

            [ elemsPanelsState, elemsFingersState, elemsProfilesState ].forEach( (states) => {

              states.forEach( ( item ) => {

                if ( !obj ){

                  [ 0, 1 ].forEach( (value) => {

                    let arrValue = [];

                    arrValue.push( { x: 0, y: 0, z: 0 } ); //1
                    arrValue.push( { x: value, y: 0, z: 0 } ); //2
                    arrValue.push( { x: 0, y: value, z: 0 } ); //3
                    arrValue.push( { x: 0, y: 0, z: value } ); //4
                    arrValue.push( { x: value, y: value, z: 0 } ); //5
                    arrValue.push( { x: 0, y: value, z: value } ); //6
                    arrValue.push( { x: value, y: 0, z: value } ); //7
                    arrValue.push( { x: value, y: value, z: value } ); //8

                    arrValue.forEach( (val) => {

                      if ( !obj ){

                        let findObj = states.find( (item) => 
                          round(item.params.positionX) == targerPosition.positionX + val.x &&
                          round(item.params.positionY) == targerPosition.positionY + val.y &&
                          round(item.params.positionZ) == targerPosition.positionZ + val.z
                        )

                        if ( findObj !== undefined ){

                          obj = findObj;

                        }

                      }  

                    } )

                                  

                  } )

                }

              } )

            } );

            if ( obj !== false ){

              if ( matrix[xIndex][yIndex][zIndex] <= 1){
                matrix[xIndex][yIndex][zIndex] = {
                  id : obj.id,
                  type : obj.type,
                }
              }

            }

          }

        }

      } ) 

    } );    

  } );

  return matrix;

}

export function findObjById ( id, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsOtherState, elemsLegsState ) {

  // console.log( 'Find by id: '+ id );

  try{

    let index = elemsProfilesState.findIndex( item => item.getID() === Number(id) );

    if ( index !== -1 ){ return elemsProfilesState[index]; }

    index = elemsFingersState.findIndex( item => item.getID() === Number(id) );

    if ( index !== -1 ){ return elemsFingersState[index]; }

    index = elemsPanelsState.findIndex( item => item.getID() === Number(id) );

    if ( index !== -1 ){ return elemsPanelsState[index]; }

    index = elemsOtherState.findIndex( item => item.getID() === Number(id) );

    if ( index !== -1 ){ return elemsOtherState[index]; }

    index = elemsLegsState.findIndex( item => item.getID() === Number(id) );

    if ( index !== -1 ){ return elemsLegsState[index]; }

  }catch{

    // console.log('catch!');

    return null;

  }

  return null;

}

export function findObjByDefaultId ( id, elemsProfilesState, elemsFingersState, elemsPanelsState, elemsGroupElementsState, elemsOtherState, elemsLegsState ){

  // console.log( 'Find by default id: '+ id );

  try{

    let index = elemsProfilesState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsProfilesState[index]; }

    index = elemsFingersState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsFingersState[index]; }

    index = elemsPanelsState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsPanelsState[index]; }

    index = elemsGroupElementsState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsGroupElementsState[index]; }

    index = elemsOtherState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsOtherState[index]; }

    index = elemsLegsState.findIndex( item => item.getDefaultId() === Number(id) );

    if ( index !== -1 ){ return elemsLegsState[index]; }

  }catch{

    // console.log('catch!');

    return null;

  }

  return null;

}

export function getMatrixByPoints ( points, elemsPanelsState, elemsProfilesState, elemsFingersState ) {

  console.log( points ); 

  let matrix = [];
  //Получаем размерность матрицы.
  let sizeMatrix = {
    x : ( points.second.position.x  -  points.first.position.x  ) / 72.5 + 1,
    y : ( points.second.position.y  - points.first.position.y  ) / 72.5 + 1,
    z : ( points.second.position.z  - points.first.position.z  ) / 72.5 + 1,
  }

  console.log( sizeMatrix );

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

  [ elemsPanelsState, elemsProfilesState, elemsFingersState ].forEach( (state) => {

    state.forEach( ( item ) => {

      if ( 
        ( 
          item.params.positionX >= points.first.position.x && 
          item.params.positionY >= points.first.position.y &&
          item.params.positionZ >= points.first.position.z 
        ) 
        &&
        ( 
          item.params.positionX <= points.second.position.x && 
          item.params.positionY <= points.second.position.y &&
          item.params.positionZ <= points.second.position.z 
        )
        ){

        let i = {
          x : Math.round( (item.params.positionX - points.first.position.x)/72.5 ),
          y : Math.round( (item.params.positionY - points.first.position.y)/72.5 ),
          z : Math.round( (item.params.positionZ - points.first.position.z)/72.5 ),
        }

        try{
          matrix[i.x][i.y][i.z] = {
            id : item.id,
            type : item.type
          }
        } catch (err){

          console.log( item.params );

          console.log({
            id : item.id,
             type : item.type,
            position : {
              x : i.x,
              y : i.y,
              z : i.z
            }
          })

        }

      }

    } )

  } )


  return matrix;

}

export function getGlobalMatrixCeils ( elemsGroupElementsState ){

  let matrix = [];

  if ( elemsGroupElementsState.length ){

    let sizeCeilIntoMatrix = [
      { value : 125, size : 1 },
      { value : 270, size : 2 },
      { value : 415, size : 3 },
      { value : 560, size : 4 },
    ];

    let minCeil = {
      position : {
        x : null,
        y : null,
        z : null,
      }
    }, maxCeil = {
      position : {
        x : null,
        y : null,
        z : null,
      }
    }, divisedCeils = [];

    elemsGroupElementsState.forEach( (ceil) => {

      let newCeil = {
        chars : ceil.chars,
        params: ceil.params,
        startParams: {
          x : ceil.params.positionX - ( ceil.chars.width.value  / 2 + 10 + 72.5 ),
          y : ceil.params.positionY - ( ceil.chars.height.value / 2 + 10 + 72.5 ),
          z : ceil.params.positionZ - ( ceil.chars.depth.value  / 2 + 10 + 72.5 ),
        },
        countChildCeils : { x : 0, y : 0, z: 0 },
        childCeils : [],
      }

      //Ячейка может состоять из нескольких меньших ячеек, нужно сформировать массив, где будут ячейки, которые нужно запушить в матрицу
      //В зависимости от размера ячейки, формируем кол-во ячеек со всех сторон.
      newCeil.countChildCeils.x = ( ( newCeil.chars.width.value + 20 ) / 72.5 )/2;
      newCeil.countChildCeils.y = ( ( newCeil.chars.height.value + 20 ) / 72.5 )/2;
      newCeil.countChildCeils.z = ( ( newCeil.chars.depth.value + 20 ) / 72.5 )/2 ;

      //Теперь на основе этих данных формируем дочерние ячейки
      for ( let x = 0; x < newCeil.countChildCeils.x; x++ ) { 

        for ( let y = 0; y < newCeil.countChildCeils.y; y++ ) {

          for ( let z = 0; z < newCeil.countChildCeils.z; z++ ) {

            let _ceil = {
              id : ceil.id,
              delta : { x : x, y : y, z : z },
              position : { 
                x : newCeil.startParams.x + (x + 1) * 145, 
                y : newCeil.startParams.y + (y + 1) * 145, 
                z : newCeil.startParams.z + (z + 1) * 145,
              },
            };

            if ( minCeil.position.x === null || _ceil.position.x <= minCeil.position.x ){
              minCeil.position.x = _ceil.position.x ;
            }
            if ( minCeil.position.y === null || _ceil.position.y <= minCeil.position.y ){
              minCeil.position.y = _ceil.position.y;
            }
            if ( minCeil.position.z === null || _ceil.position.z <= minCeil.position.z ){
              minCeil.position.z = _ceil.position.z ;
            }


            if ( maxCeil.position.x === null || _ceil.position.x >= maxCeil.position.x ){
              maxCeil.position.x = _ceil.position.x ;
            }
            if ( maxCeil.position.y === null || _ceil.position.y >= maxCeil.position.y ){
              maxCeil.position.y = _ceil.position.y;
            }
            if ( maxCeil.position.z === null || _ceil.position.z >= maxCeil.position.z ){
              maxCeil.position.z = _ceil.position.z ;
            }

            newCeil.childCeils.push( _ceil )
          }

        }

      }   

      // console.log( newCeil );

      divisedCeils.push( newCeil );

    } );

    //minCeil - это ячейка ( может быть дочерняя), имеющая самые меньшие координаты. От нее строится матрица.
    //maxCeil - это ячейка ( может быть дочерняя), имеющая самые большие координаты. По ней можно понять размерность матрицы в связке с minCeil.
    // console.log( minCeil );
    // console.log( maxCeil );

    //Получаем размерность матрицы.
    let sizeMatrix = {
      x : ( Math.abs( minCeil.position.x ) + Math.abs( maxCeil.position.x ) + 145 ) / 72.5 / 2,
      y : ( Math.abs( minCeil.position.y ) + Math.abs( maxCeil.position.y ) + 145 ) / 72.5 / 2,
      z : ( Math.abs( minCeil.position.z ) + Math.abs( maxCeil.position.z ) + 145 ) / 72.5 / 2,
    }

    // console.log( sizeMatrix );

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

    // console.log( divisedCeils );

    divisedCeils.forEach( ( ceil ) => {

      ceil.childCeils.forEach( ( childCeil ) => {

        //Считаем индексы ячейки
        let i = {
          x : (childCeil.position.x - minCeil.position.x) / 72.5 / 2,
          y : (childCeil.position.y - minCeil.position.y) / 72.5 / 2,
          z : (childCeil.position.z - minCeil.position.z) / 72.5 / 2,
        }

        try{
          matrix[i.x][i.y][i.z] = childCeil.id;
        }catch (err){
          console.error( i.x, i.y, i.z );
        }

      } )

    } )

  }
  
  return matrix;

}

export function getElemInsideByCell ( elem, elemsOtherState ){

  console.log( elem );

  console.log( elemsOtherState );

  //Функция вохвращает элемент ( дверь, ящик ) внутри ячейки.
  const positionBox = {
    position : {
      x : elem.params.positionX,
      y : elem.params.positionY,
      z : elem.params.positionZ,
    }
  }
  const positionDoor = {
    position : {
      x : elem.params.positionX,
      y : elem.params.positionY,
      z : elem.params.positionZ + (elem.chars.depth.value+20)/2,
    }
  }

  //Сначала найдем на ящик. Тут координаты должны просто совпадать

  let index = elemsOtherState.findIndex( ( item ) => 
    item.params.positionX === positionBox.position.x &&
    item.params.positionY === positionBox.position.y &&
    item.params.positionZ === positionBox.position.z
  )

  if ( index !== -1 ){
    return elemsOtherState[index];
  }else {

    index = elemsOtherState.findIndex( ( item ) => 
      item.params.positionX === positionDoor.position.x &&
      item.params.positionY === positionDoor.position.y &&
      item.params.positionZ === positionDoor.position.z
    )
    if ( index !== -1 ){
      return elemsOtherState[index];
    }
  }

  return null;


}

export function getAllElementsByCell ( elem, states ) {

  let elements = [];

  const getExtremePointsByCell = ( cell ) => {

    return {
      first : { 
        position : {
          x : cell.params.positionX - cell.chars.width.value/2 - 10,
          y : cell.params.positionY - cell.chars.height.value/2 - 10,
          z : cell.params.positionZ - cell.chars.depth.value/2 - 10,
        }
      },
      second : {
        position : {
          x : cell.params.positionX + cell.chars.width.value/2 + 10,
          y : cell.params.positionY + cell.chars.height.value/2 + 10,
          z : cell.params.positionZ + cell.chars.depth.value/2 + 10,
        }
      }
    }

  }

  const extremePoints = getExtremePointsByCell( elem );

  const originalMatrix = getMatrixByPoints( extremePoints, states.panels, states.profiles, states.fingers );

  originalMatrix.forEach( (xm, xIndex) => {

    xm.forEach( (ym, yIndex) => {

      ym.forEach( (zm, zIndex) => {

        if ( zm !== 0 && typeof zm === 'object' ){

          const element_id = zm.id;
          const element_type = zm.type; 

          let element_object = undefined;

          if ( element_type === 'profile' ){

            element_object = states.profiles.find( (item) => item.id === element_id );

          } else if ( element_type === 'panel' ){

            element_object = states.panels.find( (item) => item.id === element_id );

          } else if ( element_type === 'finger' ){

            element_object = states.fingers.find( (item) => item.id === element_id );

          }

          if ( element_object !== undefined ){

            elements.push( element_object );

          }

        }

      } );

    } );

  } );

  const otherElement = getElemInsideByCell( elem, states.others );

  if ( otherElement !== null ){
    elements.push(otherElement);
  }

  return elements;

}
//Конфиг
import { config, PI, PI_90 } from '../Config.js';

import { getMatrixByPoints } from '../helpers/constructorHelper.js';

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

const getExtremeOriginalPointsByElemAndFace = ( elem, face, states ) => {

  //Эта функция возвращает крайние точки по элементу и направлению.
  const getFirstCharsByElemAndFaceByCell = ( elem, face ) => {

    const MAX_SIZE_CELL = 560;

    let chars = { width : 0, height : 0, depth : 0 }

    if ( elem.type === 'ceil' ){ //работаем с ячейкой

      if ( face.x === 1 || face.x === -1 ){ //Ставим справа
        chars.height = elem.chars.height.value;
        chars.depth = elem.chars.depth.value;
        chars.width = MAX_SIZE_CELL;
      } else if ( face.y === 1 || face.y === -1 ){
        chars.width = elem.chars.width.value;
        chars.depth = elem.chars.depth.value;
        chars.height = MAX_SIZE_CELL;
      } else if ( face.z === 1 ){ //Ставим вперед
        chars.height = elem.chars.height.value;
        chars.width = elem.chars.width.value;
        chars.depth = MAX_SIZE_CELL;
      }

    }

    return chars;

  }

  const getPointsBySizeAndPositionAndFaceByCell = ( charsOriginalCell, elem, face ) => {

    let points = {
      first : { position : { x : 0, y : 0, z : 0 } },
      second : { position : { x : 0, y : 0, z : 0 } }
    }
    let directions = { x : 1, y : 1, z : 1 }

    if ( face.x === 1 ){
    
      points.first.position.x = elem.params.positionX + (elem.chars.width.value+20)/2;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2;

      points.second.position.x = elem.params.positionX + (elem.chars.width.value+20)/2 + charsOriginalCell.width + 20;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2 + charsOriginalCell.depth + 20;

    } else if ( face.x === -1 ){

      points.first.position.x = elem.params.positionX - (elem.chars.width.value+20)/2 - charsOriginalCell.width - 20;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2;

      points.second.position.x = elem.params.positionX - (elem.chars.width.value+20)/2;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2 + charsOriginalCell.depth + 20;

    } else if ( face.y === 1 ) {

      points.first.position.x = elem.params.positionX - (elem.chars.width.value+20)/2;
      points.first.position.y = elem.params.positionY + (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2;

      points.second.position.x = elem.params.positionX + (elem.chars.width.value+20)/2;
      points.second.position.y = elem.params.positionY + (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.depth.value+20)/2 + charsOriginalCell.depth + 20;

    } else if ( face.z === 1 ) { 

      points.first.position.x = elem.params.positionX - (elem.chars.width.value+20)/2;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ + (elem.chars.depth.value+20)/2;

      points.second.position.x = elem.params.positionX + (elem.chars.width.value+20)/2;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ + (elem.chars.depth.value+20)/2 + charsOriginalCell.depth + 20;

    }

    return points;

  }


  const getFirstCharsByElemAndFaceByPanel = ( elem, face ) => {

    const MAX_SIZE_CELL = 560;

    let chars = { width : 0, height : 0, depth : 0 }

    //1. Определяем ориентацию
    const orientation = getOrientationPanel( elem );
    console.log( orientation, face.z );

    if ( ( orientation === 1 || orientation === 4 ) && face.z === 1 ){ //Ставим спереди
      chars.height = elem.chars.height.value;
      chars.width = elem.chars.width.value;
      chars.depth = MAX_SIZE_CELL;
    } else if ( ( orientation === 2 || orientation === 5 ) && face.z === -1 ){ //Ставим сверху
      chars.height = MAX_SIZE_CELL;
      chars.width = elem.chars.width.value;
      chars.depth = elem.chars.height.value;
    } else if ( ( orientation === 3 || orientation === 6 ) && face.z === 1 || face.z === -1  ){ //Ставим справа
      chars.height = elem.chars.height.value;
      chars.width = MAX_SIZE_CELL;
      chars.depth = elem.chars.width.value;
    } 

    return chars;

  }

  const getPointsBySizeAndPositionAndFaceByPanel = ( charsOriginalCell, elem, face ) => {

    //1. Определяем ориентацию
    const orientation = getOrientationPanel( elem );
    console.log( orientation, face.z );

    let points = {
      first : { position : { x : 0, y : 0, z : 0 } },
      second : { position : { x : 0, y : 0, z : 0 } }
    }

    if ( ( orientation === 1 || orientation === 4 ) && face.z === 1 ){ //Ставим спереди

      points.first.position.x = elem.params.positionX - (elem.chars.width.value+20)/2;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ;

      points.second.position.x = elem.params.positionX + (elem.chars.width.value+20)/2;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ + charsOriginalCell.depth + 20;
      
    } else if ( ( orientation === 2 || orientation === 5 ) && face.z === -1 ){ //Ставим сверху
      
      points.first.position.x = elem.params.positionX - (elem.chars.width.value+20)/2;
      points.first.position.y = elem.params.positionY;
      points.first.position.z = elem.params.positionZ - (elem.chars.height.value+20)/2;

      points.second.position.x = elem.params.positionX + (elem.chars.width.value+20)/2;
      points.second.position.y = elem.params.positionY + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.height.value+20)/2 + charsOriginalCell.depth + 20;

    } else if ( ( orientation === 3 || orientation === 6 ) && face.z === 1  ){ //Ставим справа

      points.first.position.x = elem.params.positionX;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ - (elem.chars.width.value+20)/2;

      points.second.position.x = elem.params.positionX + charsOriginalCell.width + 20;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.width.value+20)/2 + charsOriginalCell.depth + 20;
      
    } else if ( ( orientation === 3 || orientation === 6 ) && face.z === -1 ){

      points.first.position.x = elem.params.positionX - charsOriginalCell.width - 20;
      points.first.position.y = elem.params.positionY - (elem.chars.height.value+20)/2;
      points.first.position.z = elem.params.positionZ - (elem.chars.width.value+20)/2;

      points.second.position.x = elem.params.positionX;
      points.second.position.y = elem.params.positionY - (elem.chars.height.value+20)/2 + charsOriginalCell.height + 20;
      points.second.position.z = elem.params.positionZ - (elem.chars.width.value+20)/2 + charsOriginalCell.depth + 20;

    }

    return points;

  }


  if ( elem.type === 'ceil' ){

    //1. Сначала определяем первичные размеры 
    const charsOriginalCellByCell = getFirstCharsByElemAndFaceByCell ( elem, face );

    //2. На основе первичныйх размеров, координат элемента и направления, получаем крайние точки.
    const pointsCell = getPointsBySizeAndPositionAndFaceByCell( charsOriginalCellByCell, elem, face );

    return pointsCell;

  } else if ( elem.type === 'panel' ) {

    //1. Сначала определяем первичные размеры 
    const charsOriginalCellByPanel = getFirstCharsByElemAndFaceByPanel ( elem, face );

    console.log( charsOriginalCellByPanel );

    //2. На основе первичныйх размеров, координат элемента и направления, получаем крайние точки.
    const pointsByPanel = getPointsBySizeAndPositionAndFaceByPanel( charsOriginalCellByPanel, elem, face );

    return pointsByPanel;

  }
  
  

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

const getTotalUnaryMatrixByUnaryOriginalMatrix = ( matrix, face ) => {

  const getCopySizeMatrix = ( matrix ) => {

    let _matrix = [];
    //Формируем пустую матрицу.
    for ( let x = 0; x < matrix.length; x++ ){
      _matrix.push([]);
      for ( let y = 0; y < matrix[0].length; y++ ){
        _matrix[x].push([]);
        for ( let z = 0; z < matrix[0][0].length; z++ ){
          _matrix[x][y].push( 0 );
        }
      }
    }
    return _matrix;

  }

  const getPerfectMatrix = ( matrix ) => {

    //1. Заполянем профилями и коннекторами.
    matrix = matrix.map( (xm, xIndex) => {

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

    //2. Заполянем панелями
    return matrix.map( (xm, xIndex) => {

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

  }

  //1. Генерируем матрицу такого же размера, как и входная.
  const clearMatrix = getCopySizeMatrix( matrix );
  console.log( clearMatrix );

  //2. Теперь заполняем её всеми нужными элементами
  const perfectMatrix = getPerfectMatrix( clearMatrix );

  return perfectMatrix;

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

const generationOfElementsByMatrixAndExtremePoints = ( matrix, points, elem, face ) => {

  //Эта функция должна сгенерировать все элементы в массиве относительно элемента - второго аргумента функции
  let responsePush = { panels : [], profiles : [], fingers : [], legs : [] }

  const startPosition = {
    x : points.first.position.x,
    y : points.first.position.y,
    z : points.first.position.z,
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


 
  if ( startPosition.y === -290 ){ //Только если ячейка самая низкая

    let firstParams = {
      positionX : 0, 
      positionY : startPosition.y - (125/2) - 10, 
      positionZ : startPosition.z,
      rotationX : PI_90, rotationY : 0, rotationZ : 0,
    }
    let secondParams = {
      positionX : 0, 
      positionY : startPosition.y - (125/2) - 10, 
      positionZ : startPosition.z + (((matrix[0][0].length)-1)/2)*145,
      rotationX : PI_90, rotationY : 0, rotationZ : 0,
    }

    let side = '';

    if ( elem.type === 'ceil' ){ //работаем с ячейкой

      if ( face.x === 1  ){ //Ставим справа
        side = 'RIGHT';
      } else if ( face.x === -1 ){
        side = 'LEFT';
      } else if ( face.y === 1 || face.y === -1 ){
        side = 'TOP';
      } else if ( face.z === 1 ){ //Ставим вперед
        side = 'FRONT';
      }

    }

    if (elem.type === 'panel' ){
      //1. Определяем ориентацию
      const orientation = getOrientationPanel( elem );

      if ( ( orientation === 1 || orientation === 4 ) && face.z === 1 ){ //Ставим спереди
        side = 'FRONT'
      } else if ( ( orientation === 2 || orientation === 5 ) && face.z === -1 ){ //Ставим сверху
         side = 'TOP';
      } else if ( ( orientation === 3 || orientation === 6 ) && face.z === 1  ){ //Ставим справа
        side = 'RIGHT';
      } else if ( ( orientation === 3 || orientation === 6 ) && face.z === -1  ){ //Ставим слева
        side = 'LEFT';
      }
    }

    //Генерация ножек ( дополнение ).
    if ( side === 'RIGHT' ){

      firstParams.positionX = startPosition.x+580;
      secondParams.positionX = startPosition.x+580; 

    } else if ( side === 'LEFT' ){

      firstParams.positionX = startPosition.x;
      secondParams.positionX = startPosition.x; 

    } else if ( side === 'FRONT' ){

      firstParams.positionX = startPosition.x;
      secondParams.positionX = startPosition.x+580;

      firstParams.positionZ = startPosition.z + (((matrix[0][0].length)-1)/2)*145;
      secondParams.positionZ = startPosition.z + (((matrix[0][0].length)-1)/2)*145;

    }

    if ( side !== 'TOP' ){

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

  }

  return responsePush;

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

const generationCellByExtremeOriginalPoints = ( points ) => {

  const responsePush = { ceils : [] };

  const chars = {
    width : {
      value : points.second.position.x - points.first.position.x - 20,
      status : 'enabled',
    },
    height : {
      value : points.second.position.y - points.first.position.y - 20,
      status : 'enabled',
    },
    depth : {
      value : points.second.position.z - points.first.position.z - 20,
      status : 'enabled',
    },
  }
  const params = { 
    positionX : points.first.position.x + chars.width.value/2 + 10,
    positionY : points.first.position.y + chars.height.value/2 + 10,
    positionZ : points.first.position.z + chars.depth.value/2 + 10,
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

  return responsePush;

}

export const addNewCell = ( elem, face, states ) => {

  console.log( face );
  console.log( elem.params );

  //1. Получаем крайние точки для оригинальной матрицы
  const extremeOriginalPoints = getExtremeOriginalPointsByElemAndFace( elem, face );
  console.log( extremeOriginalPoints ); 

  //2. Получаем сложную оригинальную матрицу по точкам
  const originalMatrix = getMatrixByPoints( extremeOriginalPoints, states.panels, states.profiles, states.fingers );
  console.log( originalMatrix ); 

  //3. Получаем унарную комплексную матрицу по оригинальной матрице
  const unaryOriginalMatrix = getUnaryMatrixByOriginalMatrix( originalMatrix, states );
  console.log( unaryOriginalMatrix );  

  //4. На основе унарной матрицы получаем итоговую идеальную матрицу, но с такими же размерами, как и с оригинальной
  const totalUnaryMatrixByUnaryOriginalMatrix = getTotalUnaryMatrixByUnaryOriginalMatrix( unaryOriginalMatrix );
  console.log( totalUnaryMatrixByUnaryOriginalMatrix );

  //5. Мержим матрицы.
  const mergedUnaryMatrix = mergingMatrix( unaryOriginalMatrix, totalUnaryMatrixByUnaryOriginalMatrix );
  console.log( mergedUnaryMatrix );

  //7. Удаляем все элементы с оригинальной матрицы 
  const responseRemove = removeMatrix( originalMatrix, states );

  //9. Генерируем элементы по комплексной матрице, а также ножки (высчитываются отдельно).
  const responsePush = generationOfElementsByMatrixAndExtremePoints( mergedUnaryMatrix, extremeOriginalPoints, elem, face );

  //10. Генерируем ячейку по точкам.
  const responsePushCells = generationCellByExtremeOriginalPoints( extremeOriginalPoints );

  const response = {
    push : { 
      ...responsePush, 
      ...responsePushCells
    },
    remove : { ...responseRemove },
  }

  return response;

  return {};

}
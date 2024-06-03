//Конфиг
import { config, PI, PI_90 } from '../Config.js';

import { addNewColumnCornice, addNewRowCornice } from './addNewCornice.js';

const isIncrease = ( direction ) => {

  if ( direction === 'INCREASE' ){
    return true;
  } 
  return false;

}



export const changeGlobalSizeConstructor = ( type, dir, states ) => {


  //1. Получаем элемент от которого будем строить каркасы

  // В зависимости от уменьшения или увеличения запускаем соответствующие 

  if ( isIncrease( dir ) ) {

    if ( type === 'HEIGHT' ){

      return addNewRowCornice( 1, states ); 

    } else if ( type === 'WIDTH' ) {

      return addNewColumnCornice( 'RIGHT', 1, states ); 

    }

  } else {


  }

	return {}; 

}
//Конфиг
import { config, PI, PI_90 } from '../Config.js';

import { getElemInsideByCell } from '../helpers/constructorHelper.js';

export const addNewDoor = ( elem, typeDoor, state ) => {


  let responseCellInside = getElemInsideByCell( elem, state.others );

  if ( responseCellInside === null ){

    const params = elem.params, chars = elem.chars;

    const charsBox = {
      width : chars.width.value - 3,
      height : chars.height.value - 3,
      depth : chars.depth.value - 3,
    }

    let paramsDoor = { 
      ...elem.params,
      positionZ : elem.params.positionZ + ( (560/2) + 10 ), 
      rotationX: 0, 
      rotationY: 0, 
      rotationZ: 0,
      typeDoor: typeDoor,
    }

    let nameDoor = 'Door_Panel_' + charsBox.height + 'x' + charsBox.width;

    if ( charsBox.width > charsBox.height ){
      nameDoor = 'Door_Panel_' + charsBox.width + 'x' + charsBox.height;
      paramsDoor.rotationZ = PI_90;
    }

    const doorObj = {
      id : 100,
      name : nameDoor,
      type : 'door',
      params : paramsDoor,
      textureId : null,
    }

    const response = {
      push : {
        others : [ doorObj ],
      }
    }

    return response; 

  }
  
  return {};

}
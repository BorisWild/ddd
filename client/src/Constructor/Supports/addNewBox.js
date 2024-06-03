//Конфиг
import { config, PI, PI_90 } from '../Config.js';

import { getElemInsideByCell } from '../helpers/constructorHelper.js';

export const addNewBox = ( elem, state ) => {

  let responseCellInside = getElemInsideByCell( elem, state.others );

  if ( responseCellInside === null ){

    let params = elem.params, chars = elem.chars;

    let charsBox = {
      width : chars.width.value - 3,
      height : chars.height.value - 3,
      depth : chars.depth.value - 3,
    }

    let nameBox = 'Box_' + charsBox.width + 'x' + charsBox.depth + 'x' + charsBox.height;

    let _obj = {
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
    }

    let response = {
      push : {
        others : [ _obj ],
      }
    }

    return response; 

  }

  return {};

	
}
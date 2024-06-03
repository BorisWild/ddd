import { config, PI, PI_90 } from './Config.js';

import sofaTexture from '../textures/sofa.jpg';

export const listElementsOther2 = [];

//Модели декора
export const listElememetsOther = [ 
  {
    id : 3000,
    name : 'Sofa',
    type : 'furn',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + 26*100,
      positionY : config.distY - ( 4.2 )*100,
      positionZ : config.distZ + 1.7*100, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    },
    material : {
      color : '#ffffff',
      defaultColorHex : '0xffffff',
      texture : sofaTexture,
    },
  },
  {
    id : 3001,
    name : 'Picture',
    type : 'furn',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + 26*100,
      positionY : config.distY + (10)*100,
      positionZ : config.distZ - 4*100, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 3002,
    name : 'Carpet',
    type : 'furn',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + 7*100,
      positionY : config.distY - (4.3 + 2.9)*100,
      positionZ : config.distZ + 30*100, 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  {
    id : 3003,
    name : 'Vase',
    type : 'furn',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX - 15 *100,
      positionY : config.distY - (1.5 + 2.9)*100,
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 3004,
    name : 'Torsher',
    type : 'furn',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    material : {
      color : '#191919',
      defaultColorHex : '0x191919',
      texture : null,
    },
    params : {
      positionX : config.distX + 12*100,
      positionY : config.distY - (1.5 + 2.9)*100,
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
];

//Ячейки
export const listGroupElements = [
 
  {
    id : 1000,
    type : 'ceil',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    chars : {
      width : {
        status : 'enabled',
        value : 560,
      },
      height : {
        status : 'enabled',
        value : 560,
      },
      depth : {
        status : 'enabled',
        value : 560,
      },
    },
    merge : [],
    grid : {
      x : 0,
      y : 0,
      z : 0,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY ,
      positionZ : config.distZ, 
    }
  },
];

//Панели
export const listElememetsPanels = [
  {
    id : 1,
    name : 'Panel_560x560',
    type : 'panel',
    connect : {
      pX : 5,
      pY : null,
      pZ : 13,
      nX : 10,
      nY : null,
      nZ : 15,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY - ( 560/2 + 10 ),
      positionZ : config.distZ, 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 2,
    name : 'Panel_560x560',
    type : 'panel',
    connect : {
      pX : 9,
      pY : null,
      pZ : 13,
      nX : 10,
      nY : null,
      nZ : 15,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY + ( ((560/2 + 10 ))),
      positionZ : config.distZ, 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 3,
    name : 'Panel_560x560',
    type : 'panel',
    connect : {
      pX : null,
      pY : 9,
      pZ : 11,
      nX : null,
      nY : 7,
      nZ : 3,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10) ),
      positionY : config.distY,
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    },
  },
  {
    id : 4,
    name : 'Panel_560x560',
    type : 'panel',
    connect : {
      pX : null,
      pY : 10,
      pZ : 12,
      nX : null,
      nY : 8,
      nZ : 12,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10) ) ,
      positionY : config.distY,
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  {
    id : 5,
    name : 'Panel_560x560',
    type : 'panel',
    connect : {
      pX : 11,
      pY : 15,
      pZ : null,
      nX : 12,
      nY : 16,
      nZ : null,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY,
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
];

//Коннекторы
export const listElememetsFingers = [
  
  {
    id : 19,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : 15,
      nY : 11,
      nZ : 9,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ + ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 20,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : 15,
      pY : null,
      pZ : null,
      nX : null,
      nY : 12,
      nZ : 10,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ + ( (560/2  + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 21,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : 17,
      pY : null,
      pZ : 10,
      nX : null,
      nY : 14,
      nZ : null,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ - ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 22,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : null,
      pY : null,
      pZ : 9,
      nX : 17,
      nY : 13,
      nZ : null,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ - ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },


  {
    id : 23,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : null,
      pY : 11,
      pZ : null,
      nX : 16,
      nY : null,
      nZ : 7,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10)),
      positionZ : config.distZ + ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 24,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : 16,
      pY : 12,
      pZ : null,
      nX : null,
      nY : null,
      nZ : 8,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10) ),
      positionZ : config.distZ + ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 25,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : 18,
      pY : 14,
      pZ : 8,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10)),
      positionZ : config.distZ - ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 26,
    name : 'Fingers_4',
    type : 'finger',
    // model : Fingers_4,
    connect : {
      pX : null,
      pY : 13,
      pZ : 7,
      nX : 18,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10)),
      positionZ : config.distZ - ( (560/2 + 10)), 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },

];

//Профили
export const listElememetsProfiles = [
  
  {
    id : 7,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : null,
      pY : 3,
      pZ : 21,
      nX : 1,
      nY : null,
      nZ : 24,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10)),
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 8,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 1,
      pY : 4,
      pZ : 22,
      nX : null,
      nY : null,
      nZ : 23,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY - ( (560/2 + 10)),
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 9,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : null,
      pY : null,
      pZ : 17,
      nX : 2,
      nY : 3,
      nZ : 20,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 10,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 2,
      pY : null,
      pZ : 18,
      nX : null,
      nY : 4,
      nZ : 19,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY + ( (560/2 + 10)),
      positionZ : config.distZ, 
      rotationX : 0,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 11,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : null,
      pY : 17,
      pZ : null,
      nX : null,
      nY : 21,
      nZ : 3,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10)),
      positionY : config.distY,
      positionZ : config.distZ + ( (560/2 + 10)), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 12,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : null,
      pY : 18,
      pZ : null,
      nX : null,
      nY : 22,
      nZ : 4,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10)),
      positionY : config.distY,
      positionZ : config.distZ + ( (560/2 + 10)), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 13,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : null,
      pY : 21,
      pZ : 3,
      nX : 5,
      nY : 25,
      nZ : null,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10) ),
      positionY : config.distY,
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 14,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 5,
      pY : 20,
      pZ : 4,
      nX : null,
      nY : 24,
      nZ : null,
    },
    params : {
      positionX : config.distX - ( (560/2 + 10) ),
      positionY : config.distY,
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 15,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 19,
      pY : null,
      pZ : null,
      nX : 20,
      nY : null,
      nZ : 2,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY + ( (560/2 + 10) ),
      positionZ : config.distZ + ( (560/2 + 10) ), 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  {
    id : 16,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 23,
      pY : null,
      pZ : null,
      nX : 24,
      nY : null,
      nZ : 1,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY - ( (560/2 + 10) ),
      positionZ : config.distZ + ( (560/2 + 10) ), 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  {
    id : 17,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 22,
      pY : null,
      pZ : 2,
      nX : 21,
      nY : 5,
      nZ : null,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY + ( (560/2 + 10) ),
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  {
    id : 18,
    name : 'Profile_560',
    type : 'profile',
    connect : {
      pX : 26,
      pY : 5,
      pZ : 1,
      nX : 25,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX,
      positionY : config.distY - ( (560/2 + 10) ),
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : 0,
      rotationY : PI_90,
      rotationZ : 0,
    }
  },
  
];

//Ножки
export const listElememetsLegs = [

  {
    id : 27,
    name : 'Leg',
    type : 'leg',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + ( (560/2  + 10)),
      positionY : config.distY - ( ((125+560)/2  + 20)),
      positionZ : config.distZ + ( (560/2  + 10)), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 28,
    name : 'Leg',
    type : 'leg',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX - ( (560/2  + 10)),
      positionY : config.distY - ( ((125+560)/2  + 20)),
      positionZ : config.distZ + ( (560/2  + 10)), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 29,
    name : 'Leg',
    type : 'leg',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX - ( (560/2  + 10) ),
      positionY : config.distY - ( ((125+560)/2  + 20) ),
      positionZ : config.distZ - ( (560/2  + 10) ), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },
  {
    id : 30,
    name : 'Leg',
    type : 'leg',
    connect : {
      pX : null,
      pY : null,
      pZ : null,
      nX : null,
      nY : null,
      nZ : null,
    },
    params : {
      positionX : config.distX + ( (560/2 + 10) ),
      positionY : config.distY - ( ((125+560)/2 + 20) ),
      positionZ : config.distZ - ( (560/2 + 10) ), 
      rotationX : PI_90,
      rotationY : 0,
      rotationZ : 0,
    }
  },

];